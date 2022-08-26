---
title: Custom Parameter Data
keywords: ["ParameterData"]
description: Custom Parameter Data
---

This paper describes how to customize the extension of  `org.apache.shenyu.plugin.base.condition.data.ParameterData`.

* Create a new project and introduce the following dependencies:

```xml
<dependencies>
    <dependency>
        <groupId>org.apache.shenyu</groupId>
        <artifactId>shenyu-plugin-base</artifactId>
        <version>${project.version}</version>
    </dependency>
</dependencies>
```

* Create a new class `CustomParameterData`, implements `org.apache.shenyu.plugin.base.condition.data.ParameterData`, add annotation `org.apache.shenyu.spi.Join`.

```java
/**
 * This is custom parameter data.
 */
@Join
public class CustomParameterData implements ParameterData {
    
    @Override
    public String builder(final String paramName, final ServerWebExchange exchange) {
        // custom parameter data
    }
}
```

* In the project's META-INF/services directory, create `org.apache.shenyu.plugin.base.condition.data.ParameterData` file, add key-value as following:

```shell script
${spi name} = ${custom class path}
``` 

`${spi name}` represents the name of `spi` and `${custom class path}` represents the fully qualified name of the class. Such as:

```shell script
custom=xxx.xxx.xxx.CustomParameterData
```

* Package the project and copy it to the `lib` or `ext-lib` directory of the gateway (bootstrap-bin).

* In the `Apache ShenYu` gateway management system --> BasicConfig --> Dictionary,  find the dictionary code as `PARAM_TYPE`, add a new piece of data, pay attention to the dictionary name: `${spi name}`.

<img src="/img/shenyu/custom/custom_parameter_data_en.png" width="70%" height="60%" />

> DictionaryType: `paramType`;
>
> DictionaryCode: `PARAM_TYPE`;
>
> DictionaryName: `${spi name}`, input your custom spi name;
>
> DictionaryValue: When used, the value of the drop-down box, do not repeat with the existing;
>
> DictionaryDescribe: desc your custom match strategy;
>
> Sort: to sort;
>
> Status: open or close.

* When adding selectors or rules, you can use custom parameter data:

<img src="/img/shenyu/custom/use_custom_parameter_data_en.png" width="80%" height="70%" />
