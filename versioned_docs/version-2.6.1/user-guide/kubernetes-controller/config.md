---
title: Kubernetes Controller Config
description: Kubernetes Controller Config
---

This article introduces Kubernetes Controller configuration.

## Enable HTTPS

To enable HTTPS, you need to configure the `sni protocol` in the `application.yml` file of the gateway:

```yaml
shenyu:
   netty:
     http:
       sni:
         enabled: true
         mod: k8s #k8s mode applies
         defaultK8sSecretNamespace: shenyu-ingress #The namespace of the default secret resource
         defaultK8sSecretName: default-cert #default secret resource name
```

Among them, the default secret resource must be available, but it will not be actually used at present.

## Ingress configuration

ShenYu Kubernetes Controller implements the K8s native Ingress standard, see [K8s official documentation](https://kubernetes.io/docs/concepts/services-networking/ingress/) for the use of the native standard

In addition, Apache ShenYu has expanded based on the Annotation field of Ingress, and the configuration is shown in the following tables:

### General

| Name | Default | Required | Description |
| --------------------------- | ------ | -------- | ----- --- |
| kubernetes.io/ingress.class | | Yes | Fill in shenyu |

### Divide plugin (HTTP proxy)

| Name | Default | Required | Description |
| ------------------------------------- | ------ | ------- - | ------------------------------------------------ ------------ |
| shenyu.apache.org/loadbalancer | random | No | Load balancing algorithm, optional hash, random, roundRobin, leastActive, p2c, shortestResponse |
| shenyu.apache.org/retry | 3 | No | Number of failed retries |
| shenyu.apache.org/timeout | 3000 | No | Backend request timeout, in milliseconds |
| shenyu.apache.org/header-max-size | 10240 | No | The maximum size of the request header, unit byte |
| shenyu.apache.org/request-max-size | 102400 | No | Maximum request body size, unit byte |

### Dubbo plugin

| Name                                           | Default  | Required or not | Description                                                  |
| ---------------------------------------------- | -------- | --------------- | ------------------------------------------------------------ |
| shenyu.apache.org/loadbalancer                 | random   | No              | Load balancing algorithm, optional hash, random, roundRobin, lastActive, p2c, shortestResponse |
| shenyu.apache.org/retry                        | 3        | No              | Number of failed retries                                     |
| shenyu.apache.org/timeout                      | 3000     | no              | Backend request timeout in milliseconds                      |
| shenyu.apache.org/header-max-size              | 10240    | No              | Maximum request header size in bytes                         |
| shenyu.apache.org/request-max-size             | 102400   | No              | Maximum request body size in bytes                           |
| shenyu.apache.org/upstreams-protocol           | dubbo:// | No              | Specify the protocol protocol used by upstream               |
| shenyu.apache.org/plugin-dubbo-enabled         |          | No              | Determines if the dubbo plugin is enabled                    |
| shenyu.apache.org/zookeeper-register-address   |          | Yes             | Specify zookeeper address                                    |
| shenyu.apache.org/plugin-dubbo-app-name        |          | Yes             | Specify the metadata application name                        |
| shenyu.apache.org/plugin-dubbo-path            |          | Yes             | Specify the request path for metadata                        |
| shenyu.apache.org/plugin-dubbo-rpc-type        |          | Yes             | Specify the rpc type for metadata (dubbo, sofa, tars, springCloud, motan, grpc) |
| shenyu.apache.org/plugin-dubbo-service-name    |          | Yes             | Specify the interface name for the metadata                  |
| shenyu.apache.org/plugin-dubbo-method-name     |          | Yes             | Specifies the method name for metadata                       |
| shenyu.apache.org/plugin-dubbo-rpc-expand      |          | No              | Specifies the rpc expansion parameter (json object) for the metadata |
| shenyu.apache.org/plugin-dubbo-parameter-types |          | Yes             | Specify parameter types for metadata                         |

### Motan plugin

| Name                                           | Default | Required or not | Description                                                  |
| ---------------------------------------------- | ------- | --------------- | ------------------------------------------------------------ |
| shenyu.apache.org/loadbalancer                 | random  | No              | Load balancing algorithm, optional hash, random, roundRobin, lastActive, p2c, shortestResponse |
| shenyu.apache.org/retry                        | 3       | No              | Number of failed retries                                     |
| shenyu.apache.org/timeout                      | 3000    | No              | Back-end request timeout in milliseconds                     |
| shenyu.apache.org/header-max-size              | 10240   | No              | Maximum request header size in bytes                         |
| shenyu.apache.org/request-max-size             | 102400  | No              | Maximum request body size in bytes                           |
| shenyu.apache.org/plugin-motan-enabled         | No      | Yes             | Determines if the motan plugin is enabled                    |
| shenyu.apache.org/zookeeper-register-address   |         | Yes             | Specify zookeeper address                                    |
| shenyu.apache.org/plugin-motan-app-name        |         | Yes             | Specify the metadata application name                        |
| shenyu.apache.org/plugin-motan-path            |         | Yes             | Specify the request path for metadata                        |
| shenyu.apache.org/plugin-motan-rpc-type        |         | Yes             | Specify the rpc type for metadata (dubbo, sofa, tars, springCloud, motan, grpc) |
| shenyu.apache.org/plugin-motan-service-name    |         | Yes             | Specify the interface name for the metadata                  |
| shenyu.apache.org/plugin-motan-method-name     |         | Yes             | Specifies the method name for metadata                       |
| shenyu.apache.org/plugin-motan-rpc-expand      |         | No              | Specifies the rpc extension parameter (json object) for the metadata |
| shenyu.apache.org/plugin-motan-parameter-types |         | Yes             | Specify parameter types for metadata                         |

### SpringCloud plugin



| Name                                                  | Default | Required or not | Description                                                  |
| ----------------------------------------------------- | ------- | --------------- | ------------------------------------------------------------ |
| shenyu.apache.org/loadbalancer                        | random  | No              | Load balancing algorithm, optional hash, random, roundRobin, lastActive, p2c, shortestResponse |
| shenyu.apache.org/retry                               | 3       | No              | Number of failed retries                                     |
| shenyu.apache.org/timeout                             | 3000    | No              | Backend request timeout in milliseconds                      |
| shenyu.apache.org/header-max-size                     | 10240   | No              | Maximum request header size in bytes                         |
| shenyu.apache.org/request-max-size                    | 102400  | No              | Maximum request body size in bytes                           |
| shenyu.apache.org/plugin-spring-cloud-enabled         |         | Yes             | Determines whether to start the springCloud plugin           |
| shenyu.apache.org/zookeeper-register-address          |         | Yes             | Specify the zookeeper address                                |
| shenyu.apache.org/plugin-spring-cloud-app-name        |         | Yes             | Specify the metadata application name                        |
| shenyu.apache.org/plugin-spring-cloud-path            |         | Yes             | Specify the request path for metadata                        |
| shenyu.apache.org/plugin-spring-cloud-rpc-type        |         | Yes             | Specify the rpc type (dubbo, sofa, tars, springCloud, motan, grpc) of the metadata |
| shenyu.apache.org/plugin-spring-cloud-service-name    |         | Yes             | Specify the interface name for metadata                      |
| shenyu.apache.org/plugin-spring-cloud-method-name     |         | Yes             | Specifies the method name for metadata                       |
| shenyu.apache.org/plugin-spring-cloud-rpc-expand      |         | No              | Specifies the rpc extension parameter (json object) for the metadata |
| shenyu.apache.org/plugin-spring-cloud-parameter-types |         | Yes             | Specify parameter types for metadata                         |

### WebSocket plugin

| Name                               | Default | Required or not | Description                                                  |
| ---------------------------------- | ------- | --------------- | ------------------------------------------------------------ |
| shenyu.apache.org/loadbalancer     | random  | No              | Load balancing algorithm, optional hash, random, roundRobin, lastActive, p2c, shortestResponse |
| shenyu.apache.org/retry            | 3       | No              | Number of failed retries                                     |
| shenyu.apache.org/timeout          | 3000    | No              | Back-end request timeout in milliseconds                     |
| shenyu.apache.org/header-max-size  | 10240   | No              | Maximum request header size in bytes                         |
| shenyu.apache.org/request-max-size | 102400  | No              | Maximum size of request body in byte                         |
