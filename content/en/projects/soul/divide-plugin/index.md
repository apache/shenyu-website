---
title: plugin-divide
keywords: divide
description: divide plugin
---

## Explanation

* Divdid is the core processing plugin for gateway to process `http` requests.

## Plugin Setting

* Enable plugin, `soul-admin` --> plugin management--> `divide` set to enable.

* Divide plugin，cooperate with `starter` to take effect，please refer to：[user-http](docs/en-us/soul/user-http.md)。

```xml
  <!--if you use http proxy start this-->
   <dependency>
       <groupId>org.dromara</groupId>
       <artifactId>soul-spring-boot-starter-plugin-divide</artifactId>
       <version>${last.version}</version>
   </dependency>

   <dependency>
       <groupId>org.dromara</groupId>
       <artifactId>soul-spring-boot-starter-plugin-httpclient</artifactId>
       <version>${last.version}</version>
   </dependency>

```

## Plugin Detail

* Divide is a plugin for http forward proxy, and all http requests are called by this plugin in load balancing.

* Selectors and rules, please refer to: [selector](docs/en-us/soul/selector.md).

* Http configuration is the real invoked configuration after the gateway matches the traffic; You can set multiple configurations and concrete load balancing weights in the rules.
  * Configuration Detail ：
     
     * The first box: hostName, generally fill in `localhost`, which is temporarily unused.
       
     * The second box: http protocol, usually fill in ` http:// ` or ` https:// `, if not, the default is: ` http:// `.
       
     * The third box: ip and port, where you fill in the ip+port of your real service.
       
     * The fourth box: load balancing weight.
     
     
  * Ip + Port Detection
      
     * In soul-admin, there is a scheduled task to scan the configured ip and port. If it is found that the ip and port is offline, it will be removed.  
          
     * It can be configured as follows:
     
```yaml
      soul.upstream.check:true  Default is ture，if setting false，program will not detect
      soul.upstream.scheduledTime:10  Timing detection interval, default 10 seconds
 ```  
  
 
