---
title: Filter Extension
keywords: ["soul"]
description: filter extension
---


## Description

* This doc shows a demo for how to extend `org.springframework.web.server.WebFliter`.

## CORS Support

* `org.dromara.soul.bootstrap.cors.CrossFilter` is designed for WebFilter implementation.

 ```java
 public class CrossFilter implements WebFilter {
 
     private static final String ALLOWED_HEADERS = "x-requested-with, authorization, Content-Type, Authorization, credential, X-XSRF-TOKEN,token,username,client";
 
     private static final String ALLOWED_METHODS = "*";
 
     private static final String ALLOWED_ORIGIN = "*";
 
     private static final String ALLOWED_EXPOSE = "*";
 
     private static final String MAX_AGE = "18000";
 
     @Override
     @SuppressWarnings("all")
     public Mono<Void> filter(final ServerWebExchange exchange, final WebFilterChain chain) {
         ServerHttpRequest request = exchange.getRequest();
         if (CorsUtils.isCorsRequest(request)) {
             ServerHttpResponse response = exchange.getResponse();
             HttpHeaders headers = response.getHeaders();
             headers.add("Access-Control-Allow-Origin", ALLOWED_ORIGIN);
             headers.add("Access-Control-Allow-Methods", ALLOWED_METHODS);
             headers.add("Access-Control-Max-Age", MAX_AGE);
             headers.add("Access-Control-Allow-Headers", ALLOWED_HEADERS);
             headers.add("Access-Control-Expose-Headers", ALLOWED_EXPOSE);
             headers.add("Access-Control-Allow-Credentials", "true");
             if (request.getMethod() == HttpMethod.OPTIONS) {
                 response.setStatusCode(HttpStatus.OK);
                 return Mono.empty();
             }
         }
         return chain.filter(exchange);
     }
 }
```
* Registering CrossFilter as a Spring Bean and you are ready to go.

## Filtering Spring Boot health check

* You can control the order by applying `@Order` to the implementation class .

```java
@Component
@Order(-99)
public final class HealthFilter implements WebFilter {

    private static final String[] FILTER_TAG = {"/actuator/health", "/health_check"};

    @Override
    public Mono<Void> filter(@Nullable final ServerWebExchange exchange, @Nullable final WebFilterChain chain) {
        ServerHttpRequest request = Objects.requireNonNull(exchange).getRequest();
        String urlPath = request.getURI().getPath();
        for (String check : FILTER_TAG) {
            if (check.equals(urlPath)) {
                String result = JsonUtils.toJson(new Health.Builder().up().build());
                DataBuffer dataBuffer = exchange.getResponse().bufferFactory().wrap(result.getBytes());
                return exchange.getResponse().writeWith(Mono.just(dataBuffer));
            }
        }
        return Objects.requireNonNull(chain).filter(exchange);
    }
}

```

##  Extending `org.dromara.soul.web.filter.AbstractWebFilter`

* Add a new class and inherit from `org.dromara.soul.web.filter.AbstractWebFilter`.
* Implement abstract methods of parent class.

```java
   /**
     * this is Template Method ,children Implement your own filtering logic.
     *
     * @param exchange the current server exchange
     * @param chain    provides a way to delegate to the next filter
     * @return {@code Mono<Boolean>} result：TRUE (is pass)，and flow next filter；FALSE (is not pass) execute doDenyResponse(ServerWebExchange exchange)
     */
    protected abstract Mono<Boolean> doFilter(ServerWebExchange exchange, WebFilterChain chain);

    /**
     * this is Template Method ,children Implement your own And response client.
     *
     * @param exchange the current server exchange.
     * @return {@code Mono<Void>} response msg.
     */
    protected abstract Mono<Void> doDenyResponse(ServerWebExchange exchange);
```
* if method `doFilter` returns Mono `true`, this filter is passing, but not vice versa. While rejecting, it will call method `doDenyResponse` and sending infos in response body to frontend.




