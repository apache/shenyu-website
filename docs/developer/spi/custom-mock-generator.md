---
title: Custom Mock Data Generator
keywords: ["Mock"]
description: custom mock data generator
---
## Explanation
1. This article describes how to make custom extensions to `org.apache.shenyu.plugin.mock.generator.Generator`.
2. The mock data generation expression needs to satisfy the format of `${name|param1|param2|...}`

## Extension
* Create a new project and introduce the following dependencies:

```xml
<dependencies>
    <dependency>
        <groupId>org.apache.shenyu</groupId>
        <artifactId>shenyu-plugin-mock</artifactId>
        <version>${project.version}</version>
    </dependency>
</dependencies>
```

* Create a new class  `CustomerGenerator`，implements `org.apache.shenyu.plugin.mock.generator.Generator`。

```java
@Join
public class CustomGenerator implements Generator<String> {
    @Override
    public String getName() {
        // The name of the generator, i.e. the content before the first | of the expression
    }
    
    @Override
    public String generate() {
        // Implement the logic of data generation
    }
    
    @Override
    public int getParamSize() {
        // The number of required parameters of the expression
    }
    
    @Override
    public void initParam(List params, String rule) {
        // params is the contents except the name after the expression is split according to |
        // rule is the content of the original expression , if there is a custom parameter processing logic, you can use this parameter
    }
    
    @Override
    public boolean match(String rule) {
        // Check if the current expression is valid
    }
    
    @Override
    public String[] getPrefixAndSuffix() {
        // Return the prefix and suffix added after the generated content, please return a string array with two elements
        // 0th element is the prefix, 1st element is the suffix
    }
}
```

* In the project  `resources` directory，Create a new `META-INF/shenyu` directory， and the new file name is : `org.apache.shenyu.plugin.mock.generator.Generator`.
  add `${you spi name}` = `${you class path}`:

```shell script
${spi name}=${custom class path}
``` 

`${spi name}` represents the name of `spi`, `${spi name }` needs to be consistent with the definition of the getName() method in the Generator implementation class, `${custom class path}` represents the fully qualified name of the class. for example:

```shell script
custom=xxx.xxx.xxx.CustomGenerator
```

* Package the project and copy it to the `lib` or `ext-lib` directory of the gateway (bootstrap-bin).
