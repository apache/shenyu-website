"use strict";(self.webpackChunkshenyu_website=self.webpackChunkshenyu_website||[]).push([[17715],{15680:(e,n,i)=>{i.d(n,{xA:()=>g,yg:()=>d});var t=i(96540);function r(e,n,i){return n in e?Object.defineProperty(e,n,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[n]=i,e}function l(e,n){var i=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);n&&(t=t.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),i.push.apply(i,t)}return i}function a(e){for(var n=1;n<arguments.length;n++){var i=null!=arguments[n]?arguments[n]:{};n%2?l(Object(i),!0).forEach((function(n){r(e,n,i[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(i)):l(Object(i)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(i,n))}))}return e}function o(e,n){if(null==e)return{};var i,t,r=function(e,n){if(null==e)return{};var i,t,r={},l=Object.keys(e);for(t=0;t<l.length;t++)i=l[t],n.indexOf(i)>=0||(r[i]=e[i]);return r}(e,n);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(t=0;t<l.length;t++)i=l[t],n.indexOf(i)>=0||Object.prototype.propertyIsEnumerable.call(e,i)&&(r[i]=e[i])}return r}var u=t.createContext({}),p=function(e){var n=t.useContext(u),i=n;return e&&(i="function"==typeof e?e(n):a(a({},n),e)),i},g=function(e){var n=p(e.components);return t.createElement(u.Provider,{value:n},e.children)},s="mdxType",c={inlineCode:"code",wrapper:function(e){var n=e.children;return t.createElement(t.Fragment,{},n)}},y=t.forwardRef((function(e,n){var i=e.components,r=e.mdxType,l=e.originalType,u=e.parentName,g=o(e,["components","mdxType","originalType","parentName"]),s=p(i),y=r,d=s["".concat(u,".").concat(y)]||s[y]||c[y]||l;return i?t.createElement(d,a(a({ref:n},g),{},{components:i})):t.createElement(d,a({ref:n},g))}));function d(e,n){var i=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var l=i.length,a=new Array(l);a[0]=y;var o={};for(var u in n)hasOwnProperty.call(n,u)&&(o[u]=n[u]);o.originalType=e,o[s]="string"==typeof e?e:r,a[1]=o;for(var p=2;p<l;p++)a[p]=i[p];return t.createElement.apply(null,a)}return t.createElement.apply(null,i)}y.displayName="MDXCreateElement"},8043:(e,n,i)=>{i.r(n),i.d(n,{contentTitle:()=>a,default:()=>s,frontMatter:()=>l,metadata:()=>o,toc:()=>u});var t=i(58168),r=(i(96540),i(15680));const l={title:"Hystrix Plugin",keywords:["Hystrix"],description:"hystrix plugin"},a="1. Overview",o={unversionedId:"plugin-center/fault-tolerance/hystrix-plugin",id:"version-2.5.1/plugin-center/fault-tolerance/hystrix-plugin",isDocsHomePage:!1,title:"Hystrix Plugin",description:"hystrix plugin",source:"@site/versioned_docs/version-2.5.1/plugin-center/fault-tolerance/hystrix-plugin.md",sourceDirName:"plugin-center/fault-tolerance",slug:"/plugin-center/fault-tolerance/hystrix-plugin",permalink:"/docs/2.5.1/plugin-center/fault-tolerance/hystrix-plugin",editUrl:"https://github.com/apache/shenyu-website/edit/main/versioned_docs/version-2.5.1/plugin-center/fault-tolerance/hystrix-plugin.md",version:"2.5.1",frontMatter:{title:"Hystrix Plugin",keywords:["Hystrix"],description:"hystrix plugin"},sidebar:"version-2.5.1/tutorialSidebar",previous:{title:"Websocket Plugin",permalink:"/docs/2.5.1/plugin-center/proxy/websocket-plugin"},next:{title:"RateLimiter Plugin",permalink:"/docs/2.5.1/plugin-center/fault-tolerance/rate-limiter-plugin"}},u=[{value:"1.1 Plugin Name",id:"11-plugin-name",children:[]},{value:"1.2 Appropriate Scenario",id:"12-appropriate-scenario",children:[]},{value:"1.3 Plugin functionality",id:"13-plugin-functionality",children:[]},{value:"1.4 Plugin code",id:"14-plugin-code",children:[]},{value:"1.5 Added Since Which shenyu version",id:"15-added-since-which-shenyu-version",children:[]},{value:"2.1 Plugin-use procedure chart",id:"21-plugin-use-procedure-chart",children:[]},{value:"2.2 Import pom",id:"22-import-pom",children:[]},{value:"2.3 Enable plugin",id:"23-enable-plugin",children:[]},{value:"2.4 Config plugin",id:"24-config-plugin",children:[{value:"2.4.1 Plugin Config",id:"241-plugin-config",children:[]},{value:"2.4.2 Selector Config",id:"242-selector-config",children:[]},{value:"2.4.3 Rule Config",id:"243-rule-config",children:[]}]},{value:"2.5 Examples",id:"25-examples",children:[{value:"2.5.1 use hystrix protect application",id:"251-use-hystrix-protect-application",children:[]}]}],p={toc:u},g="wrapper";function s(e){let{components:n,...l}=e;return(0,r.yg)(g,(0,t.A)({},p,l,{components:n,mdxType:"MDXLayout"}),(0,r.yg)("h1",{id:"1-overview"},"1. Overview"),(0,r.yg)("h2",{id:"11-plugin-name"},"1.1 Plugin Name"),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},"Hystrix Plugin")),(0,r.yg)("h2",{id:"12-appropriate-scenario"},"1.2 Appropriate Scenario"),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},"The backend service is unstable, use hystrix for protection")),(0,r.yg)("h2",{id:"13-plugin-functionality"},"1.3 Plugin functionality"),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},"Fusing the flow"),(0,r.yg)("li",{parentName:"ul"},"Protect the application behind ShenYu Gateway"),(0,r.yg)("li",{parentName:"ul"},"Isolation mode supports ",(0,r.yg)("inlineCode",{parentName:"li"},"thread")," and ",(0,r.yg)("inlineCode",{parentName:"li"},"semaphore"),".")),(0,r.yg)("h2",{id:"14-plugin-code"},"1.4 Plugin code"),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("p",{parentName:"li"},"Core Module: ",(0,r.yg)("inlineCode",{parentName:"p"},"shenyu-plugin-hystrix"))),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("p",{parentName:"li"},"Core Class: ",(0,r.yg)("inlineCode",{parentName:"p"},"org.apache.shenyu.plugin.hystrix.HystrixPlugin")))),(0,r.yg)("h2",{id:"15-added-since-which-shenyu-version"},"1.5 Added Since Which shenyu version"),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},"Since ShenYu 2.4.0")),(0,r.yg)("h1",{id:"2-how-to-use-plugin"},"2. How to use plugin"),(0,r.yg)("h2",{id:"21-plugin-use-procedure-chart"},"2.1 Plugin-use procedure chart"),(0,r.yg)("p",null,(0,r.yg)("img",{src:i(86400).A})),(0,r.yg)("h2",{id:"22-import-pom"},"2.2 Import pom"),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},"Add ",(0,r.yg)("inlineCode",{parentName:"li"},"hystrix")," dependency in the ",(0,r.yg)("inlineCode",{parentName:"li"},"pom.xml")," file of the gateway.")),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-xml"},"\x3c!-- apache shenyu hystrix plugin start--\x3e\n<dependency>\n  <groupId>org.apache.shenyu</groupId>\n  <artifactId>shenyu-spring-boot-starter-plugin-hystrix</artifactId>\n  <version>${project.version}</version>\n</dependency>\n\x3c!-- apache shenyu hystrix plugin end--\x3e\n")),(0,r.yg)("h2",{id:"23-enable-plugin"},"2.3 Enable plugin"),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},"In ",(0,r.yg)("inlineCode",{parentName:"li"},"shenyu-admin"),"--\x3e BasicConfig --\x3e Plugin --\x3e ",(0,r.yg)("inlineCode",{parentName:"li"},"hystrix")," set to enable.")),(0,r.yg)("h2",{id:"24-config-plugin"},"2.4 Config plugin"),(0,r.yg)("h3",{id:"241-plugin-config"},"2.4.1 Plugin Config"),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},"No Config, but you should open hystrix plugin.")),(0,r.yg)("h3",{id:"242-selector-config"},"2.4.2 Selector Config"),(0,r.yg)("p",null,"It is used to filter traffic for the first time and does not require handle fields."),(0,r.yg)("p",null,"For more information on selectors and rules configuration, see ",(0,r.yg)("a",{parentName:"p",href:"../../user-guide/admin-usage/selector-and-rule"},"Selector And Rule Config")," , only some of the fields are covered here."),(0,r.yg)("p",null,(0,r.yg)("img",{src:i(21150).A})),(0,r.yg)("h3",{id:"243-rule-config"},"2.4.3 Rule Config"),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},"For the final filtering of traffic, there is a rule handler logic, isolation mode supports ",(0,r.yg)("inlineCode",{parentName:"li"},"thread")," and ",(0,r.yg)("inlineCode",{parentName:"li"},"semaphore"),".")),(0,r.yg)("p",null,(0,r.yg)("img",{src:i(29277).A})),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("p",{parentName:"li"},"Hystrix handler details:"),(0,r.yg)("ul",{parentName:"li"},(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("p",{parentName:"li"},(0,r.yg)("inlineCode",{parentName:"p"},"MinimumRequests"),": the minimum number of requests required to trigger a circuit breaker.")),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("p",{parentName:"li"},(0,r.yg)("inlineCode",{parentName:"p"},"ErrorThresholdPercentage"),": percentage of exception occurring during that time.")),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("p",{parentName:"li"},(0,r.yg)("inlineCode",{parentName:"p"},"MaxConcurrentRequests"),": max concurrent requests.")),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("p",{parentName:"li"},(0,r.yg)("inlineCode",{parentName:"p"},"Sleep"),"(ms): The recovery time after the circuit breaker.")),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("p",{parentName:"li"},(0,r.yg)("inlineCode",{parentName:"p"},"GroupKey"),": It is generally set to: ",(0,r.yg)("inlineCode",{parentName:"p"},"contextPath"),".")),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("p",{parentName:"li"},(0,r.yg)("inlineCode",{parentName:"p"},"CallBackUrl"),": default url ",(0,r.yg)("inlineCode",{parentName:"p"},"/fallback/hystrix"),".")),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("p",{parentName:"li"},(0,r.yg)("inlineCode",{parentName:"p"},"CommandKey"),": generally, it is set to a specific path interface."))))),(0,r.yg)("h2",{id:"25-examples"},"2.5 Examples"),(0,r.yg)("h3",{id:"251-use-hystrix-protect-application"},"2.5.1 use hystrix protect application"),(0,r.yg)("h4",{id:"2511-preparation"},"2.5.1.1 Preparation"),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},"Start ShenYu Admin"),(0,r.yg)("li",{parentName:"ul"},"Start ShenYu Bootstrap"),(0,r.yg)("li",{parentName:"ul"},"Start a backend service")),(0,r.yg)("h4",{id:"2512-selector-config"},"2.5.1.2 Selector Config"),(0,r.yg)("p",null,(0,r.yg)("img",{src:i(21150).A})),(0,r.yg)("h4",{id:"2513-rule-config"},"2.5.1.3 Rule Config"),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},"The rules in the pictures below are test examples, actual environment depends on the specific situation.")),(0,r.yg)("p",null,(0,r.yg)("img",{src:i(3756).A})),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},"test example")),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-java"},'@RestController\n@RequestMapping("/test")\n@ShenyuSpringMvcClient("/test/**")\npublic class HttpTestController {\n    @PostMapping("/testHystrix")\n    public ResultBean ok() {\n        Random random = new Random();\n        int num = random.nextInt(100);\n        if (num > 20) {\n            throw new RuntimeException();\n        }\n        return new ResultBean(200, "ok", null);\n    }\n}\n')),(0,r.yg)("h4",{id:"2514-send-request-with-apache-jmeter"},"2.5.1.4 Send Request With ",(0,r.yg)("inlineCode",{parentName:"h4"},"Apache Jmeter")),(0,r.yg)("p",null,(0,r.yg)("img",{src:i(6449).A})),(0,r.yg)("h4",{id:"2515-check-result"},"2.5.1.5 Check Result"),(0,r.yg)("p",null,(0,r.yg)("img",{src:i(48240).A})),(0,r.yg)("h1",{id:"3-how-to-disable-plugin"},"3. How to disable plugin"),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},"In ",(0,r.yg)("inlineCode",{parentName:"li"},"shenyu-admin")," --\x3e BasicConfig --\x3e Plugin --\x3e ",(0,r.yg)("inlineCode",{parentName:"li"},"hystrix")," set Status disable.")))}s.isMDXComponent=!0},3756:(e,n,i)=>{i.d(n,{A:()=>t});const t=i.p+"assets/images/hystrix-example-rule-en-061686d393c8d34e9cc3f61973513eda.png"},48240:(e,n,i)=>{i.d(n,{A:()=>t});const t=i.p+"assets/images/hystrix-result-008924e1e83b1489d3f0aaac4e4761df.png"},6449:(e,n,i)=>{i.d(n,{A:()=>t});const t=i.p+"assets/images/hystrix-send-request-bdd87396a153240c2408c12f3e39d5f1.png"},29277:(e,n,i)=>{i.d(n,{A:()=>t});const t=i.p+"assets/images/rule_en-e4b2b2b83e12da05d99784fd35e0d590.png"},21150:(e,n,i)=>{i.d(n,{A:()=>t});const t=i.p+"assets/images/selector_en-b44d5128003f1f2cc5f9cc6d0aee9a5f.png"},86400:(e,n,i)=>{i.d(n,{A:()=>t});const t=i.p+"assets/images/plugin_use_en-8b5661551cdf92fdabc9cb2e7947cffc.jpg"}}]);