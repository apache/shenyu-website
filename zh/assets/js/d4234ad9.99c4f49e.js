"use strict";(self.webpackChunkshenyu_website=self.webpackChunkshenyu_website||[]).push([[45198],{15680:(e,n,a)=>{a.d(n,{xA:()=>o,yg:()=>m});var r=a(96540);function t(e,n,a){return n in e?Object.defineProperty(e,n,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[n]=a,e}function l(e,n){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),a.push.apply(a,r)}return a}function i(e){for(var n=1;n<arguments.length;n++){var a=null!=arguments[n]?arguments[n]:{};n%2?l(Object(a),!0).forEach((function(n){t(e,n,a[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):l(Object(a)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(a,n))}))}return e}function u(e,n){if(null==e)return{};var a,r,t=function(e,n){if(null==e)return{};var a,r,t={},l=Object.keys(e);for(r=0;r<l.length;r++)a=l[r],n.indexOf(a)>=0||(t[a]=e[a]);return t}(e,n);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(r=0;r<l.length;r++)a=l[r],n.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(t[a]=e[a])}return t}var p=r.createContext({}),g=function(e){var n=r.useContext(p),a=n;return e&&(a="function"==typeof e?e(n):i(i({},n),e)),a},o=function(e){var n=g(e.components);return r.createElement(p.Provider,{value:n},e.children)},s="mdxType",d={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},y=r.forwardRef((function(e,n){var a=e.components,t=e.mdxType,l=e.originalType,p=e.parentName,o=u(e,["components","mdxType","originalType","parentName"]),s=g(a),y=t,m=s["".concat(p,".").concat(y)]||s[y]||d[y]||l;return a?r.createElement(m,i(i({ref:n},o),{},{components:a})):r.createElement(m,i({ref:n},o))}));function m(e,n){var a=arguments,t=n&&n.mdxType;if("string"==typeof e||t){var l=a.length,i=new Array(l);i[0]=y;var u={};for(var p in n)hasOwnProperty.call(n,p)&&(u[p]=n[p]);u.originalType=e,u[s]="string"==typeof e?e:t,i[1]=u;for(var g=2;g<l;g++)i[g]=a[g];return r.createElement.apply(null,i)}return r.createElement.apply(null,a)}y.displayName="MDXCreateElement"},41727:(e,n,a)=>{a.r(n),a.d(n,{contentTitle:()=>i,default:()=>s,frontMatter:()=>l,metadata:()=>u,toc:()=>p});var r=a(58168),t=(a(96540),a(15680));const l={title:"\u63d2\u4ef6\u6269\u5c55",keywords:["\u6269\u5c55"],description:"\u63d2\u4ef6\u6269\u5c55"},i=void 0,u={unversionedId:"developer/custom-plugin",id:"version-2.7.0/developer/custom-plugin",isDocsHomePage:!1,title:"\u63d2\u4ef6\u6269\u5c55",description:"\u63d2\u4ef6\u6269\u5c55",source:"@site/i18n/zh/docusaurus-plugin-content-docs/version-2.7.0/developer/custom-plugin.md",sourceDirName:"developer",slug:"/developer/custom-plugin",permalink:"/zh/docs/developer/custom-plugin",editUrl:"https://github.com/apache/shenyu-website/edit/main/i18n/zh/docusaurus-plugin-content-docs/version-2.7.0/developer/custom-plugin.md",version:"2.7.0",frontMatter:{title:"\u63d2\u4ef6\u6269\u5c55",keywords:["\u6269\u5c55"],description:"\u63d2\u4ef6\u6269\u5c55"},sidebar:"version-2.7.0/tutorialSidebar",previous:{title:"\u6b63\u786e\u83b7\u53d6IP\u4e0eHost",permalink:"/zh/docs/developer/custom-parsing-ip-and-host"},next:{title:"\u81ea\u5b9a\u4e49\u8fd4\u56de\u7ed3\u679c",permalink:"/zh/docs/developer/custom-result"}},p=[{value:"\u8bf4\u660e",id:"\u8bf4\u660e",children:[]},{value:"\u5355\u4e00\u804c\u8d23\u63d2\u4ef6",id:"\u5355\u4e00\u804c\u8d23\u63d2\u4ef6",children:[]},{value:"\u5355\u4e00\u804c\u8d23\u63d2\u4ef6\u4e0e\u591a\u8bed\u8a00",id:"\u5355\u4e00\u804c\u8d23\u63d2\u4ef6\u4e0e\u591a\u8bed\u8a00",children:[]},{value:"\u5339\u914d\u6d41\u91cf\u5904\u7406\u63d2\u4ef6",id:"\u5339\u914d\u6d41\u91cf\u5904\u7406\u63d2\u4ef6",children:[]},{value:"\u5339\u914d\u6d41\u91cf\u5904\u7406\u63d2\u4ef6\u4e0e\u591a\u8bed\u8a00",id:"\u5339\u914d\u6d41\u91cf\u5904\u7406\u63d2\u4ef6\u4e0e\u591a\u8bed\u8a00",children:[]},{value:"\u8ba2\u9605\u4f60\u7684\u63d2\u4ef6\u6570\u636e\uff0c\u8fdb\u884c\u81ea\u5b9a\u4e49\u7684\u5904\u7406",id:"\u8ba2\u9605\u4f60\u7684\u63d2\u4ef6\u6570\u636e\u8fdb\u884c\u81ea\u5b9a\u4e49\u7684\u5904\u7406",children:[]},{value:"\u52a8\u6001\u52a0\u8f7d\u81ea\u5b9a\u4e49\u63d2\u4ef6",id:"\u52a8\u6001\u52a0\u8f7d\u81ea\u5b9a\u4e49\u63d2\u4ef6",children:[]},{value:"\u63d2\u4ef6jar\u5305\u4e0a\u4f20",id:"\u63d2\u4ef6jar\u5305\u4e0a\u4f20",children:[]}],g={toc:p},o="wrapper";function s(e){let{components:n,...a}=e;return(0,t.yg)(o,(0,r.A)({},g,a,{components:n,mdxType:"MDXLayout"}),(0,t.yg)("h2",{id:"\u8bf4\u660e"},"\u8bf4\u660e"),(0,t.yg)("ul",null,(0,t.yg)("li",{parentName:"ul"},"\u63d2\u4ef6\u662f ",(0,t.yg)("inlineCode",{parentName:"li"},"Apache ShenYu")," \u7f51\u5173\u7684\u6838\u5fc3\u6267\u884c\u8005\uff0c\u6bcf\u4e2a\u63d2\u4ef6\u5728\u5f00\u542f\u7684\u60c5\u51b5\u4e0b\uff0c\u90fd\u4f1a\u5bf9\u5339\u914d\u7684\u6d41\u91cf\uff0c\u8fdb\u884c\u81ea\u5df1\u7684\u5904\u7406\u3002"),(0,t.yg)("li",{parentName:"ul"},"\u5728 ",(0,t.yg)("inlineCode",{parentName:"li"},"Apache ShenYu")," \u7f51\u5173\u91cc\u9762\uff0c\u63d2\u4ef6\u5206\u4e3a\u4e24\u7c7b\u3002",(0,t.yg)("ul",{parentName:"li"},(0,t.yg)("li",{parentName:"ul"},"\u4e00\u7c7b\u662f\u5355\u4e00\u804c\u8d23\u7684\u8c03\u7528\u94fe\uff0c\u4e0d\u80fd\u5bf9\u6d41\u91cf\u8fdb\u884c\u81ea\u5b9a\u4e49\u7684\u7b5b\u9009\u3002"),(0,t.yg)("li",{parentName:"ul"},"\u4e00\u7c7b\u662f\u80fd\u5bf9\u5339\u914d\u7684\u6d41\u91cf\uff0c\u6267\u884c\u81ea\u5df1\u7684\u804c\u8d23\u8c03\u7528\u94fe\u3002"))),(0,t.yg)("li",{parentName:"ul"},"\u7528\u6237\u53ef\u4ee5\u53c2\u8003 ",(0,t.yg)("a",{parentName:"li",href:"https://github.com/apache/shenyu/tree/master/shenyu-plugin"},"shenyu-plugin")," \u6a21\u5757\uff0c\u65b0\u589e\u81ea\u5df1\u7684\u63d2\u4ef6\u5904\u7406\uff0c\u5982\u679c\u6709\u597d\u7684\u516c\u7528\u63d2\u4ef6\uff0c\u53ef\u4ee5\u5411\u5b98\u7f51\u63d0\u4ea4",(0,t.yg)("inlineCode",{parentName:"li"},"pr"),"\u3002")),(0,t.yg)("h2",{id:"\u5355\u4e00\u804c\u8d23\u63d2\u4ef6"},"\u5355\u4e00\u804c\u8d23\u63d2\u4ef6"),(0,t.yg)("ul",null,(0,t.yg)("li",{parentName:"ul"},"\u5f15\u5165\u5982\u4e0b\u4f9d\u8d56\uff1a")),(0,t.yg)("pre",null,(0,t.yg)("code",{parentName:"pre",className:"language-xml"},"<dependency>\n    <groupId>org.apache.shenyu</groupId>\n    <artifactId>shenyu-plugin-api</artifactId>\n    <version>${project.version}</version>\n</dependency>\n")),(0,t.yg)("ul",null,(0,t.yg)("li",{parentName:"ul"},"\u7528\u6237\u65b0\u589e\u4e00\u4e2a\u7c7b ",(0,t.yg)("inlineCode",{parentName:"li"},"MyShenyuPlugin"),"\uff0c\u76f4\u63a5\u5b9e\u73b0 ",(0,t.yg)("inlineCode",{parentName:"li"},"org.apache.shenyu.plugin.api.ShenyuPlugin"))),(0,t.yg)("pre",null,(0,t.yg)("code",{parentName:"pre",className:"language-java"},'public interface ShenyuPlugin {\n\n    /**\n     * Process the Web request and (optionally) delegate to the next\n     * {@code WebFilter} through the given {@link ShenyuPluginChain}.\n     *\n     * @param exchange the current server exchange\n     * @param chain    provides a way to delegate to the next filter\n     * @return {@code Mono<Void>} to indicate when request processing is complete\n     */\n    Mono<Void> execute(ServerWebExchange exchange, ShenyuPluginChain chain);\n\n    /**\n     * return plugin order .\n     * This attribute To determine the plugin execution order in the same type plugin.\n     *\n     * @return int order\n     */\n    int getOrder();\n\n    /**\n     * acquire plugin name.\n     * this is plugin name define you must Provide the right name.\n     * if you impl AbstractShenyuPlugin this attribute not use.\n     *\n     * @return plugin name.\n     */\n    default String named() {\n        return "";\n    }\n\n    /**\n     * plugin is execute.\n     * if return true this plugin can not execute.\n     *\n     * @param exchange the current server exchange\n     * @return default false.\n     */\n    default Boolean skip(ServerWebExchange exchange) {\n        return false;\n    }\n}\n\n')),(0,t.yg)("ul",null,(0,t.yg)("li",{parentName:"ul"},(0,t.yg)("p",{parentName:"li"},"\u63a5\u53e3\u65b9\u6cd5\u8be6\u7ec6\u8bf4\u660e"),(0,t.yg)("ul",{parentName:"li"},(0,t.yg)("li",{parentName:"ul"},(0,t.yg)("p",{parentName:"li"},(0,t.yg)("inlineCode",{parentName:"p"},"execute()")," \u65b9\u6cd5\u4e3a\u6838\u5fc3\u7684\u6267\u884c\u65b9\u6cd5\uff0c\u7528\u6237\u53ef\u4ee5\u5728\u91cc\u9762\u81ea\u7531\u7684\u5b9e\u73b0\u81ea\u5df1\u60f3\u8981\u7684\u529f\u80fd\u3002")),(0,t.yg)("li",{parentName:"ul"},(0,t.yg)("p",{parentName:"li"},(0,t.yg)("inlineCode",{parentName:"p"},"getOrder()")," \u6307\u5b9a\u63d2\u4ef6\u7684\u6392\u5e8f\u3002")),(0,t.yg)("li",{parentName:"ul"},(0,t.yg)("p",{parentName:"li"},(0,t.yg)("inlineCode",{parentName:"p"},"named()")," \u6307\u5b9a\u63d2\u4ef6\u7684\u540d\u79f0\uff0c\u547d\u540d\u91c7\u7528",(0,t.yg)("inlineCode",{parentName:"p"},"Camel Case"),"\uff0c\u5982\uff1a",(0,t.yg)("inlineCode",{parentName:"p"},"dubbo"),"\u3001",(0,t.yg)("inlineCode",{parentName:"p"},"springCloud"),"\u3002")),(0,t.yg)("li",{parentName:"ul"},(0,t.yg)("p",{parentName:"li"},(0,t.yg)("inlineCode",{parentName:"p"},"skip()")," \u5728\u7279\u5b9a\u7684\u6761\u4ef6\u4e0b\uff0c\u8be5\u63d2\u4ef6\u662f\u5426\u88ab\u8df3\u8fc7\u3002"))))),(0,t.yg)("ul",null,(0,t.yg)("li",{parentName:"ul"},"\u6ce8\u518c\u6210",(0,t.yg)("inlineCode",{parentName:"li"},"Spring"),"\u7684",(0,t.yg)("inlineCode",{parentName:"li"},"bean"),"\uff0c\u53c2\u8003\u5982\u4e0b\uff0c\u6216\u8005\u76f4\u63a5\u5728\u5b9e\u73b0\u7c7b\u4e0a\u52a0 ",(0,t.yg)("inlineCode",{parentName:"li"},"@Component")," \u6ce8\u89e3\u3002")),(0,t.yg)("pre",null,(0,t.yg)("code",{parentName:"pre",className:"language-java"},"    @Bean\n    public ShenyuPlugin myShenyuPlugin() {\n        return new MyShenyuPlugin();\n    }\n")),(0,t.yg)("h2",{id:"\u5355\u4e00\u804c\u8d23\u63d2\u4ef6\u4e0e\u591a\u8bed\u8a00"},"\u5355\u4e00\u804c\u8d23\u63d2\u4ef6\u4e0e\u591a\u8bed\u8a00"),(0,t.yg)("ul",null,(0,t.yg)("li",{parentName:"ul"},"\u4e0a\u8ff0\u7528java\u5199\u5355\u4e00\u804c\u8d23\u63d2\u4ef6\uff0c\u5982\u679c\u60f3\u7528\u5176\u4ed6\u8bed\u8a00\u5199\u63d2\u4ef6\uff0c\u81f3\u5c11\u9700\u8981\u4f60\u64c5\u957f\u7684\u8bed\u8a00\u652f\u6301",(0,t.yg)("inlineCode",{parentName:"li"},"WASM"),"\uff0c\u4f60\u53ef\u4ee5\u5728",(0,t.yg)("a",{parentName:"li",href:"https://shenyu.apache.org/zh/docs/next/design/wasm-plugin-design/"},"\u8fd9\u91cc")," \u627e\u5230\u4e00\u4e9b\u8d44\u6599\u3002\u5728\u4f60\u4e86\u89e3\u8fc7",(0,t.yg)("inlineCode",{parentName:"li"},"WASM"),"\u540e\uff0c\u6211\u4eec\u5f15\u5165\u4ee5\u4e0b\u4f9d\u8d56\u6765\u6784\u5efa\u63d2\u4ef6\u7684java\u90e8\u5206\uff1a")),(0,t.yg)("pre",null,(0,t.yg)("code",{parentName:"pre",className:"language-xml"},"<dependency>\n    <groupId>org.apache.shenyu</groupId>\n    <artifactId>shenyu-plugin-wasm-api</artifactId>\n    <version>${project.version}</version>\n</dependency>\n")),(0,t.yg)("ul",null,(0,t.yg)("li",{parentName:"ul"},"\u7528\u6237\u65b0\u589e\u4e00\u4e2a\u7c7b ",(0,t.yg)("inlineCode",{parentName:"li"},"MyShenyuWasmPlugin"),"\uff0c\u76f4\u63a5\u7ee7\u627f ",(0,t.yg)("inlineCode",{parentName:"li"},"org.apache.shenyu.plugin.wasm.api.AbstractWasmPlugin"))),(0,t.yg)("pre",null,(0,t.yg)("code",{parentName:"pre",className:"language-java"},'package x.y.z;\n\npublic class MyShenyuWasmPlugin extends AbstractWasmPlugin {\n    \n    private static final Map<Long, String> RESULTS = new ConcurrentHashMap<>();\n    \n    @Override\n    public int getOrder() {\n        // \u4f60\u7684\u63d2\u4ef6\u987a\u5e8f\n        return 0;\n    }\n    \n    @Override\n    public String named() {\n        return "\u4f60\u7684\u63d2\u4ef6\u540d\u79f0";\n    }\n    \n    @Override\n    protected Mono<Void> doExecute(final ServerWebExchange exchange, final ShenyuPluginChain chain, final Long argumentId) {\n        final String result = RESULTS.remove(argumentId);\n        // \u8c03\u7528\u5176\u4ed6\u8bed\u8a00\u8fd4\u56de\u7684\u7ed3\u679c\n        return chain.execute(exchange);\n    }\n    \n    @Override\n    protected Long getArgumentId(final ServerWebExchange exchange, final ShenyuPluginChain chain) {\n        // \u9700\u8981\u6839\u636eexchange\u548cchain\u751f\u6210\u53c2\u6570\u7684\u552f\u4e00id\n        return 0L;\n    }\n    \n    @Override\n    protected Map<String, Func> initWasmCallJavaFunc(final Store<Void> store) {\n        Map<String, Func> funcMap = new HashMap<>();\n        funcMap.put("get_args", WasmFunctions.wrap(store, WasmValType.I64, WasmValType.I64, WasmValType.I32, WasmValType.I32,\n            (argId, addr, len) -> {\n                // \u5176\u4ed6\u8bed\u8a00\u4ecejava\u83b7\u53d6\u53c2\u6570\u7684\u56de\u8c03\n                String config = "hello from java " + argId;\n                LOG.info("java side->" + config);\n                ByteBuffer buf = super.getBuffer();\n                for (int i = 0; i < len && i < config.length(); i++) {\n                    buf.put(addr.intValue() + i, (byte) config.charAt(i));\n                }\n                return Math.min(config.length(), len);\n            }));\n        funcMap.put("put_result", WasmFunctions.wrap(store, WasmValType.I64, WasmValType.I64, WasmValType.I32, WasmValType.I32,\n            (argId, addr, len) -> {\n                // \u5176\u4ed6\u8bed\u8a00\u628a\u8c03\u7528\u7ed3\u679c\u4f20\u7ed9java\u7684\u56de\u8c03\n                ByteBuffer buf = super.getBuffer();\n                byte[] bytes = new byte[len];\n                for (int i = 0; i < len; i++) {\n                    bytes[i] = buf.get(addr.intValue() + i);\n                }\n                String result = new String(bytes, StandardCharsets.UTF_8);\n                RESULTS.put(argId, result);\n                LOG.info("java side->" + result);\n                return 0;\n            }));\n        return funcMap;\n        }\n    }\n')),(0,t.yg)("ul",null,(0,t.yg)("li",{parentName:"ul"},"\u521b\u5efa\u5176\u4ed6\u8bed\u8a00\u7684\u9879\u76ee\uff0c\u4e0b\u9762\u4ee5rust\u8bed\u8a00\u4e3a\u4f8b\uff1a")),(0,t.yg)("pre",null,(0,t.yg)("code",{parentName:"pre",className:"language-shell"},"cd {shenyu}/shenyu-plugin/{your_plugin_moodule}/src/main\ncargo new --lib your_plugin_name\n")),(0,t.yg)("ul",null,(0,t.yg)("li",{parentName:"ul"},"\u5728",(0,t.yg)("inlineCode",{parentName:"li"},"lib.rs"),"\u4e2d\u65b0\u589e",(0,t.yg)("inlineCode",{parentName:"li"},"execute"),"\u65b9\u6cd5\uff1a")),(0,t.yg)("pre",null,(0,t.yg)("code",{parentName:"pre",className:"language-rust"},'#[link(wasm_import_module = "shenyu")]\nextern "C" {\n    fn get_args(arg_id: i64, addr: i64, len: i32) -> i32;\n\n    fn put_result(arg_id: i64, addr: i64, len: i32) -> i32;\n}\n\n// \u52a0\u4e0a`#[no_mangle]`\u4ee5\u9632\u6b62rust\u7f16\u8bd1\u5668\u4fee\u6539\u65b9\u6cd5\u540d\uff0c\u8fd9\u662f\u5fc5\u987b\u7684\n#[no_mangle]\npub unsafe extern "C" fn execute(arg_id: i64) {\n    let mut buf = [0u8; 32];\n    let buf_ptr = buf.as_mut_ptr() as i64;\n    eprintln!("rust side-> buffer base address: {}", buf_ptr);\n    // \u4ecejava\u90a3\u8fb9\u83b7\u53d6\u53c2\u6570\n    let len = get_args(arg_id, buf_ptr, buf.len() as i32);\n    let java_arg = std::str::from_utf8(&buf[..len as usize]).unwrap();\n    eprintln!("rust side-> recv:{}", java_arg);\n    // \u8fd9\u91cc\u6dfb\u52a0rust\u90e8\u5206\u7684\u63d2\u4ef6\u903b\u8f91\uff0c\u6bd4\u5982rpc\u8c03\u7528\u7b49\u7b49\n    // \u628arust\u7684\u8c03\u7528\u7ed3\u679c\u4f20\u7ed9java\n    let rust_result = "rust result".as_bytes();\n    let result_ptr = rust_result.as_ptr() as i64;\n    _ = put_result(arg_id, result_ptr, rust_result.len() as i32);\n}\n')),(0,t.yg)("ul",null,(0,t.yg)("li",{parentName:"ul"},"\u5728",(0,t.yg)("inlineCode",{parentName:"li"},"Cargo.toml"),"\u4e2d\u65b0\u589e",(0,t.yg)("inlineCode",{parentName:"li"},"[lib]"),"\u5e76\u628a",(0,t.yg)("inlineCode",{parentName:"li"},"crate-type"),"\u6539\u4e3a",(0,t.yg)("inlineCode",{parentName:"li"},'["cdylib"]'),"\uff0c\u6700\u7ec8\u4f60\u7684",(0,t.yg)("inlineCode",{parentName:"li"},"Cargo.toml"),"\u5e94\u8be5\u50cf\u8fd9\u6837\uff1a")),(0,t.yg)("pre",null,(0,t.yg)("code",{parentName:"pre",className:"language-toml"},'[package]\nname = "your_plugin_name"\nversion = "0.1.0"\nedition = "2021"\n\n[dependencies]\n# ......\n\n[lib]\ncrate-type = ["cdylib"]\n')),(0,t.yg)("ul",null,(0,t.yg)("li",{parentName:"ul"},"\u751f\u6210wasm\u6587\u4ef6\uff1a")),(0,t.yg)("pre",null,(0,t.yg)("code",{parentName:"pre",className:"language-shell"},"cargo build --target wasm32-wasi --release\n")),(0,t.yg)("ul",null,(0,t.yg)("li",{parentName:"ul"},"\u4f60\u5c06\u770b\u5230",(0,t.yg)("inlineCode",{parentName:"li"},"{shenyu}/shenyu-plugin/{your_plugin_moodule}/src/main/{your_plugin_name}/target/wasm32-wasi/release/{your_plugin_name}.wasm"),"\uff0c\u91cd\u547d\u540dwasm\u6587\u4ef6\uff0c\u7ed3\u5408",(0,t.yg)("inlineCode",{parentName:"li"},"x.y.z.MyShenyuWasmPlugin"),"\u7684\u7c7b\u8def\u5f84\uff0cwasm\u6587\u4ef6\u540d\u662f",(0,t.yg)("inlineCode",{parentName:"li"},"x.y.z.MyShenyuWasmPlugin.wasm"),"\uff0c\u6700\u540e\u628awasm\u6587\u4ef6\u653e\u5230\u4f60\u63d2\u4ef6\u6a21\u5757\u7684",(0,t.yg)("inlineCode",{parentName:"li"},"resources"),"\u6587\u4ef6\u5939\u4e0b\u3002")),(0,t.yg)("h2",{id:"\u5339\u914d\u6d41\u91cf\u5904\u7406\u63d2\u4ef6"},"\u5339\u914d\u6d41\u91cf\u5904\u7406\u63d2\u4ef6"),(0,t.yg)("ul",null,(0,t.yg)("li",{parentName:"ul"},"\u5f15\u5165\u5982\u4e0b\u4f9d\u8d56\uff1a")),(0,t.yg)("pre",null,(0,t.yg)("code",{parentName:"pre",className:"language-xml"},"        <dependency>\n            <groupId>org.apache.shenyu</groupId>\n            <artifactId>shenyu-plugin-base</artifactId>\n            <version>${project.version}</version>\n        </dependency>\n")),(0,t.yg)("ul",null,(0,t.yg)("li",{parentName:"ul"},(0,t.yg)("p",{parentName:"li"},"\u65b0\u589e\u4e00\u4e2a\u7c7b ",(0,t.yg)("inlineCode",{parentName:"p"},"CustomPlugin"),"\uff0c\u7ee7\u627f ",(0,t.yg)("inlineCode",{parentName:"p"},"org.apache.shenyu.plugin.base.AbstractShenyuPlugin"))),(0,t.yg)("li",{parentName:"ul"},(0,t.yg)("p",{parentName:"li"},"\u4ee5\u4e0b\u662f\u53c2\u8003\uff1a"))),(0,t.yg)("pre",null,(0,t.yg)("code",{parentName:"pre",className:"language-java"},'/**\n * This is your custom plugin.\n * He is running in after before plugin, implement your own functionality.\n * extends AbstractShenyuPlugin so you must user shenyu-admin And add related plug-in development.\n *\n * @author xiaoyu(Myth)\n */\npublic class CustomPlugin extends AbstractShenyuPlugin {\n\n    /**\n     * return plugin order .\n     * The same plugin he executes in the same order.\n     *\n     * @return int\n     */\n    @Override\n    public int getOrder() {\n        return 0;\n    }\n\n    /**\n     * acquire plugin name.\n     * return you custom plugin name.\n     * It must be the same name as the plug-in you added in the admin background.\n     *\n     * @return plugin name.\n     */\n    @Override\n    public String named() {\n        return "shenYu";\n    }\n\n    /**\n     * plugin is execute.\n     * Do I need to skip.\n     * if you need skip return true.\n     *\n     * @param exchange the current server exchange\n     * @return default false.\n     */\n    @Override\n    public Boolean skip(final ServerWebExchange exchange) {\n        return false;\n    }\n\n    /**\n     * this is Template Method child has Implement your own logic.\n     *\n     * @param exchange exchange the current server exchange\n     * @param chain    chain the current chain\n     * @param selector selector\n     * @param rule     rule\n     * @return {@code Mono<Void>} to indicate when request handling is complete\n     */\n    @Override\n    protected abstract Mono<Void> doExecute(ServerWebExchange exchange, ShenyuPluginChain chain, SelectorData selector, RuleData rule) {\n        LOGGER.debug(".......... function plugin start..............");\n        /*\n         * Processing after your selector matches the rule.\n         * rule.getHandle() is you Customize the json string to be processed.\n         * for this example.\n         * Convert your custom json string pass to an entity class.\n         */\n        final String ruleHandle = rule.getHandle();\n\n        final Test test = GsonUtils.getInstance().fromJson(ruleHandle, Test.class);\n\n        /*\n         * Then do your own business processing.\n         * The last execution  chain.execute(exchange).\n         * Let it continue on the chain until the end.\n         */\n        System.out.println(test.toString());\n        return chain.execute(exchange);\n    }\n}\n\n')),(0,t.yg)("ul",null,(0,t.yg)("li",{parentName:"ul"},(0,t.yg)("p",{parentName:"li"},"\u8be6\u7ec6\u8bb2\u89e3\uff1a"),(0,t.yg)("ul",{parentName:"li"},(0,t.yg)("li",{parentName:"ul"},(0,t.yg)("p",{parentName:"li"},"\u7ee7\u627f\u8be5\u7c7b\u7684\u63d2\u4ef6\uff0c\u63d2\u4ef6\u4f1a\u8fdb\u884c\u9009\u62e9\u5668\u89c4\u5219\u5339\u914d\u3002")),(0,t.yg)("li",{parentName:"ul"},(0,t.yg)("p",{parentName:"li"},"\u9996\u5148\u5728 ",(0,t.yg)("inlineCode",{parentName:"p"},"shenyu-admin")," \u540e\u53f0\u7ba1\u7406\u7cfb\u7edf --\x3e \u57fa\u7840\u914d\u7f6e --\x3e \u63d2\u4ef6\u7ba1\u7406 \u4e2d\uff0c\u65b0\u589e\u4e00\u4e2a\u63d2\u4ef6\uff0c\u6ce8\u610f \u540d\u79f0\u4e0e \u4f60\u81ea\u5b9a\u4e49\u63d2\u4ef6\u7684 ",(0,t.yg)("inlineCode",{parentName:"p"},"named()")," \u65b9\u6cd5\u8981\u4e00\u81f4\u3002")),(0,t.yg)("li",{parentName:"ul"},(0,t.yg)("p",{parentName:"li"},"\u91cd\u65b0\u767b\u9646  ",(0,t.yg)("inlineCode",{parentName:"p"},"shenyu-admin")," \u540e\u53f0\uff0c\u53ef\u4ee5\u770b\u89c1\u521a\u65b0\u589e\u7684\u63d2\u4ef6\uff0c\u7136\u540e\u5c31\u53ef\u4ee5\u8fdb\u884c\u9009\u62e9\u5668\u89c4\u5219\u5339\u914d\u3002")),(0,t.yg)("li",{parentName:"ul"},(0,t.yg)("p",{parentName:"li"},"\u5728\u89c4\u5219\u4e2d\uff0c\u6709\u4e2a ",(0,t.yg)("inlineCode",{parentName:"p"},"handler")," \u5b57\u6bb5\uff0c\u662f\u81ea\u5b9a\u4e49\u5904\u7406\u6570\u636e\uff0c\u5728 ",(0,t.yg)("inlineCode",{parentName:"p"},"doExecute()")," \u65b9\u6cd5\u4e2d\uff0c\u901a\u8fc7 ",(0,t.yg)("inlineCode",{parentName:"p"},"final String ruleHandle = rule.getHandle();")," \u83b7\u53d6\uff0c\u7136\u540e\u8fdb\u884c\u4f60\u7684\u64cd\u4f5c\u3002")))),(0,t.yg)("li",{parentName:"ul"},(0,t.yg)("p",{parentName:"li"},"\u6ce8\u518c\u6210",(0,t.yg)("inlineCode",{parentName:"p"},"Spring"),"\u7684",(0,t.yg)("inlineCode",{parentName:"p"},"bean"),"\uff0c\u53c2\u8003\u5982\u4e0b\u6216\u8005\u76f4\u63a5\u5728\u5b9e\u73b0\u7c7b\u4e0a\u52a0 ",(0,t.yg)("inlineCode",{parentName:"p"},"@Component")," \u6ce8\u89e3\u3002"))),(0,t.yg)("pre",null,(0,t.yg)("code",{parentName:"pre",className:"language-java"},"    @Bean\n    public ShenyuPlugin customPlugin() {\n        return new CustomPlugin();\n    }\n")),(0,t.yg)("h2",{id:"\u5339\u914d\u6d41\u91cf\u5904\u7406\u63d2\u4ef6\u4e0e\u591a\u8bed\u8a00"},"\u5339\u914d\u6d41\u91cf\u5904\u7406\u63d2\u4ef6\u4e0e\u591a\u8bed\u8a00"),(0,t.yg)("ul",null,(0,t.yg)("li",{parentName:"ul"},"\u5927\u4f53\u903b\u8f91\u4e0e",(0,t.yg)("a",{parentName:"li",href:"#%E5%8D%95%E4%B8%80%E8%81%8C%E8%B4%A3%E6%8F%92%E4%BB%B6%E4%B8%8E%E5%A4%9A%E8%AF%AD%E8%A8%80"},"\u5355\u4e00\u804c\u8d23\u63d2\u4ef6\u4e0e\u591a\u8bed\u8a00")," \u7c7b\u4f3c\uff0c\u4f46java\u90e8\u5206\u7684\u4f9d\u8d56\u3001\u5176\u4ed6\u8bed\u8a00\u9700\u8981\u65b0\u589e\u7684\u65b9\u6cd5\u4e0e",(0,t.yg)("inlineCode",{parentName:"li"},"\u5355\u4e00\u804c\u8d23\u63d2\u4ef6\u4e0e\u591a\u8bed\u8a00"),"\u4e0d\u540c\u3002\u4ee5\u4e0b\u662f",(0,t.yg)("inlineCode",{parentName:"li"},"\u591a\u8bed\u8a00\u5339\u914d\u6d41\u91cf\u5904\u7406\u63d2\u4ef6"),"java\u90e8\u5206\u6240\u9700\u8981\u7684\u4f9d\u8d56\uff1a")),(0,t.yg)("pre",null,(0,t.yg)("code",{parentName:"pre",className:"language-xml"},"<dependency>\n    <groupId>org.apache.shenyu</groupId>\n    <artifactId>shenyu-plugin-wasm-base</artifactId>\n    <version>${project.version}</version>\n</dependency>\n")),(0,t.yg)("ul",null,(0,t.yg)("li",{parentName:"ul"},"\u4ee5\u4e0b\u662f\u5fc5\u987b\u65b0\u589e\u7684\u65b9\u6cd5(\u4ee5rust\u8bed\u8a00\u4e3a\u4f8b)\uff1a")),(0,t.yg)("pre",null,(0,t.yg)("code",{parentName:"pre",className:"language-rust"},'#[no_mangle]\npub unsafe extern "C" fn doExecute(arg_id: i64) {\n    //......\n}\n')),(0,t.yg)("ul",null,(0,t.yg)("li",{parentName:"ul"},"\u4ee5\u4e0b\u662f\u53ef\u9009\u7684\u65b9\u6cd5(\u4ee5rust\u8bed\u8a00\u4e3a\u4f8b)\uff1a")),(0,t.yg)("pre",null,(0,t.yg)("code",{parentName:"pre",className:"language-rust"},'#[no_mangle]\npub unsafe extern "C" fn before(arg_id: i64) {\n    //......\n}\n\n#[no_mangle]\npub unsafe extern "C" fn after(arg_id: i64) {\n    //......\n}\n')),(0,t.yg)("h2",{id:"\u8ba2\u9605\u4f60\u7684\u63d2\u4ef6\u6570\u636e\u8fdb\u884c\u81ea\u5b9a\u4e49\u7684\u5904\u7406"},"\u8ba2\u9605\u4f60\u7684\u63d2\u4ef6\u6570\u636e\uff0c\u8fdb\u884c\u81ea\u5b9a\u4e49\u7684\u5904\u7406"),(0,t.yg)("ul",null,(0,t.yg)("li",{parentName:"ul"},"\u65b0\u589e\u4e00\u4e2a\u7c7b ",(0,t.yg)("inlineCode",{parentName:"li"},"PluginDataHandler"),"\uff0c\u5b9e\u73b0 ",(0,t.yg)("inlineCode",{parentName:"li"},"org.apache.shenyu.plugin.base.handler.PluginDataHandler"))),(0,t.yg)("pre",null,(0,t.yg)("code",{parentName:"pre",className:"language-java"},"public interface PluginDataHandler {\n\n    /**\n     * Handler plugin.\n     *\n     * @param pluginData the plugin data\n     */\n    default void handlerPlugin(PluginData pluginData) {\n    }\n\n    /**\n     * Remove plugin.\n     *\n     * @param pluginData the plugin data\n     */\n    default void removePlugin(PluginData pluginData) {\n    }\n\n    /**\n     * Handler selector.\n     *\n     * @param selectorData the selector data\n     */\n    default void handlerSelector(SelectorData selectorData) {\n    }\n\n    /**\n     * Remove selector.\n     *\n     * @param selectorData the selector data\n     */\n    default void removeSelector(SelectorData selectorData) {\n    }\n\n    /**\n     * Handler rule.\n     *\n     * @param ruleData the rule data\n     */\n    default void handlerRule(RuleData ruleData) {\n    }\n\n    /**\n     * Remove rule.\n     *\n     * @param ruleData the rule data\n     */\n    default void removeRule(RuleData ruleData) {\n    }\n\n    /**\n     * Plugin named string.\n     *\n     * @return the string\n     */\n    String pluginNamed();\n\n}\n")),(0,t.yg)("ul",null,(0,t.yg)("li",{parentName:"ul"},(0,t.yg)("p",{parentName:"li"},"\u6ce8\u610f ",(0,t.yg)("inlineCode",{parentName:"p"},"pluginNamed()")," \u8981\u548c\u4f60\u81ea\u5b9a\u4e49\u7684\u63d2\u4ef6\u540d\u79f0\u76f8\u540c\u3002")),(0,t.yg)("li",{parentName:"ul"},(0,t.yg)("p",{parentName:"li"},"\u6ce8\u518c\u6210",(0,t.yg)("inlineCode",{parentName:"p"},"Spring"),"\u7684",(0,t.yg)("inlineCode",{parentName:"p"},"bean"),"\uff0c\u53c2\u8003\u5982\u4e0b\u6216\u8005\u76f4\u63a5\u5728\u5b9e\u73b0\u7c7b\u4e0a\u52a0 ",(0,t.yg)("inlineCode",{parentName:"p"},"@Component")," \u6ce8\u89e3\u3002"))),(0,t.yg)("pre",null,(0,t.yg)("code",{parentName:"pre",className:"language-java"},"@Bean\npublic PluginDataHandler pluginDataHandler() {\n    return new PluginDataHandler();\n}\n")),(0,t.yg)("h2",{id:"\u52a8\u6001\u52a0\u8f7d\u81ea\u5b9a\u4e49\u63d2\u4ef6"},"\u52a8\u6001\u52a0\u8f7d\u81ea\u5b9a\u4e49\u63d2\u4ef6"),(0,t.yg)("ul",null,(0,t.yg)("li",{parentName:"ul"},(0,t.yg)("p",{parentName:"li"},"\u5f53\u4f7f\u7528\u6b64\u529f\u80fd\u65f6\u5019\uff0c\u4e0a\u8ff0\u6269\u5c55 ",(0,t.yg)("inlineCode",{parentName:"p"},"ShenyuPlugin"),", ",(0,t.yg)("inlineCode",{parentName:"p"},"PluginDataHandler"),", \u4e0d\u7528\u6210\u4e3a ",(0,t.yg)("inlineCode",{parentName:"p"},"spring bean"),"\u3002\u53ea\u9700\u8981\u6784\u5efa\u51fa\u6269\u5c55\u9879\u76ee\u7684jar\u5305\u5373\u53ef\u3002")),(0,t.yg)("li",{parentName:"ul"},(0,t.yg)("p",{parentName:"li"},"\u4f7f\u7528\u4ee5\u4e0b\u914d\u7f6e\uff1a"))),(0,t.yg)("pre",null,(0,t.yg)("code",{parentName:"pre",className:"language-yaml"},"shenyu:\n  extPlugin:\n    path:  //\u52a0\u8f7d\u6269\u5c55\u63d2\u4ef6jar\u5305\u8def\u5f84\n    enabled: true //\u662f\u5426\u5f00\u542f\n    threads: 1  //\u52a0\u8f7d\u63d2\u4ef6\u7ebf\u7a0b\u6570\u91cf\n    scheduleTime: 300 //\u95f4\u9694\u65f6\u95f4\uff08\u5355\u4f4d\uff1a\u79d2\uff09\n    scheduleDelay: 30 //\u7f51\u5173\u542f\u52a8\u540e\u5ef6\u8fdf\u591a\u4e45\u52a0\u8f7d\uff08\u5355\u4f4d\uff1a\u79d2\uff09\n")),(0,t.yg)("h4",{id:"\u63d2\u4ef6\u52a0\u8f7d\u8def\u5f84\u8be6\u89e3"},"\u63d2\u4ef6\u52a0\u8f7d\u8def\u5f84\u8be6\u89e3"),(0,t.yg)("ul",null,(0,t.yg)("li",{parentName:"ul"},(0,t.yg)("p",{parentName:"li"},"\u6b64\u8def\u5f84\u662f\u4e3a\u5b58\u653e\u6269\u5c55\u63d2\u4ef6jar\u5305\u7684\u76ee\u5f55\u3002")),(0,t.yg)("li",{parentName:"ul"},(0,t.yg)("p",{parentName:"li"},"\u53ef\u4ee5\u4f7f\u7528 ",(0,t.yg)("inlineCode",{parentName:"p"},"-Dplugin-ext=xxxx")," \u6307\u5b9a\uff0c\u4e5f\u53ef\u4ee5\u4f7f\u7528 ",(0,t.yg)("inlineCode",{parentName:"p"},"shenyu.extPlugin.path"),"\u914d\u7f6e\u6587\u4ef6\u6307\u5b9a\uff0c\u5982\u679c\u90fd\u6ca1\u914d\u7f6e\uff0c\u9ed8\u8ba4\u4f1a\u52a0\u8f7d\u7f51\u5173\u542f\u52a8\u8def\u5f84\u4e0b\u7684 ",(0,t.yg)("inlineCode",{parentName:"p"},"ext-lib"),"\u76ee\u5f55\u3002")),(0,t.yg)("li",{parentName:"ul"},(0,t.yg)("p",{parentName:"li"},"\u4f18\u5148\u7ea7 \uff1a",(0,t.yg)("inlineCode",{parentName:"p"},"-Dplugin-ext=xxxx")," > ",(0,t.yg)("inlineCode",{parentName:"p"},"shenyu.extPlugin.path")," > ",(0,t.yg)("inlineCode",{parentName:"p"},"ext-lib(default)")))),(0,t.yg)("h2",{id:"\u63d2\u4ef6jar\u5305\u4e0a\u4f20"},"\u63d2\u4ef6jar\u5305\u4e0a\u4f20"),(0,t.yg)("ul",null,(0,t.yg)("li",{parentName:"ul"},"\u5f53\u4f7f\u7528\u8fd9\u4e2a\u529f\u80fd\u65f6\u5019, \u9700\u8981\u628a\u4e0a\u8ff0\u6269\u5c55\u7684",(0,t.yg)("inlineCode",{parentName:"li"},"ShenyuPlugin")," \u6253\u5305\u6210\u81ea\u5b9a\u4e49\u7684 ShenyuPlugin Jar \u5305"),(0,t.yg)("li",{parentName:"ul"},"\u5e76\u4e14\u5728 ShenyuAdmin \u8fdb\u884c\u914d\u7f6e",(0,t.yg)("ul",{parentName:"li"},(0,t.yg)("li",{parentName:"ul"},"\u8fdb\u5165 ShenyuAdmin - BasicConfig - Plugin \u8fdb\u884c\u6dfb\u52a0 plugin \u5728 pluginJar \u4e2d\u53ef\u4ee5\u6dfb\u52a0\u81ea\u5b9a\u4e49\u7684 plugin Jar \u5305"))),(0,t.yg)("li",{parentName:"ul"},"\u81ea\u5b9a\u4e49\u7684 ShenyuPlugin \u5982\u679c\u4f9d\u8d56\u4e86\u5176\u4ed6\u7684\u7b2c\u4e09\u65b9\u5305\u53ef\u4ee5 ShenyuBootstrap \u542f\u52a8\u65f6\u52a0\u8f7d\u5230 -cp \u7684\u7b2c\u4e09\u65b9jar\u5305\u76ee\u5f55")),(0,t.yg)("p",null,"\u6ce8\u610f:"),(0,t.yg)("p",null,"\u4e0a\u4f20jar\u5305\u63d2\u4ef6\u652f\u6301\u70ed\u52a0\u8f7d\n\u5982\u679c\u4f60\u9700\u8981\u5728\u7ebf\u4fee\u6539jar\u5305. \u4f60\u53ef\u4ee5\u91cd\u65b0\u6253\u4e00\u4e2ajar\u5305. \u5e76\u4e14\u63d0\u5347\u7248\u672c\u53f7, \u4f8b\u5982 ",(0,t.yg)("inlineCode",{parentName:"p"},"1.0.1")," \u5347\u9ad8\u81f3 ",(0,t.yg)("inlineCode",{parentName:"p"},"1.0.2")))}s.isMDXComponent=!0}}]);