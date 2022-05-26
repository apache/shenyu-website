---
title: Dubbo插件源码分析
author: midnight2104
author_title: Apache ShenYu Committer
author_url: https://github.com/midnight2104
tags: [plugin,dubbo,Apache ShenYu]
---

> [Apache ShenYu](https://shenyu.apache.org/zh/docs/index) 是一个异步的，高性能的，跨语言的，响应式的 `API` 网关。

`Apache ShenYu` 网关使用 `dubbo` 插件完成对 `dubbo`服务的调用。你可以查看官方文档 [Dubbo快速开始](https://shenyu.apache.org/docs/quick-start/quick-start-dubbo) 了解如何使用该插件。

> 本文基于`shenyu-2.4.3`版本进行源码分析，官网的介绍请参考 [Dubbo服务接入](https://shenyu.apache.org/zh/docs/user-guide/dubbo-proxy/) 。


### 1. 服务注册

以官网提供的例子为例 [shenyu-examples-dubbo](https://github.com/apache/incubator-shenyu/tree/master/shenyu-examples/shenyu-examples-dubbo/shenyu-examples-apache-dubbo-service) 。 假如你的`dubbo`服务定义如下(`spring-dubbo.xml`)：

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

声明应用服务名称，注册中心地址，使用`dubbo`协议，声明服务接口，对应接口实现类：

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

在接口实现类中，使用注解`@ShenyuDubboClient`向`shenyu-admin`注册服务。该注解的作用及原理，稍后再进行分析。

在配置文件`application.yml`中的配置信息：

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
    address: zookeeper://localhost:2181  # dubbo使用的注册中心
    
shenyu:
  register:
    registerType: http #注册方式
    serverLists: http://localhost:9095 #注册地址
    props:
      username: admin 
      password: 123456
  client:
    dubbo:
      props:
        contextPath: /dubbo  
        appName: dubbo

```

在配置文件中，声明`dubbo`使用的注册中心地址，`dubbo`服务向`shenyu-admin`注册，使用的方式是`http`，注册地址是`http://localhost:9095`。

关于注册方式的使用，请参考 [应用客户端接入](https://shenyu.apache.org/docs/design/register-center-design/) 。



#### 1.1  声明注册接口

使用注解`@ShenyuDubboClient`将服务注册到网关。简单`demo`如下：

```java
// dubbo服务
@Service("dubboTestService")
public class DubboTestServiceImpl implements DubboTestService {
    
    @Override
    @ShenyuDubboClient(path = "/findById", desc = "Query by Id") // 需要注册的方法
    public DubboTest findById(final String id) {
        return new DubboTest(id, "hello world shenyu Apache, findById");
    }

    //......
}
```

注解定义：

```java
/**
 * 作用于类和方法上
 */
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.TYPE, ElementType.METHOD})
@Inherited
public @interface ShenyuDubboClient {
    
	//注册路径
    String path();
    
    //规则名称
    String ruleName() default "";
   
    //描述信息
    String desc() default "";

    //是否启用
    boolean enabled() default true;
}

```

#### 1.2 扫描注解信息

注解扫描通过`ApacheDubboServiceBeanListener`完成，它实现了`ApplicationListener<ContextRefreshedEvent>`接口，在`Spring`容器启动过程中，发生上下文刷新事件时，开始执行事件处理方法`onApplicationEvent()`。

在构造器实例化的过程中：

- 读取属性配置
- 开启线程池
- 启动注册中心，用于向`shenyu-admin`注册

```java
public class ApacheDubboServiceBeanListener implements ApplicationListener<ContextRefreshedEvent> {

	// ......

    //构造器
    public ApacheDubboServiceBeanListener(final PropertiesConfig clientConfig, final ShenyuClientRegisterRepository shenyuClientRegisterRepository) {
        //1.读取属性配置
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
        //2.开启线程池
        executorService = Executors.newSingleThreadExecutor(new ThreadFactoryBuilder().setNameFormat("shenyu-apache-dubbo-client-thread-pool-%d").build());
        //3.启动注册中心
        publisher.start(shenyuClientRegisterRepository);
    }

    /**
     * 上下文刷新事件，执行方法逻辑
     */
    @Override
    public void onApplicationEvent(final ContextRefreshedEvent contextRefreshedEvent) {
        //......
    }
```

- ApacheDubboServiceBeanListener#onApplicationEvent()

重写的方法逻辑：读取`Dubbo`服务`ServiceBean`，构建元数据对象和`URI`对象，并向`shenyu-admin`注册。

```java
    @Override
    public void onApplicationEvent(final ContextRefreshedEvent contextRefreshedEvent) {
        //读取ServiceBean
        Map<String, ServiceBean> serviceBean = contextRefreshedEvent.getApplicationContext().getBeansOfType(ServiceBean.class);
        if (serviceBean.isEmpty()) {
            return;
        }
        //保证该方法只执行一次
        if (!registered.compareAndSet(false, true)) {
            return;
        }
        //处理元数据对象
        for (Map.Entry<String, ServiceBean> entry : serviceBean.entrySet()) {
            handler(entry.getValue());
        }
        //处理URI对象
        serviceBean.values().stream().findFirst().ifPresent(bean -> {
            publisher.publishEvent(buildURIRegisterDTO(bean));
        });
    }
```

- handler()

  在`handler()`方法中，从`serviceBean`中读取所有方法，判断方法上是否有`ShenyuDubboClient`注解，如果存在就构建元数据对象，并通过注册中心，向`shenyu-admin`注册该方法。

```java
    private void handler(final ServiceBean<?> serviceBean) {
        //获取代理对象
        Object refProxy = serviceBean.getRef();
        //获取class信息
        Class<?> clazz = refProxy.getClass();
        if (AopUtils.isAopProxy(refProxy)) {
            clazz = AopUtils.getTargetClass(refProxy);
        }
        //获取所有方法
        Method[] methods = ReflectionUtils.getUniqueDeclaredMethods(clazz);
        for (Method method : methods) {
            //读取ShenyuDubboClient注解信息
            ShenyuDubboClient shenyuDubboClient = method.getAnnotation(ShenyuDubboClient.class);
            if (Objects.nonNull(shenyuDubboClient)) {
                //构建元数据对象，并注册
                publisher.publishEvent(buildMetaDataDTO(serviceBean, shenyuDubboClient, method));
            }
        }
    }
```

- buildMetaDataDTO()

  构建元数据对象，在这里构建方法注册的必要信息，后续用于选择器或规则匹配。

```java
    private MetaDataRegisterDTO buildMetaDataDTO(final ServiceBean<?> serviceBean, final ShenyuDubboClient shenyuDubboClient, final Method method) {
        //应用名称
        String appName = buildAppName(serviceBean);
        //方法路径
        String path = contextPath + shenyuDubboClient.path();
        //描述信息
        String desc = shenyuDubboClient.desc();
        //服务名称
        String serviceName = serviceBean.getInterface();
        //规则名称
        String configRuleName = shenyuDubboClient.ruleName();
        String ruleName = ("".equals(configRuleName)) ? path : configRuleName;
        //方法名称
        String methodName = method.getName();
        //参数类型
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
                .rpcExt(buildRpcExt(serviceBean)) //dubbo服务的扩展信息
                .rpcType(RpcTypeEnum.DUBBO.getName())
                .enabled(shenyuDubboClient.enabled())
                .build();
    }
```

- buildRpcExt()

  `dubbo`服务的扩展信息

 ```java
    private String buildRpcExt(final ServiceBean serviceBean) {
        DubboRpcExt build = DubboRpcExt.builder()
                .group(StringUtils.isNotEmpty(serviceBean.getGroup()) ? serviceBean.getGroup() : "")//分组
                .version(StringUtils.isNotEmpty(serviceBean.getVersion()) ? serviceBean.getVersion() : "")//版本
                .loadbalance(StringUtils.isNotEmpty(serviceBean.getLoadbalance()) ? serviceBean.getLoadbalance() : Constants.DEFAULT_LOADBALANCE)//负载均衡策略，默认随机
                .retries(Objects.isNull(serviceBean.getRetries()) ? Constants.DEFAULT_RETRIES : serviceBean.getRetries())//重试次数，默认2
                .timeout(Objects.isNull(serviceBean.getTimeout()) ? Constants.DEFAULT_CONNECT_TIMEOUT : serviceBean.getTimeout())//超时，默认3000
                .sent(Objects.isNull(serviceBean.getSent()) ? Constants.DEFAULT_SENT : serviceBean.getSent())//sent，默认false
                .cluster(StringUtils.isNotEmpty(serviceBean.getCluster()) ? serviceBean.getCluster() : Constants.DEFAULT_CLUSTER)//集群策略，默认failover
                .url("")
                .build();
        return GsonUtils.getInstance().toJson(build);
    }
 ```



- buildURIRegisterDTO()

  构建`URI`对象，注册服务本身的信息，后续可用于服务探活。


```java
private URIRegisterDTO buildURIRegisterDTO(final ServiceBean serviceBean) {
        return URIRegisterDTO.builder()
                .contextPath(this.contextPath) //上下文路径
                .appName(buildAppName(serviceBean))//应用名称
                .rpcType(RpcTypeEnum.DUBBO.getName())//rpc类型：dubbo
                .host(buildHost()) //host
                .port(buildPort(serviceBean))//port
                .build();
 }
```



具体的注册逻辑由注册中心实现，请参考 [客户端接入原理](https://shenyu.apache.org/zh/docs/design/register-center-design/) 。

```java
//向注册中心，发布注册事件   
publisher.publishEvent();
```

#### 1.3 处理注册信息

客户端通过注册中心注册的元数据和`URI`数据，在`shenyu-admin`端进行处理，负责存储到数据库和同步给`shenyu`网关。`Dubbo`插件的客户端注册处理逻辑在`ShenyuClientRegisterDubboServiceImpl`中。继承关系如下：

![](/img/activities/code-analysis-dubbo-plugin/ShenyuClientRegisterDubboServiceImpl.png)



- ShenyuClientRegisterService：客户端注册服务，顶层接口；
- FallbackShenyuClientRegisterService：注册失败，提供重试操作；
- AbstractShenyuClientRegisterServiceImpl：抽象类，实现部分公共注册逻辑；
- ShenyuClientRegisterDubboServiceImpl：实现`Dubbo`插件的注册；

##### 1.3.1 注册服务

- org.apache.shenyu.admin.service.register.AbstractShenyuClientRegisterServiceImpl#register()

  客户端通过注册中心注册的元数据`MetaDataRegisterDTO`对象在`shenyu-admin`的`register()`方法被接送到。

```java
   @Override
    public String register(final MetaDataRegisterDTO dto) {
        //1. 注册选择器
        String selectorHandler = selectorHandler(dto);
        String selectorId = selectorService.registerDefault(dto, PluginNameAdapter.rpcTypeAdapter(rpcType()), selectorHandler);
        //2. 注册规则
        String ruleHandler = ruleHandler();
        RuleDTO ruleDTO = buildRpcDefaultRuleDTO(selectorId, dto, ruleHandler);
        ruleService.registerDefault(ruleDTO);
        //3. 注册元数据
        registerMetadata(dto);
        //4. 注册ContextPath
        String contextPath = dto.getContextPath();
        if (StringUtils.isNotEmpty(contextPath)) {
            registerContextPath(dto);
        }
        return ShenyuResultMessage.SUCCESS;
    }
```

###### 1.3.1.1 注册选择器

- org.apache.shenyu.admin.service.impl.SelectorServiceImpl#registerDefault()

构建`contextPath`，查找选择器信息是否存在，如果存在就返回`id`；不存在就创建默认的选择器信息。

```java
    @Override
    public String registerDefault(final MetaDataRegisterDTO dto, final String pluginName, final String selectorHandler) {
        // 构建contextPath
        String contextPath = ContextPathUtils.buildContextPath(dto.getContextPath(), dto.getAppName());
        // 通过名称查找选择器信息是否存在
        SelectorDO selectorDO = findByNameAndPluginName(contextPath, pluginName);
        if (Objects.isNull(selectorDO)) {
            // 不存在就创建默认的选择器信息
            return registerSelector(contextPath, pluginName, selectorHandler);
        }
        return selectorDO.getId();
    }
```

- 默认选择器信息

  在这里构建默认选择器信息及其条件属性。

```java
   //注册选择器
   private String registerSelector(final String contextPath, final String pluginName, final String selectorHandler) {
        //构建选择器
        SelectorDTO selectorDTO = buildSelectorDTO(contextPath, pluginMapper.selectByName(pluginName).getId());
        selectorDTO.setHandle(selectorHandler);
        //注册默认选择器
        return registerDefault(selectorDTO);
    }
     //构建选择器
    private SelectorDTO buildSelectorDTO(final String contextPath, final String pluginId) {
        //构建默认选择器
        SelectorDTO selectorDTO = buildDefaultSelectorDTO(contextPath);
        selectorDTO.setPluginId(pluginId);
         //构建默认选择器的条件属性
        selectorDTO.setSelectorConditions(buildDefaultSelectorConditionDTO(contextPath));
        return selectorDTO;
    }
```

- 构建默认选择器

```java
private SelectorDTO buildDefaultSelectorDTO(final String name) {
    return SelectorDTO.builder()
            .name(name) // 名称
            .type(SelectorTypeEnum.CUSTOM_FLOW.getCode()) // 默认类型自定义
            .matchMode(MatchModeEnum.AND.getCode()) //默认匹配方式 and
            .enabled(Boolean.TRUE)  //默认启开启
            .loged(Boolean.TRUE)  //默认记录日志
            .continued(Boolean.TRUE) //默认继续后续选择器
            .sort(1) //默认顺序1
            .build();
}
```

- 构建默认选择器条件属性

```java
private List<SelectorConditionDTO> buildDefaultSelectorConditionDTO(final String contextPath) {
    SelectorConditionDTO selectorConditionDTO = new SelectorConditionDTO();
    selectorConditionDTO.setParamType(ParamTypeEnum.URI.getName()); // 默认参数类型URI
    selectorConditionDTO.setParamName("/");
    selectorConditionDTO.setOperator(OperatorEnum.MATCH.getAlias()); // 默认匹配策略 match
    selectorConditionDTO.setParamValue(contextPath + AdminConstants.URI_SUFFIX); // 默认值 /contextPath/**
    return Collections.singletonList(selectorConditionDTO);
}
```

- 注册默认选择器

```java
@Override
public String registerDefault(final SelectorDTO selectorDTO) {
    //选择器信息
    SelectorDO selectorDO = SelectorDO.buildSelectorDO(selectorDTO);
    //选择器条件属性
    List<SelectorConditionDTO> selectorConditionDTOs = selectorDTO.getSelectorConditions();
    if (StringUtils.isEmpty(selectorDTO.getId())) {
        // 向数据库插入选择器信息
        selectorMapper.insertSelective(selectorDO);
          // 向数据库插入选择器条件属性
        selectorConditionDTOs.forEach(selectorConditionDTO -> {
            selectorConditionDTO.setSelectorId(selectorDO.getId());            selectorConditionMapper.insertSelective(SelectorConditionDO.buildSelectorConditionDO(selectorConditionDTO));
        });
    }
    // 发布同步事件，向网关同步选择信息及其条件属性
    publishEvent(selectorDO, selectorConditionDTOs);
    return selectorDO.getId();
}
```

###### 1.3.1.2 注册规则

在注册服务的第二步中，开始构建默认规则，然后注册规则。

```java
@Override
    public String register(final MetaDataRegisterDTO dto) {
        //1. 注册选择器
        //......
        
        //2. 注册规则
        // 默认规则处理属性
        String ruleHandler = ruleHandler();
        // 构建默认规则信息
        RuleDTO ruleDTO = buildRpcDefaultRuleDTO(selectorId, dto, ruleHandler);
        // 注册规则
        ruleService.registerDefault(ruleDTO);
        
        //3. 注册元数据
        //......
        
        //4. 注册ContextPath
        //......
        
        return ShenyuResultMessage.SUCCESS;
    }
```

- 默认规则处理属性

```java
    @Override
    protected String ruleHandler() {
        // 默认规则处理属性
        return new DubboRuleHandle().toJson();
    }
```

`Dubbo`插件默认规则处理属性

```java
public class DubboRuleHandle implements RuleHandle {

    /**
     * dubbo服务版本信息.
     */
    private String version;

    /**
     * 分组.
     */
    private String group;

    /**
     * 重试次数.
     */
    private Integer retries = 0;

    /**
     * 负载均衡策略：默认随机
     */
    private String loadbalance = LoadBalanceEnum.RANDOM.getName();

    /**
     * 超时，默认3000
     */
    private long timeout = Constants.TIME_OUT;
}
```



- 构建默认规则信息

```java
  // 构建默认规则信息
    private RuleDTO buildRpcDefaultRuleDTO(final String selectorId, final MetaDataRegisterDTO metaDataDTO, final String ruleHandler) {
        return buildRuleDTO(selectorId, ruleHandler, metaDataDTO.getRuleName(), metaDataDTO.getPath());
    }
   //  构建默认规则信息
    private RuleDTO buildRuleDTO(final String selectorId, final String ruleHandler, final String ruleName, final String path) {
        RuleDTO ruleDTO = RuleDTO.builder()
                .selectorId(selectorId) //关联的选择器id
                .name(ruleName) //规则名称
                .matchMode(MatchModeEnum.AND.getCode()) // 默认匹配模式 and
                .enabled(Boolean.TRUE) // 默认开启
                .loged(Boolean.TRUE) //默认记录日志
                .sort(1) //默认顺序 1
                .handle(ruleHandler)
                .build();
        RuleConditionDTO ruleConditionDTO = RuleConditionDTO.builder()
                .paramType(ParamTypeEnum.URI.getName()) // 默认参数类型URI
                .paramName("/")
                .paramValue(path) //参数值path
                .build();
        if (path.indexOf("*") > 1) {
            ruleConditionDTO.setOperator(OperatorEnum.MATCH.getAlias()); //如果path中有*，操作类型则默认为 match
        } else {
            ruleConditionDTO.setOperator(OperatorEnum.EQ.getAlias()); // 否则，默认操作类型 = 
        }
        ruleDTO.setRuleConditions(Collections.singletonList(ruleConditionDTO));
        return ruleDTO;
    }
```

- org.apache.shenyu.admin.service.impl.RuleServiceImpl#registerDefault()

注册规则：向数据库插入记录，并向网关发布事件，进行数据同步。

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
            // 向数据库插入规则信息
            ruleMapper.insertSelective(ruleDO);
            //向数据库插入规则体条件属性
            ruleConditions.forEach(ruleConditionDTO -> {
                ruleConditionDTO.setRuleId(ruleDO.getId());                ruleConditionMapper.insertSelective(RuleConditionDO.buildRuleConditionDO(ruleConditionDTO));
            });
        }
        // 向网关发布事件，进行数据同步
        publishEvent(ruleDO, ruleConditions);
        return ruleDO.getId();
    }

```



###### 1.3.1.3 注册元数据

元数据主要用于`RPC`服务的调用。

```java
   @Override
    public String register(final MetaDataRegisterDTO dto) {
        //1. 注册选择器
        //......
        
        //2. 注册规则
        //......
        
        //3. 注册元数据
        registerMetadata(dto);
        
        //4. 注册ContextPath
        //......
        
        return ShenyuResultMessage.SUCCESS;
    }
```

- org.apache.shenyu.admin.service.register.ShenyuClientRegisterDubboServiceImpl#registerMetadata()

  插入或更新元数据，然后发布同步事件到网关。

```java
    @Override
    protected void registerMetadata(final MetaDataRegisterDTO dto) {
            // 获取metaDataService
            MetaDataService metaDataService = getMetaDataService();
            // 元数据是否存在
            MetaDataDO exist = metaDataService.findByPath(dto.getPath());
            // 插入或更新元数据
            metaDataService.saveOrUpdateMetaData(exist, dto);
    }

    @Override
    public void saveOrUpdateMetaData(final MetaDataDO exist, final MetaDataRegisterDTO metaDataDTO) {
        DataEventTypeEnum eventType;
        // 数据类型转换 DTO->DO
        MetaDataDO metaDataDO = MetaDataTransfer.INSTANCE.mapRegisterDTOToEntity(metaDataDTO);
        // 插入数据
        if (Objects.isNull(exist)) {
            Timestamp currentTime = new Timestamp(System.currentTimeMillis());
            metaDataDO.setId(UUIDUtils.getInstance().generateShortUuid());
            metaDataDO.setDateCreated(currentTime);
            metaDataDO.setDateUpdated(currentTime);
            metaDataMapper.insert(metaDataDO);
            eventType = DataEventTypeEnum.CREATE;
        } else {
            // 更新数据
            metaDataDO.setId(exist.getId());
            metaDataMapper.update(metaDataDO);
            eventType = DataEventTypeEnum.UPDATE;
        }
        // 发布同步事件到网关
        eventPublisher.publishEvent(new DataChangedEvent(ConfigGroupEnum.META_DATA, eventType,
                Collections.singletonList(MetaDataTransfer.INSTANCE.mapToData(metaDataDO))));
    }
```



##### 1.3.2 注册URI

- org.apache.shenyu.admin.service.register.FallbackShenyuClientRegisterService#registerURI()

服务端收到客户端注册的`URI`信息后，进行处理。

```java
    @Override
    public String registerURI(final String selectorName, final List<URIRegisterDTO> uriList) {
        String result;
        String key = key(selectorName);
        try {
            this.removeFallBack(key);
            // 注册URI
            result = this.doRegisterURI(selectorName, uriList);
            logger.info("Register success: {},{}", selectorName, uriList);
        } catch (Exception ex) {
            logger.warn("Register exception: cause:{}", ex.getMessage());
            result = "";
            // 注册失败后，进行重试
            this.addFallback(key, new FallbackHolder(selectorName, uriList));
        }
        return result;
    }
```

- org.apache.shenyu.admin.service.register.AbstractShenyuClientRegisterServiceImpl#doRegisterURI()

从客户端注册的`URI`中获取有效的`URI`，更新对应的选择器`handle`属性，向网关发送选择器更新事件。

```java
@Override
    public String doRegisterURI(final String selectorName, final List<URIRegisterDTO> uriList) {
        //参数检查
        if (CollectionUtils.isEmpty(uriList)) {
            return "";
        }
        //获取选择器信息
        SelectorDO selectorDO = selectorService.findByNameAndPluginName(selectorName, PluginNameAdapter.rpcTypeAdapter(rpcType()));
        if (Objects.isNull(selectorDO)) {
            throw new ShenyuException("doRegister Failed to execute,wait to retry.");
        }
        // 获取有效的URI
        List<URIRegisterDTO> validUriList = uriList.stream().filter(dto -> Objects.nonNull(dto.getPort()) && StringUtils.isNotBlank(dto.getHost())).collect(Collectors.toList());
        // 构建选择器的handle属性
        String handler = buildHandle(validUriList, selectorDO);
        if (handler != null) {
            selectorDO.setHandle(handler);
            SelectorData selectorData = selectorService.buildByName(selectorName, PluginNameAdapter.rpcTypeAdapter(rpcType()));
            selectorData.setHandle(handler);
            // 向数据库更新选择器的handle属性
            selectorService.updateSelective(selectorDO);
            // 向网关发送选择器更新事件
            eventPublisher.publishEvent(new DataChangedEvent(ConfigGroupEnum.SELECTOR, DataEventTypeEnum.UPDATE, Collections.singletonList(selectorData)));
        }
        return ShenyuResultMessage.SUCCESS;
    }
```

关于服务注册的源码分析就以及完成了，分析流程图如下：

![](/img/activities/code-analysis-dubbo-plugin/dubbo-register-zh.png)



接下来就分析`dubbo`插件是如何根据这些信息向`http`服务发起调用。



### 2. 服务调用

`dubbo`插件是`ShenYu`网关用于将`http`请求转成 `dubbo协议`，调用`dubbo`服务的核心处理插件。

以官网提供的案例 [Dubbo快速开始](https://shenyu.apache.org/docs/quick-start/quick-start-dubbo/) 为例，一个`dubbo`服务通过注册中心向`shenyu-admin`注册后，通过`ShenYu`网关代理，请求如下：

```
GET http://localhost:9195/dubbo/findById?id=100
Accept: application/json
```



`Dubbo`插件中，类继承关系如下：

![](/img/activities/code-analysis-dubbo-plugin/ApacheDubboPlugin.png)

- ShenyuPlugin：顶层接口，定义接口方法；
- AbstractShenyuPlugin：抽象类，实现插件共有逻辑；
- AbstractDubboPlugin：dubbo插件抽象类，实现`dubbo`共有逻辑；
- ApacheDubboPlugin：ApacheDubbo插件。

> ShenYu网关支持ApacheDubbo和AlibabaDubbo

#### 2.1 接收请求

通过`ShenYu`网关代理后，请求入口是`ShenyuWebHandler`，它实现了`org.springframework.web.server.WebHandler`接口。

```java
public final class ShenyuWebHandler implements WebHandler, ApplicationListener<SortPluginEvent> {
    //......
    
    /**
     * 处理web请求
     */
    @Override
    public Mono<Void> handle(@NonNull final ServerWebExchange exchange) {
       // 执行默认插件链
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
         * 实例化默认插件链
         */
        DefaultShenyuPluginChain(final List<ShenyuPlugin> plugins) {
            this.plugins = plugins;
        }

        /**
         * 执行每个插件.
         */
        @Override
        public Mono<Void> execute(final ServerWebExchange exchange) {
            return Mono.defer(() -> {
                if (this.index < plugins.size()) {
                    // 获取当前执行插件
                    ShenyuPlugin plugin = plugins.get(this.index++);
                    // 是否跳过当前插件
                    boolean skip = plugin.skip(exchange);
                    if (skip) {
                        // 如果跳过就执行下一个
                        return this.execute(exchange);
                    }
                    // 执行当前插件
                    return plugin.execute(exchange, this);
                }
                return Mono.empty();
            });
        }
    }
}
```

#### 2.2 匹配规则

- org.apache.shenyu.plugin.base.AbstractShenyuPlugin#execute()

在`execute()`方法中执行选择器和规则的匹配逻辑。

- 匹配选择器；
- 匹配规则；
- 执行插件。

```java
@Override
    public Mono<Void> execute(final ServerWebExchange exchange, final ShenyuPluginChain chain) {
        // 插件名称
        String pluginName = named();
        // 插件信息
        PluginData pluginData = BaseDataCache.getInstance().obtainPluginData(pluginName);
        if (pluginData != null && pluginData.getEnabled()) {
            // 选择器信息
            final Collection<SelectorData> selectors = BaseDataCache.getInstance().obtainSelectorData(pluginName);
            if (CollectionUtils.isEmpty(selectors)) {
                return handleSelectorIfNull(pluginName, exchange, chain);
            }
            // 匹配选择器
            SelectorData selectorData = matchSelector(exchange, selectors);
            if (Objects.isNull(selectorData)) {
                return handleSelectorIfNull(pluginName, exchange, chain);
            }
            selectorLog(selectorData, pluginName);
            // 规则信息
            List<RuleData> rules = BaseDataCache.getInstance().obtainRuleData(selectorData.getId());
            if (CollectionUtils.isEmpty(rules)) {
                return handleRuleIfNull(pluginName, exchange, chain);
            }
            // 匹配规则
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
            // 执行插件
            return doExecute(exchange, chain, selectorData, rule);
        }
        return chain.execute(exchange);
    }
```

#### 2.3 执行GlobalPlugin

- org.apache.shenyu.plugin.global.GlobalPlugin#execute()

`GlobalPlugin`是一个全局插件，在`execute()`方法中构建上下文信息。

```java
public class GlobalPlugin implements ShenyuPlugin {
    // 构建上下文信息
    private final ShenyuContextBuilder builder;
    
    //......
    
    @Override
    public Mono<Void> execute(final ServerWebExchange exchange, final ShenyuPluginChain chain) {
       // 构建上下文信息，传入到 exchange 中
        ShenyuContext shenyuContext = builder.build(exchange);
        exchange.getAttributes().put(Constants.CONTEXT, shenyuContext);
        return chain.execute(exchange);
    }
    
    //......
}
```



- org.apache.shenyu.plugin.global.DefaultShenyuContextBuilder#build()

构建默认的上下文信息。

```java
public class DefaultShenyuContextBuilder implements ShenyuContextBuilder {
    //......
    
    @Override
    public ShenyuContext build(final ServerWebExchange exchange) {
        //构建参数
        Pair<String, MetaData> buildData = buildData(exchange);
        //包装ShenyuContext
        return decoratorMap.get(buildData.getLeft()).decorator(buildDefaultContext(exchange.getRequest()), buildData.getRight());
    }
    
    private Pair<String, MetaData> buildData(final ServerWebExchange exchange) {
        //......
        //根据请求的uri获取元数据
        MetaData metaData = MetaDataCache.getInstance().obtain(request.getURI().getPath());
        if (Objects.nonNull(metaData) && Boolean.TRUE.equals(metaData.getEnabled())) {
            exchange.getAttributes().put(Constants.META_DATA, metaData);
            return Pair.of(metaData.getRpcType(), metaData);
        } else {
            return Pair.of(RpcTypeEnum.HTTP.getName(), new MetaData());
        }
    }
    //设置默认的上下文信息
    private ShenyuContext buildDefaultContext(final ServerHttpRequest request) {
        String appKey = request.getHeaders().getFirst(Constants.APP_KEY);
        String sign = request.getHeaders().getFirst(Constants.SIGN);
        String timestamp = request.getHeaders().getFirst(Constants.TIMESTAMP);
        ShenyuContext shenyuContext = new ShenyuContext();
        String path = request.getURI().getPath();
        shenyuContext.setPath(path); //请求路径
        shenyuContext.setAppKey(appKey);
        shenyuContext.setSign(sign);
        shenyuContext.setTimestamp(timestamp);
        shenyuContext.setStartDateTime(LocalDateTime.now());
        Optional.ofNullable(request.getMethod()).ifPresent(httpMethod -> shenyuContext.setHttpMethod(httpMethod.name()));//请求方法
        return shenyuContext;
    }
 }
```

- org.apache.shenyu.plugin.dubbo.common.context.DubboShenyuContextDecorator#decorator()

包装`ShenyuContext`：

```java
public class DubboShenyuContextDecorator implements ShenyuContextDecorator {
    
    @Override
    public ShenyuContext decorator(final ShenyuContext shenyuContext, final MetaData metaData) {
        shenyuContext.setModule(metaData.getAppName());//获取AppName
        shenyuContext.setMethod(metaData.getServiceName()); //获取ServiceName
        shenyuContext.setContextPath(metaData.getContextPath()); //获取contextPath
        shenyuContext.setRpcType(RpcTypeEnum.DUBBO.getName()); // dubbo服务
        return shenyuContext;
    }
    
    @Override
    public String rpcType() {
        return RpcTypeEnum.DUBBO.getName();
    }
}
```



#### 2.4 执行RpcParamTransformPlugin

`RpcParamTransformPlugin`负责从`http`请求中读取参数，保存到`exchange`中，传递给`rpc`服务。

- org.apache.shenyu.plugin.base.RpcParamTransformPlugin#execute()

在`execute()`方法中，执行该插件的核心逻辑：从`exchange`中获取请求信息，根据请求传入的内容形式处理参数。

```java
public class RpcParamTransformPlugin implements ShenyuPlugin {

    @Override
    public Mono<Void> execute(final ServerWebExchange exchange, final ShenyuPluginChain chain) {
        //从exchange中获取请求信息
        ServerHttpRequest request = exchange.getRequest();
        ShenyuContext shenyuContext = exchange.getAttribute(Constants.CONTEXT);
        if (Objects.nonNull(shenyuContext)) {
           // 如果请求参数格式是APPLICATION_JSON
            MediaType mediaType = request.getHeaders().getContentType();
            if (MediaType.APPLICATION_JSON.isCompatibleWith(mediaType)) {
                return body(exchange, request, chain);
            }
            // 如果请求参数格式是APPLICATION_FORM_URLENCODED
            if (MediaType.APPLICATION_FORM_URLENCODED.isCompatibleWith(mediaType)) {
                return formData(exchange, request, chain);
            }
            //一般查询请求
            return query(exchange, request, chain);
        }
        return chain.execute(exchange);
    }
    
    // 如果请求参数格式是APPLICATION_JSON
    private Mono<Void> body(final ServerWebExchange exchange, final ServerHttpRequest serverHttpRequest, final ShenyuPluginChain chain) {
        return Mono.from(DataBufferUtils.join(serverHttpRequest.getBody())
                .flatMap(body -> {
                    exchange.getAttributes().put(Constants.PARAM_TRANSFORM, resolveBodyFromRequest(body));//解析body，保存到exchange中
                    return chain.execute(exchange);
                }));
    }
   // 如果请求参数格式是APPLICATION_FORM_URLENCODED
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
    //一般查询请求
    private Mono<Void> query(final ServerWebExchange exchange, final ServerHttpRequest serverHttpRequest, final ShenyuPluginChain chain) {
        exchange.getAttributes().put(Constants.PARAM_TRANSFORM, HttpParamConverter.ofString(() -> serverHttpRequest.getURI().getQuery()));//保存到exchange中
        return chain.execute(exchange);
    }
    //......
 }
```



#### 2.5 执行DubboPlugin

- org.apache.shenyu.plugin.dubbo.common.AbstractDubboPlugin#doExecute()

在`doExecute()`方法中，主要是检查元数据和参数。

```java
public abstract class AbstractDubboPlugin extends AbstractShenyuPlugin {
    
    @Override
    public Mono<Void> doExecute(final ServerWebExchange exchange,
                                   final ShenyuPluginChain chain,
                                   final SelectorData selector,
                                   final RuleData rule) {
        //获取参数
        String param = exchange.getAttribute(Constants.PARAM_TRANSFORM);
        //获取上下文信息
        ShenyuContext shenyuContext = exchange.getAttribute(Constants.CONTEXT);
        assert shenyuContext != null;
        //获取元数据
        MetaData metaData = exchange.getAttribute(Constants.META_DATA);
        //检查元数据
        if (!checkMetaData(metaData)) {
            LOG.error(" path is : {}, meta data have error : {}", shenyuContext.getPath(), metaData);
            exchange.getResponse().setStatusCode(HttpStatus.INTERNAL_SERVER_ERROR);
            Object error = ShenyuResultWrap.error(exchange, ShenyuResultEnum.META_DATA_ERROR, null);
            return WebFluxResultUtils.result(exchange, error);
        }
        //检查元数据和参数
        if (Objects.nonNull(metaData) && StringUtils.isNoneBlank(metaData.getParameterTypes()) && StringUtils.isBlank(param)) {
            exchange.getResponse().setStatusCode(HttpStatus.INTERNAL_SERVER_ERROR);
            Object error = ShenyuResultWrap.error(exchange, ShenyuResultEnum.DUBBO_HAVE_BODY_PARAM, null);
            return WebFluxResultUtils.result(exchange, error);
        }
        //设置rpcContext
        this.rpcContext(exchange);
        //进行dubbo服务调用
        return this.doDubboInvoker(exchange, chain, selector, rule, metaData, param);
    }
}
```



- org.apache.shenyu.plugin.apache.dubbo.ApacheDubboPlugin#doDubboInvoker()

在`doDubboInvoker()`方法中设置特殊的上下文信息，然后开始dubbo的泛化调用。

```java
public class ApacheDubboPlugin extends AbstractDubboPlugin {
    
    @Override
    protected Mono<Void> doDubboInvoker(final ServerWebExchange exchange,
                                        final ShenyuPluginChain chain,
                                        final SelectorData selector,
                                        final RuleData rule,
                                        final MetaData metaData,
                                        final String param) {
        //设置当前的选择器和规则信息，以及请求地址，用于支持dubbo的灰度
        RpcContext.getContext().setAttachment(Constants.DUBBO_SELECTOR_ID, selector.getId());
        RpcContext.getContext().setAttachment(Constants.DUBBO_RULE_ID, rule.getId());
        RpcContext.getContext().setAttachment(Constants.DUBBO_REMOTE_ADDRESS, Objects.requireNonNull(exchange.getRequest().getRemoteAddress()).getAddress().getHostAddress());
        //dubbo的泛化调用
        final Mono<Object> result = dubboProxyService.genericInvoker(param, metaData, exchange);
        //执行下一个插件
        return result.then(chain.execute(exchange));
    }
}
```

- org.apache.shenyu.plugin.apache.dubbo.proxy.ApacheDubboProxyService#genericInvoker()

`genericInvoker()`方法：

- 获取`ReferenceConfig`对象；
- 获取泛化服务`GenericService`对象；
- 构造请求参数`pair`对象；
- 发起异步的泛化调用。

```java
public class ApacheDubboProxyService {
    //...... 

    /**
     * Generic invoker object.
     */
    public Mono<Object> genericInvoker(final String body, final MetaData metaData, final ServerWebExchange exchange) throws ShenyuException {
        //1.获取ReferenceConfig对象
        ReferenceConfig<GenericService> reference = ApacheDubboConfigCache.getInstance().get(metaData.getPath());
        //如果没有获取到
        if (Objects.isNull(reference) || StringUtils.isEmpty(reference.getInterface())) {
            //失效当前缓存的信息
            ApacheDubboConfigCache.getInstance().invalidate(metaData.getPath());
            //使用元数据进行再次初始化
            reference = ApacheDubboConfigCache.getInstance().initRef(metaData);
        }
        //2.获取泛化服务GenericService对象
        GenericService genericService = reference.get();
        //3.构造请求参数pair对象
        Pair<String[], Object[]> pair;
        if (StringUtils.isBlank(metaData.getParameterTypes()) || ParamCheckUtils.dubboBodyIsEmpty(body)) {
            pair = new ImmutablePair<>(new String[]{}, new Object[]{});
        } else {
            pair = dubboParamResolveService.buildParameter(body, metaData.getParameterTypes());
        }
        //4.发起异步的泛化调用
        return Mono.fromFuture(invokeAsync(genericService, metaData.getMethodName(), pair.getLeft(), pair.getRight()).thenApply(ret -> {
            //处理结果
            if (Objects.isNull(ret)) {
                ret = Constants.DUBBO_RPC_RESULT_EMPTY;
            }
            exchange.getAttributes().put(Constants.RPC_RESULT, ret);
            exchange.getAttributes().put(Constants.CLIENT_RESPONSE_RESULT_TYPE, ResultEnum.SUCCESS.getName());
            return ret;
        })).onErrorMap(exception -> exception instanceof GenericException ? new ShenyuException(((GenericException) exception).getExceptionMessage()) : new ShenyuException(exception));//处理异常
    }
    
    //泛化调用，异步操作
    private CompletableFuture<Object> invokeAsync(final GenericService genericService, final String method, final String[] parameterTypes, final Object[] args) throws GenericException {
        genericService.$invoke(method, parameterTypes, args);
        Object resultFromFuture = RpcContext.getContext().getFuture();
        return resultFromFuture instanceof CompletableFuture ? (CompletableFuture<Object>) resultFromFuture : CompletableFuture.completedFuture(resultFromFuture);
    }
}

```

通过泛化调用就可以实现在网关调用`dubbo`服务了。



`ReferenceConfig`对象是支持泛化调用的关键对象 ，它的初始化操作是在数据同步的时候完成的。这里涉及两部分数据，一是同步的插件`handler`信息，二是同步的插件元数据信息。

- org.apache.shenyu.plugin.dubbo.common.handler.AbstractDubboPluginDataHandler#handlerPlugin()

当插件数据更新时，数据同步模块会将数据从`shenyu-admin`同步到网关。在`handlerPlugin()`中执行初始化操作。

```java
public abstract class AbstractDubboPluginDataHandler implements PluginDataHandler {
    //......
    
    //初始化配置缓存
   protected abstract void initConfigCache(DubboRegisterConfig dubboRegisterConfig);

    @Override
    public void handlerPlugin(final PluginData pluginData) {
        if (Objects.nonNull(pluginData) && Boolean.TRUE.equals(pluginData.getEnabled())) {
            //数据反序列化
            DubboRegisterConfig dubboRegisterConfig = GsonUtils.getInstance().fromJson(pluginData.getConfig(), DubboRegisterConfig.class);
            DubboRegisterConfig exist = Singleton.INST.get(DubboRegisterConfig.class);
            if (Objects.isNull(dubboRegisterConfig)) {
                return;
            }
            if (Objects.isNull(exist) || !dubboRegisterConfig.equals(exist)) {
                // 执行初始化操作
                this.initConfigCache(dubboRegisterConfig);
            }
            Singleton.INST.single(DubboRegisterConfig.class, dubboRegisterConfig);
        }
    }
    //......
}
```

- org.apache.shenyu.plugin.apache.dubbo.handler.ApacheDubboPluginDataHandler#initConfigCache()

执行初始化操作。

```java
public class ApacheDubboPluginDataHandler extends AbstractDubboPluginDataHandler {

    @Override
    protected void initConfigCache(final DubboRegisterConfig dubboRegisterConfig) {
        //执行初始化操作
        ApacheDubboConfigCache.getInstance().init(dubboRegisterConfig);
        //失效之前缓存的结果
        ApacheDubboConfigCache.getInstance().invalidateAll();
    }
}

```

- org.apache.shenyu.plugin.apache.dubbo.cache.ApacheDubboConfigCache#init()

在初始化中，设置`registryConfig`和`consumerConfig`。

```java
public final class ApacheDubboConfigCache extends DubboConfigCache {
    //......  
   /**
     * 初始化
     */
    public void init(final DubboRegisterConfig dubboRegisterConfig) {
        //创建ApplicationConfig
        if (Objects.isNull(applicationConfig)) {
            applicationConfig = new ApplicationConfig("shenyu_proxy");
        }
        //协议或者地址发生改变时，需要更新registryConfig
        if (needUpdateRegistryConfig(dubboRegisterConfig)) {
            RegistryConfig registryConfigTemp = new RegistryConfig();
            registryConfigTemp.setProtocol(dubboRegisterConfig.getProtocol());
            registryConfigTemp.setId("shenyu_proxy");
            registryConfigTemp.setRegister(false);
            registryConfigTemp.setAddress(dubboRegisterConfig.getRegister());            Optional.ofNullable(dubboRegisterConfig.getGroup()).ifPresent(registryConfigTemp::setGroup);
            registryConfig = registryConfigTemp;
        }
        //创建ConsumerConfig
        if (Objects.isNull(consumerConfig)) {
            consumerConfig = ApplicationModel.getConfigManager().getDefaultConsumer().orElseGet(() -> {
                ConsumerConfig consumerConfig = new ConsumerConfig();
                consumerConfig.refresh();
                return consumerConfig;
            });
           
 //设置ConsumerConfig
            Optional.ofNullable(dubboRegisterConfig.getThreadpool()).ifPresent(consumerConfig::setThreadpool); 
            Optional.ofNullable(dubboRegisterConfig.getCorethreads()).ifPresent(consumerConfig::setCorethreads);
            
 Optional.ofNullable(dubboRegisterConfig.getThreads()).ifPresent(consumerConfig::setThreads);
            
 Optional.ofNullable(dubboRegisterConfig.getQueues()).ifPresent(consumerConfig::setQueues);
        }
    }
    
    //是否需要更新注册配置
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

当元数据更新时，数据同步模块会将数据从`shenyu-admin`同步到网关。在`onSubscribe()`方法中执行元数据更新操作。

```java
public class ApacheDubboMetaDataSubscriber implements MetaDataSubscriber {
    //本地内存缓存
    private static final ConcurrentMap<String, MetaData> META_DATA = Maps.newConcurrentMap();

    //元数据发生更新
    public void onSubscribe(final MetaData metaData) {
        // dubbo服务的元数据更新
        if (RpcTypeEnum.DUBBO.getName().equals(metaData.getRpcType())) {
            //对应的元数据是否存在
            MetaData exist = META_DATA.get(metaData.getPath());
            if (Objects.isNull(exist) || Objects.isNull(ApacheDubboConfigCache.getInstance().get(metaData.getPath()))) {
                // 首次初始化
                ApacheDubboConfigCache.getInstance().initRef(metaData);
            } else {
                // 对应的元数据发生了更新操作
                if (!Objects.equals(metaData.getServiceName(), exist.getServiceName())
                        || !Objects.equals(metaData.getRpcExt(), exist.getRpcExt())
                        || !Objects.equals(metaData.getParameterTypes(), exist.getParameterTypes())
                        || !Objects.equals(metaData.getMethodName(), exist.getMethodName())) {
                    //根据最新的元数据再次构建ReferenceConfig
                    ApacheDubboConfigCache.getInstance().build(metaData);
                }
            }
            //本地内存缓存
            META_DATA.put(metaData.getPath(), metaData);
        }
    }

    //删除元数据
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

通过`metaData`构建`ReferenceConfig`对象。

```java
public final class ApacheDubboConfigCache extends DubboConfigCache {
    //......
    
    public ReferenceConfig<GenericService> initRef(final MetaData metaData) {
            try {
                //先尝试从缓存中获取，存在就直接返回
                ReferenceConfig<GenericService> referenceConfig = cache.get(metaData.getPath());
                if (StringUtils.isNoneBlank(referenceConfig.getInterface())) {
                    return referenceConfig;
                }
            } catch (ExecutionException e) {
                LOG.error("init dubbo ref exception", e);
            }
           //不存在，就构建
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
            ReferenceConfig<GenericService> reference = new ReferenceConfig<>(); //新建ReferenceConfig
            reference.setGeneric("true"); //泛化调用
            reference.setAsync(true);//支持异步

            reference.setApplication(applicationConfig);//设置应用配置
            reference.setRegistry(registryConfig);//设置注册中心配置
            reference.setConsumer(consumerConfig);//设置消费者配置
            reference.setInterface(metaData.getServiceName());//设置服务接口
            reference.setProtocol("dubbo");//设置dubbo协议
            reference.setCheck(false); //不检查 service provider
            reference.setLoadbalance("gray");//支持灰度

            Map<String, String> parameters = new HashMap<>(2);
            parameters.put("dispatcher", "direct");
            reference.setParameters(parameters);//自定义参数

            String rpcExt = metaData.getRpcExt();//rpc扩展参数
            DubboParam dubboParam = parserToDubboParam(rpcExt);//反序列化
            if (Objects.nonNull(dubboParam)) {
                if (StringUtils.isNoneBlank(dubboParam.getVersion())) {
                    reference.setVersion(dubboParam.getVersion());//设置版本
                }
                if (StringUtils.isNoneBlank(dubboParam.getGroup())) {
                    reference.setGroup(dubboParam.getGroup());//设置分组
                }
                if (StringUtils.isNoneBlank(dubboParam.getUrl())) {
                    reference.setUrl(dubboParam.getUrl());//设置url
                }
                if (StringUtils.isNoneBlank(dubboParam.getCluster())) {
                    reference.setCluster(dubboParam.getCluster());//设置Cluster type
                }
                Optional.ofNullable(dubboParam.getTimeout()).ifPresent(reference::setTimeout);//timeout
                Optional.ofNullable(dubboParam.getRetries()).ifPresent(reference::setRetries);//retires
                Optional.ofNullable(dubboParam.getSent()).ifPresent(reference::setSent);//Whether to ack async-sent
            }
            try {
                //获取GenericService
                Object obj = reference.get();
                if (Objects.nonNull(obj)) {
                    LOG.info("init apache dubbo reference success there meteData is :{}", metaData);
                    //缓存当前的reference
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



#### 2.6 执行ResponsePlugin

- org.apache.shenyu.plugin.response.ResponsePlugin#execute()

响应结果由`ResponsePlugin`插件处理。

```java
    @Override
    public Mono<Void> execute(final ServerWebExchange exchange, final ShenyuPluginChain chain) {
        ShenyuContext shenyuContext = exchange.getAttribute(Constants.CONTEXT);
        assert shenyuContext != null;
        // 根据rpc类型处理结果
        return writerMap.get(shenyuContext.getRpcType()).writeWith(exchange, chain);
    }
```

处理类型由`MessageWriter`决定，类继承关系如下：

![](/img/activities/code-analysis-dubbo-plugin/MessageWriter.png)

- MessageWriter：接口，定义消息处理方法；
- NettyClientMessageWriter：处理`Netty`调用结果；
- RPCMessageWriter：处理`RPC`调用结果；
- WebClientMessageWriter：处理`WebClient`调用结果；

`Dubbo`服务调用，处理结果当然是`RPCMessageWriter`了。

- org.apache.shenyu.plugin.response.strategy.RPCMessageWriter#writeWith()

在`writeWith()`方法中处理响应结果。

```java

public class RPCMessageWriter implements MessageWriter {

    @Override
    public Mono<Void> writeWith(final ServerWebExchange exchange, final ShenyuPluginChain chain) {
        return chain.execute(exchange).then(Mono.defer(() -> {
            Object result = exchange.getAttribute(Constants.RPC_RESULT); //获取结果
            if (Objects.isNull(result)) { //处理异常
                Object error = ShenyuResultWrap.error(exchange, ShenyuResultEnum.SERVICE_RESULT_ERROR, null);
                return WebFluxResultUtils.result(exchange, error);
            }
            return WebFluxResultUtils.result(exchange, result);//返回结果
        }));
    }
}
```

分析至此，关于`Dubbo`插件的源码分析就完成了，分析流程图如下：

![](/img/activities/code-analysis-dubbo-plugin/dubbo-execute-zh.png)


### 3. 小结

本文源码分析从`Dubbo`服务注册开始，到`Dubbo`插件的服务调用。`Dubbo`插件主要用来处理将`http`请求转成`dubbo`协议,主要逻辑是通过泛化调用实现。
