"use strict";(self.webpackChunkshenyu_website=self.webpackChunkshenyu_website||[]).push([[45244],{3905:(e,t,r)=>{r.d(t,{Zo:()=>l,kt:()=>d});var a=r(67294);function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function p(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function s(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?p(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):p(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function c(e,t){if(null==e)return{};var r,a,n=function(e,t){if(null==e)return{};var r,a,n={},p=Object.keys(e);for(a=0;a<p.length;a++)r=p[a],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var p=Object.getOwnPropertySymbols(e);for(a=0;a<p.length;a++)r=p[a],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var i=a.createContext({}),o=function(e){var t=a.useContext(i),r=t;return e&&(r="function"==typeof e?e(t):s(s({},t),e)),r},l=function(e){var t=o(e.components);return a.createElement(i.Provider,{value:t},e.children)},u="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},h=a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,p=e.originalType,i=e.parentName,l=c(e,["components","mdxType","originalType","parentName"]),u=o(r),h=n,d=u["".concat(i,".").concat(h)]||u[h]||m[h]||p;return r?a.createElement(d,s(s({ref:t},l),{},{components:r})):a.createElement(d,s({ref:t},l))}));function d(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var p=r.length,s=new Array(p);s[0]=h;var c={};for(var i in t)hasOwnProperty.call(t,i)&&(c[i]=t[i]);c.originalType=e,c[u]="string"==typeof e?e:n,s[1]=c;for(var o=2;o<p;o++)s[o]=r[o];return a.createElement.apply(null,s)}return a.createElement.apply(null,r)}h.displayName="MDXCreateElement"},19946:(e,t,r)=>{r.r(t),r.d(t,{contentTitle:()=>s,default:()=>u,frontMatter:()=>p,metadata:()=>c,toc:()=>i});var a=r(87462),n=(r(67294),r(3905));const p={title:"Quick start with Brpc",description:"Brpc quick start"},s=void 0,c={unversionedId:"quick-start/quick-start-brpc",id:"version-2.5.1/quick-start/quick-start-brpc",isDocsHomePage:!1,title:"Quick start with Brpc",description:"Brpc quick start",source:"@site/versioned_docs/version-2.5.1/quick-start/quick-start-brpc.md",sourceDirName:"quick-start",slug:"/quick-start/quick-start-brpc",permalink:"/docs/2.5.1/quick-start/quick-start-brpc",editUrl:"https://github.com/apache/shenyu-website/edit/main/versioned_docs/version-2.5.1/quick-start/quick-start-brpc.md",version:"2.5.1",frontMatter:{title:"Quick start with Brpc",description:"Brpc quick start"},sidebar:"version-2.5.1/tutorialSidebar",previous:{title:"Cluster Deployment",permalink:"/docs/2.5.1/deployment/deployment-cluster"},next:{title:"Quick start with Dubbo",permalink:"/docs/2.5.1/quick-start/quick-start-dubbo"}},i=[{value:"Environment to prepare",id:"environment-to-prepare",children:[]},{value:"Run the shenyu-examples-brpc project",id:"run-the-shenyu-examples-brpc-project",children:[]},{value:"Test",id:"test",children:[]}],o={toc:i},l="wrapper";function u(e){let{components:t,...p}=e;return(0,n.kt)(l,(0,a.Z)({},o,p,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("p",null,"This document introduces how to quickly access the Apache ShenYu gateway using Brpc. You can get the code example of this document by clicking ",(0,n.kt)("a",{parentName:"p",href:"https://github.com/apache/shenyu/tree/master/shenyu-examples/shenyu-examples-brpc"},"here"),"."),(0,n.kt)("h2",{id:"environment-to-prepare"},"Environment to prepare"),(0,n.kt)("p",null,"Please refer to the deployment to select a way to start shenyu-admin. For example, start the Apache ShenYu gateway management system through ",(0,n.kt)("a",{parentName:"p",href:"../deployment/deployment-local"},"local deployment")," ."),(0,n.kt)("p",null,"After successful startup, you need to open the Brpc plugin on in the BasicConfig ",(0,n.kt)("inlineCode",{parentName:"p"},"->")," Plugin."),(0,n.kt)("img",{src:"/img/shenyu/quick-start/brpc/brpc_open_en.png",width:"60%",height:"50%"}),(0,n.kt)("p",null,"If you are a startup gateway by means of source, can be directly run the ShenyuBootstrapApplication of shenyu-bootstrap module."),(0,n.kt)("blockquote",null,(0,n.kt)("p",{parentName:"blockquote"},"Note: Before starting, make sure the gateway has added dependencies.")),(0,n.kt)("p",null,"Import the gateway proxy plugin for ",(0,n.kt)("inlineCode",{parentName:"p"},"Brpc")," and add the following dependencies to the gateway's ",(0,n.kt)("inlineCode",{parentName:"p"},"pom.xml")," file:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-xml"},"        \x3c!-- apache shenyu brpc plugin --\x3e\n        <dependency>\n            <groupId>org.apache.shenyu</groupId>\n            <artifactId>shenyu-spring-boot-starter-plugin-brpc</artifactId>\n            <version>${project.version}</version>\n        </dependency>\n")),(0,n.kt)("h2",{id:"run-the-shenyu-examples-brpc-project"},"Run the shenyu-examples-brpc project"),(0,n.kt)("p",null,"Download ",(0,n.kt)("a",{parentName:"p",href:"https://github.com/apache/shenyu/tree/master/shenyu-examples/shenyu-examples-brpc"},"shenyu-examples-brpc"),"."),(0,n.kt)("p",null,"Run main method of ",(0,n.kt)("inlineCode",{parentName:"p"},"org.apache.shenyu.examples.brpc.service.TestBrpcApplication")," to start this project."),(0,n.kt)("p",null,"The following log appears when the startup is successful:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-shell"},'2023-01-11 23:09:37.593  INFO 96741 --- [or_consumer_-19] o.a.s.r.client.http.utils.RegisterUtils  : metadata client register success: {"appName":"brpc","contextPath":"/brpc","path":"/brpc/allName","rpcType":"brpc","serviceName":"org.apache.shenyu.examples.brpc.api.service.BrpcDemoService","methodName":"allName","ruleName":"/brpc/allName","rpcExt":"{\\"methodInfo\\":[{\\"methodName\\":\\"allName\\",\\"paramTypes\\":[]}]}","enabled":true,"host":"127.0.0.1","port":8005,"pluginNames":[],"registerMetaData":false,"timeMillis":1673449777487,"addPrefixed":false} \n2023-01-11 23:09:37.611  INFO 96741 --- [or_consumer_-21] o.a.s.r.client.http.utils.RegisterUtils  : metadata client register success: {"appName":"brpc","contextPath":"/brpc","path":"/brpc/userMap","rpcType":"brpc","serviceName":"org.apache.shenyu.examples.brpc.api.service.BrpcDemoService","methodName":"userMap","ruleName":"/brpc/userMap","parameterTypes":"java.lang.Long","rpcExt":"{\\"methodInfo\\":[{\\"methodName\\":\\"userMap\\",\\"paramTypes\\":[{\\"left\\":\\"java.lang.Long\\",\\"right\\":\\"userId\\"}]}]}","enabled":true,"host":"127.0.0.1","port":8005,"pluginNames":[],"registerMetaData":false,"timeMillis":1673449777488,"addPrefixed":false} \n2023-01-11 23:09:37.611  INFO 96741 --- [or_consumer_-17] o.a.s.r.client.http.utils.RegisterUtils  : uri client register success: {"appName":"brpc","contextPath":"/brpc","rpcType":"brpc","host":"127.0.0.1","port":8005} \n2023-01-11 23:09:37.612  INFO 96741 --- [or_consumer_-20] o.a.s.r.client.http.utils.RegisterUtils  : metadata client register success: {"appName":"brpc","contextPath":"/brpc","path":"/brpc/getUserByIdAndName","rpcType":"brpc","serviceName":"org.apache.shenyu.examples.brpc.api.service.BrpcDemoService","methodName":"getUserByIdAndName","ruleName":"/brpc/getUserByIdAndName","parameterTypes":"java.lang.Long,java.lang.String","rpcExt":"{\\"methodInfo\\":[{\\"methodName\\":\\"getUserByIdAndName\\",\\"paramTypes\\":[{\\"left\\":\\"java.lang.Long\\",\\"right\\":\\"userId\\"},{\\"left\\":\\"java.lang.String\\",\\"right\\":\\"name\\"}]}]}","enabled":true,"host":"127.0.0.1","port":8005,"pluginNames":[],"registerMetaData":false,"timeMillis":1673449777488,"addPrefixed":false} \n2023-01-11 23:09:37.611  INFO 96741 --- [or_consumer_-18] o.a.s.r.client.http.utils.RegisterUtils  : metadata client register success: {"appName":"brpc","contextPath":"/brpc","path":"/brpc/connect","rpcType":"brpc","serviceName":"org.apache.shenyu.examples.brpc.api.service.BrpcDemoService","methodName":"connect","ruleName":"/brpc/connect","rpcExt":"{\\"methodInfo\\":[{\\"methodName\\":\\"connect\\",\\"paramTypes\\":[]}]}","enabled":true,"host":"127.0.0.1","port":8005,"pluginNames":[],"registerMetaData":false,"timeMillis":1673449777486,"addPrefixed":false} \n2023-01-11 23:09:37.612  INFO 96741 --- [or_consumer_-22] o.a.s.r.client.http.utils.RegisterUtils  : metadata client register success: {"appName":"brpc","contextPath":"/brpc","path":"/brpc/getUser","rpcType":"brpc","serviceName":"org.apache.shenyu.examples.brpc.api.service.BrpcDemoService","methodName":"getUser","ruleName":"/brpc/getUser","parameterTypes":"java.lang.Long","rpcExt":"{\\"methodInfo\\":[{\\"methodName\\":\\"getUser\\",\\"paramTypes\\":[{\\"left\\":\\"java.lang.Long\\",\\"right\\":\\"userId\\"}]}]}","enabled":true,"host":"127.0.0.1","port":8005,"pluginNames":[],"registerMetaData":false,"timeMillis":1673449777489,"addPrefixed":false} \n\n')),(0,n.kt)("h2",{id:"test"},"Test"),(0,n.kt)("p",null,"The ",(0,n.kt)("inlineCode",{parentName:"p"},"shenyu-examples-brpc")," project will automatically register interface methods annotated with ",(0,n.kt)("inlineCode",{parentName:"p"},"@ShenyuBrpcClient")," in the Apache ShenYu gateway after successful startup."),(0,n.kt)("p",null,"Open PluginList -> rpc proxy -> brpc to see the list of plugin rule configurations:"),(0,n.kt)("img",{src:"/img/shenyu/quick-start/brpc/rule-list.png",width:"100%",height:"100%"}),(0,n.kt)("p",null,"Use IDEA HTTP Client Plugin to simulate HTTP to request your Brpc service","[Shenyu proxy]",":"),(0,n.kt)("p",null,(0,n.kt)("img",{src:r(87786).Z})))}u.isMDXComponent=!0},87786:(e,t,r)=>{r.d(t,{Z:()=>a});const a=r.p+"assets/images/idea-http-test-brpc-bfee0a99f617fc97c45f470f2b288265.png"}}]);