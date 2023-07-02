---
title: Flow Control
keywords: ["flow-control"]
description:  flow-control
---

ShenYu gateway realizes flow control through plugins, selectors and rules. For related data structure, please refer to the previous [Apache ShenYu Admin Database Design](./database-design) .


### Plugin

In Apache ShenYu Admin System, each plugin uses Handle (JSON format) fields to represent different processing, and the plugin processing is used to manage and edit the custom processing fields in the JSON.

The main purpose of this feature is to enable plugins to handle templated configurations.

### Selector And Rule

Selector and rule are the most soul of Apache ShenYu Gateway. Master it and you can manage any traffic.

A plugin has multiple selectors, and one selector corresponds to multiple rules. The selector is the first level filter of traffic, and the rule is the final filter. For a plugin, we want to meet the traffic criteria based on our configuration before the plugin will be executed. Selectors and rules are designed to allow traffic to perform what we want under certain conditions. The rules need to be understood first.

The execution logic of plugin, selector and rule is as follows. When the traffic enters into ShenYu gateway, it will first judge whether there is a corresponding plugin and whether the plugin is turned on. Then determine whether the traffic matches the selector of the plugin. It then determines whether the traffic matches the rules of the selector. If the request traffic meets the matching criteria, the plugin will be executed. Otherwise, the plugin will not be executed. Process the next one. ShenYu gateway is so through layers of screening to complete the flow control.

<img src="/img/shenyu/dataSync/flow-control-en.png" width="40%" height="30%" />


### Traffic filtering

<img src="/img/shenyu/design/flow-condition.png" width="30%" height="30%" />

Traffic filtering is the soul of the selector and the rule, corresponding to the matching conditions in the selector and the rule. According to different traffic filtering rules, we can deal with various complex scenes. Traffic filtering can fetch data from Http requests such as `Header`, `URI`, `Query`, `Cookie`, etc.

You can then use `Match`, `=`, `SpEL`, `Regex`, `Groovy`, `Exclude`, etc, to Match the desired data. Multi-group matching Adds matching policies that can use And/Or.


please refer to [Selector And Rule Config](../user-guide/admin-usage/selector-and-rule) for details.
