"use strict";(self.webpackChunkshenyu_website=self.webpackChunkshenyu_website||[]).push([[96215],{15680:(e,n,a)=>{a.d(n,{xA:()=>m,yg:()=>d});var t=a(96540);function r(e,n,a){return n in e?Object.defineProperty(e,n,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[n]=a,e}function i(e,n){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);n&&(t=t.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),a.push.apply(a,t)}return a}function l(e){for(var n=1;n<arguments.length;n++){var a=null!=arguments[n]?arguments[n]:{};n%2?i(Object(a),!0).forEach((function(n){r(e,n,a[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):i(Object(a)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(a,n))}))}return e}function o(e,n){if(null==e)return{};var a,t,r=function(e,n){if(null==e)return{};var a,t,r={},i=Object.keys(e);for(t=0;t<i.length;t++)a=i[t],n.indexOf(a)>=0||(r[a]=e[a]);return r}(e,n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(t=0;t<i.length;t++)a=i[t],n.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var p=t.createContext({}),g=function(e){var n=t.useContext(p),a=n;return e&&(a="function"==typeof e?e(n):l(l({},n),e)),a},m=function(e){var n=g(e.components);return t.createElement(p.Provider,{value:n},e.children)},y="mdxType",s={inlineCode:"code",wrapper:function(e){var n=e.children;return t.createElement(t.Fragment,{},n)}},u=t.forwardRef((function(e,n){var a=e.components,r=e.mdxType,i=e.originalType,p=e.parentName,m=o(e,["components","mdxType","originalType","parentName"]),y=g(a),u=r,d=y["".concat(p,".").concat(u)]||y[u]||s[u]||i;return a?t.createElement(d,l(l({ref:n},m),{},{components:a})):t.createElement(d,l({ref:n},m))}));function d(e,n){var a=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var i=a.length,l=new Array(i);l[0]=u;var o={};for(var p in n)hasOwnProperty.call(n,p)&&(o[p]=n[p]);o.originalType=e,o[y]="string"==typeof e?e:r,l[1]=o;for(var g=2;g<i;g++)l[g]=a[g];return t.createElement.apply(null,l)}return t.createElement.apply(null,a)}u.displayName="MDXCreateElement"},85101:(e,n,a)=>{a.r(n),a.d(n,{contentTitle:()=>l,default:()=>y,frontMatter:()=>i,metadata:()=>o,toc:()=>p});var t=a(58168),r=(a(96540),a(15680));const i={title:"Mock Plugin",keywords:["mock"],description:"mock plugin"},l="1. Overview",o={unversionedId:"plugin-center/mock/mock-plugin",id:"version-2.6.1/plugin-center/mock/mock-plugin",isDocsHomePage:!1,title:"Mock Plugin",description:"mock plugin",source:"@site/versioned_docs/version-2.6.1/plugin-center/mock/mock-plugin.md",sourceDirName:"plugin-center/mock",slug:"/plugin-center/mock/mock-plugin",permalink:"/docs/2.6.1/plugin-center/mock/mock-plugin",editUrl:"https://github.com/apache/shenyu-website/edit/main/versioned_docs/version-2.6.1/plugin-center/mock/mock-plugin.md",version:"2.6.1",frontMatter:{title:"Mock Plugin",keywords:["mock"],description:"mock plugin"},sidebar:"version-2.6.0/tutorialSidebar",previous:{title:"Cache Plugin",permalink:"/docs/2.6.1/plugin-center/cache/cache-plugin"},next:{title:"Custom Load Balancer",permalink:"/docs/2.6.1/developer/spi/custom-load-balance"}},p=[{value:"1.1 Plugin Name",id:"11-plugin-name",children:[]},{value:"1.2 Appropriate Scenario",id:"12-appropriate-scenario",children:[]},{value:"1.3 Plugin functionality",id:"13-plugin-functionality",children:[]},{value:"1.4 Plugin Code",id:"14-plugin-code",children:[]},{value:"1.5 Added since which shenyu version",id:"15-added-since-which-shenyu-version",children:[]},{value:"2.1 Import pom",id:"21-import-pom",children:[]},{value:"2.2 Enable plugin",id:"22-enable-plugin",children:[]},{value:"2.3 Config plugin",id:"23-config-plugin",children:[]},{value:"2.4 <code>${}</code> supported syntax",id:"24--supported-syntax",children:[]}],g={toc:p},m="wrapper";function y(e){let{components:n,...i}=e;return(0,r.yg)(m,(0,t.A)({},g,i,{components:n,mdxType:"MDXLayout"}),(0,r.yg)("h1",{id:"1-overview"},"1. Overview"),(0,r.yg)("h2",{id:"11-plugin-name"},"1.1 Plugin Name"),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},"Mock Plugin")),(0,r.yg)("h2",{id:"12-appropriate-scenario"},"1.2 Appropriate Scenario"),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},"Specify the status code and response body for the request to facilitate testing.")),(0,r.yg)("h2",{id:"13-plugin-functionality"},"1.3 Plugin functionality"),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("p",{parentName:"li"},"Set the status code and body of the request.")),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("p",{parentName:"li"},"Support configuration ",(0,r.yg)("inlineCode",{parentName:"p"},"${}")," placeholder to automatically generate data.")),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("p",{parentName:"li"},(0,r.yg)("strong",{parentName:"p"},"Note:")," In order to support a more flexible data generation method, the mock plug-in supports users to use SpEL expressions to generate mock data. Using SpEL expressions may lead to the risk of executing malicious scripts or applying destructive programs. We recommend that you be extra careful when using them, use them in a safe environment as much as possible, such as an intranet environment, and follow security best practices."))),(0,r.yg)("h2",{id:"14-plugin-code"},"1.4 Plugin Code"),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},"Core module ",(0,r.yg)("inlineCode",{parentName:"li"},"shenyu-plugin-mock")),(0,r.yg)("li",{parentName:"ul"},"Core class ",(0,r.yg)("inlineCode",{parentName:"li"},"org.apache.shenyu.plugin.mock.MockPlugin"))),(0,r.yg)("h2",{id:"15-added-since-which-shenyu-version"},"1.5 Added since which shenyu version"),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},"2.5.0")),(0,r.yg)("h1",{id:"2-how-to-use-plugin"},"2. How to use plugin"),(0,r.yg)("h2",{id:"21-import-pom"},"2.1 Import pom"),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},"import maven config in shenyu-bootstrap project's ",(0,r.yg)("inlineCode",{parentName:"li"},"pom.xml")," file.")),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-xml"},"<dependency>\n    <groupId>org.apache.shenyu</groupId>\n    <artifactId>shenyu-spring-boot-starter-plugin-mock</artifactId>\n    <version>${project.version}</version>\n</dependency>\n")),(0,r.yg)("h2",{id:"22-enable-plugin"},"2.2 Enable plugin"),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},"In ",(0,r.yg)("inlineCode",{parentName:"li"},"shenyu-admin")," --\x3e BasicConfig --\x3e Plugin --\x3e ",(0,r.yg)("inlineCode",{parentName:"li"},"mock")," set Status enable.")),(0,r.yg)("p",null,(0,r.yg)("img",{src:a(23278).A})),(0,r.yg)("h2",{id:"23-config-plugin"},"2.3 Config plugin"),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},"Selector and rule config, please refer: ",(0,r.yg)("a",{parentName:"li",href:"../../user-guide/admin-usage/selector-and-rule"},"Selector and rule config"),"."),(0,r.yg)("li",{parentName:"ul"},"shenyu-admin mock plugin configuration, supports configuring httpStatusCode and responseContent",(0,r.yg)("ul",{parentName:"li"},(0,r.yg)("li",{parentName:"ul"},"httpStatusCode:the status code of the request."),(0,r.yg)("li",{parentName:"ul"},"responseContent:the response body of the request,support configuring ",(0,r.yg)("inlineCode",{parentName:"li"},"${}")," placeholders to generate random data.")))),(0,r.yg)("p",null,(0,r.yg)("img",{src:a(86776).A})),(0,r.yg)("h2",{id:"24--supported-syntax"},"2.4 ",(0,r.yg)("inlineCode",{parentName:"h2"},"${}")," supported syntax"),(0,r.yg)("p",null,(0,r.yg)("strong",{parentName:"p"},(0,r.yg)("del",{parentName:"strong"},(0,r.yg)("inlineCode",{parentName:"del"},"${int|min-max}")))),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("strong",{parentName:"li"},"Description:")," Generate random integers from ",(0,r.yg)("inlineCode",{parentName:"li"},"min")," to ",(0,r.yg)("inlineCode",{parentName:"li"},"max"),", inclusive of ",(0,r.yg)("inlineCode",{parentName:"li"},"min")," and ",(0,r.yg)("inlineCode",{parentName:"li"},"max"),"."),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("strong",{parentName:"li"},"Example:")," ",(0,r.yg)("inlineCode",{parentName:"li"},"${int|10-20}"))),(0,r.yg)("p",null,(0,r.yg)("strong",{parentName:"p"},(0,r.yg)("del",{parentName:"strong"},(0,r.yg)("inlineCode",{parentName:"del"},"${double|min-max|format}")))),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("strong",{parentName:"li"},"Description:")," Generate random floating point numbers from ",(0,r.yg)("inlineCode",{parentName:"li"},"min")," to ",(0,r.yg)("inlineCode",{parentName:"li"},"max"),", formatted according to ",(0,r.yg)("inlineCode",{parentName:"li"},"format"),"."),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("strong",{parentName:"li"},"Example:")," ",(0,r.yg)("inlineCode",{parentName:"li"},"${double|10-20}")," , ",(0,r.yg)("inlineCode",{parentName:"li"},"${double|10-20.5|%.2f}"))),(0,r.yg)("p",null,(0,r.yg)("strong",{parentName:"p"},(0,r.yg)("del",{parentName:"strong"},(0,r.yg)("inlineCode",{parentName:"del"},"${email}")))),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("strong",{parentName:"li"},"Description:")," Generate random email addresses.")),(0,r.yg)("p",null,(0,r.yg)("strong",{parentName:"p"},(0,r.yg)("del",{parentName:"strong"},(0,r.yg)("inlineCode",{parentName:"del"},"${phone}")))),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("strong",{parentName:"li"},"Description:")," Generate random 13-digit mobile number.")),(0,r.yg)("p",null,(0,r.yg)("strong",{parentName:"p"},(0,r.yg)("del",{parentName:"strong"},(0,r.yg)("inlineCode",{parentName:"del"},"${zh|min-max}")))),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("strong",{parentName:"li"},"Description:")," Generate random Chinese strings of length ",(0,r.yg)("inlineCode",{parentName:"li"},"min")," to ",(0,r.yg)("inlineCode",{parentName:"li"},"max"),"."),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("strong",{parentName:"li"},"Example:")," ",(0,r.yg)("inlineCode",{parentName:"li"},"${zh|10-20}"))),(0,r.yg)("p",null,(0,r.yg)("strong",{parentName:"p"},(0,r.yg)("del",{parentName:"strong"},(0,r.yg)("inlineCode",{parentName:"del"},"${en|min-max}")))),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("strong",{parentName:"li"},"Description:")," Generate random English strings of length ",(0,r.yg)("inlineCode",{parentName:"li"},"min")," to ",(0,r.yg)("inlineCode",{parentName:"li"},"max"),"."),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("strong",{parentName:"li"},"Example:")," ",(0,r.yg)("inlineCode",{parentName:"li"},"${en|10-20}"))),(0,r.yg)("p",null,(0,r.yg)("strong",{parentName:"p"},(0,r.yg)("del",{parentName:"strong"},(0,r.yg)("inlineCode",{parentName:"del"},"${bool}")))),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("strong",{parentName:"li"},"Description:")," Generate a random ",(0,r.yg)("inlineCode",{parentName:"li"},"boolean")," value i.e. ",(0,r.yg)("inlineCode",{parentName:"li"},"true")," or ",(0,r.yg)("inlineCode",{parentName:"li"},"false"),".")),(0,r.yg)("p",null,(0,r.yg)("strong",{parentName:"p"},(0,r.yg)("del",{parentName:"strong"},(0,r.yg)("inlineCode",{parentName:"del"},"${list|[arg1,arg2...]}")))),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("strong",{parentName:"li"},"Description:")," Randomly returns any value in a list as a string."),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("strong",{parentName:"li"},"Example:")," ",(0,r.yg)("inlineCode",{parentName:"li"},"${list|[gril,boy]}")," will return ",(0,r.yg)("inlineCode",{parentName:"li"},"boy")," or ",(0,r.yg)("inlineCode",{parentName:"li"},"girl"))),(0,r.yg)("p",null,(0,r.yg)("strong",{parentName:"p"},(0,r.yg)("del",{parentName:"strong"},(0,r.yg)("inlineCode",{parentName:"del"},"${current|format}")))),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("strong",{parentName:"li"},"Description:")," Returns the current time and uses ",(0,r.yg)("inlineCode",{parentName:"li"},"format")," to format, ",(0,r.yg)("inlineCode",{parentName:"li"},"format")," can be default, the default is ",(0,r.yg)("inlineCode",{parentName:"li"},"YYYY-MM-dd HH:mm:ss"),"."),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("strong",{parentName:"li"},"Example:")," ",(0,r.yg)("inlineCode",{parentName:"li"},"${current}"),"\uff0c",(0,r.yg)("inlineCode",{parentName:"li"},"${current|YYYY-MM-dd}"))),(0,r.yg)("p",null,(0,r.yg)("strong",{parentName:"p"},(0,r.yg)("del",{parentName:"strong"},(0,r.yg)("inlineCode",{parentName:"del"},"${array|item|length}")))),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("strong",{parentName:"li"},"Description:")," According to the ",(0,r.yg)("inlineCode",{parentName:"li"},"item")," format definition, an array of length ",(0,r.yg)("inlineCode",{parentName:"li"},"length")," can be generated. All the above data generation rules can be nested in ",(0,r.yg)("inlineCode",{parentName:"li"},"item"),", and the result will be automatically added with ",(0,r.yg)("inlineCode",{parentName:"li"},"[]"),"."),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("strong",{parentName:"li"},"Example:")," ",(0,r.yg)("inlineCode",{parentName:"li"},'${array|{"name":"test"}|3}')," result is ",(0,r.yg)("inlineCode",{parentName:"li"},'[{"name":"test"},{"name":"test"},{"name":"test"}]'),"\uff0c",(0,r.yg)("inlineCode",{parentName:"li"},'${array|{"age":${int|18-65}}|3}'),".")),(0,r.yg)("p",null,(0,r.yg)("strong",{parentName:"p"},"${expression|expression}")),(0,r.yg)("p",null,(0,r.yg)("inlineCode",{parentName:"p"},"Spel")," expressions are currently supported with built-in functions and arguments, which fully replace the old ${} syntax"),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("p",{parentName:"li"},(0,r.yg)("strong",{parentName:"p"},(0,r.yg)("inlineCode",{parentName:"strong"},"${expression|#int(min,max)}"))),(0,r.yg)("ul",{parentName:"li"},(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("p",{parentName:"li"},(0,r.yg)("strong",{parentName:"p"},"Description:")," Generate random integers from ",(0,r.yg)("inlineCode",{parentName:"p"},"min")," to ",(0,r.yg)("inlineCode",{parentName:"p"},"max"),", inclusive of ",(0,r.yg)("inlineCode",{parentName:"p"},"min")," and ",(0,r.yg)("inlineCode",{parentName:"p"},"max"),".")),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("p",{parentName:"li"},(0,r.yg)("strong",{parentName:"p"},"Example\uff1a")," ",(0,r.yg)("inlineCode",{parentName:"p"},"${expression|#int(1,2)}"))))),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("p",{parentName:"li"},(0,r.yg)("strong",{parentName:"p"},(0,r.yg)("inlineCode",{parentName:"strong"},"${expression|#double(min,max)}"))),(0,r.yg)("ul",{parentName:"li"},(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("strong",{parentName:"li"},"Description:")," Generate random floating point numbers from ",(0,r.yg)("inlineCode",{parentName:"li"},"min")," to ",(0,r.yg)("inlineCode",{parentName:"li"},"max"),", formatted according to ",(0,r.yg)("inlineCode",{parentName:"li"},"format"),"."),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("strong",{parentName:"li"},"Example:"),(0,r.yg)("inlineCode",{parentName:"li"},"${expression|#double(10.5,12.0)}"),",",(0,r.yg)("inlineCode",{parentName:"li"},"${expression|#double(10.5,12.0,'\uffe5%.2f')}")))),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("p",{parentName:"li"},(0,r.yg)("strong",{parentName:"p"},(0,r.yg)("inlineCode",{parentName:"strong"},"${expression|#email()}"))),(0,r.yg)("ul",{parentName:"li"},(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("strong",{parentName:"li"},"Description:")," Generate random email addresses."))),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("p",{parentName:"li"},(0,r.yg)("strong",{parentName:"p"},(0,r.yg)("inlineCode",{parentName:"strong"},"${expression|#phone()}"))),(0,r.yg)("ul",{parentName:"li"},(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("strong",{parentName:"li"},"Description:")," Generate random 13-digit mobile number."))),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("p",{parentName:"li"},(0,r.yg)("strong",{parentName:"p"},(0,r.yg)("inlineCode",{parentName:"strong"},"${expression|zh(min,max)}"))),(0,r.yg)("ul",{parentName:"li"},(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("strong",{parentName:"li"},"Description:")," Generate random Chinese strings of length ",(0,r.yg)("inlineCode",{parentName:"li"},"min")," to ",(0,r.yg)("inlineCode",{parentName:"li"},"max"),"."),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("strong",{parentName:"li"},"Example\uff1a")," ",(0,r.yg)("inlineCode",{parentName:"li"},"${expression|#zh(1,10)}")))),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("p",{parentName:"li"},(0,r.yg)("strong",{parentName:"p"},(0,r.yg)("inlineCode",{parentName:"strong"},"${expression|#bool()}"))),(0,r.yg)("ul",{parentName:"li"},(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("strong",{parentName:"li"},"Description:")," Generate a random ",(0,r.yg)("inlineCode",{parentName:"li"},"boolean")," value i.e. ",(0,r.yg)("inlineCode",{parentName:"li"},"true")," or ",(0,r.yg)("inlineCode",{parentName:"li"},"false"),"."))),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("p",{parentName:"li"},(0,r.yg)("strong",{parentName:"p"},(0,r.yg)("inlineCode",{parentName:"strong"},"${expression|#oneOf(arg1,arg2...)}"))),(0,r.yg)("ul",{parentName:"li"},(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("strong",{parentName:"li"},"Description:")," Randomly returns any value in a list."),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("strong",{parentName:"li"},"Example\uff1a")," ",(0,r.yg)("inlineCode",{parentName:"li"},"${expression|#oneOf('shenyu','number',1)}"),"  will return ",(0,r.yg)("inlineCode",{parentName:"li"},"'shenyu'")," or ",(0,r.yg)("inlineCode",{parentName:"li"},"'number'"),"or",(0,r.yg)("inlineCode",{parentName:"li"},"1")))),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("p",{parentName:"li"},(0,r.yg)("strong",{parentName:"p"},(0,r.yg)("inlineCode",{parentName:"strong"},"${expression|current()}"))),(0,r.yg)("ul",{parentName:"li"},(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("strong",{parentName:"li"},"Description:")," Returns the current time and uses ",(0,r.yg)("inlineCode",{parentName:"li"},"format")," to format, ",(0,r.yg)("inlineCode",{parentName:"li"},"format")," can be default, the default is ",(0,r.yg)("inlineCode",{parentName:"li"},"YYYY-MM-dd HH:mm:ss"),"."),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("strong",{parentName:"li"},"Example\uff1a"),"  ",(0,r.yg)("inlineCode",{parentName:"li"},"${expression|#current()}"),"\uff0c",(0,r.yg)("inlineCode",{parentName:"li"},"${expression|#current('YYYY-MM-dd')}")))),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("p",{parentName:"li"},(0,r.yg)("strong",{parentName:"p"},(0,r.yg)("inlineCode",{parentName:"strong"},"${expression|#array(item,length)}"))),(0,r.yg)("ul",{parentName:"li"},(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("p",{parentName:"li"},(0,r.yg)("strong",{parentName:"p"},"Description:")," According to the ",(0,r.yg)("inlineCode",{parentName:"p"},"item")," format definition, an array of length ",(0,r.yg)("inlineCode",{parentName:"p"},"length")," can be generated. ")),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("p",{parentName:"li"},(0,r.yg)("strong",{parentName:"p"},"Example:")," ",(0,r.yg)("inlineCode",{parentName:"p"},"expression|#array('shenyu',3)")," would generate ",(0,r.yg)("inlineCode",{parentName:"p"},'["shenyu","shenyu","shenyu"]'),"."),(0,r.yg)("p",{parentName:"li"},"You can use it nested like",(0,r.yg)("inlineCode",{parentName:"p"},"${expression|#array(#bool(),2)}"),"or",(0,r.yg)("inlineCode",{parentName:"p"},"${expression|#array(#array('shenyu',2),2)}"))))),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("p",{parentName:"li"},(0,r.yg)("strong",{parentName:"p"},(0,r.yg)("inlineCode",{parentName:"strong"},"${expression|#req}"))),(0,r.yg)("ul",{parentName:"li"},(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("strong",{parentName:"li"},"Description:")," Req is built-in request parameters ,which can generate response data based on request content"),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("strong",{parentName:"li"},"Example:"),(0,r.yg)("inlineCode",{parentName:"li"},"${expression|#req.method}"),"\u3001",(0,r.yg)("inlineCode",{parentName:"li"},"${expression|#req.queries['query_name']}"),"\u3001",(0,r.yg)("inlineCode",{parentName:"li"},"${req.queries.query_name}"),"\u3001",(0,r.yg)("inlineCode",{parentName:"li"},"${expression|#req.uri}"),"\u3002",(0,r.yg)("inlineCode",{parentName:"li"},"jsonPath")," is used when the request body is json . For example ,when the request body is ",(0,r.yg)("inlineCode",{parentName:"li"},'{"name":"shenyu"}'),"\uff0c",(0,r.yg)("inlineCode",{parentName:"li"},"${expression|#req.json.name}"),'would return "shenyu"')))),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("p",{parentName:"li"},(0,r.yg)("strong",{parentName:"p"},(0,r.yg)("inlineCode",{parentName:"strong"},"${expression|spel}"))),(0,r.yg)("ul",{parentName:"li"},(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("strong",{parentName:"li"},"Description"),"\uff1aUse Spel expressions directly to generate data"),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("strong",{parentName:"li"},"Example"),"\uff1a",(0,r.yg)("inlineCode",{parentName:"li"},"${expression|T(java.time.LocalDate).now()}"),"\u3001",(0,r.yg)("inlineCode",{parentName:"li"},"${expression|1==1}"))))),(0,r.yg)("p",null,"It is recommended to use the new '${}' syntax. The old syntax may be removed at an later date."),(0,r.yg)("p",null,"Function replaceable table:"),(0,r.yg)("table",null,(0,r.yg)("thead",{parentName:"table"},(0,r.yg)("tr",{parentName:"thead"},(0,r.yg)("th",{parentName:"tr",align:"left"},"old"),(0,r.yg)("th",{parentName:"tr",align:"left"},"new"))),(0,r.yg)("tbody",{parentName:"table"},(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"left"},"${int","|","min-max}"),(0,r.yg)("td",{parentName:"tr",align:"left"},"${expression","|","#int(min,max)}")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"left"},"${double","|","min-max","|","format}"),(0,r.yg)("td",{parentName:"tr",align:"left"},"${expression","|","#double(min,max)}")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"left"},"${email}"),(0,r.yg)("td",{parentName:"tr",align:"left"},"${expression","|","#email()}")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"left"},"${phone}"),(0,r.yg)("td",{parentName:"tr",align:"left"},"${expression","|","#phone()}")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"left"},"${zh","|","min-max}"),(0,r.yg)("td",{parentName:"tr",align:"left"},"${expression","|","#zh(min,max)}")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"left"},"${en","|","min-max}"),(0,r.yg)("td",{parentName:"tr",align:"left"},"${expression","|","#en(min,max)}")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"left"},"${list","|","[arg1,arg2...]","}"),(0,r.yg)("td",{parentName:"tr",align:"left"},"${expression","|","#oneOf(arg1,agr2...)}")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"left"},"${current","|","format}"),(0,r.yg)("td",{parentName:"tr",align:"left"},"${expression","|","#current(format)}")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"left"},"${bool}"),(0,r.yg)("td",{parentName:"tr",align:"left"},"${expression","|","#bool()}")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"left"},"${array","|","item","|","length}"),(0,r.yg)("td",{parentName:"tr",align:"left"},"${expression#array(item,length)}")))),(0,r.yg)("p",null,(0,r.yg)("strong",{parentName:"p"},"You do not need to use add ",(0,r.yg)("inlineCode",{parentName:"strong"},'""')," on both sides of ",(0,r.yg)("inlineCode",{parentName:"strong"},"${}"),", the generated content will be prefixed and suffixed according to the definition of generator")))}y.isMDXComponent=!0},23278:(e,n,a)=>{a.d(n,{A:()=>t});const t=a.p+"assets/images/enable-mock-plugin-en-4c1452eb346e287d11b94f8cdf4cbec7.png"},86776:(e,n,a)=>{a.d(n,{A:()=>t});const t=a.p+"assets/images/mock-rule-configuration-en-f71ebf28e7338971afc9136819d32277.png"}}]);