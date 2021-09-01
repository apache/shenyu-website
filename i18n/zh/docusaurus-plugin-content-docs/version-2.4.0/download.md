---
title: 下载
keywords: ["下载"]
description: 下载
---

## 最新版本

`Apache ShenYu (incubating)` 的发布版包括源码包及其对应的二进制包。

由于下载内容分布在镜像服务器上，所以下载后应该进行 GPG 或 SHA-512 校验，以此来保证内容没有被篡改。

##### `Apache ShenYu (incubating) - 版本: 2.4.0 (发布日期: Aug 8, 2021)`

- 源码 [[zip]](https://www.apache.org/dyn/closer.cgi/incubator/shenyu/2.4.0/apache-shenyu-incubating-2.4.0-src.zip) [[asc]](https://downloads.apache.org/incubator/shenyu/2.4.0/apache-shenyu-incubating-2.4.0-src.zip.asc) [[sha512]](https://downloads.apache.org/incubator/shenyu/2.4.0/apache-shenyu-incubating-2.4.0-src.zip.sha512)

- ShenYu-Admin 二进制包 [[tar]](https://www.apache.org/dyn/closer.cgi/incubator/shenyu/2.4.0/apache-shenyu-incubating-2.4.0-admin-bin.tar.gz) [[asc]](https://downloads.apache.org/incubator/shenyu/2.4.0/apache-shenyu-incubating-2.4.0-admin-bin.tar.gz.asc) [[sha512]](https://downloads.apache.org/incubator/shenyu/2.4.0/apache-shenyu-incubating-2.4.0-admin-bin.tar.gz.sha512)

- ShenYu-Bootstrap 二进制包 [[tar]](https://www.apache.org/dyn/closer.cgi/incubator/shenyu/2.4.0/apache-shenyu-incubating-2.4.0-bootstrap-bin.tar.gz) [[asc]](https://downloads.apache.org/incubator/shenyu/2.4.0/apache-shenyu-incubating-2.4.0-bootstrap-bin.tar.gz.asc) [[sha512]](https://downloads.apache.org/incubator/shenyu/2.4.0/apache-shenyu-incubating-2.4.0-bootstrap-bin.tar.gz.sha512)

## 校验版本

[PGP签名文件](https://downloads.apache.org/incubator/shenyu/KEYS)

使用 PGP 或 SHA 签名验证下载文件的完整性至关重要。
可以使用 GPG 或 PGP 验证 PGP 签名。
请下载 KEYS 以及发布的 asc 签名文件。
建议从主发布目录而不是镜像中获取这些文件。

```shell
gpg -i KEYS
```

或者

```shell
pgpk -a KEYS
```

或者

```shell
pgp -ka KEYS
```

要验证二进制文件或源代码，您可以从主发布目录下载相关的 asc 文件，并按照以下指南进行操作。

```shell
gpg --verify apache-shenyu-********.asc apache-shenyu-*********
```

或者

```shell
pgpv apache-shenyu-********.asc
```

或者

```shell
pgp apache-shenyu-********.asc
```

## PDF

`Apache ShenYu` 提供了打包下载的文档 `PDF` ，供使用者、开发者查阅。

* [中文](/pdf/apache_shenyu_docs_zh.pdf)

* [English](/pdf/apache_shenyu_docs_en.pdf)

---

title: Download
keywords: ["Download"]
description: Download
---

## Latest Releases

`Apache ShenYu (incubating)` is released as source code tarballs with corresponding binary tarballs for convenience.

The downloads are distributed via mirror sites and should be checked for tampering using GPG or SHA-512.

##### `Apache ShenYu (incubating) - Version: 2.4.0 (Release Date: Aug 8, 2021)`

- Source Codes [[zip]](https://www.apache.org/dyn/closer.cgi/incubator/shenyu/2.4.0/apache-shenyu-incubating-2.4.0-src.zip) [[asc]](https://downloads.apache.org/incubator/shenyu/2.4.0/apache-shenyu-incubating-2.4.0-src.zip.asc) [[sha512]](https://downloads.apache.org/incubator/shenyu/2.4.0/apache-shenyu-incubating-2.4.0-src.zip.sha512)

- ShenYu-Admin Binary Distribution [[tar]](https://www.apache.org/dyn/closer.cgi/incubator/shenyu/2.4.0/apache-shenyu-incubating-2.4.0-admin-bin.tar.gz) [[asc]](https://downloads.apache.org/incubator/shenyu/2.4.0/apache-shenyu-incubating-2.4.0-admin-bin.tar.gz.asc) [[sha512]](https://downloads.apache.org/incubator/shenyu/2.4.0/apache-shenyu-incubating-2.4.0-admin-bin.tar.gz.sha512)

- ShenYu-Bootstrap Binary Distribution [[tar]](https://www.apache.org/dyn/closer.cgi/incubator/shenyu/2.4.0/apache-shenyu-incubating-2.4.0-bootstrap-bin.tar.gz) [[asc]](https://downloads.apache.org/incubator/shenyu/2.4.0/apache-shenyu-incubating-2.4.0-bootstrap-bin.tar.gz.asc) [[sha512]](https://downloads.apache.org/incubator/shenyu/2.4.0/apache-shenyu-incubating-2.4.0-bootstrap-bin.tar.gz.sha512)

## Verify the Releases

[PGP signatures KEYS](https://downloads.apache.org/incubator/shenyu/KEYS)

It is essential that you verify the integrity of the downloaded files using the PGP or SHA signatures.
The PGP signatures can be verified using GPG or PGP.
Please download the KEYS as well as the asc signature files for relevant distribution.
It is recommended to get these files from the main distribution directory and not from the mirrors.

```shell
gpg -i KEYS
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

