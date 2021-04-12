---
title: 环境搭建
keywords: soul
description: 环境搭建
---

## 说明

* soul 2.2.0以后都是基于插件化可插拔的思想，本文是说明如何基于soul搭建属于你自己网关。
* 请确保你的机器安装了JDK 1.8+，Mysql 5.0 + 。

## 启动 Soul-Admin

### 远程下载

* [2.3.0](https://github.com/dromara/soul/releases/tag/2.3.0) 下载 `soul-admin-bin-2.3.0-RELEASE.tar.gz`

* 解压缩 `soul-admin-bin-2.3.0-RELEASE.tar.gz`。 进入 bin 目录。

* 使用 `h2` 来存储后台数据

```
> windwos : start.bat --spring.profiles.active = h2

> linux : ./start.sh --spring.profiles.active = h2
```

* 使用 `mysql` 来存储后台数据。 进入 `/conf` 目录，修改 `application.yaml` 中`mysql` 的配置。

```
> windwos : start.bat 

> linux : ./start.sh 
```

### docker构建

```
> docker pull dromara/soul-admin
> docker network create soul
```

* 使用 `h2` 来存储后台数据
```
> docker run -d -p 9095:9095 --net soul dromara/soul-admin
```

* 使用 `mysql` 来存储后台数据。

```
> docker run -d -p 9095:9095 --net soul dromara/soul-admin -e SPRING_PROFILES_ACTIVE=mysql
```

如果你想覆盖环境变量，你可以这样操作。

```
> docker run -e "SPRING_PROFILES_ACTIVE=mysql" -e "spring.datasource.url=jdbc:mysql://192.168.1.9:3306/soul?useUnicode=true&characterEncoding=utf-8&useSSL=false" -e "spring.datasource.password=123456" -d -p 9095:9095 --net soul dromara/soul-admin
```

另外一种方式，可以挂载你本地磁盘其他目录

把你的`application.yml`配置放到xxx目录， 然后执行以下语句。

```
docker run -v D:\tmp\conf:/opt/soul-admin/conf/ -d -p 9095:9095 --net soul dromara/soul-admin
```

### 本地构建

* 下载代码
```
> git clone https://github.com/dromara/soul.git
> cd soul
```

* 编译代码
```
> mvn clean install -Dmaven.javadoc.skip=true -B -Drat.skip=true -Djacoco.skip=true -DskipITs -DskipTests
```

* 启动 `SoulAdminBootstrap`。 

   * 如果使用h2来存储，设置变量 `--spring.profiles.active = h2`
   
   * 如果使用mysql来存储，修改 `application.yaml` 中的 `mysql` 配置。
   

访问 http://localhost:9095   用户名密码为: `admin/123456`


## 启动 Soul-Bootstrap

### 远程下载

* [2.3.0](https://github.com/dromara/soul/releases/tag/2.3.0) 下载 `soul-bootstrap-bin-2.3.0-RELEASE.tar.gz`

* 解压缩 `soul-bootstrap-bin-2.3.0-RELEASE.tar.gz`。 进入 bin 目录。

```
> windwos : start.bat 

> linux : ./start.sh 
```

### docker构建

```
> docker network create soul
> docker pull dromara/soul-bootstrap
> docker run -d -p 9195:9195 --net soul dromara/soul-bootstrap
```

### 本地构建

* 下载代码
```
> git clone https://github.com/dromara/soul.git
> cd soul
```

* 编译代码
```
> mvn clean install -Dmaven.javadoc.skip=true -B -Drat.skip=true -Djacoco.skip=true -DskipITs -DskipTests
```

* 启动 `SoulBootstrap`。 

## 搭建自己的网关（推荐）

* 首先你新建一个空的springboot项目，可以参考 soul-bootstrap. 也可以在spring官网:[https://spring.io/quickstart]

* 引入如下jar包：

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
* 在你的 `application.yaml` 文件中加上如下配置：

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
      urls: ws://localhost:9095/websocket  //设置成你的soul-admin地址
```
* 你的项目环境搭建完成，启动你的项目。










