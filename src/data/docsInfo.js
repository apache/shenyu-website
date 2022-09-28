import React from 'react';
import Translate from "@docusaurus/Translate";

export default [
    {
      'docsTitle': <Translate>Apache ShenYu Docs</Translate>,
      'projectName': 'Apache ShenYu',
      'description': <Translate>The document for Apache ShenYu</Translate>,
      'latestVersion': 'docs/index',
      'nextVersion': 'docs/next/index',
      'versionsList': [
        { 'next': 'docs/next/index' },
        { '2.5.0': 'docs/index' },
        { '2.4.3': 'docs/2.4.3/index' },
        { '2.4.2': 'docs/2.4.2/index' },
        { '2.4.1': 'docs/2.4.1/index' },
        { '2.4.0': 'docs/2.4.0/index' },
        { '2.3.0-Legacy': 'docs/2.3.0-Legacy/index' },
      ]
    },
    {
      'docsTitle': <Translate>ShenYu Nginx Docs</Translate>,
      'projectName': 'ShenYu Nginx',
      'description': <Translate>This module provided SDK to watch available ShenYu instance list as upstream nodes by Service Register Center for OpenResty.</Translate>,
      'latestVersion': 'shenyuNginx/index',
    },
    {
      'docsTitle': <Translate>Shenyu-client-golang Docs</Translate>,
      'projectName': 'Shenyu-client-golang',
      'description': <Translate>Shenyu-client-golang for Go client allows you to access ShenYu Gateway,it supports registory go service to ShenYu Gateway.</Translate>,
      'latestVersion': 'shenyuClientGolang/http',
    }
  ]
  