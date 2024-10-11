"use strict";(self.webpackChunkshenyu_website=self.webpackChunkshenyu_website||[]).push([[22411],{15680:(e,n,t)=>{t.d(n,{xA:()=>u,yg:()=>m});var r=t(96540);function o(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function a(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function p(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?a(Object(t),!0).forEach((function(n){o(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):a(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function i(e,n){if(null==e)return{};var t,r,o=function(e,n){if(null==e)return{};var t,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)t=a[r],n.indexOf(t)>=0||(o[t]=e[t]);return o}(e,n);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)t=a[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var s=r.createContext({}),l=function(e){var n=r.useContext(s),t=n;return e&&(t="function"==typeof e?e(n):p(p({},n),e)),t},u=function(e){var n=l(e.components);return r.createElement(s.Provider,{value:n},e.children)},c="mdxType",y={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},d=r.forwardRef((function(e,n){var t=e.components,o=e.mdxType,a=e.originalType,s=e.parentName,u=i(e,["components","mdxType","originalType","parentName"]),c=l(t),d=o,m=c["".concat(s,".").concat(d)]||c[d]||y[d]||a;return t?r.createElement(m,p(p({ref:n},u),{},{components:t})):r.createElement(m,p({ref:n},u))}));function m(e,n){var t=arguments,o=n&&n.mdxType;if("string"==typeof e||o){var a=t.length,p=new Array(a);p[0]=d;var i={};for(var s in n)hasOwnProperty.call(n,s)&&(i[s]=n[s]);i.originalType=e,i[c]="string"==typeof e?e:o,p[1]=i;for(var l=2;l<a;l++)p[l]=t[l];return r.createElement.apply(null,p)}return r.createElement.apply(null,t)}d.displayName="MDXCreateElement"},88869:(e,n,t)=>{t.r(n),t.d(n,{contentTitle:()=>p,default:()=>c,frontMatter:()=>a,metadata:()=>i,toc:()=>s});var r=t(58168),o=(t(96540),t(15680));const a={sidebar_position:3,title:"Docker Deployment",keywords:["docker","Deployment"],description:"Docker Deployment"},p=void 0,i={unversionedId:"deployment/deployment-docker",id:"version-2.4.2/deployment/deployment-docker",isDocsHomePage:!1,title:"Docker Deployment",description:"Docker Deployment",source:"@site/versioned_docs/version-2.4.2/deployment/deployment-docker.md",sourceDirName:"deployment",slug:"/deployment/deployment-docker",permalink:"/docs/2.4.2/deployment/deployment-docker",editUrl:"https://github.com/apache/shenyu-website/edit/main/versioned_docs/version-2.4.2/deployment/deployment-docker.md",version:"2.4.2",sidebarPosition:3,frontMatter:{sidebar_position:3,title:"Docker Deployment",keywords:["docker","Deployment"],description:"Docker Deployment"},sidebar:"version-2.4.2/tutorialSidebar",previous:{title:"Docker-compose Deployment",permalink:"/docs/2.4.2/deployment/deployment-docker-compose"},next:{title:"K8s Deployment",permalink:"/docs/2.4.2/deployment/deployment-k8s"}},s=[{value:"Start Apache ShenYu Admin",id:"start-apache-shenyu-admin",children:[]},{value:"Start Apache ShenYu Bootstrap",id:"start-apache-shenyu-bootstrap",children:[]},{value:"Start ShenYu Bootstrap with ShenYu Agent",id:"start-shenyu-bootstrap-with-shenyu-agent",children:[]}],l={toc:s},u="wrapper";function c(e){let{components:n,...t}=e;return(0,o.yg)(u,(0,r.A)({},l,t,{components:n,mdxType:"MDXLayout"}),(0,o.yg)("p",null,"This article introduces the use of ",(0,o.yg)("inlineCode",{parentName:"p"},"docker")," to deploy the ",(0,o.yg)("inlineCode",{parentName:"p"},"Apache ShenYu")," gateway."),(0,o.yg)("h3",{id:"start-apache-shenyu-admin"},"Start Apache ShenYu Admin"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre"},"docker pull apache/shenyu-admin:2.4.2\ndocker network create shenyu\n")),(0,o.yg)("ul",null,(0,o.yg)("li",{parentName:"ul"},"use ",(0,o.yg)("inlineCode",{parentName:"li"},"h2")," to store data:")),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre"},"docker run -d -p 9095:9095 --net shenyu apache/shenyu-admin:2.4.2\n")),(0,o.yg)("ul",null,(0,o.yg)("li",{parentName:"ul"},"use ",(0,o.yg)("inlineCode",{parentName:"li"},"MySQL")," to store data, copy ",(0,o.yg)("a",{parentName:"li",href:"https://repo1.maven.org/maven2/mysql/mysql-connector-java/8.0.18/mysql-connector-java-8.0.18.jar"},"mysql-connector.jar")," to ",(0,o.yg)("inlineCode",{parentName:"li"},"/$(your_work_dir)/ext-lib"),"\uff1a")),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre"},'docker run -v /${your_work_dir}/ext-lib:/opt/shenyu-admin/ext-lib -e "SPRING_PROFILES_ACTIVE=mysql" -e "spring.datasource.url=jdbc:mysql://${your_ip_port}/shenyu?useUnicode=true&characterEncoding=utf-8&useSSL=false" -e "spring.datasource.username=${your_username}" -e "spring.datasource.password=${your_password}" -d -p 9095:9095 --net shenyu apache/shenyu-admin:2.4.2\n')),(0,o.yg)("p",null,"another way is to put the ",(0,o.yg)("inlineCode",{parentName:"p"},"application.yml"),"\u3001",(0,o.yg)("inlineCode",{parentName:"p"},"application-mysql.yml"),"\u3001",(0,o.yg)("inlineCode",{parentName:"p"},"application-pg.yml")," configuration in  ${your_work_dir}/conf from ",(0,o.yg)("a",{parentName:"p",href:"https://github.com/apache/incubator-shenyu/blob/master/shenyu-admin/src/main/resources/"},"Configure address")," , and then execute the following statement\uff1a"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre"},"docker run -v ${your_work_dir}/conf:/opt/shenyu-admin/conf -v /${your_work_dir}/ext-lib:/opt/shenyu-admin/ext-lib -d -p 9095:9095 --net shenyu apache/shenyu-admin:2.4.2\n")),(0,o.yg)("ul",null,(0,o.yg)("li",{parentName:"ul"},"use ",(0,o.yg)("inlineCode",{parentName:"li"},"PostgreSql")," to store data, execute the following statement\uff1a")),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre"},'docker run -e "SPRING_PROFILES_ACTIVE=pg" -e "spring.datasource.url=jdbc:postgresql://${your_ip_port}/shenyu?useUnicode=true&characterEncoding=utf-8&useSSL=false" -e "spring.datasource.username=${your_username}" -e "spring.datasource.password=${your_password}" -d -p 9095:9095 --net shenyu apache/shenyu-admin:2.4.2\n')),(0,o.yg)("p",null,"another way is to put the ",(0,o.yg)("inlineCode",{parentName:"p"},"application.yml")," configuration in ${your_work_dir}/conf, and then execute the following statement\uff1a"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre"},"docker run -v ${your_work_dir}/conf:/opt/shenyu-admin/conf -d -p 9095:9095 --net shenyu apache/shenyu-admin:2.4.2\n")),(0,o.yg)("h3",{id:"start-apache-shenyu-bootstrap"},"Start Apache ShenYu Bootstrap"),(0,o.yg)("p",null,"In the host, the directory where the bootstrap ",(0,o.yg)("a",{parentName:"p",href:"https://github.com/apache/incubator-shenyu/tree/master/shenyu-bootstrap/src/main/resources"},"configuration file")," is located is recorded as ",(0,o.yg)("inlineCode",{parentName:"p"},"$BOOTSTRAP_CONF"),"."),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-shell"},"docker network create shenyu\ndocker pull apache/shenyu-bootstrap:2.4.2\ndocker run -d \\\n  -p 9195:9195 \\  -v $BOOTSTRAP_CONF:/opt/shenyu-bootstrap/conf \\\n  apache/shenyu-bootstrap:2.4.2\n")),(0,o.yg)("h3",{id:"start-shenyu-bootstrap-with-shenyu-agent"},"Start ShenYu Bootstrap with ShenYu Agent"),(0,o.yg)("blockquote",null,(0,o.yg)("p",{parentName:"blockquote"},"2.4.2 version started to support shenyu-agent")),(0,o.yg)("ul",null,(0,o.yg)("li",{parentName:"ul"},"Edit configuration file")),(0,o.yg)("p",null,"Agent related configuration files are located at ",(0,o.yg)("a",{parentName:"p",href:"https://github.com/apache/incubator-shenyu/tree/master/shenyu-dist/shenyu-agent-dist/src/main/resources/conf"},"shenyu-dist/shenyu-agent-dist/src/main/resources/conf/"),", after editing ",(0,o.yg)("inlineCode",{parentName:"p"},"shenyu-agent.yaml")," and ",(0,o.yg)("inlineCode",{parentName:"p"},"tracing-point.yaml"),", put these two files in the same directory, record them as ",(0,o.yg)("inlineCode",{parentName:"p"},"$AGENT_CONF"),"."),(0,o.yg)("p",null,"For detailed configuration, please refer to ",(0,o.yg)("a",{parentName:"p",href:"/docs/2.4.2/user-guide/observability/observability"},"Observability")),(0,o.yg)("ul",null,(0,o.yg)("li",{parentName:"ul"},"Pull the docker image and run")),(0,o.yg)("p",null,"The additional parameter ",(0,o.yg)("inlineCode",{parentName:"p"},"agent")," means to start ",(0,o.yg)("inlineCode",{parentName:"p"},"shenyu-agent"),"."),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-shell"},"docker network create shenyu\ndocker pull apache/shenyu-bootstrap:2.4.2\ndocker run -d \\\n  -p 9195:9195 \\\n  --net shenyu \\\n  -v $AGENT_CONF:/opt/shenyu-bootstrap/agent/conf \\\n  -v $BOOTSTRAP_CONF:/opt/shenyu-bootstrap/conf \\\n  apache/shenyu-bootstrap:2.4.2 agent\n")))}c.isMDXComponent=!0}}]);