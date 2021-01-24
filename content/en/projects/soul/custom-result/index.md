---
title: customising response structure
keywords: soul
description: customising response structure
---

## description

* This doc offers examples for customising response structure.

* The response body structure in gateways should be unified, it is recommended for specify yours. 


### default implementation

* The default implementation class is `org.dromara.soul.plugin.api.result.DefaultSoulResult`

* Following is the response structure:

```java
public class SoulDefaultEntity implements Serializable {

    private static final long serialVersionUID = -2792556188993845048L;

    private Integer code;

    private String message;

    private Object data;

}
```

* The returned json as follows:
```json
{
    "code": -100, //response code,
    "message": "您的参数错误,请检查相关文档!", //hint messages
    "data": null  // business data
}
```

## extensions

*  Declare a new class named "A" and implements `org.dromara.soul.plugin.api.result.SoulResult`

```java
 public interface SoulResult<T> {
 
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

* T is a generic parameter for your response data.


* Register defined class as a Spring Bean.

```java
    @Bean
    public SoulResult a() {
          return new A();
    }
```



