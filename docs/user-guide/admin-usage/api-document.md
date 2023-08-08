---
title: API Document Management
keywords: ["api doc"]
description: API document management
---

## Design Notes

When the front and back end are jointly debugged, it is usually necessary for the back end to give documents to detail the input and output of the interface; 

After the backend development is complete, you need to test whether the access gateway is successful. 

In order to reduce the sense of fragmentation and improve the user experience of front-end and back-end development, it is necessary to see the API documentation in shenyu-admin and test the API directly.

## How to use

The brief introduce is as follows.
- Back-end development produces API documents in shenyu-admin (both `manual` and `client registration` are supported, and `client registration` is currently recommended).
- The frontend looks at the API documentation in shenyu-admin and starts development.
> During joint debugging, developers (including front-end and backend) may use the testing function in shenyu-admin to request APIs directly.

Now, let's look how to operation step by step:

### Add API Document Manually

Clicking the menu "Document -> API Document" to create tag and api.

> For the API registration documentation through the client, please refer to [Client Registration API Documentation](../api-document-register.md)

#### Add tag

Tags are used to classify API documents, and you can hang both APIs and tags under the tags, and there is no hierarchical limit.
<img src="/img/shenyu/basicConfig/apiManagement/create-tag-1-en.png" width="80%" height="50%" />

<img src="/img/shenyu/basicConfig/apiManagement/create-tag-2-en.png" width="80%" height="50%" />

#### Add API Document

<img src="/img/shenyu/basicConfig/apiManagement/create-api-en.png" width="80%" height="50%" />

The list here is the API documentation we're adding.

### Swagger Document

#### Publish API

If the API has never been published and the user has not used the shenyu-client, shenyu-admin will automatically expose the API described in the API document to the gateway.

<img src="/img/shenyu/basicConfig/apiManagement/publish-api-en.png" width="80%" height="50%" />

#### Offline API(optional)

> Notice: After clicking offline, the API document will still be visible, but the interface exposed to the gateway will immediately become invalid.

<img src="/img/shenyu/basicConfig/apiManagement/offline-api-en.png" width="80%" height="50%" />

### API Debug

<img src="/img/shenyu/basicConfig/apiManagement/api-debug-en.png" width="80%" height="50%" />
