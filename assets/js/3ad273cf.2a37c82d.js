"use strict";(self.webpackChunkshenyu_website=self.webpackChunkshenyu_website||[]).push([[95760],{15680:(e,n,a)=>{a.d(n,{xA:()=>u,yg:()=>y});var t=a(96540);function i(e,n,a){return n in e?Object.defineProperty(e,n,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[n]=a,e}function r(e,n){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);n&&(t=t.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),a.push.apply(a,t)}return a}function l(e){for(var n=1;n<arguments.length;n++){var a=null!=arguments[n]?arguments[n]:{};n%2?r(Object(a),!0).forEach((function(n){i(e,n,a[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):r(Object(a)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(a,n))}))}return e}function o(e,n){if(null==e)return{};var a,t,i=function(e,n){if(null==e)return{};var a,t,i={},r=Object.keys(e);for(t=0;t<r.length;t++)a=r[t],n.indexOf(a)>=0||(i[a]=e[a]);return i}(e,n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(t=0;t<r.length;t++)a=r[t],n.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(i[a]=e[a])}return i}var s=t.createContext({}),p=function(e){var n=t.useContext(s),a=n;return e&&(a="function"==typeof e?e(n):l(l({},n),e)),a},u=function(e){var n=p(e.components);return t.createElement(s.Provider,{value:n},e.children)},c="mdxType",g={inlineCode:"code",wrapper:function(e){var n=e.children;return t.createElement(t.Fragment,{},n)}},d=t.forwardRef((function(e,n){var a=e.components,i=e.mdxType,r=e.originalType,s=e.parentName,u=o(e,["components","mdxType","originalType","parentName"]),c=p(a),d=i,y=c["".concat(s,".").concat(d)]||c[d]||g[d]||r;return a?t.createElement(y,l(l({ref:n},u),{},{components:a})):t.createElement(y,l({ref:n},u))}));function y(e,n){var a=arguments,i=n&&n.mdxType;if("string"==typeof e||i){var r=a.length,l=new Array(r);l[0]=d;var o={};for(var s in n)hasOwnProperty.call(n,s)&&(o[s]=n[s]);o.originalType=e,o[c]="string"==typeof e?e:i,l[1]=o;for(var p=2;p<r;p++)l[p]=a[p];return t.createElement.apply(null,l)}return t.createElement.apply(null,a)}d.displayName="MDXCreateElement"},87095:(e,n,a)=>{a.r(n),a.d(n,{contentTitle:()=>l,default:()=>c,frontMatter:()=>r,metadata:()=>o,toc:()=>s});var t=a(58168),i=(a(96540),a(15680));const r={title:"Tars Plugin",keywords:["Tars"],description:"Tars Plugin"},l="1. Overview",o={unversionedId:"plugin-center/proxy/tars-plugin",id:"version-2.6.1/plugin-center/proxy/tars-plugin",isDocsHomePage:!1,title:"Tars Plugin",description:"Tars Plugin",source:"@site/versioned_docs/version-2.6.1/plugin-center/proxy/tars-plugin.md",sourceDirName:"plugin-center/proxy",slug:"/plugin-center/proxy/tars-plugin",permalink:"/docs/2.6.1/plugin-center/proxy/tars-plugin",editUrl:"https://github.com/apache/shenyu-website/edit/main/versioned_docs/version-2.6.1/plugin-center/proxy/tars-plugin.md",version:"2.6.1",frontMatter:{title:"Tars Plugin",keywords:["Tars"],description:"Tars Plugin"},sidebar:"version-2.6.0/tutorialSidebar",previous:{title:"Spring Cloud Plugin",permalink:"/docs/2.6.1/plugin-center/proxy/spring-cloud-plugin"},next:{title:"Tcp Plugin",permalink:"/docs/2.6.1/plugin-center/proxy/tcp-plugin"}},s=[{value:"1.1 Plugin name",id:"11-plugin-name",children:[]},{value:"1.2 Appropriate scenario",id:"12-appropriate-scenario",children:[]},{value:"1.3 Plugin functionality",id:"13-plugin-functionality",children:[]},{value:"1.4 Plugin code",id:"14-plugin-code",children:[]},{value:"1.5 Added since which shenyu version",id:"15-added-since-which-shenyu-version",children:[]},{value:"2.1 Plugin-use procedure chart",id:"21-plugin-use-procedure-chart",children:[]},{value:"2.2 Import pom",id:"22-import-pom",children:[]},{value:"2.3 Configure in the client project",id:"23-configure-in-the-client-project",children:[]},{value:"2.4 Enable plugin",id:"24-enable-plugin",children:[]},{value:"2.5 Config plugin",id:"25-config-plugin",children:[{value:"2.5.1 Config plugin",id:"251-config-plugin",children:[]},{value:"2.5.2 Selector config",id:"252-selector-config",children:[]},{value:"2.5.3 Rule Config",id:"253-rule-config",children:[]},{value:"2.5.4 Metadata config",id:"254-metadata-config",children:[]}]},{value:"2.6 Examples",id:"26-examples",children:[{value:"2.6.1 Using ShenYu to access the Tars service",id:"261-using-shenyu-to-access-the-tars-service",children:[]}]}],p={toc:s},u="wrapper";function c(e){let{components:n,...r}=e;return(0,i.yg)(u,(0,t.A)({},p,r,{components:n,mdxType:"MDXLayout"}),(0,i.yg)("h1",{id:"1-overview"},"1. Overview"),(0,i.yg)("h2",{id:"11-plugin-name"},"1.1 Plugin name"),(0,i.yg)("ul",null,(0,i.yg)("li",{parentName:"ul"},"Tars plugin")),(0,i.yg)("h2",{id:"12-appropriate-scenario"},"1.2 Appropriate scenario"),(0,i.yg)("ul",null,(0,i.yg)("li",{parentName:"ul"},"Protocol conversion, a plugin that converts http protocol requests into the Tars framework protocol"),(0,i.yg)("li",{parentName:"ul"},"Service Load Balancing.")),(0,i.yg)("h2",{id:"13-plugin-functionality"},"1.3 Plugin functionality"),(0,i.yg)("ul",null,(0,i.yg)("li",{parentName:"ul"},"Converting http protocol requests to Tars framework protocol.")),(0,i.yg)("h2",{id:"14-plugin-code"},"1.4 Plugin code"),(0,i.yg)("ul",null,(0,i.yg)("li",{parentName:"ul"},"Core Module ",(0,i.yg)("inlineCode",{parentName:"li"},"shenyu-plugin-tars")),(0,i.yg)("li",{parentName:"ul"},"Core Class ",(0,i.yg)("inlineCode",{parentName:"li"},"org.apache.shenyu.plugin.tars.TarsPlugin"))),(0,i.yg)("h2",{id:"15-added-since-which-shenyu-version"},"1.5 Added since which shenyu version"),(0,i.yg)("ul",null,(0,i.yg)("li",{parentName:"ul"},"2.3.0")),(0,i.yg)("h1",{id:"2-how-to-use-plugin"},"2. How to use plugin"),(0,i.yg)("h2",{id:"21-plugin-use-procedure-chart"},"2.1 Plugin-use procedure chart"),(0,i.yg)("p",null,(0,i.yg)("img",{alt:"image-20221206221707914",src:a(79287).A})),(0,i.yg)("h2",{id:"22-import-pom"},"2.2 Import pom"),(0,i.yg)("pre",null,(0,i.yg)("code",{parentName:"pre",className:"language-xml"},"        <dependency>\n            <groupId>org.apache.shenyu</groupId>\n            <artifactId>shenyu-spring-boot-starter-client-tars</artifactId>\n            <version>${shenyu.version}</version>\n        </dependency>\n")),(0,i.yg)("h2",{id:"23-configure-in-the-client-project"},"2.3 Configure in the client project"),(0,i.yg)("ol",null,(0,i.yg)("li",{parentName:"ol"},"Configure the Tars configuration in application.yml.")),(0,i.yg)("pre",null,(0,i.yg)("code",{parentName:"pre",className:"language-yaml"},"shenyu:\n  register:\n    registerType: http #zookeeper #etcd #nacos #consul\n    serverLists: http://localhost:9095 #localhost:2181 #http://localhost:2379 #localhost:8848\n    props:\n      username: admin\n      password: 123456\n  client:\n    tars:\n      props:\n        contextPath: /tars\n        appName: tars\n        port: 21715\n        host: 192.168.41.103 # client IP\n")),(0,i.yg)("ol",{start:2},(0,i.yg)("li",{parentName:"ol"},"Add the ",(0,i.yg)("inlineCode",{parentName:"li"},"@ShenyuTarsService")," and ",(0,i.yg)("inlineCode",{parentName:"li"},"@ShenyuTarsClient")," and  annotation to the interface.")),(0,i.yg)("pre",null,(0,i.yg)("code",{parentName:"pre",className:"language-java"},'@TarsServant("HelloObj")\n@ShenyuTarsService(serviceName = "ShenyuExampleServer.ShenyuExampleApp.HelloObj")\npublic class HelloServantImpl implements HelloServant {\n  \n    @Override\n    @ShenyuTarsClient("/hello")\n    public String hello(final int no, final String name) {\n        return String.format("hello no=%s, name=%s, time=%s", no, name, System.currentTimeMillis());\n    }\n}\n')),(0,i.yg)("h2",{id:"24-enable-plugin"},"2.4 Enable plugin"),(0,i.yg)("ul",null,(0,i.yg)("li",{parentName:"ul"},"In shenyu-admin --\x3e BasicConfig --\x3e Plugin --\x3e ",(0,i.yg)("inlineCode",{parentName:"li"},"tars")," set Status enabled.")),(0,i.yg)("p",null,(0,i.yg)("img",{alt:"enable_tars_en",src:a(66852).A})),(0,i.yg)("h2",{id:"25-config-plugin"},"2.5 Config plugin"),(0,i.yg)("h3",{id:"251-config-plugin"},"2.5.1 Config plugin"),(0,i.yg)("p",null,(0,i.yg)("img",{alt:"plugin_config_en",src:a(7318).A})),(0,i.yg)("ul",null,(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("inlineCode",{parentName:"li"},"multiSelectorHandle"),"\uff1aSet to enable multiple selector processing, multiple selector processing services can be configured in the selector list."),(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("inlineCode",{parentName:"li"},"multiRuleHandle"),"\uff1aSet to multiple rules processing, configure multiple processing rules in the rule list, it is recommended to configure as single rule."),(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("inlineCode",{parentName:"li"},"threadpool"),"\uff1aThere are five types of business thread pools: ",(0,i.yg)("inlineCode",{parentName:"li"},"fixed"),", ",(0,i.yg)("inlineCode",{parentName:"li"},"eager"),", ",(0,i.yg)("inlineCode",{parentName:"li"},"cached"),", ",(0,i.yg)("inlineCode",{parentName:"li"},"limited")," and ",(0,i.yg)("inlineCode",{parentName:"li"},"shared"),". The first 4 types correspond to the thread pools officially provided by dubbo. Let's talk about ",(0,i.yg)("inlineCode",{parentName:"li"},"shared"),", as its name implies, ",(0,i.yg)("inlineCode",{parentName:"li"},"all proxy plugins")," share a ",(0,i.yg)("inlineCode",{parentName:"li"},"shared")," thread pool, the advantage of this is that it can reduce the number of thread pools, thereby reducing memory and improving resource utilization."),(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("inlineCode",{parentName:"li"},"corethreads"),"\uff1aThe number of core threads in the business thread pool."),(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("inlineCode",{parentName:"li"},"threads"),"\uff1aThe maximum number of threads in the business thread pool."),(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("inlineCode",{parentName:"li"},"queues"),"\uff1aThe length of the blocking queue of the business thread pool, 0 means ",(0,i.yg)("inlineCode",{parentName:"li"},"unbounded blocking queue"),".")),(0,i.yg)("h3",{id:"252-selector-config"},"2.5.2 Selector config"),(0,i.yg)("blockquote",null,(0,i.yg)("p",{parentName:"blockquote"},"Flow needs to be matched by selector.")),(0,i.yg)("p",null,(0,i.yg)("img",{alt:"selector_config_en",src:a(54192).A})),(0,i.yg)("p",null,"Automatically configure the selectors with the ",(0,i.yg)("inlineCode",{parentName:"p"},"@ShenyuTarsClient")," annotation."),(0,i.yg)("h3",{id:"253-rule-config"},"2.5.3 Rule Config"),(0,i.yg)("blockquote",null,(0,i.yg)("p",{parentName:"blockquote"},"After the traffic has been successfully matched by the selector, it will enter the rules for the final traffic matching.")),(0,i.yg)("p",null,(0,i.yg)("img",{alt:"rule_config_en",src:a(80753).A})),(0,i.yg)("p",null,"Automatically configure the rules with the ",(0,i.yg)("inlineCode",{parentName:"p"},"@ShenyuTarsClient")," annotation."),(0,i.yg)("h3",{id:"254-metadata-config"},"2.5.4 Metadata config"),(0,i.yg)("blockquote",null,(0,i.yg)("p",{parentName:"blockquote"},"When the ",(0,i.yg)("inlineCode",{parentName:"p"},"Tars")," application client accesses the ",(0,i.yg)("inlineCode",{parentName:"p"},"Apache ShenYu")," gateway, it will be automatically registered, and can be viewed in the ",(0,i.yg)("inlineCode",{parentName:"p"},"shenyu-admin")," backend management system's basic configuration ",(0,i.yg)("inlineCode",{parentName:"p"},"--\x3e")," metadata management, each ",(0,i.yg)("inlineCode",{parentName:"p"},"Tars")," interface method, will correspond to a metadata.")),(0,i.yg)("p",null,(0,i.yg)("img",{alt:"metadata_config_en",src:a(92076).A})),(0,i.yg)("ul",null,(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("p",{parentName:"li"},"AppName: specifies the name of the application to which the metadata belongs.")),(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("p",{parentName:"li"},"MethodName: the name of the method to call.")),(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("p",{parentName:"li"},"Path: http request path.")),(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("p",{parentName:"li"},"PathDescribe: the description of the path is easy to view.")),(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("p",{parentName:"li"},"ParamsType: the parameters are separated by commas (,) in the order of interface parameter types.")),(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("p",{parentName:"li"},"RpcExpand: other configurations of the ",(0,i.yg)("inlineCode",{parentName:"p"},"Tars")," interface, which support the ",(0,i.yg)("inlineCode",{parentName:"p"},"JSON")," format."),(0,i.yg)("p",{parentName:"li"},"examples\uff1a",(0,i.yg)("inlineCode",{parentName:"p"},'{"loadbalance":"hash","retries":3,"timeout":-1}')),(0,i.yg)("ul",{parentName:"li"},(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("inlineCode",{parentName:"li"},"loadbalance"),"\uff1aLoad balancing policy, currently supports roundRobin, random and hash."),(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("inlineCode",{parentName:"li"},"retries"),"\uff1aNumber of retries to call client timeout failures."),(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("inlineCode",{parentName:"li"},"timeout"),"\uff1aCalling the client's timeout time."))),(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("p",{parentName:"li"},"Interface: The fully qualified class name of the ",(0,i.yg)("inlineCode",{parentName:"p"},"Tars")," interface.")),(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("p",{parentName:"li"},"RpcType\uff1aAuto-registration defaults to ",(0,i.yg)("inlineCode",{parentName:"p"},"Tars"),"."))),(0,i.yg)("h2",{id:"26-examples"},"2.6 Examples"),(0,i.yg)("h3",{id:"261-using-shenyu-to-access-the-tars-service"},"2.6.1 Using ShenYu to access the Tars service"),(0,i.yg)("h4",{id:"2611-preparation"},"2.6.1.1 Preparation"),(0,i.yg)("ul",null,(0,i.yg)("li",{parentName:"ul"},"Start ",(0,i.yg)("inlineCode",{parentName:"li"},"ShenYu Admin"),"."),(0,i.yg)("li",{parentName:"ul"},"Start ",(0,i.yg)("inlineCode",{parentName:"li"},"Shenyu Bootstrap"),".")),(0,i.yg)("h4",{id:"2612-plugin-config"},"2.6.1.2 Plugin Config"),(0,i.yg)("ul",null,(0,i.yg)("li",{parentName:"ul"},"In shenyu-admin --\x3e BasicConfig --\x3e Plugin --\x3e ",(0,i.yg)("inlineCode",{parentName:"li"},"tars")," set Status enabled, And adjust the registry configuration as needed."),(0,i.yg)("li",{parentName:"ul"},"Adjust to the actual situation ",(0,i.yg)("a",{parentName:"li",href:"https://github.com/apache/shenyu/tree/master/shenyu-examples/shenyu-examples-tars"},"shenyu-examples-tars")," application.yml configuration in the project and start it.")),(0,i.yg)("h4",{id:"2626-request-service-and-check-result"},"2.6.2.6 Request service and check result"),(0,i.yg)("p",null,(0,i.yg)("img",{alt:"check_request_zh",src:a(29333).A})),(0,i.yg)("h1",{id:"3-how-to-disable-plugin"},"3. How to disable plugin"),(0,i.yg)("ul",null,(0,i.yg)("li",{parentName:"ul"},"In ",(0,i.yg)("inlineCode",{parentName:"li"},"shenyu-admin")," --\x3e BasicConfig --\x3e Plugin --\x3e ",(0,i.yg)("inlineCode",{parentName:"li"},"tars")," set Status disable.")),(0,i.yg)("p",null,(0,i.yg)("img",{alt:"close_tars_en",src:a(60675).A})))}c.isMDXComponent=!0},29333:(e,n,a)=>{a.d(n,{A:()=>t});const t=a.p+"assets/images/check_request_zh-bbfa76e720e865629981ab1e65739eeb.png"},60675:(e,n,a)=>{a.d(n,{A:()=>t});const t=a.p+"assets/images/close_tars_en-17311011e6bc29d7156f65ec9073e859.png"},66852:(e,n,a)=>{a.d(n,{A:()=>t});const t=a.p+"assets/images/enable_tars_en-adbf5589ad2bbb3d15136b87ddc0398c.png"},92076:(e,n,a)=>{a.d(n,{A:()=>t});const t=a.p+"assets/images/metadata_config_en-55b4de23e1b38626a9b401003ae6c018.png"},7318:(e,n,a)=>{a.d(n,{A:()=>t});const t=a.p+"assets/images/plugin_config_en-bdb93d3db24b39ce654594ab25e41d0e.png"},79287:(e,n,a)=>{a.d(n,{A:()=>t});const t=a.p+"assets/images/produce_chart_en-2efaa216b9aca95860902c4e62dac10e.png"},80753:(e,n,a)=>{a.d(n,{A:()=>t});const t=a.p+"assets/images/rule_config_en-f235fadf861a283cb385c641139ab56a.png"},54192:(e,n,a)=>{a.d(n,{A:()=>t});const t=a.p+"assets/images/selector_config_en-480ebdaf7d31b5e65c74225ba58424a3.png"}}]);