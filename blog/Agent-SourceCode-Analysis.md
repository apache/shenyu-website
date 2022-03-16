---
title: ShenYu Agent Source Code Analysis
author: midnight2104
author_title: Apache ShenYu Committer
author_url: https://github.com/midnight2104
tags: [zookeeper,data sync,Apache ShenYu]
---

> [Apache ShenYu](https://shenyu.apache.org/zh/docs/index) is an asynchronous, high-performance, cross-language, responsive API gateway.


In the `Apache ShenYu` gateway, `Apache ShenYu` use `Java Agent` and `Bytecode Enhancement` technologies to enable seamless burial, allowing users to access third-party observability systems for `Traces`, `Metrics` and `Logging` without introducing dependencies.

> This article is based on `shenyu-2.4.2` version for source code analysis, please refer to [Observability](https://shenyu.apache.org/docs/user-guide/observability/observability/) .

Specifically, the `shenyu-agent` module, which is based on the `Java Agent` mechanism, through the `ByteBuddy` bytecode enhancement library, to enhance the object at class load time, belongs to the static proxy.

### AboutAOP

Before analyzing the source code, the following `AOP` related terms are introduced to facilitate subsequent understanding.

- `JoinPoint`: the join point, the point in time when the program is running, such as the execution point of a method.
- `PointCut`: entry point, the condition that matches `JoinPoint`.
- `Advice`: notification, the specific execution logic.
- `Target`: target object.
- `Proxy`: proxy object.



### About Byte Buddy

`Byte Buddy` is a code generation and manipulation library that creates and modifies `Java` classes during the runtime of a `Java` application. It can be used to create any class, unlike the `JDK` dynamic proxy that forces an interface. In addition, `Byte Buddy` provides a convenient API for changing classes manually, using the `Java` proxy, or during the build.

- provides a very convenient API interface to match powerful classes, methods, etc.
- out-of-the-box , zero learning costs , shielding the underlying operational bytecode technology .
- powerful open customizability features, allowing custom bytecode for any implemented method.
- the principle of minimal runtime code generation for efficient performance.



### 1. premain method

The `premain() function` is the entry function for the `javaagent`, which is provided by `ShenyuAgentBootstrap` in `ShenYu` and implements the entire `agent` logic.

```java
/**
 * agent bootstrap
 */
public class ShenyuAgentBootstrap {
    
    /**
     *  premain.
     */
    public static void premain(final String arguments, final Instrumentation instrumentation) throws Exception {
        // 1. read config file
        ShenyuAgentConfigUtils.setConfig(ShenyuAgentConfigLoader.load());
        // 2. load all plugins
        ShenyuAgentPluginLoader.getInstance().loadAllPlugins();
        // 3. create agent
        AgentBuilder agentBuilder = new AgentBuilder.Default().with(new ByteBuddy().with(TypeValidation.ENABLED))
                .ignore(ElementMatchers.isSynthetic())
                .or(ElementMatchers.nameStartsWith("org.apache.shenyu.agent."));
        agentBuilder.type(ShenyuAgentTypeMatcher.getInstance())
                .transform(new ShenyuAgentTransformer())
                .with(AgentBuilder.RedefinitionStrategy.RETRANSFORMATION)
                .with(new TransformListener()).installOn(instrumentation);
        // 4. start plugin
        PluginLifecycleManager lifecycleManager = new PluginLifecycleManager();
        lifecycleManager.startup(ShenyuAgentConfigUtils.getPluginConfigMap());
        Runtime.getRuntime().addShutdownHook(new Thread(lifecycleManager::close));
    }
}
```

The core logic of the `premain function` is the four-step operation above.

- 1. reading the configuration file.
- 2. loading all plugins.
- 3. create the agent.
- 4. start the plug-in.


The next source code analysis will analyze these four operations in turn.


### 2. Read Config File

- ShenyuAgentConfigLoader#load()

The processing of the configuration file is done by `ShenyuAgentConfigLoader` and the code is implemented as follows.

```java
public final class ShenyuAgentConfigLoader {
    // config path
    private static final String CONFIG_PATH = "config-path";
    
    /**
     * load file.
     */
    public static ShenyuAgentConfig load() throws IOException {
        // get file path
        String configPath = System.getProperty(CONFIG_PATH);
        // if there is no configuration, read the default file shenyu-agent.yaml
        File configFile = StringUtils.isEmpty(configPath) ? ShenyuAgentLocator.locatorConf("shenyu-agent.yaml") : new File(configPath);
        // read the configuration file and parse it
        return ShenyuYamlEngine.agentConfig(configFile);
    }
}
```

You can specify the path of the configuration file by `config-path`, if not, the default configuration file `shenyu-agent.yaml` will be read, and then the configuration file will be parsed by `ShenyuYamlEngine`.

The format of the configuration file is `yaml` format, please refer to the introduction of the official website for how to configure it [observability](https://shenyu.apache.org/docs/user-guide/observability/observability/) .

The default configuration file `shenyu-agent.yaml` has the following format.

```yaml
appName: shenyu-agent  # app name
supports:  # what features are currently supported
  tracing: # tracing plugin
#    - jaeger   
#    - opentelemetry
     - zipkin
  metrics:  # metrics plugin
    - 
  logging:  # logging plugin
    - 
  
plugins:  # plugin info
  tracing:   
    jaeger:  
      host: "localhost"
      port: 5775
      props:
        SERVICE_NAME: "shenyu-agent"
        JAEGER_SAMPLER_TYPE: "const"
        JAEGER_SAMPLER_PARAM: "1"
    opentelemetry:  
      props:
        otel.traces.exporter: jaeger #zipkin #otlp
        otel.resource.attributes: "service.name=shenyu-agent"
        otel.exporter.jaeger.endpoint: "http://localhost:14250/api/traces"
    zipkin: 
      host: "localhost"
      port: 9411
      props:
        SERVICE_NAME: "shenyu-agent"
        URL_VERSION: "/api/v2/spans"
        SAMPLER_TYPE: "const"
        SAMPLER_PARAM: "1"
  metrics:   
    prometheus: 
      host: "localhost"
      port: 8081
      props:
  logging:   
    elasticSearch: 
      host: "localhost"
      port: 8082
      props:
    kafka:   
      host: "localhost"
      port: 8082
      props:
```

Which plugin you need to enable, specify it in `supports`, and then `plugins` to specify the configuration information of the plugin.

> So far, the latest version of `Apache ShenYu` released is `2.4.2` version, the plugins that can support `tracing` are `jaeger`, `opentelemetry` and `zipkin`, `metrics` and `logging` will be released in subsequent versions one after another.

- ShenyuYamlEngine#agentConfig()

`ShenyuYamlEngine` provides how to customize the loading of files in `yaml` format.

```java
    public static ShenyuAgentConfig agentConfig(final File yamlFile) throws IOException {
        try (
               // file inputStream
                FileInputStream fileInputStream = new FileInputStream(yamlFile);
                InputStreamReader inputStreamReader = new InputStreamReader(fileInputStream)
        ) {
            Constructor constructor = new Constructor(ShenyuAgentConfig.class);
            TypeDescription customTypeDescription = new TypeDescription(AgentPluginConfig.class);
            customTypeDescription.addPropertyParameters("plugins", Map.class);
            constructor.addTypeDescription(customTypeDescription);
            //read yaml files by the Yaml toolkit 
            return new Yaml(constructor, new Representer(DUMPER_OPTIONS)).loadAs(inputStreamReader, ShenyuAgentConfig.class);
        }
    }
```

`ShenyuAgentConfig` is the specified Class .

```java
public final class ShenyuAgentConfig {
    // app name, default shenyu-agent 
    private String appName = "shenyu-agent";
    // supports plugin
    private Map<String, List<String>> supports = new LinkedHashMap<>();
    // plugins info
    private Map<String, Map<String, AgentPluginConfig>> plugins = new LinkedHashMap<>();
    
}
```

`AgentPluginConfig` is the Class  that specifies the plugin.

```java
public final class AgentPluginConfig {
    private String host;
    private int port;
    private String password;
    private Properties props;
}
```

Through the configuration file, the user can specify which plug-in to enable and specify information about the properties of the plug-in.


### 3. Load Plugin

- ShenyuAgentPluginLoader#loadAllPlugins()

After reading the configuration file, you need to load the specified plugin according to the user-defined configuration information. This is done by `ShenyuAgentPluginLoader`.

`ShenyuAgentPluginLoader` is a custom class loader that uses the singleton design pattern.

```java
// Custom ClassLoader, extends ClassLoader
public final class ShenyuAgentPluginLoader extends ClassLoader implements Closeable {
    private static final ShenyuAgentPluginLoader AGENT_PLUGIN_LOADER = new ShenyuAgentPluginLoader();
    private ShenyuAgentPluginLoader() {
        super(ShenyuAgentPluginLoader.class.getClassLoader());
    }
    
    public static ShenyuAgentPluginLoader getInstance() {
        return AGENT_PLUGIN_LOADER;
    }
    
    /**
     * load all plugins.
     */
    public void loadAllPlugins() throws IOException {
        // 1. locating the plugin path
        File[] jarFiles = ShenyuAgentLocator.locatorPlugin().listFiles(file -> file.getName().endsWith(".jar"));
        if (Objects.isNull(jarFiles)) {
            return;
        }
        // 2.load plugin definition
        Map<String, ShenyuAgentJoinPoint> pointMap = new HashMap<>();
        try (ByteArrayOutputStream outputStream = new ByteArrayOutputStream()) {
            for (File each : jarFiles) {
                outputStream.reset();
                JarFile jar = new JarFile(each, true);
                jars.add(new PluginJar(jar, each));
            }
        }
       
        loadAgentPluginDefinition(pointMap);
        Map<String, ShenyuAgentJoinPoint> joinPointMap = ImmutableMap.<String, ShenyuAgentJoinPoint>builder().putAll(pointMap).build();
        // 3.set join point
        ShenyuAgentTypeMatcher.getInstance().setJoinPointMap(joinPointMap);
    }
}
```


#### 3.1 Locating the Plugin Path

- ShenyuAgentLocator#locatorPlugin()

After the entire `shenyu` project has been packaged in `maven` (by executing the `mvn clean install` command), the `agent` package directory is as follows.

![](/img/activities/code-analysis-agent/agent-jar.png)

The plugin files are in the form of `jar` packages.

- The `conf` directory is the directory location for configuration files.
- The `plugins` directory is the directory location of individual plugins.


The corresponding source code processing logic for locating the plugin path is as follows.

```java
// The default plugin is located in the /plugins directory
public static File locatorPlugin() {
        return new File(String.join("", locatorAgent().getPath(), "/plugins"));
}

// Locate the absolute path to shenyu-agent.jar
public static File locatorAgent() {
    // Find the class path (package name) where ShenyuAgentLocator is located
        String classResourcePath = String.join("", ShenyuAgentLocator.class.getName().replaceAll("\\.", "/"), ".class");
    // Find the absolute path to the class: disk path + class path
        URL resource = ClassLoader.getSystemClassLoader().getResource(classResourcePath);
        assert resource != null;
        String url = resource.toString();
    // Whether it is in the form of a jar package
        int existFileInJarIndex = url.indexOf('!');
        boolean isInJar = existFileInJarIndex > -1;
    // Find the path from the jar package or Find the path from the resource file
        return isInJar ? getFileInJar(url, existFileInJarIndex) : getFileInResource(url, classResourcePath);
    }

  // Find the path from the jar package
    private static File getFileInJar(final String url, final int fileInJarIndex) {
        // The absolute path to the jar package
        String realUrl = url.substring(url.indexOf("file:"), fileInJarIndex);
        try {
            // Create File objects with absolute paths
            File agentJarFile = new File(new URL(realUrl).toURI());
            // Get the parent file
            return agentJarFile.exists() ? agentJarFile.getParentFile() : null;
        } catch (final MalformedURLException | URISyntaxException ex) {
            return null;
        }
    }
```

After getting all the plugin files, it will go to load the plugin definition, i.e. the interception point.


#### 3.2 Load Agent Plugin Definition

- ShenyuAgentPluginLoader#loadAgentPluginDefinition()

The default configuration for interception points is in the `conf/tracing-point.yaml` file, with the following configuration format.

```yaml
pointCuts:
  - targetClass: org.apache.shenyu.plugin.global.GlobalPlugin  
    points:
      - type: instanceMethod 
        name: execute  
    handlers:  
      jaeger:   
        - org.apache.shenyu.agent.plugin.tracing.jaeger.handler.JaegerGlobalPluginHandler
      opentelemetry: 
        - org.apache.shenyu.agent.plugin.tracing.opentelemetry.handler.OpenTelemetryGlobalPluginHandler
      zipkin:    
        - org.apache.shenyu.agent.plugin.tracing.zipkin.handler.ZipkinGlobalPluginHandler
        
        // ......
```

The loading of interceptors is done by means of `SPI` and then these interceptors are collected.

```java
 private void loadAgentPluginDefinition(final Map<String, ShenyuAgentJoinPoint> pointMap) {
        SPILoader.loadList(AgentPluginDefinition.class)  // SPI 
                .forEach(each -> each.collector().forEach(def -> {  // collect
                    String classTarget = def.getClassTarget();
                    if (pointMap.containsKey(classTarget)) {
                        ShenyuAgentJoinPoint pluginInterceptorPoint = pointMap.get(classTarget);
                        pluginInterceptorPoint.getConstructorPoints().addAll(def.getConstructorPoints()); //constructor points
                        pluginInterceptorPoint.getInstanceMethodPoints().addAll(def.getInstanceMethodPoints()); // instance method points
                        pluginInterceptorPoint.getStaticMethodPoints().addAll(def.getStaticMethodPoints()); // static method points
                    } else {
                        pointMap.put(classTarget, def);
                    }
                }));
    }
```


- SPILoader.loadList(AgentPluginDefinition.class)

`AgentPluginDefinition` is the interception point interface, marked by `@SPI`.

```java
@SPI // The interface is loaded via SPI
public interface AgentPluginDefinition {
    
    /**
     * collect point 
     */
    Collection<ShenyuAgentJoinPoint> collector();
}

```

`TracingAgentPluginDefinition` is one of its implementation classes to define the interception points for link tracing.

```java
@Join 
public final class TracingAgentPluginDefinition extends AbstractAgentPluginDefinition {
       
    // create join point 
    @Override
    protected Collection<JoinPointBuilder> joinPointBuilder() {
       // ......
    }
}

public abstract class AbstractAgentPluginDefinition implements AgentPluginDefinition {
    //  create join point 
    protected abstract Collection<JoinPointBuilder> joinPointBuilder();
    
    //  collect join point 
    @Override
    public final Collection<ShenyuAgentJoinPoint> collector() {
        //......
    }
}

```

The inheritance relationship between classes is as follows.

![](/img/activities/code-analysis-agent/agent-plugin-definition.png)


- AgentPluginDefinition#collector()

`AgentPluginDefinition` is just an interface that defines the operation methods for collecting interception points, and the concrete implementation is given to the subclasses.

```java
public abstract class AbstractAgentPluginDefinition implements AgentPluginDefinition {
    
    // Subclasses to implement how to create interception points
    protected abstract Collection<JoinPointBuilder> joinPointBuilder();

    @Override
    public final Collection<ShenyuAgentJoinPoint> collector() {
        // get JoinPointBuilder
        Collection<JoinPointBuilder> joinPointBuilders = joinPointBuilder();
        // create ShenyuAgentJoinPoint
        return joinPointBuilders.stream().map(JoinPointBuilder::install).collect(Collectors.toList());
    }
}

 // create ShenyuAgentJoinPoint
public ShenyuAgentJoinPoint install() {
    // The four construction parameters are: target object, constructor interceptor point, instance method interceptor point, static method interceptor point
    return new ShenyuAgentJoinPoint(classTarget, constructorPoints, instanceMethodPoints, classStaticMethodPoints);
}
```


- TracingAgentPluginDefinition#joinPointBuilder()

  Create intercept points for tracing.

```java
@Join
public final class TracingAgentPluginDefinition extends AbstractAgentPluginDefinition {
    // create join point
    @Override
    protected Collection<JoinPointBuilder> joinPointBuilder() {
        PointCutConfig config = null;
        try {
            // Read the default interception point configuration file
            config = ShenyuYamlEngine.unmarshal(ShenyuAgentLocator.locatorConf("tracing-point.yaml"), PointCutConfig.class);
        } catch (IOException e) {
            LOG.error("Exception loader tracing point config is", e);
        }
        // create join point
        return JoinPointBuilderFactory.create(config);
    }
}
```

- JoinPointBuilderFactory#create()

  Create an intercept point based on the specified profile .

```java
public static Collection<JoinPointBuilder> create(final PointCutConfig config) {
        //If there is no profile or it is empty, return the empty set
        if (Objects.isNull(config) || config.getPointCuts().isEmpty()) {
            return Collections.emptyList();
        }
        return config.getPointCuts().stream() // Get the interception point defined in the configuration file
                .filter(pointCut -> StringUtils.isNotEmpty(pointCut.getTargetClass())
                        && !pointCut.getPoints().isEmpty() && !pointCut.getHandlers().isEmpty()) // The intercept point must specify the target class, entry point, processor
                .map(pointCut -> {
                    JoinPointBuilder builder = ShenyuAgentJoinPoint.interceptClass(pointCut.getTargetClass()); // Set the target class to be intercepted
                    Set<String> supports = ShenyuAgentConfigUtils.getSupports(); // Get which plugins are currently supported
                    List<String> handlers = pointCut.getHandlers().entrySet().stream()
                            .filter(entry -> supports.contains(entry.getKey())) // The specified processor must be a currently supportable plugin
                            .flatMap(entry -> entry.getValue().stream())
                            .collect(Collectors.toList());
                    String[] instanceMethods = pointCut
                            .getPoints()
                            .stream()
                            .filter(point -> PointType.INSTANCE_METHOD.getName().equals(point.getType()))
                            .map(Point::getName) // intercept instance methods
                            .toArray(String[]::new);
                    if (instanceMethods.length > 0) {
                        builder.aroundInstanceMethod(ElementMatchers.namedOneOf(instanceMethods)).handlers(handlers).build(); // 为实例方法添加匹配器用于后续运行时动态匹配，并添加对应的处理器
                    }
                    String[] staticMethods = pointCut
                            .getPoints()
                            .stream()
                            .filter(point -> PointType.STATIC_METHOD.getName().equals(point.getType()))
                            .map(Point::getName)
                            .toArray(String[]::new); // intercept static methods
                    if (staticMethods.length > 0) {
                        builder.aroundStaticMethod(ElementMatchers.namedOneOf(staticMethods)).handlers(handlers).build();// Add matchers to static methods for subsequent dynamic matching at runtime, and add corresponding handlers
                    }
                    String[] constructorPoints = pointCut
                            .getPoints()
                            .stream()
                            .filter(point -> PointType.CONSTRUCTOR.getName().equals(point.getType()))
                            .map(Point::getName)
                            .toArray(String[]::new); // intercept constructor methods
                    if (constructorPoints.length > 0) {
                        builder.onConstructor(ElementMatchers.namedOneOf(constructorPoints)).handlers(handlers).build();// Add a matcher to the constructor for subsequent dynamic matching at runtime, and add the corresponding handler
                    }
                    return builder;
                }).collect(Collectors.toList()); // return result
    }
```

The main implementation logic for creating an interception point is to read the configuration information according to the configuration file and add the corresponding handler for the target method of the specified target object. There are three types of handlers: instance method handlers, static method handlers, and constructor handlers.

The `ElementMatchers.namedOneOf()` method is used here, which indicates that the method name is in the specified parameter to match on the method. `ElementMatchers` is a class in `bytebuddy`, and in `ShenYu`, the creation of `agent` is also done through `bytebuddy`.

The collected intercept points are later created as the intercept point object `ShenyuAgentJoinPoint`.


```java
    public final Collection<ShenyuAgentJoinPoint> collector() {
        // join point
        Collection<JoinPointBuilder> joinPointBuilders = joinPointBuilder();
        // create ShenyuAgentJoinPoint
        return joinPointBuilders.stream().map(JoinPointBuilder::install).collect(Collectors.toList());
    }
```

After collecting the intercept points, the intercept point information is saved with `Map`.

```java
// pointMap: Key and Value denote target class, interception point respectively
private void loadAgentPluginDefinition(final Map<String, ShenyuAgentJoinPoint> pointMap) {
        SPILoader.loadList(AgentPluginDefinition.class)  // SPI 
                .forEach(each -> each.collector().forEach(def -> {  // collect
                    String classTarget = def.getClassTarget();
                    if (pointMap.containsKey(classTarget)) {
                        ShenyuAgentJoinPoint pluginInterceptorPoint = pointMap.get(classTarget);
                        pluginInterceptorPoint.getConstructorPoints().addAll(def.getConstructorPoints()); // constructor method points
                        pluginInterceptorPoint.getInstanceMethodPoints().addAll(def.getInstanceMethodPoints()); // instance method points
                        pluginInterceptorPoint.getStaticMethodPoints().addAll(def.getStaticMethodPoints()); // static method points
                    } else {
                        pointMap.put(classTarget, def); // Save intercept point information to Map
                    }
                }));
    }
   
```

#### 3.3 Set Joint Point

The last step in the process of loading all plugins is to set the blocking point.

```java
     public void loadAllPlugins() throws IOException {
        // 1.Locating the plugin path
        // ......
        // 2.Loading Plugin Definitions
        // ......
        // 3.Set intercept points
        ShenyuAgentTypeMatcher.getInstance().setJoinPointMap(joinPointMap);
    }
```

Setting intercept points is to save the set of intercept points to the `ShenyuAgentTypeMatcher` class. It implements the `ElementMatcher` interface for custom matching logic. `ElementMatcher` is also an interface in `bytebuddy`.

```java
public final class ShenyuAgentTypeMatcher extends ElementMatcher.Junction.AbstractBase<TypeDefinition> {
    private static final ShenyuAgentTypeMatcher SHENYU_AGENT_TYPE_MATCHER = new ShenyuAgentTypeMatcher();
    private Map<String, ShenyuAgentJoinPoint> joinPointMap;
    
    private ShenyuAgentTypeMatcher() {
    }

    public static ShenyuAgentTypeMatcher getInstance() {
        return SHENYU_AGENT_TYPE_MATCHER;
    }
 
    //Customize the matching logic, the target class is matched successfully when it is in the set of interceptor points
    @Override
    public boolean matches(final TypeDefinition target) {
        return joinPointMap.containsKey(target.getTypeName());
    }
    
    /**
     * Set the set of interception points
     */
    public void setJoinPointMap(final Map<String, ShenyuAgentJoinPoint> joinPointMap) {
        this.joinPointMap = joinPointMap;
    }
}
```



### 4. Create Agent

The agent created by is used to change the behavior of the target class.

```java
 public static void premain(final String arguments, final Instrumentation instrumentation) throws Exception {
        // 1. Read configuration file
        // ......
        // 2. Load all plugins
        // ......
        // 3. Create Agent
        AgentBuilder agentBuilder = new AgentBuilder.Default().with(new ByteBuddy().with(TypeValidation.ENABLED)) // Create Agent with ByteBuddy and turn on type-checking
                .ignore(ElementMatchers.isSynthetic()) // Ignore synthetic
                .or(ElementMatchers.nameStartsWith("org.apache.shenyu.agent.")); // Ignore the class org.apache.shenyu.agent
        agentBuilder.type(ShenyuAgentTypeMatcher.getInstance())//Matching load type, the matcher is ShenyuAgentTypeMatcher
                .transform(new ShenyuAgentTransformer()) // If the match is successful, change its behavior through ShenyuAgentTransformer
                .with(AgentBuilder.RedefinitionStrategy.RETRANSFORMATION) //Specifying redefinition policies
                .with(new TransformListener()) /Specify a listener to listen for events during runtime
                .installOn(instrumentation); // Apply the changes to the Instrumentation
        // 4. Start Plugin
        // ......
    }
```

In the process of creating an agent, two points need to be noted.

- Whether the match is successful or not, determined by `ShenyuAgentTypeMatcher`.
- the behavior of the successful match class, which is changed by `ShenyuAgentTransformer`.

Next we will focus on analyzing these two classes.

#### 4.1 Define the matching logic

- ShenyuAgentTypeMatcher#matches()

`ShenyuAgentTypeMatcher` uses the singleton design pattern, implements the `ElementMatcher` interface and overrides the `matches()` method.

The logic of whether the match is successful or not is: if the target class is in the `joinPointMap` set of interceptor points, the match is successful.

```java

public final class ShenyuAgentTypeMatcher extends ElementMatcher.Junction.AbstractBase<TypeDefinition> {
    // ......
    
    private Map<String, ShenyuAgentJoinPoint> joinPointMap;

	// Custom matching logic: if the target class is in the intercept point joinPointMap collection, the match is successful
    @Override
    public boolean matches(final TypeDefinition target) {
        return joinPointMap.containsKey(target.getTypeName());
    }
    
}
```

#### 4.2 Changing the behavior of matching classes

When loading the target class, if the match is successful, it will change its behavior through `ShenyuAgentTransformer`, which implements the `Transformer` interface and overrides the `transform()` method, `Transformer` is also an interface to `bytebuddy`.

```java
public final class ShenyuAgentTransformer implements Transformer {
    //Define an additional field in the match class to pass contextual information
    private static final String EXTRA_DATA = "_$EXTRA_DATA$_";
    //Type Matcher    
    private static final ShenyuAgentTypeMatcher MATCHER = ShenyuAgentTypeMatcher.getInstance();
    
    //Rewrite the transform method to redefine the behavior of the matching class
    //Execute once during the load class
    @Override
    public Builder<?> transform(final Builder<?> builder, final TypeDescription typeDescription, final ClassLoader classLoader, final JavaModule module) {
        //skip if not a matching class
        if (!MATCHER.containsType(typeDescription)) {
            return builder;
        }
        //add a new field for the class
        Builder<?> result = builder.defineField(EXTRA_DATA, Object.class, Opcodes.ACC_PRIVATE | Opcodes.ACC_VOLATILE).implement(TargetObject.class).intercept(FieldAccessor.ofField(EXTRA_DATA));
        // get join point
        ShenyuAgentJoinPoint joinPoint = MATCHER.loadShenyuAgentJoinPoint(typeDescription);
        //interceptor constructor point
        result = interceptorConstructorPoint(typeDescription, joinPoint.getConstructorPoints(), result);
        //interceptor static method point
        result = interceptorStaticMethodPoint(typeDescription, joinPoint.getStaticMethodPoints(), result);
        //interceptor instance method Point
        result = interceptorInstanceMethodPoint(typeDescription, joinPoint.getInstanceMethodPoints(), result);
        return result;
    }

    // ......
}
```

In the `transform()` method, the behavior of the match class is redefined.

- New field, a subclass of `TargetObject`, for passing the context.
- Whether to intercept constructors, depending on the specified configuration.
- Whether to intercept static methods, according to the specified configuration.
- intercepting instance methods, according to the specified configuration.


##### 4.2.3 Interceptor Instance Method Point

- ShenyuAgentTransformer#interceptorInstanceMethodPoint()

Constructs an instance method intercept point based on a cutscene to get a `Builder` object.

```java
    private Builder<?> interceptorInstanceMethodPoint(final TypeDescription description, final Collection<InstanceMethodPointCut> pointCuts, final Builder<?> builder) {
        Collection<ShenyuAgentTransformerPoint<?>> points = description.getDeclaredMethods().stream()
                .filter(each -> !(each.isAbstract() || each.isSynthetic())) //Filtering abstract methods, synthetic methods
                .map(each -> buildInstanceMethodTransformationPoint(pointCuts, each)) //Constructing example method intercept points
                .filter(Objects::nonNull)
                .collect(Collectors.toList());
        return getBuilder(description, builder, points); //get Builder
    }
```

- ShenyuAgentTransformer#buildInstanceMethodTransformationPoint()

Filter the matched methods, get the corresponding `handler` handler for the method, and finally create an instance method interception point object.

```java
    private ShenyuAgentTransformerPoint<?> buildInstanceMethodTransformationPoint(final Collection<InstanceMethodPointCut> pointCuts, final InDefinedShape methodDescription) {
        List<InstanceMethodPointCut> points = pointCuts.stream().filter(point -> point.getMatcher().matches(methodDescription)).collect(Collectors.toList()); //Filter the methods that can match on
        if (points.isEmpty()) {
            return null;
        }
        List<InstanceMethodHandler> handlers = points.stream()
                .flatMap(pointCut -> pointCut.getHandlers().stream())
                .map(handler -> (InstanceMethodHandler) MATCHER.getOrCreateInstance(handler)) //Get the corresponding handler processor
                .filter(Objects::nonNull)
                .collect(Collectors.toList());
        return new ShenyuAgentTransformerPoint<>(methodDescription, new InstanceMethodInterceptor(handlers));//Create instance method interceptor object, create instance method interceptor
    }
```

Whether the method matches successfully: whether the current method name is the method name configured in the `tracing-point.yaml` file.

`handler` fetching: is based on the fully qualified name configured in the `tracing-point.yaml` file to load the corresponding class.

- InstanceMethodInterceptor#intercept()

The instance method interceptor `InstanceMethodInterceptor` dynamically handles intercept methods during runtime.

```java
public class InstanceMethodInterceptor {
    // ......
    /**
     * Intercept of target objects.
     *
     * @param target 
     * @param method 
     * @param args 
     * @param callable 
     * @return 
     * @throws 
     */
    @RuntimeType //Define the runtime target method
    public Object intercept(@This final Object target, @Origin final Method method, @AllArguments final Object[] args, @SuperCall final Callable<?> callable) throws Exception {
        //Target method implementation results
        Object result = null;
        //Target Object
        TargetObject instance = (TargetObject) target;
        //instance method handler
        for (InstanceMethodHandler handler : handlerList) {
            MethodResult methodResult = new MethodResult();
            // Pre-processing logic
            try {
                handler.before(instance, method, args, methodResult);
            } catch (final Throwable ex) {
                LOG.error("Failed to execute the before method of method {} in class {}", method.getName(), target.getClass(), ex);
            }
            //Calling the target method
            try {
                result = callable.call();
            } catch (final Throwable ex) {
			   //Handling exception
                try {
                    handler.onThrowing(instance, method, args, ex);
                } catch (final Throwable ignored) {
                    LOG.error("Failed to execute the error handler of method {} in class {}", method.getName(), target.getClass(), ex);
                    throw ex;
                }
            } finally {
                //Post-processing logic
                try {
                    result = handler.after(instance, method, args, methodResult, result);
                } catch (final Throwable ex) {
                    LOG.error("Failed to execute the after method of method {} in class {}", method.getName(), target.getClass(), ex);
                }
            }
        }
        //Returns the result of the target method call
        return result;
    }
}

```

The instance method interceptor adds pre-processing logic, post-processing logic, and exception handling logic before the target method is called.

Several annotations of `Byte Buddy` are used here.

- `@RuntimeType`: defines the target method at runtime, prompting `ByteBuddy` to disable strict type checking.
- `@This`: the current intercepted, dynamically generated instance object.
- `@Origin`: the original method.
- `@AllArguments`: get all incoming parameters.
- `@SuperCall`: used to call the parent class version of the method.

Instance method handler `InstanceMethodHandler` only defines three interfaces, and the specific implementation logic is handled by the specific plugin.

```java
public interface InstanceMethodHandler {
     // Pre-processing logic
    default void before(final TargetObject target, final Method method, final Object[] args, final MethodResult result) {
    }
    
    // Post-processing logic
    default Object after(final TargetObject target, final Method method, final Object[] args, final MethodResult methodResult, final Object result) {
        return result;
    }
   
    // Exception handling logic
    default void onThrowing(final TargetObject target, final Method method, final Object[] args, final Throwable throwable) {
    }
}

```


- ShenyuAgentTransformer#getBuilder()

When the `Builder` of the `Agent` is acquired, the corresponding interceptor is specified for the specified target method, new logic is added to the original method, and the behavior of the original method is changed.

```java
    
    private static Builder<?> getBuilder(final TypeDescription description, final Builder<?> builder, final Collection<ShenyuAgentTransformerPoint<?>> points) {
        final Builder<?>[] result = {builder};
        points.forEach(point -> {
            try {
                result[0] = builder.method(ElementMatchers.is(point.getDescription()))//Specify the target method
                        .intercept(MethodDelegation.withDefaultConfiguration().to(point.getInterceptor()));//Specifying Interceptor
                // CHECKSTYLE:OFF
            } catch (final Throwable ex) {
                // CHECKSTYLE:ON
                LOG.error("Failed to load handler class: {}", description.getTypeName(), ex);
            }
        });
        return result[0];
    }
```

With the above processing logic, it is possible to intercept the instance method without intrusion.

The processing logic of the intercept method `intercept()` is

- Processing each `handler` in turn.
- Calling the predecessor method of `handler`.
- Calling the target method.
- calling the exception handling method of `handler` if the target method has an exception.
- Calling the post method of `handler`.

Next, look at intercepting static methods.

##### 4.2.3 Interceptor Static Method Point

- ShenyuAgentTransformer#interceptorStaticMethodPoint()

Filter out static methods, then build static method intercept points for static methods.

```java
    private Builder<?> interceptorStaticMethodPoint(final TypeDescription description, final Collection<StaticMethodPointCut> pointCuts, final Builder<?> builder) {
        Collection<ShenyuAgentTransformerPoint<?>> points = description.getDeclaredMethods().stream()
                .filter(each -> each.isStatic() && !(each.isAbstract() || each.isSynthetic())) // The current method is a static method, not an abstract method, not a synthetic method
                .map(methodDescription -> buildStaticMethodTransformationPoint(pointCuts, methodDescription)) // Building static method intercept points
                .filter(Objects::nonNull)
                .collect(Collectors.toList());
        return getBuilder(description, builder, points);
    }
```

- ShenyuAgentTransformer#buildStaticMethodTransformationPoint()

Filter according to the configuration file to determine whether the current static method needs to be intercepted. Then get the corresponding handler and finally build the static method interceptor object.

```java
    private ShenyuAgentTransformerPoint<?> buildStaticMethodTransformationPoint(final Collection<StaticMethodPointCut> pointCuts, final InDefinedShape methodDescription) {
        List<StaticMethodPointCut> staticMethodPoints = pointCuts.stream().filter(point -> point.getMatcher().matches(methodDescription)).collect(Collectors.toList()); //Filter based on the configuration file to determine if the current static method needs to be intercepted
        if (staticMethodPoints.isEmpty()) { // If there is no configuration, it returns directly
            return null;
        }
        List<StaticMethodHandler> handlers = staticMethodPoints.stream()
                .flatMap(pointCut -> pointCut.getHandlers().stream())
                .map(handler -> (StaticMethodHandler) MATCHER.getOrCreateInstance(handler)) //Get the corresponding processor
                .filter(Objects::nonNull)
                .collect(Collectors.toList());
        return new ShenyuAgentTransformerPoint<>(methodDescription, new StaticMethodInterceptor(handlers)); //Constructing static method interceptor objects
    }
```

- StaticMethodInterceptor#intercept()

At runtime, the target method is intercepted and the processing logic of the interceptor is executed .

```java

public class StaticMethodInterceptor {
   //......  
    
    /**
     * Intercept of target methods.
     */
    @RuntimeType
    public Object intercept(@Origin final Class<?> klass, @Origin final Method method, @AllArguments final Object[] args, @SuperCall final Callable<?> callable) throws Exception {
        Object result = null;
        // handler
        for (StaticMethodHandler handler : handlerList) {
            MethodResult methodResult = new MethodResult();
            try {
                //Pre-processing method
                handler.before(klass, method, args, new MethodResult());
            } catch (final Throwable ex) {
                LOG.error("Failed to execute the before method of method {} in class {}", method.getName(), klass, ex);
            }
            try {
                // Calling the current method
                result = callable.call();
            } catch (final Throwable ex) {
                try {
                    //Exception logic handling
                    handler.onThrowing(klass, method, args, ex);
                } catch (final Throwable ignored) {
                    LOG.error("Failed to execute the error handler of method {} in class {}", method.getName(), klass, ex);
                    throw ex;
                }
            } finally {
                try {
                    // Post-processing method
                    handler.after(klass, method, args, methodResult);
                } catch (final Throwable ex) {
                    LOG.error("Failed to execute the after method of method {} in class {}", method.getName(), klass, ex);
                }
            }
        }
        //return resullt
        return result;
    }
}

```

The processing logic of the intercept method `intercept()` is

- Process each `handler` in turn.
- Calling the predecessor method of `handler`.
- Calling the target method.
- calling the exception handling method of `handler` if the target method has an exception.
- call the post method of `handler`.


Finally, let's look at how to intercept constructors.

##### 4.2.3 Interceptor Constructor Point

- ShenyuAgentTransformer#interceptorConstructorPoint()

Filter out constructors, then build interceptor points for constructors, and finally create `builder` objects to add interceptors to constructor methods.

```java
 private Builder<?> interceptorConstructorPoint(final TypeDescription description, final Collection<ConstructorPointCut> constructorPoints, final Builder<?> builder) {
        Collection<ShenyuAgentTransformerPoint<? extends ConstructorInterceptor>> constructorAdviceComposePoints = description.getDeclaredMethods().stream()
                .filter(MethodDescription::isConstructor) //Filter out constructors
                .map(each -> buildConstructorTransformerPoint(constructorPoints, each))//Interception points for constructing constructors
                .filter(Objects::nonNull)
                .collect(Collectors.toList());
        final Builder<?>[] result = {builder};
     // Create builder object, add interceptor to constructor method
        constructorAdviceComposePoints.forEach(point -> {
            try {
                result[0] = builder.constructor(ElementMatchers.is(point.getDescription()))
                        .intercept(SuperMethodCall.INSTANCE.andThen(MethodDelegation.withDefaultConfiguration()
                                .to(point.getInterceptor())));//Call the parent class constructor first, then add the interceptor
                // CHECKSTYLE:OFF
            } catch (final Throwable ex) {
                // CHECKSTYLE:ON
                LOG.error("Failed to load handler class: {}", description.getTypeName(), ex);
            }
        });
        return result[0];
    }
```

- ShenyuAgentTransformer#buildConstructorTransformerPoint()

First get the constructor interceptor point, then create the `handler` instance object for the interceptor point, and finally create the constructor interceptor object.

```java
private ShenyuAgentTransformerPoint<? extends ConstructorInterceptor> buildConstructorTransformerPoint(
            final Collection<ConstructorPointCut> constructorPoints, final InDefinedShape methodDescription) {
    //Get constructor intercept points
        List<ConstructorPointCut> constructorPointCutList = constructorPoints.stream().filter(each -> each.getMatcher().matches(methodDescription)).collect(Collectors.toList());
        if (constructorPointCutList.isEmpty()) {
            return null;
        }
        List<ConstructorHandler> handlers = constructorPointCutList.stream()
                .flatMap(pointCut -> pointCut.getHandlers().stream())
                .map(handler -> (ConstructorHandler) MATCHER.getOrCreateInstance(handler)) //Create the handler instance object of the interception point
                .filter(Objects::nonNull)
                .collect(Collectors.toList());
        return new ShenyuAgentTransformerPoint<>(methodDescription, new ConstructorInterceptor(handlers));//Creating Constructor Interceptors
    }
```

- ConstructorInterceptor#intercept()

Constructor interceptor: executes the processing logic for each `handler` before calling the constructor of the target method.

```java

public class ConstructorInterceptor {
    //......
    
    /**
     * Interception methods.
     */
    @RuntimeType
    public void intercept(@This final TargetObject target, @AllArguments final Object[] args) {
        for (ConstructorHandler handler : handlerList) {
            try {
                // handler processing logic
                handler.onConstructor(target, args);
            } catch (final Throwable throwable) {
                LOG.error("Constructor advice execution error. class: {}", target.getClass().getTypeName(), throwable);
            }
        }
    }
}

```

At this point, we have finished analyzing the entire process of creating `agent`.

- defining the matching logic `ShenyuAgentTypeMatcher` according to the configuration file.
- defining the `ShenyuAgentTransformer` object, which changes the behavior of the matching class.
- intercepting instance object methods through `InstanceMethodInterceptor`.
- intercepting static methods via `StaticMethodInterceptor`.
- Intercepting constructors via `ConstructorInterceptor`.

The processing logic of each `handler` is not mentioned here because the implementation logic of the `handler` is customized by each plug-in. For example, the implementation classes of the current instance method interceptor `InstanceMethodHandler` are `jaeger`, `opentelemetry` and `zipkin`.

![](/img/activities/code-analysis-agent/instance_method_handler.png)


### 5. Start Plugin

After creating the `agent`, start each plugin.

```java
 public static void premain(final String arguments, final Instrumentation instrumentation) throws Exception {
        // 1. Read configuration file
        // ......
        // 2. Load all plugins
        // ......
        // 3. Create agent
       
        // 4. Start Plugin
        PluginLifecycleManager lifecycleManager = new PluginLifecycleManager();
        lifecycleManager.startup(ShenyuAgentConfigUtils.getPluginConfigMap());
        //Add hook function for closing the plugin
        Runtime.getRuntime().addShutdownHook(new Thread(lifecycleManager::close));
    }
```


- PluginLifecycleManager

The `PluginLifecycleManager` is responsible for the plugin lifecycle management, which is used to start the plugin and close it.

The startup of the plugin has to be specified in the configuration file.

```java

public class PluginLifecycleManager {
   //......      
    /**
     * Start Plugin.
     */
    public void startup(final Map<String, AgentPluginConfig> configMap) {
        //Get the names of supported plugins from the configuration file
        Set<String> support = ShenyuAgentConfigUtils.getSupports();
        configMap.entrySet().stream()
                .filter(entry -> support.contains(entry.getKey())) //Included in the configuration file
                .forEach(entry -> Optional.ofNullable(SPILoader.load(AgentPluginBootService.class, entry.getKey())) //Loading plugin starter classes by SPI
                        .ifPresent(bootService -> {
                            try {
                                LOG.info("start shenyu plugin: {}", entry.getKey());
                                bootService.start(entry.getValue());  // Start the plugin: executing the specific launch logic of the plugin
                            } catch (final Throwable ex) {
                                LOG.error("Failed to start shenyu plugin", ex);
                            }
                        }));
    }
    
    /**
     * close
     */
    public void close() {
        //Loading plugin starter classes by SPI
        SPILoader.loadList(AgentPluginBootService.class).forEach(each -> {
            try {
                each.close(); // Close the plugin: execute the specific closing logic of the plugin
            } catch (final Throwable ex) {
                LOG.error("Failed to close shenyu agent plugin", ex);
            }
        });
    }
}
```

Plugins are also started and closed with each plugin specifically to be implemented, and then loaded by `SPI`.

### 6. Summary

- the `shenyu-agent` module is implemented mainly through the `Byte Buddy` toolkit.
- specifying the plugin information in the configuration file `shenyu-agent.yaml`.
- the plugin loading process is done via `SPI`.
- interception points are specified through the configuration file, with a flexible design.
- Separate plugin interface definition and implementation, supporting multiple plugin types.
