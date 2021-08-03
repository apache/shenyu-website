---
title: Configuration Flow Introduction
keywords: Apache ShenYu
description: Configuration Flow Introduction
---

## Description

* This article introduces the flow of synchronizing to the gateway after the data operation of `shenyu-admin` backend system.

## Usage

* User can arbitrary modify data in shenyu-admin backend and this will immediately synchronize to the jvm memory of the gateway.
* Synchronize the plugin data of ShenYu, selector,rule data, metadata, signature data, etc.
* All the rules of plugin selectors are dynamically configured and take effect immediately without restarting the service.

* Data Flow Chart:
 ![](/img/shenyu/dataSync/plugin-data.png)

## Feature

* All the configurations of user can be dynamically updated, there is no need to restart the service for any modification.
* Local cache is used to provide efficient performance during high concurrency.
