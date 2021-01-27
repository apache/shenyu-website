### Myth-admin startup tutorial
Startup premise: the distributed transaction project has been deployed and running, and users use it according to their own RPC framework.

* First, the JDK  must be 1.8+, and Git and Maven are installed locally. Execute the following command.

```
git clone https://github.com/yu199195/myth.git

maven clean install
```

* Open the project with your development tool，for example Idea , Eclipse.

### Step One:
* Edit application.properties in myth-admin project.

```java
server.port=8888
server.context-path=/myth-admin
server.address=0.0.0.0
spring.application.name=myth-admin


#Activation method: refers to the method used to store the transaction log, which is the same as the business module.
spring.profiles.active=db


# myth admin username
myth.admin.userName=admin

# myth admin password
myth.admin.password=admin


# The suffix of the transaction log storage path of each project must be specified here.
myth.repository.suffix.list=account-service,inventory-service,order-service


# Supported serialization methods, each item needs to be configured to be the same.
myth.serializer.support=kryo

myth.retry.max=10

#dbSuport
myth.db.driver=com.mysql.jdbc.Driver
myth.db.url=jdbc:mysql://192.168.1.68:3306/myth?useUnicode=true&amp;characterEncoding=utf8
myth.db.username=xiaoyu
myth.db.password=Wgj@555888

#redis
myth.redis.cluster=false
myth.redis.hostName=192.168.1.68
myth.redis.port=6379
myth.redis.password=
#myth.redis.clusterUrl=127.0.0.1:70001;127.0.1:7002

#mongo
myth.mongo.url=192.168.1.68:27017
myth.mongo.dbName=happylife
#myth.mongo.userName=xiaoyu
myth.mongo.password=123456

#zookeeper
myth.zookeeper.host=192.168.1.116:2181
myth.zookeeper.sessionTimeOut=200000
```


## Configuration explanation

* myth.repository.suffix.list: it is necessary to configure the resource suffix of each system module participating in the distributed transaction of myth, and multiple modules are separated by ",",which must be configured here.

* myth.serializer.support: it refers to the serialization mode of configuration transaction compensation information in Tcc distributed transaction system.

* spring.profiles.active: The type of admin project activation supports db, file, mongo and zookeeper.
  This refers to the storage mode of transaction compensation information in the distributed transaction system participating in Myth. If you use db for storage, it is configured as db, and information such as db is configured at the same time. Other ways are the same. Note that each module should use the same serialization method and storage type.

* myth.admin: Here is the user and password of the admin system, and the user can make custom changes.


### Step Two:  modify index.html under the static folder of this project.

```html
<!--replace your ip and port in href property-->
<a id="serverIpAddress" style="display: none" href="http://localhost:8888/admin">
```


### Step Three:  run  the main method in  MythAdminApplication .


### Step Four: visit http://ip:port/myth-admin/index.html in the browser, enter the username and password to log in.







### If you have any questions, please join QQ group: 162614487 for discussion.