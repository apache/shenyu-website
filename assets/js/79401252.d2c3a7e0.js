"use strict";(self.webpackChunkshenyu_website=self.webpackChunkshenyu_website||[]).push([[17731],{15680:(e,n,t)=>{t.d(n,{xA:()=>c,yg:()=>y});var r=t(96540);function i(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function l(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function o(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?l(Object(t),!0).forEach((function(n){i(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):l(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function a(e,n){if(null==e)return{};var t,r,i=function(e,n){if(null==e)return{};var t,r,i={},l=Object.keys(e);for(r=0;r<l.length;r++)t=l[r],n.indexOf(t)>=0||(i[t]=e[t]);return i}(e,n);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(r=0;r<l.length;r++)t=l[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(i[t]=e[t])}return i}var d=r.createContext({}),p=function(e){var n=r.useContext(d),t=n;return e&&(t="function"==typeof e?e(n):o(o({},n),e)),t},c=function(e){var n=p(e.components);return r.createElement(d.Provider,{value:n},e.children)},u="mdxType",s={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},f=r.forwardRef((function(e,n){var t=e.components,i=e.mdxType,l=e.originalType,d=e.parentName,c=a(e,["components","mdxType","originalType","parentName"]),u=p(t),f=i,y=u["".concat(d,".").concat(f)]||u[f]||s[f]||l;return t?r.createElement(y,o(o({ref:n},c),{},{components:t})):r.createElement(y,o({ref:n},c))}));function y(e,n){var t=arguments,i=n&&n.mdxType;if("string"==typeof e||i){var l=t.length,o=new Array(l);o[0]=f;var a={};for(var d in n)hasOwnProperty.call(n,d)&&(a[d]=n[d]);a.originalType=e,a[u]="string"==typeof e?e:i,o[1]=a;for(var p=2;p<l;p++)o[p]=t[p];return r.createElement.apply(null,o)}return r.createElement.apply(null,t)}f.displayName="MDXCreateElement"},38582:(e,n,t)=>{t.r(n),t.d(n,{contentTitle:()=>o,default:()=>u,frontMatter:()=>l,metadata:()=>a,toc:()=>d});var r=t(58168),i=(t(96540),t(15680));const l={title:"File Upload And Download",keywords:["File"],description:"file upload and download"},o=void 0,a={unversionedId:"developer/file-and-image",id:"developer/file-and-image",isDocsHomePage:!1,title:"File Upload And Download",description:"file upload and download",source:"@site/docs/developer/file-and-image.md",sourceDirName:"developer",slug:"/developer/file-and-image",permalink:"/docs/next/developer/file-and-image",editUrl:"https://github.com/apache/shenyu-website/edit/main/docs/developer/file-and-image.md",version:"current",frontMatter:{title:"File Upload And Download",keywords:["File"],description:"file upload and download"},sidebar:"tutorialSidebar",previous:{title:"A multilingual HTTP client",permalink:"/docs/next/developer/developer-shenyu-client"},next:{title:"Run Integration Test Locally",permalink:"/docs/next/developer/integration-test"}},d=[{value:"description",id:"description",children:[]},{value:"File Upload",id:"file-upload",children:[]},{value:"File Download",id:"file-download",children:[]}],p={toc:d},c="wrapper";function u(e){let{components:n,...t}=e;return(0,i.yg)(c,(0,r.A)({},p,t,{components:n,mdxType:"MDXLayout"}),(0,i.yg)("h2",{id:"description"},"description"),(0,i.yg)("ul",null,(0,i.yg)("li",{parentName:"ul"},"This doc gives a brief description for upload and download files using ",(0,i.yg)("inlineCode",{parentName:"li"},"Apache ShenYu"),".")),(0,i.yg)("h2",{id:"file-upload"},"File Upload"),(0,i.yg)("ul",null,(0,i.yg)("li",{parentName:"ul"},"The default file size limit is ",(0,i.yg)("inlineCode",{parentName:"li"},"10M"),"."),(0,i.yg)("li",{parentName:"ul"},"For custom limitation, use",(0,i.yg)("inlineCode",{parentName:"li"},"--file.size")," with an integer variable. e.g.",(0,i.yg)("inlineCode",{parentName:"li"},"--file.size = 30")),(0,i.yg)("li",{parentName:"ul"},"Upload your files just as way you did before")),(0,i.yg)("h2",{id:"file-download"},"File Download"),(0,i.yg)("ul",null,(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("inlineCode",{parentName:"li"},"Apache ShenYu")," supports download files in stream. There is no need to change anything.")))}u.isMDXComponent=!0}}]);