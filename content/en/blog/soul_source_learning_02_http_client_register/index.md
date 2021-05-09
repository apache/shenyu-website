---
title: "ShenYu Gateway Learning (2) HTTP Client Access Source Code Parsing"
author: "fanjinpeng"
description: "ShenYuLearning (2) HTTP Client Access Source Code Parsing"
categories: "Soul"
tags: ["Soul"]
date: 2021-01-18
cover: "/img/architecture/soul-framework.png"
---

# HTTP 用户接入 ShenYu网关注册逻辑分析


## 1. 注册入口

HTTP 用户接入 ShenYu网关时，会调用 soul-admin 一个接口，把需要 ShenYu网关管理的接口注册，今天就具体看看到底干了点儿啥。

先看下调用的接口信息如下：

```java
// SpringMvcClientBeanPostProcessor.java
/**
 * Instantiates a new ShenYuclient bean post processor.
 *
 * @param soulSpringMvcConfig the ShenYu spring mvc config
 */
public SpringMvcClientBeanPostProcessor(final SoulSpringMvcConfig soulSpringMvcConfig) {
    ValidateUtils.validate(soulSpringMvcConfig);
    this.soulSpringMvcConfig = soulSpringMvcConfig;
    url = soulSpringMvcConfig.getAdminUrl() + "/soul-client/springmvc-register";
    executorService = new ThreadPoolExecutor(1, 1, 0L, TimeUnit.MILLISECONDS, new LinkedBlockingQueue<>());
}
```



## 2. springmvc-register 接口逻辑

全局搜索 "springmvc-register"，找到 soul-admin 模块下的 SoulClientController，看到这里，对于经常写 CRUD 的我们是不是很熟悉？哈哈~ 

```java
// SoulClientController.java
/**
 * Register spring mvc string.
 *
 * @param springMvcRegisterDTO the spring mvc register dto
 * @return the string
 */
@PostMapping("/springmvc-register")
public String registerSpringMvc(@RequestBody final SpringMvcRegisterDTO springMvcRegisterDTO) {
    return soulClientRegisterService.registerSpringMvc(springMvcRegisterDTO);
}
```

 Service 层实现类：

```java
// SoulClientRegisterServiceImpl.java
@Override
@Transactional
public String registerSpringMvc(final SpringMvcRegisterDTO dto) {
    if (dto.isRegisterMetaData()) {
        MetaDataDO exist = metaDataMapper.findByPath(dto.getPath());
        if (Objects.isNull(exist)) {
            saveSpringMvcMetaData(dto);
        }
    }
    String selectorId = handlerSpringMvcSelector(dto);
    handlerSpringMvcRule(selectorId, dto);
    return SoulResultMessage.SUCCESS;
}
```

dto.isRegisterMetaData() 这个是否注册元数据信息的判断，不知道什么时候用，存疑 //TODO，先往下走。 



### 2.1 先看看这个方法 handlerSpringMvcSelector，处理 Selector。

```java
// SoulClientRegisterServiceImpl.java
private String handlerSpringMvcSelector(final SpringMvcRegisterDTO dto) {
    String contextPath = dto.getContext();
    // 根据 contextPath 到数据库里查询，是否已经注册过。
    SelectorDO selectorDO = selectorService.findByName(contextPath);
    String selectorId;
    String uri = String.join(":", dto.getHost(), String.valueOf(dto.getPort()));
    if (Objects.isNull(selectorDO)) {
        // 还没有注册过
        selectorId = registerSelector(contextPath, dto.getRpcType(), dto.getAppName(), uri);
    } else {
        // 已经注册过，业务系统重启了会到这里
        selectorId = selectorDO.getId();
        //update upstream
        String handle = selectorDO.getHandle();
        String handleAdd;
        DivideUpstream addDivideUpstream = buildDivideUpstream(uri);
        SelectorData selectorData = selectorService.buildByName(contextPath);
        if (StringUtils.isBlank(handle)) {
            handleAdd = GsonUtils.getInstance().toJson(Collections.singletonList(addDivideUpstream));
        } else {
            List<DivideUpstream> exist = GsonUtils.getInstance().fromList(handle, DivideUpstream.class);
            for (DivideUpstream upstream : exist) {
                if (upstream.getUpstreamUrl().equals(addDivideUpstream.getUpstreamUrl())) {
                    return selectorId;
                }
            }
            exist.add(addDivideUpstream);
            handleAdd = GsonUtils.getInstance().toJson(exist);
        }
        selectorDO.setHandle(handleAdd);
        selectorData.setHandle(handleAdd);
        // update db
        selectorMapper.updateSelective(selectorDO);
        // submit upstreamCheck
        upstreamCheckService.submit(contextPath, addDivideUpstream);
        // publish change event.
        eventPublisher.publishEvent(new DataChangedEvent(ConfigGroupEnum.SELECTOR, DataEventTypeEnum.UPDATE,
                Collections.singletonList(selectorData)));
    }
    return selectorId;
}
```

#### 2.1.1 第一次接入 ShenYu网关

新接入的，到数据库里肯定查不到 selectorDO，进入 registerSelector 方法，仔细看看到底往哪些数据库表中插数据了。 

```java
// SoulClientRegisterServiceImpl.java
private String registerSelector(final String contextPath, final String rpcType, final String appName, final String uri) {
    SelectorDTO selectorDTO = SelectorDTO.builder()
            .name(contextPath)
            .type(SelectorTypeEnum.CUSTOM_FLOW.getCode())
            .matchMode(MatchModeEnum.AND.getCode())
            .enabled(Boolean.TRUE)
            .loged(Boolean.TRUE)
            .continued(Boolean.TRUE)
            .sort(1)
            .build();
    if (RpcTypeEnum.DUBBO.getName().equals(rpcType)) {
        selectorDTO.setPluginId(getPluginId(PluginEnum.DUBBO.getName()));
    } else if (RpcTypeEnum.SPRING_CLOUD.getName().equals(rpcType)) {
        selectorDTO.setPluginId(getPluginId(PluginEnum.SPRING_CLOUD.getName()));
        selectorDTO.setHandle(GsonUtils.getInstance().toJson(buildSpringCloudSelectorHandle(appName)));
    } else if (RpcTypeEnum.SOFA.getName().equals(rpcType)) {
        selectorDTO.setPluginId(getPluginId(PluginEnum.SOFA.getName()));
        selectorDTO.setHandle(appName);
    } else if (RpcTypeEnum.TARS.getName().equals(rpcType)) {
        selectorDTO.setPluginId(getPluginId(PluginEnum.TARS.getName()));
        selectorDTO.setHandle(appName);
    } else {
        //is divide
        DivideUpstream divideUpstream = buildDivideUpstream(uri);
        String handler = GsonUtils.getInstance().toJson(Collections.singletonList(divideUpstream));
        selectorDTO.setHandle(handler);
        selectorDTO.setPluginId(getPluginId(PluginEnum.DIVIDE.getName()));
        upstreamCheckService.submit(selectorDTO.getName(), divideUpstream);
    }
    SelectorConditionDTO selectorConditionDTO = new SelectorConditionDTO();
    selectorConditionDTO.setParamType(ParamTypeEnum.URI.getName());
    selectorConditionDTO.setParamName("/");
    selectorConditionDTO.setOperator(OperatorEnum.MATCH.getAlias());
    selectorConditionDTO.setParamValue(contextPath + "/**");
    selectorDTO.setSelectorConditions(Collections.singletonList(selectorConditionDTO));
    return selectorService.register(selectorDTO);
}
```

看到这么多 if else，是不是很兴奋，小伙伴们可以想想怎么优化掉这么多 if else，PR 搞起来  ^ - ^。

写了这么多，无非是封装 SelectorDTO 对象，最后调用 selectorService.register(selectorDTO) 入库，继续跟进去。

```java
// SelectorServiceImpl.java
@Override
public String register(final SelectorDTO selectorDTO) {
    SelectorDO selectorDO = SelectorDO.buildSelectorDO(selectorDTO);
    List<SelectorConditionDTO> selectorConditionDTOs = selectorDTO.getSelectorConditions();
    if (StringUtils.isEmpty(selectorDTO.getId())) {
        selectorMapper.insertSelective(selectorDO);
        selectorConditionDTOs.forEach(selectorConditionDTO -> {
            selectorConditionDTO.setSelectorId(selectorDO.getId());
            // 这里在 for 循环里调用 dao 层插入数据，是不是可以考虑挪出去一次性批量插入？
            selectorConditionMapper.insertSelective(SelectorConditionDO
                    .buildSelectorConditionDO(selectorConditionDTO));
        });
    }
    publishEvent(selectorDO, selectorConditionDTOs);
    return selectorDO.getId();
}
```

看到这里有2条入库方法，分别向 selector 和 selector_condition 表中插入了数据。这里我们先不具体追究表结构及业务意义，后面补上。

publishEvent 方法，涉及到 ApplicationEventPublisher 接口，是观察者模式的一个实现，发布事件后通过监听器完成后续操作，这里先按下不表，后续单写一篇文章分析。

#### 2.1.2 已经接入 ShenYu网关

就跟盗梦空间似的，我们回退2层梦境，回到插入数据的另一个分支，可以想见，就是，已经接入过 ShenYu网关的系统重启，或新节点启动走的逻辑。

把前面的代码再贴过来：

```java
// SoulClientRegisterServiceImpl.java
private String handlerSpringMvcSelector(final SpringMvcRegisterDTO dto) {
    String contextPath = dto.getContext();
    // 根据 contextPath 到数据库里查询，是否已经注册过。
    SelectorDO selectorDO = selectorService.findByName(contextPath);
    String selectorId;
    String uri = String.join(":", dto.getHost(), String.valueOf(dto.getPort()));
    if (Objects.isNull(selectorDO)) {
        // 还没有注册过
        selectorId = registerSelector(contextPath, dto.getRpcType(), dto.getAppName(), uri);
    } else {
        // 已接入的业务系统重启，或新节点启动，会到这里
        selectorId = selectorDO.getId();
        //update upstream
        // handle 字段存储这个接口真实节点信息，可能存在多台机器需要负载均衡的场景
        String handle = selectorDO.getHandle();
        String handleAdd;
        DivideUpstream addDivideUpstream = buildDivideUpstream(uri);
        SelectorData selectorData = selectorService.buildByName(contextPath);
        if (StringUtils.isBlank(handle)) {
            // 这个接口虽然之前注册过，但第1个服务器节点接入 ShenYu时会进来
            handleAdd = GsonUtils.getInstance().toJson(Collections.singletonList(addDivideUpstream));
        } else {
            // 如果已经至少有1个服务器节点已接入，会进到这里，判断是否是同一个节点（使用 upstreamUrl 区分），如果相同直接返回
            List<DivideUpstream> exist = GsonUtils.getInstance().fromList(handle, DivideUpstream.class);
            for (DivideUpstream upstream : exist) {
                if (upstream.getUpstreamUrl().equals(addDivideUpstream.getUpstreamUrl())) {
                    return selectorId;
                }
            }
            // 如果不是同一个节点，把新节点加入到 handle 字段中
            exist.add(addDivideUpstream);
            handleAdd = GsonUtils.getInstance().toJson(exist);
        }
        selectorDO.setHandle(handleAdd);
        selectorData.setHandle(handleAdd);
        // update db 更新数据库
        selectorMapper.updateSelective(selectorDO);
        // submit upstreamCheck
        upstreamCheckService.submit(contextPath, addDivideUpstream);
        // publish change event.
        eventPublisher.publishEvent(new DataChangedEvent(ConfigGroupEnum.SELECTOR, DataEventTypeEnum.UPDATE,
                Collections.singletonList(selectorData)));
    }
    return selectorId;
}
```

因为还没有研究数据库表结构设计，根据已知部分猜测，1个 selector 对应一个 divide 插件，这个插件以 contextPath 为标识（在这里就是 "/http"），一个 contextPath 可以部署多个服务器节点，这些节点信息已 json 形式保存在 handle 字段中。

```json
// handle/handleAdd 数据格式
[
	{
		"upstreamHost": "localhost",
		"protocol": "http://",
		"upstreamUrl": "10.0.0.12:8188",
		"weight": 50,
		"status": true,
		"timestamp": 0,
		"warmup": 0
	}
]
```

下面紧接着就是更新数据库 updateSelective。

upstreamCheckService.submit(contextPath, addDivideUpstream); 把真实服务器节点信息缓存在一个 Map(UPSTREAM_MAP) 里，有定时任务定期探活，如果发现服务节点宕机了，就把他剔除出去，防止把请求发送到已经宕机的节点上。

然后就是 eventPublisher.publishEvent()，跟前面的 publishEvent 方法一样，发布事件后通过监听器完成后续操作（简单介绍下，这里是通过与 ShenYu网关建立的 websocket 长连接发送数据 SelectorData 修改的消息，ShenYu网关根据消息修改数据，这个具体改的什么数据，怎么修改的，后面分析）。

到这里终于把 handlerSpringMvcSelector 这个方法分析完了。



### 2.2 再来看看这个方法 handlerSpringMvcRule，处理 Rule。

```java
// SoulClientRegisterServiceImpl.java
private void handlerSpringMvcRule(final String selectorId, final SpringMvcRegisterDTO dto) {
    RuleDO ruleDO = ruleMapper.findByName(dto.getRuleName());
    if (Objects.isNull(ruleDO)) {
        registerRule(selectorId, dto.getPath(), dto.getRpcType(), dto.getRuleName());
    }
}
```

首先拿着规则名字，到 rule 表里捞数据，如果捞到了表名已经注册过了，无操作。

看下数据库数据，就是业务系统下的接口地址。

```bash
mysql> use soul;
Database changed

mysql> select * from rule where name = '/http/order/findById' \G
*************************** 1. row ***************************
          id: 1349650371868782592
 selector_id: 1349650371302551552
  match_mode: 0
        name: /http/order/findById
     enabled: 1
       loged: 1
        sort: 1
      handle: {"loadBalance":"random","retry":0,"timeout":3000}
date_created: 2021-01-14 17:31:39
date_updated: 2021-01-14 17:31:39
1 row in set (0.00 sec)
```

如果没捞到数据，注册这个规则。 

```java
// SoulClientRegisterServiceImpl.java
private void registerRule(final String selectorId, final String path, final String rpcType, final String ruleName) {
    RuleHandle ruleHandle = RuleHandleFactory.ruleHandle(RpcTypeEnum.acquireByName(rpcType), path);
    RuleDTO ruleDTO = RuleDTO.builder()
            .selectorId(selectorId)
            .name(ruleName)
            .matchMode(MatchModeEnum.AND.getCode())
            .enabled(Boolean.TRUE)
            .loged(Boolean.TRUE)
            .sort(1)
            .handle(ruleHandle.toJson())
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
    ruleService.register(ruleDTO);
}
```

 第1行，根据 rpcType("http") 获取其对应的 RuleHandle，这里，默认内置3种类型，我们这里的是 HTTP，对应 DivideRuleHandle。 

```java
// RuleHandleFactory.java
public final class RuleHandleFactory {

    /**
     * The RpcType to RuleHandle class map.
     */
    private static final Map<RpcTypeEnum, Class<? extends RuleHandle>> RPC_TYPE_TO_RULE_HANDLE_CLASS = new ConcurrentHashMap<>();

    /**
     * The default RuleHandle.
     */
    private static final Class<? extends RuleHandle> DEFAULT_RULE_HANDLE = SpringCloudRuleHandle.class;

    static {
        RPC_TYPE_TO_RULE_HANDLE_CLASS.put(RpcTypeEnum.HTTP, DivideRuleHandle.class);
        RPC_TYPE_TO_RULE_HANDLE_CLASS.put(RpcTypeEnum.DUBBO, DubboRuleHandle.class);
        RPC_TYPE_TO_RULE_HANDLE_CLASS.put(RpcTypeEnum.SOFA, SofaRuleHandle.class);
    }

    /**
     * Get a RuleHandle object with given rpc type and path.
     * @param rpcType   rpc type.
     * @param path      path.
     * @return          RuleHandle object.
     */
    public static RuleHandle ruleHandle(final RpcTypeEnum rpcType, final String path) {
        if (Objects.isNull(rpcType)) {
            return null;
        }
        Class<? extends RuleHandle> clazz = RPC_TYPE_TO_RULE_HANDLE_CLASS.getOrDefault(rpcType, DEFAULT_RULE_HANDLE);
        try {
            return clazz.newInstance().createDefault(path);
        } catch (InstantiationException | IllegalAccessException e) {
            throw new SoulException(
                    String.format("Init RuleHandle failed with rpc type: %s, rule class: %s, exception: %s",
                            rpcType,
                            clazz.getSimpleName(),
                            e.getMessage()));
        }
    }
}
```

 下面构造 RuleDTO 对象，注册规则。 

```java
// RuleServiceImpl.java
@Override
public String register(final RuleDTO ruleDTO) {
    RuleDO ruleDO = RuleDO.buildRuleDO(ruleDTO);
    List<RuleConditionDTO> ruleConditions = ruleDTO.getRuleConditions();
    if (StringUtils.isEmpty(ruleDTO.getId())) {
        ruleMapper.insertSelective(ruleDO);
        ruleConditions.forEach(ruleConditionDTO -> {
            ruleConditionDTO.setRuleId(ruleDO.getId());
            // 这里在 for 循环里调用 dao 层插入数据，是不是可以考虑挪出去一次性批量插入？
            ruleConditionMapper.insertSelective(RuleConditionDO
                    .buildRuleConditionDO(ruleConditionDTO));
        });
    }
    publishEvent(ruleDO, ruleConditions);
    return ruleDO.getId();
}
```

分别向 rule 和 rule_condition 表中插入数据。

publishEvent() 方法，通过 websocket 长连接，向 ShenYu网关发送 RuleData 数据。



## 3.总结

到这里，调用 "/soul-client/springmvc-register" 接口逻辑分析完了，我们总结下：

- 处理 selector
  - 新增或修改 selector、selector_condition 表数据，持久化到 MySQL。
  - 通过 websocket 向 ShenYu网关发送数据改动信息。
- 处理 rule
  - 新增或修改 rule、rule_condition 表数据，持久化到 MySQL。
  - 通过 websocket 向 ShenYu网关发送数据改动信息。

其中表结构及字段含义还需进一步学习和研究，websocket 发送给 ShenYu网关后，网关做了什么处理也需要后续分析。

到这里，HTTP 用户接入 ShenYu网关注册逻辑就分析完了。

如果在工作中你有使用网关的需求，或是个人有学习网关的追求，欢迎来跟我一起分析和学习，ShenYu网关，你值得拥有。


