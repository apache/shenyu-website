---
title: Logging-ElasticSearch插件
keywords: ["Logging", "ElasticSearch"]
description: Logging-ElasticSearch插件
---

# 1. 概述

## 1.1 插件名称

* Logging-ElasticSearch

## 1.2 适用场景

* 通过shenyu网关收集http请求日志，通过其他平台(Kibana)查询或者展示日志。

## 1.3 插件功能

>`Apache ShenYu` 网关接收客户端请求，向服务端转发请求，并将服务端结果返回给客户端。网关可以记录下每次请求对应的详细信息，  
> 列如： 请求时间、请求参数、请求路径、响应结果、响应状态码、耗时、上游IP、异常信息等待.  
> ShenYu网关可以通过Logging-ElasticSearch插件记录访问日志并将访问日志发送到ElasticSearch数据库。

## 1.4 插件代码

* 核心模块 `shenyu-plugin-logging-elasticsearch`

* 核心类 `org.apache.shenyu.plugin.logging.elasticsearch.LoggingElasticSearchPlugin`
* 核心类 `org.apache.shenyu.plugin.logging.elasticsearch.client.ElasticSearchLogCollectClient`

## 1.5 添加自哪个shenyu版本

* ShenYu 2.5.0

## 1.6 技术方案

* 架构图

![](/img/shenyu/plugin/logging/logging-elasticsearch/logging-elasticsearch-arch.png)

# 2. 如何使用插件

## 2.1 插件使用流程图

![](/img/shenyu/plugin/logging/logging-console/loggingConsole-use-en.png)

## 2.2 导入pom

* 在shenyu-bootstrap模块的 `pom.xml` 文件中添加 `Logging-ElasticSearch`的依赖。

```xml
<!--shenyu logging-elasticsearch plugin start-->
<dependency>
    <groupId>org.apache.shenyu</groupId>
    <artifactId>shenyu-spring-boot-starter-plugin-logging-elasticsearch</artifactId>
    <version>${project.version}</version>
</dependency>
<!--shenyu logging-elasticsearch plugin end-->
```

## 2.3 启用插件

* 在 `shenyu-admin`--> 基础配置 --> 插件管理-> `loggingElasticSearch` ，配置ElasticSearch参数，并设置为开启。

## 2.4 配置插件

### 2.4.1 开启插件，并配置elasticsearch,配置如下：

![](/img/shenyu/plugin/logging/logging-elasticsearch/logging-elasticsearch-config-cn.png)

* 各个配置项说明如下：

| 配置项          | 类型    | 说明                                               | 备注                  |
| :-------------- | :------ | :------------------------------------------------- | :-------------------- |
| config-item     | type    | description                                        | remarks               |
| host            | String  | 主机名                                             | 必须                  |
| port            | String  | 端口号                                             | 必须                  |
| sampleRate      | String  | 采样率，范围0~1，0：关闭，0.01:采集1%，1：采集100% | 可选，默认1，全部采集 |
| compressAlg     | String  | 压缩算法，默认不压缩，目前支持LZ4压缩              | 可选，默认不压缩      |
| maxResponseBody | Ingeter | 最大响应体大小，超过阈值将不采集响应体             | 可选，默认512KB       |
| maxRequestBody  | Ingeter | 最大请求体大小，超过阈值将不采集请求体             | 可选，默认512KB       |
*除了host、port其它都是可选*，大部分情况下只需要配置这2项就可以了。

### 2.4.2 配置选择器和规则器

选择器和规则详细配置，请参考: [选择器和规则管理](../../user-guide/admin-usage/selector-and-rule)。
另外有时候一个大网关集群对应多个应用程序（业务），不同应用程序（业务）对应不同的主题，相关隔离，这时候可以按选择器配置不同的主题(可选)和采样率(可选)，配置项的含义如上表所示。  
操作如下图：

![](/img/shenyu/plugin/logging/logging-elasticsearch/logging-elasticsearch-option.png)

## 2.5 Logging信息

采集的access log的字段如下：

| 字段名称              |                             含义                             | 说明                                      | 备注 |
| :-------------------- | :----------------------------------------------------------: | :---------------------------------------- | :--- |
| clientIp              |                           客户端IP                           |                                           |      |
| timeLocal             |        请求时间字符串,  格式：yyyy-MM-dd HH:mm:ss.SSS        |                                           |      |
| method                | 请求方法(不同rpc类型不一样，http类的为:get,post等待，rpc类的为接口名称) |                                           |      |
| requestHeader         |                       请求头(json格式)                       |                                           |      |
| responseHeader        |                       响应头(json格式)                       |                                           |      |
| queryParams           |                         请求查询参数                         |                                           |      |
| requestBody           |             请求Body（二进制类型的body不会采集）             |                                           |      |
| requestUri            |                           请求uri                            |                                           |      |
| responseBody          |                           响应body                           |                                           |      |
| responseContentLength |                         响应body大小                         |                                           |      |
| rpcType               |                           rpc类型                            |                                           |      |
| status                |                            响应码                            |                                           |      |
| upstreamIp            |                    上游(提供服务的程序)IP                    |                                           |      |
| upstreamResponseTime  |          上游(提供服务的程序)响应请求的耗时(毫秒ms)          |                                           |      |
| userAgent             |                        请求的用户代理                        |                                           |      |
| host                  |                          请求的host                          |                                           |      |
| module                |                          请求的模块                          |                                           |      |
| path                  |                        请求的路径path                        |                                           |      |
| traceId               |                       请求的链路追踪ID                       | 需要接入链路追踪插件，如skywalking,zipkin |      |


## 2.6 示例

### 2.6.1 通过ElasticSearch收集http请求日志

#### 2.6.1.1 安装ElasticSearch

用户需要部署`ElasticSearch`服务来采集

##### 2.6.1.1.1 windows 环境下安装ElasticSearch

- 到[下载地址](https://www.elastic.co/downloads/elasticsearch)选择windows版本进行下载
- 下载安装包后解压，进入`bin`目录下,双击执行`elasticsearch.bat`进行启动
- 默认启动端口为 `9200`，访问 `http://localhost:9200`，验证是否成功

![](/img/shenyu/plugin/logging/logging-elasticsearch/elasticsearch-success.png)

##### 2.6.1.1.2 macos 环境下安装ElasticSearch

- 到[下载地址](https://www.elastic.co/downloads/elasticsearch)选择macos版本进行下载
- 下载安装包后解压，进入`bin`目录下,在终端执行启动命令:  `./elasticsearch`
- 默认启动端口为 `9200`，访问 `http://localhost:9200`，验证是否成功

![](/img/shenyu/plugin/logging/logging-elasticsearch/elasticsearch-success.png)

#### 2.6.1.2 安装Kibana

##### 2.6.1.2.1 windows 环境下安装Kibana

- 到[下载地址](https://www.elastic.co/cn/downloads/kibana)选择windows版本进行下载
- 下载安装包后解压，进入`bin`目录下,双击执行`kibana.bat`进行启动
- 默认启动端口为 `5601`，访问 `http://localhost:5601`，验证是否成功（前提是ElasticSearch已打开）

![](/img/shenyu/plugin/logging/logging-elasticsearch/kibana-success.png)

##### 2.6.1.2.2 macos 环境下安装Kibana

- 到[下载地址](https://www.elastic.co/cn/downloads/kibana)选择windows版本进行下载
- 下载安装包后解压，进入`bin`目录下,在终端执行启动命令: `./kibana`
- 默认启动端口为 `5601`，访问 `http://localhost:5601`，验证是否成功（前提是ElasticSearch已打开）

![](/img/shenyu/plugin/logging/logging-elasticsearch/kibana-success.png)

#### 2.6.1.3 插件配置

![](/img/shenyu/plugin/logging/logging-elasticsearch/logging-elasticsearch-config-cn.png)

#### 2.6.1.4 选择器和规则的配置

* 选择器和规则详细配置，请参考: [选择器和规则管理](../../user-guide/admin-usage/selector-and-rule)。

#### 2.6.1.5 使用postman发起请求

![](/img/shenyu/plugin/logging/logging-elasticsearch/postman-request.png)

#### 2.6.1.6 使用Kibana查询数据

![](/img/shenyu/plugin/logging/logging-elasticsearch/index.png)

- 第一次使用插件会自动创建`shenyu-access-logging`索引

![](/img/shenyu/plugin/logging/logging-elasticsearch/data.png)

- 利用es查询语句可以查询到请求的日志信息

# 3. 如何禁用插件

- 在 `shenyu-admin` --> 基础配置 --> 插件管理-> `LoggingElasticSearch` ，设置为关闭。
