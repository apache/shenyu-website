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