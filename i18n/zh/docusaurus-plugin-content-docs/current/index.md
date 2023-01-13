---
sidebar_position: 1
title: Apache ShenYu 介绍
keywords: ["Apache shenyu"]
description: Apache ShenYu 是一个异步的，高性能的，跨语言的，响应式的`API`网关。
---

# 架构图

 ![](/img/architecture/shenyu-architecture-3d.png)

# 什么是 Apache ShenYu

这是一个异步的，高性能的，跨语言的，响应式的 `API` 网关。

# 为什么叫ShenYu

 ShenYu(神禹)是中国古代君主夏禹(后世亦称大禹)的尊称，他留下了三渡黄河造福人民并成功治理黄河洪水的感人故事。他和尧、舜一起被认为是中国古代三大帝王之一。

* 首先，ShenYu这个名字是为了弘扬我们中华文明的传统美德。
* 其次，对于网关来说最重要的是流量管理。
* 最后，社区将以公平、公正、公开、择优的方式做事，在向神禹致敬的同时，也符合 Apache Way。

# 特点

* 代理：支持Apache Dubbo，Spring Cloud，gRPC，Motan，SOFA，TARS，WebSocket，MQTT
* 安全性：签名，OAuth 2.0，JSON Web令牌，WAF插件
* API治理：请求、响应、参数映射、Hystrix、RateLimiter插件
* 可观测性：跟踪、指标、日志记录插件
* 仪表板：动态流量控制，用户菜单权限的可视化后端
* 扩展：插件热插拔，动态加载
* 集群：NGINX、Docker、Kubernetes
* 语言：提供.NET，Python，Go，Java客户端用于API注册

---

# 脑图

![](https://shenyu.apache.org/img/shenyu/activite/shenyu-xmind.png)

# 快速开始 (docker)

### 运行 Apache ShenYu Admin

```
docker pull apache/shenyu-admin
docker network create shenyu
docker run -d -p 9095:9095 --net shenyu apache/shenyu-admin
```

默认账号: **admin**

默认密码: **123456**

### 运行 Apache ShenYu Bootstrap

```
docker pull apache/shenyu-bootstrap
docker run -d -p 9195:9195 --net shenyu apache/shenyu-bootstrap
```

### 路由设置

* Real requests  ：<http://127.0.0.1:8080/helloworld>,

```json
{
  "name" : "Shenyu",
  "data" : "hello world"
}
```

* 设置路由规则 (Standalone)

将`localKey: 123456`添加到Headers中。如果需要自定义localKey，可以使用sha512工具基于明文生成密钥，并更新`shenyu.local.sha512Key`属性。

```
curl --location --request POST 'http://localhost:9195/shenyu/plugin/selectorAndRules' \
--header 'Content-Type: application/json' \
--header 'localKey: 123456' \
--data-raw '{
    "pluginName": "divide",
    "selectorHandler": "[{\"upstreamUrl\":\"127.0.0.1:8080\"}]",
    "conditionDataList": [{
        "paramType": "uri",
        "operator": "match",
        "paramValue": "/**"
    }],
    "ruleDataList": [{
        "ruleHandler": "{\"loadBalance\":\"random\"}",
        "conditionDataList": [{
            "paramType": "uri",
            "operator": "match",
            "paramValue": "/**"
        }]
    }]
}'
```

* 代理请求 ：<http://localhost:9195/helloworld>

```json
{
  "name" : "Shenyu",
  "data" : "hello world"
}
```

---

# 插件

  每当有请求进来，Apache ShenYu将基于责任链模式由所有启用的插件来执行它。

  作为Apache ShenYu的核心，插件是可扩展和可热插拔的。

  不同的插件做不同的事情。

  当然，用户也可以自定义插件来满足自己的需求。

  如果要自定义，见[自定义插件](https://shenyu.apache.org/docs/developer/custom-plugin/)

---  

# Selector & Rule

  根据您的HTTP请求头，Selector和Rule将用于路由您的请求。

  Selector是您的第一层路由，它是粗粒度的，例如模块级。

  Rule是你的第二层路由，你认为你的请求应该做什么。例如模块中的方法级别。

  Selector和Rule只匹配一次，然后返回匹配结果。因此最粗的粒度应该最后排序。

---  

# Data Caching & Data Sync

  因为所有数据都是使用JVM中的ConcurrentHashMap缓存的，所以速度非常快。

  Apache ShenYu通过监听ZooKeeper节点(或WebSocket push，HTTP long polling)，在后台管理中用户更改配置信息时动态更新缓存。
  
  ![](/img/shenyu/dataSync/shenyu-config-processor-en.png)
  
  ![](/img/shenyu/dataSync/config-strategy-processor-en.png)

---

# Prerequisite

* JDK 1.8+

---

# Stargazers over time

<a href="https://starchart.cc/apache/incubator-shenyu.svg"><img src="https://starchart.cc/apache/incubator-shenyu.svg"/></a>

---  

# 贡献与支持

* [贡献方式](https://shenyu.apache.org/community/contributor-guide)
* [邮件我们](mailto:dev@shenyu.apache.org)

---  

# 已知用户

按注册顺序，欢迎更多接入公司在 https://github.com/apache/shenyu/issues/68 注册（仅限开源用户）。

用户 : [已知用户](https://shenyu.apache.org/community/user-registration)  

---
