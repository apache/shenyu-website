import React from 'react';
import Translate from '@docusaurus/Translate';

export default [
  {
    id: 'golang',
    projectName: 'Go Client',
    category: 'CLIENT / GO',
    description: <Translate id="document.goDescription">Register Go services with ShenYu and connect them to your gateway.</Translate>,
    latestVersion: '/shenyuClientGolang/http',
    nextVersion: '/shenyuClientGolang/next/http',
  },
  {
    id: 'dotnet',
    projectName: '.NET Client',
    category: 'CLIENT / .NET',
    description: <Translate id="document.dotnetDescription">Register .NET applications automatically and route requests through ShenYu.</Translate>,
    latestVersion: '/shenyuClientDotnet/http',
    nextVersion: '/shenyuClientDotnet/next/http',
  },
  {
    id: 'rust',
    projectName: 'Rust Client',
    category: 'CLIENT / RUST',
    description: <Translate id="document.rustDescription">Connect Rust services to ShenYu with the Rust client SDK.</Translate>,
    latestVersion: '/shenyuClientRust/http',
  },
  {
    id: 'nginx',
    projectName: 'ShenYu Nginx',
    category: 'DEPLOYMENT / NGINX',
    description: <Translate id="document.nginxDescription">Discover gateway instances through a registry and manage upstreams in OpenResty.</Translate>,
    latestVersion: '/shenyuNginx/',
  },
  {
    id: 'helm',
    projectName: 'Helm Chart',
    category: 'DEPLOYMENT / KUBERNETES',
    description: <Translate id="document.helmDescription">Deploy and configure ShenYu on Kubernetes using the Helm chart.</Translate>,
    latestVersion: '/helm/',
  },
];
