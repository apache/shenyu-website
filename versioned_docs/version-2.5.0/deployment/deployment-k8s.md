---
sidebar_position: 4
title: K8S Deployment
keywords: ["k8s"]
description: k8s Deployment
---

> Before you read this document, you need to complete some preparations before deploying Shenyu according to the [Deployment Prerequisites document](./deployment-before.md).

This article introduces the use of `k8s` to deploy the `Apache ShenYu` gateway.

> Catalog
>
> I. Using h2 as a database
>
> 1. create nameSpace and configMap
> 2. deploying shenyu-admin
> 3. deploy shenyu-bootstrap
> II. Use mysql as the database
>
> Similar to the h2 process, there are two points to note
>
> 1. you need to load [mysql-connector.jar](https://repo1.maven.org/maven2/mysql/mysql-connector-java/8.0.18/mysql-connector-java-8.0.18.jar), so you need a place to store the file
> 2. you need to specify an external mysql database configuration to proxy the external mysql database via endpoint
>
> The process is as follows.
>
> 1. create nameSpace and configMap
> 2. create endpoint to proxy external mysql
> 3. create pv store mysql-connector.jar
> 4. deploy shenyu-admin
> 5. deploy shenyu-bootstrap



## I. Using h2 as a database

### 1. Create nameSpace and configMap

- create shenyu-ns.yaml

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
  application-local.yml: |
    server:
        port: 9195
        address: 0.0.0.0
    spring:
        main:
            allow-bean-definition-overriding: true
        application:
            name: shenyu-bootstrap
    management:
        health:
            defaults:
            enabled: false
    shenyu:
        local:
            enabled: true
        file:
            enabled: true
        cross:
            enabled: true
        dubbo:
            parameter: multi
        sync:
            websocket:
              urls: ws://shenyu-admin-svc.shenyu.svc.cluster.local:9095/websocket
        exclude:
            enabled: false
            paths:
            - /favicon.ico
        extPlugin:
            enabled: true
            threads: 1
            scheduleTime: 300
            scheduleDelay: 30
        scheduler:
            enabled: false
            type: fixed
            threads: 16
    logging:
        level:
            root: info
            org.springframework.boot: info
            org.apache.ibatis: info
            org.apache.shenyu.bonuspoint: info
            org.apache.shenyu.lottery: info
            org.apache.shenyu: info
```

- execute `kubectl apply -f shenyu-ns.yaml`

### 2. Create shenyu-admin

- create shenyu-admin.yaml

```yaml
# Example of using the nodeport type to expose ports
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
      containers:
      - name: shenyu-admin
        image: apache/shenyu-admin:${current.version}
        imagePullPolicy: Always
        ports:
        - containerPort: 9095
        env:
        - name: 'TZ'
          value: 'Asia/Beijing'
```

- execute`kubectl apply -f shenyu-admin.yaml`

### 3. Create shenyu-bootstrap

- create shenyu-bootstrap.yaml

```yaml
# Example of using the nodeport type to expose ports
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
      - name: shenyu-bootstrap-config
        configMap:
          name: shenyu-cm
          items:
          - key: application-local.yml
            path: application-local.yml
      containers:
      - name: shenyu-bootstrap
        image: apache/shenyu-bootstrap:${current.version}
        ports:
        - containerPort: 9195
        env:
        - name: TZ
          value: Asia/Beijing
        volumeMounts:
        - name: shenyu-bootstrap-config
          mountPath: /opt/shenyu-bootstrap/conf/application-local.yml
          subPath: application-local.yml
```

- execute `kubectl apply -f shenyu-bootstrap.yaml`





## II. Use mysql as the database

### 1. Create nameSpace and configMap

- create shenyu-ns.yaml

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
  application-local.yml: |
    server:
        port: 9195
        address: 0.0.0.0
    spring:
        main:
            allow-bean-definition-overriding: true
        application:
            name: shenyu-bootstrap
    management:
        health:
            defaults:
            enabled: false
    shenyu:
        local:
            enabled: true
        file:
            enabled: true
        cross:
            enabled: true
        dubbo:
            parameter: multi
        sync:
            websocket:
              urls: ws://shenyu-admin-svc.shenyu.svc.cluster.local:9095/websocket
        exclude:
            enabled: false
            paths:
            - /favicon.ico
        extPlugin:
            enabled: true
            threads: 1
            scheduleTime: 300
            scheduleDelay: 30
        scheduler:
            enabled: false
            type: fixed
            threads: 16
    logging:
        level:
            root: info
            org.springframework.boot: info
            org.apache.ibatis: info
            org.apache.shenyu.bonuspoint: info
            org.apache.shenyu.lottery: info
            org.apache.shenyu: info
  application-mysql.yml: |
    spring.datasource.url: jdbc:mysql://mysql.shenyu.svc.cluster.local:3306/shenyu?useUnicode=true&characterEncoding=utf-8&useSSL=false&serverTimezone=Asia/Shanghai&zeroDateTimeBehavior=convertToNull
    spring.datasource.username: {your_mysql_user}
    spring.datasource.password: {your_mysql_password}
```

- execute `kubectl apply -f shenyu-ns.yaml`

### 2. Create endpoint to represent mysql

- create shenyu-ep.yaml

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

- execute `kubectl apply -f shenyu-ep.yaml`

### 3. Create pv to store mysql-connector.jar

- create shenyu-store.yaml

```yaml
# Example of using pvc、pv、storageClass to store jar file
apiVersion: v1
kind: PersistentVolume
metadata:
  name: shenyu-pv
spec:
  capacity:
    storage: 1Gi
  volumeMode: Filesystem
  accessModes:
  - ReadWriteOnce
  persistentVolumeReclaimPolicy: Delete
  storageClassName: local-storage
  local:
    path: /home/shenyu/shenyu-admin/k8s-pv  # Specify the directory on the node, which should contain `mysql-connector.jar`
  nodeAffinity:
    required:
      nodeSelectorTerms:
      - matchExpressions:
        - key: kubernetes.io/hostname
          operator: In
          values:
          - {your_node_name} # Specify node
---
kind: PersistentVolumeClaim
apiVersion: v1
metadata:
  name: shenyu-pvc
  namespace: shenyu
spec:
  accessModes:
  - ReadWriteOnce
  resources:
    requests:
      storage: 1Gi
  storageClassName: local-storage
---
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: local-storage
provisioner: kubernetes.io/no-provisioner
volumeBindingMode: WaitForFirstConsumer
```

- execute `kubectl apply -f shenyu-pv.yaml`
- pv mounted directory upload `mysql-connector.jar`


### 4. Create shenyu-admin

- create shenyu-admin.yaml

```yaml
# Example of using the nodeport type to expose ports
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
      - name: mysql-connector-volume
        persistentVolumeClaim:
          claimName: shenyu-pvc
      - name: shenyu-admin-config
        configMap:
          name: shenyu-cm
          items:
          - key: application-mysql.yml
            path: application-mysql.yml
      containers:
      - name: shenyu-admin
        image: apache/shenyu-admin:${current.version}
        imagePullPolicy: Always
        ports:
        - containerPort: 9095
        env:
        - name: 'TZ'
          value: 'Asia/Beijing'
        - name: SPRING_PROFILES_ACTIVE
          value: mysql
        volumeMounts:
        - name: shenyu-admin-config
          mountPath: /opt/shenyu-admin/config/application-mysql.yml
          subPath: application-mysql.yml
        - mountPath: /opt/shenyu-admin/ext-lib
          name: mysql-connector-volume
```

- execute`kubectl apply -f shenyu-admin.yaml`

### 3. Create shenyu-bootstrap

- create shenyu-bootstrap.yaml

```yaml
# Example of using the nodeport type to expose ports
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
      - name: shenyu-bootstrap-config
        configMap:
          name: shenyu-cm
          items:
          - key: application-local.yml
            path: application-local.yml
      containers:
      - name: shenyu-bootstrap
        image: apache/shenyu-bootstrap:${current.version}
        ports:
        - containerPort: 9195
        env:
        - name: TZ
          value: Asia/Beijing
        volumeMounts:
        - name: shenyu-bootstrap-config
          mountPath: /opt/shenyu-bootstrap/conf/application-local.yml
          subPath: application-local.yml
```

- execute `kubectl apply -f shenyu-bootstrap.yaml`

