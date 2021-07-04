---
title: 插件处理详解
keywords: plugin
description: 插件处理详解
---


### 使用教程

比如开发springCloud插件时规则表需要存一些配置到handle字段，配置对应的实体类如下：

```java
    public class SpringCloudRuleHandle implements RuleHandle {
    
        /**
         * this remote uri path.
         */
        private String path;
    
        /**
         * timeout is required.
         */
        private long timeout = Constants.TIME_OUT;
        
    }
```

第一步，我们可以直接在 `PluginHandle` 界面 `http://localhost:9095/#/config/pluginhandle` 新增/编辑handle字段

![](/img/shenyu/basicConfig/pluginHandle/01.png)

第二步，例如给springCloud新增一个字符串类型字段path和一个数字类型字段timeout

![](/img/shenyu/basicConfig/pluginHandle/02.png)

第三步，在插件规则配置页面新增规则时就可以直接输入path、timeout然后提交保存到handle字段了

![](/img/shenyu/basicConfig/pluginHandle/03.png)

*注意：如果配置了data_type为3 选择框，则规则新增页面里输入框下拉选择是通过field字段去[字典表（shenyu_dict）](../dictionary-management)查出所有可选项出来展示选择。*

* 比如sentinel插件包含多种数据类型的字段，如下图：

![](https://yu199195.github.io/images/soul/sentinel-rule-handle.png)
