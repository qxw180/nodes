# [语义化版本 Semantic Versioning](https://semver.org/)

版本格式：`<主版本>.<次版本>.<修丁版本>[-先行版本][+版本编译信息]`，版本号递增规则如下：

## 标准版本号

- Patch releases 修丁版本: 向下兼容的问题修复，一般为 fixbug 版本
- Minor releases 次版本，: 向下兼容的功能增加，一般为 feature 版本，此版本更新的同时修丁版本必须重置为 0
- Major releases 主版本，: 不向下兼容的修改，同上主版本升级后次版本和修丁版本也需要重置

语义化版本要求 package 先有定义好的 API。package 的初始阶段主版本一般都为`0`，表示一切的现行 API 都有可能进行重大调整，在 API 稳定之后发布`1.x.x`版本，视为稳定版本。

## 先行版本号

在发布大版本更新或有重大改动时，往往不能保证版本功能呢 100%没有问题，这时候一般都会有一个个内测、公测之类的过程，这是发布的修饰过的版本称为先行版。
先行版本在修订版本后使用`-`链接，修订版本只能使用由 ASCII 字母数字和连接号 [0-9A-Za-z-] 组成。格式如下：`标准版本-修饰.次数`，例：`1.0.0-alpha.1`、`1.0.0-rc.0`、`1.0.p-rc.1`
被标上先行版本号则表示这个版本并非稳定而且可能无法满足预期的兼容性需求。

常用版本标识含义：

- `alpha`: 内部版本
- `beta`: 公测版本
- `rc`: 即 Release candiate，正式版本的候选版本

## 版本编译信息

在修订版本号或先行版本号之后可以使用`+`连接一个版本编译信息，编译信息不影响版本的优先级。

## [Standard Version](https://github.com/conventional-changelog/standard-version)

Standard Version 是一个版本控制和 CHANGELOG 生成工具。依赖`Semver`和[Conventional Commits](./Conventional%20Commits.md)。可以替换`npm version`完成。

对准守[Conventional Commits](./Conventional%20Commits.md)规范进行提交的项目使用`standard-version`命令可以自动完成以下工作：

1. 从配置文件中获取当前版本，基于`commits`和当前版本计算生成合适的新版本
2. 并更新相关配置文件版本
3. 基于`commits`生成 CHANGELOG(使用[conventional-changelog](https://github.com/conventional-changelog/conventional-changelog))
4. 创建一个新的`commit`包含配置文件以及 CHANGELOG 的更新
5. 使用新的版本创建一个新的`tag`
