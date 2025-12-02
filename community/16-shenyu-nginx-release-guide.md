---
title: ShenYu nginx Release Guide
sidebar_position: 16
description: Apache ShenYu-nginx Release Guide
cover: "/img/architecture/shenyu-framework.png"
---

## Update release notes

Update [RELEASE-NOTES](https://github.com/apache/shenyu-nginx/blob/main/RELEASE-NOTES.md) in the following format:

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

## Create GPG KEY

> Each release manager only creates a GPG KEY for the first release, which can be reused for subsequent releases.

**1. Create KEY**

Install [GnuPG](https://www.gnupg.org/download/index.html).

Follow [OpenPGP KEY Management](https://www.gnupg.org/documentation/manuals/gnupg/OpenPGP-Key-Management.html#OpenPGP-Key-Management) [1] instructions.

```shell
gpg --full-gen-key
```

Steps (the following are from console output).

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

Real name: （Set username） (use your apache id)
Email address: （Set email address）(use your apache email)
Comment: （Fill in the comments）
You selected this USER-ID:
   "username (comments) <email>"

Change (N)ame, (C)omment, (E)mail or (O)kay/(Q)uit? O
You need a Passphrase to protect your secret key. （Set password）
```

**2. Verify KEY**

Follow [Operational GPG Commands](https://www.gnupg.org/documentation/manuals/gnupg/Operational-GPG-Commands.html#Operational-GPG-Commands) [2] instructions.

```shell
gpg --list-keys
```

Output：

```shell
pub   rsa4096 2019-03-11 [SC]
      095E0D21BC28CFC7A8B8076DF7DF28D237A8048C
uid           username (comments) <email>
sub   rsa4096 2019-03-11 [E]
```

Public key is `095E0D21BC28CFC7A8B8076DF7DF28D237A8048C`.

**3. Upload public key**

Follow [Dirmngr Options](https://www.gnupg.org/documentation/manuals/gnupg/Dirmngr-Options.html#Dirmngr-Options) [3] instructions.

```shell
gpg --send-key 095E0D21BC28CFC7A8B8076DF7DF28D237A8048C
```

## Before Release

**1. Publish a new tag**

Download and install [Git](https://git-scm.com/downloads).

Create a new tag called `${PUBLISH.VERSION}`.

```shell
git clone https://github.com/apache/shenyu-nginx.git ~/shenyu-nginx
cd ~/shenyu-nginx/
git checkout main
git tag -a ${PUBLISH.VERSION} -m "${PUBLISH.VERSION} release shenyu nginx"
```

Push new created tag to github.

```shell
git push origin ${PUBLISH.VERSION}
```

## Publish to SVN dev repository

Install [SVN](https://tortoisesvn.net/downloads.html).

**1. Update KEYS file**

> If the release manager has not yet appended his or her public key to the KEYS file, do the following. Otherwise, skip this step.

Follow [signing basics](https://infra.apache.org/release-signing.html#signing-basics) [5] instructions.

```shell
mkdir -p ~/keys/release/
cd ~/keys/release/
svn --username=${LDAP ID} co https://dist.apache.org/repos/dist/release/shenyu
cd ~/keys/release/shenyu
gpg -a --export ${GPG username} >> KEYS
svn --username=${LDAP ID} commit -m "append to KEYS"
```

**2. Adding source code packages**

Follow [Uploading packages](https://infra.apache.org/release-publishing.html#uploading) [6] instructions.

```shell
# create release folder and check out svn dev repo
mkdir -p ~/svn_release/dev/
cd ~/svn_release/dev/
svn --username=${LDAP ID} co https://dist.apache.org/repos/dist/dev/shenyu
mkdir -p ~/svn_release/dev/shenyu/shenyu-nginx/${PUBLISH.VERSION}

# generate source file
git archive --format=tar --prefix=shenyu-nginx-${PUBLISH.VERSION}/ ${PUBLISH.VERSION} | gzip > shenyu-nginx-${PUBLISH.VERSION}-src.tar.gz

# generate sign file for each files
gpg -u <id>@apache.org --armor --output shenyu-nginx-${PUBLISH.VERSION}-src.tar.gz.asc --detach-sign shenyu-nginx-${PUBLISH.VERSION}-src.tar.gz

# copy source files and
cd ~/svn_release/dev/shenyu/shenyu-nginx/${PUBLISH.VERSION}
cp -f ~/shenyu/shenyu-nginx/shenyu-nginx-${PUBLISH.VERSION}-src.tar.gz ~/svn_release/dev/shenyu/shenyu-nginx/${PUBLISH.VERSION}
cp -f ~/shenyu/shenyu-nginx/shenyu-nginx-${PUBLISH.VERSION}-src.tar.gz.asc ~/svn_release/dev/shenyu/shenyu-nginx/${PUBLISH.VERSION}
```

**3. Adding hashes**

Follow [Requirements for cryptographic signatures and checksums](https://infra.apache.org/release-distribution#sigs-and-sums) [7] instructions.

```shell
# go to release folder
cd ~/svn_release/dev/shenyu/shenyu-nginx/${PUBLISH.VERSION}
shasum -a 512 shenyu-nginx-${PUBLISH.VERSION}-src.tar.gz > shenyu-nginx-${PUBLISH.VERSION}-src.tar.gz.sha512
```

**4. Submit the new release**

```shell
cd ~/svn_release/dev/shenyu/shenyu-nginx
svn add ${PUBLISH.VERSION}/
svn --username=${LDAP ID} commit -m "release apache shenyu nginx ${PUBLISH.VERSION}"
```

## Check Release

**1. Verify sha512 checksum**

Follow [Checking Hashes](https://www.apache.org/info/verification.html#CheckingHashes) [8] instructions.

```shell
shasum -c shenyu-nginx-${PUBLISH.VERSION}-src.tar.gz.sha512
```

**2. Verifying GPG Signatures**

Follow [Checking Signatures](https://www.apache.org/info/verification.html#CheckingSignatures) [9] instructions.

```shell
curl https://downloads.apache.org/shenyu/KEYS >> KEYS
gpg --import KEYS
gpg --verify shenyu-nginx-${PUBLISH.VERSION}-src.tar.gz.asc shenyu-nginx-${PUBLISH.VERSION}-src.tar.gz
```

**3. Ensure that SVN is consistent with GitHub source code**

Follow [Incubator Release Checklist](https://cwiki.apache.org/confluence/display/INCUBATOR/Incubator+Release+Checklist) [10] instructions.

```
wget https://github.com/apache/shenyu-nginx/archive/${PUBLISH.VERSION}.zip
unzip ${PUBLISH.VERSION}.zip
mvn shenyu-nginx-${PUBLISH.VERSION} shenyu-nginx-${PUBLISH.VERSION}-src 
tar xzf shenyu-nginx-${PUBLISH.VERSION}-src.tar.gz
diff -r shenyu-nginx-${PUBLISH.VERSION}-src shenyu-nginx-${PUBLISH.VERSION}
```

**4. Check the source code package**

Follow [Incubator Release Checklist](https://cwiki.apache.org/confluence/display/INCUBATOR/Incubator+Release+Checklist) [10] instructions.

- `LICENSE` and `NOTICE` files exist
- The year in the `NOTICE` file is correct
- All files have ASF licenses at the beginning
- There are no `LICENSE` and `NOTICE` that do not depend on the software
- There are no binaries that do not meet expectations
- Compilation passes (luarocks make rockspec/shenyu-nginx-$\{PUBLISH.VERSION}.rockspec)
- If third-party code dependencies exist.
  - Third-party code dependent licenses are compatible

**5. Check the binary package**

Follow [Binary distributions](https://infra.apache.org/licensing-howto.html#binary) [11] instructions.

- `LICENSE` and `NOTICE` files exist
- The year in the `NOTICE` file is correct
- All text files start with an ASF license
- No `LICENSE` and `NOTICE` for undependent software
- If third-party code dependencies exist.
  - Third-party code dependent licenses are compatible
 
## Voting Process

Follow [RELEASE APPROVAL](https://www.apache.org/legal/release-policy.html#release-approval) [12], [Releases](https://incubator.apache.org/policy/incubation.html#Releases) [13], [voting](https://www.apache.org/foundation/voting.html) [14] instructions.

### ShenYu community vote

**1. Voting lasts for at least 72 hours and receives 3 `+1 binding` votes**

To:

```
dev@shenyu.apache.org
```

Title:

```
[VOTE] Release Apache ShenYu Nginx ${PUBLISH.VERSION}
```

Content:

```
Hello ShenYu Community,

This is a call for vote to release Apache ShenYu Nginx version ${PUBLISH.VERSION}.

Release notes:
https://github.com/apache/shenyu-nginx/blob/main/RELEASE-NOTES.md

The release candidates:
https://dist.apache.org/repos/dist/dev/shenyu/shenyu-nginx/${PUBLISH.VERSION}/

Git tag for the release:
https://github.com/apache/shenyu-nginx/tree/${PUBLISH.VERSION}

Release Commit ID:
https://github.com/apache/shenyu-nginx/commit/xxxxxxxxx


Keys to verify the Release Candidate:
https://downloads.apache.org/shenyu/KEYS

Look at here for how to verify this release candidate:
https://shenyu.apache.org/community/shenyu-nginx-release-guide/#check-release

The vote will be open for at least 72 hours or until necessary number of votes are reached.

Please vote accordingly:

[ ] +1 approve

[ ] +0 no opinion

[ ] -1 disapprove with the reason

Checklist for reference:

[ ] Download links are valid.

[ ] Checksums and PGP signatures are valid.

[ ] Source code distributions have correct names matching the current release.

[ ] LICENSE and NOTICE files are correct for each ShenYu Nginx repo.

[ ] All files have license headers if necessary.

[ ] No compiled archives bundled in source archive.
```

**2. Announcement of voting results**

To:

```
dev@shenyu.apache.org
```

Title:

```
[RESULT][VOTE] Release Apache ShenYu Nginx ${PUBLISH.VERSION}
```

Content:

```
We’ve received 3 +1 binding votes and 2 +1 non-binding votes:

+1, xxx (binding)
+1, xxx (binding)
+1, xxx (binding)
+1, xxx (non-binding)
+1, xxx (non-binding)

Vote thread:
https://lists.apache.org/thread/xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

Thanks everyone for taking the time to verify and vote for the release!
```

---

## Finish publishing

**1. Finish SVN release**

Follow [Uploading packages](https://infra.apache.org/release-publishing.html#uploading) [6] instructions.

```shell
svn mv https://dist.apache.org/repos/dist/dev/shenyu/shenyu-nginx/${PUBLISH.VERSION} https://dist.apache.org/repos/dist/release/shenyu/shenyu-nginx -m "transfer packages for ${PUBLISH.VERSION}"
svn delete https://dist.apache.org/repos/dist/release/shenyu/shenyu-nginx/${PREVIOUS.RELEASE.VERSION}
``` 

**2. Finish GitHub release**

Edit [Releases](https://github.com/apache/shenyu-nginx/releases) `${PUBLISH.VERSION}` and click release.

**3. Update download page**

Follow [Release Download Pages for Projects](https://infra.apache.org/release-download-pages.html) [15], [Normal distribution on the Apache downloads site](https://infra.apache.org/release-publishing.html#normal) [16] instructions.

After the Apache mirror links take effect (at least one hour), update the download page for:
[English version](https://shenyu.apache.org/download/) and
[Chinese version](https://shenyu.apache.org/zh/download/)

> Note: Project download links should use https://www.apache.org/dyn/closer.lua instead of closer.cgi or mirrors.cgi
>
> Note: Download links for GPG signature files and hash-check files must use this prefix: `https://downloads.apache.org/shenyu/`

**4. Update documentation**

Archive the `${PUBLISH.VERSION}` version of the [document](https://github.com/apache/shenyu-website) and update the [version page](https://shenyu.apache.org/versions/).

**5. Update event page**

Add new release [event](https://shenyu.apache.org/event/${PUBLISH.VERSION}-release).

**6. Update news page**

Add new release [news](https://shenyu.apache.org/zh/news).

## Release Announcement

> Note: `announce@apache.org` address requires the email to be sent in plain text format. If you are using Gmail, you can check `Plain Text Mode` in the edit screen.

To:

```
dev@shenyu.apache.org
announce@apache.org
```

Title:

```
[ANNOUNCE] Apache ShenYu Nginx ${PUBLISH.VERSION} available
```

Content:

```
Hi,

Apache ShenYu Team is glad to announce the new release of Apache ShenYu Nginx ${PUBLISH.VERSION}.

Apache ShenYu is an asynchronous, high-performance, cross-language, responsive API gateway.
Support various languages (http protocol), support Dubbo, Spring-Cloud, Grpc, Motan, Sofa, Tars and other protocols.
Plugin design idea, plugin hot swap, easy to expand.
Flexible flow filtering to meet various flow control.
Built-in rich plugin support, authentication, limiting, fuse, firewall, etc.
Dynamic flow configuration, high performance.
Support cluster deployment, A/B Test, blue-green release.

Download Links: https://shenyu.apache.org/download/

Release Notes: https://github.com/apache/shenyu-nginx/blob/main/RELEASE-NOTES.md

Website: https://shenyu.apache.org/

ShenYu Resources:
- Issue: https://github.com/apache/shenyu/issues
- Mailing list: dev@shenyu.apache.org
- Documents: https://shenyu.apache.org/docs/index/


- Apache ShenYu Team

```

## Reissue (not required)

> Note: You only need to republish if the vote did not pass.

**1. Cancellation of voting email template**

To:

```
dev@shenyu.apache.org
```

Title:

```
[CANCEL][VOTE] Release Apache ShenYu Nginx ${PUBLISH.VERSION}
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

**2. Clean stagingRepositories**

Go to https://repository.apache.org/#stagingRepositories, After logging in with your Apache LDAP account, select the previous `Close` version and click `Drop`.

**3。Deleting GitHub branches and tags**

```shell
git push origin --delete ${PUBLISH.VERSION}-release
git branch -D ${PUBLISH.VERSION}-release
git push origin --delete tag v${PUBLISH.VERSION}
git tag -d v${PUBLISH.VERSION}
```

**4. Deleting SVN content to be published**

```shell
svn delete https://dist.apache.org/repos/dist/dev/shenyu/shenyu-nginx/${PUBLISH.VERSION} -m "delete ${PUBLISH.VERSION}"
```

**5. Update email title**

After completing the above steps, you can start the re-posting operation. The next poll email title needs to have the `[ROUND ${n}]` suffix added. For example.

```
[VOTE] Release Apache ShenYu Nginx ${PUBLISH.VERSION} [ROUND 2]
```

Voting result and announcement emails do not need to be suffixed.

**The content refers to**

- [1] https://www.gnupg.org/documentation/manuals/gnupg/OpenPGP-Key-Management.html#OpenPGP-Key-Management
- [2] https://www.gnupg.org/documentation/manuals/gnupg/Operational-GPG-Commands.html#Operational-GPG-Commands
- [3] https://www.gnupg.org/documentation/manuals/gnupg/Dirmngr-Options.html#Dirmngr-Options
- [4] https://infra.apache.org/publishing-maven-artifacts.html
- [5] https://infra.apache.org/release-signing.html#signing-basics
- [6] https://infra.apache.org/release-publishing.html#uploading
- [7] https://infra.apache.org/release-distribution#sigs-and-sums
- [8] https://www.apache.org/info/verification.html#CheckingHashes
- [9] https://www.apache.org/info/verification.html#CheckingSignatures
- [10] https://cwiki.apache.org/confluence/display/INCUBATOR/Incubator+Release+Checklist
- [11] https://infra.apache.org/licensing-howto.html#binary
- [12] https://www.apache.org/legal/release-policy.html#release-approval
- [13] https://incubator.apache.org/policy/incubation.html#Releases
- [14] https://www.apache.org/foundation/voting.html
- [15] https://infra.apache.org/release-download-pages.html
- [16] https://infra.apache.org/release-publishing.html#normal
