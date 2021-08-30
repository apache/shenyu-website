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

*  Declare a new class named `CustomShenyuResult` and implements `org.apache.shenyu.plugin.api.result.ShenyuResult`

```java
 public interface ShenyuResult<T> {
 
     /**
      * Success t.
      *
      * @param code    the code
      * @param message the message
      * @param object  the object
      * @return the t
      */
     T success(int code, String message, Object object);

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

* `T` is a generic parameter for your response data.
* Register defined class as a `Spring Bean`.

```java
    @Bean
    public ShenyuResult customShenyuResult() {
          return new CustomShenyuResult();
    }
```



