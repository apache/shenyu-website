---
title: "ShenYu网关发布1.0.4-RELEASE版本"
author: "xiaoyu"
description: "ShenYu网关发布1.0.4-RELEASE版本"
categories: "ShenYu"
tags: ["ShenYu"]
date: 2019-04-09
cover: "/img/architecture/shenyu-framework.png"
---

### ShenYu网关发布1.0.4-RELEASE版本

* 修复在1.0.3版本的后台管理中，出现的bug。
* 配置信息序列化方式支持自定义扩展。默认的序列化方式由kroy 改为了java序列化方式。
* dubbo框架支持的更改。

### 对dubbo用户使用的更改。

* 在以前的版本中（1.0.2 or 1.0.3），dubbo的参数是通过header头上传递，在1.0.4版本中是通过body传递

* 更新了相关的文档信息。


### 关于使用1.0.4版本的建议。

* 1.0.4 版本支持用户自定义插件开发，支持正则表达式的匹配。

* dubbo参数传递的更改，我觉得这样会更加友好。

###  如果您之前使用的1.0.2版本，想要更新到1.0.4版本。
 
 * 在插件表新增role字段。

 * 重新启动1.0.4版本的管理后台。

 * 执行同步所有插件（因为序列化方式的更改）

 * 启动1.0.4版本的soul-web服务。

### 遇到问题？

 * 添加qq群（429951241）

 * 官网文档：https://dromara.org/website/zh-cn/docs/soul/soul.html

 * github地址: https://github.com/apache/incubator-shenyu

 * gitee地址： https://gitee.com/dromara/soul
