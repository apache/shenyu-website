---
title: 自定义返回结果
description: 自定义网关返回数据格式
---

## 说明

* 本文介绍基于 `Apache ShenYu` 网关返回自定义的数据格式。
* 网关需要统一的返回格式，如果需要自己定义格式，可以进行扩展。


## 默认实现

* 默认的实现为 `org.apache.shenyu.plugin.api.result.DefaultShenyuResult`

* 返回的数据格式如下：

```java
public class DefaultShenyuEntity implements Serializable {

    private static final long serialVersionUID = -2792556188993845048L;

    private Integer code;

    private String message;

    private Object data;

}
```

* 返回的 `json` 格式如下：

```json
{
    "code": -100, //返回码,
    "message": "您的参数错误,请检查相关文档!", //提示字段
    "data": null  // 具体的数据
}
```

## 扩展

* 新增一个类 `CustomShenyuResult` 继承 `org.apache.shenyu.plugin.api.result.ShenyuResult`

```java
 /**
 * The interface shenyu result.
 */
public abstract class ShenyuResult<T> extends ConcurrentHashMap<String, Object> {

    /**
     * Success t.
     *
     * @param code    the code
     * @param message the message
     * @param object  the object
     * @return the t
     */
    public abstract T success(int code, String message, Object object);

    /**
     * Error t.
     *
     * @param code    the code
     * @param message the message
     * @param object  the object
     * @return the t
     */
    public abstract T error(int code, String message, Object object);

    /**
     * put all data and skip the null data.
     *
     * @param m the putting data
     */
    @Override
    public void putAll(final Map<? extends String, ?> m) {
        Optional.ofNullable(m).ifPresent(map -> {
            final Object[] value = {new AtomicReference<>()};
            map.keySet().stream().filter(Objects::nonNull).forEach(key -> {
                if (Objects.nonNull(value[0] = m.get(key))) {
                    put(key, value[0]);
                }
            });
        });
    }
}
```

* 当`Format`使用`xml`时，可以用 `@JacksonXmlRootElement`自定义xml root

```java
@JacksonXmlRootElement(localName = "customroot")
public class CustomShenyuResult extends ShenyuResult<Object> {
    ...
}
```

* 其中泛型 `T` 为自定义的数据格式，返回它就好。

* 把你新增的实现类注册成为`Spring`的`bean`，如下：

```java
@Bean
public ShenyuResult customShenyuResult() {
    return new CustomShenyuResult();
}
```



