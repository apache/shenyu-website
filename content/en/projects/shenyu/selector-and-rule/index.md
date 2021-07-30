---
title: Selector Detailed Explanation
keywords: Apache ShenYu
description: detailed explanation of selector and rule
---

## Features

This document will introduce the use of selectors and rules in the Apache ShenYu background management system. For the concept and design of selectors and rules, please refer to [Flow Control](../flow-control).

Please refer to the `deployment` document, choose a way to start `shenyu-admin`. For example, [local deployment](../deployment-local). After startup, visit `http://localhost:9095`, the default username and password are: `admin` and `123456` . 

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
           * like : string fuzzy matching.
           * contains: when it contains the specified value, it matches.
           * SpEl: SpEl expression matches.
           * Groovy: match through Groovy.
           * TimeBefore: before the specified time.
           * TimeAfter: after the specified time.
     * Continued: whether the subsequent selector is still executed.
     * PrintLogs: it will print the matching log with the open option enabled.
     * Enable: whether to enable the plugin.
     * Order：the smaller will have high priorty to execute among multi-selectors.
     * Handler: The operation when the request matches the selector.

 * the above picture means: when the prefix of the request uri is `/http`, it will redirect to this service `127.0.0.1:8080`.

 * selector advice : combine `uri` conditon and `match` prefix（/contextPath）as the first request filter.

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
           * like : string fuzzy matching.
           * contains: when it contains the specified value, it matches.
           * SpEl: SpEl expression matches.
           * Groovy: match through Groovy.
           * TimeBefore: before the specified time.
           * TimeAfter: after the specified time.

     * PrintLogs: it will print the matching log with the open option enabled.

     * Enable: whether to enable the plugin.

     * Order：the smaller will have high priorty to execute among multi-rules.

     * handle: The operation when the request matches the rule.
* above picture means: when the request `uri` equals to `/http/order/save`, it will execute based on this rule，load strategy is `random`.
* rule advice: combine `uri` condition with `match` the real `uri path` condition as the final filter.
* combine selector means ：when the request `uri ` is `/http/order/save`, it will be redicted to `127.0.0.1:8080` by `random` method.

## Condition Explanation

* uri matching （recommend）

  * uri matching is based on your request uri, the frontend won't change anything before accessing the gateway.

  * the `match` filter method is the same with`springmvc` fuzzy matching.

  * in selector，we recommend to match with the prefix of uri, and use the specific path in rule.

  * when changing the match method, the matching field name can be filled randomly, but make sure the match value must be correct.

* header matching

   * header matches with your `http` request header value.

*  query matching

   * it matches the query string in your uri, such as: /test?a=1&&b=2.

   * so you can add a new condition, choose query method: a   =  1.

*  ip matching

    * it matches the ip of the http caller.

    * especially in the waf plugin, if you find some ip is unsafe, you can add a match condition with this ip, then it can't access any more.

    * if you use nginx proxy before ShenYu, you can get the right ip with refering to [parsing-ip-and-host](../custom-parsing-ip-and-host)

* host matching

  * it matches the host of http caller.

  * especially in waf plugin, if you find some host is unsafe, you can add a match condition with this host, then it can't access any more.

  * if you use nginx proxy before ShenYu, you can get the right ip with refering to [parsing-ip-and-host](../custom-parsing-ip-and-host)

* post matching

    * not recommend to use.


