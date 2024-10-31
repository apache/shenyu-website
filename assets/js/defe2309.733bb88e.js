"use strict";(self.webpackChunkshenyu_website=self.webpackChunkshenyu_website||[]).push([[91129],{15680:(e,n,a)=>{a.d(n,{xA:()=>g,yg:()=>h});var t=a(96540);function i(e,n,a){return n in e?Object.defineProperty(e,n,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[n]=a,e}function l(e,n){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);n&&(t=t.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),a.push.apply(a,t)}return a}function s(e){for(var n=1;n<arguments.length;n++){var a=null!=arguments[n]?arguments[n]:{};n%2?l(Object(a),!0).forEach((function(n){i(e,n,a[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):l(Object(a)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(a,n))}))}return e}function r(e,n){if(null==e)return{};var a,t,i=function(e,n){if(null==e)return{};var a,t,i={},l=Object.keys(e);for(t=0;t<l.length;t++)a=l[t],n.indexOf(a)>=0||(i[a]=e[a]);return i}(e,n);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(t=0;t<l.length;t++)a=l[t],n.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(i[a]=e[a])}return i}var o=t.createContext({}),u=function(e){var n=t.useContext(o),a=n;return e&&(a="function"==typeof e?e(n):s(s({},n),e)),a},g=function(e){var n=u(e.components);return t.createElement(o.Provider,{value:n},e.children)},d="mdxType",c={inlineCode:"code",wrapper:function(e){var n=e.children;return t.createElement(t.Fragment,{},n)}},p=t.forwardRef((function(e,n){var a=e.components,i=e.mdxType,l=e.originalType,o=e.parentName,g=r(e,["components","mdxType","originalType","parentName"]),d=u(a),p=i,h=d["".concat(o,".").concat(p)]||d[p]||c[p]||l;return a?t.createElement(h,s(s({ref:n},g),{},{components:a})):t.createElement(h,s({ref:n},g))}));function h(e,n){var a=arguments,i=n&&n.mdxType;if("string"==typeof e||i){var l=a.length,s=new Array(l);s[0]=p;var r={};for(var o in n)hasOwnProperty.call(n,o)&&(r[o]=n[o]);r.originalType=e,r[d]="string"==typeof e?e:i,s[1]=r;for(var u=2;u<l;u++)s[u]=a[u];return t.createElement.apply(null,s)}return t.createElement.apply(null,a)}p.displayName="MDXCreateElement"},68437:(e,n,a)=>{a.r(n),a.d(n,{contentTitle:()=>s,default:()=>d,frontMatter:()=>l,metadata:()=>r,toc:()=>o});var t=a(58168),i=(a(96540),a(15680));const l={title:"Extension plugin loading logic",author:"hql0312",author_title:"hql0312 Coder",author_url:"https://github.com/hql0312",tags:["plugin","ext","Apache ShenYu"]},s=void 0,r={permalink:"/blog/Loader-SourceCode-Analysis-ExtLoader",editUrl:"https://github.com/apache/shenyu-website/edit/main/blog/Loader-SourceCode-Analysis-ExtLoader.md",source:"@site/blog/Loader-SourceCode-Analysis-ExtLoader.md",title:"Extension plugin loading logic",description:"This article is based on the source code analysis of version 'shenyu-2.6.1'",date:"2024-10-31T02:16:18.078Z",formattedDate:"October 31, 2024",tags:[{label:"plugin",permalink:"/blog/tags/plugin"},{label:"ext",permalink:"/blog/tags/ext"},{label:"Apache ShenYu",permalink:"/blog/tags/apache-shen-yu"}],readingTime:7.9,truncated:!1,prevItem:{title:"Etcd Data Synchronization Source Code Analysis",permalink:"/blog/DataSync-SourceCode-Analysis-Etcd-Data-Sync"},nextItem:{title:"Code Analysis For Context-Path Plugin",permalink:"/blog/Plugin-SourceCode-Analysis-Context-Path-Plugin"}},o=[{value:"Entry",id:"entry",children:[]},{value:"Plugin Registration",id:"plugin-registration",children:[]},{value:"Sync Data",id:"sync-data",children:[]}],u={toc:o},g="wrapper";function d(e){let{components:n,...a}=e;return(0,i.yg)(g,(0,t.A)({},u,a,{components:n,mdxType:"MDXLayout"}),(0,i.yg)("blockquote",null,(0,i.yg)("p",{parentName:"blockquote"},"This article is based on the source code analysis of version 'shenyu-2.6.1'")),(0,i.yg)("h1",{id:"content"},"Content"),(0,i.yg)("p",null,"Shenyu provides a mechanism to customize its own plugins or modify existing plugins, which is implemented internally through the configuration of extPlugin. It needs to meet the following two points\uff1a"),(0,i.yg)("ol",null,(0,i.yg)("li",{parentName:"ol"},"Implement interface ",(0,i.yg)("inlineCode",{parentName:"li"},"ShenyuPlugin")," or ",(0,i.yg)("inlineCode",{parentName:"li"},"PluginDataHandler"),"."),(0,i.yg)("li",{parentName:"ol"},"After packaging the implemented package, place it in the corresponding path of 'shenyu. extPlugin. path'.")),(0,i.yg)("h2",{id:"entry"},"Entry"),(0,i.yg)("p",null,"The class that truly implements this logic is' ShenyuLoaderService '. Now let's take a look at how this class handles it."),(0,i.yg)("pre",null,(0,i.yg)("code",{parentName:"pre",className:"language-java"},'    public ShenyuLoaderService(final ShenyuWebHandler webHandler, final CommonPluginDataSubscriber subscriber, final ShenyuConfig shenyuConfig) {\n        // Information subscription for plugin information\n        this.subscriber = subscriber;\n        // The WebHandler encapsulated by Shenyu contains all the plugin logic\n        this.webHandler = webHandler;\n        // configuration information\n        this.shenyuConfig = shenyuConfig;\n        // The configuration information of the extension plugin, such as path, whether it is enabled, how many threads are enabled to process, and the frequency of loading checks\n        ExtPlugin config = shenyuConfig.getExtPlugin();\n        // If enabled, create a scheduled task to check and load\n        if (config.getEnabled()) {\n            // Create a scheduled task with a specified thread name\n            ScheduledThreadPoolExecutor executor = new ScheduledThreadPoolExecutor(config.getThreads(), ShenyuThreadFactory.create("plugin-ext-loader", true));\n            // Create a task to be executed at a fixed frequency, with a default time of 30 seconds and execution every 300 seconds\n            executor.scheduleAtFixedRate(() -> loadExtOrUploadPlugins(null), config.getScheduleDelay(), config.getScheduleTime(), TimeUnit.SECONDS);\n        }\n    }\n    \n')),(0,i.yg)("p",null,"This class has the following properties:"),(0,i.yg)("p",null,(0,i.yg)("inlineCode",{parentName:"p"},"WebHandler"),": This class is the entry point for shenyu to process requests, referencing all plugin data. After the extension plugin is loaded, it needs to be updated."),(0,i.yg)("p",null,(0,i.yg)("inlineCode",{parentName:"p"},"Subscriber"),": This class is the entry point for the subscription of plugins, referencing the subscription processing classes of all plugins. After the extension configuration is loaded, synchronous updates are also required."),(0,i.yg)("p",null,(0,i.yg)("inlineCode",{parentName:"p"},"Executor"),": A scheduled task will be created inside' ShenyuLoaderService 'to periodically scan and load jar packages under the specified path, facilitating the loading of extended plugins and achieving dynamic discovery\nBy default, it will scan every 300 seconds after 30 seconds of startup."),(0,i.yg)("p",null,"Meanwhile, the decision to enable extension plugin functionality can be made through the configuration of ",(0,i.yg)("inlineCode",{parentName:"p"},"shenyu. extPlugin. enabled"),"."),(0,i.yg)("p",null,"The above configurations can be adjusted in the configuration file:"),(0,i.yg)("pre",null,(0,i.yg)("code",{parentName:"pre",className:"language-yaml"},"shenyu:\n  extPlugin:\n    path:   # Storage directory for extension plugins\n    enabled: true # Is the extension function enabled\n    threads: 1 # Number of threads loaded by scanning\n    scheduleTime: 300 # The frequency of task execution\n    scheduleDelay: 30 # How long after the task starts to execute\n")),(0,i.yg)("p",null,"Next, let's take a look at the loading logic\uff1a"),(0,i.yg)("pre",null,(0,i.yg)("code",{parentName:"pre",className:"language-java"},'   public void loadExtOrUploadPlugins(final PluginData uploadedJarResource) {\n        try {\n            List<ShenyuLoaderResult> plugins = new ArrayList<>();\n            // Obtain the holding object of ShenyuPluginClassloader\n            ShenyuPluginClassloaderHolder singleton = ShenyuPluginClassloaderHolder.getSingleton();\n            if (Objects.isNull(uploadedJarResource)) {\n                // If the parameter is empty, load all jar packages from the extended directory\n                // PluginJar: Data containing the ShenyuPlugin interface and PluginDataHandler interface\n                List<PluginJarParser.PluginJar> uploadPluginJars = ShenyuExtPathPluginJarLoader.loadExtendPlugins(shenyuConfig.getExtPlugin().getPath());\n                // Traverse all pending plugins\n                for (PluginJarParser.PluginJar extPath : uploadPluginJars) {\n                    LOG.info("shenyu extPlugin find new {} to load", extPath.getAbsolutePath());\n                    // Use the loader of the extension plugin to load the specified plugin, facilitating subsequent loading and unloading\n                    ShenyuPluginClassLoader extPathClassLoader = singleton.createPluginClassLoader(extPath);\n                    // Using ShenyuPluginClassLoader for loading\n                    // The main logic is to determine whether to implement ShenyuPlugin interface, PluginDataHandler interface, or identify annotations such as @ Component \\ @ Service. If so, register as SpringBean\n                    // Construct ShenyuLoaderResult object\n                    plugins.addAll(extPathClassLoader.loadUploadedJarPlugins());\n                }\n            } else {\n                // Load the specified jar, with the same logic as loading all\n                PluginJarParser.PluginJar pluginJar = PluginJarParser.parseJar(Base64.getDecoder().decode(uploadedJarResource.getPluginJar()));\n                LOG.info("shenyu upload plugin jar find new {} to load", pluginJar.getJarKey());\n                ShenyuPluginClassLoader uploadPluginClassLoader = singleton.createPluginClassLoader(pluginJar);\n                plugins.addAll(uploadPluginClassLoader.loadUploadedJarPlugins());\n            }\n            // Add the extended plugins to the plugin list of ShenyuWebHandler, and subsequent requests will go through the added plugin content\n            loaderPlugins(plugins);\n        } catch (Exception e) {\n            LOG.error("shenyu plugins load has error ", e);\n        }\n    }\n')),(0,i.yg)("p",null,"The logic processed by this method:"),(0,i.yg)("ol",null,(0,i.yg)("li",{parentName:"ol"},(0,i.yg)("p",{parentName:"li"},"Check if the parameter uploadedJarResource has a value. If not, all will be loaded. Otherwise, load the specified resource jar package for processing.")),(0,i.yg)("li",{parentName:"ol"},(0,i.yg)("p",{parentName:"li"},"Retrieve the specified jar package from ",(0,i.yg)("inlineCode",{parentName:"p"},"shenyu. extPlugin. path")," and encapsulate it as a PluginJar object, which contains the following information about the jar package:"),(0,i.yg)("ul",{parentName:"li"},(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("p",{parentName:"li"},"version: version information")),(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("p",{parentName:"li"},"groupId: The groupId of the package")),(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("p",{parentName:"li"},"artifactId: The artifactId of the package")),(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("p",{parentName:"li"},"absolutePath: Absolute path")),(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("p",{parentName:"li"},"clazzMap: Bytecode corresponding to class")),(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("p",{parentName:"li"},"resourceMap: Bytecode of jar package")))),(0,i.yg)("li",{parentName:"ol"},(0,i.yg)("p",{parentName:"li"},"Create a corresponding ClassLoader using ",(0,i.yg)("inlineCode",{parentName:"p"},"ShenyuPluginClassloaderHolder"),", with the corresponding class being 'ShenyuPluginClassLoader', and load the corresponding class accordingly."),(0,i.yg)("ul",{parentName:"li"},(0,i.yg)("li",{parentName:"ul"},"Call ",(0,i.yg)("inlineCode",{parentName:"li"},"ShenyuPluginClassLoader. loadUploadedJarPlugins")," to load the corresponding class and register it as a Spring Bean, which can be managed using the Spring container"))),(0,i.yg)("li",{parentName:"ol"},(0,i.yg)("p",{parentName:"li"},"Call the ",(0,i.yg)("inlineCode",{parentName:"p"},"loaderPlugins")," method to update the extended plugin to'",(0,i.yg)("inlineCode",{parentName:"p"},"webHandler")," and ",(0,i.yg)("inlineCode",{parentName:"p"},"subscriber"),"."))),(0,i.yg)("h2",{id:"plugin-registration"},"Plugin Registration"),(0,i.yg)("p",null,"For the content in the provided jar package, the loader will only handle classes of the specified interface type, and the implementation logic is in the ",(0,i.yg)("inlineCode",{parentName:"p"},"ShenyuPluginClassLoader.loadUploadedJarPlugins()")," method."),(0,i.yg)("pre",null,(0,i.yg)("code",{parentName:"pre",className:"language-java"},'public List<ShenyuLoaderResult> loadUploadedJarPlugins() {\n        List<ShenyuLoaderResult> results = new ArrayList<>();\n        // All class mapping relationships\n        Set<String> names = pluginJar.getClazzMap().keySet();\n        // Traverse all classes\n        names.forEach(className -> {\n            Object instance;\n            try {\n                // Try creating objects and, if possible, add them to the Spring container\n                instance = getOrCreateSpringBean(className);\n                if (Objects.nonNull(instance)) {\n                    // Building the ShenyuLoaderResult object\n                    results.add(buildResult(instance));\n                    LOG.info("The class successfully loaded into a upload-Jar-plugin {} is registered as a spring bean", className);\n                }\n            } catch (ClassNotFoundException | IllegalAccessException | InstantiationException e) {\n                LOG.warn("Registering upload-Jar-plugins succeeds spring bean fails:{}", className, e);\n            }\n        });\n        return results;\n    }\n')),(0,i.yg)("p",null,"This method is responsible for building all eligible objects and encapsulating them into a ",(0,i.yg)("inlineCode",{parentName:"p"},"ShenyuLoaderResult")," object. This object is encapsulated for the created object and will be processed in the method ",(0,i.yg)("inlineCode",{parentName:"p"},"buildResult()"),"."),(0,i.yg)("pre",null,(0,i.yg)("code",{parentName:"pre",className:"language-java"},"    private ShenyuLoaderResult buildResult(final Object instance) {\n        ShenyuLoaderResult result = new ShenyuLoaderResult();\n        // Does the created object implement ShenyuPlugin\n        if (instance instanceof ShenyuPlugin) {\n            result.setShenyuPlugin((ShenyuPlugin) instance);\n            // Does the created object implement PluginDataHandler\n        } else if (instance instanceof PluginDataHandler) {\n            result.setPluginDataHandler((PluginDataHandler) instance);\n        }\n        return result;\n    }\n")),(0,i.yg)("p",null,"Simultaneously enter the method ",(0,i.yg)("inlineCode",{parentName:"p"},"getOrCreatSpringBean()")," for further analysis:"),(0,i.yg)("pre",null,(0,i.yg)("code",{parentName:"pre",className:"language-java"},"    private <T> T getOrCreateSpringBean(final String className) throws ClassNotFoundException, IllegalAccessException, InstantiationException {\n        // Confirm if it has been registered. If so, do not process it and return directly\n        if (SpringBeanUtils.getInstance().existBean(className)) {\n            return SpringBeanUtils.getInstance().getBeanByClassName(className);\n        }\n        lock.lock();\n        try {\n            // Double check,\n            T inst = SpringBeanUtils.getInstance().getBeanByClassName(className);\n            if (Objects.isNull(inst)) {\n                // Using ShenyuPluginClassLoader to load classes\n                Class<?> clazz = Class.forName(className, false, this);\n                //Exclude ShenyuPlugin subclass and PluginDataHandler subclass\n                // without adding @Component @Service annotation\n                // Confirm if it is a subclass of ShenyuPlugin or PluginDataHandler\n                boolean next = ShenyuPlugin.class.isAssignableFrom(clazz)\n                        || PluginDataHandler.class.isAssignableFrom(clazz);\n                if (!next) {\n                    // If not, confirm if @ Component and @ Service annotations are identified\n                    Annotation[] annotations = clazz.getAnnotations();\n                    next = Arrays.stream(annotations).anyMatch(e -> e.annotationType().equals(Component.class)\n                            || e.annotationType().equals(Service.class));\n                }\n                if (next) {\n                    // If the above content is met, register the bean\n                    GenericBeanDefinition beanDefinition = new GenericBeanDefinition();\n                    beanDefinition.setBeanClassName(className);\n                    beanDefinition.setAutowireCandidate(true);\n                    beanDefinition.setRole(BeanDefinition.ROLE_INFRASTRUCTURE);\n                    // Registering beans\n                    String beanName = SpringBeanUtils.getInstance().registerBean(beanDefinition, this);\n                    // create object\n                    inst = SpringBeanUtils.getInstance().getBeanByClassName(beanName);\n                }\n            }\n            return inst;\n        } finally {\n            lock.unlock();\n        }\n    }\n")),(0,i.yg)("p",null,"The logic is roughly as follows:"),(0,i.yg)("ol",null,(0,i.yg)("li",{parentName:"ol"},"Check if the interface ",(0,i.yg)("inlineCode",{parentName:"li"},"ShenyuPlugin")," or ",(0,i.yg)("inlineCode",{parentName:"li"},"PluginDataHandler")," has been implemented. If not, check if ",(0,i.yg)("inlineCode",{parentName:"li"},"@Component")," or ",(0,i.yg)("inlineCode",{parentName:"li"},"@Service")," has been identified`."),(0,i.yg)("li",{parentName:"ol"},"If the condition of 1 is met, register the object in the Spring container and return the created object.")),(0,i.yg)("h2",{id:"sync-data"},"Sync Data"),(0,i.yg)("p",null,"After the plugin registration is successful, the plugin is only instantiated, but it will not take effect yet because it has not been added to Shenyu's plugin chain. The synchronization logic is implemented by the ",(0,i.yg)("inlineCode",{parentName:"p"},"loaderPlugins()")," method."),(0,i.yg)("pre",null,(0,i.yg)("code",{parentName:"pre",className:"language-java"},"    private void loaderPlugins(final List<ShenyuLoaderResult> results) {\n        if (CollectionUtils.isEmpty(results)) {\n            return;\n        }\n        // Get all objects that implement the interface ShenyuPlugin\n        List<ShenyuPlugin> shenyuExtendPlugins = results.stream().map(ShenyuLoaderResult::getShenyuPlugin).filter(Objects::nonNull).collect(Collectors.toList());\n        // Synchronize updating plugins in webHandler\n        webHandler.putExtPlugins(shenyuExtendPlugins);\n        // Get all objects that implement the interface PluginDataHandler\n        List<PluginDataHandler> handlers = results.stream().map(ShenyuLoaderResult::getPluginDataHandler).filter(Objects::nonNull).collect(Collectors.toList());\n        // Synchronize updating handlers in subscriber\n        subscriber.putExtendPluginDataHandler(handlers);\n\n    }\n")),(0,i.yg)("p",null,"The logic of this method processes two data points:"),(0,i.yg)("ol",null,(0,i.yg)("li",{parentName:"ol"},"Synchronize the data that implements the ",(0,i.yg)("inlineCode",{parentName:"li"},"ShenyuPlugin")," interface to the plugins list of  ",(0,i.yg)("inlineCode",{parentName:"li"},"webHandler"),".")),(0,i.yg)("pre",null,(0,i.yg)("code",{parentName:"pre",className:"language-java"},'    public void putExtPlugins(final List<ShenyuPlugin> extPlugins) {\n        if (CollectionUtils.isEmpty(extPlugins)) {\n            return;\n        }\n        // Filter out newly added plugins\n        final List<ShenyuPlugin> shenyuAddPlugins = extPlugins.stream()\n                .filter(e -> plugins.stream().noneMatch(plugin -> plugin.named().equals(e.named())))\n                .collect(Collectors.toList());\n        // Filter out updated plugins and determine if they have the same name as the old one, then it is an update\n        final List<ShenyuPlugin> shenyuUpdatePlugins = extPlugins.stream()\n                .filter(e -> plugins.stream().anyMatch(plugin -> plugin.named().equals(e.named())))\n                .collect(Collectors.toList());\n        // If there is no data, skip\n        if (CollectionUtils.isEmpty(shenyuAddPlugins) && CollectionUtils.isEmpty(shenyuUpdatePlugins)) {\n            return;\n        }\n        // Copy old data\n        // copy new list\n        List<ShenyuPlugin> newPluginList = new ArrayList<>(plugins);\n        // Add new plugin data\n        // Add extend plugin from pluginData or shenyu ext-lib\n        this.sourcePlugins.addAll(shenyuAddPlugins);\n        // Add new data\n        if (CollectionUtils.isNotEmpty(shenyuAddPlugins)) {\n            shenyuAddPlugins.forEach(plugin -> LOG.info("shenyu auto add extends plugins:{}", plugin.named()));\n            newPluginList.addAll(shenyuAddPlugins);\n        }\n        // Modify updated data\n        if (CollectionUtils.isNotEmpty(shenyuUpdatePlugins)) {\n            shenyuUpdatePlugins.forEach(plugin -> LOG.info("shenyu auto update extends plugins:{}", plugin.named()));\n            for (ShenyuPlugin updatePlugin : shenyuUpdatePlugins) {\n                for (int i = 0; i < newPluginList.size(); i++) {\n                    if (newPluginList.get(i).named().equals(updatePlugin.named())) {\n                        newPluginList.set(i, updatePlugin);\n                    }\n                }\n                for (int i = 0; i < this.sourcePlugins.size(); i++) {\n                    if (this.sourcePlugins.get(i).named().equals(updatePlugin.named())) {\n                        this.sourcePlugins.set(i, updatePlugin);\n                    }\n                }\n            }\n        }\n        // REORDER\n        plugins = sortPlugins(newPluginList);\n    }\n')),(0,i.yg)("ol",{start:2},(0,i.yg)("li",{parentName:"ol"},"Synchronize the data that implements the ",(0,i.yg)("inlineCode",{parentName:"li"},"PluginDataHandler")," interface to the handlers list of the ",(0,i.yg)("inlineCode",{parentName:"li"},"subscriber"),".")),(0,i.yg)("pre",null,(0,i.yg)("code",{parentName:"pre",className:"language-java"},'    public void putExtendPluginDataHandler(final List<PluginDataHandler> handlers) {\n        if (CollectionUtils.isEmpty(handlers)) {\n            return;\n        }\n        // Traverse all data\n        for (PluginDataHandler handler : handlers) {\n            String pluginNamed = handler.pluginNamed();\n            // Update existing PluginDataHandler list\n            MapUtils.computeIfAbsent(handlerMap, pluginNamed, name -> {\n                LOG.info("shenyu auto add extends plugin data handler name is :{}", pluginNamed);\n                return handler;\n            });\n        }\n    }\n')),(0,i.yg)("p",null,"At this point, the analysis of the loading process of the extension plugin is completed."))}d.isMDXComponent=!0}}]);