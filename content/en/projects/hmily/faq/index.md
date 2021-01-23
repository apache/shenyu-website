---
title: Questions
keywords: FAQ
description: Frequently asked questions
---

### I have imported the jar package to my project, but found that my project cannot be started, what should I do if any error reported?

* Answer : When you meet this kind of error, it requires you to locate the problem yourself, you can check the items as bellow:
    * check whether the framework configuration is carried out according to the document
    * whether your project runtime environment is correct
    * whether there is any dependency conflict problem
 
 If your problem is still present after above check items, you can provide an issue on github of this project, our team will provide technique support as soon as possible.

### What if the microservice act as abnormal, but the transaction was not rolled back?

* Answer : First of all, you can check the transaction log records. If the transaction log records exist, the rollback will be performed after the scheduled time you configured.

### What should I do if I compile the source code and found that the get and set methods are missing?

* Answer : The source code uses lombok, you may need to install the corresponding plug-in in your development tool. (No set get method does not affect the operation).