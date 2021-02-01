---
title: "One year later, the dromara team released version 2.1.1 of the new architecture Hmily distributed transaction framework "
author: "xiaoyu"
description: "One year later, Hmily released version 2.1.1 of the new architecture"
categories: "hmily"
tags: ["hmily"]
date: 2020-09-28
cover: "../../img/architecture/hmily-framework.png"
---


Thank you friends for your support all the way, and keep everyone waiting. In this version, our team refactored the entire project, reasonably divided functional modules, added configuration centers, adjusted the underlying storage structure, solved difficult bugs, and supported other new features, and absorbed more outstanding open source communities. Joining of talents.

## Architecture panorama 
![架构全景图](hmily-2.0.2.png)
### Features 

- High availability·: Supports abnormal transaction rollback and overtime abnormal recovery in distributed scenarios to prevent transaction suspension. 
- Ease of use: Provide zero-invasive Spring-Boot, Spring-Namespace to quickly integrate with business systems.
- High performance: Decentralized design, fully integrated with business systems, naturally supports cluster deployment.
- Observability: Performance monitoring of multiple metrics by Metrics, as well as admin management background UI display.
- Multiple RPCs: support Dubbo, SpringCloud, Motan, sofa-rpc and other well-known RPC frameworks.
- Log storage: Support Mysql, Oracle, Mongodb, Redis, Zookeeper, etc.
- Complex scenarios: Support RPC nested call transactions. 

### Refactoring part

- **Module division:**

    * Extract the SPI custom module open-the-box.

    - SPI module that defines multiple storage methods for transaction logs.
    - SPI module that defines multiple serialization methods for transaction logs.
    - Add configuration center, support various mainstream configuration centers (nacos, apollo, zookeeper, etc.), and support dynamic refresh of configuration.
    - Added metrics module to monitor various information at runtime.
    - Remove the core transaction execution module.
    - Extract multiple RPC support modules.
    - Extract the Spring and Spring Boot support modules.

- **On the dependent package version:**
    
    - Guava upgraded to 29.0.
- Curator upgraded to 5.1.0.
    
- **Code quality:**
    
- Strict check-style code inspection, adhering to the principle of elegance and simplicity (talk is cheap, show you code). 
    
- **openness :**
    
- The community pursues the basic principles of simplicity, happiness, and harmony.
    
- **Goal:**
    
    - Create a high-availability, high-performance, easy-to-use financial-level distributed transaction solution.

### Solve difficult bugs:

- The Dubbo framework does not support the use of annotations (spring-boot-starter-dubbo). 
- The Motan framework does not support the use of annotations.
- If  Spring Cloud users use Feign and Hystrix to integrate hmily, the thread switching problem occurs.
- In extreme cases, the transaction log serialization is abnormal.
- If timeout  happen in `try  `, It will  cause the transaction suspension bug.
- When the `confirm` and `cancel` phases are abnormal, the transaction fails to rollback.
- In the transaction log storage, two modes of synchronous and asynchronous are supported for users to choose. 

### User use and upgrade guide 

For hmily users, it only takes three steps to achieve the BASE transaction between RPC service calls

- Refer to the jar packages supported by hmily for various rpc.
- Add hmily configuration.
- Add `@Hmily` annotation to rpc interface method.

**Dependency changes **

There is no change to the dependencies, only the version needs to be upgraded to 2.1.0. Here are examples of Dubbo microservices

**Dubbo RPC microservices**

- Dubbo interface service dependency

```xml
     <dependency>
          <groupId>org.dromara</groupId>
          <artifactId>hmily-annotation</artifactId>
          <version>2.1.0</version>
      </dependency>
```

- Dubbo service provider depends on (<2.7)

```xml
       <dependency>
            <groupId>org.dromara</groupId>
            <artifactId>hmily-dubbo</artifactId>
           <version>2.1.0</version>
        </dependency>

    or 

      <dependency>
            <groupId>org.dromara</groupId>
            <artifactId>hmily-spring-boot-starter-dubbo</artifactId>
           <version>2.1.0</version>
        </dependency>
```

**Hmily configuration changes**

In the new version 2.1.0, the hmily-config module has been added to support local and registry modes. The user first needs to create a new file named `hmily.yml` under the project `resouce` file. The default path is the project's `resource` directory, it can also be specified with `-Dhmily.conf`, or the configuration can be placed in the `user.dir` directory. Priority level `-Dhmily.conf`> `user.dir`> `resource`. The file format is as follows (part of it, the following is the local mode of configuration): 

```yml
  server:
    configMode: local
    appName: account-dubbo
  config:
    appName: account-dubbo
    serializer: kryo
    contextTransmittalMode: threadLocal
    scheduledThreadMax: 16
    scheduledRecoveryDelay: 60
    scheduledCleanDelay: 60
    scheduledPhyDeletedDelay: 600
    scheduledInitDelay: 30
    recoverDelayTime: 60
    cleanDelayTime: 180
    limit: 200
    retryMax: 10
    bufferSize: 8192
    consumerThreads: 16
    asyncRepository: true
    autoSql: true
    phyDeleted: true
    storeDays: 3
    repository: mysql

repository:
  database:
    driverClassName: com.mysql.jdbc.Driver
    url : jdbc:mysql://127.0.0.1:3306/hmily?useUnicode=true&characterEncoding=utf8
    username: root
    password:
    maxActive: 20
    minIdle: 10
    connectionTimeout: 30000
    idleTimeout: 600000
    maxLifetime: 1800000
```

**If you want to use Nacos as configuration center:**

```yml
hmily:
  server:
    configMode: nacos
    appName: xxxxx
remote:
  nacos:
    server: 192.168.3.22:8848
    dataId: hmily.properties
    group: DEFAULT_GROUP
    timeoutMs: 6000
    fileExtension: yml
    passive: true
```

**If you want use Apollo as configuration center：**

```yml
hmily:
  server:
    configMode: apollo
    appName: xxxx
remote:
  apollo:
    appId: hmily-xxxxx
    configService: http://192.168.3.22:8080
    namespace: byin_hmily
    secret:
    fileExtension: yml
    passive: true
    env: dev
    meta: http://192.168.3.22:808
```

There are other configuration methods and detailed explanations of configuration content, please refer to: https://dromara.org/zh-cn/docs/hmily/config.html .

**Changes in the use of annotation methods** In the previous version, rpc interface and implementation only need to add `@Hmily` annotation, now need to be changed, in the rpc interface method is to add `@Hmily`, used to identify this is a hmily distributed transaction interface method , You need to add `@HmilyTCC` to the method implementation of the interface, and then specify the method names of `confirm` and `cancel`. 

**Example (say method in dubbo needs to participate in distributed transactions):** 

```java
public interface HelloService {

    @Hmily
    void say(String hello);
}

public class HelloServiceImpl implements HelloService  {

    @HmilyTCC(confirmMethod = "sayConfrim", cancelMethod = "sayCancel")
    public void say(String hello) {
         System.out.println("hello world");
    }

    public void sayConfrim(String hello) {
         System.out.println(" confirm hello world");
    }

    public void sayCancel(String hello) {
         System.out.println(" cancel hello world");
    }
}
```

**Example (say method in springcloud needs to participate in distributed transactions):**

* Spring-cloud service caller FeignClient

```java
@FeignClient(value = "helle-service")
public interface HelloService {

    @Hmily
    @RequestMapping("/helle-service/sayHello")
    void say(String hello);
}
```

- Spring-cloud provider

```java
@RestController
public class HelloController {

    private final HelloService helloService ;

    @Autowired
    public AccountController(HelloService helloService) {
        this.helloService= helloService;
    }

    @RequestMapping("/sayHello")
    public void payment(String hello) {
        return helloService.say(hello);
    }
}
public interface HelloService {

    void say(String hello);
}
public class HelloServiceImpl implements HelloService  {

    @HmilyTCC(confirmMethod = "sayConfrim", cancelMethod = "sayCancel")
    public void say(String hello) {
         System.out.println("hello world");
    }

    public void sayConfrim(String hello) {
         System.out.println(" confirm hello world");
    }

    public void sayCancel(String hello) {
         System.out.println(" cancel hello world");
    }
}
```
- **Changes in transaction log storage structure** In use, users don't need to care about using or upgrading, the framework will be initialized by default. 

## Next version

-  -Because of the adjustment of the architecture, it will be easier to support other modes. In the next version, TAC mode (try-auto-cancel) will be released to use this mode, which will greatly simplify the use of the framework. Developers will not You need to care about the development of confirm and cancel methods, and provide better compatibility with the transformation of the old system. Don't worry about additional development tasks, leave everything to hmily. -
- It will support Brpc.
- It will support Tars-rpc.

## Community co-construction

We uphold the principle of harmony and happiness and code first. If you have ideas, you are willing to grow with us and contribute together, come and join us!

* github: https://github.com/dromara/hmily
* gitee: https://gitee.com/shuaiqiyu/hmily
* qq group: 162614487