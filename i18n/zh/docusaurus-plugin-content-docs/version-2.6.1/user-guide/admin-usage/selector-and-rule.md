---
title: 选择器和规则管理
keywords: ["选择器", "规则"]
description: 选择器和规则管理
---

本文档将介绍`Apache ShenYu`后台管理系统中选择器和规则的使用，关于选择器和规则的概念及设计请参考 [流量控制](../../design/flow-control)。

请参考运维部署的内容，选择一种方式启动`shenyu-admin`。比如，通过 [本地部署](../../deployment/deployment-local) 启动`Apache ShenYu`后台管理系统。 启动成功后，可以直接访问 `http://localhost:9095` ，默认用户名和密码分别为: `admin` 和 `123456`。

## 选择器

在插件列表中展示了当前的所有插件，可以给每个插件添加选择器和规则：

![](/img/shenyu/basicConfig/pluginHandle/selector_example.png)


例如，给`divide`插件添加选择器：

![](/img/shenyu/basicConfig/pluginHandle/selector_add.png)

* 选择器详解：

  * 名称：给选择器取一个名字。
  * 类型：自定义流量(`custom flow`) 或 全流量(`full flow`)。自定义流量就是请求会走下面的匹配方式与条件。全流量则不走。
  * 匹配方式：`and`或者 `or` 是指下面多个条件是按照 并(`and`) 还是 或(`or`) 的方式来组合。
  * 条件：
    * `uri`：根据 `uri` 的方式来筛选流量，`match` 的方式支持模糊匹配（`/**`）
    * `header`：根据请求头里面的字段来筛选流量。
    * `query`：根据 `uri` 的查询条件来进行筛选流量。
    * `ip`：根据请求的真实 `ip` 来筛选流量。
    * `host`：根据请求的真实 `host` 来筛选流量。
    * `post`：根据请求上下文获取参数，不建议使用。
    * `cookie`：根据请求的 `cookie` 来筛选流量。
    * `req_method`：根据请求的方式来筛选流量。
    * 条件匹配：
      * `match`：模糊匹配，建议和`uri`条件搭配，支持 `restful` 风格的匹配。（`/test/**`）
      * `=`：前后值相等，才能匹配。
      * `regEx`：正则匹配，表示前面一个值去匹配后面的正则表达式。
      * `contains`：请求包含指定的值，才能匹配。
      * `TimeBefore`：指定时间之前。
      * `TimeAfter`：指定时间之后。
      * `exclude`： 是 `match` 方式的反选。
      * `startsWith`：请求前缀等于指定的值，才能匹配。在特定场景下，可替换 `match` （如用`/test/`来替换`/test/**`）以获得更好的性能。
      * `endsWith`：请求后缀等于指定的值，才能匹配。
      * `pathPattern`：是 `match` 的优化版，性能比`match`更好，但是不支持将`**`写在path中间（如`/api/**/xxx`）。
  * 继续后续选择器：后续选择器还是否执行。
  * 是否开启：打开才会生效。
  * 打印日志：打开时，当匹配上的时候，会打印匹配日志。
  * 执行顺序：当多个选择器的时候，执行顺序小的优先执行，值越小优先级越高。
  * 处理：即`handle`字段，在 [插件处理管理](./plugin-handle-explanation) 中进行设置。作用是：当请求流量匹配上该选择器时，做什么样的处理操作。 在选择器中，`handle`字段往往用来表示用户手动维护的服务实例列表，每条服务实例信息包含以下字段：
    - `host`：host地址
    - `ip:port`：ip+port地址
    - `protocol`：协议
    - `weight`：服务实例的权重
    - `warmupTime`：服务预热时间
    - `startupTime`：服务开启时间
    - `status`：true: 服务节点可用，false: 服务节点不可用

> **注意**：对于引入了服务发现模块的插件（如Divide插件、Grpc插件和WebSocket插件），选择器页面上不展示处理（即`handle`字段），而是通过`服务发现`标签页下的local模式来手动维护服务下游实例列表，详见[服务发现模块](../discovery/discovery-mode) 。

* 上述图片中表示: 当请求的 `uri` 前缀是 `/http`，会转发到 `127.0.0.1:8080` 这个服务上。
* 选择器建议：可以通过设置 `uri` 条件， `startsWith` 前缀（`/contextPath/`）匹配，进行第一道流量筛选。
* 选择器(同规则)模糊匹配条件规则：
  * `?` 匹配1个字符
  * `*` 匹配0个或多个字符
  * `**`  匹配0个或多个目录

## 规则

![](/img/shenyu/basicConfig/pluginHandle/rule_handle.png)

* 当流量经过选择器匹配成功之后，会进入规则来进行最终的流量匹配。
* 规则是对流量最终执行逻辑的确认。
* 规则详解：
  * 名称：给规则取一个名字。
  * 匹配方式：`and` 或者 `or` 是指下面多个条件的组合方式。
  * 条件：
    * `uri`：根据 `uri` 的方式来筛选流量，`match` 的方式支持模糊匹配（`/**`）
    * `header`：根据请求头里面的字段来筛选流量。
    * `query`：根据 `uri` 的查询条件来进行筛选流量。
    * `ip`：根据请求的真实 `ip` 来筛选流量。
    * `host`：根据请求的真实 `host` 来筛选流量。
    * `post`：不建议使用。
    * `cookie`：根据请求的 `cookie` 来筛选流量。
    * `req_method`：根据请求的 `req_method` 来筛选流量。
    * 条件匹配：
      * `match`：模糊匹配，建议和`uri`条件搭配，支持 `restful` 风格的匹配。（`/test/**`）
      * `=`：前后值相等，才能匹配。
      * `regEx`：正则匹配，表示前面一个值去匹配后面的正则表达式。
      * `contains`：请求包含指定的值，才能匹配。
      * `TimeBefore`：指定时间之前。
      * `TimeAfter`：指定时间之后。
      * `exclude`： 是 `match` 方式的反选。
      * `startsWith`：请求前缀等于指定的值，才能匹配。在特定场景下，可替换 `match` （如用`/test/`来替换`/test/**`）以获得更好的性能。
      * `endsWith`：请求后缀等于指定的值，才能匹配。
      * `pathPattern`：是 `match` 的优化版，性能比`match`更好，但是不支持将`**`写在path中间（如`/api/**/xxx`）。
  * 是否开启：打开才会生效。
  * 打印日志：打开时，当匹配上的时候，才会打印匹配日志。
  * 执行顺序：当多个规则的时候，执行顺序小的优先执行。
  * 处理：即`handle`字段，在 [插件处理管理](./plugin-handle-explanation) 中进行设置。每个插件的规则处理不一样，具体请查看每个对应插件的处理。

* 上图表示：当 `uri` 等于  `/http/order/save` 的时候能够匹配上该规则，就会执行该规则中，负载策略是 `random`，重试次数是 `3` 等处理操作。
* 规则建议：可以`uri` 条件， `match` 最真实的`uri路径`，进行流量的最终筛选 。

联合选择器，我们来表述一下：当一个请求的 `uri` 为 `/http/order/save`，会通过 `random` 的方式，转发到 `127.0.0.1:8080` 机器上。

## 匹配方式

匹配方式是指在选择器或规则匹配时，多个条件之间的匹配方式，当前支持 `and` 和 `or`。

* `and`

  `and`表示多个条件同时满足才能匹配上选择器或规则。

  下图中的示例表示，请求必须同时满足条件 `uri = /http/order/findById` 和 条件 `id = 100` 才能匹配上该条规则。

  比如一个真实的请求 `http://localhost:9195/http/order/findById?id=100` 能够同时满足上述两个条件，所以可以匹配上该条规则。

![](/img/shenyu/basicConfig/selectorRule/match-strategy-and-zh.png)


* `or`

  `or`表示多个条件中满足一个就能匹配上选择器或规则。

  下图中的示例表示，请求满足条件 `uri = /http/order/findById` 或者 条件 `id = 100` 就能匹配上该条规则。

  比如一个真实的请求 `http://localhost:9195/http/order/findById?id=99` 能够满足上述第一个条件 `uri = /http/order/findById`，所以也可以匹配上该条规则。

![](/img/shenyu/basicConfig/selectorRule/match-strategy-or-zh.png)

## 条件参数

对选择器和规则中的条件参数设置再次进行解释。假如下面是一个 `HTTP` 请求的请求头：

```shell
GET http://localhost:9195/http/order/findById?id=100
Accept: application/json
Cookie: shenyu=shenyu_cookie
MyHeader: custom-header
```

在`ShenYu`中可以通过设置不同的条件参数从请求信息中获取真实数据。

- 如果条件参数是`uri`，那么获取到的真实数据是 `/http/order/findById`；
- 如果条件参数是`header`，字段名称是`MyHeader`，那么获取到的真实数据是 `custom-header`；
- 如果条件参数是`query`，字段名称是`id`，那么获取到的真实数据是 `100`；
- 如果条件参数是`ip`，那么获取到的真实数据 `0:0:0:0:0:0:0:1`；
- 如果条件参数是`host`，那么获取到的真实数据是 `0:0:0:0:0:0:0:1`；
- 如果条件参数是`post`，字段名称是`contextPath`，那么获取到的真实数据是 `/http`；
- 如果条件参数是`cookie`，字段名称是`shenyu`，那么获取到的真实数据是 `shenyu_cookie`；
- 如果条件参数是`req_method`，那么获取到的真实数据是 `GET`。


* `uri`  （推荐）

  * `uri` 匹配是根据你请求路径中的 `uri` 来进行匹配，在接入网关的时候，前端几乎不用做任何更改。

  * 当使用 `match` 方式匹配时候，同 `springmvc` 模糊匹配原理相同。

  * 在选择器中，推荐使用 `uri` 中的前缀来进行匹配，而在规则中，则使用具体路径来进行匹配。

  * 使用该匹配方式的时候，填写匹配字段的值，图中的示例是`/http/**`。

  ![](/img/shenyu/basicConfig/selectorRule/parameter-data-uri-zh.png)

* `header`

  * `header` 是根据你的 `http` 请求头中的字段值来匹配。

  * 使用该匹配方式的时候，需要填写字段名称和字段值，图中的示例分别是`MyHeader`和`custom-header`。

  ![](/img/shenyu/basicConfig/selectorRule/parameter-data-header-zh.png)

* `query`

  * 这个是根据你的 `uri` 中的查询参数来进行匹配，比如 `/test?id=1`，那么可以选择该匹配方式。

  * 使用该匹配方式的时候，需要填写字段名称和字段值，图中的示例分别是`id`和`1`。

  ![](/img/shenyu/basicConfig/selectorRule/parameter-data-query-zh.png)

* `ip`

  * 这个是根据 `http` 调用方的 `ip` 来进行匹配。

  * 尤其是在 `waf` 插件里面，如果发现一个 `ip`地址有攻击，可以新增一条匹配条件，填上该 `ip`，拒绝该 `ip` 的访问。

  * 如果在 `Apache ShenYu` 前面使用了 `nginx` 代理，为了获取正确的 `ip`，可以参考 [自定义解析IP与Host](../../developer/custom-parsing-ip-and-host) 。

  * 使用该匹配方式的时候，填写匹配字段的值，图中的示例是`192.168.236.75`。

  ![](/img/shenyu/basicConfig/selectorRule/parameter-data-ip-zh.png)


* `host`

  * 这个是根据 `http` 调用方的 `host` 来进行匹配。

  * 尤其是在 `waf` 插件里面，如果发现一个 `host` 地址有攻击，可以新增一条匹配条件，填上该 `host`，拒绝该 `host` 的访问。

  * 如果在 `Apache ShenYu` 前面使用了 `nginx` 代理，为了获取正确的 `host`，可以参考 [自定义解析IP与Host](../../developer/custom-parsing-ip-and-host) 。

  * 使用该匹配方式的时候，填写匹配字段的值，图中的示例是`localhost`。

  ![](/img/shenyu/basicConfig/selectorRule/parameter-data-host-zh.png)

* `post`

  * 从请求上下文（`org.apache.shenyu.plugin.api.context.ShenyuContext`）中获取条件参数，需要通过反射获取字段的值，不推荐使用此方式。

  * 使用该匹配方式的时候，需要填写字段名称和字段值，图中的示例分别是`contextPath`和`/http`。

  ![](/img/shenyu/basicConfig/selectorRule/parameter-data-post-zh.png)


* `cookie`

  * 这个是根据 `http` 调用方的请求头中`Cookie`作为条件参数进行匹配。

  * 使用该匹配方式的时候，需要填写字段名称和字段值，图中的示例分别是`shenyu`和`shenyu_cookie`。

  ![](/img/shenyu/basicConfig/selectorRule/parameter-data-cookie-zh.png)

* `req_method`

  * 这个是根据 `http` 调用方的请求形式来进行匹配，比如`GET`、`POST`等。

  * 使用该匹配方式的时候，填写匹配字段的值，图中的示例是`GET`。

  ![](/img/shenyu/basicConfig/selectorRule/parameter-data-req_method-zh.png)

如果想更深入理解条件参数的获取，请阅读相关源码，包名是`org.apache.shenyu.plugin.base.condition.data`：

|条件参数                   | 源码类  | 
|:------------------------ |:----- |
|`uri`                 |`URIParameterData` |  
|`header`             |`HeaderParameterData` |  
|`query`               |`QueryParameterData` |  
|`ip`               |`IpParameterData` |  
|`host`              |`HostParameterData` |  
|`post`                |`PostParameterData` |  
|`cookie`                  |`CookieParameterData` |  
|`req_method`                 |`RequestMethodParameterData` |  


## 条件匹配策略

通过条件参数能够获取到请求的真实数据。真实数据如何匹配上选择器或规则预设的条件数据，是通过条件匹配策略来实现。

* `match`

  `match` 的方式支持模糊匹配（`/**`）。假如你的选择器条件设置如下，那么请求 `/http/order/findById` 就可以匹配上。

  ![](/img/shenyu/basicConfig/selectorRule/predicate-judge-match-zh.png)

* `=`

  `=` 的方式表示请求的真实数据和预设的条件数据相等。假如你的选择器条件设置如下：请求`uri`等于`/http/order/findById`，那么请求 `/http/order/findById?id=1` 就可以匹配上。

  ![](/img/shenyu/basicConfig/selectorRule/predicate-judge-equals-zh.png)

* `regex`

  `regex` 的方式表示请求的真实数据能够满足预设条件的正则表达式才能匹配成功。假如你的规则条件设置如下：请求参数中包含`id`，并且是3位数字。那么请求 `/http/order/findById?id=900` 就可以匹配上。

  ![](/img/shenyu/basicConfig/selectorRule/predicate-judge-regex-zh.png)

* `contains`

  `contains` 的方式表示请求的真实数据包含预设的条件数据。假如你的规则条件设置如下：请求`uri`中包含`findById`。那么请求 `/http/order/findById?id=1` 就可以匹配上。

  ![](/img/shenyu/basicConfig/selectorRule/predicate-judge-contains-zh.png)

* `TimeBefore`

  `TimeBefore` 的方式表示请求时间在预设的条件时间之前才能匹配成功。假如你的规则条件设置如下：请求参数中包含`date`，并且`date`小于`2021-09-26 06:12:10`。那么请求 `/http/order/findById?id=100&date=2021-09-22 06:12:10` 就可以匹配上。

  ![](/img/shenyu/basicConfig/selectorRule/predicate-judge-timebefore-zh.png)

* `TimeAfter`

  `TimeAfter` 的方式表示请求时间在预设的条件时间之后才能匹配成功。假如你的规则条件设置如下：请求参数中包含`date`，并且`date`大于`2021-09-26 06:12:10`。那么请求 `/http/order/findById?id=100&date=2021-09-29 06:12:10` 就可以匹配上。

  ![](/img/shenyu/basicConfig/selectorRule/predicate-judge-timeafter-zh.png)

* `exclude`

  `exclude` 的方式是 `match` 方式的反选，`match` 有的功能也都有，但是是匹配过滤。假如你的选择器条件设置如下，那么请求 `/http/order/findById` 就会过滤这个。

  ![](/img/shenyu/basicConfig/selectorRule/predicate-judge-exclude-zh.png)

* `startsWith`

  `startsWith` 的方式表示请求的真实数据的前缀和预设的条件数据相等。假如你的规则条件设置如下：请求`uri`中前缀等于`/http/`。那么请求 `/http/order/findById?id=1` 就可以匹配上。

  ![](/img/shenyu/basicConfig/selectorRule/predicate-judge-startswith-zh.png)

* `endsWith`

  `endsWith` 的方式表示请求的真实数据的后缀和预设的条件数据相等。假如你的规则条件设置如下：请求`uri`中后缀等于`Id`。那么请求 `/http/order/findById?id=1` 就可以匹配上。

  ![](/img/shenyu/basicConfig/selectorRule/predicate-judge-endswith-zh.png)

* `pathPattern`

  跟 `match` 类似， `pathPattern` 支持模糊匹配（`/**`）。假如你的规则条件设置如下，那么请求 `/http/order/findById` 就可以匹配上；
  
  但是注意：不支持将`**`写在path中间（如`/api/**/xxx`）!

  ![](/img/shenyu/basicConfig/selectorRule/predicate-judge-pathpattern-zh.png)

如果想更深入理解条件匹配策略，请阅读相关源码，包名是`org.apache.shenyu.plugin.base.condition.judge`：

|匹配策略                      | 源码类  | 
|:------------------------ |:----- |
|`match`                   |`MatchPredicateJudge` |  
|`=`                       |`EqualsPredicateJudge` |  
|`regex`                   |`RegexPredicateJudge` |  
|`contains`                |`ContainsPredicateJudge` |
|`TimeBefore`              |`TimerBeforePredicateJudge` |  
|`TimeAfter`               |`TimerAfterPredicateJudge` |
|`exclude`                 |`ExcludePredicateJudge` |
|`startsWith`              |`StartsWithPredicateJudge` |
|`endsWith`                |`EndsWithPredicateJudge` |
|`pathPattern`              |`PathPatternPredicateJudge` |

文中的示例是为了说明选择器和规则的使用，具体条件的设置需要根据实际情况选择。
