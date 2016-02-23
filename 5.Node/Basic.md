#NodeJS 基础

##安装



##NPM
随NodeJs一起安装的包管理工具，可以完成以下工作：
+ 从NPM服务器下载第三方包到本地使用；
+ 从NPM服务器下载第三方命令行程序到本地使用；
+ 将自己编写的包或命令行程序上传到NPM服务器供别人说使用；


+ NPM更新：`npm install npm@latest -g`
+ 安装模块：`npm install pkg@version|latest [-g--save]`
	* `-g`：全局安装
		- 全局安装在`/usr/local`;可以直接在命令行使用；不能使用`require()`引入；
		- 本地安装在工程目录下`node_modules`目录下；可以通过`require()`引入；
	* `--save`：模块名将被添加到`dependencies`，可以简化为参数`-S`
	* `-dev`：模块名将被添加到`devDependencies`，可以简化为参数`-D`。
+ 卸载模块：`npm uninstall [pkg]`
+ 更新模块：`npm update [pkg]`
+ 搜索模块：`npm search [pkg]`
+ 查看已安装模块
	* 查看本地模块：`npm ls`
	* 查看全局模块：`npm ls -g`
+ 初始化项目：`npm init`：启动项目初始化程序，输入项目相关信息完成项目初始化；生成`package.json`文件；
+ 模块发布：`npm publish`

##Node项目目录

+ `bin`：命令行相关代码
+ `doc`：文档
+ `lib`：API相关代码
+ `test`：测试代码
+ `node_modules`目录：第三方模块存放目录
+ `package.json`文件：项目描述文件，`npm install`命令会根据`package.json`下载所需要的包
	* name：项目名称
	* version：项目版本
	> <small>npm版本规则：X.Y.Z三位分别为主板本、次版本、补丁版本。</small>
	* description：项目描述
	* keywords：项目关键字
	* homepage：官网首页
	* author：项目作者
	* contributors：项目贡献者
	* dependencies：项目生成环境依赖模块
	* devDependencies：项目开发环境依赖模块
		- 版本号前缀：`"grunt":"^0.4.1"`  
			+ `^`：表示非主板本变更自动更新
			+ `~`：表示值自动更新补丁版本
			+ 
	* repository：代码托管信息
	* engines：nodejs版本限制
	* scripts：配置命令语句名称，方便调用


##核心模块
+ http：提供HTTP服务器功能
+ url：解析URL
+ fs：与文件系统交互
+ querystring：解析url的查询字符串字符串
+ child_process：新建子进程
+ util：工具
+ path：处理文件路径
+ crypto：加密解密功能，OpenSSL的包装
