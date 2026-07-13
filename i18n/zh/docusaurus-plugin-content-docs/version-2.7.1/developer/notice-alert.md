---
title: 告警通知
keywords: ["alarm"]
description: Alarm message dispatch and notice
---

## 说明

* 本文主要介绍 Apache ShenYu 的网关插件发送告警通知消息的支持。

## ShenYu网关开启告警通知  

* 配置 ShenYu网关的配置文件 `application.yml`，开启告警，配置 ShenYu Admin服务地址。 

```yaml
shenyu:
  alert:
    enabled: true
    # the shenyu admin servers, if admin cluster, config like 127.0.0.1:9095,192.3.4.2:9095
    admins: localhost:9095
```

## 发送告警消息

* 在网关插件中使用 `AlarmSender.alarm()` 发送自定义告警消息。

参考如下:

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

## 告警消息转发

* 在上一步中，我们在插件中发送的告警消息。 
* 现在我们需要配置这些消息发给谁，通过什么渠道发(邮件，钉钉。。。)
* 在 ShenYu Admin 页面操作配置。

![alarm-config](/img/shenyu/alert/alarm-config.png)

Have fun!

## 注意

1. 若您使用了邮件通知渠道，您需要提前在 ShenYu Admin 的配置文件配置自己的邮件服务器参数 `application.yml` 

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
