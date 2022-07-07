# React 事件处理

React 中的事件是合成事件(SyntheticEvent)，是对原生事件的包装，和原生事件拥有相同的接口。

- 使用事件代理，提升性能、降低内存消耗。
- 磨平了不同浏览器的兼容问题。
- 不能使用`return false`来阻止浏览器默认行为，必须明确的调用`preventDefault()`方法
- 原生事件优先级高于合成事件，不要混用，如果原生事件阻止冒泡会导致事件不能冒泡到`document`，从而导致合成事件无法触发
- 可以通过`nativeEvent`属性获取原生事件实例

## Event Handler & this

方式一：`bind`

```JSX
class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    console.log('this is:', this);
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}
```

方式二： class public 属性

```JSX
class LoggingButton extends React.Component {
  handleClick = () => {
    console.log('this is:', this);
  };
  render() {
    return (
      <button onClick={this.handleClick}>
        Click me
      </button>
    );
  }
}
```

方式三：箭头函数

```JSX
class LoggingButton extends React.Component {
  handleClick() {
    console.log('this is:', this);
  }

  render() {
    return (
      <button onClick={() => this.handleClick()}>
        Click me
      </button>
    );
  }
}
```

推荐使用方式一和方式二，方式三的箭头函数会作为参数传入到子组件，可能触发额外的渲染。
