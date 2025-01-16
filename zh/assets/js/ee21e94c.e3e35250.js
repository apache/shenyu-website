"use strict";(self.webpackChunkshenyu_website=self.webpackChunkshenyu_website||[]).push([[34555],{15680:(e,n,t)=>{t.d(n,{xA:()=>u,yg:()=>m});var r=t(96540);function i(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function o(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function a(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?o(Object(t),!0).forEach((function(n){i(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function s(e,n){if(null==e)return{};var t,r,i=function(e,n){if(null==e)return{};var t,r,i={},o=Object.keys(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||(i[t]=e[t]);return i}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(i[t]=e[t])}return i}var l=r.createContext({}),p=function(e){var n=r.useContext(l),t=n;return e&&(t="function"==typeof e?e(n):a(a({},n),e)),t},u=function(e){var n=p(e.components);return r.createElement(l.Provider,{value:n},e.children)},c="mdxType",g={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},d=r.forwardRef((function(e,n){var t=e.components,i=e.mdxType,o=e.originalType,l=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),c=p(t),d=i,m=c["".concat(l,".").concat(d)]||c[d]||g[d]||o;return t?r.createElement(m,a(a({ref:n},u),{},{components:t})):r.createElement(m,a({ref:n},u))}));function m(e,n){var t=arguments,i=n&&n.mdxType;if("string"==typeof e||i){var o=t.length,a=new Array(o);a[0]=d;var s={};for(var l in n)hasOwnProperty.call(n,l)&&(s[l]=n[l]);s.originalType=e,s[c]="string"==typeof e?e:i,a[1]=s;for(var p=2;p<o;p++)a[p]=t[p];return r.createElement.apply(null,a)}return r.createElement.apply(null,t)}d.displayName="MDXCreateElement"},9953:(e,n,t)=>{t.r(n),t.d(n,{contentTitle:()=>a,default:()=>c,frontMatter:()=>o,metadata:()=>s,toc:()=>l});var r=t(58168),i=(t(96540),t(15680));const o={title:"WASM\u63d2\u4ef6\u8bbe\u8ba1",keywords:["WASM"],description:"Apache ShenYu WASM\u63d2\u4ef6\u8bbe\u8ba1"},a=void 0,s={unversionedId:"design/wasm-plugin-design",id:"version-2.7.0/design/wasm-plugin-design",isDocsHomePage:!1,title:"WASM\u63d2\u4ef6\u8bbe\u8ba1",description:"Apache ShenYu WASM\u63d2\u4ef6\u8bbe\u8ba1",source:"@site/i18n/zh/docusaurus-plugin-content-docs/version-2.7.0/design/wasm-plugin-design.md",sourceDirName:"design",slug:"/design/wasm-plugin-design",permalink:"/zh/docs/design/wasm-plugin-design",editUrl:"https://github.com/apache/shenyu-website/edit/main/i18n/zh/docusaurus-plugin-content-docs/version-2.7.0/design/wasm-plugin-design.md",version:"2.7.0",frontMatter:{title:"WASM\u63d2\u4ef6\u8bbe\u8ba1",keywords:["WASM"],description:"Apache ShenYu WASM\u63d2\u4ef6\u8bbe\u8ba1"},sidebar:"version-2.7.0/tutorialSidebar",previous:{title:"SPI\u6269\u5c55\u8bbe\u8ba1",permalink:"/zh/docs/design/spi-design"},next:{title:"\u90e8\u7f72\u5148\u51b3\u6761\u4ef6",permalink:"/zh/docs/deployment/deployment-before"}},l=[{value:"\u5f00\u53d1\u9636\u6bb5",id:"\u5f00\u53d1\u9636\u6bb5",children:[]},{value:"\u51c6\u5907\u9636\u6bb5",id:"\u51c6\u5907\u9636\u6bb5",children:[]},{value:"\u8fd0\u884c\u9636\u6bb5",id:"\u8fd0\u884c\u9636\u6bb5",children:[]}],p={toc:l},u="wrapper";function c(e){let{components:n,...t}=e;return(0,i.yg)(u,(0,r.A)({},p,t,{components:n,mdxType:"MDXLayout"}),(0,i.yg)("p",null,(0,i.yg)("inlineCode",{parentName:"p"},"Apache ShenYu"),"\u662f\u4e00\u4e2aJava\u539f\u751f\uff0c\u7528\u4e8e\u670d\u52a1\u4ee3\u7406\u3001\u534f\u8bae\u8f6c\u6362\u548cAPI\u7ba1\u7406\u7684API\u7f51\u5173\u3002\u76ee\u524dshenyu\u5728Java\u8bed\u8a00\u4e2d\u5177\u6709\u826f\u597d\u7684\u53ef\u6269\u5c55\u6027\uff0c\u7136\u800cshenyu\u5bf9\u591a\u79cd\u8bed\u8a00\u7684\u652f\u6301\u4ecd\u7136\u76f8\u5bf9\u8f83\u5f31\u3002"),(0,i.yg)("p",null,(0,i.yg)("inlineCode",{parentName:"p"},"WASM"),"(\u5373WebAssembly)\u5b57\u8282\u7801\u88ab\u8bbe\u8ba1\u4e3a\u4ee5\u5927\u5c0f\u548c\u52a0\u8f7d\u65f6\u95f4\u9ad8\u6548\u7684\u4e8c\u8fdb\u5236\u683c\u5f0f\u8fdb\u884c\u7f16\u7801\u3002WebAssembly\u65e8\u5728\u5229\u7528\u5404\u79cd\u5e73\u53f0\u4e0a\u53ef\u7528\u7684\u901a\u7528\u786c\u4ef6\u529f\u80fd\uff0c\u4ee5\u673a\u5668\u7801\u7684\u901f\u5ea6\u5728\u6d4f\u89c8\u5668\u4e2d\u6267\u884c\u3002"),(0,i.yg)("p",null,(0,i.yg)("inlineCode",{parentName:"p"},"WASI"),"(\u5373WebAssembly System Interface)\u5219\u662f\u8ba9WASM\u53ef\u4ee5\u8fd0\u884c\u5728\u975e\u6d4f\u89c8\u5668\u73af\u5883\u4e2d(\u6bd4\u5982linux)\u3002"),(0,i.yg)("p",null,(0,i.yg)("inlineCode",{parentName:"p"},"WASMPlugin"),"\u7684\u76ee\u6807\u662f\u80fd\u591f\u8fd0\u884cWASM\u5b57\u8282\u7801\u3002\u5176\u4ed6\u8bed\u8a00\uff0c\u53ea\u8981\u8fd9\u79cd\u8bed\u8a00\u7684\u4ee3\u7801\u80fd\u88ab\u7f16\u8bd1\u6210WASM\u5b57\u8282\u7801(\u5982Rust/golang/C++)\uff0c\u90a3\u4e48\u8fd9\u79cd\u8bed\u8a00\u5c31\u53ef\u4ee5\u7528\u6765\u7f16\u5199ShenYu\u63d2\u4ef6\u3002"),(0,i.yg)("h2",{id:"\u5f00\u53d1\u9636\u6bb5"},"\u5f00\u53d1\u9636\u6bb5"),(0,i.yg)("img",{src:"/img/shenyu/plugin/wasm/wasm-plugin-develop.png"}),(0,i.yg)("h2",{id:"\u51c6\u5907\u9636\u6bb5"},"\u51c6\u5907\u9636\u6bb5"),(0,i.yg)("img",{src:"/img/shenyu/plugin/wasm/wasm-plugin-prepare.png"}),(0,i.yg)("h2",{id:"\u8fd0\u884c\u9636\u6bb5"},"\u8fd0\u884c\u9636\u6bb5"),(0,i.yg)("img",{src:"/img/shenyu/plugin/wasm/wasm-plugin-runtime.png"}))}c.isMDXComponent=!0}}]);