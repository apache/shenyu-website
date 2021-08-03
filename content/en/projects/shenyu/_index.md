---
title: "Apache ShenYu(current)"
description: "This is an asynchronous, high-performance, cross-language, responsive API gateway."
subDesc: "High-performance API Gateway"
feature1Img: "/img/feature/feature_transpart.png"
feature1Title: "Cross-language"
feature1Desc: "Support for all languages"
feature2Img: "/img/feature/feature_loadbalances.png"
feature2Title: "More plugins"
feature2Desc: "Authentication, current limit, fuse, firewall and other plugins"
feature3Img: "/img/feature/feature_service.png"
feature3Title: "Dynamic Config"
feature3Desc: "All of the configuration rules can be adjusted at will, taking effect dynamically, without restarting"
feature4Img: "/img/feature/feature_hogh.png"
feature4Title: "Plugins hot-plug, easy to expand"
feature4Desc: "Plugins hot - plug, easy to expand"
feature5Img: "/img/feature/feature_runtime.png"
feature5Title: "Support More Rpc and REST"
feature5Desc: "Dubbo，Spring Cloud，HTTP REST，GRPC，Tars"
feature6Img: "/img/feature/feature_maintenance.png"
feature6Title: "High availability, high concurrency"
feature6Desc: "Support cluster deployment"
architectureImg: "/img/architecture/shenyu-framework.png"
startUp: "Start up"
github: "https://github.com/apache/incubator-shenyu"
gitee: ""
level: "main"
weight: 1
# icon: "/img/logo/apache-shenyu.png"
showIntroduce: true
showFeature: true
sidebar:
  - title: 'Overview'
    link: 'overview'
  - title: 'Design'
    sub:
      - title: 'Admin Database Design'
        link: 'database-design'
      - title: 'Data Synchronization'
        link: 'data-sync'
      - title: 'Application Client Access'
        link: 'register-center-design'
      - title: 'Flow Control'
        link: 'flow-control'
      - title: 'SPI Design'
        link: 'spi-design'
  - title: 'Deployment'
    sub:
      - title: 'Local Deployment'
        link: 'deployment-local'
      - title: 'Binary Packages Deployment'
        link: 'deployment-package'
      - title: 'Docker Deployment'
        link: 'deployment-docker'
      - title: 'Kubernetes Deployment'
        link: 'deployment-k8s'
      - title: 'Helm Deployment'
        link: 'deployment-helm'
      - title: 'Custom Deployment'
        link: 'deployment-custom'        
  - title: 'Quick Start'
    sub:
      - title: 'Http Proxy'
        link: 'quick-start-http'
      - title: 'Dubbo Proxy'
        link: 'quick-start-dubbo'
      - title: 'Spring Cloud Proxy'
        link: 'quick-start-springcloud'
      - title: 'Sofa Proxy'
        link: 'quick-start-sofa'
      - title: 'gRPC Proxy'
        link: 'quick-start-grpc'
      - title: 'Tars Proxy'
        link: 'quick-start-tars'
      - title: 'Motan Proxy'
        link: 'quick-start-motan'
        
  - title: 'User Guide'
    sub:
      - title: 'Admin Usage'
        sub:
          - title: 'Plugin Config'
            link: 'plugin-handle-explanation'
          - title: 'Selector And Rule Config'
            link: 'selector-and-rule'
          - title: 'Dictionary Management'
            link: 'dictionary-management'
          - title: 'Authority Management'
            link: 'authority-management'
      - title: 'Data Synchronization Config'
        link: 'use-data-sync'
      - title: 'Application Client Access Config'
        link: 'register-center-access'
      - title: 'Http Proxy'
        link: 'http-proxy'
      - title: 'Dubbo Proxy'
        link: 'dubbo-proxy'
      - title: 'Spring Cloud Proxy'
        link: 'spring-cloud-proxy'
      - title: 'Sofa Proxy'
        link: 'sofa-rpc-proxy'
      - title: 'gRPC Proxy'
        link: 'grpc-proxy'
      - title: 'Tars Proxy'
        link: 'tars-proxy'
      - title: 'Motan Proxy'
        link: 'motan-proxy'
  - title: 'Plugin Center'
    sub:
      - title: 'Http Handle'
        sub:
          - title: 'Rewrite Plugin'
            link: 'rewrite-plugin'
          - title: 'Redirect Plugin'
            link: 'redirect-plugin'
          - title: 'Request Plugin'
            link: 'request-plugin'
          - title: 'Context-path Plugin'
            link: 'context-path-plugin'
          - title: 'Param-mapping Plugin'
            link: 'param-mapping-plugin'
          - title: 'ModifyResponse Plugin'
            link: 'modify-response-plugin'
      - title: 'RPC Proxy'
        sub:
          - title: 'Divide Plugin'
            link: 'divide-plugin'
          - title: 'Dubbo Plugin'
            link: 'dubbo-plugin'
          - title: 'Spring Cloud Plugin'
            link: 'spring-cloud-plugin'
          - title: 'Sofa Plugin'
            link: 'sofa-plugin'
          - title: 'gRPC Plugin'
            link: 'grpc-plugin'
          - title: 'Tars Plugin'
            link: 'tars-plugin'
          - title: 'Motan Plugin'
            link: 'motan-plugin'
      - title: 'Fault Tolerance'
        sub:
          - title: 'Hystrix Plugin'
            link: 'hystrix-plugin'
          - title: 'Sentinel Plugin'
            link: 'sentinel-plugin'
          - title: 'Resilience4j Plugin'
            link: 'resilience4j-plugin'
          - title: 'RateLimiter Plugin'
            link: 'rate-limiter-plugin'
      - title: 'Authority And Certification'
        sub:
          - title: 'Waf Plugin'
            link: 'waf-plugin'
          - title: 'Sign Plugin'
            link: 'sign-plugin'
          - title: 'JWT Plugin'
            link: 'jwt-plugin'
          - title: 'OAuth 2 Plugin'
            link: 'oauth2-plugin'
      - title: 'Observability'
        sub:
          - title: 'Monitor Plugin'
            link: 'monitor-plugin'
          - title: 'Logging Plugin'
            link: 'logging-plugin'
  - title: 'Developer Documentation'
    sub:
     - title: 'Custom Filter'
       link: 'custom-filter'
     - title: 'Custom Plugin'
       link: 'custom-plugin'
     - title: 'File Upload And Download'
       link: 'file-and-image'
     - title: 'Custom Parsing IP And Host'
       link: 'custom-parsing-ip-and-host'
     - title: 'Custom Result'
       link: 'custom-result'
     - title: 'Custom Sign Algorithm'
       link: 'custom-sign-algorithm'
     - title: 'Multilingual Http Client Access'
       link: 'developer-shenyu-client'
     - title: 'Thread Model'
       link: 'thread'
     - title: 'Shenyu Optimize'
       link: 'shenyu-optimize'
  - title: 'Release Notes'
    link: 'release-notes'
  - title: 'Download'
    link: 'download'
# draft: true
---


