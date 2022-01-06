# Apache ShenYu Official Website

![Website Deploy](https://github.com/apache/incubator-shenyu-website/workflows/Website%20Deploy/badge.svg)

This project keeps all sources used for building up Apache ShenYu official website which's served at <https://shenyu.apache.org/>. 

This website is built using [Docusaurus 2](https://docusaurus.io/), a modern static website generator.

## Requirements

- Node.js version >= 12.13.0 or above (which can be checked by running node -v).
- Yarn version >= 1.5 (which can be checked by running yarn --version).

## Installation

```console
yarn install
```

## Local Development

- Start your localized site using the default locale. Then Your site is accessible at http://localhost:3000/.

```console
yarn start
```

- Start your localized site in dev mode, using the locale of your choice.Then Your site is accessible at http://localhost:3000/zh/.

```console
yarn start --locale zh
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

## Contributing

* Create new branch
* Commit and push changes to content (e.g. The `.md` file in `/docs`).
* Translate the markdown file, commit  and push changes to content (e.g. The `.md` file in `/i18n/zh/docusaurus-plugin-content-docs/current`).
* Check the format by `yarn lint`.
* Submit pull request to `main` branch

## License

[Apache 2.0 License.](/LICENSE)

