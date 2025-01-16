"use strict";(self.webpackChunkshenyu_website=self.webpackChunkshenyu_website||[]).push([[42058],{15680:(e,n,t)=>{t.d(n,{xA:()=>p,yg:()=>s});var i=t(96540);function l(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function r(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);n&&(i=i.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,i)}return t}function a(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?r(Object(t),!0).forEach((function(n){l(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):r(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function u(e,n){if(null==e)return{};var t,i,l=function(e,n){if(null==e)return{};var t,i,l={},r=Object.keys(e);for(i=0;i<r.length;i++)t=r[i],n.indexOf(t)>=0||(l[t]=e[t]);return l}(e,n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(i=0;i<r.length;i++)t=r[i],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(l[t]=e[t])}return l}var g=i.createContext({}),o=function(e){var n=i.useContext(g),t=n;return e&&(t="function"==typeof e?e(n):a(a({},n),e)),t},p=function(e){var n=o(e.components);return i.createElement(g.Provider,{value:n},e.children)},c="mdxType",y={inlineCode:"code",wrapper:function(e){var n=e.children;return i.createElement(i.Fragment,{},n)}},d=i.forwardRef((function(e,n){var t=e.components,l=e.mdxType,r=e.originalType,g=e.parentName,p=u(e,["components","mdxType","originalType","parentName"]),c=o(t),d=l,s=c["".concat(g,".").concat(d)]||c[d]||y[d]||r;return t?i.createElement(s,a(a({ref:n},p),{},{components:t})):i.createElement(s,a({ref:n},p))}));function s(e,n){var t=arguments,l=n&&n.mdxType;if("string"==typeof e||l){var r=t.length,a=new Array(r);a[0]=d;var u={};for(var g in n)hasOwnProperty.call(n,g)&&(u[g]=n[g]);u.originalType=e,u[c]="string"==typeof e?e:l,a[1]=u;for(var o=2;o<r;o++)a[o]=t[o];return i.createElement.apply(null,a)}return i.createElement.apply(null,t)}d.displayName="MDXCreateElement"},11936:(e,n,t)=>{t.r(n),t.d(n,{contentTitle:()=>a,default:()=>c,frontMatter:()=>r,metadata:()=>u,toc:()=>g});var i=t(58168),l=(t(96540),t(15680));const r={title:"JWT\u63d2\u4ef6",keywords:["JWT"],description:"JWT\u63d2\u4ef6"},a=void 0,u={unversionedId:"plugin-center/security/jwt-plugin",id:"version-2.6.1/plugin-center/security/jwt-plugin",isDocsHomePage:!1,title:"JWT\u63d2\u4ef6",description:"JWT\u63d2\u4ef6",source:"@site/i18n/zh/docusaurus-plugin-content-docs/version-2.6.1/plugin-center/security/jwt-plugin.md",sourceDirName:"plugin-center/security",slug:"/plugin-center/security/jwt-plugin",permalink:"/zh/docs/2.6.1/plugin-center/security/jwt-plugin",editUrl:"https://github.com/apache/shenyu-website/edit/main/i18n/zh/docusaurus-plugin-content-docs/version-2.6.1/plugin-center/security/jwt-plugin.md",version:"2.6.1",frontMatter:{title:"JWT\u63d2\u4ef6",keywords:["JWT"],description:"JWT\u63d2\u4ef6"},sidebar:"version-2.6.0/tutorialSidebar",previous:{title:"CryptorResponse \u63d2\u4ef6",permalink:"/zh/docs/2.6.1/plugin-center/security/cryptor-response-plugin"},next:{title:"OAuth2\u63d2\u4ef6",permalink:"/zh/docs/2.6.1/plugin-center/security/oauth2-plugin"}},g=[{value:"1.1 \u63d2\u4ef6\u540d\u79f0",id:"11-\u63d2\u4ef6\u540d\u79f0",children:[]},{value:"1.2 \u9002\u7528\u573a\u666f",id:"12-\u9002\u7528\u573a\u666f",children:[]},{value:"1.3 \u63d2\u4ef6\u529f\u80fd",id:"13-\u63d2\u4ef6\u529f\u80fd",children:[]},{value:"1.4 \u63d2\u4ef6\u4ee3\u7801",id:"14-\u63d2\u4ef6\u4ee3\u7801",children:[]},{value:"1.5 \u6dfb\u52a0\u81ea\u54ea\u4e2aShenYu\u7248\u672c",id:"15-\u6dfb\u52a0\u81ea\u54ea\u4e2ashenyu\u7248\u672c",children:[]},{value:"2.1 \u63d2\u4ef6\u4f7f\u7528\u6d41\u7a0b\u56fe",id:"21-\u63d2\u4ef6\u4f7f\u7528\u6d41\u7a0b\u56fe",children:[]},{value:"2.2 \u5bfc\u5165pom",id:"22-\u5bfc\u5165pom",children:[]},{value:"2.3 \u542f\u7528\u63d2\u4ef6",id:"23-\u542f\u7528\u63d2\u4ef6",children:[]},{value:"2.4 \u914d\u7f6e\u63d2\u4ef6",id:"24-\u914d\u7f6e\u63d2\u4ef6",children:[{value:"2.4.1 Config plugin in ShenYu-Admin",id:"241-config-plugin-in-shenyu-admin",children:[]},{value:"2.4.2 Selector config",id:"242-selector-config",children:[]},{value:"2.4.3 Rule Config",id:"243-rule-config",children:[]}]},{value:"2.5 \u793a\u4f8b",id:"25-\u793a\u4f8b",children:[{value:"2.5.1 \u4f7f\u7528jwt\u63d2\u4ef6\u8fdb\u884c\u6743\u9650\u8ba4\u8bc1",id:"251-\u4f7f\u7528jwt\u63d2\u4ef6\u8fdb\u884c\u6743\u9650\u8ba4\u8bc1",children:[]}]}],o={toc:g},p="wrapper";function c(e){let{components:n,...r}=e;return(0,l.yg)(p,(0,i.A)({},o,r,{components:n,mdxType:"MDXLayout"}),(0,l.yg)("hr",null),(0,l.yg)("h1",{id:"1\u6982\u8ff0"},"1.\u6982\u8ff0"),(0,l.yg)("h2",{id:"11-\u63d2\u4ef6\u540d\u79f0"},"1.1 \u63d2\u4ef6\u540d\u79f0"),(0,l.yg)("ul",null,(0,l.yg)("li",{parentName:"ul"},(0,l.yg)("inlineCode",{parentName:"li"},"jwt")," \u63d2\u4ef6")),(0,l.yg)("h2",{id:"12-\u9002\u7528\u573a\u666f"},"1.2 \u9002\u7528\u573a\u666f"),(0,l.yg)("ul",null,(0,l.yg)("li",{parentName:"ul"},"\u9700\u8981\u5728\u7f51\u5173\u7edf\u4e00\u9274\u6743\u3002")),(0,l.yg)("h2",{id:"13-\u63d2\u4ef6\u529f\u80fd"},"1.3 \u63d2\u4ef6\u529f\u80fd"),(0,l.yg)("ul",null,(0,l.yg)("li",{parentName:"ul"},(0,l.yg)("inlineCode",{parentName:"li"},"jwt")," \u63d2\u4ef6\uff0c\u662f\u9488\u5bf9 ",(0,l.yg)("inlineCode",{parentName:"li"},"http")," \u8bf7\u6c42\u5934\u7684 ",(0,l.yg)("inlineCode",{parentName:"li"},"token"),"\u5c5e\u6027\u6216\u8005\u662f ",(0,l.yg)("inlineCode",{parentName:"li"},"authorization")," \u5c5e\u6027\u643a\u5e26\u503c\u8fdb\u884c\u9274\u6743\u5224\u65ad\uff0c\u517c\u5bb9 ",(0,l.yg)("inlineCode",{parentName:"li"},"OAuth2.0")," \u3002")),(0,l.yg)("h2",{id:"14-\u63d2\u4ef6\u4ee3\u7801"},"1.4 \u63d2\u4ef6\u4ee3\u7801"),(0,l.yg)("ul",null,(0,l.yg)("li",{parentName:"ul"},"\u6838\u5fc3\u6a21\u5757\u4e3a ",(0,l.yg)("inlineCode",{parentName:"li"},"shenyu-plugin-jwt"),"."),(0,l.yg)("li",{parentName:"ul"},"\u6838\u5fc3\u7c7b\u4e3a ",(0,l.yg)("inlineCode",{parentName:"li"},"org.apache.shenyu.plugin.jwt.JwtPlugin"),".")),(0,l.yg)("h2",{id:"15-\u6dfb\u52a0\u81ea\u54ea\u4e2ashenyu\u7248\u672c"},"1.5 \u6dfb\u52a0\u81ea\u54ea\u4e2aShenYu\u7248\u672c"),(0,l.yg)("ul",null,(0,l.yg)("li",{parentName:"ul"},"\u81ea\u4ece ShenYu 2.4.0")),(0,l.yg)("h1",{id:"2\u5982\u4f55\u4f7f\u7528\u63d2\u4ef6"},"2.\u5982\u4f55\u4f7f\u7528\u63d2\u4ef6"),(0,l.yg)("h2",{id:"21-\u63d2\u4ef6\u4f7f\u7528\u6d41\u7a0b\u56fe"},"2.1 \u63d2\u4ef6\u4f7f\u7528\u6d41\u7a0b\u56fe"),(0,l.yg)("p",null,(0,l.yg)("img",{src:t(99607).A})),(0,l.yg)("h2",{id:"22-\u5bfc\u5165pom"},"2.2 \u5bfc\u5165pom"),(0,l.yg)("pre",null,(0,l.yg)("code",{parentName:"pre",className:"language-xml"},"<dependency>\n    <groupId>org.apache.shenyu</groupId>\n    <artifactId>shenyu-spring-boot-starter-plugin-jwt</artifactId>\n    <version>${project.version}</version>\n</dependency>\n")),(0,l.yg)("h2",{id:"23-\u542f\u7528\u63d2\u4ef6"},"2.3 \u542f\u7528\u63d2\u4ef6"),(0,l.yg)("ul",null,(0,l.yg)("li",{parentName:"ul"},"\u5728 ",(0,l.yg)("inlineCode",{parentName:"li"},"shenyu-admin")," \u57fa\u7840\u914d\u7f6e --\x3e \u63d2\u4ef6\u7ba1\u7406 --\x3e ",(0,l.yg)("inlineCode",{parentName:"li"},"jwt")," \uff0c\u8bbe\u7f6e\u4e3a\u5f00\u542f\u3002")),(0,l.yg)("h2",{id:"24-\u914d\u7f6e\u63d2\u4ef6"},"2.4 \u914d\u7f6e\u63d2\u4ef6"),(0,l.yg)("h3",{id:"241-config-plugin-in-shenyu-admin"},"2.4.1 Config plugin in ShenYu-Admin"),(0,l.yg)("ul",null,(0,l.yg)("li",{parentName:"ul"},"\u5728ShenYu-Admin\u914d\u7f6ejwt\u63d2\u4ef6\u7684\u79c1\u94a5\uff0c\u8be5\u79c1\u94a5\u5fc5\u987b\u5927\u4e8e256\u4f4d \u3002"),(0,l.yg)("li",{parentName:"ul"},(0,l.yg)("inlineCode",{parentName:"li"},"secretKey")," : \u8be5\u79c1\u94a5\u4e3a\u4f7f\u7528jwt\u65f6\u751f\u6210token\uff0c\u5e76\u4e14\u4ed6\u662f\u5fc5\u987b\u7684\u3002")),(0,l.yg)("p",null,(0,l.yg)("img",{src:t(74100).A})),(0,l.yg)("h3",{id:"242-selector-config"},"2.4.2 Selector config"),(0,l.yg)("ul",null,(0,l.yg)("li",{parentName:"ul"},"\u63d2\u4ef6\u9009\u62e9\u5668\u548c\u89c4\u5219\u7684\u914d\u7f6e\u8bf7\u67e5\u770b: ",(0,l.yg)("a",{parentName:"li",href:"/zh/docs/2.6.1/user-guide/admin-usage/selector-and-rule"},"\u63d2\u4ef6\u548c\u89c4\u5219\u914d\u7f6e"),".")),(0,l.yg)("h3",{id:"243-rule-config"},"2.4.3 Rule Config"),(0,l.yg)("p",null,(0,l.yg)("img",{src:t(91325).A})),(0,l.yg)("ul",null,(0,l.yg)("li",{parentName:"ul"},"convert\u662fjwt\u7684\u8f6c\u5316"),(0,l.yg)("li",{parentName:"ul"},"jwtVal: jwt \u8bf7\u6c42\u4f53\u7684\u540d\u79f0"),(0,l.yg)("li",{parentName:"ul"},"headerVal: jwt\u8bf7\u6c42\u5934\u7684\u540d\u79f0")),(0,l.yg)("p",null,"\u81ea\u5b9a\u4e49\u8f6c\u5316\u7b97\u6cd5\u8bf7\u67e5\u770b\uff1a",(0,l.yg)("a",{parentName:"p",href:"/zh/docs/2.6.1/developer/custom-jwt-covert-algorithm"},"\u81ea\u5b9a\u4e49JWT\u63d2\u4ef6\u8f6c\u5316\u7b97\u6cd5")),(0,l.yg)("h2",{id:"25-\u793a\u4f8b"},"2.5 \u793a\u4f8b"),(0,l.yg)("h3",{id:"251-\u4f7f\u7528jwt\u63d2\u4ef6\u8fdb\u884c\u6743\u9650\u8ba4\u8bc1"},"2.5.1 \u4f7f\u7528jwt\u63d2\u4ef6\u8fdb\u884c\u6743\u9650\u8ba4\u8bc1"),(0,l.yg)("h4",{id:"2511-\u914d\u7f6ejwt\u63d2\u4ef6"},"2.5.1.1 \u914d\u7f6ejwt\u63d2\u4ef6"),(0,l.yg)("p",null,(0,l.yg)("img",{src:t(74100).A})),(0,l.yg)("h4",{id:"2512-\u914d\u7f6e\u9009\u62e9\u5668"},"2.5.1.2 \u914d\u7f6e\u9009\u62e9\u5668"),(0,l.yg)("p",null,(0,l.yg)("img",{src:t(10656).A})),(0,l.yg)("h4",{id:"2513-\u914d\u7f6e\u89c4\u5219"},"2.5.1.3 \u914d\u7f6e\u89c4\u5219"),(0,l.yg)("p",null,(0,l.yg)("img",{src:t(91325).A})),(0,l.yg)("h4",{id:"2514-\u5728\u7f51\u9875\u4e2d\u751f\u6210jwt-token"},"2.5.1.4 \u5728\u7f51\u9875\u4e2d\u751f\u6210jwt token"),(0,l.yg)("ul",null,(0,l.yg)("li",{parentName:"ul"},"\u5728\u4f60\u7684\u6d4f\u89c8\u5668\u4e2d\u6253\u5f00 ",(0,l.yg)("inlineCode",{parentName:"li"},"https://jwt.io/")," \uff0c \u5e76\u4e14\u586b\u5145\u5bf9\u5e94\u7684\u53c2\u6570 \u3002"),(0,l.yg)("li",{parentName:"ul"},"\u5728 ",(0,l.yg)("inlineCode",{parentName:"li"},"https://jwt.io/")," \u7684\u9875\u9762\u914d\u7f6ejwt\u8bf7\u6c42\u5934\u3002"),(0,l.yg)("li",{parentName:"ul"},"\u5728 ",(0,l.yg)("inlineCode",{parentName:"li"},"https://jwt.io/")," \u7684\u9875\u9762\u914d\u7f6ejwt\u53c2\u6570\u4f53\u3002"),(0,l.yg)("li",{parentName:"ul"},"\u5728 ",(0,l.yg)("inlineCode",{parentName:"li"},"https://jwt.io/")," \u7684\u9875\u9762\u914d\u7f6ejwt\u7b7e\u540d\u53c2\u6570\u3002")),(0,l.yg)("p",null,(0,l.yg)("img",{src:t(3553).A})),(0,l.yg)("h4",{id:"2515-\u4f7f\u7528java\u4ee3\u7801\u751f\u6210jwt-token"},"2.5.1.5 \u4f7f\u7528Java\u4ee3\u7801\u751f\u6210jwt token"),(0,l.yg)("pre",null,(0,l.yg)("code",{parentName:"pre",className:"language-java"},'public final class JwtPluginTest {\n    \n  public void generateJwtCode() {\n    final String secreteKey = "shenyu-test-shenyu-test-shenyu-test";\n    Map<String, String> map = new HashMap<>();\n    map.put("id", "1");\n    map.put("name", "xiaoming");\n    Date date = new Date();\n    date.setTime(1655524800000L);\n    String token = Jwts.builder()\n            .setIssuedAt(date)\n            .setExpiration(new Date())\n            .setClaims(map)\n            .signWith(Keys.hmacShaKeyFor(secreteKey.getBytes(StandardCharsets.UTF_8)), SignatureAlgorithm.HS256)\n            .compact();\n    System.out.println(token);\n  }\n}\n')),(0,l.yg)("h4",{id:"2516-\u8bf7\u6c42\u670d\u52a1"},"2.5.1.6 \u8bf7\u6c42\u670d\u52a1"),(0,l.yg)("h5",{id:"25161-\u4f7f\u7528token\u65b9\u5f0f\u8bf7\u6c42\u670d\u52a1"},"2.5.1.6.1 \u4f7f\u7528token\u65b9\u5f0f\u8bf7\u6c42\u670d\u52a1"),(0,l.yg)("ul",null,(0,l.yg)("li",{parentName:"ul"},"\u5728\u4f60\u7684\u8bf7\u6c42\u5934\u4e2d\u9644\u5e26 ",(0,l.yg)("inlineCode",{parentName:"li"},"token: eyJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoieGlhb21pbmciLCJpZCI6IjEifQ.LdRzGlB49alhq204chwF7pf3C0z8ZpuowPvoQdJmSRw")," \u5b57\u6bb5\u5e76\u53d1\u8d77\u8bf7\u6c42\u3002")),(0,l.yg)("h5",{id:"25162-\u4f7f\u7528\u8ba4\u8bc1\u65b9\u5f0f\u8bf7\u6c42\u670d\u52a1"},"2.5.1.6.2 \u4f7f\u7528\u8ba4\u8bc1\u65b9\u5f0f\u8bf7\u6c42\u670d\u52a1"),(0,l.yg)("ul",null,(0,l.yg)("li",{parentName:"ul"},"\u5728\u4f60\u7684\u8bf7\u6c42\u5934\u4e2d\u9644\u5e26 ",(0,l.yg)("inlineCode",{parentName:"li"},"Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoieGlhb21pbmciLCJpZCI6IjEifQ.LdRzGlB49alhq204chwF7pf3C0z8ZpuowPvoQdJmSRw")," \u5e76\u53d1\u8d77\u8bf7\u6c42\u3002")),(0,l.yg)("h4",{id:"2517-\u9a8c\u8bc1\u8bf7\u6c42\u7ed3\u679c"},"2.5.1.7 \u9a8c\u8bc1\u8bf7\u6c42\u7ed3\u679c"),(0,l.yg)("ul",null,(0,l.yg)("li",{parentName:"ul"},"\u9519\u8bef\u7684\u7b7e\u540d")),(0,l.yg)("pre",null,(0,l.yg)("code",{parentName:"pre"},'{\n  "code": 401,\n  "message": "Illegal authorization"\n}\n')),(0,l.yg)("ul",null,(0,l.yg)("li",{parentName:"ul"},"\u6b63\u786e\u7684\u7b7e\u540d")),(0,l.yg)("pre",null,(0,l.yg)("code",{parentName:"pre"},'{\n  "id": "123",\n  "name": "hello world save order"\n}\n')),(0,l.yg)("h1",{id:"3\u5982\u4f55\u7981\u7528\u63d2\u4ef6"},"3.\u5982\u4f55\u7981\u7528\u63d2\u4ef6"),(0,l.yg)("ul",null,(0,l.yg)("li",{parentName:"ul"},"\u5728 ",(0,l.yg)("inlineCode",{parentName:"li"},"shenyu-admin")," \u57fa\u7840\u914d\u7f6e --\x3e \u63d2\u4ef6\u7ba1\u7406 --\x3e ",(0,l.yg)("inlineCode",{parentName:"li"},"jwt")," \uff0c\u8bbe\u7f6e\u4e3a\u5173\u95ed\u3002")),(0,l.yg)("p",null,(0,l.yg)("img",{src:t(12836).A})))}c.isMDXComponent=!0},12836:(e,n,t)=>{t.d(n,{A:()=>i});const i=t.p+"assets/images/jwt-plugin-close_zh-09625cd1385e03717b29bd8a024de3b4.jpg"},74100:(e,n,t)=>{t.d(n,{A:()=>i});const i=t.p+"assets/images/jwt-plugin-config-zh-f77209aec1ded1e1745a2ffef014e44e.jpg"},91325:(e,n,t)=>{t.d(n,{A:()=>i});const i=t.p+"assets/images/jwt-plugin-rule-handle-zh-e8d40c60cf5983defb2df663ae232169.jpg"},10656:(e,n,t)=>{t.d(n,{A:()=>i});const i=t.p+"assets/images/jwt-plugin-selector-config-zh-aecfd911948d5d06a0003f1dfc0cdda2.jpg"},3553:(e,n,t)=>{t.d(n,{A:()=>i});const i=t.p+"assets/images/jwt-web-428e7d369c17035e0daa838740150227.jpg"},99607:(e,n,t)=>{t.d(n,{A:()=>i});const i=t.p+"assets/images/plugin_use_zh-cf88744e5c4b7cc85accbcf32af6e1a3.jpg"}}]);