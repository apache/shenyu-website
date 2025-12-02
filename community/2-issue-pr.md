---
title: Issue And Pull Request
sidebar_position: 2
description: Apache ShenYu Issue And Pull Request
author: "xiaoyu"
categories: "Apache ShenYu"
tags: ["Issue-PR"]
---

## Create Issues {#create-issues}

* If you have any problems, you can choose to create an issue to describe.
  
* It has 4 types which are: Bug Report, Feature Request, Question and Task.
  
* Please follow the template for each type, if the more detailed your information is, the more it will help to solve your problem.
  
## Commit Messages {#commit-messages}

Format is : `<type> (<module>) : <body>`.

`<type>`: Define your modify type, Including but not limited to the following:

* refactor
* fix
* docs
* test
* feature
...

`<module>`: Any of the modules belonging to the Apache ShenYu project,Please strictly follow the name of the project, Including but not limited to the following:

* admin
* client
* common
* metrics
* spi
* plugin-grpc
* plugin-alibaba-dubbo
* register-client-nacos
...

`<body>`:Short description for commit messages. Please note the following rules:

* No need for any capitalized words

* Please end with `.`

for example:

* refactor admin : modify some error log.
* fix plugin-grpc : modify   result error.
* feature plugin-alibaba-dubbo : add request for tag router.


## Pull Request {#pull-request}

First of all, before Pull Request, you have to create issueNo Format is : [ISSUE #\{issue number\}] `<body>`.

Please note the following rules:

* A space is required between ISSUE and issue number.
* `<body>` : The first word needs to be capitalized, Other words no longer appear in capital letters.

for example:

* [ISSUE #123] Support spring cloud grayscale release.

* [ISSUE #456] Fix dubbo plugin have some error.


## Issue Label {#issue-label}

We need to Label to all issues. All of Apache ShenYu community's lists are here : https://github.com/dromara/shenyu/labels.

In general, an issue should be marked with 2 Label. One is the type of issue, and the other is the project module to which the issue belongs.

Except for the following Labels:

* [type: build]
* [type: community]
* [type: discussion]
* [type: duplicate]
* [TODO-LIST]
* [status: wontfix]
...

## Merged Pull Request {#merged-pull-request}

* All pull request must be approve and review.

* Give appropriate advice whenever possible.

* In general, pull request   should be marked with 2 Lable and must set milestone.

* After the merge is completed, need to check if the associated issueNo is closed.  
