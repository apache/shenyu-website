# Dromara Official Website

![Website Deploy](https://github.com/dromara/dromara.github.io/workflows/Website%20Deploy/badge.svg)

This project keeps all sources used for building up Dromara official website which's served at <https://dromara.org/>. 
This site was compiled using [Hugo](https://gohugo.io/).
                                                                                                                      
## Requirement

* [node8+](https://nodejs.org/en/)
* [hugo v0.55.5 extended.](https://github.com/gohugoio/hugo/releases/tag/v0.55.5)

## Run local server

```shell
npm install
npm run build
hugo
hugo serve --bind 0.0.0.0 --disableFastRender
```
Then you will see the site running on <http://localhost:1313>.

## Contributing

* Create new branch
* Commit and push changes to content (e.g. The `.md` file in `/content`).
* Submit pull request to `master` branch

## License

[Apache 2.0 License.](/LICENSE)
