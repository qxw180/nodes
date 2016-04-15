#Angular基础


## 特性

+ 双向数据绑定
+ 模块化
+ MVVM：Model-View-ViewModel，
	* 控制器：控制angular程序的数据
+ 指令 Directive


## 组成部分
1. 模板（Templates）
2. 应用程序逻辑（Logic）和行为（Behavior）
3. 模型数据（Data）

##程序 Application
	var myApp = angular.module('appName',['ngRoot,ngAnimate','myModule1',...]);

官方推荐以一个总的app作为入口点；
一个`app`可以由多个`controller`、`directive`、`service`、`route`、`filter`等部分组成；
在`app`中声明依赖的模块，angular的依赖注入功能会自动载入声明的模块；

##模块 Module
	var module = angular.module('moduleName',[])

##控制器 Controller
	var ctrl = angular.controller('ctrlName',function($scope){
		$scope.data = {
			name:"Kevin",
			age:"27"
		}
	})

##指令 Directive
	var app = angular.module("myApp",[]);
	app.directive("directiveName",function(){
		return {
			restrict: E,//指令调用方式，默认EA
			templete: '<h1>自定义指令</h1>'
		}
	});
*命名指令的时候以驼峰命名的方式命名，但是在模版中使用指令的时候要以`a-b`的形式使用；*

指令的调用方式
1. E：元素名()`<card></card>`
2. A：属性`<div card></div>`
3. C：类名`<div class="card"></div>`
4. M：注释`<!-- directive:card -->`


##模型 Model


##作用域 Scope
+ `$scope`是一个JavaScript对象，带有属性和方法，这些方法可以在视图和控制器中使用；
+ 根作用域`$rootScope`可以作用于整个应用中；是各个`controller`中`scope`的桥梁；


##过滤器 Filter
可以通过管道符号`|`向指令添加过滤器，例：`<p>Name:{{ lastname | orderBy:'name' }}</p>`
+ `uppercase`：大写转换
+ `lowercase`：小写转换
+ `currencry`：货币格式转换
+ `orderBy:modelName`：排序
+ `filter:modelName`：过滤

#####自定义过滤器
	var app = angular.module("myApp",[]);
	app.filter('myFilter',function(x){
		return doSomething(x);
	});

##服务 Service
服务是各控制器公用功能的提炼，是一个函数或对象；

#####内建服务
+ `$http`：与服务器交互服务
+ `$routeProvider`
+ `$location`：返回当前页面URL
+ `$timeout`：
+ `$interval`：

#####自定义服务
	var app = angular.module("myApp",[]);
	app.service("myService",function(){
		this.myFunction = function(){
			return "Hello Angular Service"
		}
	});
	// 调用服务
	app.controller("myCtrl",function($scope,myService){
		console.log(myService.myFunction());
	});
	// 过滤器中使用自定义服务
	app.filter('myFormat',['myService', function(myService) {
	    return function(x) {
	        return myService.myFunction(x);
	    };
	}]);

















