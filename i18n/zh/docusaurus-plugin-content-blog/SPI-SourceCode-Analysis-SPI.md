---
title: SPI设计实现源码分析
author: Throwable
author_url: https://github.com/zjcscut/
tags: [SPI, Apache ShenYu]
date: 2022-09-12
---

## 背景

最近研读`Apache`开源项目`Shenyu`网关的源码，网关的多个核心组件加载都用到了`SPI`模块。本文就`Shenyu`中的`SPI`设计和源码实现进行分析。

## 什么是SPI

`SPI`就是`Service Provider Interface`，直译"服务提供方接口"，是一种动态的服务发现机制，可以基于接口运行时动态加载接口的实现类（也就是接口编程 + 策略模式 + 配置文件的一种开发模式）。最常见的就是`JDK`内置的数据库驱动接口`java.sql.Driver`，不同的厂商可以对该接口完成不同的实现，例如`MySQL`（`MySQL`驱动包中的`com.mysql.jdbc.Driver`）、`PostgreSQL`（`PostgreSQL`驱动包中的`org.postgresql.Driver`）等等。

![spi-jdk-api-diagram](/img/activities/code-analysis-spi/spi-jdk-api-diagram.png)

`JDK`内置的`SPI`使用方式如下：

- 在类路径的`META-INF/services`目录创建一个以接口全限定名称命名的文件（本质是一个`properties`）文件，例如命名为`java.sql.Driver`
- 该文件中可以指定具体的实现类，也就是每个实现类的全类型限定名为单独一行，例如`META-INF/services/java.sql.Driver`中：

```java
# META-INF/services/java.sql.Driver文件内容
com.mysql.jdbc.Driver
org.postgresql.Driver
```

- 最后通过`java.util.ServiceLoader`对该文件进行加载，实例化接口的对应实现类（这里隐含了一个约定，**所有实现类必须提供无参构造函数**）

底层的实现涉及到类加载、双亲委托模型等内容，这里就不展开。基于这种设计思路，很多主流框架了自实现了一套`SPI`扩展，例如`Dubbo`的`SPI`扩展模块，就是读取类路径下`META-INF/services/dubbo`目录的文件内容进行类加载。`Shenyu-SPI`模块也是沿用类似的设计思路。

## shenyu-spi源码分析

`shenyu-spi`模块十分精炼，代码结构如下：

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

- `ExtensionFactory`：`SPI`加载器工厂，本身也是一个`SPI`，用于基于`SPI`机制加载`ExtensionLoader`实例同时基于`ExtensionLoader`实例获取默认的`SPI`标识接口实现
- `SpiExtensionFactory`：其实就是`ExtensionFactory`的一个实现类
- `SPI`：标识注解，用于标识`SPI`，用于接口上
- `Join`：标识注解，用于实现类上，用于标识该类加入`SPI`系统
- `ExtensionLoader`：`SPI`加载器，类比`java.util.ServiceLoader`，用于加载`SPI`中接口的实现类

接下来细看每个类的源码实现。

### @SPI

`org.apache.shenyu.spi.SPI`作为一个标识注解，主要用于**接口**上，也就是只有使用了`@SPI`的接口才能被`shenyu-spi`加载。这个类的注释中描述到：所有`SPI`系统相关参考`Apache Dubbo`的实现（这一点比较合情理，其实`SPI`扩展已经是一种成熟的方案，实现上大同小异）。该注解只有一个方法：

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

唯一的`value()`方法用于指定默认的`SPI`实现（可选的），后文在展开`ExtensionLoader`时候会说明。

### @Join

`org.apache.shenyu.spi.Join`也是一个标识注解，主要用在使用了`@SPI`注解的接口的**实现类**上，用于标识该类加入`SPI`系统中而后可以被`ExtensionLoader`加载。该注解也只有一个方法：

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
}
```

唯一的`order()`方法用于指定具体的顺序号，单个使用了`@SPI`的接口存在多个使用了`@Join`的实现类的时候，这个顺序号就确定了这些实现类实例的排序（顺序号小的排在前面）。

### ExtensionLoader

`ExtensionLoader`就是"类型扩展加载器"，就是整个`SPI`模块的核心。先看其成员属性：

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
    private final Comparator<Holder<Object>> holderComparator = (o1, o2) -> {
        if (o1.getOrder() > o2.getOrder()) {
            return 1;
        } else if (o1.getOrder() < o2.getOrder()) {
            return -1;
        } else {
            return 0;
        }
    };
    
    // ClassEntity比较器，按照ClassEntity的order降序，也就是顺序号小的排在前面
    private final Comparator<ClassEntity> classEntityComparator = (o1, o2) -> {
        if (o1.getOrder() > o2.getOrder()) {
            return 1;
        } else if (o1.getOrder() < o2.getOrder()) {
            return -1;
        } else {
            return 0;
        }
    };
    
    // 暂时省略其他代码

    // 值持有器，简单VO，用来存储泛型值和值加载顺序
    public static class Holder<T> {
        
        // 这里的值引用是volatile修饰，便于某线程更变另一线程马上读到最新的值
        private volatile T value;
        
        private Integer order;
        // 省略setter和getter代码
    }
    
    // 类实体，主要存放加载的实现类的信息
    static final class ClassEntity {
        
        // 名称，这里是指SPI实现类的别名，不是类名
        private String name;
        
        // 加载顺序号
        private Integer order;
        
        // SPI实现类
        private Class<?> clazz;
        
        private ClassEntity(final String name, final Integer order, final Class<?> clazz) {
            this.name = name;
            this.order = order;
            this.clazz = clazz;
        }
        // 省略setter和getter代码
    }
}
```

分析完成员属性，不难发现下面几点：

- `ExtensionLoader`会存在一个全局的静态缓存`LOADERS`，缓存已经创建的`ExtensionLoader`实例以防止重复创建的性能开销
- 每个`@SPI`标记的接口如果使用`ExtensionLoader`进行加载，都会生成一个全新的`ExtensionLoader`实例
- `@SPI`标记的接口如果有多个实现，那么最终获取到这些实现实例的时候是有序的

接着看其构造函数和静态工厂方法：

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

`ExtensionLoader`使用了私有构造器，使用了静态工厂方法和懒加载模式。初始化`ExtensionLoader`完成后并不会触发类加载工作，真正的扫描和加载行为延迟到调用`getJoin`系列方法执行，这里扫码和加载所有实现类信息的方法调用链：

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

通过方法链`getExtensionClassesEntity -> loadExtensionClass -> loadDirectory -> loadResources -> loadClass`最终得到一个别名`->`实现类信息的映射，用于后续的实例化，见`getJoin()`方法：

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

从`createExtension()`方法中可以看到最终是使用反射方式实例化实现类，反射方法`newInstance()`要求该类必须提供无参构造函数，因为这里有一点隐含的约定：`SPI`实现类**必须提供无参构造函数**，否则会实例化失败。剩余的`getDefaultJoin()`和`getJoins()`是基于`getJoin()`方法进行扩展，功能并不复杂，这里就不展开分析了。另外，在`getJoin()`方法用到了多级缓存：

- `cachedInstances`：通过别名就可以搜索到对应的实现类实例
- `joinInstances`：别名查找失败，则加载所有实现类信息，然后通过别名定位实现类类型，再通过实现类类型查找或者创建并缓存实现类实例后更新`cachedInstances`缓存

到此，`ExtensionLoader`的源码分析完毕。这里再通过一个`ExtensionLoader`实例成员属性内存布局图可以加深理解：

![spi-attr-memory-debug](/img/activities/code-analysis-spi/spi-attr-memory-debug.png)

### ExtensionFactory

`ExtensionFactory`是工厂模式里面的工厂接口，该接口定义了一个获取`SPI`实现（**默认实现，唯一**）实例的方法：

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

接着看其实现类`SpiExtensionFactory`的代码：

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

这里值得注意的是：`ExtensionFactory`本身也是`SPI`系统的一部分。因此使用`ExtensionFactory`的时候可以直接实例化：

```java
ExtensionFactory extensionFactory = new SpiExtensionFactory();
```

也可以基于`ExtensionLoader`进行加载：

```java
# 在类路径META-INF/services/shenyu目录下添加一个属性文件org.apache.shenyu.spi.ExtensionFactory，内容是
spi=org.apache.shenyu.spi.SpiExtensionFactory

# 然后基于ExtensionLoader进行加载
ExtensionFactory extensionFactory = ExtensionLoader.getExtensionLoader(ExtensionFactory.class).getDefaultJoin();
```

得到`ExtensionFactory`实例后就可以基于`@SPI`接口加载其默认实现类的实例。

## 扩展和建议

下面是个人的一些见解。目前来看，`Shenyu`中的`SPI`模块功能是完备的，建议考虑引入两个常用的功能：

- 可以在`Join`注解中添加属性标记`SPI`接口实现类生成的实例是单例还是全新实例，类似于`Spring`中的`Scope`声明（`singleton`或者`prototype`）那样，例如：

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
     * The join class instance should be singleton or not
     * @return true or false
     */
    boolean isSingleton() default true;
}
```

- **可选地**让`SPI`的实现类实现一个初始化器接口，在该实现类实例化后回调初始化器接口方法，例如：

```java
public interface ExtensionInitializer {
    
    void init();  
}

/**
 * demo
 */
@SPI
public interface JdbcSPI {

    String getClassName();
}

@Join
public class MysqlSPI implements JdbcSPI, ExtensionInitializer {

    @Override
    public void init() {
        // callback when MysqlSPI instance init
    }
    
    @Override
    public String getClassName() {
        return "mysql";
    }
}
```

如果添加了这两点，能够满足很多现实场景的需求。另外，`ExtensionLoader`中的两处比较器成员变量可以进行代码精简，例如对`classEntityComparator`而言：

```java
private final Comparator<ClassEntity> classEntityComparator = (o1, o2) -> {
    if (o1.getOrder() > o2.getOrder()) {
        return 1;
    } else if (o1.getOrder() < o2.getOrder()) {
        return -1;
    } else {
        return 0;
    }
};

// 可以精简为Comparator提供的静态工厂方法和方法引用
private final Comparator<ClassEntity> classEntityComparator = Comparator.comparing(ClassEntity::getOrder);
```

## 小结

基于`Java`原生`SPI`设计思路上设计出来的`SPI`框架具备了松耦合、高易用性和高扩展性的特点，并且添加了加载实例缓存、并发安全等特性，填补了原生`JDK`中`SPI`的一些缺陷，`Shenyu`的`SPI`模块也是如此。正是由于此强大的`SPI`模块的存在，`Shenyu`中的其他模块如`Plugin`模块可以实现快速插拔式配置，让加载一个全新开发的插件实例变得更加容易。
