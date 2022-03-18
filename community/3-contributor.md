---
title: Contributor Guide
sidebar_position: 4
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

Suggestion: You can also make some suggestions to the project or community to promote the healthy development of the community;

. . .

Even minor corrections to typos, or corrections to 404 links, are very welcome :)

### Join the Discussion

We believe: [Community Over Code](https://www.apache.org/theapacheway/index.html).

Participating in discussions is the first step in contributing, please refer to the [Email Subscription Guide](./0-subscribe-email.md) to subscribe to our mailing list and participate in ongoing discussions on the mailing list!

During discussions, please be polite. And we suggest reading [Code of Conduct](https://www.apache.org/foundation/policies/conduct.html) of ASF.

### Target Repository

Apache ShenYu is generally developed collaboratively on GitHub. Currently, there are the following repositories:

[apache/incubator-shenyu](https://github.com/apache/incubator-shenyu)

[apache/incubator-shenyu-dashboard](https://github.com/apache/incubator-shenyu-dashboard)

[apache/incubator-shenyu-website](https://github.com/apache/incubator-shenyu-website)

[apache/incubator-shenyu-sdk](https://github.com/apache/incubator-shenyu-sdk)

[apache/incubator-shenyu-nginx](https://github.com/apache/incubator-shenyu-nginx)

### Getting Apache ShenYu up and running

To get Apache ShenYu code running on your development tools, see [Local Deployment](../docs/deployment/deployment-local) or [Apache ShenYu Startup Example](../blog/Start-SourceCode-Analysis-Start-Demo), and able to debug with breakpoints.

After running, you can read the [source code analysis article](../blog) included in our official website to have a deeper understanding of Apache ShenYu.

### Find tasks

Find the issue you are interested in! On our GitHub repo and mailing list, we often publish some issues with the label `good first issue` or `status: volunteer wanted`. These issues welcome the help of contributors. Among them, good first issues tend to have low thresholds and are suitable for novices. You can click the [link](https://github.com/apache/incubator-shenyu/issues?q=is%3Aopen+is%3Aissue+label%3A%22good+first+issue%22%2C%22status%3A+volunteer+wanted%22) to check out these issues.

Of course, if you have a good idea, you can also propose it directly on the mailing list, and after a thorough discussion, you can start to act.

At the same time, you can also participate in the writing of our source code analysis articles and submit them to the blog module of the Apache ShenYu official website through Pull Request.

If you are a student, you are also very welcome to apply for the topic of Apache ShenYu in open source internship activities such as GSoC. You can click the [link](https://community.apache.org/gsoc.html) to view the Apache Software Foundation Introduction to GSoC. You can also check Apache ShenYu's previous or ongoing GSoC issues through this [link](https://github.com/apache/incubator-shenyu/issues?q=is%3Aopen+is%3Aissue+label%3Agsoc)!

### Submit Pull Request

First you need to fork your target repository.

Then, you can refer to the following command to submit the code:

Switch to new a development branch

```shell
git checkout -b a-new-branch
````

Do a commit

```shell
git add .
git commit -m 'necessary instructions'
````

Push to the remote repository

```shell
git push origin a-new-branch
````

Then you can initiate a new PR (Pull Request) on GitHub.

Please note that the title of the PR needs to conform to our [spec](./2-issue-pr.md), and write the necessary description in the PR to facilitate code review by Committers and other contributors.

### Wait for the code to be merged

After submitting the PR, the Committer or the community's folks will review the code you submitted (Code Review), and will propose some modification suggestions or conduct some discussions.

In addition, our project has a relatively standardized and strict CI inspection process. After submitting PR, CI will be triggered. Please pay attention to whether it passes the CI inspection.

Finally, the Committers can merge the PR into the master branch.

### How to become a Committer?

Repeat the previous steps to stay active in the community, keep at it and you can become a Committer!
