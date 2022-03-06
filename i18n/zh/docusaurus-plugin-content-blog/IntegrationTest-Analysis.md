---
title: 集成测试剖析
author: Kunshuai Zhu
author_title: Apache ShenYu Committer
author_url: https://github.com/JooKS-me
author_image_url: https://avatars1.githubusercontent.com/u/62384022?v=4
tags: [Integration Test, Apache ShenYu]
---

这篇文章将会对Apache ShenYu的集成测试进行深入剖析。

### 什么是集成测试？

集成测试在一些项目里也叫E2E (End To End)测试，主要用于测试各个模块组装成一个系统后是否能符合预期。

Apache ShenYu将集成测试放在了持续集成中，利用GitHub Action，在每次向主分支提交Pull Request或是Merge时触发。这样可以大大降低项目的维护成本，提升Apache ShenYu的稳定性。

### 自动化的集成测试如何实现？

Apache ShenYu中，集成测试的主要步骤体现在GitHub Action工作流的脚本中，如下所示，该脚本位于 [~/.github/workflows](https://github.com/apache/incubator-shenyu/tree/master/.github/workflows)目录下。

```yaml
name: it
on:
  pull_request:
  push:
    branches:
      - master
jobs:
  build:
    strategy:
      matrix:
        case:
          - shenyu-integrated-test-alibaba-dubbo
          ...
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
        with:
          submodules: true
      ...
```

下面我将从这个yaml文件出发，带你剖析整个自动化集成测试的流程。

### 工作流的触发

由于我们在 `on` 中指定了 `pull_request` 和 `push.branch: master`，那么当我们提交pull_request或是merge分支到master（push）的时候，就会触发这个工作流。

关于更多GitHub Action的用法，可以参考 [GitHub Action](https://docs.github.com/en/actions) 的文档，这里不会做详细的介绍。

### 初始化环境

- 拉取代码

```yaml
- uses: actions/checkout@v2
  with:
 	    submodules: true
```

- 设置跳过标志

```yaml
- name: Set Skip Env Var
      uses: ./.github/actions/skip-ci
```

当发生的是一些对功能无关的改动（如改动文档）时，会跳过集成测试，以节约资源。

- 缓存maven依赖、安装Java

```yaml
- name: Cache Maven Repos
...
- uses: actions/setup-java@v1
```

### 构建整个项目，同时构建docker镜像

```shell
./mvnw -B clean install -Prelease,docker -Dmaven.javadoc.skip=true -Dmaven.test.skip=true
```

上面这行命令中，-P后面跟着`release,docker`，表示会激活pom文件中相关的profile配置。

而release和docker这两个profile，目前只在 `shenyu-dist` 下的几个子模块中存在。下面将以 [shenyu-dist-admin](https://github.com/apache/incubator-shenyu/tree/master/shenyu-dist/shenyu-admin-dist) 模块为例，介绍profile为release和docker的配置的具体内容。另外，集成测试只使用了这一步构建的 `shenyu-admin` 镜像。

- 首先是release

  ```xml
  <profile>
      <id>release</id>
      <activation>
          <activeByDefault>false</activeByDefault>
      </activation>
      <build>
          <finalName>apache-shenyu-incubating-${project.version}</finalName>
          <plugins>
              <plugin>
                  <groupId>org.apache.maven.plugins</groupId>
                  <artifactId>maven-assembly-plugin</artifactId>
                  <executions>
                      <execution>
                          <id>admin-bin</id>
                          <phase>package</phase>
                          <goals>
                              <goal>single</goal>
                          </goals>
                      </execution>
                  </executions>
                  <configuration>
                      <descriptors>
                          <descriptor>${project.basedir}/src/main/assembly/binary.xml</descriptor>
                      </descriptors>
                      <tarLongFileMode>posix</tarLongFileMode>
                  </configuration>
              </plugin>
          </plugins>
      </build>
  </profile>
  ```

  当-P后面跟着release时，就会激活上面的 `maven-assembly-plugin` 插件。而executions中将插件的执行时机绑定在了maven生命周期package中，这也就意味着，当我们执行 `mvn install` 的时候就会触发。

  configuration中指定了我们编写好的 `binary.xml`，`maven-assembly-plugin` 插件将会按照这个文件，将需要的文件复制进来，并打包。你可以点击链接查看该文件：[shenyu-dist/shenyu-admin-dist/src/main/assembly/binary.xml](https://github.com/apache/incubator-shenyu/blob/master/shenyu-dist/shenyu-admin-dist/src/main/assembly/binary.xml)

  根据这个文件，插件会将其他模块下打包好的jar包、配置文件、启动脚本等“复制”过来，最终打成 `tar.gz` 格式的压缩包。

- 然后是docker

  ```xml
  <profile>
      <id>docker</id>
      <activation>
          <activeByDefault>false</activeByDefault>
      </activation>
      <build>
          <plugins>
              <plugin>
                  <groupId>com.spotify</groupId>
                  <artifactId>dockerfile-maven-plugin</artifactId>
                  <version>${dockerfile-maven-plugin.version}</version>
                  <executions>
                      <execution>
                          <id>tag-latest</id>
                          <goals>
                              <goal>build</goal>
                          </goals>
                          <configuration>
                              <tag>latest</tag>
                          </configuration>
                      </execution>
                      <execution>
                          <id>tag-version</id>
                          <goals>
                              <goal>build</goal>
                          </goals>
                          <configuration>
                              <tag>${project.version}</tag>
                          </configuration>
                      </execution>
                  </executions>
                  <configuration>
                      <repository>apache/shenyu-admin</repository>
                      <buildArgs>
                          <APP_NAME>apache-shenyu-incubating-${project.version}-admin-bin</APP_NAME>
                      </buildArgs>
                  </configuration>
              </plugin>
          </plugins>
      </build>
  </profile>
  ```

  类比上面的release，这里是激活 `dockerfile-maven-plugin` 插件。当 `mvn install -Pdocker` 时，插件就会利用我们编写好的dockerfile构建docker镜像。

需要注意的是，dockerfile-maven-plugin目前对aarch64架构的设备支持有限，在aarch64架构的机器上运行该插件时会出现如下错误。且在本人写这篇文章的时候已经很久没有维护，这意味着aarch64架构的设备使用这个插件的问题在短期内不会解决。

```shell
[ERROR] Failed to execute goal com.spotify:dockerfile-maven-plugin:1.4.6:build (tag-latest) on project shenyu-admin-dist: Could not build image: java.util.concurrent.ExecutionException: com.spotify.docker.client.shaded.javax.ws.rs.ProcessingException: java.lang.UnsatisfiedLinkError: could not load FFI provider jnr.ffi.provider.jffi.Provider: ExceptionInInitializerError: Can't overwrite cause with java.lang.UnsatisfiedLinkError: java.lang.UnsatisfiedLinkError: /private/var/folders/w2/j27f16yj7cvf_1cxbgqb89vh0000gn/T/jffi4972193792308935312.dylib: dlopen(/private/var/folders/w2/j27f16yj7cvf_1cxbgqb89vh0000gn/T/jffi4972193792308935312.dylib, 1): no suitable image found.  Did find:
[ERROR]         /private/var/folders/w2/j27f16yj7cvf_1cxbgqb89vh0000gn/T/jffi4972193792308935312.dylib: no matching architecture in universal wrapper
[ERROR]         /private/var/folders/w2/j27f16yj7cvf_1cxbgqb89vh0000gn/T/jffi4972193792308935312.dylib: no matching architecture in universal wrapper
...
```

这里有个临时的解决方案：

1. 打开一个新的shell，输入如下命令，利用 socat 将 unix socket 路由到 tcp 端口

   ```shell
   socat TCP-LISTEN:2375,range=127.0.0.1/32,reuseaddr,fork UNIX-CLIENT:/var/run/docker.sock
   ```

2. 设置环境变量

   ```shell
   export DOCKER_HOST=tcp://127.0.0.1:2375
   ```

### 构建examples模块

```yaml
- name: Build examples
  if: env.SKIP_CI != 'true'
  run: ./mvnw -B clean install -Pexample -Dmaven.javadoc.skip=true -Dmaven.test.skip=true -f ./shenyu-examples/pom.xml
```

因为考虑到release的需要，目前项目根目录下的pom文件中不饱含example子模块，所以上面这个步骤另外构建了examples模块。

与上面类似，这行命令也会利用maven的插件构建镜像，以供我们后续docker编排使用。

### 构建定制化网关

```yaml
- name: Build integrated tests
  if: env.SKIP_CI != 'true'
  run: ./mvnw -B clean install -Pit -DskipTests -f ./shenyu-integrated-test/pom.xml
```

为了细分Apache ShenYu的不同功能的集成测试，我们在这一步将构建集成测试模块定制的网关。所谓的“定制”就是在pom文件中引入需要的最少依赖，然后代替默认的 `shenyu-bootstrap`。与上面两个步骤类似，这一步也会构建出docker镜像。

值得注意的是，这里的打包构建的方式与 `shenyu-dist` 模块的有一些不同，你可以通过对比pom文件发现。

### 运行docker compose

```yaml
- name: Start docker compose
  if: env.SKIP_CI != 'true'
  run: docker-compose -f ./shenyu-integrated-test/${{ matrix.case }}/docker-compose.yml up -d
```

这一步将会根据集成测试模块下编写好的不同的 `docker-compose.yml` 文件，进行docker编排。

```yaml
version: "3.9"
services:
  shenyu-zk:
    container_name: shenyu-zk
    image: zookeeper:3.5
    ...
  shenyu-redis:
    image: redis:6.0-alpine
    container_name: shenyu-redis
    ...

  shenyu-examples-http:
    deploy:
      resources:
        limits:
          memory: 2048M
    container_name: shenyu-examples-http
    image: shenyu-examples-http:latest
    ...

  shenyu-admin:
    image: apache/shenyu-admin:latest
    container_name: shenyu-admin
    ...

  shenyu-integrated-test-http:
    container_name: shenyu-integrated-test-http
    image: apache/shenyu-integrated-test-http:latest
    ...
    depends_on:
      shenyu-admin:
        condition: service_healthy
    healthcheck:
      test: [ "CMD", "wget", "http://shenyu-integrated-test-http:9195/actuator/health" ]
      timeout: 2s
      retries: 30

networks:
  shenyu:
    name: shenyu
```

例如 `shenyu-integrated-test-http` 模块下的 `docker-compose.yml`，按顺序启动了zookeeper、redis、example、admin、网关等服务。其中，example、admin、网关的镜像是我们之前构建的。

其中，docker-compose利用 `depends_on` 确定了服务之间的拓扑关系，并且大部分服务都有相应的健康检查，待健康检查通过后才会启动下一个服务。

### 运行健康检查，等待docker-compose启动完毕

```yaml
- name: Wait for docker compose start up completely
  if: env.SKIP_CI != 'true'
  run: bash ./shenyu-integrated-test/${{ matrix.case }}/script/healthcheck.sh
```

在这一步，宿主机会运行 `healthcheck.sh` 这个脚本，然后利用 curl 命令访问各个服务列表（在services.list文件中）的健康状态接口 `/actuator/health`，一直到服务状态都为正常才会继续。

### 运行测试

```yaml
- name: Run test
  id: test
  if: env.SKIP_CI != 'true'
  run: ./mvnw test -Pit -f ./shenyu-integrated-test/${{ matrix.case }}/pom.xml
  continue-on-error: true
```

这一步就是利用maven test命令，逐个执行 `/src/test/`  目录下的测试类。

### 查看Docker Compose日志

```yaml
- name: Check test result
  if: env.SKIP_CI != 'true'
  run: |
    docker-compose -f ./shenyu-integrated-test/${{ matrix.case }}/docker-compose.yml logs --tail="all"
    if [[ ${{steps.test.outcome}} == "failure" ]]; then
      echo "Test Failed"
      exit 1
    else
      echo "Test Successful"
      exit 0
    fi
```

当工作流出现错误时，docker compose的日志可以帮助我们更好的排查问题，所以在这一步我们将docker compose的日志打印出来。
