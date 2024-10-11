"use strict";(self.webpackChunkshenyu_website=self.webpackChunkshenyu_website||[]).push([[25187],{15680:(e,n,r)=>{r.d(n,{xA:()=>o,yg:()=>c});var t=r(96540);function i(e,n,r){return n in e?Object.defineProperty(e,n,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[n]=r,e}function a(e,n){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);n&&(t=t.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),r.push.apply(r,t)}return r}function l(e){for(var n=1;n<arguments.length;n++){var r=null!=arguments[n]?arguments[n]:{};n%2?a(Object(r),!0).forEach((function(n){i(e,n,r[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(r,n))}))}return e}function p(e,n){if(null==e)return{};var r,t,i=function(e,n){if(null==e)return{};var r,t,i={},a=Object.keys(e);for(t=0;t<a.length;t++)r=a[t],n.indexOf(r)>=0||(i[r]=e[r]);return i}(e,n);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(t=0;t<a.length;t++)r=a[t],n.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(i[r]=e[r])}return i}var u=t.createContext({}),g=function(e){var n=t.useContext(u),r=n;return e&&(r="function"==typeof e?e(n):l(l({},n),e)),r},o=function(e){var n=g(e.components);return t.createElement(u.Provider,{value:n},e.children)},y="mdxType",s={inlineCode:"code",wrapper:function(e){var n=e.children;return t.createElement(t.Fragment,{},n)}},m=t.forwardRef((function(e,n){var r=e.components,i=e.mdxType,a=e.originalType,u=e.parentName,o=p(e,["components","mdxType","originalType","parentName"]),y=g(r),m=i,c=y["".concat(u,".").concat(m)]||y[m]||s[m]||a;return r?t.createElement(c,l(l({ref:n},o),{},{components:r})):t.createElement(c,l({ref:n},o))}));function c(e,n){var r=arguments,i=n&&n.mdxType;if("string"==typeof e||i){var a=r.length,l=new Array(a);l[0]=m;var p={};for(var u in n)hasOwnProperty.call(n,u)&&(p[u]=n[u]);p.originalType=e,p[y]="string"==typeof e?e:i,l[1]=p;for(var g=2;g<a;g++)l[g]=r[g];return t.createElement.apply(null,l)}return t.createElement.apply(null,r)}m.displayName="MDXCreateElement"},59179:(e,n,r)=>{r.r(n),r.d(n,{contentTitle:()=>l,default:()=>y,frontMatter:()=>a,metadata:()=>p,toc:()=>u});var t=r(58168),i=(r(96540),r(15680));const a={sidebar_position:5,title:"\u9650\u6d41\u63d2\u4ef6",keywords:["rateLimiter"],description:"rateLimiter\u63d2\u4ef6"},l=void 0,p={unversionedId:"plugins/rate-limiter-plugin",id:"version-2.3.0-Legacy/plugins/rate-limiter-plugin",isDocsHomePage:!1,title:"\u9650\u6d41\u63d2\u4ef6",description:"rateLimiter\u63d2\u4ef6",source:"@site/i18n/zh/docusaurus-plugin-content-docs/version-2.3.0-Legacy/plugins/rate-limiter-plugin.md",sourceDirName:"plugins",slug:"/plugins/rate-limiter-plugin",permalink:"/zh/docs/2.3.0-Legacy/plugins/rate-limiter-plugin",editUrl:"https://github.com/apache/shenyu-website/edit/main/i18n/zh/docusaurus-plugin-content-docs/version-2.3.0-Legacy/plugins/rate-limiter-plugin.md",version:"2.3.0-Legacy",sidebarPosition:5,frontMatter:{sidebar_position:5,title:"\u9650\u6d41\u63d2\u4ef6",keywords:["rateLimiter"],description:"rateLimiter\u63d2\u4ef6"},sidebar:"version-2.3.0-Legacy/tutorialSidebar",previous:{title:"Sofa\u63d2\u4ef6",permalink:"/zh/docs/2.3.0-Legacy/plugins/sofa-plugin"},next:{title:"Hystrix\u63d2\u4ef6",permalink:"/zh/docs/2.3.0-Legacy/plugins/hystrix-plugin"}},u=[{value:"\u8bf4\u660e",id:"\u8bf4\u660e",children:[]},{value:"\u6280\u672f\u65b9\u6848",id:"\u6280\u672f\u65b9\u6848",children:[]},{value:"\u63d2\u4ef6\u8bbe\u7f6e",id:"\u63d2\u4ef6\u8bbe\u7f6e",children:[]},{value:"\u63d2\u4ef6\u4f7f\u7528",id:"\u63d2\u4ef6\u4f7f\u7528",children:[]}],g={toc:u},o="wrapper";function y(e){let{components:n,...a}=e;return(0,i.yg)(o,(0,t.A)({},g,a,{components:n,mdxType:"MDXLayout"}),(0,i.yg)("h2",{id:"\u8bf4\u660e"},"\u8bf4\u660e"),(0,i.yg)("ul",null,(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("p",{parentName:"li"},"\u9650\u6d41\u63d2\u4ef6\uff0c\u662f\u7f51\u5173\u5bf9\u6d41\u91cf\u7ba1\u63a7\u9650\u5236\u6838\u5fc3\u7684\u5b9e\u73b0\u3002")),(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("p",{parentName:"li"},"soul\u7f51\u5173\u63d0\u4f9b\u4e86\u591a\u79cd\u9650\u6d41\u7b97\u6cd5\u7684\u5b9e\u73b0\uff0c\u5305\u62ec",(0,i.yg)("inlineCode",{parentName:"p"},"\u4ee4\u724c\u6876\u7b97\u6cd5"),"\u3001",(0,i.yg)("inlineCode",{parentName:"p"},"\u5e76\u53d1\u7684\u4ee4\u724c\u6876\u7b97\u6cd5"),"\u3001",(0,i.yg)("inlineCode",{parentName:"p"},"\u6f0f\u6876\u7b97\u6cd5"),"\u3001",(0,i.yg)("inlineCode",{parentName:"p"},"\u6ed1\u52a8\u65f6\u95f4\u7a97\u53e3\u7b97\u6cd5"),"\u3002")),(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("p",{parentName:"li"},"soul\u7f51\u5173\u7684\u9650\u6d41\u7b97\u6cd5\u5b9e\u73b0\u90fd\u662f\u57fa\u4e8e",(0,i.yg)("inlineCode",{parentName:"p"},"redis"),"\u3002")),(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("p",{parentName:"li"},"\u53ef\u4ee5\u5230\u63a5\u53e3\u7ea7\u522b\uff0c\u4e5f\u53ef\u4ee5\u5230\u53c2\u6570\u7ea7\u522b\uff0c\u5177\u4f53\u600e\u4e48\u7528\uff0c\u8fd8\u5f97\u770b\u4f60\u5bf9\u6d41\u91cf\u914d\u7f6e\u3002"))),(0,i.yg)("h2",{id:"\u6280\u672f\u65b9\u6848"},"\u6280\u672f\u65b9\u6848"),(0,i.yg)("h4",{id:"\u91c7\u7528redis\u4ee4\u724c\u6876\u7b97\u6cd5\u8fdb\u884c\u9650\u6d41"},"\u91c7\u7528redis\u4ee4\u724c\u6876\u7b97\u6cd5\u8fdb\u884c\u9650\u6d41\u3002"),(0,i.yg)("ul",null,(0,i.yg)("li",{parentName:"ul"},"\u7cfb\u7edf\u4ee5\u6052\u5b9a\u7684\u901f\u7387\u4ea7\u2f63\u4ee4\u724c\uff0c\u7136\u540e\u5c06\u4ee4\u724c\u653e\u2f0a\u4ee4\u724c\u6876\u4e2d\u3002"),(0,i.yg)("li",{parentName:"ul"},"\u4ee4\u724c\u6876\u6709\u2f00\u4e2a\u5bb9\u91cf\uff0c\u5f53\u4ee4\u724c\u6876\u6ee1\u4e86\u7684\u65f6\u5019\uff0c\u518d\u5411\u5176\u4e2d\u653e\u2f0a\u7684\u4ee4\u724c\u5c31\u4f1a\u88ab\u4e22\u5f03\u3002"),(0,i.yg)("li",{parentName:"ul"},"\u6bcf\u6b21\u2f00\u4e2a\u8bf7\u6c42\u8fc7\u6765\uff0c\u9700\u8981\u4ece\u4ee4\u724c\u6876\u4e2d\u83b7\u53d6\u2f00\u4e2a\u4ee4\u724c\uff0c\u5982\u679c\u6709\u4ee4\u724c\uff0c\u5219\u63d0\u4f9b\u670d\u52a1\uff1b\u5982\u679c\u6ca1\u6709\u4ee4\u724c\uff0c\u5219\u62d2\u7edd\u670d\u52a1\u3002")),(0,i.yg)("ul",null,(0,i.yg)("li",{parentName:"ul"},"\u6d41\u7a0b\u56fe\uff1a\n",(0,i.yg)("img",{parentName:"li",src:"https://yu199195.github.io/images/soul/limiting.png",alt:null}))),(0,i.yg)("h4",{id:"\u91c7\u7528redis\u6f0f\u6876\u7b97\u6cd5\u8fdb\u884c\u9650\u6d41"},"\u91c7\u7528redis\u6f0f\u6876\u7b97\u6cd5\u8fdb\u884c\u9650\u6d41\u3002"),(0,i.yg)("ul",null,(0,i.yg)("li",{parentName:"ul"},"\u2f54\uff08\u8bf7\u6c42\uff09\u5148\u8fdb\u2f0a\u5230\u6f0f\u6876\u2fa5\uff0c\u6f0f\u6876\u4ee5\u2f00\u5b9a\u7684\u901f\u5ea6\u51fa\u2f54\uff0c\u5f53\u2f54\u6d41\u2f0a\u901f\u5ea6\u8fc7\u2f24\u4f1a\u76f4\u63a5\u6ea2\u51fa\uff08\u62d2\u7edd\u670d\u52a1\uff09")),(0,i.yg)("ul",null,(0,i.yg)("li",{parentName:"ul"},"\u6d41\u7a0b\u56fe\uff1a\n",(0,i.yg)("img",{src:r(93855).A}))),(0,i.yg)("h4",{id:"\u57fa\u4e8eredis\u5b9e\u73b0\u7684\u6ed1\u52a8\u7a97\u53e3\u7b97\u6cd5"},"\u57fa\u4e8eredis\u5b9e\u73b0\u7684\u6ed1\u52a8\u7a97\u53e3\u7b97\u6cd5"),(0,i.yg)("ul",null,(0,i.yg)("li",{parentName:"ul"},"\u6ed1\u52a8\u65f6\u95f4\u7a97\u53e3\u901a\u8fc7\u7ef4\u62a4\u2f00\u4e2a\u5355\u4f4d\u65f6\u95f4\u5185\u7684\u8ba1\u6570\u503c\uff0c\u6bcf\u5f53\u2f00\u4e2a\u8bf7\u6c42\u901a\u8fc7\u65f6\uff0c\u5c31\u5c06\u8ba1\u6570\u503c\u52a01\uff0c\u5f53\u8ba1\u6570\u503c\u8d85\u8fc7\u9884\u5148\u8bbe\u5b9a\u7684\u9608\u503c\u65f6\uff0c\u5c31\u62d2\u7edd\u5355\u4f4d\u65f6\u95f4\u5185\u7684\u5176\u4ed6\u8bf7\u6c42\u3002\u5982\u679c\u5355\u4f4d\u65f6\u95f4\u5df2\u7ecf\u7ed3\u675f\uff0c\u5219\u5c06\u8ba1\u6570\u5668\u6e05\u96f6\uff0c\u5f00\u542f\u4e0b\u2f00\u8f6e\u7684\u8ba1\u6570\u3002")),(0,i.yg)("ul",null,(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("p",{parentName:"li"},"\u7b97\u6cd5\u56fe\uff1a\n",(0,i.yg)("img",{src:r(98763).A}))),(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("p",{parentName:"li"},"\u6d41\u7a0b\u56fe\uff1a\n",(0,i.yg)("img",{src:r(17758).A})))),(0,i.yg)("h2",{id:"\u63d2\u4ef6\u8bbe\u7f6e"},"\u63d2\u4ef6\u8bbe\u7f6e"),(0,i.yg)("ul",null,(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("p",{parentName:"li"},"\u5728 ",(0,i.yg)("inlineCode",{parentName:"p"},"soul-admin"),"--\x3e \u63d2\u4ef6\u7ba1\u7406--\x3e ",(0,i.yg)("inlineCode",{parentName:"p"},"rate_limiter")," \u5c06\u5176\u8bbe\u7f6e\u4e3a\u5f00\u542f\u3002")),(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("p",{parentName:"li"},"\u5728\u63d2\u4ef6\u4e2d\uff0c\u5bf9redis\u8fdb\u884c\u914d\u7f6e\u3002")),(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("p",{parentName:"li"},"\u76ee\u524d\u652f\u6301redis\u7684\u5355\u673a\uff0c\u54e8\u5175\uff0c\u4ee5\u53ca\u96c6\u7fa4\u6a21\u5f0f\u3002")),(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("p",{parentName:"li"},"\u5982\u679c\u662f\u54e8\u5175\uff0c\u96c6\u7fa4\u7b49\u591a\u8282\u70b9\u7684\uff0c\u5728URL\u4e2d\u7684\u914d\u7f6e\uff0c\u8bf7\u5bf9\u6bcf\u4e2a\u5b9e\u5217\u4f7f\u7528 ",(0,i.yg)("inlineCode",{parentName:"p"},";")," \u5206\u5272. \u5982 192.168.1.1:6379;192.168.1.2:6379\u3002")),(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("p",{parentName:"li"},"\u5982\u679c\u7528\u6237\u65e0\u9700\u4f7f\u7528\uff0c\u5728admin\u540e\u53f0\u628a\u63d2\u4ef6\u7981\u7528\u3002 "))),(0,i.yg)("h2",{id:"\u63d2\u4ef6\u4f7f\u7528"},"\u63d2\u4ef6\u4f7f\u7528"),(0,i.yg)("ul",null,(0,i.yg)("li",{parentName:"ul"},"\u5728\u7f51\u5173\u7684 pom.xml \u6587\u4ef6\u4e2d\u6dfb\u52a0 rateLimiter\u7684\u652f\u6301\u3002")),(0,i.yg)("pre",null,(0,i.yg)("code",{parentName:"pre",className:"language-xml"},"  \x3c!-- soul ratelimiter plugin start--\x3e\n  <dependency>\n      <groupId>org.dromara</groupId>\n      <artifactId>soul-spring-boot-starter-plugin-ratelimiter</artifactId>\n      <version>${last.version}</version>\n  </dependency>\n  \x3c!-- soul ratelimiter plugin end--\x3e\n")),(0,i.yg)("ul",null,(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("p",{parentName:"li"},"\u9009\u62e9\u5668\u548c\u89c4\u5219\uff0c\u8bf7\u8be6\u7ec6\u770b\uff1a",(0,i.yg)("a",{parentName:"p",href:"../admin/selector-and-rule"},"\u9009\u62e9\u5668\u89c4\u5219"),"\u3002")),(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("p",{parentName:"li"},"\u89c4\u5219\u8be6\u7ec6\u8bf4\u660e"),(0,i.yg)("p",{parentName:"li"},"*\u4ee4\u724c\u6876\u7b97\u6cd5/\u5e76\u53d1\u4ee4\u724c\u6876\u7b97\u6cd5"))),(0,i.yg)("p",null,"algorithmName\uff08\u7b97\u6cd5\u540d\uff09\uff1atocketBucket/concurrent"),(0,i.yg)("p",null,"replenishRate\uff08\u901f\u7387\uff09\uff1a\u662f\u4f60\u5141\u8bb8\u7528\u6237\u6bcf\u79d2\u6267\u884c\u591a\u5c11\u8bf7\u6c42\uff0c\u800c\u4e22\u5f03\u4efb\u4f55\u8bf7\u6c42\u3002\u8fd9\u662f\u4ee4\u724c\u6876\u7684\u586b\u5145\u901f\u7387\u3002"),(0,i.yg)("p",null,"burstCapacity\uff08\u5bb9\u91cf\uff09\uff1a\u662f\u5141\u8bb8\u7528\u6237\u5728\u4e00\u79d2\u949f\u5185\u6267\u884c\u7684\u6700\u5927\u8bf7\u6c42\u6570\u3002\u8fd9\u662f\u4ee4\u724c\u6876\u53ef\u4ee5\u4fdd\u5b58\u7684\u4ee4\u724c\u6570\u3002"),(0,i.yg)("ul",null,(0,i.yg)("li",{parentName:"ul"},"\u6f0f\u6876\u7b97\u6cd5 ")),(0,i.yg)("p",null,"algorithmName\uff08\u7b97\u6cd5\u540d\uff09\uff1aleakyBucket"),(0,i.yg)("p",null,"replenishRate\uff08\u901f\u7387\uff09\uff1a\u5355\u4f4d\u65f6\u95f4\u5185\u6267\u884c\u8bf7\u6c42\u7684\u901f\u7387\uff0c\u6f0f\u6876\u4e2d\u6c34\u6ef4\u6f0f\u51fa\u7684\u901f\u7387\u3002"),(0,i.yg)("p",null,"burstCapacity\uff08\u5bb9\u91cf\uff09\uff1a\u662f\u5141\u8bb8\u7528\u6237\u5728\u4e00\u79d2\u949f\u5185\u6267\u884c\u7684\u6700\u5927\u8bf7\u6c42\u6570\u3002\u8fd9\u662f\u6876\u4e2d\u7684\u6c34\u91cf\u3002"),(0,i.yg)("ul",null,(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("ul",{parentName:"li"},(0,i.yg)("li",{parentName:"ul"},"\u6ed1\u52a8\u7a97\u53e3\u7b97\u6cd5")))),(0,i.yg)("p",null,"algorithmName\uff08\u7b97\u6cd5\u540d\uff09\uff1asildingWindow"),(0,i.yg)("p",null,"replenishRate\uff08\u901f\u7387\uff09\uff1a\u5355\u4f4d\u65f6\u95f4\u5185\u6267\u884c\u8bf7\u6c42\u7684\u901f\u7387\uff0c\u7528\u4e8e\u8ba1\u7b97\u65f6\u95f4\u7a97\u53e3\u5927\u5c0f\u3002"),(0,i.yg)("p",null,"burstCapacity\uff08\u5bb9\u91cf\uff09\uff1a\u65f6\u95f4\u7a97\u53e3\u5185\uff08\u5355\u4f4d\u65f6\u95f4\u5185\uff09\u6700\u5927\u7684\u8bf7\u6c42\u6570\u91cf\u3002"))}y.isMDXComponent=!0},98763:(e,n,r)=>{r.d(n,{A:()=>t});const t=r.p+"assets/images/huadongwindow-26a67dc9b1cc954375a3e4a3bfc56d59.jpg"},93855:(e,n,r)=>{r.d(n,{A:()=>t});const t=r.p+"assets/images/leakybucket-cc829d5529e0847152a90793867e9f96.png"},17758:(e,n,r)=>{r.d(n,{A:()=>t});const t=r.p+"assets/images/sldingwindow-c529b50727afb275845585edb72b0215.png"}}]);