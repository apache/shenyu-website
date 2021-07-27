---
title: Binary Packages Deployment
keywords: Apache ShenYu Deployment
description: Binary Packages Deployment
---

This article introduces the deployment of the `Apache ShenYu` gateway using the binary packages.


### Start Apache ShenYu Admin

* download [2.4.0](https://github.com/apache/incubator-shenyu/releases/tag/2.4.0) download `apache-shenyu-admin-bin-2.4.0-RELEASE.tar.gz`

* unzip `apache-shenyu-admin-bin-2.4.0-RELEASE.tar.gz`。 go to the `bin` directory.

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

### Start Apache ShenYu Bootstrap

* download [2.4.0](https://github.com/apache/incubator-shenyu/releases/tag/2.4.0) download `apache-shenyu-bootstrap-bin-2.4.0-RELEASE.tar.gz`

* unzip `apache-shenyu-bootstrap-bin-2.4.0-RELEASE.tar.gz`。 go to the `bin` directory.

```
> windwos : start.bat 

> linux : ./start.sh 
```









