---
title: 签署ICLA指南
sidebar_position: 4
description: 签署ICLA指南
author: "xiaoyu"
categories: "Apache ShenYu"
tags: ["ICLA"]
date: 2021-05-18
cover: "/img/architecture/shenyu-framework.png"
---

## Apache ICLA 签署流程指南

Apache CLA 全称 Apache Contributor License Agreement，签署 ICLA 的目的是定义向 ASF 贡献的文档，保护知识产权，避免后续法律纠纷。ICLA 在官方存档后生效，贡献者方可参与 Apache 项目。

如果你已签署过 ICLA，无需发送电子邮件。因为你们已经用自己的公开姓名提交了 ICLA，不需要重复提交了。如果从未签署过 ICLA，请在邮件中注明, PMC 可以直接申请此账户。

当我们需要签署 ICLA 时步骤如下:

**1. 打开链接 [官网 Licenses](https://www.apache.org/licenses/#clas) 在 Contributor License Agreements 下找到 CLAs 并进入页面。**

![](/img/shenyu/icla/page_link_v2.0.png)

**2. 在页面上方我们可以看到两个下载链接，选择 ICLA(个人 CLA)并下载文件。**

![](/img/shenyu/icla/download_v2.0.png)

**3. 打开 PDF，ICLA 需要填写的是两个部分，均需要全英文填写。**

> 注意事项:
>
> - 务必勾选 check this box only if you entered names with your family name first。
> - 姓名需要填写拼音，姓与名之间空一格，首字母均为大写，名在前姓氏在后，这不是一个 ID。
> - 接收邮件的完整地址,不能是工作室或者公司的邮件地址。
> - 如果使用 gpg 签名,请确保公钥中的电子邮件与表格中的电子邮件一致。
> - Committer 相关的签署，则 preferred Apache id(s)是必填项。

![](/img/shenyu/icla/information_v2.0.png)

**4.文件最下方的署名。** 官网支持手写或者[PDF 签名软件](https://pdf.yozocloud.cn/p/pdfaddsign)

![](/img/shenyu/icla/sign_v2.0.png)

**5.签署完之后将 icla.pdf 命令为 `姓名拼音-icla.pdf` 并电子邮件发送到 `secretary@apache.org` 同时抄送到 `private@shenyu.apache.org`地址。注:不要复制其他人的签署单**。

**6.邮箱发送成功之后 Apache ShenYu 官方社区告知下**

## 手动签名和 PDF 软件签名 DEMO

> PDF 在线签名
>
> - 下载 PDF 源文件
> - 填写项目与个人信息
> - 打开 PDF 在线签署网址
> - 进入签名
> - 保存下载已签名 pdf
> - 发送到指定邮箱
> - 更新石墨[icla 签署状态文档](https://shimo.im/sheets/rPqtJcWPDPV9wWPd/MODOC/ 《icla 签署状态表》，可复制链接后用石墨文档 App 或小程序打开)

![](/img/shenyu/icla/example_v2.0.png)

![](/img/shenyu/icla/pls_sign_v2.0.png)

> 手写签名
>
> - 下载 PDF 源文件
> - 填写项目与个人信息 n
> - 打印文件
> - 手写签名
> - 拍照转成**单个 pdf** 文件
> - 发送到指定邮箱
> - 更新石墨[icla 签署状态文档](https://shimo.im/sheets/rPqtJcWPDPV9wWPd/MODOC/ 《icla 签署状态表》，可复制链接后用石墨文档 App 或小程序打开)

![](/img/shenyu/icla/example_v2.0.png)

![](/img/shenyu/icla/pls_sign_v2.0.png)

## 邮件发送模板

![](/img/shenyu/icla/email_v2.0.png)
![](/img/shenyu/icla/email_template.png)

收件人

```
secretary@apache.org
```

模板

```
Hello Apache,
    I am willing donate the ShenYu project to ASF. The attachment is my ICLA information. Github account: https://github.com/xxxx.
Thanks !
```
