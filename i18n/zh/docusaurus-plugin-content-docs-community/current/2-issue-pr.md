---
title: 问题及提交请求
sidebar_position: 2
description: Apache ShenYu Issue And Pull Request
author: "xiaoyu"
categories: "Apache ShenYu"
tags: ["Issue-PR"]
---

## 创建问题


* 如果您有任何问题，您可以选择创建一个问题来描述。

* 它有 4 种类型：错误报告、功能请求、问题和任务。

* 请遵循每种类型的模板，如果您的信息越详细，就越有助于解决您的问题。

## 提交代码 

格式为 : `<type> (<module>) : <body>` 

`<type>`： 定义您的修改类型，包括但不限于以下内容：

* refactor 
* fix 
* docs
* test 
* feature 
...

`<module>`： 属于shenyu项目的任何模块，请严格按照项目名称，包括但不限于以下内容：

* admin  
* client 
* common 
* metrics 
* spi 
* plugin-grpc 
* plugin-alibaba-dubbo 
* register-client-nacos 
...

`<body>`：提交代码的描述尽量简短。有以下规则：

* 不需要任何大写的单词

* 以 `.` 结尾

举个例子：

* refactor admin : modify some error log.
* fix plugin-grpc : modify   result error.
* feature plugin-alibaba-dubbo : add request for tag router.


## 拉取请求 

首先，在 Pull Request 之前，你必须创建 issueNo 格式为： `[ISSUE #{issue number}] <body>`。

请注意以下规则：

* ISSUE 和问题编号之间需要一个空格。
* `<body>` : 第一个单词需要大写，其他单词不要再出现大写。

举个例子：

* [ISSUE #123] Support spring cloud grayscale release.

* [ISSUE #456] Fix dubbo plugin have some error.


## 问题标签

我们需要标记所有问题。shenyu社区的所有列表都在这里 : https://github.com/dromara/shenyu/labels 。

一般来说，一个问题应该用2个标签来标记。一个是问题的类型，另一个是问题所属的项目模块。

除了以下标签:

* [type: build]
* [type: community]
      @@ -84,12 +85,12 @@ Except for the following Labels:
* [status: wontfix]
...

## 合并拉取请求

* 所有的pull request都必须经过批准和审查。

* 尽可能提供适当的建议。

* 一般来说，pull request 应该标有 2 个 Lable 并且必须设置进度表。

* 合并完成后，需要检查关联的 `issueNo` 是否关闭。  
