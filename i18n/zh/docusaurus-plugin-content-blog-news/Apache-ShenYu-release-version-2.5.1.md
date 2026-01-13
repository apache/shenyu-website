---
title: "【Apache ShenYu 2.5.1 版本发布】"
description: "Apache ShenYu 2.5.1 版本发布"
categories: "Apache ShenYu"
tags: ["Apache ShenYu"]
date: 2022-02-04
slug: Apache-ShenYu-release-version-2.5.1
---  

春节刚过，Apache ShenYu便迎来了2.5.1版本。此次发布内容，共有 259 个pull Request，64位贡献者的参与。新增了若干功能，修复了bug，优化了若干内容。

### 新功能

1. 添加 brpc 插件
2. 支持nacos不同命名空间
3. 优化 mock 插件
4. 注册中心实例支持eureka
5. 支持 API 文档
6. 添加 sentinel 插件的规则处理参数
7. 添加 e2e 测试引擎
8. 添加 casdoor插件支持SSO
9. 添加 logging-tencent-cls 插件
10. 添加 logging-clickhouse 插件
11. 添加 logging-pulsar 插件
12. 添加 key-auth 插件

### 增强

1. 优化 motan 客户端注解
2. 优化 motan 插件配置
3. 优化 websocket 客户端注解
4. 优化 springcloud 客户端注解
5. 优化 springmvc 客户端注解

### 重构

1. 重构 API文档的mock请求
2. 重构 logging-clickhouse 插件
3. 优化 dubbo相关maven依赖
4. 重构 sign 插件
5. 更新 ShenyuExtConfiguration
6. 移除不必要的单例
7. 修复并发场景mock数据
8. 重构 sdk 测试
9. 重构 DefaultSignService
10. 重构 shenyu-admin 规则
11. 优化 ShaUtil
12. 优化缓存
13. 修复 ConcurrentModificationException
14. 修复 etcd 数据同步
15. 重构 sdk 客户端
16. 优化请求超时
17. 重构日志模块
18. 重构 springcloud 客户端
19. 重构 Motan插件
20. 重构 admin 数据同步
21. 重构 tars 客户端
22. 重构 alibaba-dubbo 客户端
23. 重构 springmvc 客户端
24. 重构 admin 配置
25. 优化随机算法
26. 重构负载均衡算法
27. 重构 logging-kafka 插件

### 错误修复

1. 移除多余的 cookie 设置
2. 修复 appAuth 删除逻辑
3. 修复 Cryptor-Request 插件
4. 修复 ext 插件
5. 修复升级脚本
6. 修复 Nacos 注册空指针问题
7. 修复 sandbox json 解析
8. 修复插件更新时的异常
9. 修复 postgresql 脚本
10. 修复 sentinel 插件的异常
11. 修复 TencentClsLog异常
12. 修复更新密码异常
13. 修复选择器分页异常
14. 修复 request 插件异常
15. 修复 RateLimiter插件并发处理异常
16. 修复 sign 插件异常
17. 修复 context-path 插件异常

特别感谢以下贡献者对 2.5.1版本的支持和参与（排名不分先后）。

> dragon-zhang, zhengpeng, mahaitao, 愿凌飞, hdgaadd, dayu, SongTao Zhuang, Misaya295 , Shawn Jim , yunlongn , Will , moremind , RayayChung , Kevin Clair , huanccwang , 柯杨 , Kunshuai Zhu , fantiq , youzipi , class , kyeongsun , 杨阳洋 , Liming Deng , 杨文杰 , xcsnx , hnxiaoyuan , dependabot , xiaoyu , wzhangNJ , Zihao Huang , ywj1352 , pandaapo , WuLang , Nineteen , kyeongsun , ableYang , Runqi Zhao , WeiS , Luke.Z , lahmxu , Sinsy , Daming , BoyuLi4 , jakiuncle , Bowen Li , huanccwang , gitchenjh , DamonXue , Wu Daifu , Jiageng , nuo-promise , Guocheng Tang , likeguo , Sixh-PrFor , throwable , renzhuyan , wangteng , qinghai777 , zly123987123 , 奕仁 , 尔等同学 , qifanyyy , Jairo , ousinka
