#Angular 服务


##路由 Route
通过Angular的路由机制可以实现页面局部刷新，可以做出非常酷的单页APP；
	
	//html
	<div ng-view></div>

	//js
	var routeApp = angular.module('routeApp',['ngRoute']);
	routeApp.config(['$routeProvider'],function($routeProvider){
		$routeProvider.when('path1',{
			templeteUrl: '/path1/index.html',
			controller: 'Ctrl1'
		}).when('path2:id',{
			...
		}).otherwise({
			redirectTo: 'path1'
		})
	})



####[`angular-ui-router`](http://angular-ui.github.io/ui-router/)
Angular自带的路由服务`$routeProvider`不支持深层次嵌套路由，可以使用第三方插件`angular-ui-router`来实现

