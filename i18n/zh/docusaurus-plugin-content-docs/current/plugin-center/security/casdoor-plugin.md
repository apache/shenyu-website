---
title: Casdoor
keywords: ["Casdoor"]
description: Casdoor插件
---

ShenYu 有Casdoor插件去使用Casdoor

## 第一步.部署Casdoor

首先，我们需要部署Casdoor.

我们可以参考Casdoor官方文档去部署它.

在成功部署之后,我们需要确保:

* Casdoor服务成功在 **http://localhost:8000**上运行

* 打开你喜爱的浏览器浏览 **http://localhost:7001**,你可以看到Casdoor的登陆页面

* 输入`admin`和`123`去测试登录是否成功

  登陆成功之后，我们就可以使用casdoor.

## 第二步.设置Casdoor应用

### 1.创建或应用一个存在的组织

### 2.添加我们的回调url

  <img src="/img/shenyu/plugin/casdoor/casdoor_config.png" width="80%" height="80%" />

### 3.在证书的编辑页面，我们能看到我们的`Certificate`

  <img src="/img/shenyu/plugin/casdoor/casdoor_config.png" width="80%" height="80%" />

## 第三步.运用Casdoor插件在Shenyu

### 1.设置Casdoor插件在Shenyu

​	<img src="/img/shenyu/plugin/casdoor/casdoor_configPlugin.png" width="80%" height="80%" />

注意:因为Shenyu只有单行输入框所以我们需要增加\n在每一行的证书.

​	<img src="/img/shenyu/plugin/casdoor/casdoor_cert2.png" width="80%" height="80%" />

我们可以在复制他们并将它们粘贴到Shenyu的Casdoor配置中的certificate这一项中

**我们不需要保存我们加\n的内容在Casdoor的证书设置处**,因为这只是为了复制方便.

#### 2.设置Shenyu Casdoor的插件配置

   <img src="/img/shenyu/plugin/casdoor/casdoor_casdoor.png" width="80%" height="80%" />

​我们可以设置你所拥有的casdoor配置在Shenyu配置中

### 3.得到服务和运用

#### 3.1 直接访问页面

   <img src="/img/shenyu/plugin/casdoor/casdoor_faillogin.png" width="80%" height="80%" />

#### 3.2 使用Casdoor登录

   <img src="/img/shenyu/plugin/casdoor/casdoor_login.png" width="80%" height="80%" />
   <img src="/img/shenyu/plugin/casdoor/casdoor_successlogin.png" width="80%" height="80%" />

#### 3.3携带token在Headers,你可以访问该页面

   <img src="/img/shenyu/plugin/casdoor/casdoor_token.png" width="80%" height="80%" />

#### 3.4 我们可以保存name,id和organization在Headers以至于你可以运用他们在下一次
