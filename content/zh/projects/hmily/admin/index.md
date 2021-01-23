---
title: Hmily-Admin
keywords: admin
description: Hmily-Admin
---

### Hmily-Admin 启动教程（未完成）:

* admin 是Hmily中查看事务日志的后台管理系统。 可以查看异常的日志，修改重试次数等功能.

* 首先确保你的项目使用了Hmily并且正常运行.

* 首先用户使用的JDK必须是1.8+  本地安装了git ,maven ，执行以下命令


### 步骤二：修改本项目static 文件夹下的 index.html

```html
<!--href 修改成你的ip 端口-->
<a id="serverIpAddress" style="display: none" href="http://192.168.1.132:8888/admin">
```

### 步骤三: 运行 AdminApplication 中的main方法。

### 步骤四:在浏览器访问  http://ip:port/tcc-admin/index.html  ,输入用户名，密码登录。

### 如有任何问题欢迎加入QQ群：162614487 进行讨论