---
title: "How convenient is the 2.1.X version of Apache ShenYu Gateway?"
author: "xiaoyu"
description: "How convenient is the 2.1.X version of ShenYu Gateway?"
categories: "Apache ShenYu"
tags: ["Apache ShenYu"]
date: 2019-12-12
cover: "/img/architecture/shenyu-framework.png"
---

It has been a year since I open sourced ShenYu gateway in October last year, and received many suggestions from you guys in community. It has provided very rich functions after optimization, many of functions are highly cusmized, visualized, and highly extensible, now let's make a summary. 

### Plugin

- Provides various plug-ins, such as signature, monitoring, rate limiting, circuit breaker, Http proxy, Dubbo proxy, Websocket, etc.

- Support users to quickly develop plug-ins. 

- All plug-in data and switch state support dynamic changes. 

### Data Synchronization 

- Provides three different data synchronization strategies: Http long polling, Zookeeper, and Websocket, allowing users to choose freely.
- It is recommended to use Websocket, which is the lightest and more efficient in a cluster environment.

### For Users

- First of all, we provide a client package that is convenient for users to access. Users can quickly register their projects to the ShenYu gateway.
- By default, users don't need to care about ShenYu Gateway's selectors, rules and other configurations.
- The user's previous interface is completely zero intrusion, It is only need to change to the domain name of the ShenYu gateway.
-  For Dubbo users, the conversion from Http protocol to Dubbo protocol is almost completed by Http.
- ShenYu gataway uses the Http protocol, so it is destined to be cross-language, It is feasible for .Net programmers, PHP programmers to interact with Java program.

For example, if you have a Dubbo interface, the parameter definition is a java bean,
```java
public void insert(final DubboTest dubboTest) {
}
public class DubboTest implements Serializable {
   private String id;
   private String name;
}
```
If you use the ShenYu gateway to call this method, your Http parameter is to pass a json string in the body, which is no different from a normal http call.
```json
{"id":"123","name":"xiaoyu"}
```

### For Developers

- With more and more users, the situation of each company is different. ShenYu gateway in 2.1.X version are more extensible, making it convenient for developers .
- For example, there are may things could be extensible, such as Plug-ins, Filters, Dubbo parameter parser, iphost parser, return results, etc. We know that the default return result of the ShenYu gateway is: 

```json
{"code":200, "message ": "成功!","data" :"helloWorld!"}
```

However, when using the ShenYu gateway to call your business system, your business system may define the result that is not confirm the above structure. Maybe your field is called `msg`, which will cause a different structure and bring confusion to the front-end processing. We have noticed this thing: https://github.com/apache/incubator-shenyu/issues/109, now it has been optimized, users can customize the return results to define, the specifics depend on the ShenYu document.

### What scenarios of ShenYu gateway are suitable, and what should you pay attention to?

First of all, I think we should follow pragmatism, when you need to use it , then you have monmentum to know it. Thus, where are you need Soul?

#### Scenario1: Adimistration back-end

- First of all, as rising popularity of microservices, our back-end is divided into many micro-services. I believe that your companies has a back-end management system. I guess they generally have the following architecture.

![soul-rpc](soul-rpc.png)

- It may cause some troubles as follows:
  - The developers of every microservice are developing based on this, which will become more and more cumbersome.

  - How to publish without downtime? If you want to publish the commodity module, all other modules will not be able to work at this time.

  - If a certain module interface requires a lot of requests (multiple deployments are required), and another module does not need it, how can you split it?

- Some people may say I can disassemble them into a few web projects. But this will bring new troubles, where to do load balance? Where to do unified certification? 
- ShenYu gateway solves all the above problems very well, just register your microservice to ShenYu gateway. You can do whatever you want. For example, the order module has 2 nodes, and you want to release a new version, you can send request to one of them in the gateway, and update the version in the other node. When the update complete, let the request go though both two nodes. So Java programmer can also do the jod of system operation engineer.
- If you need unified authentication, you only need to add an authentication plug-in suitable for your business to the gateway.

![soul-admin](soul-admin.png)

### Scenario2: Company entrance gateway (open platform)

- If a company wants to do open-platform or an entrance gateway， authentication, rate limiting, circuit breaker, monitoring are indispensable.

- If your company is in Dubbo system, when developers have written the Dubbo service, there is no need to add a new web project to provide an interface.

- If an interface attacked by a large amount of request, how do you deal with it?

- ShenYu is here to solve the trouble above, this is the purpose of the design. Let’s take a look at the overall architecture diagram. 

  ![soul-framework](shenyu-framework.png)

- ShenYu gateway is implemented using reactive programming.  Just look at the weather vane Spring, responsive programming is definitely an important direction in the future. When I was in 2014, I wrote for loop  every day. The leader told me to use lambda expressions, which would be the trend of the future. Nowadays, if you are a java programmer but don't know lambda expression, you are out.

![soul-framework](shenyu-framework.png)

### There are many other functions

- Support websocket proxy.
- Support file upload and download.

- You can customize your plug-in development. 

### At last

- Github: https://github.com/apache/incubator-shenyu
- Gitee: https://gitee.com/dromara/soul
- Document: https://dromara.org/zh-cn/docs/soul/soul.html
- QQ group: 429951241
- Finally, Soul3.0 has been open sourced, which has been verified in the double 11 concurrency scene for 2 years. I hope It will help you guys.
