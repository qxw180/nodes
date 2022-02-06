# this

`this`指的是函数执行的主体、当前运行环境或当前对象，`this`在不同的场景下指向不同，`this`的值是在执行的时候确定的。

1. 全局环境或直接调用函数，`this`指向顶层对象`window`，在 Nodejs 环境下为`global`
2. 构造函数，即使用`new`关键字运行函数，`this`指向实例对象
3. 对象方法，`this`指向运行时调用该方法的对象
4. `call、apply、bind`：`this`为方法的第一个参数
5. 箭头函数：`this`指向函数所在作用域的上下文环境

## 特别注意情况

```JavaScript
var a = {
  b : {
    m : function() {
      console.log(this)
      console.log(this.p);
    },
    p : 'Hello'
  }
};

a.b.m() // hello

var hello = a.b.m;
hello() // undefined，this指向全局对象`window`
var p = "window p";
hello() // "window p"
```

数组循环中的 this

```JavaScript
var o = {
  v: 'hello',
  p: [ 'a1', 'a2' ],
  f: function f() {
    this.p.forEach(function (item) {
      console.log(this.v + ' ' + item);
    });
  }
}
o.f()
// undefined a1
// undefined a2
// 循环中的this指向window

// 解决方法指定第二变量，改变this指向
var o = {
  v: 'hello',
  p: [ 'a1', 'a2' ],
  f: function f() {
    this.p.forEach(function (item) {
      console.log(this.v + ' ' + item);
    }, this);
  }
}
o.f()
// hello a1
// hello a2
```

## 使用 call 和 apply

`apply()`与`call()`的唯一区别是方法参数的传入方式不一样，`apply()`是通过一个数组传入；

- `function.call(obj, arg1, arg2, ...)`
- `function.apply(obj, [arg1, arg2, ...])`

```JavaScript
var sum = 100;
function add(a, b) {
  return this.sum + a + b;
}

add.call(this, 1, 2) // 103
```

## 使用`bind`

`function.bind(obj, args1, args2, ...)`：将函数体内的`this`绑定到某个对象，然后返回一个新方法，如果`bind`方法的第一个参数是`null`或`undefined`，等于将`this`绑定到全局对象

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

b.toString = a.toString.bind(a);
b.toString();// 123;
```

对于不支`bind`方法的浏览器我们可以自己实现

```JavaScript
if(!('bind' in Function.prototype)){
  Function.prototype.bind = function(){
    var fn = this;
    var context = arguments[0];
    var args = Array.prototype.slice.call(arguments, 1);
    return function(){
      return fn.apply(context, args);
    }
  }
}
```

## 箭头函数中的 this

箭头函数没有`prototype`也没有自己的`this`指向，箭头函数的`this`指向为为定义**函数所在作用域的上下文**，即箭头函数声明时所在的对象的`this`指向；

箭头函数声明之后`this`的指向不会再改变。

```JavaScript
let obj = {
  hello: 'world',
  foo() {
  let bar = () => {
    return this.hello
  }
  return bar
  }
}

window.hello = 'ES6'
window.bar = obj.foo()
window.bar() //=> 'world'

// 相当于

foo() {
  let bar = (function() {
    return this.hello
  }).bind(this)

  return bar;
}
```

注意：箭头函数的上下文绑定是不可改变的，不能使用`call`或`apply`改变；

## 深入 this

在[变量声明、赋值](./01-变量声明、赋值.md)中介绍过执行上下文，EC 在创建的时会绑定`this`指向。

不同类型的 EC 的`this`会绑定到不同的对象

- 全局执行上下文：绑定到全局对象
- 函数执行上下文：
  - 如果是被某个对象调用的函数，那么`this`指向到这个函数
  - 否则执行到全局对象或`undefined`(严格模式下)
