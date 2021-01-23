---
title: Hmily Transaction Context
keywords: Hmily-Context
description: Hmily Transaction Context
---

### Hmily Transaction Context
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
     * Transaction Participant Role.
     */
    private int role;
    
    /**
     * transType.
     */
    private String transType;
}
```

`HmilyTransactionContext` is the core class used by the Hmily distributed transaction framework to pass the transaction context when making RPC calls.
it was stored in 'ThreadLocal' by default and then do RPC parameter passing. You can also configure it to the scenarios that use thread context switching.
the `contextTransmittalMode = transmittable` should be specified in the configuration at this point, then the Alibaba opensource library will be used.

```xml
   <dependency>
            <groupId>com.alibaba</groupId>
            <artifactId>transmittable-thread-local</artifactId>
            <version>2.11.5</version>
   </dependency>
```

# Passing Transaction Context with Dubbo

The concrete implementation class was in the `org.dromara.hmily.dubbo.filter.DubboHmilyTransactionFilter` class.，
Please do RPC parameter passing through the `RpcContext.getContext().setAttachment(String key, String value)`.

# Passing Transaction Context with Motan

The concrete implementation class was in the `org.dromara.hmily.motan.filter.MotanHmilyTransactionFilter` class.，
Please do RPC parameter passing through the `Request.setAttachment(String key, String value)`.

# Passing Transaction Context with Spring Cloud

The concrete implementation class was in the `org.dromara.hmily.springcloud.feign.HmilyFeignInterceptor` class.，
Please do RPC parameter passing through the `RequestTemplate.header(String name, String... values)`.
