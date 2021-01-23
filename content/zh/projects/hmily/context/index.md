---
title: Hmily-Context
keywords: Hmily-Context
description: Hmily-Context事务上下文
---

### HmilyTransactionContext事务上下文
```java
@Data
public class HmilyTransactionContext {
    
    /**
     * transId.
     */
    private Long transId;
    
    /**
     * participant id.
     */
    private Long participantId;
    
    /**
     * participant ref id.
     */
    private Long participantRefId;
    
    /**
     * this hmily action.
     */
    private int action;
    
    /**
     * 事务参与的角色.
     */
    private int role;
    
    /**
     * transType.
     */
    private String transType;
}
```

`HmilyTransactionContext` 是Hmily分布式事务框架进行RPC调用时用于传递事务上下文的核心类,
默认会将其存储在`ThreadLocal`中，然后进行RPC的参数传递，也可以配置使用线程上下文切换的的场景，
这个时候需要在配置中指定 `contextTransmittalMode = transmittable`,将会使用alibaba开源类库。

```xml
   <dependency>
            <groupId>com.alibaba</groupId>
            <artifactId>transmittable-thread-local</artifactId>
            <version>2.11.5</version>
   </dependency>
```

# Dubbo框架传递事务上下文

具体实现类在`org.dromara.hmily.dubbo.filter.DubboHmilyTransactionFilter`中，
通过 `RpcContext.getContext().setAttachment(String key, String value)` 进行RPC传参数。


# Motan框架传递事务上下文

具体实现类在`org.dromara.hmily.motan.filter.MotanHmilyTransactionFilter`中，
通过 `Request.setAttachment(String key, String value)` 进行RPC传参数。

# SpringCloud框架传递事务上下文

具体实现类在`org.dromara.hmily.springcloud.feign.HmilyFeignInterceptor`中，
通过 `RequestTemplate.header(String name, String... values)` 进行RPC传参数。
