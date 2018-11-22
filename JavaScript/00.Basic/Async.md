#ES7 Async
ES7标准引入async函数，简化了异步操作，使得基本代码几乎和同步同步代码一致；
async函数是generator函数的升级版，不需要使用`co`等执行器，其实不必纠结太多，generator不过是ES语法对异步操作完善优化过程中的一个过渡品；
async函数和Promise配合使用可以快速的写出简介的异步代码；

##基本示例
``` JavaScript
// 延迟执行函数
function dealyRun(str, dealy) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(str), dealy);
    })
}


async function asyncPoint() {
    var l1 = await dealyRun("Line1", 3000);
    console.log(l1);// 3秒钟后执行
    
    var l2 = await "Line2";
    console.log(l2);// 立即执行

    var l3 = await dealyRun("Line2", 3000);
    console.log(l3);// 3秒钟后执行

    return l1 + l2 + l3;// 返回数据会自动包装成Promise对象
}


// async函数返回的数据类型为Promise
asyncPoint().then((data) => {
    console.log(data)
});
```

运行结果
Code Start Run
Code Finish
Line1// 延迟执行
Line2// 立即执行
Line3// 延迟执行
Line1Line2Line3

1. async函数使用`async`关键字修饰函数，async函数返回Promise对象；
2. 在async函数内部遇到`await`关键字会暂停代码执行，直到异步任务执行完成，返回结果后再继续向下运行；
3. await只能在async函数内部出现，否则会报错；
4. 一般`await`关键字后面是一个Promise对象，也可以其它数据类型，其它数据类会立即被转换为一个Promise的resolve值；


##错误处理
+ async函数内部运行报错回返回promise对象回变为reject状态；
+ 在async函数内部只要一个await后的promise对象变为reject对象，整个async函数回立即中断执行；
+ 如果不希望因为某个promise的失败导致整个函数执行的中止可以使用标准`try{}catch(){}`进行错误处理，或者使用promise对象的catch方法进行处理；

``` JS
async function f() {
    try {
        await Promise.reject('出错了');
    } catch (e) {
        console.log(e)
    }
    await Promise.reject('出错了')
        .catch(e => console.log(e));

    return await Promise.resolve('hello world');
}

f().then(v => console.log(v))
```



##await函数同时触发
async函数内部的多个await默认顺序执行，一个执行完成之后再执行下一个，如果多个await不存在x相互依赖并发执行会消耗更少的运行时间；

``` JS
// 写法一
let [foo, bar] = await Promise.all([getFoo(), getBar()]);

// 写法二
let fooPromise = getFoo();
let barPromise = getBar();
let foo = await fooPromise;
let bar = await barPromise;
```

























