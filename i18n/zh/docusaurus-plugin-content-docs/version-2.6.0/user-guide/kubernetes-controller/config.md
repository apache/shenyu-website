---
title: Kubernetes 控制器配置
description: Kubernetes 控制器配置
---

本篇介绍 Kubernetes 控制器配置。

## 开启 HTTPS

开启 HTTPS 需要在网关的 `application.yml` 文件中进行 `sni协议` 的相关配置：

```yaml
shenyu:
  netty:
    http:
      sni:
        enabled: true
        mod: k8s #k8s模式适用
        defaultK8sSecretNamespace: shenyu-ingress #默认secret资源的namespace
        defaultK8sSecretName: default-cert #默认secret资源名字
```

其中，默认secret资源必须要有，但是目前不会实际使用。

## Ingress 配置

ShenYu Kubernetes Controller 实现了 K8s 原生的 Ingress 标准，原生标准的使用见 [K8s 官方文档](https://kubernetes.io/docs/concepts/services-networking/ingress/)

另外，Apache ShenYu 基于 Ingress 的 Annotation 字段进行了拓展，配置见下文表格：

### 通用

| 名称                        | 默认值 | 是否必填 | 说明     |
| --------------------------- | ------ | -------- | -------- |
| kubernetes.io/ingress.class |        | 是       | 填shenyu |

### Divide 插件（HTTP代理）

| 名称                               | 默认值 | 是否必填 | 说明                                                         |
| ---------------------------------- | ------ | -------- | ------------------------------------------------------------ |
| shenyu.apache.org/loadbalancer     | random | 否       | 负载均衡算法，可选hash、random、roundRobin、leastActive、p2c、shortestResponse |
| shenyu.apache.org/retry            | 3      | 否       | 失败重试次数                                                 |
| shenyu.apache.org/timeout          | 3000   | 否       | 后端请求超时时间，单位毫秒                                   |
| shenyu.apache.org/header-max-size  | 10240  | 否       | 请求头最大大小，单位byte                                     |
| shenyu.apache.org/request-max-size | 102400 | 否       | 请求体最大大小，单位byte                                     |
