"use strict";(self.webpackChunkshenyu_website=self.webpackChunkshenyu_website||[]).push([[27567],{15680:(e,a,t)=>{t.d(a,{xA:()=>m,yg:()=>u});var l=t(96540);function n(e,a,t){return a in e?Object.defineProperty(e,a,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[a]=t,e}function r(e,a){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);a&&(l=l.filter((function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable}))),t.push.apply(t,l)}return t}function i(e){for(var a=1;a<arguments.length;a++){var t=null!=arguments[a]?arguments[a]:{};a%2?r(Object(t),!0).forEach((function(a){n(e,a,t[a])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):r(Object(t)).forEach((function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(t,a))}))}return e}function o(e,a){if(null==e)return{};var t,l,n=function(e,a){if(null==e)return{};var t,l,n={},r=Object.keys(e);for(l=0;l<r.length;l++)t=r[l],a.indexOf(t)>=0||(n[t]=e[t]);return n}(e,a);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(l=0;l<r.length;l++)t=r[l],a.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(n[t]=e[t])}return n}var p=l.createContext({}),y=function(e){var a=l.useContext(p),t=a;return e&&(t="function"==typeof e?e(a):i(i({},a),e)),t},m=function(e){var a=y(e.components);return l.createElement(p.Provider,{value:a},e.children)},g="mdxType",s={inlineCode:"code",wrapper:function(e){var a=e.children;return l.createElement(l.Fragment,{},a)}},c=l.forwardRef((function(e,a){var t=e.components,n=e.mdxType,r=e.originalType,p=e.parentName,m=o(e,["components","mdxType","originalType","parentName"]),g=y(t),c=n,u=g["".concat(p,".").concat(c)]||g[c]||s[c]||r;return t?l.createElement(u,i(i({ref:a},m),{},{components:t})):l.createElement(u,i({ref:a},m))}));function u(e,a){var t=arguments,n=a&&a.mdxType;if("string"==typeof e||n){var r=t.length,i=new Array(r);i[0]=c;var o={};for(var p in a)hasOwnProperty.call(a,p)&&(o[p]=a[p]);o.originalType=e,o[g]="string"==typeof e?e:n,i[1]=o;for(var y=2;y<r;y++)i[y]=t[y];return l.createElement.apply(null,i)}return l.createElement.apply(null,t)}c.displayName="MDXCreateElement"},48508:(e,a,t)=>{t.r(a),t.d(a,{contentTitle:()=>i,default:()=>g,frontMatter:()=>r,metadata:()=>o,toc:()=>p});var l=t(58168),n=(t(96540),t(15680));const r={title:"2.7.0",sidebar_position:3,keywords:["release-notes"],description:"release-notes"},i=void 0,o={unversionedId:"2.7.0-release",id:"2.7.0-release",isDocsHomePage:!1,title:"2.7.0",description:"release-notes",source:"@site/i18n/zh/docusaurus-plugin-content-docs-event/current/2.7.0-release.md",sourceDirName:".",slug:"/2.7.0-release",permalink:"/zh/event/2.7.0-release",editUrl:"https://github.com/apache/shenyu-website/edit/main/i18n/zh/docusaurus-plugin-content-docs-event/current/2.7.0-release.md",version:"current",lastUpdatedBy:"aias00",lastUpdatedAt:1736995477,formattedLastUpdatedAt:"2025/1/16",sidebarPosition:3,frontMatter:{title:"2.7.0",sidebar_position:3,keywords:["release-notes"],description:"release-notes"}},p=[{value:"2.7.0",id:"270",children:[{value:"\u2728 New Features",id:"-new-features",children:[]},{value:"\u26a1Enhancement",id:"enhancement",children:[]},{value:"\u267b\ufe0fRefactor",id:"\ufe0frefactor",children:[]},{value:"\ud83d\udc1bBug Fix",id:"bug-fix",children:[]}]}],y={toc:p},m="wrapper";function g(e){let{components:a,...t}=e;return(0,n.yg)(m,(0,l.A)({},y,t,{components:a,mdxType:"MDXLayout"}),(0,n.yg)("h2",{id:"270"},"2.7.0"),(0,n.yg)("h3",{id:"-new-features"},"\u2728 New Features"),(0,n.yg)("ol",null,(0,n.yg)("li",{parentName:"ol"},"\u5c06 Java \u8fd0\u884c\u65f6\u7248\u672c\u4ece jdk8 \u5347\u7ea7\u5230 jdk17"),(0,n.yg)("li",{parentName:"ol"},"\u5347\u7ea7 SpringBoot \u7248\u672c\u5230 3.x"),(0,n.yg)("li",{parentName:"ol"},"\u652f\u6301 ShenYu Admin \u96c6\u7fa4\u529f\u80fd"),(0,n.yg)("li",{parentName:"ol"},"\u5347\u7ea7 checkstyle \u63d2\u4ef6\u7248\u672c\u5230 3.4.0"),(0,n.yg)("li",{parentName:"ol"},"\u6570\u636e\u6e90\u652f\u6301 OceanBase"),(0,n.yg)("li",{parentName:"ol"},"\u652f\u6301\u6279\u91cf\u4fee\u6539\u9009\u62e9\u5668/\u89c4\u5219\u72b6\u6001"),(0,n.yg)("li",{parentName:"ol"},"\u652f\u6301\u6279\u91cf\u4fee\u6539 PathAuth \u72b6\u6001"),(0,n.yg)("li",{parentName:"ol"},"\u5347\u7ea7 apache dubbo \u7248\u672c"),(0,n.yg)("li",{parentName:"ol"},"\u652f\u6301 ",(0,n.yg)("inlineCode",{parentName:"li"},"Contribute with Gitpod")),(0,n.yg)("li",{parentName:"ol"},"\u652f\u6301\u914d\u7f6e\u6279\u91cf\u5bfc\u51fa\u548c\u5bfc\u5165"),(0,n.yg)("li",{parentName:"ol"},"\u6dfb\u52a0 shenyu \u5ba2\u6237\u7aef\u5fc3\u8df3"),(0,n.yg)("li",{parentName:"ol"},"\u652f\u6301\u547d\u540d\u7a7a\u95f4"),(0,n.yg)("li",{parentName:"ol"},"\u652f\u6301 k8s \u52a8\u6001\u6269\u5c55"),(0,n.yg)("li",{parentName:"ol"},"\u901a\u8fc7\u5b9e\u73b0\u5ba2\u6237\u7aef ID \u9a8c\u8bc1\u4f7f\u65b0\u767b\u5f55\u65f6\u5931\u6548\u5148\u524d\u7684\u4ee4\u724c"),(0,n.yg)("li",{parentName:"ol"},"\u652f\u6301 divide-plugin \u7684\u7070\u5ea6\u53d1\u5e03"),(0,n.yg)("li",{parentName:"ol"},"\u652f\u6301 Kubernetes \u4f5c\u4e3a\u6ce8\u518c\u4e2d\u5fc3"),(0,n.yg)("li",{parentName:"ol"},"\u6dfb\u52a0 shenyu-plugin-wasm \u63d2\u4ef6")),(0,n.yg)("h3",{id:"enhancement"},"\u26a1Enhancement"),(0,n.yg)("ol",null,(0,n.yg)("li",{parentName:"ol"},"\u6dfb\u52a0 RocketMQ \u65e5\u5fd7\u7684e2e\u6d4b\u8bd5"),(0,n.yg)("li",{parentName:"ol"},"\u589e\u5f3a\u6307\u6807\u9650\u6d41\u5668\u7684\u6536\u96c6\u529f\u80fd"),(0,n.yg)("li",{parentName:"ol"},"\u589e\u5f3a Sentinel\u3001Resilience4j \u548c Hystrix \u7684\u6307\u6807\u6536\u96c6"),(0,n.yg)("li",{parentName:"ol"},"\u6574\u7406 SOFA commons-tools \u4f9d\u8d56"),(0,n.yg)("li",{parentName:"ol"},"\u79fb\u9664\u8fc7\u671f\u6ce8\u91ca"),(0,n.yg)("li",{parentName:"ol"},"\u6dfb\u52a0\u7f3a\u5931\u7684\u8bb8\u53ef\u8bc1\u58f0\u660e"),(0,n.yg)("li",{parentName:"ol"},"\u4e3a Kafka \u6d88\u606f\u53d1\u9001\u8bbe\u7f6e\u56de\u8c03\u673a\u5236"),(0,n.yg)("li",{parentName:"ol"},"\u4f7f\u7528\u5143\u6570\u636e\u4e2d\u7684\u8d1f\u8f7d\u5747\u8861\u914d\u7f6e\u7528\u4e8e Dubbo"),(0,n.yg)("li",{parentName:"ol"},"\u4e3a\u4ece\u9009\u62e9\u5668\u83b7\u53d6\u7684 Upstream \u6dfb\u52a0\u975e\u7a7a\u6821\u9a8c"),(0,n.yg)("li",{parentName:"ol"},"\u5c06\u89c4\u5219\u5904\u7406\u4e2d\u7684\u8d85\u65f6\u8bbe\u7f6e\u5230 Dubbo RPC \u4e0a\u4e0b\u6587"),(0,n.yg)("li",{parentName:"ol"},"\u5728\u542f\u7528\u9009\u62e9\u5668\u548c\u89c4\u5219\u65f6\u53d1\u5e03\u4e8b\u4ef6"),(0,n.yg)("li",{parentName:"ol"},"\u4ece\u547d\u540d\u7a7a\u95f4\u4f1a\u8bdd\u6620\u5c04\u4e2d\u79fb\u9664\u5df2\u5173\u95ed\u7684\u4f1a\u8bdd"),(0,n.yg)("li",{parentName:"ol"},"\u4e3a ShenyuClientURIExecutorSubscriber \u6dfb\u52a0\u6d4b\u8bd5\u7528\u4f8b"),(0,n.yg)("li",{parentName:"ol"},"\u4e3a ShenyuClientIllegalArgumentException \u6dfb\u52a0\u6d4b\u8bd5\u7528\u4f8b"),(0,n.yg)("li",{parentName:"ol"},"\u4e3a ShenyuClientRegisterEventPublisher \u6dfb\u52a0\u6d4b\u8bd5\u7528\u4f8b"),(0,n.yg)("li",{parentName:"ol"},"\u4e3a ShenyuClientMetadataExecutorSubscriber \u6dfb\u52a0\u6d4b\u8bd5\u7528\u4f8b"),(0,n.yg)("li",{parentName:"ol"},"\u4e3a AbstractWasmPluginDataHandler \u6dfb\u52a0\u6d4b\u8bd5\u7528\u4f8b"),(0,n.yg)("li",{parentName:"ol"},"\u4e3a ShenyuClientRegisterRepositoryFactoryTest \u6dfb\u52a0\u6d4b\u8bd5\u7528\u4f8b"),(0,n.yg)("li",{parentName:"ol"},"\u4e3a AbstractWasmDiscoveryHandler \u6dfb\u52a0\u6d4b\u8bd5\u7528\u4f8b"),(0,n.yg)("li",{parentName:"ol"},"\u5347\u7ea7 SOFA RPC \u7248\u672c\u652f\u6301"),(0,n.yg)("li",{parentName:"ol"},"\u5c06\u7b7e\u540d\u63d2\u4ef6\u7684\u8bf7\u6c42\u5934\u952e\u6dfb\u52a0\u5230\u8de8\u57df\u8fc7\u6ee4\u5668\u914d\u7f6e\u4e2d"),(0,n.yg)("li",{parentName:"ol"},"\u52a0\u5bc6\u5bc6\u7801"),(0,n.yg)("li",{parentName:"ol"},"\u6dfb\u52a0 AbstractShenyuWasmPlugin \u6d4b\u8bd5\u7528\u4f8b"),(0,n.yg)("li",{parentName:"ol"},"\u91cd\u5199\u63d2\u4ef6/\u4e0a\u4e0b\u6587\u8def\u5f84\u63d2\u4ef6\u652f\u6301\u8de8\u5e94\u7528\u548c\u63d2\u4ef6"),(0,n.yg)("li",{parentName:"ol"},"\u79fb\u9664\u91cd\u590d\u8def\u5f84\u68c0\u67e5"),(0,n.yg)("li",{parentName:"ol"},"\u79fb\u9664 Alibaba Dubbo \u652f\u6301"),(0,n.yg)("li",{parentName:"ol"},"\u652f\u6301\u901a\u8fc7 Docker \u73af\u5883\u53d8\u91cf\u8bbe\u7f6e HTTP \u8def\u5f84"),(0,n.yg)("li",{parentName:"ol"},"\u6dfb\u52a0\u4ee3\u7801\u91cd\u6784\u6539\u8fdb"),(0,n.yg)("li",{parentName:"ol"},"\u652f\u6301\u4ece cookie\u3001header\u3001param \u4e2d\u83b7\u53d6\u4ee4\u724c"),(0,n.yg)("li",{parentName:"ol"},"\u4f7f ShenyuDubboService \u6ce8\u89e3\u7684\u9ed8\u8ba4\u503c\u4e0e DubboService \u6ce8\u89e3\u4fdd\u6301\u4e00\u81f4"),(0,n.yg)("li",{parentName:"ol"},"\u5c06\u6570\u636e\u5e93\u811a\u672c\u6dfb\u52a0\u5230\u7ba1\u7406\u5305\u4e2d"),(0,n.yg)("li",{parentName:"ol"},"\u6e05\u7406\u65e0\u7528\u4ee3\u7801\u5e76\u8fdb\u884c\u6539\u8fdb"),(0,n.yg)("li",{parentName:"ol"},"\u4f18\u5316 MotanServiceEventListener \u6d4b\u8bd5\u7528\u4f8b"),(0,n.yg)("li",{parentName:"ol"},"\u5220\u9664 shenyu-registry-eureka.xml \u4e2d\u91cd\u590d\u7684 Maven \u914d\u7f6e"),(0,n.yg)("li",{parentName:"ol"},"\u66f4\u65b0 JWT \u4f9d\u8d56"),(0,n.yg)("li",{parentName:"ol"},"\u6253\u5370\u63d2\u4ef6\u6267\u884c\u65f6\u95f4"),(0,n.yg)("li",{parentName:"ol"},"Admin \u4e2d\u7684\u672c\u5730\u53d1\u73b0\u652f\u6301 upstream \u5065\u5eb7\u68c0\u67e5"),(0,n.yg)("li",{parentName:"ol"},"\u5173\u95ed\u89c4\u5219\u7f13\u5b58"),(0,n.yg)("li",{parentName:"ol"},"\u51cf\u5c11\u5e76\u53d1"),(0,n.yg)("li",{parentName:"ol"},'\u4f18\u5316\u903b\u8f91\u4ee5\u907f\u514d "orElse" \u6267\u884c\uff0c\u66f4\u65b0 VersionTwoExtractor')),(0,n.yg)("h3",{id:"\ufe0frefactor"},"\u267b\ufe0fRefactor"),(0,n.yg)("ol",null,(0,n.yg)("li",{parentName:"ol"},"\u4f7f\u7528 spring-integration-jdbc \u5b9e\u73b0 Admin \u5206\u5e03\u5f0f\u9501"),(0,n.yg)("li",{parentName:"ol"},"\u91cd\u6784 beanUtils"),(0,n.yg)("li",{parentName:"ol"},"\u79fb\u9664 macOS CI"),(0,n.yg)("li",{parentName:"ol"},"\u66f4\u65b0\u65e5\u5fd7\u63d2\u4ef6\u4e2d\u5df2\u5f03\u7528\u7684 DataBuffer \u65b9\u6cd5"),(0,n.yg)("li",{parentName:"ol"},"\u5c06 e2e k8s \u6d4b\u8bd5\u4fee\u6539\u4e3a docker compose"),(0,n.yg)("li",{parentName:"ol"},"\u5c06 Admin swagger \u4ece springfox \u8fc1\u79fb\u5230 springdoc"),(0,n.yg)("li",{parentName:"ol"},"\u91cd\u6784 springcloud \u63d2\u4ef6"),(0,n.yg)("li",{parentName:"ol"},"\u91cd\u6784\u90e8\u5206\u4ee3\u7801"),(0,n.yg)("li",{parentName:"ol"},"\u5220\u9664 SO_SNDBUF \u548c SO_RCVBUF"),(0,n.yg)("li",{parentName:"ol"},"\u91cd\u6784 shenyu-sync-data-http\uff1a\u5c06\u65e5\u5fd7 %s \u66ff\u6362\u4e3a {}"),(0,n.yg)("li",{parentName:"ol"},"\u4f18\u5316\u8282\u70b9\u7c7b\u578b\u76d1\u542c\u5668"),(0,n.yg)("li",{parentName:"ol"},"\u91cd\u6784\u63d2\u4ef6\u751f\u547d\u5468\u671f"),(0,n.yg)("li",{parentName:"ol"},"\u8c03\u6574\u4ee3\u7801\u987a\u5e8f\u5e76\u79fb\u9664\u65e0\u6548\u7684\u8f93\u5165\u53c2\u6570")),(0,n.yg)("h3",{id:"bug-fix"},"\ud83d\udc1bBug Fix"),(0,n.yg)("ol",null,(0,n.yg)("li",{parentName:"ol"},"\u4fee\u590d\u8bf7\u6c42\u63d2\u4ef6\u7684\u91cd\u590d\u8bf7\u6c42\u5934\u95ee\u9898"),(0,n.yg)("li",{parentName:"ol"},"\u4fee\u590d\u5220\u9664 divide \u9009\u62e9\u5668\u65f6\u4ee3\u7406\u9009\u62e9\u5668\u548c\u53d1\u73b0\u672a\u5220\u9664\u7684\u95ee\u9898"),(0,n.yg)("li",{parentName:"ol"},"\u4fee\u590d\u65e5\u5fd7\u63d2\u4ef6\u9519\u8bef\u65e5\u5fd7\u6355\u83b7\u95ee\u9898"),(0,n.yg)("li",{parentName:"ol"},"\u4fee\u590d\u65e5\u5fd7\u63d2\u4ef6\u793a\u4f8b bug"),(0,n.yg)("li",{parentName:"ol"},"\u4fee\u590d\u5185\u5b58\u6ea2\u51fa\u95ee\u9898"),(0,n.yg)("li",{parentName:"ol"},"\u4fee\u590d\u91cd\u5199\u96c6\u6210\u6d4b\u8bd5"),(0,n.yg)("li",{parentName:"ol"},"\u4fee\u590d AbstractWasmPluginDataHandlerTest"),(0,n.yg)("li",{parentName:"ol"},"\u4fee\u590d sql-script/h2/schema.sql \u4e2d\u7f3a\u5c11\u4e3b\u952e\u7684\u95ee\u9898"),(0,n.yg)("li",{parentName:"ol"},"\u4fee\u590d\u6570\u636e\u5b57\u5178\u9875\u9762\u6570\u636e\u6392\u5e8f\u5f02\u5e38"),(0,n.yg)("li",{parentName:"ol"},"\u4fee\u590d\u6587\u6863\u9519\u8bef"),(0,n.yg)("li",{parentName:"ol"},"\u89e3\u51b3\u4eea\u8868\u76d8\u8def\u7531\u4e0e\u4e0a\u4e0b\u6587\u8def\u5f84\u66f4\u65b0\u4e0d\u5339\u914d\u7684\u95ee\u9898"),(0,n.yg)("li",{parentName:"ol"},"\u4fee\u590d etcd \u540c\u6b65\u914d\u7f6e\u95ee\u9898"),(0,n.yg)("li",{parentName:"ol"},"\u4fee\u590d consul \u540c\u6b65\u95ee\u9898"),(0,n.yg)("li",{parentName:"ol"},"\u4fee\u590d\u672a\u6ce8\u518c\u65e0\u6cd5\u67e5\u8be2\u7684\u9519\u8bef"),(0,n.yg)("li",{parentName:"ol"},"\u4fee\u590d\u63d2\u4ef6\u7f16\u8f91\u9875\u9762\u95ee\u9898\uff1a\u4fee\u6b63\u63d2\u4ef6 ID \u67e5\u8be2\u548c\u66f4\u65b0\u6570\u636e\u7c7b\u578b"),(0,n.yg)("li",{parentName:"ol"},"\u4fee\u590d AdminConstants \u7c7b\u62fc\u5199\u9519\u8bef"),(0,n.yg)("li",{parentName:"ol"},"\u4fee\u590d shenyu-examples-springmvc \u542f\u52a8\u5931\u8d25\u95ee\u9898"),(0,n.yg)("li",{parentName:"ol"},"\u4fee\u590d\u4eea\u8868\u76d8\u83dc\u5355\u5b50\u9879\u6392\u5e8f\u4e0d\u751f\u6548\u95ee\u9898"),(0,n.yg)("li",{parentName:"ol"},"\u4fee\u590d ShenyuApacheDubboXmlProviderApplication \u914d\u7f6e"),(0,n.yg)("li",{parentName:"ol"},"\u4fee\u590d\u4ee3\u7406\u9009\u62e9\u5668\u548c\u53d1\u73b0\u7684\u6570\u636e\u540c\u6b65 ID \u4e0d\u552f\u4e00\u95ee\u9898"),(0,n.yg)("li",{parentName:"ol"},"\u8fc7\u6ee4\u7981\u7528\u7684\u5b57\u5178\u9009\u9879"),(0,n.yg)("li",{parentName:"ol"},"\u4fee\u590d SpringCloudParser \u5143\u6570\u636e\u7a7a\u6570\u636e\u95ee\u9898"),(0,n.yg)("li",{parentName:"ol"},"\u4fee\u590d\u5ba2\u6237\u7aef\u6ce8\u518c\u9a8c\u8bc1"),(0,n.yg)("li",{parentName:"ol"},"\u914d\u7f6e dubbo \u5e8f\u5217\u5316\u68c0\u67e5\u72b6\u6001\u4e3a\u7981\u7528"),(0,n.yg)("li",{parentName:"ol"},"\u4fee\u590d\u793a\u4f8b TestApacheDubboXmlApplication \u542f\u52a8\u5931\u8d25\u95ee\u9898"),(0,n.yg)("li",{parentName:"ol"},"\u4fee\u590d nacos \u6570\u636e\u540c\u6b65\u6a21\u578b\u7f3a\u5c11\u4e0a\u4e0b\u6587\u8def\u5f84\u914d\u7f6e"),(0,n.yg)("li",{parentName:"ol"},"\u4fee\u590d SPI \u5728\u591a\u7ebf\u7a0b\u573a\u666f\u4e0b\u521b\u5efa\u975e\u5355\u4f8b\u5bf9\u8c61\u95ee\u9898"),(0,n.yg)("li",{parentName:"ol"},"\u4fee\u590d\u9519\u8bef\u7684 SQL \u8bed\u6cd5\u5f02\u5e38"),(0,n.yg)("li",{parentName:"ol"},"\u4fee\u590d\u4e00\u4e9b\u6587\u5b57\u62fc\u5199\u9519\u8bef"),(0,n.yg)("li",{parentName:"ol"},"\u4fee\u590d ListUtil->merge \u5f02\u5e38"),(0,n.yg)("li",{parentName:"ol"},"\u4fee\u590d\u5143\u6570\u636e\u7981\u7528\u672a\u8fc7\u6ee4\u95ee\u9898"),(0,n.yg)("li",{parentName:"ol"},"\u4fee\u590d divide \u65e5\u5fd7\u8bf7\u6c42\u65b9\u6cd5"),(0,n.yg)("li",{parentName:"ol"},"\u4fee\u590d e2e chunk header \u9519\u8bef"),(0,n.yg)("li",{parentName:"ol"},"\u4fee\u590d cookie \u9519\u8bef\u548c SQL \u68c0\u67e5"),(0,n.yg)("li",{parentName:"ol"},"\u4fee\u590d\u7a7a\u6307\u9488\u5f02\u5e38\u95ee\u9898"),(0,n.yg)("li",{parentName:"ol"},"\u4fee\u590d\u65e0\u6548\u8def\u5f84\u9519\u8bef"),(0,n.yg)("li",{parentName:"ol"},"\u4fee\u590d\u70ed\u52a0\u8f7d\u95ee\u9898"),(0,n.yg)("li",{parentName:"ol"},"\u4fee\u590d e2e \u6d4b\u8bd5\u7528\u4f8b\u65e0\u6cd5\u8fd0\u884c wget \u547d\u4ee4"),(0,n.yg)("li",{parentName:"ol"},"\u4fee\u590d\u964d\u7ea7\u95ee\u9898"),(0,n.yg)("li",{parentName:"ol"},"\u4fee\u590d\u4e00\u4e9b CI \u9519\u8bef"),(0,n.yg)("li",{parentName:"ol"},"\u89e3\u51b3 rule-sqlmap.xml \u4e2d\u7684 SQL \u9519\u8bef"),(0,n.yg)("li",{parentName:"ol"},"\u4fee\u590d readYmlBuildRepository \u7a7a\u6307\u9488\u5f02\u5e38"),(0,n.yg)("li",{parentName:"ol"},"\u4fee\u590d nacos \u65e0\u6cd5\u5728 Shenyu-examples-SpringCloud \u9879\u76ee\u4e2d\u6ce8\u518c\u95ee\u9898"),(0,n.yg)("li",{parentName:"ol"},"\u4fee\u590d springCloud \u89c4\u5219\u6570\u636e\u8def\u5f84\u8bbe\u7f6e\u672a\u4f7f\u7528\u95ee\u9898"),(0,n.yg)("li",{parentName:"ol"},"\u4fee\u590d shenyu-plugin-logging-elasticsearch\uff1a\u4fee\u6539 ElasticSearchLogConfig \u7684 setIndexName"),(0,n.yg)("li",{parentName:"ol"},"\u4fee\u590d\u505c\u6b62\u670d\u52a1\u65f6\u672a\u9996\u5148\u4ece\u7f51\u5173\u4e0b\u7ebf\u95ee\u9898"),(0,n.yg)("li",{parentName:"ol"},"\u4fee\u590d k8s \u5b58\u6d3b\u63a2\u9488\u65e0\u6cd5\u8fd0\u884c wget \u547d\u4ee4\u9519\u8bef"),(0,n.yg)("li",{parentName:"ol"},"\u4fee\u590d AbstractNodeDataSyncService \u542f\u52a8\u65f6\u52a0\u8f7d\u53d1\u73b0\u4e0a\u6e38\u95ee\u9898")))}g.isMDXComponent=!0}}]);