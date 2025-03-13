"use strict";(self.webpackChunkshenyu_website=self.webpackChunkshenyu_website||[]).push([[51422],{15680:(e,n,t)=>{t.d(n,{xA:()=>g,yg:()=>d});var a=t(96540);function r(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function i(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,a)}return t}function l(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?i(Object(t),!0).forEach((function(n){r(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function o(e,n){if(null==e)return{};var t,a,r=function(e,n){if(null==e)return{};var t,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)t=i[a],n.indexOf(t)>=0||(r[t]=e[t]);return r}(e,n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)t=i[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}var p=a.createContext({}),s=function(e){var n=a.useContext(p),t=n;return e&&(t="function"==typeof e?e(n):l(l({},n),e)),t},g=function(e){var n=s(e.components);return a.createElement(p.Provider,{value:n},e.children)},u="mdxType",c={inlineCode:"code",wrapper:function(e){var n=e.children;return a.createElement(a.Fragment,{},n)}},m=a.forwardRef((function(e,n){var t=e.components,r=e.mdxType,i=e.originalType,p=e.parentName,g=o(e,["components","mdxType","originalType","parentName"]),u=s(t),m=r,d=u["".concat(p,".").concat(m)]||u[m]||c[m]||i;return t?a.createElement(d,l(l({ref:n},g),{},{components:t})):a.createElement(d,l({ref:n},g))}));function d(e,n){var t=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var i=t.length,l=new Array(i);l[0]=m;var o={};for(var p in n)hasOwnProperty.call(n,p)&&(o[p]=n[p]);o.originalType=e,o[u]="string"==typeof e?e:r,l[1]=o;for(var s=2;s<i;s++)l[s]=t[s];return a.createElement.apply(null,l)}return a.createElement.apply(null,t)}m.displayName="MDXCreateElement"},20166:(e,n,t)=>{t.d(n,{A:()=>a});const a=t.p+"assets/images/shenyu-metrics-805b9a2539e9808d934caae9b3a1404f.png"},24460:(e,n,t)=>{t.d(n,{A:()=>a});const a=t.p+"assets/images/request-metric-668b020e651affd9dfd0399da7c8e008.png"},30756:(e,n,t)=>{t.d(n,{A:()=>a});const a=t.p+"assets/images/prometheus-datasource-dc030a55d003f5aec547dd0756f94da1.png"},46939:(e,n,t)=>{t.r(n),t.d(n,{contentTitle:()=>l,default:()=>u,frontMatter:()=>i,metadata:()=>o,toc:()=>p});var a=t(58168),r=(t(96540),t(15680));const i={title:"Monitor Plugin",keywords:["monitor"],description:"monitor plugin"},l=void 0,o={unversionedId:"plugin-center/observability/monitor-plugin",id:"version-2.4.2/plugin-center/observability/monitor-plugin",isDocsHomePage:!1,title:"Monitor Plugin",description:"monitor plugin",source:"@site/versioned_docs/version-2.4.2/plugin-center/observability/monitor-plugin.md",sourceDirName:"plugin-center/observability",slug:"/plugin-center/observability/monitor-plugin",permalink:"/docs/2.4.2/plugin-center/observability/monitor-plugin",editUrl:"https://github.com/apache/shenyu-website/edit/main/versioned_docs/version-2.4.2/plugin-center/observability/monitor-plugin.md",version:"2.4.2",frontMatter:{title:"Monitor Plugin",keywords:["monitor"],description:"monitor plugin"},sidebar:"version-2.4.2/tutorialSidebar",previous:{title:"Logging Plugin",permalink:"/docs/2.4.2/plugin-center/observability/logging-plugin"},next:{title:"GeneralContext Plugin",permalink:"/docs/2.4.2/plugin-center/common/general-context-plugin"}},p=[{value:"Description",id:"description",children:[]},{value:"Technical Solutions",id:"technical-solutions",children:[]},{value:"Plugin Setting",id:"plugin-setting",children:[]},{value:"Metrics Detail",id:"metrics-detail",children:[]},{value:"Collect metrics",id:"collect-metrics",children:[]},{value:"Panel Display",id:"panel-display",children:[]}],s={toc:p},g="wrapper";function u(e){let{components:n,...i}=e;return(0,r.yg)(g,(0,a.A)({},s,i,{components:n,mdxType:"MDXLayout"}),(0,r.yg)("h2",{id:"description"},"Description"),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},"Monitor plugin is used to monitor its own running status(JVM-related) by gateway, include request response delay, QPS, TPS, and other related metrics.")),(0,r.yg)("h2",{id:"technical-solutions"},"Technical Solutions"),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("p",{parentName:"li"},"Flow Diagram\n",(0,r.yg)("img",{src:t(20166).A}))),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("p",{parentName:"li"},"Make even tracking in ShenYu Gateway by asynchronous or synchronous mode.")),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("p",{parentName:"li"},"The ",(0,r.yg)("inlineCode",{parentName:"p"},"prometheus")," server pulls metrics' through http request, and then displays it by ",(0,r.yg)("inlineCode",{parentName:"p"},"Grafana"),"."))),(0,r.yg)("h2",{id:"plugin-setting"},"Plugin Setting"),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},"In ",(0,r.yg)("inlineCode",{parentName:"li"},"shenyu-admin"),"--\x3e BasicConfig --\x3e Plugin --\x3e monitor, set to enable."),(0,r.yg)("li",{parentName:"ul"},"Add the following configuration in the monitor plugin.")),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-yaml"},'{"metricsName":"prometheus","host":"localhost","port":"9190","async":"true"}\n\n# port : Pulled ports for exposing to prometheus service.\n# host : If not filled in, it is the host of Apache ShenYu Gateway.\n# async :"true" is asynchronous event tracking\uff0c false is synchronous event tracking.\n')),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},"If the user don't use, please disable the plugin in the background."),(0,r.yg)("li",{parentName:"ul"},"Introduce ",(0,r.yg)("inlineCode",{parentName:"li"},"monitor")," dependency in the pom.xml file of the gateway.")),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-xml"},"  \x3c!-- apache shenyu monitor plugin start--\x3e\n  <dependency>\n      <groupId>org.apache.shenyu</groupId>\n      <artifactId>shenyu-spring-boot-starter-plugin-monitor</artifactId>\n      <version>${project.version}</version>\n  </dependency>\n  \x3c!-- apache shenyu monitor plugin end--\x3e\n")),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},"Selectors and rules, please refer to: ",(0,r.yg)("a",{parentName:"li",href:"../../user-guide/admin-usage/selector-and-rule"},"Selector And Rule Config"),"."),(0,r.yg)("li",{parentName:"ul"},"Only when the url is matched, the url will request event tracking.")),(0,r.yg)("h2",{id:"metrics-detail"},"Metrics Detail"),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("p",{parentName:"li"},"All JVM\uff0cthread\uff0cmemory\uff0cand other related information will be made event tracking\uff0cyou can add a JVM module in the Grafana' panel, and it will be fully displayed, please refer to\uff1a ",(0,r.yg)("a",{parentName:"p",href:"https://github.com/prometheus/jmx_exporter"},"https://github.com/prometheus/jmx_exporter"))),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("p",{parentName:"li"},"There are also the following custom ",(0,r.yg)("inlineCode",{parentName:"p"},"metrics")))),(0,r.yg)("table",null,(0,r.yg)("thead",{parentName:"table"},(0,r.yg)("tr",{parentName:"thead"},(0,r.yg)("th",{parentName:"tr",align:"left"},"Name"),(0,r.yg)("th",{parentName:"tr",align:"left"},"type"),(0,r.yg)("th",{parentName:"tr",align:"left"},"target"),(0,r.yg)("th",{parentName:"tr",align:"left"},"description"))),(0,r.yg)("tbody",{parentName:"table"},(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"left"},"request_total"),(0,r.yg)("td",{parentName:"tr",align:"left"},"Counter"),(0,r.yg)("td",{parentName:"tr",align:"left"},"none"),(0,r.yg)("td",{parentName:"tr",align:"left"},"collecting all requests of Apache ShenYu Gateway")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"left"},"http_request_total"),(0,r.yg)("td",{parentName:"tr",align:"left"},"Counter"),(0,r.yg)("td",{parentName:"tr",align:"left"},"path,type"),(0,r.yg)("td",{parentName:"tr",align:"left"},"collecting all matched requests of monitor")))),(0,r.yg)("h2",{id:"collect-metrics"},"Collect metrics"),(0,r.yg)("p",null,"Users need to install ",(0,r.yg)("inlineCode",{parentName:"p"},"Prometheus")," service to collect"),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("p",{parentName:"li"},"Choose the corresponding environment ",(0,r.yg)("a",{parentName:"p",href:"https://prometheus.io/download/"},"download address")," to install")),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("p",{parentName:"li"},"Modify configuration file: ",(0,r.yg)("inlineCode",{parentName:"p"},"prometheus.yml")),(0,r.yg)("pre",{parentName:"li"},(0,r.yg)("code",{parentName:"pre",className:"language-yaml"},"scrape_configs:\n  # The job name is added as a label `job=<job_name>` to any timeseries scraped from this config.\n  - job_name: 'prometheus'\n    # metrics_path defaults to '/metrics'\n    # scheme defaults to 'http'.\n    static_configs:\n    - targets: ['localhost:9190']\n")))),(0,r.yg)("p",null,(0,r.yg)("strong",{parentName:"p"},"Note:")," The ",(0,r.yg)("inlineCode",{parentName:"p"},"job_name")," corresponds to the ",(0,r.yg)("inlineCode",{parentName:"p"},"metricsName")," of the ",(0,r.yg)("inlineCode",{parentName:"p"},"monitor")," plug-in configuration"),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},"After the configuration is completed, you can directly double-click ",(0,r.yg)("inlineCode",{parentName:"li"},"prometheus.exe")," in the window to start. The default boot port is ",(0,r.yg)("inlineCode",{parentName:"li"},"9090"),", Success can be verified at http://localhost:9090/")),(0,r.yg)("h2",{id:"panel-display"},"Panel Display"),(0,r.yg)("p",null,"It is recommended to use ",(0,r.yg)("inlineCode",{parentName:"p"},"Grafana"),", Users can customize the query to personalize the display panel."),(0,r.yg)("p",null,"Here's how to install and deploy ",(0,r.yg)("inlineCode",{parentName:"p"},"Grafana for Windows")),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},"Install Grafana")),(0,r.yg)("p",null,(0,r.yg)("a",{parentName:"p",href:"https://dl.grafana.com/oss/release/grafana-7.4.2.windows-amd64.zip"},"download")," Unzip it and enter the ",(0,r.yg)("inlineCode",{parentName:"p"},"bin")," directory and ",(0,r.yg)("inlineCode",{parentName:"p"},"double-click")," ",(0,r.yg)("inlineCode",{parentName:"p"},"grafana-server.exe")," to run it. Go to http://localhost:3000/?orgId=1 ",(0,r.yg)("inlineCode",{parentName:"p"},"admin/admin")," to verify the success"),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},"Config Prometheus DataSource")),(0,r.yg)("p",null,(0,r.yg)("img",{src:t(30756).A})),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},"Config JVM Dashboard")),(0,r.yg)("p",null,"Click ",(0,r.yg)("inlineCode",{parentName:"p"},"Create")," - ",(0,r.yg)("inlineCode",{parentName:"p"},"Import")," and enter the dashboards ID (8563 recommended)."),(0,r.yg)("p",null,(0,r.yg)("img",{src:t(97505).A})),(0,r.yg)("p",null,"The final JVM monitor panel looks like this:"),(0,r.yg)("p",null,(0,r.yg)("img",{src:t(80139).A})),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},"Config Custom Metric Dashboard ",(0,r.yg)("inlineCode",{parentName:"li"},"request_total"),"\u3001",(0,r.yg)("inlineCode",{parentName:"li"},"http_request_total"))),(0,r.yg)("p",null,"Click ",(0,r.yg)("inlineCode",{parentName:"p"},"Create")," - ",(0,r.yg)("inlineCode",{parentName:"p"},"Import")," and enter the ",(0,r.yg)("a",{parentName:"p",href:"https://shenyu.apache.org/img/shenyu/monitor/request_metric_dashboard.json"},"panel config json")),(0,r.yg)("p",null,"The final custom HTTP request monitoring panel looks like this:"),(0,r.yg)("p",null,(0,r.yg)("img",{src:t(24460).A})))}u.isMDXComponent=!0},80139:(e,n,t)=>{t.d(n,{A:()=>a});const a=t.p+"assets/images/jvm-4ec37708e8560160feeece11efe12ac5.png"},97505:(e,n,t)=>{t.d(n,{A:()=>a});const a=t.p+"assets/images/jvm-import-07851d0a4298b838f4940e1255a4b27b.png"}}]);