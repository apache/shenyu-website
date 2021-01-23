---
title: Hmily Term
keywords: Term
description: Hmily Term
---

### Term

* Initiator: The initiator of a global transaction, the first place where transactions need to be performed on distributed resources in a request link resource method. 
 In the Hmily framework, it can be expressed as: a request first encounters `@HmilyTCC` or `@HmilyTAC` annotated method, the method which application belongs to is called the
  initiator.
  
* Participants: Distributed services or resources that need to participate in a distributed transaction scenario together with other services. In the Hmily framework, it's
 showed as an interface that appears as an RPC framework is annotated with `@Hmily`.

* Coordinator: The role used to coordinate distributed transactions is commit or rollback. It can be remote, local, centralized, or decentralized. The coordinator in the Hmily framework is a local decentralized role.

* TCC ：Abbreviation for the three stages of `Try`, `Confirm`, and `Cancel`.

* TAC ：Short for Try Auto Cancel. Hmily framework will automatically generate the reverse operation resource behavior after the resources are reserved in the `Try` stage.