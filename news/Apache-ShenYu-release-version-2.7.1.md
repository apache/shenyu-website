---
title: "[Apache ShenYu 2.7.1 Version Release]"
description: "Apache ShenYu 2.7.1 Version Release"
categories: "Apache ShenYu"
tags: ["Apache ShenYu"]
date: 2026-07-13
slug: Apache-ShenYu-release-version-2.7.1
---

## Apache ShenYu

Apache ShenYu is a responsive API gateway developed using Java Reactor. With its high performance, dynamic and flexible traffic control, hot swap, easy deployment and other features, out of the box to provide users with a full lifecycle of 'API' gateway, including 'API' registration, service proxy, protocol conversion, 'API' documentation and 'API' governance and other functions. Apache ShenYu graduated as an Apache top-level project in 'July 2022'.

> website: https://shenyu.apache.org
>
> GitHub: https://github.com/apache/shenyu

## Version preview

Apache ShenYu released version 2.7.1. This version merged 97 pull requests, including bug fixes, improvements, and new features such as MCP server enhancements, WASM runtime migration, security hardening, and infrastructure improvements.
Version history: https://github.com/apache/shenyu/compare/v2.7.0.3...v2.7.1

## What's Changed

- fix non determinsitic tests (#6232) by @yonghanlin in [#6232](https://github.com/apache/shenyu/pull/6232)
- fix non deterministic test (#6229) by @annhchen89 in [#6229](https://github.com/apache/shenyu/pull/6229)
- Fix mcp server real url error (#6228) by @478320 in [#6228](https://github.com/apache/shenyu/pull/6228)
- fix HttpUtilsTest nondeterminism from param order (#6230) by @yonghanlin in [#6230](https://github.com/apache/shenyu/pull/6230)
- fix field-sqlmap.xml database reserved keywords (#6233) by @2823602869 in [#6233](https://github.com/apache/shenyu/pull/6233)
- fix get the argument position mapping error and test method (#6236) by @MaMengzhen in [#6236](https://github.com/apache/shenyu/pull/6236)
- add reset cache in MethodDescriptor (#6244) by @annhchen89 in [#6244](https://github.com/apache/shenyu/pull/6244)
- [Fix] the selector and rule pagination non-functional (#6239) (#6243) by @VampireAchao in [#6239](https://github.com/apache/shenyu/pull/6239)
- Fix Order Dependent Test in AiPromptPluginDataHandlerTest (#6245) by @annhchen89 in [#6245](https://github.com/apache/shenyu/pull/6245)
- Fix non deterministic caused by Hashmap (#6246) by @annhchen89 in [#6246](https://github.com/apache/shenyu/pull/6246)
- Enhance index method to build base URL from HTTP request, supporting reverse proxy scenarios (#6247) by @Aias00 in [#6247](https://github.com/apache/shenyu/pull/6247)
- modify loadbalancer (#6251) by @yu199195 in [#6251](https://github.com/apache/shenyu/pull/6251)
- feat: Introduce request body size limit, enhance AI proxy plugin's ChatClient caching with config hash, and refine prompt extraction from the request body. (#6248) by @Aias00 in [#6248](https://github.com/apache/shenyu/pull/6248)
- fix ai proxy key (#6249) by @Aias00 in [#6249](https://github.com/apache/shenyu/pull/6249)
- Refactor EtcdClient and RedisConnectionFactory for improved readability and maintainability (#6250) by @Aias00 in [#6250](https://github.com/apache/shenyu/pull/6250)
- feat: Enhance IpUtils with Docker support, improved IP filtering (#6253) by @Aias00 in [#6253](https://github.com/apache/shenyu/pull/6253)
- fix mcp tool sample error (#6259) by @MaMengzhen in [#6259](https://github.com/apache/shenyu/pull/6259)
- infra: refactor infra zk module (#6199) by @yuluo-yx in [#6199](https://github.com/apache/shenyu/pull/6199)
- feat: Rename ai proxy enhanced module to ai proxy and update related files (#6260) by @Aias00 in [#6260](https://github.com/apache/shenyu/pull/6260)
- fix NettyHttpClientPlugin doRequest response unique headers error (#6258) by @MaMengzhen in [#6258](https://github.com/apache/shenyu/pull/6258)
- fix 'addCustomHeaders' header value replace bug (#6257) by @MaMengzhen in [#6257](https://github.com/apache/shenyu/pull/6257)
- fix order dependent test (#6261) by @annhchen89 in [#6261](https://github.com/apache/shenyu/pull/6261)
- test(#5161): Improve test coverage for VersionUtils (#6264) by @airajena in [#5161](https://github.com/apache/shenyu/pull/5161)
- [#6262] Fix OrderlyExecutor resource leak in shenyu-disruptor (#6269) by @airajena in [#6269](https://github.com/apache/shenyu/pull/6269)
- Fix: Set isClosing flag in closeGracefully method as documented (#6263) by @airajena in [#6263](https://github.com/apache/shenyu/pull/6263)
- fix add custom headers error (#6268) by @MaMengzhen in [#6268](https://github.com/apache/shenyu/pull/6268)
- [ISSUE #6235] Set upstream check for each upstream. (#6272) by @jonasHanhan in [#6272](https://github.com/apache/shenyu/pull/6272)
- fix mcp config shenyu context error (#6266) by @MaMengzhen in [#6266](https://github.com/apache/shenyu/pull/6266)
- [type:fix] fix database init script (#6277) by @eye-gu in [#6277](https://github.com/apache/shenyu/pull/6277)
- chore(deps): bump org.assertj:assertj-core in /shenyu-e2e (#6278) by @dependabot[bot] in [#6278](https://github.com/apache/shenyu/pull/6278)
- Fix: Preserve Gateway's independent upstream health check state when receiving config updates from Admin (#6274) by @guanzhenxing in [#6274](https://github.com/apache/shenyu/pull/6274)
- [Security] Harden Docker images to run as non-root user (#6273) by @RinZ27 in [#6273](https://github.com/apache/shenyu/pull/6273)
- feat: Add new role search criteria (#6282) by @yangyx107 in [#6282](https://github.com/apache/shenyu/pull/6282)
- feat:sync dashboard (#6283) by @yangyx107 in [#6283](https://github.com/apache/shenyu/pull/6283)
- fix: handle tool not found error and update requestConfig type to JsonElement (#6284) by @Aias00 in [#6284](https://github.com/apache/shenyu/pull/6284)
- [type:fix] set open (#6280) by @eye-gu in [#6280](https://github.com/apache/shenyu/pull/6280)
- feat:modify instance createOrUpdate method log level (#6285) by @yangyx107 in [#6285](https://github.com/apache/shenyu/pull/6285)
- replace stream().forEach() to forEach() (#6275) by @VampireAchao in [#6275](https://github.com/apache/shenyu/pull/6275)
- fix: fix GsonUtils concurrent serialization exceptions (#6286) (#6287) by @fanpipi in [#6286](https://github.com/apache/shenyu/pull/6286)
- fix: enhance logging and improve request handling in HTTP client plugins (#6288) by @Aias00 in [#6288](https://github.com/apache/shenyu/pull/6288)
- fix mcp streamable (#6289) by @Aias00 in [#6289](https://github.com/apache/shenyu/pull/6289)
- feat: refactor aiRequest and aiResponse models to support asynchronou… (#6296) by @478320 in [#6296](https://github.com/apache/shenyu/pull/6296)
- feat: add CORS support with configurable allowed headers in MCP server (#6295) by @Aias00 in [#6295](https://github.com/apache/shenyu/pull/6295)
- fix: improve upstream cache management and add recovery test for empty events (#6294) by @Aias00 in [#6294](https://github.com/apache/shenyu/pull/6294)
- fix: improve MCP server plugin path handling and backward compatibility for argsPosition (#6293) by @Aias00 in [#6293](https://github.com/apache/shenyu/pull/6293)
- Fix: loggion console add rule bug (#6291) by @yangyx107 in [#6291](https://github.com/apache/shenyu/pull/6291)
- [type:fix] remove java 18 ci (#6306) by @moremind in [#6306](https://github.com/apache/shenyu/pull/6306)
- [type:refactor] remove shenyu trie cache (#6303) by @moremind in [#6303](https://github.com/apache/shenyu/pull/6303)
- chore(deps): bump oshi from 6.7.0 to 6.10.0 (#6301) by @yangpixi in [#6301](https://github.com/apache/shenyu/pull/6301)
- chore(deps): bump org.apache.zookeeper:zookeeper from 3.9.4 to 3.9.5 (#6302) by @dependabot[bot] in [#6302](https://github.com/apache/shenyu/pull/6302)
- fix: replace Collections.EMPTY_MAP with Collections.emptyMap() (#6299) by @Senrian in [#6299](https://github.com/apache/shenyu/pull/6299)
- Fix: RuleServiceImpl#searchByPage() Selectors now populated from namespace only when condition selectors are null or empty. (#6305) by @bruce121 in [#6305](https://github.com/apache/shenyu/pull/6305)
- fix(common): align PluginEnum sort values with DB schema.sql (#6310) (#6311) by @bwangll in [#6310](https://github.com/apache/shenyu/pull/6310)
- infra(ci): add CI action condition (#6316) by @yuluo-yx in [#6316](https://github.com/apache/shenyu/pull/6316)
- feat(mcp-server): enhance SDK compatibility with reflection caching and error handling (#6312) by @Aias00 in [#6312](https://github.com/apache/shenyu/pull/6312)
- Align SSRF URL validation with OkHttp parsing (#6321) by @Aias00 in [#6321](https://github.com/apache/shenyu/pull/6321)
- Hide registry passwords from admin API responses (#6322) by @Aias00 in [#6322](https://github.com/apache/shenyu/pull/6322)
- Block redirect-based SSRF bypass in Swagger imports (#6320) by @Aias00 in [#6320](https://github.com/apache/shenyu/pull/6320)
- Fix missing RBAC on selector, rule, and data-permission endpoints (#6319) by @Aias00 in [#6319](https://github.com/apache/shenyu/pull/6319)
- Ci update cache (#6325) by @2823602869 in [#6325](https://github.com/apache/shenyu/pull/6325)
- chore(deps): bump org.apache.kafka:kafka-clients from 3.9.1 to 3.9.2 (#6324) by @dependabot[bot] in [#6324](https://github.com/apache/shenyu/pull/6324)
- Stop exposing login AES secrets to anonymous callers (#6323) by @Aias00 in [#6323](https://github.com/apache/shenyu/pull/6323)
- chore(deps): bump org.bouncycastle:bcprov-jdk18on from 1.78 to 1.84 (#6331) by @dependabot[bot] in [#6331](https://github.com/apache/shenyu/pull/6331)
- test(task#5161): improve test coverage for sync. (#6333) by @wy471x in [#6333](https://github.com/apache/shenyu/pull/6333)
- test(task#5161): improve test coverage for admin. (#6328) by @wy471x in [#6328](https://github.com/apache/shenyu/pull/6328)
- Fix websocket client spec builder reuse in plugin config (#6330) by @zhaoguhong in [#6330](https://github.com/apache/shenyu/pull/6330)
- chore(deps): bump com.sun.mail:jakarta.mail from 2.0.1 to 2.0.2 (#6329) by @dependabot[bot] in [#6329](https://github.com/apache/shenyu/pull/6329)
- Prevent duplicate full-mode URI heartbeats after repeated context refresh (#6337) by @Aias00 in [#6337](https://github.com/apache/shenyu/pull/6337)
- [type:refactor] remove motan support (#6307) by @Aias00 in [#6307](https://github.com/apache/shenyu/pull/6307)
- fix: correct instanceof check in addFailureUriDataRegister (#6345) by @eye-gu in [#6345](https://github.com/apache/shenyu/pull/6345)
- fix(ai-prompt): preserve all original messages in decorateBody (#6343) by @eye-gu in [#6343](https://github.com/apache/shenyu/pull/6343)
- fix: replace ArrayList with CopyOnWriteArrayList to avoid ConcurrentModificationException in URI heartbeat (#6352) by @eye-gu in [#6352](https://github.com/apache/shenyu/pull/6352)
- fix: eliminate race condition in UpstreamCheckServiceTest.testReplace (#6355) by @eye-gu in [#6355](https://github.com/apache/shenyu/pull/6355)
- Fix README documentation links (#6357) by @SPUERSAIYAN in [#6357](https://github.com/apache/shenyu/pull/6357)
- Codex/fix sandbox response leak (#6359) by @SPUERSAIYAN in [#6359](https://github.com/apache/shenyu/pull/6359)
- Stabilize k8s ingress startup healthchecks (#6361) by @Aias00 in [#6361](https://github.com/apache/shenyu/pull/6361)
- Stabilize Sentinel integrated rate-limit assertions (#6374) by @Aias00 in [#6374](https://github.com/apache/shenyu/pull/6374)
- Stabilize HTTP E2E compose startup readiness (#6363) by @Aias00 in [#6363](https://github.com/apache/shenyu/pull/6363)
- Stabilize Sentinel CI assertion for PR 6375 (#6377) by @Aias00 in [#6377](https://github.com/apache/shenyu/pull/6377)
- [ISSUE 6334] : Add uri validation for regex and other operators. (#6335) by @hengyuss in [#6335](https://github.com/apache/shenyu/pull/6335)
- fix(netty): support configurable httpRequestDecoder properties (#6378) by @hqbhonker in [#6378](https://github.com/apache/shenyu/pull/6378)
- Fix RocketMQ logging e2e bootstrap startup (#6379) by @Aias00 in [#6379](https://github.com/apache/shenyu/pull/6379)
- fix(request): make add operations append existing values (#6375) by @SouthwestAsiaFloat in [#6375](https://github.com/apache/shenyu/pull/6375)
- fix: skip request body for GET and HEAD requests (#6350) by @zongmingzhi in [#6350](https://github.com/apache/shenyu/pull/6350)
- fix(ci): remove maven cache save to avoid incomplete cache pollution (#6383) by @eye-gu in [#6383](https://github.com/apache/shenyu/pull/6383)
- [type:refactor] replace inactive wasmtime-java with chicory pure-Java WASM runtime (#6356) by @eye-gu in [#6356](https://github.com/apache/shenyu/pull/6356)
- Prerelease/fix license (#6387) by @Aias00 in [#6387](https://github.com/apache/shenyu/pull/6387)
- fix:fix local springmvc client cant register success (#6395) by @hengyuss in [#6395](https://github.com/apache/shenyu/pull/6395)
- fix: DividePlugin specify-domain header to prevent cache pollution and restrict to configured upstreams (#6412) by @hengyuss in [#6412](https://github.com/apache/shenyu/pull/6412)
- fix: Enforce account enabled check on every authenticated request in ShiroRealm [#6399] (#6415) by @hengyuss in [#6415](https://github.com/apache/shenyu/pull/6415)
- fix(admin): limit swagger import response body size (#6411) by @SouthwestAsiaFloat in [#6411](https://github.com/apache/shenyu/pull/6411)
- fix: Add decompression size limits to ZipUtil.unzip()[#6400] (#6416) by @hengyuss in [#6416](https://github.com/apache/shenyu/pull/6416)
- fix: add mounts for external libraries in docker-compose to prevent startup issues (missing database connector driver) when using an external database datasource other than H2 (#6389) (#6391) by @exyb in [#6389](https://github.com/apache/shenyu/pull/6389)
- [fix] Add missing permission annotations to /appAuth/updateSk and /sandbox/proxyGateway (#6388) by @Aias00 in [#6388](https://github.com/apache/shenyu/pull/6388)
- Require permission for namespace plugin sync (#6384) by @Aias00 in [#6384](https://github.com/apache/shenyu/pull/6384)
- fix: use come.google.re2j replace java.util.regex in RegexPredicateJu… (#6410) by @hengyuss in [#6410](https://github.com/apache/shenyu/pull/6410)
- fix: Remove appSecret from sandbox-beforesign response header[#6402] (#6417) by @hengyuss in [#6417](https://github.com/apache/shenyu/pull/6417)

## New Contributors

- @2823602869 made their first contribution in [#6233](https://github.com/apache/shenyu/pull/6233)
- @airajena made their first contribution in [#6264](https://github.com/apache/shenyu/pull/6264)
- @bruce121 made their first contribution in [#6305](https://github.com/apache/shenyu/pull/6305)
- @bwangll made their first contribution in [#6311](https://github.com/apache/shenyu/pull/6311)
- @exyb made their first contribution in [#6391](https://github.com/apache/shenyu/pull/6391)
- @fanpipi made their first contribution in [#6287](https://github.com/apache/shenyu/pull/6287)
- @hengyuss made their first contribution in [#6335](https://github.com/apache/shenyu/pull/6335)
- @hqbhonker made their first contribution in [#6378](https://github.com/apache/shenyu/pull/6378)
- @jonasHanhan made their first contribution in [#6272](https://github.com/apache/shenyu/pull/6272)
- @RinZ27 made their first contribution in [#6273](https://github.com/apache/shenyu/pull/6273)
- @Senrian made their first contribution in [#6299](https://github.com/apache/shenyu/pull/6299)
- @SouthwestAsiaFloat made their first contribution in [#6375](https://github.com/apache/shenyu/pull/6375)
- @SPUERSAIYAN made their first contribution in [#6357](https://github.com/apache/shenyu/pull/6357)
- @wy471x made their first contribution in [#6333](https://github.com/apache/shenyu/pull/6333)
- @yangpixi made their first contribution in [#6301](https://github.com/apache/shenyu/pull/6301)
- @yangyx107 made their first contribution in [#6282](https://github.com/apache/shenyu/pull/6282)
- @yonghanlin made their first contribution in [#6232](https://github.com/apache/shenyu/pull/6232)
- @zhaoguhong made their first contribution in [#6330](https://github.com/apache/shenyu/pull/6330)
- @zongmingzhi made their first contribution in [#6350](https://github.com/apache/shenyu/pull/6350)

## Become a contributor

We welcome every contributor to join ShenYu, and welcome contributors to participate in ShenYu in the spirit of Apache Way!

See the contributor guidelines:

> https://shenyu.apache.org/zh/community/contributor-guide
