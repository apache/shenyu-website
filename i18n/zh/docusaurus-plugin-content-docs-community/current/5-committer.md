---
title: 提交者指南
sidebar_position: 5
description: Apache shenyu 提交者指南
author: "xiaoyu"
categories: "Apache ShenYu"
tags: ["Committer"]
date: 2019-04-09
cover: "/img/architecture/shenyu-framework.png"
---

## 提交者提名

当你做了很多贡献以后，社区会进行提名。
成为committer你会拥有

* Apache ShenYu仓库写的权限
* [jetbrains正版全家桶](https://www.jetbrains.com/shop/eform/apache)

## 提名流程

**1、按照这个 [Committer 指南](https://community.apache.org/newcommitter.html) 完成投票**

* 提名前准备. 新的committer列出自己的所有的申请贡献给PMC成员:

```
### shenyu （project name）
[total commits](https://github.com/apache/shenyu/commits?author=Nominee)
> code++, code--

- [ISSUE #xx] do something #pr

### shenyu-website

[total commits](https://github.com/apache/shenyu-website/commits?author=Nominee)
> code++, code--

- [ISSUE #xx] do something #pr

```

* 在<private@shenyu.apache.org>邮件列表提名committer :

```
标题 : [VOTE] New committer: （Nominee）
正文：

Hi, PMCs

This is a formal vote about inviting (Nominee) as our new committer.

(Reason for nomination)

The vote will be open for at least 72 hours or until the necessary number of votes are reached.

Please vote accordingly:

[ ] +1 approve

[ ] +0 no opinion

[ ] -1 disapprove with the reason

The following links will direct you to Nominee work.

list Nominee all contributions：

(Nominee Prepare)

```

* 在<private@shenyu.apache.org>邮件列表宣布结果:

```
标题 [RESULT] [VOTE] New committer:(Nominee)
正文：
I am glad to receive your votes, and the voting result is[1],
（total number） +1 votes, (total number) +0 votes, （total number）-1 votes

+1 PMC members name (PMC)

[1]: vote thread refer to https://lists.apache.org/list?private@shenyu.apache.org
Therefore, I will send the invitation to (Nominee).

```

* 给新的committer发送邮件，并且抄送给 <private@shenyu.apache.org>:
> 新的committer提供可用的邮箱地址，如果签署过icla，最好提供一样的邮箱地址.

```
标题:Invitation to become apache shenyu committer (Nominee)
正文：

Hello (Nominee),

The Apache ShenYu Project Management Committee (PMC) hereby
offers you committer privileges to the project. These privileges are
offered on the understanding that you'll use them reasonably and with
common sense. We like to work on trust
rather than unnecessary constraints.
Being a committer enables you to more easily make changes without
needing to go through the patch submission process.
Being a committer does not require you to participate any more than
you already do. It does tend to make one even more committed. You
will probably find that you spend more time here.
Of course, you can decline and instead remain as a contributor,
participating as you do now.
A. This personal invitation is a chance for you to accept or decline
in private. Either way, please let us know in reply to the
private@shenyu.apache.org
address only.
B. If you accept, the next step is to register an iCLA:
1. Details of the iCLA and the forms are found through this link:
http://www.apache.org/licenses/#clas

2. Instructions for its completion and return to the Secretary of
the ASF are found at http://www.apache.org/licenses/#submitting

3. When you transmit the completed iCLA, request to notify the
Apache shenyu and choose a unique Apache id. Look to see if your
preferred id is already taken at
http://people.apache.org/committer-index.html
This will allow the Secretary to notify the PMC when your iCLA has
been recorded.
When recording of your iCLA is noticed, you will receive a follow-up
message with the next steps for establishing you as a committer.

Best wishes,
Apache ShenYu PMC
```

* 新的committer接受邀请, 回复如下邮件:

> 新的提交者接受邀请的回复需要抄送给 <private@shenyu.apache.org>

```
Hi (Nominee),

Welcome! Here are the next steps. After that we will make an
announcement to the shenyu-dev list.

you not need to submit iCLA again.

You need to send a Contributor License Agreement to the ASF. Normally
you would send an Individual CLA. If you also make contributions done
in work time or using work resources then see the Corporate CLA. Ask
us if you have any issues.
http://www.apache.org/licenses/#clas

You need to choose a preferred ASF user name and alternatives. In
order to ensure it is available you can view a list of taken ids at
http://people.apache.org/committer-index.html
Please notify us when you have submitted the CLA and by what means you
did so. This will enable us to monitor its progress.

We will arrange for your Apache user account when the CLA has been recorded.

After that is done, please make follow-up replies to the shenyu-dev
list. We generally discuss everything there and keep the
private@shenyu.apache.org list for occasional matters which must be
private.

The developer section of the website describes the roles and provides
other resources:
http://www.apache.org/foundation/how-it-works.html
http://www.apache.org/dev/

Just as before you became a committer, participation in any ASF
community requires adherence to the ASF Code of Conduct:
https://www.apache.org/foundation/policies/conduct.html

Here is the guideline for sign icla:
https://shenyu.apache.org/community/icla

Here is the guideline for all of the Apache ShenYu committers:
https://shenyu.apache.org/community/committer
```

* 如果没有签署过 ICLA，请按照 [ICLA 签署指南](https://shenyu.apache.org/zh/community/icla/) 完成签署

* 如果曾经签署过 ICLA，请提供如下信息：

```
Prospective userid:  
Full name: 
Forwarding email address(sign icla send eamil):
What time to receive the reply signed by icla:
```

**2、在 [roster](https://whimsy.apache.org/roster/committee/shenyu) 中添加新的committer**

**3、完成 [GitBox Setup](https://gitbox.apache.org/setup/) 设置**

**4、启用 GitHub 双重身份验证**

[双重身份验证](https://docs.github.com/cn/organizations/keeping-your-organization-secure/managing-two-factor-authentication-for-your-organization/requiring-two-factor-authentication-in-your-organization)

**5. 在<dev@shenyu.apache.org>邮件列表发布新闻公告**

```
标题: [ANNOUNCE] New committer: (Nominee)
正文：

The Project Management Committee (PMC) for Apache ShenYu
has invited (Nominee) to become a committer and we are pleased to
announce that he has accepted.

(Nominee) is active in the Apache ShenYu community, hope to see your
further interactions with the community!
Thanks for your contributions.
Best wishes!
```

## 提交者责任

- 解答issue问题。
- 指导贡献者加入社区。

## 评审Pull Request

* 尽可能给出合理的建议。

* pull request 应该标有 `shenyu Lable` 并且必须设置进度表。

* 合并完成后，需要检查关联的 `issueNo` 是否关闭。  

**以上内容参考**

https://community.apache.org/newcommitter.html

https://docs.github.com/cn/organizations/keeping-your-organization-secure/managing-two-factor-authentication-for-your-organization/requiring-two-factor-authentication-in-your-organization

