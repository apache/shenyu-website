---
title: Logging-ElasticSearch插件
keywords: ["Logging", "ElasticSearch"]
description: Logging-ElasticSearch插件
---

## 说明

>`Apache ShenYu` 网关接收客户端请求，向服务端转发请求，并将服务端结果返回给客户端。网关可以记录下每次请求对应的详细信息，  
>列如： 请求时间、请求参数、请求路径、响应结果、响应状态码、耗时、上游IP、异常信息等待.  
>ShenYu网关可以通过Logging-ElasticSearch插件记录访问日志并将访问日志发送到ElasticSearch数据库。
## 技术方案

- 架构图

![](/img/shenyu/plugin/logging-elasticsearh/logging-elasticsearch-arch.png)

## 插件使用

### 1.在shenyu-bootstrap模块的 `pom.xml` 文件中添加 `Logging-ElasticSearch`的依赖。

```xml
        <!--shenyu logging-elasticsearch plugin start-->
        <dependency>
            <groupId>org.apache.shenyu</groupId>
            <artifactId>shenyu-spring-boot-starter-plugin-logging-elasticsearch</artifactId>
            <version>${project.version}</version>
        </dependency>
        <!--shenyu logging-elasticsearch plugin end-->
```

### 2.在 `shenyu-admin`--> 基础配置 --> 插件管理-> `loggingElasticSearch` ，配置ElasticSearch参数，并设置为开启。

#### 2.1开插件，并配置elasticsearch,配置如下：

<img src="/img/shenyu/plugin/logging-elasticsearh/logging-elasticsearch-config-cn.jpg" style="zoom:50%;" />

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

#### 2.2 配置选择器和规则器  

选择器和规则详细配置，请参考: [选择器和规则管理](../../user-guide/admin-usage/selector-and-rule)。
另外有时候一个大网关集群对应多个应用程序（业务），不同应用程序（业务）对应不同的主题，相关隔离，这时候可以按选择器配置不同的主题(可选)和采样率(可选)，配置项的含义如上表所示。  
操作如下图：  

![](/img/shenyu/plugin/logging-elasticsearh/logging-elasticsearch-option.png)

## Logging信息

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

## 收集Logging

用户需要部署`ElasticSearch`服务来采集

### windows 环境下安装ElasticSearch

- 到[下载地址](https://www.elastic.co/downloads/elasticsearch)选择windows版本进行下载
- 下载安装包后解压，进入`bin`目录下,双击执行`elasticsearch.bat`进行启动
- 默认启动端口为  `9200 `，访问 `http://localhost:9200`，验证是否成功

![](/img/shenyu/plugin/logging-elasticsearh/elasticsearch-success.png)

### macos 环境下安装ElasticSearch

- 到[下载地址](https://www.elastic.co/downloads/elasticsearch)选择macos版本进行下载
- 下载安装包后解压，进入`bin`目录下,在终端执行启动命令:  `./elasticsearch`
- 默认启动端口为  `9200 `，访问 `http://localhost:9200`，验证是否成功

![](/static/img/shenyu/plugin/logging-elasticsearh/elasticsearch-success.png)

### windows 环境下安装Kibana

- 到[下载地址](https://www.elastic.co/cn/downloads/kibana)选择windows版本进行下载
- 下载安装包后解压，进入`bin`目录下,双击执行`kibana.bat`进行启动
- 默认启动端口为  `5601 `，访问 `http://localhost:5601`，验证是否成功（前提是ElasticSearch已打开）

![](/img/shenyu/plugin/logging-elasticsearh/kibana-success.png)

### macos 环境下安装Kibana

- 到[下载地址](https://www.elastic.co/cn/downloads/kibana)选择windows版本进行下载
- 下载安装包后解压，进入`bin`目录下,在终端执行启动命令:  `./kibana`
- 默认启动端口为  `5601 `，访问 `http://localhost:5601`，验证是否成功（前提是ElasticSearch已打开）

![](/img/shenyu/plugin/logging-elasticsearh/kibana-success.png)

### 发起请求，ElasticSearch的Java客户端收集日志并存储进ElasticSearch数据库

#### 使用postman发起请求

<img src="/img/shenyu/plugin/logging-elasticsearh/postman-request.png" style="zoom:50%;" />

#### 使用Kibaba查询数据

![](/img/shenyu/plugin/logging-elasticsearh/index.png)

- 第一次使用插件会自动创建`shenyu-access-logging`索引

![](/img/shenyu/plugin/logging-elasticsearh/data.png)

- 利用es查询语句可以查询到请求的日志信息