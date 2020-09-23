# NPM

npm是nodeJS自带的包版本管理工具，是每个前端开发者的必备工具。在[npmjs](https://www.npmjs.com/)中可以便捷的进行代码获取和共享。

## 常用命令

+ 安装：`npm install <pkg-name>[@<tag|version>]`
  + `-g`：全局安装
  + `--save`：保存信息到package.json，可简化为`-S`
  + `--save-dev`：保存到devDependices，可简化为`-D`
+ 卸载：`npm uninstall --save <pkg-name>`
+ 更新：`npm update`，更新package.json中依赖的package，更新全局安装package可以重新执行全局安装；
+ 检查：`npm outdated`，检查哪些包有新版本
+ 清理：`npm prune`，清理出现在`node_modules`文件夹但未在`package.json`中声明依赖的包
+ list：`npm list --depth=0`
+ `npm home $package`：打卡package的主页
+ `npm repo $package`：打卡package的版本库

## 版本锁定

同一份代码在不同环境和时间安装出不同的依赖包，依然是可能导致意外的潜在因素，为了保证开发和运行的一致性，我们需要对项目的依赖进行锁定。

在项目中使用 `npm shrinkwrap` 命令，会生成一个 `npm-shrinkwrap.json` 文件，将项目依赖锁定在当前在`node_modules`中使用的特定版本。运行`npm install`时，若发现存在`npm-shrinkwrap.json`，则会覆盖列出的依赖以及`package.json`中的任何语义版本范围。

在npm v5进行`npm install`会自动生成一个`package-lock.josn`文件用于精准的记录所有包的结构、层级和版本号甚至安装源，提供了 “保存” `node_modules`状态的能力。在项目中运行`npm ci`可以保证项目依赖的一致性，`packakge-lock.json`与`npm shrinkwrap`实现的功能完全相同。

## 创建自己的package

每个包都有一个描述文件`package.json`

+ Step1. 通过`npm init`初始化项目，生成package.json
+ Step2. 创建入口文件，默认为`index.js`
+ Step3. 发布package，在发布之前请确认是否已经有同名项目存在，如果有则发布过程中会提示帐号权限不足；
  + 注册npm帐号：`npm adduser`；
  + 在客户端登录帐号`npm login`，登录后会在客户端存储证书；
  + 发布：`npm publish`
+ Step4. 更新package
  + 更新版本：`npm version <update_type>`，该命令会更新package.json中的版本号，如果项目使用git管理，那么同事会添加一个git tag
    + `patch`：补丁版本
    + `minor`：副版本
    + `major`：主版本
  + 重新发布：`npm publish`

## 运行环境变量

通过`npm run` 启动的脚本会自动将`package.json`中的各种字段注入到环境变量，共`scripts`脚本引用，变量名为`npm_package_{name}`

``` JSON
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

