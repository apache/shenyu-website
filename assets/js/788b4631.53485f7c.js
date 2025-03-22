"use strict";(self.webpackChunkshenyu_website=self.webpackChunkshenyu_website||[]).push([[4394],{15680:(e,t,n)=>{n.d(t,{xA:()=>c,yg:()=>y});var r=n(96540);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var p=r.createContext({}),s=function(e){var t=r.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},c=function(e){var t=s(e.components);return r.createElement(p.Provider,{value:t},e.children)},u="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,i=e.mdxType,a=e.originalType,p=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),u=s(n),d=i,y=u["".concat(p,".").concat(d)]||u[d]||m[d]||a;return n?r.createElement(y,o(o({ref:t},c),{},{components:n})):r.createElement(y,o({ref:t},c))}));function y(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var a=n.length,o=new Array(a);o[0]=d;var l={};for(var p in t)hasOwnProperty.call(t,p)&&(l[p]=t[p]);l.originalType=e,l[u]="string"==typeof e?e:i,o[1]=l;for(var s=2;s<a;s++)o[s]=n[s];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},37413:(e,t,n)=>{n.r(t),n.d(t,{contentTitle:()=>o,default:()=>u,frontMatter:()=>a,metadata:()=>l,toc:()=>p});var r=n(58168),i=(n(96540),n(15680));const a={title:"Custom Rate Limiter",keywords:["RateLimiter"],description:"Custom Rate Limiter"},o=void 0,l={unversionedId:"developer/spi/custom-rate-limiter",id:"version-2.7.0/developer/spi/custom-rate-limiter",isDocsHomePage:!1,title:"Custom Rate Limiter",description:"Custom Rate Limiter",source:"@site/versioned_docs/version-2.7.0/developer/spi/custom-rate-limiter.md",sourceDirName:"developer/spi",slug:"/developer/spi/custom-rate-limiter",permalink:"/docs/developer/spi/custom-rate-limiter",editUrl:"https://github.com/apache/shenyu-website/edit/main/versioned_docs/version-2.7.0/developer/spi/custom-rate-limiter.md",version:"2.7.0",frontMatter:{title:"Custom Rate Limiter",keywords:["RateLimiter"],description:"Custom Rate Limiter"},sidebar:"version-2.7.0/tutorialSidebar",previous:{title:"Custom Predicate Judge",permalink:"/docs/developer/spi/custom-predicate-judge"},next:{title:"Custom Filter",permalink:"/docs/developer/custom-filter"}},p=[{value:"Explanation",id:"explanation",children:[]},{value:"Extension",id:"extension",children:[]}],s={toc:p},c="wrapper";function u(e){let{components:t,...n}=e;return(0,i.yg)(c,(0,r.A)({},s,n,{components:t,mdxType:"MDXLayout"}),(0,i.yg)("h2",{id:"explanation"},"Explanation"),(0,i.yg)("ul",null,(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("p",{parentName:"li"},"Before custom development, please customize and build the gateway environment first, please refer to: ",(0,i.yg)("a",{parentName:"p",href:"/docs/deployment/deployment-custom"},"custom deployment"),".")),(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("p",{parentName:"li"},"This article describes how to customize the extension of ",(0,i.yg)("inlineCode",{parentName:"p"},"org.apache.shenyu.plugin.ratelimiter.algorithm.RateLimiterAlgorithm")," ."))),(0,i.yg)("h2",{id:"extension"},"Extension"),(0,i.yg)("ul",null,(0,i.yg)("li",{parentName:"ul"},"Create a new project and introduce the following dependencies:")),(0,i.yg)("pre",null,(0,i.yg)("code",{parentName:"pre",className:"language-xml"},"<dependencies>\n    <dependency>\n        <groupId>org.apache.shenyu</groupId>\n        <artifactId>shenyu-plugin-base</artifactId>\n        <version>${project.version}</version>\n    </dependency>\n</dependencies>\n")),(0,i.yg)("ul",null,(0,i.yg)("li",{parentName:"ul"},"Create a new class ",(0,i.yg)("inlineCode",{parentName:"li"},"${you class}"),", implements ",(0,i.yg)("inlineCode",{parentName:"li"},"org.apache.shenyu.plugin.ratelimiter.algorithm.RateLimiterAlgorithm"))),(0,i.yg)("pre",null,(0,i.yg)("code",{parentName:"pre",className:"language-java"},"public class ${you class} implements RateLimiterAlgorithm<T> {\n   \n    /**\n     * Gets script.\n     *\n     * @return the script\n     */\n    public RedisScript<T> getScript() {\n        //coding and return\n    }   \n    \n    /**\n     * Gets keys.\n     *\n     * @param id the id\n     * @return the keys\n     */\n    public List<String> getKeys(String id) {\n        //coding and return\n    }\n    \n    /**\n     * Callback string.\n     *\n     * @param script the script\n     * @param keys the keys\n     * @param scriptArgs the script args\n     */\n    public void callback(final RedisScript<?> script, final List<String> keys, final List<String> scriptArgs) {\n        //coding and return\n    }\n}\n")),(0,i.yg)("ul",null,(0,i.yg)("li",{parentName:"ul"},"In the project  ",(0,i.yg)("inlineCode",{parentName:"li"},"resources")," directory\uff0cCreate a new ",(0,i.yg)("inlineCode",{parentName:"li"},"META-INF/shenyu")," directory\uff0c and the new file name is : ",(0,i.yg)("inlineCode",{parentName:"li"},"org.apache.shenyu.plugin.ratelimiter.algorithm.RateLimiterAlgorithm"),".\nadd ",(0,i.yg)("inlineCode",{parentName:"li"},"${you spi name}")," = ",(0,i.yg)("inlineCode",{parentName:"li"},"${you class path}"),":")),(0,i.yg)("pre",null,(0,i.yg)("code",{parentName:"pre"},"${you spi name} = ${you class path}\n")),(0,i.yg)("ul",null,(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("p",{parentName:"li"},"Package the project and copy it to the ",(0,i.yg)("inlineCode",{parentName:"p"},"lib")," or ",(0,i.yg)("inlineCode",{parentName:"p"},"ext-lib")," directory of the gateway (bootstrap-bin).")),(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("p",{parentName:"li"},"In the ",(0,i.yg)("inlineCode",{parentName:"p"},"Admin")," service ---\x3e BasicConfig ---\x3e Dictionary ,  Find the dictionary code as ",(0,i.yg)("inlineCode",{parentName:"p"},"ALGORITHM_*"),", add a new piece of data, pay attention to the dictionary name: ",(0,i.yg)("inlineCode",{parentName:"p"},"${you spi name}"),"."))),(0,i.yg)("img",{src:"/img/shenyu/custom/custom-rate-limiter-en.jpg",width:"40%",height:"30%"}),(0,i.yg)("ul",null,(0,i.yg)("li",{parentName:"ul"},"Or execute the following custom ",(0,i.yg)("inlineCode",{parentName:"li"},"SQL")," statement\uff1a")),(0,i.yg)("pre",null,(0,i.yg)("code",{parentName:"pre",className:"language-sql"},"INSERT IGNORE INTO `shenyu_dict` (\n        `id`,\n        `type`,\n        `dict_code`,\n        `dict_name`,\n        `dict_value`,\n        `desc`,\n        `sort`,\n        `enabled`,\n        `date_created`,\n        `date_updated`\n    )\nVALUES (\n        'you id',\n        'matchMode',\n        'MATCH_MODE',\n        'you spi name',\n        'you value',\n        'you spi name',\n        0,\n        1,\n        '2021-08-30 19:29:10',\n        '2021-08-30 20:15:23'\n    );\n")))}u.isMDXComponent=!0}}]);