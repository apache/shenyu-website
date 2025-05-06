import React from 'react';
import Translate from "@docusaurus/Translate";

export default [
    {
        categray: 'SPI',
        posts: [
            {
                title:<Translate>SPI Source Code Analysis</Translate>,
                author: "Throwable (Contributor)",
                autPage:"https://github.com/zjcscut/",
                autImg:'/img/blog/throwable.jpeg',
                src: "SPI-SourceCode-Analysis-SPI",
                cover: "/img/blog/4-1.png",
                date: '2022-09-12',
                abs: <Translate>Recently,when I read the source code of open source project Apache Shenyu API gateway,I find and many core components of the gateway are loaded with the SPI module. Here I will analyzes the source code of SPI module in Shenyu gateway.</Translate>
            },
            {
                title: <Translate>MatchStrategy -- analyze the design based on SPI</Translate>,
                author: "Huihui Yin (Contributor)",
                autPage:"https://github.com/changanjennifer",
                autImg:'/img/blog/jennifer.png',
                src: "SPI-SourceCode-Analysis-MatchStrategy-SPI",
                cover: "/img/blog/4-1.png",
                date: '2021-07-2',
                abs: <Translate>Gateway applications need to support a variety of load balancing strategies, including random,Hashing, RoundRobin and so on. In Apache Shenyu gateway, it not only realizes such traditional algorithms, but also makes smoother traffic processing for the entry of server nodes through detailed processing such as traffic warm-up, so as to obtain better overall stability. In this article, let's walk through how Apache Shenyu is designed and implemented this part of the function.</Translate>
            },
            {
                title: <Translate>PredicateJudge -- analyze the design based on SPI</Translate>,
                author: "Huihui Yin (Contributor)",
                autPage:"https://github.com/changanjennifer",
                autImg:'/img/blog/jennifer.png',
                src: "SPI-SourceCode-Analysis-PredicateJudge-SPI",
                cover: "/img/blog/4-2.png",
                date: '2021-07-2',
                abs:<Translate>In most of the plugins ( such as Dubbo, gRPC,Spring-cloud, etc) of Apache Shenyu, the routingparameters are designed to support the combination of multiple conditions. In order to realize such requirements, the parameters and behaviors are abstracted to three parts according to its SPI mechanism, and implemented in shenyu-plugin-base module.</Translate>

            },
            {
                title: <Translate>LoadBalance SPI Source Code Analysis</Translate>,
                author: "Huihui Yin (Contributor)",
                autPage:"https://github.com/changanjennifer",
                autImg:'/img/blog/jennifer.png',
                src: "SPI-SourceCode-Analysis-LoadBalance-SPI",
                cover: "/img/blog/4-3.png",
                date: '2021-07-2',
                abs:<Translate>Apache Shenyu has been identified as a gateway application which supports a variety of protocols and microservice frameworks such as Dubbo, gRPC, Spring-Cloud, etc. To do this, the product has accomplished an elegant SPI (Service Provider Interface) as its foundation, and make the Rule data parsing and predicting program very simple , resiliency and security. As to rule data parsing processing, the SPI design increases the product's scalability. When appending new plugin, in most cases, the existing module is enough for rule data parsing , otherwise it can be rapidly carry out with tiny effort.</Translate>
            },
            {
                title: <Translate>RateLimiter SPI code analysis</Translate>,
                author: "Huihui Yin (Contributor)",
                autPage:"https://github.com/changanjennifer",
                autImg:'/img/blog/jennifer.png',
                src: "SPI-SourceCode-Analysis-RateLimiter-SPI",
                cover: "/img/blog/4-4.png",
                date: '2021-07-2',
                abs:<Translate>Rate limiter is a very important integral of gateway application, to deal with high traffic. When the system is attacked abnormally by a large number of traffic gathered in a short time; When there are a large number of lower priority request need to be slow down or else it will effect your high priority transactions; Or sometimes your system can not afford the regular traffic; in these scenarios, we need to start rate limiter component to protect our system, through rejection, wait, load shedding,etc, limit the requests to an acceptable quantities, or only certain domains (or services) requests can get through.</Translate>
            },
        ]
    },
    {
        categray: 'RegisterCenter',
        posts: [
            {
                title: <Translate>Register Center Source Code Analysis of Http Register</Translate>,
                author: "midnight2104 (PMC)",
                autImg: "/img/blog/midnight2104.png",
                autPage: "https://github.com/midnight2104",
                src: "RegisterCenter-SourceCode-Analysis-Http-Register",
                cover: "/img/blog/5-1.png",
                date: '2021-07-2',
                abs:<Translate>In ShenYu gateway, the registration center is used to register the client information to shenyu-admin, admin then synchronizes this information to the gateway through data synchronization, and the gateway completes traffic filtering through these data. The client information mainly includes interface information and URI information.</Translate>
            },
        ]
    },
    {
        categray: 'Start',
        posts: [
            {
                title: <Translate>Apache ShenYu Start Demo</Translate>,
                author: "Kunshuai Zhu (PMC)",
                autImg: "/img/blog/zhukunshuai.png",
                autPage:"https://github.com/JooKS-me",
                src: "Start-SourceCode-Analysis-Start-Demo",
                cover: "/img/blog/6-1.png",
                date: '2021-07-2',
                abs:<Translate>Apache ShenYu Start Demo</Translate>
            },
            {
                title: <Translate>Guide for New Contributors to Start avoid Pitfalls</Translate>,
                author: "Yuxuan Zhang (Contributor)",
                autImg: "/img/blog/zhangyuxuan.png",
                autPage:"https://github.com/zuobiao-zhou",
                src: "Start-SourceCode-Analysis-Start-Demo-for-Contributor",
                cover: "/img/blog/7-1.png",
                date: '2023-04-18',
                abs:<Translate>As a first-time developer in the `Shenyu` community, I encountered some "Pitfalls" that were not mentioned in the tutorials I followed to start and develop the project. I have documented the detailed steps I took to start `shenyu`, `shenyu-dashboard`, `shenyu-website` in this blog, hoping to help more new contributors in the community.</Translate>
            },
        ]
    },
    {
        categray: 'DataSync',
        posts: [
            {
                title: <Translate>Etcd Data Synchronization Source Code Analysis</Translate>,
                author: "4zd (Contributor)",
                autImg: "/img/blog/4zd.png",
                autPage: "https://github.com/4zd",
                src: "DataSync-SourceCode-Analysis-Etcd-Data-Sync",
                cover: "/img/blog/1-1.png",
                date: '2021-07-2',
                abs:<Translate>In ShenYu gateway, data synchronization refers to how to synchronize the updated data to the gateway after the data is sent in the background management system. The Apache ShenYu gateway currently supports data synchronization for ZooKeeper, WebSocket, http long poll, Nacos, Etcd and Consul. The main content of this article is based on Etcd data synchronization source code analysis.</Translate>
            },
            {
                title: <Translate>Http Long Polling Data Synchronization Source Code Analysis</Translate>,
                author: "midnight2104 (PMC)",
                autImg: "/img/blog/midnight2104.png",
                autPage: "https://github.com/midnight2104",
                src: "DataSync-SourceCode-Analysis-Http-Data-Sync",
                cover: "/img/blog/1-2.png",
                date: '2022-07-2',
                abs:<Translate>In ShenYu gateway, data synchronization refers to how to synchronize the updated data to the gateway after the data is sent in the background management system. The Apache ShenYu gateway currently supports data synchronization for ZooKeeper, WebSocket, http long poll, Nacos, etcd and Consul. The main content of this article is based on http long poll data synchronization source code analysis.</Translate>
            },
            {
                title: <Translate>Nacos Data Synchronization Source Code Analysis</Translate>,
                author: "4zd (Contributor)",
                autImg: "/img/blog/4zd.png",
                autPage: "https://github.com/4zd",
                src: "DataSync-SourceCode-Analysis-Nacos-Data-Sync",
                cover: "/img/blog/1-3.png",
                date: '2022-07-2',
                abs:<Translate>In ShenYu gateway, data synchronization refers to how to synchronize the updated data to the gateway after the data is sent in the background management system. The Apache ShenYu gateway currently supports data synchronization for ZooKeeper, WebSocket, http long poll, Nacos, etcd and Consul. The main content of this article is based on Nacos data synchronization source code analysis.</Translate>
            },
            {
                title: <Translate>WebSocket Data Synchronization Source Code Analysis</Translate>,
                author: "midnight2104 (PMC)",
                autImg: "/img/blog/midnight2104.png",
                autPage: "https://github.com/midnight2104",
                src: "DataSync-SourceCode-Analysis-WebSocket-Data-Sync",
                cover: "/img/blog/1-4.png",
                date: '2022-07-2',
                abs:<Translate>In ShenYu gateway, data synchronization refers to how to synchronize the updated data to the gateway after the data is sent in the background management system. The Apache ShenYu gateway currently supports data synchronization for ZooKeeper, WebSocket, http long poll, Nacos, etcd and Consul. The main content of this article is based on WebSocket data synchronization source code analysis.</Translate>
            },
            {
                title: <Translate>ZooKeeper Data Synchronization Source Code Analysis</Translate>,
                author: "midnight2104 (PMC)",
                autImg: "/img/blog/midnight2104.png",
                autPage: "https://github.com/midnight2104",
                src: "DataSync-SourceCode-Analysis-ZooKeeper-Data-Sync",
                cover: "/img/blog/1-5.png",
                date: '2022-07-2',
                abs:<Translate>In ShenYu gateway, data synchronization refers to how to synchronize the updated data to the gateway after the data is sent in the background management system. The Apache ShenYu gateway currently supports data synchronization for ZooKeeper, WebSocket, http long poll, Nacos, etcd and Consul. The main content of this article is based on WebSocket data synchronization source code analysis.</Translate>
            },
            {
                title: <Translate>Apollo Data Synchronization Source Code Analysis</Translate>,
                author: "hql0312 (Committer)",
                autImg: "/img/blog/hql0312.png",
                autPage: "https://github.com/hql0312",
                src: "DataSync-SourceCode-Analysis-Apollo-Data-Sync",
                cover: "/img/logo.svg",
                date: '2024-02-22',
                abs:<Translate>Introduce Shenyu data sync by apollo.</Translate>
            },
        ]
    },
    {
        categray: 'Integration Test',
        posts: [
            {
                title: <Translate>Integration Test Analysis</Translate>,
                author: "Kunshuai Zhu (PMC)",
                autImg: "/img/blog/zhukunshuai.png",
                autPage:"https://github.com/JooKS-me",
                src: "IntegrationTest-Analysis",
                cover: "/img/logo.svg",
                date: '2022-07-2',
                abs:<Translate>This article will provide an in-depth analysis of Apache ShenYu's integration tests.</Translate>
            },
        ]
    },
    {
        categray: 'Plugin',
        posts: [
            {
                title: <Translate>Code Analysis For Context-Path Plugin</Translate>,
                author: "Kunshuai Zhu (PMC)",
                autImg: "/img/blog/zhukunshuai.png",
                autPage:"https://github.com/JooKS-me",
                src: "Plugin-SourceCode-Analysis-Context-Path-Plugin",
                cover: "/img/logo.svg",
                date: '2021-07-2',
                abs:<Translate>Code Analysis For Context-Path Plugin</Translate>
            },
            {
                title: <Translate>Code Analysis For Dubbo Plugin</Translate>,
                author: "midnight2104 (PMC)",
                autImg: "/img/blog/midnight2104.png",
                autPage: "https://github.com/midnight2104",
                src: "Plugin-SourceCode-Analysis-Dubbo-Plugin",
                cover: "/img/blog/3-2.png",
                date: '2021-07-2',
                abs:<Translate>The ShenYu gateway uses the divide plugin to handle http requests. You can see the official documentation Quick start with Http to learn how to use this plugin.</Translate>
            },
            {
                title: <Translate>Code Analysis For Param-Mapping Plugin</Translate>,
                author: "Kunshuai Zhu (PMC)",
                autImg: "/img/blog/zhukunshuai.png",
                autPage:"https://github.com/JooKS-me",
                src: "Plugin-SourceCode-Analysis-Param-Mapping-Plugin",
                cover: "/img/blog/3-3.jpg",
                date: '2021-07-2',
                abs:<Translate>The Apache ShenYu gateway uses the dubbo plugin to make calls to the dubbo service. You can see the official documentation Dubbo Quick Start to learn how to use the plugin.</Translate>
            },
            {
                title: <Translate>Code Analysis For Divide Plugin</Translate>,
                author: "midnight2104 (PMC)",
                autImg: "/img/blog/midnight2104.png",
                autPage: "https://github.com/midnight2104",
                src: "Plugin-SourceCode-Analysis-Divide-Plugin",
                cover: "/img/blog/3-4.png",
                date: '2021-07-2',
                abs:<Translate>Code Analysis For Divide Plugin</Translate>
            },
            {
                title: <Translate>Code Analysis Ext Plugin Loader</Translate>,
                author: "hql0312 (contributor)",
                autImg: "/img/blog/hql0312.png",
                autPage: "https://github.com/hql0312",
                src: "Loader-SourceCode-Analysis-ExtLoader",
                cover: "/img/logo.svg",
                date: '2024-02-04',
                abs:<Translate>Code Analysis Ext Plugin Loader</Translate>
            },
        ]
    },
    {
        categray: 'E2e Test',
        posts: [
            {
                title: <Translate>E2e Test Analysis</Translate>,
                author: "Haiqi Qin (Committer)",
                autImg: "https://avatars.githubusercontent.com/u/80969210?v=4",
                autPage:"https://github.com/HaiqiQin",
                src: "E2eTest-Analysis",
                cover: "/img/logo.svg",
                date: '2023-08-20',
                abs:<Translate>This article will conduct an in-depth analysis of Apache ShenYu e2e module.</Translate>
            },
        ]
    },

]