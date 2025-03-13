"use strict";(self.webpackChunkshenyu_website=self.webpackChunkshenyu_website||[]).push([[11336],{15680:(e,i,n)=>{n.d(i,{xA:()=>p,yg:()=>m});var t=n(96540);function a(e,i,n){return i in e?Object.defineProperty(e,i,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[i]=n,e}function r(e,i){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);i&&(t=t.filter((function(i){return Object.getOwnPropertyDescriptor(e,i).enumerable}))),n.push.apply(n,t)}return n}function l(e){for(var i=1;i<arguments.length;i++){var n=null!=arguments[i]?arguments[i]:{};i%2?r(Object(n),!0).forEach((function(i){a(e,i,n[i])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(i){Object.defineProperty(e,i,Object.getOwnPropertyDescriptor(n,i))}))}return e}function o(e,i){if(null==e)return{};var n,t,a=function(e,i){if(null==e)return{};var n,t,a={},r=Object.keys(e);for(t=0;t<r.length;t++)n=r[t],i.indexOf(n)>=0||(a[n]=e[n]);return a}(e,i);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(t=0;t<r.length;t++)n=r[t],i.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var s=t.createContext({}),u=function(e){var i=t.useContext(s),n=i;return e&&(n="function"==typeof e?e(i):l(l({},i),e)),n},p=function(e){var i=u(e.components);return t.createElement(s.Provider,{value:i},e.children)},d="mdxType",g={inlineCode:"code",wrapper:function(e){var i=e.children;return t.createElement(t.Fragment,{},i)}},c=t.forwardRef((function(e,i){var n=e.components,a=e.mdxType,r=e.originalType,s=e.parentName,p=o(e,["components","mdxType","originalType","parentName"]),d=u(n),c=a,m=d["".concat(s,".").concat(c)]||d[c]||g[c]||r;return n?t.createElement(m,l(l({ref:i},p),{},{components:n})):t.createElement(m,l({ref:i},p))}));function m(e,i){var n=arguments,a=i&&i.mdxType;if("string"==typeof e||a){var r=n.length,l=new Array(r);l[0]=c;var o={};for(var s in i)hasOwnProperty.call(i,s)&&(o[s]=i[s]);o.originalType=e,o[d]="string"==typeof e?e:a,l[1]=o;for(var u=2;u<r;u++)l[u]=n[u];return t.createElement.apply(null,l)}return t.createElement.apply(null,n)}c.displayName="MDXCreateElement"},41468:(e,i,n)=>{n.r(i),n.d(i,{contentTitle:()=>l,default:()=>d,frontMatter:()=>r,metadata:()=>o,toc:()=>s});var t=n(58168),a=(n(96540),n(15680));const r={title:"Divide Plugin",keywords:["divide"],description:"divide plugin"},l="1. Overview",o={unversionedId:"plugin-center/http-handle/divide-plugin",id:"version-2.4.0/plugin-center/http-handle/divide-plugin",isDocsHomePage:!1,title:"Divide Plugin",description:"divide plugin",source:"@site/versioned_docs/version-2.4.0/plugin-center/http-handle/divide-plugin.md",sourceDirName:"plugin-center/http-handle",slug:"/plugin-center/http-handle/divide-plugin",permalink:"/docs/2.4.0/plugin-center/http-handle/divide-plugin",editUrl:"https://github.com/apache/shenyu-website/edit/main/versioned_docs/version-2.4.0/plugin-center/http-handle/divide-plugin.md",version:"2.4.0",frontMatter:{title:"Divide Plugin",keywords:["divide"],description:"divide plugin"},sidebar:"version-2.4.0/tutorialSidebar",previous:{title:"ContextPath Plugin",permalink:"/docs/2.4.0/plugin-center/http-handle/context-path-plugin"},next:{title:"ModifyResponse Plugin",permalink:"/docs/2.4.0/plugin-center/http-handle/modify-response-plugin"}},s=[{value:"1.1 Plugin Name",id:"11-plugin-name",children:[]},{value:"1.2 Appropriate Scenario",id:"12-appropriate-scenario",children:[]},{value:"1.3 Plugin functionality",id:"13-plugin-functionality",children:[]},{value:"1.4 Plugin Code",id:"14-plugin-code",children:[]},{value:"2.1 Plugin-use procedure chart",id:"21-plugin-use-procedure-chart",children:[]},{value:"2.2 Import pom",id:"22-import-pom",children:[]},{value:"2.3 Enable plugin",id:"23-enable-plugin",children:[]},{value:"2.4 Config plugin",id:"24-config-plugin",children:[{value:"2.4.1 Configure access parameters in the client project configuration file",id:"241-configure-access-parameters-in-the-client-project-configuration-file",children:[]},{value:"2.4.2 Configure upstream validity detection parameters in the shenyu-admin configuration file",id:"242-configure-upstream-validity-detection-parameters-in-the-shenyu-admin-configuration-file",children:[]},{value:"2.4.3 Configure the selector and rule information of the divide plugin in shenyu-admin",id:"243-configure-the-selector-and-rule-information-of-the-divide-plugin-in-shenyu-admin",children:[]}]},{value:"2.5 Examples",id:"25-examples",children:[{value:"2.5.1 Example A/B Test",id:"251-example-ab-test",children:[]},{value:"2.5.2 Example Grayscale Test",id:"252-example-grayscale-test",children:[]}]}],u={toc:s},p="wrapper";function d(e){let{components:i,...r}=e;return(0,a.yg)(p,(0,t.A)({},u,r,{components:i,mdxType:"MDXLayout"}),(0,a.yg)("h1",{id:"1-overview"},"1. Overview"),(0,a.yg)("h2",{id:"11-plugin-name"},"1.1 Plugin Name"),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("inlineCode",{parentName:"li"},"divide")," Plugin")),(0,a.yg)("h2",{id:"12-appropriate-scenario"},"1.2 Appropriate Scenario"),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},"Handling ",(0,a.yg)("inlineCode",{parentName:"li"},"http protocol")," requests."),(0,a.yg)("li",{parentName:"ul"},"Support traffic management, such as a/b test, grayscale test."),(0,a.yg)("li",{parentName:"ul"},"Service Load Balancing."),(0,a.yg)("li",{parentName:"ul"},"Set request timeout.")),(0,a.yg)("h2",{id:"13-plugin-functionality"},"1.3 Plugin functionality"),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},"Supports traffic management based on request information such as uri, header, and query."),(0,a.yg)("li",{parentName:"ul"},"Supports setting the load balancing strategy for requests, and supports service warm-up. Currently, three strategies are supported: ip hash (consistent hash with virtual nodes), round-robbin (weighted polling), random (weighted random)."),(0,a.yg)("li",{parentName:"ul"},"Supports setting the maximum value of the request header, the maximum value of the request body, and the request level timeout."),(0,a.yg)("li",{parentName:"ul"},"Supports setting the timeout retry policy and the number of retries. Currently, the retry policy supports: current (retrying the server that failed before) and failover (retrying other servers).")),(0,a.yg)("h2",{id:"14-plugin-code"},"1.4 Plugin Code"),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},"Core module is ",(0,a.yg)("inlineCode",{parentName:"li"},"shenyu-plugin-divide"),"."),(0,a.yg)("li",{parentName:"ul"},"Core class is ",(0,a.yg)("inlineCode",{parentName:"li"},"org.apache.shenyu.plugin.divide.DividePlugin"),".")),(0,a.yg)("h1",{id:"2-how-to-use-plugin"},"2. How to use plugin"),(0,a.yg)("h2",{id:"21-plugin-use-procedure-chart"},"2.1 Plugin-use procedure chart"),(0,a.yg)("p",null,(0,a.yg)("img",{src:n(62926).A})),(0,a.yg)("h2",{id:"22-import-pom"},"2.2 Import pom"),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},"Import maven in shenyu-bootstrap project's ",(0,a.yg)("inlineCode",{parentName:"li"},"pom.xml")," file.")),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-xml"},"  <dependency>\n      <groupId>org.apache.shenyu</groupId>\n      <artifactId>shenyu-spring-boot-starter-gateway</artifactId>\n     <version>${project.version}</version>\n  </dependency>\n")),(0,a.yg)("h2",{id:"23-enable-plugin"},"2.3 Enable plugin"),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},"In ",(0,a.yg)("inlineCode",{parentName:"li"},"shenyu-admin")," --\x3e BasicConfig --\x3e Plugin --\x3e ",(0,a.yg)("inlineCode",{parentName:"li"},"divide")," set Status enable.")),(0,a.yg)("p",null,(0,a.yg)("img",{src:n(88272).A})),(0,a.yg)("h2",{id:"24-config-plugin"},"2.4 Config plugin"),(0,a.yg)("h3",{id:"241-configure-access-parameters-in-the-client-project-configuration-file"},"2.4.1 Configure access parameters in the client project configuration file"),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},"Client access method and server address. The following example uses the http access method. Currently, the client supports the following access methods: http, zookeeper, etcd, nacos, consul. For detailed access configuration parameters, please refer to ",(0,a.yg)("a",{parentName:"li",href:"../../user-guide/register-center-access"},"Client Access Configuration"),"."),(0,a.yg)("li",{parentName:"ul"},"Client configuration, including the protocol name and the routing address of the service, please use the http protocol here, and the value of contextPath must be configured as the routing address of each service.")),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-yaml"},"  shenyu:\n    register:\n      registerType: http\n      serverLists: http://localhost:9095\n      props:\n        username: admin\n        password: 123456\n    client:\n      http: # http protocol\n        props:\n          contextPath: /http # routing address for each service\n")),(0,a.yg)("h3",{id:"242-configure-upstream-validity-detection-parameters-in-the-shenyu-admin-configuration-file"},"2.4.2 Configure upstream validity detection parameters in the shenyu-admin configuration file"),(0,a.yg)("p",null,"The following example uses the http access method. Currently, the client supports the following access methods: http, zookeeper, etcd, nacos, consul. For detailed access configuration parameters, please refer to ",(0,a.yg)("a",{parentName:"p",href:"../../user-guide/register-center-access"},"Client Access Configuration"),"."),(0,a.yg)("blockquote",null,(0,a.yg)("p",{parentName:"blockquote"},"Only http-type registries support upstream detection.")),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-yaml"},"  shenyu:\n    register:\n      registerType: http # Only http-type register center support upstream detection.\n      serverLists: \n      props:\n        checked: true # The default is true, set to false, do not detect.\n        zombieCheckTimes: 5 # The maximum number of zombie upstream detections. If it exceeds 5 times, its validity will no longer be detected. The default value is 5.\n        scheduledTime: 10 # Timing detection interval, the default is 10 seconds.\n        zombieRemovalTimes: 60 # How many seconds the upstream is offline to be considered as a zombie upstream, the default is 60 seconds.\n")),(0,a.yg)("h3",{id:"243-configure-the-selector-and-rule-information-of-the-divide-plugin-in-shenyu-admin"},"2.4.3 Configure the selector and rule information of the divide plugin in shenyu-admin"),(0,a.yg)("p",null,"After the client is started, the ",(0,a.yg)("a",{parentName:"p",href:"../../user-guide/admin-usage/selector-and-rule"},"selector and rule")," information will be automatically registered in shenyu-admin -> Plugin List -> Proxy -> Divide."),(0,a.yg)("p",null,(0,a.yg)("img",{src:n(53914).A})),(0,a.yg)("h4",{id:"2431-selector-configuration"},"2.4.3.1 Selector configuration"),(0,a.yg)("p",null,"Example of divide selector. For general selector configuration, please refer to ",(0,a.yg)("a",{parentName:"p",href:"../../user-guide/admin-usage/selector-and-rule"},"Selectors and Rules"),"."),(0,a.yg)("p",null,(0,a.yg)("img",{src:n(83614).A})),(0,a.yg)("h5",{id:"24311-selector-handling-information-configuration"},"2.4.3.1.1 Selector handling information configuration"),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("inlineCode",{parentName:"li"},"host"),": fill in ",(0,a.yg)("inlineCode",{parentName:"li"},"localhost"),", this field is not used currently."),(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("inlineCode",{parentName:"li"},"ip:port"),": ",(0,a.yg)("inlineCode",{parentName:"li"},"ip")," and port, fill in the ",(0,a.yg)("inlineCode",{parentName:"li"},"ip")," + port of your real service here."),(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("inlineCode",{parentName:"li"},"protocol"),": ",(0,a.yg)("inlineCode",{parentName:"li"},"http")," protocol, fill in ",(0,a.yg)("inlineCode",{parentName:"li"},"http:")," or ",(0,a.yg)("inlineCode",{parentName:"li"},"https:"),", if not fill in, the default is: ",(0,a.yg)("inlineCode",{parentName:"li"},"http:"),"."),(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("inlineCode",{parentName:"li"},"startupTime"),": Startup time in milliseconds."),(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("inlineCode",{parentName:"li"},"weight"),": load balancing weight, the default value of service startup automatic registration is 50."),(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("inlineCode",{parentName:"li"},"warmupTime"),": Warmup time, in milliseconds. The server during warmup will calculate the instantaneous weight, and the calculated value will be smaller than the actual configured weight to protect the server just started. The default value of service startup registration is 10. For example, the warm-up time is 100 milliseconds, the current startup is 50 milliseconds, the configured weight is 50, and the actual weight is 25."),(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("inlineCode",{parentName:"li"},"status"),": On or off, this selector is valid only in the on state.")),(0,a.yg)("h4",{id:"2432-processing-information-configuration-of-rules"},"2.4.3.2 Processing information configuration of rules"),(0,a.yg)("p",null,"Example of divide rule. For general rule configuration, please refer to ",(0,a.yg)("a",{parentName:"p",href:"../../user-guide/admin-usage/selector-and-rule"},"selectors and rules"),"."),(0,a.yg)("p",null,(0,a.yg)("img",{src:n(78245).A})),(0,a.yg)("h5",{id:"24321-rule-processing-information-configuration"},"2.4.3.2.1 Rule processing information configuration"),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("inlineCode",{parentName:"li"},"loadStrategy"),": If the ",(0,a.yg)("inlineCode",{parentName:"li"},"http")," client is a cluster, which load balancing strategy is used when the ",(0,a.yg)("inlineCode",{parentName:"li"},"Apache ShenYu")," gateway is called, currently supports ",(0,a.yg)("inlineCode",{parentName:"li"},"roundRobin"),", ",(0,a.yg)("inlineCode",{parentName:"li"},"random")," and ",(0,a.yg)("inlineCode",{parentName:"li"},"hash"),"."),(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("inlineCode",{parentName:"li"},"timeout"),": The timeout for calling the ",(0,a.yg)("inlineCode",{parentName:"li"},"http")," client."),(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("inlineCode",{parentName:"li"},"retry Count"),": The number of retries that failed to call the ",(0,a.yg)("inlineCode",{parentName:"li"},"http")," client timeout."),(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("inlineCode",{parentName:"li"},"headerMaxSize"),": The maximum value of the requested ",(0,a.yg)("inlineCode",{parentName:"li"},"header"),"."),(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("inlineCode",{parentName:"li"},"requestMaxSize"),": The maximum value of the request body."),(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("inlineCode",{parentName:"li"},"retryStrategy"),": Supported since ",(0,a.yg)("inlineCode",{parentName:"li"},"2.4.3"),", retry strategy after failure, default ",(0,a.yg)("inlineCode",{parentName:"li"},"current")," to maintain compatibility with lower versions. For example, there are 3 downstream services ",(0,a.yg)("inlineCode",{parentName:"li"},"http:localhost:1111"),", ",(0,a.yg)("inlineCode",{parentName:"li"},"http:localhost:1112")," and ",(0,a.yg)("inlineCode",{parentName:"li"},"http:localhost:1113"),", assuming the first load balancing to ",(0,a.yg)("inlineCode",{parentName:"li"},"http:localhost:1111")," and ",(0,a.yg)("inlineCode",{parentName:"li"},"call failed"),". Using the ",(0,a.yg)("inlineCode",{parentName:"li"},"current")," strategy will continue to retry calling ",(0,a.yg)("inlineCode",{parentName:"li"},"http:localhost:1111"),"; using the ",(0,a.yg)("inlineCode",{parentName:"li"},"failover")," strategy will retry calling other services such as ",(0,a.yg)("inlineCode",{parentName:"li"},"http:localhost:1112")," through the ",(0,a.yg)("inlineCode",{parentName:"li"},"load balancing"),", if it fails again at this time , call to ",(0,a.yg)("inlineCode",{parentName:"li"},"http:localhost:1113")," until no service is available.")),(0,a.yg)("h2",{id:"25-examples"},"2.5 Examples"),(0,a.yg)("h3",{id:"251-example-ab-test"},"2.5.1 Example A/B Test"),(0,a.yg)("p",null,"To be added, welcome contribute."),(0,a.yg)("h3",{id:"252-example-grayscale-test"},"2.5.2 Example Grayscale Test"),(0,a.yg)("p",null,"To be added, welcome contribute."),(0,a.yg)("h1",{id:"3-how-to-disable-plugin"},"3. How to disable plugin"),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},"In ",(0,a.yg)("inlineCode",{parentName:"li"},"shenyu-admin")," --\x3e BasicConfig --\x3e Plugin --\x3e ",(0,a.yg)("inlineCode",{parentName:"li"},"divide")," set Status disable.")),(0,a.yg)("p",null,(0,a.yg)("img",{src:n(91747).A})))}d.isMDXComponent=!0},53914:(e,i,n)=>{n.d(i,{A:()=>t});const t=n.p+"assets/images/select-and-rule-en-3a62f8cb06cf350e1f7e48daaa601978.png"},62926:(e,i,n)=>{n.d(i,{A:()=>t});const t=n.p+"assets/images/procedure-en-5b17e369f9d6c12d70118a29f5b7bd30.png"},78245:(e,i,n)=>{n.d(i,{A:()=>t});const t=n.p+"assets/images/rule-en-0b219597a708404400981a3a9d6a89c0.png"},83614:(e,i,n)=>{n.d(i,{A:()=>t});const t=n.p+"assets/images/selector-en-0b99d7a7e1ce0334e5dadc04ba8611c8.png"},88272:(e,i,n)=>{n.d(i,{A:()=>t});const t=n.p+"assets/images/enable-en-d6ddedc0d79f6f071df86d262a7cda03.png"},91747:(e,i,n)=>{n.d(i,{A:()=>t});const t=n.p+"assets/images/disable-en-8ae0fcbf271bbccd293931cc20f3dfa1.png"}}]);