"use strict";(self.webpackChunkshenyu_website=self.webpackChunkshenyu_website||[]).push([[15996],{14965:(e,r,n)=>{n.r(r),n.d(r,{contentTitle:()=>a,default:()=>d,frontMatter:()=>l,metadata:()=>p,toc:()=>c});var t=n(58168),i=(n(96540),n(15680));const l={title:"Redirect\u63d2\u4ef6",keywords:["redirect"],description:"redirect\u63d2\u4ef6"},a=void 0,p={unversionedId:"plugin-center/http-process/redirect-plugin",id:"version-2.4.2/plugin-center/http-process/redirect-plugin",isDocsHomePage:!1,title:"Redirect\u63d2\u4ef6",description:"redirect\u63d2\u4ef6",source:"@site/i18n/zh/docusaurus-plugin-content-docs/version-2.4.2/plugin-center/http-process/redirect-plugin.md",sourceDirName:"plugin-center/http-process",slug:"/plugin-center/http-process/redirect-plugin",permalink:"/zh/docs/2.4.2/plugin-center/http-process/redirect-plugin",editUrl:"https://github.com/apache/shenyu-website/edit/main/i18n/zh/docusaurus-plugin-content-docs/version-2.4.2/plugin-center/http-process/redirect-plugin.md",version:"2.4.2",frontMatter:{title:"Redirect\u63d2\u4ef6",keywords:["redirect"],description:"redirect\u63d2\u4ef6"},sidebar:"version-2.4.2/tutorialSidebar",previous:{title:"ParamMapping\u63d2\u4ef6",permalink:"/zh/docs/2.4.2/plugin-center/http-process/parammapping-plugin"},next:{title:"Request\u63d2\u4ef6",permalink:"/zh/docs/2.4.2/plugin-center/http-process/request-plugin"}},c=[{value:"\u8bf4\u660e",id:"\u8bf4\u660e",children:[]},{value:"\u63d2\u4ef6\u8bbe\u7f6e",id:"\u63d2\u4ef6\u8bbe\u7f6e",children:[]},{value:"\u63d2\u4ef6\u4f7f\u7528",id:"\u63d2\u4ef6\u4f7f\u7528",children:[]},{value:"\u573a\u666f",id:"\u573a\u666f",children:[]}],o={toc:c},u="wrapper";function d(e){let{components:r,...n}=e;return(0,i.yg)(u,(0,t.A)({},o,n,{components:r,mdxType:"MDXLayout"}),(0,i.yg)("h2",{id:"\u8bf4\u660e"},"\u8bf4\u660e"),(0,i.yg)("ul",null,(0,i.yg)("li",{parentName:"ul"},"Apache ShenYu \u7f51\u5173\u5728\u5bf9\u76ee\u6807\u670d\u52a1\u8fdb\u884c\u4ee3\u7406\u8c03\u7528\u7684\u65f6\u5019\uff0c\u5141\u8bb8\u7528\u6237\u4f7f\u7528 ",(0,i.yg)("inlineCode",{parentName:"li"},"redirect")," \u63d2\u4ef6\u6765\u91cd\u5b9a\u5411\u8bf7\u6c42\u3002")),(0,i.yg)("h2",{id:"\u63d2\u4ef6\u8bbe\u7f6e"},"\u63d2\u4ef6\u8bbe\u7f6e"),(0,i.yg)("ul",null,(0,i.yg)("li",{parentName:"ul"},"\u5728 ",(0,i.yg)("inlineCode",{parentName:"li"},"shenyu-admin")," --\x3e \u57fa\u7840\u914d\u7f6e --\x3e \u63d2\u4ef6\u7ba1\u7406 --\x3e ",(0,i.yg)("inlineCode",{parentName:"li"},"redirect"),"\uff0c\u8bbe\u7f6e\u4e3a\u5f00\u542f\u3002"),(0,i.yg)("li",{parentName:"ul"},"\u5982\u679c\u7528\u6237\u4e0d\u9700\u8981\uff0c\u53ef\u4ee5\u628a\u63d2\u4ef6\u7981\u7528\u3002")),(0,i.yg)("img",{src:"/img/shenyu/plugin/redirect/redirect-plugin-enable-zh.png",width:"70%",height:"60%"}),(0,i.yg)("h2",{id:"\u63d2\u4ef6\u4f7f\u7528"},"\u63d2\u4ef6\u4f7f\u7528"),(0,i.yg)("ul",null,(0,i.yg)("li",{parentName:"ul"},"\u5728\u7f51\u5173\u7684 ",(0,i.yg)("inlineCode",{parentName:"li"},"pom.xml")," \u6587\u4ef6\u4e2d\u6dfb\u52a0 ",(0,i.yg)("inlineCode",{parentName:"li"},"redirect")," \u7684\u652f\u6301\u3002")),(0,i.yg)("pre",null,(0,i.yg)("code",{parentName:"pre",className:"language-xml"},"  \x3c!-- apache shenyu redirect plugin start--\x3e\n  <dependency>\n      <groupId>org.apache.shenyu</groupId>\n      <artifactId>shenyu-spring-boot-starter-plugin-redirect</artifactId>\n     <version>${project.version}</version>\n  </dependency>\n  \x3c!-- apache shenyu redirect plugin end--\x3e\n")),(0,i.yg)("ul",null,(0,i.yg)("li",{parentName:"ul"},"\u9009\u62e9\u5668\u548c\u89c4\u5219\uff0c\u53ea\u6709\u5339\u914d\u7684\u8bf7\u6c42\uff0c\u624d\u4f1a\u8fdb\u884c\u8f6c\u53d1\u548c\u91cd\u5b9a\u5411\uff0c\u8bf7\u53c2\u8003\uff1a",(0,i.yg)("a",{parentName:"li",href:"../../user-guide/admin-usage/selector-and-rule"},"\u9009\u62e9\u5668\u89c4\u5219\u7ba1\u7406"),"\u3002")),(0,i.yg)("h2",{id:"\u573a\u666f"},"\u573a\u666f"),(0,i.yg)("blockquote",null,(0,i.yg)("p",{parentName:"blockquote"},"\u987e\u540d\u601d\u4e49\uff0c",(0,i.yg)("inlineCode",{parentName:"p"},"redirect")," \u63d2\u4ef6\u5c31\u662f\u5bf9 ",(0,i.yg)("inlineCode",{parentName:"p"},"uri")," \u7684\u91cd\u65b0\u8f6c\u53d1\u548c\u91cd\u5b9a\u5411\u3002")),(0,i.yg)("h4",{id:"\u91cd\u5b9a\u5411"},"\u91cd\u5b9a\u5411"),(0,i.yg)("ul",null,(0,i.yg)("li",{parentName:"ul"},"\u6211\u4eec\u5728 ",(0,i.yg)("inlineCode",{parentName:"li"},"Rule")," \u914d\u7f6e\u81ea\u5b9a\u4e49\u8def\u5f84\u65f6\uff0c\u5e94\u8be5\u4e3a\u4e00\u4e2a\u53ef\u8fbe\u7684\u670d\u52a1\u8def\u5f84\u3002"),(0,i.yg)("li",{parentName:"ul"},"\u5f53\u5339\u914d\u5230\u8bf7\u6c42\u540e\uff0c\u6839\u636e\u81ea\u5b9a\u4e49\u7684\u8def\u5f84\uff0c",(0,i.yg)("inlineCode",{parentName:"li"},"Apache ShenYu"),"\u7f51\u5173\u4f1a\u8fdb\u884c ",(0,i.yg)("inlineCode",{parentName:"li"},"308")," \u670d\u52a1\u8df3\u8f6c\u3002")),(0,i.yg)("img",{src:"/img/shenyu/plugin/redirect/redirect-plugin-rule-zh.png",width:"70%",height:"60%"}),(0,i.yg)("h4",{id:"\u7f51\u5173\u81ea\u8eab\u63a5\u53e3\u8f6c\u53d1"},"\u7f51\u5173\u81ea\u8eab\u63a5\u53e3\u8f6c\u53d1"),(0,i.yg)("ul",null,(0,i.yg)("li",{parentName:"ul"},"\u5f53\u6ee1\u8db3\u5339\u914d\u89c4\u5219\u65f6\uff0c\u670d\u52a1\u5185\u90e8\u4f1a\u4f7f\u7528 ",(0,i.yg)("inlineCode",{parentName:"li"},"DispatcherHandler")," \u5185\u90e8\u63a5\u53e3\u8f6c\u53d1\u3002"),(0,i.yg)("li",{parentName:"ul"},"\u8981\u5b9e\u73b0\u7f51\u5173\u81ea\u8eab\u63a5\u53e3\u8f6c\u53d1\uff0c\u6211\u4eec\u9700\u8981\u5728\u914d\u7f6e\u8def\u5f84\u4f7f\u7528 ",(0,i.yg)("inlineCode",{parentName:"li"},"/")," \u4f5c\u4e3a\u524d\u7f00\u5f00\u59cb\uff0c\u5177\u4f53\u914d\u7f6e\u5982\u4e0b\u56fe\u3002")),(0,i.yg)("img",{src:"/img/shenyu/plugin/redirect/redirect-plugin-forward-rule-zh.png",width:"70%",height:"60%"}))}d.isMDXComponent=!0},15680:(e,r,n)=>{n.d(r,{xA:()=>u,yg:()=>y});var t=n(96540);function i(e,r,n){return r in e?Object.defineProperty(e,r,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[r]=n,e}function l(e,r){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);r&&(t=t.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),n.push.apply(n,t)}return n}function a(e){for(var r=1;r<arguments.length;r++){var n=null!=arguments[r]?arguments[r]:{};r%2?l(Object(n),!0).forEach((function(r){i(e,r,n[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(n,r))}))}return e}function p(e,r){if(null==e)return{};var n,t,i=function(e,r){if(null==e)return{};var n,t,i={},l=Object.keys(e);for(t=0;t<l.length;t++)n=l[t],r.indexOf(n)>=0||(i[n]=e[n]);return i}(e,r);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(t=0;t<l.length;t++)n=l[t],r.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var c=t.createContext({}),o=function(e){var r=t.useContext(c),n=r;return e&&(n="function"==typeof e?e(r):a(a({},r),e)),n},u=function(e){var r=o(e.components);return t.createElement(c.Provider,{value:r},e.children)},d="mdxType",g={inlineCode:"code",wrapper:function(e){var r=e.children;return t.createElement(t.Fragment,{},r)}},s=t.forwardRef((function(e,r){var n=e.components,i=e.mdxType,l=e.originalType,c=e.parentName,u=p(e,["components","mdxType","originalType","parentName"]),d=o(n),s=i,y=d["".concat(c,".").concat(s)]||d[s]||g[s]||l;return n?t.createElement(y,a(a({ref:r},u),{},{components:n})):t.createElement(y,a({ref:r},u))}));function y(e,r){var n=arguments,i=r&&r.mdxType;if("string"==typeof e||i){var l=n.length,a=new Array(l);a[0]=s;var p={};for(var c in r)hasOwnProperty.call(r,c)&&(p[c]=r[c]);p.originalType=e,p[d]="string"==typeof e?e:i,a[1]=p;for(var o=2;o<l;o++)a[o]=n[o];return t.createElement.apply(null,a)}return t.createElement.apply(null,n)}s.displayName="MDXCreateElement"}}]);