"use strict";(self.webpackChunkshenyu_website=self.webpackChunkshenyu_website||[]).push([[75228],{15680:(e,n,t)=>{t.d(n,{xA:()=>s,yg:()=>h});var r=t(96540);function i(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function l(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function a(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?l(Object(t),!0).forEach((function(n){i(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):l(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function p(e,n){if(null==e)return{};var t,r,i=function(e,n){if(null==e)return{};var t,r,i={},l=Object.keys(e);for(r=0;r<l.length;r++)t=l[r],n.indexOf(t)>=0||(i[t]=e[t]);return i}(e,n);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(r=0;r<l.length;r++)t=l[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(i[t]=e[t])}return i}var u=r.createContext({}),g=function(e){var n=r.useContext(u),t=n;return e&&(t="function"==typeof e?e(n):a(a({},n),e)),t},s=function(e){var n=g(e.components);return r.createElement(u.Provider,{value:n},e.children)},o="mdxType",y={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},c=r.forwardRef((function(e,n){var t=e.components,i=e.mdxType,l=e.originalType,u=e.parentName,s=p(e,["components","mdxType","originalType","parentName"]),o=g(t),c=i,h=o["".concat(u,".").concat(c)]||o[c]||y[c]||l;return t?r.createElement(h,a(a({ref:n},s),{},{components:t})):r.createElement(h,a({ref:n},s))}));function h(e,n){var t=arguments,i=n&&n.mdxType;if("string"==typeof e||i){var l=t.length,a=new Array(l);a[0]=c;var p={};for(var u in n)hasOwnProperty.call(n,u)&&(p[u]=n[u]);p.originalType=e,p[o]="string"==typeof e?e:i,a[1]=p;for(var g=2;g<l;g++)a[g]=t[g];return r.createElement.apply(null,a)}return r.createElement.apply(null,t)}c.displayName="MDXCreateElement"},86561:(e,n,t)=>{t.r(n),t.d(n,{contentTitle:()=>a,default:()=>o,frontMatter:()=>l,metadata:()=>p,toc:()=>u});var r=t(58168),i=(t(96540),t(15680));const l={title:"Request\u63d2\u4ef6",keywords:["RequestPlugin"],description:"RequestPlugin"},a="1. \u6982\u8ff0",p={unversionedId:"plugin-center/http-process/request-plugin",id:"version-2.6.1/plugin-center/http-process/request-plugin",isDocsHomePage:!1,title:"Request\u63d2\u4ef6",description:"RequestPlugin",source:"@site/i18n/zh/docusaurus-plugin-content-docs/version-2.6.1/plugin-center/http-process/request-plugin.md",sourceDirName:"plugin-center/http-process",slug:"/plugin-center/http-process/request-plugin",permalink:"/zh/docs/2.6.1/plugin-center/http-process/request-plugin",editUrl:"https://github.com/apache/shenyu-website/edit/main/i18n/zh/docusaurus-plugin-content-docs/version-2.6.1/plugin-center/http-process/request-plugin.md",version:"2.6.1",frontMatter:{title:"Request\u63d2\u4ef6",keywords:["RequestPlugin"],description:"RequestPlugin"},sidebar:"version-2.6.0/tutorialSidebar",previous:{title:"Redirect\u63d2\u4ef6",permalink:"/zh/docs/2.6.1/plugin-center/http-process/redirect-plugin"},next:{title:"Rewrite\u63d2\u4ef6",permalink:"/zh/docs/2.6.1/plugin-center/http-process/rewrite-plugin"}},u=[{value:"1.1 \u63d2\u4ef6\u540d\u79f0",id:"11-\u63d2\u4ef6\u540d\u79f0",children:[]},{value:"1.2 \u9002\u7528\u573a\u666f",id:"12-\u9002\u7528\u573a\u666f",children:[]},{value:"1.3 \u63d2\u4ef6\u529f\u80fd",id:"13-\u63d2\u4ef6\u529f\u80fd",children:[]},{value:"1.4 \u63d2\u4ef6\u4ee3\u7801",id:"14-\u63d2\u4ef6\u4ee3\u7801",children:[]},{value:"1.5 \u6dfb\u52a0\u81ea\u54ea\u4e2a shenyu \u7248\u672c",id:"15-\u6dfb\u52a0\u81ea\u54ea\u4e2a-shenyu-\u7248\u672c",children:[]},{value:"2.1 \u63d2\u4ef6\u4f7f\u7528\u6d41\u7a0b\u56fe",id:"21-\u63d2\u4ef6\u4f7f\u7528\u6d41\u7a0b\u56fe",children:[]},{value:"2.2 \u5bfc\u5165 pom",id:"22-\u5bfc\u5165-pom",children:[]},{value:"2.3 \u542f\u7528\u63d2\u4ef6",id:"23-\u542f\u7528\u63d2\u4ef6",children:[]},{value:"2.4 \u914d\u7f6e\u63d2\u4ef6",id:"24-\u914d\u7f6e\u63d2\u4ef6",children:[]},{value:"2.5 \u793a\u4f8b",id:"25-\u793a\u4f8b",children:[{value:"2.5.1 \u6dfb\u52a0\u8bf7\u6c42\u53c2\u6570",id:"251-\u6dfb\u52a0\u8bf7\u6c42\u53c2\u6570",children:[]}]}],g={toc:u},s="wrapper";function o(e){let{components:n,...t}=e;return(0,i.yg)(s,(0,r.A)({},g,t,{components:n,mdxType:"MDXLayout"}),(0,i.yg)("h1",{id:"1-\u6982\u8ff0"},"1. \u6982\u8ff0"),(0,i.yg)("h2",{id:"11-\u63d2\u4ef6\u540d\u79f0"},"1.1 \u63d2\u4ef6\u540d\u79f0"),(0,i.yg)("ul",null,(0,i.yg)("li",{parentName:"ul"},"Request(\u8bf7\u6c42)\u63d2\u4ef6")),(0,i.yg)("h2",{id:"12-\u9002\u7528\u573a\u666f"},"1.2 \u9002\u7528\u573a\u666f"),(0,i.yg)("ul",null,(0,i.yg)("li",{parentName:"ul"},"\u8bf7\u6c42\u63d2\u4ef6\u80fd\u591f\u5bf9 ",(0,i.yg)("inlineCode",{parentName:"li"},"uri")," \u7684\u8bf7\u6c42\u53c2\u6570\u8fdb\u884c\u81ea\u5b9a\u4e49\u4fee\u6539\u3002")),(0,i.yg)("h2",{id:"13-\u63d2\u4ef6\u529f\u80fd"},"1.3 \u63d2\u4ef6\u529f\u80fd"),(0,i.yg)("ul",null,(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("inlineCode",{parentName:"li"},"Apache ShenYu")," \u7f51\u5173\u5728\u5bf9\u76ee\u6807\u670d\u52a1\u8fdb\u884c\u4ee3\u7406\u8c03\u7528\u7684\u65f6\u5019\uff0c\u5141\u8bb8\u7528\u6237\u4f7f\u7528 ",(0,i.yg)("inlineCode",{parentName:"li"},"request")," \u63d2\u4ef6\u5bf9\u8bf7\u6c42\u53c2\u6570\u3001\u8bf7\u6c42\u5934\u4ee5\u53ca ",(0,i.yg)("inlineCode",{parentName:"li"},"Cookie")," \u6765\u6dfb\u52a0\u3001\u4fee\u6539\u3001\u79fb\u9664\u8bf7\u6c42\u5934\u3002")),(0,i.yg)("h2",{id:"14-\u63d2\u4ef6\u4ee3\u7801"},"1.4 \u63d2\u4ef6\u4ee3\u7801"),(0,i.yg)("ul",null,(0,i.yg)("li",{parentName:"ul"},"\u6838\u5fc3\u6a21\u5757 ",(0,i.yg)("inlineCode",{parentName:"li"},"shenyu-plugin-redirect")),(0,i.yg)("li",{parentName:"ul"},"\u6838\u5fc3\u7c7b ",(0,i.yg)("inlineCode",{parentName:"li"},"org.apache.shenyu.plugin.request.RequestPlugin"))),(0,i.yg)("h2",{id:"15-\u6dfb\u52a0\u81ea\u54ea\u4e2a-shenyu-\u7248\u672c"},"1.5 \u6dfb\u52a0\u81ea\u54ea\u4e2a shenyu \u7248\u672c"),(0,i.yg)("ul",null,(0,i.yg)("li",{parentName:"ul"},"2.4.0")),(0,i.yg)("h1",{id:"2-\u5982\u4f55\u4f7f\u7528\u63d2\u4ef6"},"2. \u5982\u4f55\u4f7f\u7528\u63d2\u4ef6"),(0,i.yg)("h2",{id:"21-\u63d2\u4ef6\u4f7f\u7528\u6d41\u7a0b\u56fe"},"2.1 \u63d2\u4ef6\u4f7f\u7528\u6d41\u7a0b\u56fe"),(0,i.yg)("img",{src:"/img/shenyu/plugin/request/request-plugin-procedure-zh.png",width:"40%",height:"30%"}),(0,i.yg)("h2",{id:"22-\u5bfc\u5165-pom"},"2.2 \u5bfc\u5165 pom"),(0,i.yg)("ul",null,(0,i.yg)("li",{parentName:"ul"},"\u5728\u7f51\u5173\u7684 ",(0,i.yg)("inlineCode",{parentName:"li"},"pom.xml")," \u6587\u4ef6\u4e2d\u6dfb\u52a0\u63d2\u4ef6 maven \u914d\u7f6e\uff0c\u9ed8\u8ba4\u5df2\u7ecf\u6dfb\u52a0\u3002")),(0,i.yg)("pre",null,(0,i.yg)("code",{parentName:"pre",className:"language-xml"},"  \x3c!-- apache shenyu request plugin start--\x3e\n  <dependency>\n      <groupId>org.apache.shenyu</groupId>\n      <artifactId>shenyu-spring-boot-starter-plugin-request</artifactId>\n     <version>${project.version}</version>\n  </dependency>\n  \x3c!-- apache shenyu request plugin end--\x3e\n")),(0,i.yg)("h2",{id:"23-\u542f\u7528\u63d2\u4ef6"},"2.3 \u542f\u7528\u63d2\u4ef6"),(0,i.yg)("ul",null,(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("p",{parentName:"li"},"\u5728 ",(0,i.yg)("inlineCode",{parentName:"p"},"shenyu-admin")," --\x3e \u57fa\u7840\u914d\u7f6e --\x3e \u63d2\u4ef6\u7ba1\u7406 --\x3e ",(0,i.yg)("inlineCode",{parentName:"p"},"request")," \u8bbe\u7f6e\u4e3a\u5f00\u542f\u3002"),(0,i.yg)("blockquote",{parentName:"li"},(0,i.yg)("p",{parentName:"blockquote"},"\u5982\u679c\u6b64\u5904\u9875\u9762\u4e0a\u5b58\u5728\u9700\u8981\u914d\u7f6e ",(0,i.yg)("inlineCode",{parentName:"p"},"ruleHandlePageType")," \u7684\u9009\u9879\uff0c\u53ef\u4ee5\u914d\u7f6e\u4efb\u4e00\u5b57\u7b26\u4e32\uff0c\u5982\uff1a",(0,i.yg)("inlineCode",{parentName:"p"},"custom"),"\uff0c\u5bf9\u8bf7\u6c42\u6ca1\u6709\u5f71\u54cd\uff0c\u540e\u9762\u7248\u672c\u4f1a\u79fb\u9664\u6389\u8be5\u9009\u9879\u3002")),(0,i.yg)("img",{src:"/img/shenyu/plugin/request/request-plugin-enable-zh.png",width:"70%",height:"60%"}))),(0,i.yg)("h2",{id:"24-\u914d\u7f6e\u63d2\u4ef6"},"2.4 \u914d\u7f6e\u63d2\u4ef6"),(0,i.yg)("ul",null,(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("p",{parentName:"li"},"\u9009\u62e9\u5668\u548c\u89c4\u5219\uff0c\u53ea\u6709\u5339\u914d\u7684\u8bf7\u6c42\uff0c\u624d\u4f1a\u8fdb\u884c\u8f6c\u53d1\u548c\u91cd\u5b9a\u5411\uff0c\u8bf7\u53c2\u8003\uff1a",(0,i.yg)("a",{parentName:"p",href:"../../user-guide/admin-usage/selector-and-rule"},"\u9009\u62e9\u5668\u89c4\u5219\u7ba1\u7406"),"\u3002")),(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("p",{parentName:"li"},(0,i.yg)("inlineCode",{parentName:"p"},"shenyu-admin"),"\u63d2\u4ef6\u5217\u8868 --\x3e ",(0,i.yg)("inlineCode",{parentName:"p"},"HttpProcess")," --\x3e ",(0,i.yg)("inlineCode",{parentName:"p"},"Request"),"\uff0c\u5148\u6dfb\u52a0\u9009\u62e9\u5668\uff0c\u7136\u540e\u6dfb\u52a0\u89c4\u5219\uff1a")),(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("p",{parentName:"li"},"\u6dfb\u52a0\u9009\u62e9\u5668\uff1a"),(0,i.yg)("img",{src:"/img/shenyu/plugin/request/request-plugin-selector-zh.png",width:"70%",height:"60%"})),(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("p",{parentName:"li"},"\u6dfb\u52a0\u89c4\u5219\uff1a"),(0,i.yg)("img",{src:"/img/shenyu/plugin/request/request-plugin-rule-zh.png",width:"70%",height:"60%"}))),(0,i.yg)("h2",{id:"25-\u793a\u4f8b"},"2.5 \u793a\u4f8b"),(0,i.yg)("h3",{id:"251-\u6dfb\u52a0\u8bf7\u6c42\u53c2\u6570"},"2.5.1 \u6dfb\u52a0\u8bf7\u6c42\u53c2\u6570"),(0,i.yg)("ul",null,(0,i.yg)("li",{parentName:"ul"},"\u6211\u4eec\u5728 ",(0,i.yg)("inlineCode",{parentName:"li"},"\u89c4\u5219")," \u914d\u7f6e\u81ea\u5b9a\u4e49\u8def\u5f84\u65f6\uff0c\u5e94\u8be5\u4e3a\u4e00\u4e2a\u53ef\u8fbe\u7684\u670d\u52a1\u8def\u5f84\u3002"),(0,i.yg)("li",{parentName:"ul"},"\u5f53\u5339\u914d\u5230\u8bf7\u6c42\u540e\uff0c\u6839\u636e\u81ea\u5b9a\u4e49\u7684\u8def\u5f84\uff0c",(0,i.yg)("inlineCode",{parentName:"li"},"Apache ShenYu"),"\u7f51\u5173\u4f1a\u8fdb\u884c\u670d\u52a1\u8df3\u8f6c\u3002")),(0,i.yg)("ol",null,(0,i.yg)("li",{parentName:"ol"},"\u53c2\u8003",(0,i.yg)("a",{parentName:"li",href:"https://shenyu.apache.org/zh/docs/deployment/deployment-local"},"\u672c\u5730\u90e8\u7f72"),"\u542f\u52a8 admin \u548c\u7f51\u5173"),(0,i.yg)("li",{parentName:"ol"},"\u53c2\u80032.2\u5bfc\u5165 pom \u5e76\u91cd\u542f\u7f51\u5173"),(0,i.yg)("li",{parentName:"ol"},"\u53c2\u80032.3\u542f\u7528\u63d2\u4ef6"),(0,i.yg)("li",{parentName:"ol"},"\u542f\u52a8 ",(0,i.yg)("a",{parentName:"li",href:"https://github.com/apache/shenyu/tree/master/shenyu-examples/shenyu-examples-http"},"shenyu-examples-http")," \u9879\u76ee"),(0,i.yg)("li",{parentName:"ol"},"\u53c2\u80032.4\u53ca",(0,i.yg)("a",{parentName:"li",href:"../../user-guide/admin-usage/selector-and-rule"},"\u9009\u62e9\u5668\u89c4\u5219\u7ba1\u7406"),"\u914d\u7f6e\u63d2\u4ef6\u89c4\u5219"),(0,i.yg)("li",{parentName:"ol"},"\u63a5\u53e3\u8c03\u7528\uff1a",(0,i.yg)("a",{parentName:"li",href:"https://github.com/apache/shenyu/blob/master/shenyu-examples/shenyu-examples-http/src/main/http/http-test-api.http"},"http-test-api.http"))),(0,i.yg)("ul",null,(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("p",{parentName:"li"},"\u8c03\u7528\u9009\u62e9\u5668\u548c\u89c4\u5219\u58f0\u660e\u7684\u63a5\u53e3\uff0c\u5c06\u4f1a\u770b\u5230request\u63d2\u4ef6\u4e2d\u914d\u7f6e\u7684\u8bf7\u6c42\u53c2\u6570\u3002"),(0,i.yg)("img",{src:"/img/shenyu/plugin/request/request-plugin-example-zh.png",width:"70%",height:"60%"}))),(0,i.yg)("h1",{id:"3-\u5982\u4f55\u7981\u7528\u63d2\u4ef6"},"3. \u5982\u4f55\u7981\u7528\u63d2\u4ef6"),(0,i.yg)("ul",null,(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("p",{parentName:"li"},"\u5728 ",(0,i.yg)("inlineCode",{parentName:"p"},"shenyu-admin")," --\x3e \u57fa\u7840\u914d\u7f6e --\x3e \u63d2\u4ef6\u7ba1\u7406 --\x3e ",(0,i.yg)("inlineCode",{parentName:"p"},"Request")," \u8bbe\u7f6e\u4e3a\u7981\u7528\u3002"),(0,i.yg)("img",{src:"/img/shenyu/plugin/request/request-plugin-disable-zh.png",width:"70%",height:"60%"}))))}o.isMDXComponent=!0}}]);