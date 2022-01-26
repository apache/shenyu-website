---
title: Integration Test Analysis
author: Kunshuai Zhu
author_title: Apache ShenYu Committer
author_url: https://github.com/JooKS-me
author_image_url: https://avatars1.githubusercontent.com/u/62384022?v=4
tags: [Integration Test, Apache ShenYu]
---

This article will provide an in-depth analysis of Apache ShenYu's integration tests.

### What are integration tests?

Integration testing is also called E2E (End To End) testing in some projects. It is mainly used to test whether each module can meet expectations after being assembled into a system.

Apache ShenYu puts integration tests in continuous integration, using GitHub Actions to trigger each time a Pull Request or Merge is submitted to the main branch. This can greatly reduce the maintenance cost of the project and improve the stability of Apache ShenYu.

### How to automate integration testing?

In Apache ShenYu, the main steps of integration testing are embodied in the script of the GitHub Action workflow, as shown below, which is located at [~/.github/workflows](https://github.com/apache/incubator-shenyu/tree /master/.github/workflows) directory.
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

Next, I will start from this yaml file and take you to analyze the entire process of automated integration testing.

### Triggering the workflow

Since we specified `pull_request` and `push.branch: master` in `on`, this workflow will be triggered when we submit pull_request or merge branch to master (push).

For more usage of GitHub Action, you can refer to the documentation of [GitHub Action](https://docs.github.com/en/actions), which will not be introduced in detail here.

### Initialize the environment

- pull code

```yaml
- uses: actions/checkout@v2
  with:
 	    submodules: true
```

- set skip flag

```yaml
- name: Set Skip Env Var
      uses: ./.github/actions/skip-ci
```

When something unrelated to functionality occurs (such as changing documentation), integration tests are skipped to save resources.

- Cache maven repos, install Java

```yaml
- name: Cache Maven Repos
...
- uses: actions/setup-java@v1
```

### Build the entire project while building the docker image

```shell
./mvnw -B clean install -Prelease,docker -Dmaven.javadoc.skip=true -Dmaven.test.skip=true
```

In the above command, -P is followed by `release,docker`, which means that the relevant profile configuration in the pom file will be activated.

The two profiles, release and docker, currently only exist in several submodules under `shenyu-dist`. The following will take the [shenyu-dist-admin](https://github.com/apache/incubator-shenyu/tree/master/shenyu-dist/shenyu-admin-dist) module as an example to introduce profiles as release and docker The specific content of the configuration. Also, integration tests only use the `shenyu-admin` image built in this step.

- First is release

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

  When -P is followed by release, the above `maven-assembly-plugin` plugin is activated. In executions, the execution timing of the plugin is bound to the maven life cycle package, which means that it will be triggered when we execute `mvn install`.

  The `binary.xml` we wrote is specified in the configuration, and the `maven-assembly-plugin` plugin will copy the required files and package them according to this file. You can click the link to view the file: [shenyu-dist/shenyu-admin-dist/src/main/assembly/binary.xml](https://github.com/apache/incubator-shenyu/blob/master/shenyu- dist/shenyu-admin-dist/src/main/assembly/binary.xml)

  According to this file, the plugin will "copy" the packaged jar packages, configuration files, startup scripts, etc. under other modules, and finally make them into a compressed package in `tar.gz` format.

- then docker

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

  Similar to the release above, here is the activation of the `dockerfile-maven-plugin` plugin. When `mvn install -Pdocker`, the plugin will use the dockerfile we wrote to build the docker image.

It should be noted that the dockerfile-maven-plugin currently has limited support for aarch64 architecture devices, and the following error will occur when running the plugin on aarch64 architecture machines. And when I wrote this article, it has not been maintained for a long time, which means that the problem of aarch64 architecture devices using this plugin will not be solved in the short term.

```shell
[ERROR] Failed to execute goal com.spotify:dockerfile-maven-plugin:1.4.6:build (tag-latest) on project shenyu-admin-dist: Could not build image: java.util.concurrent.ExecutionException: com.spotify.docker.client.shaded.javax.ws.rs.ProcessingException: java.lang.UnsatisfiedLinkError: could not load FFI provider jnr.ffi.provider.jffi.Provider: ExceptionInInitializerError: Can't overwrite cause with java.lang.UnsatisfiedLinkError: java.lang.UnsatisfiedLinkError: /private/var/folders/w2/j27f16yj7cvf_1cxbgqb89vh0000gn/T/jffi4972193792308935312.dylib: dlopen(/private/var/folders/w2/j27f16yj7cvf_1cxbgqb89vh0000gn/T/jffi4972193792308935312.dylib, 1): no suitable image found.  Did find:
[ERROR]         /private/var/folders/w2/j27f16yj7cvf_1cxbgqb89vh0000gn/T/jffi4972193792308935312.dylib: no matching architecture in universal wrapper
[ERROR]         /private/var/folders/w2/j27f16yj7cvf_1cxbgqb89vh0000gn/T/jffi4972193792308935312.dylib: no matching architecture in universal wrapper
...
```

Here is a temporary solution:

1. Open a new shell, enter the following command, and use socat to route the unix socket to the tcp port

   ```shell
   socat TCP-LISTEN:2375,range=127.0.0.1/32,reuseaddr,fork UNIX-CLIENT:/var/run/docker.sock
   ```

2. Set environment variables

   ```shell
   export DOCKER_HOST=tcp://127.0.0.1:2375
   ```

### Build the examples module

```yaml
- name: Build examples
  if: env.SKIP_CI != 'true'
  run: ./mvnw -B clean install -Pexample -Dmaven.javadoc.skip=true -Dmaven.test.skip=true -f ./shenyu-examples/pom.xml
```

Considering the need for release, the current pom file in the project root directory does not contain the example submodule, so the examples module is additionally built in the above step.

Similar to the above, this line of command will also use the maven plugin to build an image for our subsequent docker orchestration.

### Build custom gateways

```yaml
- name: Build integrated tests
  if: env.SKIP_CI != 'true'
  run: ./mvnw -B clean install -Pit -DskipTests -f ./shenyu-integrated-test/pom.xml
```

In order to subdivide the integration tests of different functions of Apache ShenYu, we will build a gateway customized by the integration test module in this step. The so-called "customization" is to introduce the minimum required dependencies in the pom file, and then replace the default `shenyu-bootstrap`. Similar to the above two steps, this step will also build the docker image.

It is worth noting that the way of packaging and building here is slightly different from that of the `shenyu-dist` module, which you can find by comparing the pom file.

### Run docker compose

```yaml
- name: Start docker compose
  if: env.SKIP_CI != 'true'
  run: docker-compose -f ./shenyu-integrated-test/${{ matrix.case }}/docker-compose.yml up -d
```

In this step, docker will be arranged according to the different `docker-compose.yml` files written under the integration test module.

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

For example, the `docker-compose.yml` under the `shenyu-integrated-test-http` module starts zookeeper, redis, example, admin, gateway and other services in sequence. Among them, the mirrors of example, admin, and gateway are built by us before.

Among them, docker-compose uses depends_on to determine the topological relationship between services, and most services have corresponding health checks, and the next service will not be started until the health check passes.

### Run the health check and wait for docker-compose to start

```yaml
- name: Wait for docker compose start up completely
  if: env.SKIP_CI != 'true'
  run: bash ./shenyu-integrated-test/${{ matrix.case }}/script/healthcheck.sh
```

In this step, the host will run the `healthcheck.sh` script, and then use the curl command to access the health status interface `/actuator/health` of each service list (in the services.list file), until the service status is normal. will continue.

### run tests

```yaml
- name: Run test
  id: test
  if: env.SKIP_CI != 'true'
  run: ./mvnw test -Pit -f ./shenyu-integrated-test/${{ matrix.case }}/pom.xml
  continue-on-error: true
```

This step is to use the maven test command to execute the test classes in the `/src/test/` directory one by one.

### View Docker Compose logs

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

When there is an error in the workflow, the log of docker compose can help us to better troubleshoot the problem, so in this step, we will print the log of docker compose.
