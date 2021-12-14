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
     * @param object  the object
     * @return the result object
     */
    default Object result(ServerWebExchange exchange, Object object) {
        return object;
    }

    /**
     * format the object, default is json format.
     *
     * @param exchange the exchange
     * @param object the object
     * @return format object
     */
    default Object format(ServerWebExchange exchange, Object object) {
        // basic data
        if (ObjectTypeUtils.isBasicType(object)) {
            return object;
        }
        // error result or rpc object result.
        return JsonUtils.toJson(object);
    }

    /**
     * the response context type, default is application/json.
     *
     * @param exchange the exchange
     * @return the context type
     */
    default MediaType contentType(ServerWebExchange exchange) {
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

> The `format` method will format the data before the `result` method, and the formatting can be performed as needed. By default, basic types return themselves, and other types are converted to JSON.
> For basic types, `contentType` results are discarded and `text/plain` is used.

* `T` is a generic parameter for your response data.
* Register defined class as a `Spring Bean`.

```java
@Bean
public ShenyuResult<?> customShenyuResult() {
    return new CustomShenyuResult();
}
```



