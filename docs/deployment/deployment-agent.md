---
sidebar_position: 8
title: Deploy shenyu-agent
keywords: ["Deployment", "agent"]
description: Deploy shenyu-agent
---

This article describes how to deploy `shenyu-agent`. (2.4.2 version starts to support)

To learn more about `shenyu-agent` , see [Observability](../user-guide/observability/observability.md).

## Deployment with binary package

* Download `apache-shenyu-incubating-2.4.2-bootstrap-bin.tar.gz`

* Unzip `apache-shenyu-incubating-2.4.2-bootstrap-bin.tar.gz` and enter the `apache-shenyu-incubating-2.4.2-bootstrap-bin` directory.

Agent related configuration is in `./agent/conf`.

* Start with a script, add a parameter `agent`

```shell
./bin/start.sh agent
```

## Deploy with docker

* Edit configuration file

Agent related configuration files are located at [shenyu-dist/shenyu-agent-dist/src/main/resources/conf/](https://github.com/apache/incubator-shenyu/tree/master/shenyu-dist/shenyu-agent-dist/src/main/resources/conf), after editing `shenyu-agent.yaml` and `tracing-point.yaml`, put these two files in the same directory, record them as `$AGENT_CONF`.

In the host, the directory where the bootstrap configuration file is located is recorded as `$BOOTSTRAP_CONF`.

* Pull the docker image and run

The additional parameter `agent` means to start `shenyu-agent`.

```shell
> docker network create shenyu
> docker pull apache/shenyu-bootstrap
> docker run -d \
  -p 9195:9195 \
  -v $AGENT_CONF:/opt/shenyu-bootstrap/agent/conf \
  -v $BOOTSTRAP_CONF:/opt/shenyu-bootstrap/conf \
  apache/shenyu-bootstrap agent
```
