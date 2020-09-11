# 装饰器

简单形式

``` js
@decoratorDemo
class Demo {
}

function decoratorDemo(targret) {
  target.isDec = true
}

console.log(Demo.idDec) // true
```

传参形式，装饰器返回值为一个函数

``` js
function decoratorDemo(idDec) {
    return function(target) {
        target.isDec = isDec
    }
}

@decoratorDemo(true)
class Demo {
}

console.log(Demo.idDec) // true
```

mixin

``` js
function mixins(...list) {
    return function(target) {
        Object.assign(target.prototype, ...list)
    }
}

class Foo() {
    foo() {
        console.log('foo')
    }
}

@mixin(Foo)
class Demo {

}

let demo = new Demo()
demo.foo() // foo
```

装饰方法

``` js

```

``` js
```