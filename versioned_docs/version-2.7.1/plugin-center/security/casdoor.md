---
title: Casdoor Plugin
keywords: [Casdoor]
description: Casdoor plugin
---

ShenYu has Casdoor plugin to use Casdoor

## Step1. Deploy Casdoor

Firstly, the Casdoor should be deployed.

You can refer to the Casdoor official documentation

After a successful deployment, you need to ensure:

- The Casdoor server is successfully running on **http://localhost:8000**.
- Open your favorite browser and visit **http://localhost:7001**, you will see the login page of Casdoor.
- Input `admin` and `123` to test login functionality is working fine.

Then you can quickly implement a Casdoor based login page in your own app with the following steps.

## Step2. Configure Casdoor application

### 1. Create or use an existing Casdoor application

### 2. Add Your redirect url

  ![casdoor_config](/img/shenyu/plugin/casdoor/casdoor_config.png)

### 3. On the certificate editing page, you can see your `certificate`

  ![casdoor_cert](/img/shenyu/plugin/casdoor/casdoor_cert.png)

## Step3. Use Casdoor plugin in Shenyu

### 1. Config Casdoor plugin in Shenyu

  ![casdoor_configPlugin](/img/shenyu/plugin/casdoor/casdoor_configPlugin.png)

note: because the shenyu only have Single line input box so we need add \n in every line of cert.

  ![casdoor_cert2](/img/shenyu/plugin/casdoor/casdoor_cert2.png)

You can copy it and paste it on the certificate of shenyu casdoor config.

**You don't need save it in Casdoor certificate editing page**,because it just for copying.

### 2. Confing Shenyu Casdoor's plugin

  ![casdoor_casdoor](/img/shenyu/plugin/casdoor/casdoor_casdoor.png)

   You can config what you need to use Casdoor config

### 3. Get the service and use

#### 3.1 Visit the Web directly like

  ![casdoor_faillogin](/img/shenyu/plugin/casdoor/casdoor_faillogin.png)

#### 3.2 Use Casdoor login like this

  ![casdoor_login](/img/shenyu/plugin/casdoor/casdoor_login.png)
  ![casdoor_successlogin](/img/shenyu/plugin/casdoor/casdoor_successlogin.png)

#### 3.3 Carry token in Headers,you also can visit it

  ![casdoor_token](/img/shenyu/plugin/casdoor/casdoor_token.png)

#### 3.4 It also can save name,id and organization in Headers so that you can use them in next time
