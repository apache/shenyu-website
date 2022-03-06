---
title: PredicateJudge-- 基于SPI的设计实现分析
author: Huihui Yin
author_title: Apache ShenYu Contributor
tags: [SPI, Apache ShenYu]
---

灵活的插件和规则定义，是[Shenyu网关](http://shenyu.apache.org/)的一大特色。它以插件形式支持多种网络协议和多种流行的微服务框架，如Dubbo, gRPC和 Spring-Cloud 等。 为了实现对各种协议及插件的配置规则的解析，网关在规则策略解析方面，采用了优雅的`SPI`(Service Provider Interface)实现，当添加新的插件时，规则解析部分可以沿用现有实现或采用`SPI`机制快速实现，具有良好的可扩展性。


## `SPI` 的顶层设计

Shenyu的`SPI`采用接口+ 工厂模式+配置文件的方式，来实现模组的动态加载。在其***shen-`SPI`***-模组，做了`SPI`的顶层设计。定义了@ Join ，@`SPI` 两个annotation。 其中@Join  代表此类会加入扩展机制，相当于是做申请注册。 @`SPI` 标明当前类为`SPI`功能扩展类。

Fig 1 classes in the ***shenyu-spi***

![toplevel-SPI](/img/activities/code-analysis-predicatejudge-spi/toplevel-SPI.png)

配置文件方面，定义`SPI`加载的目录为 `META-INF/shenyu/`

```java
SHENYU_DIRECTORY = "META-INF/shenyu/";
```

系统启动时，会扫描 `SHENYU_DIRECTORY` 下的配置文件，并由 `ExtensionLoader` 类来加载所配置的`SPI`扩展类，并cache到内存中。  配置文件内容为 key=class的形式。 在系统执行期间， 由`ExtensionFactory`的实现类，返回key所对应的`SPI`实现类。 

## shenyu-plugin的`SPI` 实现

在***shenyu-plugin***模组中，按照插件机制，实现了各种请求转发功能，包括支持request, redirect, response, rewrite等http协议功能，及 gRPC, dubbo, hystrix等微服务框架， 并且插件功能还在不断增加中。如果在各自的功能插件实做类中，还要做对routing 参数的解析等处理，不仅会造成程序的冗余，而且当要支持各自匹配规则，如通配符、正则表达式、SpEL解析等，会造成频繁对插件核心代码的修改。因此，在***shenyu-plugin***模组中，将routing参数解析做了更高一层的抽象，并按照`SPI`机制做了规则解析的实现。解析由三个部分组成：

- `ParameterData`-参数资料,  

- `PredictJudge`-断言

- `MatchStrategy`-匹配策略三个`SPI`实现。

  这些扩展类定义在 ***shenyu-plugin-base*** module中，经过这样抽象后，每个插件实现中，routing 参数解析的功能全部由AbstractShenyuPlugin 来调用上述三个`SPI`工厂类来定义和实现。做到了功能的专一，并易于扩展，符合SOLID原则。

本节就其中的`PredictJudge`-断言做详细解析。可以看到这个module中的pom文件中，添加了对***shenyu-`SPI`***的依赖

```xml
<dependency>
    <groupId>org.apache.shenyu</groupId>
    <artifactId>shenyu-spi</artifactId>
    <version>${project.version}</version>
</dependency>
```

### PredicateJudge `SPI` 设计

PredicateJudge `SPI` 实现用来解析判断各类规则，当网关中配置的。这个类命名和功能都类似于java 的[Predicate](https://docs.oracle.com/javase/8/docs/api/java/util/function/Predicate.html)  ，但对接受行为做了更进一步的抽象。这个`SPI`通过一个工厂和策略模式实现，首先来看`PredicateJudge` `SPI`接口的定义：

```java
@SPI
@FunctionalInterface
public interface PredicateJudge {

    /**
     * judge conditionData and realData is match.
     *
     * @param conditionData {@linkplain ConditionData}
     * @param realData       realData
     * @return true is pass  false is not pass.
     */
    Boolean judge(ConditionData conditionData, String realData);
}
```

这部分的类图如下：

Fig 2-Predicate class diagram

![predicate-class-diagram](/img/activities/code-analysis-predicatejudge-spi/predicate-class-diagram.png)

`PredicateJudgeFactory`的重要方法如下：

```java
    public static PredicateJudge newInstance(final String operator) {
        return ExtensionLoader.getExtensionLoader(PredicateJudge.class).getJoin(processSpecialOperator(operator));
    }
```

```java
    public static Boolean judge(final ConditionData conditionData, final String realData) {
        if (Objects.isNull(conditionData) || StringUtils.isBlank(realData)) {
            return false;
        }
        return newInstance(conditionData.getOperator()).judge(conditionData, realData);
    }
```

这里`ConditionData`定义如下包含属性四个String类型的属性： `paramType, operator,paramName,paramValue`

#### ParamTypeEnum

参数 `paramType`必须为系统中枚举类型 `ParamTypeEnum`，默认支持的`paramType`有：

```java
post, uri,query, host, ip,header, cookie,req_method
```

#### OperatorEnum

 `operator` 必须为枚举类型 `OperatorEnum` ，目前支持的操作符有：（注意，严格区分大小写)

```java
   match, =,regex, >,<, contains, SpEL,  Groovy, TimeBefore,TimeAfter
```

基于以上的规则, plugin 模组实现了如下8个 `PredicateJudge` 实现类，分别实现上述operator的逻辑匹配规则.

| Implementation class        | Rule denotes 规则说明                                | corespondece operator |
| --------------------------- | ---------------------------------------------------- | --------------------- |
| `ContainsPredicateJudge`    | 包含关系 "contains"， 实际结果，需要包含所定规则的值 | contains              |
| `EqualsPredicateJudge`      | 相等"="，                                            | =                     |
| `MatchPredicateJudge`       | 用于URI 路径匹配的处理                               | match                 |
| `TimerAfterPredicateJudge`  | 当前local时间是否晚于设定的时间                      | TimeAfter             |
| `TimerBeforePredicateJudge` | 当前local时间是否早于设定的时间                      | TimeBefore            |
| `GroovyPredicateJudge`      | Groovy,设定ParamName的值，与设定ParamValue相同       | Groovy                |
| `RegexPredicateJudge`       | 正则表达式匹配资料                                   | regex                 |

### 调用方法

当要做一组参数的解析时，只需要调用`PredicateJudgeFactory`的judge方法即可：

```java
PredicateJudgeFactory.judge(final ConditionData conditionData, final String realData);
```

### `SPI`配置文件

这些`PredicateJudge`实现类在  `SHENYU_DIRECTORY` 中的config文件中做了配置，在启动时会加加载并cache到内存中。

`PredicateJudge`文件的内容如下，为key=class形式，左边的operator要和`ParamEnum`中的定义一致。

```properties
equals=org.apache.shenyu.plugin.base.condition.judge.EqualsPredicateJudge

contains=org.apache.shenyu.plugin.base.condition.judge.ContainsPredicateJudge
Groovy=org.apache.shenyu.plugin.base.condition.judge.GroovyPredicateJudge
match=org.apache.shenyu.plugin.base.condition.judge.MatchPredicateJudge
regex=org.apache.shenyu.plugin.base.condition.judge.RegexPredicateJudge
SpEL=org.apache.shenyu.plugin.base.condition.judge.SpELPredicateJudge
TimeAfter=org.apache.shenyu.plugin.base.condition.judge.TimerAfterPredicateJudge
TimeBefore=org.apache.shenyu.plugin.base.condition.judge.TimerBeforePredicateJudge
```

## PredicateJudge `SPI`在网关Plugin中的使用

网关系统中，大部分的Plugin 都继承自`AbstractShenyuPlugin`，这个抽象类中，在做选择和规则解析时，调用了上述`SPI`中的`MatchStrategy`，继而在策略判断时调用`PredicateJudge` 的各个断言类来处理。

Plugin与`SPI` 的类图如下:

Fig 3- class diagram of plugins with PredicateJudge and `MatchStrategy` `SPI`

![plugin-SPI-class-diagram](/img/activities/code-analysis-predicatejudge-spi/plugin-SPI-class-diagram.png)

从客户端发来的请求，在系统中调用规则部分的`SPI`的流程如下：

Fig 4- flow chart for Shenyu gateway filter  with parameter processing

![SPI-flow-diagram](/img/activities/code-analysis-predicatejudge-spi/SPI-flow-diagram.png)

- 系统启动时，会加载目录下配置的`SPI`资料到内存中
- 当client有新的请求发到Apache shenyu 网关系统时，在网关内部，会调用对应的plugin
- 对实际请求资料做规则匹配时，会根据所包含的operator,调用的对应的PredicateJudge实现类

## 其他

### PredicateJudge  判断结果举例

#### ContainsPredicateJudge- " contains“ rule

 举例：给定一组参数（ConditionData ）， paramType="uri", paramValue 是 "/http/**"

当应用 ContainsPredicateJudge包含关系时，判断结果如下表：

| ConditionData  (operator="contains") | real data             | judge result |
| ------------------------------------ | --------------------- | ------------ |
| paramType="uri",    "/http/**"       | "/http/**/test"       | true         |
|                                      | "/test/http/**/other" | true         |
|                                      | "/http1/**"           | false        |

其他的几个PredicateJudge的具体功能可参考其代码和测试类.
