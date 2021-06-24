---
title: "Apache ShenYu Gateway released version 1.0.4-RELEASE"
author: "xiaoyu"
description: "Apache ShenYu Gateway released version 1.0.4-RELEASE"
categories: "Apache ShenYu"
tags: ["Apache ShenYu"]
date: 2019-04-09
cover: "/img/architecture/shenyu-framework.png"
---

### ShenYu Gateway released version 1.0.4-RELEASE

* Fix the bug that appeared in the Soul-admin of version 1.0.3.
* The serialization method supports custom extensions. The default serialization method has been changed from Kroy to Java serialization method.
* Dubbo support.

### Changes Dubbo usage

* In the previous version (1.0.2 or 1.0.3), the parameters of Dubbo are passed through the header, and in the 1.0.4 version it is passed through the body.

* Relevant document information has been updated. 


### Recommendations on using version 1.0.4

* Version 1.0.4 supports user-defined plug-in, and supports regular expression matching.

* The change of Dubbo parameter transfer and it would be more friendly to use.

###  If you used version 1.0.2 before and want to update to version 1.0.4. 

 * Add role field in the plug-in table.

 * Restart the Soul-admin of version 1.0.4.

 * Perform synchronization of all plug-ins (because of serialization changes)

 * Start the soul-web service of version 1.0.4. 

### For more information

 * QQ group: 429951241

 * Official website document: https://dromara.org/website/zh-cn/docs/soul/soul.html

 * Github: https://github.com/apache/incubator-shenyu

 * Gitee:  https://gitee.com/dromara/soul
