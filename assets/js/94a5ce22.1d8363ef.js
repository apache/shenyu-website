"use strict";(self.webpackChunkshenyu_website=self.webpackChunkshenyu_website||[]).push([[55890],{15680:(e,t,a)=>{a.d(t,{xA:()=>m,yg:()=>c});var n=a(96540);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function g(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function l(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?g(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):g(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function i(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},g=Object.keys(e);for(n=0;n<g.length;n++)a=g[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var g=Object.getOwnPropertySymbols(e);for(n=0;n<g.length;n++)a=g[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var p=n.createContext({}),y=function(e){var t=n.useContext(p),a=t;return e&&(a="function"==typeof e?e(t):l(l({},t),e)),a},m=function(e){var t=y(e.components);return n.createElement(p.Provider,{value:t},e.children)},d="mdxType",o={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},N=n.forwardRef((function(e,t){var a=e.components,r=e.mdxType,g=e.originalType,p=e.parentName,m=i(e,["components","mdxType","originalType","parentName"]),d=y(a),N=r,c=d["".concat(p,".").concat(N)]||d[N]||o[N]||g;return a?n.createElement(c,l(l({ref:t},m),{},{components:a})):n.createElement(c,l({ref:t},m))}));function c(e,t){var a=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var g=a.length,l=new Array(g);l[0]=N;var i={};for(var p in t)hasOwnProperty.call(t,p)&&(i[p]=t[p]);i.originalType=e,i[d]="string"==typeof e?e:r,l[1]=i;for(var y=2;y<g;y++)l[y]=a[y];return n.createElement.apply(null,l)}return n.createElement.apply(null,a)}N.displayName="MDXCreateElement"},30366:(e,t,a)=>{a.r(t),a.d(t,{contentTitle:()=>l,default:()=>d,frontMatter:()=>g,metadata:()=>i,toc:()=>p});var n=a(58168),r=(a(96540),a(15680));const g={title:"Admin Property Config",keywords:["Config"],description:"Admin Property Config"},l=void 0,i={unversionedId:"user-guide/property-config/admin-property-config",id:"version-2.6.1/user-guide/property-config/admin-property-config",isDocsHomePage:!1,title:"Admin Property Config",description:"Admin Property Config",source:"@site/versioned_docs/version-2.6.1/user-guide/property-config/admin-property-config.md",sourceDirName:"user-guide/property-config",slug:"/user-guide/property-config/admin-property-config",permalink:"/docs/2.6.1/user-guide/property-config/admin-property-config",editUrl:"https://github.com/apache/shenyu-website/edit/main/versioned_docs/version-2.6.1/user-guide/property-config/admin-property-config.md",version:"2.6.1",frontMatter:{title:"Admin Property Config",keywords:["Config"],description:"Admin Property Config"},sidebar:"version-2.6.0/tutorialSidebar",previous:{title:"Selector And Rule Config",permalink:"/docs/2.6.1/user-guide/admin-usage/selector-and-rule"},next:{title:"Client Property Config",permalink:"/docs/2.6.1/user-guide/property-config/client-property-config"}},p=[{value:"Property Config",id:"property-config",children:[]},{value:"Property Detail",id:"property-detail",children:[]}],y={toc:p},m="wrapper";function d(e){let{components:t,...a}=e;return(0,r.yg)(m,(0,n.A)({},y,a,{components:t,mdxType:"MDXLayout"}),(0,r.yg)("p",null,"This paper mainly explains how to configure Apache ShenYu properties on the admin side."),(0,r.yg)("img",{src:"/img/shenyu/config/shenyu_admin_application_config.png",width:"80%",height:"70%"}),(0,r.yg)("h3",{id:"property-config"},"Property Config"),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-yaml"},"shenyu:\n  register:\n    registerType: http #http #zookeeper #etcd #nacos #consul\n    serverLists: #localhost:2181 #http://localhost:2379 #localhost:8848\n    props:\n      sessionTimeout: 5000\n      connectionTimeout: 2000\n      checked: true\n      zombieCheckTimes: 5\n      scheduledTime: 10\n      nacosNameSpace: ShenyuRegisterCenter\n  sync:\n    websocket:\n      enabled: true\n      messageMaxSize: 10240\n      allowOrigins: ws://localhost:9095;ws://localhost:9195;\n#      zookeeper:\n#        url: localhost:2181\n#        sessionTimeout: 5000\n#        connectionTimeout: 2000\n#      http:\n#        enabled: true\n#      nacos:\n#        url: localhost:8848\n#        namespace: 1c10d748-af86-43b9-8265-75f487d20c6c\n#        username:\n#        password:\n#        acm:\n#          enabled: false\n#          endpoint: acm.aliyun.com\n#          namespace:\n#          accessKey:\n#          secretKey:\n#    etcd:\n#      url: http://localhost:2379\n#    consul:\n#      url: http://localhost:8500\n  aes:\n    secret:\n      key: 2095132720951327\n      iv: 6075877187097700\n  ldap:\n    enabled: false\n    url: ldap://xxxx:xxx\n    bind-dn: cn=xxx,dc=xxx,dc=xxx\n    password: xxxx\n    base-dn: ou=xxx,dc=xxx,dc=xxx\n    object-class: person\n    login-field: cn\n  jwt:\n    expired-seconds: 86400000\n  shiro:\n    white-list:\n      - /\n      - /favicon.*\n      - /static/**\n      - /index**\n      - /plugin\n      - /platform/**\n      - /websocket\n      - /configs/**\n      - /shenyu-client/**\n      - /error\n      - /actuator/health\n      - /swagger-ui.html\n      - /webjars/**\n      - /swagger-resources/**\n      - /v2/api-docs\n      - /csrf\n  swagger:\n    enable: true\n")),(0,r.yg)("h3",{id:"property-detail"},"Property Detail"),(0,r.yg)("h5",{id:"shenyuregister-config"},"shenyu.register config"),(0,r.yg)("p",null,"This section describes configurations related to client access. For details about client access principles, see: ",(0,r.yg)("a",{parentName:"p",href:"../../design/register-center-design"},"Application Client Access")," , for client access configuration, see: ",(0,r.yg)("a",{parentName:"p",href:"docs/user-guide/property-config/register-center-access.md"},"Application Client Access Config")," ."),(0,r.yg)("table",null,(0,r.yg)("thead",{parentName:"table"},(0,r.yg)("tr",{parentName:"thead"},(0,r.yg)("th",{parentName:"tr",align:"left"},"Name"),(0,r.yg)("th",{parentName:"tr",align:"left"},"Type"),(0,r.yg)("th",{parentName:"tr",align:"center"},"Default"),(0,r.yg)("th",{parentName:"tr",align:"center"},"Required"),(0,r.yg)("th",{parentName:"tr",align:"left"},"Description"))),(0,r.yg)("tbody",{parentName:"table"},(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"left"},"registerType"),(0,r.yg)("td",{parentName:"tr",align:"left"},"String"),(0,r.yg)("td",{parentName:"tr",align:"center"},"http"),(0,r.yg)("td",{parentName:"tr",align:"center"},"Yes"),(0,r.yg)("td",{parentName:"tr",align:"left"},"Which mode to use for registry. Currently, http, zookeeper, etcd, consul and nacos are supported.")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"left"},"serverLists"),(0,r.yg)("td",{parentName:"tr",align:"left"},"String"),(0,r.yg)("td",{parentName:"tr",align:"center"},"null"),(0,r.yg)("td",{parentName:"tr",align:"center"},"No"),(0,r.yg)("td",{parentName:"tr",align:"left"},"Configure the address of the registry. If ",(0,r.yg)("inlineCode",{parentName:"td"},"http")," is used, you do not need to enter this parameter. In clustering, multiple addresses are separated by commas (,).")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"left"},"props"),(0,r.yg)("td",{parentName:"tr",align:"left"}),(0,r.yg)("td",{parentName:"tr",align:"center"}),(0,r.yg)("td",{parentName:"tr",align:"center"}),(0,r.yg)("td",{parentName:"tr",align:"left"},"The value of the property varies according to the registerType.")))),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("inlineCode",{parentName:"li"},"props")," config")),(0,r.yg)("p",null,"The value of the attribute varies according to the registerType."),(0,r.yg)("p",null,"When the registerType is ",(0,r.yg)("inlineCode",{parentName:"p"},"http"),", the supported properties are as follows."),(0,r.yg)("table",null,(0,r.yg)("thead",{parentName:"table"},(0,r.yg)("tr",{parentName:"thead"},(0,r.yg)("th",{parentName:"tr",align:"left"},"Name"),(0,r.yg)("th",{parentName:"tr",align:"left"},"Type"),(0,r.yg)("th",{parentName:"tr",align:"center"},"Default"),(0,r.yg)("th",{parentName:"tr",align:"center"},"Required"),(0,r.yg)("th",{parentName:"tr",align:"left"},"Description"))),(0,r.yg)("tbody",{parentName:"table"},(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"left"},"checked"),(0,r.yg)("td",{parentName:"tr",align:"left"},"boolean"),(0,r.yg)("td",{parentName:"tr",align:"center"},"false"),(0,r.yg)("td",{parentName:"tr",align:"center"},"No"),(0,r.yg)("td",{parentName:"tr",align:"left"},"is checked")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"left"},"zombieCheckTimes"),(0,r.yg)("td",{parentName:"tr",align:"left"},"int"),(0,r.yg)("td",{parentName:"tr",align:"center"},"5"),(0,r.yg)("td",{parentName:"tr",align:"center"},"No"),(0,r.yg)("td",{parentName:"tr",align:"left"},"how many times does it fail to detect the service.")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"left"},"scheduledTime"),(0,r.yg)("td",{parentName:"tr",align:"left"},"int"),(0,r.yg)("td",{parentName:"tr",align:"center"},"10"),(0,r.yg)("td",{parentName:"tr",align:"center"},"No"),(0,r.yg)("td",{parentName:"tr",align:"left"},"timed detection interval time")))),(0,r.yg)("p",null,"When the registerType is ",(0,r.yg)("inlineCode",{parentName:"p"},"zookeeper"),", the supported properties are as follows."),(0,r.yg)("table",null,(0,r.yg)("thead",{parentName:"table"},(0,r.yg)("tr",{parentName:"thead"},(0,r.yg)("th",{parentName:"tr",align:"left"},"Name"),(0,r.yg)("th",{parentName:"tr",align:"left"},"Type"),(0,r.yg)("th",{parentName:"tr",align:"center"},"Default"),(0,r.yg)("th",{parentName:"tr",align:"center"},"Required"),(0,r.yg)("th",{parentName:"tr",align:"left"},"Description"))),(0,r.yg)("tbody",{parentName:"table"},(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"left"},"sessionTimeout"),(0,r.yg)("td",{parentName:"tr",align:"left"},"int"),(0,r.yg)("td",{parentName:"tr",align:"center"},"30000"),(0,r.yg)("td",{parentName:"tr",align:"center"},"No"),(0,r.yg)("td",{parentName:"tr",align:"left"},"session timeout(millisecond)")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"left"},"connectionTimeout"),(0,r.yg)("td",{parentName:"tr",align:"left"},"int"),(0,r.yg)("td",{parentName:"tr",align:"center"},"3000"),(0,r.yg)("td",{parentName:"tr",align:"center"},"No"),(0,r.yg)("td",{parentName:"tr",align:"left"},"connection timeout(millisecond)")))),(0,r.yg)("p",null,"When the registerType is ",(0,r.yg)("inlineCode",{parentName:"p"},"etcd"),", no properties are provided for the time being."),(0,r.yg)("p",null,"When the registerType is ",(0,r.yg)("inlineCode",{parentName:"p"},"nacos"),", the supported properties are as follows."),(0,r.yg)("table",null,(0,r.yg)("thead",{parentName:"table"},(0,r.yg)("tr",{parentName:"thead"},(0,r.yg)("th",{parentName:"tr",align:"left"},"Name"),(0,r.yg)("th",{parentName:"tr",align:"left"},"Type"),(0,r.yg)("th",{parentName:"tr",align:"center"},"Default"),(0,r.yg)("th",{parentName:"tr",align:"center"},"Required"),(0,r.yg)("th",{parentName:"tr",align:"left"},"Description"))),(0,r.yg)("tbody",{parentName:"table"},(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"left"},"nacosNameSpace"),(0,r.yg)("td",{parentName:"tr",align:"left"},"String"),(0,r.yg)("td",{parentName:"tr",align:"center"},"null"),(0,r.yg)("td",{parentName:"tr",align:"center"},"Yes"),(0,r.yg)("td",{parentName:"tr",align:"left"},"namespace")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"left"},"username"),(0,r.yg)("td",{parentName:"tr",align:"left"},"String"),(0,r.yg)("td",{parentName:"tr",align:"center"},'""'),(0,r.yg)("td",{parentName:"tr",align:"center"},"No"),(0,r.yg)("td",{parentName:"tr",align:"left"},"username")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"left"},"password"),(0,r.yg)("td",{parentName:"tr",align:"left"},"String"),(0,r.yg)("td",{parentName:"tr",align:"center"},'""'),(0,r.yg)("td",{parentName:"tr",align:"center"},"No"),(0,r.yg)("td",{parentName:"tr",align:"left"},"password")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"left"},"accessKey"),(0,r.yg)("td",{parentName:"tr",align:"left"},"String"),(0,r.yg)("td",{parentName:"tr",align:"center"},'""'),(0,r.yg)("td",{parentName:"tr",align:"center"},"No"),(0,r.yg)("td",{parentName:"tr",align:"left"},"accessKey")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"left"},"secretKey"),(0,r.yg)("td",{parentName:"tr",align:"left"},"String"),(0,r.yg)("td",{parentName:"tr",align:"center"},'""'),(0,r.yg)("td",{parentName:"tr",align:"center"},"No"),(0,r.yg)("td",{parentName:"tr",align:"left"},"secretKey")))),(0,r.yg)("p",null,"When the registerType is ",(0,r.yg)("inlineCode",{parentName:"p"},"consul"),", the supported properties are as follows."),(0,r.yg)("table",null,(0,r.yg)("thead",{parentName:"table"},(0,r.yg)("tr",{parentName:"thead"},(0,r.yg)("th",{parentName:"tr",align:"left"},"Name"),(0,r.yg)("th",{parentName:"tr",align:"left"},"Type"),(0,r.yg)("th",{parentName:"tr",align:"center"},"Default"),(0,r.yg)("th",{parentName:"tr",align:"center"},"Required"),(0,r.yg)("th",{parentName:"tr",align:"left"},"Description"))),(0,r.yg)("tbody",{parentName:"table"},(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"left"},"delay"),(0,r.yg)("td",{parentName:"tr",align:"left"},"int"),(0,r.yg)("td",{parentName:"tr",align:"center"},"1"),(0,r.yg)("td",{parentName:"tr",align:"center"},"No"),(0,r.yg)("td",{parentName:"tr",align:"left"},"The interval of each polling of monitoring metadata, in seconds, the default value is 1 second.")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"left"},"wait-time"),(0,r.yg)("td",{parentName:"tr",align:"left"},"int"),(0,r.yg)("td",{parentName:"tr",align:"center"},"55"),(0,r.yg)("td",{parentName:"tr",align:"center"},"No"),(0,r.yg)("td",{parentName:"tr",align:"left"},"# wait-time: The waiting time for each polling of metadata monitoring, in seconds, the default value is 55 second .")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"left"},"metadata-path"),(0,r.yg)("td",{parentName:"tr",align:"left"},"String"),(0,r.yg)("td",{parentName:"tr",align:"center"},(0,r.yg)("inlineCode",{parentName:"td"},"shenyu/register")),(0,r.yg)("td",{parentName:"tr",align:"center"},"No"),(0,r.yg)("td",{parentName:"tr",align:"left"},"Metadata path name, default is ",(0,r.yg)("inlineCode",{parentName:"td"},"shenyu/register"),".")))),(0,r.yg)("p",null,"When the registerType is ",(0,r.yg)("inlineCode",{parentName:"p"},"apollo"),", the supported properties are as follows."),(0,r.yg)("table",null,(0,r.yg)("thead",{parentName:"table"},(0,r.yg)("tr",{parentName:"thead"},(0,r.yg)("th",{parentName:"tr",align:"left"},"Name"),(0,r.yg)("th",{parentName:"tr",align:"left"},"Type"),(0,r.yg)("th",{parentName:"tr",align:"center"},"Default"),(0,r.yg)("th",{parentName:"tr",align:"center"},"Required"),(0,r.yg)("th",{parentName:"tr",align:"left"},"Description"))),(0,r.yg)("tbody",{parentName:"table"},(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"left"},"appId"),(0,r.yg)("td",{parentName:"tr",align:"left"},"String"),(0,r.yg)("td",{parentName:"tr",align:"center"},"null"),(0,r.yg)("td",{parentName:"tr",align:"center"},"Yes"),(0,r.yg)("td",{parentName:"tr",align:"left"},"Apollo appId")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"left"},"namespace"),(0,r.yg)("td",{parentName:"tr",align:"left"},"String"),(0,r.yg)("td",{parentName:"tr",align:"center"},"null"),(0,r.yg)("td",{parentName:"tr",align:"center"},"Yes"),(0,r.yg)("td",{parentName:"tr",align:"left"},"Apollo namespace")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"left"},"portalUrl"),(0,r.yg)("td",{parentName:"tr",align:"left"},"String"),(0,r.yg)("td",{parentName:"tr",align:"center"},"null"),(0,r.yg)("td",{parentName:"tr",align:"center"},"Yes"),(0,r.yg)("td",{parentName:"tr",align:"left"},"Apollo portalUrl")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"left"},"env"),(0,r.yg)("td",{parentName:"tr",align:"left"},"String"),(0,r.yg)("td",{parentName:"tr",align:"center"},"null"),(0,r.yg)("td",{parentName:"tr",align:"center"},"Yes"),(0,r.yg)("td",{parentName:"tr",align:"left"},"Apollo env")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"left"},"clusterName"),(0,r.yg)("td",{parentName:"tr",align:"left"},"String"),(0,r.yg)("td",{parentName:"tr",align:"center"},"null"),(0,r.yg)("td",{parentName:"tr",align:"center"},"Yes"),(0,r.yg)("td",{parentName:"tr",align:"left"},"Apollo clusterName")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"left"},"token"),(0,r.yg)("td",{parentName:"tr",align:"left"},"String"),(0,r.yg)("td",{parentName:"tr",align:"center"},"null"),(0,r.yg)("td",{parentName:"tr",align:"center"},"Yes"),(0,r.yg)("td",{parentName:"tr",align:"left"},"Apollo token")))),(0,r.yg)("h5",{id:"shenyusync-config"},"shenyu.sync config"),(0,r.yg)("p",null,"The Admin System and the Apache ShenYu gateway use data synchronization configurations."),(0,r.yg)("p",null,"The following properties are configured for data synchronization using ",(0,r.yg)("inlineCode",{parentName:"p"},"websocket")," :"),(0,r.yg)("table",null,(0,r.yg)("thead",{parentName:"table"},(0,r.yg)("tr",{parentName:"thead"},(0,r.yg)("th",{parentName:"tr",align:"left"},"Name"),(0,r.yg)("th",{parentName:"tr",align:"left"},"Type"),(0,r.yg)("th",{parentName:"tr",align:"center"},"Default"),(0,r.yg)("th",{parentName:"tr",align:"center"},"Required"),(0,r.yg)("th",{parentName:"tr",align:"left"},"Description"))),(0,r.yg)("tbody",{parentName:"table"},(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"left"},"enabled"),(0,r.yg)("td",{parentName:"tr",align:"left"},"boolean"),(0,r.yg)("td",{parentName:"tr",align:"center"},"true"),(0,r.yg)("td",{parentName:"tr",align:"center"},"No"),(0,r.yg)("td",{parentName:"tr",align:"left"},"whether to enable websocket for data synchronization.")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"left"},"messageMaxSize"),(0,r.yg)("td",{parentName:"tr",align:"left"},"int"),(0,r.yg)("td",{parentName:"tr",align:"center"},"0"),(0,r.yg)("td",{parentName:"tr",align:"center"},"No"),(0,r.yg)("td",{parentName:"tr",align:"left"},"Set the ",(0,r.yg)("inlineCode",{parentName:"td"},"websocket")," max buffer size in bytes.")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"left"},"allowOrigins"),(0,r.yg)("td",{parentName:"tr",align:"left"},"String"),(0,r.yg)("td",{parentName:"tr",align:"center"},'""'),(0,r.yg)("td",{parentName:"tr",align:"center"},"No"),(0,r.yg)("td",{parentName:"tr",align:"left"},"Set allowed ",(0,r.yg)("inlineCode",{parentName:"td"},"origins"),", multiple parameters separated by ",(0,r.yg)("inlineCode",{parentName:"td"},";"),".")))),(0,r.yg)("p",null,"The following properties are configured for data synchronization using ",(0,r.yg)("inlineCode",{parentName:"p"},"zookeeper")," :"),(0,r.yg)("table",null,(0,r.yg)("thead",{parentName:"table"},(0,r.yg)("tr",{parentName:"thead"},(0,r.yg)("th",{parentName:"tr",align:"left"},"Name"),(0,r.yg)("th",{parentName:"tr",align:"left"},"Type"),(0,r.yg)("th",{parentName:"tr",align:"center"},"Default"),(0,r.yg)("th",{parentName:"tr",align:"center"},"Required"),(0,r.yg)("th",{parentName:"tr",align:"left"},"Description"))),(0,r.yg)("tbody",{parentName:"table"},(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"left"},"url"),(0,r.yg)("td",{parentName:"tr",align:"left"},"String"),(0,r.yg)("td",{parentName:"tr",align:"center"},"null"),(0,r.yg)("td",{parentName:"tr",align:"center"},"Yes"),(0,r.yg)("td",{parentName:"tr",align:"left"},"zookeeper server url")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"left"},"sessionTimeout"),(0,r.yg)("td",{parentName:"tr",align:"left"},"int"),(0,r.yg)("td",{parentName:"tr",align:"center"},"null"),(0,r.yg)("td",{parentName:"tr",align:"center"},"Yes"),(0,r.yg)("td",{parentName:"tr",align:"left"},"session timeout(millisecond)")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"left"},"connectionTimeout"),(0,r.yg)("td",{parentName:"tr",align:"left"},"int"),(0,r.yg)("td",{parentName:"tr",align:"center"},"null"),(0,r.yg)("td",{parentName:"tr",align:"center"},"Yes"),(0,r.yg)("td",{parentName:"tr",align:"left"},"connection timeout(millisecond)")))),(0,r.yg)("p",null,"The following properties are configured for data synchronization using ",(0,r.yg)("inlineCode",{parentName:"p"},"http long polling")," :"),(0,r.yg)("table",null,(0,r.yg)("thead",{parentName:"table"},(0,r.yg)("tr",{parentName:"thead"},(0,r.yg)("th",{parentName:"tr",align:"left"},"Name"),(0,r.yg)("th",{parentName:"tr",align:"left"},"Type"),(0,r.yg)("th",{parentName:"tr",align:"center"},"Default"),(0,r.yg)("th",{parentName:"tr",align:"center"},"Required"),(0,r.yg)("th",{parentName:"tr",align:"left"},"Description"))),(0,r.yg)("tbody",{parentName:"table"},(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"left"},"enabled"),(0,r.yg)("td",{parentName:"tr",align:"left"},"boolean"),(0,r.yg)("td",{parentName:"tr",align:"center"},"true"),(0,r.yg)("td",{parentName:"tr",align:"center"},"No"),(0,r.yg)("td",{parentName:"tr",align:"left"},"whether to enable.")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"left"},"refreshInterval"),(0,r.yg)("td",{parentName:"tr",align:"left"},"int"),(0,r.yg)("td",{parentName:"tr",align:"center"},"5(minute)"),(0,r.yg)("td",{parentName:"tr",align:"center"},"No"),(0,r.yg)("td",{parentName:"tr",align:"left"},"Periodically fetch data from the database and load it into memory.")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"left"},"notifyBatchSize"),(0,r.yg)("td",{parentName:"tr",align:"left"},"int"),(0,r.yg)("td",{parentName:"tr",align:"center"},"100"),(0,r.yg)("td",{parentName:"tr",align:"center"},"No"),(0,r.yg)("td",{parentName:"tr",align:"left"},"notify clients in batches")))),(0,r.yg)("p",null,"The following properties are configured for data synchronization using ",(0,r.yg)("inlineCode",{parentName:"p"},"nacos")," :"),(0,r.yg)("table",null,(0,r.yg)("thead",{parentName:"table"},(0,r.yg)("tr",{parentName:"thead"},(0,r.yg)("th",{parentName:"tr",align:"left"},"Name"),(0,r.yg)("th",{parentName:"tr",align:"left"},"Type"),(0,r.yg)("th",{parentName:"tr",align:"center"},"Default"),(0,r.yg)("th",{parentName:"tr",align:"center"},"Required"),(0,r.yg)("th",{parentName:"tr",align:"left"},"Description"))),(0,r.yg)("tbody",{parentName:"table"},(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"left"},"url"),(0,r.yg)("td",{parentName:"tr",align:"left"},"String"),(0,r.yg)("td",{parentName:"tr",align:"center"},"null"),(0,r.yg)("td",{parentName:"tr",align:"center"},"\u662f"),(0,r.yg)("td",{parentName:"tr",align:"left"},"nacos url")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"left"},"namespace"),(0,r.yg)("td",{parentName:"tr",align:"left"},"String"),(0,r.yg)("td",{parentName:"tr",align:"center"},"null"),(0,r.yg)("td",{parentName:"tr",align:"center"},"Yes"),(0,r.yg)("td",{parentName:"tr",align:"left"},"namespace")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"left"},"username"),(0,r.yg)("td",{parentName:"tr",align:"left"},"String"),(0,r.yg)("td",{parentName:"tr",align:"center"},"null"),(0,r.yg)("td",{parentName:"tr",align:"center"},"No"),(0,r.yg)("td",{parentName:"tr",align:"left"},"username")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"left"},"password"),(0,r.yg)("td",{parentName:"tr",align:"left"},"String"),(0,r.yg)("td",{parentName:"tr",align:"center"},"null"),(0,r.yg)("td",{parentName:"tr",align:"center"},"No"),(0,r.yg)("td",{parentName:"tr",align:"left"},"password")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"left"},"acm"),(0,r.yg)("td",{parentName:"tr",align:"left"}),(0,r.yg)("td",{parentName:"tr",align:"center"}),(0,r.yg)("td",{parentName:"tr",align:"center"},"No"),(0,r.yg)("td",{parentName:"tr",align:"left"},"aliyun ACM service configuration")))),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("inlineCode",{parentName:"li"},"acm")," config")),(0,r.yg)("table",null,(0,r.yg)("thead",{parentName:"table"},(0,r.yg)("tr",{parentName:"thead"},(0,r.yg)("th",{parentName:"tr",align:"left"},"Name"),(0,r.yg)("th",{parentName:"tr",align:"left"},"Type"),(0,r.yg)("th",{parentName:"tr",align:"center"},"Default"),(0,r.yg)("th",{parentName:"tr",align:"center"},"Required"),(0,r.yg)("th",{parentName:"tr",align:"left"},"Description"))),(0,r.yg)("tbody",{parentName:"table"},(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"left"},"enabled"),(0,r.yg)("td",{parentName:"tr",align:"left"},"boolean"),(0,r.yg)("td",{parentName:"tr",align:"center"},"false"),(0,r.yg)("td",{parentName:"tr",align:"center"},"No"),(0,r.yg)("td",{parentName:"tr",align:"left"},"whether to enable")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"left"},"endpoint"),(0,r.yg)("td",{parentName:"tr",align:"left"},"String"),(0,r.yg)("td",{parentName:"tr",align:"center"},"null"),(0,r.yg)("td",{parentName:"tr",align:"center"},"No"),(0,r.yg)("td",{parentName:"tr",align:"left"},"ACM service address")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"left"},"namespace"),(0,r.yg)("td",{parentName:"tr",align:"left"},"String"),(0,r.yg)("td",{parentName:"tr",align:"center"},"null"),(0,r.yg)("td",{parentName:"tr",align:"center"},"No"),(0,r.yg)("td",{parentName:"tr",align:"left"},"namespace")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"left"},"accessKey"),(0,r.yg)("td",{parentName:"tr",align:"left"},"String"),(0,r.yg)("td",{parentName:"tr",align:"center"},"null"),(0,r.yg)("td",{parentName:"tr",align:"center"},"No"),(0,r.yg)("td",{parentName:"tr",align:"left"},"accessKey")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"left"},"secretKey"),(0,r.yg)("td",{parentName:"tr",align:"left"},"String"),(0,r.yg)("td",{parentName:"tr",align:"center"},"null"),(0,r.yg)("td",{parentName:"tr",align:"center"},"No"),(0,r.yg)("td",{parentName:"tr",align:"left"},"secretKey")))),(0,r.yg)("p",null,"The following properties are configured for data synchronization using ",(0,r.yg)("inlineCode",{parentName:"p"},"etcd")," :"),(0,r.yg)("table",null,(0,r.yg)("thead",{parentName:"table"},(0,r.yg)("tr",{parentName:"thead"},(0,r.yg)("th",{parentName:"tr",align:"left"},"Name"),(0,r.yg)("th",{parentName:"tr",align:"left"},"Type"),(0,r.yg)("th",{parentName:"tr",align:"center"},"Default"),(0,r.yg)("th",{parentName:"tr",align:"center"},"Required"),(0,r.yg)("th",{parentName:"tr",align:"left"},"Description"))),(0,r.yg)("tbody",{parentName:"table"},(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"left"},"url"),(0,r.yg)("td",{parentName:"tr",align:"left"},"String"),(0,r.yg)("td",{parentName:"tr",align:"center"},"null"),(0,r.yg)("td",{parentName:"tr",align:"center"},"Yes"),(0,r.yg)("td",{parentName:"tr",align:"left"},"etcd url")))),(0,r.yg)("p",null,"The following properties are configured for data synchronization using ",(0,r.yg)("inlineCode",{parentName:"p"},"consul")," :"),(0,r.yg)("table",null,(0,r.yg)("thead",{parentName:"table"},(0,r.yg)("tr",{parentName:"thead"},(0,r.yg)("th",{parentName:"tr",align:"left"},"Name"),(0,r.yg)("th",{parentName:"tr",align:"left"},"Type"),(0,r.yg)("th",{parentName:"tr",align:"center"},"Default"),(0,r.yg)("th",{parentName:"tr",align:"center"},"Required"),(0,r.yg)("th",{parentName:"tr",align:"left"},"Description"))),(0,r.yg)("tbody",{parentName:"table"},(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"left"},"url"),(0,r.yg)("td",{parentName:"tr",align:"left"},"String"),(0,r.yg)("td",{parentName:"tr",align:"center"},"null"),(0,r.yg)("td",{parentName:"tr",align:"center"},"Yes"),(0,r.yg)("td",{parentName:"tr",align:"left"},"consul url")))),(0,r.yg)("h5",{id:"shenyuaessecret-config"},"shenyu.aes.secret config"),(0,r.yg)("p",null,"aes secret properties:"),(0,r.yg)("table",null,(0,r.yg)("thead",{parentName:"table"},(0,r.yg)("tr",{parentName:"thead"},(0,r.yg)("th",{parentName:"tr",align:"left"},"Name"),(0,r.yg)("th",{parentName:"tr",align:"left"},"Type"),(0,r.yg)("th",{parentName:"tr",align:"center"},"Default"),(0,r.yg)("th",{parentName:"tr",align:"center"},"Required"),(0,r.yg)("th",{parentName:"tr",align:"left"},"Description"))),(0,r.yg)("tbody",{parentName:"table"},(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"left"},"key"),(0,r.yg)("td",{parentName:"tr",align:"left"},"String"),(0,r.yg)("td",{parentName:"tr",align:"center"},(0,r.yg)("inlineCode",{parentName:"td"},"2095132720951327")),(0,r.yg)("td",{parentName:"tr",align:"center"},"No"),(0,r.yg)("td",{parentName:"tr",align:"left"},"key")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"left"},"iv"),(0,r.yg)("td",{parentName:"tr",align:"left"},"String"),(0,r.yg)("td",{parentName:"tr",align:"center"},"null"),(0,r.yg)("td",{parentName:"tr",align:"center"},"No"),(0,r.yg)("td",{parentName:"tr",align:"left"},"iv")))),(0,r.yg)("h5",{id:"shenyuldap-config"},"shenyu.ldap config"),(0,r.yg)("p",null,"Spring ldap properties:"),(0,r.yg)("table",null,(0,r.yg)("thead",{parentName:"table"},(0,r.yg)("tr",{parentName:"thead"},(0,r.yg)("th",{parentName:"tr",align:"left"},"Name"),(0,r.yg)("th",{parentName:"tr",align:"left"},"Type"),(0,r.yg)("th",{parentName:"tr",align:"center"},"Default"),(0,r.yg)("th",{parentName:"tr",align:"center"},"Required"),(0,r.yg)("th",{parentName:"tr",align:"left"},"Description"))),(0,r.yg)("tbody",{parentName:"table"},(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"left"},"enabled"),(0,r.yg)("td",{parentName:"tr",align:"left"},"boolean"),(0,r.yg)("td",{parentName:"tr",align:"center"},"true"),(0,r.yg)("td",{parentName:"tr",align:"center"},"No"),(0,r.yg)("td",{parentName:"tr",align:"left"},"whether to enable")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"left"},"url"),(0,r.yg)("td",{parentName:"tr",align:"left"},"String"),(0,r.yg)("td",{parentName:"tr",align:"center"},"null"),(0,r.yg)("td",{parentName:"tr",align:"center"},"No"),(0,r.yg)("td",{parentName:"tr",align:"left"},"ldap url")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"left"},"bind-dn"),(0,r.yg)("td",{parentName:"tr",align:"left"},"String"),(0,r.yg)("td",{parentName:"tr",align:"center"},"null"),(0,r.yg)("td",{parentName:"tr",align:"center"},"No"),(0,r.yg)("td",{parentName:"tr",align:"left"},"UserDn")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"left"},"password"),(0,r.yg)("td",{parentName:"tr",align:"left"},"String"),(0,r.yg)("td",{parentName:"tr",align:"center"},"null"),(0,r.yg)("td",{parentName:"tr",align:"center"},"No"),(0,r.yg)("td",{parentName:"tr",align:"left"},"password")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"left"},"base-dn"),(0,r.yg)("td",{parentName:"tr",align:"left"},"String"),(0,r.yg)("td",{parentName:"tr",align:"center"},"null"),(0,r.yg)("td",{parentName:"tr",align:"center"},"No"),(0,r.yg)("td",{parentName:"tr",align:"left"},"searchBase")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"left"},"object-class"),(0,r.yg)("td",{parentName:"tr",align:"left"},"String"),(0,r.yg)("td",{parentName:"tr",align:"center"},(0,r.yg)("inlineCode",{parentName:"td"},"person")),(0,r.yg)("td",{parentName:"tr",align:"center"},"No"),(0,r.yg)("td",{parentName:"tr",align:"left"},"filter")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"left"},"login-field"),(0,r.yg)("td",{parentName:"tr",align:"left"},"String"),(0,r.yg)("td",{parentName:"tr",align:"center"},(0,r.yg)("inlineCode",{parentName:"td"},"cn")),(0,r.yg)("td",{parentName:"tr",align:"center"},"No"),(0,r.yg)("td",{parentName:"tr",align:"left"},"searchBase")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"left"},"connectTimeout"),(0,r.yg)("td",{parentName:"tr",align:"left"},"int"),(0,r.yg)("td",{parentName:"tr",align:"center"},"3000"),(0,r.yg)("td",{parentName:"tr",align:"center"},"No"),(0,r.yg)("td",{parentName:"tr",align:"left"},"connect timeout(millisecond)")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"left"},"readTimeout"),(0,r.yg)("td",{parentName:"tr",align:"left"},"int"),(0,r.yg)("td",{parentName:"tr",align:"center"},"3000"),(0,r.yg)("td",{parentName:"tr",align:"center"},"No"),(0,r.yg)("td",{parentName:"tr",align:"left"},"read timeout(millisecond)")))),(0,r.yg)("h5",{id:"shenyujwt-config"},"shenyu.jwt config"),(0,r.yg)("p",null,(0,r.yg)("inlineCode",{parentName:"p"},"jwt")," properties:"),(0,r.yg)("table",null,(0,r.yg)("thead",{parentName:"table"},(0,r.yg)("tr",{parentName:"thead"},(0,r.yg)("th",{parentName:"tr",align:"left"},"Name"),(0,r.yg)("th",{parentName:"tr",align:"left"},"Type"),(0,r.yg)("th",{parentName:"tr",align:"center"},"Default"),(0,r.yg)("th",{parentName:"tr",align:"center"},"Required"),(0,r.yg)("th",{parentName:"tr",align:"left"},"Description"))),(0,r.yg)("tbody",{parentName:"table"},(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"left"},"expired-seconds"),(0,r.yg)("td",{parentName:"tr",align:"left"},"long"),(0,r.yg)("td",{parentName:"tr",align:"center"},"24 ",(0,r.yg)("em",{parentName:"td"},"60")," 60 * 1000L"),(0,r.yg)("td",{parentName:"tr",align:"center"},"No"),(0,r.yg)("td",{parentName:"tr",align:"left"},"expiration time(millisecond)")))),(0,r.yg)("h5",{id:"shenyushiro-config"},"shenyu.shiro config"),(0,r.yg)("p",null,(0,r.yg)("inlineCode",{parentName:"p"},"shiro")," properties:"),(0,r.yg)("table",null,(0,r.yg)("thead",{parentName:"table"},(0,r.yg)("tr",{parentName:"thead"},(0,r.yg)("th",{parentName:"tr",align:"left"},"Name"),(0,r.yg)("th",{parentName:"tr",align:"left"},"Type"),(0,r.yg)("th",{parentName:"tr",align:"center"},"Default"),(0,r.yg)("th",{parentName:"tr",align:"center"},"Required"),(0,r.yg)("th",{parentName:"tr",align:"left"},"Description"))),(0,r.yg)("tbody",{parentName:"table"},(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"left"},"white-list"),(0,r.yg)("td",{parentName:"tr",align:"left"},"List"),(0,r.yg)("td",{parentName:"tr",align:"center"},"null"),(0,r.yg)("td",{parentName:"tr",align:"center"},"No"),(0,r.yg)("td",{parentName:"tr",align:"left"},"white list")))))}d.isMDXComponent=!0}}]);