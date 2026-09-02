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
  favicon: "img/favicon.svg",
  scripts: [{ src: '/js/error-suppression.js', async: false, defer: false }],
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: "warn",
    },
  },
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
          lastVersion: "current",
          versions: {
            current: {
              label: "2.7.1",
              banner: "none",
            },
          },
          // Please change this to your repo.
          editUrl: "https://github.com/apache/shenyu-website/edit/main/",
        },
        blog: {
          showReadingTime: true,
          blogSidebarCount: 0,
          blogSidebarTitle: "All Blog Posts",
          onInlineAuthors: "ignore",
          onUntruncatedBlogPosts: "ignore",
          editLocalizedFiles: true,
          // Please change this to your repo.
          editUrl: "https://github.com/apache/shenyu-website/edit/main/",
        },
        pages: {
          exclude: ["**/blog.tsx", "**/news.tsx"],
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      },
    ],
  ],
  plugins: [
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      {
        hashed: true,
        language: ["en", "zh"],
        highlightSearchTermsOnTargetPage: true,
        explicitSearchResultPath: true,
        indexDocs: true,
        indexBlog: true,
        indexPages: true,
        docsRouteBasePath: [
          "/docs",
          "/community",
          "/event",
          "/shenyuNginx",
          "/shenyuClientGolang",
          "/shenyuClientDotnet",
          "/shenyuClientRust",
          "/helm",
        ],
        blogRouteBasePath: ["/blog"], // 修复：只索引 /blog，避免与 /news 冲突
        searchResultLimits: 8,
        searchResultContextMaxLength: 50,
        // 忽略某些不需要索引的元素
        ignoreFiles: [
          /node_modules/,
          /\.docusaurus/,
          /build/,
        ],
      },
    ],
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
        onInlineAuthors: "ignore",
        onUntruncatedBlogPosts: "ignore",
        editLocalizedFiles: true,
        editUrl: "https://github.com/apache/shenyu-website/edit/main/",
      },
    ],
    "plugin-image-zoom",
    [
      require.resolve("./plugins/kapa-widget"),
      {
        // Website ID from https://app.kapa.ai -> Integrations -> Website Widget.
        // The KAPA_WEBSITE_ID environment variable overrides this value.
        websiteId: "b6a69ccf-2d41-41cd-96dd-855ef71b46c7",
        projectName: "Apache ShenYu",
        // ShenYu brand orange (same as the logo mark) and the site favicon as icon.
        projectColor: "#FF5C00",
        projectLogo: "https://shenyu.apache.org/img/favicon.svg",
        // The favicon is an orange mark on a transparent background, so the
        // launcher button and modal header use contrasting backgrounds.
        extraAttributes: {
          "data-launcher-button-background-color": "#000033",
          "data-launcher-button-hover-background-color": "#1a1a4d",
          "data-launcher-button-color": "#ffffff",
          "data-modal-header-background-color": "#ffffff",
          "data-modal-header-color": "#000033",
          "data-modal-header-background-color-dark": "#17171a",
          "data-modal-header-color-dark": "#e4e4e7",
        },
        i18n: {
          en: {
            modalTitle: "Apache ShenYu Docs AI",
            launcherButtonText: "Ask AI",
            inputPlaceholder: "Ask a question about Apache ShenYu...",
            disclaimer:
              "Answers are generated by AI from the Apache ShenYu documentation and may be inaccurate. Please verify against the official docs.",
            exampleQuestions: [
              "How do I deploy ShenYu with Docker?",
              "How do I configure the Divide plugin?",
              "How does ShenYu integrate with Spring Cloud?",
              "How do I enable rate limiting?",
            ],
          },
          zh: {
            modalTitle: "Apache ShenYu 文档 AI 助手",
            launcherButtonText: "AI 问答",
            inputPlaceholder: "输入关于 Apache ShenYu 的问题...",
            disclaimer:
              "回答由 AI 基于 Apache ShenYu 文档生成，可能存在错误，请以官方文档为准。",
            exampleQuestions: [
              "如何使用 Docker 部署 ShenYu？",
              "如何配置 Divide 插件？",
              "ShenYu 如何接入 Spring Cloud？",
              "如何开启限流？",
            ],
          },
        },
      },
    ],
  ],
};
