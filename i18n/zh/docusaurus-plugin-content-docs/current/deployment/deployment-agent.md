---
sidebar_position: 8
title: 部署shenyu-agent
keywords: ["Deployment", "agent"]
description: 部署shenyu-agent
---

本文介绍如何部署 `shenyu-agent`。(2.4.2版本开始支持)

了解更多关于 `shenyu-agent` ，可参考 [可观测性](../user-guide/observability/observability.md)。

## 二进制包部署

* 下载 `apache-shenyu-incubating-2.4.2-bootstrap-bin.tar.gz`

* 解压缩 `apache-shenyu-incubating-2.4.2-bootstrap-bin.tar.gz`，进入 `apache-shenyu-incubating-2.4.2-bootstrap-bin` 目录。

agent相关配置在 `./agent/conf` 中。

* 使用脚本启动，添加一个参数 `agent` 即可

```shell
./bin/start.sh agent
```

## 使用docker部署

* 编辑配置文件

agent相关配置文件位于 [shenyu-dist/shenyu-agent-dist/src/main/resources/conf/](https://github.com/apache/incubator-shenyu/tree/master/shenyu-dist/shenyu-agent-dist/src/main/resources/conf) ，编辑好 `shenyu-agent.yaml` 和 `tracing-point.yaml` 后，将这两个文件放在同一目录下，记为 `$AGENT_CONF`。

宿主机中，bootstrap的配置文件所在目录记为 `$BOOTSTRAP_CONF`。

* 拉取docker镜像并启动

附带参数 `agent` 表示启动 `shenyu-agent`。

```shell
> docker network create shenyu
> docker pull apache/shenyu-bootstrap
> docker run -d \
  -p 9195:9195 \
  -v $AGENT_CONF:/opt/shenyu-bootstrap/agent/conf \
  -v $BOOTSTRAP_CONF:/opt/shenyu-bootstrap/conf \
  apache/shenyu-bootstrap agent
```
