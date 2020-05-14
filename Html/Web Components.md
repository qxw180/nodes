# Web Components

网页*组件式*开发*技术规范*，它不是单一的规范，包括一系列技术组成，包括：

1. Template
2. Custom Element
3. Shadow DOM
4. HTML Import

## 组件式开发要解决的问题

> 通过一种标准化的非侵入的方式封装一个组件

1. 代码重用，将公共部分提取出来进行重用，修改更新的时候只需更新组件；
2. 解决传统插件、样式或HTML片段的冲突问题，通过一种标准化的方式封装，组件直接内部相互隔离互不影响；

## 优点

1. *方便管理，快速加载、卸载；
2. 方便定制，通过组件暴漏接口实现定制；
3. 方便重用，
4. *方便封装，提供HTML CSS JS封装方法，实现组件与页面其他代码的隔离；
5. 语义化代码

## Template

使用`template`标签包含html相关代码片段，但是功能并不完善，没有占位符，循环等公告呢。

## Custom Element

创建自定义的HTML元素，而且支持对现有HTML元素进行扩展，从而定义新的API

使用自定义元素之前必须使用`document.registerEelemnt()`方法来登记该元素

+ `document.registerEelemnt(tagName,option)`
  + `tagName`：第一个参数是一个字符串，表示自定义元素的标签名。
  + `option`：第二个参数是一个对象，表示自定义元素的原型对象。
  + 返回值为构造函数
+ 生命周期
  + `createdCallback`：自定义元素注册后，在实例化之后会调用，通常多用于做元素的初始化，如插入子元素，绑定事件等。
  + `attachedCallback`：元素插入到 document 时触发。
  + `detachedCallback`：元素从 document 中移除时触发，可能会用于做类似 destroy 之类的事情。
  + `attributeChangedCallback`：元素属性变化时触发，可以用于从外到内的通信。外部通过修改元素的属性来让内部获取相关的数据并且执行对应的操作。

## Shadow DOM

通过Shadow DOM可以创建一个完全独立于其他元素的子DOM树，主文档流和基于Shadow DOM创建的组件之间互不干扰；

## HTML Import

对模版或自定义元素等资源加载的支持，可以像引入JS或CSS一样引入HTML组件。

## 意义

+ 组件式开发是将代码进行拆分，通过这种拆分可以将功能代码和业务代码进行解耦，提高代码的可读性和可维护性
+ 标准化

[Vanilla JS](http://vanilla-js.com/)
