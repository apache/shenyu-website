---
sidebar_position: 4
title: K8s部署
keywords: ["k8s"]
description: K8s部署
---

本文介绍使用 `K8s` 来部署 `Apache ShenYu` 网关。


> 目录
>
> 一. 使用 h2 作为数据库
>
> 	1. 创建 Namespace和 ConfigMap
> 	2. 部署 shenyu-admin
> 	3. 部署 shenyu-bootstrap
> 二. 使用 mysql 作为数据库
>
>	和 h2 过程类似，需要注意的两个地方
>
> 	1. 需要加载 mysql-connector.jar，所以需要一个文件存储的地方
> 	2. 需要指定外部 mysql 数据库配置，通过 Endpoints 来代理外部 mysql 数据库
> 	
>	具体流程如下：
>
> 	1. 创建 Namespace和 ConfigMap
> 	2. 创建 Endpoints 代理外部 mysql
> 	3. 创建 PV 存储 mysql-connector.jar
> 	4. 部署 shenyu-admin
> 	5. 部署 shenyu-bootstrap



## 一. 使用 h2 作为数据库

### 1. 创建 Namespace 和 ConfigMap

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

- 执行 `kubectl apply -f shenyu-ns.yaml`

### 2. 部署 shenyu-admin

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
      containers:
      - name: shenyu-admin
        image: apache/shenyu-admin:2.4.0
        imagePullPolicy: Always
        ports:
        - containerPort: 9095
        env:
        - name: 'TZ'
          value: 'Asia/Beijing'
```

- 执行`kubectl apply -f shenyu-ns.yaml`

### 3. 部署 shenyu-bootstrap

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
      - name: shenyu-bootstrap-config
        configMap:
          name: shenyu-cm
          items:
          - key: application-local.yml
            path: application-local.yml
      containers:
      - name: shenyu-bootstrap
        image: apache/shenyu-bootstrap:2.4.0
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

- 执行 `kubectl apply -f shenyu-bootstrap.yaml`





## 二. 使用 mysql 作为数据库

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
    spring.datasource.url: jdbc:mysql://mysql.shenyu.svc.cluster.local:3306/shenyu?useUnicode=true&characterEncoding=utf-8&useSSL=false
    spring.datasource.username: {your_mysql_user}
    spring.datasource.password: {your_mysql_password}
```

- 执行 `kubectl apply -f shenyu-ns.yaml`

### 2. 创建 Endpoints 代理外部 mysql

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

### 3. 创建 PV 存储 mysql-connector.jar

- 创建文件 shenyu-store.yaml

```yaml
# 示例使用 PVC、PV、StorageClass 来存储文件
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
    path: /home/shenyu/shenyu-admin/k8s-pv  # 指定节点上的目录,该目录下面需要包含 mysql-connector.jar
  nodeAffinity:
    required:
      nodeSelectorTerms:
      - matchExpressions:
        - key: kubernetes.io/hostname
          operator: In
          values:
          - {your_node_name} # 指定节点
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

- 执行 `kubectl apply -f shenyu-store.yaml`
- PV挂载目录下上传 `mysql-connector.jar`


### 4. 部署 shenyu-admin

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
        image: apache/shenyu-admin:2.4.0
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

- 执行`kubectl apply -f shenyu-admin.yaml`

### 3. 部署 shenyu-bootstrap

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
      - name: shenyu-bootstrap-config
        configMap:
          name: shenyu-cm
          items:
          - key: application-local.yml
            path: application-local.yml
      containers:
      - name: shenyu-bootstrap
        image: apache/shenyu-bootstrap:2.4.0
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

- 执行 `kubectl apply -f shenyu-bootstrap.yaml`


