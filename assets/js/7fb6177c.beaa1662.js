"use strict";(self.webpackChunkshenyu_website=self.webpackChunkshenyu_website||[]).push([[82290],{15680:(e,n,t)=>{t.d(n,{xA:()=>s,yg:()=>b});var r=t(96540);function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function o(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function i(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?o(Object(t),!0).forEach((function(n){a(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function l(e,n){if(null==e)return{};var t,r,a=function(e,n){if(null==e)return{};var t,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var u=r.createContext({}),p=function(e){var n=r.useContext(u),t=n;return e&&(t="function"==typeof e?e(n):i(i({},n),e)),t},s=function(e){var n=p(e.components);return r.createElement(u.Provider,{value:n},e.children)},g="mdxType",d={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},c=r.forwardRef((function(e,n){var t=e.components,a=e.mdxType,o=e.originalType,u=e.parentName,s=l(e,["components","mdxType","originalType","parentName"]),g=p(t),c=a,b=g["".concat(u,".").concat(c)]||g[c]||d[c]||o;return t?r.createElement(b,i(i({ref:n},s),{},{components:t})):r.createElement(b,i({ref:n},s))}));function b(e,n){var t=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var o=t.length,i=new Array(o);i[0]=c;var l={};for(var u in n)hasOwnProperty.call(n,u)&&(l[u]=n[u]);l.originalType=e,l[g]="string"==typeof e?e:a,i[1]=l;for(var p=2;p<o;p++)i[p]=t[p];return r.createElement.apply(null,i)}return r.createElement.apply(null,t)}c.displayName="MDXCreateElement"},65747:(e,n,t)=>{t.r(n),t.d(n,{contentTitle:()=>i,default:()=>g,frontMatter:()=>o,metadata:()=>l,toc:()=>u});var r=t(58168),a=(t(96540),t(15680));const o={sidebar_position:2,title:"Dubbo Plugin",keywords:["dubbo"],description:"dubbo plugin"},i=void 0,l={unversionedId:"plugins/dubbo-plugin",id:"version-2.3.0-Legacy/plugins/dubbo-plugin",isDocsHomePage:!1,title:"Dubbo Plugin",description:"dubbo plugin",source:"@site/versioned_docs/version-2.3.0-Legacy/plugins/dubbo-plugin.md",sourceDirName:"plugins",slug:"/plugins/dubbo-plugin",permalink:"/docs/2.3.0-Legacy/plugins/dubbo-plugin",editUrl:"https://github.com/apache/shenyu-website/edit/main/versioned_docs/version-2.3.0-Legacy/plugins/dubbo-plugin.md",version:"2.3.0-Legacy",sidebarPosition:2,frontMatter:{sidebar_position:2,title:"Dubbo Plugin",keywords:["dubbo"],description:"dubbo plugin"},sidebar:"version-2.3.0-Legacy/tutorialSidebar",previous:{title:"Divide Plugin",permalink:"/docs/2.3.0-Legacy/plugins/divide-plugin"},next:{title:"SpringCloud Plugin",permalink:"/docs/2.3.0-Legacy/plugins/spring-cloud-plugin"}},u=[{value:"Explanation",id:"explanation",children:[]},{value:"Plugin Setting",id:"plugin-setting",children:[]},{value:"Metadata",id:"metadata",children:[]}],p={toc:u},s="wrapper";function g(e){let{components:n,...t}=e;return(0,a.yg)(s,(0,r.A)({},p,t,{components:n,mdxType:"MDXLayout"}),(0,a.yg)("h2",{id:"explanation"},"Explanation"),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},"Dubbo is a plugin that converts ",(0,a.yg)("inlineCode",{parentName:"li"},"http protocol")," into ",(0,a.yg)("inlineCode",{parentName:"li"},"Dubbo protocol")," and it is also the key for gateway to realize dubbo generic service."),(0,a.yg)("li",{parentName:"ul"},"Dubbo plugin needs to cooperate with metadata to realize dubbo calls, please refer to: ",(0,a.yg)("a",{parentName:"li",href:"../design/meta-data"},"metaData"),"."),(0,a.yg)("li",{parentName:"ul"},"Apache dubbo and alibaba dubbo users both use the same plugin.")),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-xml"},"  \x3c!--if you use dubbo start this--\x3e\n   <dependency>\n       <groupId>org.dromara</groupId>\n       <artifactId>soul-spring-boot-starter-plugin-alibab-dubbo</artifactId>\n       <version>${last.version}</version>\n   </dependency>\n\n   <dependency>\n       <groupId>org.dromara</groupId>\n       <artifactId>soul-spring-boot-starter-plugin-apache-dubbo</artifactId>\n       <version>${last.version}</version>\n   </dependency>\n")),(0,a.yg)("h2",{id:"plugin-setting"},"Plugin Setting"),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("p",{parentName:"li"},"In ",(0,a.yg)("inlineCode",{parentName:"p"},"soul-admin")," --\x3e plugin management-> ",(0,a.yg)("inlineCode",{parentName:"p"},"dubbo")," setting enable.")),(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("p",{parentName:"li"},"In the configuration of dubbo plugin, the configuration is as follows: Configure the registration center of dubbo."))),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-yaml"},'{"register":"zookeeper://localhost:2181"} or {"register":"nacos://localhost:8848"} \n')),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("p",{parentName:"li"},"Plugin needs to cooperate with ",(0,a.yg)("inlineCode",{parentName:"p"},"starter")," to take effect, please refer to: ",(0,a.yg)("a",{parentName:"p",href:"../users-guide/dubbo-proxy"},"user-dubbo"),".")),(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("p",{parentName:"li"},"Selectors and rules, please refer to: ",(0,a.yg)("a",{parentName:"p",href:"../admin/selector-and-rule"},"selector"),"."))),(0,a.yg)("h2",{id:"metadata"},"Metadata"),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},"Every dubbo interface method corresponds to a piece of metadata, which can be found in soul-admin --\x3emetadata management."),(0,a.yg)("li",{parentName:"ul"},"Path: your http request."),(0,a.yg)("li",{parentName:"ul"},"RPC extension parameters, corresponding to some configurations of dubbo interface; If you want to adjust, please modify here, which support json format like the following fields:")),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-yaml"},'{"timeout":10000,"group":"",version":"","loadbalance":"","retries":1}\n')))}g.isMDXComponent=!0}}]);