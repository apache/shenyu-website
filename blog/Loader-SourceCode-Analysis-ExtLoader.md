---
title: Extension plugin loading logic
author: hql0312
author_title: hql0312 Coder
author_url: https://github.com/hql0312
tags: [plugin,ext,Apache ShenYu]
---

> This article is based on the source code analysis of version 'shenyu-2.6.1'

# Content

Shenyu provides a mechanism to customize its own plugins or modify existing plugins, which is implemented internally through the configuration of extPlugin. It needs to meet the following two points：
1. Implement interface `ShenyuPlugin` or `PluginDataHandler`.
2. After packaging the implemented package, place it in the corresponding path of 'shenyu. extPlugin. path'.

## Entry

The class that truly implements this logic is' ShenyuLoaderService '. Now let's take a look at how this class handles it.

```java
    public ShenyuLoaderService(final ShenyuWebHandler webHandler, final CommonPluginDataSubscriber subscriber, final ShenyuConfig shenyuConfig) {
        // Information subscription for plugin information
        this.subscriber = subscriber;
        // The WebHandler encapsulated by Shenyu contains all the plugin logic
        this.webHandler = webHandler;
        // configuration information
        this.shenyuConfig = shenyuConfig;
        // The configuration information of the extension plugin, such as path, whether it is enabled, how many threads are enabled to process, and the frequency of loading checks
        ExtPlugin config = shenyuConfig.getExtPlugin();
        // If enabled, create a scheduled task to check and load
        if (config.getEnabled()) {
            // Create a scheduled task with a specified thread name
            ScheduledThreadPoolExecutor executor = new ScheduledThreadPoolExecutor(config.getThreads(), ShenyuThreadFactory.create("plugin-ext-loader", true));
            // Create a task to be executed at a fixed frequency, with a default time of 30 seconds and execution every 300 seconds
            executor.scheduleAtFixedRate(() -> loadExtOrUploadPlugins(null), config.getScheduleDelay(), config.getScheduleTime(), TimeUnit.SECONDS);
        }
    }
    
```

This class has the following properties:

`WebHandler `: This class is the entry point for shenyu to process requests, referencing all plugin data. After the extension plugin is loaded, it needs to be updated.

`Subscriber `: This class is the entry point for the subscription of plugins, referencing the subscription processing classes of all plugins. After the extension configuration is loaded, synchronous updates are also required.

`Executor`: A scheduled task will be created inside' ShenyuLoaderService 'to periodically scan and load jar packages under the specified path, facilitating the loading of extended plugins and achieving dynamic discovery
By default, it will scan every 300 seconds after 30 seconds of startup.

Meanwhile, the decision to enable extension plugin functionality can be made through the configuration of `shenyu. extPlugin. enabled`.

The above configurations can be adjusted in the configuration file:

```yaml
shenyu:
  extPlugin:
    path:   # Storage directory for extension plugins
    enabled: true # Is the extension function enabled
    threads: 1 # Number of threads loaded by scanning
    scheduleTime: 300 # The frequency of task execution
    scheduleDelay: 30 # How long after the task starts to execute
```

Next, let's take a look at the loading logic：

```java
   public void loadExtOrUploadPlugins(final PluginData uploadedJarResource) {
        try {
            List<ShenyuLoaderResult> plugins = new ArrayList<>();
            // Obtain the holding object of ShenyuPluginClassloader
            ShenyuPluginClassloaderHolder singleton = ShenyuPluginClassloaderHolder.getSingleton();
            if (Objects.isNull(uploadedJarResource)) {
                // If the parameter is empty, load all jar packages from the extended directory
                // PluginJar: Data containing the ShenyuPlugin interface and PluginDataHandler interface
                List<PluginJarParser.PluginJar> uploadPluginJars = ShenyuExtPathPluginJarLoader.loadExtendPlugins(shenyuConfig.getExtPlugin().getPath());
                // Traverse all pending plugins
                for (PluginJarParser.PluginJar extPath : uploadPluginJars) {
                    LOG.info("shenyu extPlugin find new {} to load", extPath.getAbsolutePath());
                    // Use the loader of the extension plugin to load the specified plugin, facilitating subsequent loading and unloading
                    ShenyuPluginClassLoader extPathClassLoader = singleton.createPluginClassLoader(extPath);
                    // Using ShenyuPluginClassLoader for loading
                    // The main logic is to determine whether to implement ShenyuPlugin interface, PluginDataHandler interface, or identify annotations such as @ Component \ @ Service. If so, register as SpringBean
                    // Construct ShenyuLoaderResult object
                    plugins.addAll(extPathClassLoader.loadUploadedJarPlugins());
                }
            } else {
                // Load the specified jar, with the same logic as loading all
                PluginJarParser.PluginJar pluginJar = PluginJarParser.parseJar(Base64.getDecoder().decode(uploadedJarResource.getPluginJar()));
                LOG.info("shenyu upload plugin jar find new {} to load", pluginJar.getJarKey());
                ShenyuPluginClassLoader uploadPluginClassLoader = singleton.createPluginClassLoader(pluginJar);
                plugins.addAll(uploadPluginClassLoader.loadUploadedJarPlugins());
            }
            // Add the extended plugins to the plugin list of ShenyuWebHandler, and subsequent requests will go through the added plugin content
            loaderPlugins(plugins);
        } catch (Exception e) {
            LOG.error("shenyu plugins load has error ", e);
        }
    }
```

The logic processed by this method:

1. Check if the parameter uploadedJarResource has a value. If not, all will be loaded. Otherwise, load the specified resource jar package for processing.

2. Retrieve the specified jar package from `shenyu. extPlugin. path` and encapsulate it as a PluginJar object, which contains the following information about the jar package:
   - version: version information

   - groupId: The groupId of the package

   - artifactId: The artifactId of the package

   - absolutePath: Absolute path

   - clazzMap: Bytecode corresponding to class

   - resourceMap: Bytecode of jar package

3. Create a corresponding ClassLoader using `ShenyuPluginClassloaderHolder`, with the corresponding class being 'ShenyuPluginClassLoader', and load the corresponding class accordingly.

   - Call `ShenyuPluginClassLoader. loadUploadedJarPlugins` to load the corresponding class and register it as a Spring Bean, which can be managed using the Spring container

4. Call the `loaderPlugins` method to update the extended plugin to'`webHandler` and `subscriber`.

## Plugin Registration

For the content in the provided jar package, the loader will only handle classes of the specified interface type, and the implementation logic is in the `ShenyuPluginClassLoader.loadUploadedJarPlugins()` method.

```java
public List<ShenyuLoaderResult> loadUploadedJarPlugins() {
        List<ShenyuLoaderResult> results = new ArrayList<>();
        // All class mapping relationships
        Set<String> names = pluginJar.getClazzMap().keySet();
        // Traverse all classes
        names.forEach(className -> {
            Object instance;
            try {
                // Try creating objects and, if possible, add them to the Spring container
                instance = getOrCreateSpringBean(className);
                if (Objects.nonNull(instance)) {
                    // Building the ShenyuLoaderResult object
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

This method is responsible for building all eligible objects and encapsulating them into a `ShenyuLoaderResult` object. This object is encapsulated for the created object and will be processed in the method `buildResult()`.

```java
    private ShenyuLoaderResult buildResult(final Object instance) {
        ShenyuLoaderResult result = new ShenyuLoaderResult();
        // Does the created object implement ShenyuPlugin
        if (instance instanceof ShenyuPlugin) {
            result.setShenyuPlugin((ShenyuPlugin) instance);
            // Does the created object implement PluginDataHandler
        } else if (instance instanceof PluginDataHandler) {
            result.setPluginDataHandler((PluginDataHandler) instance);
        }
        return result;
    }
```

Simultaneously enter the method `getOrCreatSpringBean()` for further analysis:

```java
    private <T> T getOrCreateSpringBean(final String className) throws ClassNotFoundException, IllegalAccessException, InstantiationException {
        // Confirm if it has been registered. If so, do not process it and return directly
        if (SpringBeanUtils.getInstance().existBean(className)) {
            return SpringBeanUtils.getInstance().getBeanByClassName(className);
        }
        lock.lock();
        try {
            // Double check,
            T inst = SpringBeanUtils.getInstance().getBeanByClassName(className);
            if (Objects.isNull(inst)) {
                // Using ShenyuPluginClassLoader to load classes
                Class<?> clazz = Class.forName(className, false, this);
                //Exclude ShenyuPlugin subclass and PluginDataHandler subclass
                // without adding @Component @Service annotation
                // Confirm if it is a subclass of ShenyuPlugin or PluginDataHandler
                boolean next = ShenyuPlugin.class.isAssignableFrom(clazz)
                        || PluginDataHandler.class.isAssignableFrom(clazz);
                if (!next) {
                    // If not, confirm if @ Component and @ Service annotations are identified
                    Annotation[] annotations = clazz.getAnnotations();
                    next = Arrays.stream(annotations).anyMatch(e -> e.annotationType().equals(Component.class)
                            || e.annotationType().equals(Service.class));
                }
                if (next) {
                    // If the above content is met, register the bean
                    GenericBeanDefinition beanDefinition = new GenericBeanDefinition();
                    beanDefinition.setBeanClassName(className);
                    beanDefinition.setAutowireCandidate(true);
                    beanDefinition.setRole(BeanDefinition.ROLE_INFRASTRUCTURE);
                    // Registering beans
                    String beanName = SpringBeanUtils.getInstance().registerBean(beanDefinition, this);
                    // create object
                    inst = SpringBeanUtils.getInstance().getBeanByClassName(beanName);
                }
            }
            return inst;
        } finally {
            lock.unlock();
        }
    }
```

The logic is roughly as follows:
1. Check if the interface `ShenyuPlugin` or `PluginDataHandler` has been implemented. If not, check if `@Component` or `@Service` has been identified`.
2. If the condition of 1 is met, register the object in the Spring container and return the created object.

## Sync Data

After the plugin registration is successful, the plugin is only instantiated, but it will not take effect yet because it has not been added to Shenyu's plugin chain. The synchronization logic is implemented by the `loaderPlugins()` method.

```java
    private void loaderPlugins(final List<ShenyuLoaderResult> results) {
        if (CollectionUtils.isEmpty(results)) {
            return;
        }
        // Get all objects that implement the interface ShenyuPlugin
        List<ShenyuPlugin> shenyuExtendPlugins = results.stream().map(ShenyuLoaderResult::getShenyuPlugin).filter(Objects::nonNull).collect(Collectors.toList());
        // Synchronize updating plugins in webHandler
        webHandler.putExtPlugins(shenyuExtendPlugins);
        // Get all objects that implement the interface PluginDataHandler
        List<PluginDataHandler> handlers = results.stream().map(ShenyuLoaderResult::getPluginDataHandler).filter(Objects::nonNull).collect(Collectors.toList());
        // Synchronize updating handlers in subscriber
        subscriber.putExtendPluginDataHandler(handlers);

    }
```

The logic of this method processes two data points:
1. Synchronize the data that implements the `ShenyuPlugin` interface to the plugins list of  `webHandler`.

```java
    public void putExtPlugins(final List<ShenyuPlugin> extPlugins) {
        if (CollectionUtils.isEmpty(extPlugins)) {
            return;
        }
        // Filter out newly added plugins
        final List<ShenyuPlugin> shenyuAddPlugins = extPlugins.stream()
                .filter(e -> plugins.stream().noneMatch(plugin -> plugin.named().equals(e.named())))
                .collect(Collectors.toList());
        // Filter out updated plugins and determine if they have the same name as the old one, then it is an update
        final List<ShenyuPlugin> shenyuUpdatePlugins = extPlugins.stream()
                .filter(e -> plugins.stream().anyMatch(plugin -> plugin.named().equals(e.named())))
                .collect(Collectors.toList());
        // If there is no data, skip
        if (CollectionUtils.isEmpty(shenyuAddPlugins) && CollectionUtils.isEmpty(shenyuUpdatePlugins)) {
            return;
        }
        // Copy old data
        // copy new list
        List<ShenyuPlugin> newPluginList = new ArrayList<>(plugins);
        // Add new plugin data
        // Add extend plugin from pluginData or shenyu ext-lib
        this.sourcePlugins.addAll(shenyuAddPlugins);
        // Add new data
        if (CollectionUtils.isNotEmpty(shenyuAddPlugins)) {
            shenyuAddPlugins.forEach(plugin -> LOG.info("shenyu auto add extends plugins:{}", plugin.named()));
            newPluginList.addAll(shenyuAddPlugins);
        }
        // Modify updated data
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
        // REORDER
        plugins = sortPlugins(newPluginList);
    }
```

2. Synchronize the data that implements the `PluginDataHandler` interface to the handlers list of the `subscriber`.

```java
    public void putExtendPluginDataHandler(final List<PluginDataHandler> handlers) {
        if (CollectionUtils.isEmpty(handlers)) {
            return;
        }
        // Traverse all data
        for (PluginDataHandler handler : handlers) {
            String pluginNamed = handler.pluginNamed();
            // Update existing PluginDataHandler list
            MapUtils.computeIfAbsent(handlerMap, pluginNamed, name -> {
                LOG.info("shenyu auto add extends plugin data handler name is :{}", pluginNamed);
                return handler;
            });
        }
    }
```

At this point, the analysis of the loading process of the extension plugin is completed.
