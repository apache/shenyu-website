---
title: shenyu-admin 国际化
author: 刘宇
author_title: Apache ShenYu Contributor
author_url: https://github.com/Michaelshark
tags: [Apache ShenYu, 国际化]
---
Shenyu 是一个用于服务代理、协议转换和 API 治理的原生 API 网关。它可以通过 Shenyu-admin 管理和维护 API，并支持中英文的国际化。遗憾的是，Shenyu-admin 只在前端实现了国际化。后端接口返回的消息提示仍然是英文。因此，我们需要为后端接口实现国际化支持。这将为 shenyu 向更多语言支持迈出良好的基础。

### ****任务1：实现 shenyu-admin 后台的国际化（7个步骤）****

**1. 添加必要的依赖：**

确保在你的 **`pom.xml`**（用于 Maven）或 **`build.gradle`**（用于 Gradle）中有所需的依赖。

对于 Maven:

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-validation</artifactId>
</dependency>
```

对于 Gradle:

```groovy
implementation 'org.springframework.boot:spring-boot-starter-validation'
```

在第一步中，我们确保项目具有启用验证和国际化功能所需的依赖。**`spring-boot-starter-validation`**依赖项包括 Hibernate 验证器，这是 JSR-303（Bean 验证）规范的实现，以及验证和国际化所需的其他库。

**2. 配置 `MessageSource` 和 `Validator` bean：**

创建一个配置类，并定义一个 **`MessageSource`** bean 以加载不同语言的消息属性文件，以及一个使用 Hibernate 验证器和自定义 **`MessageInterpolator`** 的 **`Validator`** bean：

```java
import org.springframework.context.MessageSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.support.ResourceBundleMessageSource;
import org.springframework.validation.beanvalidation.LocalValidatorFactoryBean;

@Configuration
public class InternationalizationConfig {

  @Bean
  public MessageSource messageSource() {
    ResourceBundleMessageSource messageSource = new ResourceBundleMessageSource();
    messageSource.setBasename("i18n/messages");
    messageSource.setDefaultEncoding("UTF-8");
    return messageSource;
  }

  @Bean
  public LocalValidatorFactoryBean validator(MessageSource messageSource) {
    LocalValidatorFactoryBean validatorFactoryBean = new LocalValidatorFactoryBean();
    validatorFactoryBean.setValidationMessageSource(messageSource);
    return validatorFactoryBean;
  }

}
```

在第二步中，我将创建一个用 **`@Configuration`** 注释的 **`InternationalizationConfig`** 类。此类将包含应用程序中国际化的配置。

在类中，我将定义两个 bean：

**`MessageSource`**：此bean加载不同语言的消息属性文件，使用**`ResourceBundleMessageSource`**类进行配置，并将基本名称设置为 "i18n/messages"，这告诉它查找 "resources/i18n" 目录中的模式为 "messages_{locale}.properties" 的文件（例如，"messages_en.properties" 或 "messages_cn_zh.properties"）。我还将默认编码设置为 "UTF-8"，以正确处理特殊字符。

**`LocalValidatorFactoryBean`**：此 bean 使用 Hibernate 验证器配置验证过程，并允许使用自定义 **`MessageInterpolator`**来转换验证错误消息。我将 **`validationMessageSource`**属性设置为之前定义的 **`MessageSource`**bean。这将使验证过程使用来自消息属性文件的已翻译消息作为验证错误消息。

**3. 创建消息属性文件：**

为要支持的每种语言创建消息属性文件，其中包含验证错误消息的翻译消息和要国际化的其他消息。将这些文件放在 **`resources/i18n`** 目录中：

- **`messages_en.properties`**：英文
- **`messages_cn_zh.properties`**：中文

在相应的属性文件中为每个消息键添加翻译。

**4. 创建自定义 `LocaleResolver`：**

实现一个自定义的 **`LocaleResolver`**，根据 HTTP 请求中的 'Location' 标头确定客户端首选的语言。

```java
public class HeaderLocaleResolver implements LocaleResolver {

  @Override
  public Locale resolveLocale(HttpServletRequest request) {
    String headerLang = request.getHeader("Location");
    return headerLang == null || headerLang.isEmpty()
        ? Locale.getDefault()
        : Locale.forLanguageTag(headerLang);
  }

  @Override
  public void setLocale(HttpServletRequest request, HttpServletResponse response, Locale locale) {
    // This method intentionally left empty
  }

}
```

**5. 注册自定义 `LocaleResolver`：**

在配置类中注册您的自定义 **`LocaleResolver`** bean。

```java
@Bean
public LocaleResolver localeResolver() {
  return new HeaderLocaleResolver();
}
```

**6. 添加验证异常处理程序：**

创建一个验证异常处理程序，捕获验证异常并根据客户端首选的语言返回国际化错误消息。

```java
@RestControllerAdvice
public class ValidationErrorHandler {

  @Autowired
  private MessageSource messageSource;

  @ExceptionHandler(MethodArgumentNotValidException.class)
  public ResponseEntity<Object> handleValidationExceptions(
      MethodArgumentNotValidException ex, WebRequest request) {
    Locale locale = request.getLocale();
    FieldError fieldError = ex.getBindingResult().getFieldError();
    String errorMessage = messageSource.getMessage(fieldError, locale);

    ApiResponse apiResponse = new ApiResponse(600, errorMessage);
    return new ResponseEntity<>(apiResponse, HttpStatus.BAD_REQUEST);
  }

}
```

**7. 更新控制器和服务以使用国际化消息：**

将 **`MessageSource`** bean 注入到我们的服务类和控制器中。使用 **`MessageSource`** bean 根据客户端首选的语言获取已翻译的消息。

```java
@Service
public class MyService {

  @Autowired
  private MessageSource messageSource;

  public String getTranslatedMessage(String messageKey, Locale locale) {
    String translatedMessage = messageSource.getMessage(messageKey, null, locale);
    return translatedMessage;
  }

}
```

**结论:** 通过遵循这些步骤，我可以实现 Shenyu-admin 后端的国际化。验证错误消息和其他自定义消息将根据客户端首选的语言进行翻译，并将适当的错误响应发送给客户端。

### ****任务2：通过前端的国际化，通过 HTTP 协议获取客户端区域信息，支持相应区域的语言。****

修改 **`request`** 函数以从 sessionStorage 中获取用户首选语言，并将其设置为 'Accept-Language' 标头：

```jsx
export default function request(url, options) {
  // ... (existing code)

  // Read the user's preferred language from localStorage
  const userPreferredLanguage = window.sessionStorage.getItem('locale') || 'en-US';

  if (
    newOptions.method === 'POST' ||
    newOptions.method === 'PUT' ||
    newOptions.method === 'DELETE'
  ) {
    if (!(newOptions.body instanceof FormData)) {
      newOptions.headers = {
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json; charset=utf-8',
        'Accept-Language': userPreferredLanguage, // Use the user's preferred language
        ...newOptions.headers,
      };
      newOptions.body = JSON.stringify(newOptions.body);
    } else {
      // newOptions.body is FormData
      newOptions.headers = {
        Accept: 'application/json',
        'Accept-Language': userPreferredLanguage, // Use the user's preferred language
        ...newOptions.headers,
      };
    }
  }

  // ... (remaining code)
}
```

通过这种修改，将根据存储在 sessionStorage 中的用户首选语言设置 'Accept-Language' 标头。后端应使用此标头值返回适当语言的消息或提示，前提是已配置为处理 'Accept-Language' 标头。