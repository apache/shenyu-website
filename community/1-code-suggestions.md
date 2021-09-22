---
title: Code Suggestions
sidebar_position: 2
description: Apache ShenYu Coding Guide
author: "xiaoyu"
categories: "Apache ShenYu"
tags: ["Code Suggestions"]
date: 2019-09-22
cover: "/img/architecture/shenyu-framework.png"
---

## General 

* Use as many `lambda function` expressions as possible.

* Method parameters must be modified with `final`.

* Constants modified `static final` must be named in upper case.

* Methods should not have too many parameters.

* Clear unused classes and methods.

* Use linux line separators.

* Tab size is 4 and keep indents on empty lines.

* All code passage of Checkstyle: https://github.com/apache/incubator-shenyu/blob/master/script/shenyu_checkstyle.xml

## Object

* Ues Optional transform Null.

> Optional.ofNullable(xxx).orElse(obj)

* Ues Objects Judgment Null Or NotNull.

> Objects.isNull(obj) OR Objects.nonNull(obj)

* Ues `Objects.equals` Judgment are they equal.

> Objects.equals(obj1, obj2)

* Creater objects outside of a for loop.

```java
Object object = null;
for () {
    object = new Object();
}
```

## Collection

* must indicate initial capacity to avoid recalculate capacity.

### List

* Use `LinkedList` when you need to add or delete elements, Else use `ArrayList`.

* Ues `org.apache.commons.collections4.CollectionUtils` Judgment Is empty Or Not empty.

> CollectionUtils.isEmpty(list) or CollectionUtils.isNotEmpty(data)

### Map

* Use `ConcurrenHashMap` when considering concurrency of threads, Else use `HashMap`.

* Iterate over map using the most efficient way Or use `lambda function`.

```java
Set<Map.Entry<String, String>> entrySet = map.entrySet();
Iterator<Map.Entry<String, String>> iter = entrySet.iterator();
while (iter.hasNext()) {
        Map.Entry<String, String> entry = iter.next();
      
}
```

## String

* Ues `org.apache.commons.lang3.StringUtils` Judgment Is empty Or Not empty.

> StringUtils.isEmpty(list) or StringUtils.isNotEmpty(data)

* `String.join` should be used when string concatenation occurs.

> String join(CharSequence delimiter, CharSequence... elements)


## Exception

* Do not use try...catch in a loop, it should be on the outermost layer.

```
try {
  for () {
  }
} catch () {
  
}
```

* Do not use `printStackTrace()`.

* Please use custom exceptions or `ShenyuException`.

## Resource

* Please use `try with resource` to close resource.
