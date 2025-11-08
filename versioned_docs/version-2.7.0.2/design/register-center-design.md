---
title: Client Registry Design
keywords: ["Client Access"]
description: Application Client Access
---

> *Notice*
> After ShenYu version 2.6.1, the ShenYu register just support http type, and the middleware register type has been removed.
> So, please use the http register type to register your service.
> ShenYu Register Center isn't microservice register center, it just register metadata, selector data, rule data to shenyu-admin, and then shenyu-admin will sync data to shenyu-gateway.


Application client access means to access your microservice to ShenYu gateway, currently supports HTTP, Dubbo, Spring Cloud, gRPC, Motan, Sofa, Tars and other protocols access.

Refer to the client access configuration in the user documentation for [Application Client Access Config](../user-guide/property-config/register-center-access.md) .

<img src="/img/shenyu/register/application-client-access-en.png" width="70%" height="60%" />


## Design principle

#### Client

![](/img/shenyu/register/client.png)

Declare the registry client type, such as HTTP, in your microservice configuration. Use SPI to load and initialize the corresponding registry client when the application starts, implement the post-processor interface associated with the Spring Bean, get the service interface information to register in it, and place the obtained information into Disruptor.

The Registry client reads data from the Disruptor and registers the interface information with shenyu-admin, where the Disruptor decouples data from operations for scaling.

#### Server

![](/img/shenyu/register/server.png)

Declare the registry server type, such as HTTP in the Shenyu-Admin configuration. When shenyu-admin is started, it will read the configuration type, load and initialize the corresponding registry server, and when the registry server receives the interface information registered by shenyu-client, it will put it into Disruptor, which will trigger the registration processing logic to update the interface information and publish a synchronous event.

Disruptor provides data and operations decoupling for expansion. If there are too many registration requests, resulting in abnormal registration, there is also a data buffer role.

## Http Registry

The principle of HTTP service registration is relatively simple. After Shenyu-Client is started, the relevant service registration interface of Shenyu-Admin will be called to upload data for registration.

After receiving the request, shenyu-admin will update the data and publish the data synchronization event to synchronize the interface information to ShenYu Gateway.

## SPI

| *SPI Name*                       | *Description*               |
| -------------------------------- | --------------------------- |
| ShenyuClientRegisterRepository   | ShenYu client register SPI       |

| *Implementation Class*           | *Description*               |
| -------------------------------- | --------------------------- |
| HttpClientRegisterRepository     | Http client register repository |


| *SPI Name*                       | *Description*                 |
| -------------------------------- | ----------------------------- |
| ShenyuServerRegisterRepository     | ShenYu server register SPI      |

| *Implementation Class*           | *Description*                 |
| -------------------------------- | ----------------------------- |
| ShenyuHttpRegistryController       | Http server repository        |
