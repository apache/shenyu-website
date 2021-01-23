---
title: Grpc Quick Start
keywords: Grpc
description: Grpc Quick Start
---

# Prerequisites

- #### JDK 1.8+

- #### Maven 3.2.x

- #### Git

- #### Zookeeper

# Cloning the GitHub Repository and Quick Installation

```
  > git clone https://github.com/dromara/hmily.git

  > cd hmily

  > mvn -DskipTests clean install -U
```

# Executing SQL(s) in Demo Module

[sql] (https://github.com/dromara/hmily/blob/master/hmily-demo/sql/hmily-demo.sql)

# Open with Your Favourite Editor (IDEA) and Locate on hmily-demo-grpc Module

## Configuring（hmily-demo-grpc-accoun module for instance）

- Configure with your business database (account module for instance)

```yml
spring:
  datasource:
    driver-class-name: com.mysql.jdbc.Driver
    url: jdbc:mysql://<db_host_ip>:<db_host_port>/hmily_account?useUnicode=true&characterEncoding=utf8 # replace with your db_host_ip and db_host_port
    username: root # replace with your db username
    password: your_password # replace with your db user password
```

- Modify `hmily.yml`, with `mysql` persistence backend

```yml
repository:
  database:
    driverClassName: com.mysql.jdbc.Driver
    url: jdbc:mysql://<db_host_ip>:<db_host_port>/hmily?useUnicode=true&characterEncoding=utf8 # replace with your db_host_ip and db_host_port
    username: root # replace with your db username
    password: your_password # replace with your db user password
```

- run GrpcHmilyAccountApplication.java

## Run hmily-demo-tars-springboot-inventory(refer to simillar instructions above).

## Run hmily-demo-tars-springboot-order(refer to simillar instructions above).

## Access on http://127.0.0.1:28087/swagger-ui.html for more.
