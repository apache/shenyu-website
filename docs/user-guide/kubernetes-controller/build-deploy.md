---
title: Build And Deploy Kubernetes Controller
description: Build And Deploy Kubernetes Controller
---

This article introduces how to use ShenYu Ingress Controller.

## Construct

It is recommended to refer to [Custom Deployment](../../deployment/deployment-custom.md) to build a custom gateway, add the shenyu-kubernetes-controller dependency to the Maven dependency of the gateway, and the gateway can integrate the kubernetes controller.

```xml
         <dependency>
             <groupId>org.apache.shenyu</groupId>
             <artifactId>shenyu-spring-boot-starter-k8s</artifactId>
             <version>${project.version}</version>
         </dependency>
```

You can also directly use the officially built docker image (TODO, unfinished)

## deployment

K8s deployment files can refer to:

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

Among them, Service can be changed to `LoadBalancer` type according to the actual situation.
