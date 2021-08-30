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
public class ShenyuDefaultEntity implements Serializable {

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

*  新增一个类 `CustomShenyuResult` 实现 `org.apache.shenyu.plugin.api.result.ShenyuResult`

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

* 其中泛型 `T` 为自定义的数据格式，返回它就好。

* 把你新增的实现类注册成为`Spring`的`bean`，如下：

```java
    @Bean
public ShenyuResult customShenyuResult() {
        return new CustomShenyuResult();
        }
```



