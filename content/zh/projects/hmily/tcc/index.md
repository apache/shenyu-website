---
title: Hmily-TCC
keywords: tcc
description: Hmily-TCC
---

### TCC

TCC模式是经典的柔性事务解决方案，需要使用者提供 `try`, `confirm`, `cancel` 三个方法，
真正的情况下会执行 `try`, `confirm`, 异常情况下会执行`try`, `cancel`。 `confirm` 方法并不是
必须的，完全依赖于用户的`try` 方法如何去写。 `confirm`, `cancel` 2个方法也需要用户去保证幂等性,
这会附加一定的工作量，由于在`try`方法完成之后，数据已经提交了，因此它并不保证数据的隔离性。但是这样，它的
性能相对较高，一个好的系统设计，是非常适用适用`TCC`模式。下面是`Hmily` 框架的 `TCC` 流程图
![](https://yu199195.github.io/images/hmily/hmily-tcc.png) 


* 在极端异常情况下，比如服务突然宕机，超时异常等，依赖与自身的调用任务，来进行日志的事务恢复。

* 在`confirm`, `cancel` 阶段，如果有任何异常会继续执行相应的阶段，如果超过最大重试次数还未成功，将不再进行重试，需要人工介入。

* 在服务集群的情况下，`confirm`, `cancel` 2个方法用户去尽量保证其幂等性。

