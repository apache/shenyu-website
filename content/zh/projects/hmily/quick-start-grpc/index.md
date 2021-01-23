---
title: Grpc快速体验
keywords: Grpc
description: Grpc快速体验
---

# 环境准备

  *   #### JDK 1.8+

  *   #### Maven 3.2.x

  *   #### Git
  
  *   #### Zookeeper

# 代码拉取

 ```
   > git clone https://github.com/dromara/hmily.git

   > cd hmily

   > mvn -DskipTests clean install -U
   ```

# 执行demo 模块的sql语句。

   [sql语句] (https://github.com/dromara/hmily/blob/master/hmily-demo/sql/hmily-demo.sql) 

# 使用你的工具 idea 打开项目，找到hmily-demo-grpc项目。

## 修改项目配置（hmily-demo-grpc-account为列子）

* 修改业务数据库(account项目为列子)

```yml
spring:
    datasource:
        driver-class-name:  com.mysql.jdbc.Driver
        url: jdbc:mysql://改成你的ip+端口/hmily_account?useUnicode=true&characterEncoding=utf8
        username:  #改成你的用户名
        password:  #改成你的密码
```

* 修改 `hmily.yml`,这里使用`mysql`来存储

```yml
repository:
  database:
    driverClassName: com.mysql.jdbc.Driver
    url : jdbc:mysql://改成你的ip+端口/hmily?useUnicode=true&characterEncoding=utf8
    username: root #改成你的用户名
    password: #改成你的密码

```

 * run GrpcHmilyAccountApplication.java

## 启动hmily-demo-tars-springboot-inventory 参考上述。

## 启动hmily-demo-tars-springboot-order 参考上述。

## 访问：http://127.0.0.1:28087/swagger-ui.html。

