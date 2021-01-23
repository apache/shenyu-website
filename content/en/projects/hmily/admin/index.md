---
title: Hmily-Admin
keywords: admin
description: Hmily-Admin
---

### Hmily-Admin startup tutorial (not completed）:

* `Admin` is the background management system for viewing transaction logs in Hmily. It has many features, Such as viewing abnormal logs, modifying the number of retries and so on.

* First, make sure that your project is using Hmily and is running properly.

* Second, the JDK used by the user must be 1.8+. Git and Maven are installed locally, then execute the following command

### Step 2：Modify `index.html` under the `static` folder of your project

```html
<!--href use your ip and port-->
<a id="serverIpAddress" style="display: none" href="http://192.168.1.132:8888/admin">
```

### Step 3: Run the `main` method in `AdminApplication`

### Step 4: Visit `http://ip:port/tcc-admin/index.html` in the browser, then enter the user name and password to login.

### If you have any questions, please join the QQ group: 162614487 for discussion