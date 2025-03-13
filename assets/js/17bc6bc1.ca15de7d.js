"use strict";(self.webpackChunkshenyu_website=self.webpackChunkshenyu_website||[]).push([[50982],{12497:(e,n,a)=>{a.r(n),a.d(n,{contentTitle:()=>l,default:()=>m,frontMatter:()=>s,metadata:()=>r,toc:()=>i});var t=a(58168),o=(a(96540),a(15680));const s={sidebar_position:4,title:"K8s Deployment",keywords:["k8s"],description:"K8s Deployment"},l=void 0,r={unversionedId:"deployment/deployment-k8s",id:"version-2.4.2/deployment/deployment-k8s",isDocsHomePage:!1,title:"K8s Deployment",description:"K8s Deployment",source:"@site/versioned_docs/version-2.4.2/deployment/deployment-k8s.md",sourceDirName:"deployment",slug:"/deployment/deployment-k8s",permalink:"/docs/2.4.2/deployment/deployment-k8s",editUrl:"https://github.com/apache/shenyu-website/edit/main/versioned_docs/version-2.4.2/deployment/deployment-k8s.md",version:"2.4.2",sidebarPosition:4,frontMatter:{sidebar_position:4,title:"K8s Deployment",keywords:["k8s"],description:"K8s Deployment"},sidebar:"version-2.4.2/tutorialSidebar",previous:{title:"Docker Deployment",permalink:"/docs/2.4.2/deployment/deployment-docker"},next:{title:"Helm Deployment",permalink:"/docs/2.4.2/deployment/deployment-helm"}},i=[{value:"Example 1: Using h2 as a database",id:"example-1-using-h2-as-a-database",children:[{value:"1. Create Namespace and ConfigMap",id:"1-create-namespace-and-configmap",children:[]},{value:"2. Create shenyu-admin",id:"2-create-shenyu-admin",children:[]},{value:"3. Create shenyu-bootstrap",id:"3-create-shenyu-bootstrap",children:[]}]},{value:"Example 2: Use MySQL as the database",id:"example-2-use-mysql-as-the-database",children:[{value:"1. Create Namespace and ConfigMap",id:"1-create-namespace-and-configmap-1",children:[]},{value:"2. Create Endpoints to represent MySQL",id:"2-create-endpoints-to-represent-mysql",children:[]},{value:"3. Create shenyu-admin",id:"3-create-shenyu-admin",children:[]},{value:"4. Create shenyu-bootstrap",id:"4-create-shenyu-bootstrap",children:[]}]},{value:"Test Access",id:"test-access",children:[]}],p={toc:i},c="wrapper";function m(e){let{components:n,...a}=e;return(0,o.yg)(c,(0,t.A)({},p,a,{components:n,mdxType:"MDXLayout"}),(0,o.yg)("blockquote",null,(0,o.yg)("p",{parentName:"blockquote"},"Before you read this document, you need to complete some preparations before deploying Shenyu according to the ",(0,o.yg)("a",{parentName:"p",href:"./deployment-before.md"},"Deployment Prerequisites document"),".")),(0,o.yg)("p",null,"This article introduces the use of ",(0,o.yg)("inlineCode",{parentName:"p"},"K8s")," to deploy the ",(0,o.yg)("inlineCode",{parentName:"p"},"Apache ShenYu")," gateway."),(0,o.yg)("blockquote",null,(0,o.yg)("p",{parentName:"blockquote"},"Catalog"),(0,o.yg)("p",{parentName:"blockquote"},"Example 1: Using h2 as a database"),(0,o.yg)("ol",{parentName:"blockquote"},(0,o.yg)("li",{parentName:"ol"},"create Namespace and ConfigMap"),(0,o.yg)("li",{parentName:"ol"},"deploying shenyu-admin"),(0,o.yg)("li",{parentName:"ol"},"deploy shenyu-bootstrap")),(0,o.yg)("p",{parentName:"blockquote"},"Example 2: Use MySQL as the database"),(0,o.yg)("p",{parentName:"blockquote"},"Similar to the h2 process, there are two points to note"),(0,o.yg)("ol",{parentName:"blockquote"},(0,o.yg)("li",{parentName:"ol"},"you need to load ",(0,o.yg)("a",{parentName:"li",href:"https://repo1.maven.org/maven2/mysql/mysql-connector-java/8.0.18/mysql-connector-java-8.0.18.jar"},"mysql-connector.jar"),", the download command is executed when the container is started"),(0,o.yg)("li",{parentName:"ol"},"you need to specify an external MySQL database configuration to proxy the external MySQL database via Endpoints")),(0,o.yg)("p",{parentName:"blockquote"},"The process is as follows."),(0,o.yg)("ol",{parentName:"blockquote"},(0,o.yg)("li",{parentName:"ol"},"create Namespace and ConfigMap"),(0,o.yg)("li",{parentName:"ol"},"create Endpoints to proxy external MySQL"),(0,o.yg)("li",{parentName:"ol"},"deploy shenyu-admin"),(0,o.yg)("li",{parentName:"ol"},"deploy shenyu-bootstrap"))),(0,o.yg)("h2",{id:"example-1-using-h2-as-a-database"},"Example 1: Using h2 as a database"),(0,o.yg)("h3",{id:"1-create-namespace-and-configmap"},"1. Create Namespace and ConfigMap"),(0,o.yg)("ul",null,(0,o.yg)("li",{parentName:"ul"},"create shenyu-ns.yaml")),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-yaml"},'apiVersion: v1\nkind: Namespace\nmetadata:\n  name: shenyu\n  labels:\n    name: shenyu\n---\napiVersion: v1\nkind: ConfigMap\nmetadata:\n  name: shenyu-cm\n  namespace: shenyu\ndata:\n  shenyu-admin-application.yml: |\n    server:\n      port: 9095\n      address: 0.0.0.0\n    spring:\n      profiles:\n        active: h2\n      thymeleaf:\n        cache: true\n        encoding: utf-8\n        enabled: true\n        prefix: classpath:/static/\n        suffix: .html\n    mybatis:\n      config-location: classpath:/mybatis/mybatis-config.xml\n      mapper-locations: classpath:/mappers/*.xml\n    shenyu:\n      register:\n        registerType: http #http #zookeeper #etcd #nacos #consul\n        serverLists: #localhost:2181 #http://localhost:2379 #localhost:8848\n        props:\n          sessionTimeout: 5000\n          connectionTimeout: 2000\n          checked: true\n          zombieCheckTimes: 5\n          scheduledTime: 10\n          nacosNameSpace: ShenyuRegisterCenter\n      sync:\n        websocket:\n          enabled: true\n      aes:\n        secret:\n          key: 2095132720951327\n          iv: 6075877187097700\n      ldap:\n        enabled: false\n        url: ldap://xxxx:xxx\n        bind-dn: cn=xxx,dc=xxx,dc=xxx\n        password: xxxx\n        base-dn: ou=xxx,dc=xxx,dc=xxx\n        object-class: person\n        login-field: cn\n      jwt:\n        expired-seconds: 86400000\n      shiro:\n        white-list:\n          - /\n          - /favicon.*\n          - /static/**\n          - /index**\n          - /platform/login\n          - /websocket\n          - /error\n          - /actuator/health\n          - /swagger-ui.html\n          - /webjars/**\n          - /swagger-resources/**\n          - /v2/api-docs\n          - /csrf\n      swagger:\n        enable: true\n    logging:\n      level:\n        root: info\n        org.springframework.boot: info\n        org.apache.ibatis: info\n        org.apache.shenyu.bonuspoint: info\n        org.apache.shenyu.lottery: info\n        org.apache.shenyu: info\n  shenyu-admin-application-h2.yml: |\n    shenyu:\n      database:\n        dialect: h2\n        init_script: "sql-script/h2/schema.sql"\n        init_enable: true\n    spring:\n      datasource:\n        url: jdbc:h2:mem:~/shenyu;DB_CLOSE_DELAY=-1;MODE=MySQL;\n        username: sa\n        password: sa\n        driver-class-name: org.h2.Driver\n  shenyu-bootstrap-application.yml: |\n    server:\n      port: 9195\n      address: 0.0.0.0\n    spring:\n      main:\n        allow-bean-definition-overriding: true\n      application:\n        name: shenyu-bootstrap\n      cloud:\n        loadbalancer:\n          ribbon:\n            enabled: false\n        discovery:\n          enabled: false\n        nacos:\n          discovery:\n            server-addr: 127.0.0.1:8848 # Spring Cloud Alibaba Dubbo use this.\n            enabled: false\n    management:\n      health:\n        defaults:\n          enabled: false\n    shenyu:\n      netty:\n        tcp:\n          # set to false, user can custom the netty tcp server config.\n          webServerFactoryEnabled: true\n          selectCount: 1\n          workerCount: 4\n          serverSocketChannel:\n            soRcvBuf: 87380\n            soBackLog: 128\n            soReuseAddr: false\n            connectTimeoutMillis: 10000\n            writeBufferHighWaterMark: 65536\n            writeBufferLowWaterMark: 32768\n            writeSpinCount: 16\n            autoRead: true\n            allocType: "pooled"\n          socketChannel:\n            soKeepAlive: false\n            soReuseAddr: false\n            soLinger: -1\n            tcpNoDelay: true\n            soRcvBuf: 87380\n            soSndBuf: 16384\n            ipTos: 0\n            allowHalfClosure: false\n            connectTimeoutMillis: 10000\n            writeBufferHighWaterMark: 65536\n            writeBufferLowWaterMark: 32768\n            writeSpinCount: 16\n            autoRead: true\n            allocType: "pooled"\n      instance:\n        enabled: false\n        registerType: zookeeper #etcd #consul\n        serverLists: localhost:2181 #http://localhost:2379 #localhost:8848\n        props:\n      cross:\n        enabled: true\n        allowedHeaders:\n        allowedMethods: "*"\n        allowedOrigin: "*"\n        allowedExpose: "*"\n        maxAge: "18000"\n        allowCredentials: true\n      switchConfig:\n        local: true\n      file:\n        enabled: true\n        maxSize : 10\n      sync:\n        websocket:\n          urls: ws://shenyu-admin-svc.shenyu.svc.cluster.local:9095/websocket\n      exclude:\n        enabled: false\n        paths:\n          - /favicon.ico\n      fallback:\n        enabled: true\n      extPlugin:\n        path:\n        enabled: true\n        threads: 1\n        scheduleTime: 300\n        scheduleDelay: 30\n      scheduler:\n        enabled: false\n        type: fixed\n        threads: 16\n      upstreamCheck:\n        enabled: false\n        timeout: 3000\n        healthyThreshold: 1\n        unhealthyThreshold: 1\n        interval: 5000\n        printEnabled: true\n        printInterval: 60000\n    eureka:\n      client:\n        enabled: false\n        serviceUrl:\n          defaultZone: http://localhost:8761/eureka/\n      instance:\n        prefer-ip-address: true\n    logging:\n      level:\n        root: info\n        org.springframework.boot: info\n        org.apache.ibatis: info\n        org.apache.shenyu.bonuspoint: info\n        org.apache.shenyu.lottery: info\n        org.apache.shenyu: info\n')),(0,o.yg)("ul",null,(0,o.yg)("li",{parentName:"ul"},"execute ",(0,o.yg)("inlineCode",{parentName:"li"},"kubectl apply -f shenyu-ns.yaml"))),(0,o.yg)("h3",{id:"2-create-shenyu-admin"},"2. Create shenyu-admin"),(0,o.yg)("ul",null,(0,o.yg)("li",{parentName:"ul"},"create shenyu-admin.yaml")),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-yaml"},"# Example of using the nodeport type to expose ports\napiVersion: v1\nkind: Service\nmetadata:\n  namespace: shenyu\n  name: shenyu-admin-svc\nspec:\n  selector:\n    app: shenyu-admin\n  type: NodePort\n  ports:\n  - protocol: TCP\n    port: 9095\n    targetPort: 9095\n    nodePort: 31095\n---\n# shenyu-admin\napiVersion: apps/v1\nkind: Deployment\nmetadata:\n  namespace: shenyu\n  name: shenyu-admin\nspec:\n  selector:\n    matchLabels:\n      app: shenyu-admin\n  replicas: 1\n  template:\n    metadata:\n      labels:\n        app: shenyu-admin\n    spec:\n      volumes:\n      - name: shenyu-admin-application\n        configMap:\n          name: shenyu-cm\n          items:\n          - key: shenyu-admin-application.yml\n            path: shenyu-admin-application.yml\n      - name: shenyu-admin-application-h2\n        configMap:\n          name: shenyu-cm\n          items:\n          - key: shenyu-admin-application-h2.yml\n            path: shenyu-admin-application-h2.yml\n      containers:\n      - name: shenyu-admin\n        image: apache/shenyu-admin:2.4.2\n        imagePullPolicy: Always\n        ports:\n        - containerPort: 9095\n        env:\n        - name: 'TZ'\n          value: 'Asia/Beijing'\n        volumeMounts:\n        - name: shenyu-admin-application\n          mountPath: /opt/shenyu-admin/conf/application.yml\n          subPath: shenyu-admin-application.yml\n        - name: shenyu-admin-application-h2\n          mountPath: /opt/shenyu-admin/conf/application-h2.yml\n          subPath: shenyu-admin-application-h2.yml\n")),(0,o.yg)("ul",null,(0,o.yg)("li",{parentName:"ul"},"execute",(0,o.yg)("inlineCode",{parentName:"li"},"kubectl apply -f shenyu-admin.yaml"))),(0,o.yg)("h3",{id:"3-create-shenyu-bootstrap"},"3. Create shenyu-bootstrap"),(0,o.yg)("ul",null,(0,o.yg)("li",{parentName:"ul"},"create shenyu-bootstrap.yaml")),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-yaml"},"# Example of using the nodeport type to expose ports\napiVersion: v1\nkind: Service\nmetadata:\n  namespace: shenyu\n  name: shenyu-bootstrap-svc\nspec:\n  selector:\n    app: shenyu-bootstrap\n  type: NodePort\n  ports:\n  - protocol: TCP\n    port: 9195\n    targetPort: 9195\n    nodePort: 31195\n---\n# shenyu-bootstrap\napiVersion: apps/v1\nkind: Deployment\nmetadata:\n  namespace: shenyu\n  name: shenyu-bootstrap\nspec:\n  selector:\n    matchLabels:\n      app: shenyu-bootstrap\n  replicas: 1\n  template:\n    metadata:\n      labels:\n        app: shenyu-bootstrap\n    spec:\n      volumes:\n      - name: shenyu-bootstrap-application\n        configMap:\n          name: shenyu-cm\n          items:\n          - key: shenyu-bootstrap-application.yml\n            path: shenyu-bootstrap-application.yml\n      containers:\n      - name: shenyu-bootstrap\n        image: apache/shenyu-bootstrap:2.4.2\n        ports:\n        - containerPort: 9195\n        env:\n        - name: TZ\n          value: Asia/Beijing\n        volumeMounts:\n        - name: shenyu-bootstrap-application\n          mountPath: /opt/shenyu-bootstrap/conf/application.yml\n          subPath: shenyu-bootstrap-application.yml\n")),(0,o.yg)("ul",null,(0,o.yg)("li",{parentName:"ul"},"execute ",(0,o.yg)("inlineCode",{parentName:"li"},"kubectl apply -f shenyu-bootstrap.yaml"))),(0,o.yg)("h2",{id:"example-2-use-mysql-as-the-database"},"Example 2: Use MySQL as the database"),(0,o.yg)("h3",{id:"1-create-namespace-and-configmap-1"},"1. Create Namespace and ConfigMap"),(0,o.yg)("ul",null,(0,o.yg)("li",{parentName:"ul"},"create shenyu-ns.yaml")),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-yaml"},'apiVersion: v1\nkind: Namespace\nmetadata:\n  name: shenyu\n  labels:\n    name: shenyu\n---\napiVersion: v1\nkind: ConfigMap\nmetadata:\n  name: shenyu-cm\n  namespace: shenyu\ndata:\n  shenyu-admin-application.yml: |\n    server:\n      port: 9095\n      address: 0.0.0.0\n    spring:\n      profiles:\n        active: mysql\n      thymeleaf:\n        cache: true\n        encoding: utf-8\n        enabled: true\n        prefix: classpath:/static/\n        suffix: .html\n    mybatis:\n      config-location: classpath:/mybatis/mybatis-config.xml\n      mapper-locations: classpath:/mappers/*.xml\n    shenyu:\n      register:\n        registerType: http #http #zookeeper #etcd #nacos #consul\n        serverLists: #localhost:2181 #http://localhost:2379 #localhost:8848\n        props:\n          sessionTimeout: 5000\n          connectionTimeout: 2000\n          checked: true\n          zombieCheckTimes: 5\n          scheduledTime: 10\n          nacosNameSpace: ShenyuRegisterCenter\n      sync:\n        websocket:\n          enabled: true\n      aes:\n        secret:\n          key: 2095132720951327\n          iv: 6075877187097700\n      ldap:\n        enabled: false\n        url: ldap://xxxx:xxx\n        bind-dn: cn=xxx,dc=xxx,dc=xxx\n        password: xxxx\n        base-dn: ou=xxx,dc=xxx,dc=xxx\n        object-class: person\n        login-field: cn\n      jwt:\n        expired-seconds: 86400000\n      shiro:\n        white-list:\n          - /\n          - /favicon.*\n          - /static/**\n          - /index**\n          - /platform/login\n          - /websocket\n          - /error\n          - /actuator/health\n          - /swagger-ui.html\n          - /webjars/**\n          - /swagger-resources/**\n          - /v2/api-docs\n          - /csrf\n      swagger:\n        enable: true\n    logging:\n      level:\n        root: info\n        org.springframework.boot: info\n        org.apache.ibatis: info\n        org.apache.shenyu.bonuspoint: info\n        org.apache.shenyu.lottery: info\n        org.apache.shenyu: info\n  shenyu-admin-application-mysql.yml: |\n    shenyu:\n      database:\n        dialect: mysql\n        init_script: "sql-script/mysql/schema.sql"\n        init_enable: true\n    spring:\n      datasource:\n        url: jdbc:mysql://mysql.shenyu.svc.cluster.local:3306/shenyu?useUnicode=true&characterEncoding=utf-8&useSSL=false\n        username: {your_mysql_user}\n        password: {your_mysql_password}\n        driver-class-name: com.mysql.jdbc.Driver\n  shenyu-bootstrap-application.yml: |\n    server:\n      port: 9195\n      address: 0.0.0.0\n    spring:\n      main:\n        allow-bean-definition-overriding: true\n      application:\n        name: shenyu-bootstrap\n      cloud:\n        loadbalancer:\n          ribbon:\n            enabled: false\n        discovery:\n          enabled: false\n        nacos:\n          discovery:\n            server-addr: 127.0.0.1:8848 # Spring Cloud Alibaba Dubbo use this.\n            enabled: false\n    management:\n      health:\n        defaults:\n          enabled: false\n    shenyu:\n      netty:\n        tcp:\n          # set to false, user can custom the netty tcp server config.\n          webServerFactoryEnabled: true\n          selectCount: 1\n          workerCount: 4\n          serverSocketChannel:\n            soRcvBuf: 87380\n            soBackLog: 128\n            soReuseAddr: false\n            connectTimeoutMillis: 10000\n            writeBufferHighWaterMark: 65536\n            writeBufferLowWaterMark: 32768\n            writeSpinCount: 16\n            autoRead: true\n            allocType: "pooled"\n          socketChannel:\n            soKeepAlive: false\n            soReuseAddr: false\n            soLinger: -1\n            tcpNoDelay: true\n            soRcvBuf: 87380\n            soSndBuf: 16384\n            ipTos: 0\n            allowHalfClosure: false\n            connectTimeoutMillis: 10000\n            writeBufferHighWaterMark: 65536\n            writeBufferLowWaterMark: 32768\n            writeSpinCount: 16\n            autoRead: true\n            allocType: "pooled"\n      instance:\n        enabled: false\n        registerType: zookeeper #etcd #consul\n        serverLists: localhost:2181 #http://localhost:2379 #localhost:8848\n        props:\n      cross:\n        enabled: true\n        allowedHeaders:\n        allowedMethods: "*"\n        allowedOrigin: "*"\n        allowedExpose: "*"\n        maxAge: "18000"\n        allowCredentials: true\n      switchConfig:\n        local: true\n      file:\n        enabled: true\n        maxSize : 10\n      sync:\n        websocket:\n          urls: ws://shenyu-admin-svc.shenyu.svc.cluster.local:9095/websocket\n      exclude:\n        enabled: false\n        paths:\n          - /favicon.ico\n      fallback:\n        enabled: true\n      extPlugin:\n        path:\n        enabled: true\n        threads: 1\n        scheduleTime: 300\n        scheduleDelay: 30\n      scheduler:\n        enabled: false\n        type: fixed\n        threads: 16\n      upstreamCheck:\n        enabled: false\n        timeout: 3000\n        healthyThreshold: 1\n        unhealthyThreshold: 1\n        interval: 5000\n        printEnabled: true\n        printInterval: 60000\n    eureka:\n      client:\n        enabled: false\n        serviceUrl:\n          defaultZone: http://localhost:8761/eureka/\n      instance:\n        prefer-ip-address: true\n    logging:\n      level:\n        root: info\n        org.springframework.boot: info\n        org.apache.ibatis: info\n        org.apache.shenyu.bonuspoint: info\n        org.apache.shenyu.lottery: info\n        org.apache.shenyu: info\n')),(0,o.yg)("ul",null,(0,o.yg)("li",{parentName:"ul"},"execute ",(0,o.yg)("inlineCode",{parentName:"li"},"kubectl apply -f shenyu-ns.yaml"))),(0,o.yg)("h3",{id:"2-create-endpoints-to-represent-mysql"},"2. Create Endpoints to represent MySQL"),(0,o.yg)("ul",null,(0,o.yg)("li",{parentName:"ul"},"create shenyu-ep.yaml")),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-yaml"},"kind: Service\napiVersion: v1\nmetadata:\n  name: mysql\n  namespace: shenyu\nspec:\n  ports:\n  - port: 3306\n    name: mysql\n    targetPort: {your_mysql_port}\n---\nkind: Endpoints\napiVersion: v1\nmetadata:\n  name: mysql\n  namespace: shenyu\nsubsets:\n- addresses:\n  - ip: {your_mysql_ip}\n  ports:\n  - port: {your_mysql_port}\n    name: mysql\n")),(0,o.yg)("ul",null,(0,o.yg)("li",{parentName:"ul"},"execute ",(0,o.yg)("inlineCode",{parentName:"li"},"kubectl apply -f shenyu-ep.yaml"))),(0,o.yg)("h3",{id:"3-create-shenyu-admin"},"3. Create shenyu-admin"),(0,o.yg)("ul",null,(0,o.yg)("li",{parentName:"ul"},"create shenyu-admin.yaml")),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-yaml"},"# Example of using the nodeport type to expose ports\napiVersion: v1\nkind: Service\nmetadata:\n  namespace: shenyu\n  name: shenyu-admin-svc\nspec:\n  selector:\n    app: shenyu-admin\n  type: NodePort\n  ports:\n  - protocol: TCP\n    port: 9095\n    targetPort: 9095\n    nodePort: 31095\n---\n# shenyu-admin\napiVersion: apps/v1\nkind: Deployment\nmetadata:\n  namespace: shenyu\n  name: shenyu-admin\nspec:\n  selector:\n    matchLabels:\n      app: shenyu-admin\n  replicas: 1\n  template:\n    metadata:\n      labels:\n        app: shenyu-admin\n    spec:\n      volumes:\n      - name: shenyu-admin-application\n        configMap:\n          name: shenyu-cm\n          items:\n          - key: shenyu-admin-application.yml\n            path: shenyu-admin-application.yml\n      - name: shenyu-admin-application-mysql\n        configMap:\n          name: shenyu-cm\n          items:\n          - key: shenyu-admin-application-mysql.yml\n            path: shenyu-admin-application-mysql.yml\n      - name: mysql-connector-volume\n        emptyDir: {}\n      initContainers:\n      - name: download-mysql-jar\n        image: busybox:1.35.0\n        command: [ \"sh\",\"-c\"]\n        args: [\"wget https://repo1.maven.org/maven2/mysql/mysql-connector-java/8.0.23/mysql-connector-java-8.0.23.jar;\n            wget https://repo1.maven.org/maven2/mysql/mysql-connector-java/8.0.23/mysql-connector-java-8.0.23.jar.md5;\n            if [ $(md5sum mysql-connector-java-8.0.23.jar | cut -d ' ' -f1) = $(cat mysql-connector-java-8.0.23.jar.md5) ];\n            then echo success;\n            else echo failed;\n            exit 1;\n            fi;\n            mv /mysql-connector-java-8.0.23.jar /opt/shenyu-admin/ext-lib/mysql-connector-java.jar\" ]\n        volumeMounts:\n        - name: mysql-connector-volume\n          mountPath: /opt/shenyu-admin/ext-lib\n      containers:\n      - name: shenyu-admin\n        image: apache/shenyu-admin:2.4.2\n        imagePullPolicy: Always\n        ports:\n        - containerPort: 9095\n        env:\n        - name: 'TZ'\n          value: 'Asia/Beijing'\n        - name: SPRING_PROFILES_ACTIVE\n          value: mysql\n        volumeMounts:\n        - name: shenyu-admin-application\n          mountPath: /opt/shenyu-admin/conf/application.yml\n          subPath: shenyu-admin-application.yml\n        - name: shenyu-admin-application-mysql\n          mountPath: /opt/shenyu-admin/conf/application-mysql.yml\n          subPath: shenyu-admin-application-mysql.yml\n        - name: mysql-connector-volume\n          mountPath: /opt/shenyu-admin/ext-lib\n")),(0,o.yg)("ul",null,(0,o.yg)("li",{parentName:"ul"},"execute",(0,o.yg)("inlineCode",{parentName:"li"},"kubectl apply -f shenyu-admin.yaml"))),(0,o.yg)("h3",{id:"4-create-shenyu-bootstrap"},"4. Create shenyu-bootstrap"),(0,o.yg)("ul",null,(0,o.yg)("li",{parentName:"ul"},"create shenyu-bootstrap.yaml")),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-yaml"},"# Example of using the nodeport type to expose ports\napiVersion: v1\nkind: Service\nmetadata:\n  namespace: shenyu\n  name: shenyu-bootstrap-svc\nspec:\n  selector:\n    app: shenyu-bootstrap\n  type: NodePort\n  ports:\n  - protocol: TCP\n    port: 9195\n    targetPort: 9195\n    nodePort: 31195\n---\n# shenyu-bootstrap\napiVersion: apps/v1\nkind: Deployment\nmetadata:\n  namespace: shenyu\n  name: shenyu-bootstrap\nspec:\n  selector:\n    matchLabels:\n      app: shenyu-bootstrap\n  replicas: 1\n  template:\n    metadata:\n      labels:\n        app: shenyu-bootstrap\n    spec:\n      volumes:\n      - name: shenyu-bootstrap-application\n        configMap:\n          name: shenyu-cm\n          items:\n          - key: shenyu-bootstrap-application.yml\n            path: shenyu-bootstrap-application.yml\n      containers:\n      - name: shenyu-bootstrap\n        image: apache/shenyu-bootstrap:2.4.2\n        ports:\n        - containerPort: 9195\n        env:\n        - name: TZ\n          value: Asia/Beijing\n        volumeMounts:\n        - name: shenyu-bootstrap-application\n          mountPath: /opt/shenyu-bootstrap/conf/application.yml\n          subPath: shenyu-bootstrap-application.yml\n")),(0,o.yg)("ul",null,(0,o.yg)("li",{parentName:"ul"},"execute ",(0,o.yg)("inlineCode",{parentName:"li"},"kubectl apply -f shenyu-bootstrap.yaml"))),(0,o.yg)("h2",{id:"test-access"},"Test Access"),(0,o.yg)("p",null,(0,o.yg)("strong",{parentName:"p"},"Access Address"),"\uff1ahttp://{K8S_CLUSTER_IP}:31095/"),(0,o.yg)("p",null,(0,o.yg)("strong",{parentName:"p"},"Account/password"),"\uff1aadmin/123456"))}m.isMDXComponent=!0},15680:(e,n,a)=>{a.d(n,{xA:()=>c,yg:()=>d});var t=a(96540);function o(e,n,a){return n in e?Object.defineProperty(e,n,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[n]=a,e}function s(e,n){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);n&&(t=t.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),a.push.apply(a,t)}return a}function l(e){for(var n=1;n<arguments.length;n++){var a=null!=arguments[n]?arguments[n]:{};n%2?s(Object(a),!0).forEach((function(n){o(e,n,a[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):s(Object(a)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(a,n))}))}return e}function r(e,n){if(null==e)return{};var a,t,o=function(e,n){if(null==e)return{};var a,t,o={},s=Object.keys(e);for(t=0;t<s.length;t++)a=s[t],n.indexOf(a)>=0||(o[a]=e[a]);return o}(e,n);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(t=0;t<s.length;t++)a=s[t],n.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(o[a]=e[a])}return o}var i=t.createContext({}),p=function(e){var n=t.useContext(i),a=n;return e&&(a="function"==typeof e?e(n):l(l({},n),e)),a},c=function(e){var n=p(e.components);return t.createElement(i.Provider,{value:n},e.children)},m="mdxType",u={inlineCode:"code",wrapper:function(e){var n=e.children;return t.createElement(t.Fragment,{},n)}},y=t.forwardRef((function(e,n){var a=e.components,o=e.mdxType,s=e.originalType,i=e.parentName,c=r(e,["components","mdxType","originalType","parentName"]),m=p(a),y=o,d=m["".concat(i,".").concat(y)]||m[y]||u[y]||s;return a?t.createElement(d,l(l({ref:n},c),{},{components:a})):t.createElement(d,l({ref:n},c))}));function d(e,n){var a=arguments,o=n&&n.mdxType;if("string"==typeof e||o){var s=a.length,l=new Array(s);l[0]=y;var r={};for(var i in n)hasOwnProperty.call(n,i)&&(r[i]=n[i]);r.originalType=e,r[m]="string"==typeof e?e:o,l[1]=r;for(var p=2;p<s;p++)l[p]=a[p];return t.createElement.apply(null,l)}return t.createElement.apply(null,a)}y.displayName="MDXCreateElement"}}]);