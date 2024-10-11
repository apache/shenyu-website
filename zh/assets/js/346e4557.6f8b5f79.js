"use strict";(self.webpackChunkshenyu_website=self.webpackChunkshenyu_website||[]).push([[71056],{15680:(e,t,a)=>{a.d(t,{xA:()=>i,yg:()=>N});var n=a(96540);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function l(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function g(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?l(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):l(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function p(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},l=Object.keys(e);for(n=0;n<l.length;n++)a=l[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(n=0;n<l.length;n++)a=l[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var y=n.createContext({}),u=function(e){var t=n.useContext(y),a=t;return e&&(a="function"==typeof e?e(t):g(g({},t),e)),a},i=function(e){var t=u(e.components);return n.createElement(y.Provider,{value:t},e.children)},d="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},o=n.forwardRef((function(e,t){var a=e.components,r=e.mdxType,l=e.originalType,y=e.parentName,i=p(e,["components","mdxType","originalType","parentName"]),d=u(a),o=r,N=d["".concat(y,".").concat(o)]||d[o]||m[o]||l;return a?n.createElement(N,g(g({ref:t},i),{},{components:a})):n.createElement(N,g({ref:t},i))}));function N(e,t){var a=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var l=a.length,g=new Array(l);g[0]=o;var p={};for(var y in t)hasOwnProperty.call(t,y)&&(p[y]=t[y]);p.originalType=e,p[d]="string"==typeof e?e:r,g[1]=p;for(var u=2;u<l;u++)g[u]=a[u];return n.createElement.apply(null,g)}return n.createElement.apply(null,a)}o.displayName="MDXCreateElement"},96321:(e,t,a)=>{a.r(t),a.d(t,{contentTitle:()=>g,default:()=>d,frontMatter:()=>l,metadata:()=>p,toc:()=>y});var n=a(58168),r=(a(96540),a(15680));const l={title:"Kubernetes \u63a7\u5236\u5668\u914d\u7f6e",description:"Kubernetes \u63a7\u5236\u5668\u914d\u7f6e"},g=void 0,p={unversionedId:"user-guide/kubernetes-controller/config",id:"user-guide/kubernetes-controller/config",isDocsHomePage:!1,title:"Kubernetes \u63a7\u5236\u5668\u914d\u7f6e",description:"Kubernetes \u63a7\u5236\u5668\u914d\u7f6e",source:"@site/i18n/zh/docusaurus-plugin-content-docs/current/user-guide/kubernetes-controller/config.md",sourceDirName:"user-guide/kubernetes-controller",slug:"/user-guide/kubernetes-controller/config",permalink:"/zh/docs/next/user-guide/kubernetes-controller/config",editUrl:"https://github.com/apache/shenyu-website/edit/main/i18n/zh/docusaurus-plugin-content-docs/current/user-guide/kubernetes-controller/config.md",version:"current",frontMatter:{title:"Kubernetes \u63a7\u5236\u5668\u914d\u7f6e",description:"Kubernetes \u63a7\u5236\u5668\u914d\u7f6e"},sidebar:"tutorialSidebar",previous:{title:"\u6784\u5efa\u548c\u90e8\u7f72 Kubernetes \u63a7\u5236\u5668",permalink:"/zh/docs/next/user-guide/kubernetes-controller/build-deploy"},next:{title:"Shenyu\u5ba2\u6237\u7aef\u6ce8\u518cAPI\u6587\u6863",permalink:"/zh/docs/next/user-guide/api-doc/shenyu-annotation-apidoc"}},y=[{value:"\u5f00\u542f HTTPS",id:"\u5f00\u542f-https",children:[]},{value:"Ingress \u914d\u7f6e",id:"ingress-\u914d\u7f6e",children:[{value:"\u901a\u7528",id:"\u901a\u7528",children:[]},{value:"Divide \u63d2\u4ef6\uff08HTTP\u4ee3\u7406\uff09",id:"divide-\u63d2\u4ef6http\u4ee3\u7406",children:[]},{value:"Dubbo\u63d2\u4ef6",id:"dubbo\u63d2\u4ef6",children:[]},{value:"Motan\u63d2\u4ef6",id:"motan\u63d2\u4ef6",children:[]},{value:"SpringCloud\u63d2\u4ef6",id:"springcloud\u63d2\u4ef6",children:[]},{value:"WebSocket\u63d2\u4ef6",id:"websocket\u63d2\u4ef6",children:[]}]}],u={toc:y},i="wrapper";function d(e){let{components:t,...a}=e;return(0,r.yg)(i,(0,n.A)({},u,a,{components:t,mdxType:"MDXLayout"}),(0,r.yg)("p",null,"\u672c\u7bc7\u4ecb\u7ecd Kubernetes \u63a7\u5236\u5668\u914d\u7f6e\u3002"),(0,r.yg)("h2",{id:"\u5f00\u542f-https"},"\u5f00\u542f HTTPS"),(0,r.yg)("p",null,"\u5f00\u542f HTTPS \u9700\u8981\u5728\u7f51\u5173\u7684 ",(0,r.yg)("inlineCode",{parentName:"p"},"application.yml")," \u6587\u4ef6\u4e2d\u8fdb\u884c ",(0,r.yg)("inlineCode",{parentName:"p"},"sni\u534f\u8bae")," \u7684\u76f8\u5173\u914d\u7f6e\uff1a"),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-yaml"},"shenyu:\n  netty:\n    http:\n      sni:\n        enabled: true\n        mod: k8s #k8s\u6a21\u5f0f\u9002\u7528\n        defaultK8sSecretNamespace: shenyu-ingress #\u9ed8\u8ba4secret\u8d44\u6e90\u7684namespace\n        defaultK8sSecretName: default-cert #\u9ed8\u8ba4secret\u8d44\u6e90\u540d\u5b57\n")),(0,r.yg)("p",null,"\u5176\u4e2d\uff0c\u9ed8\u8ba4secret\u8d44\u6e90\u5fc5\u987b\u8981\u6709\uff0c\u4f46\u662f\u76ee\u524d\u4e0d\u4f1a\u5b9e\u9645\u4f7f\u7528\u3002"),(0,r.yg)("h2",{id:"ingress-\u914d\u7f6e"},"Ingress \u914d\u7f6e"),(0,r.yg)("p",null,"ShenYu Kubernetes Controller \u5b9e\u73b0\u4e86 K8s \u539f\u751f\u7684 Ingress \u6807\u51c6\uff0c\u539f\u751f\u6807\u51c6\u7684\u4f7f\u7528\u89c1 ",(0,r.yg)("a",{parentName:"p",href:"https://kubernetes.io/docs/concepts/services-networking/ingress/"},"K8s \u5b98\u65b9\u6587\u6863")),(0,r.yg)("p",null,"\u53e6\u5916\uff0cApache ShenYu \u57fa\u4e8e Ingress \u7684 Annotation \u5b57\u6bb5\u8fdb\u884c\u4e86\u62d3\u5c55\uff0c\u914d\u7f6e\u89c1\u4e0b\u6587\u8868\u683c\uff1a"),(0,r.yg)("h3",{id:"\u901a\u7528"},"\u901a\u7528"),(0,r.yg)("table",null,(0,r.yg)("thead",{parentName:"table"},(0,r.yg)("tr",{parentName:"thead"},(0,r.yg)("th",{parentName:"tr",align:null},"\u540d\u79f0"),(0,r.yg)("th",{parentName:"tr",align:null},"\u9ed8\u8ba4\u503c"),(0,r.yg)("th",{parentName:"tr",align:null},"\u662f\u5426\u5fc5\u586b"),(0,r.yg)("th",{parentName:"tr",align:null},"\u8bf4\u660e"))),(0,r.yg)("tbody",{parentName:"table"},(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"kubernetes.io/ingress.class"),(0,r.yg)("td",{parentName:"tr",align:null}),(0,r.yg)("td",{parentName:"tr",align:null},"\u662f"),(0,r.yg)("td",{parentName:"tr",align:null},"\u586bshenyu")))),(0,r.yg)("h3",{id:"divide-\u63d2\u4ef6http\u4ee3\u7406"},"Divide \u63d2\u4ef6\uff08HTTP\u4ee3\u7406\uff09"),(0,r.yg)("table",null,(0,r.yg)("thead",{parentName:"table"},(0,r.yg)("tr",{parentName:"thead"},(0,r.yg)("th",{parentName:"tr",align:null},"\u540d\u79f0"),(0,r.yg)("th",{parentName:"tr",align:null},"\u9ed8\u8ba4\u503c"),(0,r.yg)("th",{parentName:"tr",align:null},"\u662f\u5426\u5fc5\u586b"),(0,r.yg)("th",{parentName:"tr",align:null},"\u8bf4\u660e"))),(0,r.yg)("tbody",{parentName:"table"},(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"shenyu.apache.org/loadbalancer"),(0,r.yg)("td",{parentName:"tr",align:null},"random"),(0,r.yg)("td",{parentName:"tr",align:null},"\u5426"),(0,r.yg)("td",{parentName:"tr",align:null},"\u8d1f\u8f7d\u5747\u8861\u7b97\u6cd5\uff0c\u53ef\u9009hash\u3001random\u3001roundRobin\u3001leastActive\u3001p2c\u3001shortestResponse")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"shenyu.apache.org/retry"),(0,r.yg)("td",{parentName:"tr",align:null},"3"),(0,r.yg)("td",{parentName:"tr",align:null},"\u5426"),(0,r.yg)("td",{parentName:"tr",align:null},"\u5931\u8d25\u91cd\u8bd5\u6b21\u6570")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"shenyu.apache.org/timeout"),(0,r.yg)("td",{parentName:"tr",align:null},"3000"),(0,r.yg)("td",{parentName:"tr",align:null},"\u5426"),(0,r.yg)("td",{parentName:"tr",align:null},"\u540e\u7aef\u8bf7\u6c42\u8d85\u65f6\u65f6\u95f4\uff0c\u5355\u4f4d\u6beb\u79d2")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"shenyu.apache.org/header-max-size"),(0,r.yg)("td",{parentName:"tr",align:null},"10240"),(0,r.yg)("td",{parentName:"tr",align:null},"\u5426"),(0,r.yg)("td",{parentName:"tr",align:null},"\u8bf7\u6c42\u5934\u6700\u5927\u5927\u5c0f\uff0c\u5355\u4f4dbyte")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"shenyu.apache.org/request-max-size"),(0,r.yg)("td",{parentName:"tr",align:null},"102400"),(0,r.yg)("td",{parentName:"tr",align:null},"\u5426"),(0,r.yg)("td",{parentName:"tr",align:null},"\u8bf7\u6c42\u4f53\u6700\u5927\u5927\u5c0f\uff0c\u5355\u4f4dbyte")))),(0,r.yg)("h3",{id:"dubbo\u63d2\u4ef6"},"Dubbo\u63d2\u4ef6"),(0,r.yg)("table",null,(0,r.yg)("thead",{parentName:"table"},(0,r.yg)("tr",{parentName:"thead"},(0,r.yg)("th",{parentName:"tr",align:null},"\u540d\u79f0"),(0,r.yg)("th",{parentName:"tr",align:null},"\u9ed8\u8ba4\u503c"),(0,r.yg)("th",{parentName:"tr",align:null},"\u662f\u5426\u5fc5\u586b"),(0,r.yg)("th",{parentName:"tr",align:null},"\u8bf4\u660e"))),(0,r.yg)("tbody",{parentName:"table"},(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"shenyu.apache.org/loadbalancer"),(0,r.yg)("td",{parentName:"tr",align:null},"random"),(0,r.yg)("td",{parentName:"tr",align:null},"\u5426"),(0,r.yg)("td",{parentName:"tr",align:null},"\u8d1f\u8f7d\u5747\u8861\u7b97\u6cd5\uff0c\u53ef\u9009hash\u3001random\u3001roundRobin\u3001leastActive\u3001p2c\u3001shortestResponse")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"shenyu.apache.org/retry"),(0,r.yg)("td",{parentName:"tr",align:null},"3"),(0,r.yg)("td",{parentName:"tr",align:null},"\u5426"),(0,r.yg)("td",{parentName:"tr",align:null},"\u5931\u8d25\u91cd\u8bd5\u6b21\u6570")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"shenyu.apache.org/timeout"),(0,r.yg)("td",{parentName:"tr",align:null},"3000"),(0,r.yg)("td",{parentName:"tr",align:null},"\u5426"),(0,r.yg)("td",{parentName:"tr",align:null},"\u540e\u7aef\u8bf7\u6c42\u8d85\u65f6\u65f6\u95f4\uff0c\u5355\u4f4d\u6beb\u79d2")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"shenyu.apache.org/header-max-size"),(0,r.yg)("td",{parentName:"tr",align:null},"10240"),(0,r.yg)("td",{parentName:"tr",align:null},"\u5426"),(0,r.yg)("td",{parentName:"tr",align:null},"\u8bf7\u6c42\u5934\u6700\u5927\u5927\u5c0f\uff0c\u5355\u4f4dbyte")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"shenyu.apache.org/request-max-size"),(0,r.yg)("td",{parentName:"tr",align:null},"102400"),(0,r.yg)("td",{parentName:"tr",align:null},"\u5426"),(0,r.yg)("td",{parentName:"tr",align:null},"\u8bf7\u6c42\u4f53\u6700\u5927\u5927\u5c0f\uff0c\u5355\u4f4dbyte")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"shenyu.apache.org/upstreams-protocol"),(0,r.yg)("td",{parentName:"tr",align:null},"dubbo://"),(0,r.yg)("td",{parentName:"tr",align:null},"\u5426"),(0,r.yg)("td",{parentName:"tr",align:null},"\u6307\u5b9aupstream\u4f7f\u7528\u7684protocol\u534f\u8bae")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"shenyu.apache.org/plugin-dubbo-enabled"),(0,r.yg)("td",{parentName:"tr",align:null}),(0,r.yg)("td",{parentName:"tr",align:null},"\u5426"),(0,r.yg)("td",{parentName:"tr",align:null},"\u786e\u5b9a\u662f\u5426\u542f\u52a8dubbo\u63d2\u4ef6")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"shenyu.apache.org/zookeeper-register-address"),(0,r.yg)("td",{parentName:"tr",align:null}),(0,r.yg)("td",{parentName:"tr",align:null},"\u662f"),(0,r.yg)("td",{parentName:"tr",align:null},"\u6307\u5b9azookeeper\u5730\u5740")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"shenyu.apache.org/plugin-dubbo-app-name"),(0,r.yg)("td",{parentName:"tr",align:null}),(0,r.yg)("td",{parentName:"tr",align:null},"\u662f"),(0,r.yg)("td",{parentName:"tr",align:null},"\u6307\u5b9a\u5143\u6570\u636e\u7684\u5e94\u7528\u540d\u79f0")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"shenyu.apache.org/plugin-dubbo-path"),(0,r.yg)("td",{parentName:"tr",align:null}),(0,r.yg)("td",{parentName:"tr",align:null},"\u662f"),(0,r.yg)("td",{parentName:"tr",align:null},"\u6307\u5b9a\u5143\u6570\u636e\u7684\u8bf7\u6c42\u8def\u5f84")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"shenyu.apache.org/plugin-dubbo-rpc-type"),(0,r.yg)("td",{parentName:"tr",align:null}),(0,r.yg)("td",{parentName:"tr",align:null},"\u662f"),(0,r.yg)("td",{parentName:"tr",align:null},"\u6307\u5b9a\u5143\u6570\u636e\u7684rpc\u7c7b\u578b\uff08dubbo\uff0csofa\uff0ctars\uff0cspringCloud\uff0cmotan\uff0cgrpc\uff09")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"shenyu.apache.org/plugin-dubbo-service-name"),(0,r.yg)("td",{parentName:"tr",align:null}),(0,r.yg)("td",{parentName:"tr",align:null},"\u662f"),(0,r.yg)("td",{parentName:"tr",align:null},"\u6307\u5b9a\u5143\u6570\u636e\u7684\u63a5\u53e3\u540d\u79f0")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"shenyu.apache.org/plugin-dubbo-method-name"),(0,r.yg)("td",{parentName:"tr",align:null}),(0,r.yg)("td",{parentName:"tr",align:null},"\u662f"),(0,r.yg)("td",{parentName:"tr",align:null},"\u6307\u5b9a\u5143\u6570\u636e\u7684\u65b9\u6cd5\u540d\u79f0")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"shenyu.apache.org/plugin-dubbo-rpc-expand"),(0,r.yg)("td",{parentName:"tr",align:null}),(0,r.yg)("td",{parentName:"tr",align:null},"\u5426"),(0,r.yg)("td",{parentName:"tr",align:null},"\u6307\u5b9a\u5143\u6570\u636e\u7684rpc\u6269\u5c55\u53c2\u6570\uff08json\u5bf9\u8c61\uff09")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"shenyu.apache.org/plugin-dubbo-parameter-types"),(0,r.yg)("td",{parentName:"tr",align:null}),(0,r.yg)("td",{parentName:"tr",align:null},"\u662f"),(0,r.yg)("td",{parentName:"tr",align:null},"\u6307\u5b9a\u5143\u6570\u636e\u7684\u53c2\u6570\u7c7b\u578b")))),(0,r.yg)("h3",{id:"motan\u63d2\u4ef6"},"Motan\u63d2\u4ef6"),(0,r.yg)("table",null,(0,r.yg)("thead",{parentName:"table"},(0,r.yg)("tr",{parentName:"thead"},(0,r.yg)("th",{parentName:"tr",align:null},"\u540d\u79f0"),(0,r.yg)("th",{parentName:"tr",align:null},"\u9ed8\u8ba4\u503c"),(0,r.yg)("th",{parentName:"tr",align:null},"\u662f\u5426\u5fc5\u586b"),(0,r.yg)("th",{parentName:"tr",align:null},"\u8bf4\u660e"))),(0,r.yg)("tbody",{parentName:"table"},(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"shenyu.apache.org/loadbalancer"),(0,r.yg)("td",{parentName:"tr",align:null},"random"),(0,r.yg)("td",{parentName:"tr",align:null},"\u5426"),(0,r.yg)("td",{parentName:"tr",align:null},"\u8d1f\u8f7d\u5747\u8861\u7b97\u6cd5\uff0c\u53ef\u9009hash\u3001random\u3001roundRobin\u3001leastActive\u3001p2c\u3001shortestResponse")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"shenyu.apache.org/retry"),(0,r.yg)("td",{parentName:"tr",align:null},"3"),(0,r.yg)("td",{parentName:"tr",align:null},"\u5426"),(0,r.yg)("td",{parentName:"tr",align:null},"\u5931\u8d25\u91cd\u8bd5\u6b21\u6570")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"shenyu.apache.org/timeout"),(0,r.yg)("td",{parentName:"tr",align:null},"3000"),(0,r.yg)("td",{parentName:"tr",align:null},"\u5426"),(0,r.yg)("td",{parentName:"tr",align:null},"\u540e\u7aef\u8bf7\u6c42\u8d85\u65f6\u65f6\u95f4\uff0c\u5355\u4f4d\u6beb\u79d2")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"shenyu.apache.org/header-max-size"),(0,r.yg)("td",{parentName:"tr",align:null},"10240"),(0,r.yg)("td",{parentName:"tr",align:null},"\u5426"),(0,r.yg)("td",{parentName:"tr",align:null},"\u8bf7\u6c42\u5934\u6700\u5927\u5927\u5c0f\uff0c\u5355\u4f4dbyte")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"shenyu.apache.org/request-max-size"),(0,r.yg)("td",{parentName:"tr",align:null},"102400"),(0,r.yg)("td",{parentName:"tr",align:null},"\u5426"),(0,r.yg)("td",{parentName:"tr",align:null},"\u8bf7\u6c42\u4f53\u6700\u5927\u5927\u5c0f\uff0c\u5355\u4f4dbyte")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"shenyu.apache.org/plugin-motan-enabled"),(0,r.yg)("td",{parentName:"tr",align:null}),(0,r.yg)("td",{parentName:"tr",align:null},"\u662f"),(0,r.yg)("td",{parentName:"tr",align:null},"\u786e\u5b9a\u662f\u5426\u542f\u52a8motan\u63d2\u4ef6")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"shenyu.apache.org/zookeeper-register-address"),(0,r.yg)("td",{parentName:"tr",align:null}),(0,r.yg)("td",{parentName:"tr",align:null},"\u662f"),(0,r.yg)("td",{parentName:"tr",align:null},"\u6307\u5b9azookeeper\u5730\u5740")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"shenyu.apache.org/plugin-motan-app-name"),(0,r.yg)("td",{parentName:"tr",align:null}),(0,r.yg)("td",{parentName:"tr",align:null},"\u662f"),(0,r.yg)("td",{parentName:"tr",align:null},"\u6307\u5b9a\u5143\u6570\u636e\u7684\u5e94\u7528\u540d\u79f0")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"shenyu.apache.org/plugin-motan-path"),(0,r.yg)("td",{parentName:"tr",align:null}),(0,r.yg)("td",{parentName:"tr",align:null},"\u662f"),(0,r.yg)("td",{parentName:"tr",align:null},"\u6307\u5b9a\u5143\u6570\u636e\u7684\u8bf7\u6c42\u8def\u5f84")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"shenyu.apache.org/plugin-motan-rpc-type"),(0,r.yg)("td",{parentName:"tr",align:null}),(0,r.yg)("td",{parentName:"tr",align:null},"\u662f"),(0,r.yg)("td",{parentName:"tr",align:null},"\u6307\u5b9a\u5143\u6570\u636e\u7684rpc\u7c7b\u578b\uff08dubbo\uff0csofa\uff0ctars\uff0cspringCloud\uff0cmotan\uff0cgrpc\uff09")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"shenyu.apache.org/plugin-motan-service-name"),(0,r.yg)("td",{parentName:"tr",align:null}),(0,r.yg)("td",{parentName:"tr",align:null},"\u662f"),(0,r.yg)("td",{parentName:"tr",align:null},"\u6307\u5b9a\u5143\u6570\u636e\u7684\u63a5\u53e3\u540d\u79f0")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"shenyu.apache.org/plugin-motan-method-name"),(0,r.yg)("td",{parentName:"tr",align:null}),(0,r.yg)("td",{parentName:"tr",align:null},"\u662f"),(0,r.yg)("td",{parentName:"tr",align:null},"\u6307\u5b9a\u5143\u6570\u636e\u7684\u65b9\u6cd5\u540d\u79f0")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"shenyu.apache.org/plugin-motan-rpc-expand"),(0,r.yg)("td",{parentName:"tr",align:null}),(0,r.yg)("td",{parentName:"tr",align:null},"\u5426"),(0,r.yg)("td",{parentName:"tr",align:null},"\u6307\u5b9a\u5143\u6570\u636e\u7684rpc\u6269\u5c55\u53c2\u6570\uff08json\u5bf9\u8c61\uff09")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"shenyu.apache.org/plugin-motan-parameter-types"),(0,r.yg)("td",{parentName:"tr",align:null}),(0,r.yg)("td",{parentName:"tr",align:null},"\u662f"),(0,r.yg)("td",{parentName:"tr",align:null},"\u6307\u5b9a\u5143\u6570\u636e\u7684\u53c2\u6570\u7c7b\u578b")))),(0,r.yg)("h3",{id:"springcloud\u63d2\u4ef6"},"SpringCloud\u63d2\u4ef6"),(0,r.yg)("table",null,(0,r.yg)("thead",{parentName:"table"},(0,r.yg)("tr",{parentName:"thead"},(0,r.yg)("th",{parentName:"tr",align:null},"\u540d\u79f0"),(0,r.yg)("th",{parentName:"tr",align:null},"\u9ed8\u8ba4\u503c"),(0,r.yg)("th",{parentName:"tr",align:null},"\u662f\u5426\u5fc5\u586b"),(0,r.yg)("th",{parentName:"tr",align:null},"\u8bf4\u660e"))),(0,r.yg)("tbody",{parentName:"table"},(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"shenyu.apache.org/loadbalancer"),(0,r.yg)("td",{parentName:"tr",align:null},"random"),(0,r.yg)("td",{parentName:"tr",align:null},"\u5426"),(0,r.yg)("td",{parentName:"tr",align:null},"\u8d1f\u8f7d\u5747\u8861\u7b97\u6cd5\uff0c\u53ef\u9009hash\u3001random\u3001roundRobin\u3001leastActive\u3001p2c\u3001shortestResponse")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"shenyu.apache.org/retry"),(0,r.yg)("td",{parentName:"tr",align:null},"3"),(0,r.yg)("td",{parentName:"tr",align:null},"\u5426"),(0,r.yg)("td",{parentName:"tr",align:null},"\u5931\u8d25\u91cd\u8bd5\u6b21\u6570")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"shenyu.apache.org/timeout"),(0,r.yg)("td",{parentName:"tr",align:null},"3000"),(0,r.yg)("td",{parentName:"tr",align:null},"\u5426"),(0,r.yg)("td",{parentName:"tr",align:null},"\u540e\u7aef\u8bf7\u6c42\u8d85\u65f6\u65f6\u95f4\uff0c\u5355\u4f4d\u6beb\u79d2")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"shenyu.apache.org/header-max-size"),(0,r.yg)("td",{parentName:"tr",align:null},"10240"),(0,r.yg)("td",{parentName:"tr",align:null},"\u5426"),(0,r.yg)("td",{parentName:"tr",align:null},"\u8bf7\u6c42\u5934\u6700\u5927\u5927\u5c0f\uff0c\u5355\u4f4dbyte")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"shenyu.apache.org/request-max-size"),(0,r.yg)("td",{parentName:"tr",align:null},"102400"),(0,r.yg)("td",{parentName:"tr",align:null},"\u5426"),(0,r.yg)("td",{parentName:"tr",align:null},"\u8bf7\u6c42\u4f53\u6700\u5927\u5927\u5c0f\uff0c\u5355\u4f4dbyte")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"shenyu.apache.org/plugin-spring-cloud-enabled"),(0,r.yg)("td",{parentName:"tr",align:null}),(0,r.yg)("td",{parentName:"tr",align:null},"\u662f"),(0,r.yg)("td",{parentName:"tr",align:null},"\u786e\u5b9a\u662f\u5426\u542f\u52a8springCloud\u63d2\u4ef6")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"shenyu.apache.org/zookeeper-register-address"),(0,r.yg)("td",{parentName:"tr",align:null}),(0,r.yg)("td",{parentName:"tr",align:null},"\u662f"),(0,r.yg)("td",{parentName:"tr",align:null},"\u6307\u5b9azookeeper\u5730\u5740")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"shenyu.apache.org/plugin-spring-cloud-app-name"),(0,r.yg)("td",{parentName:"tr",align:null}),(0,r.yg)("td",{parentName:"tr",align:null},"\u662f"),(0,r.yg)("td",{parentName:"tr",align:null},"\u6307\u5b9a\u5143\u6570\u636e\u7684\u5e94\u7528\u540d\u79f0")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"shenyu.apache.org/plugin-spring-cloud-path"),(0,r.yg)("td",{parentName:"tr",align:null}),(0,r.yg)("td",{parentName:"tr",align:null},"\u662f"),(0,r.yg)("td",{parentName:"tr",align:null},"\u6307\u5b9a\u5143\u6570\u636e\u7684\u8bf7\u6c42\u8def\u5f84")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"shenyu.apache.org/plugin-spring-cloud-rpc-type"),(0,r.yg)("td",{parentName:"tr",align:null}),(0,r.yg)("td",{parentName:"tr",align:null},"\u662f"),(0,r.yg)("td",{parentName:"tr",align:null},"\u6307\u5b9a\u5143\u6570\u636e\u7684rpc\u7c7b\u578b\uff08dubbo\uff0csofa\uff0ctars\uff0cspringCloud\uff0cmotan\uff0cgrpc\uff09")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"shenyu.apache.org/plugin-spring-cloud-service-name"),(0,r.yg)("td",{parentName:"tr",align:null}),(0,r.yg)("td",{parentName:"tr",align:null},"\u662f"),(0,r.yg)("td",{parentName:"tr",align:null},"\u6307\u5b9a\u5143\u6570\u636e\u7684\u63a5\u53e3\u540d\u79f0")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"shenyu.apache.org/plugin-spring-cloud-method-name"),(0,r.yg)("td",{parentName:"tr",align:null}),(0,r.yg)("td",{parentName:"tr",align:null},"\u662f"),(0,r.yg)("td",{parentName:"tr",align:null},"\u6307\u5b9a\u5143\u6570\u636e\u7684\u65b9\u6cd5\u540d\u79f0")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"shenyu.apache.org/plugin-spring-cloud-rpc-expand"),(0,r.yg)("td",{parentName:"tr",align:null}),(0,r.yg)("td",{parentName:"tr",align:null},"\u5426"),(0,r.yg)("td",{parentName:"tr",align:null},"\u6307\u5b9a\u5143\u6570\u636e\u7684rpc\u6269\u5c55\u53c2\u6570\uff08json\u5bf9\u8c61\uff09")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"shenyu.apache.org/plugin-spring-cloud-parameter-types"),(0,r.yg)("td",{parentName:"tr",align:null}),(0,r.yg)("td",{parentName:"tr",align:null},"\u662f"),(0,r.yg)("td",{parentName:"tr",align:null},"\u6307\u5b9a\u5143\u6570\u636e\u7684\u53c2\u6570\u7c7b\u578b")))),(0,r.yg)("h3",{id:"websocket\u63d2\u4ef6"},"WebSocket\u63d2\u4ef6"),(0,r.yg)("table",null,(0,r.yg)("thead",{parentName:"table"},(0,r.yg)("tr",{parentName:"thead"},(0,r.yg)("th",{parentName:"tr",align:null},"\u540d\u79f0"),(0,r.yg)("th",{parentName:"tr",align:null},"\u9ed8\u8ba4\u503c"),(0,r.yg)("th",{parentName:"tr",align:null},"\u662f\u5426\u5fc5\u586b"),(0,r.yg)("th",{parentName:"tr",align:null},"\u8bf4\u660e"))),(0,r.yg)("tbody",{parentName:"table"},(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"shenyu.apache.org/loadbalancer"),(0,r.yg)("td",{parentName:"tr",align:null},"random"),(0,r.yg)("td",{parentName:"tr",align:null},"\u5426"),(0,r.yg)("td",{parentName:"tr",align:null},"\u8d1f\u8f7d\u5747\u8861\u7b97\u6cd5\uff0c\u53ef\u9009hash\u3001random\u3001roundRobin\u3001leastActive\u3001p2c\u3001shortestResponse")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"shenyu.apache.org/retry"),(0,r.yg)("td",{parentName:"tr",align:null},"3"),(0,r.yg)("td",{parentName:"tr",align:null},"\u5426"),(0,r.yg)("td",{parentName:"tr",align:null},"\u5931\u8d25\u91cd\u8bd5\u6b21\u6570")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"shenyu.apache.org/timeout"),(0,r.yg)("td",{parentName:"tr",align:null},"3000"),(0,r.yg)("td",{parentName:"tr",align:null},"\u5426"),(0,r.yg)("td",{parentName:"tr",align:null},"\u540e\u7aef\u8bf7\u6c42\u8d85\u65f6\u65f6\u95f4\uff0c\u5355\u4f4d\u6beb\u79d2")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"shenyu.apache.org/header-max-size"),(0,r.yg)("td",{parentName:"tr",align:null},"10240"),(0,r.yg)("td",{parentName:"tr",align:null},"\u5426"),(0,r.yg)("td",{parentName:"tr",align:null},"\u8bf7\u6c42\u5934\u6700\u5927\u5927\u5c0f\uff0c\u5355\u4f4dbyte")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"shenyu.apache.org/request-max-size"),(0,r.yg)("td",{parentName:"tr",align:null},"102400"),(0,r.yg)("td",{parentName:"tr",align:null},"\u5426"),(0,r.yg)("td",{parentName:"tr",align:null},"\u8bf7\u6c42\u4f53\u6700\u5927\u5927\u5c0f\uff0c\u5355\u4f4dbyte")))))}d.isMDXComponent=!0}}]);