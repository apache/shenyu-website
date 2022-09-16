---
title: Custom Plugin
keywords: ["Custom Plugin"]
description: plugins
---

## Description

* Plugins are core executors of `Apache ShenYu` gateway. Every plugin handles matched requests when enabled.
* There are two kinds of plugins in the `Apache ShenYu` gateway.
  * The first type is a chain with single responsibility, and can not custom filtering of traffic.
  * The other one can do its own chain of responsibility for matched traffic.
* You could reference from [shenyu-plugin](https://github.com/apache/shenyu/tree/v2.5.0/shenyu-plugin) module and develop plugins by yourself. Please fire pull requests of your wonderful plugins without hesitate.

## Single Responsibility Plugins

* Add following dependency:

```xml
<dependency>
    <groupId>org.apache.shenyu</groupId>
    <artifactId>shenyu-plugin-api</artifactId>
    <version>${project.version}</version>
</dependency>
```

* Declare a new class named `MyShenyuPlugin` and implements `org.apache.shenyu.plugin.api.ShenyuPlugin`

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
     * this is plugin name define you must offer the right name.
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

Detailed instruction of interface methods:

* `execute()` core method, you can do any task here freely.
* `getOrder()` get the order of current plugin.
* `named()` acquire the name of specific plugin that uses the `Camel Case`, eg: `dubbo`, `springCloud` .
* `skip()` determines whether this plugin should be skipped under certain conditions.
* Register plugin in `Spring` as a `Bean`, or simply apply `@Component` in implementation class.

```java
    @Bean
    public ShenyuPlugin myShenyuPlugin() {
        return new MyShenyuPlugin();
    }
```


## Matching Traffic Processing Plugin

* Introduce the following dependency:

```xml
 <dependency>
        <groupId>org.apache.shenyu</groupId>
        <artifactId>shenyu-plugin-base</artifactId>
        <version>${project.version}</version>
  </dependency>
```

* Add a new class `CustomPlugin`, inherit from `org.apache.shenyu.plugin.base.AbstractShenyuPlugin`

* examples down below:

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

* Detailed explanation:

  * Plugins will match the selector rule for customized plugins inherit from this abstract class.

  * Firstly define a new plugin in `shenyu-admin`  –> BasicConfig –> Plugin, please mind that your plugin name should match the `named()` method overridden in your class.

  * Re-login  `shenyu-admin`, the plugin you added now showing on plugin-list page, you can choose selectors for matching.

  * There is a field named `handler` in rules, it is customized json string to be processed. You can process data after acquiring a ruleHandle (`final String ruleHandle = rule.getHandle();`) in `doExecute()` method.

* Register plugin in `Spring` as a `Bean`, or simply apply `@Component` in implementation class.

```java
    @Bean
    public ShenyuPlugin customPlugin() {
        return new CustomPlugin();
    }
```

## Subscribe your plugin data and do customized jobs

* Declare a new class named `PluginDataHandler` and implements `org.apache.shenyu.plugin.base.handler.PluginDataHandler`

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

* Ensure `pluginNamed()` is same as the plugin name you defined.
* Register defined class as a `Spring Bean`, or simply apply `@Component` in implementation class.

```java
@Bean
public PluginDataHandler pluginDataHandler() {
  return new PluginDataHandler();
}
```

## Dynamic loading

* When using this feature, the above extensions `ShenyuPlugin`, `PluginDataHandler`, do not need to be `spring bean`. You just need to build the jar package of the extension project.

* Config in Yaml：

```yaml
shenyu:
  extPlugin:
    path:  //Load the extension plugin jar package path
    enabled: true //Whether to turn on 
    threads: 1  //Number of loading plug-in threads
    scheduleTime: 300  //Cycle time (in seconds)
    scheduleDelay: 30 //How long the shenyu gateway is delayed to load after it starts (in seconds)
```

#### Plugin loading path details

* This path is for the directory where the extended plugin jar package is stored。

* Used `-Dplugin-ext=xxxx`, Also used `shenyu.extPlugin.path` in yaml，If neither is configured, the `ext-lib` directory in the apache shenyu gateway boot path will be loaded by default.

* Priority ：`-Dplugin-ext=xxxx` > `shenyu.extPlugin.path` > `ext-lib(default)`
