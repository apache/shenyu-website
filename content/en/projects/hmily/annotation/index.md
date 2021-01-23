---
title: Hmily Annotation
keywords: annotation
description: Hmily Annotation
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

 * This annotation is the interface identification of Hmily Distributed Transaction,it indicated that the interface participates in Hmily Distributed Transaction.

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

  * This annotation is the AOP point of TCC Mode of Hmily Distributed Transaction,it can add on your local concrete implementation method.

  * `confirmMethod` : to annotate the identification method,it is the method name for `confirm`,the method parameter list and return type should be consistent with the identification method.

  * `cancelMethod` :  to annotate the identification method,it is the method name for `rollback`,the method parameter list and return type should be consistent with the identification method.


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

 * This annotation is the AOP point of TAC Mode of Hmily Distributed Transaction,it can add on your local concrete implementation method.

