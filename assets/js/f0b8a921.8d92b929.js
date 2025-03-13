"use strict";(self.webpackChunkshenyu_website=self.webpackChunkshenyu_website||[]).push([[18850],{15680:(e,t,i)=>{i.d(t,{xA:()=>g,yg:()=>d});var n=i(96540);function r(e,t,i){return t in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}function a(e,t){var i=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),i.push.apply(i,n)}return i}function l(e){for(var t=1;t<arguments.length;t++){var i=null!=arguments[t]?arguments[t]:{};t%2?a(Object(i),!0).forEach((function(t){r(e,t,i[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(i)):a(Object(i)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(i,t))}))}return e}function o(e,t){if(null==e)return{};var i,n,r=function(e,t){if(null==e)return{};var i,n,r={},a=Object.keys(e);for(n=0;n<a.length;n++)i=a[n],t.indexOf(i)>=0||(r[i]=e[i]);return r}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)i=a[n],t.indexOf(i)>=0||Object.prototype.propertyIsEnumerable.call(e,i)&&(r[i]=e[i])}return r}var u=n.createContext({}),s=function(e){var t=n.useContext(u),i=t;return e&&(i="function"==typeof e?e(t):l(l({},t),e)),i},g=function(e){var t=s(e.components);return n.createElement(u.Provider,{value:t},e.children)},p="mdxType",c={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var i=e.components,r=e.mdxType,a=e.originalType,u=e.parentName,g=o(e,["components","mdxType","originalType","parentName"]),p=s(i),m=r,d=p["".concat(u,".").concat(m)]||p[m]||c[m]||a;return i?n.createElement(d,l(l({ref:t},g),{},{components:i})):n.createElement(d,l({ref:t},g))}));function d(e,t){var i=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var a=i.length,l=new Array(a);l[0]=m;var o={};for(var u in t)hasOwnProperty.call(t,u)&&(o[u]=t[u]);o.originalType=e,o[p]="string"==typeof e?e:r,l[1]=o;for(var s=2;s<a;s++)l[s]=i[s];return n.createElement.apply(null,l)}return n.createElement.apply(null,i)}m.displayName="MDXCreateElement"},17758:(e,t,i)=>{i.d(t,{A:()=>n});const n=i.p+"assets/images/sldingwindow-c529b50727afb275845585edb72b0215.png"},60586:(e,t,i)=>{i.r(t),i.d(t,{contentTitle:()=>l,default:()=>p,frontMatter:()=>a,metadata:()=>o,toc:()=>u});var n=i(58168),r=(i(96540),i(15680));const a={sidebar_position:5,title:"RateLimiter Plugin",keywords:["rateLimiter"],description:"rateLimiter plugin"},l=void 0,o={unversionedId:"plugins/rate-limiter-plugin",id:"version-2.3.0-Legacy/plugins/rate-limiter-plugin",isDocsHomePage:!1,title:"RateLimiter Plugin",description:"rateLimiter plugin",source:"@site/versioned_docs/version-2.3.0-Legacy/plugins/rate-limiter-plugin.md",sourceDirName:"plugins",slug:"/plugins/rate-limiter-plugin",permalink:"/docs/2.3.0-Legacy/plugins/rate-limiter-plugin",editUrl:"https://github.com/apache/shenyu-website/edit/main/versioned_docs/version-2.3.0-Legacy/plugins/rate-limiter-plugin.md",version:"2.3.0-Legacy",sidebarPosition:5,frontMatter:{sidebar_position:5,title:"RateLimiter Plugin",keywords:["rateLimiter"],description:"rateLimiter plugin"},sidebar:"version-2.3.0-Legacy/tutorialSidebar",previous:{title:"Sofa Plugin",permalink:"/docs/2.3.0-Legacy/plugins/sofa-plugin"},next:{title:"Hystrix Plugin",permalink:"/docs/2.3.0-Legacy/plugins/hystrix-plugin"}},u=[{value:"Explanation",id:"explanation",children:[]},{value:"Technical Solution",id:"technical-solution",children:[]},{value:"Plugin Setting",id:"plugin-setting",children:[]},{value:"Plugin Detail",id:"plugin-detail",children:[]}],s={toc:u},g="wrapper";function p(e){let{components:t,...a}=e;return(0,r.yg)(g,(0,n.A)({},s,a,{components:t,mdxType:"MDXLayout"}),(0,r.yg)("h2",{id:"explanation"},"Explanation"),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("p",{parentName:"li"},"rateLimiter is core implementation of gateway restrictions on network traffic.")),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("p",{parentName:"li"},"The soul gateway provides a variety of current limiting algorithms, including ",(0,r.yg)("inlineCode",{parentName:"p"},"token bucket algorithm"),", ",(0,r.yg)("inlineCode",{parentName:"p"},"concurrent token bucket algorithm"),", ",(0,r.yg)("inlineCode",{parentName:"p"},"leaky bucket algorithm")," and ",(0,r.yg)("inlineCode",{parentName:"p"},"sliding time window algorithm"),".")),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("p",{parentName:"li"},"The implementation of current limiting algorithm of soul gateway is based on ",(0,r.yg)("inlineCode",{parentName:"p"},"redis"),".")),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("p",{parentName:"li"},"You can set to the interface level or the parameter level. How to use it depends on your traffic configuration."))),(0,r.yg)("h2",{id:"technical-solution"},"Technical Solution"),(0,r.yg)("h4",{id:"using-redis-token-bucket-algorithm-to-limit-traffic"},"Using redis token bucket algorithm to limit traffic."),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},"The system generates the token at a constant rate, and then puts the token into the token bucket."),(0,r.yg)("li",{parentName:"ul"},"The token bucket's capacity. When the bucket is full, the token put into it will be discarded."),(0,r.yg)("li",{parentName:"ul"},"Each time requests come, you need to obtain a token from the token bucket. If there are tokens, the service will be provided; if there are no tokens, the service will be rejected.")),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},"Flow Diagram\uff1a\n",(0,r.yg)("img",{parentName:"li",src:"https://yu199195.github.io/images/soul/limiting.png",alt:null}))),(0,r.yg)("h4",{id:"using-redis-leaky-bucket-algorithm-to-limit-traffic"},"Using redis leaky bucket algorithm to limit traffic."),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},"water (request) go to the leaky bucket first. The leaky bucket goes out at a fixed speed. When the flow speed is too fast, it will overflow directly (reject service)")),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},"Flow Diagram\uff1a\n",(0,r.yg)("img",{src:i(93855).A}))),(0,r.yg)("h4",{id:"using-redis-sliding-time-window-algorithm-to-limit-traffic"},"Using redis sliding time window algorithm to limit traffic."),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},"The sliding time window maintains the count value of unit time. Whenever a requests pass, the count value will be increased by 1. When the count value exceeds the preset threshold, other requests in unit time will be rejected. If the unit time has ended, clear the counter to zero and start the next round counting.")),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},"Flow Diagram\uff1a\n",(0,r.yg)("img",{src:i(17758).A}))),(0,r.yg)("h2",{id:"plugin-setting"},"Plugin Setting"),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("p",{parentName:"li"},"In ",(0,r.yg)("inlineCode",{parentName:"p"},"soul-admin"),"--\x3e plugin management--\x3e ",(0,r.yg)("inlineCode",{parentName:"p"},"rate_limiter")," set to enable.")),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("p",{parentName:"li"},"Configure redis in the plugin.")),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("p",{parentName:"li"},"Currently, supporting redis patterns of single, sentinel, and cluster.")),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("p",{parentName:"li"},"If it is a sentinel, cluster and other multi-node configuration in URL, please use ",(0,r.yg)("inlineCode",{parentName:"p"},";")," for each instance; Division. For example, 192.168.1.1:6379; 192.168.1.2:6379\u3002")),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("p",{parentName:"li"},"If the user don't use, please disable the plugin in the background."))),(0,r.yg)("h2",{id:"plugin-detail"},"Plugin Detail"),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},"Introduce ",(0,r.yg)("inlineCode",{parentName:"li"},"rateLimiter")," dependency in pom.xml file of the gateway.")),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-xml"},"  \x3c!-- soul ratelimiter plugin start--\x3e\n  <dependency>\n      <groupId>org.dromara</groupId>\n      <artifactId>soul-spring-boot-starter-plugin-ratelimiter</artifactId>\n      <version>${last.version}</version>\n  </dependency>\n  \x3c!-- soul ratelimiter plugin end--\x3e\n")),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("p",{parentName:"li"},"Selectors and rules, please refer to: ",(0,r.yg)("a",{parentName:"p",href:"../admin/selector-and-rule"},"selector"),"\u3002")),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("p",{parentName:"li"},"Detailed description of the rules"),(0,r.yg)("ul",{parentName:"li"},(0,r.yg)("li",{parentName:"ul"},"Token bucket algorithm/Concurrent token bucket algorithm")))),(0,r.yg)("p",null,"lgorithmName\uff1atocketBucket/concurrent"),(0,r.yg)("p",null,"replenishRate\uff1aIt is how many requests you allow users to execute per second, while not discarding any requests. This is the filling rate of token bucket."),(0,r.yg)("p",null,"burstCapacity\uff1ait is the maximum number of requests that users are allowed to execute in one second. This is token bucket can save the number of token."),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},"Leaky bucket algorithm")),(0,r.yg)("p",null,"algorithmName\uff1aleakyBucket"),(0,r.yg)("p",null,"replenishRate\uff1aThe rate at which requests are executed per unit time, and the rate at which water droplets leak out of the leaky bucket."),(0,r.yg)("p",null,"burstCapacity\uff1aThe maximum number of requests that users are allowed to execute in one second. This is the amount of water in the bucket."),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},"Sliding time window algorithm")),(0,r.yg)("p",null,"algorithmName\uff1asildingWindow"),(0,r.yg)("p",null,"replenishRate\uff1aThe rate of requests per unit time, used to calculate the size of the time window."),(0,r.yg)("p",null,"burstCapacity\uff1aThe maximum number of requests in the time window (per unit time)."))}p.isMDXComponent=!0},93855:(e,t,i)=>{i.d(t,{A:()=>n});const n=i.p+"assets/images/leakybucket-cc829d5529e0847152a90793867e9f96.png"}}]);