---
title: SpringCloud Quick Start
keywords: SpringCloud
description: Hmily-SpringCloud Quick Start for Distributed Transactions
---

# Prerequisites

- #### JDK 1.8+

- #### Maven 3.2.x

- #### Git

# Cloning the GitHub Repository and Quick Installation

```
  > git clone https://github.com/dromara/hmily.git

  > cd hmily

  > mvn -DskipTests clean install -U
```

# Executing SQL(s) in Demo Module

[sql] (https://github.com/dromara/hmily/blob/master/hmily-demo/sql/hmily-demo.sql)

# Open with Your Favourite Editor (IDEA), Locate on hmily-demo-dubbo Module and Run Build with Maven

## Run with EurekaServerApplication.java in hmily-demo-springcloud-eureka project.

## Configuring（hmily-demo-springcloud-account module for instance）

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

- run SpringCloudHmilyAccountApplication.java

### Run hmily-demo-springcloud-inventory(refer to simillar instructions above).

### Run hmily-demo-springcloud-order(refer to simillar instructions above).

### Access on http://127.0.0.1:8884/swagger-ui.html for more.
