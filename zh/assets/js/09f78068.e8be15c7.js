"use strict";(self.webpackChunkshenyu_website=self.webpackChunkshenyu_website||[]).push([[18389],{15680:(e,n,r)=>{r.d(n,{xA:()=>y,yg:()=>d});var t=r(96540);function p(e,n,r){return n in e?Object.defineProperty(e,n,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[n]=r,e}function a(e,n){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);n&&(t=t.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),r.push.apply(r,t)}return r}function i(e){for(var n=1;n<arguments.length;n++){var r=null!=arguments[n]?arguments[n]:{};n%2?a(Object(r),!0).forEach((function(n){p(e,n,r[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(r,n))}))}return e}function l(e,n){if(null==e)return{};var r,t,p=function(e,n){if(null==e)return{};var r,t,p={},a=Object.keys(e);for(t=0;t<a.length;t++)r=a[t],n.indexOf(r)>=0||(p[r]=e[r]);return p}(e,n);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(t=0;t<a.length;t++)r=a[t],n.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(p[r]=e[r])}return p}var g=t.createContext({}),o=function(e){var n=t.useContext(g),r=n;return e&&(r="function"==typeof e?e(n):i(i({},n),e)),r},y=function(e){var n=o(e.components);return t.createElement(g.Provider,{value:n},e.children)},u="mdxType",c={inlineCode:"code",wrapper:function(e){var n=e.children;return t.createElement(t.Fragment,{},n)}},m=t.forwardRef((function(e,n){var r=e.components,p=e.mdxType,a=e.originalType,g=e.parentName,y=l(e,["components","mdxType","originalType","parentName"]),u=o(r),m=p,d=u["".concat(g,".").concat(m)]||u[m]||c[m]||a;return r?t.createElement(d,i(i({ref:n},y),{},{components:r})):t.createElement(d,i({ref:n},y))}));function d(e,n){var r=arguments,p=n&&n.mdxType;if("string"==typeof e||p){var a=r.length,i=new Array(a);i[0]=m;var l={};for(var g in n)hasOwnProperty.call(n,g)&&(l[g]=n[g]);l.originalType=e,l[u]="string"==typeof e?e:p,i[1]=l;for(var o=2;o<a;o++)i[o]=r[o];return t.createElement.apply(null,i)}return t.createElement.apply(null,r)}m.displayName="MDXCreateElement"},30414:(e,n,r)=>{r.r(n),r.d(n,{contentTitle:()=>i,default:()=>u,frontMatter:()=>a,metadata:()=>l,toc:()=>g});var t=r(58168),p=(r(96540),r(15680));const a={title:"gRPC\u63d2\u4ef6",keywords:["gRPC"],description:"gRPC\u63d2\u4ef6"},i=void 0,l={unversionedId:"plugin-center/proxy/grpc-plugin",id:"version-2.5.0/plugin-center/proxy/grpc-plugin",isDocsHomePage:!1,title:"gRPC\u63d2\u4ef6",description:"gRPC\u63d2\u4ef6",source:"@site/i18n/zh/docusaurus-plugin-content-docs/version-2.5.0/plugin-center/proxy/grpc-plugin.md",sourceDirName:"plugin-center/proxy",slug:"/plugin-center/proxy/grpc-plugin",permalink:"/zh/docs/2.5.0/plugin-center/proxy/grpc-plugin",editUrl:"https://github.com/apache/shenyu-website/edit/main/i18n/zh/docusaurus-plugin-content-docs/version-2.5.0/plugin-center/proxy/grpc-plugin.md",version:"2.5.0",frontMatter:{title:"gRPC\u63d2\u4ef6",keywords:["gRPC"],description:"gRPC\u63d2\u4ef6"},sidebar:"version-2.5.0/tutorialSidebar",previous:{title:"Dubbo\u63d2\u4ef6",permalink:"/zh/docs/2.5.0/plugin-center/proxy/dubbo-plugin"},next:{title:"Motan\u63d2\u4ef6",permalink:"/zh/docs/2.5.0/plugin-center/proxy/motan-plugin"}},g=[{value:"\u8bf4\u660e",id:"\u8bf4\u660e",children:[]},{value:"\u63d2\u4ef6\u8bbe\u7f6e",id:"\u63d2\u4ef6\u8bbe\u7f6e",children:[]},{value:"\u63d2\u4ef6\u8bb2\u89e3",id:"\u63d2\u4ef6\u8bb2\u89e3",children:[]},{value:"\u5143\u6570\u636e",id:"\u5143\u6570\u636e",children:[]}],o={toc:g},y="wrapper";function u(e){let{components:n,...r}=e;return(0,p.yg)(y,(0,t.A)({},o,r,{components:n,mdxType:"MDXLayout"}),(0,p.yg)("h2",{id:"\u8bf4\u660e"},"\u8bf4\u660e"),(0,p.yg)("p",null,(0,p.yg)("inlineCode",{parentName:"p"},"gRPC"),"\u63d2\u4ef6\u662f\u7f51\u5173\u7528\u4e8e\u5904\u7406 ",(0,p.yg)("inlineCode",{parentName:"p"},"gRPC\u534f\u8bae"),"\u8bf7\u6c42\u7684\u6838\u5fc3\u5904\u7406\u63d2\u4ef6\u3002"),(0,p.yg)("h2",{id:"\u63d2\u4ef6\u8bbe\u7f6e"},"\u63d2\u4ef6\u8bbe\u7f6e"),(0,p.yg)("ul",null,(0,p.yg)("li",{parentName:"ul"},(0,p.yg)("p",{parentName:"li"},"\u5f15\u5165\u76f8\u5173\u4f9d\u8d56\uff0c\u5f00\u542f\u63d2\u4ef6\uff0c\u8bf7\u53c2\u8003\uff1a",(0,p.yg)("a",{parentName:"p",href:"../../quick-start/quick-start-grpc"},"gRPC\u5feb\u901f\u5f00\u59cb")," \u3002")),(0,p.yg)("li",{parentName:"ul"},(0,p.yg)("p",{parentName:"li"},(0,p.yg)("inlineCode",{parentName:"p"},"gRPC"),"\u5e94\u7528\u5ba2\u6237\u7aef\u63a5\u5165\uff0c\u8bf7\u53c2\u8003\uff1a",(0,p.yg)("a",{parentName:"p",href:"/zh/docs/2.5.0/user-guide/proxy/grpc-proxy"},"gRPC\u670d\u52a1\u63a5\u5165")," \u3002")),(0,p.yg)("li",{parentName:"ul"},(0,p.yg)("p",{parentName:"li"},"\u81ea",(0,p.yg)("inlineCode",{parentName:"p"},"2.4.3\u7248\u672c"),"\u8d77grpc\u63d2\u4ef6\u65b0\u589e\u5b57\u6bb5\u53ca\u542b\u4e49\uff1a"),(0,p.yg)("ul",{parentName:"li"},(0,p.yg)("li",{parentName:"ul"},(0,p.yg)("p",{parentName:"li"},(0,p.yg)("inlineCode",{parentName:"p"},"threadpool"),"\uff1a\u4e1a\u52a1\u7ebf\u7a0b\u6c60\u7c7b\u578b\uff0c\u6709",(0,p.yg)("inlineCode",{parentName:"p"},"cached"),"\u548c",(0,p.yg)("inlineCode",{parentName:"p"},"shared"),"\u51712\u79cd\u7c7b\u578b\u3002"),(0,p.yg)("p",{parentName:"li"},(0,p.yg)("inlineCode",{parentName:"p"},"cached"),"\u76f8\u5f53\u4e8egrpc\u5b98\u65b9\u63d0\u4f9b\u7684\u9ed8\u8ba4\u7ebf\u7a0b\u6c60\uff1b"),(0,p.yg)("p",{parentName:"li"},(0,p.yg)("inlineCode",{parentName:"p"},"shared"),"\u7ebf\u7a0b\u6c60\uff0c\u6b63\u5982\u5176\u540d\uff0c",(0,p.yg)("inlineCode",{parentName:"p"},"\u6240\u6709proxy\u63d2\u4ef6"),"\u5171\u7528\u4e00\u4e2a",(0,p.yg)("inlineCode",{parentName:"p"},"shared"),"\u7ebf\u7a0b\u6c60\uff0c\u8fd9\u6837\u505a\u7684\u597d\u5904\u662f\u80fd\u591f\u51cf\u5c11\u7ebf\u7a0b\u6c60\u6570\u91cf\uff0c\u8fdb\u800c\u964d\u4f4e\u5185\u5b58\u3001\u63d0\u9ad8\u8d44\u6e90\u5229\u7528\u7387\u3002"))))),(0,p.yg)("h2",{id:"\u63d2\u4ef6\u8bb2\u89e3"},"\u63d2\u4ef6\u8bb2\u89e3"),(0,p.yg)("p",null,"\u5ba2\u6237\u7aef\u63a5\u5165",(0,p.yg)("inlineCode",{parentName:"p"},"Apache ShenYu"),"\u7f51\u5173\u540e\uff0c\u4f1a\u81ea\u52a8\u6ce8\u518c\u9009\u62e9\u5668\u548c\u89c4\u5219\u4fe1\u606f\uff0c\u53ef\u4ee5\u5728\u63d2\u4ef6\u5217\u8868 ",(0,p.yg)("inlineCode",{parentName:"p"},"->")," rpc proxy ",(0,p.yg)("inlineCode",{parentName:"p"},"->")," grpc \u4e2d\u67e5\u770b\u3002 \u5173\u4e8e\u9009\u62e9\u5668\u548c\u89c4\u5219\u914d\u7f6e\uff0c\u8bf7\u53c2\u8003\uff1a",(0,p.yg)("a",{parentName:"p",href:"../../user-guide/admin-usage/selector-and-rule"},"\u9009\u62e9\u5668\u548c\u89c4\u5219\u7ba1\u7406"),"\u3002"),(0,p.yg)("h4",{id:"\u9009\u62e9\u5668\u5904\u7406"},"\u9009\u62e9\u5668\u5904\u7406"),(0,p.yg)("img",{src:"/img/shenyu/plugin/grpc/selector_handle.png",width:"80%",height:"80%"}),(0,p.yg)("p",null,"\u9009\u62e9\u5668\u5904\u7406\uff0c\u5373",(0,p.yg)("inlineCode",{parentName:"p"},"handle"),"\u5b57\u6bb5\uff0c\u662f\u7f51\u5173\u5339\u914d\u5230\u6d41\u91cf\u4ee5\u540e\uff0c\u53ef\u8fdb\u884c\u7684\u5904\u7406\u64cd\u4f5c\u3002"),(0,p.yg)("ul",null,(0,p.yg)("li",{parentName:"ul"},"\u5904\u7406\u914d\u7f6e\u8be6\u89e3\uff1a")),(0,p.yg)("ul",null,(0,p.yg)("li",{parentName:"ul"},(0,p.yg)("p",{parentName:"li"},(0,p.yg)("inlineCode",{parentName:"p"},"ip:port"),"\uff1a",(0,p.yg)("inlineCode",{parentName:"p"},"ip")," \u4e0e\u7aef\u53e3\uff0c\u8fd9\u91cc\u586b\u5199\u4f60\u771f\u5b9e\u670d\u52a1\u7684 ",(0,p.yg)("inlineCode",{parentName:"p"},"ip")," + \u7aef\u53e3\u3002")),(0,p.yg)("li",{parentName:"ul"},(0,p.yg)("p",{parentName:"li"},(0,p.yg)("inlineCode",{parentName:"p"},"protocol"),"\uff1a",(0,p.yg)("inlineCode",{parentName:"p"},"http")," \u534f\u8bae\uff0c\u4e00\u822c\u586b\u5199 ",(0,p.yg)("inlineCode",{parentName:"p"},"http://")," \u6216\u8005 ",(0,p.yg)("inlineCode",{parentName:"p"},"https://")," \uff0c\u4e0d\u586b\u5199\u9ed8\u8ba4\u4e3a:",(0,p.yg)("inlineCode",{parentName:"p"},"http://"),"\n")),(0,p.yg)("li",{parentName:"ul"},(0,p.yg)("p",{parentName:"li"},(0,p.yg)("inlineCode",{parentName:"p"},"weight"),"\uff1a\u670d\u52a1\u6743\u91cd\u3002\n")),(0,p.yg)("li",{parentName:"ul"},(0,p.yg)("p",{parentName:"li"},(0,p.yg)("inlineCode",{parentName:"p"},"status"),"\uff1a\u5f00\u542f\u6216\u5173\u95ed\u3002"))),(0,p.yg)("h2",{id:"\u5143\u6570\u636e"},"\u5143\u6570\u636e"),(0,p.yg)("p",null,"\u6bcf\u4e00\u4e2a",(0,p.yg)("inlineCode",{parentName:"p"},"grpc"),"\u63a5\u53e3\u65b9\u6cd5\uff0c\u90fd\u4f1a\u5bf9\u5e94\u4e00\u6761\u5143\u6570\u636e\uff0c\u5f53",(0,p.yg)("inlineCode",{parentName:"p"},"gRPC"),"\u5e94\u7528\u5ba2\u6237\u7aef\u63a5\u5165\u5230",(0,p.yg)("inlineCode",{parentName:"p"},"Apache ShenYu"),"\u7f51\u5173\u65f6\uff0c\u4f1a\u81ea\u52a8\u6ce8\u518c\uff0c\u53ef\u4ee5\u5728 ",(0,p.yg)("inlineCode",{parentName:"p"},"shenyu-admin"),"\u540e\u53f0\u7ba1\u7406\u7cfb\u7edf\u7684\u57fa\u7840\u914d\u7f6e ",(0,p.yg)("inlineCode",{parentName:"p"},"--\x3e")," \u5143\u6570\u636e\u7ba1\u7406\u4e2d\u67e5\u770b\u3002"),(0,p.yg)("img",{src:"/img/shenyu/plugin/grpc/metadata.png",width:"80%",height:"80%"}),(0,p.yg)("ul",null,(0,p.yg)("li",{parentName:"ul"},(0,p.yg)("p",{parentName:"li"},"\u5e94\u7528\u540d\u79f0\uff1a\u8be5\u6761\u5143\u6570\u636e\u6240\u5c5e\u7684\u5e94\u7528\u540d\u79f0\u3002")),(0,p.yg)("li",{parentName:"ul"},(0,p.yg)("p",{parentName:"li"},"\u65b9\u6cd5\u540d\u79f0\uff1a\u9700\u8981\u8c03\u7528\u7684\u65b9\u6cd5\u540d\u3002")),(0,p.yg)("li",{parentName:"ul"},(0,p.yg)("p",{parentName:"li"},"\u8def\u5f84\uff1a",(0,p.yg)("inlineCode",{parentName:"p"},"http"),"\u8bf7\u6c42\u8def\u5f84\u3002")),(0,p.yg)("li",{parentName:"ul"},(0,p.yg)("p",{parentName:"li"},"\u8def\u5f84\u63cf\u8ff0\uff1a\u5bf9\u8be5\u8def\u5f84\u7684\u8bf4\u660e\uff0c\u65b9\u4fbf\u67e5\u770b\u3002")),(0,p.yg)("li",{parentName:"ul"},(0,p.yg)("p",{parentName:"li"},"\u53c2\u6570\u7c7b\u578b\uff1a",(0,p.yg)("inlineCode",{parentName:"p"},"grpc"),"\u63a5\u53e3\u7684\u53c2\u6570\u7c7b\u578b\u5217\u8868\uff0c\u6309\u7167\u63a5\u53e3\u7684\u53c2\u6570\u7c7b\u578b\u987a\u5e8f\uff0c\u901a\u8fc7\u534a\u89d2\u9017\u53f7\u5206\u9694\u3002")),(0,p.yg)("li",{parentName:"ul"},(0,p.yg)("p",{parentName:"li"},"Rpc\u6269\u5c55\u53c2\u6570\uff1a",(0,p.yg)("inlineCode",{parentName:"p"},"grpc"),"\u63a5\u53e3\u7684\u5176\u4ed6\u914d\u7f6e\uff0c\u652f\u6301",(0,p.yg)("inlineCode",{parentName:"p"},"json"),"\u683c\u5f0f\uff0c\u5b57\u6bb5\u5982\u4e0b\uff1a"))),(0,p.yg)("pre",null,(0,p.yg)("code",{parentName:"pre",className:"language-json"},'{\n  "timeout": 5000,\n  "methodType": "BIDI_STREAMING"\n}\n')),(0,p.yg)("ul",null,(0,p.yg)("li",{parentName:"ul"},(0,p.yg)("p",{parentName:"li"},"\u670d\u52a1\u63a5\u53e3\uff1a",(0,p.yg)("inlineCode",{parentName:"p"},"grpc"),"\u63a5\u53e3\u7684\u5168\u9650\u5b9a\u7c7b\u540d")),(0,p.yg)("li",{parentName:"ul"},(0,p.yg)("p",{parentName:"li"},(0,p.yg)("inlineCode",{parentName:"p"},"Rpc"),"\u7c7b\u578b\uff1a\u6b64\u5904\u9009\u62e9 ",(0,p.yg)("inlineCode",{parentName:"p"},"grpc"),"\u3002"))))}u.isMDXComponent=!0}}]);