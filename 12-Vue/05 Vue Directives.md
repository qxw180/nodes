# Vue 指令

指令用于解析标签，包括标签属性、标签内容、绑定事件等。

## 自定义指令

注意：指令函数内的`this`都指向`window`

```vue
<script>
export default {
  directives: {
    // 1. 指令与元素成功绑定时调用
    // 2. 指令模板重新解析时调用
    text(targetDom, binding) {
      const { value } = binding;
      targetDom.innerHTML = value;
    },
    'auto-focus': {
      // 指令与元素绑定成功时调用
      bind(targetDom, binding) {
        targetDom.innerHTML = binding.value;
      }
      // 指令元素插入页面时调用
      inserted(targetDom, binding) {
        targetDom.focus();
      }
      // 指令元素在模板重新解析时调用
      update(targetDom, binding) {
        targetDom.innerHTML = binding.value;
      }
    }
  },
};
</script>
```
