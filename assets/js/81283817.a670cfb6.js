"use strict";(self.webpackChunkshenyu_website=self.webpackChunkshenyu_website||[]).push([[29457],{5719:(e,t,n)=>{n.r(t),n.d(t,{contentTitle:()=>l,default:()=>d,frontMatter:()=>o,metadata:()=>a,toc:()=>s});var r=n(58168),i=(n(96540),n(15680));const o={title:"Flow Control Design",keywords:["flow-control"],description:"ShenYu Flow Control Design"},l=void 0,a={unversionedId:"design/flow-control",id:"version-2.7.0/design/flow-control",isDocsHomePage:!1,title:"Flow Control Design",description:"ShenYu Flow Control Design",source:"@site/versioned_docs/version-2.7.0/design/flow-control.md",sourceDirName:"design",slug:"/design/flow-control",permalink:"/docs/design/flow-control",editUrl:"https://github.com/apache/shenyu-website/edit/main/versioned_docs/version-2.7.0/design/flow-control.md",version:"2.7.0",frontMatter:{title:"Flow Control Design",keywords:["flow-control"],description:"ShenYu Flow Control Design"},sidebar:"version-2.7.0/tutorialSidebar",previous:{title:"Data Sync Design",permalink:"/docs/design/data-sync"},next:{title:"Client Registry Design",permalink:"/docs/design/register-center-design"}},s=[{value:"Plugin",id:"plugin",children:[]},{value:"Selector And Rule",id:"selector-and-rule",children:[]},{value:"Traffic filtering",id:"traffic-filtering",children:[]}],c={toc:s},u="wrapper";function d(e){let{components:t,...n}=e;return(0,i.yg)(u,(0,r.A)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,i.yg)("p",null,"ShenYu gateway realizes flow control through plugins, selectors and rules. For related data structure, please refer to the previous ",(0,i.yg)("a",{parentName:"p",href:"./database-design"},"Apache ShenYu Admin Database Design")," ."),(0,i.yg)("h3",{id:"plugin"},"Plugin"),(0,i.yg)("p",null,"In Apache ShenYu Admin System, each plugin uses Handle (JSON format) fields to represent different processing, and the plugin processing is used to manage and edit the custom processing fields in the JSON."),(0,i.yg)("p",null,"The main purpose of this feature is to enable plugins to handle templated configurations."),(0,i.yg)("h3",{id:"selector-and-rule"},"Selector And Rule"),(0,i.yg)("p",null,"Selector and rule are the most soul of Apache ShenYu Gateway. Master it and you can manage any traffic."),(0,i.yg)("p",null,"A plugin has multiple selectors, and one selector corresponds to multiple rules. The selector is the first level filter of traffic, and the rule is the final filter. For a plugin, we want to meet the traffic criteria based on our configuration before the plugin will be executed. Selectors and rules are designed to allow traffic to perform what we want under certain conditions. The rules need to be understood first."),(0,i.yg)("p",null,"The execution logic of plugin, selector and rule is as follows. When the traffic enters into ShenYu gateway, it will first judge whether there is a corresponding plugin and whether the plugin is turned on. Then determine whether the traffic matches the selector of the plugin. It then determines whether the traffic matches the rules of the selector. If the request traffic meets the matching criteria, the plugin will be executed. Otherwise, the plugin will not be executed. Process the next one. ShenYu gateway is so through layers of screening to complete the flow control."),(0,i.yg)("img",{src:"/img/shenyu/dataSync/flow-control-en.png",width:"40%",height:"30%"}),(0,i.yg)("h3",{id:"traffic-filtering"},"Traffic filtering"),(0,i.yg)("img",{src:"/img/shenyu/design/flow-condition.png",width:"30%",height:"30%"}),(0,i.yg)("p",null,"Traffic filtering is the soul of the selector and the rule, corresponding to the matching conditions in the selector and the rule. According to different traffic filtering rules, we can deal with various complex scenes. Traffic filtering can fetch data from Http requests such as ",(0,i.yg)("inlineCode",{parentName:"p"},"Header"),", ",(0,i.yg)("inlineCode",{parentName:"p"},"URI"),", ",(0,i.yg)("inlineCode",{parentName:"p"},"Query"),", ",(0,i.yg)("inlineCode",{parentName:"p"},"Cookie"),", etc."),(0,i.yg)("p",null,"You can then use ",(0,i.yg)("inlineCode",{parentName:"p"},"Match"),", ",(0,i.yg)("inlineCode",{parentName:"p"},"="),", ",(0,i.yg)("inlineCode",{parentName:"p"},"SpEL"),", ",(0,i.yg)("inlineCode",{parentName:"p"},"Regex"),", ",(0,i.yg)("inlineCode",{parentName:"p"},"Groovy"),", ",(0,i.yg)("inlineCode",{parentName:"p"},"Exclude"),", etc, to Match the desired data. Multi-group matching Adds matching policies that can use And/Or."),(0,i.yg)("p",null,"please refer to ",(0,i.yg)("a",{parentName:"p",href:"../user-guide/admin-usage/selector-and-rule"},"Selector And Rule Config")," for details."))}d.isMDXComponent=!0},15680:(e,t,n)=>{n.d(t,{xA:()=>u,yg:()=>f});var r=n(96540);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function a(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var s=r.createContext({}),c=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},u=function(e){var t=c(e.components);return r.createElement(s.Provider,{value:t},e.children)},d="mdxType",p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},g=r.forwardRef((function(e,t){var n=e.components,i=e.mdxType,o=e.originalType,s=e.parentName,u=a(e,["components","mdxType","originalType","parentName"]),d=c(n),g=i,f=d["".concat(s,".").concat(g)]||d[g]||p[g]||o;return n?r.createElement(f,l(l({ref:t},u),{},{components:n})):r.createElement(f,l({ref:t},u))}));function f(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var o=n.length,l=new Array(o);l[0]=g;var a={};for(var s in t)hasOwnProperty.call(t,s)&&(a[s]=t[s]);a.originalType=e,a[d]="string"==typeof e?e:i,l[1]=a;for(var c=2;c<o;c++)l[c]=n[c];return r.createElement.apply(null,l)}return r.createElement.apply(null,n)}g.displayName="MDXCreateElement"}}]);