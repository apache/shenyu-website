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
* You could reference from [shenyu-plugin](https://github.com/apache/shenyu/tree/master/shenyu-plugin) module and develop plugins by yourself. Please fire pull requests of your wonderful plugins without hesitate.

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

## Single Responsibility Plugin in Multiple Languages

* The above is about writing a single responsibility plugin in Java. If you want to write plugins in another language, at least the language you are good at supporting `WASM`, you can find resources [here](https://shenyu.apache.org/docs/next/design/wasm-plugin-design/) . After you have learned about `WASM`, let's introduce the following dependency to build the Java part of the plugin:

```xml
<dependency>
    <groupId>org.apache.shenyu</groupId>
    <artifactId>shenyu-plugin-wasm-api</artifactId>
    <version>${project.version}</version>
</dependency>
```

* Add a new class `MyShenyuWasmPlugin`, inherit from `org.apache.shenyu.plugin.wasm.api.AbstractWasmPlugin`

```java
package x.y.z;

public class MyShenyuWasmPlugin extends AbstractWasmPlugin {
    
    private static final Map<Long, String> RESULTS = new ConcurrentHashMap<>();
    
    @Override
    public int getOrder() {
        // your plugin order
        return 0;
    }
    
    @Override
    public String named() {
        return "yourPluginName";
    }
    
    @Override
    protected Mono<Void> doExecute(final ServerWebExchange exchange, final ShenyuPluginChain chain, final Long argumentId) {
        final String result = RESULTS.remove(argumentId);
        // Results returned by calling other languages
        return chain.execute(exchange);
    }
    
    @Override
    protected Long getArgumentId(final ServerWebExchange exchange, final ShenyuPluginChain chain) {
        // Need to generate unique IDs for parameters based on exchange and chain
        return 0L;
    }
    
    @Override
    protected Map<String, Func> initWasmCallJavaFunc(final Store<Void> store) {
        Map<String, Func> funcMap = new HashMap<>();
        funcMap.put("get_args", WasmFunctions.wrap(store, WasmValType.I64, WasmValType.I64, WasmValType.I32, WasmValType.I32,
            (argId, addr, len) -> {
                // Callbacks for obtaining parameters from Java in other languages
                String config = "hello from java " + argId;
                LOG.info("java side->" + config);
                ByteBuffer buf = super.getBuffer();
                for (int i = 0; i < len && i < config.length(); i++) {
                    buf.put(addr.intValue() + i, (byte) config.charAt(i));
                }
                return Math.min(config.length(), len);
            }));
        funcMap.put("put_result", WasmFunctions.wrap(store, WasmValType.I64, WasmValType.I64, WasmValType.I32, WasmValType.I32,
            (argId, addr, len) -> {
                // Callbacks that pass call results to Java in other languages
                ByteBuffer buf = super.getBuffer();
                byte[] bytes = new byte[len];
                for (int i = 0; i < len; i++) {
                    bytes[i] = buf.get(addr.intValue() + i);
                }
                String result = new String(bytes, StandardCharsets.UTF_8);
                RESULTS.put(argId, result);
                LOG.info("java side->" + result);
                return 0;
            }));
        return funcMap;
        }
    }
```

* Create projects in other languages, using the Rust language as an example:

```shell
cd {shenyu}/shenyu-plugin/{your_plugin_moodule}/src/main
cargo new --lib your_plugin_name
```

* Add `execute` method in `lib.rs`:

```rust
#[link(wasm_import_module = "shenyu")]
extern "C" {
    fn get_args(arg_id: i64, addr: i64, len: i32) -> i32;

    fn put_result(arg_id: i64, addr: i64, len: i32) -> i32;
}

// Adding `#[no_mangle]` to prevent the Rust compiler from modifying method names is mandatory
#[no_mangle]
pub unsafe extern "C" fn execute(arg_id: i64) {
    let mut buf = [0u8; 32];
    let buf_ptr = buf.as_mut_ptr() as i64;
    eprintln!("rust side-> buffer base address: {}", buf_ptr);
    // Get parameters from Java
    let len = get_args(arg_id, buf_ptr, buf.len() as i32);
    let java_arg = std::str::from_utf8(&buf[..len as usize]).unwrap();
    eprintln!("rust side-> recv:{}", java_arg);
    // Add plugin logic for the Rust section here, such as rpc calls, etc
    // Pass the call result of rust to Java
    let rust_result = "rust result".as_bytes();
    let result_ptr = rust_result.as_ptr() as i64;
    _ = put_result(arg_id, result_ptr, rust_result.len() as i32);
}
```

* Add `[lib]` to `Cargo.toml` and change `crate-type` to `["cdylib"]`. Ultimately, your `Cargo.toml` should look like:

```toml
[package]
name = "your_plugin_name"
version = "0.1.0"
edition = "2021"

[dependencies]
# ......

[lib]
crate-type = ["cdylib"]
```

* Generate the wasm file：

```shell
cargo build --target wasm32-wasi --release
```

* You will see `{shenyu}/shenyu-plugin/{your_plugin_moodule}/src/main/{your_plugin_name}/target/wasm32-wasi/release/{your_plugin_name}.wasm`, then rename it, due to the `x.y.z.MyShenyuWasmPlugin`，the final wasm file name should be `x.y.z.MyShenyuWasmPlugin.wasm`, finally, put the wasm file in the `resources` folder of your plugin module.

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

## Matching Traffic Processing Plugin in Multiple Languages

* The general logic is similar to [Single Responsibility Plugin in Multiple Languages](#Single Responsibility Plugin in Multiple Languages) , but the dependency in Java and the methods that need to be added in other languages are different from `Single Responsibility Plugin in Multiple Languages`. The following are the dependency required for the Java part of the `Multi Language Matching Traffic Processing Plugin`:

```xml
<dependency>
    <groupId>org.apache.shenyu</groupId>
    <artifactId>shenyu-plugin-wasm-base</artifactId>
    <version>${project.version}</version>
</dependency>
```

* The following are the methods that must be added (using the Rust language as an example):

```rust
#[no_mangle]
pub unsafe extern "C" fn doExecute(arg_id: i64) {
    //......
}
```

* The following are optional methods (using the Rust language as an example):

```rust
#[no_mangle]
pub unsafe extern "C" fn before(arg_id: i64) {
    //......
}

#[no_mangle]
pub unsafe extern "C" fn after(arg_id: i64) {
    //......
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


## Plugin jar upload

* To use this feature, you will need to package the `ShenyuPlugin` extension as a custom ShenyuPlugin Jar
* Configure it in ShenyuAdmin
  * use  `ShenyuAdmin - BasicConfig - Plugin` add plugin in `pluginJar` click upload button
* Custom ShenyuPlugin can be started by loading third-party jars into the `-cp` directory if it depends on other third-party packages in shenyu-bootstrap

Tips:

The Upload jar package plugin supports hot loading
If you need to modify the jar online. You can make a new jar. And raise the version number, for example '1.0.1' to '1.0.2'


