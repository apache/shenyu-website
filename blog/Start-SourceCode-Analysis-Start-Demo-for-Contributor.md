---
title: Guide for New Contributors to Start avoid Pitfalls
author: Yuxuan Zhang
author_title: Apache ShenYu Contributor
author_url: https://github.com/zuobiao-zhou
author_image_url: https://avatars.githubusercontent.com/u/61108539?s=400&u=f065b78a2944f2cea9160de7f7df054e2f157867&v=4
tags: [first-start,Apache ShenYu]
---

## Preface

As a first-time developer in the `Shenyu` community, I encountered some "Pitfalls" that were not mentioned in the tutorials I followed to start and develop the project. I have documented the detailed steps I took to start `shenyu`, `shenyu-dashboard`, `shenyu-website` in this blog, hoping to help more new contributors in the community.

## Environmental Preparation

- Correct local installation of `JDK17+`
- Properly install `Git` locally
- Correctly install Maven `3.6.3+`
- Choose a development tool, this article uses `IDEA` as an example

## ShenYu Backend Startup Guide

### Install and Configure Maven

Maven is a cross-platform project management tool . As the Apache organization's top open source projects , its main service for Java-based platform project creation , dependency management and project information management.

1. [Download maven](https://maven.apache.org/download.cgi) and extract it to a path with no Chinese and no spaces.

    <img src="/img/activities/start-demo-for-contributor/maven-install.png" width="100%" height="100%" />

2. Add the `bin` directory under the `maven` directory to the environment variables. For `Windows`, if the download directory is `E:\apache-maven-3.9.1`, add `E:\apache-maven-3.9.1\bin` to the `Path` system variable.

3. Verify that the installation was successful. Type `mvn -v` in the cmd window, and if the Maven version and Java version appear, the installation is successful. This is shown below:

    ```shell
    C:\Users\pc>mvn -v
    Apache Maven 3.9.1 (2e178502fcdbffc201671fb2537d0cb4b4cc58f8)
    Maven home: E:\apache-maven-3.9.1
    Java version: 18.0.1.1, vendor: Oracle Corporation, runtime: C:\Program Files\Java\jdk-18.0.1.1
    Default locale: zh_CN, platform encoding: UTF-8
    OS name: "windows 10", version: "10.0", arch: "amd64", family: "windows"
    ```

4. To speed up the download of project-related dependencies, you need to change the Maven mirrors, here add Aliyun and other mirrors. Change the `<mirrors> </mirrors>` tag pair in `conf/settings.xml` to the following:

    ```xml
    <mirrors>
        <mirror>
        <id>alimaven</id>
        <name>aliyun maven</name>
        <url>http://maven.aliyun.com/nexus/content/groups/public/</url>
        <mirrorOf>central</mirrorOf>
        </mirror>

        <mirror>
        <id>alimaven</id>
        <mirrorOf>central</mirrorOf>
        <name>aliyun maven</name>
        <url>http://maven.aliyun.com/nexus/content/repositories/central/</url>
        </mirror>

        <mirror>
        <id>maven</id>
        <mirrorOf>central</mirrorOf>
        <name>name_</name>
        <url>http://repo1.maven.org/maven2</url>
        </mirror> 

        <mirror>
        <id>junit</id>
        <mirrorOf>central</mirrorOf>
        <name>junit address/</name>
        <url>http://jcenter.bintray.com/</url>
        </mirror>
    </mirrors>
    ```

    and add `<localRepository>E:/maven_local_repository</localRepository>` to the next line of `</mirrors>` to set the location of Maven local repository. You can specify the exact location yourself.

### Pull ShenYu Code

1. Fork [ShenYu](https://github.com/apache/shenyu) repository on Github to your own repository, where you can develop and commit PRs in the future
2. Use Git to download the repository from the previous step locally:

    ```shell
    git clone git@github.com:${YOUR_USERNAME}/${TARGET_REPO}.git
    ```

    If prompted for a long file name, execute the following command via the command line:

    ```shell
    git config --global core.longpaths true
    ```

   Tips: If you encounter the following error or have network issues preventing you from pulling all the code:

   ``` tex
   RPC failed; curl 92 HTTP/2 stream 5 was not closed cleanly: CANCEL (err 8) 2057 bytes of body are still expected fetch-pack: unexpected disconnect while reading sideband packet early EOF fetch-pack: invalid index-pack output
   ```

   You can execute the following commands to first pull a single version of the code, then fetch the full code:

   ``` shell
   git clone https://github.com/apache/shenyu.git --depth 1
   cd ./shenyu
   git fetch --unshallow
   ```

### ShenYu First Start

#### Preparation

1. Compile with Maven in the `shenyu` directory:

    ```shell
    mvn clean install -Dmaven.javadoc.skip=true -B -Drat.skip=true -Djacoco.skip=true -DskipITs -DskipTests
    ```

2. Configure IDEA environment. Open `shenyu` project with IDEA, click `File` -> `Settings` in the top left corner, and configure Maven as shown below. Where `User settings file` select your `settings.xml` directory, and then `Local repository` will automatically load the `localRepository` path set in `settings.xml`:

    <img src="/img/activities/start-demo-for-contributor/idea-config.png" width="60%" height="60%" />

3. At this point, IDEA will automatically download the project-related dependencies, you need to wait for a while, when finished, as shown in the following figure:

    <img src="/img/activities/start-demo-for-contributor/project-without-example.png" width="60%" height="60%" />

    As you can see, `shenyu-e2e`, `shenyu-examples`, `shenyu-integrated-test` are not marked as Maven projects by IDEA and need to be added manually. Select the `pom.xml` file in the package and right-click `Add as Maven Project`. 
    If the shenyu-e2e build fails, then add the `<relativePath>. /pom.xml</relativePath>` to `<relativePath/>`.

#### Start Gateway Service

1. Start the `shenyu-admin` console (H2 database is used by default)

    <img src="/img/activities/start-demo-for-contributor/admin.png" width="60%" height="60%" />

2. start `shenyu-bootstrap`

    <img src="/img/activities/start-demo-for-contributor/bootstrap.png" width="100%" height="100%" />

> By this point, the shenyu gateway has been started.
>
> We can open the browser and access the admin console: [http://localhost:9095/](http://localhost:9095/)
>
> Default account: admin , default password: 123456

#### Start Application Service

Apache ShenYu provides samples of Http, Dubbo, SpringCloud and other applications to access the shenyu gateway, located in the `shenyu-example` module, here the `Http service` is used as an example.

Start `shenyu-examples-http`。

<img src="/img/activities/start-demo-for-contributor/shenyu-examples-http.png" width="80%" height="80%" />

At this point, `shenyu-examples-http` will automatically register the interface methods annotated with `@ShenyuSpringMvcClient` and the relevant configuration in application.yml to the gateway. We can open the [admin console](http://localhost:9095/) and see the configuration in `Client List -> Proxy -> divide`.

#### Test Http Request

The following uses the `IDEA HTTP Client Plugin` to mock http to access http services.
- Local access without using shenyu proxy

    <img src="/img/activities/start-demo-for-contributor/shenyu-http-test-api-local.png" width="60%" height="60%" />

- Use shenyu proxy

    <img src="/img/activities/start-demo-for-contributor/shenyu-http-test-api.png" width="60%" height="60%" />

### Use more plugins

We can refer to the [official documentation](../docs/index) to the left of `Plugins collection` to use the required plugins.

## Shenyu Front End Startup Guide

### Install Node.js

#### Download

1. Download and install Node.js from [official website](https://nodejs.org/en) and select `LTS` version.
2. When installing, except for setting the installation path, just keep clicking `Next`.
3. After the installation is complete, verify at the command line:
    
    ```shell
    C:\Users\pc>node -v
    v12.22.12

    C:\Users\pc>npm -v
    6.14.16
    ```

### Pull ShenYu Dashboard Code

1. Fork [ShenYu Dashboard](https://github.com/apache/shenyu-dashboard) repository
2. Using Git to download locally

    ```shell
    git clone git@github.com:${YOUR_USERNAME}/${TARGET_REPO}.git
    ```

### Front and Back End Co-development

1. Add `enablePrintApiLog: true` to the `shenyu-admin/src/main/resources/application.yml` file in the backend repository `shenyu` as shown below to show the log of frontend interface calls in the backend console.

    <img src="/img/activities/start-demo-for-contributor/enable-api-log.png" width="60%" height="60%" />

2. Start `ShenyuAdminBootstrap`

3. Switch to the front-end repository `shenyu-dashboard`, open `README`, click `npm install`, `npm start` or enter the above command from cmd to access the front-end interface via [http://localhost:8000](http://localhost:8000), and display the log of the front-end interface called in the back-end console. Realize the co-development of front-end and back-end.

    <img src="/img/activities/start-demo-for-contributor/admin-log.png" width="60%" height="60%" />

### Package Front-end Code

Execute the `npm build` command in `README` and copy all the generated files from the `dist` folder to the `shenyu-admin/src/main/resources/static/` directory in the backend repository.

## Contribute to Shenyu Official Website

Just follow the `README` in [shenyu-website](https://github.com/apache/shenyu-website).

### Tips

1. I recommend downloading the `LTS` version from the `Node` [website](https://nodejs.org/en).
2. `Windows` systems cannot be deployed, if you want to verify your changes, you can deploy on a Linux virtual machine or server.
