---
title: 注册中心实现原理之Http注册
author: midnight2104
author_title: Apache ShenYu Committer
author_url: https://github.com/midnight2104
tags: [http,register center,Apache ShenYu]
---

> [Apache ShenYu](https://shenyu.apache.org/zh/docs/index) 是一个异步的，高性能的，跨语言的，响应式的 `API` 网关。

在`ShenYu`网关中，注册中心是用于将客户端信息注册到`shenyu-admin`，`admin`再通过数据同步将这些信息同步到网关，网关通过这些数据完成流量筛选。客户端信息主要包括`接口信息`和`URI信息`。

> 本文基于`shenyu-2.4.1`版本进行源码分析，官网的介绍请参考 [客户端接入原理](https://shenyu.apache.org/zh/docs/design/register-center-design) 。


### 1. 注册中心原理

当客户端启动时，读取接口信息和`uri信息`，通过指定的注册类型，将数据发送到`shenyu-admin`。

![](/img/activities/code-analysis-http-register/register-center.png)


图中的注册中心需要用户指定使用哪种注册类型，`ShenYu`当前支持`Http`、`Zookeeper`、`Etcd`、`Consul`和`Nacos`进行注册。具体如何配置请参考 [客户端接入配置](https://shenyu.apache.org/zh/docs/user-guide/register-center-access) 。


`ShenYu`在注册中心的原理设计上引入了`Disruptor`，`Disruptor`队列在其中起到数据与操作解耦，利于扩展。如果注册请求过多，导致注册异常，也有数据缓冲作用。



![](/img/activities/code-analysis-http-register/shenyu-register-center.png)



如图所示，注册中心分为两个部分，一是注册中心客户端`register-client`，负载处理客户端数据读取。另一个是注册中心服务端`register-server`，负载处理服务端（就是`shenyu-admin`）数据写入。通过指定注册类型进行数据发送和接收。

- 客户端：通常来说就是一个微服务，可以是`springmvc`，`spring-cloud`，`dubbo`，`grpc`等。
- `register-client`：注册中心客户端，读取客户接口和`uri`信息。
- `Disruptor`：数据与操作解耦，数据缓冲作用。
- `register-server`：注册中心服务端，这里就是`shenyu-admin`，接收数据，写入数据库，发数据同步事件。
- 注册类型：指定注册类型，完成数据注册，当前支持`Http`、`Zookeeper`、`Etcd`、`Consul`和`Nacos`。



本文分析的是使用`Http`的方式进行注册，所以具体的处理流程如下：



![](/img/activities/code-analysis-http-register/shenyu-register-center-http.png)



在客户端，数据出队列后，通过`http`传输数据，在服务端，提供相应的接口，接收数据，然后写入队列。



### 2. 客户端注册流程



当客户端启动后，根据相关配置，读取属性信息，然后写入队列。以官方提供的 [shenyu-examples-http](https://github.com/apache/incubator-shenyu/tree/master/shenyu-examples/shenyu-examples-http) 为例，开始源码分析。官方提供的例子是一个由`springboot`构建的微服务。注册中心的相关配置可以参考官网  [客户端接入配置](https://shenyu.apache.org/zh/docs/user-guide/register-center-access) 。



#### 2.1 加载配置，读取属性



先用一张图串联下注册中心客户端初始化流程：



![](/img/activities/code-analysis-http-register/client-register-init-zh.png)



我们分析的是通过`http`的方式进行注册，所以需要进行如下配置：

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

每个属性表示的含义如下：

- `registerType `: 服务注册类型，填写 `http`。
- `serverList`: 为`http`注册类型时，填写`Shenyu-Admin`项目的地址，注意加上`http://`，多个地址用英文逗号分隔。
-  `port`: 你本项目的启动端口，目前`springmvc/tars/grpc`需要进行填写。
- `contextPath`: 为你的这个`mvc`项目在`shenyu`网关的路由前缀， 比如`/order` ，`/product` 等等，网关会根据你的这个前缀来进行路由。
- `appName`：你的应用名称，不配置的话，会默认取 `spring.application.name` 的值。
- `isFull`: 设置 `true` 代表代理你的整个服务，`false`表示代理你其中某几个`controller`；目前适用于`springmvc/springcloud`。

项目启动后，会先加载配置文件，读取属性信息，生成相应的`Bean`。



首先读取到的配置文件是 `ShenyuSpringMvcClientConfiguration`，它是`shenyu` 客户端`http`注册配置类，通过`@Configuration`表示这是一个配置类，通过`@ImportAutoConfiguration`引入其他配置类。创建`SpringMvcClientBeanPostProcessor`，主要处理元数据。创建`ContextRegisterListener`，主要处理 `URI` 信息。

```java
/**
 * shenyu 客户端http注册配置类
 */
@Configuration
@ImportAutoConfiguration(ShenyuClientCommonBeanConfiguration.class)
public class ShenyuSpringMvcClientConfiguration {

    //创建SpringMvcClientBeanPostProcessor，主要处理元数据
    @Bean
    public SpringMvcClientBeanPostProcessor springHttpClientBeanPostProcessor(final ShenyuClientConfig clientConfig,final ShenyuClientRegisterRepository shenyuClientRegisterRepository) {
        return new SpringMvcClientBeanPostProcessor(clientConfig.getClient().get(RpcTypeEnum.HTTP.getName()), shenyuClientRegisterRepository);
    }
    
   // 创建ContextRegisterListener，主要处理 URI信息
    @Bean
    public ContextRegisterListener contextRegisterListener(final ShenyuClientConfig clientConfig) {
        return new ContextRegisterListener(clientConfig.getClient().get(RpcTypeEnum.HTTP.getName()));
    }
}

```



`ShenyuClientCommonBeanConfiguration`是`shenyu`客户端通用配置类，会创建注册中心客户端通用的`bean`。

- 创建`ShenyuClientRegisterRepository`，通过工厂类创建而成。
- 创建`ShenyuRegisterCenterConfig`，读取`shenyu.register`属性配置。
- 创建`ShenyuClientConfig`，读取`shenyu.client`属性配置。

```java

/**
 * shenyu客户端通用配置类
 */
@Configuration
public class ShenyuClientCommonBeanConfiguration {
    
   // 创建ShenyuClientRegisterRepository，通过工厂类创建而成。
    @Bean
    public ShenyuClientRegisterRepository shenyuClientRegisterRepository(final ShenyuRegisterCenterConfig config) {
        return ShenyuClientRegisterRepositoryFactory.newInstance(config);
    }
    
	// 创建ShenyuRegisterCenterConfig，读取shenyu.register属性配置
    @Bean
    @ConfigurationProperties(prefix = "shenyu.register")
    public ShenyuRegisterCenterConfig shenyuRegisterCenterConfig() {
        return new ShenyuRegisterCenterConfig();
    }
    
  // 创建ShenyuClientConfig，读取shenyu.client属性配置
    @Bean
    @ConfigurationProperties(prefix = "shenyu")
    public ShenyuClientConfig shenyuClientConfig() {
        return new ShenyuClientConfig();
    }
}

```



#### 2.2 用于注册的 HttpClientRegisterRepository

上面的配置文件中生成的`ShenyuClientRegisterRepository`是客户端注册的具体实现，它是一个接口，它的实现类如下。

![](/img/activities/code-analysis-http-register/shenyu-client-register-repository.png)

- `HttpClientRegisterRepository`：通过`http`进行注册；
- `ConsulClientRegisterRepository`：通过`Consul`进行注册；
- `EtcdClientRegisterRepository`：通过`Etcd`进行注册；
- `NacosClientRegisterRepository`：通过`nacos`进行注册；
- `ZookeeperClientRegisterRepository`通过`Zookeeper`进行注册。



具体是哪一种方式，是通过`SPI`进行加载实现的，实现逻辑如下：

```java

/**
 * 加载 ShenyuClientRegisterRepository
 */
public final class ShenyuClientRegisterRepositoryFactory {
    
    private static final Map<String, ShenyuClientRegisterRepository> REPOSITORY_MAP = new ConcurrentHashMap<>();
    
    /**
     * 创建 ShenyuClientRegisterRepository
     */
    public static ShenyuClientRegisterRepository newInstance(final ShenyuRegisterCenterConfig shenyuRegisterCenterConfig) {
        if (!REPOSITORY_MAP.containsKey(shenyuRegisterCenterConfig.getRegisterType())) {
            // 通过SPI的方式进行加载，类型由registerType决定
            ShenyuClientRegisterRepository result = ExtensionLoader.getExtensionLoader(ShenyuClientRegisterRepository.class).getJoin(shenyuRegisterCenterConfig.getRegisterType());
            //执行初始化操作
            result.init(shenyuRegisterCenterConfig);
            ShenyuClientShutdownHook.set(result, shenyuRegisterCenterConfig.getProps());
            REPOSITORY_MAP.put(shenyuRegisterCenterConfig.getRegisterType(), result);
            return result;
        }
        return REPOSITORY_MAP.get(shenyuRegisterCenterConfig.getRegisterType());
    }
}
```



加载类型通过`registerType`指定，也就是我们在配置文件中指定的类型：

```xml
shenyu:
  register:
    registerType: http
    serverLists: http://localhost:9095
```



我们指定的是`http`，所以会去加载`HttpClientRegisterRepository`。对象创建成功后，执行的初始化方法`init()`如下：

```jav
@Join
public class HttpClientRegisterRepository implements ShenyuClientRegisterRepository {
    
    @Override
    public void init(final ShenyuRegisterCenterConfig config) {
        this.serverList = Lists.newArrayList(Splitter.on(",").split(config.getServerLists()));
    }
  
  // 暂时省略其他逻辑
}
```

读取配置文件中的`serverLists`，即`sheenyu-admin`的地址，为后续数据发送做准备。类注解`@Join`用于`SPI`的加载。



> `SPI` 全称为 `Service Provider Interface`, 是 `JDK` 内置的一种服务提供发现功能, 一种动态替换发现的机制。
>
> [shenyu-spi](https://github.com/apache/incubator-shenyu/tree/master/shenyu-spi) 是`Apache ShenYu`网关自定义的`SPI`扩展实现，设计和实现原理参考了`Dubbo`的 [SPI扩展实现](https://dubbo.apache.org/zh/docs/v2.7/dev/impls/) 。



#### 2.3 构建元数据的 SpringMvcClientBeanPostProcessor

创建`SpringMvcClientBeanPostProcessor`，负责元数据的构建和注册，它的构造函数逻辑如下：

```java

/**
 *  spring mvc 客户端bean的后置处理器
 */
public class SpringMvcClientBeanPostProcessor implements BeanPostProcessor {

    /**
     * 通过构造函数进行实例化
     */
    public SpringMvcClientBeanPostProcessor(final PropertiesConfig clientConfig,
                                            final ShenyuClientRegisterRepository shenyuClientRegisterRepository) {
        // 读取配置属性
        Properties props = clientConfig.getProps();
        // 获取端口信息，并校验
        int port = Integer.parseInt(props.getProperty(ShenyuClientConstants.PORT));
        if (port <= 0) {
            String errorMsg = "http register param must config the port must > 0";
            LOG.error(errorMsg);
            throw new ShenyuClientIllegalArgumentException(errorMsg);
        }
        // 获取appName
        this.appName = props.getProperty(ShenyuClientConstants.APP_NAME);
        // 获取contextPath
        this.contextPath = props.getProperty(ShenyuClientConstants.CONTEXT_PATH);
        // 校验appName和contextPath
        if (StringUtils.isBlank(appName) && StringUtils.isBlank(contextPath)) {
            String errorMsg = "http register param must config the appName or contextPath";
            LOG.error(errorMsg);
            throw new ShenyuClientIllegalArgumentException(errorMsg);
        }
        // 获取 isFull
        this.isFull = Boolean.parseBoolean(props.getProperty(ShenyuClientConstants.IS_FULL, Boolean.FALSE.toString()));
        // 开始事件发布
        publisher.start(shenyuClientRegisterRepository);
    }

    // 暂时省略了其他逻辑
    @Override
    public Object postProcessAfterInitialization(@NonNull final Object bean, @NonNull final String beanName) throws BeansException {
     // 暂时省略了其他逻辑
    }

}

```



在构造函数中，主要是读取属性信息，然后进行校验。

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



最后，执行了` publisher.start()`，开始事件发布，为注册做准备。



- ShenyuClientRegisterEventPublisher

`ShenyuClientRegisterEventPublisher`通过单例模式实现，主要是生成`元数据`和`URI`订阅器（后续用于数据发布），然后启动`Disruptor`队列。提供了一个共有方法`publishEvent()`，发布事件，向Disruptor队列发数据。

```java

public class ShenyuClientRegisterEventPublisher {
    // 私有变量
    private static final ShenyuClientRegisterEventPublisher INSTANCE = new ShenyuClientRegisterEventPublisher();
    
    private DisruptorProviderManage providerManage;
    
    private RegisterClientExecutorFactory factory;
    
    /**
     * 公开静态方法
     *
     * @return ShenyuClientRegisterEventPublisher instance
     */
    public static ShenyuClientRegisterEventPublisher getInstance() {
        return INSTANCE;
    }
    
    /**
     * Start方法执行
     *
     * @param shenyuClientRegisterRepository shenyuClientRegisterRepository
     */
    public void start(final ShenyuClientRegisterRepository shenyuClientRegisterRepository) {
        // 创建客户端注册工厂类
        factory = new RegisterClientExecutorFactory();
        // 添加元数据订阅器
        factory.addSubscribers(new ShenyuClientMetadataExecutorSubscriber(shenyuClientRegisterRepository));
        //  添加URI订阅器
        factory.addSubscribers(new ShenyuClientURIExecutorSubscriber(shenyuClientRegisterRepository));
        // 启动Disruptor队列
        providerManage = new DisruptorProviderManage(factory);
        providerManage.startup();
    }
    
    /**
     * 发布事件，向Disruptor队列发数据
     *
     * @param <T> the type parameter
     * @param data the data
     */
    public <T> void publishEvent(final T data) {
        DisruptorProvider<Object> provider = providerManage.getProvider();
        provider.onData(f -> f.setData(data));
    }
}
```

`SpringMvcClientBeanPostProcessor`的构造函数逻辑分析完了，主要是读取属性配置，创建元数据和`URI`订阅器， 启动`Disruptor`队列。要注意到它实现了`BeanPostProcessor`，这是`Spring`提供的一个接口，在`Bean`的生命周期中，真正开始使用之前，会执行后置处理器的`postProcessAfterInitialization()`方法。



- postProcessAfterInitialization() 方法

`SpringMvcClientBeanPostProcessor`作为一个后置处理器，它的功能是：读取注解中的元数据，并向`admin`注册。

```java
// 后置处理器
public class SpringMvcClientBeanPostProcessor implements BeanPostProcessor {
   // 省略了其他逻辑
    
    // 后置处理器：读取注解中的元数据，并向admin注册
    @Override
    public Object postProcessAfterInitialization(@NonNull final Object bean, @NonNull final String beanName) throws BeansException {
        // 配置属性，如果 isFull=true 的话，表示注册整个微服务
        if (isFull) {
            return bean;
        }
        // 获取当前bean的Controller注解
        Controller controller = AnnotationUtils.findAnnotation(bean.getClass(), Controller.class);
         // 获取当前bean的RequestMapping注解
        RequestMapping requestMapping = AnnotationUtils.findAnnotation(bean.getClass(), RequestMapping.class);
        // 如果这个bean是一个接口
        if (controller != null || requestMapping != null) {
               // 获取当前bean的 ShenyuSpringMvcClient 注解
            ShenyuSpringMvcClient clazzAnnotation = AnnotationUtils.findAnnotation(bean.getClass(), ShenyuSpringMvcClient.class);
            String prePath = "";
            //如果没有 ShenyuSpringMvcClient 注解，就返回，表示这个接口不需要注册
            if (Objects.isNull(clazzAnnotation)) {
                return bean;
            }
             //如果 ShenyuSpringMvcClient 注解中的path属性包括 * ，表示注册整个接口
            if (clazzAnnotation.path().indexOf("*") > 1) {
                // 构建元数据，发送注册事件
                publisher.publishEvent(buildMetaDataDTO(clazzAnnotation, prePath));
                return bean;
            }
            
            prePath = clazzAnnotation.path();
            // 获取当前bean的所有方法
            final Method[] methods = ReflectionUtils.getUniqueDeclaredMethods(bean.getClass());
            // 遍历方法
            for (Method method : methods) {
                // 获取当前方法上的注解 ShenyuSpringMvcClient
                ShenyuSpringMvcClient shenyuSpringMvcClient = AnnotationUtils.findAnnotation(method, ShenyuSpringMvcClient.class);
                // 如果方法上有注解ShenyuSpringMvcClient，就表示该方法需要注册
                if (Objects.nonNull(shenyuSpringMvcClient)) {
                    // 构建元数据，发送注册事件
                    publisher.publishEvent(buildMetaDataDTO(shenyuSpringMvcClient, prePath));
                }
            }
        }
        return bean;
    }

    // 构造元数据
    private MetaDataRegisterDTO buildMetaDataDTO(final ShenyuSpringMvcClient shenyuSpringMvcClient, final String prePath) {
        // contextPath上下文名称
        String contextPath = this.contextPath;
        // appName应用名称
        String appName = this.appName;
        // path注册路径
        String path;
        if (StringUtils.isEmpty(contextPath)) {
            path = prePath + shenyuSpringMvcClient.path();
        } else {
            path = contextPath + prePath + shenyuSpringMvcClient.path();
        }
        // desc描述信息
        String desc = shenyuSpringMvcClient.desc();
        // ruleName规则名称，没有填写的话就和path一致
        String configRuleName = shenyuSpringMvcClient.ruleName();
        String ruleName = StringUtils.isBlank(configRuleName) ? path : configRuleName;
        // 构建元数据
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



在后置处理器中，需要读取配置属性，如果 `isFull=true` 的话，表示注册整个微服务。获取当前`bean`的`Controller`注解、`RequestMapping`注解、`ShenyuSpringMvcClient` 注解，通过读取这些注解信息判断当前`bean`是否是接口？接口是否需要注册？方法是否需要注册？然后根据`ShenyuSpringMvcClient` 注解中的属性构建元数据，最后通过`publisher.publishEvent()`发布事件进行注册。



`Controller`注解和`RequestMapping`注解是由`Spring`提供的，这个大家应该很熟悉，不过多赘述。`ShenyuSpringMvcClient` 注解是由`Apache ShenYu`提供的，用于注册`SpringMvc`客户端，它的定义如下：

```java

/**
 * shenyu 客户端接口，用于方法上或类上
 */
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.TYPE, ElementType.METHOD})
public @interface ShenyuSpringMvcClient {
    // path 注册路径
    String path();
    
    // ruleName 规则名称
    String ruleName() default "";
    
    // desc 描述信息
    String desc() default "";

    // enabled是否启用
    boolean enabled() default true;
    
    // registerMetaData 注册元数据
    boolean  registerMetaData() default false;
}

```

它的使用如下：

- 注册整个接口

```java
@RestController
@RequestMapping("/test")
@ShenyuSpringMvcClient(path = "/test/**")  // 表示整个接口注册
public class HttpTestController {
 //......
}
```

- 注册当前方法

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
    @ShenyuSpringMvcClient(path = "/save", desc = "Save order") // 注册当前方法
    public OrderDTO save(@RequestBody final OrderDTO orderDTO) {
        orderDTO.setName("hello world save order");
        return orderDTO;
    }
```



- publisher.publishEvent() 发布注册事件

该方法会将数据发送到`Disruptor`队列中，关于`Disruptor`队列更多细节这里不做更多介绍，这不影响分析注册的流程。

当数据发送后，`Disruptor`队列的消费者会处理数据，进行消费。



- QueueConsumer 消费数据

`QueueConsumer`是一个消费者，它实现了`WorkHandler`接口，它的创建过程在`providerManage.startup()`逻辑中。`WorkHandler`接口是`disruptor`的数据消费接口，只有一个方法是`onEvent()`。

```java
package com.lmax.disruptor;

public interface WorkHandler<T> {
    void onEvent(T var1) throws Exception;
}
```

`QueueConsumer`重写了`onEvent()`方法，主要逻辑是生成消费任务，然后在线程池中去执行。

```java

/**
 * 
 * 队列消费者
 */
public class QueueConsumer<T> implements WorkHandler<DataEvent<T>> {
    
	// 省略了其他逻辑

    @Override
    public void onEvent(final DataEvent<T> t) {
        if (t != null) {
            // 通过工厂创建队列消费任务
            QueueConsumerExecutor<T> queueConsumerExecutor = factory.create();
            // 保存数据
            queueConsumerExecutor.setData(t.getData());
            // help gc
            t.setData(null);
            // 放在线程池中执行 消费任务
            executor.execute(queueConsumerExecutor);
        }
    }
}
```

`QueueConsumerExecutor`是在线程池中被执行的任务，它实现了`Runnable`接口，具体的实现类有两个：

- `RegisterClientConsumerExecutor`：客户端消费者执行器；
- `RegisterServerConsumerExecutor`：服务端消费者执行器。

顾名思义，一个负责处理客户端任务，一个负责处理服务端任务（服务端就是`admin`，在下文进行分析）。

![](/img/activities/code-analysis-http-register/consumer-executor.png)



- RegisterClientConsumerExecutor 消费者执行器

重写的`run()`逻辑如下：

```java

public final class RegisterClientConsumerExecutor extends QueueConsumerExecutor<DataTypeParent> {
    
	//...... 

    @Override
    public void run() {
        // 获取数据
        DataTypeParent dataTypeParent = getData();
        // 根据数据类型调用相应的处理器进行处理
        subscribers.get(dataTypeParent.getType()).executor(Lists.newArrayList(dataTypeParent));
    }
    
}
```

根据不同的数据类型调用不同的处理器去执行相应的任务。数据类型有两种，一个是元数据，记录客户端注册信息。一个是`URI`数据，记录客户端服务信息。

```java
//数据类型
public enum DataType {
   // 元数据
    META_DATA,
    
   // URI数据
    URI,
}
```



- ExecutorSubscriber#executor() 执行器订阅者

执行器订阅者也分为两类，一个是处理元数据，一个是处理`URI`。在客户端和服务端分别有两个，所以一共是四个。

![](/img/activities/code-analysis-http-register/executor-subscriber.png)



- ShenyuClientMetadataExecutorSubscriber#executor()

客户端这边对元数据处理逻辑是：遍历元数据信息，调用接口方法`persistInterface()`完成数据的发布。

```java
public class ShenyuClientMetadataExecutorSubscriber implements ExecutorTypeSubscriber<MetaDataRegisterDTO> {
   
    //......
    
    @Override
    public DataType getType() {
        return DataType.META_DATA; // 元数据
    }
    
    @Override
    public void executor(final Collection<MetaDataRegisterDTO> metaDataRegisterDTOList) {
        for (MetaDataRegisterDTO metaDataRegisterDTO : metaDataRegisterDTOList) {
            // 调用接口方法persistInterface()完成数据的发布
            shenyuClientRegisterRepository.persistInterface(metaDataRegisterDTO);
        }
    }
}
```



- ShenyuClientRegisterRepository#persistInterface()

`ShenyuClientRegisterRepository`是一个接口，用于表示客户端数据注册，它的实现类目前有五种，每一种就表示一种注册方法。

- `ConsulClientRegisterRepository`：通过`Consul`实现客户端注册；
- `EtcdClientRegisterRepository`：通过`Etcd`实现客户端注册；
- `HttpClientRegisterRepository`：通过`Http`实现客户端注册；
- `NacosClientRegisterRepository`：通过`Nacos`实现客户端注册；
- `ZookeeperClientRegisterRepository`：通过`Zookeeper`实现客户端注册；



![](/img/activities/code-analysis-http-register/client-register-repository.png)

从图中可以看出，注册中心的加载是通过`SPI`的方式完成的。这个在前面提到过了，在客户端通用配置文件中，通过指定配置文件中的属性完成具体的类加载。

```java

/**
 * 加载 ShenyuClientRegisterRepository
 */
public final class ShenyuClientRegisterRepositoryFactory {
    
    private static final Map<String, ShenyuClientRegisterRepository> REPOSITORY_MAP = new ConcurrentHashMap<>();
    
    /**
     * 创建 ShenyuClientRegisterRepository
     */
    public static ShenyuClientRegisterRepository newInstance(final ShenyuRegisterCenterConfig shenyuRegisterCenterConfig) {
        if (!REPOSITORY_MAP.containsKey(shenyuRegisterCenterConfig.getRegisterType())) {
            // 通过SPI的方式进行加载，类型由registerType决定
            ShenyuClientRegisterRepository result = ExtensionLoader.getExtensionLoader(ShenyuClientRegisterRepository.class).getJoin(shenyuRegisterCenterConfig.getRegisterType());
            //执行初始化操作
            result.init(shenyuRegisterCenterConfig);
            ShenyuClientShutdownHook.set(result, shenyuRegisterCenterConfig.getProps());
            REPOSITORY_MAP.put(shenyuRegisterCenterConfig.getRegisterType(), result);
            return result;
        }
        return REPOSITORY_MAP.get(shenyuRegisterCenterConfig.getRegisterType());
    }
}
```



本文的源码分析是基于`Http`的方式进行注册，所以我们先分析`HttpClientRegisterRepository`，其他的注册方式后续再分析。



通过`http`的方式注册很简单，就是调用工具类发送`http`请求。注册元数据和URI都是调用的同一个方法`doRegister()`，指定接口和类型就好。

- `/shenyu-client/register-metadata`：服务端提供的接口用于注册元数据。
- `/shenyu-client/register-uri`：    服务端提供的接口用于注册URI。

```java
@Join
public class HttpClientRegisterRepository implements ShenyuClientRegisterRepository {
    // 服务端提供的接口用于注册元数据    
    private static final String META_PATH = "/shenyu-client/register-metadata";

    // 服务端提供的接口用于注册URI
    private static final String URI_PATH = "/shenyu-client/register-uri";

    //注册URI
    @Override
    public void persistURI(final URIRegisterDTO registerDTO) {
        doRegister(registerDTO, URI_PATH, Constants.URI);
    }
    
    //注册接口（就是元数据信息）
    @Override
    public void persistInterface(final MetaDataRegisterDTO metadata) {
        doRegister(metadata, META_PATH, META_TYPE);
    }
    
    // 进行注册
    private <T> void doRegister(final T t, final String path, final String type) {
        // 遍历admin服务列表（admin可能是集群）
        for (String server : serverList) {
            try {
                // 调用工具类发送 http 请求
                RegisterUtils.doRegister(GsonUtils.getInstance().toJson(t), server + path, type);
                return;
            } catch (Exception e) {
                LOGGER.error("register admin url :{} is fail, will retry", server);
            }
        }
    }
}

```



将数据序列化后，通过`OkHttp`发送数据。

```java

public final class RegisterUtils {
   
   //...... 

    // 通过OkHttp发送数据
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



至此，客户端通过`http`的方式注册元数据的逻辑就分析完了。小结一下：通过读取自定义的注解信息构造元数据，将数据发到`Disruptor`队列，然后从队列中消费数据，将消费者放到线程池中去执行，最终通过发送`http`请求到`admin`。



客户端元数据注册流程的源码分析过程完成了，用流程图描述如下：



![](/img/activities/code-analysis-http-register/client-metadata-register-zh.png)



#### 2.4  构建 URI 的 ContextRegisterListener

创建 `ContextRegisterListener`，负责客户端`URI`数据的构建和注册，它的创建是在配置文件中完成。

```java
@Configuration
@ImportAutoConfiguration(ShenyuClientCommonBeanConfiguration.class)
public class ShenyuSpringMvcClientConfiguration {
     // ......
    
    //  创建 ContextRegisterListener
    @Bean
    public ContextRegisterListener contextRegisterListener(final ShenyuClientConfig clientConfig) {
        return new ContextRegisterListener(clientConfig.getClient().get(RpcTypeEnum.HTTP.getName()));
    }
}
```



`ContextRegisterListener`实现了`ApplicationListener`接口，并重写了`onApplicationEvent()`方法，当有Spring事件发生后，该方法会执行。

```java
// 实现了ApplicationListener接口
public class ContextRegisterListener implements ApplicationListener<ContextRefreshedEvent> {

     //......

    //通过构造函数完成实例化
    public ContextRegisterListener(final PropertiesConfig clientConfig) {
        // 读取 shenyu.client.http 配置信息
        Properties props = clientConfig.getProps();
        // isFull是否注册整个服务
        this.isFull = Boolean.parseBoolean(props.getProperty(ShenyuClientConstants.IS_FULL, Boolean.FALSE.toString()));
        // contextPath上下文路径
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
        // port 客户端端口信息
        int port = Integer.parseInt(props.getProperty(ShenyuClientConstants.PORT));
        // appName 应用名称
        this.appName = props.getProperty(ShenyuClientConstants.APP_NAME);
        // host信息
        this.host = props.getProperty(ShenyuClientConstants.HOST);
        this.port = port;
    }

    // 当有上下文刷新事件ContextRefreshedEvent发生时，该方法会执行
    @Override
    public void onApplicationEvent(@NonNull final ContextRefreshedEvent contextRefreshedEvent) {
        //保证该方法的内容只执行一次
        if (!registered.compareAndSet(false, true)) {
            return;
        }
        // 如果是 isFull=true 代表注册整个服务，构建元数据并注册
        if (isFull) {
            publisher.publishEvent(buildMetaDataDTO());
        }
        
        // 构建URI数据并注册
        publisher.publishEvent(buildURIRegisterDTO());
    }

    // 构建URI数据
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

    // 构建元数据
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

在构造函数中主要是读取属性配置。



`onApplicationEvent()`方法是有`Spring`事件发生时会执行，这里的参数是`ContextRefreshedEvent`，表示上下文刷新事件。当`Spring`容器就绪后执行此处逻辑：如果是 `isFull=true` 代表注册整个服务，构建元数据并注册，在前面分析的后置处理器`SpringMvcClientBeanPostProcessor`中没有处理 `isFull=true` 的情况，所以在此处进行了处理。然后再构建`URI`数据并注册。



> `ContextRefreshedEvent`是`Spring`内置事件。`ApplicationContext`被初始化或刷新时，该事件被触发。这也可以在 `ConfigurableApplicationContext`接口中使用 `refresh()` 方法来发生。此处的初始化是指：所有的`Bean`被成功装载，后处理`Bean`被检测并激活，所有`Singleton Bean` 被预实例化，`ApplicationContext`容器已就绪可用。





注册逻辑都是通过 `publisher.publishEvent()`完成。在前面都已经分析过了：向`Disruptor`队列写入数据，再从中消费数据，最后通过`ExecutorSubscriber`去处理。



- ExecutorSubscriber#executor()

执行器订阅者分为两类，一个是处理元数据，一个是处理`URI`。在客户端和服务端分别有两个，所以一共是四个。

![](/img/activities/code-analysis-http-register/executor-subscriber.png)

这里是注册`URI`信息，所以执行类是`ShenyuClientURIExecutorSubscriber`。



-  ShenyuClientURIExecutorSubscriber#executor()

主要逻辑是遍历URI数据集合，通过`persistURI()`方法实现数据注册。

```java

public class ShenyuClientURIExecutorSubscriber implements ExecutorTypeSubscriber<URIRegisterDTO> {
    
    //......
    
    @Override
    public DataType getType() {
        return DataType.URI; //数据类型是URI
    }
    
    // 注册URI数据
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
            //添加hook，优雅停止客户端 
            ShenyuClientShutdownHook.delayOtherHooks();
            
            // 注册URI
            shenyuClientRegisterRepository.persistURI(uriRegisterDTO);
        }
    }
}
```

代码中的`while(true)`循环是为了保证客户端已经成功启动了，通过`host`和`port`可以连接上。



后面的逻辑是：添加`hook`函数，用于优雅停止客户端 。



通过`persistURI()`方法实现数据注册。整个逻辑也在前面分析过了，最终就是通过`OkHttp`客户端向`shenyu-admin`发起`http`，通过`http`的方式注册`URI`。



分析到这里就将客户端的注册逻辑分析完了，将构建的元数据和URI数据发送到`Disruptor`队列，再从中消费，读取数据，通过`http`向`admin`发送数据。



客户端`URI`注册流程的源码分析完成了，流程图如下：



![](/img/activities/code-analysis-http-register/client-uri-register-zh.png)



### 3. 服务端注册流程



#### 3.1 注册接口ShenyuHttpRegistryController

从前面的分析可以知道，服务端提供了注册的两个接口：

- `/shenyu-client/register-metadata`：服务端提供的接口用于注册元数据。
- `/shenyu-client/register-uri`：    服务端提供的接口用于注册URI。



这两个接口位于`ShenyuHttpRegistryController`中，它实现了`ShenyuServerRegisterRepository`接口，是服务端注册的实现类。它用`@Join`标记，表示通过`SPI`进行加载。

```java
// shenuyu客户端接口
@RequestMapping("/shenyu-client")
@Join
public class ShenyuHttpRegistryController implements ShenyuServerRegisterRepository {

    private ShenyuServerRegisterPublisher publisher;

    @Override
    public void init(final ShenyuServerRegisterPublisher publisher, final ShenyuRegisterCenterConfig config) {
        this.publisher = publisher;
    }
    
    // 注册元数据
    @PostMapping("/register-metadata")
    @ResponseBody
    public String registerMetadata(@RequestBody final MetaDataRegisterDTO metaDataRegisterDTO) {
        publish(metaDataRegisterDTO);
        return ShenyuResultMessage.SUCCESS;
    }
        
   // 注册URI
    @PostMapping("/register-uri")
    @ResponseBody
    public String registerURI(@RequestBody final URIRegisterDTO uriRegisterDTO) {
        publish(uriRegisterDTO);
        return ShenyuResultMessage.SUCCESS;
    }

    // 发布注册事件
    private <T> void publish(final T t) {
        publisher.publish(Collections.singletonList(t));
    }
}

```

两个注册接口获取到数据好，就调用了`publish()`方法，把数据发布到`Disruptor`队列中。



- `ShenyuServerRegisterRepository`接口



`ShenyuServerRegisterRepository`接口是服务注册接口，它有五个实现类，表示有五种注册方式：

- `ConsulServerRegisterRepository`：通过`Consul`实现注册;
- `EtcdServerRegisterRepository`：通过`Etcd`实现注册；
- `NacosServerRegisterRepository`：通过`Nacos`实现注册；
- `ShenyuHttpRegistryController`：通过`Http`实现注册；
- `ZookeeperServerRegisterRepository`：通过`Zookeeper`实现注册。



具体用哪一种方式，是通过配置文件指定的，然后通过`SPI`进行加载。



在`shenyu-admin`中的`application.yml`文件中配置注册方式，`registerType`指定注册类型，当用`http`进行注册时，`serverLists`不需要填写，更多配置说明可以参考官网  [客户端接入配置](https://shenyu.apache.org/zh/docs/user-guide/register-center-access) 。

```java
shenyu:
  register:
    registerType: http 
    serverLists: 
```



- RegisterCenterConfiguration 加载配置

在引入相关依赖和属性配置后，启动`shenyu-admin`时，会先加载配置文件，和注册中心相关的配置文件类是`RegisterCenterConfiguration`。

```java
// 注册中心配置类
@Configuration
public class RegisterCenterConfiguration {
    // 读取配置属性
    @Bean
    @ConfigurationProperties(prefix = "shenyu.register")
    public ShenyuRegisterCenterConfig shenyuRegisterCenterConfig() {
        return new ShenyuRegisterCenterConfig();
    }
    
    //创建ShenyuServerRegisterRepository，用于服务端注册
    @Bean
    public ShenyuServerRegisterRepository shenyuServerRegisterRepository(final ShenyuRegisterCenterConfig shenyuRegisterCenterConfig, final List<ShenyuClientRegisterService> shenyuClientRegisterService) {
        // 1.从配置属性中获取注册类型
        String registerType = shenyuRegisterCenterConfig.getRegisterType();
        // 2.通过注册类型，以SPI的方法加载实现类
        ShenyuServerRegisterRepository registerRepository = ExtensionLoader.getExtensionLoader(ShenyuServerRegisterRepository.class).getJoin(registerType);
        // 3.获取publisher，向Disruptor队列中写数据
        RegisterServerDisruptorPublisher publisher = RegisterServerDisruptorPublisher.getInstance();
        // 4.注册Service， rpcType -> registerService
        Map<String, ShenyuClientRegisterService> registerServiceMap = shenyuClientRegisterService.stream().collect(Collectors.toMap(ShenyuClientRegisterService::rpcType, e -> e));
        // 5.事件发布的准备工作
        publisher.start(registerServiceMap);
        // 6.注册的初始化操作
        registerRepository.init(publisher, shenyuRegisterCenterConfig);
        return registerRepository;
    }
}

```

在配置类中生成了两个`bean`：

- `shenyuRegisterCenterConfig`：读取属性配置；

- `shenyuServerRegisterRepository`：用于服务端注册。



在创建`shenyuServerRegisterRepository`的过程中，也进行了一系列的准备工作：

-  1.从配置属性中获取注册类型。
- 2.通过注册类型，以`SPI`的方法加载实现类：比如指定的类型是`http`，就会加载`ShenyuHttpRegistryController`。
- 3.获取`publisher`，向`Disruptor`队列中写数据。
- 4.注册`Service`， `rpcType -> registerService`：获取注册的`Service`，每种`rpc`都有对应的`Service`。本文的客户端构建是通过`springboot`，属于`http`类型，还有其他客户端类型：`dubbo`，`Spring Cloud`，`gRPC`等。
- 5.事件发布的准备工作：添加服务端元数据和`URI`订阅器，处理数据。并且启动`Disruptor`队列。
-  6.注册的初始化操作：`http`类型的注册初始化操作就是保存`publisher`。



- RegisterServerDisruptorPublisher#publish()

服务端向`Disruptor`队列写入数据的发布者 ，通过单例模式构建。

```java

public class RegisterServerDisruptorPublisher implements ShenyuServerRegisterPublisher {
    //私有属性
    private static final RegisterServerDisruptorPublisher INSTANCE = new RegisterServerDisruptorPublisher();

    //公开静态方法获取实例
    public static RegisterServerDisruptorPublisher getInstance() {
        return INSTANCE;
    }
    
   //事件发布的准备工作，添加服务端元数据和URI订阅器，处理数据。并且启动Disruptor队列。
    public void start(final Map<String, ShenyuClientRegisterService> shenyuClientRegisterService) {
        //服务端注册工厂
        factory = new RegisterServerExecutorFactory();
        //添加URI数据订阅器
        factory.addSubscribers(new URIRegisterExecutorSubscriber(shenyuClientRegisterService));
        //添加元数据订阅器
        factory.addSubscribers(new MetadataExecutorSubscriber(shenyuClientRegisterService));
        //启动Disruptor队列
        providerManage = new DisruptorProviderManage(factory);
        providerManage.startup();
    }
    
    // 向队列中写入数据
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



配置文件的加载，可看作是注册中心服务端初始化流程，用图描述如下：



![](/img/activities/code-analysis-http-register/server-register-init-zh.png)





#### 3.2 消费数据QueueConsumer



在前面分析了客户端`disruptor`队列消费数据的过。服务端也是一样的逻辑，只是其中执行任务的执行者变了。

`QueueConsumer`是一个消费者，它实现了`WorkHandler`接口，它的创建过程在`providerManage.startup()`逻辑中。`WorkHandler`接口是`disruptor`的数据消费接口，只有一个方法是`onEvent()`。

```java
package com.lmax.disruptor;

public interface WorkHandler<T> {
    void onEvent(T var1) throws Exception;
}
```

`QueueConsumer`重写了`onEvent()`方法，主要逻辑是生成消费任务，然后在线程池中去执行。

```java
/**
 * 
 * 队列消费者
 */
public class QueueConsumer<T> implements WorkHandler<DataEvent<T>> {
    
	// 省略了其他逻辑

    @Override
    public void onEvent(final DataEvent<T> t) {
        if (t != null) {
            // 通过工厂创建队列消费任务
            QueueConsumerExecutor<T> queueConsumerExecutor = factory.create();
            // 保存数据
            queueConsumerExecutor.setData(t.getData());
            // help gc
            t.setData(null);
            // 放在线程池中执行 消费任务
            executor.execute(queueConsumerExecutor);
        }
    }
}
```

`QueueConsumerExecutor`是在线程池中被执行的任务，它实现了`Runnable`接口，具体的实现类有两个：

- `RegisterClientConsumerExecutor`：客户端消费者执行器；
- `RegisterServerConsumerExecutor`：服务端消费者执行器。

顾名思义，一个负责处理客户端任务，一个负责处理服务端任务。



- `RegisterServerConsumerExecutor#run()`

`RegisterServerConsumerExecutor`是服务端消费者执行器，它通过`QueueConsumerExecutor`间接实现了`Runnable`接口，并重写了`run()`方法。


```java

public final class RegisterServerConsumerExecutor extends QueueConsumerExecutor<List<DataTypeParent>> {
   // ...

    @Override
    public void run() {
        //获取从disruptor队列中拿到的数据
        List<DataTypeParent> results = getData();
        // 数据校验
        results = results.stream().filter(data -> isValidData(data)).collect(Collectors.toList());
        if (CollectionUtils.isEmpty(results)) {
            return;
        }
        //根据类型执行操作
        getType(results).executor(results);
    }
    
    // 根据类型获取订阅者
    private ExecutorSubscriber getType(final List<DataTypeParent> list) {
        DataTypeParent result = list.get(0);
        return subscribers.get(result.getType());
    }
}

```



- ExecutorSubscriber#executor()

执行器订阅者分为两类，一个是处理元数据，一个是处理`URI`。在客户端和服务端分别有两个，所以一共是四个。

![](/img/activities/code-analysis-http-register/executor-subscriber.png)



- MetadataExecutorSubscriber#executor()

如果是注册元数据，则通过`MetadataExecutorSubscriber#executor()`实现：根据类型获取注册`Service`，调用`register()`。

```java
public class MetadataExecutorSubscriber implements ExecutorTypeSubscriber<MetaDataRegisterDTO> {
 
    //......

    @Override
    public DataType getType() {
        return DataType.META_DATA;  // 元数据类型
    }

    @Override
    public void executor(final Collection<MetaDataRegisterDTO> metaDataRegisterDTOList) {
        // 遍历元数据列表
        for (MetaDataRegisterDTO metaDataRegisterDTO : metaDataRegisterDTOList) {
            // 根据类型获取注册Service
            ShenyuClientRegisterService shenyuClientRegisterService = this.shenyuClientRegisterService.get(metaDataRegisterDTO.getRpcType());
            Objects.requireNonNull(shenyuClientRegisterService);
            // 对元数据进行注册，加锁确保顺序执行，防止并发错误
            synchronized (ShenyuClientRegisterService.class) {
                shenyuClientRegisterService.register(metaDataRegisterDTO);
            }
        }
    }
}
```



- URIRegisterExecutorSubscriber#executor()

如果是注册元数据，则通过`URIRegisterExecutorSubscriber#executor()`实现：构建`URI`数据，根据注册类型查找`Service，`通过`registerURI`方法实现注册。

```java

public class URIRegisterExecutorSubscriber implements ExecutorTypeSubscriber<URIRegisterDTO> {
    //......
    
    @Override
    public DataType getType() {
        return DataType.URI; // URI数据类型
    }
    
    @Override
    public void executor(final Collection<URIRegisterDTO> dataList) {
        if (CollectionUtils.isEmpty(dataList)) {
            return;
        }
        // 构建URI数据类型，通过registerURI方法实现注册
        findService(dataList).ifPresent(service -> {
            Map<String, List<URIRegisterDTO>> listMap = buildData(dataList);
            listMap.forEach(service::registerURI);
        });
    }
    
    // 根据类型查找Service
    private Optional<ShenyuClientRegisterService> findService(final Collection<URIRegisterDTO> dataList) {
        return dataList.stream().map(dto -> shenyuClientRegisterService.get(dto.getRpcType())).findFirst();
    }
}

```



- ShenyuClientRegisterService#register()

`ShenyuClientRegisterService`是注册方法接口，它有多个实现类：

![](/img/activities/code-analysis-http-register/client-register-service.png)



- `AbstractContextPathRegisterService`：抽象类，处理部分公共逻辑；
- `AbstractShenyuClientRegisterServiceImpl`：：抽象类，处理部分公共逻辑；
- `ShenyuClientRegisterDivideServiceImpl`：`divide`类，处理`http`注册类型；
- `ShenyuClientRegisterDubboServiceImpl`：`dubbo`类，处理`dubbo`注册类型；
- `ShenyuClientRegisterGrpcServiceImpl`：`gRPC`类，处理`gRPC`注册类型；
- `ShenyuClientRegisterMotanServiceImpl`：`Motan`类，处理`Motan`注册类型；
- `ShenyuClientRegisterSofaServiceImpl`：`Sofa`类，处理`Sofa`注册类型；
- `ShenyuClientRegisterSpringCloudServiceImpl`：`SpringCloud`类，处理`SpringCloud`注册类型；
- `ShenyuClientRegisterTarsServiceImpl`：`Tars`类，处理`Tars`注册类型；



从上面可以看出每种微服务都有对应的注册实现类，本文的源码分析是 以官方提供的 [shenyu-examples-http](https://github.com/apache/incubator-shenyu/tree/master/shenyu-examples/shenyu-examples-http) 为例，是属`http`注册类型，所以元数据和URI数据的注册实现类是 `ShenyuClientRegisterDivideServiceImpl`：

- register(): 注册元数据

```java
public String register(final MetaDataRegisterDTO dto) {
        // 1.注册选择器信息
        String selectorHandler = selectorHandler(dto);
        String selectorId = selectorService.registerDefault(dto, PluginNameAdapter.rpcTypeAdapter(rpcType()), selectorHandler);
        // 2.注册规则信息
        String ruleHandler = ruleHandler();
        RuleDTO ruleDTO = buildRpcDefaultRuleDTO(selectorId, dto, ruleHandler);
        ruleService.registerDefault(ruleDTO);
        // 3.注册元数据信息
        registerMetadata(dto);
        // 4.注册contextPath
        String contextPath = dto.getContextPath();
        if (StringUtils.isNotEmpty(contextPath)) {
            registerContextPath(dto);
        }
        return ShenyuResultMessage.SUCCESS;
    }
```

整个注册逻辑可以分为4个步骤：

- 1.注册选择器信息
- 2.注册规则信息
- 3.注册元数据信息
- 4.注册`contextPath`

在`admin`这一侧通过客户端的元数据信息需要构建选择器、规则、元数据和`ContextPath`。具体的注册过程和细节处理跟`rpc`类型有关。我们就不再继续向下追踪了，对于注册中心的逻辑分析，跟踪到这里就够了。



服务端元数据注册流程的源码分析完了，流程图描述如下：



![](/img/activities/code-analysis-http-register/server-metadata-register-zh.png)



- registerURI(): 注册`URI`数据

```java
public String registerURI(final String selectorName, final List<URIRegisterDTO> uriList) {
        if (CollectionUtils.isEmpty(uriList)) {
            return "";
        }
        // 对应的选择器是否存在
        SelectorDO selectorDO = selectorService.findByNameAndPluginName(selectorName, PluginNameAdapter.rpcTypeAdapter(rpcType()));
        if (Objects.isNull(selectorDO)) {
            return "";
        }
        // 处理选择器中的handler信息
        String handler = buildHandle(uriList, selectorDO);
        selectorDO.setHandle(handler);
        SelectorData selectorData = selectorService.buildByName(selectorName, PluginNameAdapter.rpcTypeAdapter(rpcType()));
        selectorData.setHandle(handler);
       
        // 更新数据库中的记录
        selectorService.updateSelective(selectorDO);
        // 发布事件
        eventPublisher.publishEvent(new DataChangedEvent(ConfigGroupEnum.SELECTOR, DataEventTypeEnum.UPDATE, Collections.singletonList(selectorData)));
        return ShenyuResultMessage.SUCCESS;
    }
```

`admin`拿到`URI`数据后，主要是更新选择器中的`handler`信息，然后写入到数据库，最后发布事件通知网关。通知网关的逻辑是由数据同步操作完成，这在之前的文章中已经分析过了，就不再赘述。



服务端`URI`注册流程的源码分析完成了，用图描述如下：



![](/img/activities/code-analysis-http-register/server-uri-register-zh.png)

至此，服务端注册流程也就分析完了，主要通过对外提供的接口，接受客户端的注册信息，然后写入到`Disruptor`队列，再从中消费数据，根据接收到的元数据和`URI`数据更新`admin`的选择器、规则、元数据和选择器的`handler`。





### 4. 总结

本文主要对`Apache ShenYu`网关中的`http注册`模块进行了源码分析。涉及到的主要知识点，归纳如下：

- 注册中心是为了将客户端信息注册到`admin`，方便流量筛选；
- `http`注册是将客户端元数据信息和`URI`信息注册到`admin`；
- `http`服务的接入通过注解`@ShenyuSpringMvcClient`标识；
- 注册信息的构建主要通过`Spring`的后置处理器`BeanPostProcessor`和应用监听器`ApplicationListener`；
- 注册类型的加载通过`SPI`完成；
- 引入`Disruptor`队列是为了数据与操作解耦，以及数据缓冲。
- 注册中心的实现采用了面向接口编程，使用模板方法、单例、观察者等设计模式。
