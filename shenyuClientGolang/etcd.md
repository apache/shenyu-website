---
description: Etcd
title: Etcd Example
---
## The Etcd type Register

**1.Fist make sure your Etcd env is correct,the set this necessary param.**

```go
    //Create ShenYuEtcdClient  start
    ecp := &etcd_client.EtcdClientParam{
    EtcdServers: []string{"http://127.0.0.1:2379"}, // require user provider
    UserName : "" // optional param etcd userName
    Password : "" // optional param etcd pwd
    TTL:    50, // optional param key live
    }
    
    sdkClient := shenyu_sdk_client.GetFactoryClient(constants.ETCD_CLIENT)
    client, createResult, err := sdkClient.NewClient(ecp)
    if !createResult && err != nil {
    logger.Fatal("Create ShenYuEtcdClient error : %v", err)
    }
    
    etcd := client.(*etcd_client.ShenYuEtcdClient)
    defer etcd.Close()  
    //Create ShenYuEtcdClient end
```

**2. Prepare your service metaData to register**

```go
//metaData is necessary param, this will be register to shenyu gateway to use
    metaData1 := &model.MetaDataRegister{
        AppName: "testMetaDataRegister1", //require user provide
        Path:    "your/path1",            //require user provide
        Enabled: true,                    //require user provide
        Host:    "127.0.0.1",             //require user provide
        Port:    "8080",                  //require user provide
    }

    metaData2 := &model.MetaDataRegister{
        AppName: "testMetaDataRegister2", //require user provide
        Path:    "your/path2",            //require user provide
        Enabled: true,                    //require user provide
        Host:    "127.0.0.1",             //require user provide
        Port:    "8181",                  //require user provide
    }
```

**3.use client to invoke RegisterServiceInstance**

```go
   //register multiple metaData
    registerResult1, err := etcd.RegisterServiceInstance(metaData1)
        if !registerResult1 && err != nil {
        logger.Fatal("Register etcd Instance error : %v", err)
    }

    registerResult2, err := etcd.RegisterServiceInstance(metaData2)
        if !registerResult2 && err != nil {
        logger.Fatal("Register etcd Instance error : %v", err)
    }
    //do your logic
```

**4.use client to invoke DeregisterServiceInstance**

```go
    //your can chose to invoke,not require
    deRegisterResult1, err := etcd.DeregisterServiceInstance(metaData1)
        if err != nil {
        panic(err)
        }

    deRegisterResult2, err := etcd.DeregisterServiceInstance(metaData2)
        if err != nil {
        panic(err)
        }
```

**5.use client to GetServiceInstanceInfo**

```go
    //GetServiceInstanceInfo start
    instanceDetail, err := etcd.GetServiceInstanceInfo(metaData1)
        nodes1, ok := instanceDetail.([]*model.MetaDataRegister)
        if !ok {
        logger.Fatal("get etcd client metaData error %v:", err)
     }
    
    //range nodes
    for index, node := range nodes1 {
        nodeJson, err := json.Marshal(node)
        if err == nil {
        logger.Info("GetNodesInfo ,success Index", index, string(nodeJson))
        }
    }
    
    instanceDetail2, err := etcd.GetServiceInstanceInfo(metaData2)
        nodes2, ok := instanceDetail2.([]*model.MetaDataRegister)
        if !ok {
            logger.Fatal("get etcd client metaData error %v:", err)
    }
    //GetServiceInstanceInfo end

```

## Entire Success log

```go
2022-08-16 10:18:55 [INFO] [github.com/shenyu-client-golang/clients/etcd_client/etcd_client.go:66] Create customer etcd client success!
2022-08-16 10:18:55 [INFO] [github.com/shenyu-client-golang/clients/etcd_client/etcd_client.go:142] RegisterServiceInstance,result:true
2022-08-16 10:18:55 [INFO] [github.com/shenyu-client-golang/clients/etcd_client/etcd_client.go:142] RegisterServiceInstance,result:true
2022-08-16 10:18:56 [INFO] [github.com/shenyu-client-golang/example/etcd_client/etcd_client.go:71] GetNodesInfo ,success Index 0 {"appName":"testMetaDataRegister1","path":"your/path1","contextPath":"","ruleName":"","rpcType":"","enabled":true,"host":"127.0.0.1","port":"8080","pluginNames":null,"registerMetaData":false,"timeMillis":0}
2022-08-16 10:18:56 [INFO] [github.com/shenyu-client-golang/example/etcd_client/etcd_client.go:85] GetNodesInfo ,success Index 0 {"appName":"testMetaDataRegister2","path":"your/path2","contextPath":"","ruleName":"","rpcType":"","enabled":true,"host":"127.0.0.1","port":"8181","pluginNames":null,"registerMetaData":false,"timeMillis":0}
2022-08-16 10:18:56 [INFO] [github.com/shenyu-client-golang/example/etcd_client/etcd_client.go:89] > DeregisterServiceInstance start
2022-08-16 10:19:33 [INFO] [github.com/shenyu-client-golang/example/etcd_client/etcd_client.go:101] DeregisterServiceInstance success !
```
