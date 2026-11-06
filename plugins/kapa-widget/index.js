/**
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Docusaurus plugin that injects the kapa.ai "Ask AI" website widget.
 *
 * Why a plugin instead of `scripts` in docusaurus.config.js:
 *   - the site is bilingual (en / zh). `injectHtmlTags` runs once per locale
 *     build, so we can set `data-language` and the UI copy per locale.
 *   - the widget is skipped entirely until a real website id is configured,
 *     so the site keeps building before the kapa project is set up.
 *
 * Widget attribute reference:
 *   https://docs.kapa.ai/integrations/website-widget/configuration
 */

const WIDGET_SRC = "https://widget.kapa.ai/kapa-widget.bundle.js";
const PLACEHOLDER_ID = "REPLACE_WITH_KAPA_WEBSITE_ID";

/** Docusaurus locale -> kapa `data-language` code. */
const LANGUAGE_MAP = {
  en: "en",
  zh: "zh",
};

module.exports = function kapaWidgetPlugin(context, options = {}) {
  const {
    websiteId: configuredWebsiteId,
    projectName = context.siteConfig.title,
    projectColor = "#25c2a0",
    projectLogo,
    /** Per-locale UI copy. Keys are Docusaurus locales. */
    i18n = {},
    /** Extra raw `data-*` attributes merged last (override anything above). */
    extraAttributes = {},
  } = options;

  // Environment variable wins so CI / local runs can override the config.
  const websiteId =
    process.env.KAPA_WEBSITE_ID || configuredWebsiteId || PLACEHOLDER_ID;
  const locale = context.i18n.currentLocale;
  const enabled = websiteId !== PLACEHOLDER_ID;

  return {
    name: "shenyu-kapa-widget",

    injectHtmlTags() {
      if (!enabled) {
        if (locale === context.i18n.defaultLocale) {
          console.warn(
            "[kapa-widget] KAPA website id not configured; Ask AI widget is disabled."
          );
        }
        return {};
      }

      const copy = i18n[locale] || i18n[context.i18n.defaultLocale] || {};

      const attributes = {
        src: WIDGET_SRC,
        async: true,
        "data-website-id": websiteId,
        "data-project-name": projectName,
        "data-project-color": projectColor,
        "data-project-logo": projectLogo,
        "data-language": LANGUAGE_MAP[locale] || "en",

        // Follow the Docusaurus color-mode toggle (<html data-theme="dark">).
        "data-color-scheme-selector": "html[data-theme=dark]",

        // Keyboard shortcut: Cmd/Ctrl + K opens the Ask AI modal.
        "data-modal-open-on-command-k": "true",

        // Privacy: no tracking cookies / fingerprinting on an ASF site.
        "data-user-analytics-cookie-enabled": "false",
        "data-user-analytics-fingerprint-enabled": "false",

        // Locale-specific copy (falls back to kapa defaults when undefined).
        "data-modal-title": copy.modalTitle,
        "data-launcher-button-text": copy.launcherButtonText,
        "data-ask-ai-input-placeholder": copy.inputPlaceholder,
        "data-chat-disclaimer": copy.disclaimer,
        "data-example-questions": Array.isArray(copy.exampleQuestions)
          ? copy.exampleQuestions.join(",")
          : copy.exampleQuestions,

        ...extraAttributes,
      };

      // Drop undefined values so they are not rendered as `attr="undefined"`.
      Object.keys(attributes).forEach((key) => {
        if (attributes[key] === undefined || attributes[key] === null) {
          delete attributes[key];
        }
      });

      return {
        headTags: [
          {
            tagName: "script",
            attributes,
          },
        ],
      };
    },
  };
};
