# this

`this`是一个指针，指向调用函的对象。不同的场景下指向不同：

1. 默认绑定：`this`指向顶层对象`window`，在 Nodejs 环境下为`global`
   1. 独立函数调用
   2. 匿名函数调用
2. 隐式绑定：函数调用在某个对象方法上触发，`this`指向运行时调用该方法的对象
3. 显示绑定：使用`call、apply、bind`等方法触发并显示的绑定`this`指向
4. `new`绑定：使用`new`关键字运行函数会首先创建一个空对象，并将`this`指向这个对象，详见[构造函数](../01.OOP/1.构造函数.md)

除了作为构造函数触发，可以归纳为永远指向调用自己的对象，直接运行实际是通过顶层对象调用。

## 默认绑定和隐式绑定

```JavaScript
var a = {
  b : {
    m : function() {
      console.log(this.p);
    },
    p : 'Hello'
  }
};

// 作为对象方法触发，最后一层作为this指向
a.b.m() // hello

var hello = a.b.m;
hello() // undefined，hello函数通过对象赋值，但是执行的时候是作为独立函数执行，默认绑定到window
var p = "window p";
hello() // "window p"

function sayHi(){
  console.log('Hello,', this.name);
}
var person1 = {
  name: 'Rose',
  sayHi: function(){
    setTimeout(function(){
      console.log('Hello,',this.name);
    })
  }
}
var person2 = {
  name: 'Lee',
  sayHi: sayHi
}
var name='Mike';
person1.sayHi(); // Hello Mike，setTimeout中的匿名函数this指向全局
setTimeout(person2.sayHi,100); // Hello Mike，person2.sayHi是通过setTimeout触发的，属于默认绑定（匿名函数调用）
setTimeout(function(){
  person2.sayHi(); // Hello Lee，通过person2触发，属于隐式绑定
},200);
```

## 显示绑定

使用`apply()`、`call()`和`bind()`显示的设定`this`的指向

- `function.call(thisObj, arg1, arg2, ...)`
- `function.apply(thisObj, [arg1, arg2, ...])`
- `function.bind(thisObj, args1, args2, ...)`

`call`和`apply`的作用一样会立刻执行方法，并将`this`指向传入的对象，唯一区别是方法参数的传入方式不一样，`apply()`是通过数组传入；

`bind`方法不会立刻执行，而是返回一个新的函数，函数的`this`指针绑定到传入的对象，如果`bind`方法的第一个参数是`null`或`undefined`，等于将`this`绑定到全局对象

```JavaScript
var sum = 100;
function add(a, b) {
  return this.sum + a + b;
}
add.call(this, 1, 2) // 103
```

```JavaScript
var a = new Object();
a.x = 123;
a.toString = function(){
  console.log(this.x);
}

a.toString();// 123

var b = new Object();
b.x = 345;
b.toString = a.toString;

b.toString();// 345

// 使用`bind`显示绑定的函数，即使通过对象触发也不会影响this的指向
b.toString = a.toString.bind(a);
b.toString();// 123;
```

对于不支持`bind`方法的浏览器我们可以自己实现

```JavaScript
if(!('bind' in Function.prototype)){
  Function.prototype.bind = function(){
    if (typeof this !== "function") {
      throw new TypeError("Error");
    }

    // 将参数拆解为数组
    const argArr = Array.prototype.slice.call(arguments);
    // 数组第一项为运行时的this对象
    const thisObj = argArr.shift();

    // 运行方法
    const fn = this;

    // 返回一个函数
    return function () {
      return fn.apply(thisObj, argArr);
    };
  }
}
```

## TODO:箭头函数中的`this`

和普通函数需要根据如何被调用来确定`this`的指向，**箭头函数不会创建自己的`this`，会从自己的作用域链上一层来继承`this`**，即箭头函数的`this`指向最近一层非箭头函数的`this`。

因为箭头函数的`this`指向是通过作用域链查找的，所以箭头函数的`this`指针并不是静态的。

```JavaScript
var obj = {
  hi: function() {
    console.log(this);
    return () => {
      console.log(this);
    }
  },
}

let hi = obj.hi;
let deepHi = hi(); // window
deepHi(); // window

deepHi = obj.hi(); // obj {hi: f}
deepHi(); // obj {hi: f}

// 箭头函数的this为上一层非箭头函数hi的this，hi执行过程中this的变化会影响到箭头函数最终的this
```

注意：箭头函数`this`的另外一个重要特性是不可变，箭头函数的上下文绑定是不可改变的，不能使用`call`或`apply`改变，通过`call`或`apply`调用传入的`this`会被忽略。

## TODO:深入 this

在[变量声明、赋值](./01-变量声明、赋值.md)中介绍过执行上下文，EC 在创建的时会绑定`this`指向。

不同类型的 EC 的`this`会绑定到不同的对象

- 全局执行上下文：绑定到全局对象
- 函数执行上下文：
  - 如果是被某个对象调用的函数，那么`this`指向到这个对象
  - 否则指向到全局对象或`undefined`(严格模式下)
