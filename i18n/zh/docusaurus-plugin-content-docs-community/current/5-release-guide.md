---
title: 发布指南
sidebar_position: 5
description: Apache ShenYu 发布指南
cover: "/img/architecture/shenyu-framework.png"
---

## 更新发布公告

按照如下格式更新[发布公告](https://github.com/apache/incubator-shenyu/blob/master/RELEASE-NOTES.md)：

```
## ${PUBLISH.VERSION}

### New Features

1. xxx
1. xxx
...

### API Changes

1. xxx
1. xxx
...

### Enhancement

1. xxx
1. xxx
...

### Refactor

1. xxx
1. xxx
...

### Bug Fix

1. xxx
1. xxx
...
```

## 创建 GPG KEY

> 每个发布经理只在第一次发布时创建 GPG KEY，以后发布可复用此 KEY。

**1. 创建 KEY**

安装 [GnuPG](https://www.gnupg.org/download/index.html)。

按照 [OpenPGP KEY Management](https://www.gnupg.org/documentation/manuals/gnupg/OpenPGP-Key-Management.html#OpenPGP-Key-Management) [1] 的说明创建 KEY：

```shell
gpg --full-gen-key
```

创建步骤（以下内容来自控制台输出）：

```shell
gpg (GnuPG) 2.2.4; Copyright (C) 2017 Free Software Foundation, Inc.
This is free software: you are free to change and redistribute it.
There is NO WARRANTY, to the extent permitted by law.

Please select what kind of key you want:
  (1) RSA and RSA (default)
  (2) DSA and Elgamal
  (3) DSA (sign only)
  (4) RSA (sign only)
Your selection? 1
RSA keys may be between 1024 and 4096 bits long.
What keysize do you want? (2048) 4096
Requested keysize is 4096 bits
Please specify how long the key should be valid.
        0 = key does not expire
     <n>  = key expires in n days
     <n>w = key expires in n weeks
     <n>m = key expires in n months
     <n>y = key expires in n years
Key is valid for? (0) 
Key does not expire at all
Is this correct? (y/N) y

GnuPG needs to construct a user ID to identify your key.

Real name: （设置用户名）
Email address: （设置邮件地址）
Comment: （填写注释）
You selected this USER-ID:
   "用户名 (注释) <邮件地址>"

Change (N)ame, (C)omment, (E)mail or (O)kay/(Q)uit? O
You need a Passphrase to protect your secret key. （设置密码）
```

**2. 检查 KEY**

按照 [Operational GPG Commands](https://www.gnupg.org/documentation/manuals/gnupg/Operational-GPG-Commands.html#Operational-GPG-Commands) [2] 的说明检查 KEY：

```shell
gpg --list-keys
```

命令输出：

```shell
pub   rsa4096 2019-03-11 [SC]
      095E0D21BC28CFC7A8B8076DF7DF28D237A8048C
uid           用户名 (注释) <邮件地址>
sub   rsa4096 2019-03-11 [E]
```

公钥为 095E0D21BC28CFC7A8B8076DF7DF28D237A8048C。

**3. 上传公钥**

按照 [Dirmngr Options](https://www.gnupg.org/documentation/manuals/gnupg/Dirmngr-Options.html#Dirmngr-Options) [3] 的说明上传公钥：

```shell
gpg --send-key 095E0D21BC28CFC7A8B8076DF7DF28D237A8048C
```

## 发布到 Maven 预发仓库

**1. 配置 settings.xml**

根据 [publishing maven artifacts](https://infra.apache.org/publishing-maven-artifacts.html) [4] 的说明配置 settings.xml。

**2. 创建并切换发布分支**

下载并安装 [Git](https://git-scm.com/downloads)

创建并切换到 `${PUBLISH.VERSION}-release` 分支。

```shell
git clone https://github.com/apache/incubator-shenyu.git ~/incubator-shenyu
cd ~/incubator-shenyu/
git checkout -b ${PUBLISH.VERSION}-release
git push origin ${PUBLISH.VERSION}-release
```

**3. 发布预检**

根据 [publishing maven artifacts](https://infra.apache.org/publishing-maven-artifacts.html) [4] 的说明进行发布预检。

```shell
mvn release:prepare -Prelease -Darguments="-DskipTests" -DautoVersionSubmodules=true -DdryRun=true -Dusername=(填写GitHub用户名)
```

**4. 准备发布**

根据 [publishing maven artifacts](https://infra.apache.org/publishing-maven-artifacts.html) [4] 的说明准备发布。

```shell
mvn release:clean
```

```shell
mvn release:prepare -Prelease -Darguments="-DskipTests" -DautoVersionSubmodules=true -DpushChanges=false -Dusername=(填写GitHub用户名)
```

提交更新版本号后的代码和新标签。

```shell
git push origin ${PUBLISH.VERSION}-release
git push origin --tags
```

**5. 执行发布**

根据 [publishing maven artifacts](https://infra.apache.org/publishing-maven-artifacts.html) [4] 的说明执行发布。

```shell
mvn release:perform -Prelease -Darguments="-DskipTests" -DautoVersionSubmodules=true -Dusername=(填写GitHub用户名)
```

此时，发行版被发布到 [Staging仓库] (https://repository.apache.org/#stagingRepositories)，找到发布的版本，即 ${STAGING.RELEASE}， 并点击 Close。

## 发布到 SVN 预发仓库

下载并安装[SVN](https://tortoisesvn.net/downloads.html)

**1. 更新 KEYS 文件**

> 如果发布经理还没有将自己的公钥追加到 KEYS 文件中，请执行以下操作。否则，跳过此步骤。

根据 [signing basics](https://infra.apache.org/release-signing.html#signing-basics) [5] 的说明更新 KEYS 文件。

```shell
mkdir -p ~/keys/release/
cd ~/keys/release/
svn --username=${LDAP ID} co https://dist.apache.org/repos/dist/release/incubator/shenyu
cd ~/keys/release/shenyu
gpg -a --export ${GPG 用户名} >> KEYS
svn --username=${LDAP ID} commit -m "append to KEYS"
```

**2. 添加源码包和二进制文件包**

根据 [Uploading packages](https://infra.apache.org/release-publishing.html#uploading) [6] 的说明添加源码包和二进制文件包。

```shell
mkdir -p ~/svn_release/dev/
cd ~/svn_release/dev/
svn --username=${LDAP ID} co https://dist.apache.org/repos/dist/dev/incubator/shenyu
mkdir -p ~/svn_release/dev/shenyu/${PUBLISH.VERSION}
cd ~/svn_release/dev/shenyu/${PUBLISH.VERSION}
cp -f ~/incubator-shenyu/shenyu-dist/shenyu-src-dist/target/*.zip ~/svn_release/dev/shenyu/${PUBLISH.VERSION}
cp -f ~/incubator-shenyu/shenyu-dist/shenyu-src-dist/target/*.zip.asc ~/svn_release/dev/shenyu/${PUBLISH.VERSION}
cp -f ~/incubator-shenyu/shenyu-dist/shenyu-bootstrap-dist/target/*.tar.gz ~/svn_release/dev/shenyu/${PUBLISH.VERSION}
cp -f ~/incubator-shenyu/shenyu-dist/shenyu-bootstrap-dist/target/*.tar.gz.asc ~/svn_release/dev/shenyu/${PUBLISH.VERSION}
cp -f ~/incubator-shenyu/shenyu-dist/shenyu-admin-dist/target/*.tar.gz ~/svn_release/dev/shenyu/${PUBLISH.VERSION}
cp -f ~/incubator-shenyu/shenyu-dist/shenyu-admin-dist/target/*.tar.gz.asc ~/svn_release/dev/shenyu/${PUBLISH.VERSION}
```

**3. 添加校验文件**

根据 [Requirements for cryptographic signatures and checksums](https://infra.apache.org/release-distribution#sigs-and-sums) [7] 的说明添加校验文件。

```shell
shasum -a 512 apache-shenyu-incubating-${PUBLISH.VERSION}-src.zip > apache-shenyu-incubating-${PUBLISH.VERSION}-src.zip.sha512
shasum -b -a 512 apache-shenyu-incubating-${PUBLISH.VERSION}-bootstrap-bin.tar.gz > apache-shenyu-incubating-${PUBLISH.VERSION}-bootstrap-bin.tar.gz.sha512
shasum -b -a 512 apache-shenyu-incubating-${PUBLISH.VERSION}-admin-bin.tar.gz > apache-shenyu-incubating-${PUBLISH.VERSION}-admin-bin.tar.gz.sha512
```

**4. 提交新版本**

```shell
cd ~/svn_release/dev/shenyu
svn add ${PUBLISH.VERSION}/
svn --username=${LDAP ID} commit -m "release ${PUBLISH.VERSION}"
```

## 预发版本验证

**1. 验证 sha512 校验和**

根据 [Checking Hashes](https://www.apache.org/info/verification.html#CheckingHashes) [8] 的说明验证 sha512 校验和。

```shell
shasum -c apache-shenyu-incubating-${PUBLISH.VERSION}-src.zip.sha512
shasum -c apache-shenyu-incubating-${PUBLISH.VERSION}-bootstrap-bin.tar.gz.sha512
shasum -c apache-shenyu-incubating-${PUBLISH.VERSION}-admin-bin.tar.gz.sha512
```

**2. 验证 GPG 签名**

根据 [Checking Signatures](https://www.apache.org/info/verification.html#CheckingSignatures) [9] 的说明验证 GPG 签名。

```shell
curl https://downloads.apache.org/incubator/shenyu/KEYS >> KEYS
gpg --import KEYS
cd ~/svn_release/dev/shenyu/${PUBLISH.VERSION}
gpg --verify apache-shenyu-incubating-${PUBLISH.VERSION}-src.zip.asc apache-shenyu-incubating-${PUBLISH.VERSION}-src.zip
gpg --verify apache-shenyu-incubating-${PUBLISH.VERSION}-bootstrap-bin.tar.gz.asc apache-shenyu-incubating-${PUBLISH.VERSION}-bootstrap-bin.tar.gz
gpg --verify apache-shenyu-incubating-${PUBLISH.VERSION}-admin-bin.tar.gz.asc apache-shenyu-incubating-${PUBLISH.VERSION}-admin-bin.tar.gz
```

**3. 确保 SVN 与 GitHub 源码一致**

根据 [Incubator Release Checklist](https://cwiki.apache.org/confluence/display/INCUBATOR/Incubator+Release+Checklist) [10] 的说明确保 SVN 与 GitHub 源码一致。

```
wget https://github.com/apache/incubator-shenyu/archive/v${PUBLISH.VERSION}.zip
unzip v${PUBLISH.VERSION}.zip
unzip apache-shenyu-incubating-${PUBLISH.VERSION}-src.zip
diff -r -x "shenyu-dashboard" -x "shenyu-examples" -x "shenyu-integrated-test" -x "static" apache-shenyu-incubating-${PUBLISH.VERSION}-src incubator-shenyu-${PUBLISH.VERSION}
```

**4. 检查源码包**

根据 [Incubator Release Checklist](https://cwiki.apache.org/confluence/display/INCUBATOR/Incubator+Release+Checklist) [10] 的说明检查源码包。

- 文件夹包含单词 `incubating`
- 存在 `LICENSE`，`NOTICE` 和 `DISCLAIMER` 文件
- `NOTICE` 文件中的年份正确
- 所有文件的开头都有 ASF 许可证
- 不存在未依赖软件的 `LICENSE` 和 `NOTICE`
- 不存在不符合预期的二进制文件
- 编译通过 (./mvnw install) (目前支持 JAVA 8)
- 如果存在第三方代码依赖：
  - 第三方代码依赖的许可证兼容
  - 所有第三方代码依赖的许可证都在 `LICENSE` 文件中声名
  - 第三方代码依赖许可证的完整版全部在 `license` 目录
  - 如果依赖的是 Apache 许可证并且有 `NOTICE` 文件，那么这些 `NOTICE` 文件需要加入到项目的 `NOTICE` 文件中

**5. 检查二进制包**

根据 [Binary distributions](https://infra.apache.org/licensing-howto.html#binary) [11] 的说明检查二进制包。

- 文件夹包含单词 `incubating`
- 存在 `LICENSE`，`NOTICE` 和 `DISCLAIMER` 文件
- `NOTICE` 文件中的年份正确
- 所有文本文件开头都有 ASF 许可证
- 不存在未依赖软件的 `LICENSE` 和 `NOTICE`
- 如果存在第三方代码依赖：
  - 第三方代码依赖的许可证兼容
  - 所有第三方代码依赖的许可证都在 `LICENSE` 文件中声名
  - 第三方代码依赖许可证的完整版全部在 `license` 目录
  - 如果依赖的是 Apache 许可证并且有 `NOTICE` 文件，那么这些 `NOTICE` 文件需要加入到项目的 `NOTICE` 文件中

## 投票流程

根据 [RELEASE APPROVAL](https://www.apache.org/legal/release-policy.html#release-approval) [12] 
[Releases](https://incubator.apache.org/policy/incubation.html#Releases) [13] 
[voting](https://www.apache.org/foundation/voting.html) [14] 的说明进行社区投票。

### 订阅 Incubator 邮件列表

1. 发送任意主题和内容邮件到 [general-subscribe@incubator.apache.org](mailto:general-subscribe@incubator.apache.org)，然后按照提示完成订阅。

2. 可以通过这个[地址](https://lists.apache.org/list.html?general@incubator.apache.org)查看历史邮件。

### ShenYu 社区投票

* 投票持续至少72小时并获得3个`+1 mentor`票后，才能开始孵化器投票。

发送至：

```
dev@shenyu.apache.org
```

标题：

```
[VOTE] Release Apache ShenYu (incubating) ${PUBLISH.VERSION}
```

正文：

```
Hello ShenYu Community,

This is a call for vote to release Apache ShenYu (incubating) version ${PUBLISH.VERSION}

Release notes:
https://github.com/apache/incubator-shenyu/blob/master/RELEASE-NOTES.md

The release candidates:
https://dist.apache.org/repos/dist/dev/incubator/shenyu/${PUBLISH.VERSION}/

Maven 2 staging repository:
https://repository.apache.org/content/repositories/${STAGING.RELEASE}/org/apache/shenyu/

Git tag for the release:
https://github.com/apache/incubator-shenyu/tree/v${PUBLISH.VERSION}/

Release Commit ID:
https://github.com/apache/incubator-shenyu/commit/xxxxxxxxxxxxxxxxxxxxxxx

Keys to verify the Release Candidate:
https://downloads.apache.org/incubator/shenyu/KEYS

Look at here for how to verify this release candidate:
https://shenyu.apache.org/community/release-guide/#check-release

The vote will be open for at least 72 hours or until necessary number of votes are reached.

Please vote accordingly:

[ ] +1 approve 

[ ] +0 no opinion
 
[ ] -1 disapprove with the reason

Checklist for reference:

[ ] Download links are valid.

[ ] Checksums and PGP signatures are valid.

[ ] Source code distributions have correct names matching the current release.

[ ] LICENSE and NOTICE files are correct for each ShenYu repo.

[ ] All files have license headers if necessary.

[ ] No compiled archives bundled in source archive.
```

* 宣布投票结果

发送至：

```
dev@shenyu.apache.org
```

标题：

```
[RESULT][VOTE] Release Apache ShenYu (incubating) ${PUBLISH.VERSION}
```

正文：

```
We’ve received 7 +1 votes:

+1, xxx (mentor)
+1, xxx (mentor)
+1, xxx (mentor)
+1, xxx (ppmc)
+1, xxx (ppmc)
+1, xxx (ppmc)
+1, xxx (ppmc)

Vote thread:
https://lists.apache.org/thread/xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

Thanks everyone for taking the time to verify and vote for the release!
```

### Incubator 社区投票

* 投票持续至少72小时并获得3个`+1 binding`票后，才能继续接下来的流程。

发送至：

```
general@incubator.apache.org
```

标题：

```
[VOTE] Release Apache ShenYu (incubating) ${PUBLISH.VERSION}
```

正文：

```
Hello Incubator Community,

This is a call for vote to release Apache ShenYu (incubating) version ${PUBLISH.VERSION}

The Apache ShenYu community has voted on and approved a proposal to release 
Apache ShenYu (incubating) version ${PUBLISH.VERSION}.

We now kindly request the Incubator PMC members review and vote on this
incubator release.

ShenYu community vote thread:
https://lists.apache.org/thread/xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

Vote result thread:
https://lists.apache.org/thread/xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

Release notes:
https://github.com/apache/incubator-shenyu/blob/master/RELEASE-NOTES.md

The release candidates:
https://dist.apache.org/repos/dist/dev/incubator/shenyu/${PUBLISH.VERSION}/

Maven 2 staging repository:
https://repository.apache.org/content/repositories/${STAGING.RELEASE}/org/apache/shenyu/

Git tag for the release:
https://github.com/apache/incubator-shenyu/tree/v${PUBLISH.VERSION}/

Release Commit ID:
https://github.com/apache/incubator-shenyu/commit/xxxxxxxxxxxxxxxxxxxxxxx

Keys to verify the Release Candidate:
https://downloads.apache.org/incubator/shenyu/KEYS

Look at here for how to verify this release candidate:
https://shenyu.apache.org/community/release-guide/#check-release

The vote will be open for at least 72 hours or until necessary number of votes are reached.

Please vote accordingly:

[ ] +1 approve 

[ ] +0 no opinion
 
[ ] -1 disapprove with the reason

Checklist for reference:

[ ] Download links are valid.

[ ] Checksums and PGP signatures are valid.

[ ] Source code distributions have correct names matching the current release.

[ ] LICENSE and NOTICE files are correct for each ShenYu repo.

[ ] All files have license headers if necessary.

[ ] No compiled archives bundled in source archive.
```

* 宣布投票结果

发送至：

```
general@incubator.apache.org
```

标题：

```
[RESULT][VOTE] Release Apache ShenYu (incubating) ${PUBLISH.VERSION}
```

正文：

```
Hi,

The vote to release Apache ShenYu (incubating) ${PUBLISH.VERSION} has passed with
6 +1 binding and 1 +1 non-binding votes, no +0 or -1 votes.

Binding votes:
xxx
xxx
xxx
xxx
xxx
xxx

Non-Binding votes:
xxx

Vote thread:
https://lists.apache.org/thread/xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

Thanks a lot to everyone for taking your time to review our release candidate.
We will proceed with publishing the approved artifacts and sending out the
announcements in the coming days.
```

## 完成发布

**1. 完成 SVN 发布**

根据 [Uploading packages](https://infra.apache.org/release-publishing.html#uploading) [6] 的说明将新版本从dev目录转移到release目录。

```shell
svn mv https://dist.apache.org/repos/dist/dev/incubator/shenyu/${PUBLISH.VERSION} https://dist.apache.org/repos/dist/release/incubator/shenyu/ -m "transfer packages for ${PUBLISH.VERSION}"
svn delete https://dist.apache.org/repos/dist/release/incubator/shenyu/${PREVIOUS.RELEASE.VERSION}
```

**2. 完成 Maven 发布**

根据 [publishing maven artifacts](https://infra.apache.org/publishing-maven-artifacts.html) [4] 的说明完成 Maven 发布。

回到 [Staging仓库](https://repository.apache.org/#stagingRepositories) 的 ${STAGING.RELEASE}，点击 `Release`。

**3. 完成 Docker 发布**

安装 [Docker](https://docs.docker.com/get-docker/) 。

```shell
git checkout v${PUBLISH.VERSION}
cd ~/shenyu/shenyu-dist/
mvn clean package -Prelease,docker
docker login
docker push apache/shenyu-bootstrap:latest
docker push apache/shenyu-bootstrap:${RELEASE_VERSION}
docker push apache/shenyu-admin:latest
docker push apache/shenyu-admin:${RELEASE_VERSION}
```

登录 Docker Hub 验证 [shenyu-bootstrap](https://hub.docker.com/r/apache/shenyu-bootstrap/) 和 [shenyu-admin](https://hub.docker.com/r/apache/shenyu-admin/) 的镜像是否存在。

**4. 完成 GitHub 发布**

编辑 [Releases](https://github.com/apache/incubator-shenyu/releases) 中的 `${PUBLISH.VERSION}`，然后点击发布。
 
**5. 完成 GitHub 更新**

从 GitHub Fork 一份代码，并执行以下命令：

```shell
git checkout master
git merge origin/${PUBLISH.VERSION}-release
git pull
git push origin master
```

以上修改需要创建一个pull request。pr合并后，在原始仓库执行以下命令：

```shell
git push --delete origin ${PUBLISH.VERSION}-release
git branch -d ${PUBLISH.VERSION}-release
```

**6. 更新下载页面**

根据 [Release Download Pages for Projects](https://infra.apache.org/release-download-pages.html) [15] 
[Normal distribution on the Apache downloads site](https://infra.apache.org/release-publishing.html#normal) [16] 
的说明更新下载页面。

Apache 镜像连接生效后，更新下载页面：

https://shenyu.apache.org/download/

https://shenyu.apache.org/zh/download/

项目下载链接应该使用 https://www.apache.org/dyn/closer.lua 而不是 closer.cgi 或者 mirrors.cgi

GPG签名文件和哈希校验文件的下载连接必须使用这个前缀：`https://downloads.apache.org/incubator/shenyu/`

## 发布公告

> 注意：`announce@apache.org` 地址要求以纯文本格式发送邮件。如果你使用的是Gmail，可以在编辑界面勾选`纯文本模式`。

发送至：

```
general@incubator.apache.org
dev@shenyu.apache.org
announce@apache.org
```

标题：

```
[ANNOUNCE] Apache ShenYu (incubating) ${PUBLISH.VERSION} available
```

正文：

```
Hi,

Apache ShenYu (incubating) Team is glad to announce the new release of Apache ShenYu (incubating) ${PUBLISH.VERSION}.

Apache ShenYu (incubating) is an asynchronous, high-performance, cross-language, responsive API gateway.
Support various languages (http protocol), support Dubbo, Spring-Cloud, Grpc, Motan, Sofa, Tars and other protocols.
Plugin design idea, plugin hot swap, easy to expand.
Flexible flow filtering to meet various flow control.
Built-in rich plugin support, authentication, limiting, fuse, firewall, etc.
Dynamic flow configuration, high performance.
Support cluster deployment, A/B Test, blue-green release.

Download Links: https://shenyu.apache.org/download/

Release Notes: https://github.com/apache/incubator-shenyu/blob/master/RELEASE-NOTES.md

Website: https://shenyu.apache.org/

ShenYu Resources:
- Issue: https://github.com/apache/incubator-shenyu/issues
- Mailing list: dev@shenyu.apache.org
- Documents: https://shenyu.apache.org/docs/index/


- Apache ShenYu (incubating) Team

--

DISCLAIMER

Apache ShenYu (incubating) is an effort undergoing incubation at The Apache Software Foundation (ASF), sponsored by the Apache Incubator PMC.
Incubation is required of all newly accepted projects until a further review indicates that the infrastructure,
communications, and decision making process have stabilized in a manner consistent with other successful ASF projects.
While incubation status is not necessarily a reflection of the completeness or stability of the code,
it does indicate that the project has yet to be fully endorsed by the ASF.
```

## 重新发布（非必需）

> 注意：只有在投票没有通过的情况下才需要重新发布。

**1. 取消投票邮件模板**

根据具体况向 `dev@shenyu.apache.org` 或`general@incubator.apache.org` 发送取消投票邮件。

发送至：

```
dev@shenyu.apache.org
```

或者

```
general@incubator.apache.org
```

标题：

```
[CANCEL][VOTE] Release Apache ShenYu (incubating) ${PUBLISH.VERSION}
```

正文：

```
Hi,

I'm cancelling this vote because of xxxxxx issues. I'll fix them and start the round ${n} vote process.
The detail of the modifications are as follows:

1. xxxxxx
2. xxxxxx

Thanks a lot for all your help.
```

**2. 清理预发仓库**

访问 https://repository.apache.org/#stagingRepositories, 使用 Apache 的 LDAP 账户登录后，选中之前`Close`的版本，点击`Drop`。

**3。删除GitHub分支和标签**

```shell
git push origin --delete ${PUBLISH.VERSION}-release
git branch -D ${PUBLISH.VERSION}-release
git push origin --delete tag v${PUBLISH.VERSION}
git tag -d v${PUBLISH.VERSION}
```

**4. 删除SVN待发布内容**

```shell
svn delete https://dist.apache.org/repos/dist/dev/incubator/shenyu/${PUBLISH.VERSION} -m "delete ${PUBLISH.VERSION}"
```

**5. 更新邮件标题**

完成以上步骤后，可以开始重新进行发布操作。接下来的投票邮件标题需要增加`[ROUND ${n}]`后缀。例如：

```
[VOTE] Release Apache ShenYu (incubating) ${PUBLISH.VERSION} [ROUND 2]
```

投票结果和通知邮件不需要加后缀。


**以上内容参考**

* [1] https://www.gnupg.org/documentation/manuals/gnupg/OpenPGP-Key-Management.html#OpenPGP-Key-Management
* [2] https://www.gnupg.org/documentation/manuals/gnupg/Operational-GPG-Commands.html#Operational-GPG-Commands
* [3] https://www.gnupg.org/documentation/manuals/gnupg/Dirmngr-Options.html#Dirmngr-Options
* [4] https://infra.apache.org/publishing-maven-artifacts.html
* [5] https://infra.apache.org/release-signing.html#signing-basics
* [6] https://infra.apache.org/release-publishing.html#uploading
* [7] https://infra.apache.org/release-distribution#sigs-and-sums
* [8] https://www.apache.org/info/verification.html#CheckingHashes
* [9] https://www.apache.org/info/verification.html#CheckingSignatures
* [10] https://cwiki.apache.org/confluence/display/INCUBATOR/Incubator+Release+Checklist
* [11] https://infra.apache.org/licensing-howto.html#binary
* [12] https://www.apache.org/legal/release-policy.html#release-approval
* [13] https://incubator.apache.org/policy/incubation.html#Releases
* [14] https://www.apache.org/foundation/voting.html
* [15] https://infra.apache.org/release-download-pages.html
* [16] https://infra.apache.org/release-publishing.html#normal
