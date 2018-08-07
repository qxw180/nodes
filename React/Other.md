#小技巧

##利用Fragment避免额外DOM添加
[Fragments](https://reactjs.org/docs/fragments.html)
``` JavaScript
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

##使用Portals
React 传送门(Portal)，可以提供了非常好的方式使组件脱离React组件层次结构，将组件渲染到指定DOM节点中。
这个功能非常适合弹出框、提示框的实现。
``` JavaScript
render() {
  return ReactDOM.createPortal(
    this.props.children,
    domNode
  );
}
```

React Protal可以将组件渲染到任意DOM，但是通过Protal渲染的组件和其它组件一样。Context、事件绑定等特性完全和正常渲染组件一致，因为Protal仍然在React Tree中，和DOM Tree无关。


