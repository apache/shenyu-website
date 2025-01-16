"use strict";(self.webpackChunkshenyu_website=self.webpackChunkshenyu_website||[]).push([[62076],{15680:(e,n,t)=>{t.d(n,{xA:()=>p,yg:()=>y});var r=t(96540);function i(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function a(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function o(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?a(Object(t),!0).forEach((function(n){i(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):a(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function s(e,n){if(null==e)return{};var t,r,i=function(e,n){if(null==e)return{};var t,r,i={},a=Object.keys(e);for(r=0;r<a.length;r++)t=a[r],n.indexOf(t)>=0||(i[t]=e[t]);return i}(e,n);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)t=a[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(i[t]=e[t])}return i}var l=r.createContext({}),c=function(e){var n=r.useContext(l),t=n;return e&&(t="function"==typeof e?e(n):o(o({},n),e)),t},p=function(e){var n=c(e.components);return r.createElement(l.Provider,{value:n},e.children)},u="mdxType",d={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},g=r.forwardRef((function(e,n){var t=e.components,i=e.mdxType,a=e.originalType,l=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),u=c(t),g=i,y=u["".concat(l,".").concat(g)]||u[g]||d[g]||a;return t?r.createElement(y,o(o({ref:n},p),{},{components:t})):r.createElement(y,o({ref:n},p))}));function y(e,n){var t=arguments,i=n&&n.mdxType;if("string"==typeof e||i){var a=t.length,o=new Array(a);o[0]=g;var s={};for(var l in n)hasOwnProperty.call(n,l)&&(s[l]=n[l]);s.originalType=e,s[u]="string"==typeof e?e:i,o[1]=s;for(var c=2;c<a;c++)o[c]=t[c];return r.createElement.apply(null,o)}return r.createElement.apply(null,t)}g.displayName="MDXCreateElement"},57288:(e,n,t)=>{t.r(n),t.d(n,{contentTitle:()=>o,default:()=>u,frontMatter:()=>a,metadata:()=>s,toc:()=>l});var r=t(58168),i=(t(96540),t(15680));const a={title:"Quick start with Spring Cloud",description:"Quick start with SpringCloud"},o=void 0,s={unversionedId:"quick-start/quick-start-springcloud",id:"version-2.7.0/quick-start/quick-start-springcloud",isDocsHomePage:!1,title:"Quick start with Spring Cloud",description:"Quick start with SpringCloud",source:"@site/versioned_docs/version-2.7.0/quick-start/quick-start-springcloud.md",sourceDirName:"quick-start",slug:"/quick-start/quick-start-springcloud",permalink:"/docs/quick-start/quick-start-springcloud",editUrl:"https://github.com/apache/shenyu-website/edit/main/versioned_docs/version-2.7.0/quick-start/quick-start-springcloud.md",version:"2.7.0",frontMatter:{title:"Quick start with Spring Cloud",description:"Quick start with SpringCloud"},sidebar:"version-2.7.0/tutorialSidebar",previous:{title:"Quick start with Sofa",permalink:"/docs/quick-start/quick-start-sofa"},next:{title:"Quick start with Tars",permalink:"/docs/quick-start/quick-start-tars"}},l=[{value:"Environment to prepare",id:"environment-to-prepare",children:[]},{value:"Configure the registration center related information on the admin side",id:"configure-the-registration-center-related-information-on-the-admin-side",children:[]},{value:"Run the shenyu-examples-springcloud project",id:"run-the-shenyu-examples-springcloud-project",children:[]},{value:"Test",id:"test",children:[]}],c={toc:l},p="wrapper";function u(e){let{components:n,...a}=e;return(0,i.yg)(p,(0,r.A)({},c,a,{components:n,mdxType:"MDXLayout"}),(0,i.yg)("p",null,"This document introduces how to quickly access the Apache ShenYu gateway using Spring Cloud. You can get the code example of this document by clicking ",(0,i.yg)("a",{parentName:"p",href:"https://github.com/apache/shenyu/tree/master/shenyu-examples/shenyu-examples-springcloud"},"here")," ."),(0,i.yg)("h2",{id:"environment-to-prepare"},"Environment to prepare"),(0,i.yg)("p",null,"Please refer to the deployment to select a way to start shenyu-admin. For example, start the Apache ShenYu gateway management system through ",(0,i.yg)("a",{parentName:"p",href:"../deployment/deployment-local"},"local deployment")," ."),(0,i.yg)("p",null,"After successful startup, you need to open the springCloud plugin on in the BasicConfig ",(0,i.yg)("inlineCode",{parentName:"p"},"->")," Plugin."),(0,i.yg)("img",{src:"/img/shenyu/quick-start/springcloud/springcloud_open_en.png",width:"60%",height:"50%"}),(0,i.yg)("p",null,"If you are a startup gateway by means of source, can be directly run the ShenyuBootstrapApplication of shenyu-bootstrap module."),(0,i.yg)("blockquote",null,(0,i.yg)("p",{parentName:"blockquote"},"Note: Before starting, make sure the gateway has added dependencies.")),(0,i.yg)("p",null,"Add the gateway proxy plugin for ",(0,i.yg)("inlineCode",{parentName:"p"},"Spring Cloud")," and add your registry center dependencies:"),(0,i.yg)("pre",null,(0,i.yg)("code",{parentName:"pre",className:"language-xml"},"\x3c!-- apache shenyu springCloud plugin start--\x3e\n               <dependency>\n                    <groupId>org.apache.shenyu</groupId>\n                    <artifactId>shenyu-spring-boot-starter-plugin-springcloud</artifactId>\n                    <version>${project.version}</version>\n                </dependency>\n\n                <dependency>\n                    <groupId>org.springframework.cloud</groupId>\n                    <artifactId>spring-cloud-commons</artifactId>\n                    <version>2.2.0.RELEASE</version>\n                </dependency>\n\n                <dependency>\n                    <groupId>org.apache.shenyu</groupId>\n                    <artifactId>shenyu-spring-boot-starter-plugin-httpclient</artifactId>\n                    <version>${project.version}</version>\n                </dependency>\n        \x3c!-- springCloud if you config register center is eureka please dependency end--\x3e\n                <dependency>\n                    <groupId>org.springframework.cloud</groupId>\n                    <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>\n                    <version>2.2.0.RELEASE</version>\n                </dependency>\n        \x3c!-- apache shenyu springCloud plugin end--\x3e\n")),(0,i.yg)("p",null,(0,i.yg)("inlineCode",{parentName:"p"},"eureka")," config information:"),(0,i.yg)("pre",null,(0,i.yg)("code",{parentName:"pre",className:"language-yml"},"eureka:\n  client:\n    serviceUrl:\n      defaultZone: http://localhost:8761/eureka/\n  instance:\n    prefer-ip-address: true\n")),(0,i.yg)("p",null,"Note: Please ensure that the spring Cloud registry service discovery configuration is enabled"),(0,i.yg)("ul",null,(0,i.yg)("li",{parentName:"ul"},"Configuration method")),(0,i.yg)("pre",null,(0,i.yg)("code",{parentName:"pre",className:"language-yml"},"spring:\n  cloud:\n    discovery:\n      enabled: true\n")),(0,i.yg)("ul",null,(0,i.yg)("li",{parentName:"ul"},"code method")),(0,i.yg)("pre",null,(0,i.yg)("code",{parentName:"pre",className:"language-java"},"@SpringBootApplication\n@EnableDiscoveryClient\npublic class ShenyuBootstrapApplication {\n    \n    /**\n     * Main Entrance.\n     *\n     * @param args startup arguments\n     */\n    public static void main(final String[] args) {\n        SpringApplication.run(ShenyuBootstrapApplication.class, args);\n    }\n}\n")),(0,i.yg)("p",null,"Restart the ",(0,i.yg)("inlineCode",{parentName:"p"},"shenyu-bootstrap")," project."),(0,i.yg)("h2",{id:"configure-the-registration-center-related-information-on-the-admin-side"},"Configure the registration center related information on the admin side"),(0,i.yg)("ul",null,(0,i.yg)("li",{parentName:"ul"},"Currently, the SpringCloudPlugin plugin on Shenyu implements support for service discovery of the registry center. However, it is not possible to dynamically switch the registry center. In order to allow users to use the plugin more clearly and switch the configuration of the registry center more conveniently, shenyu supports developers to configure and switch the registry center on the admin page, thereby reducing the user's usage cost and experience.")),(0,i.yg)("p",null,"Specific operation process:"),(0,i.yg)("ul",null,(0,i.yg)("li",{parentName:"ul"},"Start shenyu-admin"),(0,i.yg)("li",{parentName:"ul"},"Start shenyu-bootstrap"),(0,i.yg)("li",{parentName:"ul"},"Start the registry center, such as the eureka project under shenyu-examples"),(0,i.yg)("li",{parentName:"ul"},"Start shenyu-examples-springcloud under shenyu-examples"),(0,i.yg)("li",{parentName:"ul"},"Configure the relevant information of the registry center on the admin system interface and click Confirm")),(0,i.yg)("p",null,"Take the eureka registry center configuration as an example to show how to configure the relevant information of the registry center on the page:"),(0,i.yg)("img",{src:"/img/shenyu/quick-start/springcloud/springCloud-dynamic-register-operate-en.png",width:"60%",height:"50%"}),(0,i.yg)("p",null,"As shown in the figure above, registerType indicates the type of registration center, and the following registration centers are supported:"),(0,i.yg)("ul",null,(0,i.yg)("li",{parentName:"ul"},"eureka"),(0,i.yg)("li",{parentName:"ul"},"nacos"),(0,i.yg)("li",{parentName:"ul"},"zookeeper"),(0,i.yg)("li",{parentName:"ul"},"apollo"),(0,i.yg)("li",{parentName:"ul"},"consul"),(0,i.yg)("li",{parentName:"ul"},"etcd"),(0,i.yg)("li",{parentName:"ul"},"polaris"),(0,i.yg)("li",{parentName:"ul"},"kubernetes")),(0,i.yg)("p",null,"serverLists indicates the IP address of the registration center, and props is the additional configuration items for the registration center, such as namespace, username, etc. After clicking OK, eureka is used as the registration center of springCloudPlugin."),(0,i.yg)("h2",{id:"run-the-shenyu-examples-springcloud-project"},"Run the shenyu-examples-springcloud project"),(0,i.yg)("p",null,"In the example project we used ",(0,i.yg)("inlineCode",{parentName:"p"},"Eureka")," as the registry for ",(0,i.yg)("inlineCode",{parentName:"p"},"Spring Cloud"),". You can use the local ",(0,i.yg)("inlineCode",{parentName:"p"},"Eureka")," or the application provided in the example."),(0,i.yg)("p",null,"Download ",(0,i.yg)("a",{parentName:"p",href:"https://github.com/apache/shenyu/tree/master/shenyu-examples/shenyu-examples-eureka"},"shenyu-examples-eureka")," \u3001",(0,i.yg)("a",{parentName:"p",href:"https://github.com/apache/shenyu/tree/master/shenyu-examples/shenyu-examples-springcloud"},"shenyu-examples-springcloud")," ."),(0,i.yg)("p",null,"Startup the Eureka service:\nExecute the ",(0,i.yg)("inlineCode",{parentName:"p"},"org.apache.shenyu.examples.eureka.EurekaServerApplication")," main method to start project."),(0,i.yg)("p",null,"Startup the Spring Cloud service:\nExecute the ",(0,i.yg)("inlineCode",{parentName:"p"},"org.apache.shenyu.examples.springcloud.ShenyuTestSpringCloudApplication")," main method to start project."),(0,i.yg)("p",null,"Since ",(0,i.yg)("inlineCode",{parentName:"p"},"2.4.3"),", ",(0,i.yg)("inlineCode",{parentName:"p"},"shenyu.client.springCloud.props.port")," can be non-configured if you like."),(0,i.yg)("p",null,"The following log appears when the startup is successful:"),(0,i.yg)("pre",null,(0,i.yg)("code",{parentName:"pre",className:"language-shell"},'2021-02-10 14:03:51.301  INFO 2860 --- [           main] o.s.s.concurrent.ThreadPoolTaskExecutor  : Initializing ExecutorService \'applicationTaskExecutor\'\n2021-02-10 14:03:51.669  INFO 2860 --- [pool-1-thread-1] o.d.s.client.common.utils.RegisterUtils  : springCloud client register success: {"appName":"springCloud-test","context":"/springcloud","path":"/springcloud/order/save","pathDesc":"","rpcType":"springCloud","ruleName":"/springcloud/order/save","enabled":true} \n2021-02-10 14:03:51.676  INFO 2860 --- [pool-1-thread-1] o.d.s.client.common.utils.RegisterUtils  : springCloud client register success: {"appName":"springCloud-test","context":"/springcloud","path":"/springcloud/order/path/**","pathDesc":"","rpcType":"springCloud","ruleName":"/springcloud/order/path/**","enabled":true} \n2021-02-10 14:03:51.682  INFO 2860 --- [pool-1-thread-1] o.d.s.client.common.utils.RegisterUtils  : springCloud client register success: {"appName":"springCloud-test","context":"/springcloud","path":"/springcloud/order/findById","pathDesc":"","rpcType":"springCloud","ruleName":"/springcloud/order/findById","enabled":true} \n2021-02-10 14:03:51.688  INFO 2860 --- [pool-1-thread-1] o.d.s.client.common.utils.RegisterUtils  : springCloud client register success: {"appName":"springCloud-test","context":"/springcloud","path":"/springcloud/order/path/**/name","pathDesc":"","rpcType":"springCloud","ruleName":"/springcloud/order/path/**/name","enabled":true} \n2021-02-10 14:03:51.692  INFO 2860 --- [pool-1-thread-1] o.d.s.client.common.utils.RegisterUtils  : springCloud client register success: {"appName":"springCloud-test","context":"/springcloud","path":"/springcloud/test/**","pathDesc":"","rpcType":"springCloud","ruleName":"/springcloud/test/**","enabled":true} \n2021-02-10 14:03:52.806  WARN 2860 --- [           main] ockingLoadBalancerClientRibbonWarnLogger : You already have RibbonLoadBalancerClient on your classpath. It will be used by default. As Spring Cloud Ribbon is in maintenance mode. We recommend switching to BlockingLoadBalancerClient instead. In order to use it, set the value of `spring.cloud.loadbalancer.ribbon.enabled` to `false` or remove spring-cloud-starter-netflix-ribbon from your project.\n2021-02-10 14:03:52.848  WARN 2860 --- [           main] iguration$LoadBalancerCaffeineWarnLogger : Spring Cloud LoadBalancer is currently working with default default cache. You can switch to using Caffeine cache, by adding it to the classpath.\n2021-02-10 14:03:52.921  INFO 2860 --- [           main] o.s.c.n.eureka.InstanceInfoFactory       : Setting initial instance status as: STARTING\n2021-02-10 14:03:52.949  INFO 2860 --- [           main] com.netflix.discovery.DiscoveryClient    : Initializing Eureka in region us-east-1\n2021-02-10 14:03:53.006  INFO 2860 --- [           main] c.n.d.provider.DiscoveryJerseyProvider   : Using JSON encoding codec LegacyJacksonJson\n2021-02-10 14:03:53.006  INFO 2860 --- [           main] c.n.d.provider.DiscoveryJerseyProvider   : Using JSON decoding codec LegacyJacksonJson\n2021-02-10 14:03:53.110  INFO 2860 --- [           main] c.n.d.provider.DiscoveryJerseyProvider   : Using XML encoding codec XStreamXml\n2021-02-10 14:03:53.110  INFO 2860 --- [           main] c.n.d.provider.DiscoveryJerseyProvider   : Using XML decoding codec XStreamXml\n2021-02-10 14:03:53.263  INFO 2860 --- [           main] c.n.d.s.r.aws.ConfigClusterResolver      : Resolving eureka endpoints via configuration\n2021-02-10 14:03:53.546  INFO 2860 --- [           main] com.netflix.discovery.DiscoveryClient    : Disable delta property : false\n2021-02-10 14:03:53.546  INFO 2860 --- [           main] com.netflix.discovery.DiscoveryClient    : Single vip registry refresh property : null\n2021-02-10 14:03:53.547  INFO 2860 --- [           main] com.netflix.discovery.DiscoveryClient    : Force full registry fetch : false\n2021-02-10 14:03:53.547  INFO 2860 --- [           main] com.netflix.discovery.DiscoveryClient    : Application is null : false\n2021-02-10 14:03:53.547  INFO 2860 --- [           main] com.netflix.discovery.DiscoveryClient    : Registered Applications size is zero : true\n2021-02-10 14:03:53.547  INFO 2860 --- [           main] com.netflix.discovery.DiscoveryClient    : Application version is -1: true\n2021-02-10 14:03:53.547  INFO 2860 --- [           main] com.netflix.discovery.DiscoveryClient    : Getting all instance registry info from the eureka server\n2021-02-10 14:03:53.754  INFO 2860 --- [           main] com.netflix.discovery.DiscoveryClient    : The response status is 200\n2021-02-10 14:03:53.756  INFO 2860 --- [           main] com.netflix.discovery.DiscoveryClient    : Starting heartbeat executor: renew interval is: 30\n2021-02-10 14:03:53.758  INFO 2860 --- [           main] c.n.discovery.InstanceInfoReplicator     : InstanceInfoReplicator onDemand update allowed rate per min is 4\n2021-02-10 14:03:53.761  INFO 2860 --- [           main] com.netflix.discovery.DiscoveryClient    : Discovery Client initialized at timestamp 1612937033760 with initial instances count: 0\n2021-02-10 14:03:53.762  INFO 2860 --- [           main] o.s.c.n.e.s.EurekaServiceRegistry        : Registering application SPRINGCLOUD-TEST with eureka with status UP\n2021-02-10 14:03:53.763  INFO 2860 --- [           main] com.netflix.discovery.DiscoveryClient    : Saw local status change event StatusChangeEvent [timestamp=1612937033763, current=UP, previous=STARTING]\n2021-02-10 14:03:53.765  INFO 2860 --- [nfoReplicator-0] com.netflix.discovery.DiscoveryClient    : DiscoveryClient_SPRINGCLOUD-TEST/host.docker.internal:springCloud-test:8884: registering service...\n2021-02-10 14:03:53.805  INFO 2860 --- [           main] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat started on port(s): 8884 (http) with context path \'\'\n2021-02-10 14:03:53.807  INFO 2860 --- [           main] .s.c.n.e.s.EurekaAutoServiceRegistration : Updating port to 8884\n2021-02-10 14:03:53.837  INFO 2860 --- [nfoReplicator-0] com.netflix.discovery.DiscoveryClient    : DiscoveryClient_SPRINGCLOUD-TEST/host.docker.internal:springCloud-test:8884 - registration status: 204\n2021-02-10 14:03:54.231  INFO 2860 --- [           main] o.d.s.e.s.ShenyuTestSpringCloudApplication : Started ShenyuTestSpringCloudApplication in 6.338 seconds (JVM running for 7.361) \n')),(0,i.yg)("h2",{id:"test"},"Test"),(0,i.yg)("p",null,"The ",(0,i.yg)("inlineCode",{parentName:"p"},"shenyu-examples-springcloud")," project will automatically register interface methods annotated with ",(0,i.yg)("inlineCode",{parentName:"p"},"@ShenyuSpringCloudClient")," in the Apache ShenYu gateway after successful startup."),(0,i.yg)("p",null,"Open PluginList -> rpc proxy -> springCloud to see the list of plugin rule configurations:"),(0,i.yg)("p",null,(0,i.yg)("img",{src:t(61530).A})),(0,i.yg)("p",null,"Use PostMan to simulate HTTP to request your SpringCloud service:"),(0,i.yg)("p",null,(0,i.yg)("img",{src:t(34994).A})),(0,i.yg)("p",null,"Use IDEA HTTP Client Plugin to simulate HTTP to request your SpringCloud service","[local:no Shenyu proxy]",":"),(0,i.yg)("p",null,(0,i.yg)("img",{src:t(16304).A})),(0,i.yg)("p",null,"Use IDEA HTTP Client Plugin to simulate HTTP to request your SpringCloud service","[Shenyu proxy]",":"),(0,i.yg)("p",null,(0,i.yg)("img",{src:t(90705).A})))}u.isMDXComponent=!0},16304:(e,n,t)=>{t.d(n,{A:()=>r});const r=t.p+"assets/images/idea-http-test-local-bd2ea4b9e8ab5d867edc120e3946e00c.png"},90705:(e,n,t)=>{t.d(n,{A:()=>r});const r=t.p+"assets/images/idea-http-test-proxy-fc83eddb6fa4a74cc790258ac670a8ec.png"},34994:(e,n,t)=>{t.d(n,{A:()=>r});const r=t.p+"assets/images/postman-test-1bd985bc5b3dbe25e90f5c01d2ee1094.png"},61530:(e,n,t)=>{t.d(n,{A:()=>r});const r=t.p+"assets/images/rule-list-9a66ac71f764e2766fb7880c1811bae2.png"}}]);