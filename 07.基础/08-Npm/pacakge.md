# npm package

npm pacakage 是 js 程序共享的主要途径，npm package 主要有两种使用场景，一种是作为命令行工具安装使用，一种是作为一个功能模块在其它应用中被引用。
一个 package 主要由执行程序和 package.json(即 package 的元数据)两部构成

## package.json

`package.json`是 nodeJS 项目的描述文件

常用[字段列表](https://docs.npmjs.com/cli/v6/configuring-npm/package-json)

1. `name`：全部小写，没有空格，可以使用下划线或者横线
2. `version`：版本，格式`主板本.副版本.补丁版本`
3. `description`：描述信息，有助于搜索
4. `keywords`：关键字
5. `author`：作者
6. `license`：开源协议
7. `main`：入口文件，一般都是 index.js
8. `bin`：指定内部命令对应的可执行文件
9. `config`：添加命令行环境变量
10. `scripts`：脚本，参考[NPM 脚本](./scripts.md)
11. `dependencies`：生产环境中需要用到的依赖，参考[包版本管理](./package%20version.md)
12. `devDependencies`：开发、测试环境中用到的依赖

## 安装目录

在 MacOS 系统下默认安装路径为：`/usr/local/bin/node`
全局安装的 package 目录是`/usr/local/lib/node_modules`，npm 也是也全局安装的 package，也在这个目录下安装
非全局安装的 package，在安装的过程中 npm 会从当前目录开始逐级向上遍历，找到存在`package.json`文件或`node_modules`目录的目录安装，如果未找到则在当前目录安装。

## 创建自己的 package

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

## TODO:入口模块

一个包中的所有子模块中需要有一个模块作为包的导出对象，这个模块称为包的*入口模块*；例，目录结构如下：

```text
- /home/user/workspace/lib/
  - school/
    - teacher.js
    - student.js
    - main.js
```

其中`school`定义了一个包，`main.js`为入口模块，其他模块需要使用该包的时候，只需要`require('/home/user/workspace/lib/school/main')`引用即可。但是通过模块名称导入包看起来不是那么舒服直观。所有当包的入口模块名称为`index.js`的时候，以下两条语句是等价的：

```javascript
require("/home/user/workspace/lib/school/index");
require("/home/user/workspace/lib/school");
```

可以在包中创建一个`package.json`文件来定义入口模块，例：

```JSON
{
  "name":"school",
  "main":"./main.js"
}
```

可以通过`require('/home/user/workspace/lib/school')`来加载模块；

## TODO:bin 字段

使用`bin`字段配置命令并指定对应的 JS 文件，npm 安装 package 之后如果发现安装的包有`bin`字段配置，会在`node_modules/.bin/`目录下按照配置建立链接，使用`npm run`运行时会将`node_modules/.bin/`目录加入系统的 PATH 变量，因此在运行 npm 时，就可以不带路径，直接通过命令来调用这些脚本。

```JSON
// 声明
{
  "name": "hello",
  "bin": {
    "hello": "./bin/hello.js"
  },
}
// 引用
{
  "dependencies": {
    "hello": "*"
  },
  "scripts": {
    "sayhello": "hello"
  }
}
```

## TODO:开发一个命令行工具

framework及工具
