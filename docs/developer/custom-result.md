---
title: Custom Response
keywords: ["Custom Response"]
description: customising response structure
---

## Description

* This doc offers examples for customising response structure in `Apache ShenYu` gateway.
* The response body structure in gateways should be unified, it is recommended for specify yours.


## Default Implementation

* The default implementation class is `org.apache.shenyu.plugin.api.result.DefaultShenyuResult`.
* Following is the response structure:

```java
public class ShenyuDefaultEntity implements Serializable {

    private static final long serialVersionUID = -2792556188993845048L;

    private Integer code;

    private String message;

    private Object data;

}
```

* The returned `json` as follows:

```json
{
    "code": -100, //response code,
    "message": "Your parameter error, please check the relevant documentation!", //hint messages
    "data": null  // business data
}
```

## Extensions

* Declare a new class named `CustomShenyuResult` and extends `org.apache.shenyu.plugin.api.result.ShenyuResult`

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

* when the `Format` is `xml`, use the `@JacksonXmlRootElement` custom the xml root

```java
@JacksonXmlRootElement(localName = "customroot")
public class CustomShenyuResult extends ShenyuResult<Object> {
    ...
}
```

* `T` is a generic parameter for your response data.
* Register defined class as a `Spring Bean`.

```java
    @Bean
    public ShenyuResult customShenyuResult() {
          return new CustomShenyuResult();
    }
```



