---
title: 源码包部署
keywords: Apache ShenYu Deployment
description: 源码包部署
---

本文介绍使用源码包部署 `Apache ShenYu` 网关。


### 启动 Apache ShenYu Admin

* 下载 [2.4.0](https://github.com/apache/incubator-shenyu/releases/tag/2.4.0) 下载 `apache-shenyu-admin-bin-2.4.0-RELEASE.tar.gz`

* 解压缩 `apache-shenyu-admin-bin-2.4.0-RELEASE.tar.gz`。 进入 `bin` 目录。

* 使用 `h2` 来存储后台数据：

```
> windows: start.bat --spring.profiles.active = h2

> linux: ./start.sh --spring.profiles.active = h2
```

* 使用 `MySQL` 来存储后台数据， 进入 `/conf` 目录，修改 `application.yaml` 中 `mysql` 的配置。

```
> windows: start.bat 

> linux: ./start.sh 
```

### 启动 Apache ShenYu Bootstrap

* 下载 [2.4.0](https://github.com/apache/incubator-shenyu/releases/tag/2.4.0) 下载 `apache-shenyu-bootstrap-bin-2.4.0-RELEASE.tar.gz`

* 解压缩 `apache-shenyu-bootstrap-bin-2.4.0-RELEASE.tar.gz`。 进入 bin 目录。

```
> windwos : start.bat 

> linux : ./start.sh 
```









