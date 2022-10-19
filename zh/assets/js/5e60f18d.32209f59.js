"use strict";(self.webpackChunkshenyu_website=self.webpackChunkshenyu_website||[]).push([[97619],{3905:(e,n,t)=>{t.d(n,{Zo:()=>o,kt:()=>s});var a=t(67294);function r(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function i(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,a)}return t}function l(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?i(Object(t),!0).forEach((function(n){r(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function p(e,n){if(null==e)return{};var t,a,r=function(e,n){if(null==e)return{};var t,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)t=i[a],n.indexOf(t)>=0||(r[t]=e[t]);return r}(e,n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)t=i[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}var u=a.createContext({}),m=function(e){var n=a.useContext(u),t=n;return e&&(t="function"==typeof e?e(n):l(l({},n),e)),t},o=function(e){var n=m(e.components);return a.createElement(u.Provider,{value:n},e.children)},d={inlineCode:"code",wrapper:function(e){var n=e.children;return a.createElement(a.Fragment,{},n)}},c=a.forwardRef((function(e,n){var t=e.components,r=e.mdxType,i=e.originalType,u=e.parentName,o=p(e,["components","mdxType","originalType","parentName"]),c=m(t),s=r,k=c["".concat(u,".").concat(s)]||c[s]||d[s]||i;return t?a.createElement(k,l(l({ref:n},o),{},{components:t})):a.createElement(k,l({ref:n},o))}));function s(e,n){var t=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var i=t.length,l=new Array(i);l[0]=c;var p={};for(var u in n)hasOwnProperty.call(n,u)&&(p[u]=n[u]);p.originalType=e,p.mdxType="string"==typeof e?e:r,l[1]=p;for(var m=2;m<i;m++)l[m]=t[m];return a.createElement.apply(null,l)}return a.createElement.apply(null,t)}c.displayName="MDXCreateElement"},33647:(e,n,t)=>{t.r(n),t.d(n,{contentTitle:()=>l,default:()=>o,frontMatter:()=>i,metadata:()=>p,toc:()=>u});var a=t(87462),r=(t(67294),t(3905));const i={title:"Param-mapping\u63d2\u4ef6",keywords:["Param-mapping"],description:"Param-mapping\u63d2\u4ef6"},l="1. \u6982\u8ff0",p={unversionedId:"plugin-center/http-handle/param-mapping-plugin",id:"version-2.4.0/plugin-center/http-handle/param-mapping-plugin",isDocsHomePage:!1,title:"Param-mapping\u63d2\u4ef6",description:"Param-mapping\u63d2\u4ef6",source:"@site/i18n/zh/docusaurus-plugin-content-docs/version-2.4.0/plugin-center/http-handle/param-mapping-plugin.md",sourceDirName:"plugin-center/http-handle",slug:"/plugin-center/http-handle/param-mapping-plugin",permalink:"/zh/docs/2.4.0/plugin-center/http-handle/param-mapping-plugin",editUrl:"https://github.com/apache/shenyu-website/edit/main/i18n/zh/docusaurus-plugin-content-docs/version-2.4.0/plugin-center/http-handle/param-mapping-plugin.md",version:"2.4.0",frontMatter:{title:"Param-mapping\u63d2\u4ef6",keywords:["Param-mapping"],description:"Param-mapping\u63d2\u4ef6"},sidebar:"version-2.4.0/tutorialSidebar",previous:{title:"ModifyResponse\u63d2\u4ef6",permalink:"/zh/docs/2.4.0/plugin-center/http-handle/modify-response-plugin"},next:{title:"Redirect\u63d2\u4ef6",permalink:"/zh/docs/2.4.0/plugin-center/http-handle/redirect-plugin"}},u=[{value:"1.1 \u63d2\u4ef6\u540d\u79f0",id:"11-\u63d2\u4ef6\u540d\u79f0",children:[]},{value:"1.2 \u9002\u7528\u573a\u666f",id:"12-\u9002\u7528\u573a\u666f",children:[]},{value:"1.3 \u63d2\u4ef6\u529f\u80fd",id:"13-\u63d2\u4ef6\u529f\u80fd",children:[]},{value:"1.4 \u63d2\u4ef6\u4ee3\u7801",id:"14-\u63d2\u4ef6\u4ee3\u7801",children:[]},{value:"1.5 \u6dfb\u52a0\u81ea\u54ea\u4e2ashenyu\u7248\u672c",id:"15-\u6dfb\u52a0\u81ea\u54ea\u4e2ashenyu\u7248\u672c",children:[]},{value:"2.1 \u63d2\u4ef6\u4f7f\u7528\u6d41\u7a0b\u56fe",id:"21-\u63d2\u4ef6\u4f7f\u7528\u6d41\u7a0b\u56fe",children:[]},{value:"2.2 \u5bfc\u5165pom",id:"22-\u5bfc\u5165pom",children:[]},{value:"2.3 \u542f\u7528\u63d2\u4ef6",id:"23-\u542f\u7528\u63d2\u4ef6",children:[]},{value:"2.4 \u914d\u7f6e\u63d2\u4ef6",id:"24-\u914d\u7f6e\u63d2\u4ef6",children:[{value:"2.4.1 \u63d2\u4ef6\u914d\u7f6e",id:"241-\u63d2\u4ef6\u914d\u7f6e",children:[]},{value:"2.4.2 \u9009\u62e9\u5668\u914d\u7f6e",id:"242-\u9009\u62e9\u5668\u914d\u7f6e",children:[]},{value:"2.4.3 \u89c4\u5219\u914d\u7f6e",id:"243-\u89c4\u5219\u914d\u7f6e",children:[]}]},{value:"2.5 \u793a\u4f8b",id:"25-\u793a\u4f8b",children:[{value:"2.5.1 \u5728\u8bf7\u6c42\u4e2d\u6dfb\u52a0\u53c2\u6570",id:"251-\u5728\u8bf7\u6c42\u4e2d\u6dfb\u52a0\u53c2\u6570",children:[]}]}],m={toc:u};function o(e){let{components:n,...i}=e;return(0,r.kt)("wrapper",(0,a.Z)({},m,i,{components:n,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"1-\u6982\u8ff0"},"1. \u6982\u8ff0"),(0,r.kt)("h2",{id:"11-\u63d2\u4ef6\u540d\u79f0"},"1.1 \u63d2\u4ef6\u540d\u79f0"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"paramMapping\u63d2\u4ef6")),(0,r.kt)("h2",{id:"12-\u9002\u7528\u573a\u666f"},"1.2 \u9002\u7528\u573a\u666f"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"\u6dfb\u52a0/\u5220\u9664/\u66ff\u6362\u8bf7\u6c42\u4f53\u4e2d\u56fa\u5b9a\u7684\u53c2\u6570")),(0,r.kt)("h2",{id:"13-\u63d2\u4ef6\u529f\u80fd"},"1.3 \u63d2\u4ef6\u529f\u80fd"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"\u7528\u6765\u5bf9\u4f60\u7684\u8bf7\u6c42\u53c2\u6570\u8fdb\u884c\u4fee\u6539\u7684\u63d2\u4ef6\u3002")),(0,r.kt)("h2",{id:"14-\u63d2\u4ef6\u4ee3\u7801"},"1.4 \u63d2\u4ef6\u4ee3\u7801"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"\u6838\u5fc3\u6a21\u5757 ",(0,r.kt)("inlineCode",{parentName:"p"},"shenyu-plugin-param-mapping"))),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"\u6838\u5fc3\u7c7b ",(0,r.kt)("inlineCode",{parentName:"p"},"org.apache.shenyu.plugin.param.mapping.ParamMappingPlugin")))),(0,r.kt)("h2",{id:"15-\u6dfb\u52a0\u81ea\u54ea\u4e2ashenyu\u7248\u672c"},"1.5 \u6dfb\u52a0\u81ea\u54ea\u4e2ashenyu\u7248\u672c"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Since ShenYu 2.4.0")),(0,r.kt)("h1",{id:"2-\u5982\u4f55\u4f7f\u7528\u63d2\u4ef6"},"2. \u5982\u4f55\u4f7f\u7528\u63d2\u4ef6"),(0,r.kt)("h2",{id:"21-\u63d2\u4ef6\u4f7f\u7528\u6d41\u7a0b\u56fe"},"2.1 \u63d2\u4ef6\u4f7f\u7528\u6d41\u7a0b\u56fe"),(0,r.kt)("p",null,(0,r.kt)("img",{src:t(26692).Z})),(0,r.kt)("h2",{id:"22-\u5bfc\u5165pom"},"2.2 \u5bfc\u5165pom"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"\u5728\u7f51\u5173\u7684 ",(0,r.kt)("inlineCode",{parentName:"li"},"pom.xml")," \u6587\u4ef6\u4e2d\u6dfb\u52a0 ",(0,r.kt)("inlineCode",{parentName:"li"},"paramMapping")," \u7684\u652f\u6301\u3002")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-xml"},"\x3c!-- apache shenyu param_mapping plugin start--\x3e\n<dependency>\n    <groupId>org.apache.shenyu</groupId>\n    <artifactId>shenyu-spring-boot-starter-plugin-param-mapping</artifactId>\n    <version>${project.version}</version>\n</dependency>\n\x3c!-- apache shenyu param_mapping plugin end--\x3e\n")),(0,r.kt)("h2",{id:"23-\u542f\u7528\u63d2\u4ef6"},"2.3 \u542f\u7528\u63d2\u4ef6"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"\u5728 ",(0,r.kt)("inlineCode",{parentName:"li"},"shenyu-admin")," --\x3e \u57fa\u7840\u914d\u7f6e --\x3e \u63d2\u4ef6\u7ba1\u7406 --\x3e ",(0,r.kt)("inlineCode",{parentName:"li"},"paramMapping")," \u8bbe\u7f6e\u4e3a\u5f00\u542f\u3002")),(0,r.kt)("h2",{id:"24-\u914d\u7f6e\u63d2\u4ef6"},"2.4 \u914d\u7f6e\u63d2\u4ef6"),(0,r.kt)("h3",{id:"241-\u63d2\u4ef6\u914d\u7f6e"},"2.4.1 \u63d2\u4ef6\u914d\u7f6e"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"\u518d\u4f7f\u7528\u63d2\u4ef6\u65f6\u5e94\u8be5\u5f00\u542f\u63d2\u4ef6\uff01")),(0,r.kt)("h3",{id:"242-\u9009\u62e9\u5668\u914d\u7f6e"},"2.4.2 \u9009\u62e9\u5668\u914d\u7f6e"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"\u9009\u62e9\u5668\u548c\u89c4\u5219\u8bbe\u7f6e\uff0c\u8bf7\u53c2\u8003\uff1a",(0,r.kt)("a",{parentName:"p",href:"../../user-guide/admin-usage/selector-and-rule"},"\u9009\u62e9\u5668\u548c\u89c4\u5219\u7ba1\u7406"),"\u3002")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"\u53ea\u6709\u5339\u914d\u7684\u8bf7\u6c42\uff0c\u624d\u4f1a\u4fee\u6539\u8bf7\u6c42\u4f53\u3002"))),(0,r.kt)("h3",{id:"243-\u89c4\u5219\u914d\u7f6e"},"2.4.3 \u89c4\u5219\u914d\u7f6e"),(0,r.kt)("p",null,(0,r.kt)("img",{src:t(64591).Z})),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"\u53c2\u6570\u89e3\u6790:"),(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"addParameterKeys"),": \u5728\u8bf7\u6c42\u4f53\u4e2d\u589e\u52a0\u4e00\u4e2a ",(0,r.kt)("inlineCode",{parentName:"li"},"key-value")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"replaceParameterKeys"),": \u66ff\u6362\u8bf7\u6c42\u4f53\u4e2d\u7684\u67d0\u4e00\u4e2a ",(0,r.kt)("inlineCode",{parentName:"li"},"key")," \uff0c",(0,r.kt)("inlineCode",{parentName:"li"},"key")," \u662f\u8981\u88ab\u66ff\u6362\u7684\u503c\uff0c",(0,r.kt)("inlineCode",{parentName:"li"},"value")," \u662f\u66ff\u6362\u540e\u7684\u503c"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"removeParameterKeys"),": \u79fb\u9664\u8bf7\u6c42\u4f53\u4e2d\u7684\u67d0\u4e00\u4e2a ",(0,r.kt)("inlineCode",{parentName:"li"},"key")))),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"\u4fee\u6539\u8bf7\u6c42\u4f53\u662f\u901a\u8fc7 ",(0,r.kt)("inlineCode",{parentName:"p"},"JSONPath")," \u6765\u5b9e\u73b0\u7684\uff0c ",(0,r.kt)("inlineCode",{parentName:"p"},"$.")," \u4ee3\u8868\u6839\u76ee\u5f55"))),(0,r.kt)("h2",{id:"25-\u793a\u4f8b"},"2.5 \u793a\u4f8b"),(0,r.kt)("h3",{id:"251-\u5728\u8bf7\u6c42\u4e2d\u6dfb\u52a0\u53c2\u6570"},"2.5.1 \u5728\u8bf7\u6c42\u4e2d\u6dfb\u52a0\u53c2\u6570"),(0,r.kt)("h4",{id:"2511-\u914d\u7f6e\u63d2\u4ef6"},"2.5.1.1 \u914d\u7f6e\u63d2\u4ef6"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"\u4f7f\u7528\u8be5\u63d2\u4ef6\u65f6\u5e94\u5148\u5f00\u542f\u63d2\u4ef6\uff01")),(0,r.kt)("h4",{id:"2512-\u9009\u62e9\u5668\u914d\u7f6e"},"2.5.1.2 \u9009\u62e9\u5668\u914d\u7f6e"),(0,r.kt)("h4",{id:"2513-\u89c4\u5219\u914d\u7f6e"},"2.5.1.3 \u89c4\u5219\u914d\u7f6e"),(0,r.kt)("p",null,(0,r.kt)("img",{src:t(64591).Z})),(0,r.kt)("p",null,"\u4e0a\u9762\u7684\u914d\u7f6e\uff0c\u63d2\u4ef6\u5f00\u542f\u524d\uff0c\u8bf7\u6c42\u5185\u5bb9\u4e3a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-json"},'{"id":3,"data":{"value":"18","age":"36"}}\n')),(0,r.kt)("h4",{id:"2514-\u9a8c\u8bc1\u7ed3\u679c"},"2.5.1.4 \u9a8c\u8bc1\u7ed3\u679c"),(0,r.kt)("p",null,"\u63d2\u4ef6\u5f00\u542f\u540e\uff0c\u8bf7\u6c42\u5185\u5bb9\u4e3a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-json"},'{"name":"shenyu","userId":3,"data":{"age":"36"}}\n')),(0,r.kt)("p",null,"\u4e0a\u8ff0\u64cd\u4f5c\uff0c\u589e\u52a0\u4e00\u4e2a",(0,r.kt)("inlineCode",{parentName:"p"},"name:shenyu"),"\uff0c\u628a",(0,r.kt)("inlineCode",{parentName:"p"},"id"),"\u66ff\u6362\u4e3a",(0,r.kt)("inlineCode",{parentName:"p"},"userId"),"\uff0c\u79fb\u9664",(0,r.kt)("inlineCode",{parentName:"p"},"data"),"\u4e2d\u7684",(0,r.kt)("inlineCode",{parentName:"p"},"value")," \u3002"),(0,r.kt)("h1",{id:"3-\u5982\u4f55\u7981\u7528\u63d2\u4ef6"},"3. \u5982\u4f55\u7981\u7528\u63d2\u4ef6"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"\u5728 ",(0,r.kt)("inlineCode",{parentName:"li"},"shenyu-admin")," --\x3e \u57fa\u7840\u914d\u7f6e --\x3e \u63d2\u4ef6\u7ba1\u7406 --\x3e ",(0,r.kt)("inlineCode",{parentName:"li"},"paramMapping")," \u8bbe\u7f6e\u4e3a\u5173\u95ed\u3002")))}o.isMDXComponent=!0},64591:(e,n,t)=>{t.d(n,{Z:()=>a});const a=t.p+"assets/images/param-mapping-48f0bc50c54e2044a1904fe4870ba9b5.png"},26692:(e,n,t)=>{t.d(n,{Z:()=>a});const a=t.p+"assets/images/plugin_use_zh-cf88744e5c4b7cc85accbcf32af6e1a3.jpg"}}]);