---
title: 客户端注册API文档
keywords: ["api doc 接口 文档 register 注册"]
description: 客户端注册API文档
---

此篇文介绍如何将 `API文档` 暴露到 `Apache ShenYu` 网关。

接入前，请正确启动 `shenyu-admin`。

## API文档暴露到网关

可以参考[shenyu-examples](https://github.com/apache/shenyu/tree/master/shenyu-examples)下面任意一个example的代码。

唯一需要做的就是在你的服务中的新增`@ApiModule`和`@ApiDoc`注解，以下是`shenyu-examples-http`中的例子:
```java
@RestController
@RequestMapping("/order")
@ShenyuSpringMvcClient("/order")
@ApiModule(value = "order")
public class OrderController {

    @GetMapping("/findById")
    @ShenyuSpringMvcClient("/findById")
    @ApiDoc(desc = "findById")
    public OrderDTO findById(@RequestParam("id") final String id) {
        return build(id, "hello world findById");
    }

    private OrderDTO build(final String id, final String name) {
        OrderDTO orderDTO = new OrderDTO();
        orderDTO.setId(id);
        orderDTO.setName(name);
        return orderDTO;
    }
}
```
