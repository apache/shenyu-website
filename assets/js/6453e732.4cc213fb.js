"use strict";(self.webpackChunkshenyu_website=self.webpackChunkshenyu_website||[]).push([[24170],{15680:(e,n,t)=>{t.d(n,{xA:()=>p,yg:()=>g});var r=t(96540);function o(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function a(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function i(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?a(Object(t),!0).forEach((function(n){o(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):a(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function s(e,n){if(null==e)return{};var t,r,o=function(e,n){if(null==e)return{};var t,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)t=a[r],n.indexOf(t)>=0||(o[t]=e[t]);return o}(e,n);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)t=a[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var c=r.createContext({}),l=function(e){var n=r.useContext(c),t=n;return e&&(t="function"==typeof e?e(n):i(i({},n),e)),t},p=function(e){var n=l(e.components);return r.createElement(c.Provider,{value:n},e.children)},u="mdxType",y={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},d=r.forwardRef((function(e,n){var t=e.components,o=e.mdxType,a=e.originalType,c=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),u=l(t),d=o,g=u["".concat(c,".").concat(d)]||u[d]||y[d]||a;return t?r.createElement(g,i(i({ref:n},p),{},{components:t})):r.createElement(g,i({ref:n},p))}));function g(e,n){var t=arguments,o=n&&n.mdxType;if("string"==typeof e||o){var a=t.length,i=new Array(a);i[0]=d;var s={};for(var c in n)hasOwnProperty.call(n,c)&&(s[c]=n[c]);s.originalType=e,s[u]="string"==typeof e?e:o,i[1]=s;for(var l=2;l<a;l++)i[l]=t[l];return r.createElement.apply(null,i)}return r.createElement.apply(null,t)}d.displayName="MDXCreateElement"},91650:(e,n,t)=>{t.r(n),t.d(n,{contentTitle:()=>i,default:()=>u,frontMatter:()=>a,metadata:()=>s,toc:()=>c});var r=t(58168),o=(t(96540),t(15680));const a={title:"Websocket Proxy",description:"Websocket Proxy"},i=void 0,s={unversionedId:"user-guide/proxy/websocket-proxy",id:"version-2.6.1/user-guide/proxy/websocket-proxy",isDocsHomePage:!1,title:"Websocket Proxy",description:"Websocket Proxy",source:"@site/versioned_docs/version-2.6.1/user-guide/proxy/websocket-proxy.md",sourceDirName:"user-guide/proxy",slug:"/user-guide/proxy/websocket-proxy",permalink:"/docs/2.6.1/user-guide/proxy/websocket-proxy",editUrl:"https://github.com/apache/shenyu-website/edit/main/versioned_docs/version-2.6.1/user-guide/proxy/websocket-proxy.md",version:"2.6.1",frontMatter:{title:"Websocket Proxy",description:"Websocket Proxy"},sidebar:"version-2.6.0/tutorialSidebar",previous:{title:"Tars Proxy",permalink:"/docs/2.6.1/user-guide/proxy/tars-proxy"},next:{title:"Build And Deploy Kubernetes Controller",permalink:"/docs/2.6.1/user-guide/kubernetes-controller/build-deploy"}},c=[{value:"Add Websocket plugin in gateway",id:"add-websocket-plugin-in-gateway",children:[]},{value:"Websocket service access gateway",id:"websocket-service-access-gateway",children:[]},{value:"User Request",id:"user-request",children:[]}],l={toc:c},p="wrapper";function u(e){let{components:n,...t}=e;return(0,o.yg)(p,(0,r.A)({},l,t,{components:n,mdxType:"MDXLayout"}),(0,o.yg)("p",null,"This document is intended to help the ",(0,o.yg)("inlineCode",{parentName:"p"},"Websocket")," service access the ",(0,o.yg)("inlineCode",{parentName:"p"},"Apache ShenYu")," gateway. The ",(0,o.yg)("inlineCode",{parentName:"p"},"Apache ShenYu")," gateway uses the ",(0,o.yg)("inlineCode",{parentName:"p"},"Websocket")," plugin to handle ",(0,o.yg)("inlineCode",{parentName:"p"},"Websocket")," service."),(0,o.yg)("p",null,"Before the connection, start ",(0,o.yg)("inlineCode",{parentName:"p"},"shenyu-admin")," correctly, start ",(0,o.yg)("inlineCode",{parentName:"p"},"Websocket")," plugin, and add related dependencies on the gateway and ",(0,o.yg)("inlineCode",{parentName:"p"},"Websocket")," application client. Refer to the previous ",(0,o.yg)("a",{parentName:"p",href:"../../quick-start/quick-start-websocket"},"Quick start with Websocket")," ."),(0,o.yg)("p",null,"For details about client access configuration, see ",(0,o.yg)("a",{parentName:"p",href:"/docs/2.6.1/user-guide/property-config/register-center-access"},"Application Client Access Config")," ."),(0,o.yg)("p",null,"For details about data synchronization configurations, see ",(0,o.yg)("a",{parentName:"p",href:"/docs/2.6.1/user-guide/property-config/use-data-sync"},"Data Synchronization Config"),")."),(0,o.yg)("h2",{id:"add-websocket-plugin-in-gateway"},"Add Websocket plugin in gateway"),(0,o.yg)("p",null,"Add the following dependencies to the gateway's ",(0,o.yg)("inlineCode",{parentName:"p"},"pom.xml")," file , which is introduced by default\uff1a"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-xml"},"        \x3c!--shenyu websocket plugin start--\x3e\n        <dependency>\n            <groupId>org.apache.shenyu</groupId>\n            <artifactId>shenyu-spring-boot-starter-plugin-websocket</artifactId>\n            <version>${project.version}</version>\n        </dependency>\n")),(0,o.yg)("ul",null,(0,o.yg)("li",{parentName:"ul"},"Restart your gateway service.")),(0,o.yg)("h2",{id:"websocket-service-access-gateway"},"Websocket service access gateway"),(0,o.yg)("blockquote",null,(0,o.yg)("p",{parentName:"blockquote"},"Please refer to\uff1a ",(0,o.yg)("a",{parentName:"p",href:"https://github.com/apache/shenyu/tree/master/shenyu-examples/shenyu-examples-websocket"},"shenyu-examples-websocket"),", Contains examples of the three implementations of  ",(0,o.yg)("inlineCode",{parentName:"p"},"annotation websocket"),"\u3001",(0,o.yg)("inlineCode",{parentName:"p"},"spring native websocket"),"\u3001",(0,o.yg)("inlineCode",{parentName:"p"},"spring reactive websocket"))),(0,o.yg)("ol",null,(0,o.yg)("li",{parentName:"ol"},"In the ",(0,o.yg)("inlineCode",{parentName:"li"},"Websocket")," service, add the following dependencies:")),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-xml"},"        <dependency>\n            <groupId>org.apache.shenyu</groupId>\n            <artifactId>shenyu-spring-boot-starter-client-websocket</artifactId>\n            <version>${shenyu.version}</version>\n        </dependency>\n")),(0,o.yg)("ol",{start:2},(0,o.yg)("li",{parentName:"ol"},"Add the following configuration to the ",(0,o.yg)("inlineCode",{parentName:"li"},"application.yaml")," configuration file:")),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-yaml"},"shenyu:\n  register:\n    registerType: http\n    serverLists: http://localhost:9095 # shenyu-admin ip and port\n    props:\n      username: admin\n      password: 123456\n  client:\n    websocket:\n      props:\n        contextPath: /ws-annotation\n        appName: ws-annotation\n        port: 8001 # need to be consistent with the service port\n")),(0,o.yg)("ol",{start:3},(0,o.yg)("li",{parentName:"ol"},"Add ",(0,o.yg)("inlineCode",{parentName:"li"},"@ShenyuSpringWebSocketClient")," annotation to the ",(0,o.yg)("inlineCode",{parentName:"li"},"Websocket")," service interface implementation class, start your service and after successful registration, go to ",(0,o.yg)("inlineCode",{parentName:"li"},"Client List -> Proxy -> Websocket")," in the ",(0,o.yg)("inlineCode",{parentName:"li"},"shenyu-admin")," management system and you will see the auto-registered selector and rule information.")),(0,o.yg)("p",null,"\u793a\u4f8b\uff1a"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-java"},'@ShenyuSpringWebSocketClient("/myWs")\n@ServerEndpoint("/myWs")\npublic class WsServerEndpoint {\n    @OnOpen\n    public void onOpen(final Session session) {\n        LOG.info("connect successful");\n    }\n\n    @OnClose\n    public void onClose(final Session session) {\n        LOG.info("connect closed");\n    }\n\n    @OnMessage\n    public String onMsg(final String text) {\n        return "server send message\uff1a" + text;\n    }\n}\n')),(0,o.yg)("h2",{id:"user-request"},"User Request"),(0,o.yg)("p",null,"You need to request your ",(0,o.yg)("inlineCode",{parentName:"p"},"Websocket")," service via the ",(0,o.yg)("inlineCode",{parentName:"p"},"ws")," protocol. The ",(0,o.yg)("inlineCode",{parentName:"p"},"Apache ShenYu")," gateway will configure a routing prefix which is the ",(0,o.yg)("inlineCode",{parentName:"p"},"contextPath")," in the access gateway configuration file. For example: ",(0,o.yg)("inlineCode",{parentName:"p"},"ws://localhost:9195/ws-annotation/myWs"),", after which you can establish a connection to send and receive messages normally."))}u.isMDXComponent=!0}}]);