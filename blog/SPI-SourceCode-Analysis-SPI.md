---
title: SPI Source Code Analysis
author: Throwable
author_url: https://github.com/zjcscut/
tags: [SPI, Apache ShenYu]
date: 2022-09-12
---

> [Apache ShenYu](https://shenyu.apache.org/zh/docs/index) is an asynchronous, high-performance, cross-language, responsive API gateway.

## background

Recently,when I read the source code of open source project Apache Shenyu API gateway,I find and many core components of the gateway are loaded with the SPI module. Here I will analyzes the source code of `SPI` module in `Shenyu` gateway.

## what is SPI

`SPI` means 'Service Provider Interface', which is a dynamic Service discovery mechanism. We can dynamically load the implementation class of the Interface based on the runtime of the Interface (that is, a development mode of Interface programming + strategy  pattern + configuration file) with it. The most common is the built-in database Driver interface 'java.sql.Driver' in JDK. Different vendors can implement this interface differently. For example, 'MySQL' ('com.mysql.jdbc.Driver' in the 'MySQL' Driver package),' PostgreSQL' ('org.postgresql.driver' in the 'PostgreSQL' Driver package), etc.

![spi-jdk-api-diagram](/img/activities/code-analysis-spi/spi-jdk-api-diagram-en.png)

The JDK's built-in 'SPI' can be used as follows:

- In the 'META-INF/services' directory of the classpath, create a file named with the fully qualified name of the interface (essentially a 'properties' file) whose implementation classes you want the SPI loader to load , for example if you want to load the SQL driver implementation classes mentioned above then create a file named 'java.sql.Driver' since those classes implement the 'java.sql.driver' interface.

- In this file we can add entries for all the specific implementations of the interface . For example for the above driver class scenario we would add entries as shown in below code snippet in the file `META-INF/services/java.sql.Driver`

```java
# content of file META-INF/services/java.sql.Driver
com.mysql.jdbc.Driver
org.postgresql.Driver
```

- Finally load the file with 'java.util.ServiceLoader' to instantiate the corresponding implementation class of the interface

```java
ServiceLoader<Driver> loader = ServiceLoader.load(Driver.class)
```
The underlying implementation involves classloading, the parent delegate model, and so on, which I won't expand here. Based on this design idea, many mainstream frameworks self-implemented a set of 'SPI' extension, such as 'Dubbo SPI' extension module, which would read the 'META-INF/services/dubbo' directory file content in the classppath for class loading. The 'shenyu-spi' module also follows this similar design idea.

## source code of shenyu-spi

The 'shenyu-spi' module is very concise, and the code structure is as follows:

```properties
- shenyu-spi[module]
  - org.apache.shenyu.spi[package]
    -- ExtensionFactory
    -- ExtensionLoader
    -- Join
    -- SPI
    -- SpiExtensionFactory
```

这些类功能如下：

- 'ExtensionFactory' : 'SPI' loader Factory, used to load an 'ExtensionLoader' instance based on the 'SPI' mechanism and to obtain the default 'SPI' identity implementation based on the 'ExtensionLoader' instance
- 'SpiExtensionFactory' : is an implementation of 'ExtensionFactory'
- 'SPI' : identification annotation, used to identify 'SPI', used on the interface
- 'Join' : identification annotation, used on the implementation class, used to identify the class joining the SPI system
- 'ExtensionLoader' : 'SPI' loader, analogous to 'java.util.ServiceLoader', used to load the implementation class of the interface in 'SPI'

### @SPI

`org.apache.shenyu.spi.SPI` is an identification annotation which is used for identifying an interface as a 'SPI' interface.That is, only interfaces that use '@SPI' annotation can be loaded by 'shenyu-spi'. The class's annotation describes the implementation of Apache Dubbo, a reference to all the SPI systems (which makes sense, since the SPI extension is already a mature scheme with much the same implementation). This annotation has only one method:

```java
@Documented
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.TYPE)
public @interface SPI {

    /**
     * Value string.
     *
     * @return the string
     */
    String value() default "";
}
```

The unique 'value()' method is used to specify the default 'SPI' implementation (optional), as will be shown later when analyzing 'ExtensionLoader'.

### @Join

`org.apache.shenyu.spi.Join` is an identification annotation too. When this annotation is used on a class it specifies that  the class contains 'SPI' implementation and to indicate that the class is added to the SPI system and can be loaded by ExtensionLoader. This annotation has two methods:

```java
@Documented
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.TYPE)
public @interface Join {
    
    /**
     * It will be sorted according to the current serial number..
     * @return int.
     */
    int order() default 0;

    /**
     * Indicates that the object joined by @Join is a singleton,
     * otherwise a completely new instance is created each time.
     * @return true or false.
     */
    boolean isSingleton() default true;
}
```

The unique 'order()' method is used to specify the specific sequence number. If a single interface that annotated with '@SPI' has multiple implementation classes that annotated with '@Join', the sequence number determines the order of these implementation class instances (the smaller one comes first).

The isSingleton() method indicates whether the class that the implementation class is a singleton class or not. That is if it is a singleton class it will be instantiated only once else it will create a new instance everytime . 

### ExtensionLoader

'ExtensionLoader' is the core of the 'SPI' module. Look at it's attributes first:

```java
public final class ExtensionLoader<T> {
    
    // SLF4J日志句柄
    private static final Logger LOG = LoggerFactory.getLogger(ExtensionLoader.class);
    
    // SPI配置文件基于类路径下的相对目录
    private static final String SHENYU_DIRECTORY = "META-INF/shenyu/";
    
    // @SPI标识接口类型 -> ExtensionLoader实例的缓存 => 注意这个是一个全局的静态变量
    private static final Map<Class<?>, ExtensionLoader<?>> LOADERS = new ConcurrentHashMap<>();
    
    // 当前@SPI标识接口类型
    private final Class<T> clazz;
    
    // 类加载器实例
    private final ClassLoader classLoader;
    
    // 当前ExtensionLoader缓存的已加载的实现类信息，使用值持有器包装，是一个HashMap，映射关系：实现类别名 -> 实现类信息
    private final Holder<Map<String, ClassEntity>> cachedClasses = new Holder<>();
    
    // 当前ExtensionLoader缓存的已加载的实现类实例的值包装器，使用值持有器包装，映射关系：实现类别名 -> 值持有器包装的实现类实体
    private final Map<String, Holder<Object>> cachedInstances = new ConcurrentHashMap<>();
    
    // 当前ExtensionLoader缓存的已加载的实现类实例，使用值持有器包装，映射关系：实现类类型 -> 实现类实体
    private final Map<Class<?>, Object> joinInstances = new ConcurrentHashMap<>();
    
    // 缓存默认名称，来源于@SPI注解的value()方法非空白返回值，用于加载默认的接口实现
    private String cachedDefaultName;
    
    // Holder比较器，按照Holder的order降序，也就是顺序号小的排在前面
    private final Comparator<Holder<Object>> holderComparator = Comparator.comparing(Holder::getOrder);
    
    // ClassEntity比较器，按照ClassEntity的order降序，也就是顺序号小的排在前面
    private final Comparator<ClassEntity> classEntityComparator = Comparator.comparing(ClassEntity::getOrder);
    
    // 暂时省略其他代码

    // 值持有器，简单VO，用来存储泛型值和值加载顺序
    public static class Holder<T> {
        
        // 这里的值引用是volatile修饰，便于某线程更变另一线程马上读到最新的值
        private volatile T value;
        
        private Integer order;

        private boolean isSingleton;
        
        // 省略setter和getter代码
    }
    
    // 类实体，主要存放加载的实现类的信息
    static final class ClassEntity {
        
        // 名称，这里是指SPI实现类的别名，不是类名
        private String name;
        
        // 加载顺序号
        private Integer order;

        private Boolean isSingleton;
        
        // SPI实现类
        private Class<?> clazz;

        private ClassEntity(final String name, final Integer order, final Class<?> clazz, final boolean isSingleton) {
            this.name = name;
            this.order = order;
            this.clazz = clazz;
            this.isSingleton = isSingleton;
        }
        
        // 省略setter和getter代码
    }
}
```

After analyzing the attributes, it is not difficult to find the following points:

- 'ExtensionLoader' There will be a global static cache 'LOADERS' to cache already created instances of 'ExtensionLoader' to prevent the performance overhead of repeated creation
- Each '@SPI' interface that is loaded using 'ExtensionLoader' generates a new instance of 'ExtensionLoader'
- '@SPI' interfaces that have multiple implementations are eventually acquired in order

Then look at it's constructors and static factory methods:

```java
// 私有构造函数，需要入参为@SPI标识的接口类型和类加载器实例
private ExtensionLoader(final Class<T> clazz, final ClassLoader cl) {
    // 成员变量clazz赋值
    this.clazz = clazz;
    // 成员变量classLoader赋值
    this.classLoader = cl;
    // 这里对于非ExtensionFactory接口类型会懒加载一个用于加载ExtensionFactory的ExtensionLoader
    if (!Objects.equals(clazz, ExtensionFactory.class)) {
        ExtensionLoader.getExtensionLoader(ExtensionFactory.class).getExtensionClassesEntity();
    }
}

// 实例化getExtensionLoader，静态工厂方法，需要入参为@SPI标识的接口类型和类加载器实例
public static <T> ExtensionLoader<T> getExtensionLoader(final Class<T> clazz, final ClassLoader cl) {
    // 前缀校验，接口类型必须非空并且必须存在@SPI注解，否则抛出异常中断
    Objects.requireNonNull(clazz, "extension clazz is null");
    if (!clazz.isInterface()) {
        throw new IllegalArgumentException("extension clazz (" + clazz + ") is not interface!");
    }
    if (!clazz.isAnnotationPresent(SPI.class)) {
        throw new IllegalArgumentException("extension clazz (" + clazz + ") without @" + SPI.class + " Annotation");
    }
    // 从缓存LOADERS中加载ExtensionLoader实例，不存在则创建，典型的懒加载模式
    ExtensionLoader<T> extensionLoader = (ExtensionLoader<T>) LOADERS.get(clazz);
    if (Objects.nonNull(extensionLoader)) {
        return extensionLoader;
    }
    LOADERS.putIfAbsent(clazz, new ExtensionLoader<>(clazz, cl));
    return (ExtensionLoader<T>) LOADERS.get(clazz);
}

// 实例化getExtensionLoader，静态工厂方法，需要入参为@SPI标识的接口类型，使用ExtensionLoader类的类加载器
public static <T> ExtensionLoader<T> getExtensionLoader(final Class<T> clazz) {
    return getExtensionLoader(clazz, ExtensionLoader.class.getClassLoader());
}
```

'ExtensionLoader' uses a private constructor, static factory methods, and lazy loading mode. Class loading is not triggered after initializing 'ExtensionLoader'. The actual scanning and loading is delayed until the 'getJoin' series methods are called, where the code is swept and all the method call chains that implement class information are loaded:

```java
// 加载所有扩展类信息，这里采用了DCL（双重锁校验）防止并发加载
private Map<String, ClassEntity> getExtensionClassesEntity() {
    // 缓存不存在
    Map<String, ClassEntity> classes = cachedClasses.getValue();
    if (Objects.isNull(classes)) {
        // 加锁后再检查一次缓存
        synchronized (cachedClasses) {
            classes = cachedClasses.getValue();
            if (Objects.isNull(classes)) {
                // 最终确认缓存不存在，则进行加载，并且标记顺序号为0
                classes = loadExtensionClass();
                cachedClasses.setValue(classes);
                cachedClasses.setOrder(0);
            }
        }
    }
    return classes;
}

// 加载当前ExtensionLoader中clazz的所有SPI系统内的实现类
private Map<String, ClassEntity> loadExtensionClass() {
    SPI annotation = clazz.getAnnotation(SPI.class);
    if (Objects.nonNull(annotation)) {
        // 这里就是前面提到，如果@SPI注解的value()方法非空白返回值会作为默认实现的别名
        // 也就是如果只使用了@SPI，那么就无法获取默认实现
        // 如果使用了@SPI("foo")，可以通过别名foo去映射和获取默认实现
        String value = annotation.value();
        if (StringUtils.isNotBlank(value)) {
            cachedDefaultName = value;
        }
    }
    // 初始化一个Hashmap容器用于存储加载的实现类信息，这个变量会透传到下一个方法链
    Map<String, ClassEntity> classes = new HashMap<>(16);
    // 加载目录中的属性文件
    loadDirectory(classes);
    return classes;
}

// 加载目录中的属性文件，并且加载文件中的实现类，目标目录：META-INF/shenyu/
private void loadDirectory(final Map<String, ClassEntity> classes) {
    // 文件名 => META-INF/shenyu/$className
    String fileName = SHENYU_DIRECTORY + clazz.getName();
    try {
        // 这里使用类加载器加载文件资源，如果传入的类加载器为空会使用系统类加载器
        Enumeration<URL> urls = Objects.nonNull(this.classLoader) ? classLoader.getResources(fileName)
                : ClassLoader.getSystemResources(fileName);
        // 遍历解析的文件URL集合
        if (Objects.nonNull(urls)) {
            while (urls.hasMoreElements()) {
                URL url = urls.nextElement();
                // 通过文件URL加载资源
                loadResources(classes, url);
            }
        }
    } catch (IOException t) {
        LOG.error("load extension class error {}", fileName, t);
    }
}

// 加载文件资源，解析文件并且加载实现类存储到classes中
private void loadResources(final Map<String, ClassEntity> classes, final URL url) throws IOException {
    // 读取URL文件资源，加载到Properties中，每行格式为name=classPath
    try (InputStream inputStream = url.openStream()) {
        Properties properties = new Properties();
        properties.load(inputStream);
        properties.forEach((k, v) -> {
            String name = (String) k;
            String classPath = (String) v;
            if (StringUtils.isNotBlank(name) && StringUtils.isNotBlank(classPath)) {
                try {
                    // 基于name和classPath进行类加载
                    loadClass(classes, name, classPath);
                } catch (ClassNotFoundException e) {
                    throw new IllegalStateException("load extension resources error", e);
                }
            }
        });
    } catch (IOException e) {
        throw new IllegalStateException("load extension resources error", e);
    }
}

// 基于name（别名）和classPath（类全限定名称）进行类加载
private void loadClass(final Map<String, ClassEntity> classes,
                        final String name, final String classPath) throws ClassNotFoundException {
    // 类初始化，并且确定实现类必须是当前@SPI注解标识接口的子类
    Class<?> subClass = Objects.nonNull(this.classLoader) ? Class.forName(classPath, true, this.classLoader) : Class.forName(classPath);
    if (!clazz.isAssignableFrom(subClass)) {
        throw new IllegalStateException("load extension resources error," + subClass + " subtype is not of " + clazz);
    }
    // 实现类必须存在注解@Join
    if (!subClass.isAnnotationPresent(Join.class)) {
        throw new IllegalStateException("load extension resources error," + subClass + " without @" + Join.class + " annotation");
    }
    // 如果缓存中不存在同样别名的实现类才进行缓存，已经存在则校验旧的类型和当前实现类型是否一致
    ClassEntity oldClassEntity = classes.get(name);
    if (Objects.isNull(oldClassEntity)) {
        // 创建类信息实体保存别名、顺序号和实现类并且缓存，映射关系：别名 -> 类信息实体
        Join joinAnnotation = subClass.getAnnotation(Join.class);
        ClassEntity classEntity = new ClassEntity(name, joinAnnotation.order(), subClass);
        classes.put(name, classEntity);
    } else if (!Objects.equals(oldClassEntity.getClazz(), subClass)) {
        throw new IllegalStateException("load extension resources error,Duplicate class " + clazz.getName() + " name "
                + name + " on " + oldClassEntity.getClazz().getName() + " or " + subClass.getName());
    }
}
```

Processing with the chain of method 'getExtensionClassesEntity - > loadExtensionClass - > loadDirectory - > loadResources - > LoadClass',it will create a mapping of 'alias' to 'implementation class information' for subsequent instantiations, as shown in the 'getJoin()' method:

```java
// 基于别名获取实现类实例
public T getJoin(final String name) {
    // 别名必须为非空白字符串
    if (StringUtils.isBlank(name)) {
        throw new NullPointerException("get join name is null");
    }
    // 这里也使用DCL去cachedInstances缓存中取别名对应的值持有器，值持有器为空则创建
    Holder<Object> objectHolder = cachedInstances.get(name);
    if (Objects.isNull(objectHolder)) {
        cachedInstances.putIfAbsent(name, new Holder<>());
        objectHolder = cachedInstances.get(name);
    }
    Object value = objectHolder.getValue();
    if (Objects.isNull(value)) {
        synchronized (cachedInstances) {
            // 加锁后再次判断值持有器中的值是否存在，不存在的时候则进行实现类实例化
            value = objectHolder.getValue();
            if (Objects.isNull(value)) {
                Holder<T> pair = createExtension(name);
                value = pair.getValue();
                int order = pair.getOrder();
                // 实例化完成后更新值持有器缓存
                objectHolder.setValue(value);
                objectHolder.setOrder(order);
            }
        }
    }
    return (T) value;
}

// 基于别名搜索已经加载的实现类信息，并且实例化对应的实现类进行值包装
private Holder<T> createExtension(final String name) {
    // 加载该@SPI标识接口的所有实现类信息并且获取对应别名的实现类信息
    ClassEntity classEntity = getExtensionClassesEntity().get(name);
    if (Objects.isNull(classEntity)) {
        throw new IllegalArgumentException("name is error");
    }
    Class<?> aClass = classEntity.getClazz();
    // 如果实现类实例缓存中已经存在，则直接封装为值包装器返回，否则进行实例化
    Object o = joinInstances.get(aClass);
    if (Objects.isNull(o)) {
        try {
            // 反射实例化并且缓存该实现类实例
            joinInstances.putIfAbsent(aClass, aClass.newInstance());
            o = joinInstances.get(aClass);
        } catch (InstantiationException | IllegalAccessException e) {
            throw new IllegalStateException("Extension instance(name: " + name + ", class: "
                    + aClass + ")  could not be instantiated: " + e.getMessage(), e);
            
        }
    }
    Holder<T> objectHolder = new Holder<>();
    objectHolder.setOrder(classEntity.getOrder());
    objectHolder.setValue((T) o);
    return objectHolder;
}
```

As you can see from the 'createExtension()' method, we end up using reflection to instantiate the implementation class. The reflection method 'newInstance()' requires that the class must provide a no-argument constructor because of an implicit convention: The 'SPI' implementation class **must provide a no-argument constructor** or the instantiation will fail. The rest methods, such as 'getDefaultJoin()' and 'getJoins()' are uncomplicated extensions of 'getJoin()', so we won't analyze them here. In addition, the 'getJoin()' method uses a multilevel cache:

- 'cachedInstances' : Search for the corresponding implementation class instance by alias
- 'joinInstances' : If the alias lookup fails, load all the implementation class information, locate the implementation class type by the alias, and update the' cachedInstances' cache by either finding the implementation class type or creating and caching the implementation class instance

This completes the source code analysis of 'ExtensionLoader'. Here's another example of an 'ExtensionLoader' instance member property memory layout diagram to help you understand:

![spi-attr-memory-debug](/img/activities/code-analysis-spi/spi-attr-memory-debug.png)

### ExtensionFactory

'ExtensionFactory' is the factory interface inside the factory pattern, which defines a method to get an instance of the 'SPI' implementation (the **default implementation, or the only implementation**) :

```java
@SPI("spi")
public interface ExtensionFactory {

    /**
     * Gets Extension.
     *
     * @param <T>   the type parameter
     * @param key   此参数暂时没有使用，猜测是预留用于映射@SPI的value()
     * @param clazz @SPI标识的接口类型
     * @return the extension
     */
    <T> T getExtension(String key, Class<T> clazz);
}
```

Let's look the class 'SpiExtensionFactory' :

```java
@Join
public class SpiExtensionFactory implements ExtensionFactory {

    @Override
    public <T> T getExtension(final String key, final Class<T> clazz) {
        return Optional.ofNullable(clazz)   // 入参clazz非空
                .filter(Class::isInterface)  // 入参clazz必须是接口
                .filter(cls -> cls.isAnnotationPresent(SPI.class))  // 入参clazz必须被@SPI标识
                .map(ExtensionLoader::getExtensionLoader)  // 基于clazz这个接口类型实例化ExtensionLoader
                .map(ExtensionLoader::getDefaultJoin)  // 获取该@SPI标识接口的默认实现，不存在则返回NULL
                .orElse(null);
    }
}
```

It's worth noting here that the 'ExtensionFactory' itself is part of the 'SPI' system. So when using 'ExtensionFactory' you can instantiate it directly:

```java
ExtensionFactory extensionFactory = new SpiExtensionFactory();
```

It can also be loaded based on an 'ExtensionLoader':

```java
# the content of META-INF/services/shenyu/org.apache.shenyu.spi.ExtensionFactory
spi=org.apache.shenyu.spi.SpiExtensionFactory

# then load it with ExtensionLoader
ExtensionFactory extensionFactory = ExtensionLoader.getExtensionLoader(ExtensionFactory.class).getDefaultJoin();
```

Once you have an 'ExtensionFactory' instance, you can load an instance of its default implementation class based on the '@SPI' interface.

## 小结

The 'SPI' extension framework based on the design idea of 'Java' native 'SPI' has the characteristics of loose coupling, high usability and high scalability, a loading instance cache system, concurrency security and other features to fill some defects of 'SPI' in the native 'JDK', Shenyu SPI module is the same. Base on this powerful 'SPI' module, other modules in 'Shenyu' such as the 'Plugin' module can be configured quickly and pluggable, making it easier to load a newly developed Plugin instance.
