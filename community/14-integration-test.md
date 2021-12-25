---
title: Run Integration Test Locally
sidebar_position: 15
description: Run Integration Test Locally
categories: "Apache ShenYu"
tags: ["integration test"]
---

### Preparation

1. Clone the code of [Apache ShenYu](https://github.com/apache/incubator-shenyu).
2. Install and start docker.

### Start integration test locally

1. Build with Maven

```shell
./mvnw -B clean install -Prelease,docker -Dmaven.javadoc.skip=true -Dmaven.test.skip=true
```

2. Build integrated tests

```shell
./mvnw -B clean install -Pit -DskipTests -f ./shenyu-integrated-test/pom.xml
```

3. Start docker compose

```shell
docker-compose -f ./shenyu-integrated-test/${{ matrix.case }}/docker-compose.yml up -d
```

> You need to replace `${{ matrix.case }}` with the exact directory, such as `shenyu-integrated-test-http`.

4. Run test

```shell
./mvnw test -Pit -f ./shenyu-integrated-test/${{ matrix.case }}/pom.xml
```
