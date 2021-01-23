---
title: Tars Quick Start
keywords: tars
description: Tars Quick Start
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

# Setting tars nodes

Build tars nodes with following information refering to [here](https://tarscloud.github.io/TarsDocs/dev/tarsjava/tars-quick-start.html):

- APP: TestInventory, Server Name: InventoryApp, OBJ: InventoryObj, Port: 29740
- APP: HmilyAccount, Server Name: AccountApp, OBJ: AccountObj, Port: 10386

With nodes built, run `mvn clean package` packaging command respectively under hmily-demo-tars-springboot-account and hmily-demo-tars-springboot-inventory directories, and publish with outputs on previous nodes set. Refer to [here](https://tarscloud.github.io/TarsDocs/dev/tarsjava/tars-quick-start.html) for details.

# Open with Your Favourite Editor (IDEA) and Locate on hmily-demo-tars Module

## Configuring（hmily-demo-tars-account module for instance）

- Configure with your business database(account module for instance)

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

- Replace `192.168.41.102` globally with tars platform IP address within file(s) suffixed with `config.conf` under rescouces directory, and append an `-Dconfig=<file>` parameter to bootstrap parameters with previous file location(s)

- run TarsHmilyAccountApplication.java

### Run hmily-demo-tars-springboot-inventory(refer to simillar instructions above).

### Run hmily-demo-tars-springboot-order(refer to simillar instructions above).

### Access on http://127.0.0.1:18087/swagger-ui.html for more.
