"use strict";(self.webpackChunkshenyu_website=self.webpackChunkshenyu_website||[]).push([[63015],{15680:(e,n,r)=>{r.d(n,{xA:()=>u,yg:()=>g});var t=r(96540);function a(e,n,r){return n in e?Object.defineProperty(e,n,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[n]=r,e}function p(e,n){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);n&&(t=t.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),r.push.apply(r,t)}return r}function o(e){for(var n=1;n<arguments.length;n++){var r=null!=arguments[n]?arguments[n]:{};n%2?p(Object(r),!0).forEach((function(n){a(e,n,r[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):p(Object(r)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(r,n))}))}return e}function i(e,n){if(null==e)return{};var r,t,a=function(e,n){if(null==e)return{};var r,t,a={},p=Object.keys(e);for(t=0;t<p.length;t++)r=p[t],n.indexOf(r)>=0||(a[r]=e[r]);return a}(e,n);if(Object.getOwnPropertySymbols){var p=Object.getOwnPropertySymbols(e);for(t=0;t<p.length;t++)r=p[t],n.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var s=t.createContext({}),l=function(e){var n=t.useContext(s),r=n;return e&&(r="function"==typeof e?e(n):o(o({},n),e)),r},u=function(e){var n=l(e.components);return t.createElement(s.Provider,{value:n},e.children)},d="mdxType",y={inlineCode:"code",wrapper:function(e){var n=e.children;return t.createElement(t.Fragment,{},n)}},c=t.forwardRef((function(e,n){var r=e.components,a=e.mdxType,p=e.originalType,s=e.parentName,u=i(e,["components","mdxType","originalType","parentName"]),d=l(r),c=a,g=d["".concat(s,".").concat(c)]||d[c]||y[c]||p;return r?t.createElement(g,o(o({ref:n},u),{},{components:r})):t.createElement(g,o({ref:n},u))}));function g(e,n){var r=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var p=r.length,o=new Array(p);o[0]=c;var i={};for(var s in n)hasOwnProperty.call(n,s)&&(i[s]=n[s]);i.originalType=e,i[d]="string"==typeof e?e:a,o[1]=i;for(var l=2;l<p;l++)o[l]=r[l];return t.createElement.apply(null,o)}return t.createElement.apply(null,r)}c.displayName="MDXCreateElement"},69932:(e,n,r)=>{r.r(n),r.d(n,{contentTitle:()=>o,default:()=>d,frontMatter:()=>p,metadata:()=>i,toc:()=>s});var t=r(58168),a=(r(96540),r(15680));const p={title:"\u4f7f\u7528Zookeeper\u63a5\u5165",keywords:["Sdk \u4f7f\u7528","zookeeper"],description:"Sdk\u4f7f\u7528"},o=void 0,i={unversionedId:"user-guide/sdk-usage/shenyu-sdk-zookeeper",id:"user-guide/sdk-usage/shenyu-sdk-zookeeper",isDocsHomePage:!1,title:"\u4f7f\u7528Zookeeper\u63a5\u5165",description:"Sdk\u4f7f\u7528",source:"@site/i18n/zh/docusaurus-plugin-content-docs/current/user-guide/sdk-usage/shenyu-sdk-zookeeper.md",sourceDirName:"user-guide/sdk-usage",slug:"/user-guide/sdk-usage/shenyu-sdk-zookeeper",permalink:"/zh/docs/next/user-guide/sdk-usage/shenyu-sdk-zookeeper",editUrl:"https://github.com/apache/shenyu-website/edit/main/i18n/zh/docusaurus-plugin-content-docs/current/user-guide/sdk-usage/shenyu-sdk-zookeeper.md",version:"current",frontMatter:{title:"\u4f7f\u7528Zookeeper\u63a5\u5165",keywords:["Sdk \u4f7f\u7528","zookeeper"],description:"Sdk\u4f7f\u7528"},sidebar:"tutorialSidebar",previous:{title:"\u4f7f\u7528Nacos\u63a5\u5165",permalink:"/zh/docs/next/user-guide/sdk-usage/shenyu-sdk-nacos"},next:{title:"\u670d\u52a1\u53d1\u73b0\u6a21\u5757",permalink:"/zh/docs/next/user-guide/discovery/discovery-mode"}},s=[{value:"\u80cc\u666f\u8bf4\u660e",id:"\u80cc\u666f\u8bf4\u660e",children:[]},{value:"\u73af\u5883\u51c6\u5907",id:"\u73af\u5883\u51c6\u5907",children:[]},{value:"shenyu-bootstrap",id:"shenyu-bootstrap",children:[{value:"\u6dfb\u52a0Maven\u4f9d\u8d56",id:"\u6dfb\u52a0maven\u4f9d\u8d56",children:[]},{value:"\u914d\u7f6e\u6587\u4ef6\u8c03\u6574",id:"\u914d\u7f6e\u6587\u4ef6\u8c03\u6574",children:[]}]},{value:"\u5e94\u7528\u5ba2\u6237\u7aef",id:"\u5e94\u7528\u5ba2\u6237\u7aef",children:[{value:"\u6dfb\u52a0Maven\u4f9d\u8d56",id:"\u6dfb\u52a0maven\u4f9d\u8d56-1",children:[]},{value:"\u914d\u7f6e\u6587\u4ef6\u8c03\u6574",id:"\u914d\u7f6e\u6587\u4ef6\u8c03\u6574-1",children:[]}]},{value:"\u672c\u5730\u63a5\u53e3\u914d\u7f6e",id:"\u672c\u5730\u63a5\u53e3\u914d\u7f6e",children:[]}],l={toc:s},u="wrapper";function d(e){let{components:n,...r}=e;return(0,a.yg)(u,(0,t.A)({},l,r,{components:n,mdxType:"MDXLayout"}),(0,a.yg)("h2",{id:"\u80cc\u666f\u8bf4\u660e"},"\u80cc\u666f\u8bf4\u660e"),(0,a.yg)("p",null,"Shenyu\u63d0\u4f9b\u4e86Shenyu-Sdk\u65b9\u4fbf\u8ba9\u670d\u52a1\u80fd\u591f\u5feb\u901f\u63a5\u5165shenyu\u7f51\u5173\uff0c \u5ba2\u6237\u7aef\u670d\u52a1\u53ea\u9700\u8981\u4f9d\u8d56\u8be5sdk\uff0c \u5e76\u505a\u4e9b\u7b80\u5355\u914d\u7f6e\uff0c \u5373\u53ef\u7c7b\u4f3c\u8c03\u7528\u672c\u5730\u63a5\u53e3\u4e00\u6837\u8c03\u7528\u7f51\u5173\u66b4\u9732\u7684API\u3002"),(0,a.yg)("img",{src:"/img/shenyu/sdk/shenyu-sdk_process.png",width:"80%",height:"50%"}),(0,a.yg)("p",null,"\u5ba2\u6237\u7aef\u63a5\u5165\u7f51\u5173\u7684\u6ce8\u518c\u4e2d\u5fc3\u652f\u6301(nacos\u3001eureka\u3001etcd\u3001zookeeper\u3001consul)\uff0c\u4e0b\u9762\u4e3a",(0,a.yg)("inlineCode",{parentName:"p"},"shenyu-bootstrap"),"\u53ca",(0,a.yg)("inlineCode",{parentName:"p"},"\u5e94\u7528\u5ba2\u6237\u7aef"),"\u4f7f\u7528",(0,a.yg)("strong",{parentName:"p"},"Zookeeper"),"\u6ce8\u518c\u4e2d\u5fc3\u65f6\u7684\u76f8\u5173\u6307\u5f15\u3002"),(0,a.yg)("h2",{id:"\u73af\u5883\u51c6\u5907"},"\u73af\u5883\u51c6\u5907"),(0,a.yg)("p",null,"\u9700\u8981\u53c2\u8003 ",(0,a.yg)("inlineCode",{parentName:"p"},"\u8fd0\u7ef4\u90e8\u7f72")," , \u9009\u62e9\u4e00\u79cd\u65b9\u5f0f\u542f\u52a8",(0,a.yg)("inlineCode",{parentName:"p"},"shenyu-admin"),"\u53ca",(0,a.yg)("inlineCode",{parentName:"p"},"shenyu-bootstrap"),"."),(0,a.yg)("h2",{id:"shenyu-bootstrap"},"shenyu-bootstrap"),(0,a.yg)("h3",{id:"\u6dfb\u52a0maven\u4f9d\u8d56"},"\u6dfb\u52a0Maven\u4f9d\u8d56"),(0,a.yg)("p",null,"\u5728\u7f51\u5173\u7684",(0,a.yg)("inlineCode",{parentName:"p"},"pom.xml"),"\u6587\u4ef6\u4e2d\u5f15\u5165\u5982\u4e0b\u4f9d\u8d56."),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-xml"},"<dependency>\n    <groupId>org.apache.shenyu</groupId>\n    <artifactId>shenyu-spring-boot-starter-registry</artifactId>\n    <version>${project.version}</version>\n</dependency>\n")),(0,a.yg)("h3",{id:"\u914d\u7f6e\u6587\u4ef6\u8c03\u6574"},"\u914d\u7f6e\u6587\u4ef6\u8c03\u6574"),(0,a.yg)("p",null,"\u5728\u7f51\u5173\u7684",(0,a.yg)("inlineCode",{parentName:"p"},"yml"),"\u914d\u7f6e\u6587\u4ef6\u4e2d\u6dfb\u52a0\u5982\u4e0b\u914d\u7f6e."),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-yaml"},"shenyu:\n  register:\n    enabled: true\n    registerType: zookeeper\n    serverLists: localhost:2181\n    props:\n      contextPath: /http\n      appName: http\n      port: 8189\n      isFull: false\n# registerType : \u670d\u52a1\u6ce8\u518c\u7c7b\u578b\uff0c\u586b\u5199 zookeeper\n# serverList: \u4e3azookeeper\u6ce8\u518c\u7c7b\u578b\u65f6\uff0c\u586b\u5199zookeeper\u5730\u5740\uff0c\u591a\u4e2a\u5730\u5740\u7528\u82f1\u6587\u9017\u53f7\u5206\u9694\n# port: \u4f60\u672c\u9879\u76ee\u7684\u542f\u52a8\u7aef\u53e3,\u76ee\u524dspringmvc/tars/grpc\u9700\u8981\u8fdb\u884c\u586b\u5199\n# contextPath: \u4e3a\u4f60\u7684\u8fd9\u4e2amvc\u9879\u76ee\u5728shenyu\u7f51\u5173\u7684\u8def\u7531\u524d\u7f00\uff0c \u6bd4\u5982/order \uff0c/product \u7b49\u7b49\uff0c\u7f51\u5173\u4f1a\u6839\u636e\u4f60\u7684\u8fd9\u4e2a\u524d\u7f00\u6765\u8fdb\u884c\u8def\u7531.\n# appName\uff1a\u4f60\u7684\u5e94\u7528\u540d\u79f0\uff0c\u4e0d\u914d\u7f6e\u7684\u8bdd\uff0c\u4f1a\u9ed8\u8ba4\u53d6 `spring.application.name` \u7684\u503c\n# isFull: \u8bbe\u7f6etrue \u4ee3\u8868\u4ee3\u7406\u4f60\u7684\u6574\u4e2a\u670d\u52a1\uff0cfalse\u8868\u793a\u4ee3\u7406\u4f60\u5176\u4e2d\u67d0\u51e0\u4e2acontroller\uff1b\u76ee\u524d\u9002\u7528\u4e8espringmvc/springcloud\n\n# \u8be6\u7ec6\u53c2\u8003`\u7528\u6237\u6307\u5357>\u5c5e\u6027\u914d\u7f6e>\u5ba2\u6237\u7aef\u63a5\u5165\u914d\u7f6e`\u6587\u6863 \n")),(0,a.yg)("h2",{id:"\u5e94\u7528\u5ba2\u6237\u7aef"},"\u5e94\u7528\u5ba2\u6237\u7aef"),(0,a.yg)("h3",{id:"\u6dfb\u52a0maven\u4f9d\u8d56-1"},"\u6dfb\u52a0Maven\u4f9d\u8d56"),(0,a.yg)("p",null,"\u5728\u5e94\u7528\u5ba2\u6237\u7aef\u7684",(0,a.yg)("inlineCode",{parentName:"p"},"pom.xml"),"\u6587\u4ef6\u4e2d\u5f15\u5165\u5982\u4e0b\u4f9d\u8d56."),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},"Shenyu-Sdk \u6838\u5fc3\u5305")),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-xml"},"<dependencies>\n    <dependency>\n        <groupId>org.apache.shenyu</groupId>\n        <artifactId>shenyu-sdk-core</artifactId>\n        <version>2.5.1-SNAPSHOT</version>\n    </dependency>\n\n    <dependency>\n        <groupId>org.apache.shenyu</groupId>\n        <artifactId>shenyu-spring-boot-starter-sdk</artifactId>\n        <version>2.5.1-SNAPSHOT</version>\n    </dependency>\n</dependencies>\n")),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},"Shenyu-Sdk http\u5b9e\u73b0\u5305")),(0,a.yg)("blockquote",null,(0,a.yg)("p",{parentName:"blockquote"},"http\u5ba2\u6237\u7aef\u5b9e\u73b0\uff0c \u76ee\u524d\u63d0\u4f9b\u5b9e\u73b0okhttp, httpclient. \u5176\u4ed6\u5ba2\u6237\u7aef\u5b9e\u73b0\u53ef\u7ee7\u627f",(0,a.yg)("inlineCode",{parentName:"p"},"AbstractShenyuSdkClient"),"\u5b9e\u73b0\u3002")),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-xml"},"\x3c!-- httpclient --\x3e\n<dependency>\n    <groupId>org.apache.shenyu</groupId>\n    <artifactId>shenyu-sdk-httpclient</artifactId>\n    <version>2.5.1-SNAPSHOT</version>\n</dependency>\n\n\x3c!-- okhttp --\x3e\n\x3c!-- \n<dependency>\n    <groupId>org.apache.shenyu</groupId>\n    <artifactId>shenyu-sdk-okhttp</artifactId>\n    <version>2.5.1-SNAPSHOT</version>\n</dependency>\n--\x3e\n")),(0,a.yg)("h3",{id:"\u914d\u7f6e\u6587\u4ef6\u8c03\u6574-1"},"\u914d\u7f6e\u6587\u4ef6\u8c03\u6574"),(0,a.yg)("p",null,"\u5728\u5e94\u7528\u5ba2\u6237\u7aef\u7684",(0,a.yg)("inlineCode",{parentName:"p"},"yml"),"\u914d\u7f6e\u6587\u4ef6\u4e2d\u6dfb\u52a0\u5982\u4e0b\u914d\u7f6e."),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-yaml"},"shenyu:\n  sdk:\n    enabled: true\n    register-type: zookeeper \n    server-lists: localhost:2181\n    props:\n      retry:\n        enable: true\n        period: 100\n        maxPeriod: 1000\n        maxAttempts: 5\n      algorithm: roundRobin\n      scheme: http\n\n# registerType : \u670d\u52a1\u6ce8\u518c\u7c7b\u578b\uff0c\u586b\u5199 zookeeper\n# serverList: \u4e3azookeeper\u6ce8\u518c\u7c7b\u578b\u65f6\uff0c\u586b\u5199zookeeper\u5730\u5740\uff0c\u591a\u4e2a\u5730\u5740\u7528\u82f1\u6587\u9017\u53f7\u5206\u9694\n# retry \u5931\u8d25\u91cd\u8bd5\u76f8\u5173\u914d\u7f6e\n# retry.period: \u91cd\u8bd5\u7b49\u5f85\u65f6\u95f4\n# retry.maxPeriod: \u6700\u5927\u91cd\u8bd5\u7b49\u5f85\u65f6\u95f4 \n# retry.maxAttempts: \u6700\u5927\u91cd\u8bd5\u6b21\u6570\n# algorithm: \u8d1f\u8f7d\u5747\u8861\n# scheme: \u8bf7\u6c42\u534f\u8bae\u5934\n")),(0,a.yg)("h2",{id:"\u672c\u5730\u63a5\u53e3\u914d\u7f6e"},"\u672c\u5730\u63a5\u53e3\u914d\u7f6e"),(0,a.yg)("ol",null,(0,a.yg)("li",{parentName:"ol"},(0,a.yg)("p",{parentName:"li"},"\u5728\u9879\u76ee\u542f\u52a8\u7c7b\u4e0a\u6807\u6ce8",(0,a.yg)("inlineCode",{parentName:"p"},'@EnableShenyuClients(basePackages = "org.apache.shenyu.examples.sdk.http.api")'),", \u5176\u4e2d",(0,a.yg)("inlineCode",{parentName:"p"},"basePackages"),"\u4e2d\u7ef4\u62a4\u7684\u662fShenyu-Sdk\u5bf9\u5e94\u7ef4\u62a4\u7f51\u5173API\u63a5\u53e3\u7684\u6240\u5728\u5305\u4f4d\u7f6e.")),(0,a.yg)("li",{parentName:"ol"},(0,a.yg)("p",{parentName:"li"},"\u521b\u5efainterface\u5e76\u4f7f\u7528",(0,a.yg)("inlineCode",{parentName:"p"},'@ShenyuClient(name = "xxx", contextId = "ShenyuSdkApiName")'),"\u6ce8\u89e3\u6807\u6ce8, \u5176\u4e2d",(0,a.yg)("inlineCode",{parentName:"p"},"name"),"\u8868\u793a\u7f51\u5173\u670d\u52a1\u540d.\u5047\u5982\u4f60\u9700\u8981\u5b9a\u4e49\u591a\u4e2abean\u6765\u7ef4\u62a4\u7f51\u5173\u7684API, \u53ef\u4ee5\u4f7f\u7528",(0,a.yg)("inlineCode",{parentName:"p"},"contextId"),"\u4f5c\u4e3a\u5bf9\u5e94\u7684bean\u522b\u540d. ")),(0,a.yg)("li",{parentName:"ol"},(0,a.yg)("p",{parentName:"li"},"\u5728\u5b9a\u4e49\u63a5\u53e3\u4e2d\u6dfb\u52a0\u6240\u8981\u6620\u5c04shenyu\u7f51\u5173\u4e2d\u7684\u63a5\u53e3\u65b9\u6cd5\uff0c \u5176\u4e2d",(0,a.yg)("inlineCode",{parentName:"p"},"@xxMapping"),"\u4e2d\u7684",(0,a.yg)("inlineCode",{parentName:"p"},"value"),"\u5bf9\u5e94\u503c\u662f\u7f51\u5173\u4e2d\u5bf9\u5e94\u8bf7\u6c42\u7684\u8def\u5f84\u3002"))),(0,a.yg)("p",null,(0,a.yg)("strong",{parentName:"p"},"\u793a\u4f8b")),(0,a.yg)("p",null,"\u9879\u76ee\u542f\u52a8\u7c7b"),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-java"},'@SpringBootApplication\n@EnableShenyuClients(basePackages = "org.apache.shenyu.examples.sdk.http.api")\npublic class ShenyuSdkHttpExampleApplication {\n\n    /**\n     * main.\n     *\n     * @param args args\n     */\n    public static void main(final String[] args) {\n        SpringApplication.run(ShenyuSdkHttpExampleApplication.class, args);\n    }\n}\n')),(0,a.yg)("p",null,"\u7f51\u5173API\u63a5\u53e3"),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-java"},'@ShenyuClient(name = "shenyu-gateway", contextId = "ShenyuSdkApiName")\npublic interface ShenyuHttpClientApi {\n\n    /**\n     * findById.\n     * test Get.\n     *\n     * @param id id\n     * @return SdkTestDto\n     */\n    @GetMapping("/http/shenyu/client/findById")\n    SdkTestDto findById(@RequestParam("id") String id);\n}\n')),(0,a.yg)("p",null,"\u66f4\u591a\u53ef\u53c2\u8003\u793a\u4f8b\u5de5\u7a0b ",(0,a.yg)("a",{parentName:"p",href:"https://github.com/apache/shenyu/tree/master/shenyu-examples/shenyu-examples-sdk"},"shenyu-examples-sdk")))}d.isMDXComponent=!0}}]);