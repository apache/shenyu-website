---
title: Register Center Instance Config
keywords: ["register center"]
description: Register Instance
---

This document will introduce how to register the gateway instance to the registry. The `Apache ShenYu` gateway currently supports registration to `zookeeper` , `etcd` and `consul`.

### Add Maven dependency

First, introduce the following dependencies in the gateway's `pom.xml` file.

```xml
<!--shenyu instance start-->
<dependency>
    <groupId>org.apache.shenyu</groupId>
    <artifactId>shenyu-spring-boot-starter-instance</artifactId>
    <version>${project.version}</version>
</dependency>
<!--shenyu instance end-->
```

### Use zookeeper

> Please pay attention! From ShenYu 2.5.0, ShenYu will no longer support Zookeeper 3.4.x or below version. If you're already using Zookeeper, You need to use Zookeeper with a higher version and initialize the data.

Add the following configuration to the gateway's `yml` file:

```yaml
instance:
    enabled: true
    registerType: zookeeper
    serverLists: localhost:2181 #config with your zk address, used by the cluster environment, separated with (,).
    props:
      sessionTimeout: 3000 #Optional, default 3000
      connectionTimeout: 3000 #Optional, default 3000
```

### Use etcd

Add the following configuration to the gateway's `yml` file:

```yaml
instance:
    enabled: true
    registerType: etcd
    serverLists: http://localhost:2379 #config with your etcd address, used by the cluster environment, separated with (,).
    props:
      etcdTimeout: 3000 #Optional, default 3000
      etcdTTL: 5 #Optional, default 5
```

### Use apollo

Add the following configuration to the gateway's `yml` file:

```yaml
instance:
    enabled: true
    registerType: apollo
    serverLists: localhost:8080
    props:
      namespace: shenyu
      appId: shenyu
      portalUrl: localhost:8070
      env: dev
      clusterName: default
      token: 0a0c4c8c7f8c4c9c9c9c9c9c9c9c9c9c
```


> After the configuration is complete, start the gateway and it will successfully register to the corresponding registration center.
