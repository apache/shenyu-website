import React from 'react';
import Translate from '@docusaurus/Translate';

// Keep gateway releases newest first. Each src points to a document in event/.
export default [
  {
    product: "gateway",
    version: "2.7.1",
    src: "2.7.1-release",
    description: <Translate id="releases.summary.2.7.1-release">MCP server enhancements, WASM runtime migration, security hardening, and infrastructure improvements.</Translate>,
  },
  {
    product: "gateway",
    version: "2.7.0.3",
    src: "2.7.0.3-release",
    description: <Translate id="releases.summary.2.7.0.3-release">Improvements to MCP tools, Nacos data synchronization, and Redis rate limiting.</Translate>,
  },
  {
    product: "gateway",
    version: "2.7.0.2",
    src: "2.7.0.2-release",
    description: <Translate id="releases.summary.2.7.0.2-release">AI request transformation, proxy configuration fixes, and data buffer leak fixes.</Translate>,
  },
  {
    product: "gateway",
    version: "2.7.0.1",
    src: "2.7.0.1-release",
    description: <Translate id="releases.summary.2.7.0.1-release">HTTP polling fixes, JWT payload parsing extensions, and Dubbo method configuration support.</Translate>,
  },
  {
    product: "gateway",
    version: "2.7.0",
    src: "2.7.0-release",
    description: <Translate id="releases.summary.2.7.0-release">Java 17 runtime, Spring Boot 3, and ShenYu Admin cluster support.</Translate>,
  },
  {
    product: "gateway",
    version: "2.6.1",
    src: "2.6.1-release",
    description: <Translate id="releases.summary.2.6.1-release">Alert notifications, Dubbo annotation analysis, and more service discovery integrations.</Translate>,
  },
  {
    product: "wasm",
    version: "1.0.0",
    src: "shenyu-wasm-1.0.0-release",
    description: <Translate id="releases.summary.shenyu-wasm-1.0.0-release">Simplified usage and support for user-defined dynamic libraries.</Translate>,
  },
  {
    product: "gateway",
    version: "2.6.0",
    src: "2.6.0-release",
    description: <Translate id="releases.summary.2.6.0-release">Prometheus metrics, two-level caching, and extended plugin JAR management.</Translate>,
  },
  {
    product: "gateway",
    version: "2.5.1",
    src: "2.5.1-release",
    description: <Translate id="releases.summary.2.5.1-release">BRPC plugin, examples, and Spring Boot starter support.</Translate>,
  },
  {
    product: "nginx",
    version: "1.0.0-1",
    src: "nginx-1.0.0-1-release",
    description: <Translate id="releases.summary.nginx-1.0.0-1-release">Track gateway node changes through ZooKeeper, etcd, and Nacos.</Translate>,
  },
  {
    product: "dotnet",
    version: "1.0.0",
    src: "client-dotnet-1.0.0-release",
    description: <Translate id="releases.summary.client-dotnet-1.0.0-release">Register .NET services through HTTP, Nacos, or Consul.</Translate>,
  },
  {
    product: "golang",
    version: "1.0.0",
    src: "client-golang-1.0.0-release",
    description: <Translate id="releases.summary.client-golang-1.0.0-release">Register Go services through HTTP, Nacos, or Consul.</Translate>,
  },
  {
    product: "gateway",
    version: "2.5.0",
    src: "2.5.0-release",
    description: <Translate id="releases.summary.2.5.0-release">New mock, Aliyun SLS logging, and Elasticsearch logging plugins.</Translate>,
  },
  {
    product: "gateway",
    version: "2.4.3",
    src: "2.4.3-release",
    description: <Translate id="releases.summary.2.4.3-release">HTTP registration retries, octet-stream support, and redirect improvements.</Translate>,
  },
  {
    product: "gateway",
    version: "2.4.2",
    src: "2.4.2-release",
    description: <Translate id="releases.summary.2.4.2-release">MQTT support and observability with ShenYu Agent and OpenTelemetry.</Translate>,
  },
  {
    product: "gateway",
    version: "2.4.1",
    src: "2.4.1-release",
    description: <Translate id="releases.summary.2.4.1-release">PostgreSQL support for Admin, dynamic plugins, and local data updates.</Translate>,
  },
  {
    product: "gateway",
    version: "2.4.0",
    src: "2.4.0-release",
    description: <Translate id="releases.summary.2.4.0-release">Flexible initialization scripts, categorized plugin menus, and Admin SQL improvements.</Translate>,
  },
  {
    product: "gateway",
    version: "2.3.0",
    src: "2.3.0-release",
    description: <Translate id="releases.summary.2.3.0-release">Signature authentication options, plugin templates, and handler validation improvements.</Translate>,
  },
  {
    product: "gateway",
    version: "2.2.0",
    src: "2.2.0-release",
    description: <Translate id="releases.summary.2.2.0-release">Hot-swappable plugins and support for Dubbo versions and generic calls.</Translate>,
  },
];
