---
title: Debug and run agent module locally
keywords: ["Agent"]
description: Debug and run the agent module locally
---

## Description

* This article will introduce how to debug and run the `shenyu-agent` module locally

## Prepare

1. Pull the Apache ShenYu code
2. Install IDEA
3. Refer to [local deployment](../deployment/deployment-local.md) to download and compile the code

## Set JVM startup parameters

In IDEA, set VM options in the startup parameters of `ShenyuBootstrapApplication.java` as:

```shell
-javaagent:~/shenyu/shenyu-dist/shenyu-agent-dist/target/shenyu-agent/shenyu-agent.jar
````

Among them, the parameter followed by `-javaagent:` is the absolute path of `shenyu-agent.jar`, which is packaged by `shenyu-dist`.

## Run/Debug

Then, start `ShenyuBootstrapApplication.java` for normal operation or debugging, and the shenyu-agent module can be debugged with breakpoints normally.
