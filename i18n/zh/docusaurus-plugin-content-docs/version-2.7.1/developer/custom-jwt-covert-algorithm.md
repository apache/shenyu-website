---
title: 自定义JWT插件转化算法
description: 自定义JWT插件转化算法
---



## 说明

+ 用户可以自定义JWT插件中转化算法



## 扩展

  转化算法的默认实现为 `org.apache.shenyu.plugin.jwt.strategy.DefaultJwtConvertStrategy`，采用的是SPI机制进行扩展，步骤如下:

1. 实现接口`org.apache.shenyu.plugin.jwt.strategy.JwtConvertStrategy`

   ```java
   /**
    * Represents a conversion strategy that convert jwt to some attributes of
    * serverWebExchange, especially attributes of the request header.
    */
   @SPI
   public interface JwtConvertStrategy {
   
       /**
        * HandleJson needs to be parsed into jwtRuleHandle in order to
        * specify how to convert jwt.
        *
        * @param handleJson handleJson from rule
        * @return jwtRuleHandle
        */
       JwtRuleHandle parseHandleJson(String handleJson);
   
       /**
        * Converts jwt to some attributes of serverWebExchange based on jwtRuleHandle.
        *
        * @param jwtRuleHandle jwtRuleHandle
        * @param exchange      exchange
        * @param jwtBody       jwtBody
        * @return serverWebExchange
        */
       ServerWebExchange convert(JwtRuleHandle jwtRuleHandle, ServerWebExchange exchange, Map<String, Object> jwtBody);
   
   }
   ```

    ```java
    @Join
    public class CustomJwtConvertStrategy implements JwtConvertStrategy {
    
        @Override
        public CustomJwtRuleHandle parseHandleJson(final String handleJson) {
    
            return GsonUtils.getInstance().fromJson(handleJson, CustomJwtRuleHandle.class);
        }
    
        @Override
        public ServerWebExchange convert(final JwtRuleHandle jwtRuleHandle, final ServerWebExchange exchange, final Map<String, Object> jwtBody) {
            final CustomJwtRuleHandle customJwtRuleHandle = (CustomJwtRuleHandle) jwtRuleHandle;
            String customConvert = customJwtRuleHandle.getCustomConvert();
            ServerHttpRequest modifiedRequest =
                    exchange.getRequest().mutate().header("custom", customConvert).build();
    
            return exchange.mutate().request(modifiedRequest).build();
        }
    }
    
    ```

   

2. 配置SPI

   ```tex
   custom=org.apache.shenyu.plugin.jwt.strategy.CustomJwtConvertStrategy
   ```



说明：系统会根据`JwtRuleHandle`的`handleType`参数来使用不同转化策略，比如下面的`JwtRuleHandle`系统会使用我们上面自定义的`CustomJwtConvertStrategy`。（注意：`handleType`为`default`或者不存在`handleType`属性，系统默认使用`DefaultJwtConvertStrategy`）

```json
{
    "handleType":"custom",
 	"customConvert":"customConvert"
}
```

案例代码可查看`org.apache.shenyu.plugin.jwt.strategy.CustomJwtConvertStrategy`

