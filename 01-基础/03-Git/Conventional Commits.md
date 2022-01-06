# [约定式提交 Conventional Commits](https://www.conventionalcommits.org/)

Conventional Commits 是一个轻量级的 git commit messages 格式规范约定
提供了一组简单的规则来生成明晰的 commit history。
基于这些规则生成的 commit history 可以轻松的实现一些自动化工具。

使用 Conventional Commits 有以下好处：

1. 清晰明了的向其他人传达修改的性质
2. 配合自动化工具提升开发效率
   1. 自动生成 ChangeLog
   2. 基于提交的类型自动计算出合适的语义化版本

可以使用[CommitLint](../../08-Tools/CodeStyle/CommitLint.md)辅助进行消息格式验证。

## commit message 的结构

```bash
<TYPE>[(SCOPE)]: <标题|描述>
<空行>
[正文|详细信息]
<空行>
[注脚(可以是多行)]
```

例子：

```text
fix: prevent racing of requests

Introduce a request id and a reference to latest request. Dismiss
incoming responses other than from latest request.

Remove timeouts which were used to mitigate the racing issue but are
obsolete now.

Reviewed-by: Z
Refs: #123
```

**TYPE**：

`feat`：增加一个新功能
`fix`：修复 bug
`docs`：只修改了文档
`style`：做了不影响代码含义的修改，空格、格式化、缺少分号等等
`ci`：
`test`：增加测试或更新已有的测试
`build`：
`chore`：构建或辅助工具或依赖库的更新
`refactor`：代码重构，既不是修复 bug，也不是新功能的修改
`perf`：改进性能的代码

**SCOPE**：在`type`后使用括号添加`scope`信息，用来提供额外的上下文信息

## Conventional Commits & Semantic Versioning

Conventional Commits 部分元素有其特殊含义且和 Semantic Versioning 存在对应关系。

- `TYPE`字段用来描述 commit 类型
  - `fix`：表示修复代码 bug，与 Semantic Versioning 的`PATCH`对应
  - `feat`：表示添加新特性，与 Semantic Versioning 的`MINOR`对应
- 注脚：当注脚包含`BREAKING CHANGE:`时表示破坏性修改，与 Semantic Versioning 的`MAJOR`对应
- 范围：当类型或范围后使用`!`修饰也表示包含破坏性修改

**BREAKING CHANGE**：表示产生了破坏性无法向上兼容的变更与 Semantic Versioning 的`MAJOR`对应。
任意`type`的 commit 都可以是 BREAKING CHANGE 。有以下两种方式标识当前 commit 是一个 BREAKING CHANGE ：

1. `type`或者`scope`以`!`结尾
2. `footer`以`BREAKING CHANGE:`开头

## [Commitizen](https://github.com/commitizen/cz-cli)

Commitizen 是一个可以帮助我们生成 Conventional Commits 的工具，使用时只需要按照提示填写相关信息，不需要关注 Conventional Commits 规范。

- Step1：`npm i -D commitizen`
- Step2：配置项目`npx commitizen init cz-conventional-changelog --save-dev --save-exact`，会对项目做如下修改
  - 安装`cz-conventional-changelog`
  - 添加配置到 package.json，我们可以手动将配置移动到`.czrc`
- Step3：在 package scripts 里面添加`cz: git-cz`来代替`git commit`执行
- Step4：执行`git add`将修改添加到 stage，执行`npm run cz`
- Step5：按照提示填写相关信息

```rc
<!-- .czrc配置 -->
{
  "path": "cz-conventional-changelog"
}
```

### `git commit`自动执行`git-cz`

为了防止某些不熟悉或者不按规范操作的用户仍然使用`git commit`进行提交

### TODO:为 multi-repo 配置 Commitizen

## [commitlint](https://github.com/conventional-changelog/commitlint)

[使用 commitlint 配合 husky 校验 commit](../../08-Tools/CodeStyle/Husky.md)

## [Standard Version](https://github.com/conventional-changelog/standard-version)

符合 Conventional Commits 的仓库可以使用 Standard Version 实现以下自动化功能：

1. 更新适当的 Semantic Versioning，会更新 package 相关文件
2. 添加 git tag
3. 生成 CHANGELOG，依赖[Conventional Changelog](https://github.com/conventional-changelog/conventional-changelog)实现

然后将修改和生成的 CHANGELOG 生成一个新的 commit。

配置步骤：

1. 安装：`npm i --save-dev standard-version`
2. 添加：package scripts `"release": "standard-version --no-verify"`，`--no-verify`可以忽略 githook 检查，standard-version 生产的 commit msg 可能不符合项目配置，根据实际场景选择使用。
