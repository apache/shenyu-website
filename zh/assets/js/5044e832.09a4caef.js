"use strict";(self.webpackChunkshenyu_website=self.webpackChunkshenyu_website||[]).push([[51352],{15680:(e,a,t)=>{t.d(a,{xA:()=>g,yg:()=>u});var l=t(96540);function n(e,a,t){return a in e?Object.defineProperty(e,a,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[a]=t,e}function r(e,a){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);a&&(l=l.filter((function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable}))),t.push.apply(t,l)}return t}function i(e){for(var a=1;a<arguments.length;a++){var t=null!=arguments[a]?arguments[a]:{};a%2?r(Object(t),!0).forEach((function(a){n(e,a,t[a])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):r(Object(t)).forEach((function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(t,a))}))}return e}function o(e,a){if(null==e)return{};var t,l,n=function(e,a){if(null==e)return{};var t,l,n={},r=Object.keys(e);for(l=0;l<r.length;l++)t=r[l],a.indexOf(t)>=0||(n[t]=e[t]);return n}(e,a);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(l=0;l<r.length;l++)t=r[l],a.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(n[t]=e[t])}return n}var p=l.createContext({}),y=function(e){var a=l.useContext(p),t=a;return e&&(t="function"==typeof e?e(a):i(i({},a),e)),t},g=function(e){var a=y(e.components);return l.createElement(p.Provider,{value:a},e.children)},s="mdxType",m={inlineCode:"code",wrapper:function(e){var a=e.children;return l.createElement(l.Fragment,{},a)}},c=l.forwardRef((function(e,a){var t=e.components,n=e.mdxType,r=e.originalType,p=e.parentName,g=o(e,["components","mdxType","originalType","parentName"]),s=y(t),c=n,u=s["".concat(p,".").concat(c)]||s[c]||m[c]||r;return t?l.createElement(u,i(i({ref:a},g),{},{components:t})):l.createElement(u,i({ref:a},g))}));function u(e,a){var t=arguments,n=a&&a.mdxType;if("string"==typeof e||n){var r=t.length,i=new Array(r);i[0]=c;var o={};for(var p in a)hasOwnProperty.call(a,p)&&(o[p]=a[p]);o.originalType=e,o[s]="string"==typeof e?e:n,i[1]=o;for(var y=2;y<r;y++)i[y]=t[y];return l.createElement.apply(null,i)}return l.createElement.apply(null,t)}c.displayName="MDXCreateElement"},10200:(e,a,t)=>{t.r(a),t.d(a,{contentTitle:()=>i,default:()=>s,frontMatter:()=>r,metadata:()=>o,toc:()=>p});var l=t(58168),n=(t(96540),t(15680));const r={title:"2.6.1",sidebar_position:3,keywords:["release-notes"],description:"release-notes"},i=void 0,o={unversionedId:"2.6.1-release",id:"2.6.1-release",isDocsHomePage:!1,title:"2.6.1",description:"release-notes",source:"@site/i18n/zh/docusaurus-plugin-content-docs-event/current/2.6.1-release.md",sourceDirName:".",slug:"/2.6.1-release",permalink:"/zh/event/2.6.1-release",editUrl:"https://github.com/apache/shenyu-website/edit/main/i18n/zh/docusaurus-plugin-content-docs-event/current/2.6.1-release.md",version:"current",lastUpdatedBy:"aias00",lastUpdatedAt:1736995477,formattedLastUpdatedAt:"2025/1/16",sidebarPosition:3,frontMatter:{title:"2.6.1",sidebar_position:3,keywords:["release-notes"],description:"release-notes"}},p=[{value:"2.6.1",id:"261",children:[{value:"New Features",id:"new-features",children:[]},{value:"API Changes",id:"api-changes",children:[]},{value:"Enhancement",id:"enhancement",children:[]},{value:"Refactor",id:"refactor",children:[]},{value:"Bug Fix",id:"bug-fix",children:[]}]}],y={toc:p},g="wrapper";function s(e){let{components:a,...t}=e;return(0,n.yg)(g,(0,l.A)({},y,t,{components:a,mdxType:"MDXLayout"}),(0,n.yg)("h2",{id:"261"},"2.6.1"),(0,n.yg)("h3",{id:"new-features"},"New Features"),(0,n.yg)("ol",null,(0,n.yg)("li",{parentName:"ol"},(0,n.yg)("p",{parentName:"li"},"\u6dfb\u52a0Dubbo\u6dfb\u52a0Ingress controller\u652f\u6301")),(0,n.yg)("li",{parentName:"ol"},(0,n.yg)("p",{parentName:"li"},"\u652f\u6301\u63d2\u4ef6\u751f\u547d\u5468\u671f")),(0,n.yg)("li",{parentName:"ol"},(0,n.yg)("p",{parentName:"li"},"\u6dfb\u52a0shenyu-sdk-openfeign\u6a21\u5757")),(0,n.yg)("li",{parentName:"ol"},(0,n.yg)("p",{parentName:"li"},"\u6dfb\u52a0Motan\u548cSpring Cloud\u6dfb\u52a0Ingress controller\u652f\u6301")),(0,n.yg)("li",{parentName:"ol"},(0,n.yg)("p",{parentName:"li"},"shenyu\u652f\u6301\u544a\u8b66\u529f\u80fd")),(0,n.yg)("li",{parentName:"ol"},(0,n.yg)("p",{parentName:"li"},"shenyu client\u6dfb\u52a0discovery\u7684\u6ce8\u518c\u4e2d\u5fc3")),(0,n.yg)("li",{parentName:"ol"},(0,n.yg)("p",{parentName:"li"},"\u6dfb\u52a0shenyu context-path Ingress controller")),(0,n.yg)("li",{parentName:"ol"},(0,n.yg)("p",{parentName:"li"},"\u6dfb\u52a0shenyu grpc Ingress controller")),(0,n.yg)("li",{parentName:"ol"},(0,n.yg)("p",{parentName:"li"},"\u6dfb\u52a0shenyu sofa Ingress controller")),(0,n.yg)("li",{parentName:"ol"},(0,n.yg)("p",{parentName:"li"},"\u6dfb\u52a0nacos, etcd, eureka\u4f5c\u4e3ashenyu discovery\u670d\u52a1\u6ce8\u518c\u4e2d\u5fc3")),(0,n.yg)("li",{parentName:"ol"},(0,n.yg)("p",{parentName:"li"},"\u6dfb\u52a0\u65b0\u7684\u63d2\u4ef6\uff1abasic-plugin")),(0,n.yg)("li",{parentName:"ol"},(0,n.yg)("p",{parentName:"li"},"\u6dfb\u52a0\u65b0\u63d2\u4ef6\uff1ashenyu-rabbitmq-logging plugin")),(0,n.yg)("li",{parentName:"ol"},(0,n.yg)("p",{parentName:"li"},"\u901a\u8fc7shenyu-discovery\u7ed1\u5b9aselector"))),(0,n.yg)("h3",{id:"api-changes"},"API Changes"),(0,n.yg)("ol",null,(0,n.yg)("li",{parentName:"ol"},(0,n.yg)("p",{parentName:"li"},"\u91cd\u6784shenyu\u6570\u636e\u540c\u6b65\u7684\u6570\u636e\u7ed3\u6784"),(0,n.yg)("pre",{parentName:"li"},(0,n.yg)("code",{parentName:"pre"},'plugin.list ["plugin.sign", "plugin.dubbo", "plugin.pluginName"]\n-> plugin.sign\n-> plugin.dubbo\n-> plugin.pluginName\n\nexamples data:\nselector.key1.list ["selector.key1.value1", "selector.key1.value2", "selector.key1.value3"]\n-> selector.key1.value1\n-> selector.key1.value2\n-> selector.key1.value3\n\nselector.key2.list ["selector.key2.value1", "selector.key2.value2", "selector.key2.value3"]\n-> selector.key2.value4\n-> selector.key2.value5\n-> selector.key2.value6\n'))),(0,n.yg)("li",{parentName:"ol"},(0,n.yg)("p",{parentName:"li"},"\u4f7f\u7528netty\u4f5c\u4e3a\u9ed8\u8ba4\u7684httpclient")),(0,n.yg)("li",{parentName:"ol"},(0,n.yg)("p",{parentName:"li"},"\u91cd\u6784shenyu-admin-listener\u6765\u652f\u6301shenyu admin\u6570\u636e\u540c\u6b65")),(0,n.yg)("li",{parentName:"ol"},(0,n.yg)("p",{parentName:"li"},"\u5220\u9664shenyu\u5bf9brpc\u7684\u652f\u6301\uff0c\u5305\u62ecbrpc\u63d2\u4ef6\uff0cbrpc\u793a\u4f8b\uff0cbrpc\u96c6\u6210\u6d4b\u8bd5")),(0,n.yg)("li",{parentName:"ol"},(0,n.yg)("p",{parentName:"li"},"\u79fb\u9664Apollo\u7684\u4f9d\u8d56\u4ee5\u4fbf\u652f\u6301Java 17(\u81ea\u884c\u6dfb\u52a0\u4f9d\u8d56)")),(0,n.yg)("li",{parentName:"ol"},(0,n.yg)("p",{parentName:"li"},"\u5220\u9664shenyu\u7684\u4e2d\u95f4\u4ef6register center"))),(0,n.yg)("h3",{id:"enhancement"},"Enhancement"),(0,n.yg)("ol",null,(0,n.yg)("li",{parentName:"ol"},"\u4e3ashenyu model event\u6dfb\u52a0\u6d4b\u8bd5\u7528\u4f8b"),(0,n.yg)("li",{parentName:"ol"},"\u6dfb\u52a0shenyu selector\u6d4b\u8bd5\u7528\u4f8b"),(0,n.yg)("li",{parentName:"ol"},"\u6dfb\u52a0motan\u7684\u7aef\u5230\u7aef\u6d4b\u8bd5\u7528\u4f8b"),(0,n.yg)("li",{parentName:"ol"},"\u652f\u6301motan\u63d2\u4ef6\u9009\u62e9\u534f\u8bae"),(0,n.yg)("li",{parentName:"ol"},"\u6dfb\u52a0Grpc\u7684\u7aef\u5230\u7aef\u6d4b\u8bd5\u7528\u4f8b"),(0,n.yg)("li",{parentName:"ol"},"\u5347\u7ea7apache-rat-plugin\u7248\u672c\u52300.15"),(0,n.yg)("li",{parentName:"ol"},"\u5728\u5339\u914d\u65f6\u5730\u5740isBlank\u6761\u4ef6\u5339\u914d"),(0,n.yg)("li",{parentName:"ol"},"Clickhouse\u652f\u6301ttl\u5b57\u6bb5"),(0,n.yg)("li",{parentName:"ol"},"\u652f\u6301HttpUtils\u7684\u65e5\u5fd7\u7ea7\u522b\u5224\u65ad"),(0,n.yg)("li",{parentName:"ol"},"\u4e3aIngress Reconciler\u6dfb\u52a0\u5355\u5143\u6d4b\u8bd5"),(0,n.yg)("li",{parentName:"ol"},"\u5f53\u8f6f\u4ef6\u5305\u5206\u53d1\u65f6\u81ea\u52a8checksum"),(0,n.yg)("li",{parentName:"ol"},"\u5728tcp\u63d2\u4ef6\u4e2d\u5b9e\u73b0\u96f6\u62f7\u8d1d"),(0,n.yg)("li",{parentName:"ol"},"shenyu-client-springmvc\u652f\u6301\u9ed8\u8ba4\u7684appname\u548ccontext-path"),(0,n.yg)("li",{parentName:"ol"},"\u6dfb\u52a0sdk-feign\u7684\u793a\u4f8b\u548c\u96c6\u6210\u6d4b\u8bd5"),(0,n.yg)("li",{parentName:"ol"},"es log\u63d2\u4ef6\u652f\u6301\u7528\u6237\u81ea\u5b9a\u4e49\u7684\u7d22\u5f15"),(0,n.yg)("li",{parentName:"ol"},"\u589e\u5f3agrpc\u63d2\u4ef6\u652f\u6301shenyu-loadbalancer\u8d1f\u8f7d\u5747\u8861\u7b97\u6cd5"),(0,n.yg)("li",{parentName:"ol"},"\u652f\u6301http2\u534f\u8bae\u7684\u4e0b\u6e38\u670d\u52a1"),(0,n.yg)("li",{parentName:"ol"},"\u91cd\u6784\u589e\u5f3adubbo\u63d2\u4ef6\u652f\u6301shenyu-loadbalancer\u8d1f\u8f7d\u5747\u8861\u7b97\u6cd5"),(0,n.yg)("li",{parentName:"ol"},"\u6dfb\u52a0ingress controller\u7684springcloud\u96c6\u6210\u6d4b\u8bd5"),(0,n.yg)("li",{parentName:"ol"},"\u6dfb\u52a0WebSocket\u63d2\u4ef6\u4ee3\u7406ping\u7684\u529f\u80fd"),(0,n.yg)("li",{parentName:"ol"},"\u6dfb\u52a0ingress controller\u7684websocket\u96c6\u6210\u6d4b\u8bd5"),(0,n.yg)("li",{parentName:"ol"},"Rewrite\u63d2\u4ef6\u652f\u6301\u767e\u5206\u6bd4\u91cd\u5199"),(0,n.yg)("li",{parentName:"ol"},"Admin\u4f7f\u7528discovery config\u521d\u59cb\u5316discovery server"),(0,n.yg)("li",{parentName:"ol"},"Divide\u63d2\u4ef6\u9002\u914dshenyu discovery"),(0,n.yg)("li",{parentName:"ol"},"Alert\u652f\u6301\u591a\u4e2aadmin\u7684\u96c6\u7fa4"),(0,n.yg)("li",{parentName:"ol"},"WebSocket\u63d2\u4ef6\u9002\u914dshenyu discovery"),(0,n.yg)("li",{parentName:"ol"},"\u6ce8\u518c\u670d\u52a1\u5b9e\u4f8b\u5230shenyu discovery"),(0,n.yg)("li",{parentName:"ol"},"ShenYu Admin\u9002\u914dshenyu-discovery\u7684local\u6a21\u5f0f"),(0,n.yg)("li",{parentName:"ol"},"\u6dfb\u52a0shenyu sdk core\u7684\u6d4b\u8bd5\u7528\u4f8b"),(0,n.yg)("li",{parentName:"ol"},"\u6dfb\u52a0shenyu-discovery\u7684\u6d4b\u8bd5\u7528\u4f8b"),(0,n.yg)("li",{parentName:"ol"},"\u6dfb\u52a0opengauss\u7684e2e\u6d4b\u8bd5"),(0,n.yg)("li",{parentName:"ol"},"\u6dfb\u52a0\u4e0a\u4f20\u63d2\u4ef6\u5305\u5927\u5c0f\u7684\u9650\u5236"),(0,n.yg)("li",{parentName:"ol"},"\u6dfb\u52a0shenyu-client-websocket\u7684\u6d4b\u8bd5\u7528\u4f8b"),(0,n.yg)("li",{parentName:"ol"},"34 \u5347\u7ea7shiro\u5230\u5b89\u5168\u7248\u672c(1.18.0)"),(0,n.yg)("li",{parentName:"ol"},"\u5347\u7ea7SpringBoot\u7248\u672c\u52302.7.17\uff0c\u66f4\u65b0license"),(0,n.yg)("li",{parentName:"ol"},"\u6dfb\u52a0\u7f51\u5173\u5f02\u5e38\u65f6\u53d1\u9001\u901a\u77e5\u5230shenyu-alert"),(0,n.yg)("li",{parentName:"ol"},"\u6dfb\u52a0EurekaDiscoveryService\u5355\u5143\u6d4b\u8bd5")),(0,n.yg)("h3",{id:"refactor"},"Refactor"),(0,n.yg)("ol",null,(0,n.yg)("li",{parentName:"ol"},"\u91cd\u6784\u6574\u74062.6.1\u7248\u672c(pom.xml)"),(0,n.yg)("li",{parentName:"ol"},"\u4f7f\u7528computeIfAbsent\u91cd\u6784Map\u7684\u64cd\u4f5c"),(0,n.yg)("li",{parentName:"ol"},"\u91cd\u6784polaris\u6d4b\u8bd5\u7528\u4f8b"),(0,n.yg)("li",{parentName:"ol"},"\u8fc1\u79fbMaven Wrapper\u5230\u5b98\u65b9\u955c\u50cf"),(0,n.yg)("li",{parentName:"ol"},"\u5728WebClientMessageWriter\u4e2d\u7f16\u8bd1\u8fc7\u7684Pattern"),(0,n.yg)("li",{parentName:"ol"},"\u91cd\u6784HttpUtils\u7684\u8bf7\u6c42\u65b9\u6cd5"),(0,n.yg)("li",{parentName:"ol"},"\u5347\u7ea7github action\u7248\u672c"),(0,n.yg)("li",{parentName:"ol"},"\u91cd\u6784\u6570\u636e\u540c\u6b65\u7684\u62bd\u8c61\u6a21\u677f\u65b9\u6cd5"),(0,n.yg)("li",{parentName:"ol"},"\u91cd\u6784MenuProject, MenuModule, MenuDocItem\u4e3aVO\u5bf9\u8c61"),(0,n.yg)("li",{parentName:"ol"},"\u7edf\u4e00dubbo\u7248\u672c"),(0,n.yg)("li",{parentName:"ol"},"\u91cd\u6784HttpClient\u7684\u76ee\u5f55"),(0,n.yg)("li",{parentName:"ol"},"\u91cd\u6784github action ci\u7f13\u5b58"),(0,n.yg)("li",{parentName:"ol"},"\u91cd\u6784motan\u63d2\u4ef6\u652f\u6301pojo\u5bf9\u8c61\u4f5c\u4e3a\u65b9\u6cd5\u53c2\u6570"),(0,n.yg)("li",{parentName:"ol"},"\u5347\u7ea7kafka-client\u7248\u672c\u52303.4.0"),(0,n.yg)("li",{parentName:"ol"},"\u8fc1\u79fbadmin swagger springfox\u5230springdoc"),(0,n.yg)("li",{parentName:"ol"},"\u5347\u7ea7dubbo\u7248\u672c\u52303.2.5\u5e76\u91cd\u6784\u8fc7\u671f\u65b9\u6cd5"),(0,n.yg)("li",{parentName:"ol"},"\u91cd\u6784AbstractShenyuSdkClient getOrDefault\u65b9\u6cd5"),(0,n.yg)("li",{parentName:"ol"},"\u91cd\u6784HttpClient\u7684\u53c2\u6570"),(0,n.yg)("li",{parentName:"ol"},"\u91cd\u6784webclient\u63d2\u4ef6\u7684\u5b9e\u73b0"),(0,n.yg)("li",{parentName:"ol"},"\u5347\u7ea7guava\u7248\u672c\u523032.0.0-jre"),(0,n.yg)("li",{parentName:"ol"},"\u652f\u6301k8s\u4f5c\u4e3ae2e\u7684\u6d4b\u8bd5\u73af\u5883"),(0,n.yg)("li",{parentName:"ol"},"\u4f7f\u7528@Restapi\u4f5c\u4e3arest api\u7684\u8bf7\u6c42\u8def\u5f84\u6620\u5c04"),(0,n.yg)("li",{parentName:"ol"},"\u4f7f\u7528StringBuilder\u4f5c\u4e3a\u5b57\u7b26\u4e32\u8fde\u63a5\u5668"),(0,n.yg)("li",{parentName:"ol"},"\u8bbe\u7f6enetty allocator\u53c2\u6570\u4e3aunpooled"),(0,n.yg)("li",{parentName:"ol"},"\u91cd\u6784\u542f\u52a8\u7684banner"),(0,n.yg)("li",{parentName:"ol"},"\u5220\u9664\u91cd\u590d\u7684\u4ee3\u7801\u5e76\u4e14\u5c06\u90e8\u5206\u4ee3\u7801\u4f5c\u4e3a\u516c\u7528"),(0,n.yg)("li",{parentName:"ol"},"\u91cd\u6784null\u7684\u5224\u65ad\u65b9\u6cd5"),(0,n.yg)("li",{parentName:"ol"},"\u91cd\u6784\u65e5\u5fd7\u63d2\u4ef6\u7684\u9009\u62e9\u5668\u5904\u7406\u5668"),(0,n.yg)("li",{parentName:"ol"},"\u91cd\u6784\u81ea\u5b9a\u4e49\u63d2\u4ef6\u7c7b\u52a0\u8f7d\u5668"),(0,n.yg)("li",{parentName:"ol"},"\u91cd\u6784\u65e5\u5fd7\u63d2\u4ef6\u652f\u6301\u63d2\u4ef6\u7ea7\u522b\u7684\u91c7\u6837\u6bd4\u7387"),(0,n.yg)("li",{parentName:"ol"},"\u91cd\u6784Context-path\u907f\u514d\u91cd\u590d\u6ce8\u518c(\u4f7f\u7528selector for update)")),(0,n.yg)("h3",{id:"bug-fix"},"Bug Fix"),(0,n.yg)("ol",null,(0,n.yg)("li",{parentName:"ol"},"\u907f\u514d\u521b\u5efaTimeoutException\u7684\u6c38\u4e45\u5f00\u9500"),(0,n.yg)("li",{parentName:"ol"},"\u4fee\u590d\u793a\u4f8b\u6a21\u5757\u7684\u4e3b\u7c7b\u8def\u5f84"),(0,n.yg)("li",{parentName:"ol"},"\u4fee\u590d\u63d2\u4ef6\u6392\u5e8f\u95ee\u9898"),(0,n.yg)("li",{parentName:"ol"},"\u4fee\u590dMakefile Snapshot\u7248\u672c\u95ee\u9898"),(0,n.yg)("li",{parentName:"ol"},"\u4fee\u590dRELEASE-NOTES.md\u7684\u62fc\u5199\u9519\u8bef"),(0,n.yg)("li",{parentName:"ol"},"\u4fee\u590d\u793a\u4f8b\u4e2d\u7684\u9519\u8bef\u5305\u540d"),(0,n.yg)("li",{parentName:"ol"},"\u4fee\u590d\u5bc6\u7801\u9a8c\u8bc1\u89c4\u5219\uff0c\u5e76\u4e14\u6dfb\u52a0#\u548c.\u7684\u652f\u6301"),(0,n.yg)("li",{parentName:"ol"},"\u4fee\u590de2e\u4e2dzookeeper:3.8.0\u7684\u5065\u5eb7\u68c0\u67e5"),(0,n.yg)("li",{parentName:"ol"},"\u4fee\u590d\u4e0d\u7a33\u5b9a\u7684ci\u68c0\u9a8c"),(0,n.yg)("li",{parentName:"ol"},"\u6dfb\u52a0e2e WaitForHelper\u5f02\u5e38\u65e5\u5fd7"),(0,n.yg)("li",{parentName:"ol"},"\u4fee\u590dspringcloud\u5728\u67d0\u4e9b\u6ce8\u518c\u4e2d\u5fc3\u4e2d\u95f4\u4ef6\u4e0d\u80fd\u83b7\u53d6scheme"),(0,n.yg)("li",{parentName:"ol"},"\u4fee\u590djavadoc\u7f16\u8bd1\u9519\u8bef"),(0,n.yg)("li",{parentName:"ol"},"\u4fee\u590dHttpUtils\u4e2d\u9519\u8bef\u7684\u8bf7\u6c42\u7c7b\u578b"),(0,n.yg)("li",{parentName:"ol"},"\u4fee\u590d\u66f4\u65b0auth\u65f6\u672a\u66f4\u65b0\u7528\u6237id"),(0,n.yg)("li",{parentName:"ol"},"\u4fee\u590dTCP\u63d2\u4ef6\u7684eventloop\u7ebf\u7a0b\u6cc4\u6f0f"),(0,n.yg)("li",{parentName:"ol"},"\u683c\u5f0f\u5316shenyu-integrated-test\u4e2d\u7684quickstart"),(0,n.yg)("li",{parentName:"ol"},"\u4fee\u590dSQL\u811a\u672c\u9519\u8bef"),(0,n.yg)("li",{parentName:"ol"},"\u4fee\u590duri\u63d2\u4ef6path\u9519\u8bef\uff0c\u5e76\u4e14\u4f7f\u7528rawpath\u66ff\u4ee3path"),(0,n.yg)("li",{parentName:"ol"},"\u4fee\u590dwebsocket\u63d2\u4ef6\u5bf9rewrite\u63d2\u4ef6\u7684\u652f\u6301"),(0,n.yg)("li",{parentName:"ol"},"\u4fee\u590dElasticSearchLog Plugin\u7d22\u5f15\u540d\u79f0\u65e0\u6548"),(0,n.yg)("li",{parentName:"ol"},"\u4fee\u590dcontext-path\u63d2\u4ef6\u7684\u9519\u8bef"),(0,n.yg)("li",{parentName:"ol"},"\u4fee\u590dshenyu-admin\u7684cpu\u5360\u7528\u8fc7\u9ad8\u95ee\u9898"),(0,n.yg)("li",{parentName:"ol"},"\u4fee\u590dalert\u4e2dLocalDateTime\u7684\u683c\u5f0f\u5316\u95ee\u9898"),(0,n.yg)("li",{parentName:"ol"},"\u4fee\u590dshenyu-client\u7684apiDoc\u7684\u9519\u8bef\u91cd\u8bd5\u95ee\u9898"),(0,n.yg)("li",{parentName:"ol"},"\u4fee\u590dapplicationContextAware\u521d\u59cb\u5316\u987a\u5e8f\u8fc7\u665a"),(0,n.yg)("li",{parentName:"ol"},"\u4fee\u590d\u91cd\u590d\u7684response header"),(0,n.yg)("li",{parentName:"ol"},"\u8bbe\u7f6ek8s\u7684\u6700\u5927\u7b49\u5f85\u65f6\u95f4"),(0,n.yg)("li",{parentName:"ol"},"\u4fee\u6539clickhouse\u65e5\u5fd7\u63d2\u4ef6\u7684status\u5b57\u6bb5\u7c7b\u578b"),(0,n.yg)("li",{parentName:"ol"},"\u4fee\u590dresponse write plugin\u53ef\u80fd\u9020\u6210\u7684\u5185\u5b58\u6cc4\u6f0f"),(0,n.yg)("li",{parentName:"ol"},"\u4fee\u590ddataType\u5b57\u6bb5\u9009\u62e9\u9519\u8bef"),(0,n.yg)("li",{parentName:"ol"},"\u4fee\u590dhttp\u6570\u636e\u540c\u6b65\u9519\u8bef"),(0,n.yg)("li",{parentName:"ol"},"\u4fee\u590d\u5355\u8bcd\u62fc\u5199\u9519\u8bef"),(0,n.yg)("li",{parentName:"ol"},"\u4fee\u590dshenyu dubbo\u4ee3\u7406\u63d2\u4ef6\u7684\u6ce8\u518c\u72b6\u6001"),(0,n.yg)("li",{parentName:"ol"},"\u4fee\u590dbuildDiscoveryUpstreamPath\u9020\u6210\u591a\u4e2a",(0,n.yg)("inlineCode",{parentName:"li"},"/")),(0,n.yg)("li",{parentName:"ol"},"\u4fee\u590dshenyu-registry\u7684eureka\u6ce8\u518c\u9519\u8bef\u903b\u8f91"),(0,n.yg)("li",{parentName:"ol"},"\u4fee\u590dAbstractLogPluginDataHandler hashcode\u9519\u8bef"),(0,n.yg)("li",{parentName:"ol"},"\u4fee\u590dratelimit\u63d2\u4ef6\u5728\u96c6\u7fa4\u6a21\u5f0f\u4e0b\u7684key\u9519\u8bef"),(0,n.yg)("li",{parentName:"ol"},"\u4fee\u590d\u540c\u4e00\u4e2a\u5e94\u7528\u591a\u4e2ashenyu-client\u91cd\u590d\u6ce8\u518ccontext-path\u7684\u9519\u8bef"),(0,n.yg)("li",{parentName:"ol"},"\u4fee\u590d\u5728\u63d2\u4ef6\u5173\u95ed\u540e\u4e0d\u4f1a\u91cd\u65b0\u52a0\u8f7d\u63d2\u4ef6"),(0,n.yg)("li",{parentName:"ol"},"\u4fee\u590dshenyu admin\u4e0a\u4f20\u63d2\u4ef6\u7684\u9519\u8bef"),(0,n.yg)("li",{parentName:"ol"},"\u4fee\u590dshenyu\u4e0d\u80fd\u52a0\u8f7dresource\u76ee\u5f55\u4e0b\u7684\u8d44\u6e90"),(0,n.yg)("li",{parentName:"ol"},"\u4fee\u590dAdmin\u6765\u5c55\u793a\u5b57\u5178\u503c"),(0,n.yg)("li",{parentName:"ol"},"\u4fee\u590dAuthorization\u5728sign\u63d2\u4ef6\u4e2d\u7684\u51b2\u7a81"),(0,n.yg)("li",{parentName:"ol"},"\u4fee\u590d\u7b7e\u540d\u63d2\u4ef6\u7684context-path\u8def\u5f84\u5339\u914d\u9519\u8bef")))}s.isMDXComponent=!0}}]);