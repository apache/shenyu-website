"use strict";(self.webpackChunkshenyu_website=self.webpackChunkshenyu_website||[]).push([[41963],{15680:(e,t,n)=>{n.d(t,{xA:()=>d,yg:()=>m});var a=n(96540);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function g(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},l=Object.keys(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var o=a.createContext({}),p=function(e){var t=a.useContext(o),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},d=function(e){var t=p(e.components);return a.createElement(o.Provider,{value:t},e.children)},s="mdxType",y={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},c=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,l=e.originalType,o=e.parentName,d=g(e,["components","mdxType","originalType","parentName"]),s=p(n),c=r,m=s["".concat(o,".").concat(c)]||s[c]||y[c]||l;return n?a.createElement(m,i(i({ref:t},d),{},{components:n})):a.createElement(m,i({ref:t},d))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var l=n.length,i=new Array(l);i[0]=c;var g={};for(var o in t)hasOwnProperty.call(t,o)&&(g[o]=t[o]);g.originalType=e,g[s]="string"==typeof e?e:r,i[1]=g;for(var p=2;p<l;p++)i[p]=n[p];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}c.displayName="MDXCreateElement"},31462:(e,t,n)=>{n.r(t),n.d(t,{contentTitle:()=>i,default:()=>s,frontMatter:()=>l,metadata:()=>g,toc:()=>o});var a=n(58168),r=(n(96540),n(15680));const l={title:"Logging-Tencent-Cls Plugin",keywords:["Logging"],description:"logging plugin"},i="1. Overview",g={unversionedId:"plugin-center/observability/logging-tencent-cls",id:"version-2.6.1/plugin-center/observability/logging-tencent-cls",isDocsHomePage:!1,title:"Logging-Tencent-Cls Plugin",description:"logging plugin",source:"@site/versioned_docs/version-2.6.1/plugin-center/observability/logging-tencent-cls.md",sourceDirName:"plugin-center/observability",slug:"/plugin-center/observability/logging-tencent-cls",permalink:"/docs/2.6.1/plugin-center/observability/logging-tencent-cls",editUrl:"https://github.com/apache/shenyu-website/edit/main/versioned_docs/version-2.6.1/plugin-center/observability/logging-tencent-cls.md",version:"2.6.1",frontMatter:{title:"Logging-Tencent-Cls Plugin",keywords:["Logging"],description:"logging plugin"},sidebar:"version-2.6.0/tutorialSidebar",previous:{title:"Logging-RocketMQ Plugin",permalink:"/docs/2.6.1/plugin-center/observability/logging-rocketmq"},next:{title:"Metrics Plugin",permalink:"/docs/2.6.1/plugin-center/observability/metrics-plugin"}},o=[{value:"1.1 Plugin Name",id:"11-plugin-name",children:[]},{value:"1.2 Appropriate Scenario",id:"12-appropriate-scenario",children:[]},{value:"1.3 Plugin functionality",id:"13-plugin-functionality",children:[]},{value:"1.4 Plugin code",id:"14-plugin-code",children:[]},{value:"1.5 Added Since Which shenyu version",id:"15-added-since-which-shenyu-version",children:[]},{value:"2.1 Plugin-use procedure chart",id:"21-plugin-use-procedure-chart",children:[]},{value:"2.2 Import pom",id:"22-import-pom",children:[]},{value:"2.3 Enable plugin",id:"23-enable-plugin",children:[]},{value:"2.4 Config plugin",id:"24-config-plugin",children:[{value:"2.4.1 Plugin configuration",id:"241-plugin-configuration",children:[]},{value:"2.4.2 Configuration Selectors and Rules",id:"242-configuration-selectors-and-rules",children:[]}]},{value:"2.5 Logging Info",id:"25-logging-info",children:[]},{value:"2.6 Examples",id:"26-examples",children:[{value:"2.6.1 Collect Http Log by tencent cls platform",id:"261-collect-http-log-by-tencent-cls-platform",children:[]}]}],p={toc:o},d="wrapper";function s(e){let{components:t,...l}=e;return(0,r.yg)(d,(0,a.A)({},p,l,{components:t,mdxType:"MDXLayout"}),(0,r.yg)("h1",{id:"1-overview"},"1. Overview"),(0,r.yg)("h2",{id:"11-plugin-name"},"1.1 Plugin Name"),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},"Logging-TencentCls Plugin")),(0,r.yg)("h2",{id:"12-appropriate-scenario"},"1.2 Appropriate Scenario"),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},"collect http request information to tencent cls, analysis request information by tencent cls platform.")),(0,r.yg)("h2",{id:"13-plugin-functionality"},"1.3 Plugin functionality"),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},"The gateway receives requests from the client, forwards them to the server, and returns the server results to the client. The gateway can record the details of each request\uff0c"),(0,r.yg)("li",{parentName:"ul"},"the plugin records access logs and sends to tencent cls platform.")),(0,r.yg)("h2",{id:"14-plugin-code"},"1.4 Plugin code"),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("p",{parentName:"li"},"Core Module ",(0,r.yg)("inlineCode",{parentName:"p"},"shenyu-plugin-logging-tencent-cls"))),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("p",{parentName:"li"},"Core Class ",(0,r.yg)("inlineCode",{parentName:"p"},"org.apache.shenyu.plugin.tencent.cls.LoggingTencentClsPlugin"))),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("p",{parentName:"li"},"Core Class ",(0,r.yg)("inlineCode",{parentName:"p"},"org.apache.shenyu.plugin.tencent.cls.client.TencentClsLogCollectClient")))),(0,r.yg)("h2",{id:"15-added-since-which-shenyu-version"},"1.5 Added Since Which shenyu version"),(0,r.yg)("p",null,"ShenYu 2.5.1"),(0,r.yg)("h1",{id:"2-how-to-use-plugin"},"2. How to use plugin"),(0,r.yg)("h2",{id:"21-plugin-use-procedure-chart"},"2.1 Plugin-use procedure chart"),(0,r.yg)("p",null,(0,r.yg)("img",{src:n(86400).A})),(0,r.yg)("h2",{id:"22-import-pom"},"2.2 Import pom"),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},"import maven config in shenyu-bootstrap project's ",(0,r.yg)("inlineCode",{parentName:"li"},"pom.xml")," file.")),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-xml"},"\x3c!-- shenyu logging-tencent-cls plugin start --\x3e\n<dependency>\n  <groupId>org.apache.shenyu</groupId>\n  <artifactId>shenyu-spring-boot-starter-plugin-logging-tencent-cls</artifactId>\n  <version>${project.version}</version>\n</dependency>\n\x3c!-- shenyu logging-tencent-cls plugin end --\x3e\n")),(0,r.yg)("h2",{id:"23-enable-plugin"},"2.3 Enable plugin"),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},"In ",(0,r.yg)("inlineCode",{parentName:"li"},"shenyu-admin")," --\x3e BasicConfig --\x3e Plugin --\x3e ",(0,r.yg)("inlineCode",{parentName:"li"},"loggingTencentCls")," set Status enable.")),(0,r.yg)("h2",{id:"24-config-plugin"},"2.4 Config plugin"),(0,r.yg)("h3",{id:"241-plugin-configuration"},"2.4.1 Plugin configuration"),(0,r.yg)("p",null,(0,r.yg)("img",{src:n(75372).A})),(0,r.yg)("table",null,(0,r.yg)("thead",{parentName:"table"},(0,r.yg)("tr",{parentName:"thead"},(0,r.yg)("th",{parentName:"tr",align:"left"},"config-item"),(0,r.yg)("th",{parentName:"tr",align:"left"},"type"),(0,r.yg)("th",{parentName:"tr",align:"left"},"remarks"),(0,r.yg)("th",{parentName:"tr",align:"left"},"description"))),(0,r.yg)("tbody",{parentName:"table"},(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"left"},"secretId"),(0,r.yg)("td",{parentName:"tr",align:"left"},"String"),(0,r.yg)("td",{parentName:"tr",align:"left"},"must"),(0,r.yg)("td",{parentName:"tr",align:"left"},"secretId")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"left"},"secretKey"),(0,r.yg)("td",{parentName:"tr",align:"left"},"String"),(0,r.yg)("td",{parentName:"tr",align:"left"},"must"),(0,r.yg)("td",{parentName:"tr",align:"left"},"secretKey")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"left"},"endpoint"),(0,r.yg)("td",{parentName:"tr",align:"left"},"String"),(0,r.yg)("td",{parentName:"tr",align:"left"},"must"),(0,r.yg)("td",{parentName:"tr",align:"left"},"host name, example:ap-guangzhou.cls.tencentcs.com")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"left"},"topic"),(0,r.yg)("td",{parentName:"tr",align:"left"},"String"),(0,r.yg)("td",{parentName:"tr",align:"left"},"optional, default shenyu-topic"),(0,r.yg)("td",{parentName:"tr",align:"left"},"topic")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"left"},"sendThreadCount"),(0,r.yg)("td",{parentName:"tr",align:"left"},"String"),(0,r.yg)("td",{parentName:"tr",align:"left"},"optional, default 1"),(0,r.yg)("td",{parentName:"tr",align:"left"},"Number of core threads for log consumption callback")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"left"},"TotalSizeInBytes"),(0,r.yg)("td",{parentName:"tr",align:"left"},"Integer"),(0,r.yg)("td",{parentName:"tr",align:"left"},"optional, default 104857600"),(0,r.yg)("td",{parentName:"tr",align:"left"},"The maximum log size that the instance can cache")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"left"},"MaxSendThreadCount"),(0,r.yg)("td",{parentName:"tr",align:"left"},"Integer"),(0,r.yg)("td",{parentName:"tr",align:"left"},"optional, default 50"),(0,r.yg)("td",{parentName:"tr",align:"left"},'The maximum number of "goroutines" that the client can concurrently')),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"left"},"MaxBlockSec"),(0,r.yg)("td",{parentName:"tr",align:"left"},"Integer"),(0,r.yg)("td",{parentName:"tr",align:"left"},"optional, default 60000 ms"),(0,r.yg)("td",{parentName:"tr",align:"left"},"The maximum amount of time the caller can block on the send method if the client is running out of free space. ",(0,r.yg)("br",null)," If the required space cannot be satisfied after this time, ",(0,r.yg)("br",null),"the send method will throw a TimeoutException. Set this value to a negative number if you want the send method to block until the required space is met")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"left"},"MaxBatchSize"),(0,r.yg)("td",{parentName:"tr",align:"left"},"Integer"),(0,r.yg)("td",{parentName:"tr",align:"left"},"optional, default 512 * 1024 (512KB)"),(0,r.yg)("td",{parentName:"tr",align:"left"},"When the cached log size in a Batch is greater than or equal to batchSizeThresholdInBytes, the batch will be sent, and the maximum size can be set to 5MB")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"left"},"MaxBatchCount"),(0,r.yg)("td",{parentName:"tr",align:"left"},"Integer"),(0,r.yg)("td",{parentName:"tr",align:"left"},"optional, default 4096"),(0,r.yg)("td",{parentName:"tr",align:"left"},"When the number of logs cached in a batch is greater than or equal to batchCountThreshold, the batch will be sent and the maximum can be set to 40960")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"left"},"LingerMs"),(0,r.yg)("td",{parentName:"tr",align:"left"},"Integer"),(0,r.yg)("td",{parentName:"tr",align:"left"},"optional, default 2000 ms"),(0,r.yg)("td",{parentName:"tr",align:"left"},"The duration of the batch from the creation to the time it can be sent, the minimum can be set to 100 milliseconds")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"left"},"Retries"),(0,r.yg)("td",{parentName:"tr",align:"left"},"Integer"),(0,r.yg)("td",{parentName:"tr",align:"left"},"optional, default 10"),(0,r.yg)("td",{parentName:"tr",align:"left"},"If a Batch fails to be sent for the first time, the number of times it can be retried, if the retries is less than or equal to 0, the ProducerBatch will directly enter the failure queue after the first failure of sending")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"left"},"MaxReservedAttempts"),(0,r.yg)("td",{parentName:"tr",align:"left"},"Integer"),(0,r.yg)("td",{parentName:"tr",align:"left"},"optional, default 11"),(0,r.yg)("td",{parentName:"tr",align:"left"},"Each batch that is attempted to be sent corresponds to an Attemp. This parameter is used to control the number of attempts returned to the user. By default, only the latest 11 attempts are retained. A larger parameter allows you to trace more information, but also consumes more memory")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"left"},"BaseRetryBackoffMs"),(0,r.yg)("td",{parentName:"tr",align:"left"},"Integer"),(0,r.yg)("td",{parentName:"tr",align:"left"},"optional, default 100 ms"),(0,r.yg)("td",{parentName:"tr",align:"left"},"Backoff time for the first retry The client samples the exponential backoff algorithm, and the planned waiting time for the Nth retry is baseRetryBackoffMs * 2^(N-1")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"left"},"MaxRetryBackoffMs"),(0,r.yg)("td",{parentName:"tr",align:"left"},"Integer"),(0,r.yg)("td",{parentName:"tr",align:"left"},"optional, default 50 s"),(0,r.yg)("td",{parentName:"tr",align:"left"},"Maximum backoff time for retries")))),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},"get ",(0,r.yg)("inlineCode",{parentName:"li"},"topic"))),(0,r.yg)("p",null,(0,r.yg)("img",{src:n(48595).A})),(0,r.yg)("h3",{id:"242-configuration-selectors-and-rules"},"2.4.2 Configuration Selectors and Rules"),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},"Selector and rule Config. Please refer: ",(0,r.yg)("a",{parentName:"li",href:"/docs/2.6.1/user-guide/admin-usage/selector-and-rule"},"Selector and rule config"),".")),(0,r.yg)("h2",{id:"25-logging-info"},"2.5 Logging Info"),(0,r.yg)("p",null,"collect request info as follows"),(0,r.yg)("table",null,(0,r.yg)("thead",{parentName:"table"},(0,r.yg)("tr",{parentName:"thead"},(0,r.yg)("th",{parentName:"tr",align:"left"},"Field Name"),(0,r.yg)("th",{parentName:"tr",align:"center"},"Meaning"),(0,r.yg)("th",{parentName:"tr",align:"left"},"Description"),(0,r.yg)("th",{parentName:"tr",align:"left"},"Remarks"))),(0,r.yg)("tbody",{parentName:"table"},(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"left"},"clientIp"),(0,r.yg)("td",{parentName:"tr",align:"center"},"Client IP"),(0,r.yg)("td",{parentName:"tr",align:"left"}),(0,r.yg)("td",{parentName:"tr",align:"left"})),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"left"},"timeLocal"),(0,r.yg)("td",{parentName:"tr",align:"center"},"Request time string, format: yyyy-MM-dd HH:mm:ss.SSS"),(0,r.yg)("td",{parentName:"tr",align:"left"}),(0,r.yg)("td",{parentName:"tr",align:"left"})),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"left"},"method"),(0,r.yg)("td",{parentName:"tr",align:"center"},"request method (different rpc type is not the same, http class for: get, post wait, rpc class for the interface name)"),(0,r.yg)("td",{parentName:"tr",align:"left"}),(0,r.yg)("td",{parentName:"tr",align:"left"})),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"left"},"requestHeader"),(0,r.yg)("td",{parentName:"tr",align:"center"},"Request header (json format)"),(0,r.yg)("td",{parentName:"tr",align:"left"}),(0,r.yg)("td",{parentName:"tr",align:"left"})),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"left"},"responseHeader"),(0,r.yg)("td",{parentName:"tr",align:"center"},"Response header (json format)"),(0,r.yg)("td",{parentName:"tr",align:"left"}),(0,r.yg)("td",{parentName:"tr",align:"left"})),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"left"},"queryParams"),(0,r.yg)("td",{parentName:"tr",align:"center"},"Request query parameters"),(0,r.yg)("td",{parentName:"tr",align:"left"}),(0,r.yg)("td",{parentName:"tr",align:"left"})),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"left"},"requestBody"),(0,r.yg)("td",{parentName:"tr",align:"center"},"Request Body (body of binary type will not be captured)"),(0,r.yg)("td",{parentName:"tr",align:"left"}),(0,r.yg)("td",{parentName:"tr",align:"left"})),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"left"},"requestUri"),(0,r.yg)("td",{parentName:"tr",align:"center"},"Request uri"),(0,r.yg)("td",{parentName:"tr",align:"left"}),(0,r.yg)("td",{parentName:"tr",align:"left"})),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"left"},"responseBody"),(0,r.yg)("td",{parentName:"tr",align:"center"},"Response body"),(0,r.yg)("td",{parentName:"tr",align:"left"}),(0,r.yg)("td",{parentName:"tr",align:"left"})),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"left"},"responseContentLength"),(0,r.yg)("td",{parentName:"tr",align:"center"},"Response body size"),(0,r.yg)("td",{parentName:"tr",align:"left"}),(0,r.yg)("td",{parentName:"tr",align:"left"})),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"left"},"rpcType"),(0,r.yg)("td",{parentName:"tr",align:"center"},"rpc type"),(0,r.yg)("td",{parentName:"tr",align:"left"}),(0,r.yg)("td",{parentName:"tr",align:"left"})),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"left"},"status"),(0,r.yg)("td",{parentName:"tr",align:"center"},"response status"),(0,r.yg)("td",{parentName:"tr",align:"left"}),(0,r.yg)("td",{parentName:"tr",align:"left"})),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"left"},"upstreamIp"),(0,r.yg)("td",{parentName:"tr",align:"center"},"Upstream (program providing the service) IP"),(0,r.yg)("td",{parentName:"tr",align:"left"}),(0,r.yg)("td",{parentName:"tr",align:"left"})),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"left"},"upstreamResponseTime"),(0,r.yg)("td",{parentName:"tr",align:"center"},"Time taken by the upstream (program providing the service) to respond to the request (ms ms)"),(0,r.yg)("td",{parentName:"tr",align:"left"}),(0,r.yg)("td",{parentName:"tr",align:"left"})),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"left"},"userAgent"),(0,r.yg)("td",{parentName:"tr",align:"center"},"Requested user agent"),(0,r.yg)("td",{parentName:"tr",align:"left"}),(0,r.yg)("td",{parentName:"tr",align:"left"})),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"left"},"host"),(0,r.yg)("td",{parentName:"tr",align:"center"},"The requested host"),(0,r.yg)("td",{parentName:"tr",align:"left"}),(0,r.yg)("td",{parentName:"tr",align:"left"})),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"left"},"module"),(0,r.yg)("td",{parentName:"tr",align:"center"},"Requested modules"),(0,r.yg)("td",{parentName:"tr",align:"left"}),(0,r.yg)("td",{parentName:"tr",align:"left"})),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"left"},"path"),(0,r.yg)("td",{parentName:"tr",align:"center"},"The requested path"),(0,r.yg)("td",{parentName:"tr",align:"left"}),(0,r.yg)("td",{parentName:"tr",align:"left"})),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"left"},"traceId"),(0,r.yg)("td",{parentName:"tr",align:"center"},"Requested Link Tracking ID"),(0,r.yg)("td",{parentName:"tr",align:"left"},"Need to access link tracking plugins, such as skywalking,zipkin"),(0,r.yg)("td",{parentName:"tr",align:"left"})))),(0,r.yg)("h2",{id:"26-examples"},"2.6 Examples"),(0,r.yg)("h3",{id:"261-collect-http-log-by-tencent-cls-platform"},"2.6.1 Collect Http Log by tencent cls platform"),(0,r.yg)("h4",{id:"2611-plugin-configuration"},"2.6.1.1 Plugin Configuration"),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},"Open the plugin and configure tencent-cls, configure it as follows.")),(0,r.yg)("p",null,(0,r.yg)("img",{src:n(75372).A})),(0,r.yg)("h4",{id:"2612-selector-configuration"},"2.6.1.2 Selector Configuration"),(0,r.yg)("p",null,(0,r.yg)("img",{src:n(58765).A})),(0,r.yg)("h4",{id:"2613-rule-configuration"},"2.6.1.3 Rule Configuration"),(0,r.yg)("p",null,(0,r.yg)("img",{src:n(87274).A})),(0,r.yg)("h4",{id:"2614-send-request"},"2.6.1.4 Send Request"),(0,r.yg)("p",null,(0,r.yg)("img",{src:n(7522).A})),(0,r.yg)("h4",{id:"2615-tencent-cls-platform-display"},"2.6.1.5 Tencent cls Platform Display"),(0,r.yg)("p",null,(0,r.yg)("img",{src:n(9127).A})),(0,r.yg)("h1",{id:"3-how-to-disable-plugin"},"3. How to disable plugin"),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},"In ",(0,r.yg)("inlineCode",{parentName:"li"},"shenyu-admin")," --\x3e BasicConfig --\x3e Plugin --\x3e ",(0,r.yg)("inlineCode",{parentName:"li"},"loggingTencentCls")," set Status disable.")))}s.isMDXComponent=!0},7522:(e,t,n)=>{n.d(t,{A:()=>a});const a=n.p+"assets/images/call-service-82c34bd837e86ae6d808a8f86dbd2a50.png"},75372:(e,t,n)=>{n.d(t,{A:()=>a});const a=n.p+"assets/images/plugin-config-en-50ccf87d6faa6f3c48d1de0c4d44c2ac.jpg"},87274:(e,t,n)=>{n.d(t,{A:()=>a});const a=n.p+"assets/images/tencent-cls-log-rule-en-58a0d8e2101b2317e7bf900d4ec38d75.png"},58765:(e,t,n)=>{n.d(t,{A:()=>a});const a=n.p+"assets/images/tencent-cls-log-selector-en-baf341acf4576d2c99465243260b22fa.png"},9127:(e,t,n)=>{n.d(t,{A:()=>a});const a=n.p+"assets/images/tencent-cls-log-e9fa8f8a850ad5ea6bde2cb42d8fa125.jpg"},48595:(e,t,n)=>{n.d(t,{A:()=>a});const a=n.p+"assets/images/tencent-topic-2d1def01f076253ff3d13b62a1858cde.png"},86400:(e,t,n)=>{n.d(t,{A:()=>a});const a=n.p+"assets/images/plugin_use_en-8b5661551cdf92fdabc9cb2e7947cffc.jpg"}}]);