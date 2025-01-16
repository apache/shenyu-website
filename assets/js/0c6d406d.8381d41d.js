"use strict";(self.webpackChunkshenyu_website=self.webpackChunkshenyu_website||[]).push([[24392],{15680:(e,n,t)=>{t.d(n,{xA:()=>d,yg:()=>y});var i=t(96540);function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function o(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);n&&(i=i.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,i)}return t}function l(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?o(Object(t),!0).forEach((function(n){a(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function r(e,n){if(null==e)return{};var t,i,a=function(e,n){if(null==e)return{};var t,i,a={},o=Object.keys(e);for(i=0;i<o.length;i++)t=o[i],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(i=0;i<o.length;i++)t=o[i],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var s=i.createContext({}),c=function(e){var n=i.useContext(s),t=n;return e&&(t="function"==typeof e?e(n):l(l({},n),e)),t},d=function(e){var n=c(e.components);return i.createElement(s.Provider,{value:n},e.children)},u="mdxType",g={inlineCode:"code",wrapper:function(e){var n=e.children;return i.createElement(i.Fragment,{},n)}},p=i.forwardRef((function(e,n){var t=e.components,a=e.mdxType,o=e.originalType,s=e.parentName,d=r(e,["components","mdxType","originalType","parentName"]),u=c(t),p=a,y=u["".concat(s,".").concat(p)]||u[p]||g[p]||o;return t?i.createElement(y,l(l({ref:n},d),{},{components:t})):i.createElement(y,l({ref:n},d))}));function y(e,n){var t=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var o=t.length,l=new Array(o);l[0]=p;var r={};for(var s in n)hasOwnProperty.call(n,s)&&(r[s]=n[s]);r.originalType=e,r[u]="string"==typeof e?e:a,l[1]=r;for(var c=2;c<o;c++)l[c]=t[c];return i.createElement.apply(null,l)}return i.createElement.apply(null,t)}p.displayName="MDXCreateElement"},7294:(e,n,t)=>{t.r(n),t.d(n,{contentTitle:()=>l,default:()=>u,frontMatter:()=>o,metadata:()=>r,toc:()=>s});var i=t(58168),a=(t(96540),t(15680));const o={title:"Discovery",keywords:["Discovery"],description:"Discovery"},l="Discovery",r={unversionedId:"user-guide/discovery/discovery-mode",id:"version-2.6.1/user-guide/discovery/discovery-mode",isDocsHomePage:!1,title:"Discovery",description:"Discovery",source:"@site/versioned_docs/version-2.6.1/user-guide/discovery/discovery-mode.md",sourceDirName:"user-guide/discovery",slug:"/user-guide/discovery/discovery-mode",permalink:"/docs/2.6.1/user-guide/discovery/discovery-mode",editUrl:"https://github.com/apache/shenyu-website/edit/main/versioned_docs/version-2.6.1/user-guide/discovery/discovery-mode.md",version:"2.6.1",frontMatter:{title:"Discovery",keywords:["Discovery"],description:"Discovery"},sidebar:"version-2.6.0/tutorialSidebar",previous:{title:"Using Zookeeper with Shenyu-SDK",permalink:"/docs/2.6.1/user-guide/sdk-usage/shenyu-sdk-zookeeper"},next:{title:"Dubbo Proxy",permalink:"/docs/2.6.1/user-guide/proxy/dubbo-proxy"}},s=[{value:"1. Overview",id:"1-overview",children:[{value:"1.1 Module Name",id:"11-module-name",children:[]},{value:"1.2 Design",id:"12-design",children:[]},{value:"1.3 Module Functionality",id:"13-module-functionality",children:[]},{value:"1.4 Listening Mode",id:"14-listening-mode",children:[]},{value:"1.5 Scope of Effect",id:"15-scope-of-effect",children:[]}]},{value:"2. Usage",id:"2-usage",children:[{value:"2.1 Plugin-Level Configuration",id:"21-plugin-level-configuration",children:[]},{value:"2.2 Selector-Level Configuration",id:"22-selector-level-configuration",children:[]}]},{value:"3. Configuration in Different Modes",id:"3-configuration-in-different-modes",children:[{value:"3.1 Local Mode",id:"31-local-mode",children:[]},{value:"3.2 ZooKeeper/Nacos/Eureka/Etcd Modes",id:"32-zookeepernacoseurekaetcd-modes",children:[]}]},{value:"4. Using Shenyu-client",id:"4-using-shenyu-client",children:[{value:"4.1 Introduction",id:"41-introduction",children:[]},{value:"4.2 Local Mode Example",id:"42-local-mode-example",children:[]},{value:"4.2 Zookeeper Mode Example",id:"42-zookeeper-mode-example",children:[]},{value:"4.3 Etcd Mode Example",id:"43-etcd-mode-example",children:[]},{value:"4.4 Eureka Mode Example",id:"44-eureka-mode-example",children:[]},{value:"4.5 Nacos Mode Example",id:"45-nacos-mode-example",children:[]}]},{value:"5. Considerations",id:"5-considerations",children:[]},{value:"6. Test Report",id:"6-test-report",children:[]}],c={toc:s},d="wrapper";function u(e){let{components:n,...o}=e;return(0,a.yg)(d,(0,i.A)({},c,o,{components:n,mdxType:"MDXLayout"}),(0,a.yg)("h1",{id:"discovery"},"Discovery"),(0,a.yg)("h2",{id:"1-overview"},"1. Overview"),(0,a.yg)("h3",{id:"11-module-name"},"1.1 Module Name"),(0,a.yg)("p",null,"Discovery"),(0,a.yg)("h3",{id:"12-design"},"1.2 Design"),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},"Module Design Diagram")),(0,a.yg)("p",null,(0,a.yg)("img",{alt:"discovery-design.png",src:t(50841).A})),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},"Database Design")),(0,a.yg)("p",null,(0,a.yg)("img",{alt:"db-design.png",src:t(51647).A})),(0,a.yg)("h3",{id:"13-module-functionality"},"1.3 Module Functionality"),(0,a.yg)("p",null,"The Discovery module endows the ShenYu Gateway with the ability to actively perceive and respond to changes in the list of services being proxied.\nBy actively listening to the admin service of the Discovery Gateway, the ShenYu Gateway can promptly track changes in the services being proxied.\nThis functionality is designed to be flexible and can be configured at either ",(0,a.yg)("strong",{parentName:"p"},"the selector level or the plugin level"),", as needed.\nCurrently, plugins that have incorporated the Discovery feature include TCP, Divide, Websocket and gRPC plugins."),(0,a.yg)("h3",{id:"14-listening-mode"},"1.4 Listening Mode"),(0,a.yg)("p",null,"LOCAL, ZOOKEEPER, NACOS, EUREKA, ETCD"),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},"LOCAL Mode: Primarily relies on manual maintenance of the upstream list and pushing it to the gateway."),(0,a.yg)("li",{parentName:"ul"},"ZOOKEEPER Mode: Monitors changes in ephemeral nodes under a specified node in ZooKeeper to obtain data."),(0,a.yg)("li",{parentName:"ul"},"NACOS Mode: Listens for changes in instances under a specified service name in Nacos to obtain data."),(0,a.yg)("li",{parentName:"ul"},"EUREKA Mode: Listens for changes in instances under a specified service name in Eureka to obtain data."),(0,a.yg)("li",{parentName:"ul"},"ETCD Mode: Obtains data by monitoring changes in key-value pairs under specified nodes in etcd.")),(0,a.yg)("h3",{id:"15-scope-of-effect"},"1.5 Scope of Effect"),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},"Plugin Level: Impacts the entire plugin,\nand all selectors under that plugin will default to the current listening mode."),(0,a.yg)("li",{parentName:"ul"},"Selector Level: Applies to the current selector,\nallowing different selectors under the same plugin to use different listening modes.")),(0,a.yg)("h2",{id:"2-usage"},"2. Usage"),(0,a.yg)("h3",{id:"21-plugin-level-configuration"},"2.1 Plugin-Level Configuration"),(0,a.yg)("h4",{id:"211-service-discovery-configuration"},"2.1.1 Service Discovery Configuration"),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},'In plugins that support the Discovery module (currently, only the TCP plugin supports plugin-level discovery\nconfiguration on the admin console page; other plugins can configure plugin-level discovery through shenyu-client,\nas described in the "Using Shenyu-client" section below), click on ',(0,a.yg)("inlineCode",{parentName:"li"},"Discovery Configuration"),". In the popup form,\nselect the desired listening mode and fill in the service discovery name, registration server URL, registry configuration parameters, etc.:")),(0,a.yg)("p",null,(0,a.yg)("img",{alt:"config-discovery-plugin-en.png",src:t(41551).A})),(0,a.yg)("p",null,(0,a.yg)("img",{alt:"config-discovery-plugin-modal-en.png",src:t(82239).A})),(0,a.yg)("h4",{id:"212-usage-within-selectors"},"2.1.2 Usage within Selectors"),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("p",{parentName:"li"},"To add a new selector, click on ",(0,a.yg)("inlineCode",{parentName:"p"},"Add Selector"),". In the new selector page, you will notice that the ",(0,a.yg)("inlineCode",{parentName:"p"},"Type")," field enforces the previously configured plugin-level listening mode,\nindicating that the added selector will also adopt the same configuration.\nAt this point, simply input the desired ",(0,a.yg)("inlineCode",{parentName:"p"},"ListeningNode"),":"),(0,a.yg)("p",{parentName:"li"},"  ",(0,a.yg)("img",{alt:"add-selector-under-plugin-discovery-en.png",src:t(25375).A}))),(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("p",{parentName:"li"},"The ",(0,a.yg)("inlineCode",{parentName:"p"},"Handler")," here refers to ShenYu's specified JSON format for transmitting upstream registration data,\nas shown below:"),(0,a.yg)("ul",{parentName:"li"},(0,a.yg)("li",{parentName:"ul"},"url: URL of the upstream"),(0,a.yg)("li",{parentName:"ul"},"protocol: communication protocol of the upstream"),(0,a.yg)("li",{parentName:"ul"},"status: status of the upstream node (0 for healthy, 1 for unhealthy)"),(0,a.yg)("li",{parentName:"ul"},"weight: Used for load balancing calculations")))),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-json"},'{\n    "url": "127.0.0.1::6379", \n    "protocol": "tcp",\n    "status": 0, \n    "weight": 10\n}\n')),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},"If your service alias does not match ShenYu's defined JSON format,\nyou can perform alias mapping in ",(0,a.yg)("inlineCode",{parentName:"li"},"Handler"),".\nFor example, as shown in the above image,\nif you need to change ",(0,a.yg)("inlineCode",{parentName:"li"},"status"),' to "healthy" while keeping other keys unchanged,\nfollow these steps: create a new alias, map ',(0,a.yg)("inlineCode",{parentName:"li"},"status")," to ",(0,a.yg)("inlineCode",{parentName:"li"},"healthy"),",\nand retain the original JSON keys' format."),(0,a.yg)("li",{parentName:"ul"},"Configure the remaining properties for the selector according to the specific plugin's documentation.")),(0,a.yg)("h3",{id:"22-selector-level-configuration"},"2.2 Selector-Level Configuration"),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},"In plugins that support the Discovery module, click on ",(0,a.yg)("inlineCode",{parentName:"li"},"Add Selector"),".\nIn the ",(0,a.yg)("inlineCode",{parentName:"li"},"Discovery Config")," tab, configure the fields such as type,\nlistening node, server URL list, and registry properties.\nThis configuration only applies to the current selector and must be reconfigured each time a new selector is added.")),(0,a.yg)("p",null,(0,a.yg)("img",{alt:"add-selector-en.png",src:t(70205).A})),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},"For the Divide, gRPC, and Websocket plugins,\nthe ",(0,a.yg)("inlineCode",{parentName:"li"},"Import Background Discovery Config")," function on the selector creation page\nallows you to import and use the backend configuration if the service connecting to the ShenYu Gateway\nwas configured with shenyu-discovery-related properties (see usage with shenyu-client).\nAs shown in the following image, click ",(0,a.yg)("inlineCode",{parentName:"li"},"Import Background Discovery Config")," to view the backend configuration:")),(0,a.yg)("p",null,(0,a.yg)("img",{alt:"config-import-en.png",src:t(92472).A})),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},"If you confirm the import, clicking the ",(0,a.yg)("inlineCode",{parentName:"li"},"Import")," button in the backend configuration popup will automatically populate the form with the backend service discovery properties.\nAt this point, you only need to configure the listening node:")),(0,a.yg)("p",null,(0,a.yg)("img",{alt:"after-import-en.png",src:t(49758).A})),(0,a.yg)("blockquote",null,(0,a.yg)("p",{parentName:"blockquote"},(0,a.yg)("strong",{parentName:"p"},"Note"),": If you confirm importing the backend configuration,\nthe backend service discovery properties will be automatically filled in the form and will continue to use the previous discovery object.\nIn this case, modifying service discovery properties in the form will be ineffective, and the backend configuration will be retained.")),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},"If you choose the LOCAL mode, there is no need to connect to a registry, and users must manually maintain the upstream list.")),(0,a.yg)("h2",{id:"3-configuration-in-different-modes"},"3. Configuration in Different Modes"),(0,a.yg)("h3",{id:"31-local-mode"},"3.1 Local Mode"),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},"Local mode only supports configuration at the ",(0,a.yg)("strong",{parentName:"li"},"selector level"),".\nThere is no need to connect to a registry, and users must manually maintain the upstream list.\nThis list is an editable table. Click the ",(0,a.yg)("inlineCode",{parentName:"li"},"Edit")," button for each row in the table to modify each parameter of the upstream:")),(0,a.yg)("p",null,(0,a.yg)("img",{alt:"local-selector-en.png",src:t(31153).A})),(0,a.yg)("h3",{id:"32-zookeepernacoseurekaetcd-modes"},"3.2 ZooKeeper/Nacos/Eureka/Etcd Modes"),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},"In the ZooKeeper/Nacos/Eureka/Etcd modes, service discovery configuration is supported at both the plugin level and the selector level."),(0,a.yg)("li",{parentName:"ul"},"For each registry property under these modes, taking ZooKeeper as an example, users can go to ",(0,a.yg)("inlineCode",{parentName:"li"},"shenyu-admin")," --\x3e ",(0,a.yg)("inlineCode",{parentName:"li"},"BasicConfig")," --\x3e ",(0,a.yg)("inlineCode",{parentName:"li"},"Dictionary"),',\nsearch for the dictionary name "zookeeper", and edit the dictionary values corresponding to the default properties\n(',(0,a.yg)("strong",{parentName:"li"},"Note"),": You cannot modify the dictionary type and dictionary name)."),(0,a.yg)("li",{parentName:"ul"},"In these modes, the gateway dynamically retrieves service instance information from the registry. Additions, removals, modifications,\nand other changes to service instances will be displayed in real-time in the upstream list.")),(0,a.yg)("p",null,(0,a.yg)("img",{alt:"zk_dict_en.png",src:t(85179).A})),(0,a.yg)("h2",{id:"4-using-shenyu-client"},"4. Using Shenyu-client"),(0,a.yg)("h3",{id:"41-introduction"},"4.1 Introduction"),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},"To use Shenyu-client, you need to depend on the corresponding mode's registry middleware: ZooKeeper, Nacos, Etcd, Eureka.\nThese modes can automatically detect service up and down events through ShenYu Admin."),(0,a.yg)("li",{parentName:"ul"},"Additionally, if you are using the local mode, you will need to manually maintain the upstream list."),(0,a.yg)("li",{parentName:"ul"},"For detailed instructions on using Shenyu-client, refer to the Shenyu-client module documentation.")),(0,a.yg)("h3",{id:"42-local-mode-example"},"4.2 Local Mode Example"),(0,a.yg)("h4",{id:"421-using-shenyu-client"},"4.2.1 Using Shenyu-client"),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},"Shenyu-client defaults to the Local mode, so there is no need for any special discovery configuration.\nIt will automatically register the current service."),(0,a.yg)("li",{parentName:"ul"},"For services that are automatically registered, you can manually add, modify,\nor delete them in the upstream list on the page:")),(0,a.yg)("p",null,(0,a.yg)("img",{alt:"local-selector-en.png",src:t(31153).A})),(0,a.yg)("h4",{id:"422-without-using-shenyu-client"},"4.2.2 Without Using Shenyu-client"),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},"If you are not using Shenyu-client, you can manually add, modify,\nor delete service information on the ",(0,a.yg)("inlineCode",{parentName:"li"},"Discovery Config")," tab under ",(0,a.yg)("inlineCode",{parentName:"li"},"Add Selector"),":")),(0,a.yg)("p",null,(0,a.yg)("img",{alt:"add-selector-local-en.png",src:t(11515).A})),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},"Configure other selector information:")),(0,a.yg)("p",null,(0,a.yg)("img",{alt:"add-selector-basic-en.png",src:t(37882).A})),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},"Configure rules:")),(0,a.yg)("p",null,(0,a.yg)("img",{alt:"rule-en.png",src:t(57464).A})),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},"Test Connection")),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-text"},"curl http://localhost:9195/http/hello\n\nhello! I'm Shenyu-Gateway System. Welcome!% \n")),(0,a.yg)("h3",{id:"42-zookeeper-mode-example"},"4.2 Zookeeper Mode Example"),(0,a.yg)("p",null,"(Taking the Divide plugin as an example)"),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},"Add Dependencies")),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-xml"},"<dependencies>\n  <dependency>\n    <groupId>org.apache.shenyu</groupId>\n    <artifactId>shenyu-discovery-zookeeper</artifactId>\n    <version>${project.version}</version>\n  </dependency>\n\n  <dependency>\n    <groupId>org.apache.shenyu</groupId>\n    <artifactId>shenyu-spring-boot-starter-client-http</artifactId>\n  </dependency>\n</dependencies>\n")),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},"Add the Following Configuration in application.yml")),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-yaml"},"shenyu:\n   discovery:\n      enable: true\n      type: zookeeper\n      serverList: ${your.zookeeper.ip}:{your.zookeeper.port}\n      registerPath: /shenyu/discovery/demo_http_common\n      props:\n         baseSleepTimeMilliseconds: 1000\n         maxRetries: 4\n         maxSleepTimeMilliseconds: 5000\n         connectionTimeoutMilliseconds: 60000\n         sessionTimeoutMilliseconds: 8\n")),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},"Start the shenyu-examples-http service."),(0,a.yg)("li",{parentName:"ul"},"Once the service registration is successful,\nyou can view the list of automatically registered service instances on the selector page:")),(0,a.yg)("p",null,(0,a.yg)("img",{alt:"zk-selector-en.png",src:t(17743).A})),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},"Users can click on ",(0,a.yg)("inlineCode",{parentName:"li"},"Edit")," in the service instance list to edit the service instance information\n(Note that in non-Local mode, the URL is maintained by the registry and cannot be manually edited):")),(0,a.yg)("p",null,(0,a.yg)("img",{alt:"edit-zk-upstream-en.png",src:t(62380).A})),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},"Test Connection")),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-text"},"curl http://localhost:9195/http/hello\n\nhello! I'm Shenyu-Gateway System. Welcome!% \n")),(0,a.yg)("h3",{id:"43-etcd-mode-example"},"4.3 Etcd Mode Example"),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},"Add Dependencies")),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-xml"},"<dependencies>\n  <dependency>\n    <groupId>org.apache.shenyu</groupId>\n    <artifactId>shenyu-discovery-etcd</artifactId>\n    <version>${project.version}</version>\n  </dependency>\n\n  <dependency>\n    <groupId>org.apache.shenyu</groupId>\n    <artifactId>shenyu-spring-boot-starter-client-http</artifactId>\n  </dependency>\n</dependencies>\n")),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},"Add the Following Configuration in application.yml")),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-yaml"},"shenyu:\n   discovery:\n      enable: true\n      protocol: http://\n      type: etcd\n      serverList: http://${your.etcd.host}:${your.etcd.port}\n      registerPath: /shenyu/test/http_common\n      props:\n         etcdTimeout: 3000\n         etcdTTL: 5\n")),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("p",{parentName:"li"},"Start the shenyu-examples-http service. Similarly, on the selector page,\nyou can see the list of automatically registered service instances and edit them as needed:\n",(0,a.yg)("img",{alt:"etcd-selector-en.png",src:t(27220).A}))),(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("p",{parentName:"li"},"Test Connection"))),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-text"},"curl http://localhost:9195/http/hello\n\nhello! I'm Shenyu-Gateway System. Welcome!% \n")),(0,a.yg)("h3",{id:"44-eureka-mode-example"},"4.4 Eureka Mode Example"),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},"Add Dependencies")),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-xml"},"<dependencies>\n  <dependency>\n    <groupId>org.apache.shenyu</groupId>\n    <artifactId>shenyu-discovery-eureka</artifactId>\n    <version>${project.version}</version>\n  </dependency>\n\n  <dependency>\n    <groupId>org.apache.shenyu</groupId>\n    <artifactId>shenyu-spring-boot-starter-client-http</artifactId>\n  </dependency>\n</dependencies>\n")),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},"Add the Following Configuration in application.yml\n(in this context, ",(0,a.yg)("inlineCode",{parentName:"li"},"registerPath")," can be understood as the name of the service to be monitored):")),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-yaml"},"shenyu:\n   discovery:\n      enable: true\n      protocol: http://\n      type: eureka\n      serverList: http://${your.eureka.host}:${your.eureka.port}/eureka\n      registerPath: shenyu_discovery_demo_http_common\n      props:\n         eurekaClientRefreshInterval: 10\n         eurekaClientRegistryFetchIntervalSeconds: 10\n")),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},"Start the shenyu-examples-http service. Similarly, on the selector page,\nyou can see the list of automatically registered service instances and edit them as needed:")),(0,a.yg)("p",null,(0,a.yg)("img",{alt:"eureka-selector-en.png",src:t(40679).A})),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},"Test Connection")),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-text"},"curl http://localhost:9195/http/hello\n\nhello! I'm Shenyu-Gateway System. Welcome!% \n")),(0,a.yg)("h3",{id:"45-nacos-mode-example"},"4.5 Nacos Mode Example"),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},"Add Dependencies")),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-xml"},"<dependencies>\n  <dependency>\n    <groupId>org.apache.shenyu</groupId>\n    <artifactId>shenyu-discovery-eureka</artifactId>\n    <version>${project.version}</version>\n  </dependency>\n\n  <dependency>\n    <groupId>org.apache.shenyu</groupId>\n    <artifactId>shenyu-spring-boot-starter-client-http</artifactId>\n  </dependency>\n</dependencies>\n")),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},"Add the Following Configuration in application.yml\n(Here, ",(0,a.yg)("inlineCode",{parentName:"li"},"registerPath")," can also be understood as the name of the service to be monitored.)")),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-yaml"},"shenyu:\n   discovery:\n      enable: true\n      protocol: http://\n      type: nacos\n      serverList: ${your.nacos.host}:${your.nacos.port}\n      registerPath: shenyu_discovery_demo_http_common\n      props:\n         groupName: SHENYU_GROUP\n")),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},"Start the shenyu-examples-http service. Similarly, on the selector page,\nyou can view the list of automatically registered service instances and edit them as needed.")),(0,a.yg)("p",null,(0,a.yg)("img",{alt:"nacos-selector-en.png",src:t(34316).A})),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},"Test Connection")),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-text"},"curl http://localhost:9195/http/hello\n\nhello! I'm Shenyu-Gateway System. Welcome!% \n")),(0,a.yg)("blockquote",null,(0,a.yg)("p",{parentName:"blockquote"},(0,a.yg)("strong",{parentName:"p"},"Note"),"\uff1aConfiguring service discovery using Shenyu-client essentially configures service discovery at the plugin level.\nUnder the same service discovery mode, there is, in fact, only one discovery object\n(meaning you can only configure the same set of type, server URL, and service discovery parameters), while multiple listening nodes can be configured.")),(0,a.yg)("p",null,(0,a.yg)("img",{alt:"ws-selector-en.png",src:t(62736).A})),(0,a.yg)("blockquote",null,(0,a.yg)("p",{parentName:"blockquote"},(0,a.yg)("strong",{parentName:"p"},"Note"),"\uff1aIn the Divide and gRPC plugins, you can modify the protocol by configuring the protocol in the application.yml file.\nThe default protocol for the Websocket plugin is 'ws'.")),(0,a.yg)("h2",{id:"5-considerations"},"5. Considerations"),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},"In local mode, you can manually modify all parameters of the upstream on the service list page."),(0,a.yg)("li",{parentName:"ul"},"In non-local modes, you can manually modify parameters other than URL and start time."),(0,a.yg)("li",{parentName:"ul"},"Manually changing the status (open/close) and weight of service instances only affects the current plugin."),(0,a.yg)("li",{parentName:"ul"},"For the same plugin, when configuring discovery-related parameters through Shenyu-client in the backend, it essentially configures service discovery at the plugin level. Although you can manually add selectors on the console page to configure selector-level service discovery, in reality, there is only one discovery object (meaning you can only configure the same set of type, server URL, and service discovery parameters), while multiple listening nodes can be configured.")),(0,a.yg)("h2",{id:"6-test-report"},"6. Test Report"),(0,a.yg)("p",null,(0,a.yg)("a",{parentName:"p",href:"https://www.yuque.com/eureca/pgotw1/hkqkk5laubspgwl3#UojLR"},"Test Report")))}u.isMDXComponent=!0},37882:(e,n,t)=>{t.d(n,{A:()=>i});const i=t.p+"assets/images/add-selector-basic-en-13721a2c3d5b2ff3eb923d6022249766.png"},70205:(e,n,t)=>{t.d(n,{A:()=>i});const i=t.p+"assets/images/add-selector-en-f69527e00c21591f8f22a3c8c46c1dbb.png"},11515:(e,n,t)=>{t.d(n,{A:()=>i});const i=t.p+"assets/images/add-selector-local-en-a27bc0cf61e1caca2e35bf405bf14079.png"},25375:(e,n,t)=>{t.d(n,{A:()=>i});const i=t.p+"assets/images/add-selector-under-plugin-discovery-en-bdd4aaafdff4e9cce7a2df86d5472e85.png"},49758:(e,n,t)=>{t.d(n,{A:()=>i});const i=t.p+"assets/images/after-import-en-1080a3e988b4efde089dddc3366ec4d0.png"},41551:(e,n,t)=>{t.d(n,{A:()=>i});const i=t.p+"assets/images/config-discovery-plugin-en-03817c824ab97b6f6144141cfbb5750f.png"},82239:(e,n,t)=>{t.d(n,{A:()=>i});const i=t.p+"assets/images/config-discovery-plugin-modal-en-5922e43048c244e8dcd8b3eab8ad8d9b.png"},92472:(e,n,t)=>{t.d(n,{A:()=>i});const i=t.p+"assets/images/config-import-en-520151b4311fdd295879ae00da086657.png"},51647:(e,n,t)=>{t.d(n,{A:()=>i});const i=t.p+"assets/images/db-design-ace76c69c809afe5bf47464fc1b0209c.png"},50841:(e,n,t)=>{t.d(n,{A:()=>i});const i=t.p+"assets/images/discovery-design-3081f14fec1ef9322d39bd1b998f42a3.png"},62380:(e,n,t)=>{t.d(n,{A:()=>i});const i=t.p+"assets/images/edit-zk-upstream-en-003302d02022263db95f1e68110f441f.png"},27220:(e,n,t)=>{t.d(n,{A:()=>i});const i=t.p+"assets/images/etcd-selector-en-32149574a23a9f958f3c51f5a4e17800.png"},40679:(e,n,t)=>{t.d(n,{A:()=>i});const i=t.p+"assets/images/eureka-selector-en-438b997614fcd24234dc72ee81d35be6.png"},31153:(e,n,t)=>{t.d(n,{A:()=>i});const i=t.p+"assets/images/local-selector-en-94c6799b40684d6d04f8fc1cd8943fd2.png"},34316:(e,n,t)=>{t.d(n,{A:()=>i});const i=t.p+"assets/images/nacos-selector-en-848290702d46c73d029d688e3c3c1a03.png"},57464:(e,n,t)=>{t.d(n,{A:()=>i});const i=t.p+"assets/images/rule-en-95ac5e751ee513a5e2f1f6df880bf892.png"},62736:(e,n,t)=>{t.d(n,{A:()=>i});const i=t.p+"assets/images/ws-selector-en-0646fe75699ac938f415edfc2f5fcc09.png"},17743:(e,n,t)=>{t.d(n,{A:()=>i});const i=t.p+"assets/images/zk-selector-en-7d96c81ae13fa7c6e837c5adf35d28d7.png"},85179:(e,n,t)=>{t.d(n,{A:()=>i});const i=t.p+"assets/images/zk_dict_en-fd86f5888a94e38c84a97588ff295e79.png"}}]);