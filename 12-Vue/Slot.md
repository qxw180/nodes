# Vue 插槽

Vue 插槽类似 React 的`children`属性，控制组件子元素的插入，组件提前挖坑(设置插槽位置)，使用时填土(插入元素)。

## 插槽基本使用和默认内容

```vue
<!-- FancyButton 组件定义 -->
<button class="fancy-btn">
  <!-- 插槽出口（挖坑） -->
  <slot>
    <!-- 默认内容：无插入内容时使用 -->
    Button Click 
  </slot> 
</button>

<!-- FancyButton 组件使用 -->
<FancyButton>
  <!-- 插槽内容（填土） -->
  Click me! 
</FancyButton>
```

## 具名插槽

Vue 允许在组件内声明多个插槽，可以使用`name`属性对插槽进行命名，插入的内容会按照`name`属性匹配插入。未命名的插槽会隐式的命名为`default`

```Vue
<div class="container">
  <header>
    <slot name="header"></slot>
  </header>
  <main>
    <slot></slot>
  </main>
  <footer>
    <slot name="footer"></slot>
  </footer>
</div>

<BaseLayout>
  <template v-slot:header>
    <h1>Here might be a page title</h1>
  </template>

  <template #default>
    <p>A paragraph for the main content.</p>
    <p>And another one.</p>
  </template>

  <!-- #为v-slot简写  -->
  <template #footer>
    <p>Here's some contact info</p>
  </template>
</BaseLayout>
```

## 动态插槽名

```vue
<base-layout>
  <template v-slot:[dynamicSlotName]>
    ...
  </template>

  <!-- 缩写为 -->
  <template #[dynamicSlotName]>
    ...
  </template>
</base-layout>
```

## 作用域插槽

类似 React 高阶组件，父组件插入的元素需要使用子组件内部的数据的场景下可以使用作用域插槽
类似组件的属性传达，可以向插槽传入属性。

```vue
<!-- 子组件使用属性绑定语法为插槽传入属性 -->
<div>
  <slot :text="greetingMessage" :count="1"></slot>
</div>

<MyComponent v-slot="slotProps">
  <!-- 默认插槽语法：使用插槽插入的属性 -->
  {{ slotProps.text }} {{ slotProps.count }}
</MyComponent>
```

```vue
<ul>
  <li v-for="item in items">
    <slot name="item" v-bind="item"></slot>
  </li>
</ul>

<FancyList :api-url="url" :per-page="10">
  <template #item="{ body, username, likes }">
    <div class="item">
      <p>{{ body }}</p>
      <p>by {{ username }} | {{ likes }} likes</p>
    </div>
  </template>
</FancyList>
```
