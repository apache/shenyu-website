---
title: Hmily-annotation
keywords: annotation
description: annotation
---

### @Hmily

```java
/**
 * The annotation Hmily.
 *
 * @author xiaoyu
 */
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
public @interface Hmily {

}
```

 * 该注解为hmily分布式事务接口标识，表示该接口参与hmily分布式事务

### @HmilyTCC

```java
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
public @interface HmilyTCC {

    /**
     * Confirm method string.
     *
     * @return the string
     */
    String confirmMethod() default "";

    /**
     * Cancel method string.
     *
     * @return the string
     */
    String cancelMethod() default "";

    /**
     * Pattern pattern enum.
     *
     * @return the pattern enum
     */
    TransTypeEnum pattern() default TransTypeEnum.TCC;
}
```

  * 该注解为Hmily分布式事务TCC模式的切面（AOP point），可以标识在你本地具体实现方法上。

  * `confirmMethod` : 注解标识方法的，确认方法名称，该方法参数列表与返回类型应与标识方法一致。

  * `cancelMethod` :  注解标识方法的，回滚方法名称，该方法参数列表与返回类型应与标识方法一致。


### @HmilyTAC

```java
/**
 * The annotation HmilyTAC.
 *
 * @author xiaoyu
 */
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
public @interface HmilyTAC {

}
```

 * 该注解为Hmily分布式事务TAC模式的切面（AOP point），可以标识在你的本地方法具体实现上。

