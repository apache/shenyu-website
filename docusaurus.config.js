const { themes } = require('prism-react-renderer');
const lightTheme = themes.github;
const darkTheme = themes.dracula;

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: "Apache ShenYu",
  tagline:
    "Apache ShenYu - High-performance, multi-protocol, extensible, responsive API Gateway",
  url: "https://shenyu.apache.org/",
  baseUrl: "/",
  onBrokenLinks: "log",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.svg",
  scripts: [{ src: '/js/error-suppression.js', async: false, defer: false }],
  organizationName: "apache", // Usually your GitHub org/user name.
  projectName: "shenyu", // Usually your repo name.
  i18n: {
    defaultLocale: "en",
    locales: ["en", "zh"],
    localeConfigs: {
      en: {
        label: "English",
        direction: "ltr",
      },
      zh: {
        label: "简体中文",
        direction: "ltr",
      },
    },
  },
  themeConfig: {
    navbar: {
      logo: {
        alt: "Apache ShenYu Logo",
        src: "img/logo.svg",
        srcDark: "img/logo-light.svg",
      },
      items: [
        { to: "/download", label: "Download", position: "right" },
        { to: "/document", label: "Docs", position: "right" },
        {
          to: "/community/contributor-guide",
          label: "Community",
          position: "right",
          activeBaseRegex: `/community/`,
        },
        { to: "/team", label: "Team", position: "right" },
        { to: "/event", label: "Event", position: "right" },
        { to: "/news", label: "News", position: "right" },
        { to: "/blog", label: "Blog", position: "right" },
        { to: "/users", label: "Users", position: "right" },
        {
          label: "ASF",
          position: "right",
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
          href: "https://github.com/apache/shenyu",
          label: "GitHub",
          position: "right",
        },
        {
          type: "localeDropdown",
          position: "right",
        },
      ],
    },
    prism: {
      theme: lightTheme,
      darkTheme: darkTheme,
      additionalLanguages: [
        "java",
        "properties",
        "nginx",
        "http",
        "lua",
        "json5",
        "protobuf",
      ],
    },
    algolia: {
      // apiKey: "5f882bef2dfc81f5f1b4e5ea87b2f165",
      appId: 'DY1AXAPBQY',
      apiKey: '391ef440955a44a32cbeb5e7db9a2b6c',
      indexName: "apache_shenyu",
      // Optional: see doc section below
      contextualSearch: true,
    },
    imageZoom: {
      // CSS selector to apply the plugin to, defaults to '.markdown img'
      selector: '.markdown img',
      // Optional medium-zoom options
      // see: https://www.npmjs.com/package/medium-zoom#options
      options: {
        margin: 24,
        background: 'rgba(255, 255, 255, 0.2)',
        scrollOffset: 240,
      },
    },
  },
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          editLocalizedFiles: true,
          // Please change this to your repo.
          editUrl: "https://github.com/apache/shenyu-website/edit/main/",
        },
        blog: {
          showReadingTime: true,
          blogSidebarCount: 0,
          blogSidebarTitle: "All Blog Posts",
          editLocalizedFiles: true,
          // Please change this to your repo.
          editUrl: "https://github.com/apache/shenyu-website/edit/main/",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      },
    ],
  ],
  plugins: [
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "community",
        path: "community",
        routeBasePath: "community",
        editUrl: ({ locale, versionDocsDirPath, docPath }) => {
          if (locale !== "en") {
            return `https://github.com/apache/shenyu-website/edit/main/i18n/${locale}/docusaurus-plugin-content-docs-community/current/${docPath}`;
          }
          return `https://github.com/apache/shenyu-website/edit/main/${versionDocsDirPath}/${docPath}`;
        },
        editCurrentVersion: true,
        editLocalizedFiles: true,
        sidebarPath: require.resolve("./sidebarsCommunity.js"),
        showLastUpdateAuthor: true,
        showLastUpdateTime: true,
      },
    ],
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "shenyuNginx",
        path: "shenyuNginx",
        routeBasePath: "shenyuNginx",
        editCurrentVersion: true,
        editLocalizedFiles: true,
        sidebarPath: require.resolve("./sidebarsCommunity.js"),
        showLastUpdateAuthor: true,
        showLastUpdateTime: true,
      },
    ],
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "shenyuClientGolang",
        path: "shenyuClientGolang",
        routeBasePath: "shenyuClientGolang",
        disableVersioning: false,
        includeCurrentVersion: true,
        editCurrentVersion: true,
        editLocalizedFiles: true,
        sidebarPath: require.resolve("./sidebarsCommunity.js"),
        showLastUpdateAuthor: true,
        showLastUpdateTime: true,
      },
    ],
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "shenyuClientDotnet",
        path: "shenyuClientDotnet",
        routeBasePath: "shenyuClientDotnet",
        disableVersioning: false,
        includeCurrentVersion: true,
        editCurrentVersion: true,
        editLocalizedFiles: true,
        sidebarPath: require.resolve("./sidebarsCommunity.js"),
        showLastUpdateAuthor: true,
        showLastUpdateTime: true,
      },
    ],
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "shenyuClientRust",
        path: "shenyuClientRust",
        routeBasePath: "shenyuClientRust",
        disableVersioning: false,
        includeCurrentVersion: true,
        editCurrentVersion: true,
        editLocalizedFiles: true,
        sidebarPath: require.resolve("./sidebarsCommunity.js"),
        showLastUpdateAuthor: true,
        showLastUpdateTime: true,
      },
    ],
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "helm",
        path: "helm",
        routeBasePath: "helm",
        disableVersioning: false,
        includeCurrentVersion: true,
        editCurrentVersion: true,
        editLocalizedFiles: true,
        sidebarPath: require.resolve("./sidebarsCommunity.js"),
        showLastUpdateAuthor: true,
        showLastUpdateTime: true,
      },
    ],
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "event",
        path: "event",
        routeBasePath: "event",
        editUrl: ({ locale, versionDocsDirPath, docPath }) => {
          if (locale !== "en") {
            return `https://github.com/apache/shenyu-website/edit/main/i18n/${locale}/docusaurus-plugin-content-docs-event/current/${docPath}`;
          }
          return `https://github.com/apache/shenyu-website/edit/main/${versionDocsDirPath}/${docPath}`;
        },
        editCurrentVersion: true,
        editLocalizedFiles: true,
        sidebarPath: false,
        showLastUpdateAuthor: true,
        showLastUpdateTime: true,
      },
    ],
    [
      "@docusaurus/plugin-content-blog",
      {
        id: "news",
        routeBasePath: "news",
        path: "news",
        blogSidebarCount: 0,
      },
    ],
    "plugin-image-zoom",
  ],
};
