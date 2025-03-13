"use strict";(self.webpackChunkshenyu_website=self.webpackChunkshenyu_website||[]).push([[73207],{14367:(e,n,t)=>{t.d(n,{A:()=>a});const a=t.p+"assets/images/param-mapping-summary-490cf9ee499bf9efc03d0c963b39118c.jpg"},15680:(e,n,t)=>{t.d(n,{xA:()=>u,yg:()=>c});var a=t(96540);function r(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function o(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,a)}return t}function i(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?o(Object(t),!0).forEach((function(n){r(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function p(e,n){if(null==e)return{};var t,a,r=function(e,n){if(null==e)return{};var t,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)t=o[a],n.indexOf(t)>=0||(r[t]=e[t]);return r}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)t=o[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}var l=a.createContext({}),s=function(e){var n=a.useContext(l),t=n;return e&&(t="function"==typeof e?e(n):i(i({},n),e)),t},u=function(e){var n=s(e.components);return a.createElement(l.Provider,{value:n},e.children)},g="mdxType",d={inlineCode:"code",wrapper:function(e){var n=e.children;return a.createElement(a.Fragment,{},n)}},m=a.forwardRef((function(e,n){var t=e.components,r=e.mdxType,o=e.originalType,l=e.parentName,u=p(e,["components","mdxType","originalType","parentName"]),g=s(t),m=r,c=g["".concat(l,".").concat(m)]||g[m]||d[m]||o;return t?a.createElement(c,i(i({ref:n},u),{},{components:t})):a.createElement(c,i({ref:n},u))}));function c(e,n){var t=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var o=t.length,i=new Array(o);i[0]=m;var p={};for(var l in n)hasOwnProperty.call(n,l)&&(p[l]=n[l]);p.originalType=e,p[g]="string"==typeof e?e:r,i[1]=p;for(var s=2;s<o;s++)i[s]=t[s];return a.createElement.apply(null,i)}return a.createElement.apply(null,t)}m.displayName="MDXCreateElement"},37833:(e,n,t)=>{t.d(n,{A:()=>a});const a=t.p+"assets/images/param-mapping-getFormData-04b664908cd5f52d149eb1098d5648c9.png"},41656:(e,n,t)=>{t.d(n,{A:()=>a});const a=t.p+"assets/images/param-mapping-structure-1d2b4243e835eeff74fc6ea114dcbee7.png"},41945:(e,n,t)=>{t.r(n),t.d(n,{contentTitle:()=>i,default:()=>g,frontMatter:()=>o,metadata:()=>p,toc:()=>l});var a=t(58168),r=(t(96540),t(15680));const o={title:"Code Analysis For Param-Mapping Plugin",author:"Kunshuai Zhu",author_title:"Apache ShenYu Contributor",author_url:"https://github.com/JooKS-me",author_image_url:"https://avatars1.githubusercontent.com/u/62384022?v=4",tags:["Param-Mapping","Apache ShenYu"]},i=void 0,p={permalink:"/blog/Plugin-SourceCode-Analysis-Param-Mapping-Plugin",editUrl:"https://github.com/apache/shenyu-website/edit/main/blog/Plugin-SourceCode-Analysis-Param-Mapping-Plugin.md",source:"@site/blog/Plugin-SourceCode-Analysis-Param-Mapping-Plugin.md",title:"Code Analysis For Param-Mapping Plugin",description:"Before starting, you can refer to this article to start the gateway",date:"2025-03-13T07:13:39.277Z",formattedDate:"March 13, 2025",tags:[{label:"Param-Mapping",permalink:"/blog/tags/param-mapping"},{label:"Apache ShenYu",permalink:"/blog/tags/apache-shen-yu"}],readingTime:4.72,truncated:!1,prevItem:{title:"Apache ShenYu Start Demo",permalink:"/blog/Start-SourceCode-Analysis-Start-Demo"},nextItem:{title:"LoadBalancer SPI Source Code Analysis",permalink:"/blog/SPI-SourceCode-Analysis-LoadBalance-SPI"}},l=[{value:"Body",id:"body",children:[]},{value:"Conclusion",id:"conclusion",children:[]}],s={toc:l},u="wrapper";function g(e){let{components:n,...o}=e;return(0,r.yg)(u,(0,a.A)({},s,o,{components:n,mdxType:"MDXLayout"}),(0,r.yg)("blockquote",null,(0,r.yg)("p",{parentName:"blockquote"},"Before starting, you can refer to ",(0,r.yg)("a",{parentName:"p",href:"./Start-SourceCode-Analysis-Start-Demo"},"this article")," to start the gateway")),(0,r.yg)("h3",{id:"body"},"Body"),(0,r.yg)("p",null,"Let's take a look at the structure of this plugin first, as shown in the figure below."),(0,r.yg)("p",null,(0,r.yg)("img",{alt:"param-mapping-structure",src:t(41656).A})),(0,r.yg)("p",null,"Guess: handler is used for data synchronization; strategy may be adapted to various request bodies, which should be the focus of this plugin; ",(0,r.yg)("inlineCode",{parentName:"p"},"ParamMappingPlugin")," should be the implementation of ",(0,r.yg)("inlineCode",{parentName:"p"},"ShenyuPlugin"),"."),(0,r.yg)("p",null,"First, take a look at the ",(0,r.yg)("inlineCode",{parentName:"p"},"ParamMappingPlugin"),", the focus is on the override of the ",(0,r.yg)("inlineCode",{parentName:"p"},"doExecute")," method."),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-java"},"public Mono<Void> doExecute(final ServerWebExchange exchange, final ShenyuPluginChain chain, final SelectorData selector, final RuleData rule) {\n    ... // judge whether paramMappingHandle is null\n    // Determine the request body type according to the contentType in the header line\n    HttpHeaders headers = exchange.getRequest().getHeaders();\n    MediaType contentType = headers.getContentType();\n    // *\n    return match(contentType).apply(exchange, chain, paramMappingHandle);\n}\n")),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("p",{parentName:"li"},"The match method returns the corresponding ",(0,r.yg)("inlineCode",{parentName:"p"},"Operator")," according to contentType"),(0,r.yg)("pre",{parentName:"li"},(0,r.yg)("code",{parentName:"pre",className:"language-java"},"private Operator match(final MediaType mediaType) {\n    if (MediaType.APPLICATION_JSON.isCompatibleWith(mediaType)) {\n        return operatorMap.get(MediaType.APPLICATION_JSON.toString());\n    } else if (MediaType.APPLICATION_FORM_URLENCODED.isCompatibleWith(mediaType)) {\n        return operatorMap.get(MediaType.APPLICATION_FORM_URLENCODED.toString());\n    } else {\n        return operatorMap.get(Constants.DEFAULT);\n    }\n}\n")),(0,r.yg)("p",{parentName:"li"},"As can be seen from the code of the match method, there are currently three types of ",(0,r.yg)("inlineCode",{parentName:"p"},"DefaultOperator"),", ",(0,r.yg)("inlineCode",{parentName:"p"},"FormDataOperator"),", and ",(0,r.yg)("inlineCode",{parentName:"p"},"JsonOperator"),", which support the request body in two formats: ",(0,r.yg)("inlineCode",{parentName:"p"},"x-www-form-urlencoded")," and ",(0,r.yg)("inlineCode",{parentName:"p"},"json"),"."))),(0,r.yg)("p",null,"So let's take a look at what the above three operators are like."),(0,r.yg)("h4",{id:"1-defaultoperator"},"1. DefaultOperator"),(0,r.yg)("p",null,"Nothing happens, its apply method just continues to execute the plug-in chain, and has no real function. When the request body does not match the Operator, it will be skipped by ",(0,r.yg)("inlineCode",{parentName:"p"},"DefaultOperator"),"."),(0,r.yg)("h4",{id:"2-formdataoperator"},"2. FormDataOperator"),(0,r.yg)("p",null,"This class is used to process the request body in the format of ",(0,r.yg)("inlineCode",{parentName:"p"},"x-www-form-urlencoded"),"."),(0,r.yg)("p",null,"Mainly depends on the ",(0,r.yg)("inlineCode",{parentName:"p"},"apply")," method, but it looks a bit strange."),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-java"},"public Mono<Void> apply(final ServerWebExchange exchange, final ShenyuPluginChain shenyuPluginChain, final ParamMappingHandle paramMappingHandle) {\n    return exchange.getFormData()\n            .switchIfEmpty(Mono.defer(() -> Mono.just(new LinkedMultiValueMap<>())))\n            .flatMap(multiValueMap -> {\n                ...\n            });\n}\n")),(0,r.yg)("p",null,"The code in the ellipsis is the processing of the request body, as follows."),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-java"},'// judge whether it is empty\nif (Objects.isNull(multiValueMap) || multiValueMap.isEmpty()) {\n    return shenyuPluginChain.execute(exchange);\n}\n// convert form-data to json\nString original = GsonUtils.getInstance().toJson(multiValueMap);\nLOG.info("get from data success data:{}", original);\n// *modify request body*\nString modify = operation(original, paramMappingHandle);\nif (StringUtils.isEmpty(modify)) {\n    return shenyuPluginChain.execute(exchange);\n}\n...\n// Convert the modified json into LinkedMultiValueMap. Pay attention to this line, it will be mentioned later!\nLinkedMultiValueMap<String, String> modifyMap = GsonUtils.getInstance().toLinkedMultiValueMap(modify);\n...\nfinal BodyInserter bodyInserter = BodyInserters.fromValue(modifyMap);\n...\n// modify the request body in the exchange, and then continue to execute the plugin chain\nreturn bodyInserter.insert(cachedBodyOutputMessage, new BodyInserterContext())\n        .then(Mono.defer(() -> shenyuPluginChain.execute(exchange.mutate()\n                .request(new ModifyServerHttpRequestDecorator(httpHeaders, exchange.getRequest(), cachedBodyOutputMessage))\n                .build())\n        )).onErrorResume((Function<Throwable, Mono<Void>>) throwable -> release(cachedBodyOutputMessage, throwable));\n')),(0,r.yg)("blockquote",null,(0,r.yg)("p",{parentName:"blockquote"},"PS: The omitted part is to set the request first and other operations.")),(0,r.yg)("p",null,"The more important thing above should be the modification request body of the star, that is, the call of the ",(0,r.yg)("inlineCode",{parentName:"p"},"operation")," method. Here, because of the parameter type, the default method of the ",(0,r.yg)("inlineCode",{parentName:"p"},"Operator")," interface will be called first (instead of being overridden by the ",(0,r.yg)("inlineCode",{parentName:"p"},"FormDataOperator"),")."),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-java"},"default String operation(final String jsonValue, final ParamMappingHandle paramMappingHandle) {\n    DocumentContext context = JsonPath.parse(jsonValue);\n    // call the override operation method and add addParameterKey\n    operation(context, paramMappingHandle);\n    // replace the related replacedParameterKey\n    if (!CollectionUtils.isEmpty(paramMappingHandle.getReplaceParameterKeys())) {\n        paramMappingHandle.getReplaceParameterKeys().forEach(info -> {\n            context.renameKey(info.getPath(), info.getKey(), info.getValue());\n        });\n    }\n    // Delete the related removeParameterKey\n    if (!CollectionUtils.isEmpty(paramMappingHandle.getRemoveParameterKeys())) {\n        paramMappingHandle.getRemoveParameterKeys().forEach(info -> {\n            context.delete(info);\n        });\n    }\n    return context.jsonString();\n}\n")),(0,r.yg)("p",null,"After sorting it out, we can find that the json tool ",(0,r.yg)("a",{parentName:"p",href:"https://github.com/json-path/JsonPath"},"JsonPath")," imported here makes the processing of the request body much simpler and clearer."),(0,r.yg)("p",null,(0,r.yg)("strong",{parentName:"p"},"In addition, we can notice that the ",(0,r.yg)("inlineCode",{parentName:"strong"},"FormDataOperator")," overrides the ",(0,r.yg)("inlineCode",{parentName:"strong"},"operation(DocumentContext, ParamMappingHandle)")," method.")),(0,r.yg)("p",null,(0,r.yg)("strong",{parentName:"p"},"Why override it?")," There is a default method for handling addParameterKey in the interface."),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-java"},"// Default method in Operator interface\ndefault void operation(final DocumentContext context, final ParamMappingHandle paramMappingHandle) {\n    if (!CollectionUtils.isEmpty(paramMappingHandle.getAddParameterKeys())) {\n        paramMappingHandle.getAddParameterKeys().forEach(info -> {\n            context.put(info.getPath(), info.getKey(), info.getValue()); //\u4e0d\u540c\u4e4b\u5904\n        });\n    }\n}\n\n// method overridden by FormDataOperator\n@Override\npublic void operation(final DocumentContext context, final ParamMappingHandle paramMappingHandle) {\n    if (!CollectionUtils.isEmpty(paramMappingHandle.getAddParameterKeys())) {\n        paramMappingHandle.getAddParameterKeys().forEach(info -> {\n            context.put(info.getPath(), info.getKey(), Arrays.asList(info.getValue()));\n        });\n    }\n}\n")),(0,r.yg)("p",null,"In fact, there is such a line in ",(0,r.yg)("inlineCode",{parentName:"p"},"FormDataOperator#apply")," (mentioned earlier):\n",(0,r.yg)("inlineCode",{parentName:"p"},"LinkedMultiValueMap<String, String> modifyMap = GsonUtils.getInstance().toLinkedMultiValueMap(modify);")),(0,r.yg)("p",null,"This line converts the modified json into ",(0,r.yg)("inlineCode",{parentName:"p"},"LinkedMultiValueMap"),", ",(0,r.yg)("inlineCode",{parentName:"p"},"GsonUtils#toLinkedMultiValueMap")," is as follows."),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-java"},"public LinkedMultiValueMap<String, String> toLinkedMultiValueMap(final String json) {\n    return GSON.fromJson(json, new TypeToken<LinkedMultiValueMap<String, String>>() {\n    }.getType());\n}\n")),(0,r.yg)("p",null,"The attribute ",(0,r.yg)("inlineCode",{parentName:"p"},"targetMap")," in the ",(0,r.yg)("inlineCode",{parentName:"p"},"LinkedMultiValueMap")," class is defined as: ",(0,r.yg)("inlineCode",{parentName:"p"},"private final Map<K, List<V>> targetMap")),(0,r.yg)("p",null,"Therefore, the value in the json string must be in the form of a list, otherwise Gson will throw a conversion error exception, which is why the ",(0,r.yg)("inlineCode",{parentName:"p"},"FormDataOperator")," must override the operator method."),(0,r.yg)("p",null,(0,r.yg)("strong",{parentName:"p"},"But why use ",(0,r.yg)("inlineCode",{parentName:"strong"},"LinkedMultiValueMap"),"?")),(0,r.yg)("p",null,"Go back to the first line ",(0,r.yg)("inlineCode",{parentName:"p"},"exchange.getFormData")," of the ",(0,r.yg)("inlineCode",{parentName:"p"},"FormDataOperator#apply")," method. In SpringMVC, the return value type of ",(0,r.yg)("inlineCode",{parentName:"p"},"DefaultServerWebExchange#getFormData")," is ",(0,r.yg)("inlineCode",{parentName:"p"},"Mono<MultiValueMap<String, String>>"),", and ",(0,r.yg)("inlineCode",{parentName:"p"},"LinkedMultiValueMap")," is a subclass of ",(0,r.yg)("inlineCode",{parentName:"p"},"MultiValueMap"),". And, the ",(0,r.yg)("inlineCode",{parentName:"p"},"getFormData")," method is for the request body in the format of ",(0,r.yg)("inlineCode",{parentName:"p"},"x-www-form-urlencoded"),"."),(0,r.yg)("p",null,(0,r.yg)("img",{alt:"param-mapping-getFormData",src:t(37833).A})),(0,r.yg)("h4",{id:"\u4e09jsonoperator"},"\u4e09\u3001JsonOperator"),(0,r.yg)("p",null,"Obviously, this class is used to process the request body in Json format."),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-java"},'public Mono<Void> apply(final ServerWebExchange exchange, final ShenyuPluginChain shenyuPluginChain, final ParamMappingHandle paramMappingHandle) {\n    ServerRequest serverRequest = ServerRequest.create(exchange, MESSAGE_READERS);\n    Mono<String> mono = serverRequest.bodyToMono(String.class).switchIfEmpty(Mono.defer(() -> Mono.just(""))).flatMap(originalBody -> {\n        LOG.info("get body data success data:{}", originalBody);\n        // call the default operation method to modify the request body\n        String modify = operation(originalBody, paramMappingHandle);\n        return Mono.just(modify);\n    });\n    BodyInserter bodyInserter = BodyInserters.fromPublisher(mono, String.class);\n    ... //process the header line\n    CachedBodyOutputMessage outputMessage = new CachedBodyOutputMessage(exchange, headers);\n    // modify the request body in the exchange, and then continue to execute the plugin chain\n    return bodyInserter.insert(outputMessage, new BodyInserterContext())\n            .then(Mono.defer(() -> {\n                ServerHttpRequestDecorator decorator = new ModifyServerHttpRequestDecorator(headers, exchange.getRequest(), outputMessage);\n                return shenyuPluginChain.execute(exchange.mutate().request(decorator).build());\n            })).onErrorResume((Function<Throwable, Mono<Void>>) throwable -> release(outputMessage, throwable));\n}\n')),(0,r.yg)("p",null,"The processing flow of ",(0,r.yg)("inlineCode",{parentName:"p"},"JsonOperator")," is roughly similar to that of ",(0,r.yg)("inlineCode",{parentName:"p"},"FormDataOperator"),"."),(0,r.yg)("h3",{id:"conclusion"},"Conclusion"),(0,r.yg)("p",null,"Finally, use a picture to briefly summarize."),(0,r.yg)("p",null,(0,r.yg)("img",{alt:"param-mapping-summary",src:t(14367).A})))}g.isMDXComponent=!0}}]);