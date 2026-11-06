---
title: Custom Jwt convert Algorithm
keywords: ["Custom Jwt Convert"]
description: Custom Jwt convert Algorithm
---



## Description

* Users can customize the convert algorithm of `Jwt-plugin` to achieve convert.



## Extension

 The default implementation is `org.apache.shenyu.plugin.jwt.strategy.DefaultJwtConvertStrategy`. The SPI mechanism is adopted for extension, and the steps are as follows:

1. Implements interface `org.apache.shenyu.plugin.jwt.strategy.JwtConvertStrategy`

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

2. Configures SPI

      ```tex
      custom=org.apache.shenyu.plugin.jwt.strategy.CustomJwtConvertStrategy
      ```



The project would use different conversion strategies based on the`handleType` parameter of  `JwtRuleHandle` . For example, for the following `JwtRuleHandle`,the project  would use our above `CustomJwtConvertStrategy` . (Note: ` handleType ` is `default` or nonexistent, the project would use default `DefaultJwtConvertStrategy`)

```json
{
    "handleType":"custom",
 	"customConvert":"customConvert"
}
```

The case code is available for viewing in `org.apache.shenyu.plugin.jwt.strategy.CustomJwtConvertStrategy`

