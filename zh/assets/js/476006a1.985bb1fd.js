"use strict";(self.webpackChunkshenyu_website=self.webpackChunkshenyu_website||[]).push([[80442],{15680:(e,t,a)=>{a.d(t,{xA:()=>y,yg:()=>s});var n=a(96540);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function g(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function l(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?g(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):g(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function p(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},g=Object.keys(e);for(n=0;n<g.length;n++)a=g[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var g=Object.getOwnPropertySymbols(e);for(n=0;n<g.length;n++)a=g[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var i=n.createContext({}),m=function(e){var t=n.useContext(i),a=t;return e&&(a="function"==typeof e?e(t):l(l({},t),e)),a},y=function(e){var t=m(e.components);return n.createElement(i.Provider,{value:t},e.children)},d="mdxType",o={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},c=n.forwardRef((function(e,t){var a=e.components,r=e.mdxType,g=e.originalType,i=e.parentName,y=p(e,["components","mdxType","originalType","parentName"]),d=m(a),c=r,s=d["".concat(i,".").concat(c)]||d[c]||o[c]||g;return a?n.createElement(s,l(l({ref:t},y),{},{components:a})):n.createElement(s,l({ref:t},y))}));function s(e,t){var a=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var g=a.length,l=new Array(g);l[0]=c;var p={};for(var i in t)hasOwnProperty.call(t,i)&&(p[i]=t[i]);p.originalType=e,p[d]="string"==typeof e?e:r,l[1]=p;for(var m=2;m<g;m++)l[m]=a[m];return n.createElement.apply(null,l)}return n.createElement.apply(null,a)}c.displayName="MDXCreateElement"},20166:(e,t,a)=>{a.d(t,{A:()=>n});const n=a.p+"assets/images/shenyu-metrics-805b9a2539e9808d934caae9b3a1404f.png"},33087:(e,t,a)=>{a.d(t,{A:()=>n});const n=a.p+"assets/images/request-metric-4-d95d82437f8344ab537170fc78ee980c.png"},36150:(e,t,a)=>{a.d(t,{A:()=>n});const n=a.p+"assets/images/request-metric-5-5be0cded02230111957e9cbf0b74f653.png"},40099:(e,t,a)=>{a.d(t,{A:()=>n});const n=a.p+"assets/images/request-metric-8-8425d041585a6db6b27412ac052c5e57.png"},45266:(e,t,a)=>{a.d(t,{A:()=>n});const n=a.p+"assets/images/request-metric-1-92f09dff492b284cf5462a1b2149f804.png"},46557:(e,t,a)=>{a.r(t),a.d(t,{contentTitle:()=>l,default:()=>d,frontMatter:()=>g,metadata:()=>p,toc:()=>i});var n=a(58168),r=(a(96540),a(15680));const g={title:"Metrics\u63d2\u4ef6",keywords:["Metrics"],description:"Metrics\u63d2\u4ef6"},l=void 0,p={unversionedId:"plugin-center/observability/metrics-plugin",id:"version-2.5.1/plugin-center/observability/metrics-plugin",isDocsHomePage:!1,title:"Metrics\u63d2\u4ef6",description:"Metrics\u63d2\u4ef6",source:"@site/i18n/zh/docusaurus-plugin-content-docs/version-2.5.1/plugin-center/observability/metrics-plugin.md",sourceDirName:"plugin-center/observability",slug:"/plugin-center/observability/metrics-plugin",permalink:"/zh/docs/2.5.1/plugin-center/observability/metrics-plugin",editUrl:"https://github.com/apache/shenyu-website/edit/main/i18n/zh/docusaurus-plugin-content-docs/version-2.5.1/plugin-center/observability/metrics-plugin.md",version:"2.5.1",frontMatter:{title:"Metrics\u63d2\u4ef6",keywords:["Metrics"],description:"Metrics\u63d2\u4ef6"},sidebar:"version-2.5.1/tutorialSidebar",previous:{title:"Tencent cls\u65e5\u5fd7\u63d2\u4ef6",permalink:"/zh/docs/2.5.1/plugin-center/observability/logging-tencent-cls"},next:{title:"GeneralContext\u63d2\u4ef6",permalink:"/zh/docs/2.5.1/plugin-center/common/general-context-plugin"}},i=[{value:"\u8bf4\u660e",id:"\u8bf4\u660e",children:[]},{value:"\u6280\u672f\u65b9\u6848",id:"\u6280\u672f\u65b9\u6848",children:[]},{value:"\u63d2\u4ef6\u4f7f\u7528",id:"\u63d2\u4ef6\u4f7f\u7528",children:[]},{value:"metrics\u4fe1\u606f",id:"metrics\u4fe1\u606f",children:[{value:"jmx \u6307\u6807",id:"jmx-\u6307\u6807",children:[]},{value:"jvm \u6307\u6807",id:"jvm-\u6307\u6807",children:[]}]},{value:"\u6536\u96c6 metrics",id:"\u6536\u96c6-metrics",children:[{value:"Windows \u73af\u5883\u4e0b\u5b89\u88c5Prometheus",id:"windows-\u73af\u5883\u4e0b\u5b89\u88c5prometheus",children:[]},{value:"MacOS \u73af\u5883\u4e0b\u5b89\u88c5Prometheus",id:"macos-\u73af\u5883\u4e0b\u5b89\u88c5prometheus",children:[]}]},{value:"\u9762\u677f\u5c55\u793a",id:"\u9762\u677f\u5c55\u793a",children:[{value:"windows\u73af\u5883\u4e0b\u5b89\u88c5Grafana",id:"windows\u73af\u5883\u4e0b\u5b89\u88c5grafana",children:[]},{value:"macos\u73af\u5883\u4e0b\u5b89\u88c5Grafana",id:"macos\u73af\u5883\u4e0b\u5b89\u88c5grafana",children:[]},{value:"\u4f7f\u7528Grafana\u67e5\u770b\u76d1\u63a7\u6570\u636e",id:"\u4f7f\u7528grafana\u67e5\u770b\u76d1\u63a7\u6570\u636e",children:[]}]}],m={toc:i},y="wrapper";function d(e){let{components:t,...g}=e;return(0,r.yg)(y,(0,n.A)({},m,g,{components:t,mdxType:"MDXLayout"}),(0,r.yg)("h2",{id:"\u8bf4\u660e"},"\u8bf4\u660e"),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("inlineCode",{parentName:"li"},"Metrics\u63d2\u4ef6"),"\u63d2\u4ef6\u662f\u7f51\u5173\u7528\u6765\u76d1\u63a7\u81ea\u8eab\u8fd0\u884c\u72b6\u6001\uff08",(0,r.yg)("inlineCode",{parentName:"li"},"JVM"),"\u76f8\u5173\uff09\uff0c\u8bf7\u6c42\u7684\u54cd\u5e94\u8fdf\u5ef6\uff0c",(0,r.yg)("inlineCode",{parentName:"li"},"QPS"),"\u3001",(0,r.yg)("inlineCode",{parentName:"li"},"TPS"),"\u7b49\u76f8\u5173",(0,r.yg)("inlineCode",{parentName:"li"},"metrics"),"\u3002")),(0,r.yg)("h2",{id:"\u6280\u672f\u65b9\u6848"},"\u6280\u672f\u65b9\u6848"),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("p",{parentName:"li"},"\u6d41\u7a0b\u56fe\n",(0,r.yg)("img",{src:a(20166).A}))),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("p",{parentName:"li"},"\u5f02\u6b65\u6216\u8005\u540c\u6b65\u7684\u65b9\u5f0f\uff0c\u5728 ",(0,r.yg)("inlineCode",{parentName:"p"},"Apache ShenYu")," \u7f51\u5173\u91cc\u9762\u8fdb\u884c ",(0,r.yg)("inlineCode",{parentName:"p"},"metrics")," \u57cb\u70b9\u3002")),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("p",{parentName:"li"},(0,r.yg)("inlineCode",{parentName:"p"},"prometheus")," \u670d\u52a1\u7aef\u901a\u8fc7 ",(0,r.yg)("inlineCode",{parentName:"p"},"http")," \u8bf7\u6c42\u6765\u62c9\u53d6  ",(0,r.yg)("inlineCode",{parentName:"p"},"metrics"),"\uff0c\u518d\u4f7f\u7528 ",(0,r.yg)("inlineCode",{parentName:"p"},"Grafana")," \u5c55\u793a\u3002"))),(0,r.yg)("h2",{id:"\u63d2\u4ef6\u4f7f\u7528"},"\u63d2\u4ef6\u4f7f\u7528"),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},"\u5728\u7f51\u5173\u7684 ",(0,r.yg)("inlineCode",{parentName:"li"},"pom.xml")," \u6587\u4ef6\u4e2d\u6dfb\u52a0 ",(0,r.yg)("inlineCode",{parentName:"li"},"metrics")," \u7684\u4f9d\u8d56\u3002")),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-xml"},"        \x3c!-- apache shenyu metrics plugin starter--\x3e\n        <dependency>\n            <groupId>org.apache.shenyu</groupId>\n            <artifactId>shenyu-spring-boot-starter-plugin-metrics</artifactId>\n            <version>${project.version}</version>\n        </dependency>\n        \x3c!-- apache shenyu metrics plugin end--\x3e\n")),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},"\u5728\u7f51\u5173\u7684\u914d\u7f6eyaml\u6587\u4ef6\u4e2d\u7f16\u8f91\u5982\u4e0b\u5185\u5bb9\uff1a")),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-yml"},"shenyu:\n  metrics:\n    enabled: false  #\u8bbe\u7f6e\u4e3a true \u8868\u793a\u5f00\u542f\n    name : prometheus \n    host: 127.0.0.1 #\u66b4\u9732\u7684ip\n    port: 8090 #\u66b4\u9732\u7684\u7aef\u53e3\n    jmxConfig: #jmx\u914d\u7f6e\n    props:\n      jvm_enabled: true #\u5f00\u542fjvm\u7684\u76d1\u63a7\u6307\u6807\n")),(0,r.yg)("h2",{id:"metrics\u4fe1\u606f"},"metrics\u4fe1\u606f"),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("p",{parentName:"li"},"\u6240\u6709\u7684",(0,r.yg)("inlineCode",{parentName:"p"},"JVM"),"\uff0c\u7ebf\u7a0b\uff0c\u5185\u5b58\uff0c\u7b49\u76f8\u5173\u4fe1\u606f\u90fd\u4f1a\u57cb\u70b9\uff0c\u53ef\u4ee5\u5728 ",(0,r.yg)("inlineCode",{parentName:"p"},"Grafana")," \u9762\u677f\u4e2d\uff0c\u65b0\u589e\u4e00\u4e2a ",(0,r.yg)("inlineCode",{parentName:"p"},"JVM")," \u6a21\u5757\uff0c\u5219\u4f1a\u5b8c\u5168\u5c55\u793a \u5177\u4f53\u8bf7\u770b\uff1a",(0,r.yg)("a",{parentName:"p",href:"https://github.com/prometheus/jmx_exporter"},"https://github.com/prometheus/jmx_exporter"))),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("p",{parentName:"li"},"\u53e6\u5916\u8fd8\u6709\u5982\u4e0b\u81ea\u5b9a\u4e49\u7684 ",(0,r.yg)("inlineCode",{parentName:"p"},"metrics")))),(0,r.yg)("table",null,(0,r.yg)("thead",{parentName:"table"},(0,r.yg)("tr",{parentName:"thead"},(0,r.yg)("th",{parentName:"tr",align:"left"},"\u540d\u79f0"),(0,r.yg)("th",{parentName:"tr",align:"left"},"\u7c7b\u578b"),(0,r.yg)("th",{parentName:"tr",align:"left"},"\u6807\u7b7e\u540d\u79f0"),(0,r.yg)("th",{parentName:"tr",align:"left"},"\u8bf4\u660e"))),(0,r.yg)("tbody",{parentName:"table"},(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"left"},"shenyu_request_total"),(0,r.yg)("td",{parentName:"tr",align:"left"},"Counter"),(0,r.yg)("td",{parentName:"tr",align:"left"},"none"),(0,r.yg)("td",{parentName:"tr",align:"left"},"\u6536\u96c6ShenYu\u7f51\u5173\u7684\u6240\u6709\u8bf7\u6c42")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"left"},"shenyu_request_throw_total"),(0,r.yg)("td",{parentName:"tr",align:"left"},"Counter"),(0,r.yg)("td",{parentName:"tr",align:"left"},"none"),(0,r.yg)("td",{parentName:"tr",align:"left"},"\u6536\u96c6ShenYu\u7f51\u5173\u7684\u6240\u6709\u5f02\u5e38\u8bf7\u6c42")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"left"},"shenyu_request_type_total"),(0,r.yg)("td",{parentName:"tr",align:"left"},"Counter"),(0,r.yg)("td",{parentName:"tr",align:"left"},"path,type"),(0,r.yg)("td",{parentName:"tr",align:"left"},"\u6536\u96c6ShenYu\u7f51\u5173\u76d1\u89c6\u5668\u7684\u6240\u6709\u5339\u914d\u8bf7\u6c42")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"left"},"shenyu_execute_latency_millis"),(0,r.yg)("td",{parentName:"tr",align:"left"},"histogram"),(0,r.yg)("td",{parentName:"tr",align:"left"},"none"),(0,r.yg)("td",{parentName:"tr",align:"left"},"\u6536\u96c6ShenYu\u7f51\u5173\u6267\u884c\u65f6\u95f4\u95f4\u9694")))),(0,r.yg)("h3",{id:"jmx-\u6307\u6807"},"jmx \u6307\u6807"),(0,r.yg)("table",null,(0,r.yg)("thead",{parentName:"table"},(0,r.yg)("tr",{parentName:"thead"},(0,r.yg)("th",{parentName:"tr",align:"center"},"name"),(0,r.yg)("th",{parentName:"tr",align:"center"},"type"),(0,r.yg)("th",{parentName:"tr",align:"center"},"labals"),(0,r.yg)("th",{parentName:"tr",align:"center"},"help"))),(0,r.yg)("tbody",{parentName:"table"},(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"center"},"jmx_config_reload_success_total"),(0,r.yg)("td",{parentName:"tr",align:"center"},"counter"),(0,r.yg)("td",{parentName:"tr",align:"center"}),(0,r.yg)("td",{parentName:"tr",align:"center"},"\u6210\u529f\u91cd\u65b0\u52a0\u8f7d\u914d\u7f6e\u7684\u6b21\u6570.")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"center"},"jmx_config_reload_failure_total"),(0,r.yg)("td",{parentName:"tr",align:"center"},"counter"),(0,r.yg)("td",{parentName:"tr",align:"center"}),(0,r.yg)("td",{parentName:"tr",align:"center"},"\u91cd\u65b0\u52a0\u8f7d\u914d\u7f6e\u5931\u8d25\u7684\u6b21\u6570.")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"center"},"jmx_scrape_duration_seconds"),(0,r.yg)("td",{parentName:"tr",align:"center"},"gauge"),(0,r.yg)("td",{parentName:"tr",align:"center"}),(0,r.yg)("td",{parentName:"tr",align:"center"},"\u6b64 JMX \u6293\u53d6\u6240\u7528\u7684\u79d2\u6570.")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"center"},"jmx_scrape_error"),(0,r.yg)("td",{parentName:"tr",align:"center"},"gauge"),(0,r.yg)("td",{parentName:"tr",align:"center"}),(0,r.yg)("td",{parentName:"tr",align:"center"},"\u5982\u679c\u6b64\u6293\u53d6\u5931\u8d25,\u5219\u975e\u96f6.")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"center"},"jmx_scrape_cached_beans"),(0,r.yg)("td",{parentName:"tr",align:"center"},"gauge"),(0,r.yg)("td",{parentName:"tr",align:"center"}),(0,r.yg)("td",{parentName:"tr",align:"center"},"\u6709\u7f13\u5b58\u5339\u914d\u89c4\u5219\u7684bean\u7684\u6570\u91cf")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"center"},"jmx_scrape_duration_seconds"),(0,r.yg)("td",{parentName:"tr",align:"center"},"gauge"),(0,r.yg)("td",{parentName:"tr",align:"center"}),(0,r.yg)("td",{parentName:"tr",align:"center"},"\u6b64 JMX \u6293\u53d6\u6240\u82b1\u8d39\u7684\u79d2\u6570.")))),(0,r.yg)("h3",{id:"jvm-\u6307\u6807"},"jvm \u6307\u6807"),(0,r.yg)("h4",{id:"standardexports"},"StandardExports"),(0,r.yg)("table",null,(0,r.yg)("thead",{parentName:"table"},(0,r.yg)("tr",{parentName:"thead"},(0,r.yg)("th",{parentName:"tr",align:"center"},"name"),(0,r.yg)("th",{parentName:"tr",align:"center"},"type"),(0,r.yg)("th",{parentName:"tr",align:"center"},"labels"),(0,r.yg)("th",{parentName:"tr",align:"center"},"help"))),(0,r.yg)("tbody",{parentName:"table"},(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"center"},"process_cpu_seconds_total"),(0,r.yg)("td",{parentName:"tr",align:"center"},"counter"),(0,r.yg)("td",{parentName:"tr",align:"center"}),(0,r.yg)("td",{parentName:"tr",align:"center"},"\u7528\u6237\u548c\u7cfb\u7edfCPU\u603b\u8ba1\u6240\u7528\u7684\u79d2\u6570.")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"center"},"process_start_time_seconds"),(0,r.yg)("td",{parentName:"tr",align:"center"},"gauge"),(0,r.yg)("td",{parentName:"tr",align:"center"}),(0,r.yg)("td",{parentName:"tr",align:"center"},"\u81ea unix \u5143\u5e74(1970-01-01)\u4ee5\u6765\u8fdb\u7a0b\u7684\u5f00\u59cb\u65f6\u95f4.")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"center"},"process_open_fds"),(0,r.yg)("td",{parentName:"tr",align:"center"},"gauge"),(0,r.yg)("td",{parentName:"tr",align:"center"}),(0,r.yg)("td",{parentName:"tr",align:"center"},"\u6253\u5f00\u7684\u6587\u4ef6\u63cf\u8ff0\u7b26\u7684\u6570\u91cf.")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"center"},"process_max_fds"),(0,r.yg)("td",{parentName:"tr",align:"center"},"gauge"),(0,r.yg)("td",{parentName:"tr",align:"center"}),(0,r.yg)("td",{parentName:"tr",align:"center"},"\u6253\u5f00\u7684\u6587\u4ef6\u63cf\u8ff0\u7b26\u7684\u6700\u5927\u6570\u91cf.")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"center"},"process_virtual_memory_bytes"),(0,r.yg)("td",{parentName:"tr",align:"center"},"gauge"),(0,r.yg)("td",{parentName:"tr",align:"center"}),(0,r.yg)("td",{parentName:"tr",align:"center"},"\u865a\u62df\u5185\u5b58\u7684\u5b57\u8282\u6570.")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"center"},"process_resident_memory_bytes"),(0,r.yg)("td",{parentName:"tr",align:"center"},"gauge"),(0,r.yg)("td",{parentName:"tr",align:"center"}),(0,r.yg)("td",{parentName:"tr",align:"center"},"\u5e38\u9a7b\u5185\u5b58\u7684\u5b57\u8282\u6570.")))),(0,r.yg)("h4",{id:"memorypoolsexports"},"MemoryPoolsExports"),(0,r.yg)("table",null,(0,r.yg)("thead",{parentName:"table"},(0,r.yg)("tr",{parentName:"thead"},(0,r.yg)("th",{parentName:"tr",align:"center"},"name"),(0,r.yg)("th",{parentName:"tr",align:"center"},"type"),(0,r.yg)("th",{parentName:"tr",align:"center"},"labels"),(0,r.yg)("th",{parentName:"tr",align:"center"},"help"))),(0,r.yg)("tbody",{parentName:"table"},(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"center"},"jvm_memory_objects_pending_finalization"),(0,r.yg)("td",{parentName:"tr",align:"center"},"gauge"),(0,r.yg)("td",{parentName:"tr",align:"center"},'{area="heap',"|",'nonheap"}'),(0,r.yg)("td",{parentName:"tr",align:"center"},"\u5728\u7ec8\u7ed3\u5668\u961f\u5217\u4e2d\u7b49\u5f85\u7684\u5bf9\u8c61\u6570.")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"center"},"jvm_memory_bytes_used"),(0,r.yg)("td",{parentName:"tr",align:"center"},"gauge"),(0,r.yg)("td",{parentName:"tr",align:"center"},'{area="heap',"|",'nonheap"}'),(0,r.yg)("td",{parentName:"tr",align:"center"},"\u7ed9\u5b9a JVM \u5185\u5b58\u533a\u57df\u7684\u5df2\u7528\u5b57\u8282\u6570.")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"center"},"jvm_memory_bytes_committed"),(0,r.yg)("td",{parentName:"tr",align:"center"},"gauge"),(0,r.yg)("td",{parentName:"tr",align:"center"},'{area="heap',"|",'nonheap"}'),(0,r.yg)("td",{parentName:"tr",align:"center"},"\u7ed9\u5b9a JVM \u5185\u5b58\u533a\u57df\u7684\u5df2\u63d0\u4ea4\u5b57\u8282\u6570.")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"center"},"jvm_memory_bytes_max"),(0,r.yg)("td",{parentName:"tr",align:"center"},"gauge"),(0,r.yg)("td",{parentName:"tr",align:"center"},'{area="heap',"|",'nonheap"}'),(0,r.yg)("td",{parentName:"tr",align:"center"},"\u7ed9\u5b9a JVM \u5185\u5b58\u533a\u57df\u7684\u6700\u5927\u5b57\u8282\u6570.")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"center"},"jvm_memory_bytes_init"),(0,r.yg)("td",{parentName:"tr",align:"center"},"gauge"),(0,r.yg)("td",{parentName:"tr",align:"center"},'{area="heap',"|",'nonheap"}'),(0,r.yg)("td",{parentName:"tr",align:"center"},"\u7ed9\u5b9a JVM \u5185\u5b58\u533a\u57df\u7684\u521d\u59cb\u5b57\u8282\u6570.")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"center"},"jvm_memory_pool_bytes_used"),(0,r.yg)("td",{parentName:"tr",align:"center"},"gauge"),(0,r.yg)("td",{parentName:"tr",align:"center"},"{pool}"),(0,r.yg)("td",{parentName:"tr",align:"center"},"\u7ed9\u5b9a JVM \u5185\u5b58\u6c60\u7684\u5df2\u7528\u5b57\u8282\u6570.")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"center"},"jvm_memory_pool_bytes_committed"),(0,r.yg)("td",{parentName:"tr",align:"center"},"gauge"),(0,r.yg)("td",{parentName:"tr",align:"center"},"{pool}"),(0,r.yg)("td",{parentName:"tr",align:"center"},"\u7ed9\u5b9a JVM \u5185\u5b58\u6c60\u7684\u5df2\u63d0\u4ea4\u5b57\u8282\u6570.")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"center"},"jvm_memory_pool_bytes_max"),(0,r.yg)("td",{parentName:"tr",align:"center"},"gauge"),(0,r.yg)("td",{parentName:"tr",align:"center"},"{pool}"),(0,r.yg)("td",{parentName:"tr",align:"center"},"\u7ed9\u5b9a JVM \u5185\u5b58\u6c60\u7684\u6700\u5927\u5b57\u8282\u6570.")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"center"},"jvm_memory_pool_bytes_init"),(0,r.yg)("td",{parentName:"tr",align:"center"},"gauge"),(0,r.yg)("td",{parentName:"tr",align:"center"},"{pool}"),(0,r.yg)("td",{parentName:"tr",align:"center"},"\u7ed9\u5b9a JVM \u5185\u5b58\u6c60\u7684\u521d\u59cb\u5b57\u8282\u6570.")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"center"},"jvm_memory_pool_collection_used_bytes"),(0,r.yg)("td",{parentName:"tr",align:"center"},"gauge"),(0,r.yg)("td",{parentName:"tr",align:"center"},"{pool}"),(0,r.yg)("td",{parentName:"tr",align:"center"},"\u7ed9\u5b9a JVM \u5185\u5b58\u6c60\u6700\u540e\u4e00\u6b21 GC \u540e\u7684\u5df2\u7528\u5b57\u8282\u6570.")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"center"},"jvm_memory_pool_collection_committed_bytes"),(0,r.yg)("td",{parentName:"tr",align:"center"},"gauge"),(0,r.yg)("td",{parentName:"tr",align:"center"},"{pool}"),(0,r.yg)("td",{parentName:"tr",align:"center"},"\u7ed9\u5b9a JVM \u5185\u5b58\u6c60\u7684\u6700\u540e\u4e00\u6b21 GC \u540e\u7684\u5df2\u63d0\u4ea4\u5b57\u8282\u6570.")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"center"},"jvm_memory_pool_collection_max_bytes"),(0,r.yg)("td",{parentName:"tr",align:"center"},"gauge"),(0,r.yg)("td",{parentName:"tr",align:"center"},"{pool}"),(0,r.yg)("td",{parentName:"tr",align:"center"},"\u7ed9\u5b9a JVM \u5185\u5b58\u6c60\u7684\u6700\u540e\u4e00\u6b21 GC \u540e\u7684\u6700\u5927\u5b57\u8282\u6570.")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"center"},"jvm_memory_pool_collection_init_bytes"),(0,r.yg)("td",{parentName:"tr",align:"center"},"gauge"),(0,r.yg)("td",{parentName:"tr",align:"center"},"{pool}"),(0,r.yg)("td",{parentName:"tr",align:"center"},"\u7ed9\u5b9a JVM \u5185\u5b58\u6c60\u7684\u6700\u540e\u4e00\u6b21 GC \u540e\u7684\u521d\u59cb\u5b57\u8282\u6570.")))),(0,r.yg)("h4",{id:"memoryallocationexports"},"MemoryAllocationExports"),(0,r.yg)("table",null,(0,r.yg)("thead",{parentName:"table"},(0,r.yg)("tr",{parentName:"thead"},(0,r.yg)("th",{parentName:"tr",align:"center"},"name"),(0,r.yg)("th",{parentName:"tr",align:"center"},"type"),(0,r.yg)("th",{parentName:"tr",align:"center"},"labels"),(0,r.yg)("th",{parentName:"tr",align:"center"},"help"))),(0,r.yg)("tbody",{parentName:"table"},(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"center"},"jvm_memory_pool_allocated_bytes_total"),(0,r.yg)("td",{parentName:"tr",align:"center"},"counter"),(0,r.yg)("td",{parentName:"tr",align:"center"},"{pool}"),(0,r.yg)("td",{parentName:"tr",align:"center"},"\u7ed9\u5b9a JVM \u5185\u5b58\u6c60\u4e2d\u5206\u914d\u7684\u603b\u5b57\u8282\u6570.(\u53ea\u6709 GC \u7684\u65f6\u5019\u624d\u4f1a\u66f4\u65b0)")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"center"}),(0,r.yg)("td",{parentName:"tr",align:"center"}),(0,r.yg)("td",{parentName:"tr",align:"center"}),(0,r.yg)("td",{parentName:"tr",align:"center"})),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"center"}),(0,r.yg)("td",{parentName:"tr",align:"center"}),(0,r.yg)("td",{parentName:"tr",align:"center"}),(0,r.yg)("td",{parentName:"tr",align:"center"})))),(0,r.yg)("h4",{id:"bufferpoolsexports"},"BufferPoolsExports"),(0,r.yg)("table",null,(0,r.yg)("thead",{parentName:"table"},(0,r.yg)("tr",{parentName:"thead"},(0,r.yg)("th",{parentName:"tr",align:"center"},"name"),(0,r.yg)("th",{parentName:"tr",align:"center"},"type"),(0,r.yg)("th",{parentName:"tr",align:"center"},"labels"),(0,r.yg)("th",{parentName:"tr",align:"center"},"help"))),(0,r.yg)("tbody",{parentName:"table"},(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"center"},"jvm_buffer_pool_used_bytes"),(0,r.yg)("td",{parentName:"tr",align:"center"},"gauge"),(0,r.yg)("td",{parentName:"tr",align:"center"},"{pool}"),(0,r.yg)("td",{parentName:"tr",align:"center"},"\u7ed9\u5b9a JVM \u7f13\u51b2\u6c60\u7684\u5df2\u7528\u5b57\u8282\u6570.")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"center"},"jvm_buffer_pool_capacity_bytes"),(0,r.yg)("td",{parentName:"tr",align:"center"},"gauge"),(0,r.yg)("td",{parentName:"tr",align:"center"},"{pool}"),(0,r.yg)("td",{parentName:"tr",align:"center"},"\u7ed9\u5b9a JVM \u7f13\u51b2\u6c60\u7684\u5b57\u8282\u5bb9\u91cf.")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"center"},"jvm_buffer_pool_used_buffers"),(0,r.yg)("td",{parentName:"tr",align:"center"},"gauge"),(0,r.yg)("td",{parentName:"tr",align:"center"},"{pool}"),(0,r.yg)("td",{parentName:"tr",align:"center"},"\u7ed9\u5b9a JVM \u7f13\u51b2\u6c60\u7684\u5df2\u7528\u7f13\u51b2\u533a.")))),(0,r.yg)("h4",{id:"garbagecollectorexports"},"GarbageCollectorExports"),(0,r.yg)("table",null,(0,r.yg)("thead",{parentName:"table"},(0,r.yg)("tr",{parentName:"thead"},(0,r.yg)("th",{parentName:"tr",align:"center"},"name"),(0,r.yg)("th",{parentName:"tr",align:"center"},"type"),(0,r.yg)("th",{parentName:"tr",align:"center"},"labels"),(0,r.yg)("th",{parentName:"tr",align:"center"},"help"))),(0,r.yg)("tbody",{parentName:"table"},(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"center"},"jvm_gc_collection_seconds"),(0,r.yg)("td",{parentName:"tr",align:"center"},"summary"),(0,r.yg)("td",{parentName:"tr",align:"center"},"{gc}"),(0,r.yg)("td",{parentName:"tr",align:"center"},"\u5728\u7ed9\u5b9a\u7684 JVM \u5783\u573e\u6536\u96c6\u5668\u4e2d\u82b1\u8d39\u7684\u79d2\u6570.")))),(0,r.yg)("h4",{id:"threadexports"},"ThreadExports"),(0,r.yg)("table",null,(0,r.yg)("thead",{parentName:"table"},(0,r.yg)("tr",{parentName:"thead"},(0,r.yg)("th",{parentName:"tr",align:"center"},"name"),(0,r.yg)("th",{parentName:"tr",align:"center"},"type"),(0,r.yg)("th",{parentName:"tr",align:"center"},"labels"),(0,r.yg)("th",{parentName:"tr",align:"center"},"help"))),(0,r.yg)("tbody",{parentName:"table"},(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"center"},"jvm_threads_current"),(0,r.yg)("td",{parentName:"tr",align:"center"},"gauge"),(0,r.yg)("td",{parentName:"tr",align:"center"}),(0,r.yg)("td",{parentName:"tr",align:"center"},"JVM \u7684\u5f53\u524d\u7ebf\u7a0b\u6570")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"center"},"jvm_threads_daemon"),(0,r.yg)("td",{parentName:"tr",align:"center"},"gauge"),(0,r.yg)("td",{parentName:"tr",align:"center"}),(0,r.yg)("td",{parentName:"tr",align:"center"},"JVM \u7684\u5b88\u62a4\u8fdb\u7a0b\u7ebf\u7a0b\u6570")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"center"},"jvm_threads_peak"),(0,r.yg)("td",{parentName:"tr",align:"center"},"gauge"),(0,r.yg)("td",{parentName:"tr",align:"center"}),(0,r.yg)("td",{parentName:"tr",align:"center"},"JVM \u7684\u5cf0\u503c\u7ebf\u7a0b\u6570")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"center"},"jvm_threads_started_total"),(0,r.yg)("td",{parentName:"tr",align:"center"},"counter"),(0,r.yg)("td",{parentName:"tr",align:"center"}),(0,r.yg)("td",{parentName:"tr",align:"center"},"JVM \u7684\u5df2\u542f\u52a8\u7684\u7ebf\u7a0b\u6570")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"center"},"jvm_threads_deadlocked"),(0,r.yg)("td",{parentName:"tr",align:"center"},"gauge"),(0,r.yg)("td",{parentName:"tr",align:"center"}),(0,r.yg)("td",{parentName:"tr",align:"center"},"\u5904\u4e8e\u6b7b\u9501\u72b6\u6001\u7684 JVM \u7ebf\u7a0b\u5faa\u73af\u7b49\u5f85\u83b7\u53d6\u5bf9\u8c61\u76d1\u89c6\u5668\u6216\u53ef\u62e5\u6709\u7684\u540c\u6b65\u5668")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"center"},"jvm_threads_deadlocked_monitor"),(0,r.yg)("td",{parentName:"tr",align:"center"},"gauge"),(0,r.yg)("td",{parentName:"tr",align:"center"}),(0,r.yg)("td",{parentName:"tr",align:"center"},"\u5904\u4e8e\u6b7b\u9501\u7b49\u5f85\u83b7\u53d6\u5bf9\u8c61\u76d1\u89c6\u5668\u7684 JVM \u7ebf\u7a0b\u5468\u671f")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"center"},"jvm_threads_state"),(0,r.yg)("td",{parentName:"tr",align:"center"},"gauge"),(0,r.yg)("td",{parentName:"tr",align:"center"},"{state}"),(0,r.yg)("td",{parentName:"tr",align:"center"},"\u72b6\u6001\u4e3a{state}\u7684\u7ebf\u7a0b\u6570")))),(0,r.yg)("h4",{id:"classloadingexports"},"ClassLoadingExports"),(0,r.yg)("table",null,(0,r.yg)("thead",{parentName:"table"},(0,r.yg)("tr",{parentName:"thead"},(0,r.yg)("th",{parentName:"tr",align:"center"},"name"),(0,r.yg)("th",{parentName:"tr",align:"center"},"type"),(0,r.yg)("th",{parentName:"tr",align:"center"},"labels"),(0,r.yg)("th",{parentName:"tr",align:"center"},"help"))),(0,r.yg)("tbody",{parentName:"table"},(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"center"},"jvm_classes_loaded"),(0,r.yg)("td",{parentName:"tr",align:"center"},"gauge"),(0,r.yg)("td",{parentName:"tr",align:"center"}),(0,r.yg)("td",{parentName:"tr",align:"center"},"\u5f53\u524d\u5728 JVM \u4e2d\u52a0\u8f7d\u7684\u7c7b\u7684\u6570\u91cf")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"center"},"jvm_classes_loaded_total"),(0,r.yg)("td",{parentName:"tr",align:"center"},"counter"),(0,r.yg)("td",{parentName:"tr",align:"center"}),(0,r.yg)("td",{parentName:"tr",align:"center"},"\u81ea JVM \u5f00\u59cb\u6267\u884c\u4ee5\u6765\u5df2\u52a0\u8f7d\u7684\u7c7b\u603b\u6570")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"center"},"jvm_classes_unloaded_total"),(0,r.yg)("td",{parentName:"tr",align:"center"},"counter"),(0,r.yg)("td",{parentName:"tr",align:"center"}),(0,r.yg)("td",{parentName:"tr",align:"center"},"\u81ea JVM \u5f00\u59cb\u6267\u884c\u4ee5\u6765\u5df2\u5378\u8f7d\u7684\u7c7b\u603b\u6570")))),(0,r.yg)("h4",{id:"versioninfoexports"},"VersionInfoExports"),(0,r.yg)("table",null,(0,r.yg)("thead",{parentName:"table"},(0,r.yg)("tr",{parentName:"thead"},(0,r.yg)("th",{parentName:"tr",align:"center"},"name"),(0,r.yg)("th",{parentName:"tr",align:"center"},"type"),(0,r.yg)("th",{parentName:"tr",align:"center"},"labels"),(0,r.yg)("th",{parentName:"tr",align:"center"},"help"))),(0,r.yg)("tbody",{parentName:"table"},(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"center"},"jvm"),(0,r.yg)("td",{parentName:"tr",align:"center"},"info"),(0,r.yg)("td",{parentName:"tr",align:"center"},"{version(java.runtime.version),vendor(java.vm.vendor),runtime(java.runtime.name)}"),(0,r.yg)("td",{parentName:"tr",align:"center"},"JVM \u7248\u672c\u4fe1\u606f")))),(0,r.yg)("h2",{id:"\u6536\u96c6-metrics"},"\u6536\u96c6 metrics"),(0,r.yg)("p",null,"\u7528\u6237\u9700\u90e8\u7f72",(0,r.yg)("inlineCode",{parentName:"p"},"Prometheus")," \u670d\u52a1\u6765\u91c7\u96c6"),(0,r.yg)("h3",{id:"windows-\u73af\u5883\u4e0b\u5b89\u88c5prometheus"},"Windows \u73af\u5883\u4e0b\u5b89\u88c5Prometheus"),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("p",{parentName:"li"},"\u9009\u62e9\u5bf9\u5e94\u73af\u5883\u7684 ",(0,r.yg)("a",{parentName:"p",href:"https://prometheus.io/download/"},"\u4e0b\u8f7d\u5730\u5740")," \u5b89\u88c5")),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("p",{parentName:"li"},"\u4fee\u6539\u914d\u7f6e\u6587\u4ef6\uff1a",(0,r.yg)("inlineCode",{parentName:"p"},"prometheus.yml")),(0,r.yg)("pre",{parentName:"li"},(0,r.yg)("code",{parentName:"pre",className:"language-yaml"},"scrape_configs:\n  - job_name: 'Apache ShenYu'\n    # metrics_path defaults to '/metrics'\n    # scheme defaults to 'http'.\n    static_configs:\n    - targets: ['localhost:8090'] # metrics of apache shenyu are exposed on port 8090 by default\n")))),(0,r.yg)("p",null,(0,r.yg)("strong",{parentName:"p"},"\u6ce8\uff1a")," ",(0,r.yg)("inlineCode",{parentName:"p"},"job_name"),"\u8ddf",(0,r.yg)("inlineCode",{parentName:"p"},"monitor"),"\u63d2\u4ef6\u914d\u7f6e\u7684",(0,r.yg)("inlineCode",{parentName:"p"},"metricsName"),"\u76f8\u5bf9\u5e94"),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},"\u914d\u7f6e\u5b8c\u6210\u4e4b\u540e\uff0c\u5728 ",(0,r.yg)("inlineCode",{parentName:"li"},"windows")," \u4e0b\u53ef\u4ee5\u76f4\u63a5\u53cc\u51fb ",(0,r.yg)("inlineCode",{parentName:"li"},"prometheus.exe")," \u542f\u52a8\u5373\u53ef\uff0c\u9ed8\u8ba4\u542f\u52a8\u7aef\u53e3\u4e3a ",(0,r.yg)("inlineCode",{parentName:"li"},"9090")," \uff0c\u8bbf\u95ee http://localhost:9090/ \uff0c\u70b9\u51fb",(0,r.yg)("inlineCode",{parentName:"li"},"status"),"->",(0,r.yg)("inlineCode",{parentName:"li"},"Targets"),"\uff0c\u9a8c\u8bc1\u662f\u5426\u6210\u529f\u3002")),(0,r.yg)("p",null,(0,r.yg)("img",{src:a(50125).A})),(0,r.yg)("h3",{id:"macos-\u73af\u5883\u4e0b\u5b89\u88c5prometheus"},"MacOS \u73af\u5883\u4e0b\u5b89\u88c5Prometheus"),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},"\u4f7f\u7528brew \u5b89\u88c5 prometheus\uff0c\u5b89\u88c5\u5b8c\u6210\u540e",(0,r.yg)("inlineCode",{parentName:"li"},"prometheus")," \u5728",(0,r.yg)("inlineCode",{parentName:"li"},"homebrew"),"\u4e0b\u7684 ",(0,r.yg)("inlineCode",{parentName:"li"},"Cellar")," \u6587\u4ef6\u5939\u4e2d\u3002")),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre"},"brew install prometheus\n")),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},"\u5728prometheus.yml\u6587\u4ef6\u6240\u5728\u4f4d\u7f6e\u6267\u884c\u5982\u4e0b\u547d\u4ee4\u5373\u53ef\u542f\u52a8prometheus\u3002")),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre"},"prometheus --config.file=prometheus.yml &\n")),(0,r.yg)("p",null,"\u8bbf\u95ee ",(0,r.yg)("inlineCode",{parentName:"p"},"http://localhost:9090/")," \u9a8c\u8bc1\u662f\u5426\u6b63\u5e38\u542f\u52a8\u3002"),(0,r.yg)("h2",{id:"\u9762\u677f\u5c55\u793a"},"\u9762\u677f\u5c55\u793a"),(0,r.yg)("p",null,"\u63a8\u8350\u4f7f\u7528 ",(0,r.yg)("inlineCode",{parentName:"p"},"Grafana"),"\uff0c\u7528\u6237\u53ef\u4ee5\u81ea\u5b9a\u4e49\u67e5\u8be2\u6765\u4e2a\u6027\u5316\u663e\u793a\u9762\u677f\u76d8\u3002"),(0,r.yg)("p",null,"\u4e0b\u9762\u4ecb\u7ecd\u5982\u4f55\u5b89\u88c5 ",(0,r.yg)("inlineCode",{parentName:"p"},"Grafana")," "),(0,r.yg)("h3",{id:"windows\u73af\u5883\u4e0b\u5b89\u88c5grafana"},"windows\u73af\u5883\u4e0b\u5b89\u88c5Grafana"),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},"\u5b89\u88c5 ",(0,r.yg)("inlineCode",{parentName:"li"},"Grafana"))),(0,r.yg)("p",null,(0,r.yg)("a",{parentName:"p",href:"https://dl.grafana.com/oss/release/grafana-7.4.2.windows-amd64.zip"},"\u4e0b\u8f7d\u5730\u5740")," \u89e3\u538b\u8fdb\u5165 ",(0,r.yg)("inlineCode",{parentName:"p"},"bin")," \u76ee\u5f55\u7136\u540e\u53cc\u51fb ",(0,r.yg)("inlineCode",{parentName:"p"},"grafana-server.exe")," \u8fd0\u884c \u8bbf\u95ee ",(0,r.yg)("inlineCode",{parentName:"p"},"http://localhost:3000/?orgId=1")," admin/admin \u9a8c\u8bc1\u662f\u5426\u6210\u529f"),(0,r.yg)("h3",{id:"macos\u73af\u5883\u4e0b\u5b89\u88c5grafana"},"macos\u73af\u5883\u4e0b\u5b89\u88c5Grafana"),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},"\u4f7f\u7528brew \u5b89\u88c5 grafana \u3002")),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre"},"brew install grafana\n")),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},"\u4ee5\u670d\u52a1\u65b9\u5f0f\u542f\u52a8grafana")),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre"},"brew services start grafana\n")),(0,r.yg)("p",null,"\u8bbf\u95ee ",(0,r.yg)("inlineCode",{parentName:"p"},"http://localhost:3000/")," \u9a8c\u8bc1\u662f\u5426\u6b63\u5e38\u542f\u52a8\u3002"),(0,r.yg)("h3",{id:"\u4f7f\u7528grafana\u67e5\u770b\u76d1\u63a7\u6570\u636e"},"\u4f7f\u7528Grafana\u67e5\u770b\u76d1\u63a7\u6570\u636e"),(0,r.yg)("p",null,"\u914d\u7f6e\u6570\u636e\u6e90\uff0c\u9009\u62e9prometheus\uff0c\u6ce8\u610f\u6570\u636e\u6e90\u540d\u5b57\u4e3aprometheus\u3002"),(0,r.yg)("p",null,(0,r.yg)("img",{src:a(96228).A})),(0,r.yg)("p",null,(0,r.yg)("img",{src:a(40099).A})),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},"\u914d\u7f6e\u81ea\u5b9a\u4e49metric\u9762\u677f",(0,r.yg)("inlineCode",{parentName:"li"},"request_total"),"\u3001",(0,r.yg)("inlineCode",{parentName:"li"},"http_request_total"))),(0,r.yg)("p",null,"\u70b9\u51fb ",(0,r.yg)("inlineCode",{parentName:"p"},"Create")," - ",(0,r.yg)("inlineCode",{parentName:"p"},"Import")," \u8f93\u5165",(0,r.yg)("inlineCode",{parentName:"p"},"dashboards")," \u7684 ",(0,r.yg)("a",{parentName:"p",href:"https://shenyu.apache.org/img/shenyu/monitor/request_metric_dashboard.json"},"\u9762\u677fjson\u914d\u7f6e")),(0,r.yg)("p",null,"\u6700\u7ec8\u81ea\u5b9a\u4e49 ",(0,r.yg)("inlineCode",{parentName:"p"},"Http")," \u8bf7\u6c42\u76d1\u63a7\u9762\u677f\u6548\u679c\u5982\u4e0b\uff1a"),(0,r.yg)("p",null,(0,r.yg)("img",{src:a(45266).A})),(0,r.yg)("p",null,(0,r.yg)("img",{src:a(76233).A})),(0,r.yg)("p",null,(0,r.yg)("img",{src:a(81760).A})),(0,r.yg)("p",null,(0,r.yg)("img",{src:a(33087).A})),(0,r.yg)("p",null,(0,r.yg)("img",{src:a(36150).A})))}d.isMDXComponent=!0},50125:(e,t,a)=>{a.d(t,{A:()=>n});const n=a.p+"assets/images/request-metric-6-e6e3fea6e33e3799c8f4d2dfa98bc5ec.png"},76233:(e,t,a)=>{a.d(t,{A:()=>n});const n=a.p+"assets/images/request-metric-2-4ef0ea780f6d612bb1076decaa4c4549.png"},81760:(e,t,a)=>{a.d(t,{A:()=>n});const n=a.p+"assets/images/request-metric-3-25e310a4c0c636d2ccd872bada66bfe9.png"},96228:(e,t,a)=>{a.d(t,{A:()=>n});const n=a.p+"assets/images/request-metric-7-355daf90afad71497091d1b1fdb477fb.png"}}]);