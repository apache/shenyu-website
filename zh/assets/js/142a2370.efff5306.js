"use strict";(self.webpackChunkshenyu_website=self.webpackChunkshenyu_website||[]).push([[98831],{15680:(e,n,r)=>{r.d(n,{xA:()=>d,yg:()=>g});var t=r(96540);function i(e,n,r){return n in e?Object.defineProperty(e,n,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[n]=r,e}function o(e,n){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);n&&(t=t.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),r.push.apply(r,t)}return r}function a(e){for(var n=1;n<arguments.length;n++){var r=null!=arguments[n]?arguments[n]:{};n%2?o(Object(r),!0).forEach((function(n){i(e,n,r[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(r,n))}))}return e}function p(e,n){if(null==e)return{};var r,t,i=function(e,n){if(null==e)return{};var r,t,i={},o=Object.keys(e);for(t=0;t<o.length;t++)r=o[t],n.indexOf(r)>=0||(i[r]=e[r]);return i}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(t=0;t<o.length;t++)r=o[t],n.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(i[r]=e[r])}return i}var u=t.createContext({}),c=function(e){var n=t.useContext(u),r=n;return e&&(r="function"==typeof e?e(n):a(a({},n),e)),r},d=function(e){var n=c(e.components);return t.createElement(u.Provider,{value:n},e.children)},l="mdxType",s={inlineCode:"code",wrapper:function(e){var n=e.children;return t.createElement(t.Fragment,{},n)}},y=t.forwardRef((function(e,n){var r=e.components,i=e.mdxType,o=e.originalType,u=e.parentName,d=p(e,["components","mdxType","originalType","parentName"]),l=c(r),y=i,g=l["".concat(u,".").concat(y)]||l[y]||s[y]||o;return r?t.createElement(g,a(a({ref:n},d),{},{components:r})):t.createElement(g,a({ref:n},d))}));function g(e,n){var r=arguments,i=n&&n.mdxType;if("string"==typeof e||i){var o=r.length,a=new Array(o);a[0]=y;var p={};for(var u in n)hasOwnProperty.call(n,u)&&(p[u]=n[u]);p.originalType=e,p[l]="string"==typeof e?e:i,a[1]=p;for(var c=2;c<o;c++)a[c]=r[c];return t.createElement.apply(null,a)}return t.createElement.apply(null,r)}y.displayName="MDXCreateElement"},44525:(e,n,r)=>{r.r(n),r.d(n,{contentTitle:()=>a,default:()=>l,frontMatter:()=>o,metadata:()=>p,toc:()=>u});var t=r(58168),i=(r(96540),r(15680));const o={title:"Shenyu\u5ba2\u6237\u7aef\u6ce8\u518cAPI\u6587\u6863",keywords:["api doc \u63a5\u53e3 \u6587\u6863 register \u6ce8\u518c"],description:"Shenyu\u5ba2\u6237\u7aef\u6ce8\u518cAPI\u6587\u6863"},a=void 0,p={unversionedId:"user-guide/api-doc/shenyu-annotation-apidoc",id:"version-2.6.1/user-guide/api-doc/shenyu-annotation-apidoc",isDocsHomePage:!1,title:"Shenyu\u5ba2\u6237\u7aef\u6ce8\u518cAPI\u6587\u6863",description:"Shenyu\u5ba2\u6237\u7aef\u6ce8\u518cAPI\u6587\u6863",source:"@site/i18n/zh/docusaurus-plugin-content-docs/version-2.6.1/user-guide/api-doc/shenyu-annotation-apidoc.md",sourceDirName:"user-guide/api-doc",slug:"/user-guide/api-doc/shenyu-annotation-apidoc",permalink:"/zh/docs/2.6.1/user-guide/api-doc/shenyu-annotation-apidoc",editUrl:"https://github.com/apache/shenyu-website/edit/main/i18n/zh/docusaurus-plugin-content-docs/version-2.6.1/user-guide/api-doc/shenyu-annotation-apidoc.md",version:"2.6.1",frontMatter:{title:"Shenyu\u5ba2\u6237\u7aef\u6ce8\u518cAPI\u6587\u6863",keywords:["api doc \u63a5\u53e3 \u6587\u6863 register \u6ce8\u518c"],description:"Shenyu\u5ba2\u6237\u7aef\u6ce8\u518cAPI\u6587\u6863"},sidebar:"version-2.6.0/tutorialSidebar",previous:{title:"Kubernetes \u63a7\u5236\u5668\u914d\u7f6e",permalink:"/zh/docs/2.6.1/user-guide/kubernetes-controller/config"},next:{title:"\u62c9\u53d6swagger\u6ce8\u518cAPI\u6587\u6863",permalink:"/zh/docs/2.6.1/user-guide/api-doc/swagger-apidoc"}},u=[{value:"API\u6587\u6863\u66b4\u9732\u5230\u7f51\u5173",id:"api\u6587\u6863\u66b4\u9732\u5230\u7f51\u5173",children:[]}],c={toc:u},d="wrapper";function l(e){let{components:n,...r}=e;return(0,i.yg)(d,(0,t.A)({},c,r,{components:n,mdxType:"MDXLayout"}),(0,i.yg)("p",null,"\u6b64\u7bc7\u6587\u4ecb\u7ecd\u5982\u4f55\u5c06 ",(0,i.yg)("inlineCode",{parentName:"p"},"API\u6587\u6863")," \u66b4\u9732\u5230 ",(0,i.yg)("inlineCode",{parentName:"p"},"Apache ShenYu")," \u7f51\u5173\u3002"),(0,i.yg)("p",null,"\u63a5\u5165\u524d\uff0c\u8bf7\u6b63\u786e\u542f\u52a8 ",(0,i.yg)("inlineCode",{parentName:"p"},"shenyu-admin"),"\u3002"),(0,i.yg)("h2",{id:"api\u6587\u6863\u66b4\u9732\u5230\u7f51\u5173"},"API\u6587\u6863\u66b4\u9732\u5230\u7f51\u5173"),(0,i.yg)("p",null,"\u53ef\u4ee5\u53c2\u8003",(0,i.yg)("a",{parentName:"p",href:"https://github.com/apache/shenyu/tree/master/shenyu-examples"},"shenyu-examples"),"\u4e0b\u9762\u4efb\u610f\u4e00\u4e2aexample\u7684\u4ee3\u7801\u3002"),(0,i.yg)("p",null,"\u552f\u4e00\u9700\u8981\u505a\u7684\u5c31\u662f\u5728\u4f60\u7684\u670d\u52a1\u4e2d\u7684\u65b0\u589e",(0,i.yg)("inlineCode",{parentName:"p"},"@ApiModule"),"\u548c",(0,i.yg)("inlineCode",{parentName:"p"},"@ApiDoc"),"\u6ce8\u89e3\uff0c\u4ee5\u4e0b\u662f",(0,i.yg)("inlineCode",{parentName:"p"},"shenyu-examples-http"),"\u4e2d\u7684\u4f8b\u5b50:"),(0,i.yg)("pre",null,(0,i.yg)("code",{parentName:"pre",className:"language-java"},'@RestController\n@RequestMapping("/order")\n@ShenyuSpringMvcClient("/order")\n@ApiModule(value = "order")\npublic class OrderController {\n\n    @GetMapping("/findById")\n    @ShenyuSpringMvcClient("/findById")\n    @ApiDoc(desc = "findById")\n    public OrderDTO findById(@RequestParam("id") final String id) {\n        return build(id, "hello world findById");\n    }\n\n    private OrderDTO build(final String id, final String name) {\n        OrderDTO orderDTO = new OrderDTO();\n        orderDTO.setId(id);\n        orderDTO.setName(name);\n        return orderDTO;\n    }\n}\n')))}l.isMDXComponent=!0}}]);