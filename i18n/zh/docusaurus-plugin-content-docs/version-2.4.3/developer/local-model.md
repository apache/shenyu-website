---
title: 本地模式
keywords: ["本地模式"]
description: 本地模式
---

## 说明

* 主要介绍在单机环境下，然后使用本地 `API` 更新网关数据。

* 统一返回结果:

```
success
```

* 统一请求前缀：`localhost:9195/shenyu`

* 统一请求头：`localKey: 123456`

## 插件数据

### 新增或者更新插件

新增或者更新插件

##### 请求方式

POST

##### 请求路径

/plugin/saveOrUpdate

##### 请求参数

|名称|类型|是否必需|默认值|描述|
|---|---|---|---|---|
|**PluginData**|[PluginData](#PluginData)|True| |插件对象（Body里面传Json对象）|

##### <div id="PluginData">PluginData</div>

|名称|类型|是否必需|默认值|描述|
|---|---|---|---|---|
|**id**|String|False| |插件ID|
|**name**|String|True| |插件名称|
|**config**|String|False| |插件配置（Json格式）|
|**role**|String|False| |插件角色|
|**enabled**|Boolean|False| |是否开启|

##### 请求示例

POST body

```
{"id":3,"name":"divide","enabled":"true"}

```

### 清空所有数据

清空所有插件，选择器，规则数据

##### 请求方式

GET

##### 请求路径

/cleanAll

### 清空插件数据

清空单个插件，选择器，规则数据

##### 请求方式

GET

##### 请求路径

/cleanPlugin?name = xxxx

##### Request参数

|名称|类型|是否必需|默认值|描述|
|---|---|---|---|---|
|**name**|String|true| |插件名称 |

### 删除插件

删除单个插件(不包含，插件里面的选择器与规则)

##### 请求方式

GET

##### 请求路径

/plugin/delete?name = xxxx

##### Request参数

|名称|类型|是否必需|默认值|描述|
|---|---|---|---|---|
|**name**|String|true| |插件名称 |

### 删除所有插件

删除所有插件(不包含，插件里面的选择器与规则)

##### 请求方式

GET

##### 请求路径

/plugin/deleteAll

### 获取插件

根据名称获取插件数据

##### 请求方式

GET

##### 请求路径

/plugin/findByName?name=xxxx

##### Request参数

|名称|类型|是否必需|默认值|描述|
|---|---|---|---|---|
|**name**|String|true| |插件名称 |

### 新增或更新选择器

新增或者更新插件

##### 请求方式

POST

##### 请求路径

/plugin/selector/saveOrUpdate

##### 请求参数

|名称|类型|是否必需|默认值|描述|
|---|---|---|---|---|
|**SelectorData**|[SelectorData](#SelectorData)|True| |选择器对象（Body里面传Json对象）|

##### <div id="SelectorData">SelectorData</div>

|名称|类型|是否必需|默认值|描述|
|---|---|---|---|---|
|**id**|String|False| |选择器ID|
|**pluginName**|String|True| |插件名称|
|**name**|String|False| |选择器名称（不填则默认生成 plugin:selector+随机数字）|
|**matchMode**|Integer|False| |匹配模式（0：and;1：or），不填默认生成 And模式|
|**type**|Integer|False| |流量类型0：全流量;1：自定义流量）不填默认生成全流量|
|**sort**|Integer|False| |排序 ，不填默认生成 10|
|**enabled**|Boolean|False| |是否开启，不填默认生成 true|
|**logged**|Boolean|False| |是否打印日志，不填默认生成为false|
|**handle**|String|False| |选择器处理（Json对象，根据每个插件不同，传的对象不同）|
|**conditionList**|[Condition](#Condition)|False| |条件集合，自定义流量需要传，全流量不用传（Json List对象）|

##### <div id="Condition">Condition</div>

|名称|类型|是否必需|默认值|描述|
|---|---|---|---|---|
|**paramType**|String|True| |参数类型（post，uri，query，host，header，cookie，req_method，domain）|
|**operator**|String|True| |匹配方式（match，=，regex，>，<，contains，SpEL，Groovy，TimeBefore，TimeAfter）|
|**paramName**|String|False| |参数名称（uri 参数类型时候，可以不传）|
|**paramValue**|Integer|False| |匹配值|

##### 请求示例

POST body

```
{
	"pluginName": "divide",
	"type": 1,
	"handle": "[{\"upstreamUrl\":\"127.0.0.1:8089\"}]",
	"conditionDataList": [{
		"paramType": "uri",
		"operator": "match",
		"paramName": null,
		"paramValue": "/**"
	}]
}

```

##### 返回数据

选择器ID

```
xxxxx
```

### 新增选择器与规则

新增一条选择器与多条规则

##### 请求方式

POST

##### 请求路径

/plugin/selectorAndRules

##### 请求参数

|名称|类型|是否必需|默认值|描述|
|---|---|---|---|---|
|**SelectorRulesData**|[SelectorRulesData](#SelectorRulesData)|True| |选择器规则对象（Body里面传Json对象）|

##### <div id="SelectorRulesData">SelectorRulesData</div>

|名称|类型|是否必需|默认值|描述|
|---|---|---|---|---|
|**pluginName**|String|True| |插件名称|
|**selectorName**|String|False| |选择器名称（不填则默认生成 plugin:selector+随机数字）|
|**matchMode**|Integer|False| |匹配模式（0：and;1：or），不填默认生成 And模式|
|**selectorHandler**|String|False| |选择器处理（Json对象，根据每个插件不同，传的对象不同）|
|**conditionList**|[ConditionData](#ConditionData)|True| |选择器条件集合（Json List对象）|
|**ruleDataList**|[RuleLocalData](#RuleLocalData)|True| |规则对象集合（Json List对象）|

##### <div id="RuleLocalData">RuleLocalData</div>

|名称|类型|是否必需|默认值|描述|
|---|---|---|---|---|
|**ruleName**|String|False| |规则名称|
|**ruleHandler**|String|True| |规则处理（不同的插件传不同的值）|
|**matchMode**|Integer|False| |匹配模式（0：and;1：or)|
|**conditionList**|[ConditionData](#ConditionData)|True| |规则条件集合（Json List对象）|

##### <div id="ConditionData">ConditionData</div>

|名称|类型|是否必需|默认值|描述|
|---|---|---|---|---|
|**paramType**|String|True| |参数类型（post，uri，query，host，header，cookie，req_method，domain）|
|**operator**|String|True| |匹配方式（match，=，regex，>，<，contains，SpEL，Groovy，TimeBefore，TimeAfter）|
|**paramName**|String|False| |参数名称（uri 参数类型时候，可以不传）|
|**paramValue**|Integer|False| |匹配值|

##### 请求示例

POST body

```
{
	"pluginName": "divide",
	"selectorHandler": "[{\"upstreamUrl\":\"127.0.0.1:8089\"}]",
	"conditionDataList": [{
		"paramType": "uri",
		"operator": "match",
		"paramValue": "/http/**"
	}],
	"ruleDataList": [{
		"ruleHandler": "{\"loadBalance\":\"random\"}",
		"conditionDataList": [{
			"paramType": "uri",
			"operator": "=",
			"paramValue": "/http/test/payment"
		}]
	}, {
		"ruleHandler": "{\"loadBalance\":\"random\"}",
		"conditionDataList": [{
			"paramType": "uri",
			"operator": "=",
			"paramValue": "/http/order/save"
		}]
	}]
}

```

### 删除选择器

根据选择器id与插件名称删除选择器

##### 请求方式

GET

##### 请求路径

/plugin/selector/delete?pluginName=xxxx&&id=xxxx

##### Request参数

|名称|类型|是否必需|默认值|描述|
|---|---|---|---|---|
|**pluginName**|String|true| |插件名称 |
|**id**|String|true| |选择器id |

### 获取插件下的所有选择器

根据插件名称获取所有选择器

##### 请求方式

GET

##### 请求路径

/plugin/selector/findList?pluginName=xxxx

##### Request参数

|名称|类型|是否必需|默认值|描述|
|---|---|---|---|---|
|**pluginName**|String|true| |插件名称 |

### 新增或更新规则

新增或者更新规则数据

##### 请求方式

POST

##### 请求路径

/plugin/rule/saveOrUpdate

##### 请求参数

|名称|类型|是否必需|默认值|描述|
|---|---|---|---|---|
|**RuleData**|[RuleData](#RuleData)|True| |规则对象（Body里面传Json对象）|

##### <div id="RuleData">RuleData</div>

|名称|类型|是否必需|默认值|描述|
|---|---|---|---|---|
|**id**|String|False| |规则ID|
|**pluginName**|String|True| |插件名称|
|**name**|String|False| |规则名称（不填则默认生成 plugin:rule+随机数字）|
|**selectorId**|String|True| |选择器ID（不填则默认生成 plugin:rule+随机数字）|
|**matchMode**|Integer|False| |匹配模式（0：and;1：or），不填默认生成 And模式|
|**sort**|Integer|False| |排序 ，不填默认生成 10|
|**enabled**|Boolean|False| |是否开启，不填默认生成 true|
|**logged**|Boolean|False| |是否打印日志，不填默认生成为false|
|**handle**|String|False| |规则处理（Json对象，根据每个插件不同，传的对象不同）|
|**conditionList**|[ConditionData](#ConditionData)|False| |条件集合（Json List对象）|

##### <div id="conditionList">conditionList</div>

|名称|类型|是否必需|默认值|描述|
|---|---|---|---|---|
|**paramType**|String|True| |参数类型（post，uri，query，host，header，cookie，req_method，domain）|
|**operator**|String|True| |匹配方式（match，=，regex，>，<，contains，SpEL，Groovy，TimeBefore，TimeAfter）|
|**paramName**|String|False| |参数名称（uri 参数类型时候，可以不传）|
|**paramValue**|Integer|False| |匹配值|

##### 请求示例

POST body

```
{
	"pluginName": "divide",
	"selectorId": 123456,
	"handle": "{\"loadBalance\":\"random\"}",
	"conditionDataList": [{
		"paramType": "uri",
		"operator": "=",
		"paramValue": "/test"
	}]
}

```

##### 返回数据

规则ID

```
xxxxx
```

### 删除规则

根据选择器id与规则id删除规则

##### 请求方式

GET

##### 请求路径

/plugin/rule/delete?selectorId=xxxx&&id=xxxx

##### Request参数

|名称|类型|是否必需|默认值|描述|
|---|---|---|---|---|
|**selectorId**|String|true| |选择器ID |
|**id**|String|true| |规则ID |

### 获取规则集合

根据选择器ID获取所有规则

##### 请求方式

GET

##### 请求路径

/plugin/rule/findList?selectorId=xxxx

##### Request参数

|名称|类型|是否必需|默认值|描述|
|---|---|---|---|---|
|**selectorId**|String|true| |选择器ID |

## 元数据

### 新增或者更新元数据

新增或者更新元数据

##### 请求方式

POST

##### 请求路径

/meta/saveOrUpdate

##### 请求参数

|名称|类型|是否必需|默认值|描述|
|---|---|---|---|---|
|**MetaData**|[MetaData](#MetaData)|True| |元数据对象（Body里面传Json对象）|

##### <div id="MetaData">MetaData</div>

|名称|类型|是否必需|默认值|描述|
|---|---|---|---|---|
|**id**|String|False| |元数据ID|
|**appName**|String|True| |应用名称|
|**contextPath**|String|True| |contextPath|
|**path**|String|True| |请求路径|
|**rpcType**|String|True| |rpc类型（dubbo，sofa，tars，springCloud，motan，grpc）|
|**serviceName**|String|True| |接口名称|
|**methodName**|String|True| |方法名称|
|**parameterTypes**|String|True| |参数类型|
|**rpcExt**|String|False| |rpc扩展参数（json对象）|
|**enabled**|Boolean|False| |是否开启|

### 删除元数据

删除元数据

##### 请求方式

GET

##### 请求路径

/meta/delete?rpcType=xxxx&&path=xxx

##### Request参数

|名称|类型|是否必需|默认值|描述|
|---|---|---|---|---|
|**rpcType**|String|true| |rpc类型（dubbo，sofa，tars，springCloud，motan，grpc） |
|**path**|String|true| |路径 |

## 签名数据

### 新增或者更新

新增或者更新签名数据

##### 请求方式

POST

##### 请求路径

/auth/saveOrUpdate

##### 请求参数

|名称|类型|是否必需|默认值|描述|
|---|---|---|---|---|
|**AppAuthData**|[AppAuthData](#AppAuthData)|True| |签名对象（Body里面传Json对象）|

##### <div id="AppAuthData">AppAuthData</div>

|名称|类型|是否必需|默认值|描述|
|---|---|---|---|---|
|**appKey**|String|True| |app key|
|**appSecret**|String|True| |app secret|
|**enabled**|Boolean|False| |是否开启|
|**open**|Boolean|False| |是否是开放平台|
|**paramDataList**|[AuthParamData](#AuthParamData)|false| |参数集合，open为true时候需要传（Json list对象）|
|**AuthPathData**|[AuthPathData](#AuthPathData)|false| |路径集合，open为true时候需要传（Json list对象）|

##### <div id="AuthParamData">AuthParamData</div>

|名称|类型|是否必需|默认值|描述|
|---|---|---|---|---|
|**appName**|String|True| |应用名称|
|**appParam**|String|True| |应用参数|

##### <div id="AuthPathData">AuthPathData</div>

|名称|类型|是否必需|默认值|描述|
|---|---|---|---|---|
|**appName**|String|True| |应用名称|
|**path**|String|True| |路径|
|**enabled**|Boolean|False| |是否开启|

### 删除

删除签名数据

##### 请求方式

GET

##### 请求路径

/auth/delete?appKey=xxxx

##### Request参数

|名称|类型|是否必需|默认值|描述|
|---|---|---|---|---|
|**appKey**|String|true| |app key |
