---
title: ShenYu Release Guide
description: ShenYu Release Guide
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

Suppose ShenYu source codes downloaded from github is under `~/shenyu/` directory and the version to be released is `${RELEASE.VERSION}`. 
Create `${RELEASE.VERSION}-release` branch, where all the following operations are performed.

```shell
# ${name} is the properly branch, e.g. master, main
git clone --branch ${name} https://github.com/apache/incubator-shenyu.git ~/shenyu
cd ~/shenyu/
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

**1. Checkout ShenYu Release Directory**

If there is no local work directory, create one at first.

```shell
mkdir -p ~/shenyu_svn/dev/
cd ~/shenyu_svn/dev/
```

After the creation, checkout ShenYu release directory from Apache SVN.

```shell
svn --username=${APACHE LDAP 用户名} co https://dist.apache.org/repos/dist/dev/incubator/shenyu
cd ~/shenyu_svn/dev/shenyu
```

**2. Add gpg Public Key**

Only the account in its first deployment needs to add that. 
It is alright for `KEYS` to only include the public key of the deployed account.

```shell
gpg -a --export ${GPG username} >> KEYS
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
svn add *
svn --username=${APACHE LDAP 用户名} commit -m "release ${RELEASE.VERSION}"
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
curl https://dist.apache.org/repos/dist/dev/incubator/shenyu/KEYS >> KEYS
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

*   Check whether source tarball is oversized for including nonessential files
*   The release files have the word `incubating` in their names
*   `LICENSE` and `NOTICE` files exist
*   `DISCLAIMER` file exists
*   Correct year in `NOTICE` file
*   There is only text files but no binary files
*   All source files have ASF headers
*   Codes can be compiled and pass the unit tests (./mvnw install) (compatible with JAVA 8 for now)
*   Check if there is any extra files or folders, empty folders for example

**Check binary packages**

Decompress
`apache-shenyu-incubating-${RELEASE.VERSION}-bootstrap-bin.tar.gz`，
`apache-shenyu-incubating-${RELEASE.VERSION}-admin-bin.tar.gz`
to check the following items:

*   The release files have the word `incubating` in their name
*   `LICENSE` and `NOTICE` files exist
*   `DISCLAIMER` file exists
*   Correct year in `NOTICE` file
*   All text files have ASF headers
*   Check the third party dependency license:
    *   The software has a compatible license
    *   All software licenses mentioned in `LICENSE`
    *   All the third party dependency licenses are under `licenses` folder
    *   If it depends on Apache license and has a `NOTICE` file, that `NOTICE` file need to be added to `NOTICE` file of the release

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

2. Announce the vote result

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

4. Announce the vote result

Title:

```
[RESULT][VOTE] Release Apache ShenYu (incubating) ${RELEASE.VERSION}
```

Body:

```
We’ve received 3 +1 binding and 5 + 1 non-binding votes, no +0 or -1 votes.

+1, xxx (+1 binding)
+1, xxx (+1 binding)
+1, xxx (+1 binding)
+1, xxx (+ 1 non-binding)
+1, xxx (+ 1 non-binding)
+1, xxx (+ 1 non-binding)
+1, xxx (+ 1 non-binding)
+1, xxx (+ 1 non-binding)

The voting thread is:
https://lists.apache.org/thread.html/xxxxxxxxxxxxxxxxxxxxxxx

Thank you everyone for taking the time to review the release and help us. 
I will process to publish the release and send ANNOUNCE.
```

## Finish the Release

**1. Move source packages, binary packages and KEYS from the `dev` directory to `release` directory**

```shell
svn mv https://dist.apache.org/repos/dist/dev/incubator/shenyu/${RELEASE.VERSION} https://dist.apache.org/repos/dist/release/incubator/shenyu/ -m "transfer packages for ${RELEASE.VERSION}"
svn delete https://dist.apache.org/repos/dist/release/incubator/shenyu/KEYS -m "delete KEYS"
svn cp https://dist.apache.org/repos/dist/dev/incubator/shenyu/KEYS https://dist.apache.org/repos/dist/release/incubator/shenyu/ -m "transfer KEYS for ${RELEASE.VERSION}"
```

**2. Find ShenYu in staging repository and click `Release`**

**3. Merge release branch to `master` and delete release branch on Github**

```shell
git checkout master
git merge origin/${RELEASE.VERSION}-release
git pull
git push origin master
git push --delete origin ${RELEASE.VERSION}-release
git branch -d ${RELEASE.VERSION}-release
```

**4. Update README files**

Update `${PREVIOUS.RELEASE.VERSION}` to `${RELEASE.VERSION}` in README.md and README_ZH.md

Update `${RELEASE.VERSION}` to `${NEXT.RELEASE.VERSION}` for `SERVER_VERSION` in `MySQLServerInfo.java`

**5. Docker Release**

5.1 Preparation

Install and start docker service

5.2 Compile Docker Image

```shell
git checkout ${RELEASE.VERSION}
cd ~/shenyu/shenyu-distribution/shenyu-bootstrap-distribution/
mvn clean package -Prelease,docker
```

5.3 Tag the local Docker Image

Check the image ID through `docker images`, for example: e9ea51023687

```shell
docker tag e9ea51023687 apache/shenyu-bootstrap:latest
docker tag e9ea51023687 apache/shenyu-bootstrap:${RELEASE.VERSION}
```

5.4 Publish Docker Image

```shell
docker login
docker push apache/shenyu-bootstrap:latest
docker push apache/shenyu-bootstrap:${RELEASE_VERSION}
```

5.5 Confirm the successful release

Login [Docker Hub](https://hub.docker.com/r/apache/shenyu-bootstrap/) to check whether there are published images

**6. Publish release in GitHub**

Click `Edit` in [GitHub Releases](https://github.com/apache/incubator/shenyu/releases)'s `${RELEASE_VERSION}` version

Edit version number and release notes, click `Publish release`

**7. Update the download page**

https://shenyu.apache.org/projects/shenyu/download/

https://shenyu.apache.org/zh/projects/shenyu/download/

GPG signatures and hashes (SHA* etc) should use URL start with `https://downloads.apache.org/incubator/shenyu/`

**8. Announce release completed by email**

Send e-mail to `general@incubator.apache.org` and `dev@shenyu.apache.org` to announce the release is complete

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
