# Vue 逻辑复用

## 组合式函数 Composables

利用 Vue 组合式 API 来封装和复用**有状态逻辑**的函数

每次调用组合函数都会创建**组件实例独有的状态**，因此不会互相影响。如果想在组件之间共享状态可以使用状态管理框架。

组合式函数命名约定以`use`作为开头

## 自定义指令

一个自定义指令由一个包含类似组件生命周期钩子的对象来定义
钩子函数会接收到指令所绑定元素作为其参数

在`<script setup>`中，任何以`v`开头的驼峰式命名的变量都可以被用作一个自定义指令。

```vue
<script setup>
// 在模板中启用 v-focus
const vFocus = {
  mounted: (el) => el.focus(),
};
</script>

<template>
  <input v-focus />
</template>
```

在没有使用`<script setup>`的情况下，自定义指令需要通过`directives`选项注册

### [指令钩子&钩子参数](https://cn.vuejs.org/guide/reusability/custom-directives.html#directive-hooks)

```js
const myDirective = {
  // 在绑定元素的 attribute 前
  // 或事件监听器应用前调用
  created(el, binding, vnode) {
    // 下面会介绍各个参数的细节
  },
  // 在元素被插入到 DOM 前调用
  beforeMount(el, binding, vnode) {},
  // 在绑定元素的父组件
  // 及他自己的所有子节点都挂载完成后调用
  mounted(el, binding, vnode) {},
  // 绑定元素的父组件更新前调用
  beforeUpdate(el, binding, vnode, prevVnode) {},
  // 在绑定元素的父组件
  // 及他自己的所有子节点都更新后调用
  updated(el, binding, vnode, prevVnode) {},
  // 绑定元素的父组件卸载前调用
  beforeUnmount(el, binding, vnode) {},
  // 绑定元素的父组件卸载后调用
  unmounted(el, binding, vnode) {},
};
```

## 插件

使用插件可以为 Vue 添加全局功能

```js
import { createApp } from "vue";

const app = createApp({});

app.use(myPlugin, {
  /* 可选的选项 */
});

// myPlugin
export default {
  /**
   * @params app 是一个由 createApp 创建的实例
   * @params options 是传递给 app.use 的选项
   */
  install: (app, options) => {
    // 在这里编写插件代码
  },
};
```

在插件内可以实现多种功能：

- 通过`app.component()`和`app.directive()`注册一到多个全局组件或自定义指令。
- 通过`app.provide()`使一个资源可被注入进整个应用。
- 向`app.config.globalProperties`中添加一些全局实例属性或方法
