#JavaScript 面向对象编程

##构造函数 Constructor
构造函数是生成对象的模版
在Java等面向对象的编程语言中存在类(class)的概念，用来编写对象的模版
但是ES5规范里并没有类的概念，而是基于构造器和原型链来实现类和继承

####构造函数的原理
其实构造函数本身只是一个函数，当一个普通的函数遇上关键字`new`，那神奇的事情就发生了
函数每次执行都有返回值，如果没有声明返回值则默认返回`undefined`

```	
	function A(x){
		return x * 2;
	}
	function B(x){
		x *= 2;
	}

	A(2);// 4
	B(2);// undefined;
```

当使用`new`执行函数的时候返回值就不一样了
首先`new`关键字会开辟一块内存空间，在函数内部，`this`就指向这块内存空间，
这时如果函数不声明返回值，或者声明的返回值为基本类型，那么返回值为`this`
如果返回类型为`object`那么就返回这个`object`
这样通过`new`关键字就使一个普通的函数变成了生成对象的模版
可以在函数内部通过`this`关键字在生成的对象实例上生成属性和方法
```
	function A(x,y){
		this.x = x;
		this.y = y;
		this.toString = function(){
			return this.x + this.y;
		}
	}

	function B(x,y){
		this.x = x;
		this.y = y;
		this.toString = function(){
			return this.x + this.y;
		}

		return "Constructor return base Type";
	}

	function C(x,y){
		this.x = x;
		this.y = y;
		this.toString = function(){
			return this.x + this.y;
		}

		return {x:x,y:y};
	}
	
	A(1,2);// undefined;
	var a = new A(1,2);
	a.toString();// 3;

	B(1,2);// "Constructor return base Type"
	var b = new B(1,2);
	b.toString();// 3;
	
	C(1,2); // Object {x: 1, y: 2}
	var c = new C(1,2);
	c.toString();// "[object Object]"
```

在上面的例子中方法A和方法B中由于没有声明返回类型或者声明的返回类型为基本类型，所以声明了也白声明，返回的为新开辟的内存空间，即this所指向的部分；
在方法中均对`toSting()`方法进行覆盖，所以通过方法A和方法B生成的实例调用`toString`方法时指向的是我们自己声明的方法；
在方法C中因为返回类型是一个对象，那么生成的实例即为这个对象，覆盖的`toString`方法并没有生效，调用的仍然是继承自Object的`toString`方法；

由此看见我们声明的构造函数如果不通过`new`关键字调用那么就不是我们想要的效果，
我可以通过以下两种方式处理这个问题

1.使用严格模式，没有使用`new`关键字，严格模式下函数内部`this`不能指向全局对象，默认等于`undefined`，对`undefined`进制操作会报错
```
	function A(x){
		'use strict';
		this.x = x;
	}
	A(1); //Uncaught TypeError: Cannot set property 'x' of undefined(…)
```
2.在构造函数内部进行判断;
```
	function A(x){
		if(!(this instanceof A)){
			return new A(x);
		}
		this.x = x;
	}
```

##OOP核心-封装
> 面向对象开发的本质是为了对复杂的事物进行简化
> 将我们关心的属性和行为抽象出来，封装成一个对象
> 这样更符合我们的思维，更加灵活，有利于重用和维护

进行OOP开发的第一步就是进行抽象和封装
例如我们对人的特征进行提取，我们首先找出来我们关心的点，例如我们关心人的一些代表属性(姓名、性别...)和日常行为(走路、说话...)
特征的提取就是我们的抽象过程，完成了抽象的过程我们就可以对我们抽象出的点进行封装
```
	function Person(name,sex){
		this.name = name;
		this.sex = sex;
		this.walk = function(){
			console.log("walking...")
		}
		this.speak = function(word){
			console.log("Speaking:" + word);
		}
	}
```
这样我们完成了抽象和封装，获得一个人的模版，我们用这个模块就可以量产人了(程序届这个事情是不是太简单了哈哈)
```
	var david = new Person("David","boy");
	var lucy = new Person("Lucy","girl");
```
是不是很爽，随随便便就可以`new`一个人了，确实不错，但是这种方法有一个缺点
就是在我们`new`出来的David和Lucy中都有walk和speak两个方法，这两个方法完全一致的，但是David和Lucy每个人都有一份
这就造成了对系统资源的浪费
在Java等面向对象的语言中会有底层的优化，JavaScript的实现不是自动的，是通过`prototype`对象来完成的

#####JavaScript继承机制设计
在JavaScript中每个对象(函数)都有一个属性`prototype`被称为原型对象；
每一个通过构造函数派生出的对象都有一个`__proto__`的非标准属性，这个属性就指向构造函数的原型对象`prototype`
这样每个对象都可以通过`__proto__`访问到原型对象，同一个函数派生出的实例对象共享同一个`prototype`原型对象
使用`{}`创建对象时调用的是`Object()`构造函数，所有原型默认指向`Object.prototype`
```	
	lucy.__proto__;// Person {}
	lucy.__proto__ === Person.prototype;// true
	Object.getPrototypeOf(lucy) === Person.prototype;// true
	Object.getPrototypeOf(lucy) === lucy.__proto__;// true
```
在JavaScript中当获取对象的属性或调用对象的方法时，对象首先会在自身查找，如果没有就向上到原型对象上找
由于原型对象本身也是对象也有自己的原型，在实例对象的原型对象上查找不到属性就会向原型对象的原型对象继续发起查询，直到尽头(null)
这就形成了一个链形的结构即原型链；
最终的源头就是Object，所有的对象都是Object构造函数生成的，Object的也有`prototype`对象，Object的prototype属性指向`null`

我们对上面的代码进行一下改造
```	
	function Person(name,sex){
		this.name = name;
		this.sex = sex;
	}
	Person.prototype.speak = function(word){
		console.log(this.name + " say " + word);
	}

	var lee = new Person("Lee","man");
	lee.speak('Hello');// "Lee say Hello"
```
我们将公用的方法绑定到原型对象`prototype`上，这样派生出来的实例对象都可以访问到这些方法
同时因为是通过引用来实现绑定的，所以我们对`prototype`对象进行就该就能够立刻在所有生成的对象实例生效
这也是JavaScript继承机制的强大之处，可以在运行的过程中对预定义的行为进行修改

通过以下例子更好的感受以下原型链
```	
	// 实例对象的原型是构造函数的prototype属性
	Object.getPrototypeOf(lee) === Person.prototype;// true 
	// 实例可以获取原型上的属性
	lee.speak('Hello');// "Lee say Hello"
	// prototype也有原型对象，默认时Object.prototype
	Object.getPrototypeOf(Person.prototype);// Object {}
	Object.getPrototypeOf(Person.prototype) == Object.prototype;// true
	// 通过原型链查找我们可以获取原型链上的所有属性和方法
	lee.toString();// "[object Object]"
	lee.toString === Object.prototype.toString;// true
	// Object的原型的原型为null，是原型链的尽头
	Object.getPrototypeOf(Object.prototype);// null
```

原型链相关方法
`Object.getPrototypeOf`：方法返回一个对象的原型。
`Object.getPrototypeOf({}) === Object.prototype;// true`
`Object.create`：用于生成对象，并且制定生成对象的原型。
`var lee2 = Object.create(lee);Object.getPrototypeOf(tt) === lee;// true`
`isPrototypeOf`：用来判断一个对象是否是另一个对象的原型。
`lee.isPrototypeOf(lee2);// true`

---
JavaScript没有实现对方法重载的支持，我们可以通过判断参数的个数和类型进行方法的重载
```
	Person.prototype.walk = function(speed,direction){
		if(arguments.length == 1){
			console.log(this.name + " is walking by " + speed + "km/s");
		}else{
			console.log(this.name + " is walking to " + direction +" by " + speed + "km/s");
		}
	}

	lee.walk(1000);// Lee is walking by 1000km/s
	lee.walk(1000,'east');// Lee is walking to east by 1000km/s
```


##OOP核心-继承
JavaScript的继承就是通过原型链来实现的，下面来研究一下如何实现继承
#####原型对象
在研究如何实现继承之前，我们先来好好认识一下原型对象`prototype`
每个函数都有一个`prototype`属性，每个`prototype`都有一个`constructor`属性方向指回函数本身
```
	Person.prototype.constructor === Person;// true
	lee.__proto__.constructor === Person
```
#####最基本的继承
上面说过原型链，JavaScript的继承就是利用通过原型链逐级向上检索的特性来实现
```	
	var proto = {x:1,y:2};
	var obj = {};
	// 要实现obj继承proto，只需要将obj的原型指向proto即可，以下方式均可
	obj.__proto__ = proto;
	Object.getPrototypeOf(obj) = proto;
	Object.setPrototypeOf(obj,proto);
	// 这样obj就实现了对proto的继承，可以获取proto的属性和方法了
	obj.x;// 1;
```
#####构造函数的继承
但是有没感觉很怪，上面的方法是对实例进行操作实现的，这样我们需要对每个实例进行处理，
继承应该是天生的，就像我们一出生就是两个眼睛一个嘴巴，就属于灵长目类人猿亚目人超科，
不应该是出生之后再给你装上两个眼睛一个嘴巴，这不符合逻辑啊 哈哈
OOP编程同样也不应该是这个实现逻辑，也就是继承这个东西应该是构造函数来完成的

那么首先我们想到的就是JavaScript是通过原型链来实现继承的
那么我们把构造函数的原型指向要继承的构造函数的原型对象就可以了
```
	function Person(){

	}
	Person.prototype.sayHello = function(){
		console.log("Hi");
	}

	function Student(){

	}
	Student.prototype = Person.prototype;

	var lee = new Student();
	lee.sayHello();// "Hi"
```
这样Student就能够继承Person了，但是这样是有问题的
当我们在Student上添加方法的时候也会同时添加到Person上
```
	Student.prototype.go2Class = function(){
		console.log("In The Classes");
	}
	var lucy = new Person();
	lucy.go2Class();// "In The Classes"
```
果然如此，显然这是不合理的，
问题就出在父构造函数和子构造函数共享了一个原型对象。
那么来解决这个问题，我们可以让子构造函数的原型指向父构造函数的实例对象，
```
	Student.prototype = new Person();
	Student.prototype.go2Class = function(){
		console.log("In The Classes");
	}
	var lee = new Student();
	lee.sayHello();// "Hi"
	var lucy = new Person();
	lucy.go2Class();// Uncaught TypeError: lucy.go2Class is not a function(…)
```
问题看起来好像是解决了，继承可以实现了，同时修改子类也不会对父类产生影响
但是实际应用中构造函数都是有参数的，通过这些参数来初始化实例对象。
例如：
```	
	function Person(name){
		this.name = name;
	}
	Person.prototype.sayHello = function(){
		console.log("Hi I'am " + this.name);
	}

	function Student(class){
		this.class = class;
	}
	Student.prototype = new Person(???);
```
问题出现了，我们在实现继承的过程中要如何对name进行传参呢，明显不合理。
以下方式为JavaScript的最佳实践
```
	function Person(name){
		this.name = name;
	}
	Person.prototype.sayHello = function(){
		console.log("Hi I'am " + this.name);
	}

	function Student(name,classes){
		this.classes = classes;
		Person.call(this,name);// 调用父类构造函数
	}
	Student.prototype = Object.create(Person.prototype);
	Student.prototype.constructor = Student;
	
	Student.prototype.go2Class = function(){
		console.log("I am in class " + this.classes);
	}

	var lee = new Student("Lee",4);
	lee.sayHello();// "Hi I'am Lee"
	lee.go2Class();// "I am in class 4"
```
利用`Object.creat()`方法创建一个原型为`Person.prototype`的空对象作为`Student`的原型
然后修正原型的构造函数
在构造函数内部通过`apply()`方法调用父类构造函数，初始化对象属性

##OOP核心-多态