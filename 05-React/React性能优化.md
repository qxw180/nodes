# React 性能优化

## 避免不必要的 re-render

React 虚拟 DOM 可以在很大的程度上避免浏览器重绘和重流，这可以解决大部分问题，另外我们还可以自己控制组件是否需要重新渲染拉进一步优化。
React 组件的生命周期函数`shouldComponentUpdate`在 re-render 之前运行，函数默认返回 true 进行重新渲染。我们可以对比新旧 props 和 states 决定是否进行 re-render。

```JavaScript
shouldComponentUpdate(nextProps, nextState) {
  return true;
}
```

大多数时候我们可以使用`React.PureComponent`来代替手动写`shouldComponentUpdate`。`PureComponent`内部隐式实现了`shouldComponentUpdate`方法，使用**浅比较**对比 props 和 states。

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

//TODO: React Hook memo https://juejin.cn/post/6844903925871722510

## React Immutability

大多数时候我们可以使用 PureComponent 来快速的处理 re-render，但是 PureComponent 只是进行浅比较，对应较复杂的数据结构 PureComponent 就无能无力了，例子：

```js
class ListOfWords extends React.PureComponent {
  render() {
    return <div>{this.props.words.join(",")}</div>;
  }
}

class WordAdder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      words: ["marklar"],
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    // 这部分代码很糟，而且还有 bug
    const words = this.state.words;
    words.push("marklar");
    this.setState({ words: words });
  }

  render() {
    return (
      <div>
        <button onClick={this.handleClick} />
        <ListOfWords words={this.state.words} />
      </div>
    );
  }
}
```

因为`WordAdder`的 click 方法只是修改`works`的值，并没没有产生新的变量，所以`ListOfWords`中`this.props.words`还是同一个数组，所以并不会更新组件。
为了避免上面这种情况，我们应该避免直接修改`props`和`state`，而是生产一个新的对象

```js
// 数组
this.setState((state) => ({
  words: state.words.concat(["marklar"]),
}));
this.setState((state) => ({
  words: [...state.words, "marklar"],
}));

// 对象
function updateColorMap(colormap) {
  return Object.assign({}, colormap, { right: "blue" });
}
function updateColorMap(colormap) {
  return { ...colormap, right: "blue" };
}
```

## 代码分割

延迟(按需)加载代码，避免初始化代码体积过大

webpack 在解析代码的时候遇到`import()`会自动进行代码分割，改特效在 Create React App 和 Next.js 中都已经默认配置，如果是自己配置的 Webpack 项目需要安装[Code Splitting](https://webpack.js.org/guides/code-splitting/)进行配置。

```js
import("./math").then((math) => {
  console.log(math.add(16, 26));
});
```

React.lazy

```js
import React, { Suspense } from "react";
import MyErrorBoundary from "./MyErrorBoundary";

const OtherComponent = React.lazy(() => import("./OtherComponent"));
const AnotherComponent = React.lazy(() => import("./AnotherComponent"));

const MyComponent = () => (
  <div>
    <MyErrorBoundary>
      <Suspense fallback={<div>Loading...</div>}>
        <section>
          <OtherComponent />
          <AnotherComponent />
        </section>
      </Suspense>
    </MyErrorBoundary>
  </div>
);
```

## Long List

//TODO:
