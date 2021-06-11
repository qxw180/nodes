# Npm Package 版本管理

## [语义化版本](../Semantic%20Versioning.md)

- `npm version patch`：更新补丁版本
- `npm version minor`：更新副版本
- `npm version major`：更新主版本

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

## TODO:版本锁定

同一份代码在不同环境和时间安装出不同的依赖包，依然是可能导致意外的潜在因素，为了保证开发和运行的一致性，我们需要对项目的依赖进行锁定。

在项目中使用 `npm shrinkwrap` 命令，会生成一个 `npm-shrinkwrap.json` 文件，将项目依赖锁定在当前在`node_modules`中使用的特定版本。运行`npm install`时，若发现存在`npm-shrinkwrap.json`，则会覆盖列出的依赖以及`package.json`中的任何语义版本范围。

npm v5 在`npm install`时会自动生成一个`package-lock.josn`文件用于精准的记录所有包的结构、层级和版本号甚至安装源，提供了 “保存” `node_modules`状态的能力。在项目中运行`npm ci`可以保证项目依赖的一致性，`packakge-lock.json`与`npm shrinkwrap`实现的功能完全相同。
