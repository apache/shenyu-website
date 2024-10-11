"use strict";(self.webpackChunkshenyu_website=self.webpackChunkshenyu_website||[]).push([[83291],{15680:(e,a,r)=>{r.d(a,{xA:()=>m,yg:()=>d});var o=r(96540);function s(e,a,r){return a in e?Object.defineProperty(e,a,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[a]=r,e}function t(e,a){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);a&&(o=o.filter((function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable}))),r.push.apply(r,o)}return r}function n(e){for(var a=1;a<arguments.length;a++){var r=null!=arguments[a]?arguments[a]:{};a%2?t(Object(r),!0).forEach((function(a){s(e,a,r[a])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):t(Object(r)).forEach((function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(r,a))}))}return e}function i(e,a){if(null==e)return{};var r,o,s=function(e,a){if(null==e)return{};var r,o,s={},t=Object.keys(e);for(o=0;o<t.length;o++)r=t[o],a.indexOf(r)>=0||(s[r]=e[r]);return s}(e,a);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);for(o=0;o<t.length;o++)r=t[o],a.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(s[r]=e[r])}return s}var p=o.createContext({}),l=function(e){var a=o.useContext(p),r=a;return e&&(r="function"==typeof e?e(a):n(n({},a),e)),r},m=function(e){var a=l(e.components);return o.createElement(p.Provider,{value:a},e.children)},c="mdxType",g={inlineCode:"code",wrapper:function(e){var a=e.children;return o.createElement(o.Fragment,{},a)}},y=o.forwardRef((function(e,a){var r=e.components,s=e.mdxType,t=e.originalType,p=e.parentName,m=i(e,["components","mdxType","originalType","parentName"]),c=l(r),y=s,d=c["".concat(p,".").concat(y)]||c[y]||g[y]||t;return r?o.createElement(d,n(n({ref:a},m),{},{components:r})):o.createElement(d,n({ref:a},m))}));function d(e,a){var r=arguments,s=a&&a.mdxType;if("string"==typeof e||s){var t=r.length,n=new Array(t);n[0]=y;var i={};for(var p in a)hasOwnProperty.call(a,p)&&(i[p]=a[p]);i.originalType=e,i[c]="string"==typeof e?e:s,n[1]=i;for(var l=2;l<t;l++)n[l]=r[l];return o.createElement.apply(null,n)}return o.createElement.apply(null,r)}y.displayName="MDXCreateElement"},39109:(e,a,r)=>{r.r(a),r.d(a,{contentTitle:()=>n,default:()=>c,frontMatter:()=>t,metadata:()=>i,toc:()=>p});var o=r(58168),s=(r(96540),r(15680));const t={title:"Sofa\u5feb\u901f\u5f00\u59cb",description:"Sofa\u5feb\u901f\u5f00\u59cb"},n=void 0,i={unversionedId:"quick-start/quick-start-sofa",id:"version-2.4.0/quick-start/quick-start-sofa",isDocsHomePage:!1,title:"Sofa\u5feb\u901f\u5f00\u59cb",description:"Sofa\u5feb\u901f\u5f00\u59cb",source:"@site/i18n/zh/docusaurus-plugin-content-docs/version-2.4.0/quick-start/quick-start-sofa.md",sourceDirName:"quick-start",slug:"/quick-start/quick-start-sofa",permalink:"/zh/docs/2.4.0/quick-start/quick-start-sofa",editUrl:"https://github.com/apache/shenyu-website/edit/main/i18n/zh/docusaurus-plugin-content-docs/version-2.4.0/quick-start/quick-start-sofa.md",version:"2.4.0",frontMatter:{title:"Sofa\u5feb\u901f\u5f00\u59cb",description:"Sofa\u5feb\u901f\u5f00\u59cb"},sidebar:"version-2.4.0/tutorialSidebar",previous:{title:"Motan\u5feb\u901f\u5f00\u59cb",permalink:"/zh/docs/2.4.0/quick-start/quick-start-motan"},next:{title:"Spring Cloud\u5feb\u901f\u5f00\u59cb",permalink:"/zh/docs/2.4.0/quick-start/quick-start-springcloud"}},p=[{value:"\u73af\u5883\u51c6\u5907",id:"\u73af\u5883\u51c6\u5907",children:[]},{value:"\u8fd0\u884cshenyu-examples-sofa\u9879\u76ee",id:"\u8fd0\u884cshenyu-examples-sofa\u9879\u76ee",children:[]},{value:"\u6d4b\u8bd5",id:"\u6d4b\u8bd5",children:[]}],l={toc:p},m="wrapper";function c(e){let{components:a,...t}=e;return(0,s.yg)(m,(0,o.A)({},l,t,{components:a,mdxType:"MDXLayout"}),(0,s.yg)("p",null,"\u672c\u6587\u6863\u6f14\u793a\u5982\u4f55\u5c06",(0,s.yg)("inlineCode",{parentName:"p"},"Sofa"),"\u670d\u52a1\u63a5\u5165\u5230",(0,s.yg)("inlineCode",{parentName:"p"},"Apache ShenYu"),"\u7f51\u5173\u3002\u60a8\u53ef\u4ee5\u76f4\u63a5\u5728\u5de5\u7a0b\u4e0b\u627e\u5230\u672c\u6587\u6863\u7684",(0,s.yg)("a",{parentName:"p",href:"https://github.com/apache/incubator-shenyu/tree/v2.4.0/shenyu-examples/shenyu-examples-sofa"},"\u793a\u4f8b\u4ee3\u7801")," \u3002"),(0,s.yg)("h2",{id:"\u73af\u5883\u51c6\u5907"},"\u73af\u5883\u51c6\u5907"),(0,s.yg)("p",null,"\u8bf7\u53c2\u8003\u8fd0\u7ef4\u90e8\u7f72\u7684\u5185\u5bb9\uff0c\u9009\u62e9\u4e00\u79cd\u65b9\u5f0f\u542f\u52a8",(0,s.yg)("inlineCode",{parentName:"p"},"shenyu-admin"),"\u3002\u6bd4\u5982\uff0c\u901a\u8fc7 ",(0,s.yg)("a",{parentName:"p",href:"../deployment/deployment-local"},"\u672c\u5730\u90e8\u7f72")," \u542f\u52a8",(0,s.yg)("inlineCode",{parentName:"p"},"Apache ShenYu"),"\u540e\u53f0\u7ba1\u7406\u7cfb\u7edf\u3002"),(0,s.yg)("p",null,"\u542f\u52a8\u6210\u529f\u540e\uff0c\u9700\u8981\u5728\u57fa\u7840\u914d\u7f6e",(0,s.yg)("inlineCode",{parentName:"p"},"->"),"\u63d2\u4ef6\u7ba1\u7406\u4e2d\uff0c\u628a",(0,s.yg)("inlineCode",{parentName:"p"},"sofa")," \u63d2\u4ef6\u8bbe\u7f6e\u4e3a\u5f00\u542f\uff0c\u5e76\u8bbe\u7f6e\u4f60\u7684\u6ce8\u518c\u5730\u5740\uff0c\u8bf7\u786e\u4fdd\u6ce8\u518c\u4e2d\u5fc3\u5728\u4f60\u672c\u5730\u5df2\u7ecf\u5f00\u542f\u3002"),(0,s.yg)("img",{src:"/img/shenyu/quick-start/sofa/sofa-plugin-enable.png",width:"60%",height:"50%"}),(0,s.yg)("p",null,"\u542f\u52a8\u7f51\u5173\uff0c\u5982\u679c\u662f\u901a\u8fc7\u6e90\u7801\u7684\u65b9\u5f0f\uff0c\u76f4\u63a5\u8fd0\u884c",(0,s.yg)("inlineCode",{parentName:"p"},"shenyu-bootstrap"),"\u4e2d\u7684",(0,s.yg)("inlineCode",{parentName:"p"},"ShenyuBootstrapApplication"),"\u3002"),(0,s.yg)("blockquote",null,(0,s.yg)("p",{parentName:"blockquote"},"\u6ce8\u610f\uff0c\u5728\u542f\u52a8\u524d\uff0c\u8bf7\u786e\u4fdd\u7f51\u5173\u5df2\u7ecf\u5f15\u5165\u76f8\u5173\u4f9d\u8d56\u3002")),(0,s.yg)("p",null,"\u5982\u679c\u5ba2\u6237\u7aef\u662f",(0,s.yg)("inlineCode",{parentName:"p"},"sofa"),"\uff0c\u6ce8\u518c\u4e2d\u5fc3\u4f7f\u7528",(0,s.yg)("inlineCode",{parentName:"p"},"zookeeper"),"\uff0c\u8bf7\u53c2\u8003\u5982\u4e0b\u914d\u7f6e\uff1a"),(0,s.yg)("pre",null,(0,s.yg)("code",{parentName:"pre",className:"language-xml"},"        \x3c!-- apache shenyu sofa plugin start--\x3e\n        <dependency>\n            <groupId>com.alipay.sofa</groupId>\n            <artifactId>sofa-rpc-all</artifactId>\n            <version>5.7.6</version>\n        </dependency>\n        <dependency>\n               <groupId>org.apache.curator</groupId>\n               <artifactId>curator-client</artifactId>\n               <version>4.0.1</version>\n           </dependency>\n           <dependency>\n               <groupId>org.apache.curator</groupId>\n               <artifactId>curator-framework</artifactId>\n               <version>4.0.1</version>\n           </dependency>\n           <dependency>\n               <groupId>org.apache.curator</groupId>\n               <artifactId>curator-recipes</artifactId>\n               <version>4.0.1</version>\n           </dependency>\n\n        <dependency>\n            <groupId>org.apache.shenyu</groupId>\n            <artifactId>shenyu-spring-boot-starter-plugin-sofa</artifactId>\n            <version>${project.version}</version>\n        </dependency>\n        \x3c!-- apache shenyu sofa plugin end--\x3e\n\n")),(0,s.yg)("h2",{id:"\u8fd0\u884cshenyu-examples-sofa\u9879\u76ee"},"\u8fd0\u884cshenyu-examples-sofa\u9879\u76ee"),(0,s.yg)("p",null,"\u4e0b\u8f7d ",(0,s.yg)("a",{parentName:"p",href:"https://github.com/apache/incubator-shenyu/tree/v2.4.0/shenyu-examples/shenyu-examples-sofa"},"shenyu-examples-sofa")),(0,s.yg)("p",null,"\u8bbe\u7f6e",(0,s.yg)("inlineCode",{parentName:"p"},"application.yml"),"\u7684",(0,s.yg)("inlineCode",{parentName:"p"},"zk"),"\u6ce8\u518c\u5730\u5740\uff0c\u5982\uff1a"),(0,s.yg)("pre",null,(0,s.yg)("code",{parentName:"pre",className:"language-xml"},"com:\n  alipay:\n    sofa:\n      rpc:\n        registry-address: zookeeper://127.0.0.1:2181\n")),(0,s.yg)("p",null,"\u8fd0\u884c",(0,s.yg)("inlineCode",{parentName:"p"},"org.apache.shenyu.examples.sofa.service.TestSofaApplication"),"main\u65b9\u6cd5\u542f\u52a8sofa\u670d\u52a1\u3002"),(0,s.yg)("p",null,"\u6210\u529f\u542f\u52a8\u4f1a\u6709\u5982\u4e0b\u65e5\u5fd7\uff1a"),(0,s.yg)("pre",null,(0,s.yg)("code",{parentName:"pre",className:"language-shell"},'2021-02-10 02:31:45.599  INFO 2156 --- [pool-1-thread-1] o.d.s.client.common.utils.RegisterUtils  : sofa client register success: {"appName":"sofa","contextPath":"/sofa","path":"/sofa/insert","pathDesc":"Insert a row of data","rpcType":"sofa","serviceName":"org.dromara.shenyu.examples.sofa.api.service.SofaSingleParamService","methodName":"insert","ruleName":"/sofa/insert","parameterTypes":"org.dromara.shenyu.examples.sofa.api.entity.SofaSimpleTypeBean","rpcExt":"{\\"loadbalance\\":\\"hash\\",\\"retries\\":3,\\"timeout\\":-1}","enabled":true} \n2021-02-10 02:31:45.605  INFO 2156 --- [pool-1-thread-1] o.d.s.client.common.utils.RegisterUtils  : sofa client register success: {"appName":"sofa","contextPath":"/sofa","path":"/sofa/findById","pathDesc":"Find by Id","rpcType":"sofa","serviceName":"org.dromara.shenyu.examples.sofa.api.service.SofaSingleParamService","methodName":"findById","ruleName":"/sofa/findById","parameterTypes":"java.lang.String","rpcExt":"{\\"loadbalance\\":\\"hash\\",\\"retries\\":3,\\"timeout\\":-1}","enabled":true} \n2021-02-10 02:31:45.611  INFO 2156 --- [pool-1-thread-1] o.d.s.client.common.utils.RegisterUtils  : sofa client register success: {"appName":"sofa","contextPath":"/sofa","path":"/sofa/findAll","pathDesc":"Get all data","rpcType":"sofa","serviceName":"org.dromara.shenyu.examples.sofa.api.service.SofaSingleParamService","methodName":"findAll","ruleName":"/sofa/findAll","parameterTypes":"","rpcExt":"{\\"loadbalance\\":\\"hash\\",\\"retries\\":3,\\"timeout\\":-1}","enabled":true} \n2021-02-10 02:31:45.616  INFO 2156 --- [pool-1-thread-1] o.d.s.client.common.utils.RegisterUtils  : sofa client register success: {"appName":"sofa","contextPath":"/sofa","path":"/sofa/batchSaveNameAndId","pathDesc":"","rpcType":"sofa","serviceName":"org.dromara.shenyu.examples.sofa.api.service.SofaMultiParamService","methodName":"batchSaveNameAndId","ruleName":"/sofa/batchSaveNameAndId","parameterTypes":"java.util.List,java.lang.String,java.lang.String#org.dromara.shenyu.examples.sofa.api.entity.SofaSimpleTypeBean","rpcExt":"{\\"loadbalance\\":\\"hash\\",\\"retries\\":3,\\"timeout\\":-1}","enabled":true} \n2021-02-10 02:31:45.621  INFO 2156 --- [pool-1-thread-1] o.d.s.client.common.utils.RegisterUtils  : sofa client register success: {"appName":"sofa","contextPath":"/sofa","path":"/sofa/saveComplexBeanAndName","pathDesc":"","rpcType":"sofa","serviceName":"org.dromara.shenyu.examples.sofa.api.service.SofaMultiParamService","methodName":"saveComplexBeanAndName","ruleName":"/sofa/saveComplexBeanAndName","parameterTypes":"org.dromara.shenyu.examples.sofa.api.entity.SofaComplexTypeBean,java.lang.String","rpcExt":"{\\"loadbalance\\":\\"hash\\",\\"retries\\":3,\\"timeout\\":-1}","enabled":true} \n2021-02-10 02:31:45.627  INFO 2156 --- [pool-1-thread-1] o.d.s.client.common.utils.RegisterUtils  : sofa client register success: {"appName":"sofa","contextPath":"/sofa","path":"/sofa/findByArrayIdsAndName","pathDesc":"","rpcType":"sofa","serviceName":"org.dromara.shenyu.examples.sofa.api.service.SofaMultiParamService","methodName":"findByArrayIdsAndName","ruleName":"/sofa/findByArrayIdsAndName","parameterTypes":"[Ljava.lang.Integer;,java.lang.String","rpcExt":"{\\"loadbalance\\":\\"hash\\",\\"retries\\":3,\\"timeout\\":-1}","enabled":true} \n2021-02-10 02:31:45.632  INFO 2156 --- [pool-1-thread-1] o.d.s.client.common.utils.RegisterUtils  : sofa client register success: {"appName":"sofa","contextPath":"/sofa","path":"/sofa/findByStringArray","pathDesc":"","rpcType":"sofa","serviceName":"org.dromara.shenyu.examples.sofa.api.service.SofaMultiParamService","methodName":"findByStringArray","ruleName":"/sofa/findByStringArray","parameterTypes":"[Ljava.lang.String;","rpcExt":"{\\"loadbalance\\":\\"hash\\",\\"retries\\":3,\\"timeout\\":-1}","enabled":true} \n2021-02-10 02:31:45.637  INFO 2156 --- [pool-1-thread-1] o.d.s.client.common.utils.RegisterUtils  : sofa client register success: {"appName":"sofa","contextPath":"/sofa","path":"/sofa/saveTwoList","pathDesc":"","rpcType":"sofa","serviceName":"org.dromara.shenyu.examples.sofa.api.service.SofaMultiParamService","methodName":"saveTwoList","ruleName":"/sofa/saveTwoList","parameterTypes":"java.util.List,java.util.Map#org.dromara.shenyu.examples.sofa.api.entity.SofaComplexTypeBean","rpcExt":"{\\"loadbalance\\":\\"hash\\",\\"retries\\":3,\\"timeout\\":-1}","enabled":true} \n2021-02-10 02:31:45.642  INFO 2156 --- [pool-1-thread-1] o.d.s.client.common.utils.RegisterUtils  : sofa client register success: {"appName":"sofa","contextPath":"/sofa","path":"/sofa/batchSave","pathDesc":"","rpcType":"sofa","serviceName":"org.dromara.shenyu.examples.sofa.api.service.SofaMultiParamService","methodName":"batchSave","ruleName":"/sofa/batchSave","parameterTypes":"java.util.List#org.dromara.shenyu.examples.sofa.api.entity.SofaSimpleTypeBean","rpcExt":"{\\"loadbalance\\":\\"hash\\",\\"retries\\":3,\\"timeout\\":-1}","enabled":true} \n2021-02-10 02:31:45.647  INFO 2156 --- [pool-1-thread-1] o.d.s.client.common.utils.RegisterUtils  : sofa client register success: {"appName":"sofa","contextPath":"/sofa","path":"/sofa/findByListId","pathDesc":"","rpcType":"sofa","serviceName":"org.dromara.shenyu.examples.sofa.api.service.SofaMultiParamService","methodName":"findByListId","ruleName":"/sofa/findByListId","parameterTypes":"java.util.List","rpcExt":"{\\"loadbalance\\":\\"hash\\",\\"retries\\":3,\\"timeout\\":-1}","enabled":true} \n2021-02-10 02:31:45.653  INFO 2156 --- [pool-1-thread-1] o.d.s.client.common.utils.RegisterUtils  : sofa client register success: {"appName":"sofa","contextPath":"/sofa","path":"/sofa/saveComplexBean","pathDesc":"","rpcType":"sofa","serviceName":"org.dromara.shenyu.examples.sofa.api.service.SofaMultiParamService","methodName":"saveComplexBean","ruleName":"/sofa/saveComplexBean","parameterTypes":"org.dromara.shenyu.examples.sofa.api.entity.SofaComplexTypeBean","rpcExt":"{\\"loadbalance\\":\\"hash\\",\\"retries\\":3,\\"timeout\\":-1}","enabled":true} \n2021-02-10 02:31:45.660  INFO 2156 --- [pool-1-thread-1] o.d.s.client.common.utils.RegisterUtils  : sofa client register success: {"appName":"sofa","contextPath":"/sofa","path":"/sofa/findByIdsAndName","pathDesc":"","rpcType":"sofa","serviceName":"org.dromara.shenyu.examples.sofa.api.service.SofaMultiParamService","methodName":"findByIdsAndName","ruleName":"/sofa/findByIdsAndName","parameterTypes":"java.util.List,java.lang.String","rpcExt":"{\\"loadbalance\\":\\"hash\\",\\"retries\\":3,\\"timeout\\":-1}","enabled":true} \n2021-02-10 02:31:46.055  INFO 2156 --- [           main] o.a.c.f.imps.CuratorFrameworkImpl        : Starting\n2021-02-10 02:31:46.059  INFO 2156 --- [           main] org.apache.zookeeper.ZooKeeper           : Client environment:zookeeper.version=3.4.6-1569965, built on 02/20/2014 09:09 GMT\n2021-02-10 02:31:46.059  INFO 2156 --- [           main] org.apache.zookeeper.ZooKeeper           : Client environment:host.name=host.docker.internal\n2021-02-10 02:31:46.059  INFO 2156 --- [           main] org.apache.zookeeper.ZooKeeper           : Client environment:java.version=1.8.0_211\n2021-02-10 02:31:46.059  INFO 2156 --- [           main] org.apache.zookeeper.ZooKeeper           : Client environment:java.vendor=Oracle Corporation\n2021-02-10 02:31:46.059  INFO 2156 --- [           main] org.apache.zookeeper.ZooKeeper           : Client environment:java.home=C:\\Program Files\\Java\\jdk1.8.0_211\\jre\n2021-02-10 02:31:46.059  INFO 2156 --- [           main] org.apache.zookeeper.ZooKeeper           : Client environment:java.class.path=C:\\Program Files\\Java\\jdk1.8.0_211\\jre\\lib\\charsets.jar;C:\\Program Files\\Java\\jdk1.8.0_211\\jre\\lib\\deploy.jar;C:\\Program Files\\Java\\jdk1.8.0_211\\jre\\lib\\ext\\access-bridge-64.jar;C:\\Program Files\\Java\\jdk1.8.0_211\\jre\\lib\\ext\\cldrdata.jar;C:\\Program Files\\Java\\jdk1.8.0_211\\jre\\lib\\ext\\dnsns.jar;C:\\Program Files\\Java\\jdk1.8.0_211\\jre\\lib\\ext\\jaccess.jar;C:\\Program Files\\Java\\jdk1.8.0_211\\jre\\lib\\ext\\jfxrt.jar;C:\\Program Files\\Java\\jdk1.8.0_211\\jre\\lib\\ext\\localedata.jar;C:\\Program Files\\Java\\jdk1.8.0_211\\jre\\lib\\ext\\nashorn.jar;C:\\Program Files\\Java\\jdk1.8.0_211\\jre\\lib\\ext\\sunec.jar;C:\\Program Files\\Java\\jdk1.8.0_211\\jre\\lib\\ext\\sunjce_provider.jar;C:\\Program Files\\Java\\jdk1.8.0_211\\jre\\lib\\ext\\sunmscapi.jar;C:\\Program Files\\Java\\jdk1.8.0_211\\jre\\lib\\ext\\sunpkcs11.jar;C:\\Program Files\\Java\\jdk1.8.0_211\\jre\\lib\\ext\\zipfs.jar;C:\\Program Files\\Java\\jdk1.8.0_211\\jre\\lib\\javaws.jar;C:\\Program Files\\Java\\jdk1.8.0_211\\jre\\lib\\jce.jar;C:\\Program Files\\Java\\jdk1.8.0_211\\jre\\lib\\jfr.jar;C:\\Program Files\\Java\\jdk1.8.0_211\\jre\\lib\\jfxswt.jar;C:\\Program Files\\Java\\jdk1.8.0_211\\jre\\lib\\jsse.jar;C:\\Program Files\\Java\\jdk1.8.0_211\\jre\\lib\\management-agent.jar;C:\\Program Files\\Java\\jdk1.8.0_211\\jre\\lib\\plugin.jar;C:\\Program Files\\Java\\jdk1.8.0_211\\jre\\lib\\resources.jar;C:\\Program Files\\Java\\jdk1.8.0_211\\jre\\lib\\rt.jar;D:\\X\\dlm_github\\shenyu\\shenyu-examples\\shenyu-examples-sofa\\shenyu-examples-sofa-service\\target\\classes;D:\\SOFT\\m2\\repository\\com\\alipay\\sofa\\rpc-sofa-boot-starter\\6.0.4\\rpc-sofa-boot-starter-6.0.4.jar;D:\\SOFT\\m2\\repository\\com\\alipay\\sofa\\rpc-sofa-boot-core\\6.0.4\\rpc-sofa-boot-core-6.0.4.jar;D:\\SOFT\\m2\\repository\\com\\alipay\\sofa\\sofa-rpc-all\\5.5.7\\sofa-rpc-all-5.5.7.jar;D:\\SOFT\\m2\\repository\\com\\alipay\\sofa\\bolt\\1.4.6\\bolt-1.4.6.jar;D:\\SOFT\\m2\\repository\\org\\javassist\\javassist\\3.20.0-GA\\javassist-3.20.0-GA.jar;D:\\SOFT\\m2\\repository\\io\\netty\\netty-all\\4.1.43.Final\\netty-all-4.1.43.Final.jar;D:\\SOFT\\m2\\repository\\com\\alipay\\sofa\\hessian\\3.3.6\\hessian-3.3.6.jar;D:\\SOFT\\m2\\repository\\com\\alipay\\sofa\\tracer-core\\2.1.2\\tracer-core-2.1.2.jar;D:\\SOFT\\m2\\repository\\io\\opentracing\\opentracing-api\\0.22.0\\opentracing-api-0.22.0.jar;D:\\SOFT\\m2\\repository\\io\\opentracing\\opentracing-noop\\0.22.0\\opentracing-noop-0.22.0.jar;D:\\SOFT\\m2\\repository\\io\\opentracing\\opentracing-mock\\0.22.0\\opentracing-mock-0.22.0.jar;D:\\SOFT\\m2\\repository\\io\\opentracing\\opentracing-util\\0.22.0\\opentracing-util-0.22.0.jar;D:\\SOFT\\m2\\repository\\com\\alipay\\sofa\\lookout\\lookout-api\\1.4.1\\lookout-api-1.4.1.jar;D:\\SOFT\\m2\\repository\\com\\alipay\\sofa\\runtime-sofa-boot-starter\\3.1.4\\runtime-sofa-boot-starter-3.1.4.jar;D:\\SOFT\\m2\\repository\\org\\apache\\curator\\curator-client\\2.9.1\\curator-client-2.9.1.jar;D:\\SOFT\\m2\\repository\\org\\apache\\zookeeper\\zookeeper\\3.4.6\\zookeeper-3.4.6.jar;D:\\SOFT\\m2\\repository\\log4j\\log4j\\1.2.16\\log4j-1.2.16.jar;D:\\SOFT\\m2\\repository\\jline\\jline\\0.9.94\\jline-0.9.94.jar;D:\\SOFT\\m2\\repository\\io\\netty\\netty\\3.7.0.Final\\netty-3.7.0.Final.jar;D:\\SOFT\\m2\\repository\\com\\google\\guava\\guava\\16.0.1\\guava-16.0.1.jar;D:\\SOFT\\m2\\repository\\org\\apache\\curator\\curator-framework\\2.9.1\\curator-framework-2.9.1.jar;D:\\SOFT\\m2\\repository\\org\\apache\\curator\\curator-recipes\\2.9.1\\curator-recipes-2.9.1.jar;D:\\SOFT\\m2\\repository\\org\\jboss\\resteasy\\resteasy-jaxrs\\3.0.12.Final\\resteasy-jaxrs-3.0.12.Final.jar;D:\\SOFT\\m2\\repository\\org\\jboss\\spec\\javax\\annotation\\jboss-annotations-api_1.1_spec\\1.0.1.Final\\jboss-annotations-api_1.1_spec-1.0.1.Final.jar;D:\\SOFT\\m2\\repository\\javax\\activation\\activation\\1.1.1\\activation-1.1.1.jar;D:\\SOFT\\m2\\repository\\org\\apache\\httpcomponents\\httpclient\\4.5.10\\httpclient-4.5.10.jar;D:\\SOFT\\m2\\repository\\org\\apache\\httpcomponents\\httpcore\\4.4.12\\httpcore-4.4.12.jar;D:\\SOFT\\m2\\repository\\commons-io\\commons-io\\2.1\\commons-io-2.1.jar;D:\\SOFT\\m2\\repository\\net\\jcip\\jcip-annotations\\1.0\\jcip-annotations-1.0.jar;D:\\SOFT\\m2\\repository\\org\\jboss\\resteasy\\resteasy-client\\3.0.12.Final\\resteasy-client-3.0.12.Final.jar;D:\\SOFT\\m2\\repository\\org\\jboss\\resteasy\\resteasy-jackson-provider\\3.0.12.Final\\resteasy-jackson-provider-3.0.12.Final.jar;D:\\SOFT\\m2\\repository\\org\\codehaus\\jackson\\jackson-core-asl\\1.9.12\\jackson-core-asl-1.9.12.jar;D:\\SOFT\\m2\\repository\\org\\codehaus\\jackson\\jackson-mapper-asl\\1.9.12\\jackson-mapper-asl-1.9.12.jar;D:\\SOFT\\m2\\repository\\org\\codehaus\\jackson\\jackson-jaxrs\\1.9.12\\jackson-jaxrs-1.9.12.jar;D:\\SOFT\\m2\\repository\\org\\codehaus\\jackson\\jackson-xc\\1.9.12\\jackson-xc-1.9.12.jar;D:\\SOFT\\m2\\repository\\org\\jboss\\resteasy\\resteasy-netty4\\3.0.12.Final\\resteasy-netty4-3.0.12.Final.jar;D:\\SOFT\\m2\\repository\\org\\jboss\\resteasy\\resteasy-validator-provider-11\\3.0.12.Final\\resteasy-validator-provider-11-3.0.12.Final.jar;D:\\SOFT\\m2\\repository\\com\\fasterxml\\classmate\\1.5.1\\classmate-1.5.1.jar;D:\\SOFT\\m2\\repository\\org\\jboss\\resteasy\\jaxrs-api\\3.0.12.Final\\jaxrs-api-3.0.12.Final.jar;D:\\SOFT\\m2\\repository\\org\\jboss\\resteasy\\resteasy-multipart-provider\\3.0.12.Final\\resteasy-multipart-provider-3.0.12.Final.jar;D:\\SOFT\\m2\\repository\\org\\jboss\\resteasy\\resteasy-jaxb-provider\\3.0.12.Final\\resteasy-jaxb-provider-3.0.12.Final.jar;D:\\SOFT\\m2\\repository\\com\\sun\\xml\\bind\\jaxb-impl\\2.2.7\\jaxb-impl-2.2.7.jar;D:\\SOFT\\m2\\repository\\com\\sun\\xml\\bind\\jaxb-core\\2.2.7\\jaxb-core-2.2.7.jar;D:\\SOFT\\m2\\repository\\javax\\xml\\bind\\jaxb-api\\2.3.1\\jaxb-api-2.3.1.jar;D:\\SOFT\\m2\\repository\\javax\\activation\\javax.activation-api\\1.2.0\\javax.activation-api-1.2.0.jar;D:\\SOFT\\m2\\repository\\com\\sun\\istack\\istack-commons-runtime\\2.16\\istack-commons-runtime-2.16.jar;D:\\SOFT\\m2\\repository\\com\\sun\\xml\\fastinfoset\\FastInfoset\\1.2.12\\FastInfoset-1.2.12.jar;D:\\SOFT\\m2\\repository\\javax\\xml\\bind\\jsr173_api\\1.0\\jsr173_api-1.0.jar;D:\\SOFT\\m2\\repository\\javax\\mail\\mail\\1.5.0-b01\\mail-1.5.0-b01.jar;D:\\SOFT\\m2\\repository\\org\\apache\\james\\apache-mime4j\\0.6\\apache-mime4j-0.6.jar;D:\\SOFT\\m2\\repository\\commons-logging\\commons-logging\\1.1.1\\commons-logging-1.1.1.jar;D:\\SOFT\\m2\\repository\\com\\alibaba\\dubbo\\2.4.10\\dubbo-2.4.10.jar;D:\\SOFT\\m2\\repository\\org\\jboss\\netty\\netty\\3.2.5.Final\\netty-3.2.5.Final.jar;D:\\SOFT\\m2\\repository\\com\\101tec\\zkclient\\0.10\\zkclient-0.10.jar;D:\\SOFT\\m2\\repository\\com\\alibaba\\nacos\\nacos-api\\1.0.0\\nacos-api-1.0.0.jar;D:\\SOFT\\m2\\repository\\com\\alibaba\\fastjson\\1.2.47\\fastjson-1.2.47.jar;D:\\SOFT\\m2\\repository\\org\\apache\\commons\\commons-lang3\\3.9\\commons-lang3-3.9.jar;D:\\SOFT\\m2\\repository\\com\\alibaba\\nacos\\nacos-client\\1.0.0\\nacos-client-1.0.0.jar;D:\\SOFT\\m2\\repository\\com\\alibaba\\nacos\\nacos-common\\1.0.0\\nacos-common-1.0.0.jar;D:\\SOFT\\m2\\repository\\commons-codec\\commons-codec\\1.13\\commons-codec-1.13.jar;D:\\SOFT\\m2\\repository\\com\\fasterxml\\jackson\\core\\jackson-core\\2.10.1\\jackson-core-2.10.1.jar;D:\\SOFT\\m2\\repository\\com\\fasterxml\\jackson\\core\\jackson-databind\\2.10.1\\jackson-databind-2.10.1.jar;D:\\SOFT\\m2\\repository\\com\\fasterxml\\jackson\\core\\jackson-annotations\\2.10.1\\jackson-annotations-2.10.1.jar;D:\\SOFT\\m2\\repository\\io\\prometheus\\simpleclient\\0.5.0\\simpleclient-0.5.0.jar;D:\\SOFT\\m2\\repository\\org\\springframework\\spring-beans\\5.2.2.RELEASE\\spring-beans-5.2.2.RELEASE.jar;D:\\SOFT\\m2\\repository\\org\\springframework\\spring-core\\5.2.2.RELEASE\\spring-core-5.2.2.RELEASE.jar;D:\\SOFT\\m2\\repository\\org\\springframework\\spring-jcl\\5.2.2.RELEASE\\spring-jcl-5.2.2.RELEASE.jar;D:\\SOFT\\m2\\repository\\com\\alipay\\sofa\\infra-sofa-boot-starter\\3.1.4\\infra-sofa-boot-starter-3.1.4.jar;D:\\SOFT\\m2\\repository\\com\\alipay\\sofa\\common\\log-sofa-boot-starter\\1.0.18\\log-sofa-boot-starter-1.0.18.jar;D:\\SOFT\\m2\\repository\\org\\springframework\\spring-context\\5.2.2.RELEASE\\spring-context-5.2.2.RELEASE.jar;D:\\SOFT\\m2\\repository\\org\\springframework\\spring-aop\\5.2.2.RELEASE\\spring-aop-5.2.2.RELEASE.jar;D:\\SOFT\\m2\\repository\\org\\springframework\\spring-expression\\5.2.2.RELEASE\\spring-expression-5.2.2.RELEASE.jar;D:\\SOFT\\m2\\repository\\com\\alipay\\sofa\\common\\sofa-common-tools\\1.0.18\\sofa-common-tools-1.0.18.jar;D:\\SOFT\\m2\\repository\\org\\springframework\\boot\\spring-boot-starter-validation\\2.2.2.RELEASE\\spring-boot-starter-validation-2.2.2.RELEASE.jar;D:\\SOFT\\m2\\repository\\jakarta\\validation\\jakarta.validation-api\\2.0.1\\jakarta.validation-api-2.0.1.jar;D:\\SOFT\\m2\\repository\\org\\hibernate\\validator\\hibernate-validator\\6.0.18.Final\\hibernate-validator-6.0.18.Final.jar;D:\\SOFT\\m2\\repository\\org\\jboss\\logging\\jboss-logging\\3.4.1.Final\\jboss-logging-3.4.1.Final.jar;D:\\SOFT\\m2\\repository\\org\\apache\\tomcat\\embed\\tomcat-embed-el\\9.0.29\\tomcat-embed-el-9.0.29.jar;D:\\SOFT\\m2\\repository\\org\\springframework\\boot\\spring-boot-autoconfigure\\2.2.2.RELEASE\\spring-boot-autoconfigure-2.2.2.RELEASE.jar;D:\\SOFT\\m2\\repository\\org\\springframework\\boot\\spring-boot\\2.2.2.RELEASE\\spring-boot-2.2.2.RELEASE.jar;D:\\X\\dlm_github\\shenyu\\shenyu-examples\\shenyu-examples-sofa\\shenyu-examples-sofa-api\\target\\classes;D:\\SOFT\\m2\\repository\\org\\projectlombok\\lombok\\1.18.10\\lombok-1.18.10.jar;D:\\X\\dlm_github\\shenyu\\shenyu-spring-boot-starter\\shenyu-spring-boot-starter-client\\shenyu-spring-boot-starter-client-sofa\\target\\classes;D:\\SOFT\\m2\\repository\\org\\springframework\\boot\\spring-boot-starter\\2.2.2.RELEASE\\spring-boot-starter-2.2.2.RELEASE.jar;D:\\SOFT\\m2\\repository\\org\\springframework\\boot\\spring-boot-starter-logging\\2.2.2.RELEASE\\spring-boot-starter-logging-2.2.2.RELEASE.jar;D:\\SOFT\\m2\\repository\\ch\\qos\\logback\\logback-classic\\1.2.3\\logback-classic-1.2.3.jar;D:\\SOFT\\m2\\repository\\ch\\qos\\logback\\logback-core\\1.2.3\\logback-core-1.2.3.jar;D:\\SOFT\\m2\\repository\\org\\apache\\logging\\log4j\\log4j-to-slf4j\\2.12.1\\log4j-to-slf4j-2.12.1.jar;D:\\SOFT\\m2\\repository\\org\\apache\\logging\\log4j\\log4j-api\\2.12.1\\log4j-api-2.12.1.jar;D:\\SOFT\\m2\\repository\\org\\slf4j\\jul-to-slf4j\\1.7.29\\jul-to-slf4j-1.7.29.jar;D:\\SOFT\\m2\\repository\\jakarta\\annotation\\jakarta.annotation-api\\1.3.5\\jakarta.annotation-api-1.3.5.jar;D:\\SOFT\\m2\\repository\\org\\yaml\\snakeyaml\\1.25\\snakeyaml-1.25.jar;D:\\X\\dlm_github\\shenyu\\shenyu-client\\shenyu-client-sofa\\target\\classes;D:\\X\\dlm_github\\shenyu\\shenyu-client\\shenyu-client-common\\target\\classes;D:\\X\\dlm_github\\shenyu\\shenyu-common\\target\\classes;D:\\SOFT\\m2\\repository\\org\\springframework\\boot\\spring-boot-starter-json\\2.2.2.RELEASE\\spring-boot-starter-json-2.2.2.RELEASE.jar;D:\\SOFT\\m2\\repository\\org\\springframework\\spring-web\\5.2.2.RELEASE\\spring-web-5.2.2.RELEASE.jar;D:\\SOFT\\m2\\repository\\com\\fasterxml\\jackson\\datatype\\jackson-datatype-jdk8\\2.10.1\\jackson-datatype-jdk8-2.10.1.jar;D:\\SOFT\\m2\\repository\\com\\fasterxml\\jackson\\datatype\\jackson-datatype-jsr310\\2.10.1\\jackson-datatype-jsr310-2.10.1.jar;D:\\SOFT\\m2\\repository\\com\\fasterxml\\jackson\\module\\jackson-module-parameter-names\\2.10.1\\jackson-module-parameter-names-2.10.1.jar;D:\\SOFT\\m2\\repository\\com\\squareup\\okhttp3\\okhttp\\3.14.4\\okhttp-3.14.4.jar;D:\\SOFT\\m2\\repository\\com\\squareup\\okio\\okio\\1.17.2\\okio-1.17.2.jar;D:\\SOFT\\m2\\repository\\com\\google\\code\\gson\\gson\\2.8.6\\gson-2.8.6.jar;D:\\SOFT\\m2\\repository\\org\\slf4j\\slf4j-api\\1.7.29\\slf4j-api-1.7.29.jar;D:\\SOFT\\m2\\repository\\org\\slf4j\\jcl-over-slf4j\\1.7.29\\jcl-over-slf4j-1.7.29.jar;C:\\Program Files\\JetBrains\\IntelliJ IDEA 2019.3.3\\lib\\idea_rt.jar\n2021-02-10 02:31:46.060  INFO 2156 --- [           main] org.apache.zookeeper.ZooKeeper           : Client environment:java.library.path=C:\\Program Files\\Java\\jdk1.8.0_211\\bin;C:\\Windows\\Sun\\Java\\bin;C:\\Windows\\system32;C:\\Windows;C:\\Program Files\\Common Files\\Oracle\\Java\\javapath;C:\\ProgramData\\Oracle\\Java\\javapath;C:\\Program Files (x86)\\Common Files\\Oracle\\Java\\javapath;C:\\Windows\\system32;C:\\Windows;C:\\Windows\\System32\\Wbem;C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\;C:\\Windows\\System32\\OpenSSH\\;C:\\Program Files\\Java\\jdk1.8.0_211\\bin;C:\\Program Files\\Java\\jdk1.8.0_211\\jre\\bin;D:\\SOFT\\apache-maven-3.5.0\\bin;C:\\Program Files\\Go\\bin;C:\\Program Files\\nodejs\\;C:\\Program Files\\Python\\Python38\\;C:\\Program Files\\OpenSSL-Win64\\bin;C:\\Program Files\\Git\\bin;D:\\SOFT\\protobuf-2.5.0\\src;D:\\SOFT\\zlib-1.2.8;c:\\Program Files (x86)\\Microsoft SQL Server\\100\\Tools\\Binn\\;c:\\Program Files\\Microsoft SQL Server\\100\\Tools\\Binn\\;c:\\Program Files\\Microsoft SQL Server\\100\\DTS\\Binn\\;C:\\Program Files\\Docker\\Docker\\resources\\bin;C:\\ProgramData\\DockerDesktop\\version-bin;D:\\SOFT\\gradle-6.0-all\\gradle-6.0\\bin;C:\\Program Files\\mingw-w64\\x86_64-8.1.0-posix-seh-rt_v6-rev0\\mingw64\\bin;D:\\SOFT\\hugo_extended_0.55.5_Windows-64bit;C:\\Users\\DLM\\AppData\\Local\\Microsoft\\WindowsApps;C:\\Users\\DLM\\go\\bin;C:\\Users\\DLM\\AppData\\Roaming\\npm;;C:\\Program Files\\Microsoft VS Code\\bin;C:\\Program Files\\nimbella-cli\\bin;.\n2021-02-10 02:31:46.060  INFO 2156 --- [           main] org.apache.zookeeper.ZooKeeper           : Client environment:java.io.tmpdir=C:\\Users\\DLM\\AppData\\Local\\Temp\\\n2021-02-10 02:31:46.060  INFO 2156 --- [           main] org.apache.zookeeper.ZooKeeper           : Client environment:java.compiler=<NA>\n2021-02-10 02:31:46.060  INFO 2156 --- [           main] org.apache.zookeeper.ZooKeeper           : Client environment:os.name=Windows 10\n2021-02-10 02:31:46.060  INFO 2156 --- [           main] org.apache.zookeeper.ZooKeeper           : Client environment:os.arch=amd64\n2021-02-10 02:31:46.060  INFO 2156 --- [           main] org.apache.zookeeper.ZooKeeper           : Client environment:os.version=10.0\n2021-02-10 02:31:46.060  INFO 2156 --- [           main] org.apache.zookeeper.ZooKeeper           : Client environment:user.name=DLM\n2021-02-10 02:31:46.060  INFO 2156 --- [           main] org.apache.zookeeper.ZooKeeper           : Client environment:user.home=C:\\Users\\DLM\n2021-02-10 02:31:46.060  INFO 2156 --- [           main] org.apache.zookeeper.ZooKeeper           : Client environment:user.dir=D:\\X\\dlm_github\\shenyu\n2021-02-10 02:31:46.061  INFO 2156 --- [           main] org.apache.zookeeper.ZooKeeper           : Initiating client connection, connectString=127.0.0.1:21810 sessionTimeout=60000 watcher=org.apache.curator.ConnectionState@3e850122\n2021-02-10 02:31:46.069  INFO 2156 --- [27.0.0.1:21810)] org.apache.zookeeper.ClientCnxn          : Opening socket connection to server 127.0.0.1/127.0.0.1:21810. Will not attempt to authenticate using SASL (unknown error)\n2021-02-10 02:31:46.071  INFO 2156 --- [27.0.0.1:21810)] org.apache.zookeeper.ClientCnxn          : Socket connection established to 127.0.0.1/127.0.0.1:21810, initiating session\n2021-02-10 02:31:46.078  INFO 2156 --- [27.0.0.1:21810)] org.apache.zookeeper.ClientCnxn          : Session establishment complete on server 127.0.0.1/127.0.0.1:21810, sessionid = 0x10005b0d05e0001, negotiated timeout = 40000\n2021-02-10 02:31:46.081  INFO 2156 --- [ain-EventThread] o.a.c.f.state.ConnectionStateManager     : State change: CONNECTED\n2021-02-10 02:31:46.093  WARN 2156 --- [           main] org.apache.curator.utils.ZKPaths         : The version of ZooKeeper being used doesn\'t support Container nodes. CreateMode.PERSISTENT will be used instead.\n2021-02-10 02:31:46.141  INFO 2156 --- [           main] o.d.s.e.s.service.TestSofaApplication    : Started TestSofaApplication in 3.41 seconds (JVM running for 4.423) \n')),(0,s.yg)("h2",{id:"\u6d4b\u8bd5"},"\u6d4b\u8bd5"),(0,s.yg)("p",null,(0,s.yg)("inlineCode",{parentName:"p"},"shenyu-examples-sofa"),"\u9879\u76ee\u6210\u529f\u542f\u52a8\u4e4b\u540e\u4f1a\u81ea\u52a8\u628a\u52a0 ",(0,s.yg)("inlineCode",{parentName:"p"},"@ShenyuSofaClient")," \u6ce8\u89e3\u7684\u63a5\u53e3\u65b9\u6cd5\u6ce8\u518c\u5230\u7f51\u5173\u3002"),(0,s.yg)("p",null,"\u6253\u5f00",(0,s.yg)("inlineCode",{parentName:"p"},"\u63d2\u4ef6\u5217\u8868 -> rpc proxy -> sofa"),"\u53ef\u4ee5\u770b\u5230\u63d2\u4ef6\u89c4\u5219\u914d\u7f6e\u5217\u8868\uff1a"),(0,s.yg)("p",null,(0,s.yg)("img",{src:r(60575).A})),(0,s.yg)("p",null,"\u4e0b\u9762\u4f7f\u7528",(0,s.yg)("inlineCode",{parentName:"p"},"postman"),"\u6a21\u62df",(0,s.yg)("inlineCode",{parentName:"p"},"http"),"\u7684\u65b9\u5f0f\u6765\u8bf7\u6c42\u4f60\u7684",(0,s.yg)("inlineCode",{parentName:"p"},"sofa"),"\u670d\u52a1\uff1a"),(0,s.yg)("p",null,(0,s.yg)("img",{src:r(75504).A})),(0,s.yg)("p",null,"\u590d\u6742\u591a\u53c2\u6570\u793a\u4f8b\uff1a\u5bf9\u5e94\u63a5\u53e3\u5b9e\u73b0\u7c7b\u4e3a",(0,s.yg)("inlineCode",{parentName:"p"},"org.apache.shenyu.examples.sofa.service.impl.SofaMultiParamServiceImpl#batchSaveNameAndId")),(0,s.yg)("pre",null,(0,s.yg)("code",{parentName:"pre",className:"language-java"},'@Override\n@ShenyuSofaClient(path = "/batchSaveNameAndId")\npublic SofaSimpleTypeBean batchSaveNameAndId(final List<SofaSimpleTypeBean> sofaTestList, final String id, final String name) {\n        SofaSimpleTypeBean simpleTypeBean = new SofaSimpleTypeBean();\n        simpleTypeBean.setId(id);\n        simpleTypeBean.setName("hello world shenyu sofa param batchSaveAndNameAndId :" + name + ":" + sofaTestList.stream().map(SofaSimpleTypeBean::getName).collect(Collectors.joining("-")));\n        return simpleTypeBean;\n        }\n')),(0,s.yg)("p",null,(0,s.yg)("img",{src:r(28768).A})))}c.isMDXComponent=!0},75504:(e,a,r)=>{r.d(a,{A:()=>o});const o=r.p+"assets/images/postman-findbyid-37cef6ac98fe1f4cbb95e83661a214bf.png"},28768:(e,a,r)=>{r.d(a,{A:()=>o});const o=r.p+"assets/images/postman-multiparams-d715abffdf058c90f303406306573056.png"},60575:(e,a,r)=>{r.d(a,{A:()=>o});const o=r.p+"assets/images/rule-list-8024764d442e91078a69d7618ed7753f.png"}}]);