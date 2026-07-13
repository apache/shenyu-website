# Scale Management

## 1. Background

Scale management is used to adjust the replica count of the ShenYu Bootstrap deployment in Kubernetes. ShenYu Admin can scale by fixed time policies or by dynamic metric rules collected from Prometheus.

This feature is disabled by default. Enable it only when ShenYu Admin can access the Kubernetes API server and has permission to update the target Deployment scale subresource.

## 2. Configuration

Enable scale management in `application.yml`:

```yaml
shenyu:
  k8s:
    scale:
      enabled: true
      monitor-interval: 10000
      pool-size: 6
    prometheus:
      url: http://localhost:9090
      queries:
        cpu_usage: "sum(rate(container_cpu_usage_seconds_total{namespace='%s', pod=~'%s.*'}[5m]))"
        memory_usage: "sum(container_memory_usage_bytes{namespace='%s', pod=~'%s.*'})"
        request_count: "sum(rate(http_requests_total{namespace='%s', pod=~'%s.*'}[1m]))"
    deployment:
      name: "shenyu-bootstrap"
      namespace: "shenyu"
      apiServer: "https://127.0.0.1:6443"
      token: "token"
      caCertPath: "/etc/kubernetes/pki/ca.crt"
```

Configuration description:

| Name | Description |
| --- | --- |
| `shenyu.k8s.scale.enabled` | Whether to enable Kubernetes scale management. The default value is `false`. |
| `shenyu.k8s.scale.monitor-interval` | Metric polling interval in milliseconds. |
| `shenyu.k8s.scale.pool-size` | Thread pool size for scale monitoring tasks. |
| `shenyu.k8s.prometheus.url` | Prometheus server URL. |
| `shenyu.k8s.prometheus.queries` | PromQL templates used by metric rules. |
| `shenyu.k8s.deployment.name` | Target Kubernetes Deployment name. |
| `shenyu.k8s.deployment.namespace` | Namespace of the target Deployment. |
| `shenyu.k8s.deployment.apiServer` | Kubernetes API server address. |
| `shenyu.k8s.deployment.token` | Service account token used to access the Kubernetes API server. |
| `shenyu.k8s.deployment.caCertPath` | CA certificate path for the Kubernetes API server. |

## 3. Fixed Scale Policies

Choose **System Management** -> **Scale Management** in ShenYu Admin.

Scale policies define a fixed number of Bootstrap replicas within a time range. The policy fields include:

| Field | Description |
| --- | --- |
| `Sort` | Policy priority. |
| `Status` | `1` means enabled, `0` means disabled. |
| `Num` | Target number of Bootstrap replicas. |
| `Begin Time` | The time when the policy starts to take effect. |
| `End Time` | The time when the policy stops taking effect. |

When an enabled policy is active, ShenYu Admin scales the target Deployment to the configured replica count.

## 4. Dynamic Scale Rules

Scale rules define upper and lower thresholds for metrics. The rule fields include:

| Field | Description |
| --- | --- |
| `Metric Name` | Metric key. It must match a key under `shenyu.k8s.prometheus.queries`. |
| `Type` | Metric source type. `0` is ShenYu, `1` is Kubernetes, and `2` is others. |
| `Sort` | Rule priority. |
| `Status` | `1` means enabled, `0` means disabled. |
| `Minimum` | If the collected metric value is lower than this value, ShenYu Admin scales down by one replica. |
| `Maximum` | If the collected metric value is higher than this value, ShenYu Admin scales up by one replica. |

Dynamic scaling uses the Prometheus query configured for the metric name. The query template receives the target Kubernetes namespace and Deployment name.

## 5. Notes

* Configure Kubernetes RBAC before enabling scale management. The token must be allowed to read and update the target Deployment scale.
* Keep the metric name in scale rules consistent with the keys configured under `shenyu.k8s.prometheus.queries`.
* Start with conservative thresholds and verify the scale history before using the feature in production.
