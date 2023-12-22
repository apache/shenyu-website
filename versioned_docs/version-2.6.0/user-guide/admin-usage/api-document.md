---
title: API Document Management
keywords: ["api doc Document"]
description: API document management
---

## 1. Design Notes

When the front and back end are jointly debugged, it is usually necessary for the back end to give documents to detail the input and output of the interface; 

After the backend development is complete, you need to test whether the access gateway is successful. 

In order to reduce the sense of fragmentation and improve the user experience of front-end and back-end development, it is necessary to see the API documentation in shenyu-admin and test the API directly.

## 2. How to use

The brief introduce is as follows.
- Back-end development produces API documents in shenyu-admin.
> Three methods of `remotely pulling swagger`, `manual filling`, and `client registration` are already supported. From the perspective of functional integrity and user experience, `remotely pulling swagger` is currently recommended, and the latter two methods will be in Continuous function enhancement in later versions.
- The frontend looks at the API documentation in shenyu-admin and starts development.
> During joint debugging, developers (including front-end and backend) may use the testing function in shenyu-admin to request APIs directly.

## 3. Set the global environment address

In actual use, you may have multiple gateway addresses (such as production environment, test environment, or public network environment, intranet environment), you can manage them in `Apache ShenYu` Gateway Management System --> BasicConfig --> Dictionary, Set multiple gateway addresses.

![apidoc-env-en](/img/shenyu/basicConfig/apiManagement/apidoc-env-en.png)

> DictionaryType: Fill in the value must be `apidocEnv`;
>
> DictionaryCode: The identifier of the gateway address has no actual meaning. It is recommended to use `ENV_LABEL_` as a prefix, such as `ENV_LABEL_OFFLINE`;
>
> DictionaryName: Indicates the gateway type, such as filling in `test environment`, `production environment`. This value will appear on the API documentation details page;
>
> DictionaryValue: Indicates the gateway address, such as http://127.0.0.1:9195. This value will appear on the API documentation details page;
>
> DictionaryDescribe: Give a brief description of what scenario the gateway address is used for. This value will appear on the API documentation details page;
>
> Sort: The numerical value determines the display order of the gateway address;
>
> Status: open or close。

## 4. Support Multiple Ways to Aggregate API Documents

### 4.1 Add API Document Manually

Clicking the menu "Document -> API Document" to create api.

##### Create Project

If you have not created a project or you want to classify the new API into a new project, you need to create a project.

![app-create-en](/img/shenyu/basicConfig/apiManagement/app-create-en.png)

##### Add API Documentation

![create-api-en](/img/shenyu/basicConfig/apiManagement/create-api-en.png)

### 4.2 Remotely pull the swagger registration API Document.

Automatically register API documentation by remotely pulling swager documentation. Please refer to [Remote pull swagger registration API document](../api-doc/swagger-apidoc.md)

### 4.3 Shenyu Client Annotation Registration API Documentation 

Automatically register API documents through Shenyu client annotations. Please refer to [Client Registration API Documentation](../api-doc/shenyu-annotation-apidoc.md)
> This method is recommended if you do not expect to view the full interface documentation details. When you choose this automatic registration method, please turn off the registration method of remote automatic pull swagger, otherwise there will be conflicts.

## 5. Publish API

If the API has never been published and the user has not used the shenyu-client, shenyu-admin will automatically expose the API described in the API document to the gateway.

![publish-api-en](/img/shenyu/basicConfig/apiManagement/publish-api-en.png)

After clicking Save, you'll see that the registration data for the API is inserted below the selectors and rules. As shown below:

![api-published-divide-list-en](/img/shenyu/basicConfig/apiManagement/api-published-divide-list-en.png)

## 6. Offline API(optional)

> Special Note: After clicking Offline, the API will still be visible in the API document list, but it will be deleted from the proxy plug-in and metadata management list. Before you republish the API, the gateway will not proxy the API. When you pass through the gateway When requesting this API, an exception will be reported.

![offline-api-en](/img/shenyu/basicConfig/apiManagement/offline-api-en.png)

## 7. API Debug

![api-debug-en](/img/shenyu/basicConfig/apiManagement/api-debug-en.png)
