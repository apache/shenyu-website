"use strict";(self.webpackChunkshenyu_website=self.webpackChunkshenyu_website||[]).push([[26179],{241:(e,t,r)=>{r.d(t,{A:()=>n});const n=r.p+"assets/images/postman-test-b5b6c0e96b73b282edc4afb328b01b10.png"},15680:(e,t,r)=>{r.d(t,{xA:()=>l,yg:()=>d});var n=r(96540);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function c(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var p=n.createContext({}),s=function(e){var t=n.useContext(p),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},l=function(e){var t=s(e.components);return n.createElement(p.Provider,{value:t},e.children)},u="mdxType",g={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,o=e.originalType,p=e.parentName,l=c(e,["components","mdxType","originalType","parentName"]),u=s(r),m=a,d=u["".concat(p,".").concat(m)]||u[m]||g[m]||o;return r?n.createElement(d,i(i({ref:t},l),{},{components:r})):n.createElement(d,i({ref:t},l))}));function d(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=r.length,i=new Array(o);i[0]=m;var c={};for(var p in t)hasOwnProperty.call(t,p)&&(c[p]=t[p]);c.originalType=e,c[u]="string"==typeof e?e:a,i[1]=c;for(var s=2;s<o;s++)i[s]=r[s];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}m.displayName="MDXCreateElement"},43360:(e,t,r)=>{r.r(t),r.d(t,{contentTitle:()=>i,default:()=>u,frontMatter:()=>o,metadata:()=>c,toc:()=>p});var n=r(58168),a=(r(96540),r(15680));const o={title:"Quick start with grpc",description:"Quick start with grpc"},i=void 0,c={unversionedId:"quick-start/quick-start-grpc",id:"version-2.3.0-Legacy/quick-start/quick-start-grpc",isDocsHomePage:!1,title:"Quick start with grpc",description:"Quick start with grpc",source:"@site/versioned_docs/version-2.3.0-Legacy/quick-start/quick-start-grpc.md",sourceDirName:"quick-start",slug:"/quick-start/quick-start-grpc",permalink:"/docs/2.3.0-Legacy/quick-start/quick-start-grpc",editUrl:"https://github.com/apache/shenyu-website/edit/main/versioned_docs/version-2.3.0-Legacy/quick-start/quick-start-grpc.md",version:"2.3.0-Legacy",frontMatter:{title:"Quick start with grpc",description:"Quick start with grpc"},sidebar:"version-2.3.0-Legacy/tutorialSidebar",previous:{title:"Quick start with Dubbo",permalink:"/docs/2.3.0-Legacy/quick-start/quick-start-dubbo"},next:{title:"Quick start with http",permalink:"/docs/2.3.0-Legacy/quick-start/quick-start-http"}},p=[{value:"Environment to prepare",id:"environment-to-prepare",children:[]},{value:"Run the soul-examples-grpc project",id:"run-the-soul-examples-grpc-project",children:[]},{value:"Grpc plugin settings",id:"grpc-plugin-settings",children:[]},{value:"Testing",id:"testing",children:[]}],s={toc:p},l="wrapper";function u(e){let{components:t,...o}=e;return(0,a.yg)(l,(0,n.A)({},s,o,{components:t,mdxType:"MDXLayout"}),(0,a.yg)("p",null,"This document introduces how to quickly access the Soul Gateway using Grpc. You can get the code example of this document by clicking ",(0,a.yg)("a",{parentName:"p",href:"https://github.com/dromara/soul/tree/2.3.0/soul-examples/soul-examples-grpc"},"here"),"."),(0,a.yg)("h2",{id:"environment-to-prepare"},"Environment to prepare"),(0,a.yg)("p",null,"Please refer to the ",(0,a.yg)("a",{parentName:"p",href:"../users-guide/soul-set-up"},"setup")," and launch ",(0,a.yg)("inlineCode",{parentName:"p"},"soul-admin")," and ",(0,a.yg)("inlineCode",{parentName:"p"},"soul-bootstrap"),"."),(0,a.yg)("p",null,"Note: ",(0,a.yg)("inlineCode",{parentName:"p"},"soul-bootstrap")," need to import grpc dependencies"),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-xml"},"<dependency>\n    <groupId>org.dromara</groupId>\n    <artifactId>soul-spring-boot-starter-plugin-grpc</artifactId>\n    <version>${project.version}</version>\n</dependency>\n")),(0,a.yg)("h2",{id:"run-the-soul-examples-grpc-project"},"Run the soul-examples-grpc project"),(0,a.yg)("p",null,"Download ",(0,a.yg)("a",{parentName:"p",href:"https://github.com/dromara/soul/tree/2.3.0/soul-examples/soul-examples-grpc"},"soul-examples-grpc")),(0,a.yg)("p",null,"Run the following command under ",(0,a.yg)("inlineCode",{parentName:"p"},"soul-examples-grpc")," to generate Java code"),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-shell"},"mvn protobuf:compile \nmvn protobuf:compile-custom \n")),(0,a.yg)("p",null,"Execute the ",(0,a.yg)("inlineCode",{parentName:"p"},"org.dromara.soul.examples.grpc.SoulTestGrpcApplication")," main method to start project."),(0,a.yg)("p",null,"The following log appears when the startup is successful:"),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-shell"},'2021-02-10 01:57:02.154  INFO 76 --- [           main] o.d.s.e.grpc.SoulTestGrpcApplication     : Started SoulTestGrpcApplication in 2.088 seconds (JVM running for 3.232)\n2021-02-10 01:57:02.380  INFO 76 --- [pool-1-thread-1] o.d.s.client.common.utils.RegisterUtils  : grpc client register success: {"appName":"127.0.0.1:8080","contextPath":"/grpc","path":"/grpc/echo","pathDesc":"","rpcType":"grpc","serviceName":"echo.EchoService","methodName":"echo","ruleName":"/grpc/echo","parameterTypes":"echo.EchoRequest,io.grpc.stub.StreamObserver","rpcExt":"{\\"timeout\\":-1}","enabled":true} \n')),(0,a.yg)("h2",{id:"grpc-plugin-settings"},"Grpc plugin settings"),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},"enabled the ",(0,a.yg)("inlineCode",{parentName:"li"},"grpc")," plugin in the ",(0,a.yg)("inlineCode",{parentName:"li"},"soul-admin")," plugin management.")),(0,a.yg)("h2",{id:"testing"},"Testing"),(0,a.yg)("p",null,"The ",(0,a.yg)("inlineCode",{parentName:"p"},"soul-examples-grpc")," project will automatically register interface methods annotated with ",(0,a.yg)("inlineCode",{parentName:"p"},"@SoulGrpcClient")," in the soul gateway after successful startup."),(0,a.yg)("p",null,"Open Plugin Management -> grpc to see the list of plugin rule configurations"),(0,a.yg)("p",null,(0,a.yg)("img",{src:r(75531).A})),(0,a.yg)("p",null,"Use PostMan to simulate HTTP to request your Grpc service"),(0,a.yg)("p",null,(0,a.yg)("img",{src:r(241).A})))}u.isMDXComponent=!0},75531:(e,t,r)=>{r.d(t,{A:()=>n});const n=r.p+"assets/images/rule-list-48c36ffede28b4e62bc36aa59baf44a6.png"}}]);