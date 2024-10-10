# Namespace Management

## 1. Background and Explanation

Currently, when managing gateways for different business line needs, multiple sets of ShenYu Admin and ShenYu Gateway are often deployed simultaneously. To ensure data independence, each gateway usually connects to only one ShenYu Admin. However, this architecture increases user and operational costs. To provide a more convenient user experience, ShenYu Admin introduces namespaces for data isolation, allowing management of gateway data across different business lines with just one set of ShenYu Admin and ShenYu Bootstrap services.

Note: To facilitate usage, a default namespace already exists in the system; please do not manually delete the default namespace records in the database.

## 2.Usage Process

### 1.Create a New Namespace

Users log into the ShenYu Admin backend and select 【Basic Config - Namespace】.

![](/img/shenyu/basicConfig/namepsace/namespace-manager.png)

In the namespace management module, click Add Data to create a new namespace. Simply fill in the 【Name】 and 【Description】 fields; the system will automatically generate a namespaceId.

![](/img/shenyu/basicConfig/namepsace/namespace-add.png)

After successful creation, a unique namespaceId will be automatically generated.

![](/img/shenyu/basicConfig/namepsace/namespace-Id.png)

### 2.Configure Namespace for Downstream Services (shenyu-client)

Once you have the namespaceId, you can configure it in the downstream services (already integrated with shenyu-client) in the configuration file to use one or more namespaceIds.

![](/img/shenyu/basicConfig/namepsace/namespace-shenyu-client.png)

### 3.Manage Data the Namespace

Once data from Shenyu-client is registered under the specified namespace in Shenyu-admin, the backend management supports isolated gateway data. Users can switch between different namespaces for operations via the button in the upper right corner.

![](/img/shenyu/basicConfig/namepsace/namespace-divide.png)

### 4.Configure Namespace for Gateway (bootstrap)

Note: A gateway can only bind to a single unique namespaceId

![](/img/shenyu/basicConfig/namepsace/namespace-bootstrap.png)

## 3.Important Changes

#### 1. The concept of Plugins in the old version has changed to Plugin Templates. The current Plugin model is now under the namespace, while in the database, Plugin Templates correspond to the plugin table, and Plugins correspond to the namespace_plugin_rel table.

#### 2. The Apidoc module has been decoupled from selectors, Rules, etc.

