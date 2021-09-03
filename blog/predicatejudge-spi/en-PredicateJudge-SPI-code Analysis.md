###  Shenyu PredicateJudge  -- analyze the design based on SPI



Apache Shenyu has been identified as a gateway application which supports a variety of protocols and  microservice frameworks such as  Dubbo, gRPC, Spring-Cloud, etc.  To do this, the product has accomplished an elegant SPI (Service Provider Interface) as its foundation, and make the  Rule data parsing and predicting program very simple , resiliency and security. As to rule data parsing processing,  the SPI design increases the product's scalability. When appending new plugin, in most cases, the   existing module is enough for rule data parsing , otherwise it can be rapidly carry out with tiny effort. 

[TOC]

### Top level design of SPI

 In Apache Shenyu, the SPI archtecure is defined in shenyu-spi module and composed of three parts:   SPI interface,  factory  design pattern,  and configuration file. There is  two interface defined as annotation: @SPI and @Join. When class file with  @Join annotation,  it means that it will join as an SPI extension class, in other words, it is an application or registration.  The  @SPI denotes that the class is an SPI extension class.

Fig 1 classes in the shenyu-spi 

![](toplevel-SPI.png)

The SPI configuration directory is  META-INF/shenyu/.  that is specified:

```
SHENYU_DIRECTORY = "META-INF/shenyu/";
```

When starting the gateway system , the ExtensionLoader will scan config files under  SHENYU_DIRECTORY,   in turn, load and validate and then  initialize each configed class. The configuration file uses  "Key = class-file" format.  During operation of the system,  the corresponding SPI implementation class will be invoked through the factory mechanism.

### Implementation of shenyu-plugin SPI

In shenyu-plugin module,  various plugins for HTTP routing are implemented according to the plugin mechanism, including  request, redirect, response and rewrite, etc.  Plugins for microservice frameworks such as Dubbo, gRPC和 Spring-Cloud, Tars have been developed in the gateway product.  And plugins are still increasing. If  no such  dependent module fo parsing and judge routing  parameters and data,  each plugin is necessary to implement the parsing functions, and has to frequently  modify  to support their matching rules, such as wildcard, regular expression, SpEL expression, etc. Therefore,  they made a high level abstraction for routing parameter data following the SPI framework in  Shenyu plugin module.  The rule analysis consists of three parts:

- ParameterData- parameter data

- PredicatJudge-  predicate whether the actural data match the rule

- MatchStrategy- combine multiple conditions, the final used strategy

  

这些扩展类定义在 shenyu-plugin-base module中，经过这样抽象后，每个插件实现中，routing 参数解析的功能全部由AbstractShenyuPlugin 来调用上述三个SPI工厂类来定义和实现。做到了功能的专一，并易于扩展，符合SOLID原则。

​      This section analyzes the  PredictJudge in detail. You can find the dependency to shenyu-spi in the pom.xml of this module.

```
<dependency>
    <groupId>org.apache.shenyu</groupId>
    <artifactId>shenyu-spi</artifactId>
    <version>${project.version}</version>
</dependency>
```



#### Design of PredicateJudge SPI

PredicateJudge SPI  is used to analyze and judge various routing rules configed in the shenyu gateway.  The name and functions of this SPI are similar to [Predicate](https://docs.oracle.com/javase/8/docs/api/java/util/function/Predicate.html)  in Java, but the acceptance behavior is further  abstracted applying for routing aspect. This SPI is implemented through the Factory pattern.  Let's look at the Predictejudge SPI interface:

```
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

The class diagram is as follows:

Fig 2-Predicate class diagram

![](predicate-class-diagram.png)



The important  methods of PredicateJudgeFactory  are shown as follows:

Whenever need to parsing and matching routing data, you can use

```
    public static PredicateJudge newInstance(final String operator) {
        return ExtensionLoader.getExtensionLoader(PredicateJudge.class).getJoin(processSpecialOperator(operator));
    }
```

```
    public static Boolean judge(final ConditionData conditionData, final String realData) {
        if (Objects.isNull(conditionData) || StringUtils.isBlank(realData)) {
            return false;
        }
        return newInstance(conditionData.getOperator()).judge(conditionData, realData);
    }
```



ConditionData contains of four attributes of String type: paramType, operator,paramName,paramValue 

##### ParamTypeEnum

Where **paramType** must be the  enumeration type  ParamTypeEnum. The default supported paramType are:

```
post, uri,query, host, ip,header, cookie,req_method
```

##### OperatorEnum

**operator** must be the enumeration type OperatorEnum, currently  supported operators are:

```
   match, =,regex, >,<, contains, SpEL,  Groovy, TimeBefore,TimeAfter
```

Base on the above defination , the plugin module provides  the following  eight PredicateJudge  implemetation classes to realize the logic of these operators respectively. 

| Implementatin class       | Logic description                                            | corespondece operator |
| ------------------------- | ------------------------------------------------------------ | --------------------- |
| ContainsPredicateJudge    | "contain" relation, the actual data needs contain the specified string | contains              |
| EqualsPredicateJudge      | equals "="                                                   | =                     |
| MatchPredicateJudge       | used for URI context path matching                           | match                 |
| TimerAfterPredicateJudge  | Whether the local time is after the specified time           | TimeBefore            |
| TimerBeforePredicateJudge | Whether the local time is before the specified time          | TimeAfter             |
| GroovyPredicateJudge      | used Groovy syntax toe set ParamName and value data          | Groovy                |
| RegexPredicateJudge       | used Regex to match                                          | regex                 |

##### How to use PredicateJudge

When you want to parse parameters, you only need to call PredicateJudgeFactory as follows. 

```
PredicateJudgeFactory.judge(final ConditionData conditionData, final String realData);
```

##### SPI profile

The implementation class is configed in the file under directory SHENYU_DIRECTORY . It  will be loaded and cached at startup. 

```
equals=org.apache.shenyu.plugin.base.condition.judge.EqualsPredicateJudge

contains=org.apache.shenyu.plugin.base.condition.judge.ContainsPredicateJudge
Groovy=org.apache.shenyu.plugin.base.condition.judge.GroovyPredicateJudge
match=org.apache.shenyu.plugin.base.condition.judge.MatchPredicateJudge
regex=org.apache.shenyu.plugin.base.condition.judge.RegexPredicateJudge
SpEL=org.apache.shenyu.plugin.base.condition.judge.SpELPredicateJudge
TimeAfter=org.apache.shenyu.plugin.base.condition.judge.TimerAfterPredicateJudge
TimeBefore=org.apache.shenyu.plugin.base.condition.judge.TimerBeforePredicateJudge
```



#### The usage of PredicateJudge SPI in Shenyu gateway

Most plugins in Shenyu are inherited from AbstractShenyuPlugin.  In this abstract class, the filter functions (selection and matching) are achieved through  MatchStrategy SPI, and PredicateJudge will be invoked from MatchStrategy  to predicate each condition data. 

Fig 3- class diagram of plugins with PredicateJudge and MatchStrategy SPI

![](plugin-SPI-class-diagram.png)



The process from client request  calling the routing parsing moodule is showed as following chart.

Fig 4- flow chart for Shenyu gateway filter  with parameter processing

![](SPI-flow-diagram.png)



- When startup, the system will load SPI classes from profile and cache them.
- When the client sends a new request to the Shenyu gateway,  will call the corresponding plugin within  the gateway.
- When analyzing real data with routing rules, the  PredicateJudge implementation class  will be invoked according to the contained operator.

#### Others:

##### Examples of PredicateJudge  judgement

###### ContainsPredicateJudge- " contains“ rule



For example, giving a ConditionData  with: paramType="uri", paramValue 是 "/http/**",  when using the "contains" relation: ContainsPredicateJudge, the matching result is as follows. 

| ConditionData  (operator="contains") | real data             | judge result |
| ------------------------------------ | --------------------- | ------------ |
| paramType="uri",    "/http/**"       | "/http/**/test"       | true         |
|                                      | "/test/http/**/other" | true         |
|                                      | "/http1/**"           | false        |

About other PredicateJudge implemetantion classes, you  can  refer to the code and test classes.





