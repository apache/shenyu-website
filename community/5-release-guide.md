---
title: Release Guide
sidebar_position: 6
description: Apache ShenYu Release Guide
cover: "/img/architecture/shenyu-framework.png"
---

## GPG Settings

**1. Install GPG**

Download installation package on [official GnuPG website](https://www.gnupg.org/download/index.html). 
The command of GnuPG 1.x version can differ a little from that of 2.x version. 
The following instructions take `GnuPG-2.1.23` version for example.
After the installation, execute the following command to check the version number.

```shell
gpg --version
```

**2. Create Key**

After the installation, execute the following command to create key.

This command indicates `GnuPG-2.x` can be used:

```shell
gpg --full-gen-key
```

This command indicates `GnuPG-1.x` can be used:

```shell
gpg --gen-key
```

Finish the key creation according to instructions:

> To be noticed: Please use Apache mail for key creation.

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

Real name: ${Input username}
Email address: ${Input email}
Comment: ${Input comment}
You selected this USER-ID:
   "${Inputed username} (${Inputed comment}) <${Inputed email}>"

Change (N)ame, (C)omment, (E)mail or (O)kay/(Q)uit? O
You need a Passphrase to protect your secret key. # Input passwords
```

**3. Check Generated Key**

```shell
gpg --list-keys
```

Execution Result:

```shell
pub   4096R/700E6065 2019-03-20
uid                  ${Username} (${Comment}) <{Email}>
sub   4096R/0B7EF5B2 2019-03-20
```

700E6065 is public key ID.

**4. Upload the Public Key to Key Server**

The command is as follows:

```shell
gpg --keyserver hkp://pool.sks-keyservers.net --send-key 700E6065
```

`pool.sks-keyservers.net` is randomly chosen from [public key server](https://sks-keyservers.net/status/). 
Each server will automatically synchronize with one another, so it would be okay to choose any one.

## Apache Maven Central Repository Release

**1. Set settings.xml**

Add the following template to `~/.m2/settings.xml`, all the passwords need to be filled in after encryption. 
For encryption settings, please see [here](http://maven.apache.org/guides/mini/guide-encryption.html).

```xml
<settings>
    <servers>
      <server>
          <id>apache.snapshots.https</id>
          <username> <!-- APACHE LDAP username --> </username>
          <password> <!-- APACHE LDAP encrypted password --> </password>
      </server>
      <server>
          <id>apache.releases.https</id>
          <username> <!-- APACHE LDAP username --> </username>
          <password> <!-- APACHE LDAP encrypted password --> </password>
      </server>
    </servers>
</settings>
```

**2. Update Release Notes**

Update the following file in master branch, and submit a PR to master branch:

```
https://github.com/apache/incubator-shenyu/blob/master/RELEASE-NOTES.md
```

**3. Create Release Branch**

Download and install [Git](https://git-scm.com/downloads)

Suppose ShenYu source codes downloaded from github is under `~/incubator-shenyu/` directory and the version to be released is `${RELEASE.VERSION}`. 
Create `${RELEASE.VERSION}-release` branch, where all the following operations are performed.

```shell
# ${name} is the properly branch, e.g. master, main
git clone --branch ${name} https://github.com/apache/incubator-shenyu.git ~/incubator-shenyu
cd ~/incubator-shenyu/
git pull
git checkout -b ${RELEASE.VERSION}-release
git push origin ${RELEASE.VERSION}-release
```

**4. Pre-Release Check**

```shell
mvn release:prepare -Prelease -Darguments="-DskipTests" -DautoVersionSubmodules=true -DdryRun=true -Dusername=${Github username}
```

-Prelease: choose release profile, which will pack all the source codes, jar files and executable binary packages.

-DautoVersionSubmodules=true: it can make the version number is inputted only once and not for each sub-module.

-DdryRun=true: rehearsal, which means not to generate or submit new version number and new tag.

**5. Prepare for the Release**

First, clean local pre-release check information.

```shell
mvn release:clean
```

```shell
mvn release:prepare -Prelease -Darguments="-DskipTests" -DautoVersionSubmodules=true -DpushChanges=false -Dusername=${Github username}
```

It is basically the same as the previous rehearsal command, but deleting -DdryRun=true parameter.

-DpushChanges=false: do not submit the edited version number and tag to Github automatically.

After making sure there is no mistake in local files, submit them to GitHub.

```shell
git push origin ${RELEASE.VERSION}-release
git push origin --tags
```

**6. Deploy the Release**

```shell
mvn release:perform -Prelease -Darguments="-DskipTests" -DautoVersionSubmodules=true -Dusername=${Github username}
```

After that command is executed, the version to be released will be uploaded to Apache staging repository automatically. 
Visit [https://repository.apache.org/#stagingRepositories](https://repository.apache.org/#stagingRepositories) and use Apache LDAP account to log in; then you can see the uploaded version, the content of `Repository` column is the ${STAGING.REPOSITORY}. 
Click `Close` to tell Nexus that the construction is finished, because only in this way, this version can be usable. 
If there is any problem in gpg signature, `Close` will fail, but you can see the failure information through `Activity`.

## Apache SVN Repository Release

Download and install [SVN](https://tortoisesvn.net/downloads.html)

**1. Add gpg Public Key**

Only the account in its first deployment needs to add that. 
It is alright for `KEYS` to only include the public key of the deployed account.

If there is no local work directory, create one at first.

```shell
mkdir -p ~/keys_svn/release/
cd ~/keys_svn/release/
```

After the creation, checkout ShenYu release directory from Apache SVN release directory.

```shell
svn --username=${APACHE LDAP username} co https://dist.apache.org/repos/dist/release/incubator/shenyu
cd ~/keys_svn/release/shenyu
```

Add new public key.

```shell
gpg -a --export ${GPG username} >> KEYS
```

Commit to SVN.

```shell
svn --username=${APACHE LDAP username} commit -m "append to KEYS"
```

**2. Checkout ShenYu Release Directory**

If there is no local work directory, create one at first.

```shell
mkdir -p ~/shenyu_svn/dev/
cd ~/shenyu_svn/dev/
```

After the creation, checkout ShenYu release directory from Apache SVN dev directory.

```shell
svn --username=${APACHE LDAP username} co https://dist.apache.org/repos/dist/dev/incubator/shenyu
cd ~/shenyu_svn/dev/shenyu
```

**3. Add the Release Content to SVN Directory**

Create folder by version number.

```shell
mkdir -p ~/shenyu_svn/dev/shenyu/${RELEASE.VERSION}
cd ~/shenyu_svn/dev/shenyu/${RELEASE.VERSION}
```

Add source code packages, binary packages and executable binary packages to SVN working directory.

```shell
cp -f ~/incubator-shenyu/shenyu-dist/shenyu-src-dist/target/*.zip ~/shenyu_svn/dev/shenyu/${RELEASE.VERSION}
cp -f ~/incubator-shenyu/shenyu-dist/shenyu-src-dist/target/*.zip.asc ~/shenyu_svn/dev/shenyu/${RELEASE.VERSION}
cp -f ~/incubator-shenyu/shenyu-dist/shenyu-bootstrap-dist/target/*.tar.gz ~/shenyu_svn/dev/shenyu/${RELEASE.VERSION}
cp -f ~/incubator-shenyu/shenyu-dist/shenyu-bootstrap-dist/target/*.tar.gz.asc ~/shenyu_svn/dev/shenyu/${RELEASE.VERSION}
cp -f ~/incubator-shenyu/shenyu-dist/shenyu-admin-dist/target/*.tar.gz ~/shenyu_svn/dev/shenyu/${RELEASE.VERSION}
cp -f ~/incubator-shenyu/shenyu-dist/shenyu-admin-dist/target/*.tar.gz.asc ~/shenyu_svn/dev/shenyu/${RELEASE.VERSION}
```

**4. Generate sign files**

```shell
shasum -a 512 apache-shenyu-incubating-${RELEASE.VERSION}-src.zip > apache-shenyu-incubating-${RELEASE.VERSION}-src.zip.sha512
shasum -b -a 512 apache-shenyu-incubating-${RELEASE.VERSION}-bootstrap-bin.tar.gz > apache-shenyu-incubating-${RELEASE.VERSION}-bootstrap-bin.tar.gz.sha512
shasum -b -a 512 apache-shenyu-incubating-${RELEASE.VERSION}-admin-bin.tar.gz > apache-shenyu-incubating-${RELEASE.VERSION}-admin-bin.tar.gz.sha512
```

**5. Commit to Apache SVN**

```shell
cd ~/shenyu_svn/dev/shenyu
svn add ${RELEASE.VERSION}/
svn --username=${APACHE LDAP username} commit -m "release ${RELEASE.VERSION}"
```

## Check Release

**Check sha512 hash**

```shell
shasum -c apache-shenyu-incubating-${RELEASE.VERSION}-src.zip.sha512
shasum -c apache-shenyu-incubating-${RELEASE.VERSION}-bootstrap-bin.tar.gz.sha512
shasum -c apache-shenyu-incubating-${RELEASE.VERSION}-admin-bin.tar.gz.sha512
```

**Check gpg Signature**

First, import releaser's public key. Import KEYS from SVN repository to local. (The releaser does not need to import again; the checking assistant needs to import it, with the user name filled as the releaser's. )

```shell
curl https://downloads.apache.org/incubator/shenyu/KEYS >> KEYS
gpg --import KEYS
gpg --edit-key "${GPG username of releaser}"
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

Then, check the gpg signature.

```shell
gpg --verify apache-shenyu-incubating-${RELEASE.VERSION}-src.zip.asc apache-shenyu-incubating-${RELEASE.VERSION}-src.zip
gpg --verify apache-shenyu-incubating-${RELEASE.VERSION}-bootstrap-bin.tar.gz.asc apache-shenyu-incubating-${RELEASE.VERSION}-bootstrap-bin.tar.gz
gpg --verify apache-shenyu-incubating-${RELEASE.VERSION}-admin-bin.tar.gz.asc apache-shenyu-incubating-${RELEASE.VERSION}-admin-bin.tar.gz
```

**Check Released Files**

**Compare release source with github tag**

```
curl -Lo tag-${RELEASE.VERSION}.zip https://github.com/apache/incubator-shenyu/archive/v${RELEASE.VERSION}.zip
unzip tag-${RELEASE.VERSION}.zip
unzip apache-shenyu-incubating-${RELEASE.VERSION}-src.zip
diff -r -x "shenyu-dashboard" -x "shenyu-examples" -x "shenyu-integrated-test" -x "static" apache-shenyu-incubating-${RELEASE.VERSION}-src incubator-shenyu-${RELEASE.VERSION}
```

**Check source package**

* Check whether source tarball is oversized for including nonessential files
* The release files have the word `incubating` in their names
* `LICENSE` and `NOTICE` files exist
* `DISCLAIMER` file exists
* Correct year in `NOTICE` file
* There is only text files but no binary files
* All source files have ASF headers
* Codes can be compiled and pass the unit tests (./mvnw install) (compatible with JAVA 8 for now)
* Check if there is any extra files or folders, empty folders for example

**Check binary packages**

Decompress
`apache-shenyu-incubating-${RELEASE.VERSION}-bootstrap-bin.tar.gz`，
`apache-shenyu-incubating-${RELEASE.VERSION}-admin-bin.tar.gz`
to check the following items:

* The release files have the word `incubating` in their name
* `LICENSE` and `NOTICE` files exist
* `DISCLAIMER` file exists
* Correct year in `NOTICE` file
* All text files have ASF headers
* Check the third party dependency license:
  * The software has a compatible license
  * All software licenses mentioned in `LICENSE`
  * All the third party dependency licenses are under `licenses` folder
  * If it depends on Apache license and has a `NOTICE` file, that `NOTICE` file need to be added to `NOTICE` file of the release

## Call for a Vote

**Vote procedure**

1. ShenYu community vote: send the vote e-mail to `dev@shenyu.apache.org`. 
PPMC needs to check the rightness of the version according to the document before they vote. 
After at least 72 hours and with at least 3 `+1 mentor` votes, it can come to the next stage of the vote.

2. Announce the vote result: send the result vote e-mail to `dev@shenyu.apache.org`.

3. Incubator community vote: send the vote e-mail to `general@incubator.apache.org`. 
After at least 72 hours and with at least 3 `+1 binding` votes, it can come to announce the vote.

4. Announce the vote result: send the result vote e-mail to `general@incubator.apache.org`.


**Vote Templates**

1. ShenYu Community Vote Template

To:

```
dev@shenyu.apache.org
```

Title:

```
[VOTE] Release Apache ShenYu (incubating) ${RELEASE.VERSION}
```

Body:

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
https://github.com/apache/incubator-shenyu/tree/v${RELEASE.VERSION}/

Release Commit ID:
https://github.com/apache/incubator-shenyu/commit/xxxxxxxxxxxxxxxxxxxxxxx

Keys to verify the Release Candidate:
https://downloads.apache.org/incubator/shenyu/KEYS

Look at here for how to verify this release candidate:
https://shenyu.apache.org/community/release-guide/#check-release

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

2. Announce the vote result

To:

```
dev@shenyu.apache.org
```

Title:

```
[RESULT][VOTE] Release Apache ShenYu (incubating) ${RELEASE.VERSION}
```

Body:

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

3. Incubator Community Vote Template

To:

```
general@incubator.apache.org
```

Title:

```
[VOTE] Release Apache ShenYu (incubating) ${RELEASE.VERSION}
```

Body:

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
https://github.com/apache/incubator-shenyu/tree/v${RELEASE.VERSION}/

Release Commit ID:
https://github.com/apache/incubator-shenyu/commit/xxxxxxxxxxxxxxxxxxxxxxx

Keys to verify the Release Candidate:
https://downloads.apache.org/incubator/shenyu/KEYS

Look at here for how to verify this release candidate:
https://shenyu.apache.org/community/release-guide/#check-release

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

4. Announce the vote result

To:

```
general@incubator.apache.org
```

Title:

```
[RESULT][VOTE] Release Apache ShenYu (incubating) ${RELEASE.VERSION}
```

Body:

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

## Finish the Release

**1. Move source packages and binary packages from the `dev` directory to `release` directory, and delete the previous version from the `release` directory**

```shell
svn mv https://dist.apache.org/repos/dist/dev/incubator/shenyu/${RELEASE.VERSION} https://dist.apache.org/repos/dist/release/incubator/shenyu/ -m "transfer packages for ${RELEASE.VERSION}"
svn delete https://dist.apache.org/repos/dist/release/incubator/shenyu/${PREVIOUS.RELEASE.VERSION}
```

**2. Find ShenYu in staging repository and click `Release`**

**3. Merge release branch to `master` and delete release branch on Github**

Fork a copy of the code from GitHub and execute the following command:

```shell
git checkout master
git merge origin/${RELEASE.VERSION}-release
git pull
git push origin master
```

Create a pull request with the above changes.

Execute the following command in the project's original repository:

```shell
git push --delete origin ${RELEASE.VERSION}-release
git branch -d ${RELEASE.VERSION}-release
```

**4. Docker Release**

4.1 Preparation

Install and start docker service

4.2 Compile Docker Image

```shell
git checkout v${RELEASE.VERSION}
cd ~/shenyu/shenyu-dist/
mvn clean package -Prelease,docker
```

4.3 Publish Docker Image

```shell
docker login
docker push apache/shenyu-bootstrap:latest
docker push apache/shenyu-bootstrap:${RELEASE_VERSION}
docker push apache/shenyu-admin:latest
docker push apache/shenyu-admin:${RELEASE_VERSION}
```

4.4 Confirm the successful release

Login Docker Hub to check whether there are published images in [shenyu-bootstrap](https://hub.docker.com/r/apache/shenyu-bootstrap/) and [shenyu-admin](https://hub.docker.com/r/apache/shenyu-admin/) 

**5. Publish release in GitHub**

Click `Edit` in [GitHub Releases](https://github.com/apache/incubator-shenyu/releases)'s `${RELEASE_VERSION}` version

Edit version number and release notes, click `Publish release`

**6. Update the download page**

https://shenyu.apache.org/download/

https://shenyu.apache.org/zh/download/

Download links should use https://www.apache.org/dyn/closer.lua not closer.cgi or mirrors.cgi

GPG signatures and hashes (SHA* etc) must use URL start with `https://downloads.apache.org/incubator/shenyu/`

**7. Announce release completed by email**

Send e-mail to `general@incubator.apache.org`, `dev@shenyu.apache.org` and `announce@apache.org` to announce the release is complete

Announcement e-mail template:

Title:

```
[ANNOUNCE] Apache ShenYu (incubating) ${RELEASE.VERSION} available
```

Body:

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

**8. 8. Re-releasing (not required)**

Note: Re-releasing is only required if the vote did not pass.

8.1. Cancellation vote Email Template

Initiate a vote cancel email at `dev@shenyu.apache.org` or `general@incubator.apache.org` as appropriate.

To:

```
dev@shenyu.apache.org
```

or

```
general@incubator.apache.org
```

Title:

```
[CANCEL][VOTE] Release Apache ShenYu (incubating) ${RELEASE.VERSION}
```

Content:

```
Hi,

I'm cancelling this vote because of xxxxxx issues. I'll fix them and start the round ${n} vote process.
The detail of the modifications are as follows:

1. xxxxxx
2. xxxxxx

Thanks a lot for all your help.
```

8.2 Drop the staging repository

Go to https://repository.apache.org/#stagingRepositories, log in with your Apache LDAP account, select the previous `Close` version and click `Drop`.

8.3 Delete GitHub branches and tags

```shell
git push origin --delete ${RELEASE.VERSION}-release
git branch -D ${RELEASE.VERSION}-release
git push origin --delete tag v${RELEASE.VERSION}
git tag -d v${RELEASE.VERSION}
```

8.4 Deleting SVN pending release content

```shell
svn delete https://dist.apache.org/repos/dist/dev/incubator/shenyu/${RELEASE.VERSION} -m "delete ${RELEASE.VERSION}"
```

8.5 Update the email title

After completing the above steps, you can start the release procedure. The next vote email title needs to have the `[ROUND ${n}]` suffix added. For example:

```
[VOTE] Release Apache ShenYu (incubating) ${RELEASE.VERSION} [ROUND 2]
```

Vote results and announce emails do not need this suffix.
