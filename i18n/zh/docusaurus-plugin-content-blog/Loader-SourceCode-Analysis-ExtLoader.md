---
title: 扩展插件加载逻辑
author: hql0312
author_title: hql0312 Coder
author_url: https://github.com/hql0312
tags: [plugin,ext,Apache ShenYu]
---

> 本文基于`shenyu-2.6.1`版本进行源码分析.

# 正文

Shenyu 提供了一个种机制来定制自己的插件或是修改已有的插件，在其内部通过extPlugin的配置实现，其需要满足以下两点：
1. 实现接口 `ShenyuPlugin` 或是 `PluginDataHandler`
2. 将实现的包打包后，放置于`shenyu.extPlugin.path`对应的路径下

## 入口

真正实现该逻辑的类是`ShenyuLoaderService`,接下来看下该类是如何处理

```java
    public ShenyuLoaderService(final ShenyuWebHandler webHandler, final CommonPluginDataSubscriber subscriber, final ShenyuConfig shenyuConfig) {
        // 插件信息的信息订阅
        this.subscriber = subscriber;
        // Shenyu封装的WebHandler，包含了所有的插件逻辑
        this.webHandler = webHandler;
        // 配置信息
        this.shenyuConfig = shenyuConfig;
        // 扩展插件的配置信息，如路径，是否启用、开启多少线程来处理、检查加载的频率等信息
        ExtPlugin config = shenyuConfig.getExtPlugin();
        // 如果启用的，则创建定时任务来检查并加载
        if (config.getEnabled()) {
            // 创建一个指定线程名称的定时任务
            ScheduledThreadPoolExecutor executor = new ScheduledThreadPoolExecutor(config.getThreads(), ShenyuThreadFactory.create("plugin-ext-loader", true));
            // 创建固定频率执行的任务，默认在30s，每300s，执行一次
            executor.scheduleAtFixedRate(() -> loadExtOrUploadPlugins(null), config.getScheduleDelay(), config.getScheduleTime(), TimeUnit.SECONDS);
        }
    }
    
```

该类有以下几个属性：

`webHandler`: 该类是shenyu 处理请求的入口，引用了所有的插件数据，在扩展插件加载后，需要进行更新

`subscriber`: 该类是插件的订阅的入口，引用了所有插件的订阅处理类，在扩展配置加载后，也需要进行同步更新

`executor`: 在`ShenyuLoaderService`内部会创建一个定时任务，来定时扫描加载指定路径下的jar包，便于加载扩展的插件，实现动态发现
默认会在启动30秒后，每300秒扫描一次

同时这里可以通过 `shenyu.extPlugin.enabled`配置来决定是否要开启扩展插件功能的启用

以上的配置可以在配置文件中进行调整：

```yaml
shenyu:
  extPlugin:
    path:   # 扩展插件的存储目录
    enabled: true # 是否启用扩展功能
    threads: 1 # 扫描加载的线程数
    scheduleTime: 300 # 任务执行的频率
    scheduleDelay: 30 # 任务启动后多久开始执行
```

接下来看下加载的逻辑：

```java
   public void loadExtOrUploadPlugins(final PluginData uploadedJarResource) {
        try {
            List<ShenyuLoaderResult> plugins = new ArrayList<>();
            // 获取ShenyuPluginClassloader的持有对象
            ShenyuPluginClassloaderHolder singleton = ShenyuPluginClassloaderHolder.getSingleton();
            if (Objects.isNull(uploadedJarResource)) {
                // 参数为空，则从扩展的目录，加载所有的jar包
                // PluginJar：包含ShenyuPlugin接口、PluginDataHandler接口的数据
                List<PluginJarParser.PluginJar> uploadPluginJars = ShenyuExtPathPluginJarLoader.loadExtendPlugins(shenyuConfig.getExtPlugin().getPath());
                // 遍历所有的待加载插件
                for (PluginJarParser.PluginJar extPath : uploadPluginJars) {
                    LOG.info("shenyu extPlugin find new {} to load", extPath.getAbsolutePath());
                    // 使用扩展插件的加载器来加载指定的插件，便于后续的加载和卸载
                    ShenyuPluginClassLoader extPathClassLoader = singleton.createPluginClassLoader(extPath);
                    // 使用ShenyuPluginClassLoader 进行加载
                    // 主要逻辑是：判断是否实现ShenyuPlugin接口、PluginDataHandler接口 或是否标识 @Component\@Service等注解，如果有，则注册为SpringBean
                    // 构造 ShenyuLoaderResult对象
                    plugins.addAll(extPathClassLoader.loadUploadedJarPlugins());
                }
            } else {
                // 加载指定jar，逻辑同加载全部
                PluginJarParser.PluginJar pluginJar = PluginJarParser.parseJar(Base64.getDecoder().decode(uploadedJarResource.getPluginJar()));
                LOG.info("shenyu upload plugin jar find new {} to load", pluginJar.getJarKey());
                ShenyuPluginClassLoader uploadPluginClassLoader = singleton.createPluginClassLoader(pluginJar);
                plugins.addAll(uploadPluginClassLoader.loadUploadedJarPlugins());
            }
            // 将扩展的插件，加入到ShenyuWebHandler的插件列表，后续的请求则会经过加入的插件内容
            loaderPlugins(plugins);
        } catch (Exception e) {
            LOG.error("shenyu plugins load has error ", e);
        }
    }
```

该方法处理的逻辑：
1. 判断参数uploadedJarResource是否有值，如果没有，则会加载全部，否则加载指定资源jar包进行处理
2. 从 `shenyu.extPlugin.path` 中获取到指定jar包，并封装成 PluginJar对象，该对象包含了jar包以下信息
    - version: 版本信息
    - groupId：包的groupId
    - artifactId: 包的 artifactId
    - absolutePath： 绝对路径
    - clazzMap：class对应的字节码
    - resourceMap：jar包的字节码
3. 通过`ShenyuPluginClassloaderHolder`创建对应的ClassLoader,对应的类是`ShenyuPluginClassLoader`, 并进行加载对应的类
    - 调用`ShenyuPluginClassLoader.loadUploadedJarPlugins` 加载对应的类并注册成Spring Bean，这样可以使用Spring容器来管理
4. 调用`loaderPlugins`方法，将扩展的插件更新到 `webHandler` 以及 `subscriber`中

## 插件注册

对于提供的jar包里的内容，加载器只会处理指定接口类型的类，实现逻辑在 `ShenyuPluginClassLoader.loadUploadedJarPlugins()` 方法

```java
public List<ShenyuLoaderResult> loadUploadedJarPlugins() {
        List<ShenyuLoaderResult> results = new ArrayList<>();
        // 所有的类映射关系
        Set<String> names = pluginJar.getClazzMap().keySet();
        // 遍历所有的类
        names.forEach(className -> {
            Object instance;
            try {
                // 尝试创建对象，如果可以，则加入到Spring容器中
                instance = getOrCreateSpringBean(className);
                if (Objects.nonNull(instance)) {
                    // 构建ShenyuLoaderResult对象
                    results.add(buildResult(instance));
                    LOG.info("The class successfully loaded into a upload-Jar-plugin {} is registered as a spring bean", className);
                }
            } catch (ClassNotFoundException | IllegalAccessException | InstantiationException e) {
                LOG.warn("Registering upload-Jar-plugins succeeds spring bean fails:{}", className, e);
            }
        });
        return results;
    }
```

该方法就是负责构建所有符合条件的对象，并封装成 `ShenyuLoaderResult`对象，该对象对于创建后对象，进行了封装，会在方法 `buildResult()`中进行处理

```java
    private ShenyuLoaderResult buildResult(final Object instance) {
        ShenyuLoaderResult result = new ShenyuLoaderResult();
        // 创建的对象是否实现了ShenyuPlugin
        if (instance instanceof ShenyuPlugin) {
            result.setShenyuPlugin((ShenyuPlugin) instance);
            // 创建的对象是否实现了PluginDataHandler
        } else if (instance instanceof PluginDataHandler) {
            result.setPluginDataHandler((PluginDataHandler) instance);
        }
        return result;
    }
```

同时进入方法 `getOrCreateSpringBean()` 进一步分析

```java
    private <T> T getOrCreateSpringBean(final String className) throws ClassNotFoundException, IllegalAccessException, InstantiationException {
        // 确认是否已经注册过了，如果有则不处理，直接返回
        if (SpringBeanUtils.getInstance().existBean(className)) {
            return SpringBeanUtils.getInstance().getBeanByClassName(className);
        }
        lock.lock();
        try {
            // Double check,
            T inst = SpringBeanUtils.getInstance().getBeanByClassName(className);
            if (Objects.isNull(inst)) {
                // 使用 ShenyuPluginClassLoader 进行加载类
                Class<?> clazz = Class.forName(className, false, this);
                //Exclude ShenyuPlugin subclass and PluginDataHandler subclass
                // without adding @Component @Service annotation
                // 确认是否是 ShenyuPlugin 或是 PluginDataHandler的子类
                boolean next = ShenyuPlugin.class.isAssignableFrom(clazz)
                        || PluginDataHandler.class.isAssignableFrom(clazz);
                if (!next) {
                    // 如果不是，确认是否标识了 @Component 与 @Service 注解
                    Annotation[] annotations = clazz.getAnnotations();
                    next = Arrays.stream(annotations).anyMatch(e -> e.annotationType().equals(Component.class)
                            || e.annotationType().equals(Service.class));
                }
                if (next) {
                    // 如果符合以上内容，则注册Bean
                    GenericBeanDefinition beanDefinition = new GenericBeanDefinition();
                    beanDefinition.setBeanClassName(className);
                    beanDefinition.setAutowireCandidate(true);
                    beanDefinition.setRole(BeanDefinition.ROLE_INFRASTRUCTURE);
                    // 注册bean
                    String beanName = SpringBeanUtils.getInstance().registerBean(beanDefinition, this);
                    // 创建对象
                    inst = SpringBeanUtils.getInstance().getBeanByClassName(beanName);
                }
            }
            return inst;
        } finally {
            lock.unlock();
        }
    }
```

逻辑大致如下：
1. 判断是否实现了接口 `ShenyuPlugin` 或 `PluginDataHandler`, 如果没有，则是否标识了 `@Component` 或是 `@Service`
2. 如果符合1的条件，则将该对象注册到Spring 容器，并返回创建的对象

## 同步

在插件注册成功后，这时只是实例化了插件，但它还不会生效，因为它还未添加到 Shenyu的插件链中，同步逻辑由 `loaderPlugins()`方法实现

```java
    private void loaderPlugins(final List<ShenyuLoaderResult> results) {
        if (CollectionUtils.isEmpty(results)) {
            return;
        }
        // 获取所有实现了接口ShenyuPlugin的对象
        List<ShenyuPlugin> shenyuExtendPlugins = results.stream().map(ShenyuLoaderResult::getShenyuPlugin).filter(Objects::nonNull).collect(Collectors.toList());
        // 同步更新webHandler中plugins
        webHandler.putExtPlugins(shenyuExtendPlugins);
        // 获取所有实现了接口PluginDataHandler的对象
        List<PluginDataHandler> handlers = results.stream().map(ShenyuLoaderResult::getPluginDataHandler).filter(Objects::nonNull).collect(Collectors.toList());
        // 同步扩展的PluginDataHandler
        subscriber.putExtendPluginDataHandler(handlers);

    }
```

该方法的逻辑处理了两个数据：
1. 将实现了 `ShenyuPlugin` 接口的数据，同步至 `webHandler`的plugins 列表

```java
    public void putExtPlugins(final List<ShenyuPlugin> extPlugins) {
        if (CollectionUtils.isEmpty(extPlugins)) {
            return;
        }
        // 过滤出新增的插件
        final List<ShenyuPlugin> shenyuAddPlugins = extPlugins.stream()
                .filter(e -> plugins.stream().noneMatch(plugin -> plugin.named().equals(e.named())))
                .collect(Collectors.toList());
        // 过滤出更新的插件，以名称和旧的相同来判断，则为更新
        final List<ShenyuPlugin> shenyuUpdatePlugins = extPlugins.stream()
                .filter(e -> plugins.stream().anyMatch(plugin -> plugin.named().equals(e.named())))
                .collect(Collectors.toList());
        // 如果没有数据，则跳过
        if (CollectionUtils.isEmpty(shenyuAddPlugins) && CollectionUtils.isEmpty(shenyuUpdatePlugins)) {
            return;
        }
        // 复制旧的数据
        // copy new list
        List<ShenyuPlugin> newPluginList = new ArrayList<>(plugins);
        // 添加新的插件数据
        // Add extend plugin from pluginData or shenyu ext-lib
        this.sourcePlugins.addAll(shenyuAddPlugins);
        // 添加新数据
        if (CollectionUtils.isNotEmpty(shenyuAddPlugins)) {
            shenyuAddPlugins.forEach(plugin -> LOG.info("shenyu auto add extends plugins:{}", plugin.named()));
            newPluginList.addAll(shenyuAddPlugins);
        }
        // 修改更新的数据
        if (CollectionUtils.isNotEmpty(shenyuUpdatePlugins)) {
            shenyuUpdatePlugins.forEach(plugin -> LOG.info("shenyu auto update extends plugins:{}", plugin.named()));
            for (ShenyuPlugin updatePlugin : shenyuUpdatePlugins) {
                for (int i = 0; i < newPluginList.size(); i++) {
                    if (newPluginList.get(i).named().equals(updatePlugin.named())) {
                        newPluginList.set(i, updatePlugin);
                    }
                }
                for (int i = 0; i < this.sourcePlugins.size(); i++) {
                    if (this.sourcePlugins.get(i).named().equals(updatePlugin.named())) {
                        this.sourcePlugins.set(i, updatePlugin);
                    }
                }
            }
        }
        // 重新排序
        plugins = sortPlugins(newPluginList);
    }
```

2. 将实现了 `PluginDataHandler` 接口的数据，同步至 `subscriber` 的handlers 列表

```java
    public void putExtendPluginDataHandler(final List<PluginDataHandler> handlers) {
        if (CollectionUtils.isEmpty(handlers)) {
            return;
        }
        // 遍历所有数据
        for (PluginDataHandler handler : handlers) {
            String pluginNamed = handler.pluginNamed();
            // 更新现有的PluginDataHandler列表
            MapUtils.computeIfAbsent(handlerMap, pluginNamed, name -> {
                LOG.info("shenyu auto add extends plugin data handler name is :{}", pluginNamed);
                return handler;
            });
        }
    }
```

至此，扩展插件的加载过程分析结束。
