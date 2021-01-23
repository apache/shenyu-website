---
title: Hmily-tcc
keywords: tcc
description: tcc
---

### TCC

The `TCC` Mode is a classic flexible transaction solution that needs the users to provided `try`, `confirm`, `cancel` methods.
The `try`, `confirm` methods will be invoked under normal circumstances,and the `try`, `cancel` methods will be invoked as an exception occurs. the `confirm` method is not required,it entirely depends on the users how to implement the `try` method. the both `confirm` and `cancel` method also need the users to guarantee the idempotency, but it will bring addtional workload to the users. Because after the `try` method finished, the data had been committed. But with this,the performances will be even better. A good system design is very applicable to the `TCC` Mode. This is the flow diagram of `TCC` in `Hmily` framework as below:
![](https://yu199195.github.io/images/hmily/hmily-tcc.png) 


* In extreme cases, such as sudden service crash, timeout exceptions, and much more, the transaction recovery of the log depends on its own calling task.

* At the both `confirm` and `cancel` stage,if there are any exception occur, the corresponding stage will continue to be executed. If the maximum number of retries is exceeded, the transaction has not succeeded, 
It will not retry any more, then manual intervention is required at this time.

* In the case of a service cluster, the users need to do the best to ensure the idempotence of these two methods `confirm`, `cancel`.

