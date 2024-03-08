"use strict";(self.webpackChunkshenyu_website=self.webpackChunkshenyu_website||[]).push([[84470],{89188:(e,t,n)=>{n.d(t,{W:()=>r});var a=n(96540);function r(){return a.createElement("svg",{width:"20",height:"20",className:"DocSearch-Search-Icon",viewBox:"0 0 20 20","aria-hidden":"true"},a.createElement("path",{d:"M14.386 14.386l4.0877 4.0877-4.0877-4.0877c-2.9418 2.9419-7.7115 2.9419-10.6533 0-2.9419-2.9418-2.9419-7.7115 0-10.6533 2.9418-2.9419 7.7115-2.9419 10.6533 0 2.9419 2.9418 2.9419 7.7115 0 10.6533z",stroke:"currentColor",fill:"none",fillRule:"evenodd",strokeLinecap:"round",strokeLinejoin:"round"}))}},30110:(e,t,n)=>{n.d(t,{A:()=>T});var a=n(58168),r=n(96540),o=n(40961),l=n(44586),c=n(56347),s=n(86025),i=n(74676),u=n(42602),m=n(96225);function d(){return r.createElement("svg",{width:"15",height:"15",className:"DocSearch-Control-Key-Icon"},r.createElement("path",{d:"M4.505 4.496h2M5.505 5.496v5M8.216 4.496l.055 5.993M10 7.5c.333.333.5.667.5 1v2M12.326 4.5v5.996M8.384 4.496c1.674 0 2.116 0 2.116 1.5s-.442 1.5-2.116 1.5M3.205 9.303c-.09.448-.277 1.21-1.241 1.203C1 10.5.5 9.513.5 8V7c0-1.57.5-2.5 1.464-2.494.964.006 1.134.598 1.24 1.342M12.553 10.5h1.953",strokeWidth:"1.2",stroke:"currentColor",fill:"none",strokeLinecap:"square"}))}var h=n(89188),f=["translations"];function v(){return v=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},v.apply(this,arguments)}function b(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==n)return;var a,r,o=[],l=!0,c=!1;try{for(n=n.call(e);!(l=(a=n.next()).done)&&(o.push(a.value),!t||o.length!==t);l=!0);}catch(s){c=!0,r=s}finally{try{l||null==n.return||n.return()}finally{if(c)throw r}}return o}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return g(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return g(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function g(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,a=new Array(t);n<t;n++)a[n]=e[n];return a}function E(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var p="Ctrl";var A=r.forwardRef((function(e,t){var n=e.translations,a=void 0===n?{}:n,o=E(e,f),l=a.buttonText,c=void 0===l?"Search":l,s=a.buttonAriaLabel,i=void 0===s?"Search":s,u=b((0,r.useState)(null),2),m=u[0],g=u[1];return(0,r.useEffect)((function(){"undefined"!=typeof navigator&&(/(Mac|iPhone|iPod|iPad)/i.test(navigator.platform)?g("\u2318"):g(p))}),[]),r.createElement("button",v({type:"button",className:"DocSearch DocSearch-Button","aria-label":i},o,{ref:t}),r.createElement("span",{className:"DocSearch-Button-Container"},r.createElement(h.W,null),r.createElement("span",{className:"DocSearch-Button-Placeholder"},c)),r.createElement("span",{className:"DocSearch-Button-Keys"},null!==m&&r.createElement(r.Fragment,null,r.createElement(k,{reactsToKey:m===p?p:"Meta"},m===p?r.createElement(d,null):m),r.createElement(k,{reactsToKey:"k"},"K"))))}));function k(e){var t=e.reactsToKey,n=e.children,a=b((0,r.useState)(!1),2),o=a[0],l=a[1];return(0,r.useEffect)((function(){if(t)return window.addEventListener("keydown",e),window.addEventListener("keyup",n),function(){window.removeEventListener("keydown",e),window.removeEventListener("keyup",n)};function e(e){e.key===t&&l(!0)}function n(e){e.key!==t&&"Meta"!==e.key||l(!1)}}),[t]),r.createElement("kbd",{className:o?"DocSearch-Button-Key DocSearch-Button-Key--pressed":"DocSearch-Button-Key"},n)}var y=n(70727),w=n(55988);function _(){const{locale:e,tags:t}=function(){const{i18n:e}=(0,l.A)(),t=(0,y.useAllDocsData)(),n=(0,y.useActivePluginAndVersion)(),a=(0,w.XK)(),r=[w.Cy,...Object.keys(t).map((function(e){const r=n?.activePlugin?.pluginId===e?n.activeVersion:void 0,o=a[e],l=t[e].versions.find((e=>e.isLast)),c=r??o??l;return(0,w.tU)(e,c.name)}))];return{locale:e.currentLocale,tags:r}}();return[`language:${e}`,t.map((e=>`docusaurus_tag:${e}`))]}var C=n(14798);const N={searchBox:"searchBox_Bc3W"};let S=null;function L(e){let{hit:t,children:n}=e;return r.createElement(i.A,{to:t.url},n)}function D(e){let{state:t,onClose:n}=e;const{generateSearchPageLink:a}=(0,m.A)();return r.createElement(i.A,{to:a(t.query),onClick:n},"See all ",t.context.nbHits," results")}function I(e){let{contextualSearch:t,...i}=e;const{siteMetadata:m}=(0,l.A)(),d=_(),h=i.searchParameters?.facetFilters??[],f=t?[...d,...h]:h,v={...i.searchParameters,facetFilters:f},{withBaseUrl:b}=(0,s.h)(),g=(0,c.W6)(),E=(0,r.useRef)(null),p=(0,r.useRef)(null),[k,y]=(0,r.useState)(!1),[w,I]=(0,r.useState)(null),T=(0,r.useCallback)((()=>S?Promise.resolve():Promise.all([n.e(45343).then(n.bind(n,45343)),Promise.all([n.e(71869),n.e(58913)]).then(n.bind(n,58913)),Promise.all([n.e(71869),n.e(45504)]).then(n.bind(n,45504))]).then((e=>{let[{DocSearchModal:t}]=e;S=t}))),[]),B=(0,r.useCallback)((()=>{T().then((()=>{E.current=document.createElement("div"),document.body.insertBefore(E.current,document.body.firstChild),y(!0)}))}),[T,y]),x=(0,r.useCallback)((()=>{y(!1),E.current.remove()}),[y]),M=(0,r.useCallback)((e=>{T().then((()=>{y(!0),I(e.key)}))}),[T,y,I]),P=(0,r.useRef)({navigate(e){let{itemUrl:t}=e;g.push(t)}}).current,R=(0,r.useRef)((e=>e.map((e=>{const t=document.createElement("a");return t.href=e.url,{...e,url:b(`${t.pathname}${t.hash}`)}})))).current,O=(0,r.useMemo)((()=>e=>r.createElement(D,(0,a.A)({},e,{onClose:x}))),[x]),V=(0,r.useCallback)((e=>(e.addAlgoliaAgent("docusaurus",m.docusaurusVersion),e)),[m.docusaurusVersion]);!function(e){var t=e.isOpen,n=e.onOpen,a=e.onClose,o=e.onInput,l=e.searchButtonRef;r.useEffect((function(){function e(e){var r;(27===e.keyCode&&t||"k"===(null===(r=e.key)||void 0===r?void 0:r.toLowerCase())&&(e.metaKey||e.ctrlKey)||!function(e){var t=e.target,n=t.tagName;return t.isContentEditable||"INPUT"===n||"SELECT"===n||"TEXTAREA"===n}(e)&&"/"===e.key&&!t)&&(e.preventDefault(),t?a():document.body.classList.contains("DocSearch--active")||document.body.classList.contains("DocSearch--active")||n()),l&&l.current===document.activeElement&&o&&/[a-zA-Z0-9]/.test(String.fromCharCode(e.keyCode))&&o(e)}return window.addEventListener("keydown",e),function(){window.removeEventListener("keydown",e)}}),[t,n,a,o,l])}({isOpen:k,onOpen:B,onClose:x,onInput:M,searchButtonRef:p});const $=(0,C.T)({id:"theme.SearchBar.label",message:"Search",description:"The ARIA label and placeholder for search button"});return r.createElement(r.Fragment,null,r.createElement(u.A,null,r.createElement("link",{rel:"preconnect",href:`https://${i.appId}-dsn.algolia.net`,crossOrigin:"anonymous"})),r.createElement("div",{className:N.searchBox},r.createElement(A,{onTouchStart:T,onFocus:T,onMouseOver:T,onClick:B,ref:p,translations:{buttonText:$,buttonAriaLabel:$}})),k&&(0,o.createPortal)(r.createElement(S,(0,a.A)({onClose:x,initialScrollY:window.scrollY,initialQuery:w,navigator:P,transformItems:R,hitComponent:L,resultsFooterComponent:O,transformSearchClient:V},i,{searchParameters:v})),E.current))}const T=function(){const{siteConfig:e}=(0,l.A)();return r.createElement(I,e.themeConfig.algolia)}},96225:(e,t,n)=>{n.d(t,{A:()=>l});var a=n(56347),r=n(38193),o=n(44586);const l=function(){const e=(0,a.W6)(),t=(0,a.zy)(),{siteConfig:{baseUrl:n}={}}=(0,o.A)();return{searchValue:r.A.canUseDOM&&new URLSearchParams(t.search).get("q")||"",updateSearchPath:n=>{const a=new URLSearchParams(t.search);n?a.set("q",n):a.delete("q"),e.replace({search:a.toString()})},generateSearchPageLink:e=>`${n}search?q=${encodeURIComponent(e)}`}}},26359:(e,t,n)=>{n.d(t,{A:()=>o});var a=n(96540);const r="iconExternalLink_wgqa",o=e=>{let{width:t=13.5,height:n=13.5}=e;return a.createElement("svg",{width:t,height:n,"aria-hidden":"true",viewBox:"0 0 24 24",className:r},a.createElement("path",{fill:"currentColor",d:"M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z"}))}},84470:(e,t,n)=>{n.d(t,{A:()=>be});var a=n(96540),r=n(20053),o=n(56347),l=n(14798),c=n(55988);const s="skipToContent_OuoZ";function i(e){e.setAttribute("tabindex","-1"),e.focus(),e.removeAttribute("tabindex")}const u=function(){const e=(0,a.useRef)(null),{action:t}=(0,o.W6)();return(0,c.$G)((n=>{let{location:a}=n;e.current&&!a.hash&&"PUSH"===t&&i(e.current)})),a.createElement("div",{ref:e},a.createElement("a",{href:"#",className:s,onClick:e=>{e.preventDefault();const t=document.querySelector("main:first-of-type")||document.querySelector(".main-wrapper");t&&i(t)}},a.createElement(l.A,{id:"theme.common.skipToMainContent",description:"The skip to content label used for accessibility, allowing to rapidly navigate to main content with keyboard tab/enter navigation"},"Skip to main content")))},m="announcementBar_axC9",d="announcementBarClose_A3A1",h="announcementBarContent_6uhP",f="announcementBarCloseable_y4cp";const v=function(){const{isClosed:e,close:t}=(0,c.Mj)(),{announcementBar:n}=(0,c.pN)();if(!n)return null;const{content:o,backgroundColor:s,textColor:i,isCloseable:u}=n;return!o||u&&e?null:a.createElement("div",{className:m,style:{backgroundColor:s,color:i},role:"banner"},a.createElement("div",{className:(0,r.A)(h,{[f]:u}),dangerouslySetInnerHTML:{__html:o}}),u?a.createElement("button",{type:"button",className:(0,r.A)(d,"clean-btn"),onClick:t,"aria-label":(0,l.T)({id:"theme.AnnouncementBar.closeButtonAriaLabel",message:"Close",description:"The ARIA label for close button of announcement bar"})},a.createElement("span",{"aria-hidden":"true"},"\xd7")):null)};var b=n(58168),g=n(30110),E=n(44586);const p={toggle:"toggle_iYfV"},A=e=>{let{icon:t,style:n}=e;return a.createElement("span",{className:(0,r.A)(p.toggle,p.dark),style:n},t)},k=e=>{let{icon:t,style:n}=e;return a.createElement("span",{className:(0,r.A)(p.toggle,p.light),style:n},t)},y=(0,a.memo)((e=>{let{className:t,icons:n,checked:o,disabled:l,onChange:c}=e;const[s,i]=(0,a.useState)(o),[u,m]=(0,a.useState)(!1),d=(0,a.useRef)(null);return a.createElement("div",{className:(0,r.A)("react-toggle",t,{"react-toggle--checked":s,"react-toggle--focus":u,"react-toggle--disabled":l})},a.createElement("div",{className:"react-toggle-track",role:"button",tabIndex:-1,onClick:()=>d.current?.click()},a.createElement("div",{className:"react-toggle-track-check"},n.checked),a.createElement("div",{className:"react-toggle-track-x"},n.unchecked),a.createElement("div",{className:"react-toggle-thumb"})),a.createElement("input",{ref:d,checked:s,type:"checkbox",className:"react-toggle-screenreader-only","aria-label":"Switch between dark and light mode",onChange:c,onClick:()=>i(!s),onFocus:()=>m(!0),onBlur:()=>m(!1)}))}));function w(e){const{colorMode:{switchConfig:{darkIcon:t,darkIconStyle:n,lightIcon:r,lightIconStyle:o}}}=(0,c.pN)(),{isClient:l}=(0,E.A)();return a.createElement(y,(0,b.A)({disabled:!l,icons:{checked:a.createElement(A,{icon:t,style:n}),unchecked:a.createElement(k,{icon:r,style:o})}},e))}var _=n(94785),C=n(35515);const N=e=>{const t=(0,o.zy)(),[n,r]=(0,a.useState)(e),l=(0,a.useRef)(!1),[s,i]=(0,a.useState)(0),u=(0,a.useCallback)((e=>{null!==e&&i(e.getBoundingClientRect().height)}),[]);return(0,C.A)(((t,n)=>{const a=t.scrollY,o=n?.scrollY;if(!e)return;if(a<s)return void r(!0);if(l.current)return l.current=!1,void r(!1);o&&0===a&&r(!0);const c=document.documentElement.scrollHeight-s,i=window.innerHeight;o&&a>=o?r(!1):a+i<c&&r(!0)}),[s,l]),(0,c.$G)((t=>{e&&!t.location.hash&&r(!0)})),(0,a.useEffect)((()=>{e&&t.hash&&(l.current=!0)}),[t.hash]),{navbarRef:u,isNavbarVisible:n}};const S=function(e){void 0===e&&(e=!0),(0,a.useEffect)((()=>(document.body.style.overflow=e?"hidden":"visible",()=>{document.body.style.overflow="visible"})),[e])};var L=n(19312),D=n(24716),I=n(51773);const T=e=>{let{width:t=30,height:n=30,className:r,...o}=e;return a.createElement("svg",(0,b.A)({className:r,width:t,height:n,viewBox:"0 0 30 30","aria-hidden":"true"},o),a.createElement("path",{stroke:"currentColor",strokeLinecap:"round",strokeMiterlimit:"10",strokeWidth:"2",d:"M4 7h22M4 15h22M4 23h22"}))},B="toggle_2i4l",x="navbarHideable_RReh",M="navbarHidden_FBwS",P="right";function R(){return(0,c.pN)().navbar.items}function O(){const{colorMode:{disableSwitch:e}}=(0,c.pN)(),{isDarkTheme:t,setLightTheme:n,setDarkTheme:r}=(0,_.A)();return{isDarkTheme:t,toggle:(0,a.useCallback)((e=>e.target.checked?r():n()),[n,r]),disabled:e}}function V(e){let{sidebarShown:t,toggleSidebar:n}=e;S(t);const o=R(),s=O(),i=function(e){let{sidebarShown:t,toggleSidebar:n}=e;const r=(0,c.Ko)()?.({toggleSidebar:n}),o=(0,c.ZC)(r),[l,s]=(0,a.useState)((()=>!1));(0,a.useEffect)((()=>{r&&!o&&s(!0)}),[r,o]);const i=!!r;return(0,a.useEffect)((()=>{i?t||s(!0):s(!1)}),[t,i]),{shown:l,hide:(0,a.useCallback)((()=>{s(!1)}),[]),content:r}}({sidebarShown:t,toggleSidebar:n});return a.createElement("div",{className:"navbar-sidebar"},a.createElement("div",{className:"navbar-sidebar__brand"},a.createElement(I.A,{className:"navbar__brand",imageClassName:"navbar__logo",titleClassName:"navbar__title"}),!s.disabled&&t&&a.createElement(w,{checked:s.isDarkTheme,onChange:s.toggle})),a.createElement("div",{className:(0,r.A)("navbar-sidebar__items",{"navbar-sidebar__items--show-secondary":i.shown})},a.createElement("div",{className:"navbar-sidebar__item menu"},a.createElement("ul",{className:"menu__list"},o.map(((e,t)=>a.createElement(D.A,(0,b.A)({mobile:!0},e,{onClick:n,key:t})))))),a.createElement("div",{className:"navbar-sidebar__item navbar-sidebar__item--secondary menu"},a.createElement("button",{type:"button",className:"clean-btn navbar-sidebar__back",onClick:i.hide},a.createElement(l.A,{id:"theme.navbar.mobileSidebarSecondaryMenu.backButtonLabel",description:"The label of the back button to return to main menu, inside the mobile navbar sidebar secondary menu (notably used to display the docs sidebar)"},"\u2190 Back to main menu")),i.content)))}const $=function(){const{navbar:{hideOnScroll:e,style:t}}=(0,c.pN)(),n=function(){const e=(0,L.A)(),t="mobile"===e,[n,r]=(0,a.useState)(!1),o=(0,a.useCallback)((()=>{r((e=>!e))}),[]);return(0,a.useEffect)((()=>{"desktop"===e&&r(!1)}),[e]),{shouldRender:t,toggle:o,shown:n}}(),o=O(),{navbarRef:l,isNavbarVisible:s}=N(e),i=R(),u=i.some((e=>"search"===e.type)),{leftItems:m,rightItems:d}=function(e){return{leftItems:e.filter((e=>"left"===(e.position??P))),rightItems:e.filter((e=>"right"===(e.position??P)))}}(i);return a.createElement("nav",{ref:l,className:(0,r.A)("navbar","navbar--fixed-top",{"navbar--dark":"dark"===t,"navbar--primary":"primary"===t,"navbar-sidebar--show":n.shown,[x]:e,[M]:e&&!s})},a.createElement("div",{className:"navbar__inner"},a.createElement("div",{className:"navbar__items"},i?.length>0&&a.createElement("button",{"aria-label":"Navigation bar toggle",className:"navbar__toggle clean-btn",type:"button",tabIndex:0,onClick:n.toggle,onKeyDown:n.toggle},a.createElement(T,null)),a.createElement(I.A,{className:"navbar__brand",imageClassName:"navbar__logo",titleClassName:"navbar__title"}),m.map(((e,t)=>a.createElement(D.A,(0,b.A)({},e,{key:t}))))),a.createElement("div",{className:"navbar__items navbar__items--right"},d.map(((e,t)=>a.createElement(D.A,(0,b.A)({},e,{key:t})))),!o.disabled&&a.createElement(w,{className:B,checked:o.isDarkTheme,onChange:o.toggle}),!u&&a.createElement(g.A,null))),a.createElement("div",{role:"presentation",className:"navbar-sidebar__backdrop",onClick:n.toggle}),n.shouldRender&&a.createElement(V,{sidebarShown:n.shown,toggleSidebar:n.toggle}))};var U=n(74676),K=n(86025),W=n(16654);const j="footerLogoLink_SRtH";var H=n(21101),q=n(26359);function F(e){let{to:t,href:n,label:r,prependBaseUrlToHref:o,...l}=e;const c=(0,K.A)(t),s=(0,K.A)(n,{forcePrependBaseUrl:!0});return a.createElement(U.A,(0,b.A)({className:"footer__link-item"},n?{href:o?s:n}:{to:c},l),n&&!(0,W.A)(n)?a.createElement("span",null,r,a.createElement(q.A,null)):r)}const z=e=>{let{sources:t,alt:n}=e;return a.createElement(H.A,{className:"footer__logo",alt:n,sources:t})};const G=function(){const{footer:e}=(0,c.pN)(),{copyright:t,links:n=[],logo:o={}}=e||{},l={light:(0,K.A)(o.src),dark:(0,K.A)(o.srcDark||o.src)};return e?a.createElement("footer",{className:(0,r.A)("footer",{"footer--dark":"dark"===e.style})},a.createElement("div",{className:"container"},n&&n.length>0&&a.createElement("div",{className:"row footer__links"},n.map(((e,t)=>a.createElement("div",{key:t,className:"col footer__col"},null!=e.title?a.createElement("div",{className:"footer__title"},e.title):null,null!=e.items&&Array.isArray(e.items)&&e.items.length>0?a.createElement("ul",{className:"footer__items"},e.items.map(((e,t)=>e.html?a.createElement("li",{key:t,className:"footer__item",dangerouslySetInnerHTML:{__html:e.html}}):a.createElement("li",{key:e.href||e.to,className:"footer__item"},a.createElement(F,e))))):null)))),(o||t)&&a.createElement("div",{className:"footer__bottom text--center"},o&&(o.src||o.srcDark)&&a.createElement("div",{className:"margin-bottom--sm"},o.href?a.createElement(U.A,{href:o.href,className:j},a.createElement(z,{alt:o.alt,sources:l})):a.createElement(z,{alt:o.alt,sources:l})),t?a.createElement("div",{className:"footer__copyright",dangerouslySetInnerHTML:{__html:t}}):null))):null};var Y=n(38193);const Q=(0,c.Wf)("theme"),X="light",Z="dark",J=e=>e===Z?Z:X,ee=e=>{(0,c.Wf)("theme").set(J(e))},te=()=>{const{colorMode:{defaultMode:e,disableSwitch:t,respectPrefersColorScheme:n}}=(0,c.pN)(),[r,o]=(0,a.useState)((e=>Y.A.canUseDOM?J(document.documentElement.getAttribute("data-theme")):J(e))(e)),l=(0,a.useCallback)((()=>{o(X),ee(X)}),[]),s=(0,a.useCallback)((()=>{o(Z),ee(Z)}),[]);return(0,a.useEffect)((()=>{document.documentElement.setAttribute("data-theme",J(r))}),[r]),(0,a.useEffect)((()=>{if(!t)try{const e=Q.get();null!==e&&o(J(e))}catch(e){console.error(e)}}),[o]),(0,a.useEffect)((()=>{t&&!n||window.matchMedia("(prefers-color-scheme: dark)").addListener((e=>{let{matches:t}=e;o(t?Z:X)}))}),[]),{isDarkTheme:r===Z,setLightTheme:l,setDarkTheme:s}};var ne=n(493);const ae=function(e){const{isDarkTheme:t,setLightTheme:n,setDarkTheme:r}=te();return a.createElement(ne.A.Provider,{value:{isDarkTheme:t,setLightTheme:n,setDarkTheme:r}},e.children)},re="docusaurus.tab.",oe=()=>{const[e,t]=(0,a.useState)({}),n=(0,a.useCallback)(((e,t)=>{(0,c.Wf)(`${re}${e}`).set(t)}),[]);return(0,a.useEffect)((()=>{try{const e={};(0,c.Eo)().forEach((t=>{if(t.startsWith(re)){const n=t.substring(15);e[n]=(0,c.Wf)(t).get()}})),t(e)}catch(e){console.error(e)}}),[]),{tabGroupChoices:e,setTabGroupChoices:(e,a)=>{t((t=>({...t,[e]:a}))),n(e,a)}}},le=(0,a.createContext)(void 0);const ce=function(e){const{tabGroupChoices:t,setTabGroupChoices:n}=oe();return a.createElement(le.Provider,{value:{tabGroupChoices:t,setTabGroupChoices:n}},e.children)};function se(e){let{children:t}=e;return a.createElement(ae,null,a.createElement(c.oq,null,a.createElement(ce,null,a.createElement(c.VQ,null,a.createElement(c.pM,null,t)))))}var ie=n(42602);function ue(e){let{locale:t,version:n,tag:r}=e;const o=t;return a.createElement(ie.A,null,o&&a.createElement("meta",{name:"docsearch:language",content:o}),n&&a.createElement("meta",{name:"docsearch:version",content:n}),r&&a.createElement("meta",{name:"docsearch:docusaurus_tag",content:r}))}var me=n(8139);function de(){const{i18n:{defaultLocale:e,locales:t}}=(0,E.A)(),n=(0,c.oK)();return a.createElement(ie.A,null,t.map((e=>a.createElement("link",{key:e,rel:"alternate",href:n.createUrl({locale:e,fullyQualified:!0}),hrefLang:e}))),a.createElement("link",{rel:"alternate",href:n.createUrl({locale:e,fullyQualified:!0}),hrefLang:"x-default"}))}function he(e){let{permalink:t}=e;const{siteConfig:{url:n}}=(0,E.A)(),r=function(){const{siteConfig:{url:e}}=(0,E.A)(),{pathname:t}=(0,o.zy)();return e+(0,K.A)(t)}(),l=t?`${n}${t}`:r;return a.createElement(ie.A,null,a.createElement("meta",{property:"og:url",content:l}),a.createElement("link",{rel:"canonical",href:l}))}function fe(e){const{siteConfig:{favicon:t,themeConfig:{metadatas:n,image:r}},i18n:{currentLocale:o,localeConfigs:l}}=(0,E.A)(),{title:s,description:i,image:u,keywords:m,searchMetadatas:d}=e,h=(0,K.A)(t),f=(0,c.s$)(s),v=o,g=l[o].direction;return a.createElement(a.Fragment,null,a.createElement(ie.A,null,a.createElement("html",{lang:v,dir:g}),t&&a.createElement("link",{rel:"shortcut icon",href:h}),a.createElement("title",null,f),a.createElement("meta",{property:"og:title",content:f}),u||r&&a.createElement("meta",{name:"twitter:card",content:"summary_large_image"})),a.createElement(me.A,{description:i,keywords:m,image:u}),a.createElement(he,null),a.createElement(de,null),a.createElement(ue,(0,b.A)({tag:c.Cy,locale:o},d)),a.createElement(ie.A,null,n.map(((e,t)=>a.createElement("meta",(0,b.A)({key:`metadata_${t}`},e))))))}const ve=function(){(0,a.useEffect)((()=>{const e="navigation-with-keyboard";function t(t){"keydown"===t.type&&"Tab"===t.key&&document.body.classList.add(e),"mousedown"===t.type&&document.body.classList.remove(e)}return document.addEventListener("keydown",t),document.addEventListener("mousedown",t),()=>{document.body.classList.remove(e),document.removeEventListener("keydown",t),document.removeEventListener("mousedown",t)}}),[])};const be=function(e){const{children:t,noFooter:n,wrapperClassName:o,pageClassName:l}=e;return ve(),a.createElement(se,null,a.createElement(fe,e),a.createElement(u,null),a.createElement(v,null),a.createElement($,null),a.createElement("div",{className:(0,r.A)(c.GN.wrapper.main,o,l)},t),!n&&a.createElement(G,null))}},51773:(e,t,n)=>{n.d(t,{A:()=>i});var a=n(58168),r=n(96540),o=n(74676),l=n(21101),c=n(86025),s=n(44586);const i=e=>{const{siteConfig:{title:t,themeConfig:{navbar:{title:n,logo:i={src:""}}}},isClient:u}=(0,s.A)(),{imageClassName:m,titleClassName:d,...h}=e,f=(0,c.A)(i.href||"/"),v={light:(0,c.A)(i.src),dark:(0,c.A)(i.srcDark||i.src)};return r.createElement(o.A,(0,a.A)({to:f},h,i.target&&{target:i.target}),i.src&&r.createElement(l.A,{key:u,className:m,sources:v,alt:i.alt||n||t}),null!=n&&r.createElement("b",{className:d},n))}},93031:(e,t,n)=>{n.d(t,{A:()=>f,k:()=>m});var a=n(58168),r=n(96540),o=n(20053),l=n(74676),c=n(86025),s=n(26359),i=n(16654);const u="dropdown__link--active";function m(e){let{activeBasePath:t,activeBaseRegex:n,to:o,href:m,label:d,activeClassName:h="navbar__link--active",prependBaseUrlToHref:f,...v}=e;const b=(0,c.A)(o),g=(0,c.A)(t),E=(0,c.A)(m,{forcePrependBaseUrl:!0}),p=d&&m&&!(0,i.A)(m),A=h===u;return r.createElement(l.A,(0,a.A)({},m?{href:f?E:m}:{isNavLink:!0,activeClassName:h,to:b,...t||n?{isActive:(e,t)=>n?new RegExp(n).test(t.pathname):t.pathname.startsWith(g)}:null},v),p?r.createElement("span",null,d,r.createElement(s.A,A&&{width:12,height:12})):d)}function d(e){let{className:t,isDropdownItem:n=!1,...l}=e;const c=r.createElement(m,(0,a.A)({className:(0,o.A)(n?"dropdown__link":"navbar__item navbar__link",t)},l));return n?r.createElement("li",null,c):c}function h(e){let{className:t,isDropdownItem:n,...l}=e;return r.createElement("li",{className:"menu__list-item"},r.createElement(m,(0,a.A)({className:(0,o.A)("menu__link",t)},l)))}const f=function(e){let{mobile:t=!1,position:n,...a}=e;const o=t?h:d;return r.createElement(o,a)}},98240:(e,t,n)=>{n.d(t,{A:()=>u});var a=n(58168),r=n(96540),o=n(93031),l=n(70727),c=n(20053),s=n(55988),i=n(70440);function u(e){let{docId:t,activeSidebarClassName:n,label:u,docsPluginId:m,...d}=e;const{activeVersion:h,activeDoc:f}=(0,l.useActiveDocContext)(m),{preferredVersion:v}=(0,s.g1)(m),b=(0,l.useLatestVersion)(m),g=function(e,t){const n=e.flatMap((e=>e.docs)),a=n.find((e=>e.id===t));if(!a){const a=n.map((e=>e.id)).join("\n- ");throw new Error(`DocNavbarItem: couldn't find any doc with id "${t}" in version${e.length?"s":""} ${e.map((e=>e.name)).join(", ")}".\nAvailable doc ids are:\n- ${a}`)}return a}((0,i.uniq)([h,v,b].filter(Boolean)),t);return r.createElement(o.A,(0,a.A)({exact:!0},d,{className:(0,c.A)(d.className,{[n]:f&&f.sidebar===g.sidebar}),label:u??g.id,to:g.path}))}},57754:(e,t,n)=>{n.d(t,{A:()=>u});var a=n(58168),r=n(96540),o=n(93031),l=n(1175),c=n(70727),s=n(55988);const i=e=>e.docs.find((t=>t.id===e.mainDocId));function u(e){let{mobile:t,docsPluginId:n,dropdownActiveClassDisabled:u,dropdownItemsBefore:m,dropdownItemsAfter:d,...h}=e;const f=(0,c.useActiveDocContext)(n),v=(0,c.useVersions)(n),b=(0,c.useLatestVersion)(n),{preferredVersion:g,savePreferredVersionName:E}=(0,s.g1)(n);const p=function(){const e=v.map((e=>{const t=f?.alternateDocVersions[e.name]||i(e);return{isNavLink:!0,label:e.label,to:t.path,isActive:()=>e===f?.activeVersion,onClick:()=>{E(e.name)}}}));return[...m,...e,...d]}(),A=f.activeVersion??g??b,k=t&&p?"Versions":A.label,y=t&&p?void 0:i(A).path;return p.length<=1?r.createElement(o.A,(0,a.A)({},h,{mobile:t,label:k,to:y,isActive:u?()=>!1:void 0})):r.createElement(l.A,(0,a.A)({},h,{mobile:t,label:k,to:y,items:p,isActive:u?()=>!1:void 0}))}},26467:(e,t,n)=>{n.d(t,{A:()=>i});var a=n(58168),r=n(96540),o=n(93031),l=n(70727),c=n(55988);const s=e=>e.docs.find((t=>t.id===e.mainDocId));function i(e){let{label:t,to:n,docsPluginId:i,...u}=e;const m=(0,l.useActiveVersion)(i),{preferredVersion:d}=(0,c.g1)(i),h=(0,l.useLatestVersion)(i),f=m??d??h,v=t??f.label,b=n??s(f).path;return r.createElement(o.A,(0,a.A)({},u,{label:v,to:b}))}},1175:(e,t,n)=>{n.d(t,{A:()=>h});var a=n(58168),r=n(96540),o=n(20053),l=n(55988),c=n(93031),s=n(24716);const i="dropdown__link--active";function u(e,t){return e.some((e=>function(e,t){return!!(0,l.ys)(e.to,t)||!(!e.activeBaseRegex||!new RegExp(e.activeBaseRegex).test(t))||!(!e.activeBasePath||!t.startsWith(e.activeBasePath))}(e,t)))}function m(e){let{items:t,position:n,className:l,...u}=e;const m=(0,r.useRef)(null),d=(0,r.useRef)(null),[h,f]=(0,r.useState)(!1);return(0,r.useEffect)((()=>{const e=e=>{m.current&&!m.current.contains(e.target)&&f(!1)};return document.addEventListener("mousedown",e),document.addEventListener("touchstart",e),()=>{document.removeEventListener("mousedown",e),document.removeEventListener("touchstart",e)}}),[m]),r.createElement("div",{ref:m,className:(0,o.A)("navbar__item","dropdown","dropdown--hoverable",{"dropdown--right":"right"===n,"dropdown--show":h})},r.createElement(c.k,(0,a.A)({className:(0,o.A)("navbar__item navbar__link",l)},u,{onClick:u.to?void 0:e=>e.preventDefault(),onKeyDown:e=>{"Enter"===e.key&&(e.preventDefault(),f(!h))}}),u.children??u.label),r.createElement("ul",{ref:d,className:"dropdown__menu"},t.map(((e,n)=>r.createElement(s.A,(0,a.A)({isDropdownItem:!0,onKeyDown:e=>{if(n===t.length-1&&"Tab"===e.key){e.preventDefault(),f(!1);const t=m.current.nextElementSibling;t&&t.focus()}},activeClassName:i},e,{key:n}))))))}function d(e){let{items:t,className:n,position:i,...m}=e;const d=(0,l.BH)(),h=u(t,d),{collapsed:f,toggleCollapsed:v,setCollapsed:b}=(0,l.uW)({initialState:()=>!h});return(0,r.useEffect)((()=>{h&&b(!h)}),[d,h]),r.createElement("li",{className:(0,o.A)("menu__list-item",{"menu__list-item--collapsed":f})},r.createElement(c.k,(0,a.A)({role:"button",className:(0,o.A)("menu__link menu__link--sublist",n)},m,{onClick:e=>{e.preventDefault(),v()}}),m.children??m.label),r.createElement(l.Nt,{lazy:!0,as:"ul",className:"menu__list",collapsed:f},t.map(((e,t)=>r.createElement(s.A,(0,a.A)({mobile:!0,isDropdownItem:!0,onClick:m.onClick,activeClassName:"menu__link--active"},e,{key:t}))))))}const h=function(e){let{mobile:t=!1,...n}=e;const a=t?d:m;return r.createElement(a,n)}},24716:(e,t,n)=>{n.d(t,{A:()=>v});var a=n(96540),r=n(93031),o=n(1175),l=n(58168),c=n(47317),s=n(44586),i=n(55988);function u(e){let{mobile:t,dropdownItemsBefore:n,dropdownItemsAfter:r,...u}=e;const{i18n:{currentLocale:m,locales:d,localeConfigs:h}}=(0,s.A)(),f=(0,i.oK)();function v(e){return h[e].label}const b=[...n,...d.map((e=>{const t=`pathname://${f.createUrl({locale:e,fullyQualified:!1})}`;return{isNavLink:!0,label:v(e),to:t,target:"_self",autoAddBaseUrl:!1,className:e===m?"dropdown__link--active":"",style:{textTransform:"capitalize"}}})),...r],g=t?"Languages":v(m);return a.createElement(o.A,(0,l.A)({},u,{href:"#",mobile:t,label:a.createElement("span",null,a.createElement(c.A,{style:{verticalAlign:"text-bottom",marginRight:5}}),a.createElement("span",null,g)),items:b}))}var m=n(30110);function d(e){let{mobile:t}=e;return t?null:a.createElement(m.A,null)}const h={default:()=>r.A,localeDropdown:()=>u,search:()=>d,dropdown:()=>o.A,docsVersion:()=>n(26467).A,docsVersionDropdown:()=>n(57754).A,doc:()=>n(98240).A},f=e=>{const t=h[e];if(!t)throw new Error(`No NavbarItem component found for type "${e}".`);return t()};function v(e){let{type:t,...n}=e;const r=function(e,t){return e&&"default"!==e?e:t?"dropdown":"default"}(t,void 0!==n.items),o=f(r);return a.createElement(o,n)}},493:(e,t,n)=>{n.d(t,{A:()=>a});const a=n(96540).createContext(void 0)},21101:(e,t,n)=>{n.d(t,{A:()=>i});var a=n(58168),r=n(96540),o=n(20053),l=n(44586),c=n(94785);const s={themedImage:"themedImage_TMUO","themedImage--light":"themedImage--light_4Vu1","themedImage--dark":"themedImage--dark_uzRr"},i=e=>{const{isClient:t}=(0,l.A)(),{isDarkTheme:n}=(0,c.A)(),{sources:i,className:u,alt:m="",...d}=e,h=t?n?["dark"]:["light"]:["light","dark"];return r.createElement(r.Fragment,null,h.map((e=>r.createElement("img",(0,a.A)({key:e,src:i[e],alt:m,className:(0,o.A)(s.themedImage,s[`themedImage--${e}`],u)},d)))))}},35515:(e,t,n)=>{n.d(t,{A:()=>l});var a=n(96540),r=n(38193);const o=()=>r.A.canUseDOM?{scrollX:window.pageXOffset,scrollY:window.pageYOffset}:null,l=function(e,t){void 0===t&&(t=[]);const n=(0,a.useRef)(o()),r=()=>{const t=o();e&&e(t,n.current),n.current=t};(0,a.useEffect)((()=>{const e={passive:!0};return r(),window.addEventListener("scroll",r,e),()=>window.removeEventListener("scroll",r,e)}),t)}},94785:(e,t,n)=>{n.d(t,{A:()=>o});var a=n(96540),r=n(493);const o=function(){const e=(0,a.useContext)(r.A);if(null==e)throw new Error('"useThemeContext" is used outside of "Layout" component. Please see https://docusaurus.io/docs/api/themes/configuration#usethemecontext.');return e}}}]);