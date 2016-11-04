#ES6 Module
> 和AMD或CommonJS的模块化设计思想有所区别，ES6的设计思想是尽量静态化，在编译的时候就确定模块的依赖关系，CommonJS和AMD都是在运行的时候进行确定；

模块功能主要有`export`和`import`两个命令构成；

##导出export
一个模块就是一个独立的文件，该文件内的所有变量外部无法获取；
如果希望外部能够读取模块内部的某个变量，就必须使用`export`关键字输出；

	
	// profile.js，输出三个变量
	export var firstName = "Michael";
	export var lastName = "Jordan";
	export var year = 1958;

	// 也可以写成以下形式
	var firstName = "Michael";
	var lastName = "Jordan";
	var year = 1958;
	
	export {firstName, lastName, year};

	// 也支持输出函数或者类
	export function say(){
		return "Hello";
	}

	// 可以使用关键字修改export的名字
	export {
		firstName, 
		familyName as lastName, 
		year
	};
	
`export`命令规定的是对外的接口，必须与模块内部的变量建立一一对应关系。

	// 报错
	export 1;

	// 报错，通过变量还是直接输出1，不是接口
	var m = 1;
	export m;

	// 写法一
	export var m = 1;

	// 写法二
	var m = 1;
	export {m};

	// 写法三
	var n = 1;
	export {n as m};

##加载import
> 使用`import`命令可以加载模块，并接受模块中通过`export`导出的内容；

	// main.js
	import {firstName, lastName, year} from './profile';

	function setName(element) {
	  	element.textContent = firstName + ' ' + lastName;
	}

	// 同样也可以使用as自定义引用变量的名字
	import { lastName as familyName } from './profile';

注意：`import`具有提升效果

	foo();// 可以正确执行，不会报错；

	import { foo } from 'my_module';

`import`语句会执行加载的模块，所有有以下写法
	
	import 'lodash';

模块的整体加载，通过`*`将模块加载到一个对象，通过这个对象引用模块`export`的变量

	import * as jordan from './profile';

	console.log(jordan.firstName);// Michael

##export default 命令
> 以上的例子中使用`import`命令时用户需要知道加载的变量名或函数名，这个体验很不好；
> 通过`export default`命令可以指定模块的默认输出

	// export-default.js
	export default function () {
		console.log('foo');
	}

	// import-default.js
	import customName from './export-default';
	customName(); // 'foo'

使用`import`命令加载default输出是不需要使用大括号的；
`export default`命令用于指定模块的默认输出。一个模块只能有一个默认输出，因此`export deault`命令只能使用一次。所以，`import`命令后面才不用加大括号，因为只可能对应一个方法。

本质上，`export default`就是输出一个叫做default的变量或方法，然后系统允许你为它取任意名字。所以它后面不能跟变量声明语句。

	// 正确
	export var a = 1;

	// 正确
	var a = 1;
	export default a;

	// 错误
	export default var a = 1;

