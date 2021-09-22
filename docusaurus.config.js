const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'Apache ShenYu (Incubating)',
  tagline: 'High-performance, multi-protocol, extensible, responsive API Gateway',
  url: 'https://shenyu.apache.org/',
  baseUrl: '/',
  onBrokenLinks: 'log',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'apache', // Usually your GitHub org/user name.
  projectName: 'incubator-shenyu', // Usually your repo name.
  i18n: {
    defaultLocale: "en",
    locales: ["en", "zh"],
    localeConfigs: {
      en: {
        label: "English",
        direction: 'ltr',
      },
      zh: {
        label: "简体中文",
        direction: 'ltr',
      },
    },
  },
  customFields: {
    downloads: [
      {
        name: "Apache ShenYu (incubating)",
        description: "High-performance, multi-protocol, extensible, responsive API Gateway",
        githubRepo: "apache/incubator-shenyu",
        version: "2.4.0",
        releaseDate: "2021-08-08",
        url: "https://dlcdn.apache.org/incubator/shenyu/2.4.0/"
      }
    ],
  },
  themeConfig: {
    announcementBar: {
      id: 'announcementBar-2', // Increment on change
      content: `⭐️ &nbsp; If you like Apache ShenYu (Incubating), give it a star on <a target="_blank" rel="noopener noreferrer" href="https://github.com/apache/incubator-shenyu">GitHub</a>`,
    },
    navbar: {
     // title: 'Apache ShenYu (Incubating)',
      logo: {
        alt: 'Apache ShenYu Logo',
        src: 'img/logo.png',
      },
      items: [
        {to: '/download', label: 'Download', position: 'left'},
        {
          type: 'doc',
          docId: 'index',
          position: 'left',
          label: 'Document',
        },
        {
          to: '/community/subscribe-email',
          label: 'Community',
          position: 'left',
          activeBaseRegex: `/community/`,
        },
        {
          label: 'Event',
          position: 'left',
          to: '/event/2.4.0-release',
          activeBaseRegex: `/event/`,
        },
        {to: '/news', label: 'News', position: 'left'},
        {to: '/blog', label: 'Blog', position: 'left'},
        {
          label: 'ASF',
          position: 'left',
          items: [
            {
              label: "Foundation",
              to: "https://www.apache.org/",
            },
            {
              label: "License",
              to: "https://www.apache.org/licenses/",
            },
            {
              label: "Events",
              to: "https://www.apache.org/events/",
            },
            {
              label: "Security",
              to: "https://www.apache.org/security/",
            },
            {
              label: "Sponsorship",
              to: "https://www.apache.org/foundation/sponsorship.html",
            },
            {
              label: "Thanks",
              to: "https://www.apache.org/foundation/thanks.html",
            },
          ],
        },
        {
          type: 'docsVersionDropdown',
          position: 'right',
          dropdownActiveClassDisabled: true,
          dropdownItemsAfter: [
            {
              to: '/versions',
              label: 'All versions',
            },
          ],
        },
        {
          href: 'https://github.com/apache/incubator-shenyu',
          label: 'GitHub',
          position: 'right',
        },
        {
          type: "localeDropdown",
          position: "right",
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'ShenYu',
          items: [
            {
              label: 'Download',
              to: '/download',
            },
            {
              label: 'Document',
              to: '/docs/index',
            },
            {
              label: 'News',
              to: '/news',
            },
            {
              label: 'Blog',
              to: '/blog',
            },
            {
              label: 'Releases',
              href: 'https://github.com/apache/incubator-shenyu/releases',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Community',
              to: '/community/subscribe-email',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/apache/incubator-shenyu',
            },
            {
              label: 'Issue Tracker',
              href: 'https://github.com/apache/incubator-shenyu/issues',
            },
          ],
        },
        {
          title: 'Subscribe mailing list',
          items: [
            {
              label: 'How to subscribe',
              to: '/community/subscribe-email',
            },
            {
              label: 'Subscribe Mail',
              href: 'mailto://dev-subscribe@shenyu.apache.org',
            },
            {
              label: 'Mail Archive',
              href: 'https://lists.apache.org/list.html?dev@shenyu.apache.org',
            },
          ],
        },
      ],
      copyright: `<div><img style="height:50px" alt="Apache Software Foundation" src="/img/incubator-logo.png" /><p style="color:#ffffffcf;font-size:14px;text-align:left">Apache ShenYu is an effort undergoing incubation at The Apache Software Foundation (ASF), sponsored by the Apache Incubator. Incubation is required of all newly accepted projects until a further review indicates that the infrastructure, communications, and decision making process have stabilized in a manner consistent with other successful ASF projects. While incubation status is not necessarily a reflection of the completeness or stability of the code, it does indicate that the project has yet to be fully endorsed by the ASF.</p>
      <p style="color:white;font-size:14px;"> Copyright © ${new Date().getFullYear()} The Apache Software Foundation. Licensed under the Apache License, Version 2.0. Apache ShenYu, Apache Incubator, Apache, the Apache feather logo, the Apache ShenYu logo and the Apache Incubator project logo are trademarks of The Apache Software Foundation.</p>
      <div>`,
    },
    prism: {
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
      additionalLanguages: ['java'],
    },
    algolia: {
      apiKey: 'c352a8b2c857f45d2b70a21eae903f40',
      indexName: 'shenyu',

      // Optional: see doc section below
      contextualSearch: true,

      // Optional: see doc section below
      appId: 'NVVPQWV3R7',

      // Optional: Algolia search parameters
      searchParameters: {},

      //... other Algolia params
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editLocalizedFiles: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/apache/incubator-shenyu-website/edit/main/',
        },
        blog: {
          showReadingTime: true,
          blogSidebarCount: "ALL",
          // Please change this to your repo.
          editUrl:
            'https://github.com/apache/incubator-shenyu-website/edit/main/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'community',
        path: 'community',
        routeBasePath: 'community',
        editUrl: ({locale, versionDocsDirPath, docPath}) => {
          if (locale !== 'en') {
            return `https://github.com/apache/incubator-shenyu-website/edit/main/i18n/${locale}/${docPath}`;
          }
          return `https://github.com/apache/incubator-shenyu-website/edit/main/${versionDocsDirPath}/${docPath}`;
        },
        editCurrentVersion: true,
        editLocalizedFiles: true,
        sidebarPath: require.resolve('./sidebarsCommunity.js'),
        showLastUpdateAuthor: true,
        showLastUpdateTime: true,
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'event',
        path: 'event',
        routeBasePath: 'event',
        editUrl: ({locale, versionDocsDirPath, docPath}) => {
          if (locale !== 'en') {
            return `https://github.com/apache/incubator-shenyu-website/edit/main/i18n/${locale}/${docPath}`;
          }
          return `https://github.com/apache/incubator-shenyu-website/edit/main/${versionDocsDirPath}/${docPath}`;
        },
        editCurrentVersion: true,
        editLocalizedFiles: true,
        sidebarPath: require.resolve('./sidebarsCommunity.js'),
        showLastUpdateAuthor: true,
        showLastUpdateTime: true,
      }
    ],
    [
      "@docusaurus/plugin-content-blog",
      {
        id: "news",
        routeBasePath: "news",
        path: "news",
      },
    ],
  ]
};
