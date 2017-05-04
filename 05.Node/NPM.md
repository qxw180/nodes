#NPM
更新：`[sudo] npm install npm@latest -g`

##package安装
本地安装：当你想在你的模块中通过`require`引用package时应该进行局部安装，程序安装在`./node_modules`目录
全局安装：如果你想在命令行中使用，那么应该进行全局安装；

+ 安装：`npm install <pkg-name>[@<tag|version>]`
	* `-g`：全局安装
	* `--save`：保存信息到package.json
	* `-dev`：保存到devDependices
+ 更新：`npm update`，更新package.json中依赖的package，更新全局安装package可以重新执行全局安装；
+ 卸载：`npm uninstall --save <pkg-name>`

##[语义化版本](http://semver.org/lang/zh-CN/)
NPM建议了一个版本规范，用来表示发布版本的修改种类
NPM版本由三部分组成：`[主版本].[副版本].[补丁版本]`

+ Patch releases 补丁版本: `1.0 or 1.0.x or ~1.0.4`
+ Minor releases 副版本，: `1 or 1.x or ^1.0.4`
+ Major releases 主版本，: `* or x`

##创建自己的package
+ Step1. 通过`npm init`初始化项目，生成package.json
+ Step2. 创建入口文件，默认为`index.js`
+ Step3. 发布package，在发布之前请确认是否已经有同名项目存在，如果有则发布过程中会提示帐号权限不足；
	* 注册npm帐号：`npm adduser`；
	* 在客户端登录帐号`npm login`，登录后会在客户端存储证书；
	* 发布：`npm publish`
+ Step4. 更新package
	* 更新版本：`npm version <update_type>`，该命令会更新package.json中的版本号，如果项目使用git管理，那么同事会添加一个git tag
		- `patch`：补丁版本
		- `minor`：副版本
		- `major`：主版本
	* 重新发布：`npm publish`

##Scope package
> Scope package是类似多个模块的命名空间，例：`@scope/package-name`，在@和/直接的为包名；
> 每个用户都有一个score，`@username/package-name`

更多信息参考：https://docs.npmjs.com/getting-started/scoped-packages


##dist-tags
`npm dist-tag add <pkg>@<version> [<tag>]`


##Command

+ `npm bin [-g]`：查看package安装目录
+ `npm config`：管理NPM配置文件
	* `npm config set key value`
	* `npm config get key`
	* `npm config list`
	* `npm config delete key`
	* `npm config edit`：打开配置文件
+ `npm init`：初始化项目，生成一个package.json
	* `-y|--yes`：使用默认选项，尽量少提问题
+ `npm ls`：以树状结构列出安装的所有package即依赖
+ `npm run-script <command> [-- <agrs>]`：运行在package.json中`scripts`标签中定义的命令，如果没有批评命令则会列出定义的所有命令；
	* NPM2.0在执行命令的时候可以定制参数，NPM会将`--`之后的参数直接传递到你的命令中；
+ `npm dedupe`：清理包依赖关系，减少重复依赖


##Configuration

`package.json`

+ `name`：
+ `version`：
+ `description`：
+ `keywords`：
+ `homepage`：
+ `bugs`：项目问题反馈网址或Email
+ `license`：
+ `author`：
+ `contributors`：
+ `files`：
+ `main`：模块ID，项目入口
+ `bin`：
+ `man`：配置man命令查找地址
+ `scriptes`：定义命令
