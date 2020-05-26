# Promise

## Promise 状态

+ 进行中：Pending
+ 已完成：Resolved
+ 已失败：Rejected

## 基本用法

Promise对象是一个构造函数，用来生成Promise实例。Promise构造函数接受一个函数作为参数，函数包含两个参数，`resolve`和`reject`。这两个参数是由JavaScript引擎提供的，这两个参数也是函数，resolve函数的作用是使Promise实例的状态由Pending变为Resolved，并将异步操作结果作为函数参数传递出去，reject函数的作用是使Promise实例的状态由Pending变为Reject，并将异步操作错误作为函数参数传递出去。

``` JS
var promise = new Promise(function(resolve,reject){
  if(/*操作成功*/){
    resolve(value);
  }else{
    reject(err);
  }
});
```

每一个Promise实例都有`then`方法用来指定Resolved和Rejected的回调函数

``` JS
promise.then(
  function(value){
    // success
    dosomething();
  },function(err){
    // fail
    dosomething();
  }
);
```

Promise实例新建之后立即执行

## 实例方法

+ `Promise.prototype.then()`：Promise实例状态改变后的回调函数
  + 参数：
    + callBackResolve：Resolved状态回调函数
    + callBackReject：Rejected状态回调函数
  + 返回值：
    + 一个新的Promise实例，then方法后面可以在调用另一个then方法。
+ `Promise.prototype.catch()`：相当于`.then(null,reject)`，用于指定错误时的回调函数
  + 参数
    + callBackReject：Rejected状态回调函数
  + 返回值：
    + 一个新的Promise实例

``` JS
getJSON("/post/1.json").then(function(post) {
  return getJSON(post.commentURL);
}).then(function funcA(comments) {
  console.log("resolved: ", comments);
}, function funcB(err){
  console.log("rejected: ", err);
});
```

+ `Promise.prototype.finally()`

## 对象方法

+ `Promise.all()`：将多个Promise实例包装成一个Promise实例
  + 参数：
    + promiseInstanceArray：Promise对象实例数组
  + 返回值：
    + 一个新的Promise实例
      + 只有参数中所有的实例都为fulfilled，返回实例的状态才为fulfilled，返回值为所以实例返回值的数组
      + 只要参数中有一个实例的状态为rejected，返回实例的状态即为rejected，返回值为第一个rejected实例的值
+ `Promise.race()`：将多个Promise实例包装成一个Promise实例
  + 参数：
    + promiseInstanceArray：Promise对象实例数组
  + 返回值：
    + 一个新的Promise实例，只要实例数组中有一个实例的状态改变，返回实例的状态就改变，值为第一个改变实例的值
+ `Promise.resolve(value)`：将对象转化为Promise对象
+ `Promise.reject(reason)`：返回一个状态为rejected的实例
