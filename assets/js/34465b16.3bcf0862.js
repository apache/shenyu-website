"use strict";(self.webpackChunkshenyu_website=self.webpackChunkshenyu_website||[]).push([[54792],{15680:(e,n,t)=>{t.d(n,{xA:()=>s,yg:()=>f});var i=t(96540);function r(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function a(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);n&&(i=i.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,i)}return t}function l(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?a(Object(t),!0).forEach((function(n){r(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):a(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function o(e,n){if(null==e)return{};var t,i,r=function(e,n){if(null==e)return{};var t,i,r={},a=Object.keys(e);for(i=0;i<a.length;i++)t=a[i],n.indexOf(t)>=0||(r[t]=e[t]);return r}(e,n);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(i=0;i<a.length;i++)t=a[i],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}var p=i.createContext({}),u=function(e){var n=i.useContext(p),t=n;return e&&(t="function"==typeof e?e(n):l(l({},n),e)),t},s=function(e){var n=u(e.components);return i.createElement(p.Provider,{value:n},e.children)},c="mdxType",g={inlineCode:"code",wrapper:function(e){var n=e.children;return i.createElement(i.Fragment,{},n)}},d=i.forwardRef((function(e,n){var t=e.components,r=e.mdxType,a=e.originalType,p=e.parentName,s=o(e,["components","mdxType","originalType","parentName"]),c=u(t),d=r,f=c["".concat(p,".").concat(d)]||c[d]||g[d]||a;return t?i.createElement(f,l(l({ref:n},s),{},{components:t})):i.createElement(f,l({ref:n},s))}));function f(e,n){var t=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var a=t.length,l=new Array(a);l[0]=d;var o={};for(var p in n)hasOwnProperty.call(n,p)&&(o[p]=n[p]);o.originalType=e,o[c]="string"==typeof e?e:r,l[1]=o;for(var u=2;u<a;u++)l[u]=t[u];return i.createElement.apply(null,l)}return i.createElement.apply(null,t)}d.displayName="MDXCreateElement"},59889:(e,n,t)=>{t.r(n),t.d(n,{contentTitle:()=>l,default:()=>c,frontMatter:()=>a,metadata:()=>o,toc:()=>p});var i=t(58168),r=(t(96540),t(15680));const a={sidebar_position:10,title:"Waf Plugin",keywords:["waf"],description:"waf plugin"},l=void 0,o={unversionedId:"plugins/waf-plugin",id:"version-2.3.0-Legacy/plugins/waf-plugin",isDocsHomePage:!1,title:"Waf Plugin",description:"waf plugin",source:"@site/versioned_docs/version-2.3.0-Legacy/plugins/waf-plugin.md",sourceDirName:"plugins",slug:"/plugins/waf-plugin",permalink:"/docs/2.3.0-Legacy/plugins/waf-plugin",editUrl:"https://github.com/apache/shenyu-website/edit/main/versioned_docs/version-2.3.0-Legacy/plugins/waf-plugin.md",version:"2.3.0-Legacy",sidebarPosition:10,frontMatter:{sidebar_position:10,title:"Waf Plugin",keywords:["waf"],description:"waf plugin"},sidebar:"version-2.3.0-Legacy/tutorialSidebar",previous:{title:"Monitor Plugin",permalink:"/docs/2.3.0-Legacy/plugins/monitor-plugin"},next:{title:"Sign Plugin",permalink:"/docs/2.3.0-Legacy/plugins/sign-plugin"}},p=[{value:"Explanation",id:"explanation",children:[]},{value:"Plugin Setting",id:"plugin-setting",children:[]},{value:"Plugin Detail",id:"plugin-detail",children:[]},{value:"Situation",id:"situation",children:[]}],u={toc:p},s="wrapper";function c(e){let{components:n,...t}=e;return(0,r.yg)(s,(0,i.A)({},u,t,{components:n,mdxType:"MDXLayout"}),(0,r.yg)("h2",{id:"explanation"},"Explanation"),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},"Waf is the core implementation of gateway to realize firewall function for network traffic.")),(0,r.yg)("h2",{id:"plugin-setting"},"Plugin Setting"),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},"In ",(0,r.yg)("inlineCode",{parentName:"li"},"soul-admin")," --\x3e plugin management-> ",(0,r.yg)("inlineCode",{parentName:"li"},"waf")," set to enable."),(0,r.yg)("li",{parentName:"ul"},"If the user don't use, please disable the plugin in the background."),(0,r.yg)("li",{parentName:"ul"},"Add configuration mode in plugin editing.")),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-yaml"},'{"model":"black"}  \n# The default mode is blacklist mode; If setting is mixed, it will be mixed mode. We will explain it specifically below.\n')),(0,r.yg)("h2",{id:"plugin-detail"},"Plugin Detail"),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},"Introducing ",(0,r.yg)("inlineCode",{parentName:"li"},"waf")," dependency in the pom.xml of the gateway.")),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-xml"},"  \x3c!-- soul waf plugin start--\x3e\n  <dependency>\n      <groupId>org.dromara</groupId>\n      <artifactId>soul-spring-boot-starter-plugin-waf</artifactId>\n      <version>${last.version}</version>\n  </dependency>\n  \x3c!-- soul waf plugin end--\x3e\n")),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},"Selectors and rules, please refer to : ",(0,r.yg)("a",{parentName:"li",href:"../admin/selector-and-rule"},"selector")),(0,r.yg)("li",{parentName:"ul"},"When ",(0,r.yg)("inlineCode",{parentName:"li"},"model")," is set to ",(0,r.yg)("inlineCode",{parentName:"li"},"black")," mode, only the matched traffic will execute the rejection policy, and the unmatched traffic will be skipped directly."),(0,r.yg)("li",{parentName:"ul"},"When ",(0,r.yg)("inlineCode",{parentName:"li"},"model")," is set to ",(0,r.yg)("inlineCode",{parentName:"li"},"mixed")," mode, all traffic will pass through waf plugin. For different matching traffic, users can set whether to reject or pass.")),(0,r.yg)("h2",{id:"situation"},"Situation"),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},"Waf is also the pre-plugin of soul, which is mainly used to intercept illegal requests or exception requests and give relevant rejection policies."),(0,r.yg)("li",{parentName:"ul"},"When faced with replay attacks, you can intercept illegal ip and host, and set reject strategy according to matched ip or host."),(0,r.yg)("li",{parentName:"ul"},"How to determine ip and host, please refer to: ",(0,r.yg)("a",{parentName:"li",href:"../developer-guide/custom-parsing-ip-and-host"},"parsing-ip-and-host"))))}c.isMDXComponent=!0}}]);