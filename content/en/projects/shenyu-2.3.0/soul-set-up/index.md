---
title: Environment Setup
keywords: soul
description: Environment Setup
---

## Features

* Soul is an open source plugin framework, which is flexibility and extensibility since 2.2.0 version.
  With soul you can easily create application with your own gateway.
* System Requirement: JDK 1.8+, Mysql 5.5.20 +.


## Soul-Admin

### remote download

* [2.3.0](https://github.com/dromara/soul/releases/tag/2.3.0) download `soul-admin-bin-2.3.0-RELEASE.tar.gz`

* tar `soul-admin-bin-2.3.0-RELEASE.tar.gz`. cd `/bin`.

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
> docker pull dromara/soul-admin
> docker network create soul
```

* use `h2` store
```
> docker run -d -p 9095:9095 --net soul dromara/soul-admin
```

* use `mysql` store.

```
> docker run -e "SPRING_PROFILES_ACTIVE=mysql" -d -p 9095:9095 --net soul dromara/soul-admin
```

If you want to override environment variables, you can do like this.

```
docker run -e "SPRING_PROFILES_ACTIVE=mysql" -e "spring.datasource.url=jdbc:mysql://192.168.1.9:3306/soul?useUnicode=true&characterEncoding=utf-8&useSSL=false" -e "spring.datasource.password=123456" -d -p 9095:9095 --net soul dromara/soul-admin
```

Another way, bind volume and mounts

Put your `application.yml` in xxx directory, then run like this.

```
docker run -v D:\tmp\conf:/opt/soul-admin/conf/ -d -p 9095:9095 --net soul dromara/soul-admin
```

### local

* download
```
> git clone https://github.com/dromara/soul.git
> cd soul
> mvn clean install -Dmaven.javadoc.skip=true -B -Drat.skip=true -Djacoco.skip=true -DskipITs -DskipTests
```

* setup for  `SoulAdminBootstrap`.

  * if use h2 store please set env  `--spring.profiles.active = h2`

  * if use mysql store, please modify `mysql` config in  `application.yaml`.


Visit `http://localhost:9095/index.html ` default username：admin  password: 123456.


## Soul-Bootstrap

### remote download

* [2.3.0](https://github.com/dromara/soul/releases/tag/2.3.0) download `soul-bootstrap-bin-2.3.0-RELEASE.tar.gz`

* tar `soul-bootstrap-bin-2.3.0-RELEASE.tar.gz`, ant then cd `/bin`.

```
> windwos : start.bat 

> linux : ./start.sh 
```

### docker

```
> docker network create soul
> docker pull dromara/soul-bootstrap
> docker run -d -p 9195:9195 --net soul dromara/soul-bootstrap
```

### local

```
> git clone https://github.com/dromara/soul.git
> cd soul
> mvn clean install -Dmaven.javadoc.skip=true -B -Drat.skip=true -Djacoco.skip=true -DskipITs -DskipTests
```

* setup for `SoulBootstrap`.

## Build your own gateway（recommend）

* First of all, create a new Spring Boot project. You can refer to the way how you start the soul-bootstrap, or visit [Spring Initializer](https://spring.io/quickstart)

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

  <!--soul gateway start-->
  <dependency>
        <groupId>org.dromara</groupId>
        <artifactId>soul-spring-boot-starter-gateway</artifactId>
        <version>${last.version}</version>
  </dependency>
  
   <!--soul data sync start use websocket-->
   <dependency>
        <groupId>org.dromara</groupId>
        <artifactId>soul-spring-boot-starter-sync-data-websocket</artifactId>
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
soul :
  sync:
    websocket :
      urls: ws://localhost:9095/websocket  // set your soul-admin address
```
* Environment Setup has finished, now your project is launched.

> Note that only the gateway has been set up, but no plugins have been add. For example, to access HTTP requests, you need to add the Divide plugin, please refer to [Http Plugin](https://shenyu.apache.org/projects/shenyu-2.3.0/http-proxy/) . To access the Dubbo service, you need to add the Dubbo plugin, please refer to [Dubbo Plugin](https://shenyu.apache.org/projects/shenyu-2.3.0/dubbo-proxy/) .









