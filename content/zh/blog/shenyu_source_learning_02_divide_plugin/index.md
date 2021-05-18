---
title: "ShenYu网关学习(2-1)Http代理之divide插件使用"
author: "袁杰"
description: "ShenYu网关学习(2-1)divide插件使用"
categories: "ShenYu"
tags: ["ShenYu"]
date: 2021-01-16
cover: "/img/architecture/shenyu-framework.png"
---

# Divide 插件使用

## 一、启动项目

先启动soul-bootstrap（9195）、soul-admin（9095）两个模块，我们通过bootstrap配置文件可以看到，两者是通过WebSocket协议进行数据同步：

![图片](https://uploader.shimo.im/f/nGr4Gtt1RDaxFZhp.png!thumbnail?fileGuid=fGQAODvCNjs7kNIH)

通过bootstrap日志也可以看到：

![图片](https://uploader.shimo.im/f/cvJNUI1WLaJEk0Pe.png!thumbnail?fileGuid=fGQAODvCNjs7kNIH)

所谓的数据同步是指将soul-admin中配置的数据，同步到soul集群中的JVM内存里面，是网关高性能的关键。

我们启动两个项目之后就可以通过后台管理系统测试divide插件了。

## 二、divide插件介绍

divide插件是网关处理http协议请求的核心处理插件，也是soul唯一默认开启的插件：

![图片](https://uploader.shimo.im/f/0CIBpm0YatPSWUUu.png!thumbnail?fileGuid=fGQAODvCNjs7kNIH)

我们可以想象一下网关到底是做什么的，去猜测一下处理http请求的divide插件可能具备哪些功能呢？

首先，作为微服务网关，它的背后一定存在多条业务线的分布式微服务集群，而网关作为所有服务的统一入口，必须具备的能力就是流量分发/路由/负载均衡等，而divide这个单词顾名思义就是分配、分发的意思，所以我们可以猜测divide插件就是对http请求进行各种规则的路由转发，这也是网关最基础的能力。

我们打开管理界面上的插件列表，可以看到所有插件都是由两部分组成：**选择器**（selector）和**选择器规则**。

插件化设计思想是soul网关最核心的设计思想，而选择器和规则这两个概念也是soul网关的灵魂所在，理论上来说，我们掌握好它，就能对任何接入网关的流量进行管理。

一个插件有多个选择器，一个选择器对应多种规则。选择器相当于是对流量的第一次筛选，规则就是最终的筛选。

### 选择器

![图片](https://uploader.shimo.im/f/KlNWtqo6shqyJYWZ.png!thumbnail?fileGuid=fGQAODvCNjs7kNIH)

    * **名称**：为你的选择器起一个容易分辨的名字
    * **类型**：custom flow 是自定义流量。full flow 是全流量。自定义流量就是请求会走你下面的匹配方式与条件。全流量则不走。
    * **匹配方式**：and 或者or 是指下面多个条件是按照and 还是or的方式来组合。
    * **条件**：
        * uri：是指你根据uri的方式来筛选流量，match的方式支持模糊匹配（/**）
        * header：是指根据请求头里面的字段来筛选流量。
        * query：是指根据uri的查询条件来进行筛选流量。
        * ip：是指根据你请求的真实ip，来筛选流量。
        * host：是指根据你请求的真实host，来筛选流量。
        * post：建议不要使用。
        * 条件匹配：
            * match : 模糊匹配，建议和uri条件搭配，支持 restful风格的匹配。（/test/**）
            * = : 前后值相等，才能匹配。
            * regEx : 正则匹配，表示前面一个值去匹配后面的正则表达式。
            * like ：字符串模糊匹配。
    * **是否开启**：打开才会生效
    * **打印日志**：打开的时候，当匹配上的时候，会打印匹配日志。
    * **执行顺序**：当多个选择器的时候，执行顺序小的优先执行。
### 选择器规则

![图片](https://uploader.shimo.im/f/If4ekdjZ1T0j11fy.png!thumbnail?fileGuid=fGQAODvCNjs7kNIH)

![图片](https://uploader.shimo.im/f/CTJJ5j55VhfIxVsS.png!thumbnail?fileGuid=fGQAODvCNjs7kNIH)

可以看到，规则的配置和选择器类似，可以理解为更细粒度的自定义配置。

## 三、divide插件使用

废话少说，我们直接运行soul提供的examples模块来演示divide插件。

![图片](https://uploader.shimo.im/f/8i3YFAMvzXsKJg7o.png!thumbnail?fileGuid=fGQAODvCNjs7kNIH)

注意，我们最终运行的是soul-examples-http模块。配置文件可以使用默认的，也可以自定义contextPath和appName，如上图。

我们需要注意，contextPath这个属性非常重要，相当于是我们所有http请求的namespace，和选择器一一对齐。一般来说，我们可以配置一个业务对应一个contextPath，一个业务下面配置相同contextPath的多个服务实例会自动映射到同一个选择器进行负载均衡。

我们启动端口为8188的这个进程后，可以发现管理控制台divide插件列表中自动配置了这个实例对应的选择器、规则：

![图片](https://uploader.shimo.im/f/ozvPWCqVaXEGwG2E.png!thumbnail?fileGuid=fGQAODvCNjs7kNIH)

可以看到我启动的这个8188项目地址自动注册上去了：

![图片](https://uploader.shimo.im/f/MzTmhBkyZSRIiPAp.png!thumbnail?fileGuid=fGQAODvCNjs7kNIH)

### 测试网关路由

通过postman先测试不经过网关转发：

```plain
http://localhost:8188/order/findById?id=1
```
![图片](https://uploader.shimo.im/f/OJi1lpFiwlHN53EE.png!thumbnail?fileGuid=fGQAODvCNjs7kNIH)

然后再测试通过网关转发到这个接口：

```plain
http://localhost:9195/my-http/order/findById?id=1
```
![图片](https://uploader.shimo.im/f/8p4u4OKuWp3inEVh.png!thumbnail?fileGuid=fGQAODvCNjs7kNIH)

看日志发现确实经过了网关转发到了8188接口地址：

![图片](https://uploader.shimo.im/f/iE6V4aNqbaaUQz2K.png!thumbnail?fileGuid=fGQAODvCNjs7kNIH)

### 测试负载均衡

我们修改端口为8189，启动第二个进程。

![图片](https://uploader.shimo.im/f/arghWSgrccJ5262m.png!thumbnail?fileGuid=fGQAODvCNjs7kNIH)

注意IDEA需要取消 Single instance only 的限制：

![图片](https://uploader.shimo.im/f/cMdvwK0RI7AxmLf6.png!thumbnail?fileGuid=fGQAODvCNjs7kNIH)

我们再进入管理控制台，发现my-http选择器下出现两个配置地址：

![图片](https://uploader.shimo.im/f/nC35SJOlCZnNIrAz.png!thumbnail?fileGuid=fGQAODvCNjs7kNIH)

此时我们继续测试，发现负载均衡策略确实生效了：

![图片](https://uploader.shimo.im/f/int2660TqS1nAkYB.png!thumbnail?fileGuid=fGQAODvCNjs7kNIH)

今天只是演示了divide插件最基础的配置，还有其他各种规则配置后面都可以试一试~

