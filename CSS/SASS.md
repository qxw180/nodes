#CSS预处理器-SASS&Compass
	
##环境搭建
1. 安装ruby：`apt-get install ruby`
	- 可以考虑安装RVM（Ruby Vsersion Manger）ruby版本管理工具：https://rvm.io
		* 列出安装的ruby版本：`rvm list`
		* 安装具体版本ruby：`rvm install [2.2.9]`
		* 切换版本号：`rvm use [2.2.9]`
		* 设置默认版本：`rvm use --default [2.2.9]`
	- ruby包管理工具gem，安装ruby过程中已经自动安装
		* 修改软件包sources（国内网路问题）
			- 删除现有sources：`gem sources --remove https://rubygems.org/`
			- 添加淘宝sources：`gem sources -a https://ruby.taobao.org/`
			- 查看sources：`get sources -l`
		* 安装ruby程序：`gem install [程序名]`
		* 删除ruby程序：`gem uninstall [程序名]`
		* 更新所有ruby程序：`gem update`
		* 更指定版本ruby程序：`gem install [程序名] --version=程序版本`
		* 删除定版本ruby程序：`gem uninstall [程序名] --version=程序版本`
		* 查看本来安装ruby程序：`gem list`
2. 安装sass：`gem install sass`；
3. 安装compass：`gem install compass`；


##Sass
1. Sass 常用命令
	- 编译：`sass [source.scss] [compiled.css]`;
	- sass scss互转：`sass-convert main.scss main.sass`;
2. Sass 语法
	- 变量：
		* 普通变量：`$var_name: var_value`;例：`$title-font:"Microsoft Yahei"`;
		* 默认变量：在普通变量后加上 `!default`；
		* 作用域：sass支持局部变量和全局变量
	- 引入文件：`@import [file_name],[file_name2],...`
	- 注释
		// 不会输入到生成css文件
		/\* 会输入到生成css文件 \*/ 
	- 类嵌套
		.main{
			.title{ }
		}
	- 父类选择器 `&:hover{}`
	- 属性嵌套
		font{
			family:"Yahei";
			color:#fff;
			size:12px;
		}
	- function 跟代码块无关的函数
	- mixin 可重用代码块 `@include` 方式调用；传入列表参数（1px solid #fff）可以用$border...这种形式声明；
	- Sass支持数值计算，而且可以带单位（px等），所以在数值计算过程中不允许单位混用
	- `@extend` 类继承，不可以继承嵌套选择器；
	- 占位符%：使用占位符代替.表示只用于继承的选择器，不会输出到css中；
	- `@media` 可以嵌套在css规则中，最后生成css会提到样式最高级；
	- `@at-root` 顶层输出，在sass编写过程中保持嵌套规则，避免输出css嵌套过深影响效率；
	- sass 支持`@if @else @else if @each @for @while` 等语句
3. Sass数据类型
	- 数字：1、10px
	- 字符串：
	- 颜色：blue #fff rgba()
	- 布尔值：true false
	- 空值：null
	- 值列表：使用空格或逗号分割

##Compass

	以下划线开头的文件称为局部文件，主要用来被其它sass文件引用，在编译的时候不会被编译；
	通过config.rb文件来配置项目

1. Compass 常用命令
	- 项目创建：`compass creat [project_name]`
	- 项目编译：`compass compile [path/to/project]`
	- 项目监听：`compass watch [path/to/project]`
2. Compass 配置文件
	- require：插件引入
	> <small>如果在sass文件重重复引入插件，生成的css会按照引入重复生成css代码
	> 避免插件重复引入,可以引入插件 `compass/import-once/activate`;
	> 在引入插件后加！可以强制重复引入</small>
	- css_dir：编译生产css存放目录
	- sass_dir：sass原文件目录
	- images_dir：图片目录
	- javascrits_dir：js目录
	- output_style 输出css样式
		expanded：手动书写样式
		nested：保持缩进
		compact：单行
		compressed：发布样式；/*! */注释可以被保留；
3. Compass 核心模块
> Compass有七大主要模块，只有Reset和Layout模块需要特殊声明引入，其它默认引入
	- Reset：`@import "compass/reset"`
	- Layout：`@import "compass/layout"`
		+ Grid Backgrounds
		+ Sticky Footer
		+ 
	- CSS3：css3属性前缀相关
	- Helpers：浏览器兼容设置，会影响其它模块的输出结果
	- Typography：文本样式相关
	- Utilities：
	- Browser
4. 常见问题处理
	- 原文件中包含中文编译报错：修改`C:\Ruby\lib\ruby\gems\1.9.1\gems\sass-3.3.14\lib\sass\engine.rb`，在最下面插入`Encoding.default_external = Encoding.find('utf-8')`
5. 第三方插件
	- 浏览器样式重置插件 compass-normalize; `gem install compass-normalize`

##normalize
1. 各大模块：引入方式`@import "normalize/[module_name]"` 例`@import "normalize/base"`
	base：html、body、字体、文字大小、边距
	html5：h5中新增元素
	links：a编译样式
	typography：段落相关
	embeds：img svg等
	groups：
	forms：表单相关
	tables：表格相关