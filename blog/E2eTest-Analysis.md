---
title: E2e Test Analysis
author: Haiqi Qin
author_title: Apache ShenYu Committer
author_url: https://github.com/HaiqiQin
tags: [E2e Test, Apache ShenYu]
---

This article will conduct an in-depth analysis of Apache ShenYu e2e module.

### what is e2e

e2e (end to end), also known as end-to-end testing, is a method used to test whether the application flow performs as designed from the beginning to the end. The purpose of performing end-to-end testing is to identify system dependencies and ensure that the correct information is passed between various system components and systems. The purpose of end-to-end testing is to test the entire software for dependencies, data integrity, and communication with other systems, interfaces, and databases to simulate a complete production scenario.

### Advantages of e2e

e2e testing can test the integrity and accuracy of software systems in simulated real user scenarios, and can verify whether the entire system works as expected and whether different components can work together. There are several benefits of e2e testing:

1. Help ensure the correctness of system functions.e2e testing can simulate the interaction and operation in real user scenarios, verify whether the entire system can work as expected, and help discover potential problems and defects in the system.
2. Improve test coverage.e2e testing can cover the entire system, including front-end, back-end, database and other different levels and components, thereby improving test coverage and ensuring comprehensiveness and accuracy of testing.
3. Ensure the stability of the system.e2e testing can check the stability and robustness of the system in various situations, including system response time, error handling capabilities, concurrency, etc., to help ensure that the system is in the face of high load and abnormal conditions Still able to maintain stable operation.
4. Reduce testing cost.e2e testing can improve testing efficiency and accuracy, reduce testing cost and time, and thus help enterprises release and deliver high-quality software products more quickly.

In short, e2e testing is a comprehensive testing method that can verify whether the entire system works as expected, improve test coverage and test efficiency, thereby ensuring the stability and correctness of the system, and reducing testing costs and time. And effective testing methods, so we need to improve e2e related codes.

### How to implement automated e2e testing

In Apache ShenYu, the main steps of e2e testing are reflected in the script of the GitHub Action workflow, as shown below, the script is located at [~/.github/workflows](https://github.com/apache/incubator-shenyu/tree/master/.github/workflows) directory in the e2e file.

```yaml
name: e2e

on:
  pull_request:
  push:
    branches:
      - master
jobs:
  changes:
    ...
  build-docker-images:
    ...
  e2e-http:
    ...
  e2e-case:
    runs-on: ubuntu-latest
    needs:
      - changes
      - build-docker-images
    if: ${{ needs.changes.outputs.e2e == 'true' }}
    strategy:
      matrix:
        case: [ "shenyu-e2e-case-spring-cloud", "shenyu-e2e-case-apache-dubbo", "shenyu-e2e-case-sofa" ]
    steps:
      - uses: actions/checkout@v3
        with:
          submodules: true
      - name: Load ShenYu Docker Images
        run: |
          docker load --input /tmp/apache-shenyu-admin.tar
          docker load --input /tmp/apache-shenyu-bootstrap.tar
          docker image ls -a
      - name: Build examples with Maven
        run: ./mvnw -B clean install -Pexample -Dmaven.javadoc.skip=true -Dmaven.test.skip=true -f ./shenyu-examples/pom.xml
      - name: Run ShenYu E2E Tests
        env:
          storage: mysql
        run: |
          bash ./shenyu-e2e/script/storage_init.sh
          ./mvnw -B -f ./shenyu-e2e/pom.xml -pl shenyu-e2e-case/${{ matrix.case }} -Dstorage=mysql test
```

When the workflow is triggered, use the dockerfile under the shenyu-dist module to build and upload the images of the admin and bootstrap projects. When the e2e test module is running, the admin and bootstrap images can be loaded. Then build the modules in the examples, and finally execute the test method of the corresponding test module.

### How to run e2e test locally

If you need to write e2e test cases, you first need to code and debug locally. Currently e2e supports two startup methods, one is docker startup and the other is host startup. These two modes can be switched in the @ShenYuTest annotation in the test class. The host startup method directly starts the services that need to be started locally to run the test code. Before using docker to start, you need to build the corresponding image first. Because ShenYu currently needs to support e2e testing in the github workflow, it is recommended to use the docker startup method.

### Analysis of e2e startup process

Currently, the e2e module is mainly divided into four parts: case, client, common and engine.

![e2e-modules](/img/activities/code-analysis-e2e/e2e-modules.png)

The case module stores the test cases of the plug-in, and the client module writes the clients of admin and gateway to request corresponding interfaces. Common stores some public classes, and the engine module is the core of the framework. Relying on the testcontainer framework, use java code to start the docker container and complete the configuration operations for admin and gatewat.

Next, I will analyze the e2e startup process based on the source code.

When we execute the test method in the case, the @ShenYuTest annotation will take effect and extend the test class. Through @ShenYuTest, we can choose the startup method, configure related parameters for admin and gateway, and choose the docker-compose file to be executed. For admin and gateway, you can configure the user name, password, data synchronization method and modify the content of yaml required for login.

```java
@ShenYuTest(
        mode = ShenYuEngineConfigure.Mode.DOCKER,
        services = {
                @ShenYuTest.ServiceConfigure(
                        serviceName = "admin",
                        port = 9095,
                        baseUrl = "http://{hostname:localhost}:9095",
                        parameters = {
                                @ShenYuTest.Parameter(key = "username", value = "admin"),
                                @ShenYuTest.Parameter(key = "password", value = "123456"),
                                @ShenYuTest.Parameter(key = "dataSyn", value = "admin_websocket")
                        }
                ),
                @ShenYuTest.ServiceConfigure(
                        serviceName = "gateway",
                        port = 9195,
                        baseUrl = "http://{hostname:localhost}:9195", 
                        type = ShenYuEngineConfigure.ServiceType.SHENYU_GATEWAY,
                        parameters = {
                          @ShenYuTest.Parameter(key = "application", value =  "spring.cloud.discovery.enabled:true,eureka.client.enabled:true"), 
                          @ShenYuTest.Parameter(key = "dataSyn", value = "gateway_websocket")})},           
        dockerComposeFile = "classpath:./docker-compose.mysql.yml")

```

@ShenYuTest is extended through the ShenYuExtension class, and the configuration of admin and gateway takes effect in beforeAll in ShenYuExtension. The specific effective logic is implemented in the DockerServiceCompose class.

![e2e-shenyutest](/img/activities/code-analysis-e2e/e2e-shenyutest.png)

![e2e-beforeall](/img/activities/code-analysis-e2e/e2e-beforeall.png)

@ShenYuTest configuration items take effect before docker starts, mainly by modifying the yaml file in the resource directory of the test module. Currently, e2e supports testing of different data synchronization methods. The principle is to use the chooseDataSyn method in the DockerServiceCompose class. In the DataSyncHandler, initialize the content that needs to be modified in various data synchronization methods, and finally start the container.

![e2e-docer-service-compose](/img/activities/code-analysis-e2e/e2e-docer-service-compose.png)

![e2e-datahandle-syn](/img/activities/code-analysis-e2e/e2e-datahandle-syn.png)

When docker is started, start testing the plug-in function. In the PluginsTest class, there are pre- and post-operations for testing.

```java
    @BeforeAll
    static void setup(final AdminClient adminClient, final GatewayClient gatewayClient) throws InterruptedException, JsonProcessingException {
        adminClient.login();
        Thread.sleep(10000);
        List<SelectorDTO> selectorDTOList = adminClient.listAllSelectors();
        List<MetaDataDTO> metaDataDTOList = adminClient.listAllMetaData();
        List<RuleDTO> ruleDTOList = adminClient.listAllRules();
        Assertions.assertEquals(2, selectorDTOList.size());
        Assertions.assertEquals(13, metaDataDTOList.size());
        Assertions.assertEquals(14, ruleDTOList.size());
        
        for (SelectorDTO selectorDTO : selectorDTOList) {
            if (selectorDTO.getHandle() != null && !"".equals(selectorDTO.getHandle())) {
                SpringCloudPluginCases.verifierUri(selectorDTO.getHandle());
            }
        }
        List<MetaData> metaDataCacheList = gatewayClient.getMetaDataCache();
        List<SelectorCacheData> selectorCacheList = gatewayClient.getSelectorCache();
        List<RuleCacheData> ruleCacheList = gatewayClient.getRuleCache();
        Assertions.assertEquals(2, selectorCacheList.size());
        Assertions.assertEquals(13, metaDataCacheList.size());
        Assertions.assertEquals(14, ruleCacheList.size());

        MultiValueMap<String, String> formData = new LinkedMultiValueMap<>();
        formData.add("id", "8");
        formData.add("name", "springCloud");
        formData.add("enabled", "true");
        formData.add("role", "Proxy");
        formData.add("sort", "200");
        adminClient.changePluginStatus("8", formData);
        String id = "";
        for (SelectorDTO selectorDTO : selectorDTOList) {
            if (!"".equals(selectorDTO.getHandle())) {
                id = selectorDTO.getId();
            }
        }
        adminClient.deleteSelectors(id);
        selectorDTOList = adminClient.listAllSelectors();
        Assertions.assertEquals(1, selectorDTOList.size());
    }
```

Taking the springcloud plug-in as an example, you first need to test whether the registration center and data synchronization can work normally, then start the plug-in and delete the existing selector. To test whether the data is successfully registered into the registration center, you can call the interface of the admin client to test, and to test whether the data synchronization is successful, you can obtain the cache of the gateway for testing.

Then run the test case in the case file and get the use case through @ShenYuScenario.

```java
    @ShenYuScenario(provider = SpringCloudPluginCases.class)
    void testSpringCloud(GatewayClient gateway, CaseSpec spec) {
        spec.getVerifiers().forEach(verifier -> verifier.verify(gateway.getHttpRequesterSupplier().get()));
    }
```

For different plug-ins, we can build a Case class to store the rules to be tested. All test rules are stored in the list and tested in order. Build selectors and rules in beforeEachSpec, caseSpec stores test entities, if they meet the uri rules, they should exist, otherwise they don’t exist. We need to simulate users to add selectors and rules, because the handler rules of the selectors of each plug-in are not necessarily the same, so we need to write its handle class according to the plug-in requirements. And verify that it complies with the rules with the request. Specific test cases are mainly divided into two categories, one is to match uri rules, such as euqal, path_pattern, start_with, end_with, and the other is request types, such as get, put, post, delete.

When all eight matching conditions are tested, it can be judged that the plug-in function is normal. After the test, we need to restore the environment, delete all selectors, set the plug-in to unavailable, and finally close all containers.

```java
    @Override
    public List<ScenarioSpec> get() {
        return Lists.newArrayList(
                testWithUriEquals(),
                testWithUriPathPattern(),
                testWithUriStartWith(),
                testWithEndWith(),
                testWithMethodGet(),
                testWithMethodPost(),
                testWithMethodPut(),
                testWithMethodDelete()
        );
    }

    private ShenYuScenarioSpec testWithUriEquals() {
        return ShenYuScenarioSpec.builder()
                .name("single-spring-cloud uri =]")
                .beforeEachSpec(
                        ShenYuBeforeEachSpec.builder()
                                .addSelectorAndRule(
                                        newSelectorBuilder("selector", Plugin.SPRING_CLOUD)                                               .handle(SpringCloudSelectorHandle.builder().serviceId("springCloud-test")
                                                        .gray(true)
                                                        .divideUpstreams(DIVIDE_UPSTREAMS).build())
                                                .conditionList(newConditions(Condition.ParamType.URI, Condition.Operator.EQUAL, TEST))
                                                .build(),
                                        newRuleBuilder("rule")                               .handle(SpringCloudRuleHandle.builder().loadBalance("hash").timeout(3000).build())
                                                .conditionList(newConditions(Condition.ParamType.URI, Condition.Operator.EQUAL, TEST))
                                                .build()
                                )
                                .checker(notExists(TEST))
                                .waiting(exists(TEST))
                                .build()
                )
                .caseSpec(
                        ShenYuCaseSpec.builder()
                                .addExists(TEST)
                                .addNotExists("/springcloud/te")
                                .addNotExists("/put")
                                .addNotExists("/get")
                                .build()
                )
                .afterEachSpec(ShenYuAfterEachSpec.DEFAULT)
                .build();
    }
```

