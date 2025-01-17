"use strict";(self.webpackChunkshenyu_website=self.webpackChunkshenyu_website||[]).push([[4159],{15680:(e,n,t)=>{t.d(n,{xA:()=>u,yg:()=>m});var i=t(96540);function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function o(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);n&&(i=i.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,i)}return t}function r(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?o(Object(t),!0).forEach((function(n){a(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function l(e,n){if(null==e)return{};var t,i,a=function(e,n){if(null==e)return{};var t,i,a={},o=Object.keys(e);for(i=0;i<o.length;i++)t=o[i],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(i=0;i<o.length;i++)t=o[i],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var s=i.createContext({}),c=function(e){var n=i.useContext(s),t=n;return e&&(t="function"==typeof e?e(n):r(r({},n),e)),t},u=function(e){var n=c(e.components);return i.createElement(s.Provider,{value:n},e.children)},g="mdxType",p={inlineCode:"code",wrapper:function(e){var n=e.children;return i.createElement(i.Fragment,{},n)}},d=i.forwardRef((function(e,n){var t=e.components,a=e.mdxType,o=e.originalType,s=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),g=c(t),d=a,m=g["".concat(s,".").concat(d)]||g[d]||p[d]||o;return t?i.createElement(m,r(r({ref:n},u),{},{components:t})):i.createElement(m,r({ref:n},u))}));function m(e,n){var t=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var o=t.length,r=new Array(o);r[0]=d;var l={};for(var s in n)hasOwnProperty.call(n,s)&&(l[s]=n[s]);l.originalType=e,l[g]="string"==typeof e?e:a,r[1]=l;for(var c=2;c<o;c++)r[c]=t[c];return i.createElement.apply(null,r)}return i.createElement.apply(null,t)}d.displayName="MDXCreateElement"},3070:(e,n,t)=>{t.r(n),t.d(n,{contentTitle:()=>r,default:()=>g,frontMatter:()=>o,metadata:()=>l,toc:()=>s});var i=t(58168),a=(t(96540),t(15680));const o={title:"Websocket Plugin",keywords:["Websocket"],description:"Websocket Plugin"},r="1. Overview",l={unversionedId:"plugin-center/proxy/websocket-plugin",id:"version-2.6.1/plugin-center/proxy/websocket-plugin",isDocsHomePage:!1,title:"Websocket Plugin",description:"Websocket Plugin",source:"@site/versioned_docs/version-2.6.1/plugin-center/proxy/websocket-plugin.md",sourceDirName:"plugin-center/proxy",slug:"/plugin-center/proxy/websocket-plugin",permalink:"/docs/2.6.1/plugin-center/proxy/websocket-plugin",editUrl:"https://github.com/apache/shenyu-website/edit/main/versioned_docs/version-2.6.1/plugin-center/proxy/websocket-plugin.md",version:"2.6.1",frontMatter:{title:"Websocket Plugin",keywords:["Websocket"],description:"Websocket Plugin"},sidebar:"version-2.6.0/tutorialSidebar",previous:{title:"Tcp Plugin",permalink:"/docs/2.6.1/plugin-center/proxy/tcp-plugin"},next:{title:"Hystrix Plugin",permalink:"/docs/2.6.1/plugin-center/fault-tolerance/hystrix-plugin"}},s=[{value:"1.1 Plugin Name",id:"11-plugin-name",children:[]},{value:"1.2 Appropriate Scenario",id:"12-appropriate-scenario",children:[]},{value:"1.3 Plugin functionality",id:"13-plugin-functionality",children:[]},{value:"1.4 Plugin code",id:"14-plugin-code",children:[]},{value:"1.5 Added Since Which shenyu version",id:"15-added-since-which-shenyu-version",children:[]},{value:"2.1 Plugin-use procedure chart",id:"21-plugin-use-procedure-chart",children:[]},{value:"2.2 Enable plugin",id:"22-enable-plugin",children:[]},{value:"2.3 Client Services configuration",id:"23-client-services-configuration",children:[{value:"2.3.1 Manual configuration",id:"231-manual-configuration",children:[]},{value:"2.3.2 Automatic configuration",id:"232-automatic-configuration",children:[]}]},{value:"2.4 Config plugin",id:"24-config-plugin",children:[{value:"2.4.1 Configure access parameters in the configuration file in the client service",id:"241-configure-access-parameters-in-the-configuration-file-in-the-client-service",children:[]},{value:"2.4.2 Configure the websocket plugin&#39;s selector and rule information in shenyu-admin",id:"242-configure-the-websocket-plugins-selector-and-rule-information-in-shenyu-admin",children:[]}]},{value:"2.5 \u793a\u4f8b",id:"25-\u793a\u4f8b",children:[{value:"2.5.1 Spring Annotation Websocket Example",id:"251-spring-annotation-websocket-example",children:[]},{value:"2.5.2 Spring Native Websocket Example",id:"252-spring-native-websocket-example",children:[]},{value:"2.5.3 Spring Reactive Websocket Example",id:"253-spring-reactive-websocket-example",children:[]}]},{value:"5.1 websocket debugging code",id:"51-websocket-debugging-code",children:[]}],c={toc:s},u="wrapper";function g(e){let{components:n,...o}=e;return(0,a.yg)(u,(0,i.A)({},c,o,{components:n,mdxType:"MDXLayout"}),(0,a.yg)("h1",{id:"1-overview"},"1. Overview"),(0,a.yg)("h2",{id:"11-plugin-name"},"1.1 Plugin Name"),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},"Websocket Plugin.")),(0,a.yg)("h2",{id:"12-appropriate-scenario"},"1.2 Appropriate Scenario"),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},"Forwarding scenarios, processing websocket protocol requests and forwarding them to other websocket protocol services on the backend."),(0,a.yg)("li",{parentName:"ul"},"Service Load Balancing.")),(0,a.yg)("h2",{id:"13-plugin-functionality"},"1.3 Plugin functionality"),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},"Support traffic management based on host, uri, query and other request information."),(0,a.yg)("li",{parentName:"ul"},"Supports setting load balancing policies for requests and also supports service warm-up, currently supports three policies: ip hash (consistent hashing with virtual nodes), round-robbin (weighted polling), random (weighted random)."),(0,a.yg)("li",{parentName:"ul"},"Support setting interface level request timeout time."),(0,a.yg)("li",{parentName:"ul"},"Support setting the number of timeout retries.")),(0,a.yg)("h2",{id:"14-plugin-code"},"1.4 Plugin code"),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},"Core Module ",(0,a.yg)("inlineCode",{parentName:"li"},"shenyu-plugin-websocket"),"."),(0,a.yg)("li",{parentName:"ul"},"Core Class ",(0,a.yg)("inlineCode",{parentName:"li"},"org.apache.shenyu.plugin.websocket.WebSocketPlugin"),".")),(0,a.yg)("h2",{id:"15-added-since-which-shenyu-version"},"1.5 Added Since Which shenyu version"),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},"2.4.3")),(0,a.yg)("h1",{id:"2-how-to-use-plugin"},"2. How to use plugin"),(0,a.yg)("h2",{id:"21-plugin-use-procedure-chart"},"2.1 Plugin-use procedure chart"),(0,a.yg)("p",null,(0,a.yg)("img",{alt:"image-20220726223545558",src:t(58993).A})),(0,a.yg)("p",null,(0,a.yg)("strong",{parentName:"p"},"Explanation of terms")),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},"Shenyu gateway service\uff1aInclude shenyu-admin and shenyu-bootstrap services."),(0,a.yg)("li",{parentName:"ul"},"Client services\uff1aReal backend websocket service.")),(0,a.yg)("p",null,(0,a.yg)("strong",{parentName:"p"},"Explanation of the process")),(0,a.yg)("ol",null,(0,a.yg)("li",{parentName:"ol"},"Start shenyu gateway service: Refer to the deployment, start shenyu-admin and shenyu-bootstrap to make sure shenyu gateway service is normal."),(0,a.yg)("li",{parentName:"ol"},"Enable the websocket plugin in shenyu-admin: Turn on the websocket plugin in the shenyu-admin plugin management page."),(0,a.yg)("li",{parentName:"ol"},"Configure and start the client service: start the client project (real websocket service on the back end) and configure the service information into the shenyu gateway, in two ways: manual configuration and automatic configuration."),(0,a.yg)("li",{parentName:"ol"},"Check if forwarding is normal: Check if forwarding is successful.")),(0,a.yg)("h2",{id:"22-enable-plugin"},"2.2 Enable plugin"),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},"In shenyu-admin --\x3e BasicConfig --\x3e Plugin --\x3e websocket is set to on.")),(0,a.yg)("p",null,(0,a.yg)("img",{alt:"image-20220726224444058",src:t(97292).A})),(0,a.yg)("h2",{id:"23-client-services-configuration"},"2.3 Client Services configuration"),(0,a.yg)("h3",{id:"231-manual-configuration"},"2.3.1 Manual configuration"),(0,a.yg)("blockquote",null,(0,a.yg)("p",{parentName:"blockquote"},"Manually configure the client service on the shenyu-admin page, and the backend service will implement the websocket protocol forwarding without any changes.")),(0,a.yg)("ol",null,(0,a.yg)("li",{parentName:"ol"},"Adding selectors to the websocket plugin.")),(0,a.yg)("p",null,(0,a.yg)("img",{alt:"image-20220726225217950",src:t(16170).A})),(0,a.yg)("ol",{start:2},(0,a.yg)("li",{parentName:"ol"},"Add rules to the websocket plugin.")),(0,a.yg)("p",null,(0,a.yg)("img",{alt:"image-20220726225315550",src:t(73481).A})),(0,a.yg)("ol",{start:3},(0,a.yg)("li",{parentName:"ol"},(0,a.yg)("p",{parentName:"li"},"Start the client service (backend websocket service).")),(0,a.yg)("li",{parentName:"ol"},(0,a.yg)("p",{parentName:"li"},"Test the success of service forwarding."))),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},"See Annex 5.1 for the test code.")),(0,a.yg)("p",null,(0,a.yg)("img",{alt:"image-20220726222003131",src:t(80551).A})),(0,a.yg)("h3",{id:"232-automatic-configuration"},"2.3.2 Automatic configuration"),(0,a.yg)("blockquote",null,(0,a.yg)("p",{parentName:"blockquote"},"If there are scenarios where you need to automate configuration to reduce workload, you can add annotations to the backend service to automate the configuration of the service to the shenyu gateway.")),(0,a.yg)("ol",null,(0,a.yg)("li",{parentName:"ol"},"Add the plugin maven configuration to the pom.xml file in the backend service project.")),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-xml"},"  <dependency>\n      <groupId>org.apache.shenyu</groupId>\n        <artifactId>shenyu-spring-boot-starter-plugin-websocket</artifactId>\n      <version>${project.version}</version>\n  </dependency>\n")),(0,a.yg)("ol",{start:2},(0,a.yg)("li",{parentName:"ol"},"Use the ",(0,a.yg)("inlineCode",{parentName:"li"},"@ShenyuSpringWebSocketClient")," annotation, which will automatically register the websocket service to the shenyu gateway."),(0,a.yg)("li",{parentName:"ol"},"Adjust the plugin configuration, see 2.4.1 for details of the configuration parameters."),(0,a.yg)("li",{parentName:"ol"},"Start the client project (the backend `websocket service), see 2.5 for sample code."),(0,a.yg)("li",{parentName:"ol"},"Check whether the PluginList service registration information in the shenyu-admin page is registered successfully."),(0,a.yg)("li",{parentName:"ol"},"Test the success of service forwarding.")),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},"See Annex 5.1 for the test code.")),(0,a.yg)("p",null,(0,a.yg)("img",{alt:"image-20220726221945414",src:t(80551).A})),(0,a.yg)("h2",{id:"24-config-plugin"},"2.4 Config plugin"),(0,a.yg)("h3",{id:"241-configure-access-parameters-in-the-configuration-file-in-the-client-service"},"2.4.1 Configure access parameters in the configuration file in the client service"),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},"Client access method and server address, the parameters are: ",(0,a.yg)("inlineCode",{parentName:"li"},"shenyu.register.*"),", the following example uses the http access method, currently the client supports the following access methods: http, zookeeper, etcd, nacos, consul, please refer to ",(0,a.yg)("a",{parentName:"li",href:"../../user-guide/property-config/register-center-access"},"client access configuration")," for detailed access configuration parameters."),(0,a.yg)("li",{parentName:"ul"},"Client configuration with the parameter: ",(0,a.yg)("inlineCode",{parentName:"li"},"shenyu.client.websocket.*"),", containing the service name, routing address and port, and the contextPath value must be configured as the routing address for each service.")),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-yaml"},"shenyu:\n  register:\n    registerType: http\n    serverLists: http://localhost:9095 \n    props:\n      username: admin\n      password: 123456\n  client:\n    websocket:\n      props:\n        contextPath: /ws-annotation \n        appName: ws-annotation\n        port: 8001 # Need to be consistent with the service port\n")),(0,a.yg)("h3",{id:"242-configure-the-websocket-plugins-selector-and-rule-information-in-shenyu-admin"},"2.4.2 Configure the websocket plugin's selector and rule information in shenyu-admin"),(0,a.yg)("p",null,"Using auto-configuration, after the client starts it will automatically register ",(0,a.yg)("a",{parentName:"p",href:"/docs/2.6.1/user-guide/admin-usage/selector-and-rule"},"selectors and rules")," in shenyu-admin -> Plugin List -> Proxy -> Websocket information.\n",(0,a.yg)("img",{alt:"image-20220725222628106",src:t(44650).A})),(0,a.yg)("h4",{id:"2421-configuration-of-selectors"},"2.4.2.1 Configuration of selectors"),(0,a.yg)("p",null,"The example of websocket selector configuration, please refer to ",(0,a.yg)("a",{parentName:"p",href:"/docs/2.6.1/user-guide/admin-usage/selector-and-rule"},"selectors and rules")," for general selector configuration."),(0,a.yg)("p",null,(0,a.yg)("img",{alt:"image-20220725222913298",src:t(98736).A})),(0,a.yg)("h5",{id:"24211-selector-handler-configuration"},"2.4.2.1.1 Selector handler configuration"),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("inlineCode",{parentName:"li"},"host"),"\uff1aFill in ",(0,a.yg)("inlineCode",{parentName:"li"},"localhost"),", this field is not used for now."),(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("inlineCode",{parentName:"li"},"ip:port"),"\uff1a",(0,a.yg)("inlineCode",{parentName:"li"},"ip")," and port, here fill in the ",(0,a.yg)("inlineCode",{parentName:"li"},"ip")," + port of your real service."),(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("inlineCode",{parentName:"li"},"protocol"),"\uff1a",(0,a.yg)("inlineCode",{parentName:"li"},"ws")," protocol, do not fill in the default: ",(0,a.yg)("inlineCode",{parentName:"li"},"ws://"),"."),(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("inlineCode",{parentName:"li"},"startupTime"),"\uff1aStart-up time in milliseconds."),(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("inlineCode",{parentName:"li"},"weight"),"\uff1aThe default value for load balancing weight, which is automatically registered for service startup, is 50."),(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("inlineCode",{parentName:"li"},"warmupTime"),"\uff1aWarm-up time, in milliseconds, the server in warm-up will calculate the instantaneous weight, the calculated value will be less than the actual weight configured to protect the server just started, the default value of service start registration is 10. For example, the warm-up time is 100 milliseconds, currently started 50 milliseconds, the configured weight is 50, the actual weight is 25."),(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("inlineCode",{parentName:"li"},"status"),"\uff1aopen or close, the start state of this processor is only valid.")),(0,a.yg)("h4",{id:"2422-configuration-of-rules"},"2.4.2.2 Configuration of rules"),(0,a.yg)("p",null,"The example of websocket rule configuration, please refer to ",(0,a.yg)("a",{parentName:"p",href:"/docs/2.6.1/user-guide/admin-usage/selector-and-rule"},"selectors and rules")," for general rule configuration ."),(0,a.yg)("p",null,(0,a.yg)("img",{alt:"image-20220725223225388",src:t(35577).A})),(0,a.yg)("h5",{id:"24221-rule-handler-configuration"},"2.4.2.2.1 Rule handler configuration"),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("inlineCode",{parentName:"li"},"loadStrategy"),":  if the websocket client is a cluster, which load balancing strategy to take when the Apache ShenYu gateway is invoked, currently supports roundRobin, random and hash."),(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("inlineCode",{parentName:"li"},"timeout"),": The timeout period for calling the client."),(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("inlineCode",{parentName:"li"},"retryCount"),": The number of retries to call client timeout failures.")),(0,a.yg)("h2",{id:"25-\u793a\u4f8b"},"2.5 \u793a\u4f8b"),(0,a.yg)("h3",{id:"251-spring-annotation-websocket-example"},"2.5.1 Spring Annotation Websocket Example"),(0,a.yg)("p",null,(0,a.yg)("a",{parentName:"p",href:"https://github.com/apache/shenyu/tree/master/shenyu-examples/shenyu-examples-websocket/shenyu-example-spring-annotation-websocket"},"shenyu-example-spring-annotation-websocket")),(0,a.yg)("h3",{id:"252-spring-native-websocket-example"},"2.5.2 Spring Native Websocket Example"),(0,a.yg)("p",null,(0,a.yg)("a",{parentName:"p",href:"https://github.com/apache/shenyu/tree/master/shenyu-examples/shenyu-examples-websocket/shenyu-example-spring-native-websocket"},"shenyu-example-spring-native-websocket")),(0,a.yg)("h3",{id:"253-spring-reactive-websocket-example"},"2.5.3 Spring Reactive Websocket Example"),(0,a.yg)("p",null,(0,a.yg)("a",{parentName:"p",href:"https://github.com/apache/shenyu/tree/master/shenyu-examples/shenyu-examples-websocket/shenyu-example-spring-reactive-websocket"},"shenyu-example-spring-reactive-websocket")),(0,a.yg)("h1",{id:"3-how-to-disable-plugin"},"3. How to disable plugin"),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},"shenyu-admin --\x3e BasicConfig --\x3e Plugin  --\x3e Close websocket plugin status.")),(0,a.yg)("p",null,(0,a.yg)("img",{alt:"image-20220726231206572",src:t(91483).A})),(0,a.yg)("h1",{id:"4-frequently-asked-questions"},"4. Frequently Asked Questions"),(0,a.yg)("p",null,(0,a.yg)("strong",{parentName:"p"},"4.1  Websocket connection establishment error 1002")),(0,a.yg)("p",null,"Possible causes: client service is not normal, shenyu gateway and client project can not establish a normal connection, please check the gateway to the client network, client service is normal."),(0,a.yg)("p",null,(0,a.yg)("strong",{parentName:"p"},"4.2 Multiple client services are displayed as empty in the websocket selector")),(0,a.yg)("p",null,"Possible cause: BasicConfig -> Plugin -> websocket -> multiSelectorHandle option select multiple handle."),(0,a.yg)("p",null,(0,a.yg)("img",{alt:"image-20220726222250136",src:t(95711).A})),(0,a.yg)("h1",{id:"5-annexes"},"5. Annexes"),(0,a.yg)("h2",{id:"51-websocket-debugging-code"},"5.1 websocket debugging code"),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},"Create a file called websocket.html and copy the following code into the file."),(0,a.yg)("li",{parentName:"ul"},"Open websocket.html with Chrome.")),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-html"},'<!DOCTYPE HTML>\n<html>\n<head>\n    <meta http-equiv="content-type" content="text/html" />\n    <title>Shenyu WebSocket Test</title>\n    <script>\n        var websocket;\n        function connect() {\n            try {\n                websocket = new WebSocket(document.getElementById("url").value);\n                websocket.onopen = onOpen;\n                websocket.onerror = onError;\n                websocket.onmessage = onReceive;\n                websocket.onclose = onClose;\n            } catch (e) {\n                alert(\'[websocket] establish connection error.\');\n            }\n        }\n        function onOpen() {\n            alert(\'[websocket] connect success.\');\n        }\n        function onError(e) {\n            alert("[websocket] connect error. code: " + e.code);\n        }\n        function onReceive(msg) {\n            var show = document.getElementById("show");\n            show.innerHTML += "[Server Response] => " + msg.data + "<br/>";\n            show.scrollTop = show.scrollHeight;\n        }\n        function onClose(e) {\n            console.log("[websocket] connect closed. code: " + e.code)\n            alert("[websocket] connect closed.");\n            document.getElementById("show").innerHTML = "";\n            document.getElementById("msg").value = "";\n            websocket = null;\n        }\n        function buttonClose() {\n            if (websocket == null) {\n                console.log("Please establish a connection first.")\n            } else {\n                websocket.close(1000);\n                document.getElementById("show").innerHTML = "";\n                document.getElementById("msg").value = "";\n            }\n        }\n        function send() {\n            if (websocket == null) {\n                alert("Please establish a connection first.")\n            } else {\n                var msg = document.getElementById("msg").value;\n                show.innerHTML += "[Client Request] => " + msg + "<br/>";\n                websocket.send(msg);\n            }\n        }\n    <\/script>\n</head>\n<body>\n    <input id="url" type="text" value="ws://localhost:9195/ws-annotation/myWs"><br />\n    <input id="msg" type="text"><br />\n    <button id="connect" onclick="connect();">Connect</button>\n    <button id="send" onclick="send();">Send</button>\n    <button id="close" onclick="buttonClose();">Close</button></br>\n    <div id="show" class="show"></div>\n</body>\n</html>\n<style>\n    input {\n        width: 400px;\n        margin-bottom: 10px;\n    }\n    .show {\n        width: 600px;\n        height: 400px;\n        overflow-y: auto;\n        border: 1px solid #333;\n        margin-top: 10px;\n    }\n</style>\n')))}g.isMDXComponent=!0},73481:(e,n,t)=>{t.d(n,{A:()=>i});const i=t.p+"assets/images/add_rule_en-dccc9a34db1ca2d73a775262bdf36041.png"},16170:(e,n,t)=>{t.d(n,{A:()=>i});const i=t.p+"assets/images/add_selector_en-40d5626d61c16a9a9b5ac00cd8b0a6a1.png"},44650:(e,n,t)=>{t.d(n,{A:()=>i});const i=t.p+"assets/images/auto_register_en-3b95f15cf9c9e77ab84f83d0bff3c497.png"},91483:(e,n,t)=>{t.d(n,{A:()=>i});const i=t.p+"assets/images/close_websocket_en-57cc860359037abaf7e7ff539a519003.png"},35577:(e,n,t)=>{t.d(n,{A:()=>i});const i=t.p+"assets/images/config_rules_en-2dc38e12c2c04f95d351ba1567839b24.png"},98736:(e,n,t)=>{t.d(n,{A:()=>i});const i=t.p+"assets/images/config_selectors_en-6fb067685bdeef81b55411f443b4a738.png"},97292:(e,n,t)=>{t.d(n,{A:()=>i});const i=t.p+"assets/images/enable_websocket_en-7bf13e1c7396e1c12ebe0f39230390e1.png"},58993:(e,n,t)=>{t.d(n,{A:()=>i});const i=t.p+"assets/images/procedure_chart_en-d7602e00db6527ccd37f649b15fa3d9b.png"},95711:(e,n,t)=>{t.d(n,{A:()=>i});const i=t.p+"assets/images/questions_multiSelectorHandle_en-9761e919964a55a683768475e3021049.png"},80551:(e,n,t)=>{t.d(n,{A:()=>i});const i=t.p+"assets/images/test_result_en-e23f4e8528881c929712ae84b01d53e8.png"}}]);