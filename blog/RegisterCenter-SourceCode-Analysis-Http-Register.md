---
title: Register Center Source Code Analysis of Http Register
author: midnight2104
author_title: Apache ShenYu Committer
author_url: https://github.com/midnight2104
tags: [http,register center,Apache ShenYu]
---

> [Apache ShenYu](https://shenyu.apache.org/zh/docs/index) is an asynchronous, high-performance, cross-language, responsive API gateway.


In `ShenYu` gateway, the registration center is used to register the client information to `shenyu-admin`, `admin` then synchronizes this information to the gateway through data synchronization, and the gateway completes traffic filtering through these data. The client information mainly includes `interface information` and `URI information`.

> This article is based on `shenyu-2.4.1` version for source code analysis, please refer to [Client Access Principles](https://shenyu.apache.org/zh/docs/design/register-center-design) for the introduction of the official website.

### 1. Registration Center Principle

When the client starts, it reads the interface information and `uri information`, and sends the data to `shenyu-admin` by the specified registration type.

![](/img/activities/code-analysis-http-register/register-center-en.png)


The registration center in the figure requires the user to specify which registration type to use. `ShenYu` currently supports `Http`, `Zookeeper`, `Etcd`, `Consul` and `Nacos` for registration. Please refer to [Client Access Configuration](https://shenyu.apache.org/zh/docs/user-guide/register-center-access) for details on how to configure them.


`ShenYu` introduces `Disruptor` in the principle design of the registration center, in which the `Disruptor` queue plays a role in decoupling data and operations, which is conducive to expansion. If too many registration requests lead to registration exceptions, it also has a data buffering role.


![](/img/activities/code-analysis-http-register/shenyu-register-center-en.png)


As shown in the figure, the registration center is divided into two parts, one is the registration center client `register-client`, the load processing client data reading. The other is the registration center server `register-server`, which is loaded to handle the server side (that is `shenyu-admin`) data writing. Data is sent and received by specifying the registration type.

- Client: Usually it is a microservice, which can be `springmvc`, `spring-cloud`, `dubbo`, `grpc`, etc.
- `register-client`: register the central client, read the client interface and `uri` information.
- `Disruptor`: decoupling data from operations, data buffering role.
- `register-server`: registry server, here is `shenyu-admin`, receive data, write to database, send data synchronization events.
- registration-type: specify the registration type, complete data registration, currently supports `Http`, `Zookeeper`, `Etcd`, `Consul` and `Nacos`.


This article analyzes the use of `Http` for registration, so the specific processing flow is as follows.


![](/img/activities/code-analysis-http-register/shenyu-register-center-http-en.png)


On the client side, after the data is out of the queue, the data is transferred via `http` and on the server side, the corresponding interface is provided to receive the data and then write it to the queue.

### 2. Client Registration Process

When the client starts, it reads the attribute information according to the relevant configuration, and then writes it to the queue. Let's take the official [shenyu-examples-http](https://github.com/apache/incubator-shenyu/tree/master/shenyu-examples/shenyu-examples-http) as an example and start the source code analysis . The official example is a microservice built by `springboot`. For the configuration of the registration center, please refer to the official website [client access configuration](https://shenyu.apache.org/zh/docs/user-guide/register-center-access) .

#### 2.1 Load configuration, read properties

Let's start with a diagram that ties together the initialization process of the registry client.

![](/img/activities/code-analysis-http-register/client-register-init-en.png)

We are analyzing registration by means of `http`, so the following configuration is required.

```xml
shenyu:
  register:
    registerType: http
    serverLists: http://localhost:9095
  client:
    http:
        props:
          contextPath: /http
          appName: http
          port: 8189  
          isFull: false
```

Each attribute indicates the following meaning.

- `registerType`: the service registration type, fill in `http`.
- `serverList`: The address of the `Shenyu-Admin` project to fill in for the `http` registration type, note the addition of `http://` and separate multiple addresses with English commas.
- `port`: the start port of your project, currently `springmvc/tars/grpc` needs to be filled in.
- `contextPath`: the routing prefix for your `mvc` project in `shenyu` gateway, such as `/order`, `/product`, etc. The gateway will route according to your prefix.
- `appName`: the name of your application, if not configured, it will take the value of `spring.application.name` by default.
- `isFull`: set `true` to proxy your entire service, `false` to proxy one of your `controllers`; currently applies to `springmvc/springcloud`.

After the project starts, it will first load the configuration file, read the property information and generate the corresponding `Bean`.

The first configuration file read is `ShenyuSpringMvcClientConfiguration`, which is the `http` registration configuration class for the `shenyu` client, indicated by `@Configuration` which is a configuration class, and by `@ImportAutoConfiguration` which is a configuration class. to introduce other configuration classes. Create `SpringMvcClientBeanPostProcessor`, which mainly handles metadata. Create `ContextRegisterListener`, which mainly handles `URI` information.

```java
/**
 * Shenyu SpringMvc Client Configuration
 */
@Configuration
@ImportAutoConfiguration(ShenyuClientCommonBeanConfiguration.class)
public class ShenyuSpringMvcClientConfiguration {

    //create SpringMvcClientBeanPostProcessor to handle metadata
    @Bean
    public SpringMvcClientBeanPostProcessor springHttpClientBeanPostProcessor(final ShenyuClientConfig clientConfig,final ShenyuClientRegisterRepository shenyuClientRegisterRepository) {
        return new SpringMvcClientBeanPostProcessor(clientConfig.getClient().get(RpcTypeEnum.HTTP.getName()), shenyuClientRegisterRepository);
    }
    
   //create ContextRegisterListener to handle URI
    @Bean
    public ContextRegisterListener contextRegisterListener(final ShenyuClientConfig clientConfig) {
        return new ContextRegisterListener(clientConfig.getClient().get(RpcTypeEnum.HTTP.getName()));
    }
}

```

`ShenyuClientCommonBeanConfiguration` is a `shenyu` client common configuration class that will create the `bean` common to the registry client.

- Create `ShenyuClientRegisterRepository`, which is created by factory class.
- Create `ShenyuRegisterCenterConfig`, which reads the `shenyu.register` property configuration.
- Create `ShenyuClientConfig`, read the `shenyu.client` property configuration.

```java

/**
 * Shenyu Client Common Bean Configuration
 */
@Configuration
public class ShenyuClientCommonBeanConfiguration {
    
   // create ShenyuClientRegisterRepository by factory 
    @Bean
    public ShenyuClientRegisterRepository shenyuClientRegisterRepository(final ShenyuRegisterCenterConfig config) {
        return ShenyuClientRegisterRepositoryFactory.newInstance(config);
    }
    
	// create ShenyuRegisterCenterConfig to read shenyu.register properties
    @Bean
    @ConfigurationProperties(prefix = "shenyu.register")
    public ShenyuRegisterCenterConfig shenyuRegisterCenterConfig() {
        return new ShenyuRegisterCenterConfig();
    }
    
  // create ShenyuClientConfig to read shenyu.client properties
    @Bean
    @ConfigurationProperties(prefix = "shenyu")
    public ShenyuClientConfig shenyuClientConfig() {
        return new ShenyuClientConfig();
    }
}

```

#### 2.2 HttpClientRegisterRepository

The `ShenyuClientRegisterRepository` generated in the configuration file above is a concrete implementation of the client registration, which is an interface with the following implementation class.

![](/img/activities/code-analysis-http-register/shenyu-client-register-repository.png)


- `HttpClientRegisterRepository`: registration via `http`.
- `ConsulClientRegisterRepository`: registration via `Consul`.
- `EtcdClientRegisterRepository`: registration via `Etcd`; `EtcdClientRegisterRepository`: registration via `Etcd`.
- `NacosClientRegisterRepository`: registration via `nacos`; `NacosClientRegisterRepository`: registration via `nacos`.
- `ZookeeperClientRegisterRepository`: registration through `Zookeeper`.

The specific way which is achieved by loading through `SPI`, the implementation logic is as follows.


```java

/**
 * load ShenyuClientRegisterRepository
 */
public final class ShenyuClientRegisterRepositoryFactory {
    
    private static final Map<String, ShenyuClientRegisterRepository> REPOSITORY_MAP = new ConcurrentHashMap<>();
    
    /**
     * create ShenyuClientRegisterRepository
     */
    public static ShenyuClientRegisterRepository newInstance(final ShenyuRegisterCenterConfig shenyuRegisterCenterConfig) {
        if (!REPOSITORY_MAP.containsKey(shenyuRegisterCenterConfig.getRegisterType())) {
            // Loading by means of SPI, type determined by registerType
            ShenyuClientRegisterRepository result = ExtensionLoader.getExtensionLoader(ShenyuClientRegisterRepository.class).getJoin(shenyuRegisterCenterConfig.getRegisterType());
            //init ShenyuClientRegisterRepository
            result.init(shenyuRegisterCenterConfig);
            ShenyuClientShutdownHook.set(result, shenyuRegisterCenterConfig.getProps());
            REPOSITORY_MAP.put(shenyuRegisterCenterConfig.getRegisterType(), result);
            return result;
        }
        return REPOSITORY_MAP.get(shenyuRegisterCenterConfig.getRegisterType());
    }
}
```

The load type is specified by `registerType`, which is the type we specify in the configuration file at

```xml
shenyu:
  register:
    registerType: http
    serverLists: http://localhost:9095
```

We specified `http`, so it will go to load `HttpClientRegisterRepository`. After the object is successfully created, the initialization method `init()` is executed as follows.

```java
@Join
public class HttpClientRegisterRepository implements ShenyuClientRegisterRepository {
    
    @Override
    public void init(final ShenyuRegisterCenterConfig config) {
        this.serverList = Lists.newArrayList(Splitter.on(",").split(config.getServerLists()));
    }
  
  // ......
}
```

Read `serverLists` from the configuration file, the address of `sheenyu-admin`, in preparation for subsequent data sending. The class annotation `@Join` is used for `SPI` loading.


> `SPI`, known as `Service Provider Interface`, is a service provider discovery feature built into the `JDK`, a mechanism for dynamic replacement discovery.
>
> [shenyu-spi](https://github.com/apache/incubator-shenyu/tree/master/shenyu-spi) is a custom `SPI` extension implementation for the `Apache ShenYu` gateway, designed and implemented with reference to Dubbo [SPI extension implementation](https://dubbo.apache.org/zh/docs/v2.7/dev/impls/).

#### 2.3 SpringMvcClientBeanPostProcessor

Create `SpringMvcClientBeanPostProcessor`, which is responsible for metadata construction and registration, with the following constructor logic.

```java

/**
 *  spring mvc client BeanPostProcessor
 */
public class SpringMvcClientBeanPostProcessor implements BeanPostProcessor {

    /**
     * Instantiation by constructor
     */
    public SpringMvcClientBeanPostProcessor(final PropertiesConfig clientConfig,
                                            final ShenyuClientRegisterRepository shenyuClientRegisterRepository) {
        // read Properties
        Properties props = clientConfig.getProps();
        // get port information and verify
        int port = Integer.parseInt(props.getProperty(ShenyuClientConstants.PORT));
        if (port <= 0) {
            String errorMsg = "http register param must config the port must > 0";
            LOG.error(errorMsg);
            throw new ShenyuClientIllegalArgumentException(errorMsg);
        }
        // get appName
        this.appName = props.getProperty(ShenyuClientConstants.APP_NAME);
        // get contextPath
        this.contextPath = props.getProperty(ShenyuClientConstants.CONTEXT_PATH);
        // check appName and contextPath
        if (StringUtils.isBlank(appName) && StringUtils.isBlank(contextPath)) {
            String errorMsg = "http register param must config the appName or contextPath";
            LOG.error(errorMsg);
            throw new ShenyuClientIllegalArgumentException(errorMsg);
        }
        // get isFull
        this.isFull = Boolean.parseBoolean(props.getProperty(ShenyuClientConstants.IS_FULL, Boolean.FALSE.toString()));
        // start publisher
        publisher.start(shenyuClientRegisterRepository);
    }

    // ......
    @Override
    public Object postProcessAfterInitialization(@NonNull final Object bean, @NonNull final String beanName) throws BeansException {
      // ......
    }

}

```

In the constructor, the main purpose is to read the property information and then perform the checksum.

```xml
shenyu:
  client:
    http:
        props:
          contextPath: /http
          appName: http
          port: 8189  
          isFull: false
```

Finally, `publisher.start()` is executed to start event publishing and prepare for registration.

- ShenyuClientRegisterEventPublisher

`ShenyuClientRegisterEventPublisher` is implemented via singleton pattern, mainly generating `metadata` and `URI` subscribers (subsequently used for data publishing), and then starting the `Disruptor` queue. A common method `publishEvent()` is provided to publish events and send data to the Disruptor queue.

```java

public class ShenyuClientRegisterEventPublisher {
    private static final ShenyuClientRegisterEventPublisher INSTANCE = new ShenyuClientRegisterEventPublisher();
    
    private DisruptorProviderManage providerManage;
    
    private RegisterClientExecutorFactory factory;
    
    public static ShenyuClientRegisterEventPublisher getInstance() {
        return INSTANCE;
    }
    
    public void start(final ShenyuClientRegisterRepository shenyuClientRegisterRepository) {
        factory = new RegisterClientExecutorFactory();
        factory.addSubscribers(new ShenyuClientMetadataExecutorSubscriber(shenyuClientRegisterRepository));
        factory.addSubscribers(new ShenyuClientURIExecutorSubscriber(shenyuClientRegisterRepository));
        providerManage = new DisruptorProviderManage(factory);
        providerManage.startup();
    }
    
    public <T> void publishEvent(final T data) {
        DisruptorProvider<Object> provider = providerManage.getProvider();
        provider.onData(f -> f.setData(data));
    }
}
```

The logic of the constructor of `SpringMvcClientBeanPostProcessor` is analyzed, it mainly reads the property configuration, creates metadata and `URI` subscribers, and starts the `Disruptor` queue. It is important to note that it implements `BeanPostProcessor`, an interface provided by `Spring` that executes the `postProcessAfterInitialization()` method of the post-processor before it actually starts to be used in the `Bean` lifecycle.


- postProcessAfterInitialization() 

`SpringMvcClientBeanPostProcessor` acts as a post-processor which does the following: reads the metadata in the annotation and registers it with `admin`.

```java
public class SpringMvcClientBeanPostProcessor implements BeanPostProcessor {
   // ......
    
    // reads the metadata in the annotation and registers it with admin
    @Override
    public Object postProcessAfterInitialization(@NonNull final Object bean, @NonNull final String beanName) throws BeansException {
        // Configuration attribute, if isFull=true, means register the whole microservice
        if (isFull) {
            return bean;
        }
        // get Controller annotation
        Controller controller = AnnotationUtils.findAnnotation(bean.getClass(), Controller.class);
         // get RequestMapping annotation
        RequestMapping requestMapping = AnnotationUtils.findAnnotation(bean.getClass(), RequestMapping.class);
        if (controller != null || requestMapping != null) {
             // get the ShenyuSpringMvcClient annotation for the current bean
            ShenyuSpringMvcClient clazzAnnotation = AnnotationUtils.findAnnotation(bean.getClass(), ShenyuSpringMvcClient.class);
            String prePath = "";
            // If there is no ShenyuSpringMvcClient annotation, it is returned, indicating that the interface does not need to be registered
            if (Objects.isNull(clazzAnnotation)) {
                return bean;
            }
             // If the path attribute of the ShenyuSpringMvcClient annotation includes *, it means that the entire interface is registered
            if (clazzAnnotation.path().indexOf("*") > 1) {
                // build metadata, publish registration event
                publisher.publishEvent(buildMetaDataDTO(clazzAnnotation, prePath));
                return bean;
            }
            
            prePath = clazzAnnotation.path();
            // get all methods of the current bean
            final Method[] methods = ReflectionUtils.getUniqueDeclaredMethods(bean.getClass());
            for (Method method : methods) {
                // get ShenyuSpringMvcClient annotation
                ShenyuSpringMvcClient shenyuSpringMvcClient = AnnotationUtils.findAnnotation(method, ShenyuSpringMvcClient.class);
                // If the method has the annotation ShenyuSpringMvcClient, it means that the method needs to be registered
                if (Objects.nonNull(shenyuSpringMvcClient)) {
                    // build metadata, publish registration event
                    publisher.publishEvent(buildMetaDataDTO(shenyuSpringMvcClient, prePath));
                }
            }
        }
        return bean;
    }

    // build metadata
    private MetaDataRegisterDTO buildMetaDataDTO(final ShenyuSpringMvcClient shenyuSpringMvcClient, final String prePath) {
        // contextPath
        String contextPath = this.contextPath;
        // appName
        String appName = this.appName;
        // path
        String path;
        if (StringUtils.isEmpty(contextPath)) {
            path = prePath + shenyuSpringMvcClient.path();
        } else {
            path = contextPath + prePath + shenyuSpringMvcClient.path();
        }
        // desc info
        String desc = shenyuSpringMvcClient.desc();
        // ruleName
        String configRuleName = shenyuSpringMvcClient.ruleName();
        String ruleName = StringUtils.isBlank(configRuleName) ? path : configRuleName;
        return MetaDataRegisterDTO.builder()
                .contextPath(contextPath)
                .appName(appName)
                .path(path)
                .pathDesc(desc)
                .rpcType(RpcTypeEnum.HTTP.getName())
                .enabled(shenyuSpringMvcClient.enabled())
                .ruleName(ruleName)
                .registerMetaData(shenyuSpringMvcClient.registerMetaData())
                .build();
    }
}

```

In the post-processor, you need to read the configuration property, if `isFull=true`, it means register the whole microservice. Get the `Controller` annotation, `RequestMapping` annotation, `ShenyuSpringMvcClient` annotation of the current `bean` and determine if the current `bean` is an interface by reading these annotations? Does the interface need to be registered? Does the method need to be registered? Then build metadata based on the properties in the `ShenyuSpringMvcClient` annotation, and finally publish the event for registration via `publisher.publishEvent()`.


The `Controller` annotation and the `RequestMapping` annotation are provided by `Spring`, which you should be familiar with, so I won't go into details. The `ShenyuSpringMvcClient` annotation is provided by `Apache ShenYu` to register the `SpringMvc` client, which is defined as follows.

```java

/**
 * ShenyuSpringMvcClient
 */
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.TYPE, ElementType.METHOD})
public @interface ShenyuSpringMvcClient {
    // path 
    String path();
    
    // ruleName 
    String ruleName() default "";
    
    // desc info
    String desc() default "";

    // enabled
    boolean enabled() default true;
    
    // register MetaData 
    boolean  registerMetaData() default false;
}

```

It is used as follows.

- register the entire interface

```java
@RestController
@RequestMapping("/test")
@ShenyuSpringMvcClient(path = "/test/**")  // register the entire interface
public class HttpTestController {
 //......
}
```

- register current method

```java
@RestController
@RequestMapping("/order")
@ShenyuSpringMvcClient(path = "/order")
public class OrderController {

    /**
     * Save order dto.
     *
     * @param orderDTO the order dto
     * @return the order dto
     */
    @PostMapping("/save")
    @ShenyuSpringMvcClient(path = "/save", desc = "Save order") // register current method
    public OrderDTO save(@RequestBody final OrderDTO orderDTO) {
        orderDTO.setName("hello world save order");
        return orderDTO;
    }
```

- publisher.publishEvent() 


This method sends the data to the `Disruptor` queue. More details about the `Disruptor` queue are not described here, which does not affect the flow of analyzing the registration.

When the data is sent, the consumers of the `Disruptor` queue will process the data for consumption.

This method sends the data to the `Disruptor` queue. More details about the `Disruptor` queue are not described here, which does not affect the flow of analyzing the registration.

- QueueConsumer 

`QueueConsumer` is a consumer that implements the `WorkHandler` interface, which is created in the `providerManage.startup()` logic. The `WorkHandler` interface is the data consumption interface for `disruptor`, and the only method is `onEvent()`.


```java
package com.lmax.disruptor;

public interface WorkHandler<T> {
    void onEvent(T var1) throws Exception;
}
```

The `QueueConsumer` overrides the `onEvent()` method, and the main logic is to generate the consumption task and then go to the thread pool to execute it.

```java

/**
 * 
 * QueueConsumer
 */
public class QueueConsumer<T> implements WorkHandler<DataEvent<T>> {
    
	// ......

    @Override
    public void onEvent(final DataEvent<T> t) {
        if (t != null) {
            // create queue consumption tasks via factory
            QueueConsumerExecutor<T> queueConsumerExecutor = factory.create();
            // set data
            queueConsumerExecutor.setData(t.getData());
            // help gc
            t.setData(null);
            // put in the thread pool to execute the consumption task
            executor.execute(queueConsumerExecutor);
        }
    }
}
```

`QueueConsumerExecutor` is the task that is executed in the thread pool, it implements the `Runnable` interface, and there are two specific implementation classes.

- `RegisterClientConsumerExecutor`: the client-side consumer executor.
- `RegisterServerConsumerExecutor`: server-side consumer executor.

As the name implies, one is responsible for handling client-side tasks, and one is responsible for handling server-side tasks (the server side is `admin`, which is analyzed below).

![](/img/activities/code-analysis-http-register/consumer-executor.png)



- RegisterClientConsumerExecutor 

The logic of the rewritten `run()` is as follows.

```java

public final class RegisterClientConsumerExecutor extends QueueConsumerExecutor<DataTypeParent> {
    
	//...... 

    @Override
    public void run() {
        // get data
        DataTypeParent dataTypeParent = getData();
        // call the appropriate processor for processing according to the data type
        subscribers.get(dataTypeParent.getType()).executor(Lists.newArrayList(dataTypeParent));
    }
    
}
```

Different processors are called to perform the corresponding tasks based on different data types. There are two types of data, one is metadata, which records the client registration information. One is the `URI` data, which records the client service information.

```java
public enum DataType {
 
    META_DATA,
  
    URI,
}
```

- ExecutorSubscriber#executor() 

The actuator subscribers are also divided into two categories, one that handles metadata and one that handles `URIs`. There are two on the client side and two on the server side, so there are four in total.

![](/img/activities/code-analysis-http-register/executor-subscriber.png)



- ShenyuClientMetadataExecutorSubscriber#executor()

The metadata processing logic on the client side is: iterate through the metadata information and call the interface method `persistInterface()` to finish publishing the data.

```java
public class ShenyuClientMetadataExecutorSubscriber implements ExecutorTypeSubscriber<MetaDataRegisterDTO> {
   
    //......
    
    @Override
    public DataType getType() {
        return DataType.META_DATA; 
    }
    
    @Override
    public void executor(final Collection<MetaDataRegisterDTO> metaDataRegisterDTOList) {
        for (MetaDataRegisterDTO metaDataRegisterDTO : metaDataRegisterDTOList) {
            // call the interface method persistInterface() to finish publishing the data
            shenyuClientRegisterRepository.persistInterface(metaDataRegisterDTO);
        }
    }
}
```


- ShenyuClientRegisterRepository#persistInterface()

`ShenyuClientRegisterRepository` is an interface to represent client-side data registration, and it has five implementation classes at present, each of which represents a registration method.

- `ConsulClientRegisterRepository`: client registration is achieved through `Consul`.
- `EtcdClientRegisterRepository`: client registration through `Etcd`.
- `HttpClientRegisterRepository`: client registration via `Http`; `NacosClientRegisterRepository`: client registration via `Http`.
- `NacosClientRegisterRepository`: client registration via `Nacos`; `ZookeeperClientRegisterRepository`: client registration via `Nacos`.
- `ZookeeperClientRegisterRepository`: client registration via `Zookeeper`.


![](/img/activities/code-analysis-http-register/client-register-repository.png)

As you can see from the diagram, the loading of the registry is done by means of `SPI`. This was mentioned earlier, and the specific class loading is done in the client-side generic configuration file by specifying the properties in the configuration file.


```java

/**
 * load ShenyuClientRegisterRepository
 */
public final class ShenyuClientRegisterRepositoryFactory {
    
    private static final Map<String, ShenyuClientRegisterRepository> REPOSITORY_MAP = new ConcurrentHashMap<>();
    
    /**
     * create ShenyuClientRegisterRepository
     */
    public static ShenyuClientRegisterRepository newInstance(final ShenyuRegisterCenterConfig shenyuRegisterCenterConfig) {
        if (!REPOSITORY_MAP.containsKey(shenyuRegisterCenterConfig.getRegisterType())) {
            // loading by means of SPI, type determined by registerType
            ShenyuClientRegisterRepository result = ExtensionLoader.getExtensionLoader(ShenyuClientRegisterRepository.class).getJoin(shenyuRegisterCenterConfig.getRegisterType());
            // perform initialization operations
            result.init(shenyuRegisterCenterConfig);
            ShenyuClientShutdownHook.set(result, shenyuRegisterCenterConfig.getProps());
            REPOSITORY_MAP.put(shenyuRegisterCenterConfig.getRegisterType(), result);
            return result;
        }
        return REPOSITORY_MAP.get(shenyuRegisterCenterConfig.getRegisterType());
    }
}
```

The source code analysis in this article is based on the `Http` way of registration, so we first analyze the `HttpClientRegisterRepository`, and the other registration methods will be analyzed afterwards.


Registration by way of `http` is very simple, it is to call the tool class to send `http` requests. The registration metadata and URI are both called by the same method `doRegister()`, specifying the interface and type.

- `/shenyu-client/register-metadata`: the interface provided by the server for registering metadata.
- `/shenyu-client/register-uri`: Server-side interface for registering URIs.


```java
@Join
public class HttpClientRegisterRepository implements ShenyuClientRegisterRepository {
    // server-side provided interface for registering metadata    
    private static final String META_PATH = "/shenyu-client/register-metadata";

    // the interface provided by the server for registering URIs
    private static final String URI_PATH = "/shenyu-client/register-uri";

    @Override
    public void persistURI(final URIRegisterDTO registerDTO) {
        doRegister(registerDTO, URI_PATH, Constants.URI);
    }
    
    @Override
    public void persistInterface(final MetaDataRegisterDTO metadata) {
        doRegister(metadata, META_PATH, META_TYPE);
    }
    
    // do register
    private <T> void doRegister(final T t, final String path, final String type) {
        // iterate through the list of admin services (admin may be clustered)
        for (String server : serverList) {
            try {
                // calling the tool class to send http requests
                RegisterUtils.doRegister(GsonUtils.getInstance().toJson(t), server + path, type);
                return;
            } catch (Exception e) {
                LOGGER.error("register admin url :{} is fail, will retry", server);
            }
        }
    }
}

```

Serialize the data and send it via `OkHttp`.

```java

public final class RegisterUtils {
   
   //...... 

    // Sending data via OkHttp
    public static void doRegister(final String json, final String url, final String type) throws IOException {
        String result = OkHttpTools.getInstance().post(url, json);
        if (Objects.equals(SUCCESS, result)) {
            LOGGER.info("{} client register success: {} ", type, json);
        } else {
            LOGGER.error("{} client register error: {} ", type, json);
        }
    }
}
```

At this point, the logic of the client registering metadata by means of `http` is finished. To summarize: construct metadata by reading custom annotation information, send the data to the `Disruptor` queue, then consume the data from the queue, put the consumer into the thread pool to execute, and finally send an `http` request to the `admin`.


The source code analysis process of the client-side metadata registration process is completed and described in a flowchart as follows.


![](/img/activities/code-analysis-http-register/client-metadata-register-en.png)


#### 2.4 ContextRegisterListener

Create `ContextRegisterListener`, which is responsible for the construction and registration of client-side `URI` data, and its creation is done in the configuration file.


```java
@Configuration
@ImportAutoConfiguration(ShenyuClientCommonBeanConfiguration.class)
public class ShenyuSpringMvcClientConfiguration {
     // ......
    
    // create ContextRegisterListener
    @Bean
    public ContextRegisterListener contextRegisterListener(final ShenyuClientConfig clientConfig) {
        return new ContextRegisterListener(clientConfig.getClient().get(RpcTypeEnum.HTTP.getName()));
    }
}
```


`ContextRegisterListener` implements the `ApplicationListener` interface and overrides the `onApplicationEvent()` method, which is executed when a Spring event occurs.


```java
public class ContextRegisterListener implements ApplicationListener<ContextRefreshedEvent> {

     //......

    //Instantiation is done through the constructor
    public ContextRegisterListener(final PropertiesConfig clientConfig) {
        // read shenyu.client.http properties
        Properties props = clientConfig.getProps();
        // isFull
        this.isFull = Boolean.parseBoolean(props.getProperty(ShenyuClientConstants.IS_FULL, Boolean.FALSE.toString()));
        // contextPath
        String contextPath = props.getProperty(ShenyuClientConstants.CONTEXT_PATH);
        this.contextPath = contextPath;
        if (isFull) {
            if (StringUtils.isBlank(contextPath)) {
                String errorMsg = "http register param must config the contextPath";
                LOG.error(errorMsg);
                throw new ShenyuClientIllegalArgumentException(errorMsg);
            }
            this.contextPath = contextPath + "/**";
        }
        // port 
        int port = Integer.parseInt(props.getProperty(ShenyuClientConstants.PORT));
        // appName 
        this.appName = props.getProperty(ShenyuClientConstants.APP_NAME);
        // host
        this.host = props.getProperty(ShenyuClientConstants.HOST);
        this.port = port;
    }

    // This method is executed when a context refresh event(ContextRefreshedEvent), occurs
    @Override
    public void onApplicationEvent(@NonNull final ContextRefreshedEvent contextRefreshedEvent) {
        // The contents of the method are guaranteed to be executed only once
        if (!registered.compareAndSet(false, true)) {
            return;
        }
        // If isFull=true means register the entire service, build the metadata and register
        if (isFull) {
            publisher.publishEvent(buildMetaDataDTO());
        }
        
        // build URI data and register it
        publisher.publishEvent(buildURIRegisterDTO());
    }

    // build URI data 
    private URIRegisterDTO buildURIRegisterDTO() {
        String host = IpUtils.isCompleteHost(this.host) ? this.host : IpUtils.getHost(this.host);
        return URIRegisterDTO.builder()
                .contextPath(this.contextPath)
                .appName(appName)
                .host(host)
                .port(port)
                .rpcType(RpcTypeEnum.HTTP.getName())
                .build();
    }

    // build metadata
    private MetaDataRegisterDTO buildMetaDataDTO() {
        String contextPath = this.contextPath;
        String appName = this.appName;
        return MetaDataRegisterDTO.builder()
                .contextPath(contextPath)
                .appName(appName)
                .path(contextPath)
                .rpcType(RpcTypeEnum.HTTP.getName())
                .enabled(true)
                .ruleName(contextPath)
                .build();
    }
}

```

The main thing in the constructor is to read the property configuration.

The `onApplicationEvent()` method is executed when a `Spring` event occurs, the parameter here is `ContextRefreshedEvent`, which means the context refresh event. The logic here is executed when the `Spring` container is ready: if `isFull=true` means register the whole service, build the metadata and register it, the case `isFull=true` is not handled in the post-processor `SpringMvcClientBeanPostProcessor` analyzed earlier, so here it is processing. Then the `URI` data is constructed and registered.


> `ContextRefreshedEvent` is a `Spring` built-in event. It is fired when the `ApplicationContext` is initialized or refreshed. This can also happen in the `ConfigurableApplicationContext` interface using the `refresh()` method. Initialization here means that all `Bean`s have been successfully loaded, post-processing `Bean`s have been detected and activated, all `Singleton Bean`s have been pre-instantiated, and the `ApplicationContext` container is ready to be used.


The registration logic is done through `publisher.publishEvent()`. It has been analyzed earlier: data is written to the `Disruptor` queue, consumed from it, and finally processed by the `ExecutorSubscriber`.

- ExecutorSubscriber#executor()

The actuator subscribers are divided into two categories, one that handles metadata and one that handles `URIs`. There are two on the client side and two on the server side, so there are four in total.

![](/img/activities/code-analysis-http-register/executor-subscriber.png)

Here is the registration `URI` information, so the execution class is `ShenyuClientURIExecutorSubscriber`.


- ShenyuClientURIExecutorSubscriber#executor()

The main logic is to iterate through the URI data collection and implement data registration through the `persistURI()` method.


```java

public class ShenyuClientURIExecutorSubscriber implements ExecutorTypeSubscriber<URIRegisterDTO> {
    
    //......
    
    @Override
    public DataType getType() {
        return DataType.URI; 
    }
    
    // register URI
    @Override
    public void executor(final Collection<URIRegisterDTO> dataList) {
        for (URIRegisterDTO uriRegisterDTO : dataList) {
            Stopwatch stopwatch = Stopwatch.createStarted();
            while (true) {
                try (Socket ignored = new Socket(uriRegisterDTO.getHost(), uriRegisterDTO.getPort())) {
                    break;
                } catch (IOException e) {
                    long sleepTime = 1000;
                    // maybe the port is delay exposed
                    if (stopwatch.elapsed(TimeUnit.SECONDS) > 5) {
                        LOG.error("host:{}, port:{} connection failed, will retry",
                                uriRegisterDTO.getHost(), uriRegisterDTO.getPort());
                        // If the connection fails for a long time, Increase sleep time
                        if (stopwatch.elapsed(TimeUnit.SECONDS) > 180) {
                            sleepTime = 10000;
                        }
                    }
                    try {
                        TimeUnit.MILLISECONDS.sleep(sleepTime);
                    } catch (InterruptedException ex) {
                        ex.printStackTrace();
                    }
                }
            }
            ShenyuClientShutdownHook.delayOtherHooks();
            
            shenyuClientRegisterRepository.persistURI(uriRegisterDTO);
        }
    }
}
```

The `while(true)` loop in the code is to ensure that the client has been successfully started and can connect via `host` and `port`.

The logic behind it is: add the `hook` function for gracefully stopping the client .

Data registration is achieved through the `persistURI()` method. The whole logic is also analyzed in the previous section, and ultimately it is the `OkHttp` client that initiates `http` to `shenyu-admin` and registers the `URI` by way of `http`.

The analysis of the registration logic of the client is finished here, and the metadata and URI data constructed are sent to the `Disruptor` queue, from which they are then consumed, read, and sent to `admin` via `http`.


The source code analysis of the client-side `URI` registration process is complete, with the following flow chart.

![](/img/activities/code-analysis-http-register/client-uri-register-en.png)


### 3. Server-side registration process


#### 3.1 ShenyuHttpRegistryController

From the previous analysis, we know that the server side provides two interfaces for registration.

- `/shenyu-client/register-metadata`: The interface provided by the server side is used to register metadata.
- `/shenyu-client/register-uri`: The server-side interface is provided for registering URIs.


These two interfaces are located in `ShenyuHttpRegistryController`, which implements the `ShenyuServerRegisterRepository` interface and is the implementation class for server-side registration. It is marked with `@Join` to indicate loading via `SPI`.

```java
@RequestMapping("/shenyu-client")
@Join
public class ShenyuHttpRegistryController implements ShenyuServerRegisterRepository {

    private ShenyuServerRegisterPublisher publisher;

    @Override
    public void init(final ShenyuServerRegisterPublisher publisher, final ShenyuRegisterCenterConfig config) {
        this.publisher = publisher;
    }
    
    // register Metadata
    @PostMapping("/register-metadata")
    @ResponseBody
    public String registerMetadata(@RequestBody final MetaDataRegisterDTO metaDataRegisterDTO) {
        publish(metaDataRegisterDTO);
        return ShenyuResultMessage.SUCCESS;
    }
        
   // register URI
    @PostMapping("/register-uri")
    @ResponseBody
    public String registerURI(@RequestBody final URIRegisterDTO uriRegisterDTO) {
        publish(uriRegisterDTO);
        return ShenyuResultMessage.SUCCESS;
    }

    // publish event
    private <T> void publish(final T t) {
        publisher.publish(Collections.singletonList(t));
    }
}

```

The two registration interfaces get the data well and call the `publish()` method to publish the data to the `Disruptor` queue.

- `ShenyuServerRegisterRepository`

The `ShenyuServerRegisterRepository` interface is a service registration interface, which has five implementation classes, indicating five types of registration.

- `ConsulServerRegisterRepository`: registration is achieved through `Consul`;
- `EtcdServerRegisterRepository`: registration through `Etcd`.
- `NacosServerRegisterRepository`: registration through `Nacos`.
- `ShenyuHttpRegistryController`: registration via `Http`; `ShenyuHttpRegistryController`: registration via `Http`.
- `ZookeeperServerRegisterRepository`: registration through `Zookeeper`.


The exact method used is specified by the configuration file and then loaded via `SPI`.


In the `application.yml` file in `shenyu-admin` configure the registration method, `registerType` specify the registration type, when registering with `http`, `serverLists` do not need to be filled in, for more configuration instructions you can refer to the official website [Client Access Configuration](https://shenyu.apache.org/zh/docs/user-guide/register-center-access).

```java
shenyu:
  register:
    registerType: http 
    serverLists: 
```

- RegisterCenterConfiguration 

After introducing the relevant dependencies and properties configuration, when starting `shenyu-admin`, the configuration file will be loaded first, and the configuration file class related to the registration center is `RegisterCenterConfiguration`.


```java
@Configuration
public class RegisterCenterConfiguration {
    @Bean
    @ConfigurationProperties(prefix = "shenyu.register")
    public ShenyuRegisterCenterConfig shenyuRegisterCenterConfig() {
        return new ShenyuRegisterCenterConfig();
    }
    
    //create ShenyuServerRegisterRepository to register in admin
    @Bean
    public ShenyuServerRegisterRepository shenyuServerRegisterRepository(final ShenyuRegisterCenterConfig shenyuRegisterCenterConfig, final List<ShenyuClientRegisterService> shenyuClientRegisterService) {
        // 1. get the registration type from the configuration property
        String registerType = shenyuRegisterCenterConfig.getRegisterType();
        // 2. load the implementation class by registering the type with the SPI method
        ShenyuServerRegisterRepository registerRepository = ExtensionLoader.getExtensionLoader(ShenyuServerRegisterRepository.class).getJoin(registerType);
        // 3. get the publisher and write data to the Disruptor queue
        RegisterServerDisruptorPublisher publisher = RegisterServerDisruptorPublisher.getInstance();
        // 4. ShenyuClientRegisterService, rpcType -> registerService
        Map<String, ShenyuClientRegisterService> registerServiceMap = shenyuClientRegisterService.stream().collect(Collectors.toMap(ShenyuClientRegisterService::rpcType, e -> e));
        // 5. start publisher
        publisher.start(registerServiceMap);
        // 6. init registerRepository
        registerRepository.init(publisher, shenyuRegisterCenterConfig);
        return registerRepository;
    }
}

```

Two `bean`s are generated in the configuration class.

- `shenyuRegisterCenterConfig`: to read the attribute configuration.

- `shenyuServerRegisterRepository`: for server-side registration.


In the process of creating `shenyuServerRegisterRepository`, a series of preparations are also performed.

- 1. get the registration type from the configuration property.
- 2. Load the implementation class by the registration type with the `SPI` method: for example, if the specified type is `http`, `ShenyuHttpRegistryController` will be loaded.
- 3. Get `publisher` and write data to the `Disruptor` queue.
- 4. Register `Service`, `rpcType -> registerService`: get the registered `Service`, each `rpc` has a corresponding `Service`. The client for this article is built through `springboot`, which belongs to the `http` type, and other client types: `dubbo`, `Spring Cloud`, `gRPC`, etc.
- 5. Preparation for event publishing: add server-side metadata and `URI` subscribers, process the data. And start the `Disruptor` queue.
- 6. Initialization operation for registration: `http` type registration initialization operation is to save `publisher`.



- RegisterServerDisruptorPublisher#publish()

The server-side publisher that writes data to the `Disruptor` queue , built via the singleton pattern.

```java

public class RegisterServerDisruptorPublisher implements ShenyuServerRegisterPublisher {
    private static final RegisterServerDisruptorPublisher INSTANCE = new RegisterServerDisruptorPublisher();

    public static RegisterServerDisruptorPublisher getInstance() {
        return INSTANCE;
    }
    
   //prepare for event publishing, add server-side metadata and URI subscribers, process data. And start the Disruptor queue.
    public void start(final Map<String, ShenyuClientRegisterService> shenyuClientRegisterService) {
        factory = new RegisterServerExecutorFactory();
        // add URI data subscriber
        factory.addSubscribers(new URIRegisterExecutorSubscriber(shenyuClientRegisterService));
        // add Metadata subscriber
        factory.addSubscribers(new MetadataExecutorSubscriber(shenyuClientRegisterService));
        //start Disruptor
        providerManage = new DisruptorProviderManage(factory);
        providerManage.startup();
    }
    
    // write data to queue
    @Override
    public <T> void publish(final T data) {
        DisruptorProvider<Object> provider = providerManage.getProvider();
        provider.onData(f -> f.setData(data));
    }
    
    @Override
    public void close() {
        providerManage.getProvider().shutdown();
    }
}
```


The loading of the configuration file, which can be seen as the initialization process of the registry server, is described in the following diagram.


![](/img/activities/code-analysis-http-register/server-register-init-en.png)


#### 3.2 QueueConsumer

In the previous analysis of the client-side `disruptor` queue consumption of data over. The server side has the same logic, except that the executor performing the task changes.

The `QueueConsumer` is a consumer that implements the `WorkHandler` interface, which is created in the `providerManage.startup()` logic. The `WorkHandler` interface is the data consumption interface for `disruptor`, and the only method is `onEvent()`.

```java
package com.lmax.disruptor;

public interface WorkHandler<T> {
    void onEvent(T var1) throws Exception;
}
```

The `QueueConsumer` overrides the `onEvent()` method, and the main logic is to generate the consumption task and then go to the thread pool to execute it.


```java
/**
 * 
 * QueueConsumer
 */
public class QueueConsumer<T> implements WorkHandler<DataEvent<T>> {
    
	// ......

    @Override
    public void onEvent(final DataEvent<T> t) {
        if (t != null) {
            // create queue consumption tasks via factory
            QueueConsumerExecutor<T> queueConsumerExecutor = factory.create();
            // set data
            queueConsumerExecutor.setData(t.getData());
            // help gc
            t.setData(null);
            // put in the thread pool to execute the consumption task
            executor.execute(queueConsumerExecutor);
        }
    }
}
```

`QueueConsumerExecutor` is the task that is executed in the thread pool, it implements the `Runnable` interface, and there are two specific implementation classes.

- `RegisterClientConsumerExecutor`: the client-side consumer executor.
- `RegisterServerConsumerExecutor`: server-side consumer executor.

As the name implies, one is responsible for handling client-side tasks and one is responsible for handling server-side tasks.


- `RegisterServerConsumerExecutor#run()`

`RegisterServerConsumerExecutor` is a server-side consumer executor that indirectly implements the `Runnable` interface via `QueueConsumerExecutor` and overrides the `run()` method.


```java

public final class RegisterServerConsumerExecutor extends QueueConsumerExecutor<List<DataTypeParent>> {
   // ...

    @Override
    public void run() {
        //get the data from the disruptor queue
        List<DataTypeParent> results = getData();
        // check data
        results = results.stream().filter(data -> isValidData(data)).collect(Collectors.toList());
        if (CollectionUtils.isEmpty(results)) {
            return;
        }
        //execute operations according to type
        getType(results).executor(results);
    }
    
    // get subscribers by type
    private ExecutorSubscriber getType(final List<DataTypeParent> list) {
        DataTypeParent result = list.get(0);
        return subscribers.get(result.getType());
    }
}

```


- ExecutorSubscriber#executor()

The actuator subscribers are divided into two categories, one that handles metadata and one that handles `URIs`. There are two on the client side and two on the server side, so there are four in total.


![](/img/activities/code-analysis-http-register/executor-subscriber.png)


- MetadataExecutorSubscriber#executor()

In case of registering metadata, this is achieved by `MetadataExecutorSubscriber#executor()`: get the registered `Service` according to the type and call `register()`.

```java
public class MetadataExecutorSubscriber implements ExecutorTypeSubscriber<MetaDataRegisterDTO> {
 
    //......

    @Override
    public DataType getType() {
        return DataType.META_DATA; 
    }

    @Override
    public void executor(final Collection<MetaDataRegisterDTO> metaDataRegisterDTOList) {
        // Traversing the metadata list
        for (MetaDataRegisterDTO metaDataRegisterDTO : metaDataRegisterDTOList) {
            // Get registered Service by type
            ShenyuClientRegisterService shenyuClientRegisterService = this.shenyuClientRegisterService.get(metaDataRegisterDTO.getRpcType());
            Objects.requireNonNull(shenyuClientRegisterService);
            // Registration of metadata, locking to ensure sequential execution and prevent concurrent errors
            synchronized (ShenyuClientRegisterService.class) {
                shenyuClientRegisterService.register(metaDataRegisterDTO);
            }
        }
    }
}
```


- URIRegisterExecutorSubscriber#executor()

In case of registration metadata, this is achieved by `URIRegisterExecutorSubscriber#executor()`: construct `URI` data, find `Service` according to the registration type, and achieve registration by the `registerURI` method.


```java

public class URIRegisterExecutorSubscriber implements ExecutorTypeSubscriber<URIRegisterDTO> {
    //......
    
    @Override
    public DataType getType() {
        return DataType.URI; 
    }
    
    @Override
    public void executor(final Collection<URIRegisterDTO> dataList) {
        if (CollectionUtils.isEmpty(dataList)) {
            return;
        }
        // Build URI data types and register them with the registerURI method
        findService(dataList).ifPresent(service -> {
            Map<String, List<URIRegisterDTO>> listMap = buildData(dataList);
            listMap.forEach(service::registerURI);
        });
    }
    
    // Find Service by type
    private Optional<ShenyuClientRegisterService> findService(final Collection<URIRegisterDTO> dataList) {
        return dataList.stream().map(dto -> shenyuClientRegisterService.get(dto.getRpcType())).findFirst();
    }
}

```


- ShenyuClientRegisterService#register()

`ShenyuClientRegisterService` is the registration method interface, which has several implementation classes.

![](/img/activities/code-analysis-http-register/client-register-service.png)



- `AbstractContextPathRegisterService`: abstract class, handling part of the public logic.
- `AbstractShenyuClientRegisterServiceImpl`: : abstract class, handles part of the public logic.
- `ShenyuClientRegisterDivideServiceImpl`: `divide` class, handles `http` registration types.
- `ShenyuClientRegisterDubboServiceImpl`: `dubbo` class, handles `dubbo` registration types.
- `ShenyuClientRegisterGrpcServiceImpl`: `gRPC` class, handles `gRPC` registration types.
- `ShenyuClientRegisterMotanServiceImpl`: `Motan` class, handles `Motan` registration types.
- `ShenyuClientRegisterSofaServiceImpl`: `Sofa` class, handles `Sofa` registration types.
- `ShenyuClientRegisterSpringCloudServiceImpl`: `SpringCloud` class, handles `SpringCloud` registration types.
- `ShenyuClientRegisterTarsServiceImpl`: `Tars` class, handles `Tars` registration types.


From the above, we can see that each microservice has a corresponding registration implementation class. The source code analysis in this article is based on the official [shenyu-examples-http](https://github.com/apache/incubator-shenyu/tree/master/shenyu-examples/shenyu-examples-http) as an example, it is of `http` registration type, so the registration implementation class for metadata and URI data is `ShenyuClientRegisterDivideServiceImpl`: `ShenyuClientRegisterDivideServiceImpl`.

- register(): 

```java
public String register(final MetaDataRegisterDTO dto) {
        // 1.register selector information
        String selectorHandler = selectorHandler(dto);
        String selectorId = selectorService.registerDefault(dto, PluginNameAdapter.rpcTypeAdapter(rpcType()), selectorHandler);
        // 2.register rule information
        String ruleHandler = ruleHandler();
        RuleDTO ruleDTO = buildRpcDefaultRuleDTO(selectorId, dto, ruleHandler);
        ruleService.registerDefault(ruleDTO);
        // 3.register metadata information
        registerMetadata(dto);
        // 4.register contextPath
        String contextPath = dto.getContextPath();
        if (StringUtils.isNotEmpty(contextPath)) {
            registerContextPath(dto);
        }
        return ShenyuResultMessage.SUCCESS;
    }
```

The whole registration logic can be divided into 4 steps.

- 1. Register selector information
- 2. Register rule information
- 3. Register metadata information
- 4. Register `contextPath

This side of `admin` requires the construction of selectors, rules, metadata and `ContextPath` through the metadata information of the client. The specific registration process and details of processing are related to the `rpc` type. We will not continue to track down the logical analysis of the registration center, tracking to this point is enough.


The source code of the server-side metadata registration process is analyzed and the flow chart is described as follows.


![](/img/activities/code-analysis-http-register/server-metadata-register-en.png)


- registerURI()

```java
public String registerURI(final String selectorName, final List<URIRegisterDTO> uriList) {
        if (CollectionUtils.isEmpty(uriList)) {
            return "";
        }
        // Does the corresponding selector exist
        SelectorDO selectorDO = selectorService.findByNameAndPluginName(selectorName, PluginNameAdapter.rpcTypeAdapter(rpcType()));
        if (Objects.isNull(selectorDO)) {
            return "";
        }
        // Handle handler information in the selector
        String handler = buildHandle(uriList, selectorDO);
        selectorDO.setHandle(handler);
        SelectorData selectorData = selectorService.buildByName(selectorName, PluginNameAdapter.rpcTypeAdapter(rpcType()));
        selectorData.setHandle(handler);
       
        // Update records in the database
        selectorService.updateSelective(selectorDO);
        // publish Event to gateway
        eventPublisher.publishEvent(new DataChangedEvent(ConfigGroupEnum.SELECTOR, DataEventTypeEnum.UPDATE, Collections.singletonList(selectorData)));
        return ShenyuResultMessage.SUCCESS;
    }
```

After `admin` gets the `URI` data, it mainly updates the `handler` information in the selector, then writes it to the database, and finally publishes the event notification gateway. The logic of notifying the gateway is done by the data synchronization operation, which has been analyzed in the previous article, so we will not repeat it.


The source code analysis of the server-side `URI` registration process is complete and is described in the following diagram.


![](/img/activities/code-analysis-http-register/server-uri-register-en.png)

At this point, the server-side registration process is also analyzed, mainly through the interface provided externally, accept the registration information from the client, and then write to the `Disruptor` queue, and then consume data from it, and update the `admin` selector, rules, metadata and selector `handler` according to the received metadata and `URI` data.

### 4. Summary

This article focuses on the `http registration` module of the `Apache ShenYu` gateway for source code analysis. The main knowledge points involved are summarized as follows.

- The register center is for registering client information to `admin` to facilitate traffic filtering.
- `http` registration is to register client metadata information and `URI` information to `admin`.
- `http` service access is identified by the annotation `@ShenyuSpringMvcClient`.
- construction of the registration information mainly through the `Spring` post-processor `BeanPostProcessor` and the application listener `ApplicationListener`.
- loading of the registration type is done through `SPI`.
- The `Disruptor` queue was introduced to decouple data from operations, and data buffering.
- The implementation of the registry uses interface-oriented programming, using design patterns such as template methods, singleton, and observer.
