---
sidebar_position: 3
title: Selector Detailed Explanation
keywords: ["soul"]
description: detailed explanation of selector and rule
---

## Features

* Selector and rule are the key point of soul gateway, you can manage any request with it.

* This chapter is mainly focus on the concepts of selector and rule and how to use it.


## Overview

* One plugin has many selector and a selector has many rules, selector is the first filter of request, and the rule is the final filter.
* Please consider this, it would be perfect when the plugin executes the request until it reached the config value.
* Selector and rule are designed to execute only when the request meet the specific condition.
* Please refer to the previous data structure [database design](../design/database-design).

## Selector

![](https://yu199195.github.io/images/soul/selector.png)

 * selector detailed explanation：
 
     * name：create your selector with a distinguish name.
     * type：custom flow is customized request, full flow is full request. customized request will be handled by the conditions as below, while  full request won't. 
     * match method: you can combine these conditions with 'and' , 'or' operators.
     * condition：
        * uri: filter request with uri method and support fuzzy matching (/**).
        * header: filter request with request header.
        * query: filter request with query string.
        * ip: filter request with your real ip.
        * host: filter request with your real host.
        * post: not recommend to use.
        * condition match:
           * match : fuzzy string matching，recommend to combine with uri，support restful matching.（/test/**).
           * = : if the values are the same, then they match.
           * regEx : regex matching，match characters in regex expression.
           * like : string fuzzy matching.
     * open option：only work with enabled.
     * print log：it will print the matching log with the open option enabled.
     * execution order：the smaller will have high priorty to execute among multi-selectors.
  
 * the above picture means: when the prefix of the request uri is `/test` and the value of `module` in`header` is`test`, it will redirect to this service `1.1.1.1:8080`.   

 * selector advice : combine `uri` conditon and `match` prefix（/contextPath）as the first request filter.
 
## Rule
 ![](https://yu199195.github.io/images/soul/rule.png)
 
 * when the request was passed by the seletor, then it will be processed by the rule, the final filter.
 
 * rule is the final confirmation about how to execute request logically.
 
 * rule detailed explanation：
     * name：create your rule with a distinguish name.
     * match method: you can combine these conditions with 'and' , 'or' operators.
     * condition：
        * uri: filter request with uri method and support fuzzy matching (/**).
        * header: filter request with request header.
        * query: filter request with query string.
        * ip: filter request with your real ip.
        * host: filter request with your real host.
        * post: not recommend to use.
        * condition match:
           * match : fuzzy string matching，recommend to combine with uri，support restful matching.（/test/**）
           * = : if the values are the same, then they match.
           * regEx : regex matching，match characters in regex expression.
           * like : string fuzzy matching.
     * open option：only work with enabled.
     * print log：it will print the matching log with the open option enabled.
     * execution order：the smaller will have high priorty to execute among multi-rules.
     * handle: different plugin has different execution method, pls refer to the specific one.

* above picture means: when the request `uri` equals to `/http/order/save`, it will execute based on this rule，load strategy is `random`.

* combine selector means ：when the request `uri ` is `/http/order/save`, it will be redicted to `1.1.1.1:8080` by `random` method.

* rule advice: combine `uri` condition with `match` the real `uri path` condition as the final filter.
    
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
  
    * if you use nginx proxy before soul, you can get the right ip with refering to [parsing-ip-and-host](../developer-guide/custom-parsing-ip-and-host)
 
* host matching

  * it matches the host of http caller.
    
  * especially in waf plugin, if you find some host is unsafe, you can add a match condition with this host, then it can't access any more.
    
  * if you use nginx proxy before soul, you can get the right ip with refering to [parsing-ip-and-host](../developer-guide/custom-parsing-ip-and-host)
    
* post matching

    * not recommend to use.

          
