---
title: Committer Guide
sidebar_position: 5
description: Apache ShenYu Committer's Guide
author: "xiaoyu"
categories: "Apache ShenYu"
tags: ["Committer"]
date: 2019-04-09
cover: "/img/architecture/shenyu-framework.png"
---

## Committer Promotion {#committer-promotion}

After you have made a lot of contributions, the community will nominate. Become a committer you will have

* Permissions written by Apache ShenYu repository
* [jetbrains all](https://www.jetbrains.com/shop/eform/apache)

## Promotion process

**1. Follow this [Committer Guide](https://community.apache.org/newcommitter.html) to complete the vote**

* Promotion Prepare. New Committer list all contributions to PMC member:

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

* Vote new Committer list to <private@shenyu.apache.org> :

```
Title : [VOTE] New committer: （Nominee）
Main Text：

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

* Vote result list to <private@shenyu.apache.org>

```
Title [RESULT] [VOTE] New committer:(Nominee)
Main Text：
I am glad to receive your votes, and the voting result is[1],
（total number） +1 votes, (total number) +0 votes, （total number）-1 votes

+1 PMC members name (PMC)

[1]: vote thread refer to https://lists.apache.org/list?private@shenyu.apache.org
Therefore, I will send the invitation to (Nominee).

```

* Invitation new Committer to Nominee email and copied to <private@shenyu.apache.org>:
> new committer need prepare an available email.

```
Title:Invitation to become apache shenyu committer (Nominee)
Main Text：

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

* if new Committer accepted invitation, reply mail:

> New committer accepted invitation need copied to <private@shenyu.apache.org>

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

* If nominee have not signed the ICLA, Please follow the [ICLA Guide](https://shenyu.apache.org/community/icla/) to complete the signing

* If nominee have ever signed an ICLA, please provide request account like this:

```
Prospective userid:  
Full name: 
Forwarding email address(sign icla send eamil):
What time to receive the reply signed by icla:
```

**2. Add the new committer to [roster](https://whimsy.apache.org/roster/committee/shenyu)**

**3. Complete the [GitBox Setup](https://gitbox.apache.org/setup/)**

**4. Enable GitHub two-factor authentication**

[two-factor authentication](https://docs.github.com/cn/organizations/keeping-your-organization-secure/managing-two-factor-authentication-for-your-organization/requiring-two-factor-authentication-in-your-organization)

**5. ANNOUNCE to <dev@shenyu.apache.org>**

```
Title: [ANNOUNCE] New committer: (Nominee)
Main Text：

The Project Management Committee (PMC) for Apache ShenYu
has invited (Nominee) to become a committer and we are pleased to
announce that he has accepted.

(Nominee) is active in the Apache ShenYu community, hope to see your
further interactions with the community!
Thanks for your contributions.
Best wishes!
```


## Committer Responsibilities {#committer-responsibilities}

* Solving issue problems.
* Mentoring contributors to the community.

## Pull Request

* Give sound advice where possible.
* AThe pull request should be marked `shenyu Lable` and the schedule must be set.
* Once the merge is complete, you need to check that the associated `issueNo` is closed.

**The content refers to**

https://community.apache.org/newcommitter.html

https://docs.github.com/cn/organizations/keeping-your-organization-secure/managing-two-factor-authentication-for-your-organization/requiring-two-factor-authentication-in-your-organization
