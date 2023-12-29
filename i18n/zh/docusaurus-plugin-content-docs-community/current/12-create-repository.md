---
title: 创建 Git 仓库
sidebar_position: 12
description: 创建 Git 仓库
cover: "/img/architecture/shenyu-framework.png"
---

> 注意：只有 PMC 成员有权限进行如下操作。

## 创建 Git 仓库

在 [GitBox](https://gitbox.apache.org/setup/newrepo.html) [1] 填写新仓库信息。以 incubator-shenyu-helm-chart 为例。

![GitBox](/img/community/create_repo.png)

* `PMC`: 选择 shenyu
* `Repository name`: helm-chart （写后缀，不要写全名）
* `Generated name`: incubator-shenyu-helm-chart.git （自动生成全名，不需要填写）
* `Commit notification list` 和 `GitHub notification list`: 都填 notifications@shenyu.apache.org

> 点击 `Yes` 完成创建，GitHub 仓库的创建过程会持续一小时左右。

## 初始化 GitHub 仓库

* GitHub 仓库创建完成后，按照页面的指引，完成第一次提交。
* 添加 `LICENSE`, `NOTICE` 和 `DISCLAIMER` 文件。
* 添加 `.asf.yaml` 自定义仓库配置。.asf.yaml 的详细说明可以参考[这里](https://cwiki.apache.org/confluence/display/INFRA/Git+-+.asf.yaml+features) [2]。

helm-chart 的 .asf.yaml，开启了主干保护，push 之后，以后的代码需要用过PR提交。

```
github:
  description: ShenYu is High-Performance Java API Gateway.
  homepage: https://shenyu.apache.org/
  labels:
    - shenyu
    - helm chart
  features:
    wiki: true
    issues: true
    projects: true
  ghp_branch: main
    ghp_path: /docs
  enabled_merge_buttons:
    squash: true
    merge: false
    rebase: false
  protected_branches:
    main:
      required_status_checks:
        strict: true
      required_pull_request_reviews:
        dismiss_stale_reviews: true
        required_approving_review_count: 1
notifications:
  commits: notifications@shenyu.apache.org
  issues: notifications@shenyu.apache.org
  pullrequests: notifications@shenyu.apache.org
```

**以上内容参考**

[1] https://gitbox.apache.org/setup/newrepo.html

[2] https://cwiki.apache.org/confluence/display/INFRA/Git+-+.asf.yaml+features
