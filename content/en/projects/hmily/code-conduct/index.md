---
title: Hmily-code-conduct
keywords: Hmily-code-conduct
description: hmily development guidelines
---

## Development Guidelines

 - **Intentions** Write codes with heart. Pursue clean, simplified and extremely elegant codes.
 - **Readable** The code is unambiguous, and the intention of the code is revealed through reading rather than debugging.
 - **Tidy** Agree with concepts in <Refactoring: Improving the Design of Existing Code> and <Clean Code: A Handbook of Agile Software Craftsmanship>.
 - **Consistent** Be familiar with codes already had, to keep consistent with the style and use.
 - **Simplified** Express meaning with the least code. Highly reusable, no duplicated codes or configurations. Delete codes out of use in time.
 - **Abstract** The levels are clearly divided and the concepts are reasonably refined. Keep methods, classes, packages and modules at the same abstract level.

## Contributor Covenant Submitting of Conduct

 - Make sure all the test cases are passed, Make sure `./mvnw clean install` can be compiled and tested successfully.
 - Make sure the test coverage rate is not lower than the master branch.
 - Make sure to check codes with Checkstyle. codes that violate check rules should have special reasons. Find checkstyle template from `https://github.com/dromara/hmily/blob/master/script/hmily_checkstyle.xml`, please use checkstyle 8.8 to run the rules.
 - Careful consideration for each pull request; Small and frequent pull request with complete unit function is welcomed.
 - Conform to Contributor Covenant Code of Conduct below.
 
## Contributor Covenant Code of Conduct

 - Use linux line separators.
 - Keep indents (including blank lines) consistent with the previous one.
 - Keep one blank line after class definition.
 - No meaningless blank lines. Please extract private methods to instead of blank lines if too long method body or different logic code fragments.
 - Use meaningful class, method and variable names, avoid to use abbreviate.
 - Return values are named with `result`; Variables in the loop structure are named with each; Replace each with entry in map.
 - Name property files with `Spinal Case`(a variant of `Snake Case` which uses hyphens `-` to separate words).
 - Split codes that need to add notes with it into small methods, which are explained with method names.
 - Have constants on the left and variable on the right in `==` and `equals` conditional expressions; Have variable on the left and constants on the right in `greater than` and `less than` conditional expressions.
 - Beside using same names as input parameters and global fields in assign statement, avoid using `this` modifier.
 - Design class as final class except abstract class for extend.
 - Make nested loop structures a new method.
 - The order of definition of member variables and the order of parameter passing are kept consistent in each class and method.
 - Order of members definition and parameters should be consistent during classes and methods.
 - Use guard clauses in priority.
 - Minimize the access permission for classes and methods.
 - Private method should be just next to the method in which it is used; writing private methods should be in the same as the appearance order of private methods.
 - No null parameters or return values.
 - Replace `if` `else` return and assign statement with ternary operator in priority.
 - Use `LinkedList` in priority. Use `ArrayList` for use index to get element only.
 - Use capacity based Collection such as `ArrayList`, `HashMap` must indicate initial capacity to avoid recalculate capacity.
 - Use English in all the logs and javadoc.
 - Include Javadoc, todo and fixme only in the comments.
 - Only public classes and methods need javadoc, other methods, classes and override methods do not need javadoc.