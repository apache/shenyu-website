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
    current : ```result.setUrl(null == dataSourceName ? databaseEnvironment.getURL() : databaseEnvironment.getURL(dataSourceName));```  
    recommendation : ```Optional.ofNullable(dataSourceName).map(databaseEnvironment::getURL).orElse(databaseEnvironment.getURL());```    
    current : ```return null == loadBalanceStrategyConfiguration ? serviceLoader.newService() : serviceLoader.newService(loadBalanceStrategyConfiguration.getType(), loadBalanceStrategyConfiguration.getProperties());```    
    recommendation : ```return Optional.ofNullable(loadBalanceStrategyConfiguration).map(e -> serviceLoader.newService(e.getType(),e.getProperties())).orElse(serviceLoader.newService());```  
    current : ```return null == shardingRuleConfig.getDefaultKeyGeneratorConfig() ? null : shardingRuleConfig.getDefaultKeyGeneratorConfig().getColumn();```  
    recommendation : ```return Optional.ofNullable(shardingRuleConfig.getDefaultKeyGeneratorConfig()).map(KeyGeneratorConfiguration::getColumn).orElse(null);```  
    current : ```return null == shardingStrategyConfiguration ? new NoneShardingStrategy() : ShardingStrategyFactory.newInstance(shardingStrategyConfiguration);```    
    recommendation : ```return Optional.ofNullable(shardingStrategyConfiguration).map(ShardingStrategyFactory::newInstance).orElse(new NoneShardingStrategy());```  

* Directly compare current object with Null, below are some representative examples:    
  current : ```public void xxx（Object o）{if(null == o){retrun;}}```  
  current : ```public boolean wasNull() {return null == currentRow;}```  
  recommendation ：Use JDK8's Objects.isNull method.    

* Judge self if Null or not, and also need to return self related ternary operator, below are some representative examples:      
  current : ```this.loadBalanceAlgorithm = null == loadBalanceAlgorithm ? new MasterSlaveLoadBalanceAlgorithmServiceLoader().newService() : loadBalanceAlgorithm;```      
  recommendation : ```Optional.ofNullable(loadBalanceAlgorithm).orElse(new MasterSlaveLoadBalanceAlgorithmServiceLoader().newService());```  
  current : ```currentDataSourceName = null == currentDataSourceName ? shardingRule.getShardingDataSourceNames().getRandomDataSourceName() : currentDataSourceName;```      
  recommendation : ```currentDataSourceName  = Optional.ofNullable(currentDataSourceName).orElse(shardingRule.getShardingDataSourceNames().getRandomDataSourceName());```  
  current : ```return null == tableRule.getDatabaseShardingStrategy() ? defaultDatabaseShardingStrategy : tableRule.getDatabaseShardingStrategy();```  
  recommendation : ```return Optional.ofNullable(tableRule.getDatabaseShardingStrategy()).orElse(defaultDatabaseShardingStrategy);```  
  current :

  ```
  BigDecimal count;
  BigDecimal sum;
  if (null == count) {
    count = new BigDecimal("0");
  }
  if (null == sum) {
    sum = new BigDecimal("0");
  }
  ```
  
  recommendation : ```count = Optional.ofNullable(count).orElse(new BigDecimal("0")); sum = Optional.ofNullable(sum).orElse(new BigDecimal("0"));```    
  current : ```return null == results.get(0) ? 0 : results.get(0);```  
  recommendation : ```return Optional.ofNullable(results.get(0)).orElse(0);```  
  current : ```return null == getSqlStatement().getTable() ? Collections.emptyList() : Collections.singletonList(getSqlStatement().getTable());```    
  recommendation : ```return Optional.ofNullable(getSqlStatement().getTable()).map(Collections::singletonList).orElse(Collections.emptyList());```  

* Judge self if Null or not, and also need to return self independent ternary operator, below are some representative examples:    
  current : ```DataSource dataSource = null == shardingRule ? dataSourceMap.values().iterator().next() : dataSourceMap.get(getCurrentDataSourceName());```  
  current : ```return null == encryptRuleConfig ? new EncryptRule() : new EncryptRule(ruleConfiguration.getEncryptRuleConfig());```    
  recommendation : No modification.  
                  
* Judge collection is null or not, below are some representative examples:      
  current :  

  ```
  private boolean isEmptyDataNodes(final List<String> dataNodes) {
      return null == dataNodes || dataNodes.isEmpty();
  }
  ```  
  
  recommendation : Add a collection tool class to make unified judgment.    
                  
* Judge Map's value is Null or not, below are some representative examples:  
  current :  

  ```
  public Collection<String> getActualTableNames(final String targetDataSource) {
     Collection<String> result = datasourceToTablesMap.get(targetDataSource);
     if (null == result) {
        result = Collections.emptySet();
     }
     return result;
  }
  ```
  
  recommendation : Use Map.getOrDefault() method.   

  ```
  public Collection<String> getActualTableNames(final String targetDataSource) {
    return datasourceToTablesMap.getOrDefault(targetDataSource, Collections.emptySet());
  }
  ```

* Judge is Null or not, if yes throw exception, else execute next step, below are some representative examples:    
  current :

  ```
  private Collection<String> doSharding(final Collection<String> availableTargetNames, final RangeRouteValue<?> shardingValue) {
    if (null == rangeShardingAlgorithm) {
       throw new UnsupportedOperationException("Cannot find range sharding strategy in sharding rule.");
    }
    return rangeShardingAlgorithm.doSharding(availableTargetNames,
        new RangeShardingValue(shardingValue.getTableName(), shardingValue.getColumnName(), shardingValue.getValueRange()));
  }
  ```
  
  recommendation :

  ```
  private Collection<String> doSharding(final Collection<String> availableTargetNames, final RangeRouteValue<?> shardingValue) {
       return Optional.ofNullable(rangeShardingAlgorithm).map(e -> e.doSharding(availableTargetNames,
              new RangeShardingValue(shardingValue.getTableName(), shardingValue.getColumnName(), shardingValue.getValueRange())))
             .orElseThrow(()-> new UnsupportedOperationException("Cannot find range sharding strategy in sharding rule."));
  }
  ```

* Judge is Null or not, and return Optional wrapped object, below are some representative examples:    
  current : ```return null == alias ? Optional.empty() : Optional.ofNullable(alias.getIdentifier().getValue());```    
  recommendation : ```return Optional.ofNullable(alias).map(e -> e.getIdentifier().getValue());```  
  