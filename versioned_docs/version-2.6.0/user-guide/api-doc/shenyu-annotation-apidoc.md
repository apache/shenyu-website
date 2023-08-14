---
title: The client registers the API documentation
keywords: ["api doc register"]
description: The client registers the API documentation
---

This article describes how to expose the `API documentation` to the `Apache ShenYu` gateway.

Before accessing, please start `shenyu-admin` correctly.

## Export API Documentation to shenyu-admin

You can refer to any of the example codes below [shenyu-examples](https://github.com/apache/shenyu/tree/master/shenyu-examples).

The only thing you need to do is to add `@ApiModule` and `@ApiDoc` annotations to your service, here is an example from `shenyu-examples-http`:

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
