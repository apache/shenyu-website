---
sidebar_position: 2
title: Upgrade to 2.7.2
keywords: ["upgrade", "2.7.2", "migration"]
description: Upgrade Apache ShenYu to 2.7.2, including database, configuration, and integration changes.
---

This guide covers the released `v2.7.2` source and distributions. Read the [release notes](https://github.com/apache/shenyu/blob/v2.7.2/RELEASE-NOTES.md) and compare the release configuration with your deployment before replacing Admin or Bootstrap. Keep the existing configuration and database backups together with the previous binaries for rollback.

## Runtime and dependencies

Use JDK 17 or later. The release uses Spring Boot `3.5.16`, Spring Cloud `2025.0.3`, and H2 `2.3.232`. Custom gateways and extensions must align their dependency management with the [release POM](https://github.com/apache/shenyu/blob/v2.7.2/pom.xml); do not combine ShenYu 2.7.2 with the old Spring Boot 2.x examples. Set `shenyu.version` to `2.7.2` when following examples that use that Maven property. `${project.version}` examples refer to the version of the ShenYu source checkout; replace it with `2.7.2` in an independently versioned application.

The release notes also describe unresolved dependency advisories and the affected configurations. A version upgrade alone does not establish that every optional integration is unaffected.

## Database migration and upgrade order

Fresh installations use the [v2.7.2 initialization scripts](https://github.com/apache/shenyu/tree/v2.7.2/db/init). Existing installations need migrations; initialization scripts do not upgrade an existing schema.

1. Stop all Admin writers and back up the database, configuration, and existing binaries. Keep gateway configuration synchronized before stopping Admin.
2. For an existing 2.7.1 MySQL, PostgreSQL, Oracle, openGauss, or OceanBase database, apply the matching `2.7.1-upgrade-2.7.2-<dialect>.sql` from the [release upgrade directory](https://github.com/apache/shenyu/tree/v2.7.2/db/upgrade). This includes data-permission deduplication and durable instance heartbeat timestamps. Earlier releases must apply their intervening migrations first.
3. **The v2.7.2 release also requires the scripts named `2.7.2-upgrade-2.7.3-<dialect>.sql`.** Despite their filenames and older headings in the upstream upgrade guide, these scripts are included in this release and its release notes require them. Review and run the complete script for your dialect once. It includes the `loged` column rename, instance identity uniqueness, API-debug header storage changes, and additional release schema changes. Do not skip it based on the filename, or rerun it blindly.
4. Upgrade all Bootstrap instances before, or together with, Admin. A new Admin emits `logged`, which older Bootstrap instances do not understand. Keep Admin stopped until the schema migration and compatible Bootstrap deployment are complete.
5. Start Admin with the required JWT signing key, verify login and configuration synchronization, then test representative routes and plugins before restoring normal configuration writes.

The MySQL column-rename statements use MySQL 8.0 syntax. For MySQL 5.7, review the equivalent `CHANGE COLUMN` statements against the existing column definitions. Instance identity uniqueness also requires a modern InnoDB index format; do not substitute truncated prefix indexes. See the [release database upgrade guide](https://github.com/apache/shenyu/blob/v2.7.2/db/upgrade/upgrade-guide.md) for deduplication rules and dialect-specific requirements.

### Persistent H2 databases

The H2 driver changes from `1.4.200` to `2.3.232`. Do not open an old persistent database file directly with the new driver.

1. Stop Admin writers and back up the original database.
2. Export the database with `SCRIPT` using H2 1.4.200.
3. Import into a fresh H2 2.3.232 database with `RUNSCRIPT FROM 'backup.sql' FROM_1X`, following the [H2 migration guide](https://www.h2database.com/html/migration-to-v2.html).
4. Apply the release schema changes to the imported database. For databases predating 2.7.2, add `instance_info.last_heart_beat_time BIGINT DEFAULT 0 NOT NULL` before applying the release's `2.7.2-upgrade-2.7.3-h2.sql`; review the other intervening schema changes against the release initialization schema.
5. Verify the migrated data and schema before pointing Admin at the new database.

The default in-memory H2 database has no persistent file to migrate. Rollback requires the previous Admin binaries and the original database backup together; do not point old binaries at the migrated database.

## Admin authentication and API clients

Set `shenyu.jwt.secret-key` explicitly, or supply `SHENYU_JWT_SECRETKEY`. Admin refuses to start with a blank key or the old public/default keys. All Admin instances must use the same signing key. Upgrade and rollback invalidate existing login sessions, so users must log in again. See [Admin configuration](../user-guide/property-config/admin-property-config.md#shenyujwt-config).

The `selector` and `rule` database columns, Admin REST DTOs/VOs, and gateway `RuleData` use `logged` instead of `loged`. During the compatibility window, Admin still accepts the old REST request field through an alias, but responses use `logged`; update clients that read the response field. Stored rate-limiter handle JSON still accepts the old spelling. Admin disables Shiro RememberMe; custom security-manager integrations must preserve that behavior unless they independently migrate to a fixed implementation.

## Gateway configuration and routing

* HTTP keep-alive now defaults to `true`; the connection pool defaults to `FIXED`, with a `3000` ms acquisition timeout. Size `pool.maxConnections` for the deployment and set `pool.maxIdleTime` below the upstream idle timeout. `keepAlive: false` and `pool.type: ELASTIC` restore the respective former behaviors when needed.
* `responseTimeout` defaults to `3000` ms and limits gaps between response reads, including after headers. Review SSE, long-polling, and token streams. A non-positive value disables only this deadline; separately configured read/idle handlers, route deadlines, retries, and caller timeouts still apply.
* Review the total retry budget as well as the per-attempt timeout. For the `current` strategy, exceeding the aggregate budget returns HTTP 504, while exhausting retries returns HTTP 408. See the release notes for the strategy-specific budget formula.
* Match caching uses `selectorMatchCache.cache` and `ruleMatchCache.cache`. Remove the old `trie` sections and review path-only eligibility and the TTL bound in [Gateway configuration](../user-guide/property-config/gateway-property-config.md).
* Invalid CORS `origin-regex` expressions now fail gateway startup. Validate them before rollout.
* Divide `headerMaxSize` counts names, values, line framing, and the terminating CRLF. Review limits for requests near the old boundary.
* `leastActive` now counts active WebSocket sessions and Apache Dubbo gray-route calls. `shortestResponse` outside Divide and the gRPC/TCP/Java SDK paths retain the fallbacks described in the release notes.
* Changing the MCP server selector's message endpoint rebuilds its SSE transport. Existing clients must reconnect and initialize again.

## Registry providers and extension APIs

SDK libraries, SDK starters, and `shenyu-registry-core` no longer supply registry implementations transitively. Declare the provider matching `registerType`, at version `2.7.2`, on the application's runtime classpath:

| Registry | Artifact |
| --- | --- |
| ZooKeeper | `shenyu-registry-zookeeper` |
| etcd | `shenyu-registry-etcd` |
| Nacos | `shenyu-registry-nacos` |
| Eureka | `shenyu-registry-eureka` |
| Kubernetes | `shenyu-registry-kubernetes` |
| Apollo | `shenyu-registry-apollo` |

`shenyu-spring-boot-starter-registry` retains its five-provider compatibility aggregate; Apollo remains explicit. Consul and Polaris require a separately supplied compatible SPI implementation. `shenyu.sdk.register-type=local` needs no registry implementation. See the [release provider guide](https://github.com/apache/shenyu/blob/v2.7.2/shenyu-registry/README.md).

Custom `DiscoveryUpstreamDataSubscriber` implementations must replace `unSubscribe(DiscoverySyncData)` with `unSubscribe(DiscoveryUpstreamKey)` and recompile. `MemorySafeLRUMap` is deprecated but retained; `WindowTinyLFUMap` uses an entry-count bound and is not a drop-in equivalent for memory-pressure eviction. The unused `MemorySafeWindowTinyLFUMap` was removed. Apollo adapters are deprecated for transfer to plugin-store but remain available in this release; follow the [Apollo migration guide](https://github.com/apache/shenyu/blob/v2.7.2/docs/plugin-store-apollo.md).

## External plugin migration

Motan, SOFA, Tars, Hystrix, Casdoor, and Consul sync/registry extensions are not supplied by the default distribution. Install compatible [plugin-store](https://github.com/apache/shenyu-plugin-store) releases and preserve existing plugin configuration; do not assume the core gateway version is an extension release version. Follow the release-specific cutover guides for [Consul](https://github.com/apache/shenyu/blob/v2.7.2/docs/plugin-store-consul.md), [Casdoor](https://github.com/apache/shenyu/blob/v2.7.2/docs/plugin-store-casdoor.md), and [Hystrix](https://github.com/apache/shenyu/blob/v2.7.2/docs/plugin-store-hystrix.md). Hystrix is legacy compatibility support; new deployments should use Resilience4j.

## AI and optional features

* [AI Request Transformer](../plugin-center/ai/ai-request-transformer.md) replays the original body when transformation fails and preserves downstream errors without executing the chain twice.
* [Sensitive Word](../plugin-center/ai/ai-sensitive-word.md) applies `failClosed` when inspection is unavailable and checks decoded JSON string values, including Unicode escapes. A cached dictionary or rule-local words can still supply inspection when a Redis refresh fails.
* [AI Token Limiter](../plugin-center/ai/ai-token-limiter.md) reads protocol-defined output usage fields instead of similarly named fields in generated content or metadata.
* Agent Gateway's default order changes from `198` to `169`. Review overlapping MCP selectors and custom orders. Its plugin configuration accepts only `aggregation`; existing arbitrary fields must be removed before save/import. Tools, remote aggregation, HTTP tools, resources, and structured-content filtering remain opt-in and require their documented authorization and failure handling. See the [release notes](https://github.com/apache/shenyu/blob/v2.7.2/RELEASE-NOTES.md).
* Cache request coalescing remains disabled unless `singleFlightEnabled` is enabled. It coordinates only within one gateway instance and preserves cache eligibility and fallback behavior.
* WASM execution deadlines and memory limits remain disabled by default. Review the [limits contract](https://github.com/apache/shenyu/blob/v2.7.2/docs/wasm-execution-limits.md) before enabling them.

## Verify and roll back

Verify Admin login, selector/rule updates reaching every gateway, representative HTTP/RPC routes, stream behavior, registry discovery, and enabled AI plugins. Compare errors, latency, connection-pool saturation, and token usage with the pre-upgrade behavior.

If verification fails, stop writes and restore the previous binaries, configuration, and matching database backup as one rollback. Changes written after the backup need a separate recovery plan. Log in again after rollback. Keep 2.7.1 documentation available for the old deployment; do not rewrite historical examples to 2.7.2.
