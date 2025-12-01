# 命名空间（namespace）管理

## 1. 背景与说明

目前在管理不同业务线需求的网关时，常常需要同时部署多套 ShenYu Admin 和 ShenYu Gateway。为了确保数据独立性，通常每个网关只能连接一 个 ShenYu Admin。但是，这样的架构会增加用户使用成本和运维成本。 为了提供更便捷的使用体验，ShenYu Admin 引入了命名空间来实现数据隔离，用 于管理不同业务线的网关数据。企业或个人用户只需配置一套ShenYu Admin 和 ShenYu Bootstrap 服务，然后通过命名空间来管理不同业务线的网关数据。

特别说明：为了方便大家的使用，系统中已经存在默认的命名空间，请不要在数据库中手动删除默认命名空间的记录；

## 2.命名空间创建与启用

### 1.创建命名空间

用户登录shenyu-admin后台，选择【基础配置-命名空间管理】

<img src="/img/shenyu/basicConfig/namespace/namespace-manager.png" width="80%" height="50%" />

命名空间管理模块下点击添加数据即可新增命名空间，只需填写【名字】和【描述】系统会自动生成namespaceId

<img src="/img/shenyu/basicConfig/namespace/namespace-add.png" width="80%" height="50%" />

创建成功后会自动生成唯一namespaceId

<img src="/img/shenyu/basicConfig/namespace/namespace-Id.png" width="80%" height="50%" />

### 2.下游服务配置命名空间（shenyu-client）

得到namespaceId以后，我们可以在下游服务（已经引入shenyu-client），配置文件中配置单个或多个namespaceId（多个namespaceId之间应使用 “;” 隔开）

<img src="/img/shenyu/basicConfig/namespace/namespace-shenyu-client.png" width="80%" height="50%" />

### 3.管理命名空间下的数据

在Shenyu-client的数据注册到Shenyu-admin指定的命名空间下后。在后台管理端中，支持命名空间隔离的网关数据，用户可以通过右上角按钮切换到不同命名空间下进行操作

<img src="/img/shenyu/basicConfig/namespace/namespace-divide.png" width="80%" height="50%" />

### 4.网关配置命名空间（bootstrap）

注意：一个网关只能绑定唯一namespaceId

<img src="/img/shenyu/basicConfig/namespace/namespace-bootstrap.png" width="80%" height="50%" />


## 3.插件管理

### 1.新增插件

新的命名空间下插件组默认为空，如果要为命名空间新增插件，则需要先在插件模板中选中生成到具体命名空间下。

选择【插件元数据管理】-【生成】-【选择目标命名空间】
<img src="/img/shenyu/basicConfig/namespace/namespace-generate-plugin.png" width="80%" height="50%" />

### 2.切换命名空间

通过右上角的组件，切换命名空间

<img src="/img/shenyu/basicConfig/namespace/namespace-change.png" width="80%" height="50%" />、

即可管理当前命名空间下的插件状态

<img src="/img/shenyu/basicConfig/namespace/namespace-new-plugin.png" width="80%" height="50%" />

### 3.其他网关数据管理

右上角有显示命名空间切换组件的页面，都支持命名空间隔离，通过组件切换命名空间，即可对特定命名空间下的网关数据进行管理

<img src="/img/shenyu/basicConfig/namespace/namespace-other-data.png" width="80%" height="50%" />

## 4.重要改动说明

#### 1.旧版本的【插件】的概念已经变成【插件元数据】概念，现在的【插件】模型已经是某个命名空间下的插件，而在数据库中【插件元数据】对应plugin表，【插件】对应namespace_plugin_rel 表

#### 2.Apidoc模块已经与selector、Rule等解绑

