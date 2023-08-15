"use strict";(self.webpackChunkshenyu_website=self.webpackChunkshenyu_website||[]).push([[37479],{3905:(e,t,n)=>{n.d(t,{Zo:()=>s,kt:()=>g});var r=n(67294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function u(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var p=r.createContext({}),o=function(e){var t=r.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},s=function(e){var t=o(e.components);return r.createElement(p.Provider,{value:t},e.children)},c="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},h=r.forwardRef((function(e,t){var n=e.components,i=e.mdxType,a=e.originalType,p=e.parentName,s=u(e,["components","mdxType","originalType","parentName"]),c=o(n),h=i,g=c["".concat(p,".").concat(h)]||c[h]||d[h]||a;return n?r.createElement(g,l(l({ref:t},s),{},{components:n})):r.createElement(g,l({ref:t},s))}));function g(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var a=n.length,l=new Array(a);l[0]=h;var u={};for(var p in t)hasOwnProperty.call(t,p)&&(u[p]=t[p]);u.originalType=e,u[c]="string"==typeof e?e:i,l[1]=u;for(var o=2;o<a;o++)l[o]=n[o];return r.createElement.apply(null,l)}return r.createElement.apply(null,n)}h.displayName="MDXCreateElement"},36803:(e,t,n)=>{n.r(t),n.d(t,{contentTitle:()=>l,default:()=>c,frontMatter:()=>a,metadata:()=>u,toc:()=>p});var r=n(87462),i=(n(67294),n(3905));const a={title:"Request Plugin",keywords:["request"],description:"request plugin"},l="1. Overview",u={unversionedId:"plugin-center/http-process/request-plugin",id:"version-2.6.0/plugin-center/http-process/request-plugin",isDocsHomePage:!1,title:"Request Plugin",description:"request plugin",source:"@site/versioned_docs/version-2.6.0/plugin-center/http-process/request-plugin.md",sourceDirName:"plugin-center/http-process",slug:"/plugin-center/http-process/request-plugin",permalink:"/docs/plugin-center/http-process/request-plugin",editUrl:"https://github.com/apache/shenyu-website/edit/main/versioned_docs/version-2.6.0/plugin-center/http-process/request-plugin.md",version:"2.6.0",frontMatter:{title:"Request Plugin",keywords:["request"],description:"request plugin"},sidebar:"version-2.6.0/tutorialSidebar",previous:{title:"Redirect Plugin",permalink:"/docs/plugin-center/http-process/redirect-plugin"},next:{title:"Rewrite Plugin",permalink:"/docs/plugin-center/http-process/rewrite-plugin"}},p=[{value:"1.1 Plugin Name",id:"11-plugin-name",children:[]},{value:"1.2 Appropriate Scenario",id:"12-appropriate-scenario",children:[]},{value:"1.3 Plugin functionality",id:"13-plugin-functionality",children:[]},{value:"1.4 Plugin code",id:"14-plugin-code",children:[]},{value:"1.5 Added Since Which shenyu version",id:"15-added-since-which-shenyu-version",children:[]},{value:"2.1 Plugin-use procedure chart",id:"21-plugin-use-procedure-chart",children:[]},{value:"2.2 Import pom",id:"22-import-pom",children:[]},{value:"2.3 Enable plugin",id:"23-enable-plugin",children:[]},{value:"2.4 Config plugin",id:"24-config-plugin",children:[]},{value:"2.5 Examples",id:"25-examples",children:[{value:"2.5.1 Adding request parameters",id:"251-adding-request-parameters",children:[]}]}],o={toc:p},s="wrapper";function c(e){let{components:t,...n}=e;return(0,i.kt)(s,(0,r.Z)({},o,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"1-overview"},"1. Overview"),(0,i.kt)("h2",{id:"11-plugin-name"},"1.1 Plugin Name"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Request Plugin")),(0,i.kt)("h2",{id:"12-appropriate-scenario"},"1.2 Appropriate Scenario"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"The request plugin is able to make customized changes to the request parameters of ",(0,i.kt)("inlineCode",{parentName:"li"},"uri"),".")),(0,i.kt)("h2",{id:"13-plugin-functionality"},"1.3 Plugin functionality"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"The ",(0,i.kt)("inlineCode",{parentName:"li"},"Apache ShenYu")," gateway allows users to use the ",(0,i.kt)("inlineCode",{parentName:"li"},"request")," plugin to add, modify, and remove request headers to request parameters, request headers, and ",(0,i.kt)("inlineCode",{parentName:"li"},"Cookie")," when proxying a target service.")),(0,i.kt)("h2",{id:"14-plugin-code"},"1.4 Plugin code"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"Core Module ",(0,i.kt)("inlineCode",{parentName:"p"},"shenyu-plugin-request"))),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"Core Class ",(0,i.kt)("inlineCode",{parentName:"p"},"org.apache.shenyu.plugin.request.RequestPlugin")))),(0,i.kt)("h2",{id:"15-added-since-which-shenyu-version"},"1.5 Added Since Which shenyu version"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Since ShenYu 2.4.0")),(0,i.kt)("h1",{id:"2-how-to-use-plugin"},"2. How to use plugin"),(0,i.kt)("h2",{id:"21-plugin-use-procedure-chart"},"2.1 Plugin-use procedure chart"),(0,i.kt)("img",{src:"/img/shenyu/plugin/request/request-plugin-procedure-en.png",width:"40%",height:"30%"}),(0,i.kt)("h2",{id:"22-import-pom"},"2.2 Import pom"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Import maven config in shenyu-bootstrap project's ",(0,i.kt)("inlineCode",{parentName:"li"},"pom.xml")," file, which is already added by default.")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-xml"},"  <dependency>\n      <groupId>org.apache.shenyu</groupId>\n      <artifactId>shenyu-spring-boot-starter-plugin-request</artifactId>\n      <version>${project.version}</version>\n  </dependency>\n")),(0,i.kt)("h2",{id:"23-enable-plugin"},"2.3 Enable plugin"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"In ",(0,i.kt)("inlineCode",{parentName:"p"},"shenyu-admin")," --\x3e BasicConfig --\x3e Plugin --\x3e ",(0,i.kt)("inlineCode",{parentName:"p"},"request")," set Status enabled."),(0,i.kt)("blockquote",{parentName:"li"},(0,i.kt)("p",{parentName:"blockquote"},"If there is an option to configure a ",(0,i.kt)("inlineCode",{parentName:"p"},"ruleHandlePageType")," on the page here, you can configure any string, e.g. ",(0,i.kt)("inlineCode",{parentName:"p"},"custom"),", which has no effect on the request, and will be removed in later versions.")),(0,i.kt)("img",{src:"/img/shenyu/plugin/request/request-plugin-enable-en.png",width:"70%",height:"60%"}))),(0,i.kt)("h2",{id:"24-config-plugin"},"2.4 Config plugin"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"selectors and rules, only requests that match are forwarded and redirected, see the ",(0,i.kt)("a",{parentName:"p",href:"../../user-guide/admin-usage/selector-and-rule"},"Selector And Rule Config"))),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},(0,i.kt)("inlineCode",{parentName:"p"},"shenyu-admin")," Plugin --\x3e ",(0,i.kt)("inlineCode",{parentName:"p"},"HttpProcess")," --\x3e ",(0,i.kt)("inlineCode",{parentName:"p"},"Request"),". Add the selector first, then add the rule\uff1a")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"Add the selector:"),(0,i.kt)("img",{src:"/img/shenyu/plugin/request/request-plugin-selector-en.png",width:"70%",height:"60%"})),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"Add the rule"),(0,i.kt)("img",{src:"/img/shenyu/plugin/request/request-plugin-rule-en.png",width:"70%",height:"60%"}))),(0,i.kt)("h2",{id:"25-examples"},"2.5 Examples"),(0,i.kt)("h3",{id:"251-adding-request-parameters"},"2.5.1 Adding request parameters"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"When we configure a custom path in ",(0,i.kt)("inlineCode",{parentName:"li"},"Rules"),", it should be a reachable service path."),(0,i.kt)("li",{parentName:"ul"},"When a request is matched, based on the customized path, the ",(0,i.kt)("inlineCode",{parentName:"li"},"Apache ShenYu")," gateway performs a service hop.")),(0,i.kt)("ol",null,(0,i.kt)("li",{parentName:"ol"},"Refer to ",(0,i.kt)("a",{parentName:"li",href:"https://shenyu.apache.org/docs/deployment/deployment-local"},"Local Deployment"),"\u542f\u52a8 admin \u548c\u7f51\u5173"),(0,i.kt)("li",{parentName:"ol"},"Refer to 2.2 importing pom and restarting the gateway."),(0,i.kt)("li",{parentName:"ol"},"Refer to 2.3 enabling Plugin"),(0,i.kt)("li",{parentName:"ol"},"Start the project ",(0,i.kt)("a",{parentName:"li",href:"https://github.com/apache/shenyu/tree/master/shenyu-examples/shenyu-examples-http"},"shenyu-examples-http")," "),(0,i.kt)("li",{parentName:"ol"},"Refer to 2.4 and ",(0,i.kt)("a",{parentName:"li",href:"../../user-guide/admin-usage/selector-and-rule"},"Selector And Rule Config"),", configuring plugin rules."),(0,i.kt)("li",{parentName:"ol"},"Call interface\uff1a",(0,i.kt)("a",{parentName:"li",href:"https://github.com/apache/shenyu/blob/master/shenyu-examples/shenyu-examples-http/src/main/http/http-test-api.http"},"http-test-api.http"))),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"Calling the interface declared by the selector and rule will see the request parameters configured in the request plugin."),(0,i.kt)("img",{src:"/img/shenyu/plugin/request/request-plugin-example-zh.png",width:"70%",height:"60%"}))),(0,i.kt)("h1",{id:"3-how-to-disable-plugin"},"3. How to disable plugin"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"In ",(0,i.kt)("inlineCode",{parentName:"li"},"shenyu-admin")," --\x3e BasicConfig --\x3e Plugin --\x3e ",(0,i.kt)("inlineCode",{parentName:"li"},"request")," set Status disable."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("img",{src:"/img/shenyu/plugin/request/request-plugin-disable-en.png",width:"70%",height:"60%"}))))}c.isMDXComponent=!0}}]);