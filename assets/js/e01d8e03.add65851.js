"use strict";(self.webpackChunkshenyu_website=self.webpackChunkshenyu_website||[]).push([[85497],{15680:(e,n,t)=>{t.d(n,{xA:()=>c,yg:()=>g});var r=t(96540);function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function o(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function s(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?o(Object(t),!0).forEach((function(n){a(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function i(e,n){if(null==e)return{};var t,r,a=function(e,n){if(null==e)return{};var t,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var l=r.createContext({}),u=function(e){var n=r.useContext(l),t=n;return e&&(t="function"==typeof e?e(n):s(s({},n),e)),t},c=function(e){var n=u(e.components);return r.createElement(l.Provider,{value:n},e.children)},p="mdxType",d={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},m=r.forwardRef((function(e,n){var t=e.components,a=e.mdxType,o=e.originalType,l=e.parentName,c=i(e,["components","mdxType","originalType","parentName"]),p=u(t),m=a,g=p["".concat(l,".").concat(m)]||p[m]||d[m]||o;return t?r.createElement(g,s(s({ref:n},c),{},{components:t})):r.createElement(g,s({ref:n},c))}));function g(e,n){var t=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var o=t.length,s=new Array(o);s[0]=m;var i={};for(var l in n)hasOwnProperty.call(n,l)&&(i[l]=n[l]);i.originalType=e,i[p]="string"==typeof e?e:a,s[1]=i;for(var u=2;u<o;u++)s[u]=t[u];return r.createElement.apply(null,s)}return r.createElement.apply(null,t)}m.displayName="MDXCreateElement"},16444:(e,n,t)=>{t.r(n),t.d(n,{contentTitle:()=>s,default:()=>p,frontMatter:()=>o,metadata:()=>i,toc:()=>l});var r=t(58168),a=(t(96540),t(15680));const o={sidebar_position:5,title:"Custom Response",keywords:["soul"],description:"customising response structure"},s=void 0,i={unversionedId:"developer-guide/custom-result",id:"version-2.3.0-Legacy/developer-guide/custom-result",isDocsHomePage:!1,title:"Custom Response",description:"customising response structure",source:"@site/versioned_docs/version-2.3.0-Legacy/developer-guide/custom-result.md",sourceDirName:"developer-guide",slug:"/developer-guide/custom-result",permalink:"/docs/2.3.0-Legacy/developer-guide/custom-result",editUrl:"https://github.com/apache/shenyu-website/edit/main/versioned_docs/version-2.3.0-Legacy/developer-guide/custom-result.md",version:"2.3.0-Legacy",sidebarPosition:5,frontMatter:{sidebar_position:5,title:"Custom Response",keywords:["soul"],description:"customising response structure"},sidebar:"version-2.3.0-Legacy/tutorialSidebar",previous:{title:"Fetching Correct IP Address And Host",permalink:"/docs/2.3.0-Legacy/developer-guide/custom-parsing-ip-and-host"},next:{title:"Custom Sign Algorithm",permalink:"/docs/2.3.0-Legacy/developer-guide/custom-sign-algorithm"}},l=[{value:"Description",id:"description",children:[]},{value:"Default Implementation",id:"default-implementation",children:[]},{value:"Extensions",id:"extensions",children:[]}],u={toc:l},c="wrapper";function p(e){let{components:n,...t}=e;return(0,a.yg)(c,(0,r.A)({},u,t,{components:n,mdxType:"MDXLayout"}),(0,a.yg)("h2",{id:"description"},"Description"),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},"This doc offers examples for customising response structure."),(0,a.yg)("li",{parentName:"ul"},"The response body structure in gateways should be unified, it is recommended for specify yours. ")),(0,a.yg)("h2",{id:"default-implementation"},"Default Implementation"),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},"The default implementation class is ",(0,a.yg)("inlineCode",{parentName:"li"},"org.dromara.soul.plugin.api.result.DefaultSoulResult"),"."),(0,a.yg)("li",{parentName:"ul"},"Following is the response structure.")),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-java"},"public class SoulDefaultEntity implements Serializable {\n\n    private static final long serialVersionUID = -2792556188993845048L;\n\n    private Integer code;\n\n    private String message;\n\n    private Object data;\n\n}\n")),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},"The returned json as follows:")),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-json"},'{\n    "code": -100, //response code,\n    "message": "\u60a8\u7684\u53c2\u6570\u9519\u8bef,\u8bf7\u68c0\u67e5\u76f8\u5173\u6587\u6863!", //hint messages\n    "data": null  // business data\n}\n')),(0,a.yg)("h2",{id:"extensions"},"Extensions"),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},'Declare a new class named "A" and implements ',(0,a.yg)("inlineCode",{parentName:"li"},"org.dromara.soul.plugin.api.result.SoulResult"))),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-java"}," public interface SoulResult<T> {\n \n     /**\n      * Success t.\n      *\n      * @param code    the code\n      * @param message the message\n      * @param object  the object\n      * @return the t\n      */\n     T success(int code, String message, Object object);\n\n     /**\n      * Error t.\n      *\n      * @param code    the code\n      * @param message the message\n      * @param object  the object\n      * @return the t\n      */\n     T error(int code, String message, Object object);\n }\n\n")),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("inlineCode",{parentName:"li"},"T")," is a generic parameter for your response data."),(0,a.yg)("li",{parentName:"ul"},"Register defined class as a Spring Bean.")),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-java"},"    @Bean\n    public SoulResult a() {\n          return new A();\n    }\n")))}p.isMDXComponent=!0}}]);