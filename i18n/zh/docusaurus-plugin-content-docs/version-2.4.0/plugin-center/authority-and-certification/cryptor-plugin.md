---

title: Cryptor 插件
keywords: ["Cryptor","CryptorRequest","CryptorResponse"]
description: Cryptor 插件
----------------

## 说明
* `Cryptor` 插件，由两个插件组合而成，分别是 `CryptorRequest plugin` 针对 `Request` 进来的加密报文进行 `解密` 处理，另一个 `CryptorResponse plugin` 针对 `Response` 返回的报文进行 `加密` 处理返回出去。由于是组合在一起的插件，两者可以独立启动，不影响其中一个。

## 插件设置

请参考运维部署的内容，选择一种方式启动`shenyu-admin`。比如，通过 [本地部署](../../deployment/deployment-local) 启动`Apache ShenYu`后台管理系统。

* 在 `shenyu-admin` 基础配置 --> 插件管理 --> `cryptor_request` 、`cryptor_response` ，设置为开启。如果用户不想使用此功能，请在 `admin` 后台停用此插件。



## 在网关中引入 Cryptor 插件

* 在网关的 `pom.xml` 文件中添加 `cryptor` 的依赖。

```xml
  <!-- Apache ShenYu cryptor plugin start-->
  <dependency>
      <groupId>org.apache.shenyu</groupId>
      <artifactId>shenyu-spring-boot-starter-plugin-cryptor</artifactId>
      <version>${project.version}</version>
  </dependency>
  <!-- Apache ShenYu cryptor plugin end-->
```

## Cryptor 插件配置

关于选择器和规则配置的更多说明，请参考：[选择器和规则管理](../../user-guide/admin-usage/selector-and-rule)， 这里只对部分字段进行了介绍。

当前是匹配需要加解密的 API 路径进行操作，即这些配置是在 `rule` 当中。

#### strategyName

加解密的算法策略，当前是基于 SPI 机制制作，允许使用者 `自定义` 加解密算法策略，只需要实现 `org.apache.shenyu.plugin.cryptor.strategy.CryptorStrategy` 该接口。

具体操作：
```
@Join
public class ${you class} implements CryptorStrategy {

    /**
     * 解密.
     * @param key 密钥
     * @param encryptData 加密报文
     * @return data
     * @throws Exception error
     */
    @Override
    public String decrypt(final String key, final String encryptData) throws Exception {
        // 逻辑处理
    }
    
    /**
     * 加密.
     * @param key 密钥
     * @param data 数据
     * @return 加密报文.
     * @throws Exception error
     */
    @Override
    public String encrypt(final String key, final String data) throws Exception {
        // 逻辑处理
    }
}
```
找到 `shenyu-plugin-cryptor` 模块底下的 resources 文件夹 META-INF.shenyu 的 org.apache.shenyu.plugin.cryptor.strategy.CryptorStrategy 
写上对应的名称以及刚刚实现的 class 包名。

接着执行
```
INSERT IGNORE INTO `shenyu_dict` (
`id`, 
`type`,
`dict_code`, 
`dict_name`, 
`dict_value`, 
`desc`, 
`sort`, 
`enabled`, 
`date_created`, 
`date_updated`) 
VALUES (
'id', 
'strategyName', 
'STRATEGY_NAME', 
'SPI 实现的名称', 
'SPI 实现的名称', 
'SPI 实现的名称 strategy', 
1, 
1, 
'2021-08-25 11:47:29', 
'2021-08-25 11:48:03');
```

#### fieldNames

针对 `RequestBody` 以及 `ResponseBody` 的 key ，进行加解密。

#### key

密钥。

## 注意

当前针对的是有写 body 的请求做处理，且没有组合加解密等效果。

## 场景

* 需要防范互联网黑产。
 
