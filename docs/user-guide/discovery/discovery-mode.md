---
title: Discovery
keywords: [ "Discovery" ]
description: Discovery
---

# Discovery

## 1. Overview

### 1.1 Module Name

Discovery

### 1.2 Design

- Module Design Diagram

![discovery-design.png](/img/shenyu/plugin/discovery/discovery-design.png)



- Database Design

![db-design.png](/img/shenyu/plugin/discovery/db-design.png)


### 1.3 Module Functionality

The Discovery module endows the ShenYu Gateway with the ability to actively perceive and respond to changes in the list of services being proxied. 
By actively listening to the admin service of the Discovery Gateway, the ShenYu Gateway can promptly track changes in the services being proxied. 
This functionality is designed to be flexible and can be configured at either **the selector level or the plugin level**, as needed. 
Currently, plugins that have incorporated the Discovery feature include TCP, Divide, Websocket and gRPC plugins.


### 1.4 Listening Mode

LOCAL, ZOOKEEPER, NACOS, EUREKA, ETCD

- LOCAL Mode: Primarily relies on manual maintenance of the upstream list and pushing it to the gateway.
- ZOOKEEPER Mode: Monitors changes in ephemeral nodes under a specified node in ZooKeeper to obtain data.
- NACOS Mode: Listens for changes in instances under a specified service name in Nacos to obtain data.
- EUREKA Mode: Listens for changes in instances under a specified service name in Eureka to obtain data.
- ETCD Mode: Obtains data by monitoring changes in key-value pairs under specified nodes in etcd.

### 1.5 Scope of Effect

- Plugin Level: Impacts the entire plugin, 
and all selectors under that plugin will default to the current listening mode.
- Selector Level: Applies to the current selector, 
allowing different selectors under the same plugin to use different listening modes.

## 2. Usage

### 2.1 Plugin-Level Configuration

#### 2.1.1 Service Discovery Configuration

- In plugins that support the Discovery module (currently, only the TCP plugin supports plugin-level discovery 
configuration on the admin console page; other plugins can configure plugin-level discovery through shenyu-client, 
as described in the "Using Shenyu-client" section below), click on `Discovery Configuration`. In the popup form, 
select the desired listening mode and fill in the service discovery name, registration server URL, registry configuration parameters, etc.:


![config-discovery-plugin-en.png](/img/shenyu/plugin/discovery/config-discovery-plugin-en.png)

![config-discovery-plugin-modal-en.png](/img/shenyu/plugin/discovery/config-discovery-plugin-modal-en.png)

#### 2.1.2 Usage within Selectors
- To add a new selector, click on `Add Selector`. In the new selector page, you will notice that the `Type` field enforces the previously configured plugin-level listening mode,
indicating that the added selector will also adopt the same configuration. 
At this point, simply input the desired `ListeningNode`:

  ![add-selector-under-plugin-discovery-en.png](/img/shenyu/plugin/discovery/add-selector-under-plugin-discovery-en.png)

- The `Handler` here refers to ShenYu's specified JSON format for transmitting upstream registration data, 
as shown below:

    ```json
    {
        "url": "127.0.0.1::6379",  // URL of the upstream
        "protocol": "tcp",  // Communication protocol of the upstream
        "status": 0,  // Status of the upstream node (0 for healthy, 1 for unhealthy)
        "weight": 10  // Used for load balancing calculations
    }
    ```

- If your service alias does not match ShenYu's defined JSON format, 
you can perform alias mapping in `Handler`.
For example, as shown in the above image, 
if you need to change `status` to "healthy" while keeping other keys unchanged, 
follow these steps: create a new alias, map `status` to `healthy`, 
and retain the original JSON keys' format.
- Configure the remaining properties for the selector according to the specific plugin's documentation.

### 2.2 Selector-Level Configuration

- In plugins that support the Discovery module, click on `Add Selector`. 
In the `Discovery Config` tab, configure the fields such as type, 
listening node, server URL list, and registry properties. 
This configuration only applies to the current selector and must be reconfigured each time a new selector is added.

![add-selector-en.png](/img/shenyu/plugin/discovery/add-selector-en.png)

- For the Divide, gRPC, and Websocket plugins, 
the `Import Background Discovery Config` function on the selector creation page 
allows you to import and use the backend configuration if the service connecting to the ShenYu Gateway 
was configured with shenyu-discovery-related properties (see usage with shenyu-client). 
As shown in the following image, click `Import Background Discovery Config` to view the backend configuration:

![config-import-en.png](/img/shenyu/plugin/discovery/config-import-en.png)

- If you confirm the import, clicking the `Import` button in the backend configuration popup will automatically populate the form with the backend service discovery properties. 
At this point, you only need to configure the listening node:

![after-import-en.png](/img/shenyu/plugin/discovery/after-import-en.png)

> __Note__: If you confirm importing the backend configuration, 
the backend service discovery properties will be automatically filled in the form and will continue to use the previous discovery object. 
In this case, modifying service discovery properties in the form will be ineffective, and the backend configuration will be retained.

- If you choose the LOCAL mode, there is no need to connect to a registry, and users must manually maintain the upstream list.


## 3. Configuration in Different Modes

### 3.1 Local Mode

- Local mode only supports configuration at the **selector level**. 
There is no need to connect to a registry, and users must manually maintain the upstream list. 
This list is an editable table. Click the `Edit` button for each row in the table to modify each parameter of the upstream:

![local-selector-en.png](/img/shenyu/plugin/discovery/local-selector-en.png)

### 3.2 ZooKeeper/Nacos/Eureka/Etcd Modes

- In the ZooKeeper/Nacos/Eureka/Etcd modes, service discovery configuration is supported at both the plugin level and the selector level.
- For each registry property under these modes, taking ZooKeeper as an example, users can go to `shenyu-admin` --> `BasicConfig` --> `Dictionary`, 
search for the dictionary name "zookeeper", and edit the dictionary values corresponding to the default properties
(**Note**: You cannot modify the dictionary type and dictionary name).
- In these modes, the gateway dynamically retrieves service instance information from the registry. Additions, removals, modifications, 
and other changes to service instances will be displayed in real-time in the upstream list.

![zk_dict_en.png](/img/shenyu/plugin/tcp/zk_dict_en.png)

## 4. Using Shenyu-client

### 4.1 Introduction

- To use Shenyu-client, you need to depend on the corresponding mode's registry middleware: ZooKeeper, Nacos, Etcd, Eureka. 
These modes can automatically detect service up and down events through ShenYu Admin.
- Additionally, if you are using the local mode, you will need to manually maintain the upstream list.
- For detailed instructions on using Shenyu-client, refer to the Shenyu-client module documentation.

### 4.2 Local Mode Example

#### 4.2.1 Using Shenyu-client

- Shenyu-client defaults to the Local mode, so there is no need for any special discovery configuration. 
It will automatically register the current service.
- For services that are automatically registered, you can manually add, modify, 
or delete them in the upstream list on the page:

![local-selector-en.png](/img/shenyu/plugin/discovery/local-selector-en.png)

#### 4.2.2 Without Using Shenyu-client


- If you are not using Shenyu-client, you can manually add, modify, 
or delete service information on the `Discovery Config` tab under `Add Selector`:

![add-selector-local-en.png](/img/shenyu/plugin/discovery/add-selector-local-en.png)

- Configure other selector information:

![add-selector-basic-en.png](/img/shenyu/plugin/discovery/add-selector-basic-en.png)

- Configure rules:

![rule-en.png](/img/shenyu/plugin/discovery/rule-en.png)

- Test Connection

```text
curl http://localhost:9195/http/hello

hello! I'm Shenyu-Gateway System. Welcome!% 
```

### 4.2 Zookeeper Mode Example

(Taking the Divide plugin as an example)

- Add Dependencies

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

- Add the Following Configuration in application.yml

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
- Start the shenyu-examples-http service.
- Once the service registration is successful, 
you can view the list of automatically registered service instances on the selector page:

![zk-selector-en.png](/img/shenyu/plugin/discovery/zk-selector-en.png)

- Users can click on `Edit` in the service instance list to edit the service instance information 
(Note that in non-Local mode, the URL is maintained by the registry and cannot be manually edited):


![edit-zk-upstream-en.png](/img/shenyu/plugin/discovery/edit-zk-upstream-en.png)

- Test Connection

```text
curl http://localhost:9195/http/hello

hello! I'm Shenyu-Gateway System. Welcome!% 
```

### 4.3 Etcd Mode Example

- Add Dependencies

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

- Add the Following Configuration in application.yml

```yaml
shenyu:
   discovery:
      enable: true
      protocol: http://
      type: etcd
      serverList: http://${your.etcd.host}:${your.etcd.port}
      registerPath: /shenyu/test/http_common
      props:
         etcdTimeout: 3000
         etcdTTL: 5
```

- Start the shenyu-examples-http service. Similarly, on the selector page, 
you can see the list of automatically registered service instances and edit them as needed:
![etcd-selector-en.png](/img/shenyu/plugin/discovery/etcd-selector-en.png)

- Test Connection

```text
curl http://localhost:9195/http/hello

hello! I'm Shenyu-Gateway System. Welcome!% 
```

### 4.4 Eureka Mode Example

- Add Dependencies

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
- Add the Following Configuration in application.yml
  (in this context, `registerPath` can be understood as the name of the service to be monitored):

```yaml
shenyu:
   discovery:
      enable: true
      protocol: http://
      type: eureka
      serverList: http://${your.eureka.host}:${your.eureka.port}/eureka
      registerPath: shenyu_discovery_demo_http_common
      props:
         eurekaClientRefreshInterval: 10
         eurekaClientRegistryFetchIntervalSeconds: 10
```

- Start the shenyu-examples-http service. Similarly, on the selector page, 
you can see the list of automatically registered service instances and edit them as needed:

![eureka-selector-en.png](/img/shenyu/plugin/discovery/eureka-selector-en.png)

- Test Connection

```text
curl http://localhost:9195/http/hello

hello! I'm Shenyu-Gateway System. Welcome!% 
```

### 4.5 Nacos Mode Example

- Add Dependencies

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
- Add the Following Configuration in application.yml 
(Here, `registerPath` can also be understood as the name of the service to be monitored.)

```yaml
shenyu:
   discovery:
      enable: true
      protocol: http://
      type: nacos
      serverList: ${your.nacos.host}:${your.nacos.port}
      registerPath: shenyu_discovery_demo_http_common
      props:
         groupName: SHENYU_GROUP
```

- Start the shenyu-examples-http service. Similarly, on the selector page, 
you can view the list of automatically registered service instances and edit them as needed.

![nacos-selector-en.png](/img/shenyu/plugin/discovery/nacos-selector-en.png)

- Test Connection

```text
curl http://localhost:9195/http/hello

hello! I'm Shenyu-Gateway System. Welcome!% 
```

> __Note__：Configuring service discovery using Shenyu-client essentially configures service discovery at the plugin level. 
Under the same service discovery mode, there is, in fact, only one discovery object 
(meaning you can only configure the same set of type, server URL, and service discovery parameters), while multiple listening nodes can be configured.

> __Note__：In the Divide and gRPC plugins, you can modify the protocol by configuring the protocol in the application.yml file. 
The default protocol for the Websocket plugin is 'ws'.

![ws-selector-en.png](/img/shenyu/plugin/discovery/ws-selector-en.png)



## 5. Considerations

- In local mode, you can manually modify all parameters of the upstream on the service list page.
- In non-local modes, you can manually modify parameters other than URL and start time.
- Manually changing the status (open/close) and weight of service instances only affects the current plugin.
- For the same plugin, when configuring discovery-related parameters through Shenyu-client in the backend, it essentially configures service discovery at the plugin level. Although you can manually add selectors on the console page to configure selector-level service discovery, in reality, there is only one discovery object (meaning you can only configure the same set of type, server URL, and service discovery parameters), while multiple listening nodes can be configured.



## 6. Test Report

[Test Report](https://www.yuque.com/eureca/pgotw1/hkqkk5laubspgwl3#UojLR)




