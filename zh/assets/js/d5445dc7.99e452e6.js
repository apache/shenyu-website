"use strict";(self.webpackChunkshenyu_website=self.webpackChunkshenyu_website||[]).push([[20559],{15680:(e,n,t)=>{t.d(n,{xA:()=>g,yg:()=>y});var r=t(96540);function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function o(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function i(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?o(Object(t),!0).forEach((function(n){a(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function l(e,n){if(null==e)return{};var t,r,a=function(e,n){if(null==e)return{};var t,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var s=r.createContext({}),c=function(e){var n=r.useContext(s),t=n;return e&&(t="function"==typeof e?e(n):i(i({},n),e)),t},g=function(e){var n=c(e.components);return r.createElement(s.Provider,{value:n},e.children)},u="mdxType",p={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},m=r.forwardRef((function(e,n){var t=e.components,a=e.mdxType,o=e.originalType,s=e.parentName,g=l(e,["components","mdxType","originalType","parentName"]),u=c(t),m=a,y=u["".concat(s,".").concat(m)]||u[m]||p[m]||o;return t?r.createElement(y,i(i({ref:n},g),{},{components:t})):r.createElement(y,i({ref:n},g))}));function y(e,n){var t=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var o=t.length,i=new Array(o);i[0]=m;var l={};for(var s in n)hasOwnProperty.call(n,s)&&(l[s]=n[s]);l.originalType=e,l[u]="string"==typeof e?e:a,i[1]=l;for(var c=2;c<o;c++)i[c]=t[c];return r.createElement.apply(null,i)}return r.createElement.apply(null,t)}m.displayName="MDXCreateElement"},28351:(e,n,t)=>{t.r(n),t.d(n,{contentTitle:()=>i,default:()=>u,frontMatter:()=>o,metadata:()=>l,toc:()=>s});var r=t(58168),a=(t(96540),t(15680));const o={title:"Zookeeper\u793a\u4f8b"},i=void 0,l={unversionedId:"zookeeper",id:"version-1.0.0/zookeeper",isDocsHomePage:!1,title:"Zookeeper\u793a\u4f8b",description:"\u4ee5Zookeeper\u65b9\u5f0f\u6ce8\u518c\u5230ShenYu\u7f51\u5173",source:"@site/i18n/zh/docusaurus-plugin-content-docs-shenyuClientGolang/version-1.0.0/zookeeper.md",sourceDirName:".",slug:"/zookeeper",permalink:"/zh/shenyuClientGolang/zookeeper",version:"1.0.0",lastUpdatedBy:"xcsnx",lastUpdatedAt:1741848513,formattedLastUpdatedAt:"2025/3/13",frontMatter:{title:"Zookeeper\u793a\u4f8b"},sidebar:"version-1.0.0/tutorialSidebar",previous:{title:"Nacos\u793a\u4f8b",permalink:"/zh/shenyuClientGolang/nacos"}},s=[{value:"\u4ee5Zookeeper\u65b9\u5f0f\u6ce8\u518c\u5230ShenYu\u7f51\u5173",id:"\u4ee5zookeeper\u65b9\u5f0f\u6ce8\u518c\u5230shenyu\u7f51\u5173",children:[]},{value:"\u5b8c\u6574\u7684\u6210\u529f\u65e5\u5fd7",id:"\u5b8c\u6574\u7684\u6210\u529f\u65e5\u5fd7",children:[]}],c={toc:s},g="wrapper";function u(e){let{components:n,...t}=e;return(0,a.yg)(g,(0,r.A)({},c,t,{components:n,mdxType:"MDXLayout"}),(0,a.yg)("h2",{id:"\u4ee5zookeeper\u65b9\u5f0f\u6ce8\u518c\u5230shenyu\u7f51\u5173"},"\u4ee5Zookeeper\u65b9\u5f0f\u6ce8\u518c\u5230ShenYu\u7f51\u5173"),(0,a.yg)("p",null,(0,a.yg)("strong",{parentName:"p"},"1.\u9996\u5148\u786e\u4fdd\u4f60\u7684Zookeeper\u73af\u5883\u662f\u6b63\u786e\uff0c\u7136\u540e\u8bbe\u7f6e\u8fd9\u4e9bZookeeper\u5fc5\u8981\u7684\u53c2\u6570 .")),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-go"},'    //\u5f00\u59cb\u521b\u5efaShenYuZkClient \n    zcp := &zk_client.ZkClientParam{\n    ZkServers: []string{"127.0.0.1:2181"}, //\u9700\u8981\u7528\u6237\u63d0\u4f9b\n    ZkRoot:    "/api",                     //\u9700\u8981\u7528\u6237\u63d0\u4f9b\n    }\n    \n    sdkClient := shenyu_sdk_client.GetFactoryClient(constants.ZOOKEEPER_CLIENT)\n    client, createResult, err := sdkClient.NewClient(zcp)\n    \n    if !createResult && err != nil {\n    logger.Fatal("Create ShenYuZkClient error : %v", err)\n    }\n    \n    zc := client.(*zk_client.ShenYuZkClient)\n    defer zc.Close()\n')),(0,a.yg)("p",null,(0,a.yg)("strong",{parentName:"p"},"2.  \u51c6\u5907\u4f60\u8981\u6ce8\u518c\u670d\u52a1\u7684\u5143\u6570\u636e\u4fe1\u606f")),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-go"},'//\u5143\u6570\u636e\u662f\u5fc5\u8981\u7684\u53c2\u6570\uff0c\u8fd9\u5c06\u6ce8\u518c\u5230shenyu\u7f51\u5173\u4f7f\u7528\n    metaData1 := &model.MetaDataRegister{\n        AppName: "testMetaDataRegister1", //\u9700\u8981\u7528\u6237\u63d0\u4f9b\n        Path:    "your/path1",            //\u9700\u8981\u7528\u6237\u63d0\u4f9b\n        Enabled: true,                    //\u9700\u8981\u7528\u6237\u63d0\u4f9b\n        Host:    "127.0.0.1",             //\u9700\u8981\u7528\u6237\u63d0\u4f9b\n        Port:    "8080",                  //\u9700\u8981\u7528\u6237\u63d0\u4f9b\n    }\n    \n    metaData2 := &model.MetaDataRegister{\n        AppName: "testMetaDataRegister2", //\u9700\u8981\u7528\u6237\u63d0\u4f9b\n        Path:    "your/path2",            //\u9700\u8981\u7528\u6237\u63d0\u4f9b\n        Enabled: true,                    //\u9700\u8981\u7528\u6237\u63d0\u4f9b\n        Host:    "127.0.0.1",             //\u9700\u8981\u7528\u6237\u63d0\u4f9b\n        Port:    "8181",                  //\u9700\u8981\u7528\u6237\u63d0\u4f9b\n    }\n')),(0,a.yg)("p",null,(0,a.yg)("strong",{parentName:"p"},"3.\u4f7f\u7528\u5ba2\u6237\u7aef\u8fdb\u884c\u8282\u70b9\u4fe1\u606f\u6ce8\u518c")),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-go"},'   //\u53ef\u4ee5\u8fdb\u884c\u591a\u4e2a\u5b9e\u4f8b\u6ce8\u518c\n    registerResult1, err := zc.RegisterServiceInstance(metaData1)\n        if !registerResult1 && err != nil {\n             logger.Fatal("Register zk Instance error : %v", err)\n        }\n    \n    registerResult2, err := zc.RegisterServiceInstance(metaData2)\n        if !registerResult2 && err != nil {\n             logger.Fatal("Register zk Instance error : %v", err)\n        }\n    //\u505a\u4f60\u7684\u903b\u8f91\u5904\u7406\n')),(0,a.yg)("p",null,(0,a.yg)("strong",{parentName:"p"},"4.\u4f7f\u7528\u5ba2\u6237\u7aef\u8fdb\u884c\u6ce8\u518c\u8282\u70b9\u4fe1\u606f\u5220\u9664")),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-go"},"    //\u9009\u62e9\u6027\u8c03\u7528\n    deRegisterResult1, err := zc.DeregisterServiceInstance(metaData1)\n        if err != nil {\n            panic(err)\n        }\n\n    deRegisterResult2, err := zc.DeregisterServiceInstance(metaData2)\n        if err != nil {\n            panic(err)\n        }\n")),(0,a.yg)("p",null,(0,a.yg)("strong",{parentName:"p"},"5.\u4f7f\u7528\u5ba2\u6237\u7aef\u83b7\u53d6\u6ce8\u518c\u8282\u70b9\u7684\u4fe1\u606f")),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-go"},'   //\u5f00\u59cb\u8c03\u7528GetServiceInstanceInfo\n    instanceDetail, err := zc.GetServiceInstanceInfo(metaData1)\n    nodes1, ok := instanceDetail.([]*model.MetaDataRegister)\n    if !ok {\n    logger.Fatal("get zk client metaData error %v:", err)\n    }\n    \n    //range nodes\n    for index, node := range nodes1 {\n        nodeJson, err := json.Marshal(node)\n        if err == nil {\n        logger.Info("GetNodesInfo ,success Index", index, string(nodeJson))\n        }\n}\n\n    instanceDetail2, err := zc.GetServiceInstanceInfo(metaData2)\n    nodes2, ok := instanceDetail2.([]*model.MetaDataRegister)\n    if !ok {\n    logger.Fatal("get zk client metaData error %v:", err)\n    }\n\n')),(0,a.yg)("h2",{id:"\u5b8c\u6574\u7684\u6210\u529f\u65e5\u5fd7"},"\u5b8c\u6574\u7684\u6210\u529f\u65e5\u5fd7"),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-go"},'2022-07-13 16:09:31 [INFO] [github.com/shenyu-client-golang/example/zk_client/main.go:105] GetNodesInfo ,success Index 0 {"appName":"testMetaDataRegister1","path":"your/path1","contextPath":"","ruleName":"","rpcType":"","enabled":true,"host":"127.0.0.1","port":"8080","pluginNames":null,"registerMetaData":false,"timeMillis":0}\n2022-07-13 16:09:31 [INFO] [github.com/shenyu-client-golang/example/zk_client/main.go:119] GetNodesInfo ,success Index 0 {"appName":"testMetaDataRegister2","path":"your/path2","contextPath":"","ruleName":"","rpcType":"","enabled":true,"host":"127.0.0.1","port":"8181","pluginNames":null,"registerMetaData":false,"timeMillis":0}\n2022-07-13 16:09:31 [INFO] [github.com/shenyu-client-golang/example/zk_client/main.go:132] GetNodesInfo ,success Index 0 {"appName":"testMetaDataRegister3","path":"your/path3","contextPath":"","ruleName":"","rpcType":"","enabled":true,"host":"127.0.0.1","port":"8282","pluginNames":null,"registerMetaData":false,"timeMillis":0}\n2022-07-13 16:09:31 [INFO] [github.com/shenyu-client-golang/example/zk_client/main.go:139] > DeregisterServiceInstance start\n2022-07-13 16:09:31 [INFO] [github.com/shenyu-client-golang/clients/zk_client/zk_client.go:213] ensureName check, path is -> /api/testMetaDataRegister1\n2022-07-13 16:09:31 [INFO] [github.com/shenyu-client-golang/clients/zk_client/zk_client.go:215] ensureName check result is -> true\n2022-07-13 16:09:31 [INFO] [github.com/shenyu-client-golang/clients/zk_client/zk_client.go:213] ensureName check, path is -> /api/testMetaDataRegister2\n2022-07-13 16:09:31 [INFO] [github.com/shenyu-client-golang/clients/zk_client/zk_client.go:215] ensureName check result is -> true\n2022-07-13 16:09:31 [INFO] [github.com/shenyu-client-golang/clients/zk_client/zk_client.go:213] ensureName check, path is -> /api/testMetaDataRegister3\n2022-07-13 16:09:31 [INFO] [github.com/shenyu-client-golang/clients/zk_client/zk_client.go:215] ensureName check result is -> true\n2022-07-13 16:09:31 [INFO] [github.com/shenyu-client-golang/example/zk_client/main.go:156] DeregisterServiceInstance success !\n')))}u.isMDXComponent=!0}}]);