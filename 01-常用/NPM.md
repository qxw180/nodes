# NPM

npm 是 nodeJS 自带的包版本管理工具，是每个前端开发者的必备工具。在[npmjs](https://www.npmjs.com/)中可以便捷的进行代码获取和共享。

## 常用命令

- 安装：`npm install [pkg-name@<tag|version>]`，如果不指定包名，则按照`package.json`中声明的依赖安装，并生成或更新`package-lock.json`
  - `-g`：全局安装
  - `--save`：保存信息到 package.json，可简化为`-S`
  - `--save-dev`：保存到 devDependices，可简化为`-D`
- 安装：`npm ci`，按照`package-lock.json`中的配置安装，在安装的过程中会自动清理现有的`node_modules`目录
- 卸载：`npm uninstall --save <pkg-name>`
- 更新：`npm update`，更新 package.json 中依赖的 package，更新全局安装 package 可以重新执行全局安装；
- 检查：`npm outdated`，检查哪些包有新版本
- 清理：`npm prune`，清理`node_modules`目录，将目录中存储的但是未在`package.json`中声明依赖的包移除
- 列出安装的包：`npm list --depth=0`
- `npm home $package`：打卡 package 的主页
- `npm repo $package`：打卡 package 的版本库
- 配置
  - 查看配置：`npm config list`
  - 修改配置：`npm set <key> <value>`
  - 删除配置：`npm config rm <key>`

## 镜像源管理

设置镜像源：`npm set registry https://registry.npm.taobao.org/`

[nrm](https://github.com/Pana/nrm)可以方便的管理镜像源

- 列出可用源：`nrm ls`
- 查看当前源：`nrm current`
- 切换源：`nrm use <registry>`
- 添加源：`nrm add <registry> <url> [home]`
- 删除源：`nrm del <registry>`
- 测速：`nrm test <registry>`

## 版本锁定

同一份代码在不同环境和时间安装出不同的依赖包，依然是可能导致意外的潜在因素，为了保证开发和运行的一致性，我们需要对项目的依赖进行锁定。

在项目中使用 `npm shrinkwrap` 命令，会生成一个 `npm-shrinkwrap.json` 文件，将项目依赖锁定在当前在`node_modules`中使用的特定版本。运行`npm install`时，若发现存在`npm-shrinkwrap.json`，则会覆盖列出的依赖以及`package.json`中的任何语义版本范围。

在 npm v5 进行`npm install`会自动生成一个`package-lock.josn`文件用于精准的记录所有包的结构、层级和版本号甚至安装源，提供了 “保存” `node_modules`状态的能力。在项目中运行`npm ci`可以保证项目依赖的一致性，`packakge-lock.json`与`npm shrinkwrap`实现的功能完全相同。

## 运行环境变量

通过`npm run` 启动的脚本会自动将`package.json`中的各种字段注入到环境变量，共`scripts`脚本引用，变量名为`npm_package_{name}`

```JSON
{
  "name": "prdc-node",
  "version": "2.0.9",
  "description": "PRDC Sumeru Node ENV",
  "main": "index.js",
  "scripts": {
    "build": "tar -czf dist/prdc-node-${npm_package_version}.tgz prdc-node"
  }
}
```
