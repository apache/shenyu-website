---
title: 自定义条件参数
keywords: ["ParameterData"]
description: 自定义条件参数
---

本文介绍如何对 `org.apache.shenyu.plugin.base.condition.data.ParameterData` 进行自定义扩展。

* 新建一个工程，引入如下依赖：

```xml
<dependencies>
    <dependency>
        <groupId>org.apache.shenyu</groupId>
        <artifactId>shenyu-plugin-base</artifactId>
        <version>${project.version}</version>
    </dependency>
</dependencies>
```

* 新增一个类 `CustomParameterData`，实现 `org.apache.shenyu.plugin.base.condition.data.ParameterData` 接口 ，添加注解`org.apache.shenyu.spi.Join`。

```java
/**
 * This is custom parameter data.
 */
@Join
public class CustomParameterData implements ParameterData {
    
    @Override
    public String builder(final String paramName, final ServerWebExchange exchange) {
        // 自定义条件参数
    }
}
```

* 在工程的META-INF/services目录创建 `org.apache.shenyu.plugin.base.condition.data.ParameterData` 文件中添加如下内容：

```shell script
${spi name}=${custom class path}
``` 

`${spi name}`表示`spi`的名称，`${custom class path}`表示该类的全限定名。比如：

```shell script
custom=xxx.xxx.xxx.CustomParameterData
```

* 将工程打包，拷贝到网关 (bootstrap-bin) 的 `lib` 或 `ext-lib` 目录。

* 在`Apache ShenYu`网关管理系统 --> 基础配置 --> 字典管理， 找到字典编码为 `PARAM_TYPE`，新增一条数据，注意字典名称要为: `${spi name}`，图中的示例是`custom`。

<img src="/img/shenyu/custom/custom_parameter_data_zh.png" width="70%" height="60%" />

> 字典类型：`paramType`；
>
> 字典编码：`PARAM_TYPE`；
>
> 字典名称：`${spi name}`，填写自定义`spi`的名称；
>
> 字典值：使用时，下拉框的值，不要和现有的重复；
>
> 字典描述或备注信息：描述信息；
>
> 排序： 排序；
>
> 状态：打开或关闭。

* 在添加选择器或规则时，就可以使用自定义的条件参数：

<img src="/img/shenyu/custom/use_custom_parameter_data_zh.png" width="80%" height="70%" />
