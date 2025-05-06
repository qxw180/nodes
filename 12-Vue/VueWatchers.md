# 侦听器 watch

适用应用在监听某些值的变化后执行“副作用”操作时使用

watch 可以监听一个 ref (包括计算属性)、一个响应式对象、一个 getter 函数、或多个数据源组成的数组：

```js
const x = ref(0);
const y = ref(0);

// 单个 ref
watch(x, (newX) => {
  console.log(`x is ${newX}`);
});

// getter 函数
watch(
  () => x.value + y.value,
  (sum) => {
    console.log(`sum of x + y is: ${sum}`);
  }
);

// 多个来源组成的数组
watch([x, () => y.value], ([newX, newY]) => {
  console.log(`x is ${newX} and y is ${newY}`);
});
```

## 响应式对象和深层侦听器

侦听器可以侦听响应式对象，但是不能直接侦听响应式对象的属性

```js
const obj = reactive({ count: 0 });

// 错误，因为 watch() 得到的参数是一个 number
watch(obj.count, (count) => {
  console.log(`Count is: ${count}`);
});
```

直接给 watch() 传入一个响应式对象，会隐式地创建一个深层侦听器——该回调函数在所有嵌套的变更时都会被触发：

当用于大型数据结构时，开销很大，一个返回响应式对象的 getter 函数，只有在返回不同的对象时，才会触发回调

```js
watch(
  () => state.someObject,
  () => {
    // 仅当 state.someObject 被替换时触发
  }
);
```

## 即时回调的侦听器

watch 默认是懒执行的：仅当数据源变化时，才会执行回调。但在某些场景中，我们希望在创建侦听器时，立即执行一遍回调。
我们可以通过传入 immediate: true 选项来强制侦听器的回调立即执行：

```js
watch(
  source,
  (newValue, oldValue) => {
    // 立即执行，且当 `source` 改变时再次执行
  },
  { immediate: true }
);
```

## 一次性侦听器

```js
watch(
  source,
  (newValue, oldValue) => {
    // 当 `source` 变化时，仅触发一次
  },
  { once: true }
);
```

## watchEffect

`watchEffect()`允许我们自动跟踪回调的响应式依赖

```js
watchEffect(async () => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${todoId.value}`
  );
  data.value = await response.json();
});
```

`watchEffect()`不需要指定`immediate: true`会立刻执行回调
在执行期间会自动追踪回调中的响应式变量作为依赖，当这些依赖变化后会再次执行
对于有多个依赖项的侦听器来说，使用 watchEffect() 可以消除手动维护依赖列表的负担。

注意：`watchEffect`**仅会在其同步执行期间，才追踪依赖**。在使用异步回调时，只有在第一个`await`正常工作前访问到的属性才会被追踪

## 回调的触发时机

当你更改了响应式状态，它可能会同时触发 Vue 组件更新和侦听器回调。
类似于组件更新，用户创建的侦听器回调函数也会被批量处理以避免重复调用

默认情况下，侦听器回调会在父组件更新 (如有) 之后、所属组件的 DOM 更新之前被调用，这意味着如果你尝试在侦听器回调中访问所属组件的 DOM，那么 DOM 将处于更新前的状态。

可以使用`flush`属性定制侦听器的执行时机

### Post Watchers

在 Vue 更新 DOM 后执行

```js
watch(source, callback, {
  flush: "post",
});

watchEffect(callback, {
  flush: "post",
});
```

### 同步侦听器

在 Vue 进行任何更新之前触发

```js
watch(source, callback, {
  flush: "sync",
});

watchEffect(callback, {
  flush: "sync",
});
```

注意：同步侦听器不会进行批处理，每当检测到响应式数据发生变化时就会触发。使用时需要考虑性能问题

## 停止侦听器

在 `setup()` 或 `<script setup>` 中用**同步语句创建的侦听器**，会自动绑定到宿主组件实例上，并且会在宿主组件卸载时自动停止。因此，在大多数情况下，你无需关心怎么停止一个侦听器。

如果用异步回调创建一个侦听器，那么它不会绑定到当前组件上，你必须手动停止它，以防内存泄漏。

```js
const unwatch = watchEffect(() => {});

// ...当该侦听器不再需要时
unwatch();
```
