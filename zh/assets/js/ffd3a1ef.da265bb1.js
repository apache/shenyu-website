"use strict";(self.webpackChunkshenyu_website=self.webpackChunkshenyu_website||[]).push([[16959],{15680:(e,t,r)=>{r.d(t,{xA:()=>c,yg:()=>d});var n=r(96540);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var u=n.createContext({}),s=function(e){var t=n.useContext(u),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},c=function(e){var t=s(e.components);return n.createElement(u.Provider,{value:t},e.children)},p="mdxType",y={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,o=e.originalType,u=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),p=s(r),m=a,d=p["".concat(u,".").concat(m)]||p[m]||y[m]||o;return r?n.createElement(d,i(i({ref:t},c),{},{components:r})):n.createElement(d,i({ref:t},c))}));function d(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=r.length,i=new Array(o);i[0]=m;var l={};for(var u in t)hasOwnProperty.call(t,u)&&(l[u]=t[u]);l.originalType=e,l[p]="string"==typeof e?e:a,i[1]=l;for(var s=2;s<o;s++)i[s]=r[s];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}m.displayName="MDXCreateElement"},48588:(e,t,r)=>{r.r(t),r.d(t,{contentTitle:()=>i,default:()=>p,frontMatter:()=>o,metadata:()=>l,toc:()=>u});var n=r(58168),a=(r(96540),r(15680));const o={title:"2.2.0",sidebar_position:9,keywords:["release-notes"],description:"release-notes"},i="2.2.0",l={unversionedId:"2.2.0-release",id:"2.2.0-release",isDocsHomePage:!1,title:"2.2.0",description:"release-notes",source:"@site/i18n/zh/docusaurus-plugin-content-docs-event/current/2.2.0-release.md",sourceDirName:".",slug:"/2.2.0-release",permalink:"/zh/event/2.2.0-release",editUrl:"https://github.com/apache/shenyu-website/edit/main/i18n/zh/docusaurus-plugin-content-docs-event/current/2.2.0-release.md",version:"current",lastUpdatedBy:"VampireAchao",lastUpdatedAt:1724674519,formattedLastUpdatedAt:"2024/8/26",sidebarPosition:9,frontMatter:{title:"2.2.0",sidebar_position:9,keywords:["release-notes"],description:"release-notes"}},u=[],s={toc:u},c="wrapper";function p(e){let{components:t,...r}=e;return(0,a.yg)(c,(0,n.A)({},s,r,{components:t,mdxType:"MDXLayout"}),(0,a.yg)("h1",{id:"220"},"2.2.0"),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},"\u5b8c\u5168\u7684\u63d2\u4ef6\u5316\u67b6\u6784\u8bbe\u8ba1\uff0c\u63d2\u4ef6\u70ed\u63d2\u62d4\u3002"),(0,a.yg)("li",{parentName:"ul"},"\u5b8c\u6574\u652f\u6301 dubbo \u6240\u6709\u7248\u672c\uff0calibaba-dubbo \uff0capache-dubbo\u3002"),(0,a.yg)("li",{parentName:"ul"},"\u652f\u6301 dubbo \u6cdb\u5316\u8c03\u7528\uff0c\u591a\u53c2\u6570\uff0c\u590d\u6742\u53c2\u6570\u63a5\u53e3\u3002"),(0,a.yg)("li",{parentName:"ul"},"\u589e\u5f3a monitor \u63d2\u4ef6\uff0c\u79fb\u9664 influxdb \u652f\u6301\uff0c\u65b0\u589e\u5185\u5b58\uff0cCPU\uff0cQPS\uff0cTPS\uff0c\u54cd\u5e94\u8fdf\u5ef6\u7b49 metrics\uff0c\u652f\u6301\u63a5\u5165 Prometheus\u3002"),(0,a.yg)("li",{parentName:"ul"},"springCloud \u63d2\u4ef6\u652f\u6301 eureka \u4e0e nacos \u4e8c\u79cd\u6ce8\u518c\u4e2d\u5fc3\u3002"),(0,a.yg)("li",{parentName:"ul"},"waf \u63d2\u4ef6\u589e\u5f3a,\u652f\u6301\u9ed1\u767d\u540d\u5355\uff0c\u4ee5\u53ca\u6df7\u5408\u6a21\u5f0f\u3002"),(0,a.yg)("li",{parentName:"ul"},"\u62bd\u79bb Hystrix \u7194\u65ad\u529f\u80fd\uff0c\u72ec\u7acb\u6210\u63d2\u4ef6\u652f\u6301\u3002"),(0,a.yg)("li",{parentName:"ul"},"\u4fee\u62a4 Zookeeper \u6570\u636e\u540c\u6b65\u65b9\u5f0f bug\uff0c\u65b0\u589e nacos \u540c\u6b65\u6570\u636e\u65b9\u5f0f\u3002"),(0,a.yg)("li",{parentName:"ul"},"\u591a\u79cd soul-client \u652f\u6301\uff0c\u63d0\u4f9b\u4f20\u7edf spring\uff0c\u4ee5\u53ca springboot \u7b49\u65b9\u5f0f\u63a5\u5165\u3002"),(0,a.yg)("li",{parentName:"ul"},"\u4f18\u5316 soul-admin \u540e\u53f0\u63a7\u5236\u754c\u9762\u3002"),(0,a.yg)("li",{parentName:"ul"},"\u8d1f\u8f7d\u5747\u8861\u7b97\u6cd5 bug \u4fee\u62a4\u3002"),(0,a.yg)("li",{parentName:"ul"},"\u4fee\u62a4\u5927\u6587\u4ef6\u4e0a\u4f20\u65f6\u5019\u7684 bug\u3002")))}p.isMDXComponent=!0}}]);