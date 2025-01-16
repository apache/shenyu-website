"use strict";(self.webpackChunkshenyu_website=self.webpackChunkshenyu_website||[]).push([[62520],{15680:(e,n,l)=>{l.d(n,{xA:()=>p,yg:()=>d});var a=l(96540);function t(e,n,l){return n in e?Object.defineProperty(e,n,{value:l,enumerable:!0,configurable:!0,writable:!0}):e[n]=l,e}function r(e,n){var l=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),l.push.apply(l,a)}return l}function i(e){for(var n=1;n<arguments.length;n++){var l=null!=arguments[n]?arguments[n]:{};n%2?r(Object(l),!0).forEach((function(n){t(e,n,l[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(l)):r(Object(l)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(l,n))}))}return e}function o(e,n){if(null==e)return{};var l,a,t=function(e,n){if(null==e)return{};var l,a,t={},r=Object.keys(e);for(a=0;a<r.length;a++)l=r[a],n.indexOf(l)>=0||(t[l]=e[l]);return t}(e,n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)l=r[a],n.indexOf(l)>=0||Object.prototype.propertyIsEnumerable.call(e,l)&&(t[l]=e[l])}return t}var s=a.createContext({}),c=function(e){var n=a.useContext(s),l=n;return e&&(l="function"==typeof e?e(n):i(i({},n),e)),l},p=function(e){var n=c(e.components);return a.createElement(s.Provider,{value:n},e.children)},u="mdxType",g={inlineCode:"code",wrapper:function(e){var n=e.children;return a.createElement(a.Fragment,{},n)}},y=a.forwardRef((function(e,n){var l=e.components,t=e.mdxType,r=e.originalType,s=e.parentName,p=o(e,["components","mdxType","originalType","parentName"]),u=c(l),y=t,d=u["".concat(s,".").concat(y)]||u[y]||g[y]||r;return l?a.createElement(d,i(i({ref:n},p),{},{components:l})):a.createElement(d,i({ref:n},p))}));function d(e,n){var l=arguments,t=n&&n.mdxType;if("string"==typeof e||t){var r=l.length,i=new Array(r);i[0]=y;var o={};for(var s in n)hasOwnProperty.call(n,s)&&(o[s]=n[s]);o.originalType=e,o[u]="string"==typeof e?e:t,i[1]=o;for(var c=2;c<r;c++)i[c]=l[c];return a.createElement.apply(null,i)}return a.createElement.apply(null,l)}y.displayName="MDXCreateElement"},46517:(e,n,l)=>{l.r(n),l.d(n,{contentTitle:()=>i,default:()=>u,frontMatter:()=>r,metadata:()=>o,toc:()=>s});var a=l(58168),t=(l(96540),l(15680));const r={title:"\u670d\u52a1\u53d1\u73b0\u6a21\u5757",keywords:["Discovery"],description:"\u670d\u52a1\u53d1\u73b0\u6a21\u5757\u6a21\u5757"},i="\u670d\u52a1\u53d1\u73b0\u6a21\u5757",o={unversionedId:"user-guide/discovery/discovery-mode",id:"version-2.6.1/user-guide/discovery/discovery-mode",isDocsHomePage:!1,title:"\u670d\u52a1\u53d1\u73b0\u6a21\u5757",description:"\u670d\u52a1\u53d1\u73b0\u6a21\u5757\u6a21\u5757",source:"@site/i18n/zh/docusaurus-plugin-content-docs/version-2.6.1/user-guide/discovery/discovery-mode.md",sourceDirName:"user-guide/discovery",slug:"/user-guide/discovery/discovery-mode",permalink:"/zh/docs/2.6.1/user-guide/discovery/discovery-mode",editUrl:"https://github.com/apache/shenyu-website/edit/main/i18n/zh/docusaurus-plugin-content-docs/version-2.6.1/user-guide/discovery/discovery-mode.md",version:"2.6.1",frontMatter:{title:"\u670d\u52a1\u53d1\u73b0\u6a21\u5757",keywords:["Discovery"],description:"\u670d\u52a1\u53d1\u73b0\u6a21\u5757\u6a21\u5757"},sidebar:"version-2.6.0/tutorialSidebar",previous:{title:"\u4f7f\u7528Zookeeper\u63a5\u5165",permalink:"/zh/docs/2.6.1/user-guide/sdk-usage/shenyu-sdk-zookeeper"},next:{title:"Dubbo\u670d\u52a1\u63a5\u5165",permalink:"/zh/docs/2.6.1/user-guide/proxy/dubbo-proxy"}},s=[{value:"1. \u6982\u8ff0",id:"1-\u6982\u8ff0",children:[{value:"1.1 \u6a21\u5757\u540d\u79f0",id:"11-\u6a21\u5757\u540d\u79f0",children:[]},{value:"1.2 \u8bbe\u8ba1",id:"12-\u8bbe\u8ba1",children:[]},{value:"1.3 \u6a21\u5757\u529f\u80fd",id:"13-\u6a21\u5757\u529f\u80fd",children:[]},{value:"1.4 \u76d1\u542c\u6a21\u5f0f",id:"14-\u76d1\u542c\u6a21\u5f0f",children:[]},{value:"1.5 \u4f5c\u7528\u8303\u56f4",id:"15-\u4f5c\u7528\u8303\u56f4",children:[]}]},{value:"2. \u4f7f\u7528",id:"2-\u4f7f\u7528",children:[{value:"2.1 \u63d2\u4ef6\u7ea7\u522b\u914d\u7f6e",id:"21-\u63d2\u4ef6\u7ea7\u522b\u914d\u7f6e",children:[]},{value:"2.2 \u9009\u62e9\u5668\u7ea7\u522b\u914d\u7f6e",id:"22-\u9009\u62e9\u5668\u7ea7\u522b\u914d\u7f6e",children:[]}]},{value:"3. \u4e0d\u540c\u6a21\u5f0f\u4e0b\u7684\u914d\u7f6e",id:"3-\u4e0d\u540c\u6a21\u5f0f\u4e0b\u7684\u914d\u7f6e",children:[{value:"3.1 local\u6a21\u5f0f",id:"31-local\u6a21\u5f0f",children:[]},{value:"3.2 ZooKeeper/Nacos/Eureka/Etcd\u6a21\u5f0f",id:"32-zookeepernacoseurekaetcd\u6a21\u5f0f",children:[]}]},{value:"4. \u914d\u5408 Shenyu-client \u4f7f\u7528",id:"4-\u914d\u5408-shenyu-client-\u4f7f\u7528",children:[{value:"4.1 \u4ecb\u7ecd",id:"41-\u4ecb\u7ecd",children:[]},{value:"4.2 Local \u6a21\u5f0f\u793a\u4f8b",id:"42-local-\u6a21\u5f0f\u793a\u4f8b",children:[]},{value:"4.2 Zookeeper\u6a21\u5f0f\u793a\u4f8b",id:"42-zookeeper\u6a21\u5f0f\u793a\u4f8b",children:[]},{value:"4.3 Etcd\u793a\u4f8b",id:"43-etcd\u793a\u4f8b",children:[]},{value:"4.4 Eureka\u793a\u4f8b",id:"44-eureka\u793a\u4f8b",children:[]},{value:"4.5 Nacos\u793a\u4f8b",id:"45-nacos\u793a\u4f8b",children:[]}]},{value:"5. \u6ce8\u610f\u4e8b\u9879",id:"5-\u6ce8\u610f\u4e8b\u9879",children:[]},{value:"6. \u6d4b\u8bd5\u62a5\u544a",id:"6-\u6d4b\u8bd5\u62a5\u544a",children:[]}],c={toc:s},p="wrapper";function u(e){let{components:n,...r}=e;return(0,t.yg)(p,(0,a.A)({},c,r,{components:n,mdxType:"MDXLayout"}),(0,t.yg)("h1",{id:"\u670d\u52a1\u53d1\u73b0\u6a21\u5757"},"\u670d\u52a1\u53d1\u73b0\u6a21\u5757"),(0,t.yg)("h2",{id:"1-\u6982\u8ff0"},"1. \u6982\u8ff0"),(0,t.yg)("h3",{id:"11-\u6a21\u5757\u540d\u79f0"},"1.1 \u6a21\u5757\u540d\u79f0"),(0,t.yg)("p",null,"Discovery"),(0,t.yg)("h3",{id:"12-\u8bbe\u8ba1"},"1.2 \u8bbe\u8ba1"),(0,t.yg)("ul",null,(0,t.yg)("li",{parentName:"ul"},"\u6a21\u5757\u8bbe\u8ba1\u56fe\n",(0,t.yg)("img",{alt:"discovery-design.png",src:l(50841).A}))),(0,t.yg)("ul",null,(0,t.yg)("li",{parentName:"ul"},"\u6570\u636e\u5e93\u8bbe\u8ba1")),(0,t.yg)("p",null,(0,t.yg)("img",{alt:"db-design.png",src:l(74028).A})),(0,t.yg)("h3",{id:"13-\u6a21\u5757\u529f\u80fd"},"1.3 \u6a21\u5757\u529f\u80fd"),(0,t.yg)("p",null,"Discovery \u6a21\u5757\u8d4b\u4e88\u4e86 ShenYu \u7f51\u5173\u4e00\u79cd\u4e3b\u52a8\u611f\u77e5\u548c\u54cd\u5e94\u88ab\u4ee3\u7406\u670d\u52a1\u5217\u8868\u53d8\u5316\u7684\u80fd\u529b\u3002\n\u901a\u8fc7 Discovery \u7f51\u5173 admin \u670d\u52a1\u7684\u4e3b\u52a8\u76d1\u542c\uff0cShenYu \u7f51\u5173\u80fd\u591f\u53ca\u65f6\u638c\u63e1\u88ab\u4ee3\u7406\u670d\u52a1\u7684\u53d8\u52a8\u60c5\u51b5\u3002\n\u8fd9\u4e00\u529f\u80fd\u7684\u8bbe\u8ba1\u5177\u6709\u7075\u6d3b\u6027\uff0c\u53ef\u4ee5\u6839\u636e\u9700\u8981\u5728",(0,t.yg)("strong",{parentName:"p"},"\u9009\u62e9\u5668\u7ea7\u522b"),"\u6216",(0,t.yg)("strong",{parentName:"p"},"\u63d2\u4ef6\u7ea7\u522b"),"\u8fdb\u884c\u914d\u7f6e\u3002\n\u76ee\u524d\uff0c\u5df2\u7ecf\u5f15\u5165\u4e86 Discovery \u529f\u80fd\u7684\u63d2\u4ef6\u5305\u62ec TCP \u63d2\u4ef6\u3001Divide \u63d2\u4ef6\u3001Websocket \u63d2\u4ef6\u548c gRPC \u63d2\u4ef6\u3002"),(0,t.yg)("h3",{id:"14-\u76d1\u542c\u6a21\u5f0f"},"1.4 \u76d1\u542c\u6a21\u5f0f"),(0,t.yg)("p",null,"LOCAL, ZOOKEEPER, NACOS, EUREKA, ETCD"),(0,t.yg)("ul",null,(0,t.yg)("li",{parentName:"ul"},"LOCAL \u6a21\u5f0f: \u4e3b\u8981\u4f9d\u9760\u624b\u52a8\u7ef4\u62a4 upstream \u5217\u8868\uff0c\u5e76\u63a8\u9001\u5230\u7f51\u5173\uff1b"),(0,t.yg)("li",{parentName:"ul"},"ZOOKEEPER \u6a21\u5f0f: \u76d1\u542c ZooKeeper \u4e2d\u6307\u5b9a\u8282\u70b9\u4e0b\u4e34\u65f6\u8282\u70b9\u7684\u53d8\u5316\u6765\u83b7\u53d6\u6570\u636e\uff1b"),(0,t.yg)("li",{parentName:"ul"},"NACOS \u6a21\u5f0f\uff1a\u76d1\u542c Nacos \u4e2d\u6307\u5b9a\u670d\u52a1\u540d\u79f0\u4e0b\u5b9e\u4f8b\u7684\u53d8\u5316\u6765\u83b7\u53d6\u6570\u636e\uff1b"),(0,t.yg)("li",{parentName:"ul"},"EUREKA \u6a21\u5f0f\uff1a \u76d1\u542c Eureka \u4e2d\u6307\u5b9a\u670d\u52a1\u540d\u79f0\u4e0b\u5b9e\u4f8b\u7684\u53d8\u5316\u6765\u83b7\u53d6\u6570\u636e\uff1b"),(0,t.yg)("li",{parentName:"ul"},"ETCD \u6a21\u5f0f\uff1a\u901a\u8fc7\u76d1\u542c etcd \u4e2d\u6307\u5b9a\u8282\u70b9\u952e\u503c\u5bf9\u7684\u53d8\u5316\u6765\u83b7\u53d6\u6570\u636e\u3002")),(0,t.yg)("h3",{id:"15-\u4f5c\u7528\u8303\u56f4"},"1.5 \u4f5c\u7528\u8303\u56f4"),(0,t.yg)("ul",null,(0,t.yg)("li",{parentName:"ul"},"\u63d2\u4ef6\u7ea7\u522b\uff1a\u5f71\u54cd\u6574\u4e2a\u63d2\u4ef6\uff0c\u6240\u6709\u8be5\u63d2\u4ef6\u4e0b\u7684\u9009\u62e9\u5668\u90fd\u5c06\u9ed8\u8ba4\u91c7\u7528\u5f53\u524d\u7684\u76d1\u542c\u6a21\u5f0f\uff1b"),(0,t.yg)("li",{parentName:"ul"},"\u9009\u62e9\u5668\u7ea7\u522b\uff1a\u9002\u7528\u4e8e\u5f53\u524d\u9009\u62e9\u5668\uff0c\u5bf9\u4e8e\u5f53\u524d\u63d2\u4ef6\u4e0b\u7684\u4e0d\u540c\u9009\u62e9\u5668\uff0c\u53ef\u4ee5\u4f7f\u7528\u4e0d\u540c\u7684\u76d1\u542c\u6a21\u5f0f\u3002")),(0,t.yg)("h2",{id:"2-\u4f7f\u7528"},"2. \u4f7f\u7528"),(0,t.yg)("h3",{id:"21-\u63d2\u4ef6\u7ea7\u522b\u914d\u7f6e"},"2.1 \u63d2\u4ef6\u7ea7\u522b\u914d\u7f6e"),(0,t.yg)("h4",{id:"211-\u670d\u52a1\u53d1\u73b0\u914d\u7f6e"},"2.1.1 \u670d\u52a1\u53d1\u73b0\u914d\u7f6e"),(0,t.yg)("ul",null,(0,t.yg)("li",{parentName:"ul"},"\u5728\u652f\u6301 Discovery \u6a21\u5757\u7684\u63d2\u4ef6\u4e2d\uff08\u5f53\u524d\u53ea\u6709 TCP \u63d2\u4ef6\u652f\u6301\u5728admin\u63a7\u5236\u53f0\u9875\u9762\uff0c\u8fdb\u884c\u63d2\u4ef6\u7ea7\u522b discovery \u914d\u7f6e\uff0c\u5176\u4ed6\u63d2\u4ef6\u53ef\u4ee5\u901a\u8fc7 shenyu-client \u8fdb\u884c\u63d2\u4ef6\u7ea7\u522b discovery \u914d\u7f6e\uff0c\u89c1\u4e0b\u6587\u4e2d\u7684\u201c\u914d\u5408Shenyu-client\u4f7f\u7528\u201d\uff09\uff0c \u70b9\u51fb ",(0,t.yg)("inlineCode",{parentName:"li"},"\u670d\u52a1\u53d1\u73b0\u914d\u7f6e"),"\uff0c \u5728\u5f39\u51fa\u7684\u8868\u5355\u4e2d\uff0c\u9009\u62e9\u9700\u8981\u7684\u76d1\u542c\u6a21\u5f0f\uff0c\n\u5e76\u586b\u5199\u670d\u52a1\u53d1\u73b0\u540d\u79f0\u3001\u6ce8\u518c\u670d\u52a1\u5668URL\u3001\u6ce8\u518c\u4e2d\u5fc3\u914d\u7f6e\u53c2\u6570\u7b49\uff1a")),(0,t.yg)("p",null,(0,t.yg)("img",{alt:"config-discovery-plugin-zh.png",src:l(48640).A})),(0,t.yg)("p",null,(0,t.yg)("img",{alt:"config-discovery-plugin-modal-zh.png",src:l(94416).A})),(0,t.yg)("h4",{id:"212-\u5728\u9009\u62e9\u5668\u4e2d\u4f7f\u7528"},"2.1.2 \u5728\u9009\u62e9\u5668\u4e2d\u4f7f\u7528"),(0,t.yg)("ul",null,(0,t.yg)("li",{parentName:"ul"},(0,t.yg)("p",{parentName:"li"},"\u70b9\u51fb ",(0,t.yg)("inlineCode",{parentName:"p"},"\u6dfb\u52a0\u9009\u62e9\u5668"),"\uff0c\u5728\u65b0\u589e\u9009\u62e9\u5668\u9875\u9762\u4e2d\uff0c\u6211\u4eec\u53d1\u73b0 ",(0,t.yg)("inlineCode",{parentName:"p"},"\u7c7b\u578b")," \u5f3a\u5236\u9009\u62e9\u521a\u624d\u914d\u7f6e\u7684\u63d2\u4ef6\u7ea7\u76d1\u542c\u6a21\u5f0f\uff0c\u8868\u793a\u6240\u6dfb\u52a0\u7684\u9009\u62e9\u5668\u4e5f\u5c06\u91c7\u7528\u76f8\u540c\u7684\u914d\u7f6e\u3002\n\u6b64\u65f6\uff0c\u4ec5\u9700\u8f93\u5165\u9700\u8981\u76d1\u542c\u7684 ",(0,t.yg)("inlineCode",{parentName:"p"},"\u76d1\u542c\u8282\u70b9")," \uff1a"),(0,t.yg)("p",{parentName:"li"},(0,t.yg)("img",{alt:"add-selector-under-plugin-discovery-zh.png",src:l(3600).A}))),(0,t.yg)("li",{parentName:"ul"},(0,t.yg)("p",{parentName:"li"},"\u8fd9\u91cc\u7684 ",(0,t.yg)("inlineCode",{parentName:"p"},"\u8f6c\u6362\u5904\u7406")," \u662f\u6307\uff0cShenYu \u89c4\u5b9a\u7684 upstream \u6ce8\u518c\u6570\u636e\u662f\u4ee5\u4e0b JSON \u683c\u5f0f\u4f20\u8f93\uff0c\u5305\u62ec\uff1a"),(0,t.yg)("ul",{parentName:"li"},(0,t.yg)("li",{parentName:"ul"},"url: upstream \u7684 url"),(0,t.yg)("li",{parentName:"ul"},"protocol: upstream \u7684\u901a\u4fe1\u534f\u8bae"),(0,t.yg)("li",{parentName:"ul"},"status: upstream \u8282\u70b9\u7684\u72b6\u6001 (0: healthy, 1: unhealthy)"),(0,t.yg)("li",{parentName:"ul"},"weight: \u6743\u91cd\uff0c\u8ba1\u7b97\u8d1f\u8f7d\u5747\u8861\u65f6\u4f7f\u7528")))),(0,t.yg)("pre",null,(0,t.yg)("code",{parentName:"pre",className:"language-json"},'{\n    "url": "127.0.0.1::6379", \n    "protocol": "tcp",\n    "status": 0,\n    "weight": 10\n}\n')),(0,t.yg)("ul",null,(0,t.yg)("li",{parentName:"ul"},"\u5982\u679c\u60a8\u7684\u670d\u52a1\u522b\u540d\u4e0eShenYu\u5b9a\u4e49\u7684JSON\u683c\u5f0f\u4e0d\u5339\u914d\uff0c\u60a8\u53ef\u4ee5\u5728 ",(0,t.yg)("inlineCode",{parentName:"li"},"\u8f6c\u6362\u5904\u7406"),' \u4e2d\u8fdb\u884c\u522b\u540d\u6620\u5c04\u3002\n\u4f8b\u5982\uff0c\u5982\u4e0a\u56fe\u6240\u793a\uff0c\u5982\u679c\u60a8\u9700\u8981\u5c06"status"\u6539\u4e3a"healthy"\uff0c\u800c\u4fdd\u7559\u5176\u4ed6\u952e\u4e0d\u53d8\uff0c\n\u8fdb\u884c\u5982\u4e0b\u64cd\u4f5c\uff1a\u8d77\u4e00\u4e2a\u65b0\u7684\u522b\u540d\uff0c\u5c06"status"\u6620\u5c04\u4e3a"healthy"\uff0c\n\u540c\u65f6\u4fdd\u7559\u539f\u6709JSON\u952e\u7684\u5f62\u5f0f\u3002'),(0,t.yg)("li",{parentName:"ul"},"\u8fdb\u884c\u9009\u62e9\u5668\u5269\u4f59\u7684\u5c5e\u6027\u7684\u914d\u7f6e\uff0c\u8be6\u60c5\u89c1\u5177\u4f53\u63d2\u4ef6\u5bf9\u5e94\u7684\u6587\u6863\u3002")),(0,t.yg)("h3",{id:"22-\u9009\u62e9\u5668\u7ea7\u522b\u914d\u7f6e"},"2.2 \u9009\u62e9\u5668\u7ea7\u522b\u914d\u7f6e"),(0,t.yg)("ul",null,(0,t.yg)("li",{parentName:"ul"},"\u5728\u652f\u6301 Discovery \u6a21\u5757\u7684\u63d2\u4ef6\u4e2d\uff0c\u70b9\u51fb ",(0,t.yg)("inlineCode",{parentName:"li"},"\u6dfb\u52a0\u9009\u62e9\u5668"),"\uff0c\u5728 ",(0,t.yg)("inlineCode",{parentName:"li"},"\u670d\u52a1\u53d1\u73b0")," \u6807\u7b7e\u9875\u4e2d\uff0c\n\u914d\u7f6e\u7c7b\u578b\u3001\u76d1\u542c\u8282\u70b9\u3001\u670d\u52a1\u5668URL\u5217\u8868\u3001\u6ce8\u518c\u4e2d\u5fc3\u53c2\u6570\u7b49\u5b57\u6bb5\u5185\u5bb9\uff0c\u914d\u7f6e\u5185\u5bb9\u4ec5\u5bf9\u5f53\u524d\u9009\u62e9\u5668\u6709\u6548\uff0c\u6bcf\u6b21\u65b0\u589e\u9009\u62e9\u5668\u9700\u8981\u91cd\u65b0\u914d\u7f6e\u3002")),(0,t.yg)("p",null,(0,t.yg)("img",{alt:"add-selector-zh.png",src:l(2830).A})),(0,t.yg)("ul",null,(0,t.yg)("li",{parentName:"ul"},"\u5bf9\u4e8eDivide\u3001gRPC\u3001Websocket\u63d2\u4ef6\uff0c\u6dfb\u52a0\u9009\u62e9\u5668\u9875\u9762\u6709 ",(0,t.yg)("inlineCode",{parentName:"li"},"\u5bfc\u5165\u540e\u53f0\u670d\u52a1\u53d1\u73b0\u914d\u7f6e")," \u529f\u80fd\uff0c\n\u6307\u7684\u662f\uff0c\u5982\u679c\u670d\u52a1\u63a5\u5165 ShenYu \u7f51\u5173\u65f6\u914d\u7f6e\u4e86 shenyu-discovery \u76f8\u5173\u7684\u5c5e\u6027\uff08\u89c1\u914d\u5408shenyu-client\u4f7f\u7528\uff09\uff0c\u53ef\u4ee5\u9009\u62e9\u5bfc\u5165\u5e76\u6cbf\u7528\u540e\u53f0\u7684\u914d\u7f6e\uff0c\u5982\u4e0b\u56fe\u6211\u4eec\u9996\u5148\u70b9\u51fb ",(0,t.yg)("inlineCode",{parentName:"li"},"\u5bfc\u5165\u540e\u53f0\u670d\u52a1\u53d1\u73b0\u914d\u7f6e")," \u67e5\u770b\u540e\u53f0\u914d\u7f6e:")),(0,t.yg)("p",null,(0,t.yg)("img",{alt:"config-import-zh.png",src:l(15723).A})),(0,t.yg)("ul",null,(0,t.yg)("li",{parentName:"ul"},"\u5982\u679c\u786e\u8ba4\u5bfc\u5165\uff0c\u70b9\u51fb\u540e\u53f0\u914d\u7f6e\u5f39\u51fa\u6846\u4e2d\u7684 ",(0,t.yg)("inlineCode",{parentName:"li"},"\u5bfc\u5165")," \u6309\u94ae\u540e\uff0c\u540e\u53f0\u7684\u670d\u52a1\u53d1\u73b0\u5c5e\u6027\u5c06\u4f1a\u81ea\u52a8\u586b\u5145\u8fdb\u8868\u5355\uff0c\n\u6b64\u65f6\u4ec5\u9700\u8981\u518d\u914d\u7f6e\u76d1\u542c\u8282\u70b9\uff1a")),(0,t.yg)("p",null,(0,t.yg)("img",{alt:"after-import-zh.png",src:l(77073).A})),(0,t.yg)("blockquote",null,(0,t.yg)("p",{parentName:"blockquote"},(0,t.yg)("strong",{parentName:"p"},"\u6ce8\u610f"),"\uff1a\u5982\u679c\u786e\u8ba4\u5bfc\u5165\u540e\u53f0\u914d\u7f6e\uff0c\u540e\u53f0\u7684\u670d\u52a1\u53d1\u73b0\u5c5e\u6027\u5c06\u4f1a\u81ea\u52a8\u586b\u5145\u8fdb\u8868\u5355\uff0c\u5e76\u6cbf\u7528\u4e4b\u524d\u7684discovery\u5bf9\u8c61\uff0c\n\u6b64\u65f6\uff0c\u5728\u8868\u5355\u4e2d\u4fee\u6539\u670d\u52a1\u53d1\u73b0\u5c5e\u6027\u5c06\u65e0\u6548\uff0c\u4f9d\u7136\u4fdd\u6301\u540e\u53f0\u914d\u7f6e\u3002")),(0,t.yg)("ul",null,(0,t.yg)("li",{parentName:"ul"},"\u82e5\u9009\u62e9\u4e86 LOCAL \u6a21\u5f0f\uff0c\u5219\u65e0\u9700\u63a5\u5165\u6ce8\u518c\u4e2d\u5fc3\uff0c\u7528\u6237\u9700\u8981\u624b\u52a8\u7ef4\u62a4 upstream \u5217\u8868\u3002")),(0,t.yg)("h2",{id:"3-\u4e0d\u540c\u6a21\u5f0f\u4e0b\u7684\u914d\u7f6e"},"3. \u4e0d\u540c\u6a21\u5f0f\u4e0b\u7684\u914d\u7f6e"),(0,t.yg)("h3",{id:"31-local\u6a21\u5f0f"},"3.1 local\u6a21\u5f0f"),(0,t.yg)("ul",null,(0,t.yg)("li",{parentName:"ul"},"local\u6a21\u5f0f\u53ea\u652f\u6301",(0,t.yg)("strong",{parentName:"li"},"\u9009\u62e9\u5668\u7ea7\u522b"),"\u7684\u914d\u7f6e\u3002\u65e0\u9700\u63a5\u5165\u6ce8\u518c\u4e2d\u5fc3\uff0c\u7528\u6237\u9700\u8981\u624b\u52a8\u7ef4\u62a4 upstream \u5217\u8868\u3002\u8fd9\u91cc\u7684\u5217\u8868\u662f\u4e00\u4e2a\u53ef\u7f16\u8f91\u8868\u683c\uff0c\n\u70b9\u51fb\u8868\u683c\u6bcf\u884c\u7684 ",(0,t.yg)("inlineCode",{parentName:"li"},"\u7f16\u8f91")," \u6309\u94ae\uff0c\u53ef\u4ee5\u5bf9 upstream \u7684\u6bcf\u4e2a\u53c2\u6570\u8fdb\u884c\u4fee\u6539\uff1a")),(0,t.yg)("p",null,(0,t.yg)("img",{alt:"local-selector-zh.png",src:l(57106).A})),(0,t.yg)("h3",{id:"32-zookeepernacoseurekaetcd\u6a21\u5f0f"},"3.2 ZooKeeper/Nacos/Eureka/Etcd\u6a21\u5f0f"),(0,t.yg)("ul",null,(0,t.yg)("li",{parentName:"ul"},"ZooKeeper/Nacos/Eureka/Etcd\u6a21\u5f0f\u4e0b\uff0c\u652f\u6301\u63d2\u4ef6\u7ea7\u522b\u548c\u9009\u62e9\u5668\u7ea7\u522b\u7684\u670d\u52a1\u53d1\u73b0\u914d\u7f6e\u3002"),(0,t.yg)("li",{parentName:"ul"},"\u9488\u5bf9\u6bcf\u4e2a\u6a21\u5f0f\u4e0b\u7684\u6ce8\u518c\u4e2d\u5fc3\u5c5e\u6027\uff0c\u4ee5zookeeper\u4e3a\u4f8b\uff0c\u7528\u6237\u53ef\u4ee5\u5728",(0,t.yg)("inlineCode",{parentName:"li"},"shenyu-admin")," --\x3e \u57fa\u7840\u914d\u7f6e --\x3e \u5b57\u5178\u7ba1\u7406 \u4e2d\uff0c\u641c\u7d22\u5b57\u5178\u540d\u79f0\u4e3a\u201czookeeper\u201d\uff0c\u5bf9\u9ed8\u8ba4\u5c5e\u6027\u5bf9\u5e94\u7684\u5b57\u5178\u503c\u8fdb\u884c\u4fee\u6539\u7f16\u8f91\n\uff08",(0,t.yg)("strong",{parentName:"li"},"\u6ce8\u610f"),"\uff1a\u4e0d\u53ef\u4fee\u6539\u5b57\u5178\u7c7b\u578b\u548c\u5b57\u5178\u540d\u79f0\uff09\u3002"),(0,t.yg)("li",{parentName:"ul"},"\u8fd9\u4e9b\u6a21\u5f0f\u4e0b\uff0c\u7f51\u5173\u4f1a\u52a8\u6001\u5730\u4ece\u6ce8\u518c\u4e2d\u5fc3\u83b7\u53d6\u670d\u52a1\u5b9e\u4f8b\u4fe1\u606f\uff0c\u670d\u52a1\u5b9e\u4f8b\u7684\u65b0\u589e\u3001\u4e0b\u7ebf\u3001\u4fee\u6539\u7b49\uff0c\u5c06\u4f1a\u5b9e\u65f6\u663e\u793a\u5728 upstream \u5217\u8868\u4e2d\u3002")),(0,t.yg)("p",null,(0,t.yg)("img",{alt:"zk_dict.png",src:l(14796).A})),(0,t.yg)("h2",{id:"4-\u914d\u5408-shenyu-client-\u4f7f\u7528"},"4. \u914d\u5408 Shenyu-client \u4f7f\u7528"),(0,t.yg)("h3",{id:"41-\u4ecb\u7ecd"},"4.1 \u4ecb\u7ecd"),(0,t.yg)("ul",null,(0,t.yg)("li",{parentName:"ul"},"\u4e0e shenyu-client \u914d\u5408\u4f7f\u7528\u9700\u8981\u4f9d\u8d56\u5bf9\u5e94\u6a21\u5f0f\u7684\u6ce8\u518c\u4e2d\u5fc3\u4e2d\u95f4\u4ef6\uff1azookeeper\uff0cnacos\uff0cetcd\uff0ceureka\uff0c\u8fd9\u4e9b\u6a21\u5f0f\u53ef\u4ee5\u901a\u8fc7Shenyu Admin\u5b9e\u73b0\u81ea\u52a8\u611f\u77e5\u670d\u52a1\u7684\u4e0a\u7ebf\u548c\u4e0b\u7ebf\u3002"),(0,t.yg)("li",{parentName:"ul"},"\u53e6\u5916\uff0c\u5982\u679c\u60a8\u4f7f\u7528\u4e86 local \u6a21\u5f0f\uff0c\u5219\u9700\u8981\u624b\u52a8\u7ef4\u62a4upstream\u5217\u8868\u3002"),(0,t.yg)("li",{parentName:"ul"},"shenyu-client \u4f7f\u7528\u8be6\u89c1 shenyu-client \u6a21\u5757\u3002")),(0,t.yg)("h3",{id:"42-local-\u6a21\u5f0f\u793a\u4f8b"},"4.2 Local \u6a21\u5f0f\u793a\u4f8b"),(0,t.yg)("h4",{id:"421-\u4f7f\u7528shenyu-client"},"4.2.1 \u4f7f\u7528shenyu-client"),(0,t.yg)("ul",null,(0,t.yg)("li",{parentName:"ul"},"shenyu-client \u9ed8\u8ba4\u4e3a Local\u6a21\u5f0f\uff0c\u65e0\u9700\u8fdb\u884c\u7279\u6b8a\u7684 discovery \u914d\u7f6e\uff0c\u4fbf\u53ef\u4ee5\u81ea\u52a8\u628a\u5f53\u524d\u670d\u52a1\u6ce8\u518c\u4e0a\u53bb\uff1b"),(0,t.yg)("li",{parentName:"ul"},"\u5bf9\u4e8e\u81ea\u52a8\u6ce8\u518c\u4e0a\u6765\u7684\u670d\u52a1\uff0c\u53ef\u4ee5\u624b\u52a8\u5728\u9875\u9762\u7684upstream\u5217\u8868\u8fdb\u884c\u6dfb\u52a0\u3001\u4fee\u6539\u548c\u5220\u9664\uff1a")),(0,t.yg)("p",null,(0,t.yg)("img",{alt:"local-selector-zh.png",src:l(57106).A})),(0,t.yg)("h4",{id:"422-\u4e0d\u4f7f\u7528shenyu-client"},"4.2.2 \u4e0d\u4f7f\u7528shenyu-client"),(0,t.yg)("ul",null,(0,t.yg)("li",{parentName:"ul"},"\u5982\u679c\u4e0d\u4f7f\u7528shenyu-client\uff0c\u4e5f\u53ef\u4ee5\u624b\u52a8\u5728 ",(0,t.yg)("inlineCode",{parentName:"li"},"\u6dfb\u52a0\u9009\u62e9\u5668")," \u7684 ",(0,t.yg)("inlineCode",{parentName:"li"},"\u670d\u52a1\u53d1\u73b0")," \u6807\u7b7e\u9875\u4e0a\u6dfb\u52a0\u3001\u4fee\u6539\u3001\u5220\u9664\u670d\u52a1\u4fe1\u606f\uff1a")),(0,t.yg)("p",null,(0,t.yg)("img",{alt:"add-selector-local-zh.png",src:l(69196).A})),(0,t.yg)("ul",null,(0,t.yg)("li",{parentName:"ul"},"\u914d\u7f6e\u9009\u62e9\u5668\u5176\u4ed6\u4fe1\u606f\uff1a")),(0,t.yg)("p",null,(0,t.yg)("img",{alt:"add-selector-basic-zh.png",src:l(10669).A})),(0,t.yg)("ul",null,(0,t.yg)("li",{parentName:"ul"},"\u914d\u7f6e\u89c4\u5219\uff1a")),(0,t.yg)("p",null,(0,t.yg)("img",{alt:"rule-zh.png",src:l(64587).A})),(0,t.yg)("ul",null,(0,t.yg)("li",{parentName:"ul"},"\u6d4b\u8bd5\u8fde\u63a5")),(0,t.yg)("pre",null,(0,t.yg)("code",{parentName:"pre",className:"language-text"},"curl http://localhost:9195/http/hello\n\nhello! I'm Shenyu-Gateway System. Welcome!% \n")),(0,t.yg)("h3",{id:"42-zookeeper\u6a21\u5f0f\u793a\u4f8b"},"4.2 Zookeeper\u6a21\u5f0f\u793a\u4f8b"),(0,t.yg)("p",null,"\uff08\u4ee5 Divide \u63d2\u4ef6\u4e3a\u4f8b\uff09"),(0,t.yg)("ul",null,(0,t.yg)("li",{parentName:"ul"},"\u6dfb\u52a0\u4f9d\u8d56")),(0,t.yg)("pre",null,(0,t.yg)("code",{parentName:"pre",className:"language-xml"},"<dependencies>\n  <dependency>\n    <groupId>org.apache.shenyu</groupId>\n    <artifactId>shenyu-discovery-zookeeper</artifactId>\n    <version>${project.version}</version>\n  </dependency>\n\n  <dependency>\n    <groupId>org.apache.shenyu</groupId>\n    <artifactId>shenyu-spring-boot-starter-client-http</artifactId>\n  </dependency>\n</dependencies>\n")),(0,t.yg)("ul",null,(0,t.yg)("li",{parentName:"ul"},"application.yml \u4e2d\u6dfb\u52a0\u5982\u4e0b\u914d\u7f6e")),(0,t.yg)("pre",null,(0,t.yg)("code",{parentName:"pre",className:"language-yaml"},"shenyu:\n   discovery:\n      enable: true\n      type: zookeeper\n      serverList: ${your.zookeeper.ip}:{your.zookeeper.port}\n      registerPath: /shenyu/discovery/demo_http_common\n      props:\n         baseSleepTimeMilliseconds: 1000\n         maxRetries: 4\n         maxSleepTimeMilliseconds: 5000\n         connectionTimeoutMilliseconds: 60000\n         sessionTimeoutMilliseconds: 8\n")),(0,t.yg)("ul",null,(0,t.yg)("li",{parentName:"ul"},"\u542f\u52a8\u670d\u52a1 shenyu-examples-http"),(0,t.yg)("li",{parentName:"ul"},"\u670d\u52a1\u6ce8\u518c\u6210\u529f\uff0c\u5728\u9009\u62e9\u5668\u9875\u9762\u53ef\u4ee5\u770b\u5230\u81ea\u52a8\u6ce8\u518c\u4e0a\u6765\u7684\u670d\u52a1\u5b9e\u4f8b\u5217\u8868\uff1a")),(0,t.yg)("p",null,(0,t.yg)("img",{alt:"zk-selector-zh.png",src:l(39520).A})),(0,t.yg)("ul",null,(0,t.yg)("li",{parentName:"ul"},"\u7528\u6237\u53ef\u4ee5\u70b9\u51fb\u670d\u52a1\u5b9e\u4f8b\u5217\u8868\u4e2d\u7684 ",(0,t.yg)("inlineCode",{parentName:"li"},"\u7f16\u8f91"),"\uff0c\u5bf9\u670d\u52a1\u5b9e\u4f8b\u4fe1\u606f\u8fdb\u884c\u7f16\u8f91\uff08\u975eLocal\u6a21\u5f0f\u4e0b\uff0cURL\u7531\u6ce8\u518c\u4e2d\u5fc3\u7ef4\u62a4\uff0c\u4e0d\u53ef\u624b\u52a8\u7f16\u8f91\uff09\uff1a")),(0,t.yg)("p",null,(0,t.yg)("img",{alt:"edit-zk-upstream-zh.png",src:l(31455).A})),(0,t.yg)("ul",null,(0,t.yg)("li",{parentName:"ul"},"\u6d4b\u8bd5\u8fde\u63a5")),(0,t.yg)("pre",null,(0,t.yg)("code",{parentName:"pre",className:"language-text"},"curl http://localhost:9195/http/hello\n\nhello! I'm Shenyu-Gateway System. Welcome!% \n")),(0,t.yg)("h3",{id:"43-etcd\u793a\u4f8b"},"4.3 Etcd\u793a\u4f8b"),(0,t.yg)("ul",null,(0,t.yg)("li",{parentName:"ul"},"\u6dfb\u52a0\u4f9d\u8d56")),(0,t.yg)("pre",null,(0,t.yg)("code",{parentName:"pre",className:"language-xml"},"<dependencies>\n  <dependency>\n    <groupId>org.apache.shenyu</groupId>\n    <artifactId>shenyu-discovery-etcd</artifactId>\n    <version>${project.version}</version>\n  </dependency>\n\n  <dependency>\n    <groupId>org.apache.shenyu</groupId>\n    <artifactId>shenyu-spring-boot-starter-client-http</artifactId>\n  </dependency>\n</dependencies>\n")),(0,t.yg)("ul",null,(0,t.yg)("li",{parentName:"ul"},"application.yml \u4e2d\u6dfb\u52a0\u5982\u4e0b\u914d\u7f6e")),(0,t.yg)("pre",null,(0,t.yg)("code",{parentName:"pre",className:"language-yaml"},"shenyu:\n   discovery:\n      enable: true\n      protocol: http://\n      type: etcd\n      serverList: http://${your.etcd.host}:${your.etcd.port}\n      registerPath: /shenyu/test/http_common\n      props:\n         etcdTimeout: 3000\n         etcdTTL: 5\n")),(0,t.yg)("ul",null,(0,t.yg)("li",{parentName:"ul"},"\u542f\u52a8\u670d\u52a1 shenyu-examples-http\uff0c\u540c\u6837\u5730\uff0c\u5728\u9009\u62e9\u5668\u9875\u9762\u53ef\u4ee5\u770b\u5230\u81ea\u52a8\u6ce8\u518c\u4e0a\u6765\u7684\u670d\u52a1\u5b9e\u4f8b\u5217\u8868\uff0c\u5e76\u53ef\u8fdb\u884c\u7f16\u8f91\uff1a")),(0,t.yg)("p",null,(0,t.yg)("img",{alt:"etcd-selector-zh.png",src:l(48503).A})),(0,t.yg)("ul",null,(0,t.yg)("li",{parentName:"ul"},"\u6d4b\u8bd5\u8fde\u63a5")),(0,t.yg)("pre",null,(0,t.yg)("code",{parentName:"pre",className:"language-text"},"curl http://localhost:9195/http/hello\n\nhello! I'm Shenyu-Gateway System. Welcome!% \n")),(0,t.yg)("h3",{id:"44-eureka\u793a\u4f8b"},"4.4 Eureka\u793a\u4f8b"),(0,t.yg)("ul",null,(0,t.yg)("li",{parentName:"ul"},"\u6dfb\u52a0\u4f9d\u8d56")),(0,t.yg)("pre",null,(0,t.yg)("code",{parentName:"pre",className:"language-xml"},"<dependencies>\n  <dependency>\n    <groupId>org.apache.shenyu</groupId>\n    <artifactId>shenyu-discovery-eureka</artifactId>\n    <version>${project.version}</version>\n  </dependency>\n\n  <dependency>\n    <groupId>org.apache.shenyu</groupId>\n    <artifactId>shenyu-spring-boot-starter-client-http</artifactId>\n  </dependency>\n</dependencies>\n")),(0,t.yg)("ul",null,(0,t.yg)("li",{parentName:"ul"},"application.yml \u4e2d\u6dfb\u52a0\u5982\u4e0b\u914d\u7f6e\uff08\u6b64\u5904\u7684 ",(0,t.yg)("inlineCode",{parentName:"li"},"registerPath")," \u53ef\u4ee5\u7406\u89e3\u4e3a\u9700\u8981\u76d1\u542c\u7684\u670d\u52a1\u7684\u540d\u79f0\uff09")),(0,t.yg)("pre",null,(0,t.yg)("code",{parentName:"pre",className:"language-yaml"},"shenyu:\n   discovery:\n      enable: true\n      protocol: http://\n      type: eureka\n      serverList: http://${your.eureka.host}:${your.eureka.port}/eureka\n      registerPath: shenyu_discovery_demo_http_common\n      props:\n         eurekaClientRefreshInterval: 10\n         eurekaClientRegistryFetchIntervalSeconds: 10\n")),(0,t.yg)("ul",null,(0,t.yg)("li",{parentName:"ul"},"\u542f\u52a8\u670d\u52a1 shenyu-examples-http\uff0c\u540c\u6837\u5730\uff0c\u5728\u9009\u62e9\u5668\u9875\u9762\u53ef\u4ee5\u770b\u5230\u81ea\u52a8\u6ce8\u518c\u4e0a\u6765\u7684\u670d\u52a1\u5b9e\u4f8b\u5217\u8868\uff0c\u5e76\u53ef\u8fdb\u884c\u7f16\u8f91\uff1a")),(0,t.yg)("p",null,(0,t.yg)("img",{alt:"eureka-selector-zh.png",src:l(11400).A})),(0,t.yg)("ul",null,(0,t.yg)("li",{parentName:"ul"},"\u6d4b\u8bd5\u8fde\u63a5")),(0,t.yg)("pre",null,(0,t.yg)("code",{parentName:"pre",className:"language-text"},"curl http://localhost:9195/http/hello\n\nhello! I'm Shenyu-Gateway System. Welcome!% \n")),(0,t.yg)("h3",{id:"45-nacos\u793a\u4f8b"},"4.5 Nacos\u793a\u4f8b"),(0,t.yg)("pre",null,(0,t.yg)("code",{parentName:"pre",className:"language-xml"},"<dependencies>\n  <dependency>\n    <groupId>org.apache.shenyu</groupId>\n    <artifactId>shenyu-discovery-eureka</artifactId>\n    <version>${project.version}</version>\n  </dependency>\n\n  <dependency>\n    <groupId>org.apache.shenyu</groupId>\n    <artifactId>shenyu-spring-boot-starter-client-http</artifactId>\n  </dependency>\n</dependencies>\n")),(0,t.yg)("ul",null,(0,t.yg)("li",{parentName:"ul"},"application.yml \u4e2d\u6dfb\u52a0\u5982\u4e0b\u914d\u7f6e\uff08\u6b64\u5904\u7684 ",(0,t.yg)("inlineCode",{parentName:"li"},"registerPath")," \u540c\u6837\u53ef\u4ee5\u7406\u89e3\u4e3a\u9700\u8981\u76d1\u542c\u7684\u670d\u52a1\u7684\u540d\u79f0\uff09")),(0,t.yg)("pre",null,(0,t.yg)("code",{parentName:"pre",className:"language-yaml"},"shenyu:\n   discovery:\n      enable: true\n      protocol: http://\n      type: nacos\n      serverList: ${your.nacos.host}:${your.nacos.port}\n      registerPath: shenyu_discovery_demo_http_common\n      props:\n         groupName: SHENYU_GROUP\n")),(0,t.yg)("ul",null,(0,t.yg)("li",{parentName:"ul"},"\u542f\u52a8\u670d\u52a1 shenyu-examples-http\uff0c\u540c\u6837\u5730\uff0c\u5728\u9009\u62e9\u5668\u9875\u9762\u53ef\u4ee5\u770b\u5230\u81ea\u52a8\u6ce8\u518c\u4e0a\u6765\u7684\u670d\u52a1\u5b9e\u4f8b\u5217\u8868\uff0c\u5e76\u53ef\u8fdb\u884c\u7f16\u8f91\uff1a")),(0,t.yg)("p",null,(0,t.yg)("img",{alt:"nacos-selector-zh.png",src:l(35295).A})),(0,t.yg)("ul",null,(0,t.yg)("li",{parentName:"ul"},"\u6d4b\u8bd5\u8fde\u63a5")),(0,t.yg)("pre",null,(0,t.yg)("code",{parentName:"pre",className:"language-text"},"curl http://localhost:9195/http/hello\n\nhello! I'm Shenyu-Gateway System. Welcome!% \n")),(0,t.yg)("blockquote",null,(0,t.yg)("p",{parentName:"blockquote"},(0,t.yg)("strong",{parentName:"p"},"\u6ce8\u610f"),"\uff1a\u901a\u8fc7shenyu-client\u914d\u7f6e\u670d\u52a1\u53d1\u73b0\uff0c\u672c\u8d28\u4e0a\u662f\u914d\u7f6e\u63d2\u4ef6\u7ea7\u522b\u7684\u670d\u52a1\u53d1\u73b0\uff0c\u540c\u4e00\u79cd\u670d\u52a1\u53d1\u73b0\u6a21\u5f0f\u4e0b\uff0c\n\u5b9e\u9645\u4e0a\u53ea\u6709\u4e00\u4e2adiscovery\u5bf9\u8c61\uff08\u5373\uff1a\u53ea\u80fd\u591f\u914d\u7f6e\u540c\u4e00\u5957\u7c7b\u578b-\u670d\u52a1\u5668URL-\u670d\u52a1\u53d1\u73b0\u53c2\u6570\uff09\uff0c\u76d1\u542c\u8282\u70b9\u53ef\u4ee5\u6709\u591a\u4e2a\u3002")),(0,t.yg)("p",null,(0,t.yg)("img",{alt:"ws-selector-zh.png",src:l(89075).A})),(0,t.yg)("blockquote",null,(0,t.yg)("p",{parentName:"blockquote"},(0,t.yg)("strong",{parentName:"p"},"\u6ce8\u610f"),"\uff1aDivide\u63d2\u4ef6\u548cGrpc\u63d2\u4ef6\u4e2d\uff0c\u53ef\u4ee5\u901a\u8fc7\u5728application.yml\u6587\u4ef6\u4e2d\u914d\u7f6eprotocol\u6765\u4fee\u6539\u534f\u8bae\uff0cWebsocket\n\u63d2\u4ef6\u7684\u534f\u8bae\u9ed8\u8ba4\u5747\u4e3aws")),(0,t.yg)("h2",{id:"5-\u6ce8\u610f\u4e8b\u9879"},"5. \u6ce8\u610f\u4e8b\u9879"),(0,t.yg)("ul",null,(0,t.yg)("li",{parentName:"ul"},"local \u6a21\u5f0f\u4e0b\uff0c\u53ef\u4ee5\u5728\u670d\u52a1\u5217\u8868\u9875\u9762\u4e0a\u624b\u52a8\u5bf9 upstream \u7684\u6240\u6709\u53c2\u6570\u8fdb\u884c\u4fee\u6539\uff1b"),(0,t.yg)("li",{parentName:"ul"},"\u975elocal\u6a21\u5f0f\u4e0b\uff0c\u53ef\u4ee5\u5bf9\u9664URL\u3001\u5f00\u59cb\u65f6\u95f4\u4ee5\u5916\u7684\u53c2\u6570\u8fdb\u884c\u624b\u52a8\u4fee\u6539\uff1b"),(0,t.yg)("li",{parentName:"ul"},"\u624b\u52a8\u4fee\u6539\u670d\u52a1\u5b9e\u4f8b\u7684\u72b6\u6001\uff08status\uff1aopen/close\uff09\uff0c\u6743\u91cd\uff08weight\uff09\uff0c\u4ec5\u5bf9\u5f53\u524d\u63d2\u4ef6\u751f\u6548\uff1b"),(0,t.yg)("li",{parentName:"ul"},"\u5bf9\u4e8e\u540c\u4e00\u63d2\u4ef6\uff0c\u540e\u53f0\u901a\u8fc7shenyu-client\u914d\u7f6ediscovery\u76f8\u5173\u53c2\u6570\u540e\uff0c\u672c\u8d28\u4e0a\u662f\u914d\u7f6e\u63d2\u4ef6\u7ea7\u522b\u7684\u670d\u52a1\u53d1\u73b0\uff0c\n\u63a7\u5236\u53f0\u9875\u9762\u4e0a\u53ef\u4ee5\u624b\u52a8\u6dfb\u52a0\u9009\u62e9\u5668\u4ee5\u914d\u7f6e\u9009\u62e9\u5668\u7ea7\u522b\u7684\u670d\u52a1\u53d1\u73b0\uff0c\u4f46\u5b9e\u9645\u4e0a\u53ea\u6709\u4e00\u4e2adiscovery\u5bf9\u8c61\uff08\u5373\uff1a\u53ea\u80fd\u591f\u914d\u7f6e\u540c\u4e00\u5957\u7c7b\u578b-\u670d\u52a1\u5668URL-\u670d\u52a1\u53d1\u73b0\u53c2\u6570\uff09\uff0c\u76d1\u542c\u8282\u70b9\u53ef\u4ee5\u6709\u591a\u4e2a\u3002")),(0,t.yg)("h2",{id:"6-\u6d4b\u8bd5\u62a5\u544a"},"6. \u6d4b\u8bd5\u62a5\u544a"),(0,t.yg)("p",null,(0,t.yg)("a",{parentName:"p",href:"https://www.yuque.com/eureca/pgotw1/hkqkk5laubspgwl3#UojLR"},"\u6d4b\u8bd5\u62a5\u544a")))}u.isMDXComponent=!0},10669:(e,n,l)=>{l.d(n,{A:()=>a});const a=l.p+"assets/images/add-selector-basic-zh-018de5a2903fe1c999a4bb1791f19d34.png"},69196:(e,n,l)=>{l.d(n,{A:()=>a});const a=l.p+"assets/images/add-selector-local-zh-74ad2d69ba92978e8a48a3c9c5ca7359.png"},3600:(e,n,l)=>{l.d(n,{A:()=>a});const a=l.p+"assets/images/add-selector-under-plugin-discovery-zh-209e12371778bd381c81f891bc5b9269.png"},2830:(e,n,l)=>{l.d(n,{A:()=>a});const a=l.p+"assets/images/add-selector-zh-558b3290577abf7aff8aef634b5423d6.png"},77073:(e,n,l)=>{l.d(n,{A:()=>a});const a=l.p+"assets/images/after-import-zh-2051f80bd25bf7a9e38a91fe822a0aa0.png"},94416:(e,n,l)=>{l.d(n,{A:()=>a});const a=l.p+"assets/images/config-discovery-plugin-modal-zh-edc63c57dde577c77516a315f4a21e21.png"},48640:(e,n,l)=>{l.d(n,{A:()=>a});const a=l.p+"assets/images/config-discovery-plugin-zh-bcec5da2cfc78d3bc79df8a4a91466bc.png"},15723:(e,n,l)=>{l.d(n,{A:()=>a});const a=l.p+"assets/images/config-import-zh-8b7051fb59bed2fa9ecef7f1a972ea36.png"},74028:(e,n,l)=>{l.d(n,{A:()=>a});const a=l.p+"assets/images/db-design-ace76c69c809afe5bf47464fc1b0209c.png"},50841:(e,n,l)=>{l.d(n,{A:()=>a});const a=l.p+"assets/images/discovery-design-3081f14fec1ef9322d39bd1b998f42a3.png"},31455:(e,n,l)=>{l.d(n,{A:()=>a});const a=l.p+"assets/images/edit-zk-upstream-zh-1e7756bb84698344887d30e751d8dcf3.png"},48503:(e,n,l)=>{l.d(n,{A:()=>a});const a=l.p+"assets/images/etcd-selector-zh-e7bb150ad7e878d032f1baa540009418.png"},11400:(e,n,l)=>{l.d(n,{A:()=>a});const a=l.p+"assets/images/eureka-selector-zh-7522272a0be602199c7f8241d75135ac.png"},57106:(e,n,l)=>{l.d(n,{A:()=>a});const a=l.p+"assets/images/local-selector-zh-cad721e357d63479c186cad558c519fe.png"},35295:(e,n,l)=>{l.d(n,{A:()=>a});const a=l.p+"assets/images/nacos-selector-zh-53fcc4c9f2ac6e62a3cbb611e56b20dd.png"},64587:(e,n,l)=>{l.d(n,{A:()=>a});const a=l.p+"assets/images/rule-zh-3bd8efcc436c5b2b9e3e75496fe518f7.png"},89075:(e,n,l)=>{l.d(n,{A:()=>a});const a=l.p+"assets/images/ws-selector-zh-20c8bbb55610c3ee75011b2029d692cc.png"},39520:(e,n,l)=>{l.d(n,{A:()=>a});const a=l.p+"assets/images/zk-selector-zh-7242eedc431d418a912858866d4fbfaa.png"},14796:(e,n,l)=>{l.d(n,{A:()=>a});const a=l.p+"assets/images/zk_dict_zh-7711eeddd9904ca431ad023400379950.png"}}]);