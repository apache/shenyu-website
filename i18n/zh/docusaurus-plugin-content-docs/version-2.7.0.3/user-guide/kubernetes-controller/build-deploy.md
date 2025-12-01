---
title: 构建和部署 Kubernetes 控制器
description: 构建和部署 Kubernetes 控制器
---

本篇介绍如何使用 ShenYu Kubernetes Controller。

## 构建

建议参考[自定义部署](../../deployment/deployment-custom.md)构建自定义网关，在网关的 Maven 依赖中加入 shenyu-kubernetes-controller 的依赖，网关即可集成 kubernetes 控制器。

```xml
<dependency>
    <groupId>org.apache.shenyu</groupId>
    <artifactId>shenyu-spring-boot-starter-k8s</artifactId>
    <version>${project.version}</version>
</dependency>
```

也可以直接使用官方构建的 docker 镜像（TODO，未完成）

## 部署

K8s 部署文件可参考：

```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: shenyu-ingress
---
apiVersion: v1
automountServiceAccountToken: true
kind: ServiceAccount
metadata:
  name: shenyu-ingress-controller
  namespace: shenyu-ingress
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: shenyu-ingress-controller
  namespace: shenyu-ingress
  labels:
    app: shenyu-ingress-controller
    all: shenyu-ingress-controller
spec:
  replicas: 1
  selector:
    matchLabels:
      app: shenyu-ingress-controller
  template:
    metadata:
      labels:
        app: shenyu-ingress-controller
    spec:
      containers:
      - name: shenyu-ingress-controller
        image: apache/shenyu-integrated-test-k8s-ingress:latest
        ports:
        - containerPort: 9195
        imagePullPolicy: IfNotPresent
      serviceAccountName: shenyu-ingress-controller
---
apiVersion: v1
kind: Service
metadata:
  name: shenyu-ingress-controller
  namespace: shenyu-ingress
spec:
  selector:
    app: shenyu-ingress-controller
  type: NodePort
  ports:
    - port: 9195
      targetPort: 9195
      nodePort: 30095
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: shenyu-ingress-controller
rules:
- apiGroups:
  - ""
  resources:
  - namespaces
  - services
  - endpoints
  - secrets
  - pods
  verbs:
  - get
  - list
  - watch
- apiGroups:
  - networking.k8s.io
  resources:
  - ingresses
  verbs:
  - get
  - list
  - watch
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: shenyu-ingress-controller
  namespace: shenyu-ingress
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: shenyu-ingress-controller
subjects:
- kind: ServiceAccount
  name: shenyu-ingress-controller
  namespace: shenyu-ingress
```

其中，Service 可以根据实际情况改成 `LoadBalancer` 类型。
