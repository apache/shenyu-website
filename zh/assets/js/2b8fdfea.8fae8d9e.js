"use strict";(self.webpackChunkshenyu_website=self.webpackChunkshenyu_website||[]).push([[88442],{15680:(e,n,a)=>{a.d(n,{xA:()=>o,yg:()=>c});var t=a(96540);function r(e,n,a){return n in e?Object.defineProperty(e,n,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[n]=a,e}function l(e,n){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);n&&(t=t.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),a.push.apply(a,t)}return a}function p(e){for(var n=1;n<arguments.length;n++){var a=null!=arguments[n]?arguments[n]:{};n%2?l(Object(a),!0).forEach((function(n){r(e,n,a[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):l(Object(a)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(a,n))}))}return e}function s(e,n){if(null==e)return{};var a,t,r=function(e,n){if(null==e)return{};var a,t,r={},l=Object.keys(e);for(t=0;t<l.length;t++)a=l[t],n.indexOf(a)>=0||(r[a]=e[a]);return r}(e,n);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(t=0;t<l.length;t++)a=l[t],n.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var g=t.createContext({}),i=function(e){var n=t.useContext(g),a=n;return e&&(a="function"==typeof e?e(n):p(p({},n),e)),a},o=function(e){var n=i(e.components);return t.createElement(g.Provider,{value:n},e.children)},h="mdxType",u={inlineCode:"code",wrapper:function(e){var n=e.children;return t.createElement(t.Fragment,{},n)}},y=t.forwardRef((function(e,n){var a=e.components,r=e.mdxType,l=e.originalType,g=e.parentName,o=s(e,["components","mdxType","originalType","parentName"]),h=i(a),y=r,c=h["".concat(g,".").concat(y)]||h[y]||u[y]||l;return a?t.createElement(c,p(p({ref:n},o),{},{components:a})):t.createElement(c,p({ref:n},o))}));function c(e,n){var a=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var l=a.length,p=new Array(l);p[0]=y;var s={};for(var g in n)hasOwnProperty.call(n,g)&&(s[g]=n[g]);s.originalType=e,s[h]="string"==typeof e?e:r,p[1]=s;for(var i=2;i<l;i++)p[i]=a[i];return t.createElement.apply(null,p)}return t.createElement.apply(null,a)}y.displayName="MDXCreateElement"},75620:(e,n,a)=>{a.r(n),a.d(n,{contentTitle:()=>p,default:()=>h,frontMatter:()=>l,metadata:()=>s,toc:()=>g});var t=a(58168),r=(a(96540),a(15680));const l={title:"ShenYu nginx \u53d1\u5e03\u6307\u5357",sidebar_position:16,description:"Apache ShenYu nginx \u53d1\u5e03\u6307\u5357",cover:"/img/architecture/shenyu-framework.png"},p=void 0,s={unversionedId:"shenyu-nginx-release-guide",id:"shenyu-nginx-release-guide",isDocsHomePage:!1,title:"ShenYu nginx \u53d1\u5e03\u6307\u5357",description:"Apache ShenYu nginx \u53d1\u5e03\u6307\u5357",source:"@site/i18n/zh/docusaurus-plugin-content-docs-community/current/16-shenyu-nginx-release-guide.md",sourceDirName:".",slug:"/shenyu-nginx-release-guide",permalink:"/zh/community/shenyu-nginx-release-guide",editUrl:"https://github.com/apache/shenyu-website/edit/main/i18n/zh/docusaurus-plugin-content-docs-community/current/16-shenyu-nginx-release-guide.md",version:"current",lastUpdatedBy:"cxhello",lastUpdatedAt:1742129983,formattedLastUpdatedAt:"2025/3/16",sidebarPosition:16,frontMatter:{title:"ShenYu nginx \u53d1\u5e03\u6307\u5357",sidebar_position:16,description:"Apache ShenYu nginx \u53d1\u5e03\u6307\u5357",cover:"/img/architecture/shenyu-framework.png"},sidebar:"community",previous:{title:"ShenYu .NET \u8bed\u8a00\u5ba2\u6237\u7aef\u53d1\u5e03\u6307\u5357",permalink:"/zh/community/shenyu-client-dotnet-release-guide"},next:{title:"ShenYu WASM \u53d1\u5e03\u6307\u5357",permalink:"/zh/community/shenyu-wasm-release-guide"}},g=[{value:"\u66f4\u65b0\u53d1\u5e03\u516c\u544a",id:"\u66f4\u65b0\u53d1\u5e03\u516c\u544a",children:[]},{value:"\u521b\u5efa GPG KEY",id:"\u521b\u5efa-gpg-key",children:[]},{value:"\u53d1\u5e03\u524d\u7684\u51c6\u5907\u5de5\u4f5c",id:"\u53d1\u5e03\u524d\u7684\u51c6\u5907\u5de5\u4f5c",children:[]},{value:"\u53d1\u5e03\u5230 SVN \u9884\u53d1\u4ed3\u5e93",id:"\u53d1\u5e03\u5230-svn-\u9884\u53d1\u4ed3\u5e93",children:[]},{value:"\u9884\u53d1\u7248\u672c\u9a8c\u8bc1",id:"\u9884\u53d1\u7248\u672c\u9a8c\u8bc1",children:[]},{value:"\u6295\u7968\u6d41\u7a0b",id:"\u6295\u7968\u6d41\u7a0b",children:[{value:"ShenYu \u793e\u533a\u6295\u7968",id:"shenyu-\u793e\u533a\u6295\u7968",children:[]}]},{value:"\u5b8c\u6210\u53d1\u5e03",id:"\u5b8c\u6210\u53d1\u5e03",children:[]},{value:"\u53d1\u5e03\u516c\u544a",id:"\u53d1\u5e03\u516c\u544a",children:[]},{value:"\u91cd\u65b0\u53d1\u5e03\uff08\u975e\u5fc5\u9700\uff09",id:"\u91cd\u65b0\u53d1\u5e03\u975e\u5fc5\u9700",children:[]}],i={toc:g},o="wrapper";function h(e){let{components:n,...a}=e;return(0,r.yg)(o,(0,t.A)({},i,a,{components:n,mdxType:"MDXLayout"}),(0,r.yg)("h2",{id:"\u66f4\u65b0\u53d1\u5e03\u516c\u544a"},"\u66f4\u65b0\u53d1\u5e03\u516c\u544a"),(0,r.yg)("p",null,"\u6309\u7167\u5982\u4e0b\u683c\u5f0f\u66f4\u65b0",(0,r.yg)("a",{parentName:"p",href:"https://github.com/apache/shenyu-nginx/blob/main/RELEASE-NOTES.md"},"\u53d1\u5e03\u516c\u544a"),"\uff1a"),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre"},"## ${PUBLISH.VERSION}\n\n### New Features\n\n1. xxx\n1. xxx\n...\n\n### API Changes\n\n1. xxx\n1. xxx\n...\n\n### Enhancement\n\n1. xxx\n1. xxx\n...\n\n### Refactor\n\n1. xxx\n1. xxx\n...\n\n### Bug Fix\n\n1. xxx\n1. xxx\n...\n")),(0,r.yg)("h2",{id:"\u521b\u5efa-gpg-key"},"\u521b\u5efa GPG KEY"),(0,r.yg)("blockquote",null,(0,r.yg)("p",{parentName:"blockquote"},"\u6bcf\u4e2a\u53d1\u5e03\u7ecf\u7406\u53ea\u5728\u7b2c\u4e00\u6b21\u53d1\u5e03\u65f6\u521b\u5efa GPG KEY\uff0c\u4ee5\u540e\u53d1\u5e03\u53ef\u590d\u7528\u6b64 KEY\u3002")),(0,r.yg)("p",null,(0,r.yg)("strong",{parentName:"p"},"1. \u521b\u5efa KEY")),(0,r.yg)("p",null,"\u5b89\u88c5 ",(0,r.yg)("a",{parentName:"p",href:"https://www.gnupg.org/download/index.html"},"GnuPG"),"\u3002"),(0,r.yg)("p",null,"\u6309\u7167 ",(0,r.yg)("a",{parentName:"p",href:"https://www.gnupg.org/documentation/manuals/gnupg/OpenPGP-Key-Management.html#OpenPGP-Key-Management"},"OpenPGP KEY Management")," ","[1]"," \u7684\u8bf4\u660e\u521b\u5efa KEY\uff1a"),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-shell"},"gpg --full-gen-key\n")),(0,r.yg)("p",null,"\u521b\u5efa\u6b65\u9aa4\uff08\u4ee5\u4e0b\u5185\u5bb9\u6765\u81ea\u63a7\u5236\u53f0\u8f93\u51fa\uff09\uff1a"),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-shell"},'gpg (GnuPG) 2.2.4; Copyright (C) 2017 Free Software Foundation, Inc.\nThis is free software: you are free to change and redistribute it.\nThere is NO WARRANTY, to the extent permitted by law.\n\nPlease select what kind of key you want:\n  (1) RSA and RSA (default)\n  (2) DSA and Elgamal\n  (3) DSA (sign only)\n  (4) RSA (sign only)\nYour selection? 1\nRSA keys may be between 1024 and 4096 bits long.\nWhat keysize do you want? (2048) 4096\nRequested keysize is 4096 bits\nPlease specify how long the key should be valid.\n        0 = key does not expire\n     <n>  = key expires in n days\n     <n>w = key expires in n weeks\n     <n>m = key expires in n months\n     <n>y = key expires in n years\nKey is valid for? (0)\nKey does not expire at all\nIs this correct? (y/N) y\n\nGnuPG needs to construct a user ID to identify your key.\n\nReal name: \uff08\u8bbe\u7f6e\u7528\u6237\u540d\uff09(\u4f7f\u7528apache id)\nEmail address: \uff08\u8bbe\u7f6e\u90ae\u4ef6\u5730\u5740\uff09(\u4f7f\u7528apache\u90ae\u7bb1)\nComment: \uff08\u586b\u5199\u6ce8\u91ca\uff09\nYou selected this USER-ID:\n   "\u7528\u6237\u540d (\u6ce8\u91ca) <\u90ae\u4ef6\u5730\u5740>"\n\nChange (N)ame, (C)omment, (E)mail or (O)kay/(Q)uit? O\nYou need a Passphrase to protect your secret key. \uff08\u8bbe\u7f6e\u5bc6\u7801\uff09\n')),(0,r.yg)("p",null,(0,r.yg)("strong",{parentName:"p"},"2. \u68c0\u67e5 KEY")),(0,r.yg)("p",null,"\u6309\u7167 ",(0,r.yg)("a",{parentName:"p",href:"https://www.gnupg.org/documentation/manuals/gnupg/Operational-GPG-Commands.html#Operational-GPG-Commands"},"Operational GPG Commands")," ","[2]"," \u7684\u8bf4\u660e\u68c0\u67e5 KEY\uff1a"),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-shell"},"gpg --list-keys\n")),(0,r.yg)("p",null,"\u547d\u4ee4\u8f93\u51fa\uff1a"),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-shell"},"pub   rsa4096 2019-03-11 [SC]\n      095E0D21BC28CFC7A8B8076DF7DF28D237A8048C\nuid           \u7528\u6237\u540d (\u6ce8\u91ca) <\u90ae\u4ef6\u5730\u5740>\nsub   rsa4096 2019-03-11 [E]\n")),(0,r.yg)("p",null,"\u516c\u94a5\u4e3a 095E0D21BC28CFC7A8B8076DF7DF28D237A8048C\u3002"),(0,r.yg)("p",null,(0,r.yg)("strong",{parentName:"p"},"3. \u4e0a\u4f20\u516c\u94a5")),(0,r.yg)("p",null,"\u6309\u7167 ",(0,r.yg)("a",{parentName:"p",href:"https://www.gnupg.org/documentation/manuals/gnupg/Dirmngr-Options.html#Dirmngr-Options"},"Dirmngr Options")," ","[3]"," \u7684\u8bf4\u660e\u4e0a\u4f20\u516c\u94a5\uff1a"),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-shell"},"gpg --send-key 095E0D21BC28CFC7A8B8076DF7DF28D237A8048C\n")),(0,r.yg)("h2",{id:"\u53d1\u5e03\u524d\u7684\u51c6\u5907\u5de5\u4f5c"},"\u53d1\u5e03\u524d\u7684\u51c6\u5907\u5de5\u4f5c"),(0,r.yg)("p",null,(0,r.yg)("strong",{parentName:"p"},"1. \u53d1\u5e03\u4e00\u4e2a\u65b0\u6807\u7b7e")),(0,r.yg)("p",null,"\u4e0b\u8f7d\u5e76\u5b89\u88c5 ",(0,r.yg)("a",{parentName:"p",href:"https://git-scm.com/downloads"},"Git"),"."),(0,r.yg)("p",null,"\u521b\u5efa\u5e76\u5207\u6362\u5230 ",(0,r.yg)("inlineCode",{parentName:"p"},"${PUBLISH.VERSION}")," \u6807\u7b7e."),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-shell"},'git clone https://github.com/apache/shenyu-nginx.git ~/shenyu-nginx\ncd ~/shenyu-nginx/\ngit checkout main\ngit tag -a ${PUBLISH.VERSION} -m "${PUBLISH.VERSION} release apache shenyu nginx"\n')),(0,r.yg)("p",null,"\u63d0\u4ea4\u66f4\u65b0\u7248\u672c\u53f7\u540e\u7684\u4ee3\u7801\u548c\u65b0\u6807\u7b7e\u3002"),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-shell"},"git push origin ${PUBLISH.VERSION}\n")),(0,r.yg)("h2",{id:"\u53d1\u5e03\u5230-svn-\u9884\u53d1\u4ed3\u5e93"},"\u53d1\u5e03\u5230 SVN \u9884\u53d1\u4ed3\u5e93"),(0,r.yg)("p",null,"\u4e0b\u8f7d\u5e76\u5b89\u88c5",(0,r.yg)("a",{parentName:"p",href:"https://tortoisesvn.net/downloads.html"},"SVN"),"\u3002"),(0,r.yg)("p",null,(0,r.yg)("strong",{parentName:"p"},"1. \u66f4\u65b0 KEYS \u6587\u4ef6")),(0,r.yg)("blockquote",null,(0,r.yg)("p",{parentName:"blockquote"},"\u5982\u679c\u53d1\u5e03\u7ecf\u7406\u8fd8\u6ca1\u6709\u5c06\u81ea\u5df1\u7684\u516c\u94a5\u8ffd\u52a0\u5230 KEYS \u6587\u4ef6\u4e2d\uff0c\u8bf7\u6267\u884c\u4ee5\u4e0b\u64cd\u4f5c\u3002\u5426\u5219\uff0c\u8df3\u8fc7\u6b64\u6b65\u9aa4\u3002")),(0,r.yg)("p",null,"\u6839\u636e ",(0,r.yg)("a",{parentName:"p",href:"https://infra.apache.org/release-signing.html#signing-basics"},"signing basics")," ","[5]"," \u7684\u8bf4\u660e\u66f4\u65b0 KEYS \u6587\u4ef6\u3002"),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-shell"},'mkdir -p ~/keys/release/\ncd ~/keys/release/\nsvn --username=${LDAP ID} co https://dist.apache.org/repos/dist/release/shenyu\ncd ~/keys/release/shenyu\ngpg -a --export ${GPG \u7528\u6237\u540d} >> KEYS\nsvn --username=${LDAP ID} commit -m "append to KEYS"\n')),(0,r.yg)("p",null,(0,r.yg)("strong",{parentName:"p"},"2. \u6dfb\u52a0\u6e90\u7801\u5305\u548c\u4e8c\u8fdb\u5236\u6587\u4ef6\u5305")),(0,r.yg)("p",null,"\u6839\u636e ",(0,r.yg)("a",{parentName:"p",href:"https://infra.apache.org/release-publishing.html#uploading"},"Uploading packages")," ","[6]"," \u7684\u8bf4\u660e\u6dfb\u52a0\u6e90\u7801\u5305\u548c\u4e8c\u8fdb\u5236\u6587\u4ef6\u5305\u3002"),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-shell"},"# create release folder and check out svn dev repo\nmkdir -p ~/svn_release/dev/\ncd ~/svn_release/dev/\nsvn --username=${LDAP ID} co https://dist.apache.org/repos/dist/dev/shenyu\nmkdir -p ~/svn_release/dev/shenyu/shenyu-nginx/${PUBLISH.VERSION}\n\n# generate source file\ngit archive --format=tar --prefix=shenyu-nginx-${PUBLISH.VERSION}/ ${PUBLISH.VERSION} | gzip > shenyu-nginx-${PUBLISH.VERSION}-src.tar.gz\n\n# generate sign file for each files\ngpg -u <id>@apache.org --armor --output shenyu-nginx-${PUBLISH.VERSION}-src.tar.gz.asc --detach-sign shenyu-nginx-${PUBLISH.VERSION}-src.tar.gz\n\n# copy source files and\ncd ~/svn_release/dev/shenyu/shenyu-nginx/${PUBLISH.VERSION}\ncp -f ~/shenyu/shenyu-nginx/shenyu-nginx-${PUBLISH.VERSION}-src.tar.gz ~/svn_release/dev/shenyu/shenyu-nginx/${PUBLISH.VERSION}\ncp -f ~/shenyu/shenyu-nginx/shenyu-nginx-${PUBLISH.VERSION}-src.tar.gz.asc ~/svn_release/dev/shenyu/shenyu-nginx/${PUBLISH.VERSION}\n")),(0,r.yg)("p",null,(0,r.yg)("strong",{parentName:"p"},"3. \u6dfb\u52a0\u6821\u9a8c\u6587\u4ef6")),(0,r.yg)("p",null,"\u6839\u636e ",(0,r.yg)("a",{parentName:"p",href:"https://infra.apache.org/release-distribution#sigs-and-sums"},"Requirements for cryptographic signatures and checksums")," ","[7]"," \u7684\u8bf4\u660e\u6dfb\u52a0\u6821\u9a8c\u6587\u4ef6\u3002"),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-shell"},"# go to release folder\ncd ~/svn_release/dev/shenyu/shenyu-nginx/${PUBLISH.VERSION}\nshasum -a 512 shenyu-nginx-${PUBLISH.VERSION}-src.tar.gz > shenyu-nginx-${PUBLISH.VERSION}-src.tar.gz.sha512\n")),(0,r.yg)("p",null,(0,r.yg)("strong",{parentName:"p"},"4. \u63d0\u4ea4\u65b0\u7248\u672c")),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-shell"},'cd ~/svn_release/dev/shenyu/shenyu-nginx\nsvn add ${PUBLISH.VERSION}/\nsvn --username=${LDAP ID} commit -m "release apache shenyu nginx ${PUBLISH.VERSION}"\n')),(0,r.yg)("h2",{id:"\u9884\u53d1\u7248\u672c\u9a8c\u8bc1"},"\u9884\u53d1\u7248\u672c\u9a8c\u8bc1"),(0,r.yg)("p",null,(0,r.yg)("strong",{parentName:"p"},"1. \u9a8c\u8bc1 sha512 \u6821\u9a8c\u548c")),(0,r.yg)("p",null,"\u6839\u636e ",(0,r.yg)("a",{parentName:"p",href:"https://www.apache.org/info/verification.html#CheckingHashes"},"Checking Hashes")," ","[8]"," \u7684\u8bf4\u660e\u9a8c\u8bc1 sha512 \u6821\u9a8c\u548c\u3002"),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-shell"},"shasum -c shenyu-nginx-${PUBLISH.VERSION}-src.tar.gz.sha512\n")),(0,r.yg)("p",null,(0,r.yg)("strong",{parentName:"p"},"2. \u9a8c\u8bc1 GPG \u7b7e\u540d")),(0,r.yg)("p",null,"\u6839\u636e ",(0,r.yg)("a",{parentName:"p",href:"https://www.apache.org/info/verification.html#CheckingSignatures"},"Checking Signatures")," ","[9]"," \u7684\u8bf4\u660e\u9a8c\u8bc1 GPG \u7b7e\u540d\u3002"),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-shell"},"curl https://downloads.apache.org/shenyu/KEYS >> KEYS\ngpg --import KEYS\ngpg --verify shenyu-nginx-source.zip.asc shenyu-nginx-${PUBLISH.VERSION}-src.tar.gz\n")),(0,r.yg)("p",null,(0,r.yg)("strong",{parentName:"p"},"3. \u786e\u4fdd SVN \u4e0e GitHub \u6e90\u7801\u4e00\u81f4")),(0,r.yg)("p",null,"\u6839\u636e ",(0,r.yg)("a",{parentName:"p",href:"https://cwiki.apache.org/confluence/display/INCUBATOR/Incubator+Release+Checklist"},"Incubator Release Checklist")," ","[10]"," \u7684\u8bf4\u660e\u786e\u4fdd SVN \u4e0e GitHub \u6e90\u7801\u4e00\u81f4\u3002"),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-shell"},"wget https://github.com/apache/shenyu-nginx/archive/${PUBLISH.VERSION}.zip\nunzip ${PUBLISH.VERSION}.zip\nmvn shenyu-nginx-${PUBLISH.VERSION} shenyu-nginx-${PUBLISH.VERSION}-src \ntar xzf shenyu-nginx-v${PUBLISH.VERSION}-src.tar.gz\ndiff -r shenyu-nginx-${PUBLISH.VERSION}-src shenyu-nginx-v${PUBLISH.VERSION}\n")),(0,r.yg)("p",null,(0,r.yg)("strong",{parentName:"p"},"4. \u68c0\u67e5\u6e90\u7801\u5305")),(0,r.yg)("p",null,"\u6839\u636e ",(0,r.yg)("a",{parentName:"p",href:"https://cwiki.apache.org/confluence/display/INCUBATOR/Incubator+Release+Checklist"},"Incubator Release Checklist")," ","[10]"," \u7684\u8bf4\u660e\u68c0\u67e5\u6e90\u7801\u5305\u3002"),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},"\u5b58\u5728 ",(0,r.yg)("inlineCode",{parentName:"li"},"LICENSE")," \u548c ",(0,r.yg)("inlineCode",{parentName:"li"},"NOTICE")," \u6587\u4ef6"),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("inlineCode",{parentName:"li"},"NOTICE")," \u6587\u4ef6\u4e2d\u7684\u5e74\u4efd\u6b63\u786e"),(0,r.yg)("li",{parentName:"ul"},"\u6240\u6709\u6587\u4ef6\u7684\u5f00\u5934\u90fd\u6709 ASF \u8bb8\u53ef\u8bc1"),(0,r.yg)("li",{parentName:"ul"},"\u4e0d\u5b58\u5728\u672a\u4f9d\u8d56\u8f6f\u4ef6\u7684 ",(0,r.yg)("inlineCode",{parentName:"li"},"LICENSE")," \u548c ",(0,r.yg)("inlineCode",{parentName:"li"},"NOTICE")),(0,r.yg)("li",{parentName:"ul"},"\u4e0d\u5b58\u5728\u4e0d\u7b26\u5408\u9884\u671f\u7684\u4e8c\u8fdb\u5236\u6587\u4ef6"),(0,r.yg)("li",{parentName:"ul"},"\u7f16\u8bd1\u901a\u8fc7 (luarocks make rockspec/shenyu-nginx-${PUBLISH.VERSION}.rockspec)"),(0,r.yg)("li",{parentName:"ul"},"\u5982\u679c\u5b58\u5728\u7b2c\u4e09\u65b9\u4ee3\u7801\u4f9d\u8d56\uff1a",(0,r.yg)("ul",{parentName:"li"},(0,r.yg)("li",{parentName:"ul"},"\u7b2c\u4e09\u65b9\u4ee3\u7801\u4f9d\u8d56\u7684\u8bb8\u53ef\u8bc1\u517c\u5bb9")))),(0,r.yg)("p",null,(0,r.yg)("strong",{parentName:"p"},"5. \u68c0\u67e5\u4e8c\u8fdb\u5236\u5305")),(0,r.yg)("p",null,"\u6839\u636e ",(0,r.yg)("a",{parentName:"p",href:"https://infra.apache.org/licensing-howto.html#binary"},"Binary distributions")," ","[11]"," \u7684\u8bf4\u660e\u68c0\u67e5\u4e8c\u8fdb\u5236\u5305\u3002"),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},"\u5b58\u5728 ",(0,r.yg)("inlineCode",{parentName:"li"},"LICENSE")," \u548c ",(0,r.yg)("inlineCode",{parentName:"li"},"NOTICE")," \u6587\u4ef6"),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("inlineCode",{parentName:"li"},"NOTICE")," \u6587\u4ef6\u4e2d\u7684\u5e74\u4efd\u6b63\u786e"),(0,r.yg)("li",{parentName:"ul"},"\u6240\u6709\u6587\u672c\u6587\u4ef6\u5f00\u5934\u90fd\u6709 ASF \u8bb8\u53ef\u8bc1"),(0,r.yg)("li",{parentName:"ul"},"\u4e0d\u5b58\u5728\u672a\u4f9d\u8d56\u8f6f\u4ef6\u7684 ",(0,r.yg)("inlineCode",{parentName:"li"},"LICENSE")," \u548c ",(0,r.yg)("inlineCode",{parentName:"li"},"NOTICE")),(0,r.yg)("li",{parentName:"ul"},"\u5982\u679c\u5b58\u5728\u7b2c\u4e09\u65b9\u4ee3\u7801\u4f9d\u8d56\uff1a",(0,r.yg)("ul",{parentName:"li"},(0,r.yg)("li",{parentName:"ul"},"\u7b2c\u4e09\u65b9\u4ee3\u7801\u4f9d\u8d56\u7684\u8bb8\u53ef\u8bc1\u517c\u5bb9")))),(0,r.yg)("h2",{id:"\u6295\u7968\u6d41\u7a0b"},"\u6295\u7968\u6d41\u7a0b"),(0,r.yg)("p",null,"\u6839\u636e ",(0,r.yg)("a",{parentName:"p",href:"https://www.apache.org/legal/release-policy.html#release-approval"},"RELEASE APPROVAL")," ","[12]","\uff0c ",(0,r.yg)("a",{parentName:"p",href:"https://incubator.apache.org/policy/incubation.html#Releases"},"Releases")," ","[13]","\uff0c ",(0,r.yg)("a",{parentName:"p",href:"https://www.apache.org/foundation/voting.html"},"voting")," ","[14]"," \u7684\u8bf4\u660e\u8fdb\u884c\u793e\u533a\u6295\u7968\u3002"),(0,r.yg)("h3",{id:"shenyu-\u793e\u533a\u6295\u7968"},"ShenYu \u793e\u533a\u6295\u7968"),(0,r.yg)("p",null,(0,r.yg)("strong",{parentName:"p"},"1. \u6295\u7968\u6301\u7eed\u81f3\u5c11 72 \u5c0f\u65f6\u5e76\u83b7\u5f97 3 \u4e2a",(0,r.yg)("inlineCode",{parentName:"strong"},"+1 binding"),"\u7968")),(0,r.yg)("p",null,"\u53d1\u9001\u81f3\uff1a"),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre"},"dev@shenyu.apache.org\n")),(0,r.yg)("p",null,"\u6807\u9898\uff1a"),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre"},"[VOTE] Release Apache ShenYu Nginx ${PUBLISH.VERSION}\n")),(0,r.yg)("p",null,"\u6b63\u6587\uff1a"),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre"},"Hello ShenYu Community,\n\nThis is a call for vote to release Apache ShenYu Nginx version ${PUBLISH.VERSION}.\n\nRelease notes:\nhttps://github.com/apache/shenyu-nginx/blob/main/RELEASE-NOTES.md\n\nThe release candidates:\nhttps://dist.apache.org/repos/dist/dev/shenyu/shenyu-nginx/${PUBLISH.VERSION}/\n\nGit tag for the release:\nhttps://github.com/apache/shenyu-nginx/tree/${PUBLISH.VERSION}\n\nRelease Commit ID:\nhttps://github.com/apache/shenyu-nginx/commit/xxxxxxxxxxxxxxx\n\n\nKeys to verify the Release Candidate:\nhttps://downloads.apache.org/shenyu/KEYS\n\nLook at here for how to verify this release candidate:\nhttps://shenyu.apache.org/community/shenyu-nginx-release-guide/#check-release\n\nThe vote will be open for at least 72 hours or until necessary number of votes are reached.\n\nPlease vote accordingly:\n\n[ ] +1 approve\n\n[ ] +0 no opinion\n\n[ ] -1 disapprove with the reason\n\nChecklist for reference:\n\n[ ] Download links are valid.\n\n[ ] Checksums and PGP signatures are valid.\n\n[ ] Source code distributions have correct names matching the current release.\n\n[ ] LICENSE and NOTICE files are correct for each ShenYu Nginx repo.\n\n[ ] All files have license headers if necessary.\n\n[ ] No compiled archives bundled in source archive.\n")),(0,r.yg)("p",null,(0,r.yg)("strong",{parentName:"p"},"2. \u5ba3\u5e03\u6295\u7968\u7ed3\u679c")),(0,r.yg)("p",null,"\u53d1\u9001\u81f3\uff1a"),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre"},"dev@shenyu.apache.org\n")),(0,r.yg)("p",null,"\u6807\u9898\uff1a"),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre"},"[RESULT][VOTE] Release Apache ShenYu Nginx ${PUBLISH.VERSION}\n")),(0,r.yg)("p",null,"\u6b63\u6587\uff1a"),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre"},"We\u2019ve received 3 +1 binding votes and 2 +1 non-binding votes:\n\n+1, xxx (binding)\n+1, xxx (binding)\n+1, xxx (binding)\n+1, xxx (non-binding)\n+1, xxx (non-binding)\n\nVote thread:\nhttps://lists.apache.org/thread/xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx\n\nThanks everyone for taking the time to verify and vote for the release!\n")),(0,r.yg)("h2",{id:"\u5b8c\u6210\u53d1\u5e03"},"\u5b8c\u6210\u53d1\u5e03"),(0,r.yg)("p",null,(0,r.yg)("strong",{parentName:"p"},"1. \u5b8c\u6210 SVN \u53d1\u5e03")),(0,r.yg)("p",null,"\u6839\u636e ",(0,r.yg)("a",{parentName:"p",href:"https://infra.apache.org/release-publishing.html#uploading"},"Uploading packages")," ","[6]"," \u7684\u8bf4\u660e\u5c06\u65b0\u7248\u672c\u4ece dev \u76ee\u5f55\u8f6c\u79fb\u5230 release \u76ee\u5f55\u3002"),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-shell"},'svn mv https://dist.apache.org/repos/dist/dev/shenyu/shenyu-nginx/${PUBLISH.VERSION} https://dist.apache.org/repos/dist/release/shenyu/shenyu-nginx -m "transfer packages for ${PUBLISH.VERSION}"\nsvn delete https://dist.apache.org/repos/dist/release/shenyu/shenyu-nginx/${PREVIOUS.RELEASE.VERSION}\n')),(0,r.yg)("p",null,(0,r.yg)("strong",{parentName:"p"},"2. \u5b8c\u6210 GitHub release")),(0,r.yg)("p",null,"\u7f16\u8f91 ",(0,r.yg)("a",{parentName:"p",href:"https://github.com/apache/shenyu-nginx/releases"},"Releases")," ",(0,r.yg)("inlineCode",{parentName:"p"},"${PUBLISH.VERSION}"),"\u70b9\u51fb Release."),(0,r.yg)("p",null,(0,r.yg)("strong",{parentName:"p"},"3. \u66f4\u65b0\u4e0b\u8f7d\u9875\u9762")),(0,r.yg)("p",null,"\u6839\u636e ",(0,r.yg)("a",{parentName:"p",href:"https://infra.apache.org/release-download-pages.html"},"Release Download Pages for Projects")," ","[15]","\uff0c ",(0,r.yg)("a",{parentName:"p",href:"https://infra.apache.org/release-publishing.html#normal"},"Normal distribution on the Apache downloads site")," ","[16]"," \u7684\u8bf4\u660e\u66f4\u65b0\u4e0b\u8f7d\u9875\u9762\u3002"),(0,r.yg)("p",null,"Apache \u955c\u50cf\u8fde\u63a5\u751f\u6548\u540e\uff08\u81f3\u5c11\u4e00\u5c0f\u65f6\uff09\uff0c\u66f4\u65b0\u4e0b\u8f7d\u9875\u9762\uff1a\n",(0,r.yg)("a",{parentName:"p",href:"https://shenyu.apache.org/download/"},"\u82f1\u6587\u7248")," \u548c\n",(0,r.yg)("a",{parentName:"p",href:"https://shenyu.apache.org/zh/download/"},"\u4e2d\u6587\u7248")),(0,r.yg)("blockquote",null,(0,r.yg)("p",{parentName:"blockquote"},"\u6ce8\u610f\uff1a\u9879\u76ee\u4e0b\u8f7d\u94fe\u63a5\u5e94\u8be5\u4f7f\u7528 ",(0,r.yg)("a",{parentName:"p",href:"https://www.apache.org/dyn/closer.lua"},"https://www.apache.org/dyn/closer.lua")," \u800c\u4e0d\u662f closer.cgi \u6216\u8005 mirrors.cgi"),(0,r.yg)("p",{parentName:"blockquote"},"\u6ce8\u610f\uff1aGPG \u7b7e\u540d\u6587\u4ef6\u548c\u54c8\u5e0c\u6821\u9a8c\u6587\u4ef6\u7684\u4e0b\u8f7d\u8fde\u63a5\u5fc5\u987b\u4f7f\u7528\u8fd9\u4e2a\u524d\u7f00\uff1a",(0,r.yg)("inlineCode",{parentName:"p"},"https://downloads.apache.org/shenyu/"))),(0,r.yg)("p",null,(0,r.yg)("strong",{parentName:"p"},"4. \u66f4\u65b0\u6587\u6863")),(0,r.yg)("p",null,"\u5c06 ",(0,r.yg)("inlineCode",{parentName:"p"},"${PUBLISH.VERSION}")," \u7248\u672c\u7684",(0,r.yg)("a",{parentName:"p",href:"https://github.com/apache/shenyu-website"},"\u6587\u6863"),"\u8fdb\u884c\u5f52\u6863\uff0c\u5e76\u66f4\u65b0",(0,r.yg)("a",{parentName:"p",href:"https://shenyu.apache.org/zh/versions"},"\u7248\u672c\u9875\u9762"),"\u3002"),(0,r.yg)("p",null,(0,r.yg)("strong",{parentName:"p"},"5. \u66f4\u65b0\u4e8b\u4ef6\u9875\u9762")),(0,r.yg)("p",null,"\u6dfb\u52a0\u65b0\u7248\u672c",(0,r.yg)("a",{parentName:"p",href:"https://shenyu.apache.org/zh/event/$%7BPUBLISH.VERSION%7D-release"},"\u4e8b\u4ef6"),"\u3002"),(0,r.yg)("p",null,(0,r.yg)("strong",{parentName:"p"},"b. \u66f4\u65b0\u65b0\u95fb\u9875\u9762")),(0,r.yg)("p",null,"\u6dfb\u52a0\u65b0\u7248\u672c",(0,r.yg)("a",{parentName:"p",href:"https://shenyu.apache.org/zh/news"},"\u65b0\u95fb"),"\u3002"),(0,r.yg)("h2",{id:"\u53d1\u5e03\u516c\u544a"},"\u53d1\u5e03\u516c\u544a"),(0,r.yg)("blockquote",null,(0,r.yg)("p",{parentName:"blockquote"},"\u6ce8\u610f\uff1a",(0,r.yg)("inlineCode",{parentName:"p"},"announce@apache.org")," \u5730\u5740\u8981\u6c42\u4ee5\u7eaf\u6587\u672c\u683c\u5f0f\u53d1\u9001\u90ae\u4ef6\u3002\u5982\u679c\u4f60\u4f7f\u7528\u7684\u662f Gmail\uff0c\u53ef\u4ee5\u5728\u7f16\u8f91\u754c\u9762\u52fe\u9009",(0,r.yg)("inlineCode",{parentName:"p"},"\u7eaf\u6587\u672c\u6a21\u5f0f"),"\u3002")),(0,r.yg)("p",null,"\u53d1\u9001\u81f3\uff1a"),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre"},"dev@shenyu.apache.org\nannounce@apache.org\n")),(0,r.yg)("p",null,"\u6807\u9898\uff1a"),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre"},"[ANNOUNCE] Apache ShenYu Nginx ${PUBLISH.VERSION} available\n")),(0,r.yg)("p",null,"\u6b63\u6587\uff1a"),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre"},"Hi,\n\nApache ShenYu Team is glad to announce the new release of Apache ShenYu Nginx ${PUBLISH.VERSION}.\n\nApache ShenYu is an asynchronous, high-performance, cross-language, responsive API gateway.\nSupport various languages (http protocol), support Dubbo, Spring-Cloud, Grpc, Motan, Sofa, Tars and other protocols.\nPlugin design idea, plugin hot swap, easy to expand.\nFlexible flow filtering to meet various flow control.\nBuilt-in rich plugin support, authentication, limiting, fuse, firewall, etc.\nDynamic flow configuration, high performance.\nSupport cluster deployment, A/B Test, blue-green release.\n\nDownload Links: https://shenyu.apache.org/download/\n\nRelease Notes: https://github.com/apache/shenyu-nginx/blob/main/RELEASE-NOTES.md\n\nWebsite: https://shenyu.apache.org/\n\nShenYu Resources:\n- Issue: https://github.com/apache/shenyu/issues\n- Mailing list: dev@shenyu.apache.org\n- Documents: https://shenyu.apache.org/docs/index/\n\n\n- Apache ShenYu Team\n\n")),(0,r.yg)("h2",{id:"\u91cd\u65b0\u53d1\u5e03\u975e\u5fc5\u9700"},"\u91cd\u65b0\u53d1\u5e03\uff08\u975e\u5fc5\u9700\uff09"),(0,r.yg)("blockquote",null,(0,r.yg)("p",{parentName:"blockquote"},"\u6ce8\u610f\uff1a\u53ea\u6709\u5728\u6295\u7968\u6ca1\u6709\u901a\u8fc7\u7684\u60c5\u51b5\u4e0b\u624d\u9700\u8981\u91cd\u65b0\u53d1\u5e03\u3002")),(0,r.yg)("p",null,(0,r.yg)("strong",{parentName:"p"},"1. \u53d6\u6d88\u6295\u7968\u90ae\u4ef6\u6a21\u677f")),(0,r.yg)("p",null,"\u53d1\u9001\u81f3\uff1a"),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre"},"dev@shenyu.apache.org\n")),(0,r.yg)("p",null,"\u6807\u9898\uff1a"),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre"},"[CANCEL][VOTE] Release Apache ShenYu Nginx ${PUBLISH.VERSION}\n")),(0,r.yg)("p",null,"\u6b63\u6587\uff1a"),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre"},"Hi,\n\nI'm cancelling this vote because of xxxxxx issues. I'll fix them and start the round ${n} vote process.\nThe detail of the modifications are as follows:\n\n1. xxxxxx\n2. xxxxxx\n\nThanks a lot for all your help.\n")),(0,r.yg)("p",null,(0,r.yg)("strong",{parentName:"p"},"2. \u6e05\u7406\u9884\u53d1\u4ed3\u5e93")),(0,r.yg)("p",null,"\u8bbf\u95ee ",(0,r.yg)("a",{parentName:"p",href:"https://repository.apache.org/#stagingRepositories"},"https://repository.apache.org/#stagingRepositories"),", \u4f7f\u7528 Apache \u7684 LDAP \u8d26\u6237\u767b\u5f55\u540e\uff0c\u9009\u4e2d\u4e4b\u524d ",(0,r.yg)("inlineCode",{parentName:"p"},"Close")," \u7684\u7248\u672c\uff0c\u70b9\u51fb ",(0,r.yg)("inlineCode",{parentName:"p"},"Drop"),"\u3002"),(0,r.yg)("p",null,(0,r.yg)("strong",{parentName:"p"},"3. \u5220\u9664 GitHub \u5206\u652f\u548c\u6807\u7b7e")),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-shell"},"git push origin --delete ${PUBLISH.VERSION}-release\ngit branch -D ${PUBLISH.VERSION}-release\ngit push origin --delete tag v${PUBLISH.VERSION}\ngit tag -d v${PUBLISH.VERSION}\n")),(0,r.yg)("p",null,(0,r.yg)("strong",{parentName:"p"},"4. \u5220\u9664 SVN \u5f85\u53d1\u5e03\u5185\u5bb9")),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-shell"},'svn delete https://dist.apache.org/repos/dist/dev/shenyu/shenyu-nginx/${PUBLISH.VERSION} -m "delete ${PUBLISH.VERSION}"\n')),(0,r.yg)("p",null,(0,r.yg)("strong",{parentName:"p"},"5. \u66f4\u65b0\u90ae\u4ef6\u6807\u9898")),(0,r.yg)("p",null,"\u5b8c\u6210\u4ee5\u4e0a\u6b65\u9aa4\u540e\uff0c\u53ef\u4ee5\u5f00\u59cb\u91cd\u65b0\u8fdb\u884c\u53d1\u5e03\u64cd\u4f5c\u3002\u63a5\u4e0b\u6765\u7684\u6295\u7968\u90ae\u4ef6\u6807\u9898\u9700\u8981\u589e\u52a0 ",(0,r.yg)("inlineCode",{parentName:"p"},"[ROUND ${n}]")," \u540e\u7f00\u3002\u4f8b\u5982\uff1a"),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre"},"[VOTE] Release Apache ShenYu Nginx ${PUBLISH.VERSION} [ROUND 2]\n")),(0,r.yg)("p",null,"\u6295\u7968\u7ed3\u679c\u548c\u901a\u77e5\u90ae\u4ef6\u4e0d\u9700\u8981\u52a0\u540e\u7f00\u3002"),(0,r.yg)("p",null,(0,r.yg)("strong",{parentName:"p"},"\u4ee5\u4e0a\u5185\u5bb9\u53c2\u8003")),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},"[1]"," ",(0,r.yg)("a",{parentName:"li",href:"https://www.gnupg.org/documentation/manuals/gnupg/OpenPGP-Key-Management.html#OpenPGP-Key-Management"},"https://www.gnupg.org/documentation/manuals/gnupg/OpenPGP-Key-Management.html#OpenPGP-Key-Management")),(0,r.yg)("li",{parentName:"ul"},"[2]"," ",(0,r.yg)("a",{parentName:"li",href:"https://www.gnupg.org/documentation/manuals/gnupg/Operational-GPG-Commands.html#Operational-GPG-Commands"},"https://www.gnupg.org/documentation/manuals/gnupg/Operational-GPG-Commands.html#Operational-GPG-Commands")),(0,r.yg)("li",{parentName:"ul"},"[3]"," ",(0,r.yg)("a",{parentName:"li",href:"https://www.gnupg.org/documentation/manuals/gnupg/Dirmngr-Options.html#Dirmngr-Options"},"https://www.gnupg.org/documentation/manuals/gnupg/Dirmngr-Options.html#Dirmngr-Options")),(0,r.yg)("li",{parentName:"ul"},"[4]"," ",(0,r.yg)("a",{parentName:"li",href:"https://infra.apache.org/publishing-maven-artifacts.html"},"https://infra.apache.org/publishing-maven-artifacts.html")),(0,r.yg)("li",{parentName:"ul"},"[5]"," ",(0,r.yg)("a",{parentName:"li",href:"https://infra.apache.org/release-signing.html#signing-basics"},"https://infra.apache.org/release-signing.html#signing-basics")),(0,r.yg)("li",{parentName:"ul"},"[6]"," ",(0,r.yg)("a",{parentName:"li",href:"https://infra.apache.org/release-publishing.html#uploading"},"https://infra.apache.org/release-publishing.html#uploading")),(0,r.yg)("li",{parentName:"ul"},"[7]"," ",(0,r.yg)("a",{parentName:"li",href:"https://infra.apache.org/release-distribution#sigs-and-sums"},"https://infra.apache.org/release-distribution#sigs-and-sums")),(0,r.yg)("li",{parentName:"ul"},"[8]"," ",(0,r.yg)("a",{parentName:"li",href:"https://www.apache.org/info/verification.html#CheckingHashes"},"https://www.apache.org/info/verification.html#CheckingHashes")),(0,r.yg)("li",{parentName:"ul"},"[9]"," ",(0,r.yg)("a",{parentName:"li",href:"https://www.apache.org/info/verification.html#CheckingSignatures"},"https://www.apache.org/info/verification.html#CheckingSignatures")),(0,r.yg)("li",{parentName:"ul"},"[10]"," ",(0,r.yg)("a",{parentName:"li",href:"https://cwiki.apache.org/confluence/display/INCUBATOR/Incubator+Release+Checklist"},"https://cwiki.apache.org/confluence/display/INCUBATOR/Incubator+Release+Checklist")),(0,r.yg)("li",{parentName:"ul"},"[11]"," ",(0,r.yg)("a",{parentName:"li",href:"https://infra.apache.org/licensing-howto.html#binary"},"https://infra.apache.org/licensing-howto.html#binary")),(0,r.yg)("li",{parentName:"ul"},"[12]"," ",(0,r.yg)("a",{parentName:"li",href:"https://www.apache.org/legal/release-policy.html#release-approval"},"https://www.apache.org/legal/release-policy.html#release-approval")),(0,r.yg)("li",{parentName:"ul"},"[13]"," ",(0,r.yg)("a",{parentName:"li",href:"https://incubator.apache.org/policy/incubation.html#Releases"},"https://incubator.apache.org/policy/incubation.html#Releases")),(0,r.yg)("li",{parentName:"ul"},"[14]"," ",(0,r.yg)("a",{parentName:"li",href:"https://www.apache.org/foundation/voting.html"},"https://www.apache.org/foundation/voting.html")),(0,r.yg)("li",{parentName:"ul"},"[15]"," ",(0,r.yg)("a",{parentName:"li",href:"https://infra.apache.org/release-download-pages.html"},"https://infra.apache.org/release-download-pages.html")),(0,r.yg)("li",{parentName:"ul"},"[16]"," ",(0,r.yg)("a",{parentName:"li",href:"https://infra.apache.org/release-publishing.html#normal"},"https://infra.apache.org/release-publishing.html#normal"))))}h.isMDXComponent=!0}}]);