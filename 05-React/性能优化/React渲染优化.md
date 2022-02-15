# React 性能优化

## 组件什么时候会发生 rerender

- props change
- context change
- state change
  - Class Component：`this.setState`
  - Function Component：state hook set
- 父组件`re-render`会触发子组件`re-render`，即使传入的`props`未发生变化
- `forceUpdate`

## 避免不必要的 re-render

React 虚拟 DOM 可以在很大的程度上避免浏览器重绘和重流，这可以解决大部分问题，另外我们还可以自己控制组件是否需要重新渲染拉进一步优化。

React 组件的生命周期函数`shouldComponentUpdate`在`re-render`之前运行，函数默认返回`true`进行重新渲染。
我们可以对比新旧`props`和`states`决定是否进行`re-render`。注意：`shouldComponentUpdate`不会阻塞子组件的`re-render`。

```JavaScript
shouldComponentUpdate(nextProps, nextState) {
  return false;
}
```

### `React.PureComponent`

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

### `React.memo()`

`React.memo()`是一个高阶组件，和`PureComponent`相同都会对组件的`props`进浅比较，以优化`re-render`，不同的是`React.memo()`是函数组件。

```TSX
function MyComponent(props) {
}
function areEqual(prevProps, nextProps): boolean {
  // 和 shouldComponentUpdate不同
  // 返回 false 会重新渲染
  // 返回 true 会跳过渲染
}
export default React.memo(MyComponent, areEqual);
```

## React Hook memo

`useMemo`、`useCallback`用法都差不多，都会在第一次**渲染的时候执行**，之后会在其依赖的变量发生改变时再次执行，并且这两个 hooks 都返回缓存的值，`useMemo`返回缓存的变量，`useCallback`返回缓存的函数。

- `useCallback`：针对于子组件渲染优化，保证父组件每次`rerender`导致传入子组件的函数都是`memoized`
- `useMemo`：
  - 类似`useCallback`可以保证传入子组件的非普通类型变量`memoized`
  - 针对于当前组件高开销的计算，只在依赖参数变化是重新计算，避免每次`render`都进行计算

```jsx
import React, { memo, useState, useMemo } from "react";
function App() {
  const [value, setValue] = useState(0);

  const increase = useMemo(() => {
    if (value > 2) return value + 1;
  }, [value]);

  return (
    <div>
      <Child value={value} />
      <button
        type="button"
        onClick={() => {
          setValue(value + 1);
        }}
      >
        value:{value},increase:{increase || 0}
      </button>
    </div>
  );
}

const Child = memo(function Child(props) {
  console.log("Child render");
  return <h1>value:{props.value}</h1>;
});
export default App;
```

## TODO:[React Profiler](https://reactjs.org/blog/2018/09/10/introducing-the-react-profiler.html)

## TODO:Long List
