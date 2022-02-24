---
title: 本地运行集成测试
description: Run Integration Test Locally
tags: ["integration test"]
---

### 准备

1. 克隆 [Apache ShenYu](https://github.com/apache/incubator-shenyu) 的代码.
2. 安装并启动 `docker` .

### 在本地开启集成测试

1. 用 Maven 构建

```shell
./mvnw -B clean install -Prelease,docker -Dmaven.javadoc.skip=true -Dmaven.test.skip=true
```

2. 构建 `shenyu-integrated-test`

```shell
./mvnw -B clean install -Pit -DskipTests -f ./shenyu-integrated-test/pom.xml
```

3. docker-compose 运行

```shell
docker-compose -f ./shenyu-integrated-test/${{ matrix.case }}/docker-compose.yml up -d
```

> 你需要把 `${{ matrix.case }}` 替换成具体的目录, 比如 `shenyu-integrated-test-http`.

4. 运行测试

```shell
./mvnw test -Pit -f ./shenyu-integrated-test/${{ matrix.case }}/pom.xml
```
