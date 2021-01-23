---
title: Hmily-TAC
keywords: tac
description: Hmily-TAC
---

### TAC

The `TAC` mode is actually a variant of the `TCC` mode. Just as the name implies, the `TAC` mode is called automatic rollback. As compared with the `TCC` mode, the user doesn't have to concern about how to write the rollback method at all.
and then it can reduces user development volume and is entirely transparent to users.

* `TAC` Mode is only suitable for Relational Database.

* `TAC` Mode will intercept the user's SQL statement to generate reverse rollback SQL, and the compatibility of SQL will also be a ordeal.
