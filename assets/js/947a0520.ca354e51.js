"use strict";(self.webpackChunkshenyu_website=self.webpackChunkshenyu_website||[]).push([[96155],{15680:(e,t,a)=>{a.d(t,{xA:()=>c,yg:()=>d});var n=a(96540);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function l(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function o(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?l(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):l(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function i(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},l=Object.keys(e);for(n=0;n<l.length;n++)a=l[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(n=0;n<l.length;n++)a=l[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var p=n.createContext({}),s=function(e){var t=n.useContext(p),a=t;return e&&(a="function"==typeof e?e(t):o(o({},t),e)),a},c=function(e){var t=s(e.components);return n.createElement(p.Provider,{value:t},e.children)},u="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},g=n.forwardRef((function(e,t){var a=e.components,r=e.mdxType,l=e.originalType,p=e.parentName,c=i(e,["components","mdxType","originalType","parentName"]),u=s(a),g=r,d=u["".concat(p,".").concat(g)]||u[g]||m[g]||l;return a?n.createElement(d,o(o({ref:t},c),{},{components:a})):n.createElement(d,o({ref:t},c))}));function d(e,t){var a=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var l=a.length,o=new Array(l);o[0]=g;var i={};for(var p in t)hasOwnProperty.call(t,p)&&(i[p]=t[p]);i.originalType=e,i[u]="string"==typeof e?e:r,o[1]=i;for(var s=2;s<l;s++)o[s]=a[s];return n.createElement.apply(null,o)}return n.createElement.apply(null,a)}g.displayName="MDXCreateElement"},47586:(e,t,a)=>{a.r(t),a.d(t,{contentTitle:()=>o,default:()=>u,frontMatter:()=>l,metadata:()=>i,toc:()=>p});var n=a(58168),r=(a(96540),a(15680));const l={title:"Apache ShenYu Start Demo",author:"Kunshuai Zhu",author_title:"Apache ShenYu Contributor",author_url:"https://github.com/JooKS-me",author_image_url:"https://avatars1.githubusercontent.com/u/62384022?v=4",tags:["Apache ShenYu"]},o=void 0,i={permalink:"/blog/Start-SourceCode-Analysis-Start-Demo",editUrl:"https://github.com/apache/shenyu-website/edit/main/blog/Start-SourceCode-Analysis-Start-Demo.md",source:"@site/blog/Start-SourceCode-Analysis-Start-Demo.md",title:"Apache ShenYu Start Demo",description:"Environmental preparation",date:"2025-01-16T02:44:53.365Z",formattedDate:"January 16, 2025",tags:[{label:"Apache ShenYu",permalink:"/blog/tags/apache-shen-yu"}],readingTime:1.395,truncated:!1,prevItem:{title:"RateLimiter SPI code analysis",permalink:"/blog/SPI-SourceCode-Analysis-RateLimiter-SPI"},nextItem:{title:"Code Analysis For Param-Mapping Plugin",permalink:"/blog/Plugin-SourceCode-Analysis-Param-Mapping-Plugin"}},p=[{value:"Environmental preparation",id:"environmental-preparation",children:[]},{value:"Pull ShenYu code",id:"pull-shenyu-code",children:[]},{value:"Compile code",id:"compile-code",children:[]},{value:"Start the gateway service",id:"start-the-gateway-service",children:[]},{value:"Start application service",id:"start-application-service",children:[]},{value:"Test Http request",id:"test-http-request",children:[]},{value:"Use more plugins",id:"use-more-plugins",children:[]}],s={toc:p},c="wrapper";function u(e){let{components:t,...l}=e;return(0,r.yg)(c,(0,n.A)({},s,l,{components:t,mdxType:"MDXLayout"}),(0,r.yg)("h3",{id:"environmental-preparation"},"Environmental preparation"),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},"Install JDK1.8+ locally"),(0,r.yg)("li",{parentName:"ul"},"Install Git locally"),(0,r.yg)("li",{parentName:"ul"},"Install Maven locally"),(0,r.yg)("li",{parentName:"ul"},"Choose a development tool, such as IDEA")),(0,r.yg)("h3",{id:"pull-shenyu-code"},"Pull ShenYu code"),(0,r.yg)("p",null,"Use Git to clone code"),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-shell"},"git clone https://github.com/apache/shenyu.git\n")),(0,r.yg)("h3",{id:"compile-code"},"Compile code"),(0,r.yg)("p",null,"Compile with Maven"),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-shell"},"cd shenyu\nmvn clean install -Dmaven.javadoc.skip=true -B -Drat.skip=true -Djacoco.skip=true -DskipITs -DskipTests\n")),(0,r.yg)("h3",{id:"start-the-gateway-service"},"Start the gateway service"),(0,r.yg)("p",null,"Use development tools, take IDEA as an example."),(0,r.yg)("p",null,"Start ",(0,r.yg)("inlineCode",{parentName:"p"},"shenyu-admin")," (use H2 database by default)"),(0,r.yg)("p",null,(0,r.yg)("img",{alt:"start-demo-admin",src:a(89321).A})),(0,r.yg)("p",null,"Start ",(0,r.yg)("inlineCode",{parentName:"p"},"shenyu-bootstrap")),(0,r.yg)("p",null,(0,r.yg)("img",{alt:"start-demo-bootstrap",src:a(2802).A})),(0,r.yg)("blockquote",null,(0,r.yg)("p",{parentName:"blockquote"},"At this point, shenyu gateway has been activated."),(0,r.yg)("p",{parentName:"blockquote"},"We can open the browser and access the admin console: ",(0,r.yg)("a",{parentName:"p",href:"http://localhost:9095/"},"http://localhost:9095/"))),(0,r.yg)("h3",{id:"start-application-service"},"Start application service"),(0,r.yg)("p",null,"Apache ShenYu provides examples for Http, Dubbo, SpringCloud and other applications to access the shenyu gateway, located in the ",(0,r.yg)("inlineCode",{parentName:"p"},"shenyu-example")," module. Here we take the Http service as an example."),(0,r.yg)("p",null,"If ",(0,r.yg)("inlineCode",{parentName:"p"},"shenyu-example")," is not marked as a Maven project by IDEA, you can right-click the ",(0,r.yg)("inlineCode",{parentName:"p"},"pom.xml")," file in the ",(0,r.yg)("inlineCode",{parentName:"p"},"shenyu-example")," directory to add it as a Maven project."),(0,r.yg)("p",null,(0,r.yg)("img",{alt:"start-demo-maven",src:a(42417).A})),(0,r.yg)("p",null,"Start ",(0,r.yg)("inlineCode",{parentName:"p"},"shenyu-examples-http"),"\u3002"),(0,r.yg)("p",null,(0,r.yg)("img",{alt:"start-demo-examples-http",src:a(47018).A})),(0,r.yg)("p",null,"At this time, ",(0,r.yg)("inlineCode",{parentName:"p"},"shenyu-examples-http")," will automatically register the interface method annotated with ",(0,r.yg)("inlineCode",{parentName:"p"},"@ShenyuSpringMvcClient")," and the related configuration in application.yml to the gateway. When we open the admin console, you can see the relevant configuration in divide and context-path."),(0,r.yg)("h3",{id:"test-http-request"},"Test Http request"),(0,r.yg)("p",null,"Now use ",(0,r.yg)("inlineCode",{parentName:"p"},"postman")," to simulate ",(0,r.yg)("inlineCode",{parentName:"p"},"http")," to request your ",(0,r.yg)("inlineCode",{parentName:"p"},"http")," service:"),(0,r.yg)("p",null,(0,r.yg)("img",{alt:"start-demo-post-http",src:a(16919).A})),(0,r.yg)("h3",{id:"use-more-plugins"},"Use more plugins"),(0,r.yg)("p",null,"We can refer to ",(0,r.yg)("a",{parentName:"p",href:"../docs/index"},"Official Document")," to use other plugins."),(0,r.yg)("p",null,"Here is an example of using the param-mapping plugin."),(0,r.yg)("p",null,"Edit the param-mapping plugin in ",(0,r.yg)("inlineCode",{parentName:"p"},"BasicConfig -> Plugin")," and set ",(0,r.yg)("inlineCode",{parentName:"p"},"status"),"."),(0,r.yg)("p",null,(0,r.yg)("img",{alt:"start-demo-plugin",src:a(81559).A})),(0,r.yg)("p",null,"Configure selectors and rules in ",(0,r.yg)("inlineCode",{parentName:"p"},"PluginList -> http process"),"."),(0,r.yg)("p",null,(0,r.yg)("img",{alt:"start-demo-selector",src:a(1993).A})),(0,r.yg)("p",null,(0,r.yg)("img",{alt:"start-demo-rules",src:a(90033).A})),(0,r.yg)("p",null,"Then use ",(0,r.yg)("inlineCode",{parentName:"p"},"postman")," to make an http request to ",(0,r.yg)("inlineCode",{parentName:"p"},"/http/test/payment"),"."),(0,r.yg)("p",null,(0,r.yg)("img",{alt:"start-demo-post-param-mapping",src:a(28753).A})))}u.isMDXComponent=!0},89321:(e,t,a)=>{a.d(t,{A:()=>n});const n=a.p+"assets/images/start-demo-admin-debdd1ee5e979a4892f26e4d54572ead.png"},2802:(e,t,a)=>{a.d(t,{A:()=>n});const n=a.p+"assets/images/start-demo-bootstrap-cafa4d22b0d69bb6ee82c01e7b45d239.png"},47018:(e,t,a)=>{a.d(t,{A:()=>n});const n=a.p+"assets/images/start-demo-examples-http-a42235638d82a4be8aeefbb819d419be.png"},42417:(e,t,a)=>{a.d(t,{A:()=>n});const n=a.p+"assets/images/start-demo-maven-a52eeb99414c79d32a127312a5d22d6f.png"},81559:(e,t,a)=>{a.d(t,{A:()=>n});const n=a.p+"assets/images/start-demo-plugin-8525f3812e42bed70e28ce23540069b7.png"},16919:(e,t,a)=>{a.d(t,{A:()=>n});const n=a.p+"assets/images/start-demo-post-http-a7e95883d3147d67e6080236d980d72b.png"},28753:(e,t,a)=>{a.d(t,{A:()=>n});const n=a.p+"assets/images/start-demo-post-param-mapping-d5d632dc96eb1f0080c451820e8f7df4.png"},90033:(e,t,a)=>{a.d(t,{A:()=>n});const n=a.p+"assets/images/start-demo-rules-581013f9d7f0f9996b01aab85efcc8e7.png"},1993:(e,t,a)=>{a.d(t,{A:()=>n});const n=a.p+"assets/images/start-demo-selector-98b0b1ae460bdbed17edc40ab730a182.png"}}]);