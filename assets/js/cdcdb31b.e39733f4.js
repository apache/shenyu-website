"use strict";(self.webpackChunkshenyu_website=self.webpackChunkshenyu_website||[]).push([[82659],{6498:(e,n,a)=>{a.r(n),a.d(n,{contentTitle:()=>o,default:()=>g,frontMatter:()=>r,metadata:()=>l,toc:()=>s});var i=a(58168),t=(a(96540),a(15680));const r={title:"Sofa Plugin",keywords:["sofa"],description:"Sofa Plugin"},o="1. Overview",l={unversionedId:"plugin-center/proxy/sofa-plugin",id:"version-2.7.0/plugin-center/proxy/sofa-plugin",isDocsHomePage:!1,title:"Sofa Plugin",description:"Sofa Plugin",source:"@site/versioned_docs/version-2.7.0/plugin-center/proxy/sofa-plugin.md",sourceDirName:"plugin-center/proxy",slug:"/plugin-center/proxy/sofa-plugin",permalink:"/docs/plugin-center/proxy/sofa-plugin",editUrl:"https://github.com/apache/shenyu-website/edit/main/versioned_docs/version-2.7.0/plugin-center/proxy/sofa-plugin.md",version:"2.7.0",frontMatter:{title:"Sofa Plugin",keywords:["sofa"],description:"Sofa Plugin"},sidebar:"version-2.7.0/tutorialSidebar",previous:{title:"Mqtt Plugin",permalink:"/docs/plugin-center/proxy/mqtt-plugin"},next:{title:"Spring Cloud Plugin",permalink:"/docs/plugin-center/proxy/spring-cloud-plugin"}},s=[{value:"1.1 Plugin name",id:"11-plugin-name",children:[]},{value:"1.2 Appropriate scenario",id:"12-appropriate-scenario",children:[]},{value:"1.3 Plugin functionality",id:"13-plugin-functionality",children:[]},{value:"1.4 Plugin code",id:"14-plugin-code",children:[]},{value:"1.5 Added since which shenyu version",id:"15-added-since-which-shenyu-version",children:[]},{value:"2.1 Plugin-use procedure chart",id:"21-plugin-use-procedure-chart",children:[]},{value:"2.2 Import pom",id:"22-import-pom",children:[]},{value:"2.3 Configure in the client project",id:"23-configure-in-the-client-project",children:[]},{value:"2.4 Enable plugin",id:"24-enable-plugin",children:[]},{value:"2.5 Config plugin",id:"25-config-plugin",children:[{value:"2.5.1 Registry Config",id:"251-registry-config",children:[]},{value:"2.5.2 Selector config",id:"252-selector-config",children:[]},{value:"2.5.3 Rule Config",id:"253-rule-config",children:[]},{value:"2.5.4 Metadata config",id:"254-metadata-config",children:[]}]},{value:"2.6 Examples",id:"26-examples",children:[{value:"2.6.1 Accessing the sofa service via Zookeeper using ShenYu",id:"261-accessing-the-sofa-service-via-zookeeper-using-shenyu",children:[]}]}],p={toc:s},c="wrapper";function g(e){let{components:n,...r}=e;return(0,t.yg)(c,(0,i.A)({},p,r,{components:n,mdxType:"MDXLayout"}),(0,t.yg)("h1",{id:"1-overview"},"1. Overview"),(0,t.yg)("h2",{id:"11-plugin-name"},"1.1 Plugin name"),(0,t.yg)("ul",null,(0,t.yg)("li",{parentName:"ul"},"Sofa plugin")),(0,t.yg)("h2",{id:"12-appropriate-scenario"},"1.2 Appropriate scenario"),(0,t.yg)("ul",null,(0,t.yg)("li",{parentName:"ul"},"Protocol conversion, a plugin that converts http protocol requests into the sofa framework protocol"),(0,t.yg)("li",{parentName:"ul"},"Service Load Balancing.")),(0,t.yg)("h2",{id:"13-plugin-functionality"},"1.3 Plugin functionality"),(0,t.yg)("ul",null,(0,t.yg)("li",{parentName:"ul"},"Converting http protocol requests to sofa framework protocol.")),(0,t.yg)("h2",{id:"14-plugin-code"},"1.4 Plugin code"),(0,t.yg)("ul",null,(0,t.yg)("li",{parentName:"ul"},"Core Module ",(0,t.yg)("inlineCode",{parentName:"li"},"shenyu-plugin-sofa")),(0,t.yg)("li",{parentName:"ul"},"Core Class ",(0,t.yg)("inlineCode",{parentName:"li"},"org.apache.shenyu.plugin.sofa.SofaPlugin"))),(0,t.yg)("h2",{id:"15-added-since-which-shenyu-version"},"1.5 Added since which shenyu version"),(0,t.yg)("ul",null,(0,t.yg)("li",{parentName:"ul"},"2.3.0")),(0,t.yg)("h1",{id:"2-how-to-use-plugin"},"2. How to use plugin"),(0,t.yg)("h2",{id:"21-plugin-use-procedure-chart"},"2.1 Plugin-use procedure chart"),(0,t.yg)("p",null,(0,t.yg)("img",{alt:"image-20220828222022336",src:a(76081).A})),(0,t.yg)("h2",{id:"22-import-pom"},"2.2 Import pom"),(0,t.yg)("pre",null,(0,t.yg)("code",{parentName:"pre",className:"language-xml"},"        <dependency>\n            <groupId>com.alipay.sofa</groupId>\n            <artifactId>rpc-sofa-boot-starter</artifactId>\n            <version>${rpc-sofa-boot-starter.version}</version>\n        </dependency>\n        <dependency>\n            <groupId>org.apache.shenyu</groupId>\n            <artifactId>shenyu-spring-boot-starter-client-sofa</artifactId>\n            <version>${project.version}</version>\n            <exclusions>\n                <exclusion>\n                    <artifactId>guava</artifactId>\n                    <groupId>com.google.guava</groupId>\n                </exclusion>\n            </exclusions>\n        </dependency>\n")),(0,t.yg)("h2",{id:"23-configure-in-the-client-project"},"2.3 Configure in the client project"),(0,t.yg)("ol",null,(0,t.yg)("li",{parentName:"ol"},"Configure the sofa configuration in application.yml.")),(0,t.yg)("pre",null,(0,t.yg)("code",{parentName:"pre",className:"language-yaml"},"com:\n  alipay:\n    sofa:\n      rpc:\n        registry-address: zookeeper://127.0.0.1:2181 # consul # nacos\n        bolt-port: 8888\nshenyu:\n  register:\n    registerType: http #zookeeper #etcd #nacos #consul\n    serverLists: http://localhost:9095 #localhost:2181 #http://localhost:2379 #localhost:8848\n    props:\n      username: admin\n      password: 123456\n  client:\n    sofa:\n      props:\n        contextPath: /sofa\n        ipAndPort: sofa\n        appName: sofa\n        port: 8888\n")),(0,t.yg)("ol",{start:2},(0,t.yg)("li",{parentName:"ol"},"Configure the service interface exposed by the sofa service in the xml file in the resources directory.")),(0,t.yg)("pre",null,(0,t.yg)("code",{parentName:"pre",className:"language-xml"},'<beans xmlns="http://www.springframework.org/schema/beans"\n       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\n       xmlns:sofa="http://sofastack.io/schema/sofaboot"\n       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd\n            http://sofastack.io/schema/sofaboot https://sofastack.io/schema/sofaboot.xsd"\n       default-autowire="byName">\n        \x3c!-- \u793a\u4f8b sofa \u63a5\u53e3 --\x3e\n    <sofa:service ref="sofaSingleParamService" interface="org.apache.shenyu.examples.sofa.api.service.SofaSingleParamService">\n        <sofa:binding.bolt/>\n    </sofa:service>\n        \x3c!-- \u793a\u4f8b sofa \u63a5\u53e3 --\x3e\n    <sofa:service ref="sofaMultiParamService" interface="org.apache.shenyu.examples.sofa.api.service.SofaMultiParamService">\n        <sofa:binding.bolt/>\n    </sofa:service>\n</beans>\n')),(0,t.yg)("ol",{start:3},(0,t.yg)("li",{parentName:"ol"},"Add the ",(0,t.yg)("inlineCode",{parentName:"li"},"@ShenyuSofaClient")," annotation to the interface.")),(0,t.yg)("pre",null,(0,t.yg)("code",{parentName:"pre",className:"language-java"},'@ShenyuSofaClient("/demo")\n@Service\npublic class SofaClientMultiParamServiceImpl implements SofaClientMultiParamService {\n    \n    @Override\n    @ShenyuSofaClient("/findByIdsAndName")\n    public SofaSimpleTypeBean findByIdsAndName(final List<Integer> ids, final String name) {\n        return new SofaSimpleTypeBean(ids.toString(), "hello world shenyu sofa param findByIdsAndName \uff1a" + name);\n    }\n}\n')),(0,t.yg)("h2",{id:"24-enable-plugin"},"2.4 Enable plugin"),(0,t.yg)("ul",null,(0,t.yg)("li",{parentName:"ul"},(0,t.yg)("p",{parentName:"li"},"In shenyu-admin --\x3e BasicConfig --\x3e Plugin --\x3e ",(0,t.yg)("inlineCode",{parentName:"p"},"sofa")," set Status enabled."),(0,t.yg)("p",{parentName:"li"},(0,t.yg)("img",{alt:"image-20220829193836286",src:a(44732).A})))),(0,t.yg)("h2",{id:"25-config-plugin"},"2.5 Config plugin"),(0,t.yg)("h3",{id:"251-registry-config"},"2.5.1 Registry Config"),(0,t.yg)("p",null,(0,t.yg)("img",{alt:"image-20220829193913149",src:a(90452).A})),(0,t.yg)("ul",null,(0,t.yg)("li",{parentName:"ul"},(0,t.yg)("inlineCode",{parentName:"li"},"protocol"),":  Register center protocol, currently supports zookeeper\u3001consul\u3001nacos."),(0,t.yg)("li",{parentName:"ul"},(0,t.yg)("inlineCode",{parentName:"li"},"register"),": The service IP and PORT of the registry."),(0,t.yg)("li",{parentName:"ul"},(0,t.yg)("inlineCode",{parentName:"li"},"threadpool"),"\uff1aThere are five types of business thread pools: ",(0,t.yg)("inlineCode",{parentName:"li"},"fixed"),", ",(0,t.yg)("inlineCode",{parentName:"li"},"eager"),", ",(0,t.yg)("inlineCode",{parentName:"li"},"cached"),", ",(0,t.yg)("inlineCode",{parentName:"li"},"limited")," and ",(0,t.yg)("inlineCode",{parentName:"li"},"shared"),". The first 4 types correspond to the thread pools officially provided by dubbo. Let's talk about ",(0,t.yg)("inlineCode",{parentName:"li"},"shared"),", as its name implies, ",(0,t.yg)("inlineCode",{parentName:"li"},"all proxy plugins")," share a ",(0,t.yg)("inlineCode",{parentName:"li"},"shared")," thread pool, the advantage of this is that it can reduce the number of thread pools, thereby reducing memory and improving resource utilization."),(0,t.yg)("li",{parentName:"ul"},(0,t.yg)("inlineCode",{parentName:"li"},"corethreads"),"\uff1aThe number of core threads in the business thread pool."),(0,t.yg)("li",{parentName:"ul"},(0,t.yg)("inlineCode",{parentName:"li"},"threads"),"\uff1aThe maximum number of threads in the business thread pool."),(0,t.yg)("li",{parentName:"ul"},(0,t.yg)("inlineCode",{parentName:"li"},"queues"),"\uff1aThe length of the blocking queue of the business thread pool, 0 means ",(0,t.yg)("inlineCode",{parentName:"li"},"unbounded blocking queue"),".")),(0,t.yg)("h3",{id:"252-selector-config"},"2.5.2 Selector config"),(0,t.yg)("blockquote",null,(0,t.yg)("p",{parentName:"blockquote"},"Flow needs to be matched by selector.")),(0,t.yg)("p",null,(0,t.yg)("img",{alt:"image-20220829193948830",src:a(29807).A})),(0,t.yg)("ul",null,(0,t.yg)("li",{parentName:"ul"},"Automatically configure the selector with the ",(0,t.yg)("inlineCode",{parentName:"li"},"@ShenyuSofaClient")," annotation.")),(0,t.yg)("h3",{id:"253-rule-config"},"2.5.3 Rule Config"),(0,t.yg)("blockquote",null,(0,t.yg)("p",{parentName:"blockquote"},"After the traffic has been successfully matched by the selector, it will enter the rules for the final traffic matching.")),(0,t.yg)("p",null,(0,t.yg)("img",{alt:"image-20220829194018202",src:a(93038).A})),(0,t.yg)("ul",null,(0,t.yg)("li",{parentName:"ul"},"Automatically configure the selector with the ",(0,t.yg)("inlineCode",{parentName:"li"},"@ShenyuSofaClient")," annotation.")),(0,t.yg)("h3",{id:"254-metadata-config"},"2.5.4 Metadata config"),(0,t.yg)("blockquote",null,(0,t.yg)("p",{parentName:"blockquote"},"When the ",(0,t.yg)("inlineCode",{parentName:"p"},"sofa")," application client accesses the ",(0,t.yg)("inlineCode",{parentName:"p"},"Apache ShenYu")," gateway, it will be automatically registered, and can be viewed in the ",(0,t.yg)("inlineCode",{parentName:"p"},"-shenyu-admin")," backend management system's basic configuration ",(0,t.yg)("inlineCode",{parentName:"p"},"--\x3e")," metadata management, each ",(0,t.yg)("inlineCode",{parentName:"p"},"sofa")," interface method, will correspond to a metadata.")),(0,t.yg)("p",null,(0,t.yg)("img",{alt:"image-20220829194058044",src:a(92415).A})),(0,t.yg)("ul",null,(0,t.yg)("li",{parentName:"ul"},(0,t.yg)("p",{parentName:"li"},"AppName: specifies the name of the application to which the metadata belongs.")),(0,t.yg)("li",{parentName:"ul"},(0,t.yg)("p",{parentName:"li"},"MethodName: the name of the method to call.")),(0,t.yg)("li",{parentName:"ul"},(0,t.yg)("p",{parentName:"li"},"Path: http request path.")),(0,t.yg)("li",{parentName:"ul"},(0,t.yg)("p",{parentName:"li"},"PathDescribe: the description of the path is easy to view.")),(0,t.yg)("li",{parentName:"ul"},(0,t.yg)("p",{parentName:"li"},"ParamsType: the parameters are separated by commas (,) in the order of interface parameter types.")),(0,t.yg)("li",{parentName:"ul"},(0,t.yg)("p",{parentName:"li"},"RpcExpand: other configurations of the ",(0,t.yg)("inlineCode",{parentName:"p"},"sofa")," interface, which support the ",(0,t.yg)("inlineCode",{parentName:"p"},"JSON")," format."),(0,t.yg)("p",{parentName:"li"},"examples\uff1a",(0,t.yg)("inlineCode",{parentName:"p"},'{"loadbalance":"hash","retries":3,"timeout":-1}')),(0,t.yg)("ul",{parentName:"li"},(0,t.yg)("li",{parentName:"ul"},(0,t.yg)("inlineCode",{parentName:"li"},"loadbalance"),"\uff1aLoad balancing policy, currently supports roundRobin, random and hash."),(0,t.yg)("li",{parentName:"ul"},(0,t.yg)("inlineCode",{parentName:"li"},"retries"),"\uff1aNumber of retries to call client timeout failures."),(0,t.yg)("li",{parentName:"ul"},(0,t.yg)("inlineCode",{parentName:"li"},"timeout"),"\uff1aCalling the client's timeout time."))),(0,t.yg)("li",{parentName:"ul"},(0,t.yg)("p",{parentName:"li"},"Interface: The fully qualified class name of the ",(0,t.yg)("inlineCode",{parentName:"p"},"sofa")," interface.")),(0,t.yg)("li",{parentName:"ul"},(0,t.yg)("p",{parentName:"li"},"RpcType\uff1achoose ",(0,t.yg)("inlineCode",{parentName:"p"},"sofa"),"."))),(0,t.yg)("h2",{id:"26-examples"},"2.6 Examples"),(0,t.yg)("h3",{id:"261-accessing-the-sofa-service-via-zookeeper-using-shenyu"},"2.6.1 Accessing the sofa service via Zookeeper using ShenYu"),(0,t.yg)("h4",{id:"2611-preparation"},"2.6.1.1 Preparation"),(0,t.yg)("ul",null,(0,t.yg)("li",{parentName:"ul"},"Start ",(0,t.yg)("inlineCode",{parentName:"li"},"Zookeeper")," service."),(0,t.yg)("li",{parentName:"ul"},"Start ",(0,t.yg)("inlineCode",{parentName:"li"},"ShenYu Admin"),"."),(0,t.yg)("li",{parentName:"ul"},"Start ",(0,t.yg)("inlineCode",{parentName:"li"},"Shenyu Bootstrap"),".")),(0,t.yg)("h4",{id:"2612-plugin-config"},"2.6.1.2 Plugin Config"),(0,t.yg)("ul",null,(0,t.yg)("li",{parentName:"ul"},"In shenyu-admin --\x3e BasicConfig --\x3e Plugin --\x3e ",(0,t.yg)("inlineCode",{parentName:"li"},"sofa")," set Status enabled, And adjust the registry configuration as needed."),(0,t.yg)("li",{parentName:"ul"},"Adjust to the actual situation ",(0,t.yg)("a",{parentName:"li",href:"https://github.com/apache/shenyu/tree/master/shenyu-examples/shenyu-examples-sofa"},"shenyu-examples-sofa")," application.yml configuration in the project and start it.")),(0,t.yg)("h4",{id:"2626-request-service-and-check-result"},"2.6.2.6 Request service and check result"),(0,t.yg)("p",null,(0,t.yg)("img",{alt:"image-20220828012420068",src:a(42486).A})),(0,t.yg)("h1",{id:"3-how-to-disable-plugin"},"3. How to disable plugin"),(0,t.yg)("ul",null,(0,t.yg)("li",{parentName:"ul"},"In ",(0,t.yg)("inlineCode",{parentName:"li"},"shenyu-admin")," --\x3e BasicConfig --\x3e Plugin --\x3e ",(0,t.yg)("inlineCode",{parentName:"li"},"sofa")," set Status disable.")),(0,t.yg)("p",null,(0,t.yg)("img",{alt:"image-20220829194151368",src:a(70213).A})))}g.isMDXComponent=!0},15680:(e,n,a)=>{a.d(n,{xA:()=>c,yg:()=>m});var i=a(96540);function t(e,n,a){return n in e?Object.defineProperty(e,n,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[n]=a,e}function r(e,n){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);n&&(i=i.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),a.push.apply(a,i)}return a}function o(e){for(var n=1;n<arguments.length;n++){var a=null!=arguments[n]?arguments[n]:{};n%2?r(Object(a),!0).forEach((function(n){t(e,n,a[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):r(Object(a)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(a,n))}))}return e}function l(e,n){if(null==e)return{};var a,i,t=function(e,n){if(null==e)return{};var a,i,t={},r=Object.keys(e);for(i=0;i<r.length;i++)a=r[i],n.indexOf(a)>=0||(t[a]=e[a]);return t}(e,n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(i=0;i<r.length;i++)a=r[i],n.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(t[a]=e[a])}return t}var s=i.createContext({}),p=function(e){var n=i.useContext(s),a=n;return e&&(a="function"==typeof e?e(n):o(o({},n),e)),a},c=function(e){var n=p(e.components);return i.createElement(s.Provider,{value:n},e.children)},g="mdxType",u={inlineCode:"code",wrapper:function(e){var n=e.children;return i.createElement(i.Fragment,{},n)}},d=i.forwardRef((function(e,n){var a=e.components,t=e.mdxType,r=e.originalType,s=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),g=p(a),d=t,m=g["".concat(s,".").concat(d)]||g[d]||u[d]||r;return a?i.createElement(m,o(o({ref:n},c),{},{components:a})):i.createElement(m,o({ref:n},c))}));function m(e,n){var a=arguments,t=n&&n.mdxType;if("string"==typeof e||t){var r=a.length,o=new Array(r);o[0]=d;var l={};for(var s in n)hasOwnProperty.call(n,s)&&(l[s]=n[s]);l.originalType=e,l[g]="string"==typeof e?e:t,o[1]=l;for(var p=2;p<r;p++)o[p]=a[p];return i.createElement.apply(null,o)}return i.createElement.apply(null,a)}d.displayName="MDXCreateElement"},29807:(e,n,a)=>{a.d(n,{A:()=>i});const i=a.p+"assets/images/selector_config_en-0c4c2b8f91583b3e13bf41f09b0e2ab2.png"},42486:(e,n,a)=>{a.d(n,{A:()=>i});const i=a.p+"assets/images/check_request_zh-c4535143f335e2e88be54d7d10a65d61.png"},44732:(e,n,a)=>{a.d(n,{A:()=>i});const i=a.p+"assets/images/enable_sofa_en-0fdb2ba4cad714e87d04fb8fa4bd4591.png"},70213:(e,n,a)=>{a.d(n,{A:()=>i});const i=a.p+"assets/images/close_sofa_en-5e49d5ba450a5fb8dc793c11a7422f9a.png"},76081:(e,n,a)=>{a.d(n,{A:()=>i});const i=a.p+"assets/images/procedure_chart_en-5d71f183478498a526b766c4a72db530.png"},90452:(e,n,a)=>{a.d(n,{A:()=>i});const i=a.p+"assets/images/sofa_registry_en-a6f245993c5792729effce29214f0b87.png"},92415:(e,n,a)=>{a.d(n,{A:()=>i});const i=a.p+"assets/images/metadata_config_en-fa04cf537ccb6e5e3e14b9cc6ad907a0.png"},93038:(e,n,a)=>{a.d(n,{A:()=>i});const i=a.p+"assets/images/rule_config_en-64d4b22ac30218bf808693c6f2f94e2d.png"}}]);