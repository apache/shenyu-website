---
title: e2e测试详解
author: Haiqi Qin
author_title: Apache ShenYu Committer
author_url: https://github.com/HaiqiQin
author_image_url: https://avatars.githubusercontent.com/u/80969210?v=4
tags: [E2e Test, Apache ShenYu]
---

这篇文章将会对Apache ShenYu的e2e模块进行深入剖析。

### 什么是e2e

e2e(end to end)，也叫端到端测试，是一种用于测试应用程序流是否从头到尾按设计执行的方法。 执行端到端测试的目的是识别系统依赖关系，并确保在各种系统组件和系统之间传递正确的信息。端到端测试的目的是测试 整个软件的依赖性、数据完整性以及与其他系统、接口和数据库的通信，以模拟完整的生产场景。

### e2e的优势

e2e测试能够模拟真实用户场景下测试软件系统的完整性和准确性，能够验证整个系统是否按照预期工作，以及不同组件是否能够协同工作。 e2e测试有以下几个好处:

1. 帮助保证系统功能的正确性：e2e测试能够模拟真实用户场景下的交互和操作，验证整个系统是否能够按照预期工作，帮助发现系统中的潜在问题和缺陷。
2. 提高测试覆盖率：e2e测试能够覆盖整个系统，包括前端、后端、数据库等不同层面和组件，从而提高测试覆盖率，保证测试的全面性和准确性。
3. 保证系统的稳定性：E2E测试可以检查系统在各种情况下的稳定性和健壮性，包括系统的响应时间、错误处理能力、并发性等方面，帮助确保系统在面对高负载和异常情况时仍然能够保持稳定运行。
4. 减少测试成本：e2e测试能够提高测试效率和准确性，减少测试成本和时间，从而帮助企业更快速地发布和交付高质量的软件产品。

总之，e2e测试是一种全面的测试方式，能够验证整个系统是否按照预期工作，提高测试覆盖率和测试效率，从而保证系统的稳定性和正确性，减少测试成本和时间，是一种非常重要和有效的测试方法，所以我们需要完善 e2e相关代码。

### 自动化e2e测试如何实现

在Apache ShenYu中，e2e测试的主要步骤体现在GitHub Action工作流的脚本中，如下所示，该脚本位于 [~/.github/workflows](https://github.com/apache/incubator-shenyu/tree/master/.github/workflows)目录下的e2e文件中。

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

当工作流触发时，使用shenyu-dist模块下的dockerfile文件构建admin与bootstrap项目的镜像并上传，当e2e测试模块运行时可以加载admin与bootstrap镜像。紧接着构建examples中的模块，最后执行对应测试模块的测试方法。

### 本地如何运行e2e测试

如果需要编写e2e测试用例，首先需要在本地编码并调试。目前e2e支持两种启动方式，一个是docker启动，另一个是host启动。这两种模式可以通过在测试类中的@ShenYuTest注解中切换。host启动方式直接在本地将需要启动的服务直接启动即可运行测试代码。采用docker进行启动前，需要在先构建出相应镜像。因为ShenYu目前需要支持在github工作流进行e2e测试，建议采用docker启动方式。

### e2e启动流程剖析

目前e2e模块主要分为四个部分，分别为：case、client、common以及engine。

![e2e-modules](/img/activities/code-analysis-e2e/e2e-modules.png)

case模块存放插件的测试用例，client模块编写了admin与gateway的客户端，以便请求对应接口。common存放一些公共类，engine模块是框架的核心，依托testcontainer框架利用java代码启动docker容器并完成对admin以及gatewat的配置操作。

接下来我将依托源码对e2e启动流程进行剖析。

当我们执行case中的测试方法时，@ShenYuTest注解将会生效，对测试类进行扩展。通过@ShenYuTest，我们可以选择启动方法、对admin以及gateway配置相关参数，以及选择将要执行的docker-compose文件。对于admin以及gateway，可以配置登陆所需的用户名、密码、数据同步方式以及修改yaml的内容。

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
                          @ShenYuTest.Parameter(key = "dataSyn", value = "gateway_websocket")})},           dockerComposeFile = "classpath:./docker-compose.mysql.yml")

```

@ShenYuTest通过ShenYuExtension类进行扩展，对admin与gateway的配置在ShenYuExtension中的beforeAll中生效。具体的生效逻辑在DockerServiceCompose类中实现。

![e2e-shenyutest](/img/activities/code-analysis-e2e/e2e-shenyutest.png)

![e2e-beforeall](/img/activities/code-analysis-e2e/e2e-beforeall.png)

@ShenYuTest配置项在docker启动前生效，主要通过修改测试模块中resource目录下的yaml文件。目前e2e支持对不同数据同步方式进行测试，其原理就是通过DockerServiceCompose类中的chooseDataSyn方法。在DataSyncHandler中对各种数据同步方式需要修改的内容进行初始化，最后启动container。

![e2e-docer-service-compose](/img/activities/code-analysis-e2e/e2e-docer-service-compose.png)

![e2e-datahandle-syn](/img/activities/code-analysis-e2e/e2e-datahandle-syn.png)

当docker启动完后，开始对插件功能进行测试。在PluginsTest类中，有针对测试进行的前置以及后置操作。

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

以springcloud插件为例，首先需要测试注册中心以及数据同步能否正常工作，接着启动插件并删除已存在的选择器。测试数据是否成功注册进注册中心，可以调用admin客户端的接口进行测试，测试数据同步是否成功，可以获取gateway的缓存进行测试。

接着运行case文件中的测试用例，通过@ShenYuScenario获取用例。

```java
    @ShenYuScenario(provider = SpringCloudPluginCases.class)
    void testSpringCloud(GatewayClient gateway, CaseSpec spec) {
        spec.getVerifiers().forEach(verifier -> verifier.verify(gateway.getHttpRequesterSupplier().get()));
    }
```

针对不同的插件，我们可以构建Case类，存放要测试的规则。所有的测试规则存放进list中，按顺序进行测试。beforeEachSpec中进行构建选择器与规则，caseSpec存放测试实体，如果符合uri规则的应存在，否则不存在。我们需要模拟用户对选择器和规则进行新增，因为各个插件的选择器的handler规则不一定相同，所以我们需要根据插件需求去编写其handle类。并通过请求验证其符合规则。具体测试用例主要分为两大类，一类是对uri规则进行匹配，比如euqal、path_pattern、start_with、end_with，一类是请求类型，比如get、put、post、delete。

当八种匹配情况都测试通过后，可以判断该插件功能正常，我们在测试结束后需要恢复环境，将所有的选择器删除，将该插件设置为不可用，最后关闭所有容器。

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
                                                        .divideUpstreams(DIVIDE_UPSTREAMS)
                                                        .build())
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



