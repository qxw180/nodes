> ES6的Class只是一个语法糖，Class时间还是一个Function，用于定义原型(prototype)的；

ES6 Class实现了类的定义，继承和静态方法，但是未实现以下几点

1. 不支持私有属性
2. 不支持多重继承
3. 没有接口概念
4. 

##定义
构造方法：`constructor`

	class Person {
		constructor(name, age, sex) {
			this.name = name;
			this.age = age;
			this.sex = sex;
		}

		isAdult() {
			return this.age >= 18;
		}
	}

	let me = new Person('Lee', 19, 'man');
	me.isAdult();// true;

##继承
子类在`constructor`中必须调用`super`方法，否则新建实例时会报错。
这是因为子类没有自己的`this`对象，而是继承父类的`this`对象。


	class Animal {
		yell() {
			console.log("yell")
		}
	}

	class Person extends Animal {
		constructor(name, age, sex) {
			super();
			this.name = name;
			this.age = age;
			this.sex = sex;	
		}

		isAdult() {
			return this.age >= 18;
		}	
	}

	class Man extends Person {
		constructor(name, age){
			super(name,age,'man');
		}
	}

	let me = new Man('Jade',5);
	console.log(me.isAdult());// false;
	me.yell();

##静态方法

	class Man extends Person {
		static isMan(obj) {
			return obj instanceof Man;
		}
	}

	let me = new Man('Jade',5);
	console.log(Man.isMan(me)); // true
















