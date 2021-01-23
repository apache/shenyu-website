---
title: sofa-rpc快速体验
keywords: sofa-rpc
description: sofa-rpc快速体验
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


# 使用你的工具 idea 打开项目，找到hmily-demo-sofa项目，进行maven构建。

## 修改项目配置（hmily-demo-sofa-account为列子）

* `application.yml` 下修改业务数据库

```yml
spring:
    datasource:
        driver-class-name:  com.mysql.jdbc.Driver
        url: jdbc:mysql://改成你的ip+端口/hmily_account?useUnicode=true&characterEncoding=utf8
        username:  #改成你的用户名
        password:  #改成你的密码
```

* `application.yml` 下修改sofa-rpc的注册中心地址(可以在自己电脑本地启动一个zookeeper服务)

```yml
com:
  alipay:
    sofa:
      rpc:
        registry-address: zookeeper://127.0.0.1:2181
        bolt-port: 8888
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

* run SofaHmilyAccountApplication.java

### 启动hmily-demo-sofa-inventory 参考上述。

### 启动hmily-demo-sofa-order 参考上述。

### 访问：http://127.0.0.1:8089/swagger-ui.html。

