---
title: Client Registry Design
keywords: ["Client Access"]
description: Application Client Access
---

Application client access means to access your microservice to ShenYu gateway, currently supports HTTP, Dubbo, Spring Cloud, gRPC, Motan, Sofa, Tars and other protocols access.

Connecting the application client to ShenYu gateway is realized through the registration center, which involves the registration of the client and the synchronization of the server data. The registry supports HTTP, ZooKeeper, Etcd, Consul, and Nacos.

Refer to the client access configuration in the user documentation for [Application Client Access Config](../user-guide/property-config/register-center-access.md) .

<img src="/img/shenyu/register/application-client-access-en.png" width="70%" height="60%" />


## Design principle

#### Client

![](/img/shenyu/register/client.png)

Declare the registry client type, such as HTTP or ZooKeeper, in your microservice configuration. Use SPI to load and initialize the corresponding registry client when the application starts, implement the post-processor interface associated with the Spring Bean, get the service interface information to register in it, and place the obtained information into Disruptor.

The Registry client reads data from the Disruptor and registers the interface information with shenyu-admin, where the Disruptor decouples data from operations for scaling.

#### Server

![](/img/shenyu/register/server.png)

Declare the registry server type, such as HTTP or ZooKeeper, in the Shenyu-Admin configuration. When shenyu-admin is started, it will read the configuration type, load and initialize the corresponding registry server, and when the registry server receives the interface information registered by shenyu-client, it will put it into Disruptor, which will trigger the registration processing logic to update the interface information and publish a synchronous event.

Disruptor provides data and operations decoupling for expansion. If there are too many registration requests, resulting in abnormal registration, there is also a data buffer role.

## Http Registry

The principle of HTTP service registration is relatively simple. After Shenyu-Client is started, the relevant service registration interface of Shenyu-Admin will be called to upload data for registration.

After receiving the request, shenyu-admin will update the data and publish the data synchronization event to synchronize the interface information to ShenYu Gateway.

## Zookeeper Registry

Zookeeper storage struct is:

```
shenyu
   ├──regsiter
   ├    ├──metadata
   ├    ├     ├──${rpcType}
   ├    ├     ├      ├────${contextPath}
   ├    ├     ├               ├──${ruleName} : save metadata data of MetaDataRegisterDTO
   ├    ├──uri
   ├    ├     ├──${rpcType}
   ├    ├     ├      ├────${contextPath}
   ├    ├     ├               ├──${ip:port} : save uri data of URIRegisterDTO
   ├    ├     ├               ├──${ip:port}
```

shenyu-client starts up, the service interface information (MetaDataRegisterDTO/URIRegisterDTO) wrote above the Zookeeper nodes.

shenyu-admin uses the Watch mechanism of Zookeeper to monitor events such as data update and deletion, and triggers the corresponding registration processing logic after data changes. Upon receipt of a change to the MetadataregisterDTO node, the data change and data synchronization event publication of the selector and rule is triggered. Upon receipt of a UriRegisterDTO node change, the upstream of the selector is triggered to publish an update and data synchronization event.

## Etcd Registry

Etcd storage struct is:

```
shenyu
   ├──regsiter
   ├    ├──metadata
   ├    ├     ├──${rpcType}
   ├    ├     ├      ├────${contextPath}
   ├    ├     ├               ├──${ruleName} : save metadata data of MetaDataRegisterDTO
   ├    ├──uri
   ├    ├     ├──${rpcType}
   ├    ├     ├      ├────${contextPath}
   ├    ├     ├               ├──${ip:port} : save uri data of URIRegisterDTO
   ├    ├     ├               ├──${ip:port}
```

shenyu-client starts up, the service interface information (MetaDataRegisterDTO/URIRegisterDTO) wrote in Ephemeral way above Etcd of the node.

shenyu-admin uses Etcd's Watch mechanism to monitor events such as data update and deletion, and triggers the corresponding registration processing logic after data changes. Upon receipt of a change to the MetadataregisterDTO node, the data change and data synchronization event publication of the selector and rule is triggered. Upon receipt of a UriRegisterDTO node change, the upstream of the selector is triggered to publish an update and data synchronization event.

## Consul Registry

Consul register client will save URIRegisterDTO to service instance metadata, and URIRegisterDTO will disappear with service unregister.

![](/img/shenyu/register/Consul-ui.png)

And Consul register client will save MetaDataRegisterDTO to Key/Value store, storage struct is:

```
shenyu
   ├──regsiter
   ├    ├──metadata
   ├    ├     ├──${rpcType}
   ├    ├     ├      ├────${contextPath}
   ├    ├     ├               ├──${ruleName} : save metadata data of MetaDataRegisterDTO

```

When shenyu-client is started, The service interface information (MetaDataRegisterDTO/URIRegisterDTO) on the Metadata of the ServiceInstance (URIRegisterDTO) and Key-Value (MetaDataRegisterDTO), Store as described above.

shenyu-admin senses the update and deletion of data by monitoring the change of index of Catalog and KeyValue, and triggers the corresponding registration processing logic after the change of data. Upon receipt of a change to the MetadataregisterDTO node, the data change and data synchronization event publication of the selector and rule is triggered. Upon receipt of a UriRegisterDTO node change, the upstream of the selector is triggered to publish an update and data synchronization event.

## Nacos Register

Nacos registration is divided into two parts: URI and Metadata. URI is registered by instance. In case of service exception, the relevant URI data node will be deleted automatically and send events to the subscriber, and the subscriber will carry out relevant offline processing. Metadata is registered by configuration without any related up-down operation. When a URI instance is registered, the Metadata configuration will be published accordingly. The subscriber monitors data changes and carries out update processing.

The URI instance registration command rules are as follows:

```
shenyu.register.service.${rpcType}
```


Listens on all RpcType nodes initially, and the `${contextPath}` instances registered under them are distinguished by IP and Port, and carry their corresponding contextPath information. After the URI instance is offline, it triggers the update and data synchronization event publication of the selector's upstream.

When the URI instance goes online, the corresponding Metadata data will be published. The node name command rules are as follows:

```
shenyu.register.service.${rpcType}.${contextPath}
```

The subscriber side continues to listen for all Metadata configurations, triggering selector and rule data changes and data synchronization events after the initial subscription and configuration update.

## SPI

| *SPI Name*                       | *Description*               |
| -------------------------------- | --------------------------- |
| ShenyuClientRegisterRepository   | ShenYu client register SPI       |

| *Implementation Class*           | *Description*               |
| -------------------------------- | --------------------------- |
| HttpClientRegisterRepository     | Http client register repository |
| ZookeeperClientRegisterRepository| Zookeeper client register repository |
| EtcdClientRegisterRepository     | Etcd client register repository |
| ConsulClientRegisterRepository   | Consul client register repository |
| NacosClientRegisterRepository    | Nacos client register repository |


| *SPI Name*                       | *Description*                 |
| -------------------------------- | ----------------------------- |
| ShenyuServerRegisterRepository     | ShenYu server register SPI      |

| *Implementation Class*           | *Description*                 |
| -------------------------------- | ----------------------------- |
| ShenyuHttpRegistryController       | Http server repository        |
| ZookeeperServerRegisterRepository| Zookeeper server registry repository |
| EtcdServerRegisterRepository     | Etcd server registry repository |
| ConsulServerRegisterRepository   | Consul server registry repository |
| NacosServerRegisterRepository    | Nacos server registry repository |
