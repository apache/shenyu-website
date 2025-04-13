---
title: Code Analysis For Divide Plugin
author: midnight2104
author_title: Apache ShenYu Committer
author_url: https://github.com/midnight2104
tags: [plugin,divide,Apache ShenYu]
---

The `ShenYu` gateway uses the `divide` plugin to handle `http` requests. You can see the official documentation [Quick start with Http](https://shenyu.apache.org/docs/quick-start/quick-start-http) to learn how to use this plugin.

> This article is based on `shenyu-2.4.3` version for source code analysis, please refer to [Http Proxy](https://shenyu.apache.org/docs/user-guide/proxy/http-proxy) for the introduction of the official website.

### 1. Register Service

#### 1.1  Declaration of registration interface

Use the annotation `@ShenyuSpringMvcClient` to register the service to the gateway. The simple `demo` is as follows.

```java
@RestController
@RequestMapping("/order")
@ShenyuSpringMvcClient(path = "/order")  // API
public class OrderController {
    @GetMapping("/findById")
    @ShenyuSpringMvcClient(path = "/findById", desc = "Find by id") // method
    public OrderDTO findById(@RequestParam("id") final String id) {
        return build(id, "hello world findById");
    }
}
```

define annotation:

```java

@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.TYPE, ElementType.METHOD})
public @interface ShenyuSpringMvcClient {
    
	//path
    String path() default "";
    
    //rule name
    String ruleName() default "";
   
    //desc info
    String desc() default "";

    //is enabled
    boolean enabled() default true;
    
    //register MetaData
    boolean registerMetaData() default false;
}

```

#### 1.2 Scan annotation 

Annotation scanning is done through `SpringMvcClientBeanPostProcessor`, which implements the `BeanPostProcessor` interface and is a post-processor provided by `Spring`.

During constructor instantiation.

- Read the property configuration
- Add annotations, read `path` information
- Start the registry and register with `shenyu-admin`

```java
public class SpringMvcClientBeanPostProcessor implements BeanPostProcessor {
    //...
    /**
     * Constructor instantiation
     */
    public SpringMvcClientBeanPostProcessor(final PropertiesConfig clientConfig,
                                            final ShenyuClientRegisterRepository shenyuClientRegisterRepository) {
        // 1. read Properties
        Properties props = clientConfig.getProps();
        this.appName = props.getProperty(ShenyuClientConstants.APP_NAME);
        this.contextPath = props.getProperty(ShenyuClientConstants.CONTEXT_PATH, "");
        if (StringUtils.isBlank(appName) && StringUtils.isBlank(contextPath)) {
            String errorMsg = "http register param must config the appName or contextPath";
            LOG.error(errorMsg);
            throw new ShenyuClientIllegalArgumentException(errorMsg);
        }
        this.isFull = Boolean.parseBoolean(props.getProperty(ShenyuClientConstants.IS_FULL, Boolean.FALSE.toString()));
        // 2. add annotation
        mappingAnnotation.add(ShenyuSpringMvcClient.class);
        mappingAnnotation.add(PostMapping.class);
        mappingAnnotation.add(GetMapping.class);
        mappingAnnotation.add(DeleteMapping.class);
        mappingAnnotation.add(PutMapping.class);
        mappingAnnotation.add(RequestMapping.class);
        // 3. start register cneter
        publisher.start(shenyuClientRegisterRepository);
    }
    
    @Override
    public Object postProcessAfterInitialization(@NonNull final Object bean, @NonNull final String beanName) throws BeansException {
       // override post process
        
        return bean;
    }
    
```

- SpringMvcClientBeanPostProcessor#postProcessAfterInitialization()

Rewrite post-processor logic: read annotation information, construct metadata objects and `URI` objects, and register them with `shenyu-admin`.

```java
    @Override
    public Object postProcessAfterInitialization(@NonNull final Object bean, @NonNull final String beanName) throws BeansException {
        // 1. If the all service is registered or is not a Controller class, it is not handled
        if (Boolean.TRUE.equals(isFull) || !hasAnnotation(bean.getClass(), Controller.class)) {
            return bean;
        }
        // 2. Read the annotations on the class ShenyuSpringMvcClient
        final ShenyuSpringMvcClient beanShenyuClient = AnnotationUtils.findAnnotation(bean.getClass(), ShenyuSpringMvcClient.class);
        // 2.1 build  superPath
        final String superPath = buildApiSuperPath(bean.getClass());
        // 2.2 whether to register the entire class method
        if (Objects.nonNull(beanShenyuClient) && superPath.contains("*")) {
            // build the metadata object and register it with shenyu-admin
            publisher.publishEvent(buildMetaDataDTO(beanShenyuClient, pathJoin(contextPath, superPath)));
            return bean;
        }
        // 3. read all methods
        final Method[] methods = ReflectionUtils.getUniqueDeclaredMethods(bean.getClass());
        for (Method method : methods) {
            // 3.1 read the annotations on the method ShenyuSpringMvcClient
            ShenyuSpringMvcClient methodShenyuClient = AnnotationUtils.findAnnotation(method, ShenyuSpringMvcClient.class);
            // If there is no annotation on the method, use the annotation on the class
            methodShenyuClient = Objects.isNull(methodShenyuClient) ? beanShenyuClient : methodShenyuClient;
            if (Objects.nonNull(methodShenyuClient)) {
               // 3.2 Build path information, build metadata objects, register with shenyu-admin
                publisher.publishEvent(buildMetaDataDTO(methodShenyuClient, buildApiPath(method, superPath)));
            }
        }
        
        return bean;
    }
```

- 1. If you are registering the whole service or not `Controller` class, do not handle it
- 2. read the annotation on the class `ShenyuSpringMvcClient`, if the whole class is registered, build the metadata object here and register it with `shenyu-admin`.
- 3. Annotation on the handler method `ShenyuSpringMvcClient`, build `path` information for the specific method, build the metadata object and then register it with `shenyu-admin`


There are two methods here that take `path` and need special instructions.


- buildApiSuperPath()

Construct `SuperPath`: first take the `path` property from the annotation `ShenyuSpringMvcClient` on the class, if not, take the `path` information from the `RequestMapping` annotation on the current class.

```java
    private String buildApiSuperPath(@NonNull final Class<?> method) {
        // First take the path property from the annotation ShenyuSpringMvcClient on the class
        ShenyuSpringMvcClient shenyuSpringMvcClient = AnnotationUtils.findAnnotation(method, ShenyuSpringMvcClient.class);
        if (Objects.nonNull(shenyuSpringMvcClient) && StringUtils.isNotBlank(shenyuSpringMvcClient.path())) {
            return shenyuSpringMvcClient.path();
        }
        // Take the path information from the RequestMapping annotation of the current class
        RequestMapping requestMapping = AnnotationUtils.findAnnotation(method, RequestMapping.class);
        if (Objects.nonNull(requestMapping) && ArrayUtils.isNotEmpty(requestMapping.path()) && StringUtils.isNotBlank(requestMapping.path()[0])) {
            return requestMapping.path()[0];
        }
        return "";
    }
```

- buildApiPath()

Build `path`: first read the annotation `ShenyuSpringMvcClient` on the method and build it if it exists; otherwise get the `path` information from other annotations on the method; complete `path = contextPath(context information) + superPath(class information) + methodPath(method information)`.

```java
    private String buildApiPath(@NonNull final Method method, @NonNull final String superPath) {
        // 1. Read the annotation ShenyuSpringMvcClient on the method
        ShenyuSpringMvcClient shenyuSpringMvcClient = AnnotationUtils.findAnnotation(method, ShenyuSpringMvcClient.class);
        // 1.1 If path exists, build
        if (Objects.nonNull(shenyuSpringMvcClient) && StringUtils.isNotBlank(shenyuSpringMvcClient.path())) {
            //1.2  path = contextPath+superPath+methodPath
            return pathJoin(contextPath, superPath, shenyuSpringMvcClient.path());
        }
        // 2. Get path information from other annotations on the method
        final String path = getPathByMethod(method);
        if (StringUtils.isNotBlank(path)) {
             // 2.1 path = contextPath+superPath+methodPath
            return pathJoin(contextPath, superPath, path);
        }
        return pathJoin(contextPath, superPath);
    }
```

- getPathByMethod()

Get `path` information from other annotations on the method, other annotations include.
   - ShenyuSpringMvcClient
   - PostMapping
   - GetMapping
   - DeleteMapping
   - PutMapping
   - RequestMapping


```java

    private String getPathByMethod(@NonNull final Method method) {
        // Iterate through interface annotations to get path information
        for (Class<? extends Annotation> mapping : mappingAnnotation) {
            final String pathByAnnotation = getPathByAnnotation(AnnotationUtils.findAnnotation(method, mapping), pathAttributeNames);
            if (StringUtils.isNotBlank(pathByAnnotation)) {
                return pathByAnnotation;
            }
        }
        return null;
    }
```

After the scanning annotation is finished, construct the metadata object and send the object to `shenyu-admin` to complete the registration.

- Metadata 

Includes the rule information of the currently registered method: contextPath, appName, registration path, description information, registration type, whether it is enabled, rule name and whether to register metadata.

```java
 private MetaDataRegisterDTO buildMetaDataDTO(@NonNull final ShenyuSpringMvcClient shenyuSpringMvcClient, final String path) {
        return MetaDataRegisterDTO.builder()
                .contextPath(contextPath) // contextPath
                .appName(appName) // appName
                .path(path) // Registered path, used when gateway rules match
                .pathDesc(shenyuSpringMvcClient.desc()) // desc info
                .rpcType(RpcTypeEnum.HTTP.getName()) // divide plugin, http type when default
                .enabled(shenyuSpringMvcClient.enabled()) // is enabled?
                .ruleName(StringUtils.defaultIfBlank(shenyuSpringMvcClient.ruleName(), path))//rule name
                .registerMetaData(shenyuSpringMvcClient.registerMetaData()) // whether to register metadata information
                .build();
    }
```

The specific registration logic is implemented by the registration center, which has been analyzed in the previous articles and will not be analyzed in depth here.

#### 1.3 Register URI Data

`ContextRegisterListener` is responsible for registering the client's `URI` information to `shenyu-admin`, it implements the `ApplicationListener` interface, when the context refresh event `ContextRefreshedEvent` occurs, the `onApplicationEvent()` method is executed to implement the registration logic.

```java

public class ContextRegisterListener implements ApplicationListener<ContextRefreshedEvent>, BeanFactoryAware {
	//......
    
    /**
     * Constructor instantiation
     */
    public ContextRegisterListener(final PropertiesConfig clientConfig) {
        // read Properties
        final Properties props = clientConfig.getProps();
        this.isFull = Boolean.parseBoolean(props.getProperty(ShenyuClientConstants.IS_FULL, Boolean.FALSE.toString()));
        this.contextPath = props.getProperty(ShenyuClientConstants.CONTEXT_PATH);
        if (Boolean.TRUE.equals(isFull)) {
            if (StringUtils.isBlank(contextPath)) {
                final String errorMsg = "http register param must config the contextPath";
                LOG.error(errorMsg);
                throw new ShenyuClientIllegalArgumentException(errorMsg);
            }
        }
        this.port = Integer.parseInt(Optional.ofNullable(props.getProperty(ShenyuClientConstants.PORT)).orElseGet(() -> "-1"));
        this.appName = props.getProperty(ShenyuClientConstants.APP_NAME);
        this.protocol = props.getProperty(ShenyuClientConstants.PROTOCOL, ShenyuClientConstants.HTTP);
        this.host = props.getProperty(ShenyuClientConstants.HOST);
    }

    @Override
    public void setBeanFactory(final BeanFactory beanFactory) throws BeansException {
        this.beanFactory = beanFactory;
    }

    // Execute application events
    @Override
    public void onApplicationEvent(@NonNull final ContextRefreshedEvent contextRefreshedEvent) {
          // The method is guaranteed to be executed once
        if (!registered.compareAndSet(false, true)) {
            return;
        }
        // 1. If you are registering for the entire service
        if (Boolean.TRUE.equals(isFull)) {
            // Build metadata and register
            publisher.publishEvent(buildMetaDataDTO());
        }
        try {
            // get port
            final int mergedPort = port <= 0 ? PortUtils.findPort(beanFactory) : port;
            // 2. Constructing URI data and registering
            publisher.publishEvent(buildURIRegisterDTO(mergedPort));
        } catch (ShenyuException e) {
            throw new ShenyuException(e.getMessage() + "please config ${shenyu.client.http.props.port} in xml/yml !");
        }
    }

    // build URI data
    private URIRegisterDTO buildURIRegisterDTO(final int port) {
        return URIRegisterDTO.builder()
            .contextPath(this.contextPath) // contextPath
            .appName(appName) // appName
            .protocol(protocol) // protocol
            .host(IpUtils.isCompleteHost(this.host) ? this.host : IpUtils.getHost(this.host)) //host
            .port(port) // port
            .rpcType(RpcTypeEnum.HTTP.getName()) // divide plugin, default registration http type
            .build();
    }

    // build MetaData
    private MetaDataRegisterDTO buildMetaDataDTO() {
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

#### 1.4 Handle registration information

The metadata and `URI` data registered by the client through the registry are processed in `shenyu-admin`, which is responsible for storing to the database and synchronizing to the `shenyu` gateway. The client registration processing logic of `Divide` plugin is in `ShenyuClientRegisterDivideServiceImpl`. The inheritance relationship is as follows.

![](/img/activities/code-analysis-divide-plugin/ShenyuClientRegisterDivideServiceImpl.png)

- ShenyuClientRegisterService: client registration service, top-level interface.
- FallbackShenyuClientRegisterService: registration failure, provides retry operation.
- AbstractShenyuClientRegisterServiceImpl: abstract class, implements part of the public registration logic;
- AbstractContextPathRegisterService: abstract class, responsible for registering `ContextPath`.
- ShenyuClientRegisterDivideServiceImpl: implementation of the `Divide` plug-in registration.


##### 1.4.1 Register Service

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
        //3. register metadat
        registerMetadata(dto);
        //4. register ContextPath
        String contextPath = dto.getContextPath();
        if (StringUtils.isNotEmpty(contextPath)) {
            registerContextPath(dto);
        }
        return ShenyuResultMessage.SUCCESS;
    }
```

###### 1.4.1.1 Register Selector

- org.apache.shenyu.admin.service.impl.SelectorServiceImpl#registerDefault()

Build `contextPath`, find if the selector information exists, if it does, return `id`; if it doesn't, create the default selector information.

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

- Default Selector Information

Construct the default selector information and its conditional properties here.

```java
   //register selector
   private String registerSelector(final String contextPath, final String pluginName, final String selectorHandler) {
        // build selector 
        SelectorDTO selectorDTO = buildSelectorDTO(contextPath, pluginMapper.selectByName(pluginName).getId());
        selectorDTO.setHandle(selectorHandler);
        //register default Selector
        return registerDefault(selectorDTO);
    }
     //build
    private SelectorDTO buildSelectorDTO(final String contextPath, final String pluginId) {
        //build default
        SelectorDTO selectorDTO = buildDefaultSelectorDTO(contextPath);
        selectorDTO.setPluginId(pluginId);
         //build the conditional properties of the default selector
        selectorDTO.setSelectorConditions(buildDefaultSelectorConditionDTO(contextPath));
        return selectorDTO;
    }
```

- Build Default Selector

```
private SelectorDTO buildDefaultSelectorDTO(final String name) {
    return SelectorDTO.builder()
            .name(name) // name
            .type(SelectorTypeEnum.CUSTOM_FLOW.getCode()) // default CUSTOM_FLOW
            .matchMode(MatchModeEnum.AND.getCode()) //default  AND
            .enabled(Boolean.TRUE)  //default TRUE
            .loged(Boolean.TRUE)  //default TRUE
            .continued(Boolean.TRUE) //default TRUE
            .sort(1) //default 1
            .build();
}


```

- Build default selector conditional properties

```java
private List<SelectorConditionDTO> buildDefaultSelectorConditionDTO(final String contextPath) {
    SelectorConditionDTO selectorConditionDTO = new SelectorConditionDTO();
    selectorConditionDTO.setParamType(ParamTypeEnum.URI.getName()); // default URI
    selectorConditionDTO.setParamName("/");
    selectorConditionDTO.setOperator(OperatorEnum.MATCH.getAlias()); // default match
    selectorConditionDTO.setParamValue(contextPath + AdminConstants.URI_SUFFIX); // default /contextPath/**
    return Collections.singletonList(selectorConditionDTO);
}
```

- Register default selector

```
@Override
public String registerDefault(final SelectorDTO selectorDTO) {
    //selector info
    SelectorDO selectorDO = SelectorDO.buildSelectorDO(selectorDTO);
    //selector condition  info
    List<SelectorConditionDTO> selectorConditionDTOs = selectorDTO.getSelectorConditions();
    if (StringUtils.isEmpty(selectorDTO.getId())) {
        // insert selector information into the database
        selectorMapper.insertSelective(selectorDO);
          // insert selector condition information into the database
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

###### 1.4.1.2 Register Rule

In the second step of registering the service, start building the default rules and then register the rules.

```java
@Override
    public String register(final MetaDataRegisterDTO dto) {
        //1. register selector
        //......
        
        //2. register rule
        // default rule handle
        String ruleHandler = ruleHandler();
        // build default rule
        RuleDTO ruleDTO = buildRpcDefaultRuleDTO(selectorId, dto, ruleHandler);
        // register rule
        ruleService.registerDefault(ruleDTO);
        
        //3. register Metadata
        //......
        
        //4. register ContextPath
        //......
        
        return ShenyuResultMessage.SUCCESS;
    }
```

- default rule handle

```java
    @Override
    protected String ruleHandler() {
        // default rule handle
        return new DivideRuleHandle().toJson();
    }
```

`Divide` plugin default rule handle.

```java

public class DivideRuleHandle implements RuleHandle {

    /**
     * load balance: default RANDOM
     */
    private String loadBalance = LoadBalanceEnum.RANDOM.getName();

    /**
     * retry strategy: default CURRENT
     */
    private String retryStrategy = RetryEnum.CURRENT.getName();

    /**
     * retry: default 3
     */
    private int retry = 3;

    /**
     *  retry: default 3000
     */
    private long timeout = Constants.TIME_OUT;

    /**
     *  retry: default  10240 byte
     */
    private long headerMaxSize = Constants.HEADER_MAX_SIZE;

    /**
     *  retry: default 102400 byte
     */
    private long requestMaxSize = Constants.REQUEST_MAX_SIZE;
}
```

- build default rule info

```java
  // build default rule info
    private RuleDTO buildRpcDefaultRuleDTO(final String selectorId, final MetaDataRegisterDTO metaDataDTO, final String ruleHandler) {
        return buildRuleDTO(selectorId, ruleHandler, metaDataDTO.getRuleName(), metaDataDTO.getPath());
    }
   //  build default rule info
    private RuleDTO buildRuleDTO(final String selectorId, final String ruleHandler, final String ruleName, final String path) {
        RuleDTO ruleDTO = RuleDTO.builder()
                .selectorId(selectorId) //selector Id
                .name(ruleName) //rule Name
                .matchMode(MatchModeEnum.AND.getCode()) // default and
                .enabled(Boolean.TRUE) // default TRUE
                .loged(Boolean.TRUE) //default TRUE
                .sort(1) //default 1
                .handle(ruleHandler)
                .build();
        RuleConditionDTO ruleConditionDTO = RuleConditionDTO.builder()
                .paramType(ParamTypeEnum.URI.getName()) // default URI
                .paramName("/")
                .paramValue(path) // path
                .build();
        if (path.indexOf("*") > 1) {
            ruleConditionDTO.setOperator(OperatorEnum.MATCH.getAlias()); //if the path conatins *, default match
        } else {
            ruleConditionDTO.setOperator(OperatorEnum.EQ.getAlias()); // default = 
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
            // insert rule into database 
            ruleMapper.insertSelective(ruleDO);
            //insert rule condition into database 
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


###### 1.4.1.3 Register Metadata


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

- org.apache.shenyu.admin.service.register.ShenyuClientRegisterDivideServiceImpl#registerMetadata()

Insert or update metadata and then publish sync events to the gateway.

```java

    @Override
    protected void registerMetadata(final MetaDataRegisterDTO dto) {
        if (dto.isRegisterMetaData()) { 
            MetaDataService metaDataService = getMetaDataService();
            MetaDataDO exist = metaDataService.findByPath(dto.getPath());
            // save or update MetaData
            metaDataService.saveOrUpdateMetaData(exist, dto);
        }
    }

    @Override
    public void saveOrUpdateMetaData(final MetaDataDO exist, final MetaDataRegisterDTO metaDataDTO) {
        DataEventTypeEnum eventType;
        //  DTO->DO
        MetaDataDO metaDataDO = MetaDataTransfer.INSTANCE.mapRegisterDTOToEntity(metaDataDTO);
        // insert
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
        // publish event to  gateway
        eventPublisher.publishEvent(new DataChangedEvent(ConfigGroupEnum.META_DATA, eventType,
                Collections.singletonList(MetaDataTransfer.INSTANCE.mapToData(metaDataDO))));
    }
```

###### 1.4.1.4 Register ContextPath

```java
   @Override
    public String register(final MetaDataRegisterDTO dto) {
        //1. register selector
        //......
        
        //2. register rule
        //......
        
        //3. register metadata
        //......
        
        //4. register ContextPath
        String contextPath = dto.getContextPath();
        if (StringUtils.isNotEmpty(contextPath)) {
            registerContextPath(dto);
        }
        return ShenyuResultMessage.SUCCESS;
    }
```

- org.apache.shenyu.admin.service.register.AbstractContextPathRegisterService#registerContextPath()

```java
    @Override
    public void registerContextPath(final MetaDataRegisterDTO dto) {
        // set contextPath for selector
        String contextPathSelectorId = getSelectorService().registerDefault(dto, PluginEnum.CONTEXT_PATH.getName(), "");
        ContextMappingRuleHandle handle = new ContextMappingRuleHandle();
        handle.setContextPath(PathUtils.decoratorContextPath(dto.getContextPath()));
        // set contextPath for rule
        getRuleService().registerDefault(buildContextPathDefaultRuleDTO(contextPathSelectorId, dto, handle.toJson()));
    }
```


##### 1.4.2 Register URI

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
        //get selector 
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

![](/img/activities/code-analysis-divide-plugin/divide-register-zh.png)

The next step is to analyze how the `divide` plugin initiates a call to the `http` service based on this information.


### 2. Call Http Service 

The `divide` plugin is the core processing plugin used by the gateway to handle `http protocol` requests.

Take the case provided on the official website [Quick start with Http](https://shenyu.apache.org/docs/quick-start/quick-start-http) as an example, a direct connection request is as follows.

```
GET http://localhost:8189/order/findById?id=100
Accept: application/json
```


After proxying through the `ShenYu` gateway, the request is as follows.

```
GET http://localhost:9195/http/order/findById?id=100
Accept: application/json
```

The services proxied by the `ShenYu` gateway are still able to request the previous services, where the `divide` plugin comes into play. The class inheritance relationship is as follows.

![](/img/activities/code-analysis-divide-plugin/DividePlugin.png)

- ShenyuPlugin: top-level interface, defining interface methods.
- AbstractShenyuPlugin: abstract class that implements the common logic of the pluin.
- DividePlugin: Divide pluin.

#### 2.1 Accept Request

After passing the `ShenYu` gateway proxy, the request entry is `ShenyuWebHandler`, which implements the `org.springframework.web.server.WebHandler` interface.

```
public final class ShenyuWebHandler implements WebHandler, ApplicationListener<SortPluginEvent> {
    //......
    
    /**
     * hanlde web reuest
     */
    @Override
    public Mono<Void> handle(@NonNull final ServerWebExchange exchange) {
       // execute plugin chain
        Mono<Void> execute = new DefaultShenyuPluginChain(plugins).execute(exchange);
        if (scheduled) {
            return execute.subscribeOn(scheduler);
        }
        return execute;
    }
    
    private static class DefaultShenyuPluginChain implements ShenyuPluginChain {

        private int index;

        private final List<ShenyuPlugin> plugins;

        /**
         * Instantiating the default plugin chain
         */
        DefaultShenyuPluginChain(final List<ShenyuPlugin> plugins) {
            this.plugins = plugins;
        }

        /**
         * Execute each plugin
         */
        @Override
        public Mono<Void> execute(final ServerWebExchange exchange) {
            return Mono.defer(() -> {
                if (this.index < plugins.size()) {
                    // get current plugin 
                    ShenyuPlugin plugin = plugins.get(this.index++);
                    // is skip ?
                    boolean skip = plugin.skip(exchange);
                    if (skip) {
                        // If skipped, execute the next
                        return this.execute(exchange);
                    }
                    // execute current plugin 
                    return plugin.execute(exchange, this);
                }
                return Mono.empty();
            });
        }
    }
}
```

#### 2.2 Matching rule

- org.apache.shenyu.plugin.base.AbstractShenyuPlugin#execute()

Execute the matching logic for selectors and rules in the `execute()` method.

- Matching selectors.
- Matching rules.
- Execute the plugin.

```java
@Override
    public Mono<Void> execute(final ServerWebExchange exchange, final ShenyuPluginChain chain) {
        String pluginName = named();
        PluginData pluginData = BaseDataCache.getInstance().obtainPluginData(pluginName);
        if (pluginData != null && pluginData.getEnabled()) {
            // selector 
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
            // rule 
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

#### 2.3 Execute Divide Plugin

- org.apache.shenyu.plugin.divide.DividePlugin#doExecute()

Execute the specific logic of the `divide` plugin in the `doExecute()` method.

- Checks the `header` size.
- Checking the `request` size.
- Obtaining the list of services.
- implementing load balancing.
- Set request `url`, timeout time, retry policy.

```java
@Override
    protected Mono<Void> doExecute(final ServerWebExchange exchange, final ShenyuPluginChain chain, final SelectorData selector, final RuleData rule) {
        // shenyu Context
        ShenyuContext shenyuContext = exchange.getAttribute(Constants.CONTEXT);
        assert shenyuContext != null;
        // Get the handle property of the rule
        DivideRuleHandle ruleHandle = DividePluginDataHandler.CACHED_HANDLE.get().obtainHandle(CacheKeyUtils.INST.getKey(rule));
        long headerSize = 0;
        // check header size
        for (List<String> multiHeader : exchange.getRequest().getHeaders().values()) {
            for (String value : multiHeader) {
                headerSize += value.getBytes(StandardCharsets.UTF_8).length;
            }
        }
        if (headerSize > ruleHandle.getHeaderMaxSize()) {
            LOG.error("request header is too large");
            Object error = ShenyuResultWrap.error(exchange, ShenyuResultEnum.REQUEST_HEADER_TOO_LARGE, null);
            return WebFluxResultUtils.result(exchange, error);
        }
        
        // check request size
        if (exchange.getRequest().getHeaders().getContentLength() > ruleHandle.getRequestMaxSize()) {
            LOG.error("request entity is too large");
            Object error = ShenyuResultWrap.error(exchange, ShenyuResultEnum.REQUEST_ENTITY_TOO_LARGE, null);
            return WebFluxResultUtils.result(exchange, error);
        }
        // upstream list
        List<Upstream> upstreamList = UpstreamCacheManager.getInstance().findUpstreamListBySelectorId(selector.getId());
        if (CollectionUtils.isEmpty(upstreamList)) {
            LOG.error("divide upstream configuration error： {}", rule);
            Object error = ShenyuResultWrap.error(exchange, ShenyuResultEnum.CANNOT_FIND_HEALTHY_UPSTREAM_URL, null);
            return WebFluxResultUtils.result(exchange, error);
        }
        // request ip
        String ip = Objects.requireNonNull(exchange.getRequest().getRemoteAddress()).getAddress().getHostAddress();
        // load balance
        Upstream upstream = LoadBalancerFactory.selector(upstreamList, ruleHandle.getLoadBalance(), ip);
        if (Objects.isNull(upstream)) {
            LOG.error("divide has no upstream");
            Object error = ShenyuResultWrap.error(exchange, ShenyuResultEnum.CANNOT_FIND_HEALTHY_UPSTREAM_URL, null);
            return WebFluxResultUtils.result(exchange, error);
        }
        // set url
        String domain = upstream.buildDomain();
        exchange.getAttributes().put(Constants.HTTP_DOMAIN, domain);
        // set timeout
        exchange.getAttributes().put(Constants.HTTP_TIME_OUT, ruleHandle.getTimeout());
        exchange.getAttributes().put(Constants.HTTP_RETRY, ruleHandle.getRetry());
        // set retry 
        exchange.getAttributes().put(Constants.RETRY_STRATEGY, ruleHandle.getRetryStrategy());
        exchange.getAttributes().put(Constants.LOAD_BALANCE, ruleHandle.getLoadBalance());
        exchange.getAttributes().put(Constants.DIVIDE_SELECTOR_ID, selector.getId());
        return chain.execute(exchange);
    }
```

#### 2.4 Do Request

By default, the `WebClientPlugin` initiates a call request to the `http` service with the following class inheritance relationship.

![](/img/activities/code-analysis-divide-plugin/WebClientPlugin.png)

- ShenyuPlugin: top-level plug-in, defining plug-in methods.
- AbstractHttpClientPlugin: abstract class that implements the public logic of request invocation.
- WebClientPlugin: initiating requests through `WebClient`.
- NettyHttpClientPlugin: initiating requests through `Netty`.

Initiate the request call.

- org.apache.shenyu.plugin.httpclient.AbstractHttpClientPlugin#execute()

Initiate the request call in the `execute()` method.

- Get the specified timeout, number of retries
- Initiate the request
- Retry after failure according to the specified retry policy

```java

public abstract class AbstractHttpClientPlugin<R> implements ShenyuPlugin {

    protected static final Logger LOG = LoggerFactory.getLogger(AbstractHttpClientPlugin.class);

    @Override
    public final Mono<Void> execute(final ServerWebExchange exchange, final ShenyuPluginChain chain) {
        // shenyu Context
        final ShenyuContext shenyuContext = exchange.getAttribute(Constants.CONTEXT);
        assert shenyuContext != null;
        // uri
        final URI uri = exchange.getAttribute(Constants.HTTP_URI);
        if (Objects.isNull(uri)) {
            Object error = ShenyuResultWrap.error(exchange, ShenyuResultEnum.CANNOT_FIND_URL, null);
            return WebFluxResultUtils.result(exchange, error);
        }
        // get time out
        final long timeout = (long) Optional.ofNullable(exchange.getAttribute(Constants.HTTP_TIME_OUT)).orElse(3000L);
        final Duration duration = Duration.ofMillis(timeout);
        // get retry times
        final int retryTimes = (int) Optional.ofNullable(exchange.getAttribute(Constants.HTTP_RETRY)).orElse(0);
        // get retry strategy
        final String retryStrategy = (String) Optional.ofNullable(exchange.getAttribute(Constants.RETRY_STRATEGY)).orElseGet(RetryEnum.CURRENT::getName);
        LOG.info("The request urlPath is {}, retryTimes is {}, retryStrategy is {}", uri.toASCIIString(), retryTimes, retryStrategy);
        // build header
        final HttpHeaders httpHeaders = buildHttpHeaders(exchange);
        // do request
        final Mono<R> response = doRequest(exchange, exchange.getRequest().getMethodValue(), uri, httpHeaders, exchange.getRequest().getBody())
                .timeout(duration, Mono.error(new TimeoutException("Response took longer than timeout: " + duration)))
                .doOnError(e -> LOG.error(e.getMessage(), e));
        
        // Retry Policy CURRENT, retries the current service.
        if (RetryEnum.CURRENT.getName().equals(retryStrategy)) {
            //old version of DividePlugin and SpringCloudPlugin will run on this
            return response.retryWhen(Retry.anyOf(TimeoutException.class, ConnectTimeoutException.class, ReadTimeoutException.class, IllegalStateException.class)
                    .retryMax(retryTimes)
                    .backoff(Backoff.exponential(Duration.ofMillis(200), Duration.ofSeconds(20), 2, true)))
                    .onErrorMap(TimeoutException.class, th -> new ResponseStatusException(HttpStatus.GATEWAY_TIMEOUT, th.getMessage(), th))
                    .flatMap((Function<Object, Mono<? extends Void>>) o -> chain.execute(exchange));
        }
        
        // Retry for other services
        // Exclude services that have already been called
        final Set<URI> exclude = Sets.newHashSet(uri);
        // resend
        return resend(response, exchange, duration, httpHeaders, exclude, retryTimes)
                .onErrorMap(TimeoutException.class, th -> new ResponseStatusException(HttpStatus.GATEWAY_TIMEOUT, th.getMessage(), th))
                .flatMap((Function<Object, Mono<? extends Void>>) o -> chain.execute(exchange));
    }

    private Mono<R> resend(final Mono<R> clientResponse,
                           final ServerWebExchange exchange,
                           final Duration duration,
                           final HttpHeaders httpHeaders,
                           final Set<URI> exclude,
                           final int retryTimes) {
        Mono<R> result = clientResponse;
        // Retry according to the specified number of retries
        for (int i = 0; i < retryTimes; i++) {
            result = resend(result, exchange, duration, httpHeaders, exclude);
        }
        return result;
    }

    private Mono<R> resend(final Mono<R> response,
                           final ServerWebExchange exchange,
                           final Duration duration,
                           final HttpHeaders httpHeaders,
                           final Set<URI> exclude) {
        return response.onErrorResume(th -> {
            final String selectorId = exchange.getAttribute(Constants.DIVIDE_SELECTOR_ID);
            final String loadBalance = exchange.getAttribute(Constants.LOAD_BALANCE);
            //Check available services
            final List<Upstream> upstreamList = UpstreamCacheManager.getInstance().findUpstreamListBySelectorId(selectorId)
                    .stream().filter(data -> {
                        final String trimUri = data.getUrl().trim();
                        for (URI needToExclude : exclude) {
                            // exclude already called
                            if ((needToExclude.getHost() + ":" + needToExclude.getPort()).equals(trimUri)) {
                                return false;
                            }
                        }
                        return true;
                    }).collect(Collectors.toList());
            if (CollectionUtils.isEmpty(upstreamList)) {
                // no need to retry anymore
                return Mono.error(new ShenyuException(ShenyuResultEnum.CANNOT_FIND_HEALTHY_UPSTREAM_URL_AFTER_FAILOVER.getMsg()));
            }
            // requets ip
            final String ip = Objects.requireNonNull(exchange.getRequest().getRemoteAddress()).getAddress().getHostAddress();
            // Load Balance
            final Upstream upstream = LoadBalancerFactory.selector(upstreamList, loadBalance, ip);
            if (Objects.isNull(upstream)) {
                // no need to retry anymore
                return Mono.error(new ShenyuException(ShenyuResultEnum.CANNOT_FIND_HEALTHY_UPSTREAM_URL_AFTER_FAILOVER.getMsg()));
            }
            final URI newUri = RequestUrlUtils.buildRequestUri(exchange, upstream.buildDomain());
            // Exclude uri that has already been called
            exclude.add(newUri);
             // Make another call
            return doRequest(exchange, exchange.getRequest().getMethodValue(), newUri, httpHeaders, exchange.getRequest().getBody())
                    .timeout(duration, Mono.error(new TimeoutException("Response took longer than timeout: " + duration)))
                    .doOnError(e -> LOG.error(e.getMessage(), e));
        });
    }

    //......
}

```

- org.apache.shenyu.plugin.httpclient.WebClientPlugin#doRequest()

Initiate a real request call via `webClient` in the `doRequest()` method.

```java

@Override
    protected Mono<ClientResponse> doRequest(final ServerWebExchange exchange, final String httpMethod, final URI uri,
                                             final HttpHeaders httpHeaders, final Flux<DataBuffer> body) {
        return webClient.method(HttpMethod.valueOf(httpMethod)).uri(uri) // uri
                .headers(headers -> headers.addAll(httpHeaders)) // header
                .body(BodyInserters.fromDataBuffers(body))
                .exchange() // request
                .doOnSuccess(res -> {
                    if (res.statusCode().is2xxSuccessful()) { // success
                        exchange.getAttributes().put(Constants.CLIENT_RESPONSE_RESULT_TYPE, ResultEnum.SUCCESS.getName());
                    } else { // error
                        exchange.getAttributes().put(Constants.CLIENT_RESPONSE_RESULT_TYPE, ResultEnum.ERROR.getName());
                    }
                    exchange.getResponse().setStatusCode(res.statusCode());
                    exchange.getAttributes().put(Constants.CLIENT_RESPONSE_ATTR, res);
                });
    }
```

#### 2.5 Response Result

- org.apache.shenyu.plugin.response.ResponsePlugin#execute()

The response results are handled by the `ResponsePlugin` plugin.

```java
    @Override
    public Mono<Void> execute(final ServerWebExchange exchange, final ShenyuPluginChain chain) {
        ShenyuContext shenyuContext = exchange.getAttribute(Constants.CONTEXT);
        assert shenyuContext != null;
        // Processing results according to rpc type
        return writerMap.get(shenyuContext.getRpcType()).writeWith(exchange, chain);
    }
```

The processing type is determined by `MessageWriter` and the class inheritance relationship is as follows.

![](/img/activities/code-analysis-divide-plugin/MessageWriter.png)

- MessageWriter: interface, defining message processing methods.
- NettyClientMessageWriter: processing of `Netty` call results.
- RPCMessageWriter: processing the results of `RPC` calls.
- WebClientMessageWriter: processing `WebClient` call results.

The default is to initiate `http` requests via `WebCient`.

- org.apache.shenyu.plugin.response.strategy.WebClientMessageWriter#writeWith()

Process the response results in the `writeWith()` method.

```java

    @Override
    public Mono<Void> writeWith(final ServerWebExchange exchange, final ShenyuPluginChain chain) {
        return chain.execute(exchange).then(Mono.defer(() -> {
            // get response
            ServerHttpResponse response = exchange.getResponse();
            ClientResponse clientResponse = exchange.getAttribute(Constants.CLIENT_RESPONSE_ATTR);
            if (Objects.isNull(clientResponse)) {
                Object error = ShenyuResultWrap.error(exchange, ShenyuResultEnum.SERVICE_RESULT_ERROR, null);
                return WebFluxResultUtils.result(exchange, error);
            }
            //cookies and headers
            response.getCookies().putAll(clientResponse.cookies());
            response.getHeaders().putAll(clientResponse.headers().asHttpHeaders());
            // image, pdf or stream does not do format processing.
            // Handling special response types
            if (clientResponse.headers().contentType().isPresent()) {
                final String media = clientResponse.headers().contentType().get().toString().toLowerCase();
                if (media.matches(COMMON_BIN_MEDIA_TYPE_REGEX)) {
                    return response.writeWith(clientResponse.body(BodyExtractors.toDataBuffers()))
                            .doOnCancel(() -> clean(exchange));
                }
            }
            // Handling general response types
            clientResponse = ResponseUtils.buildClientResponse(response, clientResponse.body(BodyExtractors.toDataBuffers()));
            return clientResponse.bodyToMono(byte[].class)
                    .flatMap(originData -> WebFluxResultUtils.result(exchange, originData))
                    .doOnCancel(() -> clean(exchange));
        }));
    }
```

Analysis to this point, the source code analysis on `Divide` plugin is complete, the analysis flow chart is as follows.

![](/img/activities/code-analysis-divide-plugin/divide-execute-zh.png)


### 3. Summary

The source code analysis in this article starts from the `http` service registration to the `divide` plugin service calls. The `divide` plugin is mainly used to handle `http` requests. Some of the source code does not enter the in-depth analysis, such as the implementation of load balancing, service probe live, will continue to analyze in the following.

