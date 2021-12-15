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

* Declare a new class named `CustomShenyuResult` and implements `org.apache.shenyu.plugin.api.result.ShenyuResult`

```java
/**
 * The interface shenyu result.
 */
public interface ShenyuResult<T> {

    /**
     * The response result.
     *
     * @param exchange the exchange
     * @param formatted the formatted object
     * @return the result object
     */
    default Object result(ServerWebExchange exchange, Object formatted) {
        return formatted;
    }

    /**
     * format the origin, default is json format.
     *
     * @param exchange the exchange
     * @param origin the origin
     * @return format origin
     */
    default Object format(ServerWebExchange exchange, Object origin) {
        // basic data
        if (ObjectTypeUtils.isBasicType(origin)) {
            return origin;
        }
        // error result or rpc origin result.
        return JsonUtils.toJson(origin);
    }

    /**
     * the response context type, default is application/json.
     *
     * @param exchange the exchange
     * @param formatted the formatted data that is origin data or byte[] convert string
     * @return the context type
     */
    default MediaType contentType(ServerWebExchange exchange, Object formatted) {
        return MediaType.APPLICATION_JSON;
    }

    /**
     * Error t.
     *
     * @param code    the code
     * @param message the message
     * @param object  the object
     * @return the t
     */
    T error(int code, String message, Object object);
}
```

> Processing sequence: `format`->`contextType`->`result`. The `format` method performs data formatting. If the data is a basic type and returns itself, other types are converted to `JSON`, and the parameter `origin` is the original data. Formatting can be performed according to the situation. `contextType`, if it is a basic type, use `text/plain`, the default is `application/json`, the parameter `formatted` is the data processed by the `format` method, and can be combined with the return result of `format` for data type Define processing. The parameter `formatted` of `result` is the data processed by the `format` method, which returns to itself by default, and can be combined with the return result of `format` for custom processing of the data type.

* `T` is a generic parameter for your response data.
* Register defined class as a `Spring Bean`.

```java
@Bean
public ShenyuResult<?> customShenyuResult() {
    return new CustomShenyuResult();
}
```



