---
title: Dictionary Management
keywords: ["dict"]
description: dict management explanation
---

## Explanation

This document will introduce the use of dictionary management in the Apache ShenYu background management system. Dictionary management is primarily used to maintain and manage common data dictionaries.

Please refer to the `deployment` document, choose a way to start `shenyu-admin`. For example, [local deployment](../../deployment/deployment-local). After startup, visit `http://localhost:9095`, the default username and password are: `admin` and `123456` .

The current usage scenario is in the [pluginHandle ](./plugin-handle-explanation), when the data type is selected as the `dropdown`:

<img src="/img/shenyu/basicConfig/dictionaryManagement/dictionary_pluginhandle_config_en.jpg" width="80%" height="50%" />

In dictionary management, you can add dictionary types for other places:

<img src="/img/shenyu/basicConfig/dictionaryManagement/dictionary_config_en.jpg" width="80%" height="50%" />

- DictionaryType: The field name used in the `pluginHandle` .
- DictionaryCode: Identify dictionary data.
- DictionaryName: The name of the `handle` field when adding plugins, selectors or rules.
- DictionaryValue: The actual value of the dictionary data.
- DictionaryDescribe: Description.
- Sort: Dictionary data order.

e.g. `degradeRuleGrade` is one of fields of Sentinel's `handle` json. When it adds rules, it automatically looks up all the general dictionaries of `type='degradeRuleGrade'` in the `shenyu_dict` table as a select-box when you edit the General rules field.

<img src="/img/shenyu/basicConfig/dictionaryManagement/dictionary_add_rule_en.jpg" width="80%" height="50%" />


