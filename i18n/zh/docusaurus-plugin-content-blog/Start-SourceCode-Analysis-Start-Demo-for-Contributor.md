---
title: 社区新人开发者启动及开发防踩坑指南
author: Yuxuan Zhang
author_title: Apache ShenYu Contributor
author_url: https://github.com/zuobiao-zhou
author_image_url: https://avatars.githubusercontent.com/u/61108539?s=400&u=f065b78a2944f2cea9160de7f7df054e2f157867&v=4
tags: [first-start,Apache ShenYu]
---

## 前言

作为 `Shenyu` 社区初来乍到的开发者，我在按照相关教程进行项目启动及开发的过程中，遇到了一些教程中并未提及到的 “坑” ， 我将我启动`shenyu` , `shenyu-dashboard`, `shenyu-website` 的详细步骤记录在这篇博客中，希望可以帮到社区中更多的新人开发者。

## 环境准备

- 本地正确安装 `JDK17` 或更高版本
- 本地正确安装 `Git`
- 本地正确安装`Maven3.63` 或更高版本
- 选择一款开发工具，本文使用 `IDEA` 为例

## ShenYu 后端启动指南



### 安装并配置Maven

Maven是一个跨平台的项目管理工具。作为Apache组织顶级开源项目，其主要服务于基于Java平台的项目创建，依赖管理和项目信息管理。

1. [下载 maven](https://maven.apache.org/download.cgi)，并解压到一个没有中文没有空格的路径下。

    ![](/img/activities/start-demo-for-contributor/maven-install.png)

2. 将 `maven` 目录下的 `bin` 目录添加至环境变量中。以 `Windows` 为例，若下载目录为 `E:\apache-maven-3.9.1` ，则将`E:\apache-maven-3.9.1\bin` 添加至 `Path` 系统变量中。

3. 验证是否安装成功。在命令行窗口中输入 `mvn -v` ，若出现 Maven 版本及 Java 版本即为安装成功。如下所示：

    ```shell
    C:\Users\pc>mvn -v
    Apache Maven 3.9.1 (2e178502fcdbffc201671fb2537d0cb4b4cc58f8)
    Maven home: E:\apache-maven-3.9.1
    Java version: 18.0.1.1, vendor: Oracle Corporation, runtime: C:\Program Files\Java\jdk-18.0.1.1
    Default locale: zh_CN, platform encoding: UTF-8
    OS name: "windows 10", version: "10.0", arch: "amd64", family: "windows"
    ```

4. 为了加快项目相关依赖的下载速度，需要更改 Maven 镜像，此处添加阿里云等镜像。将 `conf/settings.xml` 中 `<mirrors> </mirrors>` 标签对更改为以下内容：

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

    并在 `</mirrors>` 下一行添加 `<localRepository>E:/maven_local_repository</localRepository>`设置 Maven 本地仓库位置。具体位置可自行指定。

### 拉取 ShenYu 代码

1. 在 Github 上 Fork [ShenYu](https://github.com/apache/shenyu) 仓库到自己的存储库中，以后可在此仓库中进行开发并提交 PR
2. 使用 Git 将上一步 Fork 的仓库下载到本地：

    ```shell
    git clone git@github.com:${YOUR_USERNAME}/${TARGET_REPO}.git
    ```

    若提示文件名过长，则通过命令行执行下面的命令：

    ```shell
    git config --global core.longpaths true
    ```

	Tips: 如果提示如下错误或者网络不好无法拉取全部代码：
	
	``` tex
	RPC failed; curl 92 HTTP/2 stream 5 was not closed cleanly: CANCEL (err 8) 2057 bytes of body are still expected fetch-pack: unexpected disconnect while reading sideband packet early EOF fetch-pack: invalid index-pack output
	```
	
	可以执行以下命令先拉取一个版本的代码,然后在获取全量代码.
	
	``` shell
	git clone https://github.com/apache/shenyu.git --depth 1
	cd ./shenyu
	git fetch --unshallow
	```
	
	

### ShenYu 初启动

#### 准备工作

1. 在 `shenyu` 目录下使用 Maven 进行编译：

    ```shell
    mvn clean install -Dmaven.javadoc.skip=true -B -Drat.skip=true -Djacoco.skip=true -DskipITs -DskipTests
    ```

2. 配置 IDEA 环境。使用 IDEA 打开 `shenyu` 项目，点击左上角 `File` -> `Settings` ，按照下图配置  Maven 。其中 `User settings file` 选择你的 `settings.xml` 所在目录， `Local repository` 会自动加载 `settings.xml` 中设置的 `localRepository` 路径：

    ![](/img/activities/start-demo-for-contributor/idea-config.png)

3. 此时，IDEA 会自动下载项目相关依赖，需等待一会，完成后如下图所示：

    ![](/img/activities/start-demo-for-contributor/project-without-example.png)

    可以发现， `shenyu-e2e`, `shenyu-examples`, `shenyu-integrated-test` 没有被 IDEA 标记为 Maven 项目，需手动添加。分别选中包中的 `pom.xml` 文件，右键点击 `Add as Maven Project` 。
    若 shenyu-e2e 构建失败，则将其 `pom.xml` 中 `<relativePath>./pom.xml</relativePath>` 改为 `<relativePath/>` 。

#### 启动网关服务

1. 启动 `shenyu-admin` 控制台（默认使用H2数据库）

    ![](/img/activities/start-demo-for-contributor/admin.png)

2. 启动 `shenyu-bootstrap`

    ![](/img/activities/start-demo-for-contributor/bootstrap.png)

> 到这一步，shenyu网关已经启动。
>
> 我们可以打开浏览器，访问admin控制台：[http://localhost:9095/](http://localhost:9095/)
>
> 默认账号：admin ，默认密码：123456

#### 启动应用服务

Apache ShenYu提供了Http、Dubbo、SpringCloud等应用接入shenyu网关的样例，位于 `shenyu-example` 模块，这里以Http服务为例。

启动 `shenyu-examples-http`。

![](/img/activities/start-demo-for-contributor/shenyu-examples-http.png)

这时，`shenyu-examples-http` 会自动把加 `@ShenyuSpringMvcClient` 注解的接口方法，以及application.yml中的相关配置注册到网关。我们打开 [admin控制台](http://localhost:9095/)，即可在`插件列表 -> Proxy -> divide` 中看到相关配置。

#### 测试Http请求

下面使用 `IDEA HTTP Client Plugin` 模拟 http 的方式来访问 http 服务。
- 本地访问，不使用 shenyu 代理

    ![](/img/activities/start-demo-for-contributor/shenyu-http-test-api-local.png)

- 使用 shenyu 代理

    ![](/img/activities/start-demo-for-contributor/shenyu-http-test-api.png)

### 使用更多插件

我们可以参考 [官方文档](https://shenyu.apache.org/zh/docs/index)左侧`插件集合`，来使用所需要插件。

## Shenyu 前端启动指南

### 安装 Node.js

#### 下载

1. 在[官网](https://nodejs.org/en)下载并安装Node.js ，选择 `LTS` 版本即可
2. 安装时，除了设置安装路径，其他一直点 `Next` 即可
3. 安装完成后，在命令行中进行验证：
  
    ```shell
    C:\Users\pc>node -v
    v12.22.12
    
    C:\Users\pc>npm -v
    6.14.16
    ```

#### 换源

为了加快 npm 下载速度，需要进行换源：

```shell
# 查看当前源
npm config get registry
# 换为中国 npmmirror 镜像源
npm config set registry https://registry.npmmirror.com
# 查看是否换源成功
npm config get registry
```

### 拉取 ShenYu Dashboard 代码

1. Fork [ShenYu Dashboard](https://github.com/apache/shenyu-dashboard) 仓库
2. 使用 Git 下载到本地：

    ```shell
    git clone git@github.com:${YOUR_USERNAME}/${TARGET_REPO}.git
    ```

### 前后端联合开发

1. 在后端仓库 `shenyu` 的 `shenyu-admin/src/main/resources/application.yml` 文件中按下图所示添加 `enablePrintApiLog: true` ，以在后端控制台显示前端接口被调用的日志。

    ![](/img/activities/start-demo-for-contributor/enable-api-log.png)

2. 启动 `ShenyuAdminBootstrap`

3. 切换至前端仓库 `shenyu-dashboard` ，打开 `README` ，依次点击 `npm install`, `npm start` 或通过命令行输入上述命令即可通过 [http://localhost:8000](http://localhost:8000) 访问前端界面，并可在后端控制台中显示前端接口被调用的日志，实现前后端联合开发。

    ![](/img/activities/start-demo-for-contributor/admin-log.png)

### 打包前端代码

执行 `README` 中 `npm build` 命令，并将 dist 文件夹下生成的所有文件复制到后端仓库中 `shenyu-admin/src/main/resources/static/` 目录下。

## 为 Shenyu 官网做贡献

按照 [shenyu-website](https://github.com/apache/shenyu-website) 中 `README` 进行操作即可。

### 小贴士

1. 可以为 `yarn` 进行换源，流程同 `npm`
2. 建议下载 `Node` [官网](https://nodejs.org/en)中 `LTS` 版本
3. `Windows` 系统无法进行部署，如需对你的更改进行验证，可以在Linux 虚拟机或服务器上进行部署
