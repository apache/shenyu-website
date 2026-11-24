---
sidebar_position: 3
title: Docker Compose Deployment
keywords: ["docker-compose", "Deployment"]
description: Deploy ShenYu with pinned configuration and locally built 2.7.2 images.
---

Complete [deployment prerequisites](./deployment-before.md) and build the local 2.7.2 images using [Docker deployment](./deployment-docker.md#prepare-images). Migrate existing databases using the [upgrade guide](./upgrade-2.7.2.md). This example uses Docker Compose v2; the release installer also requires GNU sed (`gsed`) on macOS.

### Download the release installer

```bash
curl -fLO https://raw.githubusercontent.com/apache/shenyu/v2.7.2/shenyu-dist/shenyu-docker-compose-dist/src/main/resources/install.sh
bash ./install.sh v2.7.2
```

### Pin Compose configuration and images

The release installer still downloads its Compose manifest from `master`. Replace that generated file with the `v2.7.2` manifest to avoid mixing development configuration into the deployment, then pin the images to the locally built `2.7.2` tags:

```bash
curl -fL https://raw.githubusercontent.com/apache/shenyu/v2.7.2/shenyu-dist/shenyu-docker-compose-dist/src/main/resources/docker-compose.yaml -o shenyu-v2.7.2/docker-compose.release.yaml
sed 's/apache\/shenyu-admin:latest/apache\/shenyu-admin:2.7.2/g; s/apache\/shenyu-bootstrap:latest/apache\/shenyu-bootstrap:2.7.2/g' shenyu-v2.7.2/docker-compose.release.yaml > shenyu-v2.7.2/docker-compose.yaml
mkdir -p shenyu-v2.7.2/shenyu-bootstrap/ext-lib
```

### Initialize the database and configure services

For a new installation, follow [database initialization](./deployment-before.md#database-initialize). Existing installations need migrations instead. Review database, synchronization, and plugin settings in `shenyu-v2.7.2/shenyu-admin/conf/` and `shenyu-v2.7.2/shenyu-bootstrap/conf/`.

Set a private `SHENYU_JWT_SECRETKEY` in the current shell and use the same value across Admin instances. Compose refuses to start if it is absent. Mounted configuration and extension dependencies must be readable by container user `10001:10001`, and log directories must be writable; see [container permissions](./deployment-docker.md#prepare-images).

### Start and verify

```bash
docker compose -f shenyu-v2.7.2/docker-compose.yaml config --quiet
docker compose -f shenyu-v2.7.2/docker-compose.yaml up -d
docker compose -f shenyu-v2.7.2/docker-compose.yaml ps
curl -f http://localhost:9095/actuator/health
curl -f http://localhost:9195/actuator/health
```
