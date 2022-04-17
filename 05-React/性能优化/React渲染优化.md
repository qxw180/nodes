# React 性能优化

## Virtual DOM & React Diffing

React 是声明式 UI 库，开发者使用组件描述 UI，React 让开发者可以保持相对简单的心智，不需要关心 DOM 操作、事件处理、属性操作等。

React 将组件转化页面结构(虚拟 DOM),再转换为真实 DOM 渲染到页面上，并在数据(props、 state、context)改变时自动进行更新，在更新的时候会首先进行协调（Reconciliation），在协调阶段之后会立刻进入 commit 阶段，提交阶段结束后数据的更新就会在页面生效。

DOM 更新会导致重绘和重流，DOM 更新策略优化也是前端渲染优化的关键点，React Reconciliation 基于数据的变化计算出新的虚拟 DOM，并对比新旧虚拟 DOM，寻找到最优的更新方案。React 通过 Virtual DOM 对 DOM 更新进行优化，在不做手动优化的情况下提供过得去的性能，保证性能下限。

Virtual DOM 是一个 JS 对象，是对真实 DOM 的抽象，在数据变化后 React 会生成新的 Virtual DOM 和旧的 Virtual DOM 进行对比，React 使用深度优先的方式遍历遍历虚拟 DOM，缩小真实 DOM 更新范围，也会将更新聚合(将多个更新合并，所以 React 状态更新不是同步的)，减少更新次数。

Virtual DOM 最初的设计目的是为了跨平台，基于 Virtual DOM 本质是 JavaScript 对象，基于 Virtual DOM 可以区别的定制下游输出，实现不同平台的渲染，如 SSR、跨终端等场景。

在提交阶段 React 会做两件事：

1. 将调和阶段计算的结果作用到真实 DOM
2. 调用开发中在组件中定义的 HOOK 方法

![Virtual DOM](../../assets/images/react/virtual-dom-diffing.png)

每次`render`都会创建一个 React Elements Tree，React 对其进行对比然后更新页面 UI。树的对比的复杂度非常高，React 基于以下两个假设对进行了算法优化：

- 不同类型的组件会产生不同的树
- 开发者通过设置`key`告诉 React 哪些子元素在不同的渲染下可以保持不变

具体过程

1. tree diff：首先进行父对比，如果父节点元素类型不同，React 会卸载根父点及其子节点并建立新的树。
2. component diff：如果组件类型相同，React 会保留 DOM 节点，仅对比和更新其有改变的属性。更新完成后继续对子节点进行递归。
3. element diff：兄弟节点对比，有插入、删除和修改三种操作，React 通过`key`进行优化
   - 默认情况下 React 会同时对比两个列表，如果有差异会进行全量更新，在某些情况(头部插入新元素)下开销会比较大。
   - 为了解决这问题 React 引入了`key`属性，当子元素拥有`key`时，React 使用`key`来匹配原有树上的子元素以及最新树上的子元素。

## 优化 - 避免不必要的`re-render`

React 虚拟 DOM 可以在很大的程度上避免浏览器重绘和重流，这可以解决大部分问题，另外我们还可以自己控制组件是否需要重新渲染来进一步优化。

以下场景会触发组件`re-render`

- props change
- context change
- state change
  - Class Component：`this.setState`
  - Function Component：state hook set
- 父组件`re-render`会触发子组件`re-render`，即使传入的`props`未发生变化
- `forceUpdate`

React 组件的生命周期函数`shouldComponentUpdate`在`re-render`之前运行，函数默认返回`true`进行重新渲染。
我们可以对比新旧`props`和`states`决定是否进行`re-render`。注意：`shouldComponentUpdate`不会阻塞子组件的`re-render`。

```JavaScript
shouldComponentUpdate(nextProps, nextState) {
  return false;
}
```

在`shouldComponentUpdate`中进行对象的深比较工作流非常大，使用不可变数据是更好的优化方案。很多开发者为了方便会将全部数据使用一个大的数据传递给子组件，由子组件自由使用，如果有很多子组件那么`shouldComponentUpdate`的实现会比较困难而且比较容易出现 BUG。

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

但是如果处理多层嵌套的对象或数组这种手动处理的方式会非常让人抓狂，可以借助[Immer](https://github.com/immerjs/immer)和[immutability-helper](https://github.com/kolodny/immutability-helper)

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

## 优化-使用 React Hook memo 实现稳定的 props

`useMemo`、`useCallback`用法和优化思路一致，避免父组件的 re-render 导致生成新的引用类型变量传递给子组件导致 re-render。都会在第一次**渲染的时候执行**，之后会在其依赖的变量发生改变时再次执行，并且这两个 hooks 都返回缓存的值，`useMemo`返回缓存的变量，`useCallback`返回缓存的函数。

- `useCallback`：针对于子组件渲染优化，保证父组件每次`rerender`导致传入子组件的函数都是`memoized`
- `useMemo`：有两个优化场景
  - 类似`useCallback`可以保证传入子组件的非普通类型变量`memoized`
  - 针对于当前组件高开销的计算，只在依赖参数变化是重新计算，避免每次`render`都进行计算
    - 高开晓技术不只针对 state 的加工处理，同样可以应用于组件渲染的缓存

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

// memo组件渲染
export default function App2() {
  const comp = useMemo(() => {
    return <Child name="使用 useMemo 作为 children" />
  }, [])

  return (
    <div className="App">
      <Child name="直接作为 children" />
      {comp}
    </div>
  )
}
```

## 优化 - 使用发布者订阅者模式跳过中间组件 Render 过程

React 状态提升会将所有公共数据放到公共祖先上，然后层层向下传递，这样会导致中间组件的无意义更新。
可以使用布者订阅者模式优化，具体可以使用`React Context`或者`Redux`等方案实现。

## 优化 - 状态下放，缩小状态影响范围

将大组件按使用的 state 拆分成小组件，这样 state 的更新只会触发使用到变更 state 的组件更新，缩小 state 的影响范围

## 懒渲染

在进入或即将进入可视范围时渲染，[react-visibility-observer](https://github.com/jonikanerva/react-visibility-observer)

## TODO:不可变数据落地

## TODO:[React Profiler](https://reactjs.org/blog/2018/09/10/introducing-the-react-profiler.html)

## TODO:Long List

## 参考

[React 性能优化 | 包括原理、技巧、Demo、工具使用](https://juejin.cn/post/6935584878071119885#heading-23)
