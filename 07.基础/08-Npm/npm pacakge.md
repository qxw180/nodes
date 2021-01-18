# npm package

[npm Docs](https://docs.npmjs.com/)

## 创建自己的 package

每个包都有一个描述文件`package.json`

- Step1. 通过`npm init`初始化项目，生成 package.json
- Step2. 创建入口文件，默认为`index.js`
- Step3. 发布 package，在发布之前请确认是否已经有同名项目存在，如果有则发布过程中会提示帐号权限不足；
  - 注册 npm 帐号：`npm adduser`；
  - 在客户端登录帐号`npm login`，登录后会在客户端存储证书；
  - 发布：`npm publish`
- Step4. 更新 package
  - 更新版本：`npm version <update_type>`，该命令会更新 package.json 中的版本号，如果项目使用 git 管理，那么同事会添加一个 git tag
    - `patch`：修丁版本
    - `minor`：次版本
    - `major`：主版本
  - 重新发布：`npm publish`

## [语义化版本](https://semver.org/lang/zh-CN/)

语义化版本要求 package 先有定义好的 API。package 的初始阶段主版本一般都为`0`，表示一切的现行 API 都有可能进行重大调整，在 API 稳定之后发布`1.x.x`版本，视为稳定版本。

### 标准版本：`[主版本].[次版本].[修丁版本]`

- Patch releases 修丁版本: 向下兼容的问题修复，一般为 fixbug 版本
- Minor releases 次版本，: 向下兼容的功能增加，一般为 feature 版本，此版本更新的同时修丁版本必须重置为 0
- Major releases 主版本，: 不向下兼容的修改，同上主版本升级后次版本和修丁版本也需要重置

### 先行版本

在发布大版本更新或有重大改动时，往往不能保证版本功能呢 100%没有问题，这时候一般都会有一个个内测、公测之类的过程，这是发布的修饰过的版本称为先行版。
先行版本在修订版本后使用`-`链接，修订版本只能使用由 ASCII 字母数字和连接号 [0-9A-Za-z-] 组成。格式如下：`标准版本-修饰.次数`，例：`1.0.0-alpha.1`、`1.0.0-rc.0`、`1.0.p-rc.1`
被标上先行版本号则表示这个版本并非稳定而且可能无法满足预期的兼容性需求。

常用版本标识含义：

- `alpha`: 内部版本
- `beta`: 公测版本
- `rc`: 即 Release candiate，正式版本的候选版本

## 依赖管理

在项目中使用`dependencies`字段制定项目运行依赖的包，使用`devDependencies`指定项目开发依赖的包，格式如下，声明的依赖在`npm install`后都会下载到项目根目录下的`node_modules`目录中：

```JSON
{
  "dependencies": {
    "next": "^9.0.6",
    "next-images": "^1.2.0",
  }
}
```

配置为一个对象，key 为包名，value 为版本限制。版本限制包含两部：当前版本和限定规则，有以下情况：

- 只接受补丁版本更新：
  - `1.0`：只指定到副版本：
  - `1.0.x`：使用 x 代表所有补丁版本
  - `~1.0.4`：使用`~`前缀
- 接受副版本更新：
  - `1`：只指定主版本
  - `1.x`：使用 x 代表所有副版本
  - `^1.0.4`：使用`^`前缀
- 接受所有更新：
  - `*`
  - `x`
- 固定版本：`1.0.4`：明确指定版本号且无任何前缀
