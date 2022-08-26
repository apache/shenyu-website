---
title: Plugin Config
keywords: ["plugin"]
description: plugin handle explanation
---

## Explanation

This document will introduce the use of plugins in the `shenyu-admin` , including plugin management and plugin handle management.

Please refer to the `deployment` document, choose a way to start `shenyu-admin`. For example, [local deployment](../../deployment/deployment-local). After startup, visit `http://localhost:9095`, the default username and password are: `admin` and `123456` .

## Plugin management

In the plugin management, you can manage all plugins in a unified manner, such as turning off or turning on plugins:

<img src="/img/shenyu/basicConfig/pluginHandle/plugin_open_en.jpg" width="80%" height="80%" />

You can also set configuration information for some plugins, such as setting a registry for `Dubbo`  plugin:

<img src="/img/shenyu/basicConfig/pluginHandle/plugin_config_en.jpg" width="80%" height="80%" />

## Plugin handle management

In plugin handle management, you can add `handle` fields to plugin, selector, and rule.

For example, add a string type field `path` and a digital type field `timeout` to the rule list of the `SpringCloud` plugin.

1. add/edit the `handle` field in the `shenyu-admin`-> BasicConfig -> PluginHandle :

<img src="/img/shenyu/basicConfig/pluginHandle/plugin_handle_field_config_en.jpg" width="80%" height="80%" />

2. Fill in the field information:

<img src="/img/shenyu/basicConfig/pluginHandle/plugin_handle_add_en.jpg" width="80%" height="80%" />

- PluginName: Drop down to select which plugin needs to add the `handle` field.
- Field: Add the name of the field.
- Describe: Field description.
- DataType: Field data type.
  - If the `DropDown` is selected, the drop-down selection of the input box on the rule addition page is to go to the dictionary table to find all the available options through the field name to select, so you need to config the selection in [Dictionary Management](./dictionary-management).
- FieldType: This field belongs to selector, rule or plugin.
- Sort: Sequence number.
- Required: Is this field required.
- DefaultValue: Specify a default value for this field.
- Placeholder: The message that appears when the user fills in the field.
- Rule (RegExp): The verification rule when the user fills in the field。

3. When adding a rule in the PluginList -> rpc proxy -> `SpringCloud` -> you can enter `path` and `timeout` :

<img src="/img/shenyu/basicConfig/pluginHandle/plugin_handle_setting_plugin_rule_en.jpg" width="80%" height="80%" />
