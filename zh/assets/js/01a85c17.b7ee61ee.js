"use strict";(self.webpackChunkshenyu_website=self.webpackChunkshenyu_website||[]).push([[8209,80890],{27394:(e,t,a)=>{a.d(t,{A:()=>p});var n=a(96540),l=a(20053),r=a(84470),s=a(74676);const c="sidebar_SrOn",i="sidebarItemTitle_jISh",o="categoryHeader_Xx2W",m="sidebarItemList_UfcF",d="sidebarItem_v502",u="sidebarItemLink_yJnx",h="sidebarItemLinkActive_Aygi";var g=a(14798);function f(e){let{sidebar:t}=e;if(0===t.items.length)return null;let a={};return t.items[0].permalink.indexOf("/blog/")>-1?t.items.forEach((e=>{if(e.permalink.indexOf("-")>-1){let t=e.permalink.split("-")[0].split("/blog/")[1];a[t]?a[t].push(e):a[t]=[e]}})):a={"":t.items},n.createElement("nav",{className:(0,l.A)(c,"thin-scrollbar"),"aria-label":(0,g.T)({id:"theme.blog.sidebar.navAriaLabel",message:"Blog recent posts navigation",description:"The ARIA label for recent posts in the blog sidebar"})},n.createElement("div",{className:(0,l.A)(i,"margin-bottom--md")},t.title),n.createElement("ul",{className:m},Object.keys(a).map(((e,t)=>n.createElement(n.Fragment,null,e.length>0&&n.createElement("h4",{key:t,className:o},e),a[e].map((e=>n.createElement("li",{key:e.permalink,className:d},n.createElement(s.A,{isNavLink:!0,to:e.permalink,className:u,activeClassName:h},e.title)))))))))}var b=a(61461);const p=function(e){const{sidebar:t,toc:a,children:s,...c}=e,i=t&&t.items.length>0;return n.createElement(r.A,c,n.createElement("div",{className:"container margin-vert--lg"},n.createElement("div",{className:"row"},i&&n.createElement("aside",{className:"col col--3"},n.createElement(f,{sidebar:t})),n.createElement("main",{className:(0,l.A)("col",{"col--7":i,"col--9 col--offset-1":!i})},s),a&&n.createElement("div",{className:"col col--2"},n.createElement(b.A,{toc:a})))))}},47317:(e,t,a)=>{a.d(t,{A:()=>r});var n=a(58168),l=a(96540);const r=e=>{let{width:t=40,height:a=20,...r}=e;return l.createElement("svg",(0,n.A)({t:"1631348384596",className:"icon",viewBox:"0 0 1024 1024",version:"1.1"},r,{"p-id":"557",width:"20",height:"20"}),l.createElement("path",{d:"M547.797333 638.208l-104.405333-103.168 1.237333-1.28a720.170667 720.170667 0 0 0 152.490667-268.373333h120.448V183.082667h-287.744V100.906667H347.605333v82.218666H59.818667V265.386667h459.178666a648.234667 648.234667 0 0 1-130.304 219.946666 643.242667 643.242667 0 0 1-94.976-137.728H211.541333a722.048 722.048 0 0 0 122.453334 187.434667l-209.194667 206.378667 58.368 58.368 205.525333-205.525334 127.872 127.829334 31.232-83.84m231.424-208.426667h-82.218666l-184.96 493.312h82.218666l46.037334-123.306667h195.242666l46.464 123.306667h82.218667l-185.002667-493.312m-107.690666 287.744l66.56-178.005333 66.602666 178.005333z",fill:"currentColor","p-id":"558"}))}},61461:(e,t,a)=>{a.d(t,{m:()=>i,A:()=>o});var n=a(96540),l=a(20053);const r=function(e,t,a){const[l,r]=(0,n.useState)(void 0);(0,n.useEffect)((()=>{function n(){const n=function(){const e=Array.from(document.getElementsByClassName("anchor")),t=e.find((e=>{const{top:t}=e.getBoundingClientRect();return t>=a}));if(t){if(t.getBoundingClientRect().top>=a){return e[e.indexOf(t)-1]??t}return t}return e[e.length-1]}();if(n){let a=0,s=!1;const c=document.getElementsByClassName(e);for(;a<c.length&&!s;){const e=c[a],{href:i}=e,o=decodeURIComponent(i.substring(i.indexOf("#")+1));n.id===o&&(l&&l.classList.remove(t),e.classList.add(t),r(e),s=!0),a+=1}}}return document.addEventListener("scroll",n),document.addEventListener("resize",n),n(),()=>{document.removeEventListener("scroll",n),document.removeEventListener("resize",n)}}))},s="tableOfContents_vrFS",c="table-of-contents__link";function i(e){let{toc:t,isChild:a}=e;return t.length?n.createElement("ul",{className:a?"":"table-of-contents table-of-contents__left-border"},t.map((e=>n.createElement("li",{key:e.id},n.createElement("a",{href:`#${e.id}`,className:c,dangerouslySetInnerHTML:{__html:e.value}}),n.createElement(i,{isChild:!0,toc:e.children}))))):null}const o=function(e){let{toc:t}=e;return r(c,"table-of-contents__link--active",100),n.createElement("div",{className:(0,l.A)(s,"thin-scrollbar")},n.createElement(i,{toc:t}))}},85776:(e,t,a)=>{a.r(t),a.d(t,{default:()=>i});var n=a(96540),l=a(74676),r=a(27394),s=a(14798),c=a(55988);const i=function(e){const{tags:t,sidebar:a}=e,i=(0,s.T)({id:"theme.tags.tagsPageTitle",message:"Tags",description:"The title of the tag list page"}),o={};Object.keys(t).forEach((e=>{const t=function(e){return e[0].toUpperCase()}(e);o[t]=o[t]||[],o[t].push(e)}));const m=Object.entries(o).sort(((e,t)=>{let[a]=e,[n]=t;return a.localeCompare(n)})).map((e=>{let[a,r]=e;return n.createElement("article",{key:a},n.createElement("h2",null,a),r.map((e=>n.createElement(l.A,{className:"padding-right--md",href:t[e].permalink,key:e},t[e].name," (",t[e].count,")"))),n.createElement("hr",null))})).filter((e=>null!=e));return n.createElement(r.A,{title:i,wrapperClassName:c.GN.wrapper.blogPages,pageClassName:c.GN.page.blogTagsListPage,searchMetadatas:{tag:"blog_tags_list"},sidebar:a},n.createElement("h1",null,i),n.createElement("section",{className:"margin-vert--lg"},m))}}}]);