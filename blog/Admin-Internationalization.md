---
title: shenyu-admin internationalization
author: Yu_Liu
author_title: Apache ShenYu Contributor
author_url: https://github.com/Michaelshark
tags: [Apache ShenYu, Internationalization]
---
Shenyu is a native API gateway for service proxy, protocol translation and API governance. It can manage and maintain the API through Shenyu-admin, and support internationalization in Chinese and English. Unfortunately, Shenyu-admin is only internationalized on the front end. The message prompt returned by the back-end interface is still in English. Therefore, we need to implement internationalization support for the back-end interface.This will lay a good foundation for shenyu to move towards more language support.

### Task1: Achieve the internationalization of shenyu-admin background(7 steps)

1. **Add necessary dependencies:**

Make sure we have the required dependencies in your **`pom.xml`** (for Maven) or **`build.gradle`** (for Gradle).

For Maven:

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-validation</artifactId>
</dependency>
```

For Gradle:

```groovy
implementation 'org.springframework.boot:spring-boot-starter-validation'
```

In step 1, we ensure that our project has the necessary dependencies to enable validation and internationalization features. The **`spring-boot-starter-validation`** dependency includes Hibernate Validator, an implementation of the JSR-303 (Bean Validation) specification, and other libraries required for validation and internationalization.

1. **Configure the `MessageSource` and `Validator` beans:**

Create a configuration class and define a **`MessageSource`** bean to load the message properties files for different languages, and a **`Validator`** bean to use Hibernate Validator with custom **`MessageInterpolator`**:

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

In step 2, I will create an **`InternationalizationConfig`** class annotated with **`@Configuration`**. This class will contain the configuration for internationalization in the application.

Inside the class, I’ll define two beans:

**`MessageSource`**: This bean is responsible for loading the message properties files for different languages. I’ll configure it with the **`ResourceBundleMessageSource`** class and set the basename to "i18n/messages", which tells it to look for files in the "resources/i18n" directory with the pattern "messages_{locale}.properties" (e.g., "messages_en.properties" or "messages_cn_zh.properties"). I’ll also set the default encoding to "UTF-8" for proper handling of special characters.

**`LocalValidatorFactoryBean`**: This bean configures the validation process with Hibernate Validator and enables the use of a custom **`MessageInterpolator`** for translating validation error messages. I’ll set the **`validationMessageSource`** property to the **`MessageSource`** bean I defined earlier. This will make the validation process use the translated messages from the message properties files for validation error messages.

1. **Create message properties files:**

Create message properties files for each language you want to support, containing the translated messages for validation error messages and any other messages I want to internationalize. Place these files in the **`resources/i18n`** directory:

- **`messages_en.properties`**: for English
- **`messages_cn_zh.properties`**: for Chinese

Add the translations for each message key in the corresponding properties file.

1. **Create a custom `LocaleResolver`:**

Implement a custom **`LocaleResolver`** to determine the client's preferred language based on the 'Location' header in the HTTP request.

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

1. **Register the custom `LocaleResolver`:**

Register your custom **`LocaleResolver`** as a bean in your configuration class.

```java
@Bean
public LocaleResolver localeResolver() {
  return new HeaderLocaleResolver();
}
```

1. **Add a validation exception handler:**

Create a validation exception handler that catches validation exceptions and returns internationalized error messages based on the client's preferred language.

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

1. **Update controllers and services to use internationalized messages:**

Inject the **`MessageSource`** bean into our service classes and controllers. Use the **`MessageSource`** bean to get translated messages based on the client's preferred language.

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

**Conclution:** By following these steps, I can achieve the internationalization of the Shenyu-admin backend. Validation error messages and other custom messages will be translated based on the client's preferred language, and appropriate error responses will be sent to the client.

### Task2: Get through the internationalization of front-end, obtain the client region information through http protocol, support the language of the corresponding region.

Modify the **`request`** function to fetch the user's preferred language from sessionStorage and set it as the 'Accept-Language' header:

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

With this modification, the 'Accept-Language' header will be set according to the user's preferred language stored in sessionStorage. The backend should then use this header value to return messages or prompts in the appropriate language, provided it's configured to handle the 'Accept-Language' header.