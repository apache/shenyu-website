"use strict";(self.webpackChunkshenyu_website=self.webpackChunkshenyu_website||[]).push([[82540],{15680:(e,n,t)=>{t.d(n,{xA:()=>c,yg:()=>g});var r=t(96540);function o(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function a(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function l(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?a(Object(t),!0).forEach((function(n){o(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):a(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function i(e,n){if(null==e)return{};var t,r,o=function(e,n){if(null==e)return{};var t,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)t=a[r],n.indexOf(t)>=0||(o[t]=e[t]);return o}(e,n);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)t=a[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var p=r.createContext({}),s=function(e){var n=r.useContext(p),t=n;return e&&(t="function"==typeof e?e(n):l(l({},n),e)),t},c=function(e){var n=s(e.components);return r.createElement(p.Provider,{value:n},e.children)},u="mdxType",y={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},d=r.forwardRef((function(e,n){var t=e.components,o=e.mdxType,a=e.originalType,p=e.parentName,c=i(e,["components","mdxType","originalType","parentName"]),u=s(t),d=o,g=u["".concat(p,".").concat(d)]||u[d]||y[d]||a;return t?r.createElement(g,l(l({ref:n},c),{},{components:t})):r.createElement(g,l({ref:n},c))}));function g(e,n){var t=arguments,o=n&&n.mdxType;if("string"==typeof e||o){var a=t.length,l=new Array(a);l[0]=d;var i={};for(var p in n)hasOwnProperty.call(n,p)&&(i[p]=n[p]);i.originalType=e,i[u]="string"==typeof e?e:o,l[1]=i;for(var s=2;s<a;s++)l[s]=t[s];return r.createElement.apply(null,l)}return r.createElement.apply(null,t)}d.displayName="MDXCreateElement"},53365:(e,n,t)=>{t.r(n),t.d(n,{contentTitle:()=>l,default:()=>u,frontMatter:()=>a,metadata:()=>i,toc:()=>p});var r=t(58168),o=(t(96540),t(15680));const a={description:"Consul",sidebar_position:5,title:"Consul Example"},l="Consul Registration get start",i={unversionedId:"consul",id:"version-1.0.0/consul",isDocsHomePage:!1,title:"Consul Example",description:"Consul",source:"@site/shenyuClientDotnet_versioned_docs/version-1.0.0/consul.md",sourceDirName:".",slug:"/consul",permalink:"/shenyuClientDotnet/consul",version:"1.0.0",lastUpdatedBy:"xcsnx",lastUpdatedAt:1736768815,formattedLastUpdatedAt:"1/13/2025",sidebarPosition:5,frontMatter:{description:"Consul",sidebar_position:5,title:"Consul Example"},sidebar:"version-1.0.0/tutorialSidebar",previous:{title:"Etcd Example",permalink:"/shenyuClientDotnet/etcd"}},p=[{value:"ASP.NET Core project",id:"aspnet-core-project",children:[]}],s={toc:p},c="wrapper";function u(e){let{components:n,...t}=e;return(0,o.yg)(c,(0,r.A)({},s,t,{components:n,mdxType:"MDXLayout"}),(0,o.yg)("h1",{id:"consul-registration-get-start"},"Consul Registration get start"),(0,o.yg)("h2",{id:"aspnet-core-project"},"ASP.NET Core project"),(0,o.yg)("p",null,"For ASP.NET Core project, we can refer to the example code at ",(0,o.yg)("a",{parentName:"p",href:"https://github.com/apache/shenyu-client-dotnet/tree/main/examples/AspNetCoreExample"},"example code"),". What you need to do is quite\nsimple and straightforward."),(0,o.yg)("ol",null,(0,o.yg)("li",{parentName:"ol"},"add the Shenyu ASP.NET Core dependency into project.")),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-shell"},"dotnet add package Apache.ShenYu.AspNetCore\n")),(0,o.yg)("ol",{start:2},(0,o.yg)("li",{parentName:"ol"},"in ",(0,o.yg)("inlineCode",{parentName:"li"},"Startup.ConfigureServices")," method, add the ",(0,o.yg)("inlineCode",{parentName:"li"},"ShenyuRegister")," service.")),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-c#"},"public void ConfigureServices(IServiceCollection services)\n{\n    ...\n    services.AddShenyuRegister(this.Configuration);\n    ...\n}\n")),(0,o.yg)("ol",{start:3},(0,o.yg)("li",{parentName:"ol"},"set your ",(0,o.yg)("inlineCode",{parentName:"li"},"Shenyu")," configurations in ",(0,o.yg)("inlineCode",{parentName:"li"},"appsettings.json"),".")),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-json"},'{\n  "Shenyu": {\n    "Register": {\n      "RegisterType": "consul",\n      "ServerList": "localhost:8500",\n      "Props": {\n        "Id": "shenyuAdmin",\n        "Name": "shenyuAdmin",\n        "Tags": "test1,test2",\n        "Port": 8500,\n        "EnableTagOverride": false,\n        "Token": ""\n      }\n    },\n    "Client": {\n      "AppName": "dotnet-example",\n      "ContextPath": "/dotnet",\n      "IsFull": false,\n      "ClientType": "http"\n    }\n  }\n}\n')),(0,o.yg)("ol",{start:4},(0,o.yg)("li",{parentName:"ol"},"enable calling via ip.")),(0,o.yg)("p",null,"When running on your local machine, ASP.NET Core service can only be called from ",(0,o.yg)("inlineCode",{parentName:"p"},"localhost"),". To enable calling by IP,\nyou can replace ",(0,o.yg)("inlineCode",{parentName:"p"},"https://localhost:{port};http://localhost:{port}")," with ",(0,o.yg)("inlineCode",{parentName:"p"},"https://*:{port};http://*:{port}")),(0,o.yg)("p",null,"Setting by environment variables ",(0,o.yg)("inlineCode",{parentName:"p"},"ASPNETCORE_URLS"),". e.g. ",(0,o.yg)("inlineCode",{parentName:"p"},'ASPNETCORE_URLS "http://*:5000"')),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-shell"},"export ASPNETCORE_URLS=http://+:5000\n")),(0,o.yg)("ol",{start:5},(0,o.yg)("li",{parentName:"ol"},"start the application.")),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-shell"},"# build project\ndotnet build --configuration Release\n# start project\ncd examples/AspNetCoreExample/bin/Release/netcoreapp3.1\ndotnet AspNetCoreExample.dll\n")),(0,o.yg)("p",null,"That's all! After finished above steps, you can start your project in IDE or below commands and you can\nvisit ",(0,o.yg)("inlineCode",{parentName:"p"},"shenyu-admin")," portal to see the APIs have been registered in Shenyu."))}u.isMDXComponent=!0}}]);