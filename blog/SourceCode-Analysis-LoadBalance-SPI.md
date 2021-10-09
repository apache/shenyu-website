---
slug: code-analysis-loadbalance-spi
title: LoadBalance SPI Source Code Analysis
author: Huihui Yin
author_title: Apache ShenYu Contributor
author_url: https://github.com/changanjennifer/
tags: [load balance,SPI,Apache ShenYu]
---

Gateway applications need to support a variety of load balancing  strategies, including `random`,`Hashing`, `RoundRobin` and so on. In `Apache Shenyu` gateway, it not only realizes such traditional algorithms, but also makes smoother traffic processing for the entry of server nodes through detailed processing such as traffic `warm-up,` so as to obtain better overall stability. In this article, let's walk through how `Apache Shenyu` is designed and implemented this part of the function.

> This article based on `shenyu-2.4.0` version of the source code analysis.

[TOC]

## LoadBalance `SPI`

The implementation of `LoadBalance` is in ***shenyu-plugin-divide*** module. It has based on its `SPI` creation mechanism. The core interface code is shown as follows. This interface  well explains the concept: load balancing is to select the most appropriate node from a series of server nodes.  Routing, traffic processing and load balancing is the basic function of `LoadBalance` `SPI`.

```java
@SPI
public interface LoadBalance {

    /**
     * @param upstreamList upstream list
     * @param ip ip
     * @return divide upstream
     */
    DivideUpstream select(List<DivideUpstream> upstreamList, String ip);
}
```

Where `upstreamList` represents the server nodes list available for routing. `DivideUpstream` is the data structure of server node, the  important elements including `protocol`, `upstreamUrl` , `weight`, `timestamp`, `warmup`.  

```java
public class DivideUpstream implements Serializable {
    private String upstreamHost;
    /**
     * this is http protocol.
     */
    private String protocol;
    private String upstreamUrl;
    private int weight;
    /**
     * false close/ true open.
     */
    @Builder.Default
    private boolean status = true;
    private long timestamp;
    private int warmup;
}

```

## Design of LoadBalance module

The class diagram of `LoadBalance` module`is`shown as follows.

![loadbalance-class-diagram](/img/activities/code-analysis-loadbalance-spi/loadbalance-class-diagram.png)

We can draw the outline of `LoadBalance` module from the class diagram:

1. The abstract class `AbstractLoadBalance` implements the SPI `LoadBalance` interface，and supplies the template methods for selection related, such as select(), selector()，and gives the calculation of weight.

2. Three implementation classes which inherit `AbstractLoadBalance` to realize their own logic:

   - `RandomLoadBalance` - Weight Random
   - `HashLoadBalance`  - Consistent Hashing
   - `RoundRobinLoadBalance` -Weight Round Robin per-packet

3. The utility class `LoadBalanceUtil` provides public static method to be called.

   The implementation classes and algorithms are configurable.   According to its specification,   by adding profile in `SHENYU_DIERECTORY` directory, the data in profile should be  *key*=*value-class* format, where the *value-class* will be load by the `Apache Shenyu SPI` class loader, and *key* value should be an `name` defined in `LoadBalanceEnum.`

```properties
random=org.apache.shenyu.plugin.divide.balance.spi.RandomLoadBalance
roundRobin=org.apache.shenyu.plugin.divide.balance.spi.RoundRobinLoadBalance
hash=org.apache.shenyu.plugin.divide.balance.spi.HashLoadBalance
```

`The code of LoadBalanceEnum` is as follows：

```java
public enum LoadBalanceEnum {
    /**
     * Hash load balance enum.
     */
    HASH(1, "hash", true),

    /**
     * Random load balance enum.
     */
    RANDOM(2, "random", true),

    /**
     * Round robin load balance enum.
     */
    ROUND_ROBIN(3, "roundRobin", true);

    private final int code;
    private final String name;
    private final boolean support;
}
```

## AbstractLoadBalance

This abstract class implements the `LoadBalance` interface and define the abstract method `doSelect()` to be processed by the implementation classes. In the template method `select()`,  It will do validation first then call the `doSelect()` method.

```java
   /** 
     * Do select divide upstream.
     *
     * @param upstreamList the upstream list
     * @param ip           the ip
     * @return the divide upstream
     */
    protected abstract DivideUpstream doSelect(List<DivideUpstream> upstreamList, String ip);

    @Override
    public DivideUpstream select(final List<DivideUpstream> upstreamList, final String ip) {
        if (CollectionUtils.isEmpty(upstreamList)) {
            return null;
        }
        if (upstreamList.size() == 1) {
            return upstreamList.get(0);
        }
        return doSelect(upstreamList, ip);
    }
```

When the `timestamp` of server node  is not null, and the interval between current time and `timestamp` is within the traffic warm-up time, the formula for weight calculation is.
$$ {1-1}
ww = min(1,uptime/(warmup/weight))
$$
It can be seen from the formula that the final weight(`ww`) is proportional to the original-`weight` value. The closer the time interval is to the `warmup` time, the greater the final `ww`. That is, the longer the waiting time of the request, the higher the final `weight`. When there is no `timestamp` or other conditions, the `ww` is equal to the `weight` value of `DivideUpstream` object.

The central of thinking about *warm-up*is to avoid  bad performance when adding new server and the new `JVMs` starting up.

Let's see how the load balancing  with `Random`, `Hashing` and `RoundRobin` strategy is implemented.

## RandomLoadBalance

The `RandomLoadBalance` can handle two situations:

1. Each node without weight, or every node has the same weight, randomly choose one.
2. Server Nodes with different weight, choose one randomly by weight.

Following is the `random()` method of `RandomLoadBalance`. When traversing server node list, if the randomly generated value is less than the weight of node, then the current node will be chosen. If after one round traversing, there's is no server node match, then it will return the first item of the list. The `getWeight(DivideUpstream upstream)` is defined in `AbstractLoadBalance` class.

```java
    private DivideUpstream random(final int totalWeight, final List<DivideUpstream> upstreamList) {
        // If the weights are not the same and the weights are greater than 0, then random by the total number of weights
        int offset = RANDOM.nextInt(totalWeight);
        // Determine which segment the random value falls on
        for (DivideUpstream divideUpstream : upstreamList) {
            offset -= getWeight(divideUpstream);
            if (offset < 0) {
                return divideUpstream;
            }
        }
        return upstreamList.get(0);
    }
```

## HashLoadBalance

In `HashLoadBalance`, it takes the advantages of [consistent hashing](https://en.wikipedia.org/wiki/Consistent_hashing) , that maps both the input traffic and the servers to a unit circle, or name as  *hash ring*. For the requested`ip` address, with its hash value to find the node closest in clockwise order as the node to be routed.  Let's see how consistent hashing is implemented in `HashLoadBalance`.

As to the hash algorithms, `HashLoadBalance` uses `MD5` hash, which has the advantage of mixing the input in an unpredictable but deterministic way. The output is a 32-bit integer.  the code is shown as follows:

```java
private static long hash(final String key) {
    // md5 byte
    MessageDigest md5;
    try {
        md5 = MessageDigest.getInstance("MD5");
    } catch (NoSuchAlgorithmException e) {
        throw new ShenyuException("MD5 not supported", e);
    }
    md5.reset();
    byte[] keyBytes;
    keyBytes = key.getBytes(StandardCharsets.UTF_8);
    md5.update(keyBytes);
    byte[] digest = md5.digest();
    // hash code, Truncate to 32-bits
    long hashCode = (long) (digest[3] & 0xFF) << 24
            | ((long) (digest[2] & 0xFF) << 16)
            | ((long) (digest[1] & 0xFF) << 8)
            | (digest[0] & 0xFF);
    return hashCode & 0xffffffffL;
}
```

Importantly, how to generate the hash ring and avoid skewness?  Let's the`doSelect()` method in`HashLoadBalance` as follows:

```java
    private static final int VIRTUAL_NODE_NUM = 5;

    @Override
    public DivideUpstream doSelect(final List<DivideUpstream> upstreamList, final String ip) {
        final ConcurrentSkipListMap<Long, DivideUpstream> treeMap = new ConcurrentSkipListMap<>();
        for (DivideUpstream address : upstreamList) {
            for (int i = 0; i < VIRTUAL_NODE_NUM; i++) {
                long addressHash = hash("SOUL-" + address.getUpstreamUrl() + "-HASH-" + i);
                treeMap.put(addressHash, address);
            }
        }
        long hash = hash(String.valueOf(ip));
        SortedMap<Long, DivideUpstream> lastRing = treeMap.tailMap(hash);
        if (!lastRing.isEmpty()) {
            return lastRing.get(lastRing.firstKey());
        }
        return treeMap.firstEntry().getValue();
    }
```

In this method, duplicated labels are used which are called "virtual nodes" (i.e.  5 virtual nodes point to a single "real" server).  It will make the distribution in hash ring more evenly, and reduce the occurrence of data skewness.

In order to rescue the data sorted in the hash ring, and can be accessed quickly, we use [ConcurrentSkipListMap](https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/ConcurrentSkipListMap.html) of Java to store the server node lists ( with virtual nodes) and its hash value as key.  This class a member of [Java Collections Framework](https://docs.oracle.com/javase/8/docs/technotes/guides/collections/index.html), providing expected average *log(n)* time cost for retrieve and access operations safely execute concurrent by multiple threads.  

Furthermore, the method tailMap(K fromKey) of  `ConcurrentSkipListMap` can return a view of portion of the map whose keys are greater or equal to the `fromKey`, and not need to navigate the whole map.

In the above code section, after the hash ring is generated, it uses `tailMap(K fromKey)` of `ConcurrentSkipListMap` to find the subset that the elements greater, or equal to the hash value of the requested `ip`, its first element is just the node to be routed. With the suitable data structure, the code looks particularly clear and concise.

Consistent hashing resolved the poor scalability of the traditional hashing by modular operation.

## RoundRobinLoadBalance

The original Round-robin selection is to select server nodes one by one from the candidate list. Whenever some nodes has crash ( ex, cannot be connected after 1 minute), it will be removed from the candidate list, and do not attend the next round, until the server node is recovered and it will be add to the candidate list again.  In `RoundRobinLoadBalance`,the weight Round Robin per-packet schema is implemented.

In order to work in concurrent system, it provides an inner static class `WeigthRoundRobin` to store and calculate the rolling selections of each server node. Following is the main section of this class( removed remark )

```java
protected static class WeightedRoundRobin {

    private int weight;
    private final AtomicLong current = new AtomicLong(0);

    private long lastUpdate;

    void setWeight(final int weight) {
        this.weight = weight;
        current.set(0);
    }
    long increaseCurrent() {
        return current.addAndGet(weight);
    }

    void sel(final int total) {
        current.addAndGet(-1 * total);
    }
    void setLastUpdate(final long lastUpdate) {
        this.lastUpdate = lastUpdate;
    }
}
```

Please focus on the these method:

- `setWeight(final int weight)` : set the current value by *weight*

- `increaseCurrent()`: Increment the `current` value by `weight`, and `current` set to 0. 

- `sel(final int total)`: decrement  the `current` value by  *total*

  Let's see how the weight factor being used in this round-robin  selection? 

  First it defines a two-level  `ConcurrentMap` type variable named as `methodWeightMap` , to cache the server node lists and the rolling selection data about each server node.

```java
private final ConcurrentMap<String, ConcurrentMap<String, WeightedRoundRobin>> methodWeightMap = new ConcurrentHashMap<>(16);
```

In this map, the key of first level is  set to `upstreamUrl` of first element in server node list. The type of second object is `ConcurrentMap<String, WeightedRoundRobin>,` the key of this inner Map is  the value `upstreamUrl`variable of each server node in this server list, the value object is `WeightedRoundRobin`, used to trace the rolling selection data about each server node. As to the implementation class for the  Map object, we use `ConcurrentHashMap` of [JUC](https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/package-summary.html),  a hash table supporting full concurrency of retrievals and high expected concurrency for updates.

In the second level of the map, the embedded  static class - `WeighedRoundRobin` of each node is thread-safe, implementing the weighted `RoundRobin` per bucket. The following is the code of the `doselect()` method of this class.

```java
@Override
public DivideUpstream doSelect(final List<DivideUpstream> upstreamList, final String ip) {
    String key = upstreamList.get(0).getUpstreamUrl();
    ConcurrentMap<String, WeightedRoundRobin> map = methodWeightMap.get(key);
    if (map == null) {
        methodWeightMap.putIfAbsent(key, new ConcurrentHashMap<>(16));
        map = methodWeightMap.get(key);
    }
    int totalWeight = 0;
    long maxCurrent = Long.MIN_VALUE;
    long now = System.currentTimeMillis();
    DivideUpstream selectedInvoker = null;
    WeightedRoundRobin selectedWRR = null;
    for (DivideUpstream upstream : upstreamList) {
        String rKey = upstream.getUpstreamUrl();
        WeightedRoundRobin weightedRoundRobin = map.get(rKey);
        int weight = getWeight(upstream);
        if (weightedRoundRobin == null) {
            weightedRoundRobin = new WeightedRoundRobin();
            weightedRoundRobin.setWeight(weight);
            map.putIfAbsent(rKey, weightedRoundRobin);
        }
        if (weight != weightedRoundRobin.getWeight()) {
            //weight changed
            weightedRoundRobin.setWeight(weight);
        }
        long cur = weightedRoundRobin.increaseCurrent();
        weightedRoundRobin.setLastUpdate(now);
        if (cur > maxCurrent) {
            maxCurrent = cur;
            selectedInvoker = upstream;
            selectedWRR = weightedRoundRobin;
        }
        totalWeight += weight;
    }
    ......  //erase the section which handles the time-out upstreams. 
    if (selectedInvoker != null) {
        selectedWRR.sel(totalWeight);
        return selectedInvoker;
    }
    // should not happen here
    return upstreamList.get(0);
}
```

For example we assume `upstreamUrl` values of three server nodes is: LIST = [upstream-20, upstream-50, upstream-30]. After a round of execution, the data in newly created `methodWeightMap` is as follows:

![methodWeightMap](/img/activities/code-analysis-loadbalance-spi/methodWeightMap.png)

For the above example LIST, assumes the  `weight` array is  [20,50,30].  the following figure shows the value change and polling selection process of the `current` array in `WeighedRoundRobin` object.

![weighted-roundrobin-demo](/img/activities/code-analysis-loadbalance-spi/weighted-roundrobin-demo.png)

In each round, it will choose the server node with max `current` value.

- Round1:
  - Traverse the server node list, initialize the `weightedRoundRobin` instance of each server node or update  the `weight` value of server nodes object `DivideUpstream`
  - say, in this case,  after traverse, the `current` array  of the node list changes to  [20, 50,30]，so according to rule, the node Stream-50 would be chosen, and then the static object `WeightedRoundRobin` of  Stream-50 executes `sel(-total)` , the `current` array is now [20,-50, 30].
- Round 2:  after traverse, the `current` array should be [40,0,60],  so the Stream-30 node would be chosen， `current` array is now  [40,0,-40].
- Round 3:  after traverse, `current` array  changes to [60,50,-10],  Stream-20 would be chosen，and `current` array is now [-40,50,-10].

When there is any inconsistence or some server crashed, for example, the lists size does not match with the elements in map, it would copy and modify the element with lock mechanism, and remove the timeout server node,  the data in Map updated. Following is the fault tolerance code segment.  

```Java
    if (!updateLock.get() && upstreamList.size() != map.size() && updateLock.compareAndSet(false, true)) {
        try {
            // copy -> modify -> update reference
            ConcurrentMap<String, WeightedRoundRobin> newMap = new ConcurrentHashMap<>(map);
            newMap.entrySet().removeIf(item -> now - item.getValue().getLastUpdate() > recyclePeriod);
            methodWeightMap.put(key, newMap);
        } finally {
            updateLock.set(false);
        }
    }

    if (selectedInvoker != null) {
        selectedWRR.sel(totalWeight);
        return selectedInvoker;
    }
    // should not happen here
    return upstreamList.get(0);
```

## LoadBalanceUtils

In this class, a static method calling `LoadBalance` is provided, where`ExtensionLoader` is the entry point of `Apache Shenyu SPI`. That is to say, `LoadBalance` module is configurable and extensible. The `algorithm` variable in this static method is the `name` enumeration type defined in `LoadBalanceEnum`.

```java
    /**
     * Selector divide upstream.
     *
     * @param upstreamList the upstream list
     * @param algorithm    the loadBalance algorithm
     * @param ip           the ip
     * @return the divide upstream
     */
    public static DivideUpstream selector(final List<DivideUpstream> upstreamList, final String algorithm, final String ip) {
        LoadBalance loadBalance = ExtensionLoader.getExtensionLoader(LoadBalance.class).getJoin(algorithm);
        return loadBalance.select(upstreamList, ip);
    }
```

## Using of LoadBalance module

In the above section, we describe the `LoadBalance` `SPI` and three implementation classes. Let's take a look at how the `LoadBalance` to be used in `Apache Shenyu`. [DividePlugin](http://shenyu.apache.org/docs/plugin-center/http-handle/divide-plugin) is a `plugin` in `Apache Shenyu` responsible for routing `http` request. when enable to use this `plugin`, it will transfer traffic according to selection data and rule data, and deliver to next plugin downstream.

```java
@SneakyThrows
@Override
protected Mono<Void> doExecute(final ServerWebExchange exchange, final ShenyuPluginChain chain, final SelectorData selector, final RuleData rule) {
   ......
}
```

The type of second parameter of `doExecute()` is `ShenyuPluginChain`, which represents the execution chain of `plugins`. For details, see the mechanism of [Apache Shenyu Plugins](http://shenyu.apache.org/docs/design/flow-control). The third one is `SelectorData` type, and the fourth is `RuleData` type working as  the rule data.

In `doExecute()` of `DividePlugin`,  first verify the size of `header`, content length,  etc, then preparing for load balancing.

Following is a code fragment using`LoadBalance` in the `doExecute()` method:

```java
   // find the routing server node list
   List<DivideUpstream> upstreamList = UpstreamCacheManager.getInstance().findUpstreamListBySelectorId(selector.getId());
    ... 
    // the requested ip
    String ip =   Objects.requireNonNull(exchange.getRequest().getRemoteAddress()).getAddress().getHostAddress();

    //calling the Utility class and invoke the LoadBalance processing.
    DivideUpstream divideUpstream = LoadBalanceUtils.selector(upstreamList, ruleHandle.getLoadBalance(), ip);
```

 In the above code, the output of`ruleHandle.getLoadBalance()` is the `name` variable defined in `LoadBalanceEnum`, that is `random`, `hash`, `roundRobin`, etc.  It is very convenient to use `LoadBalance` by `LoadBalanceUtils`. When adding more  `LoadBalance` implementing classes,  the interface in `plugin` module will not be affect at all.

## Summary

After reading through the code of `LoadBalance` module, from the design perspective, it is concluded that this module has the  following characteristics:

1. Extensibility: Interface oriented design and implemented on `Apache Shenyu SPI` mechanism, it can be easily extended to other dynamic load balancing algorithms (for example, least connection, fastest mode, etc), and supports cluster processing.
2. Scalability： Every load balancing implementation,  weighted Random, consistency  Hashing and weighted `RoundRobin` can well support increase or decrease cluster overall capacity.
3. More detailed design such as *warm-up* can bring better performance and obtain better overall stability.
