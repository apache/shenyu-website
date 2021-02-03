---
title: "Raincat"
description: “Raincat is a strongly consistent distributed transaction framework based on a two-phase commit + local transaction compensation mechanism.Seamlessly support Dubbo,Motan,Springcloud and other RPC frameworks for distributed transactions.”
subDesc: "Strongly consistent distributed transaction solution"
feature1Img: "/img/feature/feature_transpart.png"
feature1Title: "Support multiple Rpc"
feature1Desc: "Raincat provides different jar packages to support Dubbo, Springcloud, and Motan"
feature2Img: "/img/feature/feature_loadbalances.png"
feature2Title: "Support Spring-boot-start"
feature2Desc: "Provide jar package that supports spring-boot-start"
feature3Img: "/img/feature/feature_service.png"
feature3Title: "Coordinator with high availability"
feature3Desc: "Use eureka as the registry center, which can be deployed in clusters to achieve high availability, and use redis cluster to store transaction data in a distributed manner "
feature4Img: "/img/feature/feature_hogh.png"
feature4Title: "Coordinator uses Netty communication"
feature4Desc: "Use netty to communicate with participants and initiators over long connections"
feature5Img: "/img/feature/feature_runtime.png"
feature5Title: "Solve the situation of inconsistent transactions in extreme cases"
feature5Desc: "Raincat can do rollback by log saved before when the machine down. "
feature6Img: "/img/feature/feature_maintenance.png"
feature6Title: "Support for embedded transactions"
feature6Desc: "Support rpc and set call "
architectureImg: "/img/architecture/raincat-framework.png"
startUp: "Start up"
github: "https://github.com/dromara/raincat"
gitee: "https://gitee.com/shuaiqiyu/Raincat"
level: "main"
weight: 3
icon: "/img/icons/raincat.png"
sidebar:
  - title: 'Introduction'  	
    link: 'overview'
  - title: 'Bootstrap raincat-manager'  	
    link: 'raincat-manager-starter'
  - title: 'Configuration'  	
    link: 'config'
  - title: 'Bootstrap admin'  	
    link: 'admin-starter'
  - title: 'User Guide'  	
    sub:
      - title: 'Dubbo user'  	
        link: 'dubbo-user'
      - title: 'Motan user'  	
        link: 'motan-user'
      - title: 'Springcloud user'  	
        link: 'springcloud-user'
  - title: 'Quick start'  	
    sub:
      - title: 'quick-start-dubbo'  	
        link: 'quick-start-dubbo'
      - title: 'quick-start-springcloud'  	
        link: 'quick-start-springcloud'
# draft: true
---

