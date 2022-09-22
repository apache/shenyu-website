---
sidebar_position: 4
title: K8s部署
keywords: ["k8s"]
description: K8s部署
---

本文介绍使用 `K8s` 来部署 `Apache ShenYu` 网关。

> 目录
>
> 示例一. 使用 h2 作为数据库
>
> 	1. 创建 Namespace 和 ConfigMap
> 	2. 部署 shenyu-admin
> 	3. 部署 shenyu-bootstrap
> 示例二. 使用 MySQL 作为数据库
>
> 和 h2 过程类似，需要额外注意的两个地方：
>
> 	1. 需要下载 mysql-connector.jar，容器启动时会执行下载命令
> 	2. 需要指定外部 MySQL 数据库配置，通过 Endpoints 来代理外部 MySQL 数据库
> 
> 具体流程如下：
> 
> 	1. 创建 Namespace和 ConfigMap
> 	2. 创建 Endpoints 代理外部 MySQL
> 	3. 部署 shenyu-admin
> 	4. 部署 shenyu-bootstrap

## 示例一：使用 h2 作为数据库

### 1. 创建 Namespace 和 ConfigMap

> 创建 Namespace 和网关用到的配置文件

- 创建文件 shenyu-ns.yaml

```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: shenyu
  labels:
    name: shenyu
---
apiVersion: v1
kind: ConfigMap
metadata:
  name: shenyu-cm
  namespace: shenyu
data:
  shenyu-admin-application.yml: |
    server:
      port: 9095
      address: 0.0.0.0
    spring:
      profiles:
        active: h2
      thymeleaf:
        cache: true
        encoding: utf-8
        enabled: true
        prefix: classpath:/static/
        suffix: .html
      mvc:
        pathmatch:
          matching-strategy: ant_path_matcher
    mybatis:
      config-location: classpath:/mybatis/mybatis-config.xml
      mapper-locations: classpath:/mappers/*.xml
    shenyu:
      register:
        registerType: http #http #zookeeper #etcd #nacos #consul
        serverLists: #localhost:2181 #http://localhost:2379 #localhost:8848
        props:
          sessionTimeout: 5000
          connectionTimeout: 2000
          checked: true
          zombieCheckTimes: 5
          scheduledTime: 10
          nacosNameSpace: ShenyuRegisterCenter
      sync:
        websocket:
          enabled: true
          messageMaxSize: 10240
          allowOrigins: ws://shenyu-admin-svc.shenyu.svc.cluster.local:9095;ws://shenyu-bootstrap-svc.shenyu.svc.cluster.local:9195;
      ldap:
        enabled: false
        url: ldap://xxxx:xxx
        bind-dn: cn=xxx,dc=xxx,dc=xxx
        password: xxxx
        base-dn: ou=xxx,dc=xxx,dc=xxx
        object-class: person
        login-field: cn
      jwt:
        expired-seconds: 86400000
      shiro:
        white-list:
          - /
          - /favicon.*
          - /static/**
          - /index**
          - /platform/login
          - /websocket
          - /error
          - /actuator/health
          - /swagger-ui.html
          - /webjars/**
          - /swagger-resources/**
          - /v2/api-docs
          - /csrf
      swagger:
        enable: true
      apidoc:
        gatewayUrl: http://127.0.0.1:9195
        envProps:
          - envLabel: Test environment
            addressLabel: Request Address
            addressUrl: http://127.0.0.1:9195
          - envLabel: Prod environment
            addressLabel: Request Address
            addressUrl: http://127.0.0.1:9195
    logging:
      level:
        root: info
        org.springframework.boot: info
        org.apache.ibatis: info
        org.apache.shenyu.bonuspoint: info
        org.apache.shenyu.lottery: info
        org.apache.shenyu: info
  shenyu-admin-application-h2.yml: |
    shenyu:
      database:
        dialect: h2
        init_script: "sql-script/h2/schema.sql"
        init_enable: true
    spring:
      datasource:
        url: jdbc:h2:mem:~/shenyu;DB_CLOSE_DELAY=-1;MODE=MySQL;
        username: sa
        password: sa
        driver-class-name: org.h2.Driver
  shenyu-bootstrap-application.yml: |
    server:
      port: 9195
      address: 0.0.0.0
    spring:
      main:
        allow-bean-definition-overriding: true
        allow-circular-references: true
      application:
        name: shenyu-bootstrap
      codec:
        max-in-memory-size: 2MB
      cloud:
        discovery:
          enabled: false
        nacos:
          discovery:
            server-addr: 127.0.0.1:8848 # Spring Cloud Alibaba Dubbo use this.
            enabled: false
            namespace: ShenyuRegisterCenter
    eureka:
      client:
        enabled: false
        serviceUrl:
          defaultZone: http://localhost:8761/eureka/
      instance:
        prefer-ip-address: true
    management:
      health:
        defaults:
          enabled: false
    shenyu:
      matchCache:
        enabled: false
        maxFreeMemory: 256 # 256MB
      netty:
        http:
          # set to false, user can custom the netty tcp server config.
          webServerFactoryEnabled: true
          selectCount: 1
          workerCount: 4
          accessLog: false
          serverSocketChannel:
            soRcvBuf: 87380
            soBackLog: 128
            soReuseAddr: false
            connectTimeoutMillis: 10000
            writeBufferHighWaterMark: 65536
            writeBufferLowWaterMark: 32768
            writeSpinCount: 16
            autoRead: false
            allocType: "pooled"
            messageSizeEstimator: 8
            singleEventExecutorPerGroup: true
          socketChannel:
            soKeepAlive: false
            soReuseAddr: false
            soLinger: -1
            tcpNoDelay: true
            soRcvBuf: 87380
            soSndBuf: 16384
            ipTos: 0
            allowHalfClosure: false
            connectTimeoutMillis: 10000
            writeBufferHighWaterMark: 65536
            writeBufferLowWaterMark: 32768
            writeSpinCount: 16
            autoRead: false
            allocType: "pooled"
            messageSizeEstimator: 8
            singleEventExecutorPerGroup: true
      instance:
        enabled: false
        registerType: zookeeper #etcd #consul
        serverLists: localhost:2181 #http://localhost:2379 #localhost:8848
        props:
      cross:
        enabled: true
        allowedHeaders:
        allowedMethods: "*"
        allowedAnyOrigin: true # the same of Access-Control-Allow-Origin: "*"
        allowedExpose: ""
        maxAge: "18000"
        allowCredentials: true
      switchConfig:
        local: true
      file:
        enabled: true
        maxSize : 10
      sync:
        websocket:
          urls: ws://shenyu-admin-svc.shenyu.svc.cluster.local:9095/websocket
          allowOrigin: ws://shenyu-bootstrap-svc.shenyu.svc.cluster.local:9195
      exclude:
        enabled: false
        paths:
          - /favicon.ico
      fallback:
        enabled: false
        paths:
          - /fallback/hystrix
          - /fallback/resilience4j
      health:
        enabled: false
        paths:
          - /actuator/health
          - /health_check
      extPlugin:
        path:
        enabled: true
        threads: 1
        scheduleTime: 300
        scheduleDelay: 30
      scheduler:
        enabled: false
        type: fixed
        threads: 16
      upstreamCheck:
        enabled: false
        timeout: 3000
        healthyThreshold: 1
        unhealthyThreshold: 1
        interval: 5000
        printEnabled: true
        printInterval: 60000
      ribbon:
        serverListRefreshInterval: 10000
      metrics:
        enabled: false
        name : prometheus
        host: 127.0.0.1
        port: 8090
        jmxConfig:
        props:
          jvm_enabled: true
      local:
        enabled: false
        sha512Key: "BA3253876AED6BC22D4A6FF53D8406C6AD864195ED144AB5C87621B6C233B548BAEAE6956DF346EC8C17F5EA10F35EE3CBC514797ED7DDD3145464E2A0BAB413"
    logging:
      level:
        root: info
        org.springframework.boot: info
        org.apache.ibatis: info
        org.apache.shenyu.bonuspoint: info
        org.apache.shenyu.lottery: info
        org.apache.shenyu: info

```

- 执行 `kubectl apply -f shenyu-ns.yaml`

### 2. 部署 shenyu-admin

> 创建网关管理服务

- 创建文件 shenyu-admin.yaml

```yaml
# 示例使用 nodeport 方式暴露端口
apiVersion: v1
kind: Service
metadata:
  namespace: shenyu
  name: shenyu-admin-svc
spec:
  selector:
    app: shenyu-admin
  type: NodePort
  ports:
  - protocol: TCP
    port: 9095
    targetPort: 9095
    nodePort: 31095
---
# shenyu-admin
apiVersion: apps/v1
kind: Deployment
metadata:
  namespace: shenyu
  name: shenyu-admin
spec:
  selector:
    matchLabels:
      app: shenyu-admin
  replicas: 1
  template:
    metadata:
      labels:
        app: shenyu-admin
    spec:
      volumes:
      - name: shenyu-admin-application
        configMap:
          name: shenyu-cm
          items:
          - key: shenyu-admin-application.yml
            path: shenyu-admin-application.yml
      - name: shenyu-admin-application-h2
        configMap:
          name: shenyu-cm
          items:
          - key: shenyu-admin-application-h2.yml
            path: shenyu-admin-application-h2.yml
      containers:
      - name: shenyu-admin
        image: apache/shenyu-admin:2.5.0
        imagePullPolicy: Always
        ports:
        - containerPort: 9095
        env:
        - name: 'TZ'
          value: 'Asia/Beijing'
        volumeMounts:
        - name: shenyu-admin-application
          mountPath: /opt/shenyu-admin/conf/application.yml
          subPath: shenyu-admin-application.yml
        - name: shenyu-admin-application-h2
          mountPath: /opt/shenyu-admin/conf/application-h2.yml
          subPath: shenyu-admin-application-h2.yml
```

- 执行`kubectl apply -f shenyu-admin.yaml`

### 3. 部署 shenyu-bootstrap

> 创建网关服务

- 创建文件 shenyu-bootstrap.yaml

```yaml
# 示例使用 nodeport 方式暴露端口
apiVersion: v1
kind: Service
metadata:
  namespace: shenyu
  name: shenyu-bootstrap-svc
spec:
  selector:
    app: shenyu-bootstrap
  type: NodePort
  ports:
  - protocol: TCP
    port: 9195
    targetPort: 9195
    nodePort: 31195
---
# shenyu-bootstrap
apiVersion: apps/v1
kind: Deployment
metadata:
  namespace: shenyu
  name: shenyu-bootstrap
spec:
  selector:
    matchLabels:
      app: shenyu-bootstrap
  replicas: 1
  template:
    metadata:
      labels:
        app: shenyu-bootstrap
    spec:
      volumes:
      - name: shenyu-bootstrap-application
        configMap:
          name: shenyu-cm
          items:
          - key: shenyu-bootstrap-application.yml
            path: shenyu-bootstrap-application.yml
      containers:
      - name: shenyu-bootstrap
        image: apache/shenyu-bootstrap:2.5.0
        ports:
        - containerPort: 9195
        env:
        - name: TZ
          value: Asia/Beijing
        volumeMounts:
        - name: shenyu-bootstrap-application
          mountPath: /opt/shenyu-bootstrap/conf/application.yml
          subPath: shenyu-bootstrap-application.yml
```

- 执行 `kubectl apply -f shenyu-bootstrap.yaml`

## 示例二：使用 MySQL 作为数据库

### 1. 创建 Namespace和 ConfigMap

- 创建文件 shenyu-ns.yaml

```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: shenyu
  labels:
    name: shenyu
---
apiVersion: v1
kind: ConfigMap
metadata:
  name: shenyu-cm
  namespace: shenyu
data:
  shenyu-admin-application.yml: |
    server:
      port: 9095
      address: 0.0.0.0
    spring:
      profiles:
        active: mysql
      thymeleaf:
        cache: true
        encoding: utf-8
        enabled: true
        prefix: classpath:/static/
        suffix: .html
      mvc:
        pathmatch:
          matching-strategy: ant_path_matcher
    mybatis:
      config-location: classpath:/mybatis/mybatis-config.xml
      mapper-locations: classpath:/mappers/*.xml
    shenyu:
      register:
        registerType: http #http #zookeeper #etcd #nacos #consul
        serverLists: #localhost:2181 #http://localhost:2379 #localhost:8848
        props:
          sessionTimeout: 5000
          connectionTimeout: 2000
          checked: true
          zombieCheckTimes: 5
          scheduledTime: 10
          nacosNameSpace: ShenyuRegisterCenter
      sync:
        websocket:
          enabled: true
          messageMaxSize: 10240
          allowOrigins: ws://shenyu-admin-svc.shenyu.svc.cluster.local:9095;ws://shenyu-bootstrap-svc.shenyu.svc.cluster.local:9195;
      ldap:
        enabled: false
        url: ldap://xxxx:xxx
        bind-dn: cn=xxx,dc=xxx,dc=xxx
        password: xxxx
        base-dn: ou=xxx,dc=xxx,dc=xxx
        object-class: person
        login-field: cn
      jwt:
        expired-seconds: 86400000
      shiro:
        white-list:
          - /
          - /favicon.*
          - /static/**
          - /index**
          - /platform/login
          - /websocket
          - /error
          - /actuator/health
          - /swagger-ui.html
          - /webjars/**
          - /swagger-resources/**
          - /v2/api-docs
          - /csrf
      swagger:
        enable: true
      apidoc:
        gatewayUrl: http://127.0.0.1:9195
        envProps:
          - envLabel: Test environment
            addressLabel: Request Address
            addressUrl: http://127.0.0.1:9195
          - envLabel: Prod environment
            addressLabel: Request Address
            addressUrl: http://127.0.0.1:9195
    logging:
      level:
        root: info
        org.springframework.boot: info
        org.apache.ibatis: info
        org.apache.shenyu.bonuspoint: info
        org.apache.shenyu.lottery: info
        org.apache.shenyu: info
  shenyu-admin-application-mysql.yml: |
    shenyu:
      database:
        dialect: mysql
        init_script: "sql-script/mysql/schema.sql"
        init_enable: true
    spring:
      datasource:
        url: jdbc:mysql://mysql.shenyu.svc.cluster.local:3306/shenyu?useUnicode=true&characterEncoding=utf-8&useSSL=false
        username: {your_mysql_user}
        password: {your_mysql_password}
        driver-class-name: com.mysql.jdbc.Driver
  shenyu-bootstrap-application.yml: |
    server:
      port: 9195
      address: 0.0.0.0
    spring:
      main:
        allow-bean-definition-overriding: true
        allow-circular-references: true
      application:
        name: shenyu-bootstrap
      codec:
        max-in-memory-size: 2MB
      cloud:
        discovery:
          enabled: false
        nacos:
          discovery:
            server-addr: 127.0.0.1:8848 # Spring Cloud Alibaba Dubbo use this.
            enabled: false
            namespace: ShenyuRegisterCenter
    eureka:
      client:
        enabled: false
        serviceUrl:
          defaultZone: http://localhost:8761/eureka/
      instance:
        prefer-ip-address: true
    management:
      health:
        defaults:
          enabled: false
    shenyu:
      matchCache:
        enabled: false
        maxFreeMemory: 256 # 256MB
      netty:
        http:
          # set to false, user can custom the netty tcp server config.
          webServerFactoryEnabled: true
          selectCount: 1
          workerCount: 4
          accessLog: false
          serverSocketChannel:
            soRcvBuf: 87380
            soBackLog: 128
            soReuseAddr: false
            connectTimeoutMillis: 10000
            writeBufferHighWaterMark: 65536
            writeBufferLowWaterMark: 32768
            writeSpinCount: 16
            autoRead: false
            allocType: "pooled"
            messageSizeEstimator: 8
            singleEventExecutorPerGroup: true
          socketChannel:
            soKeepAlive: false
            soReuseAddr: false
            soLinger: -1
            tcpNoDelay: true
            soRcvBuf: 87380
            soSndBuf: 16384
            ipTos: 0
            allowHalfClosure: false
            connectTimeoutMillis: 10000
            writeBufferHighWaterMark: 65536
            writeBufferLowWaterMark: 32768
            writeSpinCount: 16
            autoRead: false
            allocType: "pooled"
            messageSizeEstimator: 8
            singleEventExecutorPerGroup: true
      instance:
        enabled: false
        registerType: zookeeper #etcd #consul
        serverLists: localhost:2181 #http://localhost:2379 #localhost:8848
        props:
      cross:
        enabled: true
        allowedHeaders:
        allowedMethods: "*"
        allowedAnyOrigin: true # the same of Access-Control-Allow-Origin: "*"
        allowedExpose: ""
        maxAge: "18000"
        allowCredentials: true
      switchConfig:
        local: true
      file:
        enabled: true
        maxSize : 10
      sync:
        websocket:
          urls: ws://shenyu-admin-svc.shenyu.svc.cluster.local:9095/websocket
          allowOrigin: ws://shenyu-bootstrap-svc.shenyu.svc.cluster.local:9195
      exclude:
        enabled: false
        paths:
          - /favicon.ico
      fallback:
        enabled: false
        paths:
          - /fallback/hystrix
          - /fallback/resilience4j
      health:
        enabled: false
        paths:
          - /actuator/health
          - /health_check
      extPlugin:
        path:
        enabled: true
        threads: 1
        scheduleTime: 300
        scheduleDelay: 30
      scheduler:
        enabled: false
        type: fixed
        threads: 16
      upstreamCheck:
        enabled: false
        timeout: 3000
        healthyThreshold: 1
        unhealthyThreshold: 1
        interval: 5000
        printEnabled: true
        printInterval: 60000
      ribbon:
        serverListRefreshInterval: 10000
      metrics:
        enabled: false
        name : prometheus
        host: 127.0.0.1
        port: 8090
        jmxConfig:
        props:
          jvm_enabled: true
      local:
        enabled: false
        sha512Key: "BA3253876AED6BC22D4A6FF53D8406C6AD864195ED144AB5C87621B6C233B548BAEAE6956DF346EC8C17F5EA10F35EE3CBC514797ED7DDD3145464E2A0BAB413"
    logging:
      level:
        root: info
        org.springframework.boot: info
        org.apache.ibatis: info
        org.apache.shenyu.bonuspoint: info
        org.apache.shenyu.lottery: info
        org.apache.shenyu: info
```

- 执行 `kubectl apply -f shenyu-ns.yaml`

### 2. 创建 Endpoints 代理外部 MySQL

- 初始化数据库[部署先决条件](./deployment-before.md) 

- 创建文件 shenyu-ep.yaml

```yaml
kind: Service
apiVersion: v1
metadata:
  name: mysql
  namespace: shenyu
spec:
  ports:
  - port: 3306
    name: mysql
    targetPort: {your_mysql_port}
---
kind: Endpoints
apiVersion: v1
metadata:
  name: mysql
  namespace: shenyu
subsets:
- addresses:
  - ip: {your_mysql_ip}
  ports:
  - port: {your_mysql_port}
    name: mysql
```

- 执行 `kubectl apply -f shenyu-ep.yaml`

### 3. 部署 shenyu-admin

- 创建文件 shenyu-admin.yaml

```yaml
# 示例使用 nodeport 方式暴露端口
apiVersion: v1
kind: Service
metadata:
  namespace: shenyu
  name: shenyu-admin-svc
spec:
  selector:
    app: shenyu-admin
  type: NodePort
  ports:
  - protocol: TCP
    port: 9095
    targetPort: 9095
    nodePort: 31095
---
# shenyu-admin
apiVersion: apps/v1
kind: Deployment
metadata:
  namespace: shenyu
  name: shenyu-admin
spec:
  selector:
    matchLabels:
      app: shenyu-admin
  replicas: 1
  template:
    metadata:
      labels:
        app: shenyu-admin
    spec:
      volumes:
      - name: shenyu-admin-application
        configMap:
          name: shenyu-cm
          items:
          - key: shenyu-admin-application.yml
            path: shenyu-admin-application.yml
      - name: shenyu-admin-application-mysql
        configMap:
          name: shenyu-cm
          items:
          - key: shenyu-admin-application-mysql.yml
            path: shenyu-admin-application-mysql.yml
      - name: mysql-connector-volume
        emptyDir: {}
      initContainers:
      - name: download-mysql-jar
        image: busybox:1.35.0
        command: [ "sh","-c"]
        args: ["wget https://repo1.maven.org/maven2/mysql/mysql-connector-java/8.0.23/mysql-connector-java-8.0.23.jar;
            wget https://repo1.maven.org/maven2/mysql/mysql-connector-java/8.0.23/mysql-connector-java-8.0.23.jar.md5;
            if [ $(md5sum mysql-connector-java-8.0.23.jar | cut -d ' ' -f1) = $(cat mysql-connector-java-8.0.23.jar.md5) ];
            then echo success;
            else echo failed;
            exit 1;
            fi;
            mv /mysql-connector-java-8.0.23.jar /opt/shenyu-admin/ext-lib/mysql-connector-java.jar" ]
        volumeMounts:
        - name: mysql-connector-volume
          mountPath: /opt/shenyu-admin/ext-lib
      containers:
      - name: shenyu-admin
        image: apache/shenyu-admin:2.5.0
        imagePullPolicy: Always
        ports:
        - containerPort: 9095
        env:
        - name: 'TZ'
          value: 'Asia/Beijing'
        - name: SPRING_PROFILES_ACTIVE
          value: mysql
        volumeMounts:
        - name: shenyu-admin-application
          mountPath: /opt/shenyu-admin/conf/application.yml
          subPath: shenyu-admin-application.yml
        - name: shenyu-admin-application-mysql
          mountPath: /opt/shenyu-admin/conf/application-mysql.yml
          subPath: shenyu-admin-application-mysql.yml
        - name: mysql-connector-volume
          mountPath: /opt/shenyu-admin/ext-lib
```

- 执行`kubectl apply -f shenyu-admin.yaml`

### 4. 部署 shenyu-bootstrap

- 创建文件 shenyu-bootstrap.yaml

```yaml
# 示例使用 nodeport 方式暴露端口
apiVersion: v1
kind: Service
metadata:
  namespace: shenyu
  name: shenyu-bootstrap-svc
spec:
  selector:
    app: shenyu-bootstrap
  type: NodePort
  ports:
  - protocol: TCP
    port: 9195
    targetPort: 9195
    nodePort: 31195
---
# shenyu-bootstrap
apiVersion: apps/v1
kind: Deployment
metadata:
  namespace: shenyu
  name: shenyu-bootstrap
spec:
  selector:
    matchLabels:
      app: shenyu-bootstrap
  replicas: 1
  template:
    metadata:
      labels:
        app: shenyu-bootstrap
    spec:
      volumes:
      - name: shenyu-bootstrap-application
        configMap:
          name: shenyu-cm
          items:
          - key: shenyu-bootstrap-application.yml
            path: shenyu-bootstrap-application.yml
      containers:
      - name: shenyu-bootstrap
        image: apache/shenyu-bootstrap:2.5.0
        ports:
        - containerPort: 9195
        env:
        - name: TZ
          value: Asia/Beijing
        volumeMounts:
        - name: shenyu-bootstrap-application
          mountPath: /opt/shenyu-bootstrap/conf/application.yml
          subPath: shenyu-bootstrap-application.yml
```

- 执行 `kubectl apply -f shenyu-bootstrap.yaml`

## 测试访问

**访问地址**：http://{K8S_CLUSTER_IP}:31095/

**账号密码**：admin/123456
