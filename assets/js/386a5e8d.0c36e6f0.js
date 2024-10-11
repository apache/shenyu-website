"use strict";(self.webpackChunkshenyu_website=self.webpackChunkshenyu_website||[]).push([[94419],{15680:(e,r,t)=>{t.d(r,{xA:()=>c,yg:()=>m});var n=t(96540);function i(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function o(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function a(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?o(Object(t),!0).forEach((function(r){i(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function l(e,r){if(null==e)return{};var t,n,i=function(e,r){if(null==e)return{};var t,n,i={},o=Object.keys(e);for(n=0;n<o.length;n++)t=o[n],r.indexOf(t)>=0||(i[t]=e[t]);return i}(e,r);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)t=o[n],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(i[t]=e[t])}return i}var d=n.createContext({}),s=function(e){var r=n.useContext(d),t=r;return e&&(t="function"==typeof e?e(r):a(a({},r),e)),t},c=function(e){var r=s(e.components);return n.createElement(d.Provider,{value:r},e.children)},u="mdxType",p={inlineCode:"code",wrapper:function(e){var r=e.children;return n.createElement(n.Fragment,{},r)}},h=n.forwardRef((function(e,r){var t=e.components,i=e.mdxType,o=e.originalType,d=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),u=s(t),h=i,m=u["".concat(d,".").concat(h)]||u[h]||p[h]||o;return t?n.createElement(m,a(a({ref:r},c),{},{components:t})):n.createElement(m,a({ref:r},c))}));function m(e,r){var t=arguments,i=r&&r.mdxType;if("string"==typeof e||i){var o=t.length,a=new Array(o);a[0]=h;var l={};for(var d in r)hasOwnProperty.call(r,d)&&(l[d]=r[d]);l.originalType=e,l[u]="string"==typeof e?e:i,a[1]=l;for(var s=2;s<o;s++)a[s]=t[s];return n.createElement.apply(null,a)}return n.createElement.apply(null,t)}h.displayName="MDXCreateElement"},44821:(e,r,t)=>{t.r(r),t.d(r,{contentTitle:()=>a,default:()=>u,frontMatter:()=>o,metadata:()=>l,toc:()=>d});var n=t(58168),i=(t(96540),t(15680));const o={title:"Thread Model",keywords:["Thread"],description:"thread model"},a=void 0,l={unversionedId:"developer/thread-model",id:"version-2.6.1/developer/thread-model",isDocsHomePage:!1,title:"Thread Model",description:"thread model",source:"@site/versioned_docs/version-2.6.1/developer/thread-model.md",sourceDirName:"developer",slug:"/developer/thread-model",permalink:"/docs/developer/thread-model",editUrl:"https://github.com/apache/shenyu-website/edit/main/versioned_docs/version-2.6.1/developer/thread-model.md",version:"2.6.1",frontMatter:{title:"Thread Model",keywords:["Thread"],description:"thread model"},sidebar:"version-2.6.0/tutorialSidebar",previous:{title:"ShenYu Optimize",permalink:"/docs/developer/shenyu-optimize"},next:{title:"Benchmark Test Report",permalink:"/docs/benchmark-test/benchmark-test"}},d=[{value:"Description",id:"description",children:[]},{value:"IO And Work Thread",id:"io-and-work-thread",children:[]},{value:"Business Thread",id:"business-thread",children:[]},{value:"Type Switching",id:"type-switching",children:[]}],s={toc:d},c="wrapper";function u(e){let{components:r,...t}=e;return(0,i.yg)(c,(0,n.A)({},s,t,{components:r,mdxType:"MDXLayout"}),(0,i.yg)("h2",{id:"description"},"Description"),(0,i.yg)("ul",null,(0,i.yg)("li",{parentName:"ul"},"This article gives an introduction to thread models in ShenYu and usage in various scenarios.")),(0,i.yg)("h2",{id:"io-and-work-thread"},"IO And Work Thread"),(0,i.yg)("ul",null,(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("inlineCode",{parentName:"li"},"spring-webflux")," is one of dependencies of ShenYu, and it uses Netty thread model in lower layer.")),(0,i.yg)("h2",{id:"business-thread"},"Business Thread"),(0,i.yg)("ul",null,(0,i.yg)("li",{parentName:"ul"},"Use scheduling thread to execute by default."),(0,i.yg)("li",{parentName:"ul"},"A fixed thread pool manages business threads, the number of threads is count in this formula: cpu * 2 + 1.")),(0,i.yg)("h2",{id:"type-switching"},"Type Switching"),(0,i.yg)("ul",null,(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("inlineCode",{parentName:"li"},"reactor.core.scheduler.Schedulers"),"."),(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("inlineCode",{parentName:"li"},"-Dshenyu.scheduler.type=fixed")," is a default config. If set to other value, a flexible thread pool will take place it.",(0,i.yg)("inlineCode",{parentName:"li"},"Schedulers.elastic()"),"."),(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("inlineCode",{parentName:"li"},"-Dshenyu.work.threads = xx")," is for configuring number of threads, the default value calculates in following formula ",(0,i.yg)("inlineCode",{parentName:"li"},"cpu * 2 + 1")," with a minimum of 16 threads.")))}u.isMDXComponent=!0}}]);