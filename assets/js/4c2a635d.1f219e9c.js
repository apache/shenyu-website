"use strict";(self.webpackChunkshenyu_website=self.webpackChunkshenyu_website||[]).push([[67373],{15680:(e,n,r)=>{r.d(n,{xA:()=>d,yg:()=>y});var i=r(96540);function a(e,n,r){return n in e?Object.defineProperty(e,n,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[n]=r,e}function t(e,n){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);n&&(i=i.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),r.push.apply(r,i)}return r}function l(e){for(var n=1;n<arguments.length;n++){var r=null!=arguments[n]?arguments[n]:{};n%2?t(Object(r),!0).forEach((function(n){a(e,n,r[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):t(Object(r)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(r,n))}))}return e}function o(e,n){if(null==e)return{};var r,i,a=function(e,n){if(null==e)return{};var r,i,a={},t=Object.keys(e);for(i=0;i<t.length;i++)r=t[i],n.indexOf(r)>=0||(a[r]=e[r]);return a}(e,n);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);for(i=0;i<t.length;i++)r=t[i],n.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var p=i.createContext({}),s=function(e){var n=i.useContext(p),r=n;return e&&(r="function"==typeof e?e(n):l(l({},n),e)),r},d=function(e){var n=s(e.components);return i.createElement(p.Provider,{value:n},e.children)},g="mdxType",u={inlineCode:"code",wrapper:function(e){var n=e.children;return i.createElement(i.Fragment,{},n)}},c=i.forwardRef((function(e,n){var r=e.components,a=e.mdxType,t=e.originalType,p=e.parentName,d=o(e,["components","mdxType","originalType","parentName"]),g=s(r),c=a,y=g["".concat(p,".").concat(c)]||g[c]||u[c]||t;return r?i.createElement(y,l(l({ref:n},d),{},{components:r})):i.createElement(y,l({ref:n},d))}));function y(e,n){var r=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var t=r.length,l=new Array(t);l[0]=c;var o={};for(var p in n)hasOwnProperty.call(n,p)&&(o[p]=n[p]);o.originalType=e,o[g]="string"==typeof e?e:a,l[1]=o;for(var s=2;s<t;s++)l[s]=r[s];return i.createElement.apply(null,l)}return i.createElement.apply(null,r)}c.displayName="MDXCreateElement"},30886:(e,n,r)=>{r.r(n),r.d(n,{contentTitle:()=>l,default:()=>g,frontMatter:()=>t,metadata:()=>o,toc:()=>p});var i=r(58168),a=(r(96540),r(15680));const t={title:"ModifyResponse Plugin",keywords:["modifyResponse"],description:"modifyResponse plugin"},l="1. Overview",o={unversionedId:"plugin-center/http-handle/modify-response-plugin",id:"version-2.4.0/plugin-center/http-handle/modify-response-plugin",isDocsHomePage:!1,title:"ModifyResponse Plugin",description:"modifyResponse plugin",source:"@site/versioned_docs/version-2.4.0/plugin-center/http-handle/modify-response-plugin.md",sourceDirName:"plugin-center/http-handle",slug:"/plugin-center/http-handle/modify-response-plugin",permalink:"/docs/2.4.0/plugin-center/http-handle/modify-response-plugin",editUrl:"https://github.com/apache/shenyu-website/edit/main/versioned_docs/version-2.4.0/plugin-center/http-handle/modify-response-plugin.md",version:"2.4.0",frontMatter:{title:"ModifyResponse Plugin",keywords:["modifyResponse"],description:"modifyResponse plugin"},sidebar:"version-2.4.0/tutorialSidebar",previous:{title:"Divide Plugin",permalink:"/docs/2.4.0/plugin-center/http-handle/divide-plugin"},next:{title:"Param-mapping Plugin",permalink:"/docs/2.4.0/plugin-center/http-handle/param-mapping-plugin"}},p=[{value:"1.1 Plugin Name",id:"11-plugin-name",children:[]},{value:"1.2 Appropriate Scenario",id:"12-appropriate-scenario",children:[]},{value:"1.3 Plugin functionality",id:"13-plugin-functionality",children:[]},{value:"1.4 Plugin Code",id:"14-plugin-code",children:[]},{value:"1.5 Added since which shenyu version",id:"15-added-since-which-shenyu-version",children:[]},{value:"2.1 Plugin-use procedure chart",id:"21-plugin-use-procedure-chart",children:[]},{value:"2.2 Import pom",id:"22-import-pom",children:[]},{value:"2.3 Enable plugin",id:"23-enable-plugin",children:[]},{value:"2.4 Config plugin",id:"24-config-plugin",children:[]},{value:"2.5 Examples",id:"25-examples",children:[{value:"2.5.1 Example reset HTTP response status code",id:"251-example-reset-http-response-status-code",children:[]},{value:"2.5.2 Example modify HTTP response headers",id:"252-example-modify-http-response-headers",children:[]},{value:"2.5.3 Example modify HTTP response body",id:"253-example-modify-http-response-body",children:[]}]},{value:"3. How to disable plugin",id:"3-how-to-disable-plugin",children:[]},{value:"4. rule parameter list",id:"4-rule-parameter-list",children:[]}],s={toc:p},d="wrapper";function g(e){let{components:n,...t}=e;return(0,a.yg)(d,(0,i.A)({},s,t,{components:n,mdxType:"MDXLayout"}),(0,a.yg)("h1",{id:"1-overview"},"1. Overview"),(0,a.yg)("h2",{id:"11-plugin-name"},"1.1 Plugin Name"),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},"ModifyResponse Plugin")),(0,a.yg)("h2",{id:"12-appropriate-scenario"},"1.2 Appropriate Scenario"),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},"This plugin is used for modifying HTTP response status code, response headers or response body parameters.")),(0,a.yg)("h2",{id:"13-plugin-functionality"},"1.3 Plugin functionality"),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},"Reset HTTP response status code"),(0,a.yg)("li",{parentName:"ul"},"Add, set, replace or remove HTTP response headers."),(0,a.yg)("li",{parentName:"ul"},"Add, replace or remove HTTP response body(JSON) parameters.")),(0,a.yg)("h2",{id:"14-plugin-code"},"1.4 Plugin Code"),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},"Core module ",(0,a.yg)("inlineCode",{parentName:"li"},"shenyu-plugin-modify-response")),(0,a.yg)("li",{parentName:"ul"},"Core class ",(0,a.yg)("inlineCode",{parentName:"li"},"org.apache.shenyu.plugin.modify.response.ModifyResponsePlugin"))),(0,a.yg)("h2",{id:"15-added-since-which-shenyu-version"},"1.5 Added since which shenyu version"),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},"2.4.0")),(0,a.yg)("h1",{id:"2-how-to-use-plugin"},"2. How to use plugin"),(0,a.yg)("h2",{id:"21-plugin-use-procedure-chart"},"2.1 Plugin-use procedure chart"),(0,a.yg)("p",null,(0,a.yg)("img",{src:r(69801).A})),(0,a.yg)("h2",{id:"22-import-pom"},"2.2 Import pom"),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},"import maven config in shenyu-bootstrap project's ",(0,a.yg)("inlineCode",{parentName:"li"},"pom.xml")," file.")),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-xml"},"  <dependency>\n  <groupId>org.apache.shenyu</groupId>\n  <artifactId>shenyu-spring-boot-starter-gateway</artifactId>\n  <version>${project.version}</version>\n</dependency>\n")),(0,a.yg)("h2",{id:"23-enable-plugin"},"2.3 Enable plugin"),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},"In ",(0,a.yg)("inlineCode",{parentName:"li"},"shenyu-admin")," --\x3e BasicConfig --\x3e Plugin --\x3e ",(0,a.yg)("inlineCode",{parentName:"li"},"modifyResponse")," set Status enable."),(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("img",{src:r(64361).A}))),(0,a.yg)("h2",{id:"24-config-plugin"},"2.4 Config plugin"),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},"Selector and rule config, please refer: ",(0,a.yg)("a",{parentName:"li",href:"../../user-guide/admin-usage/selector-and-rule"},"Selector and rule config"),"."),(0,a.yg)("li",{parentName:"ul"},"In ",(0,a.yg)("inlineCode",{parentName:"li"},"shenyu-admin")," --\x3e ",(0,a.yg)("inlineCode",{parentName:"li"},"PluginList")," --\x3e ",(0,a.yg)("inlineCode",{parentName:"li"},"HttpProcess")," --\x3e ",(0,a.yg)("inlineCode",{parentName:"li"},"modifyResponse"),", add selector config first\uff0cthen add rule config\uff1a",(0,a.yg)("ul",{parentName:"li"},(0,a.yg)("li",{parentName:"ul"},"Add selector config\n",(0,a.yg)("img",{src:r(71846).A})),(0,a.yg)("li",{parentName:"ul"},"Add rule config\n",(0,a.yg)("img",{src:r(14215).A}))))),(0,a.yg)("h2",{id:"25-examples"},"2.5 Examples"),(0,a.yg)("p",null,"Here is an example of client project ",(0,a.yg)("a",{parentName:"p",href:"https://github.com/apache/shenyu/tree/master/shenyu-examples/shenyu-examples-http"},"shenyu-examples-http"),"."),(0,a.yg)("h3",{id:"251-example-reset-http-response-status-code"},"2.5.1 Example reset HTTP response status code"),(0,a.yg)("h4",{id:"2511-refer-local-deployment-to-start-admin-and-bootstrap"},"2.5.1.1 Refer ",(0,a.yg)("a",{parentName:"h4",href:"https://shenyu.apache.org/docs/deployment/deployment-local/"},"Local Deployment")," to start admin and bootstrap."),(0,a.yg)("h4",{id:"2512-refer-22-to-import-pom-and-restart-bootstrap"},"2.5.1.2 Refer 2.2 to import pom and restart bootstrap."),(0,a.yg)("h4",{id:"2513-refer-23-to-enable-plugin"},"2.5.1.3 Refer 2.3 to enable plugin."),(0,a.yg)("h4",{id:"2514-refer-24-to-add-plugin-config"},"2.5.1.4 Refer 2.4 to add plugin config."),(0,a.yg)("p",null,"Add plugin config:"),(0,a.yg)("p",null,(0,a.yg)("img",{src:r(36846).A})),(0,a.yg)("h4",{id:"2515-call-interface"},"2.5.1.5 Call Interface"),(0,a.yg)("p",null,(0,a.yg)("img",{src:r(41051).A})),(0,a.yg)("h3",{id:"252-example-modify-http-response-headers"},"2.5.2 Example modify HTTP response headers"),(0,a.yg)("h4",{id:"2521-refer-local-deployment-to-start-admin-and-bootstrap"},"2.5.2.1 Refer ",(0,a.yg)("a",{parentName:"h4",href:"https://shenyu.apache.org/docs/deployment/deployment-local/"},"Local Deployment")," to start admin and bootstrap."),(0,a.yg)("h4",{id:"2522-refer-22-to-import-pom-and-restart-bootstrap"},"2.5.2.2 Refer 2.2 to import pom and restart bootstrap."),(0,a.yg)("h4",{id:"2523-refer-23-to-enable-plugin"},"2.5.2.3 Refer 2.3 to enable plugin."),(0,a.yg)("h4",{id:"2524-refer-24-to-add-plugin-config"},"2.5.2.4 Refer 2.4 to add plugin config."),(0,a.yg)("p",null,"Add plugin config:"),(0,a.yg)("p",null,(0,a.yg)("img",{src:r(81317).A})),(0,a.yg)("h4",{id:"2525-call-interface"},"2.5.2.5 Call Interface"),(0,a.yg)("p",null,(0,a.yg)("img",{src:r(83148).A})),(0,a.yg)("h3",{id:"253-example-modify-http-response-body"},"2.5.3 Example modify HTTP response body"),(0,a.yg)("h4",{id:"2531-refer-local-deployment-to-start-admin-and-bootstrap"},"2.5.3.1 Refer ",(0,a.yg)("a",{parentName:"h4",href:"https://shenyu.apache.org/docs/deployment/deployment-local/"},"Local Deployment")," to start admin and bootstrap."),(0,a.yg)("h4",{id:"2532-refer-22-to-import-pom-and-restart-bootstrap"},"2.5.3.2 Refer 2.2 to import pom and restart bootstrap."),(0,a.yg)("h4",{id:"2533-refer-23-to-enable-plugin"},"2.5.3.3 Refer 2.3 to enable plugin."),(0,a.yg)("h4",{id:"2534-refer-24-to-add-plugin-config"},"2.5.3.4 Refer 2.4 to add plugin config."),(0,a.yg)("p",null,"Add plugin config:"),(0,a.yg)("p",null,(0,a.yg)("img",{src:r(61984).A})),(0,a.yg)("h4",{id:"2535-call-interface"},"2.5.3.5 Call Interface"),(0,a.yg)("p",null,(0,a.yg)("img",{src:r(74601).A})),(0,a.yg)("h2",{id:"3-how-to-disable-plugin"},"3. How to disable plugin"),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},"In ",(0,a.yg)("inlineCode",{parentName:"li"},"shenyu-admin")," --\x3e BasicConfig --\x3e Plugin --\x3e ",(0,a.yg)("inlineCode",{parentName:"li"},"modifyResponse")," set Status disable.")),(0,a.yg)("p",null,(0,a.yg)("img",{src:r(33864).A})),(0,a.yg)("h2",{id:"4-rule-parameter-list"},"4. rule parameter list"),(0,a.yg)("p",null,"for modifying status code:"),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("inlineCode",{parentName:"li"},"statusCode"),": reset response status code")),(0,a.yg)("p",null,"for modifying response headers:"),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("inlineCode",{parentName:"li"},"addHeaders"),": add response headers, ",(0,a.yg)("inlineCode",{parentName:"li"},"k-v")," format"),(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("inlineCode",{parentName:"li"},"setHeaders"),": set response headers, ",(0,a.yg)("inlineCode",{parentName:"li"},"k-v")," format"),(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("inlineCode",{parentName:"li"},"replaceHeaderKeys"),": replace response headers\uff0c",(0,a.yg)("inlineCode",{parentName:"li"},"key")," is matching to the header key that should be replacing, value is target value after replacing"),(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("inlineCode",{parentName:"li"},"removeHeaderKeys"),": remove response headers\uff0c",(0,a.yg)("inlineCode",{parentName:"li"},"key")," is matching to the header key that should be removing")),(0,a.yg)("p",null,"for modifying response body:"),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("inlineCode",{parentName:"li"},"addBodyKeys"),": add response body parameters"),(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("inlineCode",{parentName:"li"},"replaceBodyKeys"),": replace response body parameters\uff0c",(0,a.yg)("inlineCode",{parentName:"li"},"key")," is matching to the body(JSON) key that should be replacing, value is target value after replacing"),(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("inlineCode",{parentName:"li"},"removeBodyKeys"),": remove response body parameters\uff0c",(0,a.yg)("inlineCode",{parentName:"li"},"key")," is matching to the body(JSON) key that should be removing")))}g.isMDXComponent=!0},74601:(e,n,r)=>{r.d(n,{A:()=>i});const i=r.p+"assets/images/body-invoke-interface-d5fd9ba3d67c539595c1e69f8ddd6716.png"},61984:(e,n,r)=>{r.d(n,{A:()=>i});const i=r.p+"assets/images/body-rule-config-en-fa57f66c274d0ab89fce27bd95317b6e.png"},33864:(e,n,r)=>{r.d(n,{A:()=>i});const i=r.p+"assets/images/disable-en-eac55ef5d1fa2120726b27881db51082.png"},64361:(e,n,r)=>{r.d(n,{A:()=>i});const i=r.p+"assets/images/enable-en-ac2aa2d0b684f329ba5eefaadf61b30c.png"},83148:(e,n,r)=>{r.d(n,{A:()=>i});const i=r.p+"assets/images/header-invoke-interface-1ec5514412331e6438e4b1f5b2796d6e.png"},81317:(e,n,r)=>{r.d(n,{A:()=>i});const i=r.p+"assets/images/header-rule-config-en-6531c7d9c41f5e744c0cf88ce38cb071.png"},14215:(e,n,r)=>{r.d(n,{A:()=>i});const i=r.p+"assets/images/plugin-rule-config-en-92ed9341ca270670294f41ffdfe520c3.png"},71846:(e,n,r)=>{r.d(n,{A:()=>i});const i=r.p+"assets/images/plugin-selector-config-en-c9eba64e9bd6d1d7daca6c974280c079.png"},69801:(e,n,r)=>{r.d(n,{A:()=>i});const i=r.p+"assets/images/procedure-en-7fc93c4eb1c76a7cf253a0a6d2c072c7.png"},41051:(e,n,r)=>{r.d(n,{A:()=>i});const i=r.p+"assets/images/status-code-invoke-interface-688a23664d58e142832432e3e8abc449.png"},36846:(e,n,r)=>{r.d(n,{A:()=>i});const i=r.p+"assets/images/status-code-rule-config-en-3cb49cba49823843b9076ecfafcdb358.png"}}]);