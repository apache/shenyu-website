---
title: Hmily-tac
keywords: tac
description: tac
---

### TAC

`TAC`模式其实是`TCC`模式的变种,顾名思义 `TAC` 模式被称为自动回滚,相比于 `TCC`模式，用户完全不用关心
回滚方法如何去写，减少了用户的开发量，对用户完全透明。

* `TAC` 模式只适合于关系型数据库。

* `TAC` 模式会拦截用户的SQL语句生成反向回滚SQL，SQL的兼容度也会是一大考验。