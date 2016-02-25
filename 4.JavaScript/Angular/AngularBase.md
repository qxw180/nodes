#Angular基础


## 特性

+ 双向数据绑定
+ 模版
+ MVVM：Model-View-ViewModel，
	* 控制器：控制angular程序的数据
+ 依赖注入
+ 指令


## 标签


+ 框架标签
	* `ng-app`：标明一个AngularJS应用程序(Angular脚本作用域)，完成以下任务：
		- 自动初始化应用：创建依赖注入；
		- 标记应用作用域：创建根作用域($rootScope)作为应用模型范围；
		- 编译应用程序内DOM，从`ng-app`标记的HTML标签开始，逐步处理DOM中的指令；
		- 载入指令内容相关模块
	* `ng-controller`：Angular控制器，关联一个js文件；
		- 创建一个作用域`$scope`，是根作用域(`$rootScope`)的后继；
		- 这个作用域对所有`ng-controller`标记内的数据绑定有效；
		- 可以在`$scope`中注入数据；
	* `ng-model`：Angular模型
		- Angular会在最邻近的控制器的`$scope`中将其与模型中相同名字的变量绑定到一起；

+ 模版标签
	* `{{}}`：绑定表达式，将括号内表达式运算结果插入到DOM结构中；
	* `ng-bind`：和`{{}}`功能一致，区别是`ng-bind`在angular解析渲染完成后才将数据显示出来；
	* `ng-bind-templete`：同上
	* `ng-repeat`：Angular迭代器
		- 基本：`ng-repeat="item in items"`
		- 过滤：`ng-repeat="item in items | filter:query"`
			+ `filter`为过滤关键字，`query`为Angular模型；
		- 排序：`ng-repeat="item in items | orderBy:orderProp"`
	* `ng-src`：Angular图片路径，
		- 浏览器在完成HTML页面加载，为完成Angular渲染时候会向服务器发起非法请求，如：`http://localhost/img/{{item.path}}`；
		- `ng-src`在Angular渲染完成后向服务器发送图片请求；
	* `ng-view`：

+ `ng-init`：初始化应用程序数据，通常使用使用控制器或模块来代替
+ `ng-click`：angular单击事件绑定
+ `ng-hide`：设置元素是否可见


## 组成部分

###一、模板（Templates）
###二、应用程序逻辑（Logic）和行为（Behavior）
###三、模型数据（Data）

##内建服务
+ `$http`：
+ `$routeProvider`


















