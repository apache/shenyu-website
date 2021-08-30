---
title: "Apache ShenYu(current)"
version: "current"
description: "Apache ShenYu是一个异步的，高性能的，跨语言的，响应式的API网关。"
subDesc: "高性能微服务API网关"
feature1Img: "/img/feature/feature_transpart.png"
feature1Title: "跨语言支持"
feature1Desc: "支持各种语言"
feature2Img: "/img/feature/feature_loadbalances.png"
feature2Title: "丰富的插件支持"
feature2Desc: "鉴权，限流，熔断，防火墙等插件"
feature3Img: "/img/feature/feature_service.png"
feature3Title: "插件规则动态配置"
feature3Desc: "所有的配置规则可以随意调整，动态生效,无需重启"
feature4Img: "/img/feature/feature_hogh.png"
feature4Title: "插件热插拔，易扩展，支持用户自定义开发"
feature4Desc: "插件热插拔，易扩展，支持用户自定义开发"
feature5Img: "/img/feature/feature_runtime.png"
feature5Title: "多协议支持"
feature5Desc: "无缝支持Dubbo，SpringCloud，HTTP REST，GRPC，Tars"
feature6Img: "/img/feature/feature_maintenance.png"
feature6Title: "高可用,高性能,高并发"
feature6Desc: "支持集群部署"
architectureImg: "/img/architecture/shenyu-framework.png"
startUp: "开始"
github: "https://github.com/apache/incubator-shenyu"
gitee: ""
level: "main"
weight: 1
# icon: "/img/logo/apache-shenyu.png"
showIntroduce: true
showFeature: true
sidebar:
  - title: '介绍'
    link: 'overview'
  - title: '设计文档'
    sub:
      - title: 'Admin数据结构'
        link: 'database-design'
      - title: '数据同步原理'
        link: 'data-sync'
      - title: '客户端接入原理'
        link: 'register-center-design'
      - title: '流量控制'
        link: 'flow-control'
      - title: 'SPI扩展设计'
        link: 'spi-design'
  - title: '运维部署'
    sub:
      - title: '本地部署'
        link: 'deployment-local'
      - title: '二进制包部署'
        link: 'deployment-package'
      - title: 'Docker部署'
        link: 'deployment-docker'
      - title: 'Kubernetes部署'
        link: 'deployment-k8s'
      - title: 'Helm部署'
        link: 'deployment-helm'
      - title: '自定义部署'
        link: 'deployment-custom'
  - title: '快速开始'
    sub:
      - title: 'Http代理'
        link: 'quick-start-http'
      - title: 'Dubbo代理'
        link: 'quick-start-dubbo'
      - title: 'Spring Cloud代理'
        link: 'quick-start-springcloud'
      - title: 'Sofa代理'
        link: 'quick-start-sofa'
      - title: 'gRPC代理'
        link: 'quick-start-grpc'
      - title: 'Tars代理'
        link: 'quick-start-tars'
      - title: 'Motan代理'
        link: 'quick-start-motan'

  - title: '用户文档'
    sub:
      - title: 'Admin使用'
        sub:
          - title: '插件管理'
            link: 'plugin-handle-explanation'
          - title: '选择器和规则管理'
            link: 'selector-and-rule'
          - title: '字典管理'
            link: 'dictionary-management'
          - title: '权限管理'
            link: 'authority-management'
      - title: '属性配置'
        sub:
          - title: 'Admin属性配置'
            link: 'admin-property-config'
      - title: '数据同步配置'
        link: 'use-data-sync'
      - title: '客户端接入配置'
        link: 'register-center-access'
      - title: 'Http服务接入'
        link: 'http-proxy'
      - title: 'Dubbo服务接入'
        link: 'dubbo-proxy'
      - title: 'Spring Cloud服务接入'
        link: 'spring-cloud-proxy'
      - title: 'Sofa服务接入'
        link: 'sofa-rpc-proxy'
      - title: 'gRPC服务接入'
        link: 'grpc-proxy'
      - title: 'Tars服务接入'
        link: 'tars-proxy'
      - title: 'Motan服务接入'
        link: 'motan-proxy'
  - title: '插件集合'
    sub:
      - title: 'Http 处理'
        sub:
          - title: 'Rewrite插件'
            link: 'rewrite-plugin'
          - title: 'Redirect插件'
            link: 'redirect-plugin'
          - title: 'Request插件'
            link: 'request-plugin'
          - title: 'Context-path插件'
            link: 'context-path-plugin'
          - title: 'Param-mapping插件'
            link: 'param-mapping-plugin'
          - title: 'ModifyResponse插件'
            link: 'modify-response-plugin'
          - title: 'WebSocket代理'
            link: 'websocket-plugin'
      - title: 'RPC 代理'
        sub:
          - title: 'Divide插件'
            link: 'divide-plugin'
          - title: 'Dubbo插件'
            link: 'dubbo-plugin'
          - title: 'Spring Cloud插件'
            link: 'spring-cloud-plugin'
          - title: 'Sofa插件'
            link: 'sofa-plugin'
          - title: 'gRPC插件'
            link: 'grpc-plugin'
          - title: 'Tars插件'
            link: 'tars-plugin'
          - title: 'Motan插件'
            link: 'motan-plugin'
      - title: '熔断和限流'
        sub:
          - title: 'Hystrix插件'
            link: 'hystrix-plugin'
          - title: 'Sentinel插件'
            link: 'sentinel-plugin'
          - title: 'Resilience4j插件'
            link: 'resilience4j-plugin'
          - title: 'RateLimiter插件'
            link: 'rate-limiter-plugin'
      - title: '权限认证'
        sub:
          - title: 'Waf插件'
            link: 'waf-plugin'
          - title: 'Sign插件'
            link: 'sign-plugin'
          - title: 'JWT插件'
            link: 'jwt-plugin'
          - title: 'OAuth 2插件'
            link: 'oauth2-plugin'
      - title: '可观测性'
        sub:
          - title: 'Monitor插件'
            link: 'monitor-plugin'
          - title: 'Logging插件'
            link: 'logging-plugin'
  - title: '开发者文档'
    sub:
      - title: '自定义Filter'
        link: 'custom-filter'
      - title: '自定义插件'
        link: 'custom-plugin'
      - title: '文件上传下载'
        link: 'file-and-image'
      - title: '自定义解析IP与Host'
        link: 'custom-parsing-ip-and-host'
      - title: '自定义返回结果'
        link: 'custom-result'
      - title: '自定义签名插件算法与验证'
        link: 'custom-sign-algorithm'
      - title: '自定义匹配条件策略'
        link: 'custom-condition-match'
      - title: '多语言Http客户端接入'
        link: 'developer-shenyu-client'
      - title: '线程模型'
        link: 'thread'
      - title: 'ShenYu调优'
        link: 'shenyu-optimize'
  - title: '版本发布'
    link: 'release-notes'
  - title: '文档下载'
    link: 'download'
# draft: true
---

