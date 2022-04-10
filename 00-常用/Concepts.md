# 各种名词

## 代码副作用

代码执行中途处理额外逻辑，例如：

- 数据修改
  - 变量修改
  - mutable 数据结构修改
- 使用了 I/O
  - 数据获取操作
  - 数据写入操作
  - DOM 操作
- 引发异常或中止错误
- 添加事件订阅

和副作用对应的是**纯函数**(在给定相同的输入的情况下，它将始终返回相同的结果)，副作用的缺点是：

1. 副作用可能依赖上下文环境，导致函数式不可测的
2. 副作用可能会产生额外影响，

## mutable & immutable

immutable 创建之后不能被修改，对应 JavaScript 的基本类型
mutable 创建之后可以被修改，对应 JavaScript 的引用类型

注意以上说的的基本类型和引用类型并不是指变量，而是只变量对应的实际对象。
例如一个对象的内部变量是可以被修改的，表面上看这个对象并没有变，实际其内部已经改变，我这种情况为 mutable。反之如果是数字类型，这个对象一旦被创建就不能被修改，对变量修改实际是创建新的对象并引用。

```javascript
let person = {
  name: "Harry",
  age: 22,
};

let clonePerson = person;
person.name = "John";
console.log(clonePerson.name); // 'John'
```

## 序列化&反序列化

- 序列化：对象转换为可传输的字节序列
- 反序列化：把字节序列转换为对象

## 进程(Process)和线程(Thread)

程序在启动的时候会创建一个进程，程序也可能会创建线程来帮助它工作。操作系统为进程提供了一块“内存块”以供使用，并且所有应用程序状态都保存在该私有内存空间中。当关闭应用程序时，该进程也会消失，操作系统会释放内存。

- 一个进程由一个或多个线程构成，进程内的线程共享资源(内存)，线程之间相互独立
- 进程是 CPU 资源分配的最小单位
- 线程是独立在进程基础上的一次程序运行单位

## TODO:内聚&耦合

## XaaS & ServerLess

- IaaS(Infrastructure as a Service)基础设施服务
  - 提供底层硬件服务，开发者无需关心服务器硬件
  - 代表产物：虚拟机、Docker
- PaaS(Platform as a Service)平台服务，软件部署平台
  - 提供 runtime，可以无缝扩展，开发者只需要关注业务逻辑，不需要关注底层依赖
  - 代表产物：云服务(云存储、云数据库等)、中间件服务
- SaaS(Software as a Service)软件服务
  - 将软件的开发、管理、部署都交个第三方，自己不需要关心技术问题
  - 代表产物：npm, dockerhub 等，通过注册账号就可以享受产品服务

开发者需要关心的部分
![iaas、paas、saas开发者需要关心的部分](../../nodes/assets/images/good/Management-Iaas-Saas-Paas-Cloud.jpg)

从 IaaS 到 PaaS
![从IaaS到PaaS](../../nodes/assets/images/good/iass-sass.jpg)

## 微服务

TODO:微服务 -> FaaS ≈ ServerLess

Serverless 不是“无服务器” 而是由云计算服务商负责运维工作，以服务的方式为开发者提供数据库、消息、身份验证等功能。开发人员只需要关心业务代码。

[从 IaaS 到 FaaS—— Serverless 架构的前世今生](https://aws.amazon.com/cn/blogs/china/iaas-faas-serverless/)
[从后端架构演化史到云原生，一文解读云原生架构！](https://cloud.tencent.com/developer/article/1745528?from=information.detail.%E6%9C%8D%E5%8A%A1%E5%99%A8%E6%9E%B6%E6%9E%84%E5%8F%91%E5%B1%95%E5%8F%B2)
