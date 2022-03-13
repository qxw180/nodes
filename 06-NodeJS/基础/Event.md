# 事件 Event

大量的 Node.js 核心 API 是围绕异步事件驱动体系构建的，emitters 触发命名事件，listeners 监听函数被动出发；

Node.js 是单线程应用程序，通过事件和回调支持并发；

```JavaScript
var events = require('events');
var emitter = new events.EventEmitter();

emitter.on("开饭了",function(food,drink){
  console.log("Lee：开饭了今天："+food+drink);
});

emitter.on("开饭了",function(food,drink){
  console.log("Rose：开饭了今天："+food+drink);
});

emitter.emit("开饭了","包子","白开水");
```

大多数时候我们不会直接使用 EventEmitter，而是在对象中继承它

1. 更加语义化，事件的监听和触发都是一个具有实体功能的对象
2. javascript 的对象继承机制是基于原型，支持多重继承，继承 EventEmitter 不会打乱对象原有的继承关系；

```JavaScript
const EventEmitter = require('events');
const util = require('util');

function MyEmitter(){
 EventEmitter.call(this);
}
util.inherits(MyEmitter, EventEmitter);

const myEmitter = new MyEmitter();

myEmitter.on('event',() => {
 console.log('an event occurred');
})

myEmitter.emit('event');
```

## 参数传递

`eventEmitter.emit()`方法允许任意的传递参数给监听函数。要注意监听函数在被 EventEmitter 触发时，标准关键字`this`指向`EventEmitter`实例；

```JavaScript
const myEmitter = new MyEmitter();
  myEmitter.on('event', function(a, b) {
   console.log(a, b, this);
    // Prints:
    //   a b MyEmitter {
    //     domain: null,
    //     _events: { event: [Function] },
    //     _eventsCount: 1,
    //     _maxListeners: undefined }
  });
myEmitter.emit('event', 'a', 'b');
```

在 ES6 箭头函数中关键字`this`不在指向`EventEmitter`实例

```JavaScript
const myEmitter = new MyEmitter();
myEmitter.on('event', (a, b) => {
  console.log(a, b, this);
  // Prints: a b {}
});
myEmitter.emit('event', 'a', 'b');
```

## Handling events only once

```JavaScript
    const myEmitter = new MyEmitter();
    let m = 0;
    myEmitter.once('event', () => {
      console.log(++m);
    });
    myEmitter.emit('event');
    // Prints: 1
    myEmitter.emit('event');
    // Ignored
```

## Error events

Node.js 为了提升程序的健壮性，对 error 事件进行了特殊处理
当 error 事件触发，EventEmitter 首先会检查是否有对 error 事件添加监听器，
如果添加了则触发该监听器；
如果一个 EventEmitter 实例没有设置`error`事件监听，当`error`事件被触发后会打印堆栈信息，退出 Nodejs 进程。
为了防止 Nodejs 崩溃，Node.js 进程`proccess`应该添加`uncaughtException`事件监听

```JavaScript
    const myEmitter = new MyEmitter();

    process.on('uncaughtException', (err) => {
      console.error('whoops! there was an error');
    });

    myEmitter.emit('error', new Error('whoops!'));
    // Prints: whoops! there was an error
```

##Class EventEmitter
`EventEmitter`在`event`模块中定义：`const EventEmitter = require('events');`
所有的`EventEmitter`实例在添加新的监听函数时都会触发`newListener`事件，在移除监听事件时触发`removeListener`;

- newListener 事件：在事件监听被添加前触发
- removeListener 事件：在事件监听被移除后触发
- EventEmitter.defaultMaxListeners：默认值为 10，添加监听函数数量超出仍然可以有效添加，只不过会发出警告
  - 修改默认值：EventEmitter.defaultMaxListeners
  - 修改指定：emitter.setMaxListeners(n) ，比 EventEmitter.defaultMaxListeners 有更高优先级
- emitter.addListener(eventName, listener)
- emitter.emit(eventName[, ...args])
