---
title: 自定义mock数据生成器
description: 自定义mock数据生成器
---
## 说明

1. 本文介绍如何对 `org.apache.shenyu.plugin.mock.generator.Generator` 进行自定义扩展。
2. mock 数据生成表达式需要满足 `${name|param1|param2|...}` 的格式。

## 扩展实现

* 新建一个工程，引入如下依赖：

```xml
<dependencies>
    <dependency>
        <groupId>org.apache.shenyu</groupId>
        <artifactId>shenyu-plugin-mock</artifactId>
        <version>${project.version}</version>
    </dependency>
</dependencies>
```

* 新增一个类 `CustomerGenerator`，实现 `org.apache.shenyu.plugin.mock.generator.Generator`。

```java
@Join
public class CustomGenerator implements Generator<String> {
    @Override
    public String getName() {
       // 生成器的名称,即 表达式第一个 | 之前的内容
    }
    
    @Override
    public String generate() {
        // 实现数据生成的逻辑
    }
    
    @Override
    public int getParamSize() {
        // 表达式必填参数的个数
    }
    
    @Override
    public void initParam(List params, String rule) {
        // params 会返回 表达式按照 | 切分后，除名称之外的内容
        // rule 原表达式的内容，如果有自定的参数处理逻辑 可以使用这个参数
    }
    
    @Override
    public boolean match(String rule) {
        // 校验当前表达式是否可以合法
    }
    
    @Override
    public String[] getPrefixAndSuffix() {
        // 返回 生成内容之后添加的前缀和后缀 ，请返回 包含两个元素的字符串数组
        // 第 0 个元素是前缀，第 1 个元素是后缀
    }
}
```

* 在工程的 META-INF/shenyu 目录创建 `org.apache.shenyu.plugin.mock.generator.Generator`文件中添加如下内容：

```shell script
${spi name}=${custom class path}
``` 

`${spi name}`表示`spi`的名称，`${spi name }` 需要与 Generator 实现类中 getName() 方法定义的一致 `${custom class path}`表示该类的全限定名。比如：

```shell script
custom=xxx.xxx.xxx.CustomGenerator
```

* 将工程打包，拷贝到网关 (bootstrap-bin) 的 `lib` 或 `ext-lib` 目录。
