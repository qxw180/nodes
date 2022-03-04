# [husky](https://typicode.github.io/husky)

基于[githook](../../01-基础/03-Git/7.%20Git%20Hooks.md)功能可以在代码提交前执行校验工作
husky 可以简化本地 githook 使用，解决了多人协作场景下 githook 配置无法同步问题

**环境要求**：git version 需要大于 2.9

## 配置

1. 安装：`npm install husky -D`
2. 环境配置：
   1. `npm set-script prepare "husky install"`
   2. `npm run prepare`
3. HOOK 配置：`husky add <file> [cmd]`

使用 Husky 配置的 hook 在`.husky`目录下，以 hook 名称命名。
例：执行`npx husky add .husky/pre-commit "npm test"`后，会在`.husky`目录下创建`pre-commit`文件，内容为：

```shell
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npm test
```

## lint 实战

### commit msg lint

[Conventional Commits](../../01-基础/03-Git/Conventional%20Commits.md)是有益的，可以使用[commitlint](https://github.com/conventional-changelog/commitlint)配合 Husky 对开发者提交的 commit 进行验证。

**第一步**：安装 commitlint 客户端和校验配置：`npm install --save-dev @commitlint/{config-conventional,cli}`

**第二步**：创建 commitlint 配置文件

```JS
// commitlint.config.js
{
   extends: ['@commitlint/config-conventional'],
   rules: {
   }
}
```

**第三步**：配置 Husky Hook：`npx husky add .husky/commit-msg 'npx --no -- commitlint --edit "$1"'`

### lint code

为了保证提交代码的质量，在提交之前应该做一些自动化验证，例如代码规范、单测等。安装检查范围可以分为全量测试和增量测试。

#### TS 代码预编译检测

**第一步**：在 package scripts 添加检测脚本：`"type-check": "tsc --pretty --noEmit"`
**第二步**：配置 Husky Hook：`npx husky add .husky/pre-commit 'npm run type-check'`

```sh
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npm run type-check
```

#### Husky + lint-staged 实现增量测试

对代码的验证是比较耗时的，在每次提交的时候我们只需要对本次提交的代码进行验证。
[lint-staged](https://github.com/okonet/lint-staged#readme)可以只对增量代码(本次 commit 代码)进行验证。

**第一步**：安装&配置，执行`npx mrm@2 lint-staged`会自动完成 husky 和 lint-staged 配置，会在`.husky`目录下创建`pre-commit`脚本，内容如下：

```sh
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npx lint-staged
```

**第二步**：检查配置， 第一步完成后 lint-staged 的检查配置默认在`package.json`的`lint-staged`字段下。

为了配置文件的职责清晰，可以将配置提取到单独的文件`.lintstagedrc`：

`key`为 glob 匹配需要被检查的文件，·`value`为检查命令字符串或字符串数组。

```rc
{
  "*.{js,ts,jsx,tsx}": ["npm run lint", "npm test -- --findRelatedTests"]
}
```
