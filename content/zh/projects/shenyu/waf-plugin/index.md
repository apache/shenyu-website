---
title: Waf插件
keywords: waf
description: waf插件
---

## 说明

* waf插件，是网关的用来对流量实现防火墙功能的核心实现。

## 插件设置

请参考运维部署的内容，选择一种方式启动`shenyu-admin`。比如，通过 [本地部署](https://shenyu.apache.org/zh/projects/shenyu/deployment-local) 启动`ShenYu`后台管理系统。

* 在 `shenyu-admin` 基础配置 --> 插件管理 --> `waf` ，设置为开启。如果用户不想使用此功能，请在admin后台停用此插件。

  <img src="/img/shenyu/plugin/waf/waf_open_zh.jpg" width="80%" height="80%" />

* 插件编辑里面新增配置模式。

```yaml
{"model":"black"}
# model 可选值为 black, mixed
# 默认为 black 黑名单模式，设置值为 mixed 则为混合模式，下面会专门进行讲解
```

## 在网关中引入 Waf 插件

* 在网关的 `pom.xml` 文件中添加 `waf` 的依赖。

```xml
  <!-- shenyu waf plugin start-->
  <dependency>
      <groupId>org.apache.shenyu</groupId>
      <artifactId>shenyu-spring-boot-starter-plugin-waf</artifactId>
      <version>${last.version}</version>
  </dependency>
  <!-- shenyu waf plugin end-->
```

## Waf 插件配置

关于选择器和规则配置的更多说明，请参考：[选择器和规则管理](https://shenyu.apache.org/zh/projects/shenyu/selector-and-rule)， 这里只对部分字段进行了介绍。

`Waf`插件规则配置页面：

<img src="/img/shenyu/plugin/waf/waf_rule_zh.jpg" width="80%" height="80%" />

注：被 `Waf` 拒绝访问的请求，响应头状态码为：`403` 。

#### 黑名单模式

- 当 `model` 设置为 `black` 黑名单模式的时候，只有匹配的流量才会执行拒绝策略，不匹配的，直接会跳过。
- 此时规则配置中的 `处理` 配置失效，可配置为空。

#### 混合模式

* 当 `model` 设置为 `mixed` 混合模式的时候，所有的流量都会通过 waf插件，针对不同的匹配流量，用户可以设置是拒绝，还是通过。

* 此时规则配置中的 `处理` 配置必选：

  * permission：匹配到该规则的处理逻辑。reject--拒绝访问，allow--允许访问。

  * statusCode：被拒绝访问时，响应体中code字段的值， <font color=red>不会修改响应头的状态码</font>。

    例如设置为：statusCode=10001，被拒绝的响应体如下：

    ```
    {"code":10001,"message":"You are forbidden to visit"}
    ```

    

## 场景

* waf插件也是 ShenYu 的前置插件，主要用来拦截非法请求，或者异常请求，并且给与相关的拒绝策略。
* 当面对重放攻击时，你可以根据ip或者host来进行匹配，拦截掉非法的 ip 与 host，设置 reject 策略。
* 关于如何确定 ip 与 host 值，请看 [parsing-ip-and-host](../custom-parsing-ip-and-host)
