"use strict";(self.webpackChunkshenyu_website=self.webpackChunkshenyu_website||[]).push([[85446],{3905:(e,n,t)=>{t.d(n,{Zo:()=>u,kt:()=>d});var r=t(67294);function i(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function a(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function o(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?a(Object(t),!0).forEach((function(n){i(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):a(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function s(e,n){if(null==e)return{};var t,r,i=function(e,n){if(null==e)return{};var t,r,i={},a=Object.keys(e);for(r=0;r<a.length;r++)t=a[r],n.indexOf(t)>=0||(i[t]=e[t]);return i}(e,n);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)t=a[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(i[t]=e[t])}return i}var l=r.createContext({}),c=function(e){var n=r.useContext(l),t=n;return e&&(t="function"==typeof e?e(n):o(o({},n),e)),t},u=function(e){var n=c(e.components);return r.createElement(l.Provider,{value:n},e.children)},p="mdxType",m={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},g=r.forwardRef((function(e,n){var t=e.components,i=e.mdxType,a=e.originalType,l=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),p=c(t),g=i,d=p["".concat(l,".").concat(g)]||p[g]||m[g]||a;return t?r.createElement(d,o(o({ref:n},u),{},{components:t})):r.createElement(d,o({ref:n},u))}));function d(e,n){var t=arguments,i=n&&n.mdxType;if("string"==typeof e||i){var a=t.length,o=new Array(a);o[0]=g;var s={};for(var l in n)hasOwnProperty.call(n,l)&&(s[l]=n[l]);s.originalType=e,s[p]="string"==typeof e?e:i,o[1]=s;for(var c=2;c<a;c++)o[c]=t[c];return r.createElement.apply(null,o)}return r.createElement.apply(null,t)}g.displayName="MDXCreateElement"},50387:(e,n,t)=>{t.r(n),t.d(n,{contentTitle:()=>o,default:()=>p,frontMatter:()=>a,metadata:()=>s,toc:()=>l});var r=t(87462),i=(t(67294),t(3905));const a={title:"Custom Sign Algorithm",keywords:["Custom Sign"],description:"specify sign plugins for examination"},o=void 0,s={unversionedId:"developer/custom-sign-algorithm",id:"version-2.5.1/developer/custom-sign-algorithm",isDocsHomePage:!1,title:"Custom Sign Algorithm",description:"specify sign plugins for examination",source:"@site/versioned_docs/version-2.5.1/developer/custom-sign-algorithm.md",sourceDirName:"developer",slug:"/developer/custom-sign-algorithm",permalink:"/docs/2.5.1/developer/custom-sign-algorithm",editUrl:"https://github.com/apache/shenyu-website/edit/main/versioned_docs/version-2.5.1/developer/custom-sign-algorithm.md",version:"2.5.1",frontMatter:{title:"Custom Sign Algorithm",keywords:["Custom Sign"],description:"specify sign plugins for examination"},sidebar:"version-2.5.1/tutorialSidebar",previous:{title:"Custom Response",permalink:"/docs/2.5.1/developer/custom-result"},next:{title:"A multilingual HTTP client",permalink:"/docs/2.5.1/developer/developer-shenyu-client"}},l=[{value:"Description",id:"description",children:[]},{value:"Extension",id:"extension",children:[]}],c={toc:l},u="wrapper";function p(e){let{components:n,...t}=e;return(0,i.kt)(u,(0,r.Z)({},c,t,{components:n,mdxType:"MDXLayout"}),(0,i.kt)("h2",{id:"description"},"Description"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Users can customize the signature authentication algorithm to achieve verification.")),(0,i.kt)("h2",{id:"extension"},"Extension"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"The default implementation is ",(0,i.kt)("inlineCode",{parentName:"li"},"org.apache.shenyu.plugin.sign.service.ComposableSignService"),".",(0,i.kt)("pre",{parentName:"li"},(0,i.kt)("code",{parentName:"pre",className:"language-java"},"@Bean\n@ConditionalOnMissingBean(value = SignService.class, search = SearchStrategy.ALL)\npublic SignService signService() {\n    return new ComposableSignService(new DefaultExtractor(), new DefaultSignProvider());\n}\n"))),(0,i.kt)("li",{parentName:"ul"},"Declare a new class named ",(0,i.kt)("inlineCode",{parentName:"li"},"CustomSignService")," and implements  ",(0,i.kt)("inlineCode",{parentName:"li"},"org.apache.shenyu.plugin.plugin.sign.service"),".")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-java"},"public interface SignService {\n\n    /**\n     * Gets verifyResult.\n     * @param exchange exchange\n     * @param requestBody requestBody\n     * @return result\n     */\n    VerifyResult signatureVerify(ServerWebExchange exchange, String requestBody);\n\n    /**\n     * Gets verifyResult.\n     * @param exchange exchange\n     * @return result\n     */\n    VerifyResult signatureVerify(ServerWebExchange exchange);\n}\n\n\n")),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"When returning is ",(0,i.kt)("inlineCode",{parentName:"li"},"isSuccess()")," of VerifyResult, the sign verification passes. If there's false, the ",(0,i.kt)("inlineCode",{parentName:"li"},"getReason()")," of VerifyResult will be return to the frontend to show."),(0,i.kt)("li",{parentName:"ul"},"Register defined class as a Spring Bean.")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-java"},"   @Bean\n   public SignService customSignService() {\n         return new CustomSignService();\n   }\n")))}p.isMDXComponent=!0}}]);