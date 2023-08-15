"use strict";(self.webpackChunkshenyu_website=self.webpackChunkshenyu_website||[]).push([[23619],{3905:(e,t,o)=>{o.d(t,{Zo:()=>a,kt:()=>y});var n=o(67294);function r(e,t,o){return t in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}function c(e,t){var o=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),o.push.apply(o,n)}return o}function l(e){for(var t=1;t<arguments.length;t++){var o=null!=arguments[t]?arguments[t]:{};t%2?c(Object(o),!0).forEach((function(t){r(e,t,o[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(o)):c(Object(o)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(o,t))}))}return e}function p(e,t){if(null==e)return{};var o,n,r=function(e,t){if(null==e)return{};var o,n,r={},c=Object.keys(e);for(n=0;n<c.length;n++)o=c[n],t.indexOf(o)>=0||(r[o]=e[o]);return r}(e,t);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(n=0;n<c.length;n++)o=c[n],t.indexOf(o)>=0||Object.prototype.propertyIsEnumerable.call(e,o)&&(r[o]=e[o])}return r}var s=n.createContext({}),i=function(e){var t=n.useContext(s),o=t;return e&&(o="function"==typeof e?e(t):l(l({},t),e)),o},a=function(e){var t=i(e.components);return n.createElement(s.Provider,{value:t},e.children)},d="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},u=n.forwardRef((function(e,t){var o=e.components,r=e.mdxType,c=e.originalType,s=e.parentName,a=p(e,["components","mdxType","originalType","parentName"]),d=i(o),u=r,y=d["".concat(s,".").concat(u)]||d[u]||m[u]||c;return o?n.createElement(y,l(l({ref:t},a),{},{components:o})):n.createElement(y,l({ref:t},a))}));function y(e,t){var o=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var c=o.length,l=new Array(c);l[0]=u;var p={};for(var s in t)hasOwnProperty.call(t,s)&&(p[s]=t[s]);p.originalType=e,p[d]="string"==typeof e?e:r,l[1]=p;for(var i=2;i<c;i++)l[i]=o[i];return n.createElement.apply(null,l)}return n.createElement.apply(null,o)}u.displayName="MDXCreateElement"},6733:(e,t,o)=>{o.r(t),o.d(t,{contentTitle:()=>l,default:()=>d,frontMatter:()=>c,metadata:()=>p,toc:()=>s});var n=o(87462),r=(o(67294),o(3905));const c={sidebar_position:3,title:"Docker-compose \u90e8\u7f72",keywords:["docker-compose","Deployment"],description:"Docker-compose Deployment"},l=void 0,p={unversionedId:"deployment/deployment-docker-compose",id:"version-2.4.2/deployment/deployment-docker-compose",isDocsHomePage:!1,title:"Docker-compose \u90e8\u7f72",description:"Docker-compose Deployment",source:"@site/i18n/zh/docusaurus-plugin-content-docs/version-2.4.2/deployment/deployment-docker-compose.md",sourceDirName:"deployment",slug:"/deployment/deployment-docker-compose",permalink:"/zh/docs/2.4.2/deployment/deployment-docker-compose",editUrl:"https://github.com/apache/shenyu-website/edit/main/i18n/zh/docusaurus-plugin-content-docs/version-2.4.2/deployment/deployment-docker-compose.md",version:"2.4.2",sidebarPosition:3,frontMatter:{sidebar_position:3,title:"Docker-compose \u90e8\u7f72",keywords:["docker-compose","Deployment"],description:"Docker-compose Deployment"},sidebar:"version-2.4.2/tutorialSidebar",previous:{title:"\u4e8c\u8fdb\u5236\u5305\u90e8\u7f72",permalink:"/zh/docs/2.4.2/deployment/deployment-package"},next:{title:"Docker\u90e8\u7f72",permalink:"/zh/docs/2.4.2/deployment/deployment-docker"}},s=[{value:"\u4e0b\u8f7d shell \u811a\u672c",id:"\u4e0b\u8f7d-shell-\u811a\u672c",children:[]},{value:"\u6267\u884c\u811a\u672c",id:"\u6267\u884c\u811a\u672c",children:[]},{value:"\u4fee\u6539\u914d\u7f6e\u6587\u4ef6",id:"\u4fee\u6539\u914d\u7f6e\u6587\u4ef6",children:[]},{value:"\u6267\u884c docker-compose",id:"\u6267\u884c-docker-compose",children:[]}],i={toc:s},a="wrapper";function d(e){let{components:t,...o}=e;return(0,r.kt)(a,(0,n.Z)({},i,o,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("p",null,"\u672c\u6587\u4ecb\u7ecd\u4f7f\u7528 ",(0,r.kt)("inlineCode",{parentName:"p"},"docker-compose")," \u6765\u90e8\u7f72 ",(0,r.kt)("inlineCode",{parentName:"p"},"Apache ShenYu")," \u7f51\u5173\u3002"),(0,r.kt)("h3",{id:"\u4e0b\u8f7d-shell-\u811a\u672c"},"\u4e0b\u8f7d shell \u811a\u672c"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},"curl -O https://raw.githubusercontent.com/apache/incubator-shenyu/master/shenyu-dist/shenyu-docker-compose-dist/src/main/resources/install.sh\n")),(0,r.kt)("h3",{id:"\u6267\u884c\u811a\u672c"},"\u6267\u884c\u811a\u672c"),(0,r.kt)("p",null,"\u8fd9\u4e2a\u811a\u672c\u4f1a\u4e0b\u8f7d\u9700\u8981\u7684\u914d\u7f6e\u6587\u4ef6\u3001mysql-connector\uff0c\u5982\u679c\u53d1\u73b0\u4e0b\u8f7d\u5931\u8d25\u53ef\u4ee5\u91cd\u590d\u6267\u884c\u3002"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},"sh ./install.sh v2.4.2 #\u9ed8\u8ba4\u62c9\u53d6\u6700\u65b0\u914d\u7f6e\uff0c\u5982\u679c\u9700\u8981\u90e8\u7f72\u5df2\u53d1\u5e03\u7248\u672c\uff0c\u53ef\u589e\u52a0\u4e00\u4e2a\u53c2\u6570\u8868\u793a\u7248\u672c\u53f7\uff0c\u6bd4\u5982\uff1av2.4.2 \u6216 latest\n")),(0,r.kt)("h3",{id:"\u4fee\u6539\u914d\u7f6e\u6587\u4ef6"},"\u4fee\u6539\u914d\u7f6e\u6587\u4ef6"),(0,r.kt)("p",null,"\u53ef\u4ee5\u4fee\u6539\u811a\u672c\u4e0b\u8f7d\u7684\u914d\u7f6e\u6587\u4ef6\u3002"),(0,r.kt)("h3",{id:"\u6267\u884c-docker-compose"},"\u6267\u884c docker-compose"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},"docker-compose -f ./shenyu-${VERSION}/docker-compose.yaml up -d\n")))}d.isMDXComponent=!0}}]);