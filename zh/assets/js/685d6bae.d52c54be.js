"use strict";(self.webpackChunkshenyu_website=self.webpackChunkshenyu_website||[]).push([[51652],{9413:(e,n,a)=>{a.r(n),a.d(n,{contentTitle:()=>o,default:()=>u,frontMatter:()=>l,metadata:()=>s,toc:()=>p});var r=a(58168),t=(a(96540),a(15680));const l={sidebar_position:6,title:"\u4f7f\u7528\u4e0d\u540c\u7684\u6570\u636e\u540c\u6b65\u7b56\u7565",keywords:["soul"],description:"\u4f7f\u7528\u4e0d\u540c\u7684\u6570\u636e\u540c\u6b65\u7b56\u7565"},o=void 0,s={unversionedId:"users-guide/use-data-sync",id:"version-2.3.0-Legacy/users-guide/use-data-sync",isDocsHomePage:!1,title:"\u4f7f\u7528\u4e0d\u540c\u7684\u6570\u636e\u540c\u6b65\u7b56\u7565",description:"\u4f7f\u7528\u4e0d\u540c\u7684\u6570\u636e\u540c\u6b65\u7b56\u7565",source:"@site/i18n/zh/docusaurus-plugin-content-docs/version-2.3.0-Legacy/users-guide/use-data-sync.md",sourceDirName:"users-guide",slug:"/users-guide/use-data-sync",permalink:"/zh/docs/2.3.0-Legacy/users-guide/use-data-sync",editUrl:"https://github.com/apache/shenyu-website/edit/main/i18n/zh/docusaurus-plugin-content-docs/version-2.3.0-Legacy/users-guide/use-data-sync.md",version:"2.3.0-Legacy",sidebarPosition:6,frontMatter:{sidebar_position:6,title:"\u4f7f\u7528\u4e0d\u540c\u7684\u6570\u636e\u540c\u6b65\u7b56\u7565",keywords:["soul"],description:"\u4f7f\u7528\u4e0d\u540c\u7684\u6570\u636e\u540c\u6b65\u7b56\u7565"},sidebar:"version-2.3.0-Legacy/tutorialSidebar",previous:{title:"Sofa\u63a5\u5165\u7f51\u5173",permalink:"/zh/docs/2.3.0-Legacy/users-guide/sofa-rpc-proxy"},next:{title:"\u6ce8\u518c\u4e2d\u5fc3\u8bbe\u8ba1",permalink:"/zh/docs/2.3.0-Legacy/register-center/register-center-design"}},p=[{value:"\u8bf4\u660e",id:"\u8bf4\u660e",children:[]},{value:"websocket\u540c\u6b65\uff08\u9ed8\u8ba4\u65b9\u5f0f\uff0c\u63a8\u8350\uff09",id:"websocket\u540c\u6b65\u9ed8\u8ba4\u65b9\u5f0f\u63a8\u8350",children:[]},{value:"zookeeper\u540c\u6b65",id:"zookeeper\u540c\u6b65",children:[]},{value:"http\u957f\u8f6e\u8be2\u540c\u6b65",id:"http\u957f\u8f6e\u8be2\u540c\u6b65",children:[]},{value:"nacos\u540c\u6b65",id:"nacos\u540c\u6b65",children:[]}],i={toc:p},c="wrapper";function u(e){let{components:n,...a}=e;return(0,t.yg)(c,(0,r.A)({},i,a,{components:n,mdxType:"MDXLayout"}),(0,t.yg)("h2",{id:"\u8bf4\u660e"},"\u8bf4\u660e"),(0,t.yg)("ul",null,(0,t.yg)("li",{parentName:"ul"},(0,t.yg)("p",{parentName:"li"},"\u6570\u636e\u540c\u6b65\u662f\u6307\u5c06 ",(0,t.yg)("inlineCode",{parentName:"p"},"soul-admin")," \u914d\u7f6e\u7684\u6570\u636e\uff0c\u540c\u6b65\u5230 ",(0,t.yg)("inlineCode",{parentName:"p"},"soul")," \u96c6\u7fa4\u4e2d\u7684JVM\u5185\u5b58\u91cc\u9762\uff0c\u662f\u7f51\u5173\u9ad8\u6027\u80fd\u7684\u5173\u952e\u3002")),(0,t.yg)("li",{parentName:"ul"},(0,t.yg)("p",{parentName:"li"},"\u5b9e\u73b0\u539f\u7406\uff0c\u8bf7\u770b\uff1a",(0,t.yg)("a",{parentName:"p",href:"../design/data-sync"},"\u6570\u636e\u540c\u6b65"),"\u3002")),(0,t.yg)("li",{parentName:"ul"},(0,t.yg)("p",{parentName:"li"},"\u6587\u4e2d\u6240\u8bf4\u7684\u7f51\u5173\uff0c\u662f\u6307\u4f60\u642d\u5efa\u7684\u7f51\u5173\u73af\u5883\uff0c\u8bf7\u770b\uff1a",(0,t.yg)("a",{parentName:"p",href:"../users-guide/soul-set-up"},"\u642d\u5efa\u73af\u5883"),"\u3002"))),(0,t.yg)("h2",{id:"websocket\u540c\u6b65\u9ed8\u8ba4\u65b9\u5f0f\u63a8\u8350"},"websocket\u540c\u6b65\uff08\u9ed8\u8ba4\u65b9\u5f0f\uff0c\u63a8\u8350\uff09"),(0,t.yg)("ul",null,(0,t.yg)("li",{parentName:"ul"},(0,t.yg)("p",{parentName:"li"},"\u7f51\u5173\u914d\u7f6e\uff08\u8bb0\u5f97\u91cd\u542f\uff09"),(0,t.yg)("ul",{parentName:"li"},(0,t.yg)("li",{parentName:"ul"},(0,t.yg)("p",{parentName:"li"},"\u9996\u5148\u5728 ",(0,t.yg)("inlineCode",{parentName:"p"},"pom.xml")," \u6587\u4ef6\u4e2d \u5f15\u5165\u4ee5\u4e0b\u4f9d\u8d56\uff1a"),(0,t.yg)("pre",{parentName:"li"},(0,t.yg)("code",{parentName:"pre",className:"language-xml"},"\x3c!--soul data sync start use websocket--\x3e\n<dependency>\n  <groupId>org.dromara</groupId>\n  <artifactId>soul-spring-boot-starter-sync-data-websocket</artifactId>\n  <version>${last.version}</version>\n</dependency>\n"))),(0,t.yg)("li",{parentName:"ul"},(0,t.yg)("p",{parentName:"li"},"\u5728 springboot\u7684 yml \u6587\u4ef6\u4e2d\u8fdb\u884c\u5982\u4e0b\u914d\u7f6e:"))),(0,t.yg)("pre",{parentName:"li"},(0,t.yg)("code",{parentName:"pre",className:"language-yaml"},"soul :\n    sync:\n        websocket :\n          # urls:\u662f\u6307 soul-admin\u7684\u5730\u5740\uff0c\u5982\u679c\u6709\u591a\u4e2a\uff0c\u8bf7\u4f7f\u7528\uff08,\uff09\u5206\u5272.\n          urls: ws://localhost:9095/websocket\n          allowOrigin: ws://localhost:9195\n")),(0,t.yg)("ul",{parentName:"li"},(0,t.yg)("li",{parentName:"ul"},(0,t.yg)("p",{parentName:"li"},"soul-admin \u914d\u7f6e\uff0c\u6216\u5728 soul-admin \u542f\u52a8\u53c2\u6570\u4e2d\u8bbe\u7f6e ",(0,t.yg)("inlineCode",{parentName:"p"},"--soul.sync.websocket=''"),"\uff0c\u7136\u540e\u91cd\u542f\u670d\u52a1\u3002"),(0,t.yg)("pre",{parentName:"li"},(0,t.yg)("code",{parentName:"pre",className:"language-yaml"},"soul:\n  sync:\n     websocket:\n"))))),(0,t.yg)("li",{parentName:"ul"},(0,t.yg)("p",{parentName:"li"},"\u5f53\u5efa\u7acb\u8fde\u63a5\u4ee5\u540e\u4f1a\u5168\u91cf\u83b7\u53d6\u4e00\u6b21\u6570\u636e\uff0c\u4ee5\u540e\u7684\u6570\u636e\u90fd\u662f\u589e\u91cf\u7684\u66f4\u65b0\u4e0e\u65b0\u589e\uff0c\u6027\u80fd\u597d\u3002")),(0,t.yg)("li",{parentName:"ul"},(0,t.yg)("p",{parentName:"li"},"\u652f\u6301\u65ad\u7ebf\u91cd\u8fde \uff08\u9ed8\u8ba430\u79d2\uff09\u3002"))),(0,t.yg)("h2",{id:"zookeeper\u540c\u6b65"},"zookeeper\u540c\u6b65"),(0,t.yg)("ul",null,(0,t.yg)("li",{parentName:"ul"},(0,t.yg)("p",{parentName:"li"},"\u7f51\u5173\u914d\u7f6e\uff08\u8bb0\u5f97\u91cd\u542f\uff09"),(0,t.yg)("ul",{parentName:"li"},(0,t.yg)("li",{parentName:"ul"},"\u9996\u5148\u5728 ",(0,t.yg)("inlineCode",{parentName:"li"},"pom.xml")," \u6587\u4ef6\u4e2d \u5f15\u5165\u4ee5\u4e0b\u4f9d\u8d56\uff1a")),(0,t.yg)("pre",{parentName:"li"},(0,t.yg)("code",{parentName:"pre",className:"language-xml"},"   \x3c!--soul data sync start use zookeeper--\x3e\n   <dependency>\n       <groupId>org.dromara</groupId>\n       <artifactId>soul-spring-boot-starter-sync-data-zookeeper</artifactId>\n       <version>${last.version}</version>\n   </dependency>\n"))),(0,t.yg)("li",{parentName:"ul"},(0,t.yg)("p",{parentName:"li"},"\u5728 springboot\u7684 yml \u6587\u4ef6\u4e2d\u8fdb\u884c\u5982\u4e0b\u914d\u7f6e:"),(0,t.yg)("pre",{parentName:"li"},(0,t.yg)("code",{parentName:"pre",className:"language-yaml"},"soul :\n  sync:\n    zookeeper:\n      url: localhost:2181\n      sessionTimeout: 5000\n      connectionTimeout: 2000\n      #url: \u914d\u7f6e\u6210\u4f60\u7684zk\u5730\u5740\uff0c\u96c6\u7fa4\u73af\u5883\u8bf7\u4f7f\u7528\uff08,\uff09\u5206\u9694\n"))),(0,t.yg)("li",{parentName:"ul"},(0,t.yg)("p",{parentName:"li"},"soul-admin \u914d\u7f6e, \u6216\u5728 soul-admin \u542f\u52a8\u53c2\u6570\u4e2d\u8bbe\u7f6e ",(0,t.yg)("inlineCode",{parentName:"p"},"--soul.sync.zookeeper.url='\u4f60\u7684\u5730\u5740'"),",\u7136\u540e\u91cd\u542f\u670d\u52a1\u3002"))),(0,t.yg)("pre",null,(0,t.yg)("code",{parentName:"pre",className:"language-yaml"},"soul:\n  sync:\n    zookeeper:\n        url: localhost:2181\n        sessionTimeout: 5000\n        connectionTimeout: 2000\n")),(0,t.yg)("ul",null,(0,t.yg)("li",{parentName:"ul"},"\u4f7f\u7528zookeeper\u540c\u6b65\u673a\u5236\u4e5f\u662f\u975e\u5e38\u597d\u7684,\u65f6\u6548\u6027\u4e5f\u9ad8\uff0c\u6211\u4eec\u751f\u4ea7\u73af\u5883\u4f7f\u7528\u7684\u5c31\u662f\u8fd9\u4e2a\uff0c\u4f46\u662f\u4e5f\u8981\u5904\u7406zk\u73af\u5883\u4e0d\u7a33\u5b9a\uff0c\u96c6\u7fa4\u8111\u88c2\u7b49\u95ee\u9898.")),(0,t.yg)("h2",{id:"http\u957f\u8f6e\u8be2\u540c\u6b65"},"http\u957f\u8f6e\u8be2\u540c\u6b65"),(0,t.yg)("ul",null,(0,t.yg)("li",{parentName:"ul"},(0,t.yg)("p",{parentName:"li"},"\u7f51\u5173\u914d\u7f6e\uff08\u8bb0\u5f97\u91cd\u542f\uff09"),(0,t.yg)("ul",{parentName:"li"},(0,t.yg)("li",{parentName:"ul"},(0,t.yg)("p",{parentName:"li"},"\u9996\u5148\u5728 ",(0,t.yg)("inlineCode",{parentName:"p"},"pom.xml")," \u6587\u4ef6\u4e2d \u5f15\u5165\u4ee5\u4e0b\u4f9d\u8d56\uff1a"),(0,t.yg)("pre",{parentName:"li"},(0,t.yg)("code",{parentName:"pre",className:"language-xml"},"\x3c!--soul data sync start use http--\x3e\n<dependency>\n   <groupId>org.dromara</groupId>\n    <artifactId>soul-spring-boot-starter-sync-data-http</artifactId>\n    <version>${last.version}</version>\n</dependency>\n"))),(0,t.yg)("li",{parentName:"ul"},(0,t.yg)("p",{parentName:"li"},"\u5728 springboot\u7684 yml \u6587\u4ef6\u4e2d\u8fdb\u884c\u5982\u4e0b\u914d\u7f6e:"),(0,t.yg)("pre",{parentName:"li"},(0,t.yg)("code",{parentName:"pre",className:"language-yaml"},"soul :\n   sync:\n       http:\n            url: http://localhost:9095\n#url: \u914d\u7f6e\u6210\u4f60\u7684 soul-admin\u7684 ip\u4e0e\u7aef\u53e3\u5730\u5740\uff0c\u591a\u4e2aadmin\u96c6\u7fa4\u73af\u5883\u8bf7\u4f7f\u7528\uff08,\uff09\u5206\u9694\u3002\n"))),(0,t.yg)("li",{parentName:"ul"},(0,t.yg)("p",{parentName:"li"},"soul-admin \u914d\u7f6e, \u6216\u5728 soul-admin \u542f\u52a8\u53c2\u6570\u4e2d\u8bbe\u7f6e ",(0,t.yg)("inlineCode",{parentName:"p"},"--soul.sync.http=''"),",\u7136\u540e\u91cd\u542f\u670d\u52a1\u3002"),(0,t.yg)("pre",{parentName:"li"},(0,t.yg)("code",{parentName:"pre",className:"language-yaml"},"soul:\n  sync:\n     http:\n"))))),(0,t.yg)("li",{parentName:"ul"},(0,t.yg)("p",{parentName:"li"},"http\u957f\u8f6e\u8be2\u4f7f\u5f97\u7f51\u5173\u5f88\u8f7b\u91cf\uff0c\u65f6\u6548\u6027\u7565\u4f4e\u3002")),(0,t.yg)("li",{parentName:"ul"},(0,t.yg)("p",{parentName:"li"},"\u5176\u6839\u636e\u5206\u7ec4key\u6765\u62c9\u53d6\uff0c\u5982\u679c\u6570\u636e\u91cf\u8fc7\u5927\uff0c\u8fc7\u591a\uff0c\u4f1a\u6709\u4e00\u5b9a\u7684\u5f71\u54cd\u3002 \u4ec0\u4e48\u610f\u601d\u5462\uff1f\u5c31\u662f\u4e00\u4e2a\u7ec4\u4e0b\u9762\u7684\u4e00\u4e2a\u5c0f\u5730\u65b9\u66f4\u6539\uff0c\u4f1a\u62c9\u53d6\u6574\u4e2a\u7684\u7ec4\u6570\u636e\u3002")),(0,t.yg)("li",{parentName:"ul"},(0,t.yg)("p",{parentName:"li"},"\u5728soul-admin \u96c6\u7fa4\u65f6\u5019\uff0c\u53ef\u80fd\u4f1a\u6709bug\u3002"))),(0,t.yg)("h2",{id:"nacos\u540c\u6b65"},"nacos\u540c\u6b65"),(0,t.yg)("ul",null,(0,t.yg)("li",{parentName:"ul"},(0,t.yg)("p",{parentName:"li"},"\u7f51\u5173\u914d\u7f6e\uff08\u8bb0\u5f97\u91cd\u542f\uff09"),(0,t.yg)("ul",{parentName:"li"},(0,t.yg)("li",{parentName:"ul"},(0,t.yg)("p",{parentName:"li"},"\u9996\u5148\u5728 ",(0,t.yg)("inlineCode",{parentName:"p"},"pom.xml")," \u6587\u4ef6\u4e2d \u5f15\u5165\u4ee5\u4e0b\u4f9d\u8d56\uff1a"),(0,t.yg)("pre",{parentName:"li"},(0,t.yg)("code",{parentName:"pre",className:"language-xml"},"\x3c!--soul data sync start use nacos--\x3e\n  <dependency>\n       <groupId>org.dromara</groupId>\n        <artifactId>soul-spring-boot-starter-sync-data-nacos</artifactId>\n        <version>${last.version}</version>\n  </dependency>\n"))),(0,t.yg)("li",{parentName:"ul"},(0,t.yg)("p",{parentName:"li"},"\u5728 springboot\u7684 yml \u6587\u4ef6\u4e2d\u8fdb\u884c\u5982\u4e0b\u914d\u7f6e:"),(0,t.yg)("pre",{parentName:"li"},(0,t.yg)("code",{parentName:"pre",className:"language-yaml"},"soul :\n  sync:\n     nacos:\n          url: localhost:8848\n          namespace: 1c10d748-af86-43b9-8265-75f487d20c6c\n          acm:\n            enabled: false\n            endpoint: acm.aliyun.com\n            namespace:\n            accessKey:\n            secretKey:\n#url: \u914d\u7f6e\u6210\u4f60\u7684nacos\u5730\u5740\uff0c\u96c6\u7fa4\u73af\u5883\u8bf7\u4f7f\u7528\uff08,\uff09\u5206\u9694\u3002\n# \u5176\u4ed6\u53c2\u6570\u914d\u7f6e\uff0c\u8bf7\u53c2\u8003naocs\u5b98\u7f51\u3002\n"))))),(0,t.yg)("li",{parentName:"ul"},(0,t.yg)("p",{parentName:"li"},"soul-admin \u914d\u7f6e, \u6216\u5728 soul-admin \u542f\u52a8\u53c2\u6570\u4e2d\u4f7f\u7528 ",(0,t.yg)("inlineCode",{parentName:"p"},"--")," \u7684\u65b9\u5f0f\u4e00\u4e2a\u4e00\u4e2a\u4f20\u503c"))),(0,t.yg)("pre",null,(0,t.yg)("code",{parentName:"pre",className:"language-yaml"},"soul:\n  sync:\n    nacos:\n     url: localhost:8848\n     namespace: 1c10d748-af86-43b9-8265-75f487d20c6c\n     acm:\n       enabled: false\n       endpoint: acm.aliyun.com\n       namespace:\n       accessKey:\n       secretKey:\n")))}u.isMDXComponent=!0},15680:(e,n,a)=>{a.d(n,{xA:()=>c,yg:()=>g});var r=a(96540);function t(e,n,a){return n in e?Object.defineProperty(e,n,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[n]=a,e}function l(e,n){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),a.push.apply(a,r)}return a}function o(e){for(var n=1;n<arguments.length;n++){var a=null!=arguments[n]?arguments[n]:{};n%2?l(Object(a),!0).forEach((function(n){t(e,n,a[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):l(Object(a)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(a,n))}))}return e}function s(e,n){if(null==e)return{};var a,r,t=function(e,n){if(null==e)return{};var a,r,t={},l=Object.keys(e);for(r=0;r<l.length;r++)a=l[r],n.indexOf(a)>=0||(t[a]=e[a]);return t}(e,n);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(r=0;r<l.length;r++)a=l[r],n.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(t[a]=e[a])}return t}var p=r.createContext({}),i=function(e){var n=r.useContext(p),a=n;return e&&(a="function"==typeof e?e(n):o(o({},n),e)),a},c=function(e){var n=i(e.components);return r.createElement(p.Provider,{value:n},e.children)},u="mdxType",y={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},m=r.forwardRef((function(e,n){var a=e.components,t=e.mdxType,l=e.originalType,p=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),u=i(a),m=t,g=u["".concat(p,".").concat(m)]||u[m]||y[m]||l;return a?r.createElement(g,o(o({ref:n},c),{},{components:a})):r.createElement(g,o({ref:n},c))}));function g(e,n){var a=arguments,t=n&&n.mdxType;if("string"==typeof e||t){var l=a.length,o=new Array(l);o[0]=m;var s={};for(var p in n)hasOwnProperty.call(n,p)&&(s[p]=n[p]);s.originalType=e,s[u]="string"==typeof e?e:t,o[1]=s;for(var i=2;i<l;i++)o[i]=a[i];return r.createElement.apply(null,o)}return r.createElement.apply(null,a)}m.displayName="MDXCreateElement"}}]);