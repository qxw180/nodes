# 计算属性

通过已有数据计算获得的属性，计算属性适合处理复杂的计算逻辑，相对前直接在模板中使用原始数据计算更加优雅。

```vue
<script>
const firstName = ref("John");
const lastName = ref("Doe");
// 可读写计算属性，通常我们用不到计算属性的setter
const fullName = computed({
  // getter
  get() {
    return firstName.value + " " + lastName.value;
  },
  // setter
  set(newValue) {
    // 注意：我们这里使用的是解构赋值语法
    [firstName.value, lastName.value] = newValue.split(" ");
  },
});
</script>
```

## 计算属性有两大特性

- 缓存结果：只有依赖项变化的时候才会重新计算，否则复用上一次计算的结果
  - 当计算属性依赖性变化后，计算属性会被标记为`dirty`，下次取值时才会重新计算
  - 相对于函数调用，计算属性的缓存特性可以提升运行性能，对应计算开销大的场景非常有用
- 惰性求值：只有在真正读取它的 value 时，才会进行计算求值

## TODO:实现原理

- 惰性求值与缓存：`computed` 是一个惰性求值的观察者，只有当依赖的数据发生变化时，才会重新计算。如果依赖的数据没有变化，`computed` 会直接返回缓存的值，避免不必要的计算
- **依赖收集**：
  - 组件初始化时，Vue 会**为每个`computed`属性创建一个对应的`watcher`**。
  - 当第一次调用`computed`的`getter`方法时，**会收集所有依赖的响应式数据，并建立依赖关系**。
  - 当这些依赖数据发生变化时，会通知`computed`重新计算
- 响应式更新：`computed`内部通过 ReactiveEffect 实现依赖追踪。当依赖数据变化时，`computed`会标记为“脏数据”（dirty），并在下次访问时重新计算并更新缓存值
