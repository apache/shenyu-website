# Apache ShenYu Website Agent Guide

Read the [README](README.md) and the [Issue and Pull Request guide](community/2-issue-pr.md) before making changes.

## Edit the right docs

- Current ShenYu docs live in `docs/`. Check the corresponding Chinese page under `i18n/zh/docusaurus-plugin-content-docs/current/` when you change user-facing instructions or behavior. Use the translation directory for the same content plugin when editing other sections.
- Released docs live in `versioned_docs/`, with Chinese translations in the matching version directory under `i18n/zh/docusaurus-plugin-content-docs/`. Update only the releases the change applies to.
- Preserve front matter, page IDs, and explicit heading anchors unless the change requires updating them. If you move or rename a page, check inbound links and sidebar entries.
- Verify configuration keys, defaults, and examples against the ShenYu source or release they describe. State what you could not verify rather than guessing.

## Validate changes

- Follow the [build workflow](.github/workflows/deploy.yml) for the Node.js version and Yarn setup. Run `yarn lint` for Markdown changes.
- Run `yarn build` for changes to rendered pages, navigation, or site configuration. Check the build output for warnings related to your changes, including broken links. Preview the affected locales when the rendered output changes.
- In the PR, link the relevant issue and report the commands you actually ran, their results, and any relevant checks you skipped.

## Review AI-assisted changes

- Check the final diff for mismatched languages or versions, inaccurate examples, and broken links or anchors. Verify claims against the relevant source, rendered page, or check output.
- For each finding, name the file and section, explain when the problem occurs and who it affects, and give the supporting evidence. Label unverified concerns as questions. Treat AI suggestions as review input for the human contributor.
