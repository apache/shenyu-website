---
title: "[Apache ShenYu 2.7.2 Version Release]"
description: "Apache ShenYu 2.7.2 Version Release"
categories: "Apache ShenYu"
tags: ["Apache ShenYu"]
date: 2026-11-06
slug: Apache-ShenYu-release-version-2.7.2
---

## Apache ShenYu 2.7.2

Apache ShenYu 2.7.2 is now available. This release includes the changes from
2.7.1 through the approved RC4 candidate.

<!-- truncate -->

Release information:

- GitHub Release: https://github.com/apache/shenyu/releases/tag/v2.7.2
- Source and binary distributions: https://shenyu.apache.org/download/
- Maven Central: https://central.sonatype.com/namespace/org.apache.shenyu
- Release notes: https://github.com/apache/shenyu/blob/v2.7.2/RELEASE-NOTES.md
- Full changelog: https://github.com/apache/shenyu/compare/v2.7.1...v2.7.2

## Highlights

- Request Transformer replays one-shot request bodies and preserves downstream
  execution errors.
- Sensitive-word inspection honors `failClosed` when Redis is unavailable and
  decodes JSON Unicode escapes before inspection.
- Token Limiter scopes usage accounting to provider protocol fields.
- Dependencies are aligned with Spring Boot 3.5 and the Spring Cloud 2025.0.3
  release train, with migration notes for H2 2.x and the `logged` field change.
- Maven and distribution LICENSE/NOTICE materials, dashboard resources, and
  source archives were audited and corrected.

Please verify the downloaded files with the published SHA-512 checksums and PGP
signatures using the Apache ShenYu KEYS file.
