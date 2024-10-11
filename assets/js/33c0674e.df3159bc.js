"use strict";(self.webpackChunkshenyu_website=self.webpackChunkshenyu_website||[]).push([[47300],{15680:(e,t,a)=>{a.d(t,{xA:()=>o,yg:()=>s});var n=a(96540);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function l(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function g(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?l(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):l(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function i(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},l=Object.keys(e);for(n=0;n<l.length;n++)a=l[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(n=0;n<l.length;n++)a=l[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var p=n.createContext({}),u=function(e){var t=n.useContext(p),a=t;return e&&(a="function"==typeof e?e(t):g(g({},t),e)),a},o=function(e){var t=u(e.components);return n.createElement(p.Provider,{value:t},e.children)},y="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var a=e.components,r=e.mdxType,l=e.originalType,p=e.parentName,o=i(e,["components","mdxType","originalType","parentName"]),y=u(a),m=r,s=y["".concat(p,".").concat(m)]||y[m]||d[m]||l;return a?n.createElement(s,g(g({ref:t},o),{},{components:a})):n.createElement(s,g({ref:t},o))}));function s(e,t){var a=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var l=a.length,g=new Array(l);g[0]=m;var i={};for(var p in t)hasOwnProperty.call(t,p)&&(i[p]=t[p]);i.originalType=e,i[y]="string"==typeof e?e:r,g[1]=i;for(var u=2;u<l;u++)g[u]=a[u];return n.createElement.apply(null,g)}return n.createElement.apply(null,a)}m.displayName="MDXCreateElement"},75773:(e,t,a)=>{a.r(t),a.d(t,{contentTitle:()=>g,default:()=>y,frontMatter:()=>l,metadata:()=>i,toc:()=>p});var n=a(58168),r=(a(96540),a(15680));const l={title:"Kubernetes Controller Config",description:"Kubernetes Controller Config"},g=void 0,i={unversionedId:"user-guide/kubernetes-controller/config",id:"version-2.6.1/user-guide/kubernetes-controller/config",isDocsHomePage:!1,title:"Kubernetes Controller Config",description:"Kubernetes Controller Config",source:"@site/versioned_docs/version-2.6.1/user-guide/kubernetes-controller/config.md",sourceDirName:"user-guide/kubernetes-controller",slug:"/user-guide/kubernetes-controller/config",permalink:"/docs/user-guide/kubernetes-controller/config",editUrl:"https://github.com/apache/shenyu-website/edit/main/versioned_docs/version-2.6.1/user-guide/kubernetes-controller/config.md",version:"2.6.1",frontMatter:{title:"Kubernetes Controller Config",description:"Kubernetes Controller Config"},sidebar:"version-2.6.0/tutorialSidebar",previous:{title:"Build And Deploy Kubernetes Controller",permalink:"/docs/user-guide/kubernetes-controller/build-deploy"},next:{title:"The client registers the API documentation",permalink:"/docs/user-guide/api-doc/shenyu-annotation-apidoc"}},p=[{value:"Enable HTTPS",id:"enable-https",children:[]},{value:"Ingress configuration",id:"ingress-configuration",children:[{value:"General",id:"general",children:[]},{value:"Divide plugin (HTTP proxy)",id:"divide-plugin-http-proxy",children:[]},{value:"Dubbo plugin",id:"dubbo-plugin",children:[]},{value:"Motan plugin",id:"motan-plugin",children:[]},{value:"SpringCloud plugin",id:"springcloud-plugin",children:[]},{value:"WebSocket plugin",id:"websocket-plugin",children:[]}]}],u={toc:p},o="wrapper";function y(e){let{components:t,...a}=e;return(0,r.yg)(o,(0,n.A)({},u,a,{components:t,mdxType:"MDXLayout"}),(0,r.yg)("p",null,"This article introduces Kubernetes Controller configuration."),(0,r.yg)("h2",{id:"enable-https"},"Enable HTTPS"),(0,r.yg)("p",null,"To enable HTTPS, you need to configure the ",(0,r.yg)("inlineCode",{parentName:"p"},"sni protocol")," in the ",(0,r.yg)("inlineCode",{parentName:"p"},"application.yml")," file of the gateway:"),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-yaml"},"shenyu:\n   netty:\n     http:\n       sni:\n         enabled: true\n         mod: k8s #k8s mode applies\n         defaultK8sSecretNamespace: shenyu-ingress #The namespace of the default secret resource\n         defaultK8sSecretName: default-cert #default secret resource name\n")),(0,r.yg)("p",null,"Among them, the default secret resource must be available, but it will not be actually used at present."),(0,r.yg)("h2",{id:"ingress-configuration"},"Ingress configuration"),(0,r.yg)("p",null,"ShenYu Kubernetes Controller implements the K8s native Ingress standard, see ",(0,r.yg)("a",{parentName:"p",href:"https://kubernetes.io/docs/concepts/services-networking/ingress/"},"K8s official documentation")," for the use of the native standard"),(0,r.yg)("p",null,"In addition, Apache ShenYu has expanded based on the Annotation field of Ingress, and the configuration is shown in the following tables:"),(0,r.yg)("h3",{id:"general"},"General"),(0,r.yg)("table",null,(0,r.yg)("thead",{parentName:"table"},(0,r.yg)("tr",{parentName:"thead"},(0,r.yg)("th",{parentName:"tr",align:null},"Name"),(0,r.yg)("th",{parentName:"tr",align:null},"Default"),(0,r.yg)("th",{parentName:"tr",align:null},"Required"),(0,r.yg)("th",{parentName:"tr",align:null},"Description"))),(0,r.yg)("tbody",{parentName:"table"},(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"kubernetes.io/ingress.class"),(0,r.yg)("td",{parentName:"tr",align:null}),(0,r.yg)("td",{parentName:"tr",align:null},"Yes"),(0,r.yg)("td",{parentName:"tr",align:null},"Fill in shenyu")))),(0,r.yg)("h3",{id:"divide-plugin-http-proxy"},"Divide plugin (HTTP proxy)"),(0,r.yg)("table",null,(0,r.yg)("thead",{parentName:"table"},(0,r.yg)("tr",{parentName:"thead"},(0,r.yg)("th",{parentName:"tr",align:null},"Name"),(0,r.yg)("th",{parentName:"tr",align:null},"Default"),(0,r.yg)("th",{parentName:"tr",align:null},"Required"),(0,r.yg)("th",{parentName:"tr",align:null},"Description"))),(0,r.yg)("tbody",{parentName:"table"},(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"shenyu.apache.org/loadbalancer"),(0,r.yg)("td",{parentName:"tr",align:null},"random"),(0,r.yg)("td",{parentName:"tr",align:null},"No"),(0,r.yg)("td",{parentName:"tr",align:null},"Load balancing algorithm, optional hash, random, roundRobin, leastActive, p2c, shortestResponse")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"shenyu.apache.org/retry"),(0,r.yg)("td",{parentName:"tr",align:null},"3"),(0,r.yg)("td",{parentName:"tr",align:null},"No"),(0,r.yg)("td",{parentName:"tr",align:null},"Number of failed retries")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"shenyu.apache.org/timeout"),(0,r.yg)("td",{parentName:"tr",align:null},"3000"),(0,r.yg)("td",{parentName:"tr",align:null},"No"),(0,r.yg)("td",{parentName:"tr",align:null},"Backend request timeout, in milliseconds")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"shenyu.apache.org/header-max-size"),(0,r.yg)("td",{parentName:"tr",align:null},"10240"),(0,r.yg)("td",{parentName:"tr",align:null},"No"),(0,r.yg)("td",{parentName:"tr",align:null},"The maximum size of the request header, unit byte")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"shenyu.apache.org/request-max-size"),(0,r.yg)("td",{parentName:"tr",align:null},"102400"),(0,r.yg)("td",{parentName:"tr",align:null},"No"),(0,r.yg)("td",{parentName:"tr",align:null},"Maximum request body size, unit byte")))),(0,r.yg)("h3",{id:"dubbo-plugin"},"Dubbo plugin"),(0,r.yg)("table",null,(0,r.yg)("thead",{parentName:"table"},(0,r.yg)("tr",{parentName:"thead"},(0,r.yg)("th",{parentName:"tr",align:null},"Name"),(0,r.yg)("th",{parentName:"tr",align:null},"Default"),(0,r.yg)("th",{parentName:"tr",align:null},"Required or not"),(0,r.yg)("th",{parentName:"tr",align:null},"Description"))),(0,r.yg)("tbody",{parentName:"table"},(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"shenyu.apache.org/loadbalancer"),(0,r.yg)("td",{parentName:"tr",align:null},"random"),(0,r.yg)("td",{parentName:"tr",align:null},"No"),(0,r.yg)("td",{parentName:"tr",align:null},"Load balancing algorithm, optional hash, random, roundRobin, lastActive, p2c, shortestResponse")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"shenyu.apache.org/retry"),(0,r.yg)("td",{parentName:"tr",align:null},"3"),(0,r.yg)("td",{parentName:"tr",align:null},"No"),(0,r.yg)("td",{parentName:"tr",align:null},"Number of failed retries")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"shenyu.apache.org/timeout"),(0,r.yg)("td",{parentName:"tr",align:null},"3000"),(0,r.yg)("td",{parentName:"tr",align:null},"no"),(0,r.yg)("td",{parentName:"tr",align:null},"Backend request timeout in milliseconds")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"shenyu.apache.org/header-max-size"),(0,r.yg)("td",{parentName:"tr",align:null},"10240"),(0,r.yg)("td",{parentName:"tr",align:null},"No"),(0,r.yg)("td",{parentName:"tr",align:null},"Maximum request header size in bytes")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"shenyu.apache.org/request-max-size"),(0,r.yg)("td",{parentName:"tr",align:null},"102400"),(0,r.yg)("td",{parentName:"tr",align:null},"No"),(0,r.yg)("td",{parentName:"tr",align:null},"Maximum request body size in bytes")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"shenyu.apache.org/upstreams-protocol"),(0,r.yg)("td",{parentName:"tr",align:null},"dubbo://"),(0,r.yg)("td",{parentName:"tr",align:null},"No"),(0,r.yg)("td",{parentName:"tr",align:null},"Specify the protocol protocol used by upstream")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"shenyu.apache.org/plugin-dubbo-enabled"),(0,r.yg)("td",{parentName:"tr",align:null}),(0,r.yg)("td",{parentName:"tr",align:null},"No"),(0,r.yg)("td",{parentName:"tr",align:null},"Determines if the dubbo plugin is enabled")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"shenyu.apache.org/zookeeper-register-address"),(0,r.yg)("td",{parentName:"tr",align:null}),(0,r.yg)("td",{parentName:"tr",align:null},"Yes"),(0,r.yg)("td",{parentName:"tr",align:null},"Specify zookeeper address")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"shenyu.apache.org/plugin-dubbo-app-name"),(0,r.yg)("td",{parentName:"tr",align:null}),(0,r.yg)("td",{parentName:"tr",align:null},"Yes"),(0,r.yg)("td",{parentName:"tr",align:null},"Specify the metadata application name")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"shenyu.apache.org/plugin-dubbo-path"),(0,r.yg)("td",{parentName:"tr",align:null}),(0,r.yg)("td",{parentName:"tr",align:null},"Yes"),(0,r.yg)("td",{parentName:"tr",align:null},"Specify the request path for metadata")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"shenyu.apache.org/plugin-dubbo-rpc-type"),(0,r.yg)("td",{parentName:"tr",align:null}),(0,r.yg)("td",{parentName:"tr",align:null},"Yes"),(0,r.yg)("td",{parentName:"tr",align:null},"Specify the rpc type for metadata (dubbo, sofa, tars, springCloud, motan, grpc)")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"shenyu.apache.org/plugin-dubbo-service-name"),(0,r.yg)("td",{parentName:"tr",align:null}),(0,r.yg)("td",{parentName:"tr",align:null},"Yes"),(0,r.yg)("td",{parentName:"tr",align:null},"Specify the interface name for the metadata")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"shenyu.apache.org/plugin-dubbo-method-name"),(0,r.yg)("td",{parentName:"tr",align:null}),(0,r.yg)("td",{parentName:"tr",align:null},"Yes"),(0,r.yg)("td",{parentName:"tr",align:null},"Specifies the method name for metadata")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"shenyu.apache.org/plugin-dubbo-rpc-expand"),(0,r.yg)("td",{parentName:"tr",align:null}),(0,r.yg)("td",{parentName:"tr",align:null},"No"),(0,r.yg)("td",{parentName:"tr",align:null},"Specifies the rpc expansion parameter (json object) for the metadata")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"shenyu.apache.org/plugin-dubbo-parameter-types"),(0,r.yg)("td",{parentName:"tr",align:null}),(0,r.yg)("td",{parentName:"tr",align:null},"Yes"),(0,r.yg)("td",{parentName:"tr",align:null},"Specify parameter types for metadata")))),(0,r.yg)("h3",{id:"motan-plugin"},"Motan plugin"),(0,r.yg)("table",null,(0,r.yg)("thead",{parentName:"table"},(0,r.yg)("tr",{parentName:"thead"},(0,r.yg)("th",{parentName:"tr",align:null},"Name"),(0,r.yg)("th",{parentName:"tr",align:null},"Default"),(0,r.yg)("th",{parentName:"tr",align:null},"Required or not"),(0,r.yg)("th",{parentName:"tr",align:null},"Description"))),(0,r.yg)("tbody",{parentName:"table"},(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"shenyu.apache.org/loadbalancer"),(0,r.yg)("td",{parentName:"tr",align:null},"random"),(0,r.yg)("td",{parentName:"tr",align:null},"No"),(0,r.yg)("td",{parentName:"tr",align:null},"Load balancing algorithm, optional hash, random, roundRobin, lastActive, p2c, shortestResponse")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"shenyu.apache.org/retry"),(0,r.yg)("td",{parentName:"tr",align:null},"3"),(0,r.yg)("td",{parentName:"tr",align:null},"No"),(0,r.yg)("td",{parentName:"tr",align:null},"Number of failed retries")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"shenyu.apache.org/timeout"),(0,r.yg)("td",{parentName:"tr",align:null},"3000"),(0,r.yg)("td",{parentName:"tr",align:null},"No"),(0,r.yg)("td",{parentName:"tr",align:null},"Back-end request timeout in milliseconds")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"shenyu.apache.org/header-max-size"),(0,r.yg)("td",{parentName:"tr",align:null},"10240"),(0,r.yg)("td",{parentName:"tr",align:null},"No"),(0,r.yg)("td",{parentName:"tr",align:null},"Maximum request header size in bytes")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"shenyu.apache.org/request-max-size"),(0,r.yg)("td",{parentName:"tr",align:null},"102400"),(0,r.yg)("td",{parentName:"tr",align:null},"No"),(0,r.yg)("td",{parentName:"tr",align:null},"Maximum request body size in bytes")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"shenyu.apache.org/plugin-motan-enabled"),(0,r.yg)("td",{parentName:"tr",align:null},"No"),(0,r.yg)("td",{parentName:"tr",align:null},"Yes"),(0,r.yg)("td",{parentName:"tr",align:null},"Determines if the motan plugin is enabled")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"shenyu.apache.org/zookeeper-register-address"),(0,r.yg)("td",{parentName:"tr",align:null}),(0,r.yg)("td",{parentName:"tr",align:null},"Yes"),(0,r.yg)("td",{parentName:"tr",align:null},"Specify zookeeper address")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"shenyu.apache.org/plugin-motan-app-name"),(0,r.yg)("td",{parentName:"tr",align:null}),(0,r.yg)("td",{parentName:"tr",align:null},"Yes"),(0,r.yg)("td",{parentName:"tr",align:null},"Specify the metadata application name")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"shenyu.apache.org/plugin-motan-path"),(0,r.yg)("td",{parentName:"tr",align:null}),(0,r.yg)("td",{parentName:"tr",align:null},"Yes"),(0,r.yg)("td",{parentName:"tr",align:null},"Specify the request path for metadata")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"shenyu.apache.org/plugin-motan-rpc-type"),(0,r.yg)("td",{parentName:"tr",align:null}),(0,r.yg)("td",{parentName:"tr",align:null},"Yes"),(0,r.yg)("td",{parentName:"tr",align:null},"Specify the rpc type for metadata (dubbo, sofa, tars, springCloud, motan, grpc)")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"shenyu.apache.org/plugin-motan-service-name"),(0,r.yg)("td",{parentName:"tr",align:null}),(0,r.yg)("td",{parentName:"tr",align:null},"Yes"),(0,r.yg)("td",{parentName:"tr",align:null},"Specify the interface name for the metadata")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"shenyu.apache.org/plugin-motan-method-name"),(0,r.yg)("td",{parentName:"tr",align:null}),(0,r.yg)("td",{parentName:"tr",align:null},"Yes"),(0,r.yg)("td",{parentName:"tr",align:null},"Specifies the method name for metadata")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"shenyu.apache.org/plugin-motan-rpc-expand"),(0,r.yg)("td",{parentName:"tr",align:null}),(0,r.yg)("td",{parentName:"tr",align:null},"No"),(0,r.yg)("td",{parentName:"tr",align:null},"Specifies the rpc extension parameter (json object) for the metadata")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"shenyu.apache.org/plugin-motan-parameter-types"),(0,r.yg)("td",{parentName:"tr",align:null}),(0,r.yg)("td",{parentName:"tr",align:null},"Yes"),(0,r.yg)("td",{parentName:"tr",align:null},"Specify parameter types for metadata")))),(0,r.yg)("h3",{id:"springcloud-plugin"},"SpringCloud plugin"),(0,r.yg)("table",null,(0,r.yg)("thead",{parentName:"table"},(0,r.yg)("tr",{parentName:"thead"},(0,r.yg)("th",{parentName:"tr",align:null},"Name"),(0,r.yg)("th",{parentName:"tr",align:null},"Default"),(0,r.yg)("th",{parentName:"tr",align:null},"Required or not"),(0,r.yg)("th",{parentName:"tr",align:null},"Description"))),(0,r.yg)("tbody",{parentName:"table"},(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"shenyu.apache.org/loadbalancer"),(0,r.yg)("td",{parentName:"tr",align:null},"random"),(0,r.yg)("td",{parentName:"tr",align:null},"No"),(0,r.yg)("td",{parentName:"tr",align:null},"Load balancing algorithm, optional hash, random, roundRobin, lastActive, p2c, shortestResponse")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"shenyu.apache.org/retry"),(0,r.yg)("td",{parentName:"tr",align:null},"3"),(0,r.yg)("td",{parentName:"tr",align:null},"No"),(0,r.yg)("td",{parentName:"tr",align:null},"Number of failed retries")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"shenyu.apache.org/timeout"),(0,r.yg)("td",{parentName:"tr",align:null},"3000"),(0,r.yg)("td",{parentName:"tr",align:null},"No"),(0,r.yg)("td",{parentName:"tr",align:null},"Backend request timeout in milliseconds")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"shenyu.apache.org/header-max-size"),(0,r.yg)("td",{parentName:"tr",align:null},"10240"),(0,r.yg)("td",{parentName:"tr",align:null},"No"),(0,r.yg)("td",{parentName:"tr",align:null},"Maximum request header size in bytes")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"shenyu.apache.org/request-max-size"),(0,r.yg)("td",{parentName:"tr",align:null},"102400"),(0,r.yg)("td",{parentName:"tr",align:null},"No"),(0,r.yg)("td",{parentName:"tr",align:null},"Maximum request body size in bytes")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"shenyu.apache.org/plugin-spring-cloud-enabled"),(0,r.yg)("td",{parentName:"tr",align:null}),(0,r.yg)("td",{parentName:"tr",align:null},"Yes"),(0,r.yg)("td",{parentName:"tr",align:null},"Determines whether to start the springCloud plugin")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"shenyu.apache.org/zookeeper-register-address"),(0,r.yg)("td",{parentName:"tr",align:null}),(0,r.yg)("td",{parentName:"tr",align:null},"Yes"),(0,r.yg)("td",{parentName:"tr",align:null},"Specify the zookeeper address")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"shenyu.apache.org/plugin-spring-cloud-app-name"),(0,r.yg)("td",{parentName:"tr",align:null}),(0,r.yg)("td",{parentName:"tr",align:null},"Yes"),(0,r.yg)("td",{parentName:"tr",align:null},"Specify the metadata application name")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"shenyu.apache.org/plugin-spring-cloud-path"),(0,r.yg)("td",{parentName:"tr",align:null}),(0,r.yg)("td",{parentName:"tr",align:null},"Yes"),(0,r.yg)("td",{parentName:"tr",align:null},"Specify the request path for metadata")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"shenyu.apache.org/plugin-spring-cloud-rpc-type"),(0,r.yg)("td",{parentName:"tr",align:null}),(0,r.yg)("td",{parentName:"tr",align:null},"Yes"),(0,r.yg)("td",{parentName:"tr",align:null},"Specify the rpc type (dubbo, sofa, tars, springCloud, motan, grpc) of the metadata")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"shenyu.apache.org/plugin-spring-cloud-service-name"),(0,r.yg)("td",{parentName:"tr",align:null}),(0,r.yg)("td",{parentName:"tr",align:null},"Yes"),(0,r.yg)("td",{parentName:"tr",align:null},"Specify the interface name for metadata")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"shenyu.apache.org/plugin-spring-cloud-method-name"),(0,r.yg)("td",{parentName:"tr",align:null}),(0,r.yg)("td",{parentName:"tr",align:null},"Yes"),(0,r.yg)("td",{parentName:"tr",align:null},"Specifies the method name for metadata")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"shenyu.apache.org/plugin-spring-cloud-rpc-expand"),(0,r.yg)("td",{parentName:"tr",align:null}),(0,r.yg)("td",{parentName:"tr",align:null},"No"),(0,r.yg)("td",{parentName:"tr",align:null},"Specifies the rpc extension parameter (json object) for the metadata")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"shenyu.apache.org/plugin-spring-cloud-parameter-types"),(0,r.yg)("td",{parentName:"tr",align:null}),(0,r.yg)("td",{parentName:"tr",align:null},"Yes"),(0,r.yg)("td",{parentName:"tr",align:null},"Specify parameter types for metadata")))),(0,r.yg)("h3",{id:"websocket-plugin"},"WebSocket plugin"),(0,r.yg)("table",null,(0,r.yg)("thead",{parentName:"table"},(0,r.yg)("tr",{parentName:"thead"},(0,r.yg)("th",{parentName:"tr",align:null},"Name"),(0,r.yg)("th",{parentName:"tr",align:null},"Default"),(0,r.yg)("th",{parentName:"tr",align:null},"Required or not"),(0,r.yg)("th",{parentName:"tr",align:null},"Description"))),(0,r.yg)("tbody",{parentName:"table"},(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"shenyu.apache.org/loadbalancer"),(0,r.yg)("td",{parentName:"tr",align:null},"random"),(0,r.yg)("td",{parentName:"tr",align:null},"No"),(0,r.yg)("td",{parentName:"tr",align:null},"Load balancing algorithm, optional hash, random, roundRobin, lastActive, p2c, shortestResponse")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"shenyu.apache.org/retry"),(0,r.yg)("td",{parentName:"tr",align:null},"3"),(0,r.yg)("td",{parentName:"tr",align:null},"No"),(0,r.yg)("td",{parentName:"tr",align:null},"Number of failed retries")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"shenyu.apache.org/timeout"),(0,r.yg)("td",{parentName:"tr",align:null},"3000"),(0,r.yg)("td",{parentName:"tr",align:null},"No"),(0,r.yg)("td",{parentName:"tr",align:null},"Back-end request timeout in milliseconds")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"shenyu.apache.org/header-max-size"),(0,r.yg)("td",{parentName:"tr",align:null},"10240"),(0,r.yg)("td",{parentName:"tr",align:null},"No"),(0,r.yg)("td",{parentName:"tr",align:null},"Maximum request header size in bytes")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"shenyu.apache.org/request-max-size"),(0,r.yg)("td",{parentName:"tr",align:null},"102400"),(0,r.yg)("td",{parentName:"tr",align:null},"No"),(0,r.yg)("td",{parentName:"tr",align:null},"Maximum size of request body in byte")))))}y.isMDXComponent=!0}}]);