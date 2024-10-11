"use strict";(self.webpackChunkshenyu_website=self.webpackChunkshenyu_website||[]).push([[55651],{15680:(e,n,a)=>{a.d(n,{xA:()=>p,yg:()=>g});var t=a(96540);function r(e,n,a){return n in e?Object.defineProperty(e,n,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[n]=a,e}function l(e,n){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);n&&(t=t.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),a.push.apply(a,t)}return a}function i(e){for(var n=1;n<arguments.length;n++){var a=null!=arguments[n]?arguments[n]:{};n%2?l(Object(a),!0).forEach((function(n){r(e,n,a[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):l(Object(a)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(a,n))}))}return e}function o(e,n){if(null==e)return{};var a,t,r=function(e,n){if(null==e)return{};var a,t,r={},l=Object.keys(e);for(t=0;t<l.length;t++)a=l[t],n.indexOf(a)>=0||(r[a]=e[a]);return r}(e,n);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(t=0;t<l.length;t++)a=l[t],n.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var s=t.createContext({}),c=function(e){var n=t.useContext(s),a=n;return e&&(a="function"==typeof e?e(n):i(i({},n),e)),a},p=function(e){var n=c(e.components);return t.createElement(s.Provider,{value:n},e.children)},m="mdxType",u={inlineCode:"code",wrapper:function(e){var n=e.children;return t.createElement(t.Fragment,{},n)}},d=t.forwardRef((function(e,n){var a=e.components,r=e.mdxType,l=e.originalType,s=e.parentName,p=o(e,["components","mdxType","originalType","parentName"]),m=c(a),d=r,g=m["".concat(s,".").concat(d)]||m[d]||u[d]||l;return a?t.createElement(g,i(i({ref:n},p),{},{components:a})):t.createElement(g,i({ref:n},p))}));function g(e,n){var a=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var l=a.length,i=new Array(l);i[0]=d;var o={};for(var s in n)hasOwnProperty.call(n,s)&&(o[s]=n[s]);o.originalType=e,o[m]="string"==typeof e?e:r,i[1]=o;for(var c=2;c<l;c++)i[c]=a[c];return t.createElement.apply(null,i)}return t.createElement.apply(null,a)}d.displayName="MDXCreateElement"},73158:(e,n,a)=>{a.r(n),a.d(n,{contentTitle:()=>i,default:()=>m,frontMatter:()=>l,metadata:()=>o,toc:()=>s});var t=a(58168),r=(a(96540),a(15680));const l={title:"Alarm Notice",keywords:["alarm"],description:"Alarm message dispatch and notice"},i=void 0,o={unversionedId:"developer/notice-alert",id:"version-2.6.1/developer/notice-alert",isDocsHomePage:!1,title:"Alarm Notice",description:"Alarm message dispatch and notice",source:"@site/versioned_docs/version-2.6.1/developer/notice-alert.md",sourceDirName:"developer",slug:"/developer/notice-alert",permalink:"/docs/developer/notice-alert",editUrl:"https://github.com/apache/shenyu-website/edit/main/versioned_docs/version-2.6.1/developer/notice-alert.md",version:"2.6.1",frontMatter:{title:"Alarm Notice",keywords:["alarm"],description:"Alarm message dispatch and notice"},sidebar:"version-2.6.0/tutorialSidebar",previous:{title:"Local Model",permalink:"/docs/developer/local-model"},next:{title:"ShenYu Optimize",permalink:"/docs/developer/shenyu-optimize"}},s=[{value:"Description",id:"description",children:[]},{value:"Enable Alert in ShenYu Gateway",id:"enable-alert-in-shenyu-gateway",children:[]},{value:"Send Alarm Message",id:"send-alarm-message",children:[]},{value:"Dispatch Alarm Notice",id:"dispatch-alarm-notice",children:[]},{value:"Attention",id:"attention",children:[]}],c={toc:s},p="wrapper";function m(e){let{components:n,...l}=e;return(0,r.yg)(p,(0,t.A)({},c,l,{components:n,mdxType:"MDXLayout"}),(0,r.yg)("h2",{id:"description"},"Description"),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},"This doc gives a brief description for send alarm notice message using ",(0,r.yg)("inlineCode",{parentName:"li"},"Apache ShenYu API"),".")),(0,r.yg)("h2",{id:"enable-alert-in-shenyu-gateway"},"Enable Alert in ShenYu Gateway"),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},"Config the gateway ",(0,r.yg)("inlineCode",{parentName:"li"},"application.yml")," ")),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-yaml"},"shenyu:\n  alert:\n    enabled: true\n    # the shenyu admin servers, if admin cluster, config like 127.0.0.1:9095,192.3.4.2:9095\n    admins: localhost:9095\n")),(0,r.yg)("h2",{id:"send-alarm-message"},"Send Alarm Message"),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},"We can send custom alarm message in plugin using ",(0,r.yg)("inlineCode",{parentName:"li"},"AlarmSender.alarm()"))),(0,r.yg)("p",null,"Refer below:"),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-java"},'public class ParamMappingPlugin extends AbstractShenyuPlugin {\n\n    @Override\n    public Mono<Void> doExecute(final ServerWebExchange exchange, final ShenyuPluginChain chain, final SelectorData selector, final RuleData rule) {\n        ParamMappingRuleHandle paramMappingRuleHandle = ParamMappingPluginDataHandler.CACHED_HANDLE.get().obtainHandle(CacheKeyUtils.INST.getKey(rule));\n     \n        if(some condition) {\n             Map<String, String> labels = new HashMap<>(8);\n             labels.put("plugin", "http-redirect");\n             labels.put("component", "http");\n             AlarmSender.alarmHighEmergency("alarm-title", "alarm-content", labels);\n             AlarmSender.alarmMediumCritical("alarm-title", "alarm-content", labels);\n             AlarmSender.alarmLowWarning("alarm-title", "alarm-content", labels);\n             AlarmSender.alarm((byte) 0, "alarm-title", "alarm-content");\n        }\n      \n        HttpHeaders headers = exchange.getRequest().getHeaders();\n        MediaType contentType = headers.getContentType();\n        return match(contentType).apply(exchange, chain, paramMappingRuleHandle);\n    }\n}\n')),(0,r.yg)("h2",{id:"dispatch-alarm-notice"},"Dispatch Alarm Notice"),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},"In the previous step, we send custom alarm message in plugin. "),(0,r.yg)("li",{parentName:"ul"},"Now we configure how these messages are sent to whom(tom,lili...) by which type(email,DingDing...)"),(0,r.yg)("li",{parentName:"ul"},"Config this in ShenYu Admin Dashboard.")),(0,r.yg)("p",null,(0,r.yg)("img",{alt:"alarm-config",src:a(5670).A})),(0,r.yg)("p",null,"Have fun!"),(0,r.yg)("h2",{id:"attention"},"Attention"),(0,r.yg)("ol",null,(0,r.yg)("li",{parentName:"ol"},"If you use the email notice, you should config your email send server in ShenYu Admin ",(0,r.yg)("inlineCode",{parentName:"li"},"application.yml")," ")),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-yaml"},"spring:\n  mail:\n    # Attention: this is mail server address.\n    host: smtp.qq.com\n    username: shenyu@apache.com\n    # Attention: this is not email account password, this requires an email authorization code\n    password: your-password\n    port: 465\n    default-encoding: UTF-8\n    properties:\n      mail:\n        smtp:\n          socketFactoryClass: javax.net.ssl.SSLSocketFactory\n          ssl:\n            enable: true\n")))}m.isMDXComponent=!0},5670:(e,n,a)=>{a.d(n,{A:()=>t});const t=a.p+"assets/images/alarm-config-b93b5e5f2e8b71d5c79a49a07398e674.png"}}]);