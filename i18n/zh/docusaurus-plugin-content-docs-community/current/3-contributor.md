---
title: 贡献者指南
sidebar_position: 4
description: Apache ShenYu 贡献者指南
categories: "Apache ShenYu"
tags: ["Contributor"]
---

我们欢迎每一位贡献者的加入！

### 贡献方式

在 Apache ShenYu 社区，贡献方式有很多：

代码：可以帮助社区完成一些任务、编写新的feature或者是修复一些bug；

测试：可以来参与测试代码的编写，包括了单元测试、集成测试、e2e测试；

文档：可以编写或完善文档，来帮助用户更好地了解和使用 Apache ShenYu；

博客：可以撰写 Apache ShenYu 的相关文章，来帮助社区更好地推广；

讨论：可以参与 Apache ShenYu 新的feature的讨论，将你的想法跟 Apache ShenYu 融合；

建议：也可以对项目或者社区提出一些建议，促进社区的良性发展；

。。。

即便是小到错别字的修正，或者是对404链接的修正，我们也都非常欢迎 :)

### 参与讨论

我们认为：[社区胜于代码](https://www.apache.org/theapacheway/index.html)。

参与讨论是贡献的第一步，请参考 [邮件订阅指南](./0-subscribe-email.md) 来订阅我们的邮件列表，并参与邮件列表上正在进行的讨论！

在讨论的过程中，请注意保持礼貌，建议阅读 ASF 的 [行为准则](https://www.apache.org/foundation/policies/conduct.html)。

### 目标仓库

Apache ShenYu 一般是在 GitHub 上进行协作开发。目前有以下几个仓库：

[apache/incubator-shenyu](https://github.com/apache/incubator-shenyu)

[apache/incubator-shenyu-dashboard](https://github.com/apache/incubator-shenyu-dashboard)

[apache/incubator-shenyu-website](https://github.com/apache/incubator-shenyu-website)

[apache/incubator-shenyu-sdk](https://github.com/apache/incubator-shenyu-sdk)

[apache/incubator-shenyu-nginx](https://github.com/apache/incubator-shenyu-nginx)

### 让 Apache ShenYu 运行起来

让 Apache ShenYu 的代码在你的开发工具上运行起来，请参阅 [本地部署](../docs/next/deployment/deployment-local) 或者 [Apache ShenYu 启动示例](../blog/Start-SourceCode-Analysis-Start-Demo)，并且能够断点调试。

在运行起来之后，可以阅读我们官网收录的[源码分析文章](../blog)，来对 Apache ShenYu 有更深入的理解。

### 寻找任务

寻找你感兴趣的Issue！在我们的GitHub仓库和邮件列表中，我们经常会发布一些带有 `good first issue` 或者 `status: volunteer wanted` 标签的issue，这些issue都欢迎贡献者的帮助，其中good first issue往往门槛较低、适合新手，你可以点击 [链接](https://github.com/apache/incubator-shenyu/issues?q=is%3Aopen+is%3Aissue+label%3A%22good+first+issue%22%2C%22status%3A+volunteer+wanted%22) 查看这些issue。

当然，如果你有好的想法，也可以直接在邮件列表中提出，经过充分讨论后就可以开始行动。

同时，你也可以参与编写我们的源码分析文章，并通过 Pull Request 的方式提交到 Apache ShenYu 官网的博客模块。

如果你是学生，那么也非常欢迎在 GSoC 等开源实习活动中申请 Apache ShenYu 的议题，你可以点击 [链接](https://community.apache.org/gsoc.html) 来查看 Apache 软件基金会对 GSoC 的介绍。你也可以通过这个 [链接](https://github.com/apache/incubator-shenyu/issues?q=is%3Aopen+is%3Aissue+label%3Agsoc) 来查看 Apache ShenYu 往年或者正在进行中的 GSoC 议题！

### 提交Pull Request

首先你需要 Fork 你的目标仓库。

接着，可以参考如下命令进行代码的提交：

切换新的开发分支

```shell
git checkout -b a-new-branch
```

提交 commit

```shell
git add .
git commit -m 'necessary instructions'
```

推送到远程仓库

```shell
git push origin a-new-branch
```

然后你就可以在 GitHub 上发起新的 PR (Pull Request)。

请注意 PR 的标题需要符合我们的[规范](./2-issue-pr.md)，并且在 PR 中写上必要的说明，来方便 Committer 和其他贡献者进行代码审查。

### 等待代码被合并

在提交了 PR 后，Committer 或者社区的小伙伴们会对你提交的代码进行审查（Code Review），会提出一些修改建议，或者是进行一些讨论。

另外，我们的项目有比较规范和严格的 CI 检查流程，在提交 PR 之后会触发 CI，请注意是否通过 CI 检查。

最后，Committer 可以将 PR 合并入主分支。

### 如何成为Committer？

重复前面的步骤，在社区中保持活跃，坚持下去，你就能成为 Committer！
