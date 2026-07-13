---
title: Alarm Notice
keywords: ["alarm"]
description: Alarm message dispatch and notice
---

## Description

* This doc gives a brief description for send alarm notice message using `Apache ShenYu API`.

## Enable Alert in ShenYu Gateway

* Config the gateway `application.yml` 

```yaml
shenyu:
  alert:
    enabled: true
    # the shenyu admin servers, if admin cluster, config like 127.0.0.1:9095,192.3.4.2:9095
    admins: localhost:9095
```

## Send Alarm Message 

* We can send custom alarm message in plugin using `AlarmSender.alarm()`

Refer below:

```java
public class ParamMappingPlugin extends AbstractShenyuPlugin {

    @Override
    public Mono<Void> doExecute(final ServerWebExchange exchange, final ShenyuPluginChain chain, final SelectorData selector, final RuleData rule) {
        ParamMappingRuleHandle paramMappingRuleHandle = ParamMappingPluginDataHandler.CACHED_HANDLE.get().obtainHandle(CacheKeyUtils.INST.getKey(rule));
     
        if(some condition) {
             Map<String, String> labels = new HashMap<>(8);
             labels.put("plugin", "http-redirect");
             labels.put("component", "http");
             AlarmSender.alarmHighEmergency("alarm-title", "alarm-content", labels);
             AlarmSender.alarmMediumCritical("alarm-title", "alarm-content", labels);
             AlarmSender.alarmLowWarning("alarm-title", "alarm-content", labels);
             AlarmSender.alarm((byte) 0, "alarm-title", "alarm-content");
        }
      
        HttpHeaders headers = exchange.getRequest().getHeaders();
        MediaType contentType = headers.getContentType();
        return match(contentType).apply(exchange, chain, paramMappingRuleHandle);
    }
}
```

## Dispatch Alarm Notice

* In the previous step, we send custom alarm message in plugin. 
* Now we configure how these messages are sent to whom(tom,lili...) by which type(email,DingDing...)
* Config this in ShenYu Admin Dashboard.

![alarm-config](/img/shenyu/alert/alarm-config.png)

Have fun!

## Attention

1. If you use the email notice, you should config your email send server in ShenYu Admin `application.yml` 

```yaml
spring:
  mail:
    # Attention: this is mail server address.
    host: smtp.qq.com
    username: shenyu@apache.com
    # Attention: this is not email account password, this requires an email authorization code
    password: your-password
    port: 465
    default-encoding: UTF-8
    properties:
      mail:
        smtp:
          socketFactoryClass: javax.net.ssl.SSLSocketFactory
          ssl:
            enable: true
```
