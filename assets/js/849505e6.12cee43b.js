"use strict";(self.webpackChunkshenyu_website=self.webpackChunkshenyu_website||[]).push([[7305],{14588:(e,a,n)=>{n.r(a),n.d(a,{contentTitle:()=>i,default:()=>y,frontMatter:()=>o,metadata:()=>p,toc:()=>s});var r=n(58168),t=(n(96540),n(15680));const o={title:"Sofa Proxy",keywords:["Sofa"],description:"sofa access shenyu gateway"},i=void 0,p={unversionedId:"user-guide/proxy/sofa-rpc-proxy",id:"version-2.4.1/user-guide/proxy/sofa-rpc-proxy",isDocsHomePage:!1,title:"Sofa Proxy",description:"sofa access shenyu gateway",source:"@site/versioned_docs/version-2.4.1/user-guide/proxy/sofa-rpc-proxy.md",sourceDirName:"user-guide/proxy",slug:"/user-guide/proxy/sofa-rpc-proxy",permalink:"/docs/2.4.1/user-guide/proxy/sofa-rpc-proxy",editUrl:"https://github.com/apache/shenyu-website/edit/main/versioned_docs/version-2.4.1/user-guide/proxy/sofa-rpc-proxy.md",version:"2.4.1",frontMatter:{title:"Sofa Proxy",keywords:["Sofa"],description:"sofa access shenyu gateway"},sidebar:"version-2.4.1/tutorialSidebar",previous:{title:"Motan Proxy",permalink:"/docs/2.4.1/user-guide/proxy/motan-proxy"},next:{title:"Spring Cloud Proxy",permalink:"/docs/2.4.1/user-guide/proxy/spring-cloud-proxy"}},s=[{value:"Add sofa plugin in gateway",id:"add-sofa-plugin-in-gateway",children:[]},{value:"Plugin Settings",id:"plugin-settings",children:[]},{value:"Interface registered to the gateway",id:"interface-registered-to-the-gateway",children:[]},{value:"User request and parameter description",id:"user-request-and-parameter-description",children:[]}],l={toc:s},c="wrapper";function y(e){let{components:a,...n}=e;return(0,t.yg)(c,(0,r.A)({},l,n,{components:a,mdxType:"MDXLayout"}),(0,t.yg)("p",null,"This document is intended to help the ",(0,t.yg)("inlineCode",{parentName:"p"},"Sofa")," service access the ",(0,t.yg)("inlineCode",{parentName:"p"},"Apache ShenYu")," gateway. The ",(0,t.yg)("inlineCode",{parentName:"p"},"Apache ShenYu")," gateway uses the ",(0,t.yg)("inlineCode",{parentName:"p"},"Sofa")," plugin to handle ",(0,t.yg)("inlineCode",{parentName:"p"},"sofa")," service."),(0,t.yg)("p",null,"Before the connection, start ",(0,t.yg)("inlineCode",{parentName:"p"},"shenyu-admin")," correctly, start ",(0,t.yg)("inlineCode",{parentName:"p"},"Sofa")," plugin, and add related dependencies on the gateway and ",(0,t.yg)("inlineCode",{parentName:"p"},"Sofa")," application client. Refer to the previous ",(0,t.yg)("a",{parentName:"p",href:"../quick-start/quick-start-sofa"},"Quick start with Sofa")," ."),(0,t.yg)("p",null,"For details about client access configuration, see ",(0,t.yg)("a",{parentName:"p",href:"./register-center-access"},"Application Client Access Config")," ."),(0,t.yg)("p",null,"For details about data synchronization configurations, see ",(0,t.yg)("a",{parentName:"p",href:"./use-data-sync"},"Data Synchronization Config")," ."),(0,t.yg)("h2",{id:"add-sofa-plugin-in-gateway"},"Add sofa plugin in gateway"),(0,t.yg)("ul",null,(0,t.yg)("li",{parentName:"ul"},(0,t.yg)("p",{parentName:"li"},"Add the following dependencies in the gateway's ",(0,t.yg)("inlineCode",{parentName:"p"},"pom.xml")," file\uff1a")),(0,t.yg)("li",{parentName:"ul"},(0,t.yg)("p",{parentName:"li"},"Replace the sofa version with yours, and replace the jar package in the registry with yours, The following is a reference\u3002"),(0,t.yg)("pre",{parentName:"li"},(0,t.yg)("code",{parentName:"pre",className:"language-xml"},"\n       <dependency>\n           <groupId>com.alipay.sofa</groupId>\n           <artifactId>sofa-rpc-all</artifactId>\n           <version>5.7.6</version>\n           <exclusions>\n               <exclusion>\n                   <groupId>net.jcip</groupId>\n                   <artifactId>jcip-annotations</artifactId>\n               </exclusion>\n           </exclusions>\n       </dependency>\n       <dependency>\n           <groupId>org.apache.curator</groupId>\n           <artifactId>curator-client</artifactId>\n           <version>4.0.1</version>\n       </dependency>\n       <dependency>\n           <groupId>org.apache.curator</groupId>\n           <artifactId>curator-framework</artifactId>\n           <version>4.0.1</version>\n       </dependency>\n       <dependency>\n           <groupId>org.apache.curator</groupId>\n           <artifactId>curator-recipes</artifactId>\n           <version>4.0.1</version>\n       </dependency>\n       <dependency>\n           <groupId>org.apache.shenyu</groupId>\n           <artifactId>shenyu-spring-boot-starter-plugin-sofa</artifactId>\n           <version>${project.version}</version>\n       </dependency>\n")))),(0,t.yg)("pre",null,(0,t.yg)("code",{parentName:"pre"},"\n* Restart the gateway service.\n\n## Sofa service access gateway\n\nyou can refer to\uff1a[shenyu-examples-sofa](https://github.com/apache/shenyu/tree/v2.4.1/shenyu-examples/shenyu-examples-sofa)\n\n* SpringBoot\n\n  Add the following dependencies :\n\n ```xml\n        <dependency>\n            <groupId>org.apache.shenyu</groupId>\n            <artifactId>shenyu-spring-boot-starter-client-sofa</artifactId>\n            <version>${shenyu.version}</version>\n        </dependency>\n")),(0,t.yg)("ul",null,(0,t.yg)("li",{parentName:"ul"},(0,t.yg)("p",{parentName:"li"},"Spring"),(0,t.yg)("p",{parentName:"li"}," Add the following dependencies:"),(0,t.yg)("pre",{parentName:"li"},(0,t.yg)("code",{parentName:"pre",className:"language-xml"},"       <dependency>\n           <groupId>org.apache.shenyu</groupId>\n           <artifactId>shenyu-client-sofa</artifactId>\n           <version>${shenyu.version}</version>\n       </dependency>\n")))),(0,t.yg)("p",null,"Add the following in the xml file of your bean definition:"),(0,t.yg)("pre",null,(0,t.yg)("code",{parentName:"pre",className:"language-xml"},'      <bean id ="sofaServiceBeanPostProcessor" class ="org.apache.shenyu.client.sofa.SofaServiceBeanPostProcessor">\n           <constructor-arg  ref="shenyuRegisterCenterConfig"/>\n      </bean>\n\n   <bean id="shenyuRegisterCenterConfig" class="org.apache.shenyu.register.common.config.ShenyuRegisterCenterConfig">\n     <property name="registerType" value="http"/>\n     <property name="serverList" value="http://localhost:9095"/>\n     <property name="props">\n          <map>\n               <entry key="contextPath" value="/your contextPath"/>\n               <entry key="appName" value="your name"/>\n               <entry key="isFull" value="false"/>\n          </map>\n     </property>\n  </bean>\n')),(0,t.yg)("h2",{id:"plugin-settings"},"Plugin Settings"),(0,t.yg)("ul",null,(0,t.yg)("li",{parentName:"ul"},(0,t.yg)("p",{parentName:"li"},"First in the ",(0,t.yg)("inlineCode",{parentName:"p"},"shenyu-admin")," plugin management, set the ",(0,t.yg)("inlineCode",{parentName:"p"},"sofa")," plugin to open.")),(0,t.yg)("li",{parentName:"ul"},(0,t.yg)("p",{parentName:"li"},"Secondly, configure your registered address in the ",(0,t.yg)("inlineCode",{parentName:"p"},"sofa")," plugin, or the address of other registry."))),(0,t.yg)("pre",null,(0,t.yg)("code",{parentName:"pre",className:"language-yaml"},'{"protocol":"zookeeper","register":"127.0.0.1:2181"}\n')),(0,t.yg)("h2",{id:"interface-registered-to-the-gateway"},"Interface registered to the gateway"),(0,t.yg)("ul",null,(0,t.yg)("li",{parentName:"ul"},(0,t.yg)("p",{parentName:"li"},"For your sofa service implementation class, add ",(0,t.yg)("inlineCode",{parentName:"p"},"@ShenyuSofaClient")," annotation to the method\uff0cIndicates that the interface method is registered to the gateway.")),(0,t.yg)("li",{parentName:"ul"},(0,t.yg)("p",{parentName:"li"},"Start the sofa service provider, after successful registration, enter the pluginList -> rpc proxy -> sofa in the background management system, you will see the automatic registration of selectors and rules information."))),(0,t.yg)("h2",{id:"user-request-and-parameter-description"},"User request and parameter description"),(0,t.yg)("p",null,"ShenYu gateway needs to have a routing prefix, this routing prefix is for you to access the project for configuration ",(0,t.yg)("inlineCode",{parentName:"p"},"contextPath")," ."),(0,t.yg)("blockquote",null,(0,t.yg)("p",{parentName:"blockquote"},"For example, if you have an ",(0,t.yg)("inlineCode",{parentName:"p"},"order")," service, it has an interface and its registration path ",(0,t.yg)("inlineCode",{parentName:"p"},"/order/test/save")),(0,t.yg)("p",{parentName:"blockquote"},"Now it's to request the gateway via post\uff1a",(0,t.yg)("inlineCode",{parentName:"p"},"http://localhost:9195/order/test/save")),(0,t.yg)("p",{parentName:"blockquote"},"Where ",(0,t.yg)("inlineCode",{parentName:"p"},"localhost:9195")," is the IP port of the gateway, default port is ",(0,t.yg)("inlineCode",{parentName:"p"},"9195"),", ",(0,t.yg)("inlineCode",{parentName:"p"},"/order")," is the ",(0,t.yg)("inlineCode",{parentName:"p"},"contextPath")," of your sofa access gateway configuration")),(0,t.yg)("ul",null,(0,t.yg)("li",{parentName:"ul"},(0,t.yg)("p",{parentName:"li"},"Parameter passing\uff1a"),(0,t.yg)("ul",{parentName:"li"},(0,t.yg)("li",{parentName:"ul"},"Access the gateway through http post\uff0cand pass through body and json."),(0,t.yg)("li",{parentName:"ul"},"For more parameter type transfer, please refer to the interface definition in ",(0,t.yg)("a",{parentName:"li",href:"https://github.com/apache/shenyu/tree/v2.4.1/shenyu-examples/shenyu-examples-sofa"},"shenyu-examples-sofa")," and the parameter transfer method."))),(0,t.yg)("li",{parentName:"ul"},(0,t.yg)("p",{parentName:"li"},"Single java bean parameter type (default)")),(0,t.yg)("li",{parentName:"ul"},(0,t.yg)("p",{parentName:"li"},"Customize multi-parameter support:")),(0,t.yg)("li",{parentName:"ul"},(0,t.yg)("p",{parentName:"li"},"In the gateway project you built, add a new class ",(0,t.yg)("inlineCode",{parentName:"p"},"MySofaParamResolveService"),", implements ",(0,t.yg)("inlineCode",{parentName:"p"},"org.apache.shenyu.plugin.api.sofa.SofaParamResolveService")," ."),(0,t.yg)("pre",{parentName:"li"},(0,t.yg)("code",{parentName:"pre",className:"language-java"},"   public interface SofaParamResolveService {\n   \n       /**\n        * Build parameter pair.\n        * this is Resolve http body to get sofa param.\n        *\n        * @param body           the body\n        * @param parameterTypes the parameter types\n        * @return the pair\n        */\n       Pair<String[], Object[]> buildParameter(String body, String parameterTypes);\n   }\n"))),(0,t.yg)("li",{parentName:"ul"},(0,t.yg)("p",{parentName:"li"},(0,t.yg)("inlineCode",{parentName:"p"},"body")," is the json string passed by body in http.")),(0,t.yg)("li",{parentName:"ul"},(0,t.yg)("p",{parentName:"li"},(0,t.yg)("inlineCode",{parentName:"p"},"parameterTypes"),": list of matched method parameter types, If there are multiple, use ",(0,t.yg)("inlineCode",{parentName:"p"},",")," to separate.")),(0,t.yg)("li",{parentName:"ul"},(0,t.yg)("p",{parentName:"li"},"In Pair\uff0cleft is the parameter type\uff0cand right is the parameter value. This is the standard for sofa generalization calls.")),(0,t.yg)("li",{parentName:"ul"},(0,t.yg)("p",{parentName:"li"},"Register your class as a String bean and override the default implementation."),(0,t.yg)("pre",{parentName:"li"},(0,t.yg)("code",{parentName:"pre",className:"language-java"},"@Bean\npublic SofaParamResolveService mySofaParamResolveService() {\n   return new MySofaParamResolveService();\n}\n")))),(0,t.yg)("pre",null,(0,t.yg)("code",{parentName:"pre"},"")))}y.isMDXComponent=!0},15680:(e,a,n)=>{n.d(a,{xA:()=>c,yg:()=>d});var r=n(96540);function t(e,a,n){return a in e?Object.defineProperty(e,a,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[a]=n,e}function o(e,a){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);a&&(r=r.filter((function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var a=1;a<arguments.length;a++){var n=null!=arguments[a]?arguments[a]:{};a%2?o(Object(n),!0).forEach((function(a){t(e,a,n[a])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(n,a))}))}return e}function p(e,a){if(null==e)return{};var n,r,t=function(e,a){if(null==e)return{};var n,r,t={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],a.indexOf(n)>=0||(t[n]=e[n]);return t}(e,a);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],a.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(t[n]=e[n])}return t}var s=r.createContext({}),l=function(e){var a=r.useContext(s),n=a;return e&&(n="function"==typeof e?e(a):i(i({},a),e)),n},c=function(e){var a=l(e.components);return r.createElement(s.Provider,{value:a},e.children)},y="mdxType",g={inlineCode:"code",wrapper:function(e){var a=e.children;return r.createElement(r.Fragment,{},a)}},u=r.forwardRef((function(e,a){var n=e.components,t=e.mdxType,o=e.originalType,s=e.parentName,c=p(e,["components","mdxType","originalType","parentName"]),y=l(n),u=t,d=y["".concat(s,".").concat(u)]||y[u]||g[u]||o;return n?r.createElement(d,i(i({ref:a},c),{},{components:n})):r.createElement(d,i({ref:a},c))}));function d(e,a){var n=arguments,t=a&&a.mdxType;if("string"==typeof e||t){var o=n.length,i=new Array(o);i[0]=u;var p={};for(var s in a)hasOwnProperty.call(a,s)&&(p[s]=a[s]);p.originalType=e,p[y]="string"==typeof e?e:t,i[1]=p;for(var l=2;l<o;l++)i[l]=n[l];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}u.displayName="MDXCreateElement"}}]);