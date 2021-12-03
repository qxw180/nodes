# 小技巧

## Event Handler

React 中的事件是合成事件(SyntheticEvent)，是对原生事件的包装，和原生事件拥有相同的接口。

- 不能使用`return false`来阻止浏览器默认行为，不行明确的调用`preventDefault()`方法

## 利用 Fragment 避免额外 DOM 添加

[Fragments](https://reactjs.org/docs/fragments.html)

```JSX
class Table extends React.Component {
  render() {
    return (
      <table>
        <tr>
          <Columns />
        </tr>
      </table>
    );
  }
}

class Columns extends React.Component {
  render() {
    return (
      <React.Fragment>
        <td>Hello</td>
        <td>World</td>
      </React.Fragment>
    );
  }
}
```

## 使用 Portals

React 传送门(Portal)，可以提供了非常好的方式使组件脱离 React 组件层次结构，将组件渲染到指定 DOM 节点中。
这个功能非常适合弹出框、提示框的实现。

```JSX
render() {
  return ReactDOM.createPortal(
    this.props.children,
    domNode
  );
}
```

React Portal 可以将组件渲染到任意 DOM，但是通过 Portal 渲染的组件和其它组件一样，Context、事件冒泡等特性完全和正常渲染组件一致，因为 Portal 仍然在 React Tree 中，和 DOM Tree 无关。

## 严格模式

```jsx
function ExampleApplication() {
  return (
    <div>
      <Header />
      <React.StrictMode>
        <div>
          <ComponentOne />
          <ComponentTwo />
        </div>
      </React.StrictMode>
      <Footer />
    </div>
  );
}
```

严格模式只在开发环境起作用，可以帮助我们做以下检查：

1. 识别不安全的生命周期函数
2. 对字符串 ref 的使用报警
3. 检测意外副作用
4. 检查遗留的 contextAPI 使用
