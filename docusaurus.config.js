const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'Apache ShenYu',
  tagline: 'Apache ShenYu - High-performance, multi-protocol, extensible, responsive API Gateway',
  url: 'https://shenyu.apache.org/',
  baseUrl: '/',
  onBrokenLinks: 'log',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.svg',
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
  themeConfig: {

    navbar: {
     // title: 'Apache ShenYu',
      logo: {
        alt: 'Apache ShenYu Logo',
        src: 'img/logo.svg',
        srcDark: 'img/logo-light.svg'
      },
      items: [
        {to: '/download', label: 'Download', position: 'right'},
        // {
        //   type: 'docsVersionDropdown',
        //   label: 'doc',
        //   position: 'left',
        //   dropdownActiveClassDisabled: true,
        //   dropdownItemsAfter: [
        //     {
        //       to: '/versions',
        //       label: 'All versions',
        //     },
        //   ],
        // },
        {
          label: 'Docs',
          position: 'right',
          items: [
            {
              label: "next",
              to: "/docs/next/index",
            },
            {
              label: "2.4.3",
              to: "/docs/index",
            },
            {
              label: "2.4.2",
              to: "/docs/2.4.2/index",
            },
            {
              label: "2.4.1",
              to: "/docs/2.4.1/index",
            },
            {
              label: "2.4.0",
              to: "/docs/2.4.0/index",
            },
            {
              label: "2.3.0-Legacy",
              to: "/docs/2.3.0-Legacy/index",
            },
            {
              label: "All Versions",
              to: "/versions",
            },
          ],
        },
        {
          to: '/community/contributor-guide',
          label: 'Community',
          position: 'right',
          activeBaseRegex: `/community/`,
        },
        {to: '/team', label: 'Team', position: 'right'},
        {
          label: 'Event',
          position: 'right',
          to: '/event',
          activeBaseRegex: `/event/`,
        },
        {to: '/news', label: 'News', position: 'right'},
        {to: '/blog', label: 'Blog', position: 'right'},
        {to: '/users', label: 'Users', position: 'right'},
        {
          label: 'ASF',
          position: 'right',
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
              to: "https://www.apache.org/events/current-event",
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
              label: "Privacy",
              to: "https://www.apache.org/foundation/policies/privacy.html",
            },
            {
              label: "Thanks",
              to: "https://www.apache.org/foundation/thanks.html",
            },
          ],
        },
        {
          href: 'https://github.com/apache/shenyu',
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
          title: 'Events',
          items: [
            {
              label: 'ApacheCon',
              href: 'https://www.apachecon.com',
            },
          ],
        },
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
              href: 'https://github.com/apache/shenyu/releases',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Community',
              to: '/community/contributor-guide',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/apache/shenyu',
            },
            {
              label: 'Issue Tracker',
              href: 'https://github.com/apache/shenyu/issues',
            },
          ],
        },
        {
          title: 'Subscribe mailing list',
          items: [
            {
              label: 'How to subscribe',
              to: '/community/contributor-guide#join-the-discussion',
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
      copyright: `<div><img style="height:50px; margin-right:10px" src="/img/logo/support-apache.png" /> <img style="height:50px; margin-left:10px" alt="Apache Software Foundation" src="/img/logo/asf_logo.svg" /><p style="color:#ffffffcf;font-size:14px;text-align:center">Copyright © ${new Date().getFullYear()} The Apache Software Foundation, Licensed under the Apache License, Version 2.0. Apache ShenYu,  Apache, the Apache feather logo, the Apache ShenYu logo are trademarks of The Apache Software Foundation.</p>
      <div>`,
    },
    prism: {
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
      additionalLanguages: ['java'],
    },
    algolia: {
      apiKey: '5f882bef2dfc81f5f1b4e5ea87b2f165',
      indexName: 'apache_shenyu',
      // Optional: see doc section below
      contextualSearch: true,
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
          blogSidebarCount: 0,
          blogSidebarTitle: 'All Blog Posts',
          editLocalizedFiles: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/apache/incubator-shenyu-website/edit/main/',
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
            return `https://github.com/apache/incubator-shenyu-website/edit/main/i18n/${locale}/docusaurus-plugin-content-docs-community/current/${docPath}`;
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
    // [
    //   '@docusaurus/plugin-content-docs',
    //   {
    //     id: 'download',
    //     path: 'download',
    //     routeBasePath: 'download',
    //     editUrl: ({locale, versionDocsDirPath, docPath}) => {
    //       if (locale !== 'en') {
    //         return `https://github.com/apache/incubator-shenyu-website/edit/main/i18n/${locale}/docusaurus-plugin-content-docs-event/current/${docPath}`;
    //       }
    //       return `https://github.com/apache/incubator-shenyu-website/edit/main/${versionDocsDirPath}/${docPath}`;
    //     },
    //   }
    // ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'event',
        path: 'event',
        routeBasePath: 'event',
        editUrl: ({locale, versionDocsDirPath, docPath}) => {
          if (locale !== 'en') {
            return `https://github.com/apache/incubator-shenyu-website/edit/main/i18n/${locale}/docusaurus-plugin-content-docs-event/current/${docPath}`;
          }
          return `https://github.com/apache/incubator-shenyu-website/edit/main/${versionDocsDirPath}/${docPath}`;
        },
        editCurrentVersion: true,
        editLocalizedFiles: true,
        sidebarPath: false,
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
        blogSidebarCount:0,
      },
    ],
  ]
};
