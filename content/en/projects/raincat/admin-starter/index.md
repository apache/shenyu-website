| title                   | kewords       | description             |
| ----------------------- | ------------- | ----------------------- |
| Bootstrap raincat-admin | raincat-admin | Bootstrap raincat-admin |



# raincat-admin bootstrap

 Prerequisite of bootstrap: The distributed transaction has been deployed and in running. You can choose RPC framework whatever you want.

* Dubbo user
* Springcloud user

## Bootstrap method 

### Package and deploy by yourself 

* First of all, the JDK version must be 1.8+ and Git and Maven are installed locally, then execute the following commands.

```java
git clone https://github.com/yu199195/Raincat.git
maven clean install
```

* Secondly, use your dev tool to open the project, such as IDEA, Eclipse. Please modify your `application.yml` as follows.

  * userName，password are the login user name and password.

  * Redis configuration is consistent with your `txManager`.
  * `spring.profiles.active` is the way you store the log, please modify the corresponding `yml ` file. For example, the following code snippet shows how to configure `application-db.yml` when use DB as storage. 

```yml
server:
   port: 8888
   context-path: /admin
spring:
   application:
      name: raincat-admin
   profiles:
     active: db
tx:
  admin :
    userName : admin
    password : admin
  redis:
    hostName: localhost
    port : 6379
    #password:
    cluster : false
      # nodes: 127.0.0.1:70001;127.0.1:7002
      # redirects: 20
```

* Thirdly, `application.list ` is your `applicationName` of your micro service, and separated with commas. 
  * `serializer` : The way to serialize the transaction log.
  * `retry.max`: The maximum retry time.

```yml
recover:
   application:
      list : alipay-service,wechat-service,pay-service
   serializer :
      support: kryo
   retry :
      max: 10
   db:
      driver :  com.mysql.jdbc.Driver
      url: jdbc:mysql://localhost:3306/tx?useUnicode=true&amp;characterEncoding=utf8
      username: root
      password: 123456
```

* Finally, please modify your `index.html`, and run the `main` method in `AdminApplication`,  then visit http://ip:port/admin in the browser, enter the user name and password to log in. 

```html
<!--Modify your ip port in href-->
<a id="serverIpAddress" style="display: none" href="http://192.168.1.132:8888/admin">
```

### Obtain the admin jar package from the maven central warehouse. 

```java
<dependency>
     <groupId>org.dromara</groupId>
     <artifactId>raincat-admin</artifactId>
     <version>2.0.0-RELEASE</version>
 </dependency>
```

- Create a config folder and `application.yml`, etc., then modify the yml file and start up the application. 

