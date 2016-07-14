#设计模式

##单例模式 Singleton
> 产生唯一的实例，
> 在Java中采用不定义无参构造函数，定义静态`getInstance()`方法的形式只返回唯一实例来实现
> 在JavaScript中没有类的概念，而且要考虑的方面也更多(例如DOM)，所以情况比较特殊
> 以弹出窗为例

	<!-- bad -->
	var createMask = function(){
	   return document,body.appendChild(  document.createElement(div)  );
	}

	$( 'button' ).click( function(){
	   var mask  = createMask();
	   mask.show();
	});

	<!-- singleton -->
	var createMask = function(){
		var mask;
	  	return function(){
	    	return mask || ( mask = document.body.appendChild( document.createElement('div') ) )
	  	}
	}();// 利用闭包和IIFE 返回实例，这样既保证了唯一性，又保证了封装性；
	$( ''button' ).click( function(){
	   mask.show();
	} );

> 我们还可以封装一个Singleton的包装器

	var signleton = function(fn){
		var instance;
		return function(){
			instance || (insance = fn.apply(this,arguments));
		}
	}();

	var createMask = singleton( function(){
		return document.body.appendChild( document.createElement('div') );
	});

##工厂模式 Factory
> 设置参数，根据参数产出实例，实例的类型实在运行的过程中确定的
> 而且这些实例直接都有类似的接口，类似构造函数的功能
	
	function Pet(){
		this.word = "...."
	}

	Pet.prototype.call = function(){
		console.log(this.word);
	}

	function Dog(){
		this.word = "wang wang wang ..."
	}
	Dog.prototype = Object.create(Pet.prototype);
	Dog.prototype.constructor = Dog;

	function Cat(){
		this.word = "miao miao miao ..."
	}

	Cat.prototype = Object.create(Pet.prototype);
	Cat.prototype.constructor = Cat;

	
	function PetFactory(type){
		switch(type){
			case "dog":
				return new Dog();
			case "cat":
				return new Cat();
		}
	}

	var myCat = PetFactory('cat');
	myCat.call();

	var myDog = PetFactory('dog');
	myDog.call();

> 工厂模式一般应用场景为使用接口进行对象实例化和类之间的解耦；

##观察者模式 Observer
> 常用于事件监听，可以实现回调函数的解耦

	Event = function{
		var listen, log, obj, one, remove, trigger, __this;
		obj = {};
		__this = this;
		listen = function(key,callback){
			var stack, _ref;
			stack = (_ref = obj[key]) != null ? _ref : obj;
			return stack.push(callback);
		}
	}


##参考资料
[常用的Javascript设计模式](http://blog.jobbole.com/29454/)