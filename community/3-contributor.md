---
id: contributor-guide
title: Contributor Guide
sidebar_position: 3
description: Apache ShenYu Contributor's Guide
categories: "Apache ShenYu"
tags: ["Contributor"]
---

We welcome every contributor to join us!

### Kinds of Contributions

In the Apache ShenYu community, there are many ways to contribute:

Code: Can help the community complete some tasks, write new features or fix some bugs;

Test: Can come to participate in the writing of test code, including unit testing, integration testing, e2e testing;

Docs: Can write or Documentation improved to help users better understand and use Apache ShenYu;

Blog: You can write articles about Apache ShenYu to help the community better promote;

Discussion: You can participate in the discussion of new features of Apache ShenYu and integrate your ideas with Apache ShenYu;

Preach: Can help publicize or promote the Apache ShenYu community, speak in meetup or summit;

Suggestion: You can also make some suggestions to the project or community to promote the healthy development of the community;

. . .

Even minor corrections to typos, or corrections to 404 links, are very welcome :)

### Join the Discussion

We believe: [Community Over Code](https://www.apache.org/theapacheway/index.html).

Participating in discussions is the first step in contributing, please subscribe to our mailing list first and participate in ongoing discussions on the mailing list!

The steps to subscribe to emails are simple:

1. Send an email to [dev-subscribe@shenyu.apache.org](mailto:dev-subscribe@shenyu.apache.org);
2. After sending successfully, you will receive a reply from [dev-help@shenyu.apache.org](mailto:dev-help@shenyu.apache.org), please reply to this email according to the instructions of the email to confirm the subscription ;
3. After replying to confirm, you will receive a welcome email indicating that you have successfully subscribed to the email.

After the subscription is successful, you can participate in the discussion at [dev@shenyu.apache.org](mailto:dev@shenyu.apache.org). You can also click on [Public Archives](https://lists.apache.org/list.html?dev@shenyu.apache.org) to see historical emails.

During the discussion, please be polite and suggest reading [Code of Conduct](https://www.apache.org/foundation/policies/conduct.html) of ASF.

If you feel that there are too many emails, disturbing you, or you are no longer interested. Please send mail to `dev-unsubscribe@shenyu.apache.org`. Unsubscribe from the mailing list.(The title and content are arbitrary, and the system will automatically process them.)

### Target Repository

Apache ShenYu is generally developed collaboratively on GitHub. Currently, there are the following repositories:

| REPOSITORY                                                                    | DESCRIPTION                    |
|-------------------------------------------------------------------------------|--------------------------------|
| [apache/shenyu](https://github.com/apache/shenyu)                             | Main Repository                |
| [apache/shenyu-dashboard](https://github.com/apache/shenyu-dashboard)         | Front-end Code of shenyu-admin |
| [apache/shenyu-website](https://github.com/apache/shenyu-website)             | Official Website and Documents |
| [apache/shenyu-helm-chart](https://github.com/apache/shenyu-helm-chart)       | Helm Chart for Apache ShenYu   |
| [apache/shenyu-nginx](https://github.com/apache/shenyu-nginx)                 | Code to integrate with nginx   |
| [apache/shenyu-client-python](https://github.com/apache/shenyu-client-python) | Python SDK                     |
| [apache/shenyu-client-dotnet](https://github.com/apache/shenyu-client-dotnet) | .Net SDK                       |
| [apache/shenyu-client-golang](https://github.com/apache/shenyu-client-golang) | Golang SDK                     |

### Getting Apache ShenYu up and running

To get Apache ShenYu code running on your development tools, see [Local Deployment](/docs/deployment/deployment-local) or [Apache ShenYu Startup Example](/blog/Start-SourceCode-Analysis-Start-Demo), and able to debug with breakpoints.

After running, you can read the [source code analysis article](https://shenyu.apache.org/blog) included in our official website to have a deeper understanding of Apache ShenYu.

### Find tasks

Find the issue you are interested in! On our GitHub repo and mailing list, we often publish some issues with the label `good first issue` or `status: volunteer wanted`. These issues welcome the help of contributors. Among them, good first issues tend to have low thresholds and are suitable for novices. You can click the [link](https://github.com/apache/shenyu/issues?q=is%3Aopen+is%3Aissue+label%3A%22good+first+issue%22%2C%22status%3A+volunteer+wanted%22) to check out these issues.

Of course, if you have a good idea, you can also propose it directly on the mailing list(dev@shenyu.apache.org), and after a thorough discussion, you can start to act.

At the same time, you can also participate in the writing of our [blog](https://shenyu.apache.org/blog) and submit them to [the blog module](https://github.com/apache/shenyu-website/tree/main/blog) of the Apache ShenYu official website through Pull Request.

If you are a student, you are also very welcome to apply for the topic of Apache ShenYu in open source internship activities such as GSoC. You can click the [link](https://community.apache.org/gsoc.html) to view the Apache Software Foundation Introduction to GSoC. You can also check Apache ShenYu's previous or ongoing GSoC issues through this [link](https://github.com/apache/shenyu/issues?q=is%3Aopen+is%3Aissue+label%3Agsoc)!

### Submit Pull Request for the first time

If you are submitting a Pr for the first time, first you need to Fork the target repository. (If it has been forked, then no fork is required)

![fork](/img/community/fork.png)

Then download the code locally **with git command**:

```shell
git clone git@github.com:${YOUR_USERNAME}/${TARGET_REPO}.git #Recommended
# You can also git clone https://github.com/${YOUR_USERNAME}/${TARGET_REPO}.git
```

After the download is complete, please refer to the getting started guide or README file of the target repository to initialize the project. In Windows environment, if the file name is too long when cloning the source code, please refer to [FAQ](./faq).

Then, you can refer to the following command to submit the code:

Switch to a new branch for development

```shell
git checkout -b a-dev-branch
```

submit commit

```shell
git add <modified file/path> #add followed by the modified files or path
git commit -m 'necessary instructions'
```

push to the remote repository

```shell
git push origin a-dev-branch
```

Then you can initiate a new PR (Pull Request) on GitHub.

Please note that the title of the PR needs to conform to our [spec](/community/issue-pr), and write the necessary description in the PR to facilitate code review by Committers and other contributors.

### Subsequent Pull Request submission

#### Update master branch code

First, switch to the master branch

```shell
git checkout master #May also be the main branch
```

Bind the upstream warehouse (you only need to bind it once), here is the main warehouse of shenyu as an example

```shell
git remote add upstream https://github.com/apache/shenyu.git
```

Pull remote code

```shell
git pull upstream master
```

#### New development branch for developing

Then create a new development branch for development, submission and push. The process is the same as submitting Pull Request for the first time.

In order to prevent the confusion of the master branch, it is recommended that the master branch be used to maintain synchronization with the upstream, and not develop and submit code on the master branch.

### Wait for the code to be merged

After submitting the PR, the Committer or the community's friends will review the code you submitted (Code Review), and will propose some modification suggestions or conduct some discussions. Please pay attention to your PR in time.

If subsequent changes are required, there is no need to initiate a new PR. After submitting a commit on the original branch and pushing it to the remote repository, the PR will be automatically updated.

In addition, our project has a relatively standardized and strict CI inspection process. After submitting PR, CI will be triggered. Please pay attention to whether it passes the CI inspection.

Finally, the Committers can merge the PR into the master branch.

### After the code is merged

After the code has been merged, you can delete the development branch on both the local and remote repositories:

```shell
git branch -d a-dev-branch
git push origin --delete a-dev-branch
```

On the master/main branch, you can do the following to sync the upstream repository:

```shell
git remote add upstream https://github.com/apache/shenyu.git #Bind the remote warehouse, if it has been executed, it does not need to be executed again
git checkout master # or main
git pull upstream master
```

### How to become a Committer?

With the above steps, you are a contributor to Apache ShenYu. Repeat the previous steps to stay active in the community, keep at it and you can become a [Committer](/community/committer/)!

In order to keep abreast of the development of Apache ShenYu, you can follow the mailing list, or you can participate in the biweekly meeting of the community (meeting invitation link will be sent on the mailing list).
