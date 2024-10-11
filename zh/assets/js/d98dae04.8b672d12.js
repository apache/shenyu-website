"use strict";(self.webpackChunkshenyu_website=self.webpackChunkshenyu_website||[]).push([[75240],{15680:(e,n,r)=>{r.d(n,{xA:()=>u,yg:()=>m});var t=r(96540);function o(e,n,r){return n in e?Object.defineProperty(e,n,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[n]=r,e}function a(e,n){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);n&&(t=t.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),r.push.apply(r,t)}return r}function i(e){for(var n=1;n<arguments.length;n++){var r=null!=arguments[n]?arguments[n]:{};n%2?a(Object(r),!0).forEach((function(n){o(e,n,r[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(r,n))}))}return e}function p(e,n){if(null==e)return{};var r,t,o=function(e,n){if(null==e)return{};var r,t,o={},a=Object.keys(e);for(t=0;t<a.length;t++)r=a[t],n.indexOf(r)>=0||(o[r]=e[r]);return o}(e,n);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(t=0;t<a.length;t++)r=a[t],n.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var c=t.createContext({}),l=function(e){var n=t.useContext(c),r=n;return e&&(r="function"==typeof e?e(n):i(i({},n),e)),r},u=function(e){var n=l(e.components);return t.createElement(c.Provider,{value:n},e.children)},s="mdxType",d={inlineCode:"code",wrapper:function(e){var n=e.children;return t.createElement(t.Fragment,{},n)}},y=t.forwardRef((function(e,n){var r=e.components,o=e.mdxType,a=e.originalType,c=e.parentName,u=p(e,["components","mdxType","originalType","parentName"]),s=l(r),y=o,m=s["".concat(c,".").concat(y)]||s[y]||d[y]||a;return r?t.createElement(m,i(i({ref:n},u),{},{components:r})):t.createElement(m,i({ref:n},u))}));function m(e,n){var r=arguments,o=n&&n.mdxType;if("string"==typeof e||o){var a=r.length,i=new Array(a);i[0]=y;var p={};for(var c in n)hasOwnProperty.call(n,c)&&(p[c]=n[c]);p.originalType=e,p[s]="string"==typeof e?e:o,i[1]=p;for(var l=2;l<a;l++)i[l]=r[l];return t.createElement.apply(null,i)}return t.createElement.apply(null,r)}y.displayName="MDXCreateElement"},96446:(e,n,r)=>{r.r(n),r.d(n,{contentTitle:()=>i,default:()=>s,frontMatter:()=>a,metadata:()=>p,toc:()=>c});var t=r(58168),o=(r(96540),r(15680));const a={sidebar_position:3,title:"Docker\u90e8\u7f72",keywords:["Docker","\u90e8\u7f72"],description:"docker\u90e8\u7f72"},i=void 0,p={unversionedId:"deployment/deployment-docker",id:"version-2.4.0/deployment/deployment-docker",isDocsHomePage:!1,title:"Docker\u90e8\u7f72",description:"docker\u90e8\u7f72",source:"@site/i18n/zh/docusaurus-plugin-content-docs/version-2.4.0/deployment/deployment-docker.md",sourceDirName:"deployment",slug:"/deployment/deployment-docker",permalink:"/zh/docs/2.4.0/deployment/deployment-docker",editUrl:"https://github.com/apache/shenyu-website/edit/main/i18n/zh/docusaurus-plugin-content-docs/version-2.4.0/deployment/deployment-docker.md",version:"2.4.0",sidebarPosition:3,frontMatter:{sidebar_position:3,title:"Docker\u90e8\u7f72",keywords:["Docker","\u90e8\u7f72"],description:"docker\u90e8\u7f72"},sidebar:"version-2.4.0/tutorialSidebar",previous:{title:"\u4e8c\u8fdb\u5236\u5305\u90e8\u7f72",permalink:"/zh/docs/2.4.0/deployment/deployment-package"},next:{title:"K8s\u90e8\u7f72",permalink:"/zh/docs/2.4.0/deployment/deployment-k8s"}},c=[{value:"\u542f\u52a8Apache ShenYu Admin",id:"\u542f\u52a8apache-shenyu-admin",children:[]},{value:"\u542f\u52a8Apache ShenYu Bootstrap",id:"\u542f\u52a8apache-shenyu-bootstrap",children:[]}],l={toc:c},u="wrapper";function s(e){let{components:n,...r}=e;return(0,o.yg)(u,(0,t.A)({},l,r,{components:n,mdxType:"MDXLayout"}),(0,o.yg)("p",null,"\u672c\u6587\u4ecb\u7ecd\u4f7f\u7528 ",(0,o.yg)("inlineCode",{parentName:"p"},"docker")," \u6765\u90e8\u7f72 ",(0,o.yg)("inlineCode",{parentName:"p"},"Apache ShenYu")," \u7f51\u5173\u3002"),(0,o.yg)("h3",{id:"\u542f\u52a8apache-shenyu-admin"},"\u542f\u52a8Apache ShenYu Admin"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre"},"docker pull apache/shenyu-admin:2.4.0\ndocker network create shenyu\n")),(0,o.yg)("ul",null,(0,o.yg)("li",{parentName:"ul"},"\u4f7f\u7528 ",(0,o.yg)("inlineCode",{parentName:"li"},"h2")," \u6765\u5b58\u50a8\u540e\u53f0\u6570\u636e\uff1a")),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre"},"docker run -d -p 9095:9095 --net shenyu apache/shenyu-admin:2.4.0\n")),(0,o.yg)("ul",null,(0,o.yg)("li",{parentName:"ul"},"\u4f7f\u7528 ",(0,o.yg)("inlineCode",{parentName:"li"},"MySQL")," \u6765\u5b58\u50a8\u540e\u53f0\u6570\u636e,\u5c06 ",(0,o.yg)("a",{parentName:"li",href:"https://repo1.maven.org/maven2/mysql/mysql-connector-java/8.0.18/mysql-connector-java-8.0.18.jar"},"mysql-connector.jar")," \u62f7\u8d1d\u5230 ",(0,o.yg)("inlineCode",{parentName:"li"},"/${your_work_dir}/ext-lib"),"\uff1a")),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre"},'docker run -v /${your_work_dir}/ext-lib:/opt/shenyu-admin/ext-lib -e "SPRING_PROFILES_ACTIVE=mysql" -e "spring.datasource.url=jdbc:mysql://${your_ip_port}/shenyu?useUnicode=true&characterEncoding=utf-8&useSSL=false" -e "spring.datasource.username=${your_username}" -e "spring.datasource.password=${your_password}" -d -p 9095:9095 --net shenyu apache/shenyu-admin:2.4.0\n')),(0,o.yg)("p",null,"\u53e6\u5916\u4e00\u79cd\u65b9\u5f0f\u628a ",(0,o.yg)("inlineCode",{parentName:"p"},"application.yml")," \u914d\u7f6e\u653e\u5230",(0,o.yg)("inlineCode",{parentName:"p"},"${your_work_dir}/conf"),"\uff0c \u7136\u540e\u6267\u884c\u4ee5\u4e0b\u8bed\u53e5\uff1a"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre"},"docker run -v ${your_work_dir}/conf:/opt/shenyu-admin/conf/ -v /${your_work_dir}/ext-lib:/opt/shenyu-admin/ext-lib -d -p 9095:9095 --net shenyu apache/shenyu-admin:2.4.0\n")),(0,o.yg)("h3",{id:"\u542f\u52a8apache-shenyu-bootstrap"},"\u542f\u52a8Apache ShenYu Bootstrap"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre"},"docker run -d \\\n  -p 9195:9195 \\\n  -v $BOOTSTRAP_CONF:/opt/shenyu-bootstrap/conf \\\n  --name shenyu-bootstrap \\\n  --net shenyu \\\n  --env SHENYU_SYNC_WEBSOCKET_URLS=ws://shenyu-admin:9095/websocket \\\n  apache/shenyu-bootstrap:${current.version}\n")))}s.isMDXComponent=!0}}]);