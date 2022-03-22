---
id: contributor-guide
title: 贡献者指南
sidebar_position: 3
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

讨论：可以参与 Apache ShenYu 新的feature的讨论，将您的想法跟 Apache ShenYu 融合；

布道：可以帮助宣传或推广 Apache ShenYu 社区，在 meetup 或 summit 中演讲；

建议：也可以对项目或者社区提出一些建议，促进社区的良性发展；

。。。

即便是小到错别字的修正，或者是对404链接的修正，我们也都非常欢迎 :)

### 参与讨论

我们认为：[社区胜于代码](https://www.apache.org/theapacheway/index.html)。

参与讨论是贡献的第一步，请先订阅我们的邮件列表，并参与邮件列表上正在进行的讨论！

订阅邮件的步骤很简单：

1. 向 [dev-subscribe@shenyu.apache.org](mailto:dev-subscribe@shenyu.apache.org) 发送一封邮件；
2. 发送成功后，您会收到来自 [dev-help@shenyu.apache.org](mailto:dev-help@shenyu.apache.org) 的回信，请按照邮件的提示回复这封邮件，确认订阅；
3. 在回复确认后，您会收到一封欢迎邮件，表示您已经成功订阅了邮件。

在订阅成功后，您就可以在 [dev@shenyu.apache.org](mailto:dev@shenyu.apache.org) 参与讨论了。您也可以点击 [公共归档](https://lists.apache.org/list.html?dev@shenyu.apache.org) 来看到历史邮件。

在讨论过程中，请保持礼貌，建议阅读 ASF 的 [行为准则](https://www.apache.org/foundation/policies/conduct.html)。

### 目标仓库

Apache ShenYu 一般是在 GitHub 上进行协作开发。目前有以下几个仓库：

| 仓库                                                         | 说明                         |
| ------------------------------------------------------------ | ---------------------------- |
| [apache/incubator-shenyu](https://github.com/apache/incubator-shenyu) | 主仓库                       |
| [apache/incubator-shenyu-dashboard](https://github.com/apache/incubator-shenyu-dashboard) | shenyu-admin前端仓库         |
| [apache/incubator-shenyu-website](https://github.com/apache/incubator-shenyu-website) | 官网及文档                   |
| [apache/incubator-shenyu-client-python](https://github.com/apache/incubator-shenyu-client-python) | Python SDK                   |
| [apache/incubator-shenyu-nginx](https://github.com/apache/incubator-shenyu-nginx) | Nginx集成仓库                |
| [apache/incubator-shenyu-helm-chart](https://github.com/apache/incubator-shenyu-helm-chart) | Helm Chart for Apache ShenYu |

### 让 Apache ShenYu 运行起来

让 Apache ShenYu 的代码在您的开发工具上运行起来，请参阅 [本地部署](../docs/next/deployment/deployment-local) 或者 [Apache ShenYu 启动示例](../blog/Start-SourceCode-Analysis-Start-Demo)，并且能够断点调试。

在运行起来之后，可以阅读我们官网收录的[源码分析文章](../blog)，来对 Apache ShenYu 有更深入的理解。

### 寻找任务

寻找您感兴趣的Issue！在我们的GitHub仓库和邮件列表中，我们经常会发布一些带有 `good first issue` 或者 `status: volunteer wanted` 标签的issue，这些issue都欢迎贡献者的帮助。其中good first issue往往门槛较低、适合新手，您可以点击 [链接](https://github.com/apache/incubator-shenyu/issues?q=is%3Aopen+is%3Aissue+label%3A%22good+first+issue%22%2C%22status%3A+volunteer+wanted%22) 查看这些issue。

当然，如果您有好的想法，也可以直接在 邮件列表(dev@shenyu.apache.org) 中提出，经过充分讨论后就可以开始行动。

同时，您也可以参与编写我们的[博客](../blog)，并通过 Pull Request 的方式提交到 Apache ShenYu 官网的[博客模块](https://github.com/apache/incubator-shenyu-website/tree/main/blog) 。

如果您是学生，那么也非常欢迎在 GSoC 等开源实习活动中申请 Apache ShenYu 的议题，您可以点击 [链接](https://community.apache.org/gsoc.html) 来查看 Apache 软件基金会对 GSoC 的介绍。您也可以通过这个 [链接](https://github.com/apache/incubator-shenyu/issues?q=is%3Aopen+is%3Aissue+label%3Agsoc) 来查看 Apache ShenYu 往年或者正在进行中的 GSoC 议题！

### 提交Pull Request

首先您需要 Fork 目标仓库。

![fork](/img/community/fork.png)

然后 **用git命令** 将代码下载到本地：

```shell
git clone git@github.com:${YOUR_USERNAME}/${TARGET_REPO}.git #推荐使用
# 也可以 git clone https://github.com/${YOUR_USERNAME}/${TARGET_REPO}.git
```

下载完成后，请参考目标仓库的入门指南或者 README 文件对项目进行初始化。Windows 环境下，如果克隆源码时，提示文件名过长，请参看[FAQ](./12-faq)。

接着，您可以参考如下命令进行代码的提交：

切换新的分支，进行开发

```shell
git checkout -b a-dev-branch
```

提交 commit

```shell
git add <modified file/path> #add后跟着改动的文件或目录
git commit -m 'necessary instructions'
```

推送到远程仓库

```shell
git push origin a-dev-branch
```

然后您就可以在 GitHub 上发起新的 PR (Pull Request)。

请注意 PR 的标题需要符合我们的[规范](./2-issue-pr.md)，并且在 PR 中写上必要的说明，来方便 Committer 和其他贡献者进行代码审查。

### 等待代码被合并

在提交了 PR 后，Committer 或者社区的小伙伴们会对您提交的代码进行审查（Code Review），会提出一些修改建议，或者是进行一些讨论，请及时关注您的PR。

若后续需要改动，不需要发起一个新的 PR，在原有的分支上提交 commit 并推送到远程仓库后，PR会自动更新。

另外，我们的项目有比较规范和严格的 CI 检查流程，在提交 PR 之后会触发 CI，请注意是否通过 CI 检查。

最后，Committer 可以将 PR 合并入主分支。

### 代码被合并后

在代码被合并后，您就可以在本地和远程仓库删除这个开发分支了：

```shell
git branch -d a-dev-branch
git push origin --delete a-dev-branch
```

在主分支上，您可以执行以下操作来同步上游仓库：

```shell
git remote add upstream https://github.com/apache/incubator-shenyu.git #绑定远程仓库，如果执行过就不需要再执行
git checkout master #或main
git pull upsteam master
```

### 如何成为Committer？

通过上述步骤，您就是 Apache ShenYu 的贡献者了。重复前面的步骤，在社区中保持活跃，坚持下去，您就能成为 [Committer](./committer)！

为了及时了解 Apache ShenYu 的发展动态，您可以关注邮件列表，也可以参与社区的双周会（会议邀请链接将会在邮件列表中发出）。
