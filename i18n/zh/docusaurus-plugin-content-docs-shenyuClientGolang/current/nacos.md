---
title: "Nacos示例"
---  

## 以Nacos方式注册到ShenYu网关

**1.首先确保你的nacos环境是正确，然后设置这些nacos必要的参数 .**

```go
//设置nacos环境配置
    ncp := &nacos_client.NacosClientParam{
        IpAddr:      "console.nacos.io",
        Port:        80,
        NamespaceId: "e525eafa-f7d7-4029-83d9-008937f9d468",
}
```

**2. 准备你要注册服务的元数据信息**

```go
//元数据是必要的参数，这将注册到shenyu网关使用
metaData := &model.URIRegister{
        Protocol:    "testMetaDataRegister", //需要用户提供
        AppName:     "testURLRegister",      //需要用户提供
        ContextPath: "contextPath",          //需要用户提供
        RPCType:     constants.RPCTYPE_HTTP, //需要用户提供
        Host:        "127.0.0.1",            //需要用户提供
        Port:        "8080",                 //需要用户提供
}
    metaDataStringJson, _ := json.Marshal(metaData)
```

**3.准备你要注册服务的实例消息(包括元数据)**

```go
//初始化Nacos注册实例信息
    nacosRegisterInstance := vo.RegisterInstanceParam{
        Ip:          "10.0.0.10", //需要用户提供
        Port:        8848,        //需要用户提供
        ServiceName: "demo.go",   //需要用户提供
        Weight:      10,          //需要用户提供
        Enable:      true,        //需要用户提供
        Healthy:     true,        //需要用户提供
        Ephemeral:   true,        //需要用户提供
        Metadata:    map[string]string{"contextPath": "contextPath", "uriMetadata": string(metaDataStringJson)},
}
```

**4. 获取ShenYu nacos的客户端**

```go
    sdkClient := shenyu_sdk_client.GetFactoryClient(constants.NACOS_CLIENT)
    result, createResult, err := sdkClient.NewClient(ncp)
        if !createResult && err != nil {
        logger.Fatal("Create nacos client error : %v", err)
    }

	nc := &nacos_client.ShenYuNacosClient{
		NacosClient: result.(*naming_client.NamingClient),
	}
```


**5.使用客户端调用RegisterNacosInstance方法**

```go
    registerResult, err := nc.RegisterServiceInstance(nacosRegisterInstance)
        if !registerResult && err != nil {
    logger.Fatal("Register nacos Instance error : %v", err)
}
        //do your logic
```

**6.使用客户端调用DeregisterServiceInstance方法**

```go
//DeregisterServiceInstance start
    deregisterInstanceParam := vo.DeregisterInstanceParam{
    Ip:          "10.0.0.10",
    Port:        8848,
    ServiceName: "demo.go",
    Ephemeral:   true,
    //Cluster:     "cluster-a", // default value is DEFAULT
    GroupName: "group-a", // default value is DEFAULT_GROUP
}

    serviceInstance, err := nc.DeregisterServiceInstance(deregisterInstanceParam)
        if !serviceInstance && err != nil {
        logger.Info("DeregisterServiceInstance result : %v", serviceInstance)
}
        //do your logic
```

**7.使用客户端调用GetServiceInstanceInfo方法**

```go
         instanceInfo, err := nc.GetServiceInstanceInfo(queryData)
            if instanceInfo == nil {
            	logger.Fatal("Register nacos Instance error : %v", err)
            }
        //do your logic
```

**完整的成功日志**

```go

2022-07-26T18:07:32.494+0800    INFO    nacos_client/nacos_client.go:79 logDir:</tmp/nacos/log>   cacheDir:</tmp/nacos/cache>
2022-07-26T18:07:32.495+0800    INFO    naming_client/push_receiver.go:80       udp server start, port: 55422
2022-07-26T18:07:32.495+0800    INFO    naming_client/naming_proxy.go:54        register instance namespaceId:<e525eafa-f7d7-4029-83d9-008937f9d468>,serviceName:<group-a@@demo.go> with instance:<{"valid":false,"marked":false,"instanceId":"","port":8848,"ip":"10.0.0.10","weight":10,"metadata":{"contextPath":"contextPath","uriMetadata":"{\"protocol\":\"testMetaDataRegister\",\"appName\":\"testURLRegister\",\"contextPath\":\"contextPath\",\"rpcType\":\"http\",\"host\":\"127.0.0.1\",\"port\":\"8080\"}"},"clusterName":"cluster-a","serviceName":"","enabled":true,"healthy":true,"ephemeral":true}>
2022-07-26T18:07:33.255+0800    INFO    naming_client/beat_reactor.go:68        adding beat: <{"ip":"10.0.0.10","port":8848,"weight":10,"serviceName":"group-a@@demo.go","cluster":"cluster-a","metadata":{"contextPath":"contextPath","uriMetadata":"{\"protocol\":\"testMetaDataRegister\",\"appName\":\"testURLRegister\",\"contextPath\":\"contextPath\",\"rpcType\":\"http\",\"host\":\"127.0.0.1\",\"port\":\"8080\"}"},"scheduled":false}> to beat map
2022-07-26 18:07:33 [INFO] [github.com/apache/shenyu-client-golang/clients/nacos_client/nacos_client.go:107] RegisterServiceInstance,result:true

,param:{Ip:10.0.0.10 Port:8848 Weight:10 Enable:true Healthy:true Metadata:map[contextPath:contextPath uriMetadata:{"protocol":"testMetaDataRegister","appName":"testURLRegister","contextPath":"contextPath","rpcType":"http","host":"127.0.0.1","port":"8080"}] ClusterName:cluster-a ServiceName:demo.go GroupName:group-a Ephemeral:true}


2022-07-26T18:07:33.256+0800    INFO    naming_client/naming_proxy.go:103       namespaceId:<e525eafa-f7d7-4029-83d9-008937f9d468> sending beat to server:<{"ip":"10.0.0.10","port":8848,"weight":10,"serviceName":"group-a@@demo.go","cluster":"cluster-a","metadata":{"contextPath":"contextPath","uriMetadata":"{\"protocol\":\"testMetaDataRegister\",\"appName\":\"testURLRegister\",\"contextPath\":\"contextPath\",\"rpcType\":\"http\",\"host\":\"127.0.0.1\",\"port\":\"8080\"}"},"scheduled":false}>
2022-07-26T18:07:34.256+0800    INFO    util/common.go:94       Local IP:10.167.40.91
2022-07-26T18:07:34.507+0800    INFO    naming_client/host_reactor.go:95        service not found in cache group-a@@demo.go@@cluster-a
2022-07-26 18:07:34 [INFO] [github.com/apache/shenyu-client-golang/clients/nacos_client/nacos_client.go:139] GetServiceInstanceInfo,result:[{Valid:false Marked:false InstanceId:10.0.0.10#8848#cluster-a#group-a@@demo.go Port:8848 Ip:10.0.0.10 Weight:10 Metadata:map[contextPath:contextPath uriMetadata:{"protocol":"testMetaDataRegister","appName":"testURLRegister","contextPath":"contextPath","rpcType":"http","host":"127.0.0.1","port":"8080"}] ClusterName:cluster-a ServiceName:group-a@@demo.go Enable:true Healthy:true Ephemeral:true}]

,param:{Clusters:[cluster-a] ServiceName:demo.go GroupName:group-a HealthyOnly:true}


2022-07-26 18:07:34 [INFO] [github.com/apache/shenyu-client-golang/example/nacos_client/main.go:102] [{false false 10.0.0.10#8848#cluster-a#group-a@@demo.go 8848 10.0.0.10 10 map[contextPath:contextPath uriMetadata:{"protocol":"testMetaDataRegister","appName":"testURLRegister","contextPath":"contextPath","rpcType":"http","host":"127.0.0.1","port":"8080"}] cluster-a group-a@@demo.go true true true}]
2022-07-26T18:07:35.509+0800    INFO    naming_client/beat_reactor.go:83        remove beat: group-a@@demo.go@10.0.0.10:8848 from beat map
2022-07-26T18:07:35.509+0800    INFO    naming_client/naming_proxy.go:73        deregister instance namespaceId:<e525eafa-f7d7-4029-83d9-008937f9d468>,serviceName:<group-a@@demo.go> with instance:<10.0.0.10:8848@cluster-a>
2022-07-26 18:07:35 [INFO] [github.com/apache/shenyu-client-golang/clients/nacos_client/nacos_client.go:123] DeregisterServiceInstance,result:true

,param:{Ip:10.0.0.10 Port:8848 Cluster:cluster-a ServiceName:demo.go GroupName:group-a Ephemeral:true}

```
