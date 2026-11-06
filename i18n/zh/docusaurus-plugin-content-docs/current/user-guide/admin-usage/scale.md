# 弹性伸缩管理

## 1. 背景说明

弹性伸缩管理用于在 Kubernetes 环境中调整 ShenYu Bootstrap Deployment 的副本数。ShenYu Admin 支持按固定时间策略伸缩，也支持根据 Prometheus 指标规则动态伸缩。

该功能默认关闭。只有在 ShenYu Admin 能访问 Kubernetes API Server，并且具备更新目标 Deployment scale 子资源权限时，才建议开启。

## 2. 配置

在 `application.yml` 中开启弹性伸缩管理：

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

配置说明：

| 配置项 | 说明 |
| --- | --- |
| `shenyu.k8s.scale.enabled` | 是否启用 Kubernetes 弹性伸缩管理，默认值为 `false`。 |
| `shenyu.k8s.scale.monitor-interval` | 指标轮询间隔，单位为毫秒。 |
| `shenyu.k8s.scale.pool-size` | 伸缩监控任务线程池大小。 |
| `shenyu.k8s.prometheus.url` | Prometheus 服务地址。 |
| `shenyu.k8s.prometheus.queries` | 伸缩规则使用的 PromQL 模板。 |
| `shenyu.k8s.deployment.name` | 目标 Kubernetes Deployment 名称。 |
| `shenyu.k8s.deployment.namespace` | 目标 Deployment 所在命名空间。 |
| `shenyu.k8s.deployment.apiServer` | Kubernetes API Server 地址。 |
| `shenyu.k8s.deployment.token` | 访问 Kubernetes API Server 的 Service Account token。 |
| `shenyu.k8s.deployment.caCertPath` | Kubernetes API Server CA 证书路径。 |

## 3. 固定伸缩策略

在 ShenYu Admin 中选择【系统管理】-【弹性伸缩管理】。

伸缩策略用于在指定时间范围内设置固定的 Bootstrap 副本数。策略字段包括：

| 字段 | 说明 |
| --- | --- |
| `Sort` | 策略优先级。 |
| `Status` | `1` 表示启用，`0` 表示禁用。 |
| `Num` | Bootstrap 目标副本数。 |
| `Begin Time` | 策略开始生效时间。 |
| `End Time` | 策略停止生效时间。 |

当启用状态的策略处于生效时间范围内时，ShenYu Admin 会将目标 Deployment 调整到配置的副本数。

## 4. 动态伸缩规则

伸缩规则用于为指标设置上限和下限。规则字段包括：

| 字段 | 说明 |
| --- | --- |
| `Metric Name` | 指标名称，必须与 `shenyu.k8s.prometheus.queries` 下的 key 保持一致。 |
| `Type` | 指标来源类型，`0` 表示 ShenYu，`1` 表示 Kubernetes，`2` 表示其他。 |
| `Sort` | 规则优先级。 |
| `Status` | `1` 表示启用，`0` 表示禁用。 |
| `Minimum` | 采集到的指标值低于该值时，ShenYu Admin 会缩容一个副本。 |
| `Maximum` | 采集到的指标值高于该值时，ShenYu Admin 会扩容一个副本。 |

动态伸缩会使用指标名称对应的 Prometheus 查询模板，查询模板会接收目标 Kubernetes namespace 和 Deployment name。

## 5. 注意事项

* 开启弹性伸缩前需要先配置 Kubernetes RBAC，确保 token 具备读取和更新目标 Deployment scale 的权限。
* 伸缩规则中的指标名称必须与 `shenyu.k8s.prometheus.queries` 中配置的 key 保持一致。
* 生产环境建议先使用保守阈值，并结合伸缩历史确认行为符合预期。
