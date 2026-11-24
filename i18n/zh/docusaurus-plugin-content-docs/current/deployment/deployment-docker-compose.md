---
sidebar_position: 3
title: Docker Compose 部署
keywords: ["docker-compose", "Deployment"]
description: 使用固定版本配置和本地 2.7.2 镜像部署 ShenYu。
---

先完成[部署先决条件](./deployment-before.md)，并按 [Docker 部署](./deployment-docker.md#prepare-images)构建本地 2.7.2 镜像。已有数据库必须先按[升级指南](./upgrade-2.7.2.md)迁移。本例使用 Docker Compose v2；macOS 运行发行版安装脚本时还需要 GNU sed（`gsed`）。

### 下载固定版本的安装脚本

```bash
curl -fLO https://raw.githubusercontent.com/apache/shenyu/v2.7.2/shenyu-dist/shenyu-docker-compose-dist/src/main/resources/install.sh
bash ./install.sh v2.7.2
```

### 固定 Compose 配置和镜像

发行版安装脚本仍从 `master` 下载 Compose 清单。执行后，用 `v2.7.2` 的清单替换它，避免部署时混入开发线配置，再将镜像标签固定为本地已构建的 `2.7.2`：

```bash
curl -fL https://raw.githubusercontent.com/apache/shenyu/v2.7.2/shenyu-dist/shenyu-docker-compose-dist/src/main/resources/docker-compose.yaml -o shenyu-v2.7.2/docker-compose.release.yaml
sed 's/apache\/shenyu-admin:latest/apache\/shenyu-admin:2.7.2/g; s/apache\/shenyu-bootstrap:latest/apache\/shenyu-bootstrap:2.7.2/g' shenyu-v2.7.2/docker-compose.release.yaml > shenyu-v2.7.2/docker-compose.yaml
mkdir -p shenyu-v2.7.2/shenyu-bootstrap/ext-lib
```

### 初始化数据库并修改配置

全新安装按[数据库初始化说明](./deployment-before.md#数据库环境准备)准备数据库；已有部署执行迁移，不要重复初始化。检查 `shenyu-v2.7.2/shenyu-admin/conf/` 与 `shenyu-v2.7.2/shenyu-bootstrap/conf/` 中的数据库、同步和插件配置。

在当前 shell 中设置私有的 `SHENYU_JWT_SECRETKEY`，所有 Admin 实例使用同一个值。未设置时，Compose 会拒绝启动。挂载的配置、扩展依赖必须允许容器用户 `10001:10001` 读取，日志目录必须允许其写入，详见[容器权限说明](./deployment-docker.md#prepare-images)。

### 启动与验证

```bash
docker compose -f shenyu-v2.7.2/docker-compose.yaml config --quiet
docker compose -f shenyu-v2.7.2/docker-compose.yaml up -d
docker compose -f shenyu-v2.7.2/docker-compose.yaml ps
curl -f http://localhost:9095/actuator/health
curl -f http://localhost:9195/actuator/health
```
