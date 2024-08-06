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
