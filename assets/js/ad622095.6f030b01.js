"use strict";(self.webpackChunkshenyu_website=self.webpackChunkshenyu_website||[]).push([[63644],{15680:(e,n,t)=>{t.d(n,{xA:()=>d,yg:()=>h});var a=t(96540);function i(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function r(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,a)}return t}function o(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?r(Object(t),!0).forEach((function(n){i(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):r(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function l(e,n){if(null==e)return{};var t,a,i=function(e,n){if(null==e)return{};var t,a,i={},r=Object.keys(e);for(a=0;a<r.length;a++)t=r[a],n.indexOf(t)>=0||(i[t]=e[t]);return i}(e,n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)t=r[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(i[t]=e[t])}return i}var p=a.createContext({}),s=function(e){var n=a.useContext(p),t=n;return e&&(t="function"==typeof e?e(n):o(o({},n),e)),t},d=function(e){var n=s(e.components);return a.createElement(p.Provider,{value:n},e.children)},m="mdxType",c={inlineCode:"code",wrapper:function(e){var n=e.children;return a.createElement(a.Fragment,{},n)}},g=a.forwardRef((function(e,n){var t=e.components,i=e.mdxType,r=e.originalType,p=e.parentName,d=l(e,["components","mdxType","originalType","parentName"]),m=s(t),g=i,h=m["".concat(p,".").concat(g)]||m[g]||c[g]||r;return t?a.createElement(h,o(o({ref:n},d),{},{components:t})):a.createElement(h,o({ref:n},d))}));function h(e,n){var t=arguments,i=n&&n.mdxType;if("string"==typeof e||i){var r=t.length,o=new Array(r);o[0]=g;var l={};for(var p in n)hasOwnProperty.call(n,p)&&(l[p]=n[p]);l.originalType=e,l[m]="string"==typeof e?e:i,o[1]=l;for(var s=2;s<r;s++)o[s]=t[s];return a.createElement.apply(null,o)}return a.createElement.apply(null,t)}g.displayName="MDXCreateElement"},3564:(e,n,t)=>{t.r(n),t.d(n,{contentTitle:()=>o,default:()=>m,frontMatter:()=>r,metadata:()=>l,toc:()=>p});var a=t(58168),i=(t(96540),t(15680));const r={title:"Guide for New Contributors to Start avoid Pitfalls",author:"Yuxuan Zhang",author_title:"Apache ShenYu Contributor",author_url:"https://github.com/zuobiao-zhou",author_image_url:"https://avatars.githubusercontent.com/u/61108539?s=400&u=f065b78a2944f2cea9160de7f7df054e2f157867&v=4",tags:["first-start","Apache ShenYu"]},o=void 0,l={permalink:"/blog/Start-SourceCode-Analysis-Start-Demo-for-Contributor",editUrl:"https://github.com/apache/shenyu-website/edit/main/blog/Start-SourceCode-Analysis-Start-Demo-for-Contributor.md",source:"@site/blog/Start-SourceCode-Analysis-Start-Demo-for-Contributor.md",title:"Guide for New Contributors to Start avoid Pitfalls",description:"Preface",date:"2024-08-26T12:15:34.673Z",formattedDate:"August 26, 2024",tags:[{label:"first-start",permalink:"/blog/tags/first-start"},{label:"Apache ShenYu",permalink:"/blog/tags/apache-shen-yu"}],readingTime:4.95,truncated:!1,prevItem:{title:"PredicateJudge -- analyze the design based on SPI",permalink:"/blog/SPI-SourceCode-Analysis-PredicateJudge-SPI"},nextItem:{title:"Apache ShenYu Start Demo",permalink:"/blog/Start-SourceCode-Analysis-Start-Demo"}},p=[{value:"Preface",id:"preface",children:[]},{value:"Environmental Preparation",id:"environmental-preparation",children:[]},{value:"ShenYu Backend Startup Guide",id:"shenyu-backend-startup-guide",children:[{value:"Install and Configure Maven",id:"install-and-configure-maven",children:[]},{value:"Pull ShenYu Code",id:"pull-shenyu-code",children:[]},{value:"ShenYu First Start",id:"shenyu-first-start",children:[]},{value:"Use more plugins",id:"use-more-plugins",children:[]}]},{value:"Shenyu Front End Startup Guide",id:"shenyu-front-end-startup-guide",children:[{value:"Install Node.js",id:"install-nodejs",children:[]},{value:"Pull ShenYu Dashboard Code",id:"pull-shenyu-dashboard-code",children:[]},{value:"Front and Back End Co-development",id:"front-and-back-end-co-development",children:[]},{value:"Package Front-end Code",id:"package-front-end-code",children:[]}]},{value:"Contribute to Shenyu Official Website",id:"contribute-to-shenyu-official-website",children:[{value:"Tips",id:"tips",children:[]}]}],s={toc:p},d="wrapper";function m(e){let{components:n,...t}=e;return(0,i.yg)(d,(0,a.A)({},s,t,{components:n,mdxType:"MDXLayout"}),(0,i.yg)("h2",{id:"preface"},"Preface"),(0,i.yg)("p",null,"As a first-time developer in the ",(0,i.yg)("inlineCode",{parentName:"p"},"Shenyu"),' community, I encountered some "Pitfalls" that were not mentioned in the tutorials I followed to start and develop the project. I have documented the detailed steps I took to start ',(0,i.yg)("inlineCode",{parentName:"p"},"shenyu"),", ",(0,i.yg)("inlineCode",{parentName:"p"},"shenyu-dashboard"),", ",(0,i.yg)("inlineCode",{parentName:"p"},"shenyu-website")," in this blog, hoping to help more new contributors in the community."),(0,i.yg)("h2",{id:"environmental-preparation"},"Environmental Preparation"),(0,i.yg)("ul",null,(0,i.yg)("li",{parentName:"ul"},"Correct local installation of ",(0,i.yg)("inlineCode",{parentName:"li"},"JDK1.8+")),(0,i.yg)("li",{parentName:"ul"},"Properly install ",(0,i.yg)("inlineCode",{parentName:"li"},"Git")," locally"),(0,i.yg)("li",{parentName:"ul"},"Choose a development tool, this article uses ",(0,i.yg)("inlineCode",{parentName:"li"},"IDEA")," as an example")),(0,i.yg)("h2",{id:"shenyu-backend-startup-guide"},"ShenYu Backend Startup Guide"),(0,i.yg)("h3",{id:"install-and-configure-maven"},"Install and Configure Maven"),(0,i.yg)("p",null,"Maven is a cross-platform project management tool . As the Apache organization's top open source projects , its main service for Java-based platform project creation , dependency management and project information management."),(0,i.yg)("ol",null,(0,i.yg)("li",{parentName:"ol"},(0,i.yg)("p",{parentName:"li"},(0,i.yg)("a",{parentName:"p",href:"https://maven.apache.org/download.cgi"},"Download maven")," and extract it to a path with no Chinese and no spaces."),(0,i.yg)("img",{src:"/img/activities/start-demo-for-contributor/maven-install.png",width:"100%",height:"100%"})),(0,i.yg)("li",{parentName:"ol"},(0,i.yg)("p",{parentName:"li"},"Add the ",(0,i.yg)("inlineCode",{parentName:"p"},"bin")," directory under the ",(0,i.yg)("inlineCode",{parentName:"p"},"maven")," directory to the environment variables. For ",(0,i.yg)("inlineCode",{parentName:"p"},"Windows"),", if the download directory is ",(0,i.yg)("inlineCode",{parentName:"p"},"E:\\apache-maven-3.9.1"),", add ",(0,i.yg)("inlineCode",{parentName:"p"},"E:\\apache-maven-3.9.1\\bin")," to the ",(0,i.yg)("inlineCode",{parentName:"p"},"Path")," system variable.")),(0,i.yg)("li",{parentName:"ol"},(0,i.yg)("p",{parentName:"li"},"Verify that the installation was successful. Type ",(0,i.yg)("inlineCode",{parentName:"p"},"mvn -v")," in the cmd window, and if the Maven version and Java version appear, the installation is successful. This is shown below:"),(0,i.yg)("pre",{parentName:"li"},(0,i.yg)("code",{parentName:"pre",className:"language-shell"},'C:\\Users\\pc>mvn -v\nApache Maven 3.9.1 (2e178502fcdbffc201671fb2537d0cb4b4cc58f8)\nMaven home: E:\\apache-maven-3.9.1\nJava version: 18.0.1.1, vendor: Oracle Corporation, runtime: C:\\Program Files\\Java\\jdk-18.0.1.1\nDefault locale: zh_CN, platform encoding: UTF-8\nOS name: "windows 10", version: "10.0", arch: "amd64", family: "windows"\n'))),(0,i.yg)("li",{parentName:"ol"},(0,i.yg)("p",{parentName:"li"},"To speed up the download of project-related dependencies, you need to change the Maven mirrors, here add Aliyun and other mirrors. Change the ",(0,i.yg)("inlineCode",{parentName:"p"},"<mirrors> </mirrors>")," tag pair in ",(0,i.yg)("inlineCode",{parentName:"p"},"conf/settings.xml")," to the following:"),(0,i.yg)("pre",{parentName:"li"},(0,i.yg)("code",{parentName:"pre",className:"language-xml"},"<mirrors>\n    <mirror>\n    <id>alimaven</id>\n    <name>aliyun maven</name>\n    <url>http://maven.aliyun.com/nexus/content/groups/public/</url>\n    <mirrorOf>central</mirrorOf>\n    </mirror>\n\n    <mirror>\n    <id>alimaven</id>\n    <mirrorOf>central</mirrorOf>\n    <name>aliyun maven</name>\n    <url>http://maven.aliyun.com/nexus/content/repositories/central/</url>\n    </mirror>\n\n    <mirror>\n    <id>maven</id>\n    <mirrorOf>central</mirrorOf>\n    <name>name_</name>\n    <url>http://repo1.maven.org/maven2</url>\n    </mirror> \n\n    <mirror>\n    <id>junit</id>\n    <mirrorOf>central</mirrorOf>\n    <name>junit address/</name>\n    <url>http://jcenter.bintray.com/</url>\n    </mirror>\n</mirrors>\n")),(0,i.yg)("p",{parentName:"li"},"and add ",(0,i.yg)("inlineCode",{parentName:"p"},"<localRepository>E:/maven_local_repository</localRepository>")," to the next line of ",(0,i.yg)("inlineCode",{parentName:"p"},"</mirrors>")," to set the location of Maven local repository. You can specify the exact location yourself."))),(0,i.yg)("h3",{id:"pull-shenyu-code"},"Pull ShenYu Code"),(0,i.yg)("ol",null,(0,i.yg)("li",{parentName:"ol"},(0,i.yg)("p",{parentName:"li"},"Fork ",(0,i.yg)("a",{parentName:"p",href:"https://github.com/apache/shenyu"},"ShenYu")," repository on Github to your own repository, where you can develop and commit PRs in the future")),(0,i.yg)("li",{parentName:"ol"},(0,i.yg)("p",{parentName:"li"},"Use Git to download the repository from the previous step locally:"),(0,i.yg)("pre",{parentName:"li"},(0,i.yg)("code",{parentName:"pre",className:"language-shell"},"git clone git@github.com:${YOUR_USERNAME}/${TARGET_REPO}.git\n")),(0,i.yg)("p",{parentName:"li"},"If prompted for a long file name, execute the following command via the command line:"),(0,i.yg)("pre",{parentName:"li"},(0,i.yg)("code",{parentName:"pre",className:"language-shell"},"git config --global core.longpaths true\n")))),(0,i.yg)("h3",{id:"shenyu-first-start"},"ShenYu First Start"),(0,i.yg)("h4",{id:"preparation"},"Preparation"),(0,i.yg)("ol",null,(0,i.yg)("li",{parentName:"ol"},(0,i.yg)("p",{parentName:"li"},"Compile with Maven in the ",(0,i.yg)("inlineCode",{parentName:"p"},"shenyu")," directory:"),(0,i.yg)("pre",{parentName:"li"},(0,i.yg)("code",{parentName:"pre",className:"language-shell"},"mvn clean install -Dmaven.javadoc.skip=true -B -Drat.skip=true -Djacoco.skip=true -DskipITs -DskipTests\n"))),(0,i.yg)("li",{parentName:"ol"},(0,i.yg)("p",{parentName:"li"},"Configure IDEA environment. Open ",(0,i.yg)("inlineCode",{parentName:"p"},"shenyu")," project with IDEA, click ",(0,i.yg)("inlineCode",{parentName:"p"},"File")," -> ",(0,i.yg)("inlineCode",{parentName:"p"},"Settings")," in the top left corner, and configure Maven as shown below. Where ",(0,i.yg)("inlineCode",{parentName:"p"},"User settings file")," select your ",(0,i.yg)("inlineCode",{parentName:"p"},"settings.xml")," directory, and then ",(0,i.yg)("inlineCode",{parentName:"p"},"Local repository")," will automatically load the ",(0,i.yg)("inlineCode",{parentName:"p"},"localRepository")," path set in ",(0,i.yg)("inlineCode",{parentName:"p"},"settings.xml"),":"),(0,i.yg)("img",{src:"/img/activities/start-demo-for-contributor/idea-config.png",width:"60%",height:"60%"})),(0,i.yg)("li",{parentName:"ol"},(0,i.yg)("p",{parentName:"li"},"At this point, IDEA will automatically download the project-related dependencies, you need to wait for a while, when finished, as shown in the following figure:"),(0,i.yg)("img",{src:"/img/activities/start-demo-for-contributor/project-without-example.png",width:"60%",height:"60%"}),(0,i.yg)("p",{parentName:"li"},"As you can see, ",(0,i.yg)("inlineCode",{parentName:"p"},"shenyu-e2e"),", ",(0,i.yg)("inlineCode",{parentName:"p"},"shenyu-examples"),", ",(0,i.yg)("inlineCode",{parentName:"p"},"shenyu-integrated-test")," are not marked as Maven projects by IDEA and need to be added manually. Select the ",(0,i.yg)("inlineCode",{parentName:"p"},"pom.xml")," file in the package and right-click ",(0,i.yg)("inlineCode",{parentName:"p"},"Add as Maven Project"),".\nIf the shenyu-e2e build fails, then add the ",(0,i.yg)("inlineCode",{parentName:"p"},"<relativePath>. /pom.xml</relativePath>")," to ",(0,i.yg)("inlineCode",{parentName:"p"},"<relativePath/>"),"."))),(0,i.yg)("h4",{id:"start-gateway-service"},"Start Gateway Service"),(0,i.yg)("ol",null,(0,i.yg)("li",{parentName:"ol"},(0,i.yg)("p",{parentName:"li"},"Start the ",(0,i.yg)("inlineCode",{parentName:"p"},"shenyu-admin")," console (H2 database is used by default)"),(0,i.yg)("img",{src:"/img/activities/start-demo-for-contributor/admin.png",width:"60%",height:"60%"})),(0,i.yg)("li",{parentName:"ol"},(0,i.yg)("p",{parentName:"li"},"start ",(0,i.yg)("inlineCode",{parentName:"p"},"shenyu-bootstrap")),(0,i.yg)("img",{src:"/img/activities/start-demo-for-contributor/bootstrap.png",width:"100%",height:"100%"}))),(0,i.yg)("blockquote",null,(0,i.yg)("p",{parentName:"blockquote"},"By this point, the shenyu gateway has been started."),(0,i.yg)("p",{parentName:"blockquote"},"We can open the browser and access the admin console: ",(0,i.yg)("a",{parentName:"p",href:"http://localhost:9095/"},"http://localhost:9095/")),(0,i.yg)("p",{parentName:"blockquote"},"Default account: admin , default password: 123456")),(0,i.yg)("h4",{id:"start-application-service"},"Start Application Service"),(0,i.yg)("p",null,"Apache ShenYu provides samples of Http, Dubbo, SpringCloud and other applications to access the shenyu gateway, located in the ",(0,i.yg)("inlineCode",{parentName:"p"},"shenyu-example")," module, here the ",(0,i.yg)("inlineCode",{parentName:"p"},"Http service")," is used as an example."),(0,i.yg)("p",null,"Start ",(0,i.yg)("inlineCode",{parentName:"p"},"shenyu-examples-http"),"\u3002"),(0,i.yg)("img",{src:"/img/activities/start-demo-for-contributor/shenyu-examples-http.png",width:"80%",height:"80%"}),(0,i.yg)("p",null,"At this point, ",(0,i.yg)("inlineCode",{parentName:"p"},"shenyu-examples-http")," will automatically register the interface methods annotated with ",(0,i.yg)("inlineCode",{parentName:"p"},"@ShenyuSpringMvcClient")," and the relevant configuration in application.yml to the gateway. We can open the ",(0,i.yg)("a",{parentName:"p",href:"http://localhost:9095/"},"admin console")," and see the configuration in ",(0,i.yg)("inlineCode",{parentName:"p"},"Client List -> Proxy -> divide"),"."),(0,i.yg)("h4",{id:"test-http-request"},"Test Http Request"),(0,i.yg)("p",null,"The following uses the ",(0,i.yg)("inlineCode",{parentName:"p"},"IDEA HTTP Client Plugin")," to mock http to access http services."),(0,i.yg)("ul",null,(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("p",{parentName:"li"},"Local access without using shenyu proxy"),(0,i.yg)("img",{src:"/img/activities/start-demo-for-contributor/shenyu-http-test-api-local.png",width:"60%",height:"60%"})),(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("p",{parentName:"li"},"Use shenyu proxy"),(0,i.yg)("img",{src:"/img/activities/start-demo-for-contributor/shenyu-http-test-api.png",width:"60%",height:"60%"}))),(0,i.yg)("h3",{id:"use-more-plugins"},"Use more plugins"),(0,i.yg)("p",null,"We can refer to the ",(0,i.yg)("a",{parentName:"p",href:"../docs/index"},"official documentation")," to the left of ",(0,i.yg)("inlineCode",{parentName:"p"},"Plugins collection")," to use the required plugins."),(0,i.yg)("h2",{id:"shenyu-front-end-startup-guide"},"Shenyu Front End Startup Guide"),(0,i.yg)("h3",{id:"install-nodejs"},"Install Node.js"),(0,i.yg)("h4",{id:"download"},"Download"),(0,i.yg)("ol",null,(0,i.yg)("li",{parentName:"ol"},(0,i.yg)("p",{parentName:"li"},"Download and install Node.js from ",(0,i.yg)("a",{parentName:"p",href:"https://nodejs.org/en"},"official website")," and select ",(0,i.yg)("inlineCode",{parentName:"p"},"LTS")," version.")),(0,i.yg)("li",{parentName:"ol"},(0,i.yg)("p",{parentName:"li"},"When installing, except for setting the installation path, just keep clicking ",(0,i.yg)("inlineCode",{parentName:"p"},"Next"),".")),(0,i.yg)("li",{parentName:"ol"},(0,i.yg)("p",{parentName:"li"},"After the installation is complete, verify at the command line:"),(0,i.yg)("pre",{parentName:"li"},(0,i.yg)("code",{parentName:"pre",className:"language-shell"},"C:\\Users\\pc>node -v\nv12.22.12\n\nC:\\Users\\pc>npm -v\n6.14.16\n")))),(0,i.yg)("h3",{id:"pull-shenyu-dashboard-code"},"Pull ShenYu Dashboard Code"),(0,i.yg)("ol",null,(0,i.yg)("li",{parentName:"ol"},(0,i.yg)("p",{parentName:"li"},"Fork ",(0,i.yg)("a",{parentName:"p",href:"https://github.com/apache/shenyu-dashboard"},"ShenYu Dashboard")," repository")),(0,i.yg)("li",{parentName:"ol"},(0,i.yg)("p",{parentName:"li"},"Using Git to download locally"),(0,i.yg)("pre",{parentName:"li"},(0,i.yg)("code",{parentName:"pre",className:"language-shell"},"git clone git@github.com:${YOUR_USERNAME}/${TARGET_REPO}.git\n")))),(0,i.yg)("h3",{id:"front-and-back-end-co-development"},"Front and Back End Co-development"),(0,i.yg)("ol",null,(0,i.yg)("li",{parentName:"ol"},(0,i.yg)("p",{parentName:"li"},"Add ",(0,i.yg)("inlineCode",{parentName:"p"},"enablePrintApiLog: true")," to the ",(0,i.yg)("inlineCode",{parentName:"p"},"shenyu-admin/src/main/resources/application.yml")," file in the backend repository ",(0,i.yg)("inlineCode",{parentName:"p"},"shenyu")," as shown below to show the log of frontend interface calls in the backend console."),(0,i.yg)("img",{src:"/img/activities/start-demo-for-contributor/enable-api-log.png",width:"60%",height:"60%"})),(0,i.yg)("li",{parentName:"ol"},(0,i.yg)("p",{parentName:"li"},"Start ",(0,i.yg)("inlineCode",{parentName:"p"},"ShenyuAdminBootstrap"))),(0,i.yg)("li",{parentName:"ol"},(0,i.yg)("p",{parentName:"li"},"Switch to the front-end repository ",(0,i.yg)("inlineCode",{parentName:"p"},"shenyu-dashboard"),", open ",(0,i.yg)("inlineCode",{parentName:"p"},"README"),", click ",(0,i.yg)("inlineCode",{parentName:"p"},"npm install"),", ",(0,i.yg)("inlineCode",{parentName:"p"},"npm start")," or enter the above command from cmd to access the front-end interface via ",(0,i.yg)("a",{parentName:"p",href:"http://localhost:8000"},"http://localhost:8000"),", and display the log of the front-end interface called in the back-end console. Realize the co-development of front-end and back-end."),(0,i.yg)("img",{src:"/img/activities/start-demo-for-contributor/admin-log.png",width:"60%",height:"60%"}))),(0,i.yg)("h3",{id:"package-front-end-code"},"Package Front-end Code"),(0,i.yg)("p",null,"Execute the ",(0,i.yg)("inlineCode",{parentName:"p"},"npm build")," command in ",(0,i.yg)("inlineCode",{parentName:"p"},"README")," and copy all the generated files from the ",(0,i.yg)("inlineCode",{parentName:"p"},"dist")," folder to the ",(0,i.yg)("inlineCode",{parentName:"p"},"shenyu-admin/src/main/resources/static/")," directory in the backend repository."),(0,i.yg)("h2",{id:"contribute-to-shenyu-official-website"},"Contribute to Shenyu Official Website"),(0,i.yg)("p",null,"Just follow the ",(0,i.yg)("inlineCode",{parentName:"p"},"README")," in ",(0,i.yg)("a",{parentName:"p",href:"https://github.com/apache/shenyu-website"},"shenyu-website"),"."),(0,i.yg)("h3",{id:"tips"},"Tips"),(0,i.yg)("ol",null,(0,i.yg)("li",{parentName:"ol"},"I recommend downloading the ",(0,i.yg)("inlineCode",{parentName:"li"},"LTS")," version from the ",(0,i.yg)("inlineCode",{parentName:"li"},"Node")," ",(0,i.yg)("a",{parentName:"li",href:"https://nodejs.org/en"},"website"),"."),(0,i.yg)("li",{parentName:"ol"},(0,i.yg)("inlineCode",{parentName:"li"},"Windows")," systems cannot be deployed, if you want to verify your changes, you can deploy on a Linux virtual machine or server.")))}m.isMDXComponent=!0}}]);