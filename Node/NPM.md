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

#NodeJS Package
NodeJS程序的基本组成单位是js文件，一个js文件就是一个模块；但是复杂的模块为了方便维护要分成多个子模块，由多个子模块放在一个目录中，组成的大模块称做包；

##入口模块
一个包中的所有子模块中需要有一个模块作为包的导出对象，这个模块称为包的*入口模块*；

例：目录结构如下

```
- /home/user/workspace/lib/
	- school/
		teacher.js
		student.js
		main.js
```

其中`school`定义了一个包，`main.js`为入口模块，内容如下：

```
var teacher = require('./teacher')
var student = require('./student')

exports.create = function(name){
	return {
		name: name,
		student: student.create(),
		teacher: teacher.create()
	}
}
```

其他模块需要使用该包的时候，只需要`require('/home/user/workspace/lib/school/main')`引用即可；

但是通过模块名称导入包看起来不是那么舒服直观；
所有当包的入口模块名称为`index.js`的时候，以下两条语句是等价的：

```
require('/home/user/workspace/lib/school/index')
require('/home/user/workspace/lib/school')
```


##自定义入口模块
可以在包中创建一个`package.json`文件来定义入口模块
例：

```
{
	"name":"school",
	"main":"./main.js"
}
```

可以通过`require('/home/user/workspace/lib/school')`来加载模块；