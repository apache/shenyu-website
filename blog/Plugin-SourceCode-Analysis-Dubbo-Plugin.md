---
title: Code Analysis For Dubbo Plugin
author: midnight2104
author_title: Apache ShenYu Committer
author_url: https://github.com/midnight2104
tags: [plugin,dubbo,Apache ShenYu]
---


> [Apache ShenYu](https://shenyu.apache.org/zh/docs/index) is an asynchronous, high-performance, cross-language, responsive `API` gateway.


The `Apache ShenYu` gateway uses the `dubbo` plugin to make calls to the `dubbo` service. You can see the official documentation [Dubbo Quick Start](https://shenyu.apache.org/docs/quick-start/quick-start-dubbo) to learn how to use the plugin.

> This article is based on `shenyu-2.4.3` version for source code analysis, please refer to [Dubbo Service Access](https://shenyu.apache.org/zh/docs/user-guide/proxy/dubbo-proxy/) for the introduction of the official website.


### 1. Service Registration

Take the example provided on the official website [shenyu-examples-dubbo](https://github.com/apache/shenyu/tree/master/shenyu-examples/shenyu-examples-dubbo/shenyu-examples-apache-dubbo-service). Suppose your `dubbo` service is defined as follows (`spring-dubbo.xml`).

```xml
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:dubbo="http://code.alibabatech.com/schema/dubbo"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
       http://www.springframework.org/schema/beans/spring-beans.xsd
       http://code.alibabatech.com/schema/dubbo
       https://code.alibabatech.com/schema/dubbo/dubbo.xsd">

    <dubbo:application name="test-dubbo-service"/>
    <dubbo:registry address="${dubbo.registry.address}"/>
    <dubbo:protocol name="dubbo" port="20888"/>

    <dubbo:service timeout="10000" interface="org.apache.shenyu.examples.dubbo.api.service.DubboTestService" ref="dubboTestService"/>

</beans>
```

Declare the application service name, register the center address, use the `dubbo` protocol, declare the service interface, and the corresponding interface implementation class.

```java
/**
 * DubboTestServiceImpl.
 */
@Service("dubboTestService")
public class DubboTestServiceImpl implements DubboTestService {
    
    @Override
    @ShenyuDubboClient(path = "/findById", desc = "Query by Id")
    public DubboTest findById(final String id) {
        return new DubboTest(id, "hello world shenyu Apache, findById");
    }

    //......
}
```

In the interface implementation class, use the annotation `@ShenyuDubboClient` to register the service with `shenyu-admin`. The role of this annotation and its rationale will be analyzed later.

The configuration information in the configuration file `application.yml`.

```yaml
server:
  port: 8011
  address: 0.0.0.0
  servlet:
    context-path: /
spring:
  main:
    allow-bean-definition-overriding: true
dubbo:
  registry:
    address: zookeeper://localhost:2181  # dubbo registry
    
shenyu:
  register:
    registerType: http 
    serverLists: http://localhost:9095 
    props:
      username: admin 
      password: 123456
  client:
    dubbo:
      props:
        contextPath: /dubbo  
        appName: dubbo

```


In the configuration file, declare the registry address used by `dubbo`. The `dubbo` service registers with `shenyu-admin`, using the method `http`, and the registration address is `http://localhost:9095`.

See [Application Client Access](https://shenyu.apache.org/docs/design/register-center-design/) for more information on the use of the registration method.


#### 1.1  Declaration of registration interface

Use the annotation `@ShenyuDubboClient` to register the service to the gateway. The simple `demo` is as follows.

```java
// dubbo sevice
@Service("dubboTestService")
public class DubboTestServiceImpl implements DubboTestService {
    
    @Override
    @ShenyuDubboClient(path = "/findById", desc = "Query by Id") // need to be registered method
    public DubboTest findById(final String id) {
        return new DubboTest(id, "hello world shenyu Apache, findById");
    }

    //......
}
```

annotation definition:

```java
/**
 * Works on classes and methods
 */
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.TYPE, ElementType.METHOD})
@Inherited
public @interface ShenyuDubboClient {
    
	//path
    String path();
    
    //rule name
    String ruleName() default "";
   
    //desc
    String desc() default "";

    //enabled
    boolean enabled() default true;
}

```

#### 1.2 Scan annotation information

Annotation scanning is done through the `ApacheDubboServiceBeanListener`, which implements the `ApplicationListener<ContextRefreshedEvent>` interface and starts executing the event handler method when a context refresh event occurs during the `Spring` container startup `onApplicationEvent()`.

During constructor instantiation.

- Read property configuration
- Start the thread pool
- Start the registry for registering with `shenyu-admin`

```java
public class ApacheDubboServiceBeanListener implements ApplicationListener<ContextRefreshedEvent> {

	// ......

    //Constructor
    public ApacheDubboServiceBeanListener(final PropertiesConfig clientConfig, final ShenyuClientRegisterRepository shenyuClientRegisterRepository) {
        //1.Read property configuration
        Properties props = clientConfig.getProps();
        String contextPath = props.getProperty(ShenyuClientConstants.CONTEXT_PATH);
        String appName = props.getProperty(ShenyuClientConstants.APP_NAME);
        if (StringUtils.isBlank(contextPath)) {
            throw new ShenyuClientIllegalArgumentException("apache dubbo client must config the contextPath or appName");
        }
        this.contextPath = contextPath;
        this.appName = appName;
        this.host = props.getProperty(ShenyuClientConstants.HOST);
        this.port = props.getProperty(ShenyuClientConstants.PORT);
        //2.Start the thread pool
        executorService = Executors.newSingleThreadExecutor(new ThreadFactoryBuilder().setNameFormat("shenyu-apache-dubbo-client-thread-pool-%d").build());
        //3.Start the registry for registering with `shenyu-admin`
        publisher.start(shenyuClientRegisterRepository);
    }

    /**
     * Context refresh event, execute method logic
     */
    @Override
    public void onApplicationEvent(final ContextRefreshedEvent contextRefreshedEvent) {
        //......
    }
```

- ApacheDubboServiceBeanListener#onApplicationEvent()

Rewritten method logic: read `Dubbo` service `ServiceBean`, build metadata object and `URI` object, and register it with `shenyu-admin`.

```java
    @Override
    public void onApplicationEvent(final ContextRefreshedEvent contextRefreshedEvent) {
        //read ServiceBean
        Map<String, ServiceBean> serviceBean = contextRefreshedEvent.getApplicationContext().getBeansOfType(ServiceBean.class);
        if (serviceBean.isEmpty()) {
            return;
        }
        //The method is guaranteed to be executed only once
        if (!registered.compareAndSet(false, true)) {
            return;
        }
        //handle metadata 
        for (Map.Entry<String, ServiceBean> entry : serviceBean.entrySet()) {
            handler(entry.getValue());
        }
        //handle URI
        serviceBean.values().stream().findFirst().ifPresent(bean -> {
            publisher.publishEvent(buildURIRegisterDTO(bean));
        });
    }
```

- handler()

  In the `handler()` method, read all methods from the `serviceBean`, determine if there is a `ShenyuDubboClient` annotation on the method, build a metadata object if it exists, and register the method with `shenyu-admin` through the registry.

```java
    private void handler(final ServiceBean<?> serviceBean) {
        //get proxy
        Object refProxy = serviceBean.getRef();
        //get class
        Class<?> clazz = refProxy.getClass();
        if (AopUtils.isAopProxy(refProxy)) {
            clazz = AopUtils.getTargetClass(refProxy);
        }
        //all methods
        Method[] methods = ReflectionUtils.getUniqueDeclaredMethods(clazz);
        for (Method method : methods) {
            //read ShenyuDubboClient annotation
            ShenyuDubboClient shenyuDubboClient = method.getAnnotation(ShenyuDubboClient.class);
            if (Objects.nonNull(shenyuDubboClient)) {
                //build meatdata and registry
                publisher.publishEvent(buildMetaDataDTO(serviceBean, shenyuDubboClient, method));
            }
        }
    }
```

- buildMetaDataDTO()

  Constructs a metadata object where the necessary information for method registration is constructed and subsequently used for selector or rule matching.

```java
    private MetaDataRegisterDTO buildMetaDataDTO(final ServiceBean<?> serviceBean, final ShenyuDubboClient shenyuDubboClient, final Method method) {
        //app name
        String appName = buildAppName(serviceBean);
        //path
        String path = contextPath + shenyuDubboClient.path();
        //desc
        String desc = shenyuDubboClient.desc();
        //service name
        String serviceName = serviceBean.getInterface();
        //rule name
        String configRuleName = shenyuDubboClient.ruleName();
        String ruleName = ("".equals(configRuleName)) ? path : configRuleName;
        //method name 
        String methodName = method.getName();
        //parameter Types
        Class<?>[] parameterTypesClazz = method.getParameterTypes();
        String parameterTypes = Arrays.stream(parameterTypesClazz).map(Class::getName).collect(Collectors.joining(","));
        return MetaDataRegisterDTO.builder()
                .appName(appName)
                .serviceName(serviceName)
                .methodName(methodName)
                .contextPath(contextPath)
                .host(buildHost())
                .port(buildPort(serviceBean))
                .path(path)
                .ruleName(ruleName)
                .pathDesc(desc)
                .parameterTypes(parameterTypes)
                .rpcExt(buildRpcExt(serviceBean)) //dubbo ext
                .rpcType(RpcTypeEnum.DUBBO.getName())
                .enabled(shenyuDubboClient.enabled())
                .build();
    }
```

- buildRpcExt()

  `dubbo` ext information.

 ```java
    private String buildRpcExt(final ServiceBean serviceBean) {
        DubboRpcExt build = DubboRpcExt.builder()
                .group(StringUtils.isNotEmpty(serviceBean.getGroup()) ? serviceBean.getGroup() : "")//group
                .version(StringUtils.isNotEmpty(serviceBean.getVersion()) ? serviceBean.getVersion() : "")//version
                .loadbalance(StringUtils.isNotEmpty(serviceBean.getLoadbalance()) ? serviceBean.getLoadbalance() : Constants.DEFAULT_LOADBALANCE)//load balance
                .retries(Objects.isNull(serviceBean.getRetries()) ? Constants.DEFAULT_RETRIES : serviceBean.getRetries())//retry
                .timeout(Objects.isNull(serviceBean.getTimeout()) ? Constants.DEFAULT_CONNECT_TIMEOUT : serviceBean.getTimeout())//time
                .sent(Objects.isNull(serviceBean.getSent()) ? Constants.DEFAULT_SENT : serviceBean.getSent())//sent
                .cluster(StringUtils.isNotEmpty(serviceBean.getCluster()) ? serviceBean.getCluster() : Constants.DEFAULT_CLUSTER)//cluster
                .url("")
                .build();
        return GsonUtils.getInstance().toJson(build);
    }
 ```


- buildURIRegisterDTO()

  Construct `URI` objects to register information about the service itself, which can be subsequently used for service probing live.


```java
private URIRegisterDTO buildURIRegisterDTO(final ServiceBean serviceBean) {
        return URIRegisterDTO.builder()
                .contextPath(this.contextPath) //context path
                .appName(buildAppName(serviceBean))//app name
                .rpcType(RpcTypeEnum.DUBBO.getName())//dubbo
                .host(buildHost()) //host
                .port(buildPort(serviceBean))//port
                .build();
 }
```

The specific registration logic is implemented by the registration center, please refer to [Client Access Principles](https://shenyu.apache.org/zh/docs/design/register-center-design/) .

```java
//To the registration center, post registration events   
publisher.publishEvent();
```

#### 1.3 Processing registration information

The metadata and `URI` data registered by the client through the registry are processed at the `shenyu-admin` end, which is responsible for storing to the database and synchronizing to the `shenyu` gateway. The client-side registration processing logic of the `Dubbo` plugin is in the `ShenyuClientRegisterDubboServiceImpl`. The inheritance relationship is as follows.

![](/img/activities/code-analysis-dubbo-plugin/ShenyuClientRegisterDubboServiceImpl.png)


- ShenyuClientRegisterService: client registration service, top-level interface.
- FallbackShenyuClientRegisterService: registration failure, provides retry operation.
- AbstractShenyuClientRegisterServiceImpl: abstract class, implements part of the public registration logic.
- ShenyuClientRegisterDubboServiceImpl: implementation of the `Dubbo` plugin registration.

##### 1.3.1 Registration Service

- org.apache.shenyu.admin.service.register.AbstractShenyuClientRegisterServiceImpl#register()

  The metadata `MetaDataRegisterDTO` object registered by the client through the registry is picked up and dropped in the `register()` method of `shenyu-admin`.

```java
   @Override
    public String register(final MetaDataRegisterDTO dto) {
        //1. register selector
        String selectorHandler = selectorHandler(dto);
        String selectorId = selectorService.registerDefault(dto, PluginNameAdapter.rpcTypeAdapter(rpcType()), selectorHandler);
        //2. register rule
        String ruleHandler = ruleHandler();
        RuleDTO ruleDTO = buildRpcDefaultRuleDTO(selectorId, dto, ruleHandler);
        ruleService.registerDefault(ruleDTO);
        //3. register metadata
        registerMetadata(dto);
        //4. register contextPath
        String contextPath = dto.getContextPath();
        if (StringUtils.isNotEmpty(contextPath)) {
            registerContextPath(dto);
        }
        return ShenyuResultMessage.SUCCESS;
    }
```

###### 1.3.1.1 Register Selector

- org.apache.shenyu.admin.service.impl.SelectorServiceImpl#registerDefault()

Construct `contextPath`, find if the selector information exists, if it does, return `id`; if it doesn't, create the default selector information.

```java
    @Override
    public String registerDefault(final MetaDataRegisterDTO dto, final String pluginName, final String selectorHandler) {
        // build contextPath
        String contextPath = ContextPathUtils.buildContextPath(dto.getContextPath(), dto.getAppName());
        // Find if selector information exists by name
        SelectorDO selectorDO = findByNameAndPluginName(contextPath, pluginName);
        if (Objects.isNull(selectorDO)) {
            // Create a default selector message if it does not exist
            return registerSelector(contextPath, pluginName, selectorHandler);
        }
        return selectorDO.getId();
    }
```

- Default selector information

  Construct the default selector information and its conditional properties here.

```java
   //register selector
   private String registerSelector(final String contextPath, final String pluginName, final String selectorHandler) {
        //build selector
        SelectorDTO selectorDTO = buildSelectorDTO(contextPath, pluginMapper.selectByName(pluginName).getId());
        selectorDTO.setHandle(selectorHandler);
        //register default selector
        return registerDefault(selectorDTO);
    }
     //build selector
    private SelectorDTO buildSelectorDTO(final String contextPath, final String pluginId) {
        //build default
        SelectorDTO selectorDTO = buildDefaultSelectorDTO(contextPath);
        selectorDTO.setPluginId(pluginId);
         //build the conditional properties of the default selector
        selectorDTO.setSelectorConditions(buildDefaultSelectorConditionDTO(contextPath));
        return selectorDTO;
    }
```

- Build default selector

```java
private SelectorDTO buildDefaultSelectorDTO(final String name) {
    return SelectorDTO.builder()
            .name(name) // name
            .type(SelectorTypeEnum.CUSTOM_FLOW.getCode()) // default type cutom
            .matchMode(MatchModeEnum.AND.getCode()) //default match mode
            .enabled(Boolean.TRUE)  //enable
            .loged(Boolean.TRUE)  //log
            .continued(Boolean.TRUE) 
            .sort(1) 
            .build();
}
```

- Build default selector conditional properties

```java
private List<SelectorConditionDTO> buildDefaultSelectorConditionDTO(final String contextPath) {
    SelectorConditionDTO selectorConditionDTO = new SelectorConditionDTO();
    selectorConditionDTO.setParamType(ParamTypeEnum.URI.getName()); // default URI
    selectorConditionDTO.setParamName("/");
    selectorConditionDTO.setOperator(OperatorEnum.MATCH.getAlias()); // default  match
    selectorConditionDTO.setParamValue(contextPath + AdminConstants.URI_SUFFIX); 
    return Collections.singletonList(selectorConditionDTO);
}
```

- Register default selector

```java
@Override
public String registerDefault(final SelectorDTO selectorDTO) {
    //selector information
    SelectorDO selectorDO = SelectorDO.buildSelectorDO(selectorDTO);
    //selector conditional properties
    List<SelectorConditionDTO> selectorConditionDTOs = selectorDTO.getSelectorConditions();
    if (StringUtils.isEmpty(selectorDTO.getId())) {
        // insert selector information into the database
        selectorMapper.insertSelective(selectorDO);
          // inserting selector conditional properties to the database
        selectorConditionDTOs.forEach(selectorConditionDTO -> {
            selectorConditionDTO.setSelectorId(selectorDO.getId());            
            selectorConditionMapper.insertSelective(SelectorConditionDO.buildSelectorConditionDO(selectorConditionDTO));
        });
    }
    // Publish synchronization events to synchronize selection information and its conditional attributes to the gateway
    publishEvent(selectorDO, selectorConditionDTOs);
    return selectorDO.getId();
}
```

###### 1.3.1.2 Registration Rules

In the second step of registering the service, start building the default rules and then register the rules.

```java
@Override
    public String register(final MetaDataRegisterDTO dto) {
        //1. handle selector
        //......
        
        //2. handle rule
        
        String ruleHandler = ruleHandler();
        // build default rule
        RuleDTO ruleDTO = buildRpcDefaultRuleDTO(selectorId, dto, ruleHandler);
        // register rule
        ruleService.registerDefault(ruleDTO);
        
        //3. reigster metadata
        //......
        
        //4. register ContextPath
        //......
        
        return ShenyuResultMessage.SUCCESS;
    }
```

- 默认规则处理属性

```java
    @Override
    protected String ruleHandler() {
        // default rule
        return new DubboRuleHandle().toJson();
    }
```

`Dubbo` plugin default rule handling properties.

```java
public class DubboRuleHandle implements RuleHandle {

    /**
     * dubbo version.
     */
    private String version;

    /**
     * group.
     */
    private String group;

    /**
     * retry.
     */
    private Integer retries = 0;

    /**
     * loadbalance:RANDOM
     */
    private String loadbalance = LoadBalanceEnum.RANDOM.getName();

    /**
     * timeout default 3000
     */
    private long timeout = Constants.TIME_OUT;
}
```

- build default rule

```java
  // build default rule
    private RuleDTO buildRpcDefaultRuleDTO(final String selectorId, final MetaDataRegisterDTO metaDataDTO, final String ruleHandler) {
        return buildRuleDTO(selectorId, ruleHandler, metaDataDTO.getRuleName(), metaDataDTO.getPath());
    }
   //  build default rule
    private RuleDTO buildRuleDTO(final String selectorId, final String ruleHandler, final String ruleName, final String path) {
        RuleDTO ruleDTO = RuleDTO.builder()
                .selectorId(selectorId)
                .name(ruleName) 
                .matchMode(MatchModeEnum.AND.getCode()) 
                .enabled(Boolean.TRUE) 
                .loged(Boolean.TRUE) 
                .sort(1)
                .handle(ruleHandler)
                .build();
        RuleConditionDTO ruleConditionDTO = RuleConditionDTO.builder()
                .paramType(ParamTypeEnum.URI.getName()) 
                .paramName("/")
                .paramValue(path) 
                .build();
        if (path.indexOf("*") > 1) {
            ruleConditionDTO.setOperator(OperatorEnum.MATCH.getAlias()); 
        } else {
            ruleConditionDTO.setOperator(OperatorEnum.EQ.getAlias()); 
        }
        ruleDTO.setRuleConditions(Collections.singletonList(ruleConditionDTO));
        return ruleDTO;
    }
```

- org.apache.shenyu.admin.service.impl.RuleServiceImpl#registerDefault()

Registration rules: insert records to the database and publish events to the gateway for data synchronization.


```java

    @Override
    public String registerDefault(final RuleDTO ruleDTO) {
        RuleDO exist = ruleMapper.findBySelectorIdAndName(ruleDTO.getSelectorId(), ruleDTO.getName());
        if (Objects.nonNull(exist)) {
            return "";
        }

        RuleDO ruleDO = RuleDO.buildRuleDO(ruleDTO);
        List<RuleConditionDTO> ruleConditions = ruleDTO.getRuleConditions();
        if (StringUtils.isEmpty(ruleDTO.getId())) {
            // insert rule information into the database
            ruleMapper.insertSelective(ruleDO);
            //insert  rule body conditional attributes into the database
            ruleConditions.forEach(ruleConditionDTO -> {
                ruleConditionDTO.setRuleId(ruleDO.getId());     
                ruleConditionMapper.insertSelective(RuleConditionDO.buildRuleConditionDO(ruleConditionDTO));
            });
        }
        // Publish events to the gateway for data synchronization
        publishEvent(ruleDO, ruleConditions);
        return ruleDO.getId();
    }

```


###### 1.3.1.3 Register Metadata

Metadata is mainly used for `RPC` service calls.

```java
   @Override
    public String register(final MetaDataRegisterDTO dto) {
        //1. register selector
        //......
        
        //2. register rule
        //......
        
        //3. register metadata
        registerMetadata(dto);
        
        //4. register ContextPath
        //......
        
        return ShenyuResultMessage.SUCCESS;
    }
```

- org.apache.shenyu.admin.service.register.ShenyuClientRegisterDubboServiceImpl#registerMetadata()

  Insert or update metadata and then publish sync events to the gateway.

```java
    @Override
    protected void registerMetadata(final MetaDataRegisterDTO dto) {
            // get metaDataService
            MetaDataService metaDataService = getMetaDataService();
            MetaDataDO exist = metaDataService.findByPath(dto.getPath());
            //insert or update metadata
            metaDataService.saveOrUpdateMetaData(exist, dto);
    }

    @Override
    public void saveOrUpdateMetaData(final MetaDataDO exist, final MetaDataRegisterDTO metaDataDTO) {
        DataEventTypeEnum eventType;
        // DTO->DO
        MetaDataDO metaDataDO = MetaDataTransfer.INSTANCE.mapRegisterDTOToEntity(metaDataDTO);
        // insert data
        if (Objects.isNull(exist)) {
            Timestamp currentTime = new Timestamp(System.currentTimeMillis());
            metaDataDO.setId(UUIDUtils.getInstance().generateShortUuid());
            metaDataDO.setDateCreated(currentTime);
            metaDataDO.setDateUpdated(currentTime);
            metaDataMapper.insert(metaDataDO);
            eventType = DataEventTypeEnum.CREATE;
        } else {
            // update
            metaDataDO.setId(exist.getId());
            metaDataMapper.update(metaDataDO);
            eventType = DataEventTypeEnum.UPDATE;
        }
        // Publish sync events to gateway
        eventPublisher.publishEvent(new DataChangedEvent(ConfigGroupEnum.META_DATA, eventType,
                Collections.singletonList(MetaDataTransfer.INSTANCE.mapToData(metaDataDO))));
    }
```

##### 1.3.2 Register URI

- org.apache.shenyu.admin.service.register.FallbackShenyuClientRegisterService#registerURI()

The server side receives the `URI` information registered by the client and processes it.

```java
    @Override
    public String registerURI(final String selectorName, final List<URIRegisterDTO> uriList) {
        String result;
        String key = key(selectorName);
        try {
            this.removeFallBack(key);
            // register URI
            result = this.doRegisterURI(selectorName, uriList);
            logger.info("Register success: {},{}", selectorName, uriList);
        } catch (Exception ex) {
            logger.warn("Register exception: cause:{}", ex.getMessage());
            result = "";
            // Retry after registration failure
            this.addFallback(key, new FallbackHolder(selectorName, uriList));
        }
        return result;
    }
```

- org.apache.shenyu.admin.service.register.AbstractShenyuClientRegisterServiceImpl#doRegisterURI()

Get a valid `URI` from the `URI` registered by the client, update the corresponding selector `handle` property, and send a selector update event to the gateway.

```java
@Override
    public String doRegisterURI(final String selectorName, final List<URIRegisterDTO> uriList) {
        //check
        if (CollectionUtils.isEmpty(uriList)) {
            return "";
        }
        
        SelectorDO selectorDO = selectorService.findByNameAndPluginName(selectorName, PluginNameAdapter.rpcTypeAdapter(rpcType()));
        if (Objects.isNull(selectorDO)) {
            throw new ShenyuException("doRegister Failed to execute,wait to retry.");
        }
        // gte valid URI
        List<URIRegisterDTO> validUriList = uriList.stream().filter(dto -> Objects.nonNull(dto.getPort()) && StringUtils.isNotBlank(dto.getHost())).collect(Collectors.toList());
        // build handle
        String handler = buildHandle(validUriList, selectorDO);
        if (handler != null) {
            selectorDO.setHandle(handler);
            SelectorData selectorData = selectorService.buildByName(selectorName, PluginNameAdapter.rpcTypeAdapter(rpcType()));
            selectorData.setHandle(handler);
            // Update the handle property of the selector to the database
            selectorService.updateSelective(selectorDO);
            // Send selector update events to the gateway
            eventPublisher.publishEvent(new DataChangedEvent(ConfigGroupEnum.SELECTOR, DataEventTypeEnum.UPDATE, Collections.singletonList(selectorData)));
        }
        return ShenyuResultMessage.SUCCESS;
    }
```

The source code analysis on service registration is completed as well as the analysis flow chart is as follows.

![](/img/activities/code-analysis-dubbo-plugin/dubbo-register-en.png)


The next step is to analyze how the `dubbo` plugin initiates calls to the `http` service based on this information.

### 2. Service Invocation

The `dubbo` plugin is the core processing plugin used by the `ShenYu` gateway to convert `http` requests into the `dubbo protocol` and invoke the `dubbo` service.

Take the case provided by the official website [Quick Start with Dubbo](https://shenyu.apache.org/docs/quick-start/quick-start-dubbo/) as an example, a `dubbo` service is registered with `shenyu-admin` through the registry, and then requested through the `ShenYu` gateway proxy, the request is as follows.


```
GET http://localhost:9195/dubbo/findById?id=100
Accept: application/json
```

The class inheritance relationship in the `Dubbo` plugin is as follows.

![](/img/activities/code-analysis-dubbo-plugin/ApacheDubboPlugin.png)

- ShenyuPlugin: top-level interface, defining interface methods.
- AbstractShenyuPlugin: abstract class that implements plugin common logic.
- AbstractDubboPlugin: dubbo plugin abstract class, implementing `dubbo` common logic.
- ApacheDubboPlugin: ApacheDubbo plugin.

> ShenYu Gateway supports ApacheDubbo and AlibabaDubbo\

#### 2.1 Receive requests

After passing the `ShenYu` gateway proxy, the request entry is `ShenyuWebHandler`, which implements the `org.springframework.web.server.WebHandler` interface.

```java
public final class ShenyuWebHandler implements WebHandler, ApplicationListener<SortPluginEvent> {
    //......
    
    /**
     * hanlde request
     */
    @Override
    public Mono<Void> handle(@NonNull final ServerWebExchange exchange) {
       // execute default plugin chain
        Mono<Void> execute = new DefaultShenyuPluginChain(plugins).execute(exchange);
        if (scheduled) {
            return execute.subscribeOn(scheduler);
        }
        return execute;
    }
    
    private static class DefaultShenyuPluginChain implements ShenyuPluginChain {

        private int index;

        private final List<ShenyuPlugin> plugins;

  
        DefaultShenyuPluginChain(final List<ShenyuPlugin> plugins) {
            this.plugins = plugins;
        }

        /**
         * execute.
         */
        @Override
        public Mono<Void> execute(final ServerWebExchange exchange) {
            return Mono.defer(() -> {
                if (this.index < plugins.size()) {
                    // get plugin 
                    ShenyuPlugin plugin = plugins.get(this.index++);
                    boolean skip = plugin.skip(exchange);
                    if (skip) {
                        // next
                        return this.execute(exchange);
                    }
                    // execute
                    return plugin.execute(exchange, this);
                }
                return Mono.empty();
            });
        }
    }
}
```

#### 2.2 Match Rule

- org.apache.shenyu.plugin.base.AbstractShenyuPlugin#execute()

Execute the matching logic for selectors and rules in the `execute()` method.

- Matching selectors.
- Matching rules.
- Execute the plugin.

```java
@Override
    public Mono<Void> execute(final ServerWebExchange exchange, final ShenyuPluginChain chain) {
        // plugin name
        String pluginName = named();
        // plugin data
        PluginData pluginData = BaseDataCache.getInstance().obtainPluginData(pluginName);
        if (pluginData != null && pluginData.getEnabled()) {
            // selector data
            final Collection<SelectorData> selectors = BaseDataCache.getInstance().obtainSelectorData(pluginName);
            if (CollectionUtils.isEmpty(selectors)) {
                return handleSelectorIfNull(pluginName, exchange, chain);
            }
            // match selector
            SelectorData selectorData = matchSelector(exchange, selectors);
            if (Objects.isNull(selectorData)) {
                return handleSelectorIfNull(pluginName, exchange, chain);
            }
            selectorLog(selectorData, pluginName);
            // rule data
            List<RuleData> rules = BaseDataCache.getInstance().obtainRuleData(selectorData.getId());
            if (CollectionUtils.isEmpty(rules)) {
                return handleRuleIfNull(pluginName, exchange, chain);
            }
            // match rule
            RuleData rule;
            if (selectorData.getType() == SelectorTypeEnum.FULL_FLOW.getCode()) {
                //get last
                rule = rules.get(rules.size() - 1);
            } else {
                rule = matchRule(exchange, rules);
            }
            if (Objects.isNull(rule)) {
                return handleRuleIfNull(pluginName, exchange, chain);
            }
            ruleLog(rule, pluginName);
            // execute
            return doExecute(exchange, chain, selectorData, rule);
        }
        return chain.execute(exchange);
    }
```

#### 2.3 Execute GlobalPlugin

- org.apache.shenyu.plugin.global.GlobalPlugin#execute()

`GlobalPlugin` is a global plugin that constructs contextual information in the `execute()` method.

```java
public class GlobalPlugin implements ShenyuPlugin {
    // shenyu context
    private final ShenyuContextBuilder builder;
    
    //......
    
    @Override
    public Mono<Void> execute(final ServerWebExchange exchange, final ShenyuPluginChain chain) {
       // build context information to be passed into the exchange
        ShenyuContext shenyuContext = builder.build(exchange);
        exchange.getAttributes().put(Constants.CONTEXT, shenyuContext);
        return chain.execute(exchange);
    }
    
    //......
}
```

- org.apache.shenyu.plugin.global.DefaultShenyuContextBuilder#build()

Build the default context information.

```java
public class DefaultShenyuContextBuilder implements ShenyuContextBuilder {
    //......
    
    @Override
    public ShenyuContext build(final ServerWebExchange exchange) {
        //build data
        Pair<String, MetaData> buildData = buildData(exchange);
        //wrap ShenyuContext
        return decoratorMap.get(buildData.getLeft()).decorator(buildDefaultContext(exchange.getRequest()), buildData.getRight());
    }
    
    private Pair<String, MetaData> buildData(final ServerWebExchange exchange) {
        //......
        //get the metadata according to the requested uri
        MetaData metaData = MetaDataCache.getInstance().obtain(request.getURI().getPath());
        if (Objects.nonNull(metaData) && Boolean.TRUE.equals(metaData.getEnabled())) {
            exchange.getAttributes().put(Constants.META_DATA, metaData);
            return Pair.of(metaData.getRpcType(), metaData);
        } else {
            return Pair.of(RpcTypeEnum.HTTP.getName(), new MetaData());
        }
    }
    //set the default context information
    private ShenyuContext buildDefaultContext(final ServerHttpRequest request) {
        String appKey = request.getHeaders().getFirst(Constants.APP_KEY);
        String sign = request.getHeaders().getFirst(Constants.SIGN);
        String timestamp = request.getHeaders().getFirst(Constants.TIMESTAMP);
        ShenyuContext shenyuContext = new ShenyuContext();
        String path = request.getURI().getPath();
        shenyuContext.setPath(path); 
        shenyuContext.setAppKey(appKey);
        shenyuContext.setSign(sign);
        shenyuContext.setTimestamp(timestamp);
        shenyuContext.setStartDateTime(LocalDateTime.now());
        Optional.ofNullable(request.getMethod()).ifPresent(httpMethod -> shenyuContext.setHttpMethod(httpMethod.name()));
        return shenyuContext;
    }
 }
```

- org.apache.shenyu.plugin.dubbo.common.context.DubboShenyuContextDecorator#decorator()

wrap `ShenyuContext`:

```java
public class DubboShenyuContextDecorator implements ShenyuContextDecorator {
    
    @Override
    public ShenyuContext decorator(final ShenyuContext shenyuContext, final MetaData metaData) {
        shenyuContext.setModule(metaData.getAppName());
        shenyuContext.setMethod(metaData.getServiceName()); 
        shenyuContext.setContextPath(metaData.getContextPath()); 
        shenyuContext.setRpcType(RpcTypeEnum.DUBBO.getName()); 
        return shenyuContext;
    }
    
    @Override
    public String rpcType() {
        return RpcTypeEnum.DUBBO.getName();
    }
}
```


#### 2.4 Execute RpcParamTransformPlugin

The `RpcParamTransformPlugin` is responsible for reading the parameters from the `http` request, saving them in the `exchange` and passing them to the `rpc` service.


- org.apache.shenyu.plugin.base.RpcParamTransformPlugin#execute()

In the `execute()` method, the core logic of the plugin is executed: get the request information from `exchange` and process the parameters according to the form of content passed in by the request.

```java
public class RpcParamTransformPlugin implements ShenyuPlugin {

    @Override
    public Mono<Void> execute(final ServerWebExchange exchange, final ShenyuPluginChain chain) {
        //get request information from exchange
        ServerHttpRequest request = exchange.getRequest();
        ShenyuContext shenyuContext = exchange.getAttribute(Constants.CONTEXT);
        if (Objects.nonNull(shenyuContext)) {
           // APPLICATION_JSON
            MediaType mediaType = request.getHeaders().getContentType();
            if (MediaType.APPLICATION_JSON.isCompatibleWith(mediaType)) {
                return body(exchange, request, chain);
            }
            // APPLICATION_FORM_URLENCODED
            if (MediaType.APPLICATION_FORM_URLENCODED.isCompatibleWith(mediaType)) {
                return formData(exchange, request, chain);
            }
            //query
            return query(exchange, request, chain);
        }
        return chain.execute(exchange);
    }
    
    //APPLICATION_JSON
    private Mono<Void> body(final ServerWebExchange exchange, final ServerHttpRequest serverHttpRequest, final ShenyuPluginChain chain) {
        return Mono.from(DataBufferUtils.join(serverHttpRequest.getBody())
                .flatMap(body -> {
                    exchange.getAttributes().put(Constants.PARAM_TRANSFORM, resolveBodyFromRequest(body));//解析body，保存到exchange中
                    return chain.execute(exchange);
                }));
    }
   // APPLICATION_FORM_URLENCODED
    private Mono<Void> formData(final ServerWebExchange exchange, final ServerHttpRequest serverHttpRequest, final ShenyuPluginChain chain) {
        return Mono.from(DataBufferUtils.join(serverHttpRequest.getBody())
                .flatMap(map -> {
                    String param = resolveBodyFromRequest(map);
                    LinkedMultiValueMap<String, String> linkedMultiValueMap;
                    try {
                        linkedMultiValueMap = BodyParamUtils.buildBodyParams(URLDecoder.decode(param, StandardCharsets.UTF_8.name())); //格式化数据
                    } catch (UnsupportedEncodingException e) {
                        return Mono.error(e);
                    }
                    exchange.getAttributes().put(Constants.PARAM_TRANSFORM, HttpParamConverter.toMap(() -> linkedMultiValueMap));// 保存到exchange中
                    return chain.execute(exchange);
                }));
    }
    //query
    private Mono<Void> query(final ServerWebExchange exchange, final ServerHttpRequest serverHttpRequest, final ShenyuPluginChain chain) {
        exchange.getAttributes().put(Constants.PARAM_TRANSFORM, HttpParamConverter.ofString(() -> serverHttpRequest.getURI().getQuery()));//保存到exchange中
        return chain.execute(exchange);
    }
    //......
 }
```

#### 2.5 Execute DubboPlugin

- org.apache.shenyu.plugin.dubbo.common.AbstractDubboPlugin#doExecute()

In the `doExecute()` method, the main purpose is to check the metadata and parameters.

```java
public abstract class AbstractDubboPlugin extends AbstractShenyuPlugin {
    
    @Override
    public Mono<Void> doExecute(final ServerWebExchange exchange,
                                   final ShenyuPluginChain chain,
                                   final SelectorData selector,
                                   final RuleData rule) {
        //param
        String param = exchange.getAttribute(Constants.PARAM_TRANSFORM);
        //context
        ShenyuContext shenyuContext = exchange.getAttribute(Constants.CONTEXT);
        assert shenyuContext != null;
        //metaData
        MetaData metaData = exchange.getAttribute(Constants.META_DATA);
        //check metaData
        if (!checkMetaData(metaData)) {
            LOG.error(" path is : {}, meta data have error : {}", shenyuContext.getPath(), metaData);
            exchange.getResponse().setStatusCode(HttpStatus.INTERNAL_SERVER_ERROR);
            Object error = ShenyuResultWrap.error(exchange, ShenyuResultEnum.META_DATA_ERROR, null);
            return WebFluxResultUtils.result(exchange, error);
        }
        //check
        if (Objects.nonNull(metaData) && StringUtils.isNoneBlank(metaData.getParameterTypes()) && StringUtils.isBlank(param)) {
            exchange.getResponse().setStatusCode(HttpStatus.INTERNAL_SERVER_ERROR);
            Object error = ShenyuResultWrap.error(exchange, ShenyuResultEnum.DUBBO_HAVE_BODY_PARAM, null);
            return WebFluxResultUtils.result(exchange, error);
        }
        //set rpcContext
        this.rpcContext(exchange);
        //dubbo invoke
        return this.doDubboInvoker(exchange, chain, selector, rule, metaData, param);
    }
}
```


- org.apache.shenyu.plugin.apache.dubbo.ApacheDubboPlugin#doDubboInvoker()

Set special context information in the `doDubboInvoker()` method, and then start the dubbo generalization call.

```java
public class ApacheDubboPlugin extends AbstractDubboPlugin {
    
    @Override
    protected Mono<Void> doDubboInvoker(final ServerWebExchange exchange,
                                        final ShenyuPluginChain chain,
                                        final SelectorData selector,
                                        final RuleData rule,
                                        final MetaData metaData,
                                        final String param) {
        //set the current selector and rule information, and request address for dubbo graying support
        RpcContext.getContext().setAttachment(Constants.DUBBO_SELECTOR_ID, selector.getId());
        RpcContext.getContext().setAttachment(Constants.DUBBO_RULE_ID, rule.getId());
        RpcContext.getContext().setAttachment(Constants.DUBBO_REMOTE_ADDRESS, Objects.requireNonNull(exchange.getRequest().getRemoteAddress()).getAddress().getHostAddress());
        //dubbo generic invoker
        final Mono<Object> result = dubboProxyService.genericInvoker(param, metaData, exchange);
        //execute next plugin in chain
        return result.then(chain.execute(exchange));
    }
}
```

- org.apache.shenyu.plugin.apache.dubbo.proxy.ApacheDubboProxyService#genericInvoker()

`genericInvoker()` method.

- Gets the `ReferenceConfig` object.
- Gets the generalization service `GenericService` object.
- Constructs the request parameter `pair` object.
- Initiates an asynchronous generalization invocation.

```java
public class ApacheDubboProxyService {
    //...... 

    /**
     * Generic invoker object.
     */
    public Mono<Object> genericInvoker(final String body, final MetaData metaData, final ServerWebExchange exchange) throws ShenyuException {
        //1.Get the ReferenceConfig object
        ReferenceConfig<GenericService> reference = ApacheDubboConfigCache.getInstance().get(metaData.getPath());

        if (Objects.isNull(reference) || StringUtils.isEmpty(reference.getInterface())) {
            //Failure of the current cache information
            ApacheDubboConfigCache.getInstance().invalidate(metaData.getPath());
            //Reinitialization with metadata
            reference = ApacheDubboConfigCache.getInstance().initRef(metaData);
        }
        //2.Get the GenericService object of the generalization service
        GenericService genericService = reference.get();
        //3.Constructing the request parameter pair object
        Pair<String[], Object[]> pair;
        if (StringUtils.isBlank(metaData.getParameterTypes()) || ParamCheckUtils.dubboBodyIsEmpty(body)) {
            pair = new ImmutablePair<>(new String[]{}, new Object[]{});
        } else {
            pair = dubboParamResolveService.buildParameter(body, metaData.getParameterTypes());
        }
        //4.Initiating asynchronous generalization calls
        return Mono.fromFuture(invokeAsync(genericService, metaData.getMethodName(), pair.getLeft(), pair.getRight()).thenApply(ret -> {
            //handle result
            if (Objects.isNull(ret)) {
                ret = Constants.DUBBO_RPC_RESULT_EMPTY;
            }
            exchange.getAttributes().put(Constants.RPC_RESULT, ret);
            exchange.getAttributes().put(Constants.CLIENT_RESPONSE_RESULT_TYPE, ResultEnum.SUCCESS.getName());
            return ret;
        })).onErrorMap(exception -> exception instanceof GenericException ? new ShenyuException(((GenericException) exception).getExceptionMessage()) : new ShenyuException(exception));//处理异常
    }
    
    //Generalized calls, asynchronous operations
    private CompletableFuture<Object> invokeAsync(final GenericService genericService, final String method, final String[] parameterTypes, final Object[] args) throws GenericException {
        genericService.$invoke(method, parameterTypes, args);
        Object resultFromFuture = RpcContext.getContext().getFuture();
        return resultFromFuture instanceof CompletableFuture ? (CompletableFuture<Object>) resultFromFuture : CompletableFuture.completedFuture(resultFromFuture);
    }
}

```


Calling the `dubbo` service at the gateway can be achieved by generalizing the call.



The `ReferenceConfig` object is the key object to support generalization calls , and its initialization operation is done during data synchronization. There are two parts of data involved here, one is the synchronized plugin `handler` information and the other is the synchronized plugin metadata information.

- org.apache.shenyu.plugin.dubbo.common.handler.AbstractDubboPluginDataHandler#handlerPlugin()

When the plugin data is updated, the data synchronization module synchronizes the data from `shenyu-admin` to the gateway. The initialization operation is performed in `handlerPlugin()`.

```java
public abstract class AbstractDubboPluginDataHandler implements PluginDataHandler {
    //......
    
    //Initializing the configuration cache
   protected abstract void initConfigCache(DubboRegisterConfig dubboRegisterConfig);

    @Override
    public void handlerPlugin(final PluginData pluginData) {
        if (Objects.nonNull(pluginData) && Boolean.TRUE.equals(pluginData.getEnabled())) {
            //Data deserialization
            DubboRegisterConfig dubboRegisterConfig = GsonUtils.getInstance().fromJson(pluginData.getConfig(), DubboRegisterConfig.class);
            DubboRegisterConfig exist = Singleton.INST.get(DubboRegisterConfig.class);
            if (Objects.isNull(dubboRegisterConfig)) {
                return;
            }
            if (Objects.isNull(exist) || !dubboRegisterConfig.equals(exist)) {
                // Perform initialization operations
                this.initConfigCache(dubboRegisterConfig);
            }
            Singleton.INST.single(DubboRegisterConfig.class, dubboRegisterConfig);
        }
    }
    //......
}
```

- org.apache.shenyu.plugin.apache.dubbo.handler.ApacheDubboPluginDataHandler#initConfigCache()

Perform initialization operations.

```java
public class ApacheDubboPluginDataHandler extends AbstractDubboPluginDataHandler {

    @Override
    protected void initConfigCache(final DubboRegisterConfig dubboRegisterConfig) {
        //perform initialization operations
        ApacheDubboConfigCache.getInstance().init(dubboRegisterConfig);
        //cached results before failure
        ApacheDubboConfigCache.getInstance().invalidateAll();
    }
}

```

- org.apache.shenyu.plugin.apache.dubbo.cache.ApacheDubboConfigCache#init()

In the initialization, set `registryConfig` and `consumerConfig`.

```java
public final class ApacheDubboConfigCache extends DubboConfigCache {
    //......  
   /**
     * init
     */
    public void init(final DubboRegisterConfig dubboRegisterConfig) {
        //ApplicationConfig
        if (Objects.isNull(applicationConfig)) {
            applicationConfig = new ApplicationConfig("shenyu_proxy");
        }
        //When the protocol or address changes, you need to update the registryConfig
        if (needUpdateRegistryConfig(dubboRegisterConfig)) {
            RegistryConfig registryConfigTemp = new RegistryConfig();
            registryConfigTemp.setProtocol(dubboRegisterConfig.getProtocol());
            registryConfigTemp.setId("shenyu_proxy");
            registryConfigTemp.setRegister(false);
            registryConfigTemp.setAddress(dubboRegisterConfig.getRegister());            Optional.ofNullable(dubboRegisterConfig.getGroup()).ifPresent(registryConfigTemp::setGroup);
            registryConfig = registryConfigTemp;
        }
        //ConsumerConfig
        if (Objects.isNull(consumerConfig)) {
            consumerConfig = ApplicationModel.getConfigManager().getDefaultConsumer().orElseGet(() -> {
                ConsumerConfig consumerConfig = new ConsumerConfig();
                consumerConfig.refresh();
                return consumerConfig;
            });
           
            //ConsumerConfig
            Optional.ofNullable(dubboRegisterConfig.getThreadpool()).ifPresent(consumerConfig::setThreadpool); 
            Optional.ofNullable(dubboRegisterConfig.getCorethreads()).ifPresent(consumerConfig::setCorethreads);
            Optional.ofNullable(dubboRegisterConfig.getThreads()).ifPresent(consumerConfig::setThreads);
            Optional.ofNullable(dubboRegisterConfig.getQueues()).ifPresent(consumerConfig::setQueues);
        }
    }
    
    //Does the registration configuration need to be updated
    private boolean needUpdateRegistryConfig(final DubboRegisterConfig dubboRegisterConfig) {
        if (Objects.isNull(registryConfig)) {
            return true;
        }
        return !Objects.equals(dubboRegisterConfig.getProtocol(), registryConfig.getProtocol())
                || !Objects.equals(dubboRegisterConfig.getRegister(), registryConfig.getAddress())
                || !Objects.equals(dubboRegisterConfig.getProtocol(), registryConfig.getProtocol());
    }

    //......
}
```


- org.apache.shenyu.plugin.apache.dubbo.subscriber.ApacheDubboMetaDataSubscriber#onSubscribe()

When the metadata is updated, the data synchronization module synchronizes the data from `shenyu-admin` to the gateway. The metadata update operation is performed in the `onSubscribe()` method.

```java
public class ApacheDubboMetaDataSubscriber implements MetaDataSubscriber {
    //local memory cache
    private static final ConcurrentMap<String, MetaData> META_DATA = Maps.newConcurrentMap();

    //update metaData
    public void onSubscribe(final MetaData metaData) {
        // dubbo
        if (RpcTypeEnum.DUBBO.getName().equals(metaData.getRpcType())) {
            //Whether the corresponding metadata exists
            MetaData exist = META_DATA.get(metaData.getPath());
            if (Objects.isNull(exist) || Objects.isNull(ApacheDubboConfigCache.getInstance().get(metaData.getPath()))) {
                // initRef
                ApacheDubboConfigCache.getInstance().initRef(metaData);
            } else {
                // The corresponding metadata has undergone an update operation
                if (!Objects.equals(metaData.getServiceName(), exist.getServiceName())
                        || !Objects.equals(metaData.getRpcExt(), exist.getRpcExt())
                        || !Objects.equals(metaData.getParameterTypes(), exist.getParameterTypes())
                        || !Objects.equals(metaData.getMethodName(), exist.getMethodName())) {
                    //Build ReferenceConfig again based on the latest metadata
                    ApacheDubboConfigCache.getInstance().build(metaData);
                }
            }
            //local memory cache
            META_DATA.put(metaData.getPath(), metaData);
        }
    }

    //dalete
    public void unSubscribe(final MetaData metaData) {
        if (RpcTypeEnum.DUBBO.getName().equals(metaData.getRpcType())) {
            //使ReferenceConfig失效
            ApacheDubboConfigCache.getInstance().invalidate(metaData.getPath());
            META_DATA.remove(metaData.getPath());
        }
    }
}
```

- org.apache.shenyu.plugin.apache.dubbo.cache.ApacheDubboConfigCache#initRef()

Build `ReferenceConfig` objects from `metaData`.

```java
public final class ApacheDubboConfigCache extends DubboConfigCache {
    //......
    
    public ReferenceConfig<GenericService> initRef(final MetaData metaData) {
            try {
                //First try to get it from the cache, and return it directly if it exists
                ReferenceConfig<GenericService> referenceConfig = cache.get(metaData.getPath());
                if (StringUtils.isNoneBlank(referenceConfig.getInterface())) {
                    return referenceConfig;
                }
            } catch (ExecutionException e) {
                LOG.error("init dubbo ref exception", e);
            }
          
            //build if not exist
            return build(metaData);
        }

        /**
         * Build reference config.
         */
        @SuppressWarnings("deprecation")
        public ReferenceConfig<GenericService> build(final MetaData metaData) {
            if (Objects.isNull(applicationConfig) || Objects.isNull(registryConfig)) {
                return new ReferenceConfig<>();
            }
            ReferenceConfig<GenericService> reference = new ReferenceConfig<>(); //ReferenceConfig
            reference.setGeneric("true"); //generic invoke
            reference.setAsync(true);//async

            reference.setApplication(applicationConfig);//applicationConfig
            reference.setRegistry(registryConfig);//registryConfig
            reference.setConsumer(consumerConfig);//consumerConfig
            reference.setInterface(metaData.getServiceName());//serviceName
            reference.setProtocol("dubbo");//dubbo
            reference.setCheck(false); 
            reference.setLoadbalance("gray");//gray

            Map<String, String> parameters = new HashMap<>(2);
            parameters.put("dispatcher", "direct");
            reference.setParameters(parameters);

            String rpcExt = metaData.getRpcExt();//rpc ext param
            DubboParam dubboParam = parserToDubboParam(rpcExt);
            if (Objects.nonNull(dubboParam)) {
                if (StringUtils.isNoneBlank(dubboParam.getVersion())) {
                    reference.setVersion(dubboParam.getVersion());//version
                }
                if (StringUtils.isNoneBlank(dubboParam.getGroup())) {
                    reference.setGroup(dubboParam.getGroup());//group
                }
                if (StringUtils.isNoneBlank(dubboParam.getUrl())) {
                    reference.setUrl(dubboParam.getUrl());//url
                }
                if (StringUtils.isNoneBlank(dubboParam.getCluster())) {
                    reference.setCluster(dubboParam.getCluster());
                }
                Optional.ofNullable(dubboParam.getTimeout()).ifPresent(reference::setTimeout);//timeout
                Optional.ofNullable(dubboParam.getRetries()).ifPresent(reference::setRetries);//retires
                Optional.ofNullable(dubboParam.getSent()).ifPresent(reference::setSent);//Whether to ack async-sent
            }
            try {
                //get GenericService
                Object obj = reference.get();
                if (Objects.nonNull(obj)) {
                    LOG.info("init apache dubbo reference success there meteData is :{}", metaData);
                    //cache reference
                    cache.put(metaData.getPath(), reference);
                }
            } catch (Exception e) {
                LOG.error("init apache dubbo reference exception", e);
            }
            return reference;
        }
    //......
    }
```


#### 2.6 Execute ResponsePlugin

- org.apache.shenyu.plugin.response.ResponsePlugin#execute()

The response results are handled by the `ResponsePlugin` plugin.

```java
    @Override
    public Mono<Void> execute(final ServerWebExchange exchange, final ShenyuPluginChain chain) {
        ShenyuContext shenyuContext = exchange.getAttribute(Constants.CONTEXT);
        assert shenyuContext != null;
        // handle results according to rpc type
        return writerMap.get(shenyuContext.getRpcType()).writeWith(exchange, chain);
    }
```

The processing type is determined by `MessageWriter` and the class inheritance relationship is as follows.

![](/img/activities/code-analysis-dubbo-plugin/MessageWriter.png)


- MessageWriter: interface, defining message processing methods.
- NettyClientMessageWriter: processing of `Netty` call results.
- RPCMessageWriter: processing the results of `RPC` calls.
- WebClientMessageWriter: processing the results of `WebClient` calls.

`Dubbo` service call, the processing result is `RPCMessageWriter` of course.

- org.apache.shenyu.plugin.response.strategy.RPCMessageWriter#writeWith()

Process the response results in the `writeWith()` method.

```java

public class RPCMessageWriter implements MessageWriter {

    @Override
    public Mono<Void> writeWith(final ServerWebExchange exchange, final ShenyuPluginChain chain) {
        return chain.execute(exchange).then(Mono.defer(() -> {
            Object result = exchange.getAttribute(Constants.RPC_RESULT); //result
            if (Objects.isNull(result)) { 
                Object error = ShenyuResultWrap.error(exchange, ShenyuResultEnum.SERVICE_RESULT_ERROR, null);
                return WebFluxResultUtils.result(exchange, error);
            }
            return WebFluxResultUtils.result(exchange, result);
        }));
    }
}
```

At this point in the analysis, the source code analysis of the `Dubbo` plugin is complete, and the analysis flow chart is as follows.


![](/img/activities/code-analysis-dubbo-plugin/dubbo-execute-en.png)


### 3. Summary

The source code analysis in this article starts from `Dubbo` service registration to `Dubbo` plug-in service calls. The `Dubbo` plugin is mainly used to handle the conversion of `http` requests to the `dubbo` protocol, and the main logic is implemented through generalized calls.
