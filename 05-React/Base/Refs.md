# React Ref

通过 Refs 可以直接访问 Dom 节点和 React 元素。
React 不推荐使用 ref，不是不得已尽量使用 props 和 states 进行功能实现。

string ref 已经停用，请使用 creating refs 和 callback refs。

## Creating Refs

使用 `React.createRef()` 创建，并通过 `ref` 属性附加到 React 元素

```JavaScript
class CustomTextInput extends React.Component {
  constructor(props) {
    super(props);
    // 创建ref存储元素DOM节点
    this.textInput = React.createRef();
    this.focusTextInput = this.focusTextInput.bind(this);
  }

  focusTextInput() {
    this.textInput.current.focus();
  }

  render() {
    return (
      <div>
        <input type="text" ref={this.textInput} />
        <input type="button" value="Focus the text input" onClick={this.focusTextInput} />
      </div>
    );
  }
}
// 使用
const node = this.myRef.current;
```

React Refs 的 current 属性对不同的元素类型返回不同的引用

- HTML DOM：返回底层 DOM 节点
- Class 组件：返回 React 元素实例，可以调用实例内的方法
- 函数组件：不可以在函数组件上使用 ref，因为函数组件没有实例

```JavaScript
class AutoFocusTextInput extends React.Component {
  constructor(props) {
    super(props);
    // 创建ref存储class组件实例
    this.textInput = React.createRef();
  }

  componentDidMount() {
    // 调用class组件实例内部方法
    this.textInput.current.focusTextInput();
  }

  render() {
    return (
      <CustomTextInput ref={this.textInput} />
    );
  }
}
```

## Callback Refs

`ref`的值为一个函数，在组件`componentDidMount`或`componentDidUpdate`触发这个函数，函数的参数为 React 实例或 DOM 节点。

```JavaScript
class CustomTextInput extends React.Component {
  constructor(props) {
    super(props);

    this.textInput = null;
    this.setTextInputRef = element => {
      this.textInput = element;
    };

    this.focusTextInput = () => {
      if (this.textInput) this.textInput.focus();
    };
  }

  componentDidMount() {
    this.focusTextInput();
  }

  render() {
    return (
      <div>
        <input type="text" ref={this.setTextInputRef} />
        <input type="button" value="Focus the text input" onClick={this.focusTextInput} />
      </div>
    );
  }
}
```

## 父元素 ref 子元素内部节点

在某些情况下父元素需要直接操作子元素内部的节点，例如获取 DOM 的位置和大小。大多数情况不推荐这么做，react 的设计理念是状态提升。

version <= 16.2 实现：将 ref 作为特殊名字的 prop 直接传递。在 16.3 版本后可以使用 Forwarding Refs 实现

```JavaScript
function CustomTextInput(props) {
  return (
    <div>
      <input ref={props.inputRef} />
    </div>
  );
}

class Parent extends React.Component {
  render() {
    return (
      <CustomTextInput
        inputRef={el => this.inputElement = el}
      />
    );
  }
}
```

## Forwarding Refs

使组件可以像暴露自己的`ref`一样暴露子组件的`ref`，将组件自身的`ref`传递给其子元素，在进行非业务组件封装的时候这个场景非常常见。

```JavaScript
// 使用forwardRef创建组件
const FancyButton = React.forwardRef((props, ref) => (
  <button ref={ref} className="FancyButton">
    {props.children}
  </button>
));

// 可以直接获取组件内的DOM Button
const btnRef = React.createRef();
<FancyButton ref={btnRef}>Click me!</FancyButton>;
```

在 HOC 中使用 Forwarding Refs：因为`ref`属性和`key`属性一样会被 React 特殊处理，不会包含在组件的`props`中，所以在 HOC 中透传`ref`，可以使用 Forwarding Refs 明确的将`ref`转发到被包装的内部组件中。

```JavaScript
function logProps(Component) {
  class LogProps extends React.Component {
    componentDidUpdate(prevProps) {
      console.log('old props:', prevProps);
      console.log('new props:', this.props);
    }

    render() {
      const {forwardedRef, ...rest} = this.props;

      // 将自定义的 prop 属性 “forwardedRef” 定义为 ref
      return <Component ref={forwardedRef} {...rest} />;
    }
  }

  // 注意 React.forwardRef 回调的第二个参数 “ref”。
  // 我们可以将其作为常规 prop 属性传递给 LogProps，例如 “forwardedRef”
  // 然后它就可以被挂载到被 LogProps 包裹的子组件上。
  return React.forwardRef((props, ref) => {
    return <LogProps {...props} forwardedRef={ref} />;
  });
}
```
