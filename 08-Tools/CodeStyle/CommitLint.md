# 在代码 commit 前校验

基于 git 的 hook 功能可以在代码提交前执行校验工作，[husky](https://typicode.github.io/husky/#/)可以简化 githook 使用。

注意事项：

1. git version 需要大于 2.9
2. 在 git init 之后安装 husky，husky 在安装的过程中会设置 git hook

husky 配置：pre-commit

```sh
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npx lint-staged
```

husky 配置：commit-msg

```sh
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npx --no-install commitlint --edit "$1"
```

## linter & test & type-check

[lint-staged](https://github.com/okonet/lint-staged#readme)可以只对增量代码(本次 commit 代码)进行验证。

lintstage 配置：.lintstagedrc

```JSON
{
  "*.{ts,tsx}": "npm run type-check",
  "*.{js,ts,jsx,tsx}": ["npm run lint", "npm test"]
}
```

## 提交规范

使用[commitlint](https://commitlint.js.org/#/)检验 commit message。支持使用 npm 包进行规范配置。
使用[Commitizen](http://commitizen.github.io/cz-cli/)帮助生成符合规范的 commit

## tag&change log

使用[Standard Version](https://github.com/conventional-changelog/standard-version)配合[Conventional Changelog](https://github.com/conventional-changelog/conventional-changelog)自动化管理版本和 CHANGELOG

## 参考文档

[githooks](https://git-scm.com/docs/githooks)
