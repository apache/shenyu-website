"use strict";(self.webpackChunkshenyu_website=self.webpackChunkshenyu_website||[]).push([[97216],{15680:(e,n,t)=>{t.d(n,{xA:()=>c,yg:()=>d});var a=t(96540);function r(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function i(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,a)}return t}function o(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?i(Object(t),!0).forEach((function(n){r(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function l(e,n){if(null==e)return{};var t,a,r=function(e,n){if(null==e)return{};var t,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)t=i[a],n.indexOf(t)>=0||(r[t]=e[t]);return r}(e,n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)t=i[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}var s=a.createContext({}),p=function(e){var n=a.useContext(s),t=n;return e&&(t="function"==typeof e?e(n):o(o({},n),e)),t},c=function(e){var n=p(e.components);return a.createElement(s.Provider,{value:n},e.children)},u="mdxType",g={inlineCode:"code",wrapper:function(e){var n=e.children;return a.createElement(a.Fragment,{},n)}},y=a.forwardRef((function(e,n){var t=e.components,r=e.mdxType,i=e.originalType,s=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),u=p(t),y=r,d=u["".concat(s,".").concat(y)]||u[y]||g[y]||i;return t?a.createElement(d,o(o({ref:n},c),{},{components:t})):a.createElement(d,o({ref:n},c))}));function d(e,n){var t=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var i=t.length,o=new Array(i);o[0]=y;var l={};for(var s in n)hasOwnProperty.call(n,s)&&(l[s]=n[s]);l.originalType=e,l[u]="string"==typeof e?e:r,o[1]=l;for(var p=2;p<i;p++)o[p]=t[p];return a.createElement.apply(null,o)}return a.createElement.apply(null,t)}y.displayName="MDXCreateElement"},9253:(e,n,t)=>{t.r(n),t.d(n,{contentTitle:()=>o,default:()=>u,frontMatter:()=>i,metadata:()=>l,toc:()=>s});var a=t(58168),r=(t(96540),t(15680));const i={title:"Observability",keywords:["Observability"],description:"Observability access"},o=void 0,l={unversionedId:"user-guide/observability/observability",id:"version-2.4.2/user-guide/observability/observability",isDocsHomePage:!1,title:"Observability",description:"Observability access",source:"@site/versioned_docs/version-2.4.2/user-guide/observability/observability.md",sourceDirName:"user-guide/observability",slug:"/user-guide/observability/observability",permalink:"/docs/2.4.2/user-guide/observability/observability",editUrl:"https://github.com/apache/shenyu-website/edit/main/versioned_docs/version-2.4.2/user-guide/observability/observability.md",version:"2.4.2",frontMatter:{title:"Observability",keywords:["Observability"],description:"Observability access"},sidebar:"version-2.4.2/tutorialSidebar",previous:{title:"Gateway Property Config",permalink:"/docs/2.4.2/user-guide/property-config/gateway-property-config"},next:{title:"Tracing",permalink:"/docs/2.4.2/user-guide/observability/tracing"}},s=[{value:"Java agent",id:"java-agent",children:[]},{value:"Tracing",id:"tracing",children:[]},{value:"Metrics",id:"metrics",children:[]},{value:"Logging",id:"logging",children:[]},{value:"Download and compile the code",id:"download-and-compile-the-code",children:[]},{value:"shenyu-agent.yaml",id:"shenyu-agentyaml",children:[]},{value:"For use",id:"for-use",children:[]}],p={toc:s},c="wrapper";function u(e){let{components:n,...t}=e;return(0,r.yg)(c,(0,a.A)({},p,t,{components:n,mdxType:"MDXLayout"}),(0,r.yg)("p",null,"This article introduces the ",(0,r.yg)("inlineCode",{parentName:"p"},"Apache ShenYu Agent")," module."),(0,r.yg)("h2",{id:"java-agent"},"Java agent"),(0,r.yg)("p",null,(0,r.yg)("inlineCode",{parentName:"p"},"Apache ShenYu")," uses ",(0,r.yg)("inlineCode",{parentName:"p"},"java agent")," and ",(0,r.yg)("inlineCode",{parentName:"p"},"bytecode enhancement")," technology to achieve seamless embedding, so that users can access third-party observability systems without introducing dependencies, and obtain Traces, Metrics and Logging."),(0,r.yg)("h2",{id:"tracing"},"Tracing"),(0,r.yg)("p",null,"Link tracking, call chain data is collected via probes and third party systems (Jaeger, Zipkin) to pull the data and then display it."),(0,r.yg)("h2",{id:"metrics"},"Metrics"),(0,r.yg)("p",null,"System statistics metrics, collected by probes, are written to third-party timing databases such as prometheus and then displayed."),(0,r.yg)("h2",{id:"logging"},"Logging"),(0,r.yg)("p",null,"Take the shenyu gateway log information, write it to elasticSearch (or send it to the messaging middleware), and display it."),(0,r.yg)("h2",{id:"download-and-compile-the-code"},"Download and compile the code"),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},"Download code")),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-shell"},"git clone https://github.com/apache/incubator-shenyu.git\n")),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},"Use Maven to compile the code")),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-shell"},"cd incubator-shenyu\nmvn clean install -Dmaven.javadoc.skip=true -B -Drat.skip=true -Djacoco.skip=true -DskipITs -DskipTests\n")),(0,r.yg)("p",null,"After the compilation is successful, you can see the compiled jar package and related configuration files of the ",(0,r.yg)("inlineCode",{parentName:"p"},"shenyu-agent")," module in the ",(0,r.yg)("inlineCode",{parentName:"p"},"~/shenyu/shenyu-dist/shenyu-agent-dist/target/shenyu-agent")," directory."),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-text"},".\n\u251c\u2500\u2500 conf\n\u2502\xa0\xa0 \u251c\u2500\u2500 logback.xml\n\u2502\xa0\xa0 \u251c\u2500\u2500 shenyu-agent.yaml\n\u2502\xa0\xa0 \u2514\u2500\u2500 tracing-point.yaml\n\u251c\u2500\u2500 plugins\n\u2502\xa0\xa0 \u251c\u2500\u2500 shenyu-agent-plugin-xxx.jar\n\u2514\u2500\u2500 shenyu-agent.jar\n")),(0,r.yg)("h2",{id:"shenyu-agentyaml"},"shenyu-agent.yaml"),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-yaml"},"appName: shenyu-agent\nsupports:\n  tracing:\n    - pluginName\n  metrics:\n    - pluginName\n  logging:\n    - pluginName\n  \nplugins:\n  tracing:\n    pluginName:\n      host: \n      port:\n      props:\n  metrics:\n    pluginName:\n      host: \n      port:\n      props:\n  logging:\n    pluginName:\n      host: \n      port:\n      props:\n")),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},"Select the plugin to be used in ",(0,r.yg)("inlineCode",{parentName:"li"},"supports")),(0,r.yg)("li",{parentName:"ul"},"Configure the parameters of the plug-in in ",(0,r.yg)("inlineCode",{parentName:"li"},"plugins"),". The specific usage of each plug-in props parameter is shown in the following tables:")),(0,r.yg)("h2",{id:"for-use"},"For use"),(0,r.yg)("p",null,"For deployment, please refer to ",(0,r.yg)("a",{parentName:"p",href:"/docs/2.4.2/deployment/deployment-package#start-shenyu-bootstrap-with-shenyu-agent"},"Binary Packages Deployment")," or ",(0,r.yg)("a",{parentName:"p",href:"/docs/2.4.2/deployment/deployment-docker#start-shenyu-bootstrap-with-shenyu-agent"},"Docker Deployment")),(0,r.yg)("blockquote",null,(0,r.yg)("p",{parentName:"blockquote"},"Developers can add the ",(0,r.yg)("inlineCode",{parentName:"p"},"-javaagent")," parameter to the JVM parameter of the IDE startup configuration, please refer to ",(0,r.yg)("a",{parentName:"p",href:"/docs/2.4.2/developer/debug-agent"},"Local debug and run agent module"),".")))}u.isMDXComponent=!0}}]);