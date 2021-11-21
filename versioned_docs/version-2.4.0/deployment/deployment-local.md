---
sidebar_position: 1
title: Local Deployment
keywords: ["Deployment"]
description: Local Deployment
---

This article introduces how to start the `Apache ShenYu` gateway in the local environment.

### Environmental preparation

* Install JDK1.8+ locally
* Install Git locally
* Install Maven locally
* Choose a development tool, such as IDEA

### Download the compiled code

* Download

```
> git clone https://github.com/apache/incubator-shenyu.git
> cd incubator-shenyu
> mvn clean install -Dmaven.javadoc.skip=true -B -Drat.skip=true -Djacoco.skip=true -DskipITs -DskipTests
```

* use the development tool to start `org.apache.shenyu.admin.ShenyuAdminBootstrap`，Visit http://localhost:9095, the default username and password are: `admin` and `123456` respectively.

  * If you use `h2` to store, set the variable `--spring.profiles.active = h2`.

  * If you use `MySQL` for storage, modify the `mysql` configuration in `application.yaml`.

* use the development tool to start `org.apache.shenyu.bootstrap.ShenyuBootstrapApplication`.

* If using the system of Windows, you may encounter a Git error with `filename too long`. You can run the command `git config --system core.longpaths true` to solve this problem.









