---
title: 插件扩展
keywords: ["扩展"]
description: 插件扩展
---

## 说明

* 插件是 `Apache ShenYu` 网关的核心执行者，每个插件在开启的情况下，都会对匹配的流量，进行自己的处理。
* 在 `Apache ShenYu` 网关里面，插件分为两类。
  * 一类是单一职责的调用链，不能对流量进行自定义的筛选。
  * 一类是能对匹配的流量，执行自己的职责调用链。
* 用户可以参考 [shenyu-plugin](https://github.com/apache/shenyu/tree/v2.4.2/shenyu-plugin) 模块，新增自己的插件处理，如果有好的公用插件，可以向官网提交`pr`。

## 单一职责插件

* 引入如下依赖：

```xml
<dependency>
    <groupId>org.apache.shenyu</groupId>
    <artifactId>shenyu-plugin-api</artifactId>
    <version>${project.version}</version>
</dependency>
```

* 用户新增一个类 `MyShenyuPlugin`，直接实现 `org.apache.shenyu.plugin.api.ShenyuPlugin`

```java
public interface ShenyuPlugin {

    /**
     * Process the Web request and (optionally) delegate to the next
     * {@code WebFilter} through the given {@link ShenyuPluginChain}.
     *
     * @param exchange the current server exchange
     * @param chain    provides a way to delegate to the next filter
     * @return {@code Mono<Void>} to indicate when request processing is complete
     */
    Mono<Void> execute(ServerWebExchange exchange, ShenyuPluginChain chain);

    /**
     * return plugin order .
     * This attribute To determine the plugin execution order in the same type plugin.
     *
     * @return int order
     */
    int getOrder();

    /**
     * acquire plugin name.
     * this is plugin name define you must Provide the right name.
     * if you impl AbstractShenyuPlugin this attribute not use.
     *
     * @return plugin name.
     */
    default String named() {
        return "";
    }

    /**
     * plugin is execute.
     * if return true this plugin can not execute.
     *
     * @param exchange the current server exchange
     * @return default false.
     */
    default Boolean skip(ServerWebExchange exchange) {
        return false;
    }
}

```

* 接口方法详细说明

  * `execute()` 方法为核心的执行方法，用户可以在里面自由的实现自己想要的功能。

  * `getOrder()` 指定插件的排序。

  * `named()` 指定插件的名称，命名采用`Camel Case`，如：`dubbo`、`springCloud`。

  * `skip()` 在特定的条件下，该插件是否被跳过。


* 注册成`Spring`的`bean`，参考如下，或者直接在实现类上加 `@Component` 注解。

```java
    @Bean
    public ShenyuPlugin myShenyuPlugin() {
        return new MyShenyuPlugin();
    }
```


## 匹配流量处理插件

* 引入如下依赖：

```xml
        <dependency>
            <groupId>org.apache.shenyu</groupId>
            <artifactId>shenyu-plugin-base</artifactId>
            <version>${project.version}</version>
        </dependency>
```

* 新增一个类 `CustomPlugin`，继承 `org.apache.shenyu.plugin.base.AbstractShenyuPlugin`

* 以下是参考：

```java
/**
 * This is your custom plugin.
 * He is running in after before plugin, implement your own functionality.
 * extends AbstractShenyuPlugin so you must user shenyu-admin And add related plug-in development.
 *
 * @author xiaoyu(Myth)
 */
public class CustomPlugin extends AbstractShenyuPlugin {

    /**
     * return plugin order .
     * The same plugin he executes in the same order.
     *
     * @return int
     */
    @Override
    public int getOrder() {
        return 0;
    }

    /**
     * acquire plugin name.
     * return you custom plugin name.
     * It must be the same name as the plug-in you added in the admin background.
     *
     * @return plugin name.
     */
    @Override
    public String named() {
        return "shenYu";
    }

    /**
     * plugin is execute.
     * Do I need to skip.
     * if you need skip return true.
     *
     * @param exchange the current server exchange
     * @return default false.
     */
    @Override
    public Boolean skip(final ServerWebExchange exchange) {
        return false;
    }

    /**
     * this is Template Method child has Implement your own logic.
     *
     * @param exchange exchange the current server exchange
     * @param chain    chain the current chain
     * @param selector selector
     * @param rule     rule
     * @return {@code Mono<Void>} to indicate when request handling is complete
     */
    @Override
    protected abstract Mono<Void> doExecute(ServerWebExchange exchange, ShenyuPluginChain chain, SelectorData selector, RuleData rule) {
        LOGGER.debug(".......... function plugin start..............");
        /*
         * Processing after your selector matches the rule.
         * rule.getHandle() is you Customize the json string to be processed.
         * for this example.
         * Convert your custom json string pass to an entity class.
         */
        final String ruleHandle = rule.getHandle();

        final Test test = GsonUtils.getInstance().fromJson(ruleHandle, Test.class);

        /*
         * Then do your own business processing.
         * The last execution  chain.execute(exchange).
         * Let it continue on the chain until the end.
         */
        System.out.println(test.toString());
        return chain.execute(exchange);
    }
}

```

* 详细讲解：

  * 继承该类的插件，插件会进行选择器规则匹配。

  * 首先在 `shenyu-admin` 后台管理系统 --> 基础配置 --> 插件管理 中，新增一个插件，注意 名称与 你自定义插件的 `named()` 方法要一致。

  * 重新登陆  `shenyu-admin` 后台，可以看见刚新增的插件，然后就可以进行选择器规则匹配。

  * 在规则中，有个 `handler` 字段，是自定义处理数据，在 `doExecute()` 方法中，通过 `final String ruleHandle = rule.getHandle();` 获取，然后进行你的操作。

* 注册成`Spring`的`bean`，参考如下或者直接在实现类上加 `@Component` 注解。

```java
    @Bean
    public ShenyuPlugin customPlugin() {
        return new CustomPlugin();
    }
```

## 订阅你的插件数据，进行自定义的处理

* 新增一个类 `PluginDataHandler`，实现 `org.apache.shenyu.plugin.base.handler.PluginDataHandler`

```java
public interface PluginDataHandler {

    /**
     * Handler plugin.
     *
     * @param pluginData the plugin data
     */
    default void handlerPlugin(PluginData pluginData) {
    }

    /**
     * Remove plugin.
     *
     * @param pluginData the plugin data
     */
    default void removePlugin(PluginData pluginData) {
    }

    /**
     * Handler selector.
     *
     * @param selectorData the selector data
     */
    default void handlerSelector(SelectorData selectorData) {
    }

    /**
     * Remove selector.
     *
     * @param selectorData the selector data
     */
    default void removeSelector(SelectorData selectorData) {
    }

    /**
     * Handler rule.
     *
     * @param ruleData the rule data
     */
    default void handlerRule(RuleData ruleData) {
    }

    /**
     * Remove rule.
     *
     * @param ruleData the rule data
     */
    default void removeRule(RuleData ruleData) {
    }

    /**
     * Plugin named string.
     *
     * @return the string
     */
    String pluginNamed();

}
```

* 注意 `pluginNamed()` 要和你自定义的插件名称相同。

* 注册成`Spring`的`bean`，参考如下或者直接在实现类上加 `@Component` 注解。

```java
@Bean
public PluginDataHandler pluginDataHandler() {
    return new PluginDataHandler();
}
```

## 动态加载自定义插件

* 当使用此功能时候，上述扩展 `ShenyuPlugin`, `PluginDataHandler`, 不用成为 `spring bean`。只需要构建出扩展项目的jar包即可。

* 使用以下配置：

```yaml
shenyu:
  extPlugin:
    path:  //加载扩展插件jar包路径
    enabled: true //是否开启
    threads: 1  //加载插件线程数量
    scheduleTime: 300 //间隔时间（单位：秒）
    scheduleDelay: 30 //网关启动后延迟多久加载（单位：秒）
```

#### 插件加载路径详解

* 此路径是为存放扩展插件jar包的目录。

* 可以使用 `-Dplugin-ext=xxxx` 指定，也可以使用 `shenyu.extPlugin.path`配置文件指定，如果都没配置，默认会加载网关启动路径下的 `ext-lib`目录。

* 优先级 ：`-Dplugin-ext=xxxx` > `shenyu.extPlugin.path` > `ext-lib(default)`
