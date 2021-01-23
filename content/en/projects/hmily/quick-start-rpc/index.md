---
title: sofa-rpc Quick Start
keywords: sofa-rpc
description: sofa-rpc Quick Start
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

# Open with Your Favourite Editor (IDEA), Locate on hmily-demo-sofa Module and Run Build with Maven

## Configuring（hmily-demo-sofa-account module for instance）

- Configure with your business database in `application.yml`

```yml
spring:
  datasource:
    driver-class-name: com.mysql.jdbc.Driver
    url: jdbc:mysql://<db_host_ip>:<db_host_port>/hmily_account?useUnicode=true&characterEncoding=utf8 # replace with your db_host_ip and db_host_port
    username: root # replace with your db username
    password: your_password # replace with your db user password
```

- Configure with sofa-rpc registration address(es) in `application.yml` (can run with local zookeeper instance(s))

```yml
com:
  alipay:
    sofa:
      rpc:
        registry-address: zookeeper://127.0.0.1:2181
        bolt-port: 8888
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

- run SofaHmilyAccountApplication.java

### Run hmily-demo-sofa-inventory(refer to simillar instructions above).

### Run hmily-demo-sofa-order(refer to simillar instructions above).

### Access on http://127.0.0.1:8089/swagger-ui.html for more.
