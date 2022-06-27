---
title: Logging-ElasticSearch Plugin
keywords: ["Logging", "ElasticSearch"]
description: Logging-ElasticSearch Plugin
---



## Description



>`Apache ShenYu` The gateway receives requests from the client, forwards them to the server, and returns the server results to the client. The gateway can record the details of each request，    
>The list includes: request time, request parameters, request path, response result, response status code, time consumption, upstream IP, exception information waiting.    
>
>Shenyu gateway can record access logs through logging-elasticsearch-plugin and send access logs to elasticsearch database.



## **Technical Solutions** 



- Architecture Diagram

![](/img/shenyu/plugin/logging-elasticsearh/logging-elasticsearch-arch.png)



## Plugin Usage



### 1.Add the dependency of logging-elasticsearch to the Shenyu-bootstrap-module 's **`pom.xml`** **file**.



```xml
 <!--shenyu logging-elasticsearch plugin start-->
        <dependency>
            <groupId>org.apache.shenyu</groupId>
            <artifactId>shenyu-spring-boot-starter-plugin-logging-elasticsearch</artifactId>
            <version>${project.version}</version>
        </dependency>
        <!--shenyu logging-elasticsearch plugin end-->
```



### 2.**In** **`shenyu-admin`** **--> Basic Configuration --> Plugin Management -->** `loggingElasticSearch`, configure the ElasticSearch parameter and set it to on.



#### 2.1Open the plugin and configure elasticsearch, configure it as follows.



<img src="/img/shenyu/plugin/logging-elasticsearh/logging-elasticsearch-config-en.png" style="zoom:50%;" />



- The individual configuration items are described as follows:


| config-item     | type    | description                                                  | remarks                             |
| :-------------- | :------ | :----------------------------------------------------------- | :---------------------------------- |
| host            | String  | host name                                                    | must                                |
| prot            | String  | port num                                                     | must                                |
| sampleRate      | String  | Sampling rate, range 0~1, 0: off, 0.01: acquisition 1%, 1: acquisition 100% | Optional, default 1, all collection |
| compressAlg     | String  | Compression algorithm, no compression by default, currently supports LZ4 compression | Optional, no compression by default |
| maxResponseBody | Ingeter | Maximum response size, above the threshold no response will be collected | Optional, default 512KB             |
| maxRequestBody  | Ingeter | Maximum request body size, above the threshold no request body will be collected | Optional, default 512KB             |
Except for host, port, all others are optional, in most cases only these 3 items need to be configured.



#### **2.2 Configuring Selectors and Rulers** 



For detailed configuration of selectors and rules, please refer to: [Selector and rule management](../../user-guide/admin-usage/selector-and-rule)。
In addition sometimes a large gateway cluster corresponds to multiple applications (business), different applications (business) corresponds to different topics, related to isolation,  
then you can configure different topics (optional) and sampling rate (optional) by selector, the meaning of the configuration items as shown in the table above.   
The operation is shown below:

![](/img/shenyu/plugin/logging-elasticsearh/logging-elasticsearch-option.png)



## Logging information  



The fields of the captured access log are as follows.  

| Field Name            |                           Meaning                            | Description                                                  | Remarks |
| :-------------------- | :----------------------------------------------------------: | :----------------------------------------------------------- | :------ |
| clientIp              |                          Client IP                           |                                                              |         |
| timeLocal             |     Request time string, format: yyyy-MM-dd HH:mm:ss.SSS     |                                                              |         |
| method                | request method (different rpc type is not the same, http class for: get, post wait, rpc class for the interface name) |                                                              |         |
| requestHeader         |                 Request header (json format)                 |                                                              |         |
| responseHeader        |                Response header (json format)                 |                                                              |         |
| queryParams           |                   Request query parameters                   |                                                              |         |
| requestBody           |   Request Body (body of binary type will not be captured)    |                                                              |         |
| requestUri            |                         Request uri                          |                                                              |         |
| responseBody          |                        Response body                         |                                                              |         |
| responseContentLength |                      Response body size                      |                                                              |         |
| rpcType               |                           rpc type                           |                                                              |         |
| status                |                       response status                        |                                                              |         |
| upstreamIp            |         Upstream (program providing the service) IP          |                                                              |         |
| upstreamResponseTime  | Time taken by the upstream (program providing the service) to respond to the request (ms ms) |                                                              |         |
| userAgent             |                     Requested user agent                     |                                                              |         |
| host                  |                      The requested host                      |                                                              |         |
| module                |                      Requested modules                       |                                                              |         |
| path                  |                      The requested path                      |                                                              |         |
| traceId               |                  Requested Link Tracking ID                  | Need to access link tracking plugins, such as skywalking,zipkin |         |



## Collect Logging



Users need to deploy the `ElasticSearch` service to collect



### Installing ElasticSearch under Windows Environment



- To [download address ]( https://www.elastic.co/downloads/elasticsearch ) Select Windows version to download
- After downloading the installation package, unzip it, enter the `bin` directory, and double-click to execute `elasticsearch.bat` to start
- The default startup port is`9200 `. Access` http://localhost:9200 `, verify success

![](/img/shenyu/plugin/logging-elasticsearh/elasticsearch-success.png)



### Installing ElasticSearch in MacOS environment



- To [download address ]( https://www.elastic.co/downloads/elasticsearch ) Select Windows version to download
- After downloading the installation package, unzip it, enter the `bin` directory and execute the startup command on the terminal: `./elasticsearch`
- The default startup port is`9200 `. Access` http://localhost:9200 `, verify success

![](/img/shenyu/plugin/logging-elasticsearh/elasticsearch-success.png)



### Installing Kibana under Windows Environment



- To [download address ]( https://www.elastic.co/cn/downloads/kibana ) Select Windows version to download
- After downloading the installation package, unzip it, enter the `bin` directory, and double-click to execute `kibana.bat` to start
- The default startup port is `5601`. Access` http://localhost:5601, verify success

![](/img/shenyu/plugin/logging-elasticsearh/kibana-success.png)



### Installing Kibana in MacOS environment



- To [download address ]( https://www.elastic.co/cn/downloads/kibana ) Select Windows version to download
- After downloading the installation package, unzip it, enter the `bin` directory and execute the startup command on the terminal: `./kibana`
- The default startup port is `5601`. Access` http://localhost:5601, verify success

![](/img/shenyu/plugin/logging-elasticsearh/kibana-success.png)



### Initiate a request, and the elasticsearch java client collects logs and stores them in the elasticsearch database



#### Using postman to initiate a request



![](/img/shenyu/plugin/logging-elasticsearh/postman-request.png)



#### Querying data using kibaba



![](/img/shenyu/plugin/logging-elasticsearh/index.png)

- The first time you use the plug-in, you will automatically create a `shenyu-access-logging` index



![](/img/shenyu/plugin/logging-elasticsearh/data.png)

- Using ES query statement, the requested log information can be queried



