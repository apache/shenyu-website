---
title: Apache ShenYu Start Demo
author: Kunshuai Zhu
author_title: Apache ShenYu Contributor
author_url: https://github.com/JooKS-me
author_image_url: https://avatars1.githubusercontent.com/u/62384022?v=4
tags: [Apache ShenYu]
---

### Environmental preparation

- Install JDK1.8+ locally
- Install Git locally
- Install Maven locally
- Choose a development tool, such as IDEA

### Pull ShenYu code

Use Git to clone code

```shell
> git clone https://github.com/apache/incubator-shenyu.git
```

### Compile code

Compile with Maven

```shell
> cd incubator-shenyu
> mvn clean install -Dmaven.javadoc.skip=true -B -Drat.skip=true -Djacoco.skip=true -DskipITs -DskipTests
```

### Start the gateway service

Use development tools, take IDEA as an example.

Start `shenyu-admin` (use H2 database by default)

![start-demo-admin](/img/activities/start-demo/start-demo-admin.png)

Start `shenyu-bootstrap`

![start-demo-bootstrap](/img/activities/start-demo/start-demo-bootstrap.png)

> At this point, shenyu gateway has been activated.
>
> We can open the browser and access the admin console: [http://localhost:9095/](http://localhost:9095/)

### Start application service

Apache ShenYu provides examples for Http, Dubbo, SpringCloud and other applications to access the shenyu gateway, located in the `shenyu-example` module. Here we take the Http service as an example.

If `shenyu-example` is not marked as a Maven project by IDEA, you can right-click the `pom.xml` file in the `shenyu-example` directory to add it as a Maven project.

![start-demo-maven](/img/activities/start-demo/start-demo-maven.png)

Start `shenyu-examples-http`。

![start-demo-examples-http](/img/activities/start-demo/start-demo-examples-http.png)

At this time, `shenyu-examples-http` will automatically register the interface method annotated with `@ShenyuSpringMvcClient` and the related configuration in application.yml to the gateway. When we open the admin console, you can see the relevant configuration in divide and context-path.

### Test Http request

Now use `postman` to simulate `http` to request your `http` service:

![start-demo-post-http](/img/activities/start-demo/start-demo-post-http.png)

### Use more plugins

We can refer to [Official Document](../docs/index) to use other plugins.

Here is an example of using the param-mapping plugin.

Edit the param-mapping plugin in `BasicConfig -> Plugin` and set `status`.

![start-demo-plugin](/img/activities/start-demo/start-demo-plugin.png)

Configure selectors and rules in `PluginList -> http process`.

![start-demo-selector](/img/activities/start-demo/start-demo-selector.png)

![start-demo-rules](/img/activities/start-demo/start-demo-rules.png)

Then use `postman` to make an http request to `/http/test/payment`.

![start-demo-post-param-mapping](/img/activities/start-demo/start-demo-post-param-mapping.png)
