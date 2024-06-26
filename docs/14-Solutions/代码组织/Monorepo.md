# TODO:Monorepo

https://github.com/worldzhao/blog/issues/9

前端代码复用主要是`npm package` + `semver`方案，但是`开发 -> 发布 -> 安装 -> 发布`的流程相对繁琐、在业务场景下有很多项目通用的业务代码需要共享，更新频率较高，使用`package`方案确实有些繁琐。

在项目迭代过程中发现需要将某段代码提取为公共库或组件时，需要创建一个新的仓库，仓库的配置、依赖和工作流等基础工作都需要单独进行一次。发布之后各个项目需要单独安装、更新之后也需要逐个升级。

## Multirepos 和 Monorepo

Multirepos(多仓库)传统方式会根据职责和业务模块进行项目拆分，每个项目一个仓库。
Monorepo(单仓库)只使用一个仓库管理项目的所有代码和资源。

![monorepo](../../assets/images/architecture/monorepo.png)

Monorepo 优点：

1. 提高协同效率，所有人都可以看到全部代码，子项目依赖项目出现问题可以直接修改，无需等待依赖项目修复。
2. 统一的开发规范（代码规范、提交规范、测试覆盖率等）避免重复配置及配置同步问题，降低维护复杂性
3. 提升更新发布效率，被依赖模块更新后所以依赖次模块的项目无需单独安装，发布后统一生效
4. 避免依赖重复安装、Monorepo 框架会对公共依赖模块进行提升

Monorepo 缺点：

1. 代码规模过大，可能影响 IDE 和 Git 运行速度
2. 更高的开发质量要求，公共代码的修改会立刻在全部项目生效、需要完善的自动化测试及 MR 机制为项目更新提供保障
3. git tag 使用问题，tag 针对整个仓库，无法保证各子项目 tag 的独立
4. 在 Monorepo 模式下所有项目都在一个仓库中，需要更加完善的代码管理规范
   1. 权限管理：各子项目通常由不同团队、不同专业方向人员维护，为了避免误改需要 Code Owner 和 MR 机制保证合入代码安全
   2. CI/CD：各子项目的 CI/CD 通常是独立的，在 Monorepo 模式下个项目的 CI/CD 流程需要做路径配置，只有特定路径发生代码变动时触发特定的 CI/CD。

Monorepo 框架主要提供以下功能：

- 本地调试：
- 依赖管理：保证依赖安装的正确性、稳定性以及安装效率
  - 幽灵依赖问题：一个库使用了非其`dependencies`的包
  -
- 版本管理及发布能力：能够基于项目的改动和依赖关系，正确的更新包版本、生成 CHANGELOG、发布版本
- 任务编排能力：统一的任务触发，保证任务执行顺序的同时提升执行效率
  - 范围界定：按需执行、避免无关项目执行
  - 并行优化：
    - 任务之间依赖管理
    - 项目之间依赖管理
  - 缓存优化：增量执行、本地缓存、云端缓存共享

[StateOfJs 2021 monorepo 框架调查](https://2021.stateofjs.com/zh-Hans/libraries/monorepo-tools)

| 框架           | 本地调试 | 依赖管理 | 版本管理及发布能力 | 任务编排能力 |
| -------------- | -------- | -------- | ------------------ | ------------ |
| yarn workspace | ✅       |          | ❌                 | ❌           |
| npm workspace  | ✅       |          |                    | ❌           |
| lerna          | ✅       |          |                    |
| pnpm           |          |          |                    |
| Turborepo      |          |          |                    |
| Rush           |          |          |                    |
| changesets     |          |          |                    |

## npm workspaces

在`package.json`的`workspaces`字段使用`glob`方式定义包，每个包(workspace)需要有自己的`package.json`文件。

```json
{
  "name": "test",
  "version": "1.0.0",
  "workspaces": ["packages/*"]
}
```

- 添加包：`npm init -w <workspace>`
- 依赖管理： `npm <install|ci|uninstall> axios -w <workspace>`
- 运行脚本：
  - 指定 workspace：`npm run <script> --workspace=a`
  - 全部 workspace：`npm run <script> --workspace`
  - 跳过缺失脚本的 workspace：`npm run <script> --workspaces --if-present`

## [Lerna](https://github.com/lerna/lerna)

Lerna 作为老牌 Monorepo 工具被广泛使用，虽然已经停止维护并且社区有很多负面反馈，但是我们还是应该了解，以下是 Lerna 对自己的定义：

> A tool for managing JavaScript projects with multiple packages.
> Lerna is a tool that optimizes the workflow around managing multi-package repositories with git and npm.

Lerna 是一个基于 Git 和 NPM 用来管理包含多个 package 的 JavaScripts 项目的工具。

Lerna 适合管理业务组件库。传统的业务组件库是每个组件一个项目、组件之间还存在依赖关系，单个组件更新时依赖这个组件的其它组件需要安装更新之后再发布。组件本地调试一般使用`npm link`，随着组件数量的上升维护难度会指数级上升。

Lerna 采用 Monorepo 的形式进行包管理，通过分析 git commit 确定哪些包有改动，

Lerna 代码组织形式如下，所有包都放在`packages`目录下。这些包通过 Lerna 提供的能力可以直接使用`require()`引用，无需安装或使用`npm link`。

```text
|--my-lerna-repo
|  |──package.json
|  |──lerna.json
|  └──packages
|     |──package-1
|     |  └──package.json
|     └──package-2
|        └──package.json
```

### Lerna package 管理和发布

`lerna.json`内容如下，`packages`配置的被 Lerna 管理的子项目，Lerna 会遍历匹配目录，目录下包含`package.json`就会被认为是一个子项目。

```JSON
{
  "packages": [
    "packages/*"
  ],
  "version": "0.0.0"
}
```

固定模式和独立模式

- 固定模式：默认模式，全部 package 使用统一的版本号，使用`lerna.json`的`version`维护，每次升级时所用包统一更新。
- 独立模式：各 package 版本独立管理
  - 使用`lerna init --independent`命令初始化项目
  - 将`lerna.json`的`version`设置为`independent`

### Lerna 依赖管理

使用`lerna add`命令可以安装 package，可以是远程仓库的 package，也可以是项目内的本地 package。

- `lerna add babel-core`：Install babel-core in all modules
- `lerna add module-1 --scope=module-2`：Install module-1 to module-2

`lerna add`命令会自动触发`lerna bootstrap`，可以使用`--no-bootstrap`参数跳过

使用`lerna bootstrap`命令可以安装所用子项目的依赖，使用`--hoist`参数在依赖安装同时还会进行依赖提升(将子项目的公共依赖提升到项目根目录安装)。
`lerna bootstrap`除了安装外部依赖外，还会为相互依赖的子项目创建链接。

### Lerna CI/CD

### Lerna 常用命令

- 项目
  - `lerna init`：项目初始化
  - `lerna import <path-to-external-repository>`：导入已有项目，保留 commit 信息
- 依赖
  - `lerna add <package>[@version] [--dev] [--exact] [--peer]`：安装依赖，每次只能安装一个依赖。可以安装
    - `--no-scope`：安装到指定模块(子项目)。如果不指定则在根目录安装、所有模块都可以使用。
    - `--no-bootstrap`：跳过自动`bootstrap`
  - `lerna bootstrap`：
  - `lerna clean`：清理子项目`node_modules`
- `lerna run`：
- `lerna version`：
- `lerna publish`：

## [Turborepo](https://turborepo.org/)

## [pnpm](https://pnpm.io/)
