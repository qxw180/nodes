# Vue 基础

- 声明式渲染：基于 HTML 拓展的模板语法，声明式的描述最终输出的 HTML 和 JavaScript 状态之间的关系
- 响应性：自动追踪 JavaScript 状态变化，并更新 DOM
- 单文件组件：Vue 会将一个组件的逻辑 (JavaScript)，模板 (HTML) 和样式 (CSS) 封装在同一个文件里，即单文件组件。

## 选项式&组合式

- 选项式：使用包含多个选项的对象来描述组件的逻辑。类似 React 的类组件
  - 选项所定义的属性都会暴露在函数内部的 this 上，它会指向当前的组件实例。
- 组合式：使用导入的 API 函数来描述组件逻辑。类似于 React 的函数组件+HOOKS
  - 中大型项目推荐使用组合式 API。

## 模板语法

```Vue
<!-- 使用大括号插入文本值 -->
<span>Message: {{ msg }}</span>

<!-- 使用 JavaScript 表达式 -->
<span>{{ ok ? 'YES' : 'NO' }}</span>

<!-- 使用v-html指令插入原始HTML -->
<span v-html="rawHtml"></span>

<!-- 属性绑定 -->
<div v-bind:id="dynamicId"></div>

<!-- 绑定 HTML class -->
<div
  class="static"
  :class="{ active: isActive, 'text-danger': hasError }"
></div>
```

## 响应式

## 异常处理

## 指令 Directives

带有`v-`前缀的特殊 attribute，VUE 提供了很多内置指令。指令接收 JavaScript 表达式，在表达式值变化时响应式的更新 DOM。

![Vue Directive](../assets/images/vue/directive.png)

- 指令参数：`<a v-bind:href="url"> ... </a>`
  - 简写`<a :href="url"> ... </a>`
  - 动态参数：`<a v-on:[eventName]="doSomething"> ... </a>`
- 修饰符：`<form @submit.prevent="onSubmit">...</form>`，思考：这个语法设计好吗？在事件函数中处理是否更聚合

## 计算属性

## 组件

```vue 组件-属性
<script>
export default {
  // 1. 注册属性
  props: ["title"],
  // 1. 时间声明
  emits: ["enlarge-text"],
};
</script>

<template>
  <!-- 2. 使用属性 -->
  <h4>{{ title }}</h4>
  <!-- 3. 使用$emit触发事件 -->
  <button @click="$emit('enlarge-text')">Enlarge text</button>
</template>

<!-- 3. 属性传递&事件回调传递 -->
<BlogPost title="My journey with Vue" @enlarge-text="postFontSize += 0.1" />
```

```vue 组件使用
<script>
// 1. 组件导入
import ButtonCounter from "./ButtonCounter.vue";

export default {
  // 2. 组件祖册
  components: {
    ButtonCounter,
  },
};
</script>

<template>
  <h1>Here is a child component!</h1>
  <!-- 3. 组件使用 -->
  <ButtonCounter />
</template>
```

```vue 插槽 slot，类比react children
<template>
  <div class="alert-box">
    <strong>This is an Error for Demo Purposes</strong>
    <slot />
  </div>
</template>
```

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
