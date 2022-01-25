---
sidebar_position: 2
title: Binary Packages Deployment
keywords: ["Deployment"] 
description: Binary Packages Deployment
---

This article introduces the deployment of the `Apache ShenYu` gateway using the binary packages.


### Start Apache ShenYu Admin

* download `apache-shenyu-incubating-2.4.2-admin-bin.tar.gz`

* unzip `apache-shenyu-incubating-2.4.2-admin-bin.tar.gz`。 go to the `bin` directory.

* use `h2` to store data：

```
> windows: start.bat --spring.profiles.active = h2

> linux: ./start.sh --spring.profiles.active = h2
```

* use `MySQL` to store data, go to the `/conf` directory, and modify the configuration of `mysql` in `application.yaml`.

```
> windows: start.bat 

> linux: ./start.sh 
```

* use `PostgreSql` to store data, go to the `/conf` directory, and  modify `spring.profiles.active` of the configuration in `application.yaml` to `pg`.

```
> windows: start.bat 

> linux: ./start.sh 
```

### Start Apache ShenYu Bootstrap

* download `apache-shenyu-incubating-2.4.2-bootstrap-bin.tar.gz`

* unzip `apache-shenyu-incubating-2.4.2-bootstrap-bin.tar.gz`。 go to the `bin` directory.

```
> windwos : start.bat 

> linux : ./start.sh 
```

### Start ShenYu Bootstrap with ShenYu Agent

> 2.4.2 version started to support shenyu-agent

Agent related configuration is in `./agent/conf`. For detailed configuration, please refer to [Observability](../user-guide/observability/observability.md)

If you want to start bootstrap with shenyu-agent, you just need to add one parameter at startup: agent

```shell
./start.sh agent
```

