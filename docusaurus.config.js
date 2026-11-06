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
  organizationName: "apache",
  projectName: "shenyu",
  i18n: {
    defaultLocale: "en",
    locales: ["en", "zh"],
    localeConfigs: {
      en: {
        label: "English",
        direction: "ltr",
        baseUrl: "/",
      },
      zh: {
        label: "简体中文",
        direction: "ltr",
        baseUrl: "/zh/",
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
        { to: "/document", label: "Docs", position: "right" },
        { to: "/download", label: "Download", position: "right" },
        {
          label: "Community",
          position: "right",
          items: [
            { to: "/community/contributor-guide", label: "Contribute" },
            { to: "/team", label: "Team" },
            { to: "/event", label: "Event" },
            { to: "/users", label: "Users" },
          ],
        },
        {
          label: "Resources",
          position: "right",
          items: [
            { to: "/blog", label: "Blog" },
            { to: "/news", label: "News" },
          ],
        },
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
          className: "navbar-github",
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
          editUrl: "https://github.com/apache/shenyu-website/edit/main/",
        },
        blog: {
          showReadingTime: true,
          blogSidebarCount: 0,
          blogSidebarTitle: "All Blog Posts",
          onInlineAuthors: "ignore",
          onUntruncatedBlogPosts: "ignore",
          editLocalizedFiles: true,
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
        // Keep the orange mark clear on warm light and charcoal dark surfaces.
        extraAttributes: {
          // Keep Cmd/Ctrl + K assigned to the existing documentation search.
          "data-modal-open-on-command-k": "false",
          "data-launcher-button-background-color": "#fff7f1",
          "data-launcher-button-hover-background-color": "#ffe8d9",
          "data-launcher-button-color": "#c44712",
          "data-launcher-button-border": "1px solid #edc1a8",
          "data-launcher-button-box-shadow": "0 4px 16px rgba(74, 35, 15, 0.12)",
          "data-launcher-button-background-color-dark": "#20231f",
          "data-launcher-button-hover-background-color-dark": "#35271e",
          "data-launcher-button-color-dark": "#ffad85",
          "data-launcher-button-border-dark": "1px solid #72503c",
          "data-launcher-button-box-shadow-dark": "0 4px 16px rgba(0, 0, 0, 0.24)",
          "data-modal-header-background-color": "#ffffff",
          "data-modal-header-color": "#20201e",
          "data-modal-header-background-color-dark": "#20231f",
          "data-modal-header-color-dark": "#edeee9",
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
              "How do I use ShenYu with Spring Cloud?",
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
