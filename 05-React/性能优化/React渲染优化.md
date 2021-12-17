# React 性能优化

## TODO:组件什么时候会发生 rerender

## TODO:父组件 render 导致子组件 rerender

## 避免不必要的 re-render

React 虚拟 DOM 可以在很大的程度上避免浏览器重绘和重流，这可以解决大部分问题，另外我们还可以自己控制组件是否需要重新渲染拉进一步优化。
React 组件的生命周期函数`shouldComponentUpdate`在 re-render 之前运行，函数默认返回 true 进行重新渲染。我们可以对比新旧 props 和 states 决定是否进行 re-render。注意：`shouldComponentUpdate`不会阻塞子组件的`re-render`。

```JavaScript
shouldComponentUpdate(nextProps, nextState) {
  return true;
}
```

大多数时候我们可以使用`React.PureComponent`来代替手动写`shouldComponentUpdate`，`PureComponent`内部隐式实现了`shouldComponentUpdate`方法。

```JavaScript
class CounterButton extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {count: 1};
  }

  render() {
    return (
      <button
        color={this.props.color}
        onClick={() => this.setState(state => ({count: state.count + 1}))}>
        Count: {this.state.count}
      </button>
    );
  }
}
```

但是`PureComponent`使用**浅比较**对比`props`和`states`，所以`mutated props`场景`PureComponent`无法保证正确。
我们可以使用`Object.assign()`、`Array.prototype.concat()`、展开语法等方式避免`mutated`操作。

```JavaScript
this.setState((state) => ({
  words: state.words.concat(["newItem"]),
}));
this.setState((state) => ({
  words: [...state.words, "newItem"],
}));

function updateColorMap(color) {
  return Object.assign({}, color, { right: "blue" });
}
function updateColorMap(color) {
  return { ...color, right: "blue" };
}
```

但是如果处理多层嵌套的对象或数字这种手动处理的方式会非常让人抓狂，可以借助[Immer](https://github.com/immerjs/immer)和[immutability-helper](https://github.com/kolodny/immutability-helper)

TODO:

## TODO:React Hook memo

https://juejin.cn/post/6844903925871722510

## TODO:[React Profiler](https://reactjs.org/blog/2018/09/10/introducing-the-react-profiler.html)

## TODO:Long List
