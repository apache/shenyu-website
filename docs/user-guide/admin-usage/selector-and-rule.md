---
title: Selector And Rule Config
keywords: ["Selector", "Rule"]
description: detailed explanation of selector and rule
---

## Features

This document will introduce the use of selectors and rules in the Apache ShenYu background management system. For the concept and design of selectors and rules, please refer to `Flow Control`.
<img src="/img/shenyu/dataSync/flow-control-en.png" width="60%" height="50%" />

Please refer to the `deployment` document, choose a way to start `shenyu-admin`. For example, [local deployment](../../deployment/deployment-local). After startup, visit `http://localhost:9095`, the default username and password are: `admin` and `123456` .

## Selector

All plugins are displayed in the PluginList, and selectors and rules can be added to each plugin:

<img src="/img/shenyu/basicConfig/pluginHandle/selector_rule_page_en.jpg" width="80%" height="80%" />

For example, add a selector to the `divide` plugin:

<img src="/img/shenyu/basicConfig/pluginHandle/divide_selector_config_en.jpg" width="80%" height="80%" />

* selector detailed explanation：

  * Name: create your selector with a distinguish name.
  * Type: Choose request matching strategy.
    * `custom`: Only handle requests that meet the following matching conditions.
    * `full`: Handle all requests.
  * MatchType: Condition combination type.
    * `and`： Need to meet all conditions.
    * `or`: Meet any of the conditions.
  * Conditions：
    * uri: filter request with uri.
    * header: filter request with request header.
    * query: filter request with query string.
    * ip: filter request with your real ip.
    * host: filter request with your real host.
    * post: not recommend to use.
    * cookie: filter request with cookie.
    * req_method: filter request with request method.
    * condition match:
      * match : fuzzy string matching，recommend to combine with uri，support path-matching.（/test/**).
      * = : matches only if they are equal.
      * regEx : regex matching，match characters in regex expression.
      * contains: when it contains the specified value, it matches.
      * TimeBefore: before the specified time.
      * TimeAfter: after the specified time.
      * exclude: the inverse of the method of `match`.
  * Continued: whether the subsequent selector is still executed.
  * PrintLogs: it will print the matching log with the open option enabled.
  * Enable: whether to enable the plugin.
  * Order：the smaller will have high priorty to execute among multi-selectors.
  * Handler: The operation when the request matches the selector.
* the above picture means: when the prefix of the request uri is `/http`, it will redirect to this service `127.0.0.1:8080`.
* selector advice : combine `uri` conditon and `match` prefix（/contextPath）as the first request filter.
* selector(the same for rule) match condition fuzzy string matching rule:
  * `?` matches one character
  * `*` matches zero or more characters
  * `**` matches zero or more directories in a path

## Rule

<img src="/img/shenyu/basicConfig/pluginHandle/plugin_rule_config_en.jpg" width="80%" height="80%" />

* when the request was passed by the seletor, then it will be processed by the rule, the final filter.
* rule is the final confirmation about how to execute request logically.
* rule detailed explanation：
  * Name：create your rule with a distinguish name.

  * MatchType: you can combine these conditions with 'and' , 'or' operators.

  * Conditions：

    * uri: filter request with uri.
    * header: filter request with request header.
    * query: filter request with query string.
    * ip: filter request with your real ip.
    * host: filter request with your real host.
    * post: not recommend to use.
    * cookie: filter request with cookie.
    * req_method: filter request with request method.

    * condition match:
      * match : fuzzy string matching，recommend to combine with uri，support path-matching.（/test/**).
      * = : matches only if they are equal.
      * regEx : regex matching，match characters in regex expression.
      * contains: when it contains the specified value, it matches.
      * TimeBefore: before the specified time.
      * TimeAfter: after the specified time.
      * exclude: Same function as `match`, flow selection is opposite.

  * PrintLogs: it will print the matching log with the open option enabled.

  * Enable: whether to enable the plugin.

  * Order：the smaller will have high priorty to execute among multi-rules.

  * handle: The operation when the request matches the rule.
* above picture means: when the request `uri` equals to `/http/order/save`, it will execute based on this rule，load strategy is `random`.
* rule advice: combine `uri` condition with `match` the real `uri path` condition as the final filter.
* combine selector means ：when the request `uri` is `/http/order/save`, it will be redicted to `127.0.0.1:8080` by `random` method.


## Match Strategy

Matching mode refers to the matching mode between multiple conditions when a selector or rule is matched. Currently, `and` and `or` are supported.


* `and`

  `and` indicates that a selector or rule can be matched only if more than one condition is met.

  The example below shows that a request must meet both the condition `uri = /http/order/findById` and the condition `id = 100`  to match this rule.

  For example, a real request `http://localhost:9195/http/order/findById?id=100` satisfies both conditions, this rule can be matched.


![](/img/shenyu/basicConfig/selectorRule/match-strategy-and-en.png)


* `or`

  `or` indicates that one of the conditions matches a selector or rule.

  The example below shows that a request matches this rule if it meets either the condition `uri = /http/order/findById` or the condition `id = 100`.

  For example, a real request `http://localhost:9195/http/order/findById?id=99` satisfies the first condition `uri = /http/order/findById`, so it can also match this rule.


![](/img/shenyu/basicConfig/selectorRule/match-strategy-or-en.png)


## Condition Parameter Data

Conditional parameter Settings in selectors and rules are explained again. Suppose the following is a request header for an `Http` request:

```shell
GET http://localhost:9195/http/order/findById?id=100
Accept: application/json
Cookie: shenyu=shenyu_cookie
MyHeader: custom-header
```

In `ShenYu` you can set different conditional parameters to get real data from the request information.

- If the condition parameter is `uri`, then the actual data retrieved is `/http/order/findById`;
- If the condition parameter is `header`, the field name is `MyHeader`, then the actual data retrieved is `custom-header`;
- If the condition parameter is `query`, the field name is `id`, then the actual data retrieved is `100`;
- If the condition parameter is `ip`, then the actual data retrieved is `0:0:0:0:0:0:0:1`;
- If the condition parameter is `host`, then the actual data retrieved is `0:0:0:0:0:0:0:1`;
- If the condition parameter is `post`, the field name is `contextPath`, then the actual data retrieved is `/http`;
- If the condition parameter is `cookie`, the field name is `shenyu`, then the actual data retrieved is `shenyu_cookie`;
- If the condition parameter is `req_method`, then the actual data retrieved is `GET`;

* `uri`(recommended)

  * `uri` matches are based on the `uri` in the path you requested, and there is almost no change in the front end when accessing the gateway.

  * When using `match`, the principle is the same as `SpringMVC` fuzzy matching.
  
  * In selectors, it is recommended to use prefixes in `URI` for matching, while in rules, specific paths are used for matching.

  * When using this matching method, fill in the value of the matching field, as shown in the figure `/http/**`.

  ![](/img/shenyu/basicConfig/selectorRule/parameter-data-uri-en.png)

* `header` 

  * The `header` is matched against the field values in your `http` request header.

  * When using this matching method, you need to fill in the field name and field value. The examples in the figure are `MyHeader` and `custom-header` respectively

  ![](/img/shenyu/basicConfig/selectorRule/parameter-data-header-en.png)

* `query` 

  * This matches the query parameters in your `uri`, such as `/test?id=1`, then the matching method can be selected.

  * When using this matching method, you need to fill in the field name and field value. The examples in the figure are `id` and 1 respectively.

  ![](/img/shenyu/basicConfig/selectorRule/parameter-data-query-en.png)

* `ip`

  * This is matched against the `http` caller's `ip`.

  * Especially in waf plugin, if an `ip` address is found to be attacked, you can add a matching condition, fill in the `ip`, deny the `ip` access.

  * If you use nginx proxy before ShenYu, you can get the right ip with refering to [parsing-ip-and-host](../../developer/custom-parsing-ip-and-host)

  * When using this matching method, fill in the value of the matching field, as shown in the example `192.168.236.75`.

  ![](/img/shenyu/basicConfig/selectorRule/parameter-data-ip-en.png)


* `host` 

  * This is matched against the `http` caller's `host`.

  * Especially in waf plugin, if an `host` address is found to be attacked, you can add a matching condition, fill in the `host`, deny the `host` access.

  * If you use nginx proxy before ShenYu, you can get the right ip with refering to [parsing-ip-and-host](../../developer/custom-parsing-ip-and-host)

  * When using this matching method, fill in the value of the matching field, as shown in the example `localhost`.
  
  ![](/img/shenyu/basicConfig/selectorRule/parameter-data-host-en.png)

* `post` 

  * To get condition parameters from the request context(`org.apache.shenyu.plugin.api.context.ShenyuContext`), reflection is required to get the value of the field, which is not recommended.
  
  * When using this matching method, the field name and value need to be specified. The examples in the figure are `contextPath` and `/http` respectively.
  
  ![](/img/shenyu/basicConfig/selectorRule/parameter-data-post-en.png)


* `cookie` 

  * This is matched against the `Cookie` in the `http` caller's request header as a condition parameter.

  * When using this matching method, you need to fill in the field name and field value. The examples in the figure are `shenyu` and `shenyu_cookie` respectively.
  
  ![](/img/shenyu/basicConfig/selectorRule/parameter-data-cookie-en.png)

* `req_method` 

  * This matches the request form of the `http` caller, such as `GET`, `POST`, etc.

  * When using this matching method, fill in the value of the matching field, as shown in the example `GET`.
  
  ![](/img/shenyu/basicConfig/selectorRule/parameter-data-req_method-en.png)

For a more in-depth understanding of condition parameter fetching, read the source code, package name is `org.apache.shenyu.plugin.base.condition.data`:

|Condition Parameter                      | Class  | 
|:------------------------ |:----- |
|`uri`               |`URIParameterData` |  
|`header`           |`HeaderParameterData` |  
|`query`             |`QueryParameterData` |  
|`ip`              |`IpParameterData` |  
|`host`            |`HostParameterData` |  
|`post`               |`PostParameterData` |  
|`cookie`                |`CookieParameterData` |  
|`req_method`            |`RequestMethodParameterData` |  


## Condition Match Strategy

Condition parameters allow you to retrieve the actual data of the request. How the real data matches the conditional data preset by the selector or rule is realized through the condition match strategy.


* `match` 

  * `match` supports fuzzy matching (`/**`). Request `/http/order/findById` will match if your selector condition is set as follows.

  ![](/img/shenyu/basicConfig/selectorRule/predicate-judge-match-en.png)

* `=` 

  * `=` means that the requested real data is equal to the preset condition data. If your selector condition is set to request uri equal to `/http/order/findById`, then request`/http/order/findById?id=1` can match it.
  
  ![](/img/shenyu/basicConfig/selectorRule/predicate-judge-equals-en.png)

* `regex` 

  * `regex` means that the requested real data can meet the preset condition of the regular expression to match successfully. Suppose your rule condition is set as follows: the request parameter contains an `id` and is a three-digit number. So request `/http/order/findById?id=900` will match.
  
  ![](/img/shenyu/basicConfig/selectorRule/predicate-judge-regex-en.png)

* `contains` 

  * `contains`  means that the requested real data contains the default condition data. Suppose your rule condition is set as follows: request uri contains `findById`. Request `/http/order/findById?id=1` will match.

  ![](/img/shenyu/basicConfig/selectorRule/predicate-judge-contains-en.png)

* `TimeBefore` 

  * `TimeBefore` indicates that the request time will be matched before the preset condition time. Suppose your rule conditions are set as follows: request parameters contain `date` and `date` is less than `2021-09-26 06:12:10`. Request `/http/order/findById?id=100&date=2021-09-22 06:12:10` will match.

  ![](/img/shenyu/basicConfig/selectorRule/predicate-judge-timebefore-en.png)

* `TimeAfter` 

  * `TimeAfter` indicates that the request time will be matched before the preset condition time. Suppose your rule conditions are set as follows: request parameters contain `date` and `date` is greater than `2021-09-26 06:12:10`. Request `/http/order/findById?id=100&date=2021-09-22 06:12:10` will match.

  ![](/img/shenyu/basicConfig/selectorRule/predicate-judge-timeafter-en.png)

* `exclude`

  `exclude` is the inverse of the method of `match`, and some functions of `match` are also available, but it is a matching filter. If your selector condition is set as follows, the request `/http/order/findById` will filter this.

  ![](/img/shenyu/basicConfig/selectorRule/predicate-judge-exclude-en.png)

If you want to further understand conditions matching strategy, please read the source code, the package name is `org.apache.shenyu.plugin.base.condition.judge`:

|Match Strategy                      | Class  | 
|:------------------------ |:----- |
|`match`                   |`MatchPredicateJudge` |  
|`=`                 |`EqualsPredicateJudge` |  
|`regex`                 |`RegexPredicateJudge` |  
|`contains`                  |`ContainsPredicateJudge` |
|`TimeBefore`                    |`TimerBeforePredicateJudge` |  
|`TimeAfter`                    |`TimerAfterPredicateJudge` |
|`exclude`                    |`ExcludePredicateJudge` |

The examples in this article illustrate the use of selectors and rules. The Settings of specific conditions need to be selected according to actual conditions.
