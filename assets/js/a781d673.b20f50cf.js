"use strict";(self.webpackChunkshenyu_website=self.webpackChunkshenyu_website||[]).push([[48894],{15680:(e,n,r)=>{r.d(n,{xA:()=>g,yg:()=>p});var t=r(96540);function o(e,n,r){return n in e?Object.defineProperty(e,n,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[n]=r,e}function a(e,n){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);n&&(t=t.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),r.push.apply(r,t)}return r}function i(e){for(var n=1;n<arguments.length;n++){var r=null!=arguments[n]?arguments[n]:{};n%2?a(Object(r),!0).forEach((function(n){o(e,n,r[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(r,n))}))}return e}function s(e,n){if(null==e)return{};var r,t,o=function(e,n){if(null==e)return{};var r,t,o={},a=Object.keys(e);for(t=0;t<a.length;t++)r=a[t],n.indexOf(r)>=0||(o[r]=e[r]);return o}(e,n);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(t=0;t<a.length;t++)r=a[t],n.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var u=t.createContext({}),l=function(e){var n=t.useContext(u),r=n;return e&&(r="function"==typeof e?e(n):i(i({},n),e)),r},g=function(e){var n=l(e.components);return t.createElement(u.Provider,{value:n},e.children)},m="mdxType",d={inlineCode:"code",wrapper:function(e){var n=e.children;return t.createElement(t.Fragment,{},n)}},c=t.forwardRef((function(e,n){var r=e.components,o=e.mdxType,a=e.originalType,u=e.parentName,g=s(e,["components","mdxType","originalType","parentName"]),m=l(r),c=o,p=m["".concat(u,".").concat(c)]||m[c]||d[c]||a;return r?t.createElement(p,i(i({ref:n},g),{},{components:r})):t.createElement(p,i({ref:n},g))}));function p(e,n){var r=arguments,o=n&&n.mdxType;if("string"==typeof e||o){var a=r.length,i=new Array(a);i[0]=c;var s={};for(var u in n)hasOwnProperty.call(n,u)&&(s[u]=n[u]);s.originalType=e,s[m]="string"==typeof e?e:o,i[1]=s;for(var l=2;l<a;l++)i[l]=r[l];return t.createElement.apply(null,i)}return t.createElement.apply(null,r)}c.displayName="MDXCreateElement"},11449:(e,n,r)=>{r.r(n),r.d(n,{contentTitle:()=>i,default:()=>m,frontMatter:()=>a,metadata:()=>s,toc:()=>u});var t=r(58168),o=(r(96540),r(15680));const a={title:"Role Management",keywords:["user role resource"],description:"user role resource permission management"},i=void 0,s={unversionedId:"user-guide/admin-usage/role-management",id:"version-2.6.1/user-guide/admin-usage/role-management",isDocsHomePage:!1,title:"Role Management",description:"user role resource permission management",source:"@site/versioned_docs/version-2.6.1/user-guide/admin-usage/role-management.md",sourceDirName:"user-guide/admin-usage",slug:"/user-guide/admin-usage/role-management",permalink:"/docs/2.6.1/user-guide/admin-usage/role-management",editUrl:"https://github.com/apache/shenyu-website/edit/main/versioned_docs/version-2.6.1/user-guide/admin-usage/role-management.md",version:"2.6.1",frontMatter:{title:"Role Management",keywords:["user role resource"],description:"user role resource permission management"},sidebar:"version-2.6.0/tutorialSidebar",previous:{title:"Plugin Config",permalink:"/docs/2.6.1/user-guide/admin-usage/plugin-handle-explanation"},next:{title:"Selector And Rule Config",permalink:"/docs/2.6.1/user-guide/admin-usage/selector-and-rule"}},u=[{value:"Resource",id:"resource",children:[]},{value:"Role",id:"role",children:[]},{value:"User",id:"user",children:[]}],l={toc:u},g="wrapper";function m(e){let{components:n,...r}=e;return(0,o.yg)(g,(0,t.A)({},l,r,{components:n,mdxType:"MDXLayout"}),(0,o.yg)("p",null,"This article focuses on the ",(0,o.yg)("inlineCode",{parentName:"p"},"admin")," console to manage ",(0,o.yg)("inlineCode",{parentName:"p"},"admin")," operation permissions through user-associated roles, roles that give permissions to resources such as menus and buttons."),(0,o.yg)("img",{src:"/img/shenyu/basicConfig/roleManagement/role-profile-en.jpg",width:"80%",height:"50%"}),(0,o.yg)("h2",{id:"resource"},"Resource"),(0,o.yg)("p",null,'Add Menus and Buttons Resource in "System Manage >> Resouce".'),(0,o.yg)("img",{src:"/img/shenyu/basicConfig/roleManagement/resource-dashboard-en.png",width:"80%",height:"50%"}),(0,o.yg)("p",null,"The admin user shows all menus and buttons of the ",(0,o.yg)("inlineCode",{parentName:"p"},"Shenyu")," gateway. If you need to customize adding and removing, add the menu first and under the corresponding menu, add the button. Edit the menu by clicking on the small edit icon on the right side of the menu."),(0,o.yg)("h2",{id:"role"},"Role"),(0,o.yg)("p",null,'You can associate roles and resource permissions through the menu bar "System Administration >> Role Management". By default, two roles are created, one for super administrator and one for normal user. The super administrator is the admin user, which cannot be changed, and the normal user role can change its resource properties. By editing the corresponding role, you can give the role the appropriate menu and button permissions.'),(0,o.yg)("h2",{id:"user"},"User"),(0,o.yg)("p",null,'You can manage the users logged into admin through the menu bar "System Administration >> User Management". The default user is admin, which has all menu and data permissions, cannot be changed or deleted, and can only change password or username.\nYou can add a user by pressing the "Add Data" button. The user role is selected to manage the menu and button permissions that the user sees after logging in. When a user selects more than one role, the maximum set of all roles is taken together. After changing a user\'s role permissions, users who are already logged in can simply refresh the page to get the changed permissions.'),(0,o.yg)("p",null,"The following is an example of how the new user's permissions."),(0,o.yg)("ul",null,(0,o.yg)("li",{parentName:"ul"},"editor default user role permission")),(0,o.yg)("img",{src:"/img/shenyu/basicConfig/roleManagement/default-role-en.png",width:"80%",height:"50%"}),(0,o.yg)("ul",null,(0,o.yg)("li",{parentName:"ul"},"Add new roles and give the appropriate resource permissions")),(0,o.yg)("img",{src:"/img/shenyu/basicConfig/roleManagement/default2-role-en.png",width:"80%",height:"50%"}),(0,o.yg)("ul",null,(0,o.yg)("li",{parentName:"ul"},"Create new users and give them the appropriate roles")),(0,o.yg)("img",{src:"/img/shenyu/basicConfig/roleManagement/add-new-user-en.png",width:"80%",height:"50%"}),(0,o.yg)("ul",null,(0,o.yg)("li",{parentName:"ul"},"User login to view their menu and button permissions")),(0,o.yg)("img",{src:"/img/shenyu/basicConfig/roleManagement/new-login-en.png",width:"80%",height:"50%"}))}m.isMDXComponent=!0}}]);