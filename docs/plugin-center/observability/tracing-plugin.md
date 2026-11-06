---
title: Tracing Plugin
keywords: ["Tracing", "OpenTelemetry", "OTLP", "traceparent", "Jaeger", "Tempo"]
description: Distributed tracing of Apache ShenYu Gateway
---

# 1. Overview

## 1.1 Plugin Name

* Tracing plugin

## 1.2 What It Does

The tracing plugin traces a request across the client, the gateway and the upstream service with
[OpenTelemetry](https://opentelemetry.io/):

* **Inbound context**: the W3C `traceparent` and `tracestate` headers and the W3C `baggage` of the
  client are read. A request which carries no valid context starts a new trace.
* **One server span per request**: the gateway creates the OpenTelemetry span of the request, named
  from the method and the matched route, and records the routing information and the outcome.
* **Outbound context**: the context of the gateway span is injected into the outgoing HTTP request, so
  the upstream continues the same trace and its span becomes a child of the gateway span.
* **Export**: the spans are exported over OTLP over HTTP to any compatible collector (Jaeger, Tempo,
  the OpenTelemetry Collector, ...), when an endpoint is configured.
* **Log correlation**: the trace id of the request is exposed through the `shenyu-agent-trace-id`
  exchange attribute, which the logging plugins write into their access log record.

The plugin runs before the other plugins of the chain (its order is `0`, and only the global handler
is ordered below it), so its span covers every other plugin of the request.

## 1.3 Tracing Is Off By Default

Nothing is traced unless `shenyu.tracing.enabled` is `true`: the starter creates the OpenTelemetry SDK
and the tracing plugin only in that case. Everything else of the gateway keeps working as before when
the switch is left at its default.

# 2. Setup

## 2.1 Add the Dependency

Add the tracing starter to the gateway. The routes which are forwarded over HTTP keep using the http
client plugin of the gateway, which performs the injection of the trace context.

```xml
<!-- apache shenyu tracing plugin start-->
<dependency>
    <groupId>org.apache.shenyu</groupId>
    <artifactId>shenyu-spring-boot-starter-plugin-tracing</artifactId>
    <version>${project.version}</version>
</dependency>
<!-- apache shenyu tracing plugin end-->
```

The starter bundles the OpenTelemetry SDK and the OTLP over HTTP exporter, so nothing else is needed.

## 2.2 Enable It

```yml
shenyu:
  tracing:
    enabled: true
    otlp:
      endpoint: http://otel-collector:4318
```

The gateway then logs what it really built at startup, which is the first place to look when spans do
not arrive:

```text
shenyu tracing: service name shenyu-gateway, sampler ParentBased{...}, span creation enabled, spans exported http://otel-collector:4318/v1/traces
```

# 3. Configuration Reference

All settings live under `shenyu.tracing`.

| Property             | Default          | Description                                                                                                                                                                                      |
|:---------------------|:-----------------|:-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `enabled`            | `false`          | Turns the plugin on. While it is `false` the gateway creates no span and injects nothing.                                                                                                        |
| `serviceName`        | `shenyu-gateway` | The `service.name` resource attribute of the spans, so the gateway is named in the backend.                                                                                                       |
| `createSpan`         | `true`           | Whether the gateway creates a span of its own. Set it to `false` for a deployment which is already instrumented, for example by a Java agent; see [section 10](#10-running-next-to-a-java-agent). |
| `sampler`            | `parent_based`   | `parent_based`, `always_on`, `always_off` or `ratio`; see [section 4](#4-sampling).                                                                                                              |
| `sampleRatio`        | `0.1`            | The ratio of the `ratio` sampler, between `0` and `1`. It is used only by `ratio`, and only for the requests which carry no parent context.                                                       |
| `resourceAttributes` | none             | Extra resource attributes of every span, for example `deployment.environment`.                                                                                                                    |
| `otlp.endpoint`      | none             | The traces endpoint of the collector. While it is empty the spans are not exported at all.                                                                                                        |
| `otlp.timeout`       | `10s`            | The timeout of one export request, as a duration such as `10s` or `500ms`.                                                                                                                        |
| `otlp.headers`       | none             | Headers of the export request, for example `authorization` for a collector which requires it.                                                                                                     |

A configuration which sets everything:

```yml
shenyu:
  tracing:
    enabled: true
    serviceName: shenyu-gateway
    createSpan: true
    sampler: parent_based
    sampleRatio: 0.1
    resourceAttributes:
      deployment.environment: prod
      service.version: 2.7.2
    otlp:
      endpoint: http://otel-collector:4318
      timeout: 10s
      headers:
        authorization: Bearer <token>
```

## 3.1 The Endpoint

`otlp.endpoint` is the traces endpoint of the collector:

* An endpoint without a path, for example `http://otel-collector:4318`, gets `/v1/traces` appended, so
  a collector is never called at its root and the spans are not lost silently.
* An endpoint which already carries a path, for example `http://otel-collector:4318/v1/traces`, is
  used as it is. A query or a fragment of the endpoint keeps being valid.

# 4. Sampling

The sampler decides whether the span of a request is recorded and exported. It never changes whether
the request is forwarded.

| Sampler        | OpenTelemetry sampler                         | Behaviour                                                                                                                                                                                                                                       |
|:---------------|:----------------------------------------------|:-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `parent_based` | `parentBased(alwaysOn)`                       | Continues the decision of the client, and samples a request which carries no decision. This is the default.                                                                                                                                      |
| `always_on`    | `alwaysOn()`                                  | Samples every request, **including** a request whose client decided not to sample it.                                                                                                                                                             |
| `always_off`   | `alwaysOff()`                                 | Samples no request, **including** a request whose client decided to sample it.                                                                                                                                                                    |
| `ratio`        | `parentBased(traceIdRatioBased(sampleRatio))` | Continues the decision of the client like `parent_based`, and samples a request which carries **no parent context** with the given ratio. A request with a valid `traceparent` keeps the decision of its client, so the ratio does not re-sample it. |

Notes:

* `sampleRatio` is clamped to the range `0` to `1` and logged when it is out of range; a value which
  cannot be read samples nothing.
* The sampled flag reaches the upstream: an unsampled request is still propagated, with the sampled
  flag of the gateway span cleared, so the upstream does not start collecting a trace which the client
  did not ask for.
* `parent_based` is the recommended production setting, because the decision of the caller is
  respected on every hop. `always_on` is useful while debugging. `always_off` disables tracing
  without removing the plugin or the dependency. `ratio` only helps for entry traffic which carries no
  trace context at all, for example the calls of a mobile client or of a load test.
* Neither `always_on` nor `always_off` is a per-route switch: they decide about every request of the
  gateway.

# 5. Context Propagation

## 5.1 Inbound

The gateway reads the W3C trace context and the W3C baggage of the client:

* `traceparent` and `tracestate` continue the trace of the client, and `baggage` is carried with it.
* A request without a valid context, or with a malformed one, starts a new trace. A broken header is
  never an error: the request is forwarded as usual.
* A request which repeats the `traceparent` header is treated as if it carried no context, because a
  repeated trace context header is a known injection vector. The request is forwarded, and a new trace
  is started for it.
* Only the W3C format is supported; B3 is not read (see [section 11](#11-not-supported-yet)).

## 5.2 Outbound

The context of the gateway span is injected into the outgoing HTTP request by the http client plugin,
both on its `WebClient` path and on its Netty path:

* The `traceparent` and the `tracestate` of the client are dropped from the outgoing request before the
  context of the gateway span is written, so exactly one trace context leaves the gateway, and it
  belongs to the gateway span. An upstream which is called through the gateway therefore never
  receives the span of the client as its parent, but the span of the gateway.
* `baggage` is not trace scoped and is forwarded as the client sent it.
* When tracing is disabled, or when `createSpan=false` and no instrumentation set an active context,
  nothing is injected: the headers of the client are forwarded exactly as they arrived.
* `baggage` values reach the upstream and may be recorded there, so do not put secrets into baggage.

The injection is an extension point: `TraceContextPropagator` is a ShenYu SPI, and the tracing plugin
registers the implementation of the `http` protocol. A protocol plugin which wants to propagate its own
protocol adds the propagator join of that protocol and hands its own carrier to it. Today only the
`http` propagator is shipped, so a protocol which does not send an HTTP request to the upstream is not
covered yet (see [section 11](#11-not-supported-yet)).

# 6. The Gateway Span

## 6.1 Name

The span name is `{method} {route}`, for example `GET /http/order/findById`. The route is the path the
upstream registered as its api, so the name is a bounded value and does not grow with the traffic:

| Situation                            | Span name                  |
|:-------------------------------------|:---------------------------|
| route matched                        | `GET /http/order/findById` |
| no route matched (for example a 404) | `GET`                      |
| no method and no route               | `shenyu-gateway`           |

## 6.2 Attributes

| Attribute                   | Recorded for                                                          |
|:----------------------------|:----------------------------------------------------------------------|
| `http.request.method`       | every request                                                         |
| `http.route`                | the matched registered api                                            |
| `shenyu.rpc.type`           | every request, for example `http`                                     |
| `shenyu.route.module`       | every request, the module of the matched route (the application name) |
| `shenyu.route.method`       | every request of a protocol which is not http like, the method of the api |
| `shenyu.context.path`       | every request which passed the context path plugin                    |
| `shenyu.upstream.host`      | every request which reached an upstream                               |
| `shenyu.selector.id`        | the divide plugin of the http route; other protocols do not expose it |
| `http.response.status_code` | every request whose status is known when the span ends                |
| `shenyu.error.type`         | error spans only: `timeout` or the type of the exception              |
| `shenyu.cancelled`          | requests which the client cancelled                                   |

Only bounded values are recorded: the raw request path and the query string are left out, and the
route is taken from the metadata of the matched api. That keeps the cardinality of the attributes and
of the span name low, and keeps the query string, which often carries personal data, out of the
backend.

## 6.3 Status and Errors

The status follows the OpenTelemetry http conventions:

| Outcome                                       | Span status                                                |
|:----------------------------------------------|:-----------------------------------------------------------|
| response `2xx` / `3xx`                        | `UNSET`                                                    |
| response `4xx` (a client error)               | `UNSET`, so client errors are not failures of the gateway  |
| response `5xx` (a server error)               | `ERROR`, description `HTTP 500`                            |
| timeout, by exception or by `408` / `504`     | `ERROR`, `shenyu.error.type=timeout`                       |
| another exception                             | `ERROR`, description is the type of the exception          |
| the client cancelled the request              | status untouched, `shenyu.cancelled=true`                  |

An exception is recorded with the OpenTelemetry exception event, which carries the type, the message
and the stack trace of the exception. The status description itself is limited to the type, so the
message of an exception does not turn into a status description.

A failure which is answered with a client error, for example a refused request which the rate limiter
answers with `429`, keeps the span status `UNSET` like the same status answered by a response, so a
dashboard which counts `ERROR` spans counts the failures of the gateway and of the upstream, and not
the rejected requests of the clients.

# 7. Correlate Logs and Traces

The trace id of the request is put into the exchange attributes as `shenyu-agent-trace-id`:

* The logging plugins read that attribute and write it into the `traceId` field of their access log
  record, so an access log entry can be found by the trace id of the backend, and the other way round.
* The request scoped log line of the gateway reports it as well, once the request has ended:

```text
shenyu chain handle uri:/http/order/findById, traceId:4bf92f3577b34da6a3ce929d0e0e4736, cost:12
```

That line is logged at `debug`, so enable it when the trace id is needed in the log of a plain
deployment:

```yml
logging:
  level:
    org.apache.shenyu.web.handler: debug
```

# 8. Export to a Backend

The exporter speaks OTLP over HTTP, which every current backend accepts, so no vendor specific
exporter is needed. The examples below differ only in the endpoint.

## 8.1 OpenTelemetry Collector

```yaml
# otel-collector.yml
receivers:
  otlp:
    protocols:
      http:
        endpoint: 0.0.0.0:4318

exporters:
  otlphttp:
    endpoint: http://tempo:4318

service:
  pipelines:
    traces:
      receivers: [ otlp ]
      exporters: [ otlphttp ]
```

```yml
shenyu:
  tracing:
    enabled: true
    otlp:
      endpoint: http://otel-collector:4318
```

## 8.2 Jaeger

A current Jaeger accepts OTLP directly, so the gateway can export to it without a collector in
between. Put an OpenTelemetry Collector in front of an installation which does not accept OTLP itself,
and point the gateway at that collector.

```yml
shenyu:
  tracing:
    enabled: true
    otlp:
      endpoint: http://jaeger:4318
```

## 8.3 Grafana Tempo

Tempo exposes an OTLP receiver over HTTP on `4318` by default.

```yml
shenyu:
  tracing:
    enabled: true
    otlp:
      endpoint: http://tempo:4318
```

## 8.4 Behaviour of the Exporter

* The spans are collected and exported in batches by the OpenTelemetry SDK, so a span arrives at the
  backend with a small delay instead of with the response. The batch settings of the SDK apply; they
  are not exposed as ShenYu settings.
* Export problems never affect the forwarding of a request. An exporter which cannot be created, for
  example because the endpoint is not a valid url, is logged and the spans stay in the process. An
  exporter which cannot reach its collector drops the spans of its batch, and the request is answered
  as usual. The integrated test of the plugin stops the collector and verifies that the requests keep
  being forwarded.
* The endpoint of the startup log and of a failure log is reported without its user information, its
  query and its fragment, so a token which is carried in the url of the endpoint is not logged.

# 9. Performance and Security

## 9.1 Performance

* Keep `parent_based` in production: a request which the caller did not sample costs no export, and
  the decision of the caller is respected on every hop. Use `always_on` for a debugging session, and
  `ratio` only for entry traffic which carries no trace context.
* A span is created and ended once per request, and the export runs on the threads of the SDK, so the
  request is not blocked by the collector. What remains is the injection of a few headers into the
  outgoing request.
* The attributes and the span name are bounded values, which keeps the cardinality of the backend low
  even on a gateway with many routes.

## 9.2 Security

* A repeated `traceparent` header is rejected, and the `traceparent` and the `tracestate` of the client
  are replaced before the context of the gateway span is written, so a client cannot forge the parent
  of the upstream call.
* `baggage` is forwarded unchanged, so it travels to every hop which continues the trace; do not use it
  for credentials or personal data.
* `otlp.headers` commonly carries a collector token, and `resourceAttributes` can carry deployment
  details. Keep them in the secret or environment configuration of the deployment rather than in a
  shared file, and use TLS (`https`) for a collector which is not on the same host.
* The raw request path and the query string are not recorded as attributes, so the personal data which
  a query string carries does not reach the backend. `shenyu.upstream.host`, `http.route` and
  `shenyu.selector.id` are recorded and may expose the internal topology to whoever can read the
  traces.

# 10. Running Next to a Java Agent

A deployment which already instruments the gateway, for example with the OpenTelemetry Java agent,
sets `createSpan: false`:

* The plugin then does not create a second span for the request. It only propagates: it continues the
  active context of the instrumentation when there is one (the span of the agent), and falls back to
  the headers of the client otherwise. The trace id of that context is exposed to the logs as usual.
* The global `OpenTelemetry` instance of the process is never replaced, so the instrumentation of the
  agent keeps its own SDK, exporter and sampling configuration.

Two limitations are worth knowing:

* The active context of an instrumentation is thread bound, while a reactive gateway switches threads.
  When the span of the agent is not the active context of the thread which runs the tracing plugin, the
  plugin falls back to the headers of the client.
* The agent instruments the http client on its own. Its injection may therefore run after the injection
  of the plugin, and the upstream may record the span of the agent as its parent. The trace is still
  the same; only the direct parent of the upstream span differs.

# 11. Not Supported Yet

* **B3 propagation.** Only the W3C trace context and the W3C baggage are read and written.
* **OTLP over gRPC.** The exporter is the OTLP over HTTP one; the gRPC transport is deliberately not
  bundled, because the grpc plugin already brings its own grpc stack to the gateway.
* **A dashboard switch.** The plugin is enabled with `shenyu.tracing.enabled` only. Turning it on or
  off from the admin console is not implemented yet.
* **Tracing of the AI proxy.** The AI proxy builds its own web client, so the trace context is not
  injected into the request it sends, and its upstream call does not continue the trace of the gateway.
* **Outbound propagation for protocols other than HTTP.** The `TraceContextPropagator` SPI is the
  extension point, but only the `http` propagator is shipped: dubbo, grpc, sofa, tars and websocket
  routes are not propagated yet, and neither is a protocol whose plugin sends its own requests.
* **Per-route tracing.** The plugin traces every request of the gateway; there is no rule or selector
  which enables tracing for a subset of the routes.

# 12. Troubleshooting

| Symptom                                            | What to check                                                                                                                                       |
|:---------------------------------------------------|:----------------------------------------------------------------------------------------------------------------------------------------------------|
| no span in the backend                             | `shenyu.tracing.enabled`, the starter on the classpath, and `otlp.endpoint`. The startup log reports the sampler and the endpoint which are really used. |
| spans arrive a few seconds after the request       | expected, the SDK exports in batches                                                                                                                 |
| the client samples, but nothing is exported        | the sampler; `always_off` and a `ratio` of `0` drop the request. The startup log reports the sampler which was built                                  |
| the upstream receives no `traceparent`             | tracing disabled, `createSpan=false` without an agent, or a route which does not send an HTTP request (AI proxy, dubbo, ...)                          |
| the upstream `traceparent` continues the client    | tracing disabled: the headers of the client are forwarded as they are, which the plugin does not rewrite. With tracing enabled the parent is always the gateway span |
| the upstream parent is the span of the agent       | see [section 10](#10-running-next-to-a-java-agent)                                                                                                  |
| a `4xx` response is not an `ERROR` span            | by design, a client error is not a failure of the gateway                                                                                            |
| the access log has no trace id                     | the logging plugin of the deployment has to be configured, and it records the attribute only for a request which has a trace                         |
