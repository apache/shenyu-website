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

## Several methods to judge and handle Null    

* Judge self if Null or not, and also need to transform self, below are some representative examples:  
    current : ```result.setC(null == a ? b.getC() : b.getC(a));```  
    recommendation : ```Optional.ofNullable(a).map(b::getC).orElse(b.getC());```    
    current : ```return null == a ? b.newC() : b.newC(a.getD(), a.getE());```    
    recommendation : ```return Optional.ofNullable(a).map(e -> b.newC(e.getD(),e.getE())).orElse(b.newC());```  
    current : ```return null == a.getB() ? null : a.getB().getC();```  
    recommendation : ```return Optional.ofNullable(a.getB()).map(C::getD).orElse(null);```  
    current : ```return null == a ? new B() : C.newD(a);```    
    recommendation : ```return Optional.ofNullable(a).map(B::newC).orElse(new D());```  

* Directly compare current object with Null, below are some representative examples:    
  current : ```public void xxx（Object o）{if(null == o){retrun;}}```  
  current : ```public boolean wasNull() {return null == currentRow;}```  
  recommendation ：Use JDK8's Objects.isNull method.    

* Judge self if Null or not, and also need to return self related ternary operator, below are some representative examples:      
  current : ```this.a = null == a ? new B().newC() : a;```      
  recommendation : ```Optional.ofNullable(a).orElse(new B().newC());```  
  current : ```a = null == a ? b.getC().getD() : a;```      
  recommendation : ```a  = Optional.ofNullable(a).orElse(b.getC().getD());```  
  current : ```return null == a.getB() ? c : a.getB();```  
  recommendation : ```return Optional.ofNullable(a.getB()).orElse(c);```  
  current :

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
  
  recommendation : ```c = Optional.ofNullable(c).orElse(new BigDecimal("0")); s = Optional.ofNullable(s).orElse(new BigDecimal("0"));```    
  current : ```return null == results.get(0) ? 0 : results.get(0);```  
  recommendation : ```return Optional.ofNullable(results.get(0)).orElse(0);```  
  current : ```return null == getA().getB() ? Collections.emptyList() : Collections.singletonList(getA().getB());```    
  recommendation : ```return Optional.ofNullable(getA().getB()).map(Collections::singletonList).orElse(Collections.emptyList());```  

* Judge self if Null or not, and also need to return self independent ternary operator, below are some representative examples:    
  current : ```A a = null == b ? cMap.values().iterator().next() : cMap.get(d);```  
  current : ```return null == a ? new B() : new B(c);```    
  recommendation : No modification.  
                  
* Judge collection is null or not, below are some representative examples:      
  current :  

  ```
  private boolean isEmpty(final List<String> xxx) {
      return null == xxx || xxx.isEmpty();
  }
  ```  
  
  recommendation : Add a collection tool class to make unified judgment.    
                  
* Judge Map's value is Null or not, below are some representative examples:  
  current :  

  ```
  public Collection<String> getA(final String b) {
     Collection<String> result = cMap.get(b);
     if (null == result) {
        result = Collections.emptySet();
     }
     return result;
  }
  ```
  
  recommendation : Use Map.getOrDefault() method.   

  ```
  public Collection<String> getA(final String b) {
    return cMap.getOrDefault(b, Collections.emptySet());
  }
  ```

* Judge is Null or not, if yes throw exception, else execute next step, below are some representative examples:    
  current :

  ```
  private Collection<String> doXxx(final Collection<String> a, final Object<?> b) {
    if (null == c) {
       throw new Exception("XXX");
    }
    return c.doXxx(a,new Object(b.getXXX(), b.getXXX(), b.getXXX()));
  }
  ```
  
  recommendation :

  ```
  private Collection<String> doXxx(final Collection<String> a, final Object<?> b) {
       return Optional.ofNullable(c).map(e -> e.doXxx(a,
              new Object(b.getXXX(), b.getXXX(), b.getXXX())))
             .orElseThrow(()-> new Exception("XXX"));
  }
  ```

* Judge is Null or not, and return Optional wrapped object, below are some representative examples:    
  current : ```return null == alias ? Optional.empty() : Optional.ofNullable(alias.getIdentifier().getValue());```    
  recommendation : ```return Optional.ofNullable(alias).map(e -> e.getIdentifier().getValue());```  
  