---
title: ShenYu发布指南
description: ShenYu发布指南
cover: "/img/architecture/shenyu-framework.png"
---

## GPG设置

**1. 安装GPG**

在[GnuPG官网](https://www.gnupg.org/download/index.html)下载安装包。
GnuPG的1.x版本和2.x版本的命令有细微差别，下列说明以`GnuPG-2.1.23`版本为例。

安装完成后，执行以下命令查看版本号。

```shell
gpg --version
```

**2. 创建key**

安装完成后，执行以下命令创建key。

`GnuPG-2.x`可使用：

```shell
gpg --full-gen-key
```

`GnuPG-1.x`可使用：

```shell
gpg --gen-key
```

根据提示完成key：

> 注意：请使用Apache邮箱生成GPG的Key。

```shell
gpg (GnuPG) 2.0.12; Copyright (C) 2009 Free Software Foundation, Inc.
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

Real name: ${输入用户名}
Email address: ${输入邮件地址}
Comment: ${输入注释}
You selected this USER-ID:
   "${输入的用户名} (${输入的注释}) <${输入的邮件地址}>"

Change (N)ame, (C)omment, (E)mail or (O)kay/(Q)uit? O
You need a Passphrase to protect your secret key. # 输入密码
```

**3. 查看生成的key**

```shell
gpg --list-keys
```

执行结果：

```shell
pub   4096R/700E6065 2019-03-20
uid                  ${用户名} (${注释}) <{邮件地址}>
sub   4096R/0B7EF5B2 2019-03-20
```

其中700E6065为公钥ID。

**4. 将公钥同步到服务器**

命令如下：

```shell
gpg --keyserver hkp://pool.sks-keyservers.net --send-key 700E6065
```

`pool.sks-keyservers.net`为随意挑选的[公钥服务器](https://sks-keyservers.net/status/)，每个服务器之间是自动同步的，选任意一个即可。

## 发布Apache Maven中央仓库

**1. 设置settings.xml文件**

将以下模板添加到 `~/.m2/settings.xml`中，所有密码需要加密后再填入。
加密设置可参考[这里](http://maven.apache.org/guides/mini/guide-encryption.html)。

```xml
<settings>
  <servers>
    <server>
      <id>apache.snapshots.https</id>
      <username> <!-- APACHE LDAP 用户名 --> </username>
      <password> <!-- APACHE LDAP 加密后的密码 --> </password>
    </server>
    <server>
      <id>apache.releases.https</id>
      <username> <!-- APACHE LDAP 用户名 --> </username>
      <password> <!-- APACHE LDAP 加密后的密码 --> </password>
    </server>
  </servers>
</settings>
```

**2. 更新版本说明**

更新如下文件，并提交PR到主干：

```
https://github.com/apache/incubator-shenyu/blob/master/RELEASE-NOTES.md
```

**3. 创建发布分支**

假设从GitHub下载的ShenYu源代码在`~/shenyu/`目录；假设即将发布的版本为`${RELEASE.VERSION}`。
创建`${RELEASE.VERSION}-release`分支，接下来的操作都在该分支进行。

```shell
# ${name}为源码所在分支，如：master，main
git clone --branch ${name} https://github.com/apache/incubator-shenyu.git ~/shenyu
cd ~/shenyu/
git pull
git checkout -b ${RELEASE.VERSION}-release
git push origin ${RELEASE.VERSION}-release
```

**4. 发布预校验**

```shell
mvn release:prepare -Prelease -Darguments="-DskipTests" -DautoVersionSubmodules=true -DdryRun=true -Dusername=${Github用户名}
```

-Prelease: 选择release的profile，这个profile会打包所有源码、jar文件以及ShenYu的可执行二进制包。

-DautoVersionSubmodules=true：作用是发布过程中版本号只需要输入一次，不必为每个子模块都输入一次。

-DdryRun=true：演练，即不产生版本号提交，不生成新的tag。

**5. 准备发布**

首先清理发布预校验本地信息。

```shell
mvn release:clean
```

```shell
mvn release:prepare -Prelease -Darguments="-DskipTests" -DautoVersionSubmodules=true -DpushChanges=false -Dusername=${Github用户名}
```

和上一步演练的命令基本相同，去掉了-DdryRun=true参数。

-DpushChanges=false：不要将修改后的版本号和tag自动提交至Github。

将本地文件检查无误后，提交至github。

```shell
git push origin ${RELEASE.VERSION}-release
git push origin --tags
```

**6. 部署发布**

```shell
mvn release:perform -Prelease -Darguments="-DskipTests" -DautoVersionSubmodules=true -Dusername=${Github用户名}
```

执行完该命令后，待发布版本会自动上传到Apache的临时筹备仓库(staging repository)。
访问https://repository.apache.org/#stagingRepositories, 使用Apache的LDAP账户登录后，就会看到上传的版本，`Repository`列的内容即为${STAGING.REPOSITORY}。
点击`Close`来告诉Nexus这个构建已经完成，只有这样该版本才是可用的。
如果电子签名等出现问题，`Close`会失败，可以通过`Activity`查看失败信息。

## 发布Apache SVN仓库

**1. 检出ShenYu发布目录**

如无本地工作目录，则先创建本地工作目录。

```shell
mkdir -p ~/shenyu_svn/dev/
cd ~/shenyu_svn/dev/
```

创建完毕后，从Apache SVN检出ShenYu发布目录。

```shell
svn --username=${APACHE LDAP 用户名} co https://dist.apache.org/repos/dist/dev/incubator/shenyu
cd ~/shenyu_svn/dev/shenyu
```

**2. 添加gpg公钥**

仅第一次部署的账号需要添加，只要`KEYS`中包含已经部署过的账户的公钥即可。

```shell
gpg -a --export ${GPG用户名} >> KEYS
```

**3. 将待发布的内容添加至SVN目录**

创建版本号目录。

```shell
mkdir -p ~/shenyu_svn/dev/shenyu/${RELEASE.VERSION}
cd ~/shenyu_svn/dev/shenyu/${RELEASE.VERSION}
```

将源码包、二进制包和ShenYu可执行二进制包添加至SVN工作目录。

```shell
cp -f ~/incubator-shenyu/shenyu-dist/shenyu-src-dist/target/*.zip ~/shenyu_svn/dev/shenyu/${RELEASE.VERSION}
cp -f ~/incubator-shenyu/shenyu-dist/shenyu-src-dist/target/*.zip.asc ~/shenyu_svn/dev/shenyu/${RELEASE.VERSION}
cp -f ~/incubator-shenyu/shenyu-dist/shenyu-bootstrap-dist/target/*.tar.gz ~/shenyu_svn/dev/shenyu/${RELEASE.VERSION}
cp -f ~/incubator-shenyu/shenyu-dist/shenyu-bootstrap-dist/target/*.tar.gz.asc ~/shenyu_svn/dev/shenyu/${RELEASE.VERSION}
cp -f ~/incubator-shenyu/shenyu-dist/shenyu-admin-dist/target/*.tar.gz ~/shenyu_svn/dev/shenyu/${RELEASE.VERSION}
cp -f ~/incubator-shenyu/shenyu-dist/shenyu-admin-dist/target/*.tar.gz.asc ~/shenyu_svn/dev/shenyu/${RELEASE.VERSION}
```

**4. 生成文件签名**

```shell
shasum -a 512 apache-shenyu-incubating-${RELEASE.VERSION}-src.zip > apache-shenyu-incubating-${RELEASE.VERSION}-src.zip.sha512
shasum -b -a 512 apache-shenyu-incubating-${RELEASE.VERSION}-bootstrap-bin.tar.gz > apache-shenyu-incubating-${RELEASE.VERSION}-bootstrap-bin.tar.gz.sha512
shasum -b -a 512 apache-shenyu-incubating-${RELEASE.VERSION}-admin-bin.tar.gz > apache-shenyu-incubating-${RELEASE.VERSION}-admin-bin.tar.gz.sha512
```

**5. 提交Apache SVN**

```shell
cd ~/shenyu_svn/dev/shenyu
svn add *
svn --username=${APACHE LDAP 用户名} commit -m "release ${RELEASE.VERSION}"
```

## 检查发布结果

**检查sha512哈希**

```shell
shasum -c apache-shenyu-incubating-${RELEASE.VERSION}-src.zip.sha512
shasum -c apache-shenyu-incubating-${RELEASE.VERSION}-bootstrap-bin.tar.gz.sha512
shasum -c apache-shenyu-incubating-${RELEASE.VERSION}-admin-bin.tar.gz.sha512
```

**检查gpg签名**

首先导入发布人公钥。从svn仓库导入KEYS到本地环境。（发布版本的人不需要再导入，帮助做验证的人需要导入，用户名填发版人的即可）

```shell
curl https://dist.apache.org/repos/dist/dev/incubator/shenyu/KEYS >> KEYS
gpg --import KEYS
gpg --edit-key "${发布人的gpg用户名}"
  > trust

Please decide how far you trust this user to correctly verify other users' keys
(by looking at passports, checking fingerprints from different sources, etc.)

  1 = I don't know or won't say
  2 = I do NOT trust
  3 = I trust marginally
  4 = I trust fully
  5 = I trust ultimately
  m = back to the main menu

Your decision? 5

  > save
```

然后进行gpg签名检查。

```shell
gpg --verify apache-shenyu-incubating-${RELEASE.VERSION}-src.zip.asc apache-shenyu-incubating-${RELEASE.VERSION}-src.zip
gpg --verify apache-shenyu-incubating-${RELEASE.VERSION}-bootstrap-bin.tar.gz.asc apache-shenyu-incubating-${RELEASE.VERSION}-bootstrap-bin.tar.gz
gpg --verify apache-shenyu-incubating-${RELEASE.VERSION}-admin-bin.tar.gz.asc apache-shenyu-incubating-${RELEASE.VERSION}-admin-bin.tar.gz
```

**检查发布文件内容**

**对比源码包与Github上tag的内容差异**

```
curl -Lo tag-${RELEASE.VERSION}.zip https://github.com/apache/incubator-shenyu/archive/v${RELEASE.VERSION}.zip
unzip tag-${RELEASE.VERSION}.zip
unzip apache-shenyu-incubating-${RELEASE.VERSION}-src.zip
diff -r -x "shenyu-dashboard" -x "shenyu-examples" -x "shenyu-integrated-test" -x "static" apache-shenyu-incubating-${RELEASE.VERSION}-src incubator-shenyu-${RELEASE.VERSION}
```

**检查源码包的文件内容**

- 检查源码包是否包含由于包含不必要文件，致使tarball过于庞大
- 文件夹包含单词`incubating`
- 存在`LICENSE`和`NOTICE`文件
- 存在`DISCLAIMER`文件
- `NOTICE`文件中的年份正确
- 只存在文本文件，不存在二进制文件
- 所有文件的开头都有ASF许可证
- 能够正确编译，单元测试可以通过 (./mvnw install) (目前支持JAVA 8)
- 检查是否有多余文件或文件夹，例如空文件夹等

**检查二进制包的文件内容**

解压缩
`apache-shenyu-incubating-${RELEASE.VERSION}-bootstrap-bin.tar.gz`，
`apache-shenyu-incubating-${RELEASE.VERSION}-admin-bin.tar.gz`
进行如下检查:

- 文件夹包含单词`incubating`
- 存在`LICENSE`和`NOTICE`文件
- 存在`DISCLAIMER`文件
- `NOTICE`文件中的年份正确
- 所有文本文件开头都有ASF许可证
- 检查第三方依赖许可证：
  - 第三方依赖的许可证兼容
  - 所有第三方依赖的许可证都在`LICENSE`文件中声名
  - 依赖许可证的完整版全部在`license`目录
  - 如果依赖的是Apache许可证并且存在`NOTICE`文件，那么这些`NOTICE`文件也需要加入到版本的`NOTICE`文件中

## 发起投票

**投票阶段**

1. ShenYu社区投票，发起投票邮件到`dev@shenyu.apache.org`。PPMC成员需要先按照文档检查版本的正确性，然后再进行投票。
经过至少72小时并统计到3个`+1 mentor`票后，即可进入下一阶段的投票。

2. 宣布投票结果，发起投票结果邮件到`dev@shenyu.apache.org`。

3. Incubator社区投票，发起投票邮件到`general@incubator.apache.org`。
经过至少72小时并统计到3个`+1 binding`票后，即可宣布投票结果。

4. 宣布投票结果，发起投票结果邮件到`general@incubator.apache.org`。

**投票模板**

1. ShenYu社区投票模板

标题：

```
[VOTE] Release Apache ShenYu (incubating) ${RELEASE.VERSION}
```

正文：

```
Hello ShenYu Community,

This is a call for vote to release Apache ShenYu (incubating) version ${RELEASE.VERSION}

Release notes:
https://github.com/apache/incubator-shenyu/blob/master/RELEASE-NOTES.md

The release candidates:
https://dist.apache.org/repos/dist/dev/incubator/shenyu/${RELEASE.VERSION}/

Maven 2 staging repository:
https://repository.apache.org/content/repositories/${STAGING.REPOSITORY}/org/apache/shenyu/

Git tag for the release:
https://github.com/apache/incubator-shenyu/tree/${RELEASE.VERSION}/

Release Commit ID:
https://github.com/apache/incubator-shenyu/commit/xxxxxxxxxxxxxxxxxxxxxxx

Keys to verify the Release Candidate:
https://dist.apache.org/repos/dist/dev/incubator/shenyu/KEYS

Look at here for how to verify this release candidate:
https://shenyu.apache.org/community/release/#check-release

GPG user ID:
${YOUR.GPG.USER.ID}

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

2. 宣布投票结果模板

标题：

```
[RESULT][VOTE] Release Apache ShenYu (incubating) ${RELEASE.VERSION}
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

Thank you everyone for taking the time to review the release and help us. 
```

3. Incubator社区投票模板

标题：

```
[VOTE] Release Apache ShenYu (incubating) ${RELEASE.VERSION}
```

正文：

```
Hello Incubator Community,

This is a call for vote to release Apache ShenYu (incubating) version ${RELEASE.VERSION}

The Apache ShenYu community has voted on and approved a proposal to release 
Apache ShenYu (incubating) version ${RELEASE.VERSION}.

We now kindly request the Incubator PMC members review and vote on this
incubator release.

ShenYu community vote thread:
https://lists.apache.org/thread.html/xxxxxxxxxxxxxxxxxxxxxxx

Vote result thread:
https://lists.apache.org/thread.html/xxxxxxxxxxxxxxxxxxxxxxx

Release notes:
https://github.com/apache/incubator-shenyu/blob/master/RELEASE-NOTES.md

The release candidates:
https://dist.apache.org/repos/dist/dev/incubator/shenyu/${RELEASE.VERSION}/

Maven 2 staging repository:
https://repository.apache.org/content/repositories/${STAGING.REPOSITORY}/org/apache/shenyu/

Git tag for the release:
https://github.com/apache/incubator-shenyu/tree/${RELEASE.VERSION}/

Release Commit ID:
https://github.com/apache/incubator-shenyu/commit/xxxxxxxxxxxxxxxxxxxxxxx

Keys to verify the Release Candidate:
https://dist.apache.org/repos/dist/dev/incubator/shenyu/KEYS

Look at here for how to verify this release candidate:
https://shenyu.apache.org/community/release/#check-release

GPG user ID:
${YOUR.GPG.USER.ID}

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

4. 宣布投票结果模板

标题：

```
[RESULT][VOTE] Release Apache ShenYu (incubating) ${RELEASE.VERSION}
```

正文：

```
Hi,

The vote to release Apache ShenYu (incubating) ${RELEASE.VERSION} has passed with
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
https://lists.apache.org/thread.html/xxxxxxxxxxxxxxxxxxxxxxx

Thanks a lot to everyone for taking your time to review our release candidate.
We will proceed with publishing the approved artifacts and sending out the
announcements in the coming days.
```

## 完成发布

**1. 将源码、二进制包以及KEYS从svn的dev目录移动到release目录**

```shell
svn mv https://dist.apache.org/repos/dist/dev/incubator/shenyu/${RELEASE.VERSION} https://dist.apache.org/repos/dist/release/incubator/shenyu/ -m "transfer packages for ${RELEASE.VERSION}"
svn delete https://dist.apache.org/repos/dist/release/incubator/shenyu/KEYS -m "delete KEYS"
svn cp https://dist.apache.org/repos/dist/dev/incubator/shenyu/KEYS https://dist.apache.org/repos/dist/release/incubator/shenyu/ -m "transfer KEYS for ${RELEASE.VERSION}"
```

**2. 在Apache Staging仓库找到ShenYu并点击`Release`**

**3. 合并Github的release分支到`master`, 合并完成后删除release分支**

```shell
git checkout master
git merge origin/${RELEASE.VERSION}-release
git pull
git push origin master
git push --delete origin ${RELEASE.VERSION}-release
git branch -d ${RELEASE.VERSION}-release
```

**4. 发布 Docker**

4.1 准备工作

本地安装 Docker，并启动服务。

4.2 编译 Docker 镜像

```shell
git checkout v${RELEASE.VERSION}
cd ~/shenyu/shenyu-dist/
mvn clean package -Prelease,docker
```

4.3 给本地 Docker 镜像打标记

通过`docker images`查看到 IMAGE ID，例如为：e9ea51023687和e9ea51023688

```shell
docker tag e9ea51023687 apache/shenyu-bootstrap:latest
docker tag e9ea51023687 apache/shenyu-bootstrap:${RELEASE.VERSION}
docker tag e9ea51023688 apache/shenyu-admin:latest
docker tag e9ea51023688 apache/shenyu-admin:${RELEASE.VERSION}
```

4.4 发布 Docker 镜像

```shell
docker login
docker push apache/shenyu-bootstrap:latest
docker push apache/shenyu-bootstrap:${RELEASE_VERSION}
docker push apache/shenyu-admin:latest
docker push apache/shenyu-admin:${RELEASE_VERSION}
```

4.5 确认发布成功

登录 Docker Hub 查看 [shenyu-bootstrap](https://hub.docker.com/r/apache/shenyu-bootstrap/) 和 [shenyu-admin](https://hub.docker.com/r/apache/shenyu-admin/) 是否有发布的镜像

**5. GitHub版本发布**

在 [GitHub Releases](https://github.com/apache/incubator-shenyu/releases) 页面的 `${RELEASE_VERSION}` 版本上点击 `Edit`

编辑版本号及版本说明，并点击 `Publish release`

**6. 更新下载页面**

等待并确认新的发布版本同步至 Apache 镜像后，更新如下页面：

https://shenyu.apache.org/projects/shenyu/download/

https://shenyu.apache.org/zh/projects/shenyu/download/

GPG签名文件和哈希校验文件的下载连接必须使用这个前缀：`https://downloads.apache.org/incubator/shenyu/`

**7. 邮件通知版本发布完成**

发送邮件到`general@incubator.apache.org`和`dev@shenyu.apache.org`通知完成版本发布

通知邮件模板：

标题：

```
[ANNOUNCE] Apache ShenYu (incubating) ${RELEASE.VERSION} available
```

正文：

```
Hi,

Apache ShenYu (incubating) Team is glad to announce the new release of Apache ShenYu (incubating) ${RELEASE.VERSION}.

Apache ShenYu (incubating) is an asynchronous, high-performance, cross-language, responsive API gateway.
Support various languages (http protocol), support Dubbo, Spring-Cloud, Grpc, Motan, Sofa, Tars and other protocols.
Plugin design idea, plugin hot swap, easy to expand.
Flexible flow filtering to meet various flow control.
Built-in rich plugin support, authentication, limiting, fuse, firewall, etc.
Dynamic flow configuration, high performance.
Support cluster deployment, A/B Test, blue-green release.

Download Links: https://shenyu.apache.org/projects/shenyu/download/

Release Notes: https://github.com/apache/incubator-shenyu/blob/master/RELEASE-NOTES.md

Website: https://shenyu.apache.org/

ShenYu Resources:
- Issue: https://github.com/apache/incubator-shenyu/issues
- Mailing list: dev@shenyu.apache.org
- Documents: https://shenyu.apache.org/projects/shenyu/overview/


- Apache ShenYu (incubating) Team

--

DISCLAIMER

Apache ShenYu (incubating) is an effort undergoing incubation at The Apache Software Foundation (ASF), sponsored by the Apache Incubator PMC.
Incubation is required of all newly accepted projects until a further review indicates that the infrastructure,
communications, and decision making process have stabilized in a manner consistent with other successful ASF projects.
While incubation status is not necessarily a reflection of the completeness or stability of the code,
it does indicate that the project has yet to be fully endorsed by the ASF.
```
