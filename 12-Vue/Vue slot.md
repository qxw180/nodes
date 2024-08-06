# Vue 插槽

Vue 插槽类似 React 的`children`属性，可以实现父组件给子组件传递模板。
形象比喻：组件提前挖坑(设置插槽位置)，使用时填土(插入元素)。

## 插槽基本使用和默认内容

```html
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

```html
<div class="container">
  <header>
    <!-- 设置插槽名 -->
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
  <!-- 插入设置方式一：使用slot属性 -->
  <h1 slot="header">Here might be a page title</h1>
  <!-- 插入设置方式二：使用template标签配v-slot指令设置插槽名，注意v-slot指令只能在template标签使用 -->
  <template v-slot:header>
    <h1>Here might be a page title</h1>
  </template>

  <!-- v-slot指令可以简写为 #  -->
  <template #footer>
    <p>Here's some contact info</p>
  </template>

  <!-- 显示默认插槽 -->
  <template #default>
    <p>A paragraph for the main content.</p>
    <p>And another one.</p>
  </template>
  <!-- 隐式默认插槽，以下元素会被插入到默认插槽 -->
  <p>A paragraph for the main content.</p>
  <p>And another one.</p>
</BaseLayout>
```

## 动态插槽名

```html
<base-layout>
  <template v-slot:[dynamicSlotName]> ... </template>

  <!-- 缩写为 -->
  <template #[dynamicSlotName]> ... </template>
</base-layout>
```

## 作用域插槽

类似 React 高阶组件，父组件插入子组件的模板需要使用子组件的数据
子组件给插槽组件传递数据和组件的属性传递一样使用`v-bind`指令，在插槽组件内使用数据的语法上默认插槽和具名插槽的语法有所区别。

默认插槽：在插槽组件内使用`v-slot`指令接收数据

```html
<!-- 子组件使用属性绑定语法为插槽传入属性 -->
<div>
  <slot :text="greetingMessage" :count="1" />
</div>

<!-- 默认插槽语法：接收和使用插槽插入的属性 -->
<MyComponent v-slot="slotProps">
  {{ slotProps.text }} {{ slotProps.count }}
</MyComponent>
```

具名插槽：区别是使用`v-slot:属性名="属性值"`接收数据，可以简写为`#插槽名="属性值"`

```html
<!-- FancyList -->
<ul>
  <li v-for="item in items">
    <!-- 子组件使用v-bind将组件内数据传递给插槽组件 -->
    <slot name="item" v-bind="item"></slot>
  </li>
</ul>

<!-- App -->
<FancyList>
  <!-- 使用template标签包裹，并使用插槽指令接收数据 -->
  <template #item="{ body, username, likes }">
    <div class="item">
      <p>{{ body }}</p>
      <p>by {{ username }} | {{ likes }} likes</p>
    </div>
  </template>
</FancyList>
```
