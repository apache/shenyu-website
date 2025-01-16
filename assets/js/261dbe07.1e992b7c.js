"use strict";(self.webpackChunkshenyu_website=self.webpackChunkshenyu_website||[]).push([[74568],{15680:(e,a,n)=>{n.d(a,{xA:()=>l,yg:()=>d});var t=n(96540);function i(e,a,n){return a in e?Object.defineProperty(e,a,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[a]=n,e}function s(e,a){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);a&&(t=t.filter((function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable}))),n.push.apply(n,t)}return n}function r(e){for(var a=1;a<arguments.length;a++){var n=null!=arguments[a]?arguments[a]:{};a%2?s(Object(n),!0).forEach((function(a){i(e,a,n[a])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(n,a))}))}return e}function c(e,a){if(null==e)return{};var n,t,i=function(e,a){if(null==e)return{};var n,t,i={},s=Object.keys(e);for(t=0;t<s.length;t++)n=s[t],a.indexOf(n)>=0||(i[n]=e[n]);return i}(e,a);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(t=0;t<s.length;t++)n=s[t],a.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var o=t.createContext({}),p=function(e){var a=t.useContext(o),n=a;return e&&(n="function"==typeof e?e(a):r(r({},a),e)),n},l=function(e){var a=p(e.components);return t.createElement(o.Provider,{value:a},e.children)},g="mdxType",u={inlineCode:"code",wrapper:function(e){var a=e.children;return t.createElement(t.Fragment,{},a)}},m=t.forwardRef((function(e,a){var n=e.components,i=e.mdxType,s=e.originalType,o=e.parentName,l=c(e,["components","mdxType","originalType","parentName"]),g=p(n),m=i,d=g["".concat(o,".").concat(m)]||g[m]||u[m]||s;return n?t.createElement(d,r(r({ref:a},l),{},{components:n})):t.createElement(d,r({ref:a},l))}));function d(e,a){var n=arguments,i=a&&a.mdxType;if("string"==typeof e||i){var s=n.length,r=new Array(s);r[0]=m;var c={};for(var o in a)hasOwnProperty.call(a,o)&&(c[o]=a[o]);c.originalType=e,c[g]="string"==typeof e?e:i,r[1]=c;for(var p=2;p<s;p++)r[p]=n[p];return t.createElement.apply(null,r)}return t.createElement.apply(null,n)}m.displayName="MDXCreateElement"},86232:(e,a,n)=>{n.r(a),n.d(a,{contentTitle:()=>r,default:()=>g,frontMatter:()=>s,metadata:()=>c,toc:()=>o});var t=n(58168),i=(n(96540),n(15680));const s={},r="Namespace Management",c={unversionedId:"user-guide/admin-usage/namepsace",id:"version-2.7.0/user-guide/admin-usage/namepsace",isDocsHomePage:!1,title:"Namespace Management",description:"1. Background and Explanation",source:"@site/versioned_docs/version-2.7.0/user-guide/admin-usage/namepsace.md",sourceDirName:"user-guide/admin-usage",slug:"/user-guide/admin-usage/namepsace",permalink:"/docs/user-guide/admin-usage/namepsace",editUrl:"https://github.com/apache/shenyu-website/edit/main/versioned_docs/version-2.7.0/user-guide/admin-usage/namepsace.md",version:"2.7.0",frontMatter:{},sidebar:"version-2.7.0/tutorialSidebar",previous:{title:"Dictionary Management",permalink:"/docs/user-guide/admin-usage/dictionary-management"},next:{title:"Plugin Config",permalink:"/docs/user-guide/admin-usage/plugin-handle-explanation"}},o=[{value:"1. Background and Explanation",id:"1-background-and-explanation",children:[]},{value:"2.Namespace Creation and Enablement",id:"2namespace-creation-and-enablement",children:[{value:"1.Create a New Namespace",id:"1create-a-new-namespace",children:[]},{value:"2.Configure Namespace for Downstream Services (shenyu-client)",id:"2configure-namespace-for-downstream-services-shenyu-client",children:[]},{value:"3.Manage Data the Namespace",id:"3manage-data-the-namespace",children:[]},{value:"4.Configure Namespace for Gateway (bootstrap)",id:"4configure-namespace-for-gateway-bootstrap",children:[]}]},{value:"3.Plugin Management",id:"3plugin-management",children:[{value:"1.Add a New Plugin",id:"1add-a-new-plugin",children:[]},{value:"2.Switch Namespace",id:"2switch-namespace",children:[]},{value:"3.Other Gateway Data Management",id:"3other-gateway-data-management",children:[]}]},{value:"3.Important Changes",id:"3important-changes",children:[]}],p={toc:o},l="wrapper";function g(e){let{components:a,...n}=e;return(0,i.yg)(l,(0,t.A)({},p,n,{components:a,mdxType:"MDXLayout"}),(0,i.yg)("h1",{id:"namespace-management"},"Namespace Management"),(0,i.yg)("h2",{id:"1-background-and-explanation"},"1. Background and Explanation"),(0,i.yg)("p",null,"Currently, when managing gateways for different business line needs, multiple sets of ShenYu Admin and ShenYu Gateway are often deployed simultaneously. To ensure data independence, each gateway usually connects to only one ShenYu Admin. However, this architecture increases user and operational costs. To provide a more convenient user experience, ShenYu Admin introduces namespaces for data isolation, allowing management of gateway data across different business lines with just one set of ShenYu Admin and ShenYu Bootstrap services."),(0,i.yg)("p",null,"Note: To facilitate usage, a default namespace already exists in the system; please do not manually delete the default namespace records in the database."),(0,i.yg)("h2",{id:"2namespace-creation-and-enablement"},"2.Namespace Creation and Enablement"),(0,i.yg)("h3",{id:"1create-a-new-namespace"},"1.Create a New Namespace"),(0,i.yg)("p",null,"Users log into the ShenYu Admin backend and select \u3010Basic Config - Namespace\u3011."),(0,i.yg)("img",{src:"/img/shenyu/basicConfig/namespace/namespace-manager-en.png",width:"80%",height:"50%"}),(0,i.yg)("p",null,"In the namespace management module, click Add Data to create a new namespace. Simply fill in the \u3010Name\u3011 and \u3010Description\u3011 fields; the system will automatically generate a namespaceId."),(0,i.yg)("img",{src:"/img/shenyu/basicConfig/namespace/namespace-add-en.png",width:"80%",height:"50%"}),(0,i.yg)("p",null,"After successful creation, a unique namespaceId will be automatically generated."),(0,i.yg)("img",{src:"/img/shenyu/basicConfig/namespace/namespace-Id-en.png",width:"80%",height:"50%"}),(0,i.yg)("h3",{id:"2configure-namespace-for-downstream-services-shenyu-client"},"2.Configure Namespace for Downstream Services (shenyu-client)"),(0,i.yg)("p",null,"Once you have the namespaceId, you can configure it in the downstream services (already integrated with shenyu-client) in the configuration file to use one or more namespaceIds.(Multiple namespaceIds should be separated by \u201c,\u201d)"),(0,i.yg)("img",{src:"/img/shenyu/basicConfig/namespace/namespace-shenyu-client.png",width:"80%",height:"50%"}),(0,i.yg)("h3",{id:"3manage-data-the-namespace"},"3.Manage Data the Namespace"),(0,i.yg)("p",null,"Once data from Shenyu-client is registered under the specified namespace in Shenyu-admin, the backend management supports isolated gateway data. Users can switch between different namespaces for operations via the button in the upper right corner."),(0,i.yg)("img",{src:"/img/shenyu/basicConfig/namespace/namespace-divide-en.png",width:"80%",height:"50%"}),(0,i.yg)("h3",{id:"4configure-namespace-for-gateway-bootstrap"},"4.Configure Namespace for Gateway (bootstrap)"),(0,i.yg)("p",null,"Note: A gateway can only bind to a single unique namespaceId"),(0,i.yg)("img",{src:"/img/shenyu/basicConfig/namespace/namespace-bootstrap.png",width:"80%",height:"50%"}),(0,i.yg)("h2",{id:"3plugin-management"},"3.Plugin Management"),(0,i.yg)("h3",{id:"1add-a-new-plugin"},"1.Add a New Plugin"),(0,i.yg)("p",null,"The plugin group under a new namespace is empty by default. To add a plugin to a namespace, you first need to select the option to generate it under the specific namespace in the plugin template."),(0,i.yg)("p",null,"Choose \u3010PluginTemplate\u3011-\u3010Generate\u3011-\u3010Select Target Namespace\u3011"),(0,i.yg)("img",{src:"/img/shenyu/basicConfig/namespace/namespace-generate-plugin-en.png",width:"80%",height:"50%"}),(0,i.yg)("h3",{id:"2switch-namespace"},"2.Switch Namespace"),(0,i.yg)("p",null,"Switch namespaces via the component in the top-right corner."),(0,i.yg)("img",{src:"/img/shenyu/basicConfig/namespace/namespace-change-en.png",width:"80%",height:"50%"}),(0,i.yg)("p",null,"This allows you to manage the plugin status within the current namespace."),(0,i.yg)("img",{src:"/img/shenyu/basicConfig/namespace/namespace-new-plugin-en.png",width:"80%",height:"50%"}),(0,i.yg)("h3",{id:"3other-gateway-data-management"},"3.Other Gateway Data Management"),(0,i.yg)("p",null,"Pages that display the namespace switch component in the top-right corner support namespace isolation. By switching namespaces via the component, you can manage gateway data for a specific namespace."),(0,i.yg)("img",{src:"/img/shenyu/basicConfig/namespace/namespace-other-data-en.png",width:"80%",height:"50%"}),(0,i.yg)("h2",{id:"3important-changes"},"3.Important Changes"),(0,i.yg)("h4",{id:"1-the-concept-of-plugins-in-the-old-version-has-changed-to-plugin-templates-the-current-plugin-model-is-now-under-the-namespace-while-in-the-database-plugin-templates-correspond-to-the-plugin-table-and-plugins-correspond-to-the-namespace_plugin_rel-table"},"1. The concept of Plugins in the old version has changed to Plugin Templates. The current Plugin model is now under the namespace, while in the database, Plugin Templates correspond to the plugin table, and Plugins correspond to the namespace_plugin_rel table."),(0,i.yg)("h4",{id:"2-the-apidoc-module-has-been-decoupled-from-selectors-rules-etc"},"2. The Apidoc module has been decoupled from selectors, Rules, etc."))}g.isMDXComponent=!0}}]);