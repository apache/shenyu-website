"use strict";(self.webpackChunkshenyu_website=self.webpackChunkshenyu_website||[]).push([[82311],{3905:(t,e,a)=>{a.d(e,{Zo:()=>o,kt:()=>u});var n=a(67294);function r(t,e,a){return e in t?Object.defineProperty(t,e,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[e]=a,t}function l(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,n)}return a}function i(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?l(Object(a),!0).forEach((function(e){r(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):l(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}function p(t,e){if(null==t)return{};var a,n,r=function(t,e){if(null==t)return{};var a,n,r={},l=Object.keys(t);for(n=0;n<l.length;n++)a=l[n],e.indexOf(a)>=0||(r[a]=t[a]);return r}(t,e);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(t);for(n=0;n<l.length;n++)a=l[n],e.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(t,a)&&(r[a]=t[a])}return r}var g=n.createContext({}),k=function(t){var e=n.useContext(g),a=e;return t&&(a="function"==typeof t?t(e):i(i({},e),t)),a},o=function(t){var e=k(t.components);return n.createElement(g.Provider,{value:e},t.children)},d="mdxType",m={inlineCode:"code",wrapper:function(t){var e=t.children;return n.createElement(n.Fragment,{},e)}},c=n.forwardRef((function(t,e){var a=t.components,r=t.mdxType,l=t.originalType,g=t.parentName,o=p(t,["components","mdxType","originalType","parentName"]),d=k(a),c=r,u=d["".concat(g,".").concat(c)]||d[c]||m[c]||l;return a?n.createElement(u,i(i({ref:e},o),{},{components:a})):n.createElement(u,i({ref:e},o))}));function u(t,e){var a=arguments,r=e&&e.mdxType;if("string"==typeof t||r){var l=a.length,i=new Array(l);i[0]=c;var p={};for(var g in e)hasOwnProperty.call(e,g)&&(p[g]=e[g]);p.originalType=t,p[d]="string"==typeof t?t:r,i[1]=p;for(var k=2;k<l;k++)i[k]=a[k];return n.createElement.apply(null,i)}return n.createElement.apply(null,a)}c.displayName="MDXCreateElement"},43697:(t,e,a)=>{a.r(e),a.d(e,{contentTitle:()=>i,default:()=>d,frontMatter:()=>l,metadata:()=>p,toc:()=>g});var n=a(87462),r=(a(67294),a(3905));const l={title:"Logging-RocketMQ\u63d2\u4ef6",keywords:["Logging","RocketMQ"],description:"Logging-RocketMQ\u63d2\u4ef6"},i="1. \u6982\u8ff0",p={unversionedId:"plugin-center/observability/logging-rocketmq",id:"version-2.6.0/plugin-center/observability/logging-rocketmq",isDocsHomePage:!1,title:"Logging-RocketMQ\u63d2\u4ef6",description:"Logging-RocketMQ\u63d2\u4ef6",source:"@site/i18n/zh/docusaurus-plugin-content-docs/version-2.6.0/plugin-center/observability/logging-rocketmq.md",sourceDirName:"plugin-center/observability",slug:"/plugin-center/observability/logging-rocketmq",permalink:"/zh/docs/plugin-center/observability/logging-rocketmq",editUrl:"https://github.com/apache/shenyu-website/edit/main/i18n/zh/docusaurus-plugin-content-docs/version-2.6.0/plugin-center/observability/logging-rocketmq.md",version:"2.6.0",frontMatter:{title:"Logging-RocketMQ\u63d2\u4ef6",keywords:["Logging","RocketMQ"],description:"Logging-RocketMQ\u63d2\u4ef6"},sidebar:"version-2.6.0/tutorialSidebar",previous:{title:"Logging-Pulsar\u63d2\u4ef6",permalink:"/zh/docs/plugin-center/observability/logging-pulsar"},next:{title:"Logging-Tencent cls\u65e5\u5fd7\u63d2\u4ef6",permalink:"/zh/docs/plugin-center/observability/logging-tencent-cls"}},g=[{value:"1.1 \u63d2\u4ef6\u540d\u79f0",id:"11-\u63d2\u4ef6\u540d\u79f0",children:[]},{value:"1.2 \u9002\u7528\u573a\u666f",id:"12-\u9002\u7528\u573a\u666f",children:[]},{value:"1.3 \u63d2\u4ef6\u529f\u80fd",id:"13-\u63d2\u4ef6\u529f\u80fd",children:[]},{value:"1.4 \u63d2\u4ef6\u4ee3\u7801",id:"14-\u63d2\u4ef6\u4ee3\u7801",children:[]},{value:"1.5 \u6dfb\u52a0\u81ea\u54ea\u4e2ashenyu\u7248\u672c",id:"15-\u6dfb\u52a0\u81ea\u54ea\u4e2ashenyu\u7248\u672c",children:[]},{value:"1.6 \u6280\u672f\u65b9\u6848",id:"16-\u6280\u672f\u65b9\u6848",children:[]},{value:"2.1 \u63d2\u4ef6\u4f7f\u7528\u6d41\u7a0b\u56fe",id:"21-\u63d2\u4ef6\u4f7f\u7528\u6d41\u7a0b\u56fe",children:[]},{value:"2.2 \u5bfc\u5165pom",id:"22-\u5bfc\u5165pom",children:[]},{value:"2.3 \u542f\u7528\u63d2\u4ef6",id:"23-\u542f\u7528\u63d2\u4ef6",children:[]},{value:"2.4 \u914d\u7f6e\u63d2\u4ef6",id:"24-\u914d\u7f6e\u63d2\u4ef6",children:[{value:"2.4.1 \u5f00\u542f\u63d2\u4ef6\uff0c\u5e76\u914d\u7f6erocketmq,\u914d\u7f6e\u5982\u4e0b",id:"241-\u5f00\u542f\u63d2\u4ef6\u5e76\u914d\u7f6erocketmq\u914d\u7f6e\u5982\u4e0b",children:[]},{value:"2.4.2 \u914d\u7f6e\u9009\u62e9\u5668\u548c\u89c4\u5219\u5668",id:"242-\u914d\u7f6e\u9009\u62e9\u5668\u548c\u89c4\u5219\u5668",children:[]}]},{value:"2.5 Logging\u4fe1\u606f",id:"25-logging\u4fe1\u606f",children:[]},{value:"2.6 \u793a\u4f8b",id:"26-\u793a\u4f8b",children:[{value:"2.6.1 \u901a\u8fc7RocketMQ\u6536\u96c6\u8bf7\u6c42\u65e5\u5fd7",id:"261-\u901a\u8fc7rocketmq\u6536\u96c6\u8bf7\u6c42\u65e5\u5fd7",children:[]}]}],k={toc:g},o="wrapper";function d(t){let{components:e,...l}=t;return(0,r.kt)(o,(0,n.Z)({},k,l,{components:e,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"1-\u6982\u8ff0"},"1. \u6982\u8ff0"),(0,r.kt)("h2",{id:"11-\u63d2\u4ef6\u540d\u79f0"},"1.1 \u63d2\u4ef6\u540d\u79f0"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Logging-RocketMQ Plugin")),(0,r.kt)("h2",{id:"12-\u9002\u7528\u573a\u666f"},"1.2 \u9002\u7528\u573a\u666f"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"\u901a\u8fc7rocketmq\u6536\u96c6\u7f51\u5173http\u8bf7\u6c42\u65e5\u5fd7\uff0c\u901a\u8fc7\u5176\u4ed6\u5e94\u7528\u6d88\u8d39rocketmq\u6d88\u606f\uff0c\u5e76\u4e14\u5bf9\u65e5\u5fd7\u8fdb\u884c\u5206\u6790\u3002")),(0,r.kt)("h2",{id:"13-\u63d2\u4ef6\u529f\u80fd"},"1.3 \u63d2\u4ef6\u529f\u80fd"),(0,r.kt)("blockquote",null,(0,r.kt)("p",{parentName:"blockquote"},(0,r.kt)("inlineCode",{parentName:"p"},"Apache ShenYu")," \u7f51\u5173\u63a5\u6536\u5ba2\u6237\u7aef\u8bf7\u6c42\uff0c\u5411\u670d\u52a1\u7aef\u8f6c\u53d1\u8bf7\u6c42\uff0c\u5e76\u5c06\u670d\u52a1\u7aef\u7ed3\u679c\u8fd4\u56de\u7ed9\u5ba2\u6237\u7aef.\u7f51\u5173\u53ef\u4ee5\u8bb0\u5f55\u4e0b\u6bcf\u6b21\u8bf7\u6c42\u5bf9\u5e94\u7684\u8be6\u7ec6\u4fe1\u606f\uff0c",(0,r.kt)("br",{parentName:"p"}),"\n","\u5217\u5982\uff1a \u8bf7\u6c42\u65f6\u95f4\u3001\u8bf7\u6c42\u53c2\u6570\u3001\u8bf7\u6c42\u8def\u5f84\u3001\u54cd\u5e94\u7ed3\u679c\u3001\u54cd\u5e94\u72b6\u6001\u7801\u3001\u8017\u65f6\u3001\u4e0a\u6e38IP\u3001\u5f02\u5e38\u4fe1\u606f\u7b49\u5f85.",(0,r.kt)("br",{parentName:"p"}),"\n","Logging-RocketMQ\u63d2\u4ef6\u4fbf\u662f\u8bb0\u5f55\u8bbf\u95ee\u65e5\u5fd7\u5e76\u5c06\u8bbf\u95ee\u65e5\u5fd7\u53d1\u9001\u5230RocketMQ\u96c6\u7fa4\u7684\u63d2\u4ef6.")),(0,r.kt)("h2",{id:"14-\u63d2\u4ef6\u4ee3\u7801"},"1.4 \u63d2\u4ef6\u4ee3\u7801"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"\u6838\u5fc3\u6a21\u5757 ",(0,r.kt)("inlineCode",{parentName:"p"},"shenyu-plugin-logging-rocketmq"),".")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"\u6838\u5fc3\u7c7b ",(0,r.kt)("inlineCode",{parentName:"p"},"org.apache.shenyu.plugin.logging.rocketmq.LoggingRocketMQPlugin"))),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"\u6838\u5fc3\u7c7b ",(0,r.kt)("inlineCode",{parentName:"p"},"org.apache.shenyu.plugin.logging.rocketmq.client.RocketMQLogCollectClient")))),(0,r.kt)("h2",{id:"15-\u6dfb\u52a0\u81ea\u54ea\u4e2ashenyu\u7248\u672c"},"1.5 \u6dfb\u52a0\u81ea\u54ea\u4e2ashenyu\u7248\u672c"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"ShenYu 2.5.0")),(0,r.kt)("h2",{id:"16-\u6280\u672f\u65b9\u6848"},"1.6 \u6280\u672f\u65b9\u6848"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"\u67b6\u6784\u56fe",(0,r.kt)("br",{parentName:"p"}),"\n",(0,r.kt)("img",{src:a(23878).Z}))),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"\u5728 ",(0,r.kt)("inlineCode",{parentName:"p"},"Apache ShenYu")," \u7f51\u5173\u91cc\u9762\u8fdb\u884c ",(0,r.kt)("inlineCode",{parentName:"p"},"Logging")," \u5168\u7a0b\u5f02\u6b65\u91c7\u96c6\u3001\u5f02\u6b65\u53d1\u9001")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"\u65e5\u5fd7\u5e73\u53f0\u901a\u8fc7\u6d88\u8d39",(0,r.kt)("inlineCode",{parentName:"p"},"RocketMQ"),"\u96c6\u7fa4\u4e2d\u7684\u65e5\u5fd7\u8fdb\u884c\u843d\u5e93\uff0c\u518d\u4f7f\u7528",(0,r.kt)("inlineCode",{parentName:"p"},"Grafana"),"\u3001",(0,r.kt)("inlineCode",{parentName:"p"},"Kibana"),"\u6216\u8005\u5176\u5b83\u53ef\u89c6\u5316\u5e73\u53f0\u5c55\u793a"))),(0,r.kt)("h1",{id:"2-\u5982\u4f55\u4f7f\u7528\u63d2\u4ef6"},"2. \u5982\u4f55\u4f7f\u7528\u63d2\u4ef6"),(0,r.kt)("h2",{id:"21-\u63d2\u4ef6\u4f7f\u7528\u6d41\u7a0b\u56fe"},"2.1 \u63d2\u4ef6\u4f7f\u7528\u6d41\u7a0b\u56fe"),(0,r.kt)("p",null,(0,r.kt)("img",{src:a(26692).Z})),(0,r.kt)("h2",{id:"22-\u5bfc\u5165pom"},"2.2 \u5bfc\u5165pom"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"\u5728\u7f51\u5173\u7684 ",(0,r.kt)("inlineCode",{parentName:"li"},"pom.xml")," \u6587\u4ef6\u4e2d\u6dfb\u52a0 ",(0,r.kt)("inlineCode",{parentName:"li"},"Logging-RocketMQ")," \u7684\u4f9d\u8d56\u3002")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-xml"}," \x3c!--shenyu logging-rocketmq plugin start--\x3e\n<dependency>\n    <groupId>org.apache.shenyu</groupId>\n    <artifactId>shenyu-spring-boot-starter-plugin-logging-rocketmq</artifactId>\n    <version>${project.version}</version>\n</dependency>\n\x3c!--shenyu logging-rocketmq plugin end--\x3e\n")),(0,r.kt)("h2",{id:"23-\u542f\u7528\u63d2\u4ef6"},"2.3 \u542f\u7528\u63d2\u4ef6"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"\u5728 ",(0,r.kt)("inlineCode",{parentName:"li"},"shenyu-admin"),"--\x3e \u57fa\u7840\u914d\u7f6e --\x3e \u63d2\u4ef6\u7ba1\u7406-> ",(0,r.kt)("inlineCode",{parentName:"li"},"loggingRocketMQ")," \uff0c\u914d\u7f6erocketMQ\u53c2\u6570\uff0c\u5e76\u8bbe\u7f6e\u4e3a\u5f00\u542f\u3002")),(0,r.kt)("h2",{id:"24-\u914d\u7f6e\u63d2\u4ef6"},"2.4 \u914d\u7f6e\u63d2\u4ef6"),(0,r.kt)("h3",{id:"241-\u5f00\u542f\u63d2\u4ef6\u5e76\u914d\u7f6erocketmq\u914d\u7f6e\u5982\u4e0b"},"2.4.1 \u5f00\u542f\u63d2\u4ef6\uff0c\u5e76\u914d\u7f6erocketmq,\u914d\u7f6e\u5982\u4e0b"),(0,r.kt)("p",null,(0,r.kt)("img",{src:a(15901).Z})),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"\u5404\u4e2a\u914d\u7f6e\u9879\u8bf4\u660e\u5982\u4e0b\uff1a")),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:"left"},"\u914d\u7f6e\u9879"),(0,r.kt)("th",{parentName:"tr",align:"left"},"\u7c7b\u578b"),(0,r.kt)("th",{parentName:"tr",align:"left"},"\u8bf4\u660e"),(0,r.kt)("th",{parentName:"tr",align:"left"},"\u5907\u6ce8"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},"config-item"),(0,r.kt)("td",{parentName:"tr",align:"left"},"type"),(0,r.kt)("td",{parentName:"tr",align:"left"},"description"),(0,r.kt)("td",{parentName:"tr",align:"left"},"remarks")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},"topic"),(0,r.kt)("td",{parentName:"tr",align:"left"},"String"),(0,r.kt)("td",{parentName:"tr",align:"left"},"\u6d88\u606f\u961f\u5217\u4e3b\u9898"),(0,r.kt)("td",{parentName:"tr",align:"left"},"\u5fc5\u987b")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},"namesrvAddr"),(0,r.kt)("td",{parentName:"tr",align:"left"},"String"),(0,r.kt)("td",{parentName:"tr",align:"left"},"\u6d88\u606f\u961f\u5217\u547d\u540d\u670d\u52a1\u5668\u5730\u5740"),(0,r.kt)("td",{parentName:"tr",align:"left"},"\u5fc5\u987b")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},"producerGroup"),(0,r.kt)("td",{parentName:"tr",align:"left"},"String"),(0,r.kt)("td",{parentName:"tr",align:"left"},"\u65e5\u5fd7\u6d88\u606f\u751f\u4ea7\u8005\u7ec4"),(0,r.kt)("td",{parentName:"tr",align:"left"},"\u5fc5\u987b")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},"sampleRate"),(0,r.kt)("td",{parentName:"tr",align:"left"},"String"),(0,r.kt)("td",{parentName:"tr",align:"left"},"\u91c7\u6837\u7387\uff0c\u8303\u56f40~1\uff0c0\uff1a\u5173\u95ed\uff0c0.01:\u91c7\u96c61%\uff0c1\uff1a\u91c7\u96c6100%"),(0,r.kt)("td",{parentName:"tr",align:"left"},"\u53ef\u9009\uff0c\u9ed8\u8ba41\uff0c\u5168\u90e8\u91c7\u96c6")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},"compressAlg"),(0,r.kt)("td",{parentName:"tr",align:"left"},"String"),(0,r.kt)("td",{parentName:"tr",align:"left"},"\u538b\u7f29\u7b97\u6cd5\uff0c\u9ed8\u8ba4\u4e0d\u538b\u7f29\uff0c\u76ee\u524d\u652f\u6301LZ4\u538b\u7f29"),(0,r.kt)("td",{parentName:"tr",align:"left"},"\u53ef\u9009\uff0c\u9ed8\u8ba4\u4e0d\u538b\u7f29")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},"maxResponseBody"),(0,r.kt)("td",{parentName:"tr",align:"left"},"Ingeter"),(0,r.kt)("td",{parentName:"tr",align:"left"},"\u6700\u5927\u54cd\u5e94\u4f53\u5927\u5c0f\uff0c\u8d85\u8fc7\u9608\u503c\u5c06\u4e0d\u91c7\u96c6\u54cd\u5e94\u4f53"),(0,r.kt)("td",{parentName:"tr",align:"left"},"\u53ef\u9009\uff0c\u9ed8\u8ba4512KB")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},"maxRequestBody"),(0,r.kt)("td",{parentName:"tr",align:"left"},"Ingeter"),(0,r.kt)("td",{parentName:"tr",align:"left"},"\u6700\u5927\u8bf7\u6c42\u4f53\u5927\u5c0f\uff0c\u8d85\u8fc7\u9608\u503c\u5c06\u4e0d\u91c7\u96c6\u8bf7\u6c42\u4f53"),(0,r.kt)("td",{parentName:"tr",align:"left"},"\u53ef\u9009\uff0c\u9ed8\u8ba4512KB")))),(0,r.kt)("p",null,(0,r.kt)("em",{parentName:"p"},"\u9664\u4e86topic\u3001namesrvAddr, producerGroup\u5176\u5b83\u90fd\u662f\u53ef\u9009"),"\uff0c\u5927\u90e8\u5206\u60c5\u51b5\u4e0b\u53ea\u9700\u8981\u914d\u7f6e\u8fd93\u9879\u5c31\u53ef\u4ee5\u4e86\u3002"),(0,r.kt)("h3",{id:"242-\u914d\u7f6e\u9009\u62e9\u5668\u548c\u89c4\u5219\u5668"},"2.4.2 \u914d\u7f6e\u9009\u62e9\u5668\u548c\u89c4\u5219\u5668"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"\u9009\u62e9\u5668\u548c\u89c4\u5219\u8be6\u7ec6\u914d\u7f6e\uff0c\u8bf7\u53c2\u8003: ",(0,r.kt)("a",{parentName:"li",href:"../../user-guide/admin-usage/selector-and-rule"},"\u9009\u62e9\u5668\u548c\u89c4\u5219\u7ba1\u7406"),"\u3002")),(0,r.kt)("p",null,"\u53e6\u5916\u6709\u65f6\u5019\u4e00\u4e2a\u5927\u7f51\u5173\u96c6\u7fa4\u5bf9\u5e94\u591a\u4e2a\u5e94\u7528\u7a0b\u5e8f\uff08\u4e1a\u52a1\uff09\uff0c\u4e0d\u540c\u5e94\u7528\u7a0b\u5e8f\uff08\u4e1a\u52a1\uff09\u5bf9\u5e94\u4e0d\u540c\u7684\u4e3b\u9898\uff0c\u76f8\u5173\u9694\u79bb\uff0c\u8fd9\u65f6\u5019\u53ef\u4ee5\u6309\u9009\u62e9\u5668\u914d\u7f6e\u4e0d\u540c\u7684\u4e3b\u9898(\u53ef\u9009)\u548c\u91c7\u6837\u7387(\u53ef\u9009)\uff0c\u914d\u7f6e\u9879\u7684\u542b\u4e49\u5982\u4e0a\u8868\u6240\u793a\u3002",(0,r.kt)("br",{parentName:"p"}),"\n","\u64cd\u4f5c\u5982\u4e0b\u56fe\uff1a",(0,r.kt)("br",{parentName:"p"}),"\n",(0,r.kt)("img",{src:a(26437).Z})),(0,r.kt)("h2",{id:"25-logging\u4fe1\u606f"},"2.5 Logging\u4fe1\u606f"),(0,r.kt)("p",null,"\u91c7\u96c6\u7684access log\u7684\u5b57\u6bb5\u5982\u4e0b\uff1a"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:"left"},"\u5b57\u6bb5\u540d\u79f0"),(0,r.kt)("th",{parentName:"tr",align:"center"},"\u542b\u4e49"),(0,r.kt)("th",{parentName:"tr",align:"left"},"\u8bf4\u660e"),(0,r.kt)("th",{parentName:"tr",align:"left"},"\u5907\u6ce8"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},"clientIp"),(0,r.kt)("td",{parentName:"tr",align:"center"},"\u5ba2\u6237\u7aefIP"),(0,r.kt)("td",{parentName:"tr",align:"left"}),(0,r.kt)("td",{parentName:"tr",align:"left"})),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},"timeLocal"),(0,r.kt)("td",{parentName:"tr",align:"center"},"\u8bf7\u6c42\u65f6\u95f4\u5b57\u7b26\u4e32,  \u683c\u5f0f\uff1ayyyy-MM-dd HH:mm:ss.SSS"),(0,r.kt)("td",{parentName:"tr",align:"left"}),(0,r.kt)("td",{parentName:"tr",align:"left"})),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},"method"),(0,r.kt)("td",{parentName:"tr",align:"center"},"\u8bf7\u6c42\u65b9\u6cd5(\u4e0d\u540crpc\u7c7b\u578b\u4e0d\u4e00\u6837\uff0chttp\u7c7b\u7684\u4e3a:get,post\u7b49\u5f85\uff0crpc\u7c7b\u7684\u4e3a\u63a5\u53e3\u540d\u79f0)"),(0,r.kt)("td",{parentName:"tr",align:"left"}),(0,r.kt)("td",{parentName:"tr",align:"left"})),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},"requestHeader"),(0,r.kt)("td",{parentName:"tr",align:"center"},"\u8bf7\u6c42\u5934(json\u683c\u5f0f)"),(0,r.kt)("td",{parentName:"tr",align:"left"}),(0,r.kt)("td",{parentName:"tr",align:"left"})),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},"responseHeader"),(0,r.kt)("td",{parentName:"tr",align:"center"},"\u54cd\u5e94\u5934(json\u683c\u5f0f)"),(0,r.kt)("td",{parentName:"tr",align:"left"}),(0,r.kt)("td",{parentName:"tr",align:"left"})),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},"queryParams"),(0,r.kt)("td",{parentName:"tr",align:"center"},"\u8bf7\u6c42\u67e5\u8be2\u53c2\u6570"),(0,r.kt)("td",{parentName:"tr",align:"left"}),(0,r.kt)("td",{parentName:"tr",align:"left"})),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},"requestBody"),(0,r.kt)("td",{parentName:"tr",align:"center"},"\u8bf7\u6c42Body\uff08\u4e8c\u8fdb\u5236\u7c7b\u578b\u7684body\u4e0d\u4f1a\u91c7\u96c6\uff09"),(0,r.kt)("td",{parentName:"tr",align:"left"}),(0,r.kt)("td",{parentName:"tr",align:"left"})),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},"requestUri"),(0,r.kt)("td",{parentName:"tr",align:"center"},"\u8bf7\u6c42uri"),(0,r.kt)("td",{parentName:"tr",align:"left"}),(0,r.kt)("td",{parentName:"tr",align:"left"})),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},"responseBody"),(0,r.kt)("td",{parentName:"tr",align:"center"},"\u54cd\u5e94body"),(0,r.kt)("td",{parentName:"tr",align:"left"}),(0,r.kt)("td",{parentName:"tr",align:"left"})),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},"responseContentLength"),(0,r.kt)("td",{parentName:"tr",align:"center"},"\u54cd\u5e94body\u5927\u5c0f"),(0,r.kt)("td",{parentName:"tr",align:"left"}),(0,r.kt)("td",{parentName:"tr",align:"left"})),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},"rpcType"),(0,r.kt)("td",{parentName:"tr",align:"center"},"rpc\u7c7b\u578b"),(0,r.kt)("td",{parentName:"tr",align:"left"}),(0,r.kt)("td",{parentName:"tr",align:"left"})),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},"status"),(0,r.kt)("td",{parentName:"tr",align:"center"},"\u54cd\u5e94\u7801"),(0,r.kt)("td",{parentName:"tr",align:"left"}),(0,r.kt)("td",{parentName:"tr",align:"left"})),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},"upstreamIp"),(0,r.kt)("td",{parentName:"tr",align:"center"},"\u4e0a\u6e38(\u63d0\u4f9b\u670d\u52a1\u7684\u7a0b\u5e8f)IP"),(0,r.kt)("td",{parentName:"tr",align:"left"}),(0,r.kt)("td",{parentName:"tr",align:"left"})),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},"upstreamResponseTime"),(0,r.kt)("td",{parentName:"tr",align:"center"},"\u4e0a\u6e38(\u63d0\u4f9b\u670d\u52a1\u7684\u7a0b\u5e8f)\u54cd\u5e94\u8bf7\u6c42\u7684\u8017\u65f6(\u6beb\u79d2ms)"),(0,r.kt)("td",{parentName:"tr",align:"left"}),(0,r.kt)("td",{parentName:"tr",align:"left"})),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},"userAgent"),(0,r.kt)("td",{parentName:"tr",align:"center"},"\u8bf7\u6c42\u7684\u7528\u6237\u4ee3\u7406"),(0,r.kt)("td",{parentName:"tr",align:"left"}),(0,r.kt)("td",{parentName:"tr",align:"left"})),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},"host"),(0,r.kt)("td",{parentName:"tr",align:"center"},"\u8bf7\u6c42\u7684host"),(0,r.kt)("td",{parentName:"tr",align:"left"}),(0,r.kt)("td",{parentName:"tr",align:"left"})),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},"module"),(0,r.kt)("td",{parentName:"tr",align:"center"},"\u8bf7\u6c42\u7684\u6a21\u5757"),(0,r.kt)("td",{parentName:"tr",align:"left"}),(0,r.kt)("td",{parentName:"tr",align:"left"})),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},"path"),(0,r.kt)("td",{parentName:"tr",align:"center"},"\u8bf7\u6c42\u7684\u8def\u5f84path"),(0,r.kt)("td",{parentName:"tr",align:"left"}),(0,r.kt)("td",{parentName:"tr",align:"left"})),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},"traceId"),(0,r.kt)("td",{parentName:"tr",align:"center"},"\u8bf7\u6c42\u7684\u94fe\u8def\u8ffd\u8e2aID"),(0,r.kt)("td",{parentName:"tr",align:"left"},"\u9700\u8981\u63a5\u5165\u94fe\u8def\u8ffd\u8e2a\u63d2\u4ef6\uff0c\u5982skywalking,zipkin"),(0,r.kt)("td",{parentName:"tr",align:"left"})))),(0,r.kt)("h2",{id:"26-\u793a\u4f8b"},"2.6 \u793a\u4f8b"),(0,r.kt)("h3",{id:"261-\u901a\u8fc7rocketmq\u6536\u96c6\u8bf7\u6c42\u65e5\u5fd7"},"2.6.1 \u901a\u8fc7RocketMQ\u6536\u96c6\u8bf7\u6c42\u65e5\u5fd7"),(0,r.kt)("h4",{id:"2611-\u63d2\u4ef6\u914d\u7f6e"},"2.6.1.1 \u63d2\u4ef6\u914d\u7f6e"),(0,r.kt)("p",null,"\u5f00\u542f\u63d2\u4ef6\uff0c\u5e76\u914d\u7f6erocketmq,\u914d\u7f6e\u5982\u4e0b\uff1a"),(0,r.kt)("p",null,(0,r.kt)("img",{src:a(15901).Z})),(0,r.kt)("h4",{id:"2612-\u9009\u62e9\u5668\u914d\u7f6e"},"2.6.1.2 \u9009\u62e9\u5668\u914d\u7f6e"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"\u9009\u62e9\u5668\u548c\u89c4\u5219\u8be6\u7ec6\u914d\u7f6e\uff0c\u8bf7\u53c2\u8003: ",(0,r.kt)("a",{parentName:"li",href:"../../user-guide/admin-usage/selector-and-rule"},"\u9009\u62e9\u5668\u548c\u89c4\u5219\u7ba1\u7406"),"\u3002")),(0,r.kt)("p",null,"\u53e6\u5916\u6709\u65f6\u5019\u4e00\u4e2a\u5927\u7f51\u5173\u96c6\u7fa4\u5bf9\u5e94\u591a\u4e2a\u5e94\u7528\u7a0b\u5e8f\uff08\u4e1a\u52a1\uff09\uff0c\u4e0d\u540c\u5e94\u7528\u7a0b\u5e8f\uff08\u4e1a\u52a1\uff09\u5bf9\u5e94\u4e0d\u540c\u7684\u4e3b\u9898\uff0c\u76f8\u5173\u9694\u79bb\uff0c\u8fd9\u65f6\u5019\u53ef\u4ee5\u6309\u9009\u62e9\u5668\u914d\u7f6e\u4e0d\u540c\u7684\u4e3b\u9898(\u53ef\u9009)\u548c\u91c7\u6837\u7387(\u53ef\u9009)\uff0c\u914d\u7f6e\u9879\u7684\u542b\u4e49\u5982\u4e0a\u8868\u6240\u793a\u3002",(0,r.kt)("br",{parentName:"p"}),"\n","\u64cd\u4f5c\u5982\u4e0b\u56fe\uff1a",(0,r.kt)("br",{parentName:"p"}),"\n",(0,r.kt)("img",{src:a(26437).Z})),(0,r.kt)("h4",{id:"2613-\u89c4\u5219\u914d\u7f6e"},"2.6.1.3 \u89c4\u5219\u914d\u7f6e"),(0,r.kt)("p",null,(0,r.kt)("img",{src:a(88646).Z})),(0,r.kt)("h4",{id:"2614-\u8bf7\u6c42\u670d\u52a1"},"2.6.1.4 \u8bf7\u6c42\u670d\u52a1"),(0,r.kt)("p",null,(0,r.kt)("img",{src:a(64474).Z})),(0,r.kt)("h4",{id:"2615-\u6d88\u8d39\u4ee5\u53ca\u5c55\u793alogging"},"2.6.1.5 \u6d88\u8d39\u4ee5\u53ca\u5c55\u793aLogging"),(0,r.kt)("p",null,"\u7531\u4e8e\u5404\u4e2a\u65e5\u5fd7\u5e73\u53f0\u6709\u5dee\u5f02\uff0c\u5982\u5b58\u50a8\u53ef\u7528clickhouse,ElasticSearch\u7b49\u5f85\uff0c\u53ef\u89c6\u5316\u6709\u81ea\u7814\u7684\u6216\u5f00\u6e90\u7684Grafana\u3001Kibana\u7b49\u3002",(0,r.kt)("br",{parentName:"p"}),"\n","Logging-RocketMQ\u63d2\u4ef6\u5229\u7528RocketMQ\u8fdb\u884c\u751f\u4ea7\u548c\u6d88\u8d39\u89e3\u8026\uff0c\u540c\u65f6\u4ee5json\u683c\u5f0f\u8f93\u51fa\u65e5\u5fd7\uff0c\u6d88\u8d39\u548c\u53ef\u89c6\u5316\u9700\u8981\u7528\u6237\u7ed3\u5408\u81ea\u8eab\u60c5\u51b5\u9009\u62e9\u4e0d\u540c\u7684\u6280\u672f\u6808\u6765\u5b9e\u73b0\u3002"),(0,r.kt)("h4",{id:"2616-\u9762\u677f\u5c55\u793a"},"2.6.1.6 \u9762\u677f\u5c55\u793a"),(0,r.kt)("p",null,"\u7528\u6237\u53ef\u6839\u636e\u81ea\u8eab\u60c5\u51b5\u9009\u62e9\u53ef\u89c6\u5316\u5b9e\u73b0\u3002",(0,r.kt)("br",{parentName:"p"}),"\n","\u4e0b\u9762\u5c55\u793a\u4e0b ",(0,r.kt)("inlineCode",{parentName:"p"},"Grafana")," \u6548\u679c\uff1a\n",(0,r.kt)("a",{parentName:"p",href:"https://play.grafana.org"},"Grafana\u6c99\u76d2\u4f53\u9a8c")),(0,r.kt)("p",null,(0,r.kt)("img",{src:a(61528).Z})),(0,r.kt)("h1",{id:"3-\u5982\u4f55\u7981\u7528\u63d2\u4ef6"},"3. \u5982\u4f55\u7981\u7528\u63d2\u4ef6"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"\u5728 ",(0,r.kt)("inlineCode",{parentName:"li"},"shenyu-admin")," --\x3e \u57fa\u7840\u914d\u7f6e --\x3e \u63d2\u4ef6\u7ba1\u7406-> loggingRocketMQ \uff0c\u8bbe\u7f6e\u4e3a\u5173\u95ed\u3002")),(0,r.kt)("p",null,(0,r.kt)("img",{src:a(21679).Z})))}d.isMDXComponent=!0},61528:(t,e,a)=>{a.d(e,{Z:()=>n});const n=a.p+"assets/images/grafana-loki-gateway-381810a5db3b2c0640dbe3fc4b99f5f5.png"},15901:(t,e,a)=>{a.d(e,{Z:()=>n});const n=a.p+"assets/images/logging-config-7d106f4fbe790030983a05d502a4279d.png"},26437:(t,e,a)=>{a.d(e,{Z:()=>n});const n=a.p+"assets/images/logging-option-topic-3b8012b954c5abe53da4a7d1a71b6957.png"},64474:(t,e,a)=>{a.d(e,{Z:()=>n});const n=a.p+"assets/images/call-service-ceeafb89bf58792af70883bdaedbcb93.png"},88646:(t,e,a)=>{a.d(e,{Z:()=>n});const n=a.p+"assets/images/log-rule-zh-8f391d68df1da1547987fd31767e18c9.jpg"},21679:(t,e,a)=>{a.d(e,{Z:()=>n});const n=a.p+"assets/images/logging-rocket-disabled-zh-1de73c0af510da47a5d34b17185c31d0.jpg"},23878:(t,e,a)=>{a.d(e,{Z:()=>n});const n=a.p+"assets/images/shenyu-agent-logging-arch-9071c054a78f807fac785e44ff908ca4.png"},26692:(t,e,a)=>{a.d(e,{Z:()=>n});const n=a.p+"assets/images/plugin_use_zh-cf88744e5c4b7cc85accbcf32af6e1a3.jpg"}}]);