#JavaScript基础

ECMAScript和JavaScript
> <small>ECMAScript是（European Computer Manufacturers Association）组织指定的JavaScript语言标准；JavaScript是对ECMAScript标准的实现</small>

##变量（对值的引用）
+ 变量声明使用`var`关键字；`var`关键字也可以省略，不实用`var`声明的变量为全局变量，不推荐这么使用；
+ 变量重复声明，后声明的变量会覆盖之前声明的变量；
+ 未赋值的变量的值为`undefined`；
+ 变量提升：javascript引擎的运行方式是先进行代码解析，获取所有被声明的变量，然后再一行一行的运行，所有声明的变量都会被提到代码头部，这就是变量提升；
>	console.log(a);
>	var a = 1;
> 这段代码不会报错；运行结果为`undefinde`；相当于
> 	var a;
> 	console.log(a);
> 	a = 1;
> 	*变量提升只对使用var声明的变量起作用*
> 		console.log(b);
> 		b = 2;
> 	运行会报错，不进行变量提升
+ 区块：javascrip中大括号`{}`称为区块，但是javascript中的区块不构成单独的作用域，区块里的变量可以在区块外引用；


## 数据类型
> javascript的所有数据都可视视为对象

+ number：
	* typeof：`"number"`
	* NaN：(Not a Number)字符串转数字出差时
		- NaN不等于任何值，包括不等于本身
		- NaN与任何数运算结果均为NaN
		- 使用`isNaN`方法判断是否为NaN
+ string：
	* typeof：`"string"`
+ boolean：
	* typeof：`"boolean"`
	* undefined、null、false、0、NaN、""会转换为false，其它均为true
+ undefined：
	* typeof：`"undefined"`
+ null：
	* typeof：`"object"`
+ object：
	* typeof：`"object"`
	* 查看对象的所有属性：`Object.keys(obj)`;返回属性key数组
	* 删除对象的属性：`delete obj.attt-name`;返回boolean；该值并不表示是否删除成功，表示的是对象是否已经没有该属性；当删除属性不允许删除时才会返回false；
	* 判断对象是否包含某属性：`attr-name in obj`；
	* 判断是否为继承属性：`obj.hasOwnProperty('attr-name')`
+ array：
	* typeof：`"object"`
+ function：
	* function：`"function"`



###String对象方法
+ replace
> <small>字符串替换方法
> `stringObject.replace(regexp/substr,replacement)`
> `stringObject`：被替换字符串
> `regexp/substr`：必须属性，要替换的字符串或正则表达式(正则表达式如果不加全局声明`/g`，那么默认替换第一个匹配的部分)
> `replacement`：可以是字符串也可以是函数
>> + 字符串：每个匹配字符串均由该字符串替换
>> + 特殊字符串：
>> 		- `$1、$2、...、$99`:与 regexp 中的第 1 到第 99 个子表达式相匹配的文本。
>> 		- `$&`:与 regexp 相匹配的子串。
>> 		- `$\``:位于匹配子串左侧的文本。
>> 		- `$'`:位于匹配子串右侧的文本。
>> 		- `$$`:直接量符号。
>> + 函数：每个匹配都调用该函数，函数返回的文本将作为替换文本；
>> 		- 第一个参数：匹配字符串
>> 		- 中间参数为子表达式（正则表达式括号内的匹配的内容）匹配字符串，个数不限.( $i (i:1-99))
>> 		- 倒数第二个参数为匹配文本字符串的匹配下标位置。
>> 		- 最后一个参数是 stringObject 本身
> </small>


