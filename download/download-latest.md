---
title: Download
sidebar_position: 0
keywords: ["Download"]
description: Download
---

## Latest Releases

`Apache ShenYu (incubating)` is released as source code tarballs with corresponding binary tarballs for convenience.

The downloads are distributed via mirror sites and should be checked for tampering using GPG or SHA-512.

##### `Apache ShenYu (incubating) - Version: 2.4.1 (Release Date: Oct 25, 2021)`

- Source Codes [[zip]](https://www.apache.org/dyn/closer.lua/incubator/shenyu/2.4.1/apache-shenyu-incubating-2.4.1-src.zip) [[asc]](https://downloads.apache.org/incubator/shenyu/2.4.1/apache-shenyu-incubating-2.4.1-src.zip.asc) [[sha512]](https://downloads.apache.org/incubator/shenyu/2.4.1/apache-shenyu-incubating-2.4.1-src.zip.sha512)

- ShenYu-Admin Binary Distribution [[tar]](https://www.apache.org/dyn/closer.lua/incubator/shenyu/2.4.1/apache-shenyu-incubating-2.4.1-admin-bin.tar.gz) [[asc]](https://downloads.apache.org/incubator/shenyu/2.4.1/apache-shenyu-incubating-2.4.1-admin-bin.tar.gz.asc) [[sha512]](https://downloads.apache.org/incubator/shenyu/2.4.1/apache-shenyu-incubating-2.4.1-admin-bin.tar.gz.sha512)

- ShenYu-Bootstrap Binary Distribution [[tar]](https://www.apache.org/dyn/closer.lua/incubator/shenyu/2.4.1/apache-shenyu-incubating-2.4.1-bootstrap-bin.tar.gz) [[asc]](https://downloads.apache.org/incubator/shenyu/2.4.1/apache-shenyu-incubating-2.4.1-bootstrap-bin.tar.gz.asc) [[sha512]](https://downloads.apache.org/incubator/shenyu/2.4.1/apache-shenyu-incubating-2.4.1-bootstrap-bin.tar.gz.sha512)

## All Releases

Find all releases in the [Archive repository](https://archive.apache.org/dist/incubator/shenyu/).

## Verify the Releases

[PGP signatures KEYS](https://downloads.apache.org/incubator/shenyu/KEYS)

It is essential that you verify the integrity of the downloaded files using the PGP or SHA signatures.
The PGP signatures can be verified using GPG or PGP.
Please download the KEYS as well as the asc signature files for relevant distribution.
It is recommended to get these files from the main distribution directory and not from the mirrors.

```shell
gpg --import KEYS
```

or

```shell
pgpk -a KEYS
```

or

```shell
pgp -ka KEYS
```

To verify the binaries/sources you can download the relevant asc files for it from main distribution directory and follow the below guide.

```shell
gpg --verify apache-shenyu-********.asc apache-shenyu-*********
```

or

```shell
pgpv apache-shenyu-********.asc
```

or

```shell
pgp apache-shenyu-********.asc
```

## PDF

`Apache ShenYu (incubating)` provides a packaged and downloaded `PDF` of the docs for users and developers to use.

* [English](/pdf/apache_shenyu_docs_en.pdf)

