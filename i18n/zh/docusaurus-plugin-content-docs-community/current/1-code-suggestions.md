---
title: 编码建议
sidebar_position: 1
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

* 每行代码前面必须保持 `4` 个 `Tab Size` 。

* 所有的代码 必须通过 checkStyle的检查: https://github.com/apache/shenyu/blob/master/script/shenyu_checkstyle.xml

* 添加新文件时，需要在文件头添加 [apache协议](https://github.com/apache/shenyu-website/blob/57f9a6b14c27d97137275453b207232f3df53205/LICENSE#L191-L201)

* 尽量不直接使用第三方工具类，先查看本项目util包下是否包含。

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

## 判断和处理 Null 的几种方式

* 判断自身是否为 Null，然后需要对自身转换的，以下是几个代表实例。    
    目前 ： ```result.setXXX(null == a ? b.getXXX() : b.getXXX(a));```  
    建议 ： ```Optional.ofNullable(a).map(b::getXXX).orElse(b.getXXX());```  
    目前 ： ```return null == a ? b.newC() : b.newC(a.getD(), a.getE());```    
    建议 ： ```return Optional.ofNullable(a).map(e -> b.newC(e.getD(),e.getE())).orElse(b.newC());```  
    目前 ： ```return null == a.getB() ? null : a.getB().getC();```  
    建议 ： ```return Optional.ofNullable(a.getB()).map(C::getD).orElse(null);```  
    目前 ： ```return null == a ? new B() : C.newD(a);```    
    建议 ： ```return Optional.ofNullable(a).map(B::newC).orElse(new D());```  

* 当前对象直接与 Null 进行比较，以下是几个代表实例。  
  目前 ：```public void xxx（Object o）{if(null == o){retrun;}}```  
  目前 ：```public boolean wasNull() {return null == currentRow;}```  
  建议 ：使用 JDK8 提供的 Objects.isNull 方法。  

* 判断本身是否是 Null，然后返回自身，和其他的三元运算符，以下是代表实例。  
  目前 ： ```this.a = null == a ? new B().newC() : a;```      
  建议 ： ```Optional.ofNullable(a).orElse(new B().newC());```  
  目前 ： ```a = null == a ? b.getC().getD() : a;```      
  建议 ： ```a  = Optional.ofNullable(a).orElse(b.getC().getD());```  
  目前 ： ```return null == a.getB() ? c : a.getB();```  
  建议 ： ```return Optional.ofNullable(a.getB()).orElse(c);```  
  目前 ： 

  ```
  BigDecimal c;
  BigDecimal s;
  if (null == c) {
    c = new BigDecimal("0");
  }
  if (null == s) {
    s = new BigDecimal("0");
  }
  ```
  
  建议 ： ```c = Optional.ofNullable(c).orElse(new BigDecimal("0")); s = Optional.ofNullable(s).orElse(new BigDecimal("0"));```    
  目前 ： ```return null == results.get(0) ? 0 : results.get(0);```  
  建议 ： ```return Optional.ofNullable(results.get(0)).orElse(0);```  
  目前 ： ```return null == getA().getB() ? Collections.emptyList() : Collections.singletonList(getA().getB());```    
  建议 ： ```return Optional.ofNullable(getA().getB()).map(Collections::singletonList).orElse(Collections.emptyList());```  

* 判断本身是 Null，然后返回与自身无关的三元运算符,以下是代表实例。  
  目前 ： ```A a = null == b ? cMap.values().iterator().next() : cMap.get(d);```  
  目前 ： ```return null == a ? new B() : new B(c);```  
  建议 ：不做修改  

* 判断集合是否为非空，以下是几个代表实例。  
  目前 ：  

  ```
  private boolean isEmpty(final List<String> xxx) {
      return null == xxx || xxx.isEmpty();
  }
  ```
  
  建议 ：新增一个集合工具类，来统一判断。  

* 获取 Map 的 value 值，然后判断是否为 Null，以下是几个代表实例。  
  目前 ：

  ```
  public Collection<String> getA(final String b) {
     Collection<String> result = cMap.get(b);
     if (null == result) {
        result = Collections.emptySet();
     }
     return result;
  }
  ```
  
  建议 ： 使用Map.getOrDefault()方法  

  ```
  public Collection<String> getA(final String b) {
    return cMap.getOrDefault(b, Collections.emptySet());
  }
  ```

* 判断是否为 Null，如果为 Null 抛出异常，否则进行下一步操作 ，以下是几个代表实例。  
  目前 ：

  ```
  private Collection<String> doXxx(final Collection<String> a, final Object<?> b) {
    if (null == c) {
       throw new Exception("XXX");
    }
    return c.doXxx(a,new Object(b.getXXX(), b.getXXX(), b.getXXX()));
  }
  ```
  
  建议 ：

  ```
  private Collection<String> doXxx(final Collection<String> a, final Object<?> b) {
       return Optional.ofNullable(c).map(e -> e.doXxx(a,
              new Object(b.getXXX(), b.getXXX(), b.getXXX())))
             .orElseThrow(()-> new Exception("XXX"));
  }
  ```

* 判断自身对象是否为 Null，但是返回 Optional 包装的，以下是几个代表实例。  
  目前 ： ```return null == a ? Optional.empty() : Optional.ofNullable(a.getXXX());```    
  建议 ： ```return Optional.ofNullable(a).map(e -> e.getXXX());```  
