"use strict";(self.webpackChunkshenyu_website=self.webpackChunkshenyu_website||[]).push([[43790],{15680:(e,n,a)=>{a.d(n,{xA:()=>c,yg:()=>d});var t=a(96540);function i(e,n,a){return n in e?Object.defineProperty(e,n,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[n]=a,e}function l(e,n){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);n&&(t=t.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),a.push.apply(a,t)}return a}function o(e){for(var n=1;n<arguments.length;n++){var a=null!=arguments[n]?arguments[n]:{};n%2?l(Object(a),!0).forEach((function(n){i(e,n,a[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):l(Object(a)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(a,n))}))}return e}function r(e,n){if(null==e)return{};var a,t,i=function(e,n){if(null==e)return{};var a,t,i={},l=Object.keys(e);for(t=0;t<l.length;t++)a=l[t],n.indexOf(a)>=0||(i[a]=e[a]);return i}(e,n);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(t=0;t<l.length;t++)a=l[t],n.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(i[a]=e[a])}return i}var s=t.createContext({}),p=function(e){var n=t.useContext(s),a=n;return e&&(a="function"==typeof e?e(n):o(o({},n),e)),a},c=function(e){var n=p(e.components);return t.createElement(s.Provider,{value:n},e.children)},g="mdxType",h={inlineCode:"code",wrapper:function(e){var n=e.children;return t.createElement(t.Fragment,{},n)}},u=t.forwardRef((function(e,n){var a=e.components,i=e.mdxType,l=e.originalType,s=e.parentName,c=r(e,["components","mdxType","originalType","parentName"]),g=p(a),u=i,d=g["".concat(s,".").concat(u)]||g[u]||h[u]||l;return a?t.createElement(d,o(o({ref:n},c),{},{components:a})):t.createElement(d,o({ref:n},c))}));function d(e,n){var a=arguments,i=n&&n.mdxType;if("string"==typeof e||i){var l=a.length,o=new Array(l);o[0]=u;var r={};for(var s in n)hasOwnProperty.call(n,s)&&(r[s]=n[s]);r.originalType=e,r[g]="string"==typeof e?e:i,o[1]=r;for(var p=2;p<l;p++)o[p]=a[p];return t.createElement.apply(null,o)}return t.createElement.apply(null,a)}u.displayName="MDXCreateElement"},775:(e,n,a)=>{a.r(n),a.d(n,{contentTitle:()=>o,default:()=>g,frontMatter:()=>l,metadata:()=>r,toc:()=>s});var t=a(58168),i=(a(96540),a(15680));const l={title:"Apollo Data Synchronization Source Code Analysis",author:"hql0312",author_title:"Apache ShenYu Contributor",author_url:"https://github.com/hql0312",tags:["apollo","data sync","Apache ShenYu"]},o=void 0,r={permalink:"/blog/DataSync-SourceCode-Analysis-Apollo-Data-Sync",editUrl:"https://github.com/apache/shenyu-website/edit/main/blog/DataSync-SourceCode-Analysis-Apollo-Data-Sync.md",source:"@site/blog/DataSync-SourceCode-Analysis-Apollo-Data-Sync.md",title:"Apollo Data Synchronization Source Code Analysis",description:"This article is based on the source code analysis of version 'shenyu-2.6.1'. Please refer to the official website for an introduction Data Synchronization Design.",date:"2024-07-12T11:34:56.287Z",formattedDate:"July 12, 2024",tags:[{label:"apollo",permalink:"/blog/tags/apollo"},{label:"data sync",permalink:"/blog/tags/data-sync"},{label:"Apache ShenYu",permalink:"/blog/tags/apache-shen-yu"}],readingTime:11.975,truncated:!1,prevItem:{title:"Apache ShenYu Start Demo",permalink:"/blog/Start-SourceCode-Analysis-Start-Demo"},nextItem:{title:"Nacos Data Synchronization Source Code Analysis",permalink:"/blog/DataSync-SourceCode-Analysis-Nacos-Data-Sync"}},s=[{value:"Admin management",id:"admin-management",children:[]},{value:"Receive Data",id:"receive-data",children:[]},{value:"Processing data",id:"processing-data",children:[]},{value:"Distribute data",id:"distribute-data",children:[]},{value:"Data initialization",id:"data-initialization",children:[]},{value:"Bootstrap synchronization operation initialization",id:"bootstrap-synchronization-operation-initialization",children:[]}],p={toc:s},c="wrapper";function g(e){let{components:n,...l}=e;return(0,i.yg)(c,(0,t.A)({},p,l,{components:n,mdxType:"MDXLayout"}),(0,i.yg)("blockquote",null,(0,i.yg)("p",{parentName:"blockquote"},"This article is based on the source code analysis of version 'shenyu-2.6.1'. Please refer to the official website for an introduction ",(0,i.yg)("a",{parentName:"p",href:"https://shenyu.apache.org/docs/design/data-sync/"},"Data Synchronization Design"),".")),(0,i.yg)("h3",{id:"admin-management"},"Admin management"),(0,i.yg)("p",null,"Understand the overall process through the process of adding plugins"),(0,i.yg)("p",null,(0,i.yg)("img",{src:a(94493).A})),(0,i.yg)("h3",{id:"receive-data"},"Receive Data"),(0,i.yg)("ul",null,(0,i.yg)("li",{parentName:"ul"},"PluginController.createPlugin()")),(0,i.yg)("p",null,"Enter the ",(0,i.yg)("inlineCode",{parentName:"p"},"createPlugin()")," method in the ",(0,i.yg)("inlineCode",{parentName:"p"},"PluginController")," class, which is responsible for data validation, adding or updating data, and returning result information."),(0,i.yg)("pre",null,(0,i.yg)("code",{parentName:"pre",className:"language-java"},'@Validated\n@RequiredArgsConstructor\n@RestController\n@RequestMapping("/plugin")\npublic class PluginController {\n\n  @PostMapping("")\n  @RequiresPermissions("system:plugin:add")\n  public ShenyuAdminResult createPlugin(@Valid @ModelAttribute final PluginDTO pluginDTO) {\n      // Call pluginService.createOrUpdate for processing logic\n      return ShenyuAdminResult.success(pluginService.createOrUpdate(pluginDTO));\n  }\n    \n    // ......\n}\n')),(0,i.yg)("h3",{id:"processing-data"},"Processing data"),(0,i.yg)("ul",null,(0,i.yg)("li",{parentName:"ul"},"PluginServiceImpl.createOrUpdate() -> PluginServiceImpl.create()")),(0,i.yg)("p",null,"Use the ",(0,i.yg)("inlineCode",{parentName:"p"},"create()")," method in the ",(0,i.yg)("inlineCode",{parentName:"p"},"PluginServiceImpl")," class to convert data, save it to the database, and publish events."),(0,i.yg)("pre",null,(0,i.yg)("code",{parentName:"pre",className:"language-java"},"@RequiredArgsConstructor\n@Service\npublic class PluginServiceImpl implements SelectorService {\n    // Event publishing object pluginEventPublisher\n    private final PluginEventPublisher pluginEventPublisher;\n\n   private String create(final PluginDTO pluginDTO) {\n      // Check if there is a corresponding plugin\n      Assert.isNull(pluginMapper.nameExisted(pluginDTO.getName()), AdminConstants.PLUGIN_NAME_IS_EXIST);\n      // check if Customized plugin jar\n      if (!Objects.isNull(pluginDTO.getFile())) {\n        Assert.isTrue(checkFile(Base64.decode(pluginDTO.getFile())), AdminConstants.THE_PLUGIN_JAR_FILE_IS_NOT_CORRECT_OR_EXCEEDS_16_MB);\n      }\n      // Create plugin object\n      PluginDO pluginDO = PluginDO.buildPluginDO(pluginDTO);\n      // Insert object into database\n      if (pluginMapper.insertSelective(pluginDO) > 0) {\n        // publish create event. init plugin data\n        pluginEventPublisher.onCreated(pluginDO);\n      }\n      return ShenyuResultMessage.CREATE_SUCCESS;\n  }\n    \n    \n    // ......\n    \n}\n\n")),(0,i.yg)("p",null,"Complete the data persistence operation in the ",(0,i.yg)("inlineCode",{parentName:"p"},"PluginServiceImpl")," class, that is, save the data to the database and publish events through ",(0,i.yg)("inlineCode",{parentName:"p"},"pluginEventPublisher"),"."),(0,i.yg)("p",null,"The logic of the ",(0,i.yg)("inlineCode",{parentName:"p"},"pluginEventPublisher.onCreated")," method is to publish the changed event:"),(0,i.yg)("pre",null,(0,i.yg)("code",{parentName:"pre",className:"language-java"},"    @Override\npublic void onCreated(final PluginDO plugin) {\n        // Publish DataChangeEvent events: event grouping (plugins, selectors, rules), event types (create, delete, update), changed data\n        publisher.publishEvent(new DataChangedEvent(ConfigGroupEnum.PLUGIN, DataEventTypeEnum.CREATE,\n        Collections.singletonList(PluginTransfer.INSTANCE.mapToData(plugin))));\n        // Publish PluginCreatedEvent\n        publish(new PluginCreatedEvent(plugin, SessionUtil.visitorName()));\n}\n")),(0,i.yg)("p",null,"Publishing change data is completed through ",(0,i.yg)("inlineCode",{parentName:"p"},"publisher.publishEvent()"),", which is an 'Application EventPublisher' object with the fully qualified name of 'org. springframework. contentxt.' Application EventPublisher `. From here, we know that publishing data is accomplished through the Spring related features."),(0,i.yg)("blockquote",null,(0,i.yg)("p",{parentName:"blockquote"},"About ",(0,i.yg)("inlineCode",{parentName:"p"},"ApplicationEventPublisher"),"\uff1a"),(0,i.yg)("p",{parentName:"blockquote"},"When there is a state change, the publisher calls the ",(0,i.yg)("inlineCode",{parentName:"p"},"publishEvent")," method of ",(0,i.yg)("inlineCode",{parentName:"p"},"ApplicationEventPublisher")," to publish an event, the ",(0,i.yg)("inlineCode",{parentName:"p"},"Spring")," container broadcasts the event to all observers, and calls the observer's ",(0,i.yg)("inlineCode",{parentName:"p"},"onApplicationEvent")," method to pass the event object to the observer. There are two ways to call the ",(0,i.yg)("inlineCode",{parentName:"p"},"publishEvent")," method. One is to implement the interface, inject the ",(0,i.yg)("inlineCode",{parentName:"p"},"ApplicationEventPublisher")," object into the container, and then call its method. The other is to call the container directly. There is not much difference between the two methods to publish events."),(0,i.yg)("ul",{parentName:"blockquote"},(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("inlineCode",{parentName:"li"},"ApplicationEventPublisher"),"\uff1aPublish events\uff1b"),(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("inlineCode",{parentName:"li"},"ApplicationEvent"),"\uff1a",(0,i.yg)("inlineCode",{parentName:"li"},"Spring")," events\uff0cRecord the source, time, and data of the event;"),(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("inlineCode",{parentName:"li"},"ApplicationListener"),"\uff1aEvent listeners, observers;"))),(0,i.yg)("p",null,"In the event publishing mechanism of Spring, there are three objects,"),(0,i.yg)("p",null,"One is the ",(0,i.yg)("inlineCode",{parentName:"p"},"ApplicationEventPublisher")," that publishes events, injecting an ",(0,i.yg)("inlineCode",{parentName:"p"},"publisher")," through a constructor in ",(0,i.yg)("inlineCode",{parentName:"p"},"ShenYu"),"."),(0,i.yg)("p",null,"The other object is ",(0,i.yg)("inlineCode",{parentName:"p"},"ApplicationEvent"),", which is inherited from ",(0,i.yg)("inlineCode",{parentName:"p"},"ShenYu")," through ",(0,i.yg)("inlineCode",{parentName:"p"},"DataChangedEvent"),", representing the event object"),(0,i.yg)("pre",null,(0,i.yg)("code",{parentName:"pre",className:"language-java"},"public class DataChangedEvent extends ApplicationEvent {\n//......\n}\n")),(0,i.yg)("p",null,"The last one is ",(0,i.yg)("inlineCode",{parentName:"p"},"ApplicationListener"),", which is implemented in ",(0,i.yg)("inlineCode",{parentName:"p"},"ShenYu")," through the ",(0,i.yg)("inlineCode",{parentName:"p"},"DataChangedEventDispatcher")," class as a listener for events, responsible for handling event objects."),(0,i.yg)("pre",null,(0,i.yg)("code",{parentName:"pre",className:"language-java"},"@Component\npublic class DataChangedEventDispatcher implements ApplicationListener<DataChangedEvent>, InitializingBean {\n\n    //......\n    \n}\n")),(0,i.yg)("h3",{id:"distribute-data"},"Distribute data"),(0,i.yg)("ul",null,(0,i.yg)("li",{parentName:"ul"},"DataChangedEventDispatcher.onApplicationEvent()")),(0,i.yg)("p",null,"After the event is published, it will automatically enter the ",(0,i.yg)("inlineCode",{parentName:"p"},"onApplicationEvent()")," method in the ",(0,i.yg)("inlineCode",{parentName:"p"},"DataChangedEventDispatcher")," class for event processing."),(0,i.yg)("pre",null,(0,i.yg)("code",{parentName:"pre",className:"language-java"},'@Component\npublic class DataChangedEventDispatcher implements ApplicationListener<DataChangedEvent>, InitializingBean {\n\n  /**\n     * When there is a data change, call this method\n     * @param event\n     */\n  @Override\n  @SuppressWarnings("unchecked")\n  public void onApplicationEvent(final DataChangedEvent event) {\n    // Traverse data change listeners (only ApolloDataChangedListener will be registered here)\n    for (DataChangedListener listener : listeners) {\n      // Forward according to different grouping types\n      switch (event.getGroupKey()) {\n        case APP_AUTH: // authentication information\n          listener.onAppAuthChanged((List<AppAuthData>) event.getSource(), event.getEventType());\n          break;\n        case PLUGIN: // Plugin events\n          // Calling the registered listener object\n          listener.onPluginChanged((List<PluginData>) event.getSource(), event.getEventType());\n          break;\n        case RULE: // Rule events\n          listener.onRuleChanged((List<RuleData>) event.getSource(), event.getEventType());\n          break;\n        case SELECTOR: // Selector event\n          listener.onSelectorChanged((List<SelectorData>) event.getSource(), event.getEventType());\n          break;\n        case META_DATA: // Metadata events\n          listener.onMetaDataChanged((List<MetaData>) event.getSource(), event.getEventType());\n          break;\n        case PROXY_SELECTOR: // Proxy selector event\n          listener.onProxySelectorChanged((List<ProxySelectorData>) event.getSource(), event.getEventType());\n          break;\n        case DISCOVER_UPSTREAM: // Registration discovery of downstream list events\n          listener.onDiscoveryUpstreamChanged((List<DiscoverySyncData>) event.getSource(), event.getEventType());\n          applicationContext.getBean(LoadServiceDocEntry.class).loadDocOnUpstreamChanged((List<DiscoverySyncData>) event.getSource(), event.getEventType());\n          break;\n        default:\n          throw new IllegalStateException("Unexpected value: " + event.getGroupKey());\n      }\n    }\n  }\n    \n}\n')),(0,i.yg)("p",null,"When there is a data change, call the ",(0,i.yg)("inlineCode",{parentName:"p"},"onApplicationEvent")," method, then traverse all data change listeners, determine which data type it is, and hand it over to the corresponding data listeners for processing."),(0,i.yg)("p",null,(0,i.yg)("inlineCode",{parentName:"p"},"ShenYu")," has grouped all data into the following types: authentication information, plugin information, rule information, selector information, metadata, proxy selector, and downstream event discovery."),(0,i.yg)("p",null,"The Data Change Listener here is an abstraction of the data synchronization strategy, processed by specific implementations, and different listeners are processed by different implementations. Currently, Apollo is being analyzed\nListening, so here we only focus on ",(0,i.yg)("inlineCode",{parentName:"p"},"ApolloDataChangedListener"),"."),(0,i.yg)("pre",null,(0,i.yg)("code",{parentName:"pre",className:"language-java"},"// Inheriting AbstractNodeDataChangedListener\npublic class ApolloDataChangedListener extends AbstractNodeDataChangedListener {\n    \n}\n")),(0,i.yg)("p",null,(0,i.yg)("inlineCode",{parentName:"p"},"ApolloDataChangedListener")," inherits the ",(0,i.yg)("inlineCode",{parentName:"p"},"AbstractNodeDataChangedListener")," class, which mainly uses key as the base class for storage, such as Apollo, Nacos, etc., while others such as Zookeeper\nConsul, etc. are searched in a hierarchical manner using a path."),(0,i.yg)("pre",null,(0,i.yg)("code",{parentName:"pre",className:"language-java"},"// Using key as the base class for finding storage methods\npublic abstract class AbstractNodeDataChangedListener implements DataChangedListener { \n    \n    protected AbstractNodeDataChangedListener(final ChangeData changeData) {\n      this.changeData = changeData;\n    }\n}\n")),(0,i.yg)("p",null,(0,i.yg)("inlineCode",{parentName:"p"},"AbstractNodeDataChangedListener")," receives ChangeData as a parameter, which defines the key names for each data stored in Apollo. The data stored in Apollo includes the following data:"),(0,i.yg)("ul",null,(0,i.yg)("li",{parentName:"ul"},"Plugin(plugin)"),(0,i.yg)("li",{parentName:"ul"},"Selector(selector)"),(0,i.yg)("li",{parentName:"ul"},"Rules(rule)"),(0,i.yg)("li",{parentName:"ul"},"Authorization(auth)"),(0,i.yg)("li",{parentName:"ul"},"Metadata(meta)"),(0,i.yg)("li",{parentName:"ul"},"Proxy selector(proxy.selector)"),(0,i.yg)("li",{parentName:"ul"},"Downstream List (discovery)")),(0,i.yg)("p",null,"These information are specified by the ApolloDataChangedListener constructor:"),(0,i.yg)("pre",null,(0,i.yg)("code",{parentName:"pre",className:"language-java"},"public class ApolloDataChangedListener extends AbstractNodeDataChangedListener {\n  public ApolloDataChangedListener(final ApolloClient apolloClient) {\n    // Configure prefixes for several types of grouped data\n    super(new ChangeData(ApolloPathConstants.PLUGIN_DATA_ID,\n            ApolloPathConstants.SELECTOR_DATA_ID,\n            ApolloPathConstants.RULE_DATA_ID,\n            ApolloPathConstants.AUTH_DATA_ID,\n            ApolloPathConstants.META_DATA_ID,\n            ApolloPathConstants.PROXY_SELECTOR_DATA_ID,\n            ApolloPathConstants.DISCOVERY_DATA_ID));\n    // Manipulating objects of Apollo\n    this.apolloClient = apolloClient;\n  }\n}\n")),(0,i.yg)("p",null,(0,i.yg)("inlineCode",{parentName:"p"},"DataChangedListener")," defines the following methods:"),(0,i.yg)("pre",null,(0,i.yg)("code",{parentName:"pre",className:"language-java"},"// Data Change Listener\npublic interface DataChangedListener {\n\n    // Call when authorization information changes\n    default void onAppAuthChanged(List<AppAuthData> changed, DataEventTypeEnum eventType) {\n    }\n\n    // Called when plugin information changes\n    default void onPluginChanged(List<PluginData> changed, DataEventTypeEnum eventType) {\n    }\n\n    // Called when selector information changes\n    default void onSelectorChanged(List<SelectorData> changed, DataEventTypeEnum eventType) {\n    }\n    \n     // Called when metadata information changes\n    default void onMetaDataChanged(List<MetaData> changed, DataEventTypeEnum eventType) {\n\n    }\n\n    // Call when rule information changes\n    default void onRuleChanged(List<RuleData> changed, DataEventTypeEnum eventType) {\n    }\n\n    // Called when proxy selector changes\n    default void onProxySelectorChanged(List<ProxySelectorData> changed, DataEventTypeEnum eventType) {\n    }\n    // Called when downstream information changes are discovered\n    default void onDiscoveryUpstreamChanged(List<DiscoverySyncData> changed, DataEventTypeEnum eventType) {\n    }\n\n}\n")),(0,i.yg)("p",null,"When the plugin is processed by ",(0,i.yg)("inlineCode",{parentName:"p"},"DataChangedEventDispatcher"),", the method ",(0,i.yg)("inlineCode",{parentName:"p"},"listener.onPluginChanged")," is called. Next, analyze the logic of the object and implement the processing by ",(0,i.yg)("inlineCode",{parentName:"p"},"AbstractNodeDataChangedListener"),":"),(0,i.yg)("pre",null,(0,i.yg)("code",{parentName:"pre",className:"language-java"},'public abstract class AbstractNodeDataChangedListener implements DataChangedListener {\n  @Override\n  public void onPluginChanged(final List<PluginData> changed, final DataEventTypeEnum eventType) {\n    //Configure prefix as plugin.\n    final String configKeyPrefix = changeData.getPluginDataId() + DefaultNodeConstants.JOIN_POINT;\n    this.onCommonChanged(configKeyPrefix, changed, eventType, PluginData::getName, PluginData.class);\n    LOG.debug("[DataChangedListener] PluginChanged {}", configKeyPrefix);\n  }\n}\n')),(0,i.yg)("p",null,"Firstly, the key prefix for constructing configuration data is: ",(0,i.yg)("inlineCode",{parentName:"p"},"plugin."),", Call ",(0,i.yg)("inlineCode",{parentName:"p"},"onCommonChanged")," again for unified processing:"),(0,i.yg)("pre",null,(0,i.yg)("code",{parentName:"pre",className:"language-java"},'private <T> void onCommonChanged(final String configKeyPrefix, final List<T> changedList,\n                                     final DataEventTypeEnum eventType, final Function<? super T, ? extends String> mapperToKey,\n                                     final Class<T> tClass) {\n        // Avoiding concurrent operations on list nodes\n        final ReentrantLock reentrantLock = listSaveLockMap.computeIfAbsent(configKeyPrefix, key -> new ReentrantLock());\n        try {\n            reentrantLock.lock();\n            // Current incoming plugin list\n            final List<String> changeNames = changedList.stream().map(mapperToKey).collect(Collectors.toList());\n            switch (eventType) {\n                // Delete Operation\n                case DELETE:\n                    // delete plugin.${pluginName}\n                    changedList.stream().map(mapperToKey).forEach(removeKey -> {\n                        delConfig(configKeyPrefix + removeKey);\n                    });\n                    // Remove the corresponding plugin name from plugin. list\n                    // The plugin.list records the currently enabled list\n                    delChangedData(configKeyPrefix, changeNames);\n                    break;\n                case REFRESH:\n                case MYSELF:\n                    // Overload logic\n                    // Get a list of all plugins in plugin.list\n                    final List<String> configDataNames = this.getConfigDataNames(configKeyPrefix);\n                    // Update each currently adjusted plug-in in turn\n                    changedList.forEach(changedData -> {\n                        // Publish Configuration\n                        publishConfig(configKeyPrefix + mapperToKey.apply(changedData), changedData);\n                    });\n                    // If there is more data in the currently stored list than what is currently being passed in, delete the excess data\n                    if (configDataNames != null && configDataNames.size() > changedList.size()) {\n                        // Kick out the currently loaded data\n                        configDataNames.removeAll(changeNames);\n                        // Delete cancelled data one by one\n                        configDataNames.forEach(this::delConfig);\n                    }\n                    // Update list data again\n                    publishConfig(configKeyPrefix + DefaultNodeConstants.LIST_STR, changeNames);\n                    break;\n                default:\n                    // Add or update\n                    changedList.forEach(changedData -> {\n                        publishConfig(configKeyPrefix + mapperToKey.apply(changedData), changedData);\n                    });\n                    // Update the newly added plugin\n                    putChangeData(configKeyPrefix, changeNames);\n                    break;\n            }\n        } catch (Exception e) {\n            LOG.error("AbstractNodeDataChangedListener onCommonMultiChanged error ", e);\n        } finally {\n            reentrantLock.unlock();\n        }\n    }\n')),(0,i.yg)("p",null,"In the above logic, it actually includes the handling of full overloading (REFRESH, MYSELF) and increment (Delete, UPDATE, CREATE)"),(0,i.yg)("p",null,"The plugin mainly includes two nodes:"),(0,i.yg)("ul",null,(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("inlineCode",{parentName:"li"},"plugin.list")," List of currently effective plugins"),(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("inlineCode",{parentName:"li"},"plugin.${plugin.name}")," Detailed information on specific plugins\nFinally, write the data corresponding to these two nodes into Apollo.")),(0,i.yg)("h3",{id:"data-initialization"},"Data initialization"),(0,i.yg)("p",null,"After starting ",(0,i.yg)("inlineCode",{parentName:"p"},"admin"),", the current data information will be fully synchronized to ",(0,i.yg)("inlineCode",{parentName:"p"},"Apollo"),", which is implemented by ",(0,i.yg)("inlineCode",{parentName:"p"},"ApolloDataChangedInit"),":"),(0,i.yg)("pre",null,(0,i.yg)("code",{parentName:"pre",className:"language-java"},"// Inheriting AbstractDataChangedInit\npublic class ApolloDataChangedInit extends AbstractDataChangedInit {\n    // Apollo operation object\n    private final ApolloClient apolloClient;\n    \n    public ApolloDataChangedInit(final ApolloClient apolloClient) {\n        this.apolloClient = apolloClient;\n    }\n    \n    @Override\n    protected boolean notExist() {\n        // Check if nodes such as plugin, auth, meta, proxy.selector exist\n        // As long as one does not exist, it enters reload (these nodes will not be created, why check once?)\n        return Stream.of(ApolloPathConstants.PLUGIN_DATA_ID, ApolloPathConstants.AUTH_DATA_ID, ApolloPathConstants.META_DATA_ID, ApolloPathConstants.PROXY_SELECTOR_DATA_ID).allMatch(\n                this::dataIdNotExist);\n    }\n\n    /**\n     * Data id not exist boolean.\n     *\n     * @param pluginDataId the plugin data id\n     * @return the boolean\n     */\n    private boolean dataIdNotExist(final String pluginDataId) {\n        return Objects.isNull(apolloClient.getItemValue(pluginDataId));\n    }\n}\n\n")),(0,i.yg)("p",null,"Check if there is data in ",(0,i.yg)("inlineCode",{parentName:"p"},"apollo"),", and if it does not exist, synchronize it.\nThere is a bug here because the key determined here will not be created during synchronization, which will cause data to be reloaded every time it is restarted. ",(0,i.yg)("a",{parentName:"p",href:"https://github.com/apache/shenyu/pull/5435"},"PR#5435")),(0,i.yg)("p",null,(0,i.yg)("inlineCode",{parentName:"p"},"ApolloDataChangedInit")," implements the ",(0,i.yg)("inlineCode",{parentName:"p"},"CommandLineRunner")," interface. It is an interface provided by ",(0,i.yg)("inlineCode",{parentName:"p"},"springboot")," that executes the ",(0,i.yg)("inlineCode",{parentName:"p"},"run()")," method after all ",(0,i.yg)("inlineCode",{parentName:"p"},"Spring Beans")," are initialized. It is commonly used for initialization operations in projects."),(0,i.yg)("ul",null,(0,i.yg)("li",{parentName:"ul"},"SyncDataService.syncAll()")),(0,i.yg)("p",null,"Query data from the database, then perform full data synchronization, including all authentication information, plugin information, rule information, selector information, metadata, proxy selector, and discover downstream events. Mainly, synchronization events are published through ",(0,i.yg)("inlineCode",{parentName:"p"},"eventPublisher"),". After publishing events through ",(0,i.yg)("inlineCode",{parentName:"p"},"publishEvent()"),", ",(0,i.yg)("inlineCode",{parentName:"p"},"ApplicationListener")," performs event change operations, which is referred to as ",(0,i.yg)("inlineCode",{parentName:"p"},"DataChangedEventDispatcher")," in ",(0,i.yg)("inlineCode",{parentName:"p"},"ShenYu"),"."),(0,i.yg)("pre",null,(0,i.yg)("code",{parentName:"pre",className:"language-java"},"@Service\npublic class SyncDataServiceImpl implements SyncDataService {\n    // Event Publishing\n    private final ApplicationEventPublisher eventPublisher;\n    \n     /***\n     * Full data synchronization\n     * @param type the type\n     * @return\n     */\n     @Override\n     public boolean syncAll(final DataEventTypeEnum type) {\n         // Synchronize auth data\n         appAuthService.syncData();\n         // Synchronize plugin data\n         List<PluginData> pluginDataList = pluginService.listAll();\n         //Notify subscribers through the Spring publish/subscribe mechanism (publishing DataChangedEvent)\n         //Unified monitoring by DataChangedEventDispatcher\n         //DataChangedEvent comes with configuration grouping type, current operation type, and data\n         eventPublisher.publishEvent(new DataChangedEvent(ConfigGroupEnum.PLUGIN, type, pluginDataList));\n         // synchronizing selector\n         List<SelectorData> selectorDataList = selectorService.listAll();\n         eventPublisher.publishEvent(new DataChangedEvent(ConfigGroupEnum.SELECTOR, type, selectorDataList));\n         // Synchronization rules\n         List<RuleData> ruleDataList = ruleService.listAll();\n         eventPublisher.publishEvent(new DataChangedEvent(ConfigGroupEnum.RULE, type, ruleDataList));\n         // Synchronization metadata\n         metaDataService.syncData();\n         // Synchronization Downstream List\n         discoveryService.syncData();\n         return true;\n     }\n    \n}\n")),(0,i.yg)("h3",{id:"bootstrap-synchronization-operation-initialization"},"Bootstrap synchronization operation initialization"),(0,i.yg)("p",null,"The data synchronization initialization operation on the gateway side mainly involves subscribing to nodes in ",(0,i.yg)("inlineCode",{parentName:"p"},"apollo"),", and receiving changed data when there are changes. This depends on the ",(0,i.yg)("inlineCode",{parentName:"p"},"listener")," mechanism of ",(0,i.yg)("inlineCode",{parentName:"p"},"apollo"),". In ",(0,i.yg)("inlineCode",{parentName:"p"},"ShenYu"),", the person responsible for ",(0,i.yg)("inlineCode",{parentName:"p"},"Apollo")," data synchronization is ",(0,i.yg)("inlineCode",{parentName:"p"},"ApolloDataService"),".\nThe functional logic of Apollo DataService is completed during the instantiation process: subscribe to the ",(0,i.yg)("inlineCode",{parentName:"p"},"shenyu")," data synchronization node in Apollo. Implement through the ",(0,i.yg)("inlineCode",{parentName:"p"},"configService.addChangeListener()")," method;"),(0,i.yg)("pre",null,(0,i.yg)("code",{parentName:"pre",className:"language-java"},"public class ApolloDataService extends AbstractNodeDataSyncService implements SyncDataService {\n    public ApolloDataService(final Config configService, final PluginDataSubscriber pluginDataSubscriber,\n                             final List<MetaDataSubscriber> metaDataSubscribers,\n                             final List<AuthDataSubscriber> authDataSubscribers,\n                             final List<ProxySelectorDataSubscriber> proxySelectorDataSubscribers,\n                             final List<DiscoveryUpstreamDataSubscriber> discoveryUpstreamDataSubscribers) {\n        // Configure the prefix for listening\n        super(new ChangeData(ApolloPathConstants.PLUGIN_DATA_ID,\n                        ApolloPathConstants.SELECTOR_DATA_ID,\n                        ApolloPathConstants.RULE_DATA_ID,\n                        ApolloPathConstants.AUTH_DATA_ID,\n                        ApolloPathConstants.META_DATA_ID,\n                        ApolloPathConstants.PROXY_SELECTOR_DATA_ID,\n                        ApolloPathConstants.DISCOVERY_DATA_ID),\n                pluginDataSubscriber, metaDataSubscribers, authDataSubscribers, proxySelectorDataSubscribers, discoveryUpstreamDataSubscribers);\n        this.configService = configService;\n        // Start listening\n        // Note: The Apollo method is only responsible for obtaining data from Apollo and adding it to the local cache, and does not handle listening\n        startWatch();\n        // Configure listening\n        apolloWatchPrefixes();\n    }\n}\n")),(0,i.yg)("p",null,"Firstly, configure the key information that needs to be processed and synchronize it with the admin's key. Next, call the ",(0,i.yg)("inlineCode",{parentName:"p"},"startWatch()")," method to process data acquisition and listening. But in the implementation of Apollo, this method is only responsible for handling data retrieval and setting it to the local cache.\nListening is handled by the ",(0,i.yg)("inlineCode",{parentName:"p"},"apolloWatchPrefixes")," method"),(0,i.yg)("pre",null,(0,i.yg)("code",{parentName:"pre",className:"language-java"},'private void apolloWatchPrefixes() {\n        // Defining Listeners\n        final ConfigChangeListener listener = changeEvent -> {\n            changeEvent.changedKeys().forEach(changeKey -> {\n                try {\n                    final ConfigChange configChange = changeEvent.getChange(changeKey);\n                    // Skip if not changed\n                    if (configChange == null) {\n                        LOG.error("apollo watchPrefixes error configChange is null {}", changeKey);\n                        return;\n                    }\n                    final String newValue = configChange.getNewValue();\n                    // skip last is "list"\n                    // If it is a Key at the end of the list, such as plugin.list, skip it because it is only a list that records the effectiveness and will not be cached locally\n                    final int lastListStrIndex = changeKey.length() - DefaultNodeConstants.LIST_STR.length();\n                    if (changeKey.lastIndexOf(DefaultNodeConstants.LIST_STR) == lastListStrIndex) {\n                        return;\n                    }\n                    // If it starts with plugin. => Process plugin data\n                    if (changeKey.indexOf(ApolloPathConstants.PLUGIN_DATA_ID) == 0) {\n                        // delete\n                        if (PropertyChangeType.DELETED.equals(configChange.getChangeType())) {\n                            // clear cache\n                            unCachePluginData(changeKey);\n                        } else {\n                            // update cache\n                            cachePluginData(newValue);\n                        }\n                        // If it starts with selector. => Process selector data\n                    } else if (changeKey.indexOf(ApolloPathConstants.SELECTOR_DATA_ID) == 0) {\n                        if (PropertyChangeType.DELETED.equals(configChange.getChangeType())) {\n                            unCacheSelectorData(changeKey);\n                        } else {\n                            cacheSelectorData(newValue);\n                        }\n                        // If it starts with rule. => Process rule data\n                    } else if (changeKey.indexOf(ApolloPathConstants.RULE_DATA_ID) == 0) {\n                        if (PropertyChangeType.DELETED.equals(configChange.getChangeType())) {\n                            unCacheRuleData(changeKey);\n                        } else {\n                            cacheRuleData(newValue);\n                        }\n                      // If it starts with auth. => Process auth data\n                    } else if (changeKey.indexOf(ApolloPathConstants.AUTH_DATA_ID) == 0) {\n                        if (PropertyChangeType.DELETED.equals(configChange.getChangeType())) {\n                            unCacheAuthData(changeKey);\n                        } else {\n                            cacheAuthData(newValue);\n                        }\n                        // If it starts with meta. => Process meta data\n                    } else if (changeKey.indexOf(ApolloPathConstants.META_DATA_ID) == 0) {\n                        if (PropertyChangeType.DELETED.equals(configChange.getChangeType())) {\n                            unCacheMetaData(changeKey);\n                        } else {\n                            cacheMetaData(newValue);\n                        }\n                        // If it starts with proxy.selector. => Process proxy.selector meta\n                    } else if (changeKey.indexOf(ApolloPathConstants.PROXY_SELECTOR_DATA_ID) == 0) {\n                        if (PropertyChangeType.DELETED.equals(configChange.getChangeType())) {\n                            unCacheProxySelectorData(changeKey);\n                        } else {\n                            cacheProxySelectorData(newValue);\n                        }\n                        // If it starts with discovery. => Process discovery meta\n                    } else if (changeKey.indexOf(ApolloPathConstants.DISCOVERY_DATA_ID) == 0) {\n                        if (PropertyChangeType.DELETED.equals(configChange.getChangeType())) {\n                            unCacheDiscoveryUpstreamData(changeKey);\n                        } else {\n                            cacheDiscoveryUpstreamData(newValue);\n                        }\n                    }\n                } catch (Exception e) {\n                    LOG.error("apollo sync listener change key handler error", e);\n                }\n            });\n        };\n        watchConfigChangeListener = listener;\n        // Add listening\n        configService.addChangeListener(listener, Collections.emptySet(), ApolloPathConstants.pathKeySet());\n\n    }\n')),(0,i.yg)("p",null,"The logic of loading data from the previous admin will only add two keys to the plugin: ",(0,i.yg)("inlineCode",{parentName:"p"},"plugin.list")," and ",(0,i.yg)("inlineCode",{parentName:"p"},"plugin.${plugin.name}"),", while ",(0,i.yg)("inlineCode",{parentName:"p"},"plugin.list")," is a list of all enabled plugins, and the data for this key is in the\nThere is no data in the local cache, only `plugin${plugin.name} will be  focus."),(0,i.yg)("p",null,"At this point, the synchronization logic of bootstrap in ",(0,i.yg)("inlineCode",{parentName:"p"},"apollo")," has been analyzed."))}g.isMDXComponent=!0},94493:(e,n,a)=>{a.d(n,{A:()=>t});const t=a.p+"assets/images/Apollo-Sync-b0720ba3b1fe0dfcb554b104a78ce2bd.png"}}]);