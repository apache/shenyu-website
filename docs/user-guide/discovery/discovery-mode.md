---
title: Discovery
keywords: [ "Discovery" ]
description: Discovery Modules
---

# 1. Overview

## 1.1 Module Name

Discovery

## 1.2 Design

Design drawing
![discovery-design.png](/img/shenyu/plugin/discovery/discovery-design.png)

DataBase Design
![db-design.png](/img/shenyu/plugin/discovery/db-design.png)

## 1.3 Notes


The 'Discovery' gateway admin service actively listens to register to the gateway service. The shenyu gateway has the ability to actively discover the changes of the proxy service list
'Discovery' can be at the selector level or the plugin level.
The 'Discovery' plugin is currently introduced as a TCP ,Divide,Websocket,Grpc Plugin.

### 1.3.1 Listener mode

LOCAL , ZOOKEEPER , NACOS(To be supported) , ERURKA(To be supported) ....

LOCAL mode: relies heavily on manually maintaining the upstream list to push to the gateway

ZOOKEEPER mode: Listen for temporary node changes in the specified node in zk for data

### 1.3.2 Scope of action

Plugin-level: THIS APPLIES TO THE entire PLUGIN. All CHOICES MADE BY the PLUGIN will default to the current listening mode
Selector level: This applies to the current selector. There are different selectors that use different listening modes under the current plugin

# 2. How to use

## 2.1 Plug-in level Configuration

1. In the plugin that supports the Discovery module click 'Discovery configuration' to select the listening mode for the response
   Take Zookeeper as an example

   ![config_zk_plugin.png](/img/shenyu/plugin/discovery/config_zk_plugin.png)

2. In the selector, click 'Add' on the new selector page and click 'DiscoveryConfig' to find the Type type to force the plugin-level listener that you just configured
   In this case, we need to listen to the 'ListenerNode' : /shenyu/discovery as an example

   ![add_listener_node.png](/img/shenyu/plugin/discovery/add_listener_node.png)

   Note: In this Handler configuration, shenyu specifies that the upstream registration data is sent in the following json form

   ```json
    {
        "url": "127.0.0.1::6379",  // upstream's url
        "protocol": "tcp", // upstream's protocol
        "status": 0, // upstream's (0, healthy, 1 unhealthy)
        "weight": 10 // Used when calculating load balancing
    }
    ```

   You can alias the handler if your service alias is different from the json format defined by shenyu
   In the above image, I need to change the status to healthy. The other is to save the original json-key form

3. See plugin for details on how to configure selector properties

## 2.2 Selector level configuration

Similar to plug-in level configuration. Combine the '1', '2' steps above
![discovery-seletor-config.png](/img/shenyu/plugin/discovery/discovery-seletor-config.png)

Note: When using selector levels. It has to be reconfigured each time

If you choose the LOCAL mode, you don't need to log into a registry and manually maintain the upstream list

![discovery-local-mode.png](/img/shenyu/plugin/discovery/discovery-local-mode.png)

# 3. Configuration

## 3.1 Registration Information Configuration

### 3.1.1 Basic Configuration

![common-config.png](/img/shenyu/plugin/discovery/common-config.png)

- Type registered Type [LOCAL | ZOOKEEPER]
- ListenerNode registers listeners like '/shenyu/discovery'
- Handler handles aliasing of upstream registration information
- ServerList registry link url


### 3.1.2 Detailed explanation of data

- The `upstream` registration data is :

```json
{
  "protocol": "tcp",
  "url": "127.0.0.1:6379",
  "status": 0,
  "weight": 1,
  "props": "{}"
}
```

- If the registered data format is different from the default json format, you can set an alias in the "Conversion process"：

```json
{
  "${yourProtocol}": "tcp",
  "${yourUrl}": "127.0.0.1:6379",
  "${yourStatus}": 1,
  "${yourWeight}": 1,
  "${yourProps}": "{}"
}
```

## 3.2 Configuration in different modes

### 3.1 LOCAL

Only the selector level is supported in LOCAL mode
No need to specify a link registry configuration just manually maintain the upstream list

![discovery-local-mode.png](/img/shenyu/plugin/discovery/discovery-local-mode.png)

### 3.2 ZOOKEEPER

ZOOKEEPER mode supports both the plugin level and the selector level


SEE `shenyu-discovery-zookeeper#ZookeeperDiscoveryService#init`

```json
{
  "baseSleepTimeMilliseconds": "1000",
  "maxRetries": "3",
  "maxSleepTimeMilliseconds": "1000",
  "connectionTimeoutMilliseconds": "1000",
  "sessionTimeoutMilliseconds": "1000",
  "namespace": "",
  "digest": null
}
```

- You can search for the dictionary name as "zookeeper" in `shenyu-admin` --> BasicConfig --> Dictionary,
  and modify the dictionary value corresponding to the default properties
  ( __Note__: The dictionary type and dictionary name cannot be modified)：


![zk_dict.png](/img/shenyu/plugin/tcp/zk_dict_zh.png)

# 4.Using with Shenyu-client


## 4.1 Overview
To use with shenyu-client, you need to depend on middleware such as zookeeper, nacos, etcd, eureka for automatic sensing of online and offline status. For local mode, you need to manually maintain the upstream list.

## 4.2 Examples

For details on using shenyu-client, see the shenyu-client module.


### 4.2.1 Local Example

Local mode does not require configuration of the registry.

1.If you choose to use shenyu-client to automatically register in Local mode and register the current list:

![divide-local-discovery-success.png.png](/img/shenyu/plugin/discovery/divide-local-discovery-success.png)

2. If you do not use shenyu-client, you can configure it manually:

![config_local_selector.png](/img/shenyu/plugin/discovery/config_local_selector.png)

Manually configure Selector
![config_local_selector_2.png](/img/shenyu/plugin/discovery/config_local_selector_2.png)
Manually configure Rule
![config_local_selector_3.png](/img/shenyu/plugin/discovery/config_local_selector_3.png)

Test connection:

```text
curl http://localhost:9195/http/hello

hello! I'm Shenyu-Gateway System. Welcome!% 
```


### 4.2.2 Zookeeper Example

Take Divide as an example.

Add dependencies:
```xml
<dependency>
   <groupId>org.apache.shenyu</groupId>
   <artifactId>shenyu-discovery-zookeeper</artifactId>
   <version>${project.version}</version>
</dependency>

<dependency>
   <groupId>org.apache.shenyu</groupId>
   <artifactId>shenyu-spring-boot-starter-client-http</artifactId>
</dependency>
```

```yaml
shenyu:
  discovery:
    enable: true
    type: zookeeper
    serverList: ${your.zookeeper.ip}:{your.zookeeper.port}
    registerPath: /shenyu/discovery/demo_http_common
    props:
      baseSleepTimeMilliseconds: 1000
      maxRetries: 4
      maxSleepTimeMilliseconds: 5000
      connectionTimeoutMilliseconds: 60000
      sessionTimeoutMilliseconds: 8
```
Start the shenyu-examples-http project.

The above indicates successful registration.
![divide-zookeeper-discovery-success.png](/img/shenyu/plugin/discovery/divide-zookeeper-discovery-success.png)

![divide-zookeeper-discovery-success_2.png](/img/shenyu/plugin/discovery/divide-zookeeper-discovery-success_2.png)

Test connection:
```text
curl http://localhost:9195/http/hello

hello! I'm Shenyu-Gateway System. Welcome!% 
```

### 4.2.3 Etcd Example

Add dependencies:
```xml
<dependency>
   <groupId>org.apache.shenyu</groupId>
   <artifactId>shenyu-discovery-etcd</artifactId>
   <version>${project.version}</version>
</dependency>

<dependency>
   <groupId>org.apache.shenyu</groupId>
   <artifactId>shenyu-spring-boot-starter-client-http</artifactId>
</dependency>
```

```yaml
shenyu:
   discovery:
      enable: true
      type: etcd
      serverList: http://${your.etcd.host}:${your.etcd.port}
      registerPath: shenyu_discovery_demo_http_common
      props:
         etcdTimeout: 3000
         etcdTTL: 5
```
Start shenyu-examples-http.

The above indicates successful registration.
![divide-etcd-discovery-success.png](/img/shenyu/plugin/discovery/divide-etcd-discovery-success.png)

Test connection:
```text
curl http://localhost:9195/http/hello

hello! I'm Shenyu-Gateway System. Welcome!% 
```

### 4.2.4 Eureka Example

Add dependencies:
```xml
<dependency>
   <groupId>org.apache.shenyu</groupId>
   <artifactId>shenyu-discovery-eureka</artifactId>
   <version>${project.version}</version>
</dependency>

<dependency>
   <groupId>org.apache.shenyu</groupId>
   <artifactId>shenyu-spring-boot-starter-client-http</artifactId>
</dependency>
```
```yaml
shenyu:
   discovery:
      enable: true
      type: eureka
      serverList: http://${your.eureka.host}:${your.eureka.port}/eureka
      registerPath: shenyu_discovery_demo_http_common
      props:
         eurekaClientRefreshInterval: 10
         eurekaClientRegistryFetchIntervalSeconds: 10
```

The above indicates successful registration.
![divide-eureka-discovery-success.png](/img/shenyu/plugin/discovery/divide-eureka-discovery-success.png)

The above indicates successful registration.
```text
curl http://localhost:9195/http/hello

hello! I'm Shenyu-Gateway System. Welcome!% 
```

### 4.2.4 Nacos Example

```xml
<dependency>
   <groupId>org.apache.shenyu</groupId>
   <artifactId>shenyu-discovery-nacos</artifactId>
   <version>${project.version}</version>
</dependency>

<dependency>
   <groupId>org.apache.shenyu</groupId>
   <artifactId>shenyu-spring-boot-starter-client-http</artifactId>
</dependency>
```

The above indicates successful registration.
![divide-nacos-discovery-success.png](/img/shenyu/plugin/discovery/divide-nacos-discovery-success.png)

The above indicates successful registration.
```text
curl http://localhost:9195/http/hello

hello! I'm Shenyu-Gateway System. Welcome!% 
```


## 4.3 Changing Weight and Status
status : 0 Healthy , 1 Unhealthy

weight : Weight. For details, see the weight algorithm in the shenyu-loadbalancer module.

![change-weight-status.png](/img/shenyu/plugin/discovery/change-weight-status.png)

## 4.4 Test report


[Test Report](https://www.yuque.com/eureca/pgotw1/hkqkk5laubspgwl3#UojLR)

