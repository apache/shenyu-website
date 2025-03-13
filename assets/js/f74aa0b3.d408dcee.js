"use strict";(self.webpackChunkshenyu_website=self.webpackChunkshenyu_website||[]).push([[43837],{15680:(e,t,n)=>{n.d(t,{xA:()=>c,yg:()=>d});var r=n(96540);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var p=r.createContext({}),l=function(e){var t=r.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},c=function(e){var t=l(e.components);return r.createElement(p.Provider,{value:t},e.children)},u="mdxType",g={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,p=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),u=l(n),m=a,d=u["".concat(p,".").concat(m)]||u[m]||g[m]||i;return n?r.createElement(d,o(o({ref:t},c),{},{components:n})):r.createElement(d,o({ref:t},c))}));function d(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,o=new Array(i);o[0]=m;var s={};for(var p in t)hasOwnProperty.call(t,p)&&(s[p]=t[p]);s.originalType=e,s[u]="string"==typeof e?e:a,o[1]=s;for(var l=2;l<i;l++)o[l]=n[l];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},19090:(e,t,n)=>{n.d(t,{A:()=>r});const r=n.p+"assets/images/rule-list-bb247d24aa2f5e009b4749dd447e9018.png"},20602:(e,t,n)=>{n.d(t,{A:()=>r});const r=n.p+"assets/images/postman-test-71e1f81f98f8a0547421fddce8ae259a.png"},84321:(e,t,n)=>{n.r(t),n.d(t,{contentTitle:()=>o,default:()=>u,frontMatter:()=>i,metadata:()=>s,toc:()=>p});var r=n(58168),a=(n(96540),n(15680));const i={title:"Quick start with Tars",description:"Quick start with Tars"},o=void 0,s={unversionedId:"quick-start/quick-start-tars",id:"version-2.4.2/quick-start/quick-start-tars",isDocsHomePage:!1,title:"Quick start with Tars",description:"Quick start with Tars",source:"@site/versioned_docs/version-2.4.2/quick-start/quick-start-tars.md",sourceDirName:"quick-start",slug:"/quick-start/quick-start-tars",permalink:"/docs/2.4.2/quick-start/quick-start-tars",editUrl:"https://github.com/apache/shenyu-website/edit/main/versioned_docs/version-2.4.2/quick-start/quick-start-tars.md",version:"2.4.2",frontMatter:{title:"Quick start with Tars",description:"Quick start with Tars"},sidebar:"version-2.4.2/tutorialSidebar",previous:{title:"Quick start with Spring Cloud",permalink:"/docs/2.4.2/quick-start/quick-start-springcloud"},next:{title:"Data Permission Management",permalink:"/docs/2.4.2/user-guide/admin-usage/data-permission"}},p=[{value:"Environment to prepare",id:"environment-to-prepare",children:[]},{value:"Run the shenyu-examples-tars project",id:"run-the-shenyu-examples-tars-project",children:[]},{value:"Test",id:"test",children:[]}],l={toc:p},c="wrapper";function u(e){let{components:t,...i}=e;return(0,a.yg)(c,(0,r.A)({},l,i,{components:t,mdxType:"MDXLayout"}),(0,a.yg)("p",null,"This document introduces how to quickly access the Apache ShenYu Gateway using Tars. You can get the code example of this document by clicking ",(0,a.yg)("a",{parentName:"p",href:"https://github.com/apache/shenyu/tree/v2.4.2/shenyu-examples/shenyu-examples-tars"},"here")," ."),(0,a.yg)("h2",{id:"environment-to-prepare"},"Environment to prepare"),(0,a.yg)("p",null,"Please refer to the deployment to select a way to start shenyu-admin. For example, start the Apache ShenYu gateway management system through ",(0,a.yg)("a",{parentName:"p",href:"../deployment/deployment-local"},"local deployment")," ."),(0,a.yg)("p",null,"After successful startup, you need to open the Sofa plugin on in the BasicConfig ",(0,a.yg)("inlineCode",{parentName:"p"},"->")," Plugin."),(0,a.yg)("img",{src:"/img/shenyu/quick-start/tars/tars_open_en.png",width:"60%",height:"50%"}),(0,a.yg)("p",null,"If you are a startup gateway by means of source, can be directly run the ShenyuBootstrapApplication of shenyu-bootstrap module."),(0,a.yg)("blockquote",null,(0,a.yg)("p",{parentName:"blockquote"},"Note: Before starting, make sure the gateway has added dependencies.")),(0,a.yg)("p",null,(0,a.yg)("inlineCode",{parentName:"p"},"shenyu-bootstrap")," need to import tars dependencies:"),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-xml"},"<dependency>\n    <groupId>org.apache.shenyu</groupId>\n    <artifactId>shenyu-spring-boot-starter-plugin-tars</artifactId>\n    <version>${project.version}</version>\n</dependency>\n\n<dependency>\n    <groupId>com.tencent.tars</groupId>\n    <artifactId>tars-client</artifactId>\n    <version>1.7.2</version>\n</dependency>\n")),(0,a.yg)("h2",{id:"run-the-shenyu-examples-tars-project"},"Run the shenyu-examples-tars project"),(0,a.yg)("p",null,"Download ",(0,a.yg)("a",{parentName:"p",href:"https://github.com/apache/shenyu/tree/v2.4.2/shenyu-examples/shenyu-examples-tars"},"shenyu-examples-tars")," ."),(0,a.yg)("p",null,"Modify ",(0,a.yg)("inlineCode",{parentName:"p"},"host")," in ",(0,a.yg)("inlineCode",{parentName:"p"},"application.yml")," to be your local IP"),(0,a.yg)("p",null,"Modify config ",(0,a.yg)("inlineCode",{parentName:"p"},"src/main/resources/ShenyuExampleServer.ShenyuExampleApp.config.conf"),":"),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},"It is recommended to make clear the meaning of the main configuration items of config, ",(0,a.yg)("a",{parentName:"li",href:"https://github.com/TarsCloud/TarsJava/blob/master/docs/tars_java_user_guide.md"},"refer to the development guide")),(0,a.yg)("li",{parentName:"ul"},"bind IP in config should pay attention to providing cost machine"),(0,a.yg)("li",{parentName:"ul"},"local=..., Indicates the open port that the native machine connects to the tarsnode. If there is no tarsnode, this configuration can be dropped"),(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("inlineCode",{parentName:"li"},"locator"),": Indicates the address (frame address) of the main control center, which is used to obtain the IP list according to the service name, If Registry is not required to locate the service, this configuration can be dropped"),(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("inlineCode",{parentName:"li"},"node=tars.tarsnode.ServerObj@xxxx"),", Indicates the address of the connected tarsnode. If there is no tarsnode locally, this configuration can be removed")),(0,a.yg)("p",null,"More config configuration instructions, Please refer to ",(0,a.yg)("a",{parentName:"p",href:"https://github.com/TarsCloud/TarsJava/blob/master/docs/tars_java_user_guide.md"},"TARS Official Documentation")),(0,a.yg)("p",null,"Execute the ",(0,a.yg)("inlineCode",{parentName:"p"},"org.apache.shenyu.examples.tars.ShenyuTestTarsApplication")," main method to start project."),(0,a.yg)("p",null,(0,a.yg)("strong",{parentName:"p"},"Note:")," The ",(0,a.yg)("inlineCode",{parentName:"p"},"configuration file address")," needs to be specified in the startup command when the service starts ",(0,a.yg)("strong",{parentName:"p"},"-Dconfig=xxx/ShenyuExampleServer.ShenyuExampleApp.config.conf")),(0,a.yg)("p",null,"If the ",(0,a.yg)("inlineCode",{parentName:"p"},"-Dconfig")," parameter is not added, the configuration may throw the following exceptions:"),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-xml"},"com.qq.tars.server.config.ConfigurationException: error occurred on load server config\n    at com.qq.tars.server.config.ConfigurationManager.loadServerConfig(ConfigurationManager.java:113)\n    at com.qq.tars.server.config.ConfigurationManager.init(ConfigurationManager.java:57)\n    at com.qq.tars.server.core.Server.loadServerConfig(Server.java:90)\n    at com.qq.tars.server.core.Server.<init>(Server.java:42)\n    at com.qq.tars.server.core.Server.<clinit>(Server.java:38)\n    at com.qq.tars.spring.bean.PropertiesListener.onApplicationEvent(PropertiesListener.java:37)\n    at com.qq.tars.spring.bean.PropertiesListener.onApplicationEvent(PropertiesListener.java:31)\n    at org.springframework.context.event.SimpleApplicationEventMulticaster.doInvokeListener(SimpleApplicationEventMulticaster.java:172)\n    at org.springframework.context.event.SimpleApplicationEventMulticaster.invokeListener(SimpleApplicationEventMulticaster.java:165)\n    at org.springframework.context.event.SimpleApplicationEventMulticaster.multicastEvent(SimpleApplicationEventMulticaster.java:139)\n    at org.springframework.context.event.SimpleApplicationEventMulticaster.multicastEvent(SimpleApplicationEventMulticaster.java:127)\n    at org.springframework.boot.context.event.EventPublishingRunListener.environmentPrepared(EventPublishingRunListener.java:76)\n    at org.springframework.boot.SpringApplicationRunListeners.environmentPrepared(SpringApplicationRunListeners.java:53)\n    at org.springframework.boot.SpringApplication.prepareEnvironment(SpringApplication.java:345)\n    at org.springframework.boot.SpringApplication.run(SpringApplication.java:308)\n    at org.springframework.boot.SpringApplication.run(SpringApplication.java:1226)\n    at org.springframework.boot.SpringApplication.run(SpringApplication.java:1215)\n    at org.apache.shenyu.examples.tars.ShenyuTestTarsApplication.main(ShenyuTestTarsApplication.java:38)\nCaused by: java.lang.NullPointerException\n    at java.io.FileInputStream.<init>(FileInputStream.java:130)\n    at java.io.FileInputStream.<init>(FileInputStream.java:93)\n    at com.qq.tars.common.util.Config.parseFile(Config.java:211)\n    at com.qq.tars.server.config.ConfigurationManager.loadServerConfig(ConfigurationManager.java:63)\n    ... 17 more\nThe exception occurred at load server config\n")),(0,a.yg)("p",null,"The following log appears when the startup is successful:"),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-shell"},'[SERVER] server starting at tcp -h 127.0.0.1 -p 21715 -t 60000...\n[SERVER] server started at tcp -h 127.0.0.1 -p 21715 -t 60000...\n[SERVER] server starting at tcp -h 127.0.0.1 -p 21714 -t 3000...\n[SERVER] server started at tcp -h 127.0.0.1 -p 21714 -t 3000...\n[SERVER] The application started successfully.\nThe session manager service started...\n[SERVER] server is ready...\n2021-02-09 13:28:24.643  INFO 16016 --- [           main] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat started on port(s): 55290 (http) with context path \'\'\n2021-02-09 13:28:24.645  INFO 16016 --- [           main] o.d.s.e.tars.ShenyuTestTarsApplication     : Started ShenyuTestTarsApplication in 4.232 seconds (JVM running for 5.1)\n2021-02-09 13:28:24.828  INFO 16016 --- [pool-2-thread-1] o.d.s.client.common.utils.RegisterUtils  : tars client register success: {"appName":"127.0.0.1:21715","contextPath":"/tars","path":"/tars/helloInt","pathDesc":"","rpcType":"tars","serviceName":"ShenyuExampleServer.ShenyuExampleApp.HelloObj","methodName":"helloInt","ruleName":"/tars/helloInt","parameterTypes":"int,java.lang.String","rpcExt":"{\\"methodInfo\\":[{\\"methodName\\":\\"helloInt\\",\\"params\\":[{},{}],\\"returnType\\":\\"java.lang.Integer\\"},{\\"methodName\\":\\"hello\\",\\"params\\":[{},{}],\\"returnType\\":\\"java.lang.String\\"}]}","enabled":true} \n2021-02-09 13:28:24.837  INFO 16016 --- [pool-2-thread-1] o.d.s.client.common.utils.RegisterUtils  : tars client register success: {"appName":"127.0.0.1:21715","contextPath":"/tars","path":"/tars/hello","pathDesc":"","rpcType":"tars","serviceName":"ShenyuExampleServer.ShenyuExampleApp.HelloObj","methodName":"hello","ruleName":"/tars/hello","parameterTypes":"int,java.lang.String","rpcExt":"{\\"methodInfo\\":[{\\"methodName\\":\\"helloInt\\",\\"params\\":[{},{}],\\"returnType\\":\\"java.lang.Integer\\"},{\\"methodName\\":\\"hello\\",\\"params\\":[{},{}],\\"returnType\\":\\"java.lang.String\\"}]}","enabled":true} \n')),(0,a.yg)("h2",{id:"test"},"Test"),(0,a.yg)("p",null,"The ",(0,a.yg)("inlineCode",{parentName:"p"},"shenyu-examples-tars")," project will automatically register interface methods annotated with ",(0,a.yg)("inlineCode",{parentName:"p"},"@ShenyuTarsClient")," in the Apache ShenYu gateway after successful startup."),(0,a.yg)("p",null,"Open PluginList -> rpc proxy -> tars to see the list of plugin rule configurations:"),(0,a.yg)("p",null,(0,a.yg)("img",{src:n(19090).A})),(0,a.yg)("p",null,"Use PostMan to simulate HTTP to request your tars service:"),(0,a.yg)("p",null,(0,a.yg)("img",{src:n(20602).A})))}u.isMDXComponent=!0}}]);