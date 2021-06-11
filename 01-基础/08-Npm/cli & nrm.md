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

## [NPM 包管理](./pacakge.md)

## [NPM 脚本](./scripts.md)

## [版本管理](./package%20version.md)
