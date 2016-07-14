#JavaScript基础-变量&常量
> 在应用程序中，使用变量来为值命名，称为标识符(indentifiers)；
> 常量是一个只读(read-only)的值的标识符；
> JavaScript标识符规则同Java一致：包含数组、字母、$、_，不以数组开头，区分大小写；

##声明
在JavaScript中有三种变量声明方式

1. 使用关键字`var`：声明全局变量和局部变量；
2. 直接赋值：声明全局变量，这种方式是不推荐的，在严格模式下会报错；
3. 使用关键字`let`：在语句块内声明局部变量；

在ES6之前JavaScript不支持常量，ES6支持使用关键字`const`来声明常量；

重复声明：
使用`var`重复声明变量相当于什么都没做
使用`let`和`const`进行重复声明会报错

	{
		let a = 1;
		let a;// 报错 SyntaxError: Identifier 'a' has already been declared
	}

##赋值
声明后未赋值的变量默认值为`undefined`
	
	var a;
	cosnole.log(a);// 输出 undefined

在声明常量的时候必须被初始化，常量在声明后不能在重新被赋值

	const a;// 报错 Uncaught SyntaxError: Missing initializer in const declaration
	const a = 1;
	a = 2;// 报错 Uncaught TypeError: Assignment to constant variable.(…)
	


##作用域
在函数内部声明的变量为局部变量，只能在函数内部使用；
在其它位置声明的变量均为全局变量，可以在任意位置访问；
	
	if(true) {
		var a = 1;
	}
	function tt(){
		var b = 2;
		console.log(b);
	}

	tt();// 输出2
	console.log(a);// 输出 1
	console.log(b);// 报错：Uncaught ReferenceError: b is not defined(…)

在ES6之前没有语句块作用域，只有函数作用域；
使用ES6规范的关键字`let`可以声明块作用域的局部变量

	if(true) {
		let a = 1;
		console.log(a);// 输出 1
	}
	console.log(a);// 报错：Uncaught ReferenceError: a is not defined(…)

常量的作用域与`let`块作用域相同；

##变量提升 variable histing


##数据类型
JavaScript总共有其中不同类型的值

+ 原始类型
	* `Boolean`：布尔值，`true`和`false`
	* `null`：
	* `undefined`：
	* `Number`：数字
	* `String`：字符串
	* `Symbol`：ES6新添加数据类型，它的实例是唯一且不可改变的
+ 对象：`Object`