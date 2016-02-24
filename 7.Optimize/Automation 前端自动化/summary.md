#前端自动化概述

###主要任务
+ sass的编译（gulp-sass）
+ 自动添加css前缀（gulp-autoprefixer）
+ 压缩css（gulp-minify-css）
+ js代码校验（gulp-jshint）
+ 合并js文件（gulp-concat）
+ 压缩js代码（gulp-uglify）
+ 压缩图片（gulp-imagemin）
+ 自动刷新页面（gulp-livereload）
+ 图片缓存，只有图片替换了才压缩（gulp-cache）
+ 更改提醒（gulp-notify）
---

####gulp

- 使用步骤
	1. 安装nodejs
	2. 安装gulp：`npm install -g gulp`
	3. 创建package.json：`npm init`
	4. 项目目录安装gulp：`npm install --save-dev gulp`
	> <small>使用`--save`来更新`package.json`文件,将保存配置信息至`package.json`，更新`devDependencies`值;以表明项目需要依赖gulp;
	> 使用`-dev`保存至`package.json`的`devDependencies`节点，不指定`-dev`将保存至`dependencies`节点
	> 全局安装gulp是为了执行gulp任务，本地安装gulp则是为了调用gulp插件的功能</small>
	5. 新建gulpfile.js，创建gulp任务
	6. 执行gulp：`gulp [task_name]`


- 常用命令
	+ gulp安装：`npm install -g gulp`
	+ gull插件安装：`npm install [plugin-name] --save-dev `
	+ 执行gulp任务：`gulp [task_name]`

- 常用插件
	+ 

- gulp API
	+ task
	+ watch
	+ src
	+ dest


---

#### Grunt
	自动化工具，自动完成压缩、编译、单元测试、代码校验等工作

+ 安装：`npm install -g grunt-cli`
+ 查看版本：`gulp -v`

---

#### Yeoman
	用来在项目立项阶段生成项目的文件和代码结构；

+ 安装：`npm install -g yo`
+ generator：Yoman Generator实际为npm安装包，Yoman为运行环境
	* 查找：
	* 安装：`npm install [generator-name]`
	* 生成：`yo [name]`
	* 


---

#### Bower
	Web包管理器，用来跟踪管理web项目框架、库、公共部分等；
	安装：`npm install -g bower`

+ 初始化项目：执行命令`bower init`，然后填写信息，生成`bower.json`文件；
+ 安装：`bower install [plugin>]--save-dev`
+ 卸载：`bower uninstall [plugin] -S-D`

> <small>plugin可以是bower维护的插件名。在`http://bower.io/search`可以进行搜索
> 也可以输入github短写，例如：`jquery/juquery`
> 也可以是github的路径，例如：`https://github.com/jquery/jquery.git`
> 也可以通过各大网站维护的CDN安装，例如：`http://apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js`</small>


+ 配置：项目根目录下的`.bowerrc`文件为Bower的配置文件
	* directory：存放库文件的子目录名。
	* json：描述各个库的json文件名。
	* endpoint：在线索引的网址，用来搜索各种库。
	* searchpath：一个数组，储存备选的在线索引网址。如果某个库在endpoint中找不到，则继续搜索该属性指定的网址，通常用于放置某些不公开的库。
	* shorthand_resolver：定义各个库名称简写形式。
