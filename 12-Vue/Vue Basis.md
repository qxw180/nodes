# Vue 基础

- 声明式渲染：基于 HTML 拓展的模板语法，声明式的描述最终输出的 HTML 和 JavaScript 状态之间的关系
- 响应性：自动追踪 JavaScript 状态变化，并更新 DOM
- 单文件组件：Vue 会将一个组件的逻辑 (JavaScript)，模板 (HTML) 和样式 (CSS) 封装在同一个文件里，即单文件组件。

## 选项式&组合式

- 选项式：使用包含多个选项的对象来描述组件的逻辑。类似 React 的类组件
  - 选项所定义的属性都会暴露在函数内部的 this 上，它会指向当前的组件实例。
- 组合式：使用导入的 API 函数来描述组件逻辑。类似于 React 的函数组件+HOOKS
  - 中大型项目推荐使用组合式 API。

## 应用创建和配置

```JS
import { createApp } from 'vue'
// 导入根组件
import App from './App.vue'
// 使用根组件创建应用实例
const app = createApp(App)
// 挂载应用
app.mount('#app')

// 应用配置
app.config.errorHandler = (err) => {
  /* 处理错误 */
}
app.component('TodoDeleteButton', TodoDeleteButton) // 注册全局组件
app.config.globalProperties.msg = 'hello' // 全局属性
```

## 模板语法

```Vue
<!-- 文本插值 使用双大括号 -->
<span>Message: {{ msg }}</span>

<!-- 原始HTML 使用v-html指令 -->
<span v-html="rawHtml"></span>

<!-- 属性绑定 使用v-bind指令 -->
<div v-bind:id="dynamicId"></div>

<!-- 使用 JavaScript 表达式，不仅限于文本插值、v-bind等指令也可以使用 -->
<span>{{ ok ? 'YES' : 'NO' }}</span>

<!-- 绑定 HTML class -->
<div
  class="static"
  :class="{ active: isActive, 'text-danger': hasError }"
></div>
```

## 响应式

选项式：使用`data`属性声明，`data`是一个返回对象的函数，vue 会对对象进行响应式包装并代理到组件实例上，后添加到组件实例的属性变化无法触发响应式更新。

组合式：可以使用`reactive`创建响应式的对象或数组

```JS
import { reactive } from 'vue'
const state = reactive({ count: 0 })
```

## 异常处理

## 指令 Directives

带有`v-`前缀的特殊 attribute，VUE 提供了很多内置指令。指令接收 JavaScript 表达式，在表达式值变化时响应式的更新 DOM。

![Vue Directive](../assets/images/vue/directive.png)

- 指令参数：`<a v-bind:href="url"> ... </a>` 响应式更新参数
  - 简写`<a :href="url"> ... </a>`
  - 动态参数：`<a v-on:[eventName]="doSomething"> ... </a>`
- 修饰符：`<form @submit.prevent="onSubmit">...</form>`，思考：这个语法设计好吗？在事件函数中处理是否更聚合

## 计算属性

## 条件渲染

- `v-if`：是否渲染 DOM
- `v-show`：通过控制 DOM`display`属性控制是否显示

## 列表渲染

```vue
<script>
export default {
  data() {
    return {
      parentMessage: "Parent",
      items: [{ message: "Foo" }, { message: "Bar" }],
    };
  },
};
</script>
<li v-for="(item, index) in items" :key="item.id">
  {{ parentMessage }} - {{ index }} - {{ item.message }}
</li>
```

## 事件处理

## TODO: DEEP 数据代理 & 数据劫持

通过一个对象对另一个对象中的属性进行操作

```JS
let o1 = {x: 1};
let o2 = {y: 2};

Object.defineProperty(o2, 'x', {
  get() {
    return o1.x;
  },
  set(val) {
    o1.x = val;
  }
})
```

Vue 中的 Model 是通过数据代理到 vue 实例对象
