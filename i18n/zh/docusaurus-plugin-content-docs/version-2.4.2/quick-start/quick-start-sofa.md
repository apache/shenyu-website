---
title: Sofa快速开始
description: Sofa快速开始
---

本文档演示如何将`Sofa`服务接入到`Apache ShenYu`网关。您可以直接在工程下找到本文档的[示例代码](https://github.com/apache/shenyu/tree/v2.4.2/shenyu-examples/shenyu-examples-sofa) 。

## 环境准备

请参考运维部署的内容，选择一种方式启动`shenyu-admin`。比如，通过 [本地部署](../deployment/deployment-local) 启动`Apache ShenYu`后台管理系统。

启动成功后，需要在基础配置`->`插件管理中，把`sofa` 插件设置为开启，并设置你的注册地址，请确保注册中心在你本地已经开启。

<img src="/img/shenyu/quick-start/sofa/sofa-plugin-enable.png" width="60%" height="50%" />

启动网关，如果是通过源码的方式，直接运行`shenyu-bootstrap`中的`ShenyuBootstrapApplication`。

> 注意，在启动前，请确保网关已经引入相关依赖。

如果客户端是`sofa`，注册中心使用`zookeeper`，请参考如下配置：

```xml
        <!-- apache shenyu sofa plugin start-->
        <dependency>
            <groupId>com.alipay.sofa</groupId>
            <artifactId>sofa-rpc-all</artifactId>
            <version>5.7.6</version>
        </dependency>
        <dependency>
               <groupId>org.apache.curator</groupId>
               <artifactId>curator-client</artifactId>
               <version>4.0.1</version>
           </dependency>
           <dependency>
               <groupId>org.apache.curator</groupId>
               <artifactId>curator-framework</artifactId>
               <version>4.0.1</version>
           </dependency>
           <dependency>
               <groupId>org.apache.curator</groupId>
               <artifactId>curator-recipes</artifactId>
               <version>4.0.1</version>
           </dependency>

        <dependency>
            <groupId>org.apache.shenyu</groupId>
            <artifactId>shenyu-spring-boot-starter-plugin-sofa</artifactId>
            <version>${project.version}</version>
        </dependency>
        <!-- apache shenyu sofa plugin end-->

```

## 运行shenyu-examples-sofa项目

下载 [shenyu-examples-sofa](https://github.com/apache/shenyu/tree/v2.4.2/shenyu-examples/shenyu-examples-sofa)

设置`application.yml`的`zk`注册地址，如：

```xml
com:
  alipay:
    sofa:
      rpc:
        registry-address: zookeeper://127.0.0.1:2181
```

运行`org.apache.shenyu.examples.sofa.service.TestSofaApplication`main方法启动sofa服务。

成功启动会有如下日志：

```shell
2021-02-10 02:31:45.599  INFO 2156 --- [pool-1-thread-1] o.d.s.client.common.utils.RegisterUtils  : sofa client register success: {"appName":"sofa","contextPath":"/sofa","path":"/sofa/insert","pathDesc":"Insert a row of data","rpcType":"sofa","serviceName":"org.dromara.shenyu.examples.sofa.api.service.SofaSingleParamService","methodName":"insert","ruleName":"/sofa/insert","parameterTypes":"org.dromara.shenyu.examples.sofa.api.entity.SofaSimpleTypeBean","rpcExt":"{\"loadbalance\":\"hash\",\"retries\":3,\"timeout\":-1}","enabled":true} 
2021-02-10 02:31:45.605  INFO 2156 --- [pool-1-thread-1] o.d.s.client.common.utils.RegisterUtils  : sofa client register success: {"appName":"sofa","contextPath":"/sofa","path":"/sofa/findById","pathDesc":"Find by Id","rpcType":"sofa","serviceName":"org.dromara.shenyu.examples.sofa.api.service.SofaSingleParamService","methodName":"findById","ruleName":"/sofa/findById","parameterTypes":"java.lang.String","rpcExt":"{\"loadbalance\":\"hash\",\"retries\":3,\"timeout\":-1}","enabled":true} 
2021-02-10 02:31:45.611  INFO 2156 --- [pool-1-thread-1] o.d.s.client.common.utils.RegisterUtils  : sofa client register success: {"appName":"sofa","contextPath":"/sofa","path":"/sofa/findAll","pathDesc":"Get all data","rpcType":"sofa","serviceName":"org.dromara.shenyu.examples.sofa.api.service.SofaSingleParamService","methodName":"findAll","ruleName":"/sofa/findAll","parameterTypes":"","rpcExt":"{\"loadbalance\":\"hash\",\"retries\":3,\"timeout\":-1}","enabled":true} 
2021-02-10 02:31:45.616  INFO 2156 --- [pool-1-thread-1] o.d.s.client.common.utils.RegisterUtils  : sofa client register success: {"appName":"sofa","contextPath":"/sofa","path":"/sofa/batchSaveNameAndId","pathDesc":"","rpcType":"sofa","serviceName":"org.dromara.shenyu.examples.sofa.api.service.SofaMultiParamService","methodName":"batchSaveNameAndId","ruleName":"/sofa/batchSaveNameAndId","parameterTypes":"java.util.List,java.lang.String,java.lang.String#org.dromara.shenyu.examples.sofa.api.entity.SofaSimpleTypeBean","rpcExt":"{\"loadbalance\":\"hash\",\"retries\":3,\"timeout\":-1}","enabled":true} 
2021-02-10 02:31:45.621  INFO 2156 --- [pool-1-thread-1] o.d.s.client.common.utils.RegisterUtils  : sofa client register success: {"appName":"sofa","contextPath":"/sofa","path":"/sofa/saveComplexBeanAndName","pathDesc":"","rpcType":"sofa","serviceName":"org.dromara.shenyu.examples.sofa.api.service.SofaMultiParamService","methodName":"saveComplexBeanAndName","ruleName":"/sofa/saveComplexBeanAndName","parameterTypes":"org.dromara.shenyu.examples.sofa.api.entity.SofaComplexTypeBean,java.lang.String","rpcExt":"{\"loadbalance\":\"hash\",\"retries\":3,\"timeout\":-1}","enabled":true} 
2021-02-10 02:31:45.627  INFO 2156 --- [pool-1-thread-1] o.d.s.client.common.utils.RegisterUtils  : sofa client register success: {"appName":"sofa","contextPath":"/sofa","path":"/sofa/findByArrayIdsAndName","pathDesc":"","rpcType":"sofa","serviceName":"org.dromara.shenyu.examples.sofa.api.service.SofaMultiParamService","methodName":"findByArrayIdsAndName","ruleName":"/sofa/findByArrayIdsAndName","parameterTypes":"[Ljava.lang.Integer;,java.lang.String","rpcExt":"{\"loadbalance\":\"hash\",\"retries\":3,\"timeout\":-1}","enabled":true} 
2021-02-10 02:31:45.632  INFO 2156 --- [pool-1-thread-1] o.d.s.client.common.utils.RegisterUtils  : sofa client register success: {"appName":"sofa","contextPath":"/sofa","path":"/sofa/findByStringArray","pathDesc":"","rpcType":"sofa","serviceName":"org.dromara.shenyu.examples.sofa.api.service.SofaMultiParamService","methodName":"findByStringArray","ruleName":"/sofa/findByStringArray","parameterTypes":"[Ljava.lang.String;","rpcExt":"{\"loadbalance\":\"hash\",\"retries\":3,\"timeout\":-1}","enabled":true} 
2021-02-10 02:31:45.637  INFO 2156 --- [pool-1-thread-1] o.d.s.client.common.utils.RegisterUtils  : sofa client register success: {"appName":"sofa","contextPath":"/sofa","path":"/sofa/saveTwoList","pathDesc":"","rpcType":"sofa","serviceName":"org.dromara.shenyu.examples.sofa.api.service.SofaMultiParamService","methodName":"saveTwoList","ruleName":"/sofa/saveTwoList","parameterTypes":"java.util.List,java.util.Map#org.dromara.shenyu.examples.sofa.api.entity.SofaComplexTypeBean","rpcExt":"{\"loadbalance\":\"hash\",\"retries\":3,\"timeout\":-1}","enabled":true} 
2021-02-10 02:31:45.642  INFO 2156 --- [pool-1-thread-1] o.d.s.client.common.utils.RegisterUtils  : sofa client register success: {"appName":"sofa","contextPath":"/sofa","path":"/sofa/batchSave","pathDesc":"","rpcType":"sofa","serviceName":"org.dromara.shenyu.examples.sofa.api.service.SofaMultiParamService","methodName":"batchSave","ruleName":"/sofa/batchSave","parameterTypes":"java.util.List#org.dromara.shenyu.examples.sofa.api.entity.SofaSimpleTypeBean","rpcExt":"{\"loadbalance\":\"hash\",\"retries\":3,\"timeout\":-1}","enabled":true} 
2021-02-10 02:31:45.647  INFO 2156 --- [pool-1-thread-1] o.d.s.client.common.utils.RegisterUtils  : sofa client register success: {"appName":"sofa","contextPath":"/sofa","path":"/sofa/findByListId","pathDesc":"","rpcType":"sofa","serviceName":"org.dromara.shenyu.examples.sofa.api.service.SofaMultiParamService","methodName":"findByListId","ruleName":"/sofa/findByListId","parameterTypes":"java.util.List","rpcExt":"{\"loadbalance\":\"hash\",\"retries\":3,\"timeout\":-1}","enabled":true} 
2021-02-10 02:31:45.653  INFO 2156 --- [pool-1-thread-1] o.d.s.client.common.utils.RegisterUtils  : sofa client register success: {"appName":"sofa","contextPath":"/sofa","path":"/sofa/saveComplexBean","pathDesc":"","rpcType":"sofa","serviceName":"org.dromara.shenyu.examples.sofa.api.service.SofaMultiParamService","methodName":"saveComplexBean","ruleName":"/sofa/saveComplexBean","parameterTypes":"org.dromara.shenyu.examples.sofa.api.entity.SofaComplexTypeBean","rpcExt":"{\"loadbalance\":\"hash\",\"retries\":3,\"timeout\":-1}","enabled":true} 
2021-02-10 02:31:45.660  INFO 2156 --- [pool-1-thread-1] o.d.s.client.common.utils.RegisterUtils  : sofa client register success: {"appName":"sofa","contextPath":"/sofa","path":"/sofa/findByIdsAndName","pathDesc":"","rpcType":"sofa","serviceName":"org.dromara.shenyu.examples.sofa.api.service.SofaMultiParamService","methodName":"findByIdsAndName","ruleName":"/sofa/findByIdsAndName","parameterTypes":"java.util.List,java.lang.String","rpcExt":"{\"loadbalance\":\"hash\",\"retries\":3,\"timeout\":-1}","enabled":true} 
2021-02-10 02:31:46.055  INFO 2156 --- [           main] o.a.c.f.imps.CuratorFrameworkImpl        : Starting
2021-02-10 02:31:46.059  INFO 2156 --- [           main] org.apache.zookeeper.ZooKeeper           : Client environment:zookeeper.version=3.4.6-1569965, built on 02/20/2014 09:09 GMT
2021-02-10 02:31:46.059  INFO 2156 --- [           main] org.apache.zookeeper.ZooKeeper           : Client environment:host.name=host.docker.internal
2021-02-10 02:31:46.059  INFO 2156 --- [           main] org.apache.zookeeper.ZooKeeper           : Client environment:java.version=1.8.0_211
2021-02-10 02:31:46.059  INFO 2156 --- [           main] org.apache.zookeeper.ZooKeeper           : Client environment:java.vendor=Oracle Corporation
2021-02-10 02:31:46.059  INFO 2156 --- [           main] org.apache.zookeeper.ZooKeeper           : Client environment:java.home=C:\Program Files\Java\jdk1.8.0_211\jre
2021-02-10 02:31:46.059  INFO 2156 --- [           main] org.apache.zookeeper.ZooKeeper           : Client environment:java.class.path=C:\Program Files\Java\jdk1.8.0_211\jre\lib\charsets.jar;C:\Program Files\Java\jdk1.8.0_211\jre\lib\deploy.jar;C:\Program Files\Java\jdk1.8.0_211\jre\lib\ext\access-bridge-64.jar;C:\Program Files\Java\jdk1.8.0_211\jre\lib\ext\cldrdata.jar;C:\Program Files\Java\jdk1.8.0_211\jre\lib\ext\dnsns.jar;C:\Program Files\Java\jdk1.8.0_211\jre\lib\ext\jaccess.jar;C:\Program Files\Java\jdk1.8.0_211\jre\lib\ext\jfxrt.jar;C:\Program Files\Java\jdk1.8.0_211\jre\lib\ext\localedata.jar;C:\Program Files\Java\jdk1.8.0_211\jre\lib\ext\nashorn.jar;C:\Program Files\Java\jdk1.8.0_211\jre\lib\ext\sunec.jar;C:\Program Files\Java\jdk1.8.0_211\jre\lib\ext\sunjce_provider.jar;C:\Program Files\Java\jdk1.8.0_211\jre\lib\ext\sunmscapi.jar;C:\Program Files\Java\jdk1.8.0_211\jre\lib\ext\sunpkcs11.jar;C:\Program Files\Java\jdk1.8.0_211\jre\lib\ext\zipfs.jar;C:\Program Files\Java\jdk1.8.0_211\jre\lib\javaws.jar;C:\Program Files\Java\jdk1.8.0_211\jre\lib\jce.jar;C:\Program Files\Java\jdk1.8.0_211\jre\lib\jfr.jar;C:\Program Files\Java\jdk1.8.0_211\jre\lib\jfxswt.jar;C:\Program Files\Java\jdk1.8.0_211\jre\lib\jsse.jar;C:\Program Files\Java\jdk1.8.0_211\jre\lib\management-agent.jar;C:\Program Files\Java\jdk1.8.0_211\jre\lib\plugin.jar;C:\Program Files\Java\jdk1.8.0_211\jre\lib\resources.jar;C:\Program Files\Java\jdk1.8.0_211\jre\lib\rt.jar;D:\X\dlm_github\shenyu\shenyu-examples\shenyu-examples-sofa\shenyu-examples-sofa-service\target\classes;D:\SOFT\m2\repository\com\alipay\sofa\rpc-sofa-boot-starter\6.0.4\rpc-sofa-boot-starter-6.0.4.jar;D:\SOFT\m2\repository\com\alipay\sofa\rpc-sofa-boot-core\6.0.4\rpc-sofa-boot-core-6.0.4.jar;D:\SOFT\m2\repository\com\alipay\sofa\sofa-rpc-all\5.5.7\sofa-rpc-all-5.5.7.jar;D:\SOFT\m2\repository\com\alipay\sofa\bolt\1.4.6\bolt-1.4.6.jar;D:\SOFT\m2\repository\org\javassist\javassist\3.20.0-GA\javassist-3.20.0-GA.jar;D:\SOFT\m2\repository\io\netty\netty-all\4.1.43.Final\netty-all-4.1.43.Final.jar;D:\SOFT\m2\repository\com\alipay\sofa\hessian\3.3.6\hessian-3.3.6.jar;D:\SOFT\m2\repository\com\alipay\sofa\tracer-core\2.1.2\tracer-core-2.1.2.jar;D:\SOFT\m2\repository\io\opentracing\opentracing-api\0.22.0\opentracing-api-0.22.0.jar;D:\SOFT\m2\repository\io\opentracing\opentracing-noop\0.22.0\opentracing-noop-0.22.0.jar;D:\SOFT\m2\repository\io\opentracing\opentracing-mock\0.22.0\opentracing-mock-0.22.0.jar;D:\SOFT\m2\repository\io\opentracing\opentracing-util\0.22.0\opentracing-util-0.22.0.jar;D:\SOFT\m2\repository\com\alipay\sofa\lookout\lookout-api\1.4.1\lookout-api-1.4.1.jar;D:\SOFT\m2\repository\com\alipay\sofa\runtime-sofa-boot-starter\3.1.4\runtime-sofa-boot-starter-3.1.4.jar;D:\SOFT\m2\repository\org\apache\curator\curator-client\2.9.1\curator-client-2.9.1.jar;D:\SOFT\m2\repository\org\apache\zookeeper\zookeeper\3.4.6\zookeeper-3.4.6.jar;D:\SOFT\m2\repository\log4j\log4j\1.2.16\log4j-1.2.16.jar;D:\SOFT\m2\repository\jline\jline\0.9.94\jline-0.9.94.jar;D:\SOFT\m2\repository\io\netty\netty\3.7.0.Final\netty-3.7.0.Final.jar;D:\SOFT\m2\repository\com\google\guava\guava\16.0.1\guava-16.0.1.jar;D:\SOFT\m2\repository\org\apache\curator\curator-framework\2.9.1\curator-framework-2.9.1.jar;D:\SOFT\m2\repository\org\apache\curator\curator-recipes\2.9.1\curator-recipes-2.9.1.jar;D:\SOFT\m2\repository\org\jboss\resteasy\resteasy-jaxrs\3.0.12.Final\resteasy-jaxrs-3.0.12.Final.jar;D:\SOFT\m2\repository\org\jboss\spec\javax\annotation\jboss-annotations-api_1.1_spec\1.0.1.Final\jboss-annotations-api_1.1_spec-1.0.1.Final.jar;D:\SOFT\m2\repository\javax\activation\activation\1.1.1\activation-1.1.1.jar;D:\SOFT\m2\repository\org\apache\httpcomponents\httpclient\4.5.10\httpclient-4.5.10.jar;D:\SOFT\m2\repository\org\apache\httpcomponents\httpcore\4.4.12\httpcore-4.4.12.jar;D:\SOFT\m2\repository\commons-io\commons-io\2.1\commons-io-2.1.jar;D:\SOFT\m2\repository\net\jcip\jcip-annotations\1.0\jcip-annotations-1.0.jar;D:\SOFT\m2\repository\org\jboss\resteasy\resteasy-client\3.0.12.Final\resteasy-client-3.0.12.Final.jar;D:\SOFT\m2\repository\org\jboss\resteasy\resteasy-jackson-provider\3.0.12.Final\resteasy-jackson-provider-3.0.12.Final.jar;D:\SOFT\m2\repository\org\codehaus\jackson\jackson-core-asl\1.9.12\jackson-core-asl-1.9.12.jar;D:\SOFT\m2\repository\org\codehaus\jackson\jackson-mapper-asl\1.9.12\jackson-mapper-asl-1.9.12.jar;D:\SOFT\m2\repository\org\codehaus\jackson\jackson-jaxrs\1.9.12\jackson-jaxrs-1.9.12.jar;D:\SOFT\m2\repository\org\codehaus\jackson\jackson-xc\1.9.12\jackson-xc-1.9.12.jar;D:\SOFT\m2\repository\org\jboss\resteasy\resteasy-netty4\3.0.12.Final\resteasy-netty4-3.0.12.Final.jar;D:\SOFT\m2\repository\org\jboss\resteasy\resteasy-validator-provider-11\3.0.12.Final\resteasy-validator-provider-11-3.0.12.Final.jar;D:\SOFT\m2\repository\com\fasterxml\classmate\1.5.1\classmate-1.5.1.jar;D:\SOFT\m2\repository\org\jboss\resteasy\jaxrs-api\3.0.12.Final\jaxrs-api-3.0.12.Final.jar;D:\SOFT\m2\repository\org\jboss\resteasy\resteasy-multipart-provider\3.0.12.Final\resteasy-multipart-provider-3.0.12.Final.jar;D:\SOFT\m2\repository\org\jboss\resteasy\resteasy-jaxb-provider\3.0.12.Final\resteasy-jaxb-provider-3.0.12.Final.jar;D:\SOFT\m2\repository\com\sun\xml\bind\jaxb-impl\2.2.7\jaxb-impl-2.2.7.jar;D:\SOFT\m2\repository\com\sun\xml\bind\jaxb-core\2.2.7\jaxb-core-2.2.7.jar;D:\SOFT\m2\repository\javax\xml\bind\jaxb-api\2.3.1\jaxb-api-2.3.1.jar;D:\SOFT\m2\repository\javax\activation\javax.activation-api\1.2.0\javax.activation-api-1.2.0.jar;D:\SOFT\m2\repository\com\sun\istack\istack-commons-runtime\2.16\istack-commons-runtime-2.16.jar;D:\SOFT\m2\repository\com\sun\xml\fastinfoset\FastInfoset\1.2.12\FastInfoset-1.2.12.jar;D:\SOFT\m2\repository\javax\xml\bind\jsr173_api\1.0\jsr173_api-1.0.jar;D:\SOFT\m2\repository\javax\mail\mail\1.5.0-b01\mail-1.5.0-b01.jar;D:\SOFT\m2\repository\org\apache\james\apache-mime4j\0.6\apache-mime4j-0.6.jar;D:\SOFT\m2\repository\commons-logging\commons-logging\1.1.1\commons-logging-1.1.1.jar;D:\SOFT\m2\repository\com\alibaba\dubbo\2.4.10\dubbo-2.4.10.jar;D:\SOFT\m2\repository\org\jboss\netty\netty\3.2.5.Final\netty-3.2.5.Final.jar;D:\SOFT\m2\repository\com\101tec\zkclient\0.10\zkclient-0.10.jar;D:\SOFT\m2\repository\com\alibaba\nacos\nacos-api\1.0.0\nacos-api-1.0.0.jar;D:\SOFT\m2\repository\com\alibaba\fastjson\1.2.47\fastjson-1.2.47.jar;D:\SOFT\m2\repository\org\apache\commons\commons-lang3\3.9\commons-lang3-3.9.jar;D:\SOFT\m2\repository\com\alibaba\nacos\nacos-client\1.0.0\nacos-client-1.0.0.jar;D:\SOFT\m2\repository\com\alibaba\nacos\nacos-common\1.0.0\nacos-common-1.0.0.jar;D:\SOFT\m2\repository\commons-codec\commons-codec\1.13\commons-codec-1.13.jar;D:\SOFT\m2\repository\com\fasterxml\jackson\core\jackson-core\2.10.1\jackson-core-2.10.1.jar;D:\SOFT\m2\repository\com\fasterxml\jackson\core\jackson-databind\2.10.1\jackson-databind-2.10.1.jar;D:\SOFT\m2\repository\com\fasterxml\jackson\core\jackson-annotations\2.10.1\jackson-annotations-2.10.1.jar;D:\SOFT\m2\repository\io\prometheus\simpleclient\0.5.0\simpleclient-0.5.0.jar;D:\SOFT\m2\repository\org\springframework\spring-beans\5.2.2.RELEASE\spring-beans-5.2.2.RELEASE.jar;D:\SOFT\m2\repository\org\springframework\spring-core\5.2.2.RELEASE\spring-core-5.2.2.RELEASE.jar;D:\SOFT\m2\repository\org\springframework\spring-jcl\5.2.2.RELEASE\spring-jcl-5.2.2.RELEASE.jar;D:\SOFT\m2\repository\com\alipay\sofa\infra-sofa-boot-starter\3.1.4\infra-sofa-boot-starter-3.1.4.jar;D:\SOFT\m2\repository\com\alipay\sofa\common\log-sofa-boot-starter\1.0.18\log-sofa-boot-starter-1.0.18.jar;D:\SOFT\m2\repository\org\springframework\spring-context\5.2.2.RELEASE\spring-context-5.2.2.RELEASE.jar;D:\SOFT\m2\repository\org\springframework\spring-aop\5.2.2.RELEASE\spring-aop-5.2.2.RELEASE.jar;D:\SOFT\m2\repository\org\springframework\spring-expression\5.2.2.RELEASE\spring-expression-5.2.2.RELEASE.jar;D:\SOFT\m2\repository\com\alipay\sofa\common\sofa-common-tools\1.0.18\sofa-common-tools-1.0.18.jar;D:\SOFT\m2\repository\org\springframework\boot\spring-boot-starter-validation\2.2.2.RELEASE\spring-boot-starter-validation-2.2.2.RELEASE.jar;D:\SOFT\m2\repository\jakarta\validation\jakarta.validation-api\2.0.1\jakarta.validation-api-2.0.1.jar;D:\SOFT\m2\repository\org\hibernate\validator\hibernate-validator\6.0.18.Final\hibernate-validator-6.0.18.Final.jar;D:\SOFT\m2\repository\org\jboss\logging\jboss-logging\3.4.1.Final\jboss-logging-3.4.1.Final.jar;D:\SOFT\m2\repository\org\apache\tomcat\embed\tomcat-embed-el\9.0.29\tomcat-embed-el-9.0.29.jar;D:\SOFT\m2\repository\org\springframework\boot\spring-boot-autoconfigure\2.2.2.RELEASE\spring-boot-autoconfigure-2.2.2.RELEASE.jar;D:\SOFT\m2\repository\org\springframework\boot\spring-boot\2.2.2.RELEASE\spring-boot-2.2.2.RELEASE.jar;D:\X\dlm_github\shenyu\shenyu-examples\shenyu-examples-sofa\shenyu-examples-sofa-api\target\classes;D:\SOFT\m2\repository\org\projectlombok\lombok\1.18.10\lombok-1.18.10.jar;D:\X\dlm_github\shenyu\shenyu-spring-boot-starter\shenyu-spring-boot-starter-client\shenyu-spring-boot-starter-client-sofa\target\classes;D:\SOFT\m2\repository\org\springframework\boot\spring-boot-starter\2.2.2.RELEASE\spring-boot-starter-2.2.2.RELEASE.jar;D:\SOFT\m2\repository\org\springframework\boot\spring-boot-starter-logging\2.2.2.RELEASE\spring-boot-starter-logging-2.2.2.RELEASE.jar;D:\SOFT\m2\repository\ch\qos\logback\logback-classic\1.2.3\logback-classic-1.2.3.jar;D:\SOFT\m2\repository\ch\qos\logback\logback-core\1.2.3\logback-core-1.2.3.jar;D:\SOFT\m2\repository\org\apache\logging\log4j\log4j-to-slf4j\2.12.1\log4j-to-slf4j-2.12.1.jar;D:\SOFT\m2\repository\org\apache\logging\log4j\log4j-api\2.12.1\log4j-api-2.12.1.jar;D:\SOFT\m2\repository\org\slf4j\jul-to-slf4j\1.7.29\jul-to-slf4j-1.7.29.jar;D:\SOFT\m2\repository\jakarta\annotation\jakarta.annotation-api\1.3.5\jakarta.annotation-api-1.3.5.jar;D:\SOFT\m2\repository\org\yaml\snakeyaml\1.25\snakeyaml-1.25.jar;D:\X\dlm_github\shenyu\shenyu-client\shenyu-client-sofa\target\classes;D:\X\dlm_github\shenyu\shenyu-client\shenyu-client-common\target\classes;D:\X\dlm_github\shenyu\shenyu-common\target\classes;D:\SOFT\m2\repository\org\springframework\boot\spring-boot-starter-json\2.2.2.RELEASE\spring-boot-starter-json-2.2.2.RELEASE.jar;D:\SOFT\m2\repository\org\springframework\spring-web\5.2.2.RELEASE\spring-web-5.2.2.RELEASE.jar;D:\SOFT\m2\repository\com\fasterxml\jackson\datatype\jackson-datatype-jdk8\2.10.1\jackson-datatype-jdk8-2.10.1.jar;D:\SOFT\m2\repository\com\fasterxml\jackson\datatype\jackson-datatype-jsr310\2.10.1\jackson-datatype-jsr310-2.10.1.jar;D:\SOFT\m2\repository\com\fasterxml\jackson\module\jackson-module-parameter-names\2.10.1\jackson-module-parameter-names-2.10.1.jar;D:\SOFT\m2\repository\com\squareup\okhttp3\okhttp\3.14.4\okhttp-3.14.4.jar;D:\SOFT\m2\repository\com\squareup\okio\okio\1.17.2\okio-1.17.2.jar;D:\SOFT\m2\repository\com\google\code\gson\gson\2.8.6\gson-2.8.6.jar;D:\SOFT\m2\repository\org\slf4j\slf4j-api\1.7.29\slf4j-api-1.7.29.jar;D:\SOFT\m2\repository\org\slf4j\jcl-over-slf4j\1.7.29\jcl-over-slf4j-1.7.29.jar;C:\Program Files\JetBrains\IntelliJ IDEA 2019.3.3\lib\idea_rt.jar
2021-02-10 02:31:46.060  INFO 2156 --- [           main] org.apache.zookeeper.ZooKeeper           : Client environment:java.library.path=C:\Program Files\Java\jdk1.8.0_211\bin;C:\Windows\Sun\Java\bin;C:\Windows\system32;C:\Windows;C:\Program Files\Common Files\Oracle\Java\javapath;C:\ProgramData\Oracle\Java\javapath;C:\Program Files (x86)\Common Files\Oracle\Java\javapath;C:\Windows\system32;C:\Windows;C:\Windows\System32\Wbem;C:\Windows\System32\WindowsPowerShell\v1.0\;C:\Windows\System32\OpenSSH\;C:\Program Files\Java\jdk1.8.0_211\bin;C:\Program Files\Java\jdk1.8.0_211\jre\bin;D:\SOFT\apache-maven-3.5.0\bin;C:\Program Files\Go\bin;C:\Program Files\nodejs\;C:\Program Files\Python\Python38\;C:\Program Files\OpenSSL-Win64\bin;C:\Program Files\Git\bin;D:\SOFT\protobuf-2.5.0\src;D:\SOFT\zlib-1.2.8;c:\Program Files (x86)\Microsoft SQL Server\100\Tools\Binn\;c:\Program Files\Microsoft SQL Server\100\Tools\Binn\;c:\Program Files\Microsoft SQL Server\100\DTS\Binn\;C:\Program Files\Docker\Docker\resources\bin;C:\ProgramData\DockerDesktop\version-bin;D:\SOFT\gradle-6.0-all\gradle-6.0\bin;C:\Program Files\mingw-w64\x86_64-8.1.0-posix-seh-rt_v6-rev0\mingw64\bin;D:\SOFT\hugo_extended_0.55.5_Windows-64bit;C:\Users\DLM\AppData\Local\Microsoft\WindowsApps;C:\Users\DLM\go\bin;C:\Users\DLM\AppData\Roaming\npm;;C:\Program Files\Microsoft VS Code\bin;C:\Program Files\nimbella-cli\bin;.
2021-02-10 02:31:46.060  INFO 2156 --- [           main] org.apache.zookeeper.ZooKeeper           : Client environment:java.io.tmpdir=C:\Users\DLM\AppData\Local\Temp\
2021-02-10 02:31:46.060  INFO 2156 --- [           main] org.apache.zookeeper.ZooKeeper           : Client environment:java.compiler=<NA>
2021-02-10 02:31:46.060  INFO 2156 --- [           main] org.apache.zookeeper.ZooKeeper           : Client environment:os.name=Windows 10
2021-02-10 02:31:46.060  INFO 2156 --- [           main] org.apache.zookeeper.ZooKeeper           : Client environment:os.arch=amd64
2021-02-10 02:31:46.060  INFO 2156 --- [           main] org.apache.zookeeper.ZooKeeper           : Client environment:os.version=10.0
2021-02-10 02:31:46.060  INFO 2156 --- [           main] org.apache.zookeeper.ZooKeeper           : Client environment:user.name=DLM
2021-02-10 02:31:46.060  INFO 2156 --- [           main] org.apache.zookeeper.ZooKeeper           : Client environment:user.home=C:\Users\DLM
2021-02-10 02:31:46.060  INFO 2156 --- [           main] org.apache.zookeeper.ZooKeeper           : Client environment:user.dir=D:\X\dlm_github\shenyu
2021-02-10 02:31:46.061  INFO 2156 --- [           main] org.apache.zookeeper.ZooKeeper           : Initiating client connection, connectString=127.0.0.1:21810 sessionTimeout=60000 watcher=org.apache.curator.ConnectionState@3e850122
2021-02-10 02:31:46.069  INFO 2156 --- [27.0.0.1:21810)] org.apache.zookeeper.ClientCnxn          : Opening socket connection to server 127.0.0.1/127.0.0.1:21810. Will not attempt to authenticate using SASL (unknown error)
2021-02-10 02:31:46.071  INFO 2156 --- [27.0.0.1:21810)] org.apache.zookeeper.ClientCnxn          : Socket connection established to 127.0.0.1/127.0.0.1:21810, initiating session
2021-02-10 02:31:46.078  INFO 2156 --- [27.0.0.1:21810)] org.apache.zookeeper.ClientCnxn          : Session establishment complete on server 127.0.0.1/127.0.0.1:21810, sessionid = 0x10005b0d05e0001, negotiated timeout = 40000
2021-02-10 02:31:46.081  INFO 2156 --- [ain-EventThread] o.a.c.f.state.ConnectionStateManager     : State change: CONNECTED
2021-02-10 02:31:46.093  WARN 2156 --- [           main] org.apache.curator.utils.ZKPaths         : The version of ZooKeeper being used doesn't support Container nodes. CreateMode.PERSISTENT will be used instead.
2021-02-10 02:31:46.141  INFO 2156 --- [           main] o.d.s.e.s.service.TestSofaApplication    : Started TestSofaApplication in 3.41 seconds (JVM running for 4.423) 
```

## 测试

`shenyu-examples-sofa`项目成功启动之后会自动把加 `@ShenyuSofaClient` 注解的接口方法注册到网关。

打开`插件列表 -> rpc proxy -> sofa`可以看到插件规则配置列表：


![](/img/shenyu/quick-start/sofa/rule-list.png)

下面使用`postman`模拟`http`的方式来请求你的`sofa`服务：

![](/img/shenyu/quick-start/sofa/postman-findbyid.png)

复杂多参数示例：对应接口实现类为`org.apache.shenyu.examples.sofa.service.impl.SofaMultiParamServiceImpl#batchSaveNameAndId`

```java
@Override
@ShenyuSofaClient(path = "/batchSaveNameAndId")
public SofaSimpleTypeBean batchSaveNameAndId(final List<SofaSimpleTypeBean> sofaTestList, final String id, final String name) {
        SofaSimpleTypeBean simpleTypeBean = new SofaSimpleTypeBean();
        simpleTypeBean.setId(id);
        simpleTypeBean.setName("hello world shenyu sofa param batchSaveAndNameAndId :" + name + ":" + sofaTestList.stream().map(SofaSimpleTypeBean::getName).collect(Collectors.joining("-")));
        return simpleTypeBean;
        }
```

![](/img/shenyu/quick-start/sofa/postman-multiparams.png)
