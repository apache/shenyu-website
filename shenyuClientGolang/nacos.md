---
description: Nacos
title: Nacos Example
---
## The Nacos type Register

**1.Fist make sure your nacos env is correct,the set this necessary param.**

```go
//set nacos env configuration
    ncp := &nacos_client.NacosClientParam{
        IpAddr:      "console.nacos.io",
        Port:        80,
        NamespaceId: "e525eafa-f7d7-4029-83d9-008937f9d468",
}
```

**2. Prepare your service metaData to register**

```go
//metaData is necessary param, this will be register to shenyu gateway to use
    metaData := &model.URIRegister{
        Protocol:    "testMetaDataRegister", //require user provide
        AppName:     "testURLRegister",      //require user provide
        ContextPath: "contextPath",          //require user provide
        RPCType:     constants.RPCTYPE_HTTP, //require user provide
        Host:        "127.0.0.1",            //require user provide
        Port:        "8080",                 //require user provide
}
    metaDataStringJson, _ := json.Marshal(metaData)
```

**3. Prepare your service Instance message(include metaData)**

```go
//init NacosRegisterInstance
    nacosRegisterInstance := vo.RegisterInstanceParam{
        Ip:          "10.0.0.10", //require user provide
        Port:        8848,        //require user provide
        ServiceName: "demo.go",   //require user provide
        Weight:      10,          //require user provide
        Enable:      true,        //require user provide
        Healthy:     true,        //require user provide
        Ephemeral:   true,        //require user provide
        Metadata:    map[string]string{"contextPath": "contextPath", "uriMetadata": string(metaDataStringJson)},
}
```

**4. Get shenyu nacos client**

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


**5.Use client to invoke RegisterServiceInstance**

```go
   instanceInfo, err := nc.GetServiceInstanceInfo(queryData)
    if instanceInfo == nil {
        logger.Fatal("Register nacos Instance error : %v", err)
    }
        //do your logic
```

**6.Use client to invoke DeregisterServiceInstance**

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

**7.Use client to invoke GetServiceInstanceInfo**

```go
        instanceInfo, result, err := nc.GetServiceInstanceInfo(queryData)
            if result != false && err != nil {
            logger.Fatal("Register nacos Instance error : %v", err)
        }
        //do your logic
```

## Entire Success log

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
