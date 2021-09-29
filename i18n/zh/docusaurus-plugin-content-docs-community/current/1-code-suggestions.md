---
title: 编码建议
sidebar_position: 2
description: Apache ShenYu 编码建议
author: "xiaoyu"
categories: "Apache ShenYu"
tags: ["Code Suggestions "]
date: 2019-09-22
cover: "/img/architecture/shenyu-framework.png"
---

## 基本建议

* 请尽可能多的使用`lambda` 表达式，来进行函数式编程。

* 方法参数前面必须使用`final` 关键字修饰。

* `static final` 修饰的常量必须使用大写命名。

* 一个方法不要使用过多的参数，如果过多可以考虑封装成对象。

* 清理掉无用的代码。不要使用 `//` 注释代码。

* 使用 `linux` 换行符号.

* 每行代码前面必须保持 `4` 个 `Tab Siz` 。

* 所有的代码 必须通过 checkStyle的检查: https://github.com/apache/incubator-shenyu/blob/master/script/shenyu_checkstyle.xml

## Object

* 使用`Optional` 来转换 `Null` 对象。

> Optional.ofNullable(xxx).orElse(obj)

* 使用`Objects` 判断对象是否为 `Null` 对象。

> Objects.isNull(obj) OR Objects.nonNull(obj)

* 使用 `Objects.equals` 判断对象是否相等。

> Objects.equals(obj1, obj2)

* 循环创建对象时候，请在循环外面定义对象。

```java
Object object = null;
for () {
    object = new Object();
}
```

## Collection

* 尽可能的指定集合的初始化容量。

### List

* 当你需要更多增删元素的时候，请尽可能的使用 `LinkedList`, 其他场景请使用 `ArrayList`。

* 使用 `org.apache.commons.collections4.CollectionUtils` 判断集合是否为空。

> CollectionUtils.isEmpty(list) or CollectionUtils.isNotEmpty(data)

### Map

* 当在并发场景时候，必须使用 `ConcurrentHashMap`，其他场景请使用 `HashMap`。

* 使用最优的方式迭代或者使用`lambda`表达式。

```java
Set<Map.Entry<String, String>> entrySet = map.entrySet();
Iterator<Map.Entry<String, String>> iter = entrySet.iterator();
while (iter.hasNext()) {
        Map.Entry<String, String> entry = iter.next();
      
}
```

## String

* 使用 `org.apache.commons.lang3.StringUtils` 判断是否为空。

> StringUtils.isEmpty(list) or StringUtils.isNotEmpty(data)

* 使用 `String.join` 来拼接字符串。

> String join(CharSequence delimiter, CharSequence... elements)


## Exception

* 不要在循环内部去捕获异常。

```
try {
  for () {
  }
} catch () {
  
}
```

* 不要使用 `printStackTrace()` 方法来打印异常。

* 抛出异常的时候，请封装成 `ShenyuException`。

## Resource

* 请尽可能的使用 `try with resource` 语句来关闭资源.
