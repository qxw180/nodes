#ES6 Map&Set

##Map
> 一个简单的键值对映射集合，可以按照插入时的顺序遍历所有的元素

	var scores = new Map();
	scores.set("Lee",88);
	scores.set("Lucy",98);
	scores.set("Rose",28);
	console.log(scores.size);// 3
	scores.get("Lucy");// 98
	scores.has("Jade");// false;
	scores.delete("Rose");

	for(var [key,value] of scores){
		console.log(key,"get",value);
	}
	// Lee get 88
	// Lucy get 98

####Map和Object的区别
+ Object的键值只能为String类型，Map的key值可以为任何类型；
+ Map的size属性可以很方便的获取尺寸
+ Map的元素是按序排列的


##Set
> Set是一组不会重复的值的集合，可以按照添加顺序遍历

	var someThing = new Set();
	someThing.add(88);
	someThing.add("Ball");
	someThing.add("Girl");
	someThing.add("Money");

	console.log(someThing.has("Money"));// ture;
	console.log(someThing.has("money"));// false;
	
	someThing.delete(88);
	console.log(someThing.size)

	for(let item of someThing){
		console.log(item);
	}

####Set和Array的转换
Set > Array：new Array(set);
Array > Set：Array.from();//Set为无重复集合，所以Array中重复的元素都会被删除

####Set和Array的区别
+ 集合的值是不重复的
+ 数组用于判断元素是否存在的indexOf方法效率低下
+ 集合支持根据元素直接删除，而数组必须使用splice方法实现
+ 数组的indexOf方法无法找到NaN的值
