---
description: Consul
title: Consul Example
---
## The Consul type Register

**1.Fist make sure your Consul env is correct,the set this necessary param.**

```go
    //Create ShenYuConsulClient  start
    ccp := &consul_client.ConsulClientParam{
        Host:  "127.0.0.1",  //require user provide
        Port:  8500,         //require user provide
        Token: "",
        }
    
    sdkClient := shenyu_sdk_client.GetFactoryClient(constants.CONSUL_CLIENT)
    client, createResult, err := sdkClient.NewClient(ccp)
    
    if !createResult && err != nil {
    logger.Fatal("Create ShenYuConsulClient error : %v", err)
    }
    
    scc := client.(*consul_client.ShenYuConsulClient)
    //Create ShenYuConsulClient end
```

**2. Prepare your service metaData to register**

```go
//metaData is necessary param, this will be register to shenyu gateway to use
    uuid1, _ := uuid.GenerateUUID()
    uuid2, _ := uuid.GenerateUUID()
    uuid3, _ := uuid.GenerateUUID()

    //RegisterServiceInstance start
    //init MetaDataRegister
    metaData1 := &model.MetaDataRegister{
        ServiceId: uuid1,
        AppName:   "testMetaDataRegister1", //require user provide
        Path:      "/your/path1",           //require user provide
        Enabled:   true,                    //require user provide
        Host:      "127.0.0.1",             //require user provide
        Port:      "8080",                  //require user provide
        RPCType:   "http",                  //require user provide
    }
    
    metaData2 := &model.MetaDataRegister{
        ServiceId: uuid2,
        AppName:   "testMetaDataRegister2", //require user provide
        Path:      "/your/path2",           //require user provide
        Enabled:   true,                    //require user provide
        Host:      "127.0.0.1",             //require user provide
        Port:      "8181",                  //require user provide
        RPCType:   "http",                  //require user provide
    }
    
    metaData3 := &model.MetaDataRegister{
        ServiceId: uuid3,
        AppName:   "testMetaDataRegister3", //require user provide
        Path:      "/your/path3",           //require user provide
        Enabled:   true,                    //require user provide
        Host:      "127.0.0.1",             //require user provide
        Port:      "8282",                  //require user provide
        RPCType:   "http",                  //require user provide
    }
```

**3.use client to invoke RegisterServiceInstance**

```go
   //register multiple metaData
    registerResult1, err := scc.RegisterServiceInstance(metaData1)
    if !registerResult1 && err != nil {
    logger.Fatal("Register consul Instance error : %v", err)
    }
    
    registerResult2, err := scc.RegisterServiceInstance(metaData2)
    if !registerResult2 && err != nil {
    logger.Fatal("Register consul Instance error : %v", err)
    }
    
    registerResult3, err := scc.RegisterServiceInstance(metaData3)
    if !registerResult3 && err != nil {
    logger.Fatal("Register consul Instance error : %v", err)
    }
//RegisterServiceInstance end
    //do your logic
```

**4.use client to invoke DeregisterServiceInstance**

```go
    //your can chose to invoke,not require
    //DeregisterServiceInstance start
    logger.Info("> DeregisterServiceInstance start")
    deRegisterResult1, err := scc.DeregisterServiceInstance(metaData1)
    if err != nil {
    panic(err)
    }
    
    deRegisterResult2, err := scc.DeregisterServiceInstance(metaData2)
    if err != nil {
    panic(err)
    }
    
    deRegisterResult3, err := scc.DeregisterServiceInstance(metaData3)
    if err != nil {
    panic(err)
    }
    
    if deRegisterResult1 && deRegisterResult2 && deRegisterResult3 {
    logger.Info("DeregisterServiceInstance success !")
    }
    //DeregisterServiceInstance end
```

**5.use client to GetServiceInstanceInfo**

```go
    //GetServiceInstanceInfo start
    instanceDetail, err := scc.GetServiceInstanceInfo(metaData1)
    nodes1, ok := instanceDetail.([]*model.MetaDataRegister)
        if !ok {
        logger.Fatal("get consul client metaData error %v:", err)
    }
    
    //range nodes
    for index, node := range nodes1 {
    nodeJson, err := json.Marshal(node)
    if err == nil {
        logger.Info("GetNodesInfo ,success Index", index, string(nodeJson))
        }
    }
    
    instanceDetail2, err := scc.GetServiceInstanceInfo(metaData2)
    nodes2, ok := instanceDetail2.([]*model.MetaDataRegister)
        if !ok {
        logger.Fatal("get consul client metaData error %v:", err)
    }
    
    //range nodes2
    for index, node := range nodes2 {
    nodeJson, err := json.Marshal(node)
    if err == nil {
        logger.Info("GetNodesInfo ,success Index", index, string(nodeJson))
        }
    }

    //range nodes3
    instanceDetail3, err := scc.GetServiceInstanceInfo(metaData3)
    nodes3, ok := instanceDetail3.([]*model.MetaDataRegister)
    if !ok {
        logger.Fatal("get consul client metaData error %v:", err)
        }
    
    for index, node := range nodes3 {
    nodeJson, err := json.Marshal(node)
    if err == nil {
        logger.Info("GetNodesInfo ,success Index", index, string(nodeJson))
        }
    }
//GetServiceInstanceInfo end
```

## Entire Success log

```go
2022-07-26 18:05:43 [INFO] [github.com/apache/shenyu-client-golang/clients/consul_client/consul_client.go:77] Create default consul client success!
2022-07-26 18:05:43 [INFO] [github.com/apache/shenyu-client-golang/clients/consul_client/consul_client.go:160] RegisterServiceInstance,result:true
2022-07-26 18:05:43 [INFO] [github.com/apache/shenyu-client-golang/clients/consul_client/consul_client.go:160] RegisterServiceInstance,result:true
2022-07-26 18:05:43 [INFO] [github.com/apache/shenyu-client-golang/clients/consul_client/consul_client.go:160] RegisterServiceInstance,result:true
2022-07-26 18:05:44 [INFO] [github.com/apache/shenyu-client-golang/clients/consul_client/consul_client.go:121] GetServiceInstanceInfo,instance:&{AppName:testMetaDataRegister1 Path: ContextPath: RuleName: RPCType: Enabled:false Host:172.22.0.5 Port:8080 PluginNames:[] RegisterMetaData:false TimeMillis:0 ServiceId:testMetaDataRegister1}
2022-07-26 18:05:44 [INFO] [github.com/apache/shenyu-client-golang/example/consul_client/consul_client.go:115] GetNodesInfo ,success Index 0 {"appName":"testMetaDataRegister1","path":"","contextPath":"","ruleName":"","rpcType":"","enabled":false,"host":"172.22.0.5","port":"8080","pluginNames":null,"registerMetaData":false,"timeMillis":0,"serviceId":"testMetaDataRegister1"}
2022-07-26 18:05:44 [INFO] [github.com/apache/shenyu-client-golang/clients/consul_client/consul_client.go:121] GetServiceInstanceInfo,instance:&{AppName:testMetaDataRegister2 Path: ContextPath: RuleName: RPCType: Enabled:false Host:172.22.0.5 Port:8181 PluginNames:[] RegisterMetaData:false TimeMillis:0 ServiceId:testMetaDataRegister2}
2022-07-26 18:05:44 [INFO] [github.com/apache/shenyu-client-golang/example/consul_client/consul_client.go:129] GetNodesInfo ,success Index 0 {"appName":"testMetaDataRegister2","path":"","contextPath":"","ruleName":"","rpcType":"","enabled":false,"host":"172.22.0.5","port":"8181","pluginNames":null,"registerMetaData":false,"timeMillis":0,"serviceId":"testMetaDataRegister2"}
2022-07-26 18:05:44 [INFO] [github.com/apache/shenyu-client-golang/clients/consul_client/consul_client.go:121] GetServiceInstanceInfo,instance:&{AppName:testMetaDataRegister3 Path: ContextPath: RuleName: RPCType: Enabled:false Host:172.22.0.5 Port:8282 PluginNames:[] RegisterMetaData:false TimeMillis:0 ServiceId:testMetaDataRegister3}
2022-07-26 18:05:44 [INFO] [github.com/apache/shenyu-client-golang/example/consul_client/consul_client.go:143] GetNodesInfo ,success Index 0 {"appName":"testMetaDataRegister3","path":"","contextPath":"","ruleName":"","rpcType":"","enabled":false,"host":"172.22.0.5","port":"8282","pluginNames":null,"registerMetaData":false,"timeMillis":0,"serviceId":"testMetaDataRegister3"}
2022-07-26 18:05:44 [INFO] [github.com/apache/shenyu-client-golang/example/consul_client/consul_client.go:150] > DeregisterServiceInstance start
2022-07-26 18:05:44 [INFO] [github.com/apache/shenyu-client-golang/clients/consul_client/consul_client.go:100] DeregisterServiceInstance,result:true
2022-07-26 18:05:44 [INFO] [github.com/apache/shenyu-client-golang/clients/consul_client/consul_client.go:100] DeregisterServiceInstance,result:true
2022-07-26 18:05:44 [INFO] [github.com/apache/shenyu-client-golang/clients/consul_client/consul_client.go:100] DeregisterServiceInstance,result:true
2022-07-26 18:05:44 [INFO] [github.com/apache/shenyu-client-golang/example/consul_client/consul_client.go:167] DeregisterServiceInstance success !
```

