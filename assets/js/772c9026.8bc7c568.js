"use strict";(self.webpackChunkshenyu_website=self.webpackChunkshenyu_website||[]).push([[88391],{15680:(e,n,t)=>{t.d(n,{xA:()=>y,yg:()=>d});var a=t(96540);function r(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function o(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,a)}return t}function i(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?o(Object(t),!0).forEach((function(n){r(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function p(e,n){if(null==e)return{};var t,a,r=function(e,n){if(null==e)return{};var t,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)t=o[a],n.indexOf(t)>=0||(r[t]=e[t]);return r}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)t=o[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}var l=a.createContext({}),c=function(e){var n=a.useContext(l),t=n;return e&&(t="function"==typeof e?e(n):i(i({},n),e)),t},y=function(e){var n=c(e.components);return a.createElement(l.Provider,{value:n},e.children)},s="mdxType",u={inlineCode:"code",wrapper:function(e){var n=e.children;return a.createElement(a.Fragment,{},n)}},m=a.forwardRef((function(e,n){var t=e.components,r=e.mdxType,o=e.originalType,l=e.parentName,y=p(e,["components","mdxType","originalType","parentName"]),s=c(t),m=r,d=s["".concat(l,".").concat(m)]||s[m]||u[m]||o;return t?a.createElement(d,i(i({ref:n},y),{},{components:t})):a.createElement(d,i({ref:n},y))}));function d(e,n){var t=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var o=t.length,i=new Array(o);i[0]=m;var p={};for(var l in n)hasOwnProperty.call(n,l)&&(p[l]=n[l]);p.originalType=e,p[s]="string"==typeof e?e:r,i[1]=p;for(var c=2;c<o;c++)i[c]=t[c];return a.createElement.apply(null,i)}return a.createElement.apply(null,t)}m.displayName="MDXCreateElement"},36539:(e,n,t)=>{t.r(n),t.d(n,{contentTitle:()=>i,default:()=>s,frontMatter:()=>o,metadata:()=>p,toc:()=>l});var a=t(58168),r=(t(96540),t(15680));const o={sidebar_position:2,title:"Binary Packages Deployment",keywords:["Deployment"],description:"Binary Packages Deployment"},i=void 0,p={unversionedId:"deployment/deployment-package",id:"version-2.4.0/deployment/deployment-package",isDocsHomePage:!1,title:"Binary Packages Deployment",description:"Binary Packages Deployment",source:"@site/versioned_docs/version-2.4.0/deployment/deployment-package.md",sourceDirName:"deployment",slug:"/deployment/deployment-package",permalink:"/docs/2.4.0/deployment/deployment-package",editUrl:"https://github.com/apache/shenyu-website/edit/main/versioned_docs/version-2.4.0/deployment/deployment-package.md",version:"2.4.0",sidebarPosition:2,frontMatter:{sidebar_position:2,title:"Binary Packages Deployment",keywords:["Deployment"],description:"Binary Packages Deployment"},sidebar:"version-2.4.0/tutorialSidebar",previous:{title:"Local Deployment",permalink:"/docs/2.4.0/deployment/deployment-local"},next:{title:"Docker Deployment",permalink:"/docs/2.4.0/deployment/deployment-docker"}},l=[{value:"Start Apache ShenYu Admin",id:"start-apache-shenyu-admin",children:[]},{value:"Start Apache ShenYu Bootstrap",id:"start-apache-shenyu-bootstrap",children:[]}],c={toc:l},y="wrapper";function s(e){let{components:n,...t}=e;return(0,r.yg)(y,(0,a.A)({},c,t,{components:n,mdxType:"MDXLayout"}),(0,r.yg)("p",null,"This article introduces the deployment of the ",(0,r.yg)("inlineCode",{parentName:"p"},"Apache ShenYu")," gateway using the binary packages."),(0,r.yg)("h3",{id:"start-apache-shenyu-admin"},"Start Apache ShenYu Admin"),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("p",{parentName:"li"},"download ",(0,r.yg)("a",{parentName:"p",href:"https://archive.apache.org/dist/incubator/shenyu/2.4.0/apache-shenyu-incubating-2.4.0-admin-bin.tar.gz"},"apache-shenyu-incubating-2.4.0-admin-bin.tar.gz"))),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("p",{parentName:"li"},"unzip ",(0,r.yg)("inlineCode",{parentName:"p"},"apache-shenyu-incubating-2.4.0-admin-bin.tar.gz"),"\u3002 go to the ",(0,r.yg)("inlineCode",{parentName:"p"},"bin")," directory.")),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("p",{parentName:"li"},"use ",(0,r.yg)("inlineCode",{parentName:"p"},"h2")," to store data\uff1a"))),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre"},"> windows: start.bat --spring.profiles.active = h2\n\n> linux: ./start.sh --spring.profiles.active = h2\n")),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},"use ",(0,r.yg)("inlineCode",{parentName:"li"},"MySQL")," to store data, copy ",(0,r.yg)("a",{parentName:"li",href:"https://repo1.maven.org/maven2/mysql/mysql-connector-java/8.0.18/mysql-connector-java-8.0.18.jar"},"mysql-connector.jar")," to /$(your_work_dir)/ext-lib, go to the ",(0,r.yg)("inlineCode",{parentName:"li"},"/conf")," directory, and modify the configuration of ",(0,r.yg)("inlineCode",{parentName:"li"},"mysql")," in ",(0,r.yg)("inlineCode",{parentName:"li"},"application.yaml"),".")),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre"},"> windows: start.bat \n\n> linux: ./start.sh \n")),(0,r.yg)("h3",{id:"start-apache-shenyu-bootstrap"},"Start Apache ShenYu Bootstrap"),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("p",{parentName:"li"},"download ",(0,r.yg)("a",{parentName:"p",href:"https://archive.apache.org/dist/incubator/shenyu/2.4.0/apache-shenyu-incubating-2.4.0-bootstrap-bin.tar.gz"},"apache-shenyu-incubating-2.4.0-bootstrap-bin.tar.gz"))),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("p",{parentName:"li"},"unzip ",(0,r.yg)("inlineCode",{parentName:"p"},"apache-shenyu-incubating-2.4.0-bootstrap-bin.tar.gz"),"\u3002 go to the ",(0,r.yg)("inlineCode",{parentName:"p"},"bin")," directory."))),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre"},"> windwos : start.bat \n\n> linux : ./start.sh \n")))}s.isMDXComponent=!0}}]);