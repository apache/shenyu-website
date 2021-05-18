---
title: Environment Setup
keywords: shenyu
description: Environment Setup
---

## Features

* ShenYu is an open source plugin framework, which is flexibility and extensibility since 2.2.0 version.
  With shenyu you can easily create application with your own gateway.
* System Requirement: JDK 1.8+, Mysql 5.5.20 +.


## Shenyu-Admin

### remote download

* [2.3.0](https://github.com/dromara/shenyu/releases/tag/2.3.0) download `shenyu-admin-bin-2.3.0-RELEASE.tar.gz`

* tar `shenyu-admin-bin-2.3.0-RELEASE.tar.gz`. cd `/bin`.

* use `h2` store.

```
> windwos : start.bat --spring.profiles.active = h2

> linux : ./start.sh --spring.profiles.active = h2
```

* use `mysql` store.  cd `/conf` and then modify `mysql` config in  `application.yaml`.

```
> windwos : start.bat 

> linux : ./start.sh 
```

### docker

```
> docker pull dromara/shenyu-admin
> docker network create shenyu
```

* use `h2` store
```
> docker run -d -p 9095:9095 --net shenyu dromara/shenyu-admin
```

* use `mysql` store.

```
> docker run -e "SPRING_PROFILES_ACTIVE=mysql" -d -p 9095:9095 --net shenyu dromara/shenyu-admin
```

If you want to override environment variables, you can do like this.

```
docker run -e "SPRING_PROFILES_ACTIVE=mysql" -e "spring.datasource.url=jdbc:mysql://192.168.1.9:3306/shenyu?useUnicode=true&characterEncoding=utf-8&useSSL=false" -e "spring.datasource.password=123456" -d -p 9095:9095 --net shenyu dromara/shenyu-admin
```

Another way, bind volume and mounts

Put your `application.yml` in xxx directory, then run like this.

```
docker run -v D:\tmp\conf:/opt/shenyu-admin/conf/ -d -p 9095:9095 --net shenyu dromara/shenyu-admin
```

### local

* download
```
> git clone https://github.com/dromara/shenyu.git
> cd shenyu
> mvn clean install -Dmaven.javadoc.skip=true -B -Drat.skip=true -Djacoco.skip=true -DskipITs -DskipTests
```

* setup for  `ShenyuAdminBootstrap`.

  * if use h2 store please set env  `--spring.profiles.active = h2`

  * if use mysql store, please modify `mysql` config in  `application.yaml`.


Visit `http://localhost:9095/index.html ` default username：admin  password: 123456.


## Shenyu-Bootstrap

### remote download

* [2.3.0](https://github.com/dromara/shenyu/releases/tag/2.3.0) download `shenyu-bootstrap-bin-2.3.0-RELEASE.tar.gz`

* tar `shenyu-bootstrap-bin-2.3.0-RELEASE.tar.gz`, ant then cd `/bin`.

```
> windwos : start.bat 

> linux : ./start.sh 
```

### docker

```
> docker network create shenyu
> docker pull dromara/shenyu-bootstrap
> docker run -d -p 9195:9195 --net shenyu dromara/shenyu-bootstrap
```

### local

```
> git clone https://github.com/dromara/shenyu.git
> cd shenyu
> mvn clean install -Dmaven.javadoc.skip=true -B -Drat.skip=true -Djacoco.skip=true -DskipITs -DskipTests
```

* setup for `ShenyuBootstrap`.

## Build your own gateway（recommend）

* First of all, create a new Spring Boot project. You can refer to the way how you start the shenyu-bootstrap, or visit [Spring Initializer](https://spring.io/quickstart)

* Add these JAR into your Maven pom.xml:

```xml
  <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-webflux</artifactId>
        <version>2.2.2.RELEASE</version>
  </dependency>

  <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-actuator</artifactId>
        <version>2.2.2.RELEASE</version>
  </dependency>

  <!--shenyu gateway start-->
  <dependency>
        <groupId>org.apache.shenyu</groupId>
        <artifactId>shenyu-spring-boot-starter-gateway</artifactId>
        <version>${last.version}</version>
  </dependency>
  
   <!--shenyu data sync start use websocket-->
   <dependency>
        <groupId>org.apache.shenyu</groupId>
        <artifactId>shenyu-spring-boot-starter-sync-data-websocket</artifactId>
        <version>${last.version}</version>
   </dependency>
```

* Add these config values into your `application.yaml`：

```yaml
spring:
  main:
    allow-bean-definition-overriding: true

management:
  health:
    defaults:
      enabled: false
shenyu:
  sync:
    websocket :
      urls: ws://localhost:9095/websocket  //设置成你的shenyu-admin地址
```
* Environment Setup has finished, now your project is launched.










