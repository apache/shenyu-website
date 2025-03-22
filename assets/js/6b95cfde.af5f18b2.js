"use strict";(self.webpackChunkshenyu_website=self.webpackChunkshenyu_website||[]).push([[90051],{14142:(e,t,a)=>{a.r(t),a.d(t,{contentTitle:()=>o,default:()=>u,frontMatter:()=>i,metadata:()=>l,toc:()=>p});var n=a(58168),r=(a(96540),a(15680));const i={title:"Sofa Plugin",keywords:["sofa"],description:"sofa access shenyu gateway"},o=void 0,l={unversionedId:"plugin-center/proxy/sofa-plugin",id:"version-2.4.3/plugin-center/proxy/sofa-plugin",isDocsHomePage:!1,title:"Sofa Plugin",description:"sofa access shenyu gateway",source:"@site/versioned_docs/version-2.4.3/plugin-center/proxy/sofa-plugin.md",sourceDirName:"plugin-center/proxy",slug:"/plugin-center/proxy/sofa-plugin",permalink:"/docs/2.4.3/plugin-center/proxy/sofa-plugin",editUrl:"https://github.com/apache/shenyu-website/edit/main/versioned_docs/version-2.4.3/plugin-center/proxy/sofa-plugin.md",version:"2.4.3",frontMatter:{title:"Sofa Plugin",keywords:["sofa"],description:"sofa access shenyu gateway"},sidebar:"version-2.4.3/tutorialSidebar",previous:{title:"Mqtt Plugin",permalink:"/docs/2.4.3/plugin-center/proxy/mqtt-plugin"},next:{title:"Spring Cloud Plugin",permalink:"/docs/2.4.3/plugin-center/proxy/spring-cloud-plugin"}},p=[{value:"Description",id:"description",children:[]},{value:"Plugin Setting",id:"plugin-setting",children:[]},{value:"Metadata",id:"metadata",children:[]}],s={toc:p},c="wrapper";function u(e){let{components:t,...a}=e;return(0,r.yg)(c,(0,n.A)({},s,a,{components:t,mdxType:"MDXLayout"}),(0,r.yg)("h2",{id:"description"},"Description"),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},"The sofa plugin is a plugin that converts the Http protocol into the sofa protocol, and it is also the key to the gateway to realize the sofa generalization call."),(0,r.yg)("li",{parentName:"ul"},"The sofa plugin needs to cooperate with metadata to realize the call of Sofa.")),(0,r.yg)("h2",{id:"plugin-setting"},"Plugin Setting"),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("p",{parentName:"li"},"Add related dependencies and enable plugin, please refer to: ",(0,r.yg)("a",{parentName:"p",href:"../../quick-start/quick-start-sofa"},"Quick start with Sofa")," .")),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("p",{parentName:"li"},(0,r.yg)("inlineCode",{parentName:"p"},"Sofa")," client access, please refer to: ",(0,r.yg)("a",{parentName:"p",href:"/docs/2.4.3/user-guide/proxy/sofa-rpc-proxy"},"Sofa Proxy")," .")),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("p",{parentName:"li"},"Set selector and rule, please refer to: ",(0,r.yg)("a",{parentName:"p",href:"../../user-guide/admin-usage/selector-and-rule"},"Selector And Rule Config")," ."))),(0,r.yg)("h2",{id:"metadata"},"Metadata"),(0,r.yg)("p",null,"Each ",(0,r.yg)("inlineCode",{parentName:"p"},"sofa")," interface method, will correspond to a metadata, when the ",(0,r.yg)("inlineCode",{parentName:"p"},"sofa")," application client access to the ",(0,r.yg)("inlineCode",{parentName:"p"},"ShenYu")," gateway, will be automatically registered, can be viewed in the ",(0,r.yg)("inlineCode",{parentName:"p"},"shenyu-admin")," background management system of the BasicConfig --\x3e Metadata management."),(0,r.yg)("img",{src:"/img/shenyu/plugin/sofa/metadata_en.png",width:"80%"}),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("p",{parentName:"li"},"AppName: specifies the name of the application to which the metadata belongs.")),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("p",{parentName:"li"},"MethodName: the name of the method to call.")),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("p",{parentName:"li"},"Path: http request path.")),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("p",{parentName:"li"},"PathDescribe: the description of the path is easy to view.")),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("p",{parentName:"li"},"ParamsType: the parameters are separated by commas (,) in the order of interface parameter types.")),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("p",{parentName:"li"},"RpcExpand: other configurations of the ",(0,r.yg)("inlineCode",{parentName:"p"},"sofa")," interface, which support the ",(0,r.yg)("inlineCode",{parentName:"p"},"JSON")," format, are as follows:"))),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-yaml"},'{"loadbalance":"hash","retries":3,"timeout":-1}\n')),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("p",{parentName:"li"},"Interface: The fully qualified class name of the ",(0,r.yg)("inlineCode",{parentName:"p"},"sofa")," interface.")),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("p",{parentName:"li"},"RpcType\uff1achoose ",(0,r.yg)("inlineCode",{parentName:"p"},"sofa"),"."))))}u.isMDXComponent=!0},15680:(e,t,a)=>{a.d(t,{xA:()=>c,yg:()=>m});var n=a(96540);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function i(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function o(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?i(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):i(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function l(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},i=Object.keys(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var p=n.createContext({}),s=function(e){var t=n.useContext(p),a=t;return e&&(a="function"==typeof e?e(t):o(o({},t),e)),a},c=function(e){var t=s(e.components);return n.createElement(p.Provider,{value:t},e.children)},u="mdxType",g={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},y=n.forwardRef((function(e,t){var a=e.components,r=e.mdxType,i=e.originalType,p=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),u=s(a),y=r,m=u["".concat(p,".").concat(y)]||u[y]||g[y]||i;return a?n.createElement(m,o(o({ref:t},c),{},{components:a})):n.createElement(m,o({ref:t},c))}));function m(e,t){var a=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=a.length,o=new Array(i);o[0]=y;var l={};for(var p in t)hasOwnProperty.call(t,p)&&(l[p]=t[p]);l.originalType=e,l[u]="string"==typeof e?e:r,o[1]=l;for(var s=2;s<i;s++)o[s]=a[s];return n.createElement.apply(null,o)}return n.createElement.apply(null,a)}y.displayName="MDXCreateElement"}}]);