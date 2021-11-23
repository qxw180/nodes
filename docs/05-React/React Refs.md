# React Ref

使用 Refs 可以获取 render 出来的实例，可以实现直接命令式的控制`render`函数渲染的 Dom 节点和 React 元素。
React 不推荐使用 ref，不是不得已尽量使用 props 和 states 进行功能实现。

## ref 属性

React 会对元素的`ref`属性特殊处理，子组件无法直接获取`ref`的值，如果想要获取可以使用用`React.forwardRef()`，默认情况下 React 会根据接收的属性的类型做不同的处理：

- ref 对象：会将选人的 DOM 元素或 react 组件实例赋值到 ref 对象的 current 属性上
- 函数：会在组件 mount 和 unmount 时调用这个函数，不同阶段回调函数测参数不同
  - mount：组件实例
  - unmount：`null`

## Creating Refs

使用`React.createRef()`创建`customRef`，并通过`ref`属性将`customRef`附传递 React 实例(DOM 或组件实例)。
React 会特殊处理`ref`属性，会使用当前实例赋值给接收的属性的`current`对象上，然后就可以使用`customRef.current`命令式的对实例进行操作。

```JavaScript
class CustomTextInput extends React.Component {
  constructor(props) {
    super(props);
    // 创建ref
    this.textInputRef = React.createRef();
    this.focusTextInput = this.focusTextInput.bind(this);
  }

  focusTextInput() {
    // 使用ref
    this.textInputRef.current.focus();
  }

  render() {
    return (
      <div>
        <input type="text" ref={this.textInputRef} />
        <input type="button" value="Focus the text input" onClick={this.focusTextInput} />
      </div>
    );
  }
}
```

React Refs 的`current`属性对不同的元素类型返回不同的引用

- HTML Element：引用底层 DOM Element
- Class Component：引用渲染的元素实例，可以调用实例内的方法
- **函数组件：不可以在函数组件上使用 ref，因为函数组件没有实例**

## [Ref Hook](https://reactjs.org/docs/hooks-reference.html#useref)

`useRef`返回一个 mutable `ref`对象，这个对象的`.current`属性被初始化为传入的`initialValue`，然后使用`createRef`创建的`ref`对象一样使用。例：

```JSX
function TextInputWithFocusButton() {
  const inputEl = useRef(null);
  const onButtonClick = () => {
    inputEl.current.focus();
  };
  return (
    <>
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  );
}
```

因为函数组件是无实例的，所以运行时变量是无法保存的，每次 rerender 时函数的变量都会重新生成。
如果在函数组件内使用`createRef()`rerender 时都是创建新的对象，`useRef()`会在每次渲染时返回同一个对象，这样就保存函数组件的运行时状态。

例：利用`useRef()`保存运行时状态能力实现定时计数组件

```JSX
function Timer() {
  const intervalRef = useRef();

  useEffect(() => {
    const id = setInterval(() => {
      // ...
    });
    intervalRef.current = id;
    return () => {
      clearInterval(intervalRef.current);
    };
  });
}
```

## 父元素 ref 子元素内部节点

通常情况向我们使用 refs 获取的是子元素的实例，在某些情况下父元素需要操作**子元素内部的节点**，例如获取 DOM 的位置和大小。大多数情况不推荐这么做，react 的设计理念是状态提升。

version <= 16.2：父组件将 callback ref 函数使用特殊名字的`prop`传递给子组件，子组件将该函数赋值给其要被引用的子元素的`ref`属性，这样父元素可以使用`callback ref`函数直接获取子组件内部需要被引用的元素实例。
version >= 16.3：使用 Forwarding Refs 实现

## Callback Refs

`ref`的值为一个函数，在组件`componentDidMount`或`componentDidUpdate`触发这个函数，函数的回调参数为 React 实例或 DOM 节点。

```JavaScript
function CustomTextInput(props) {
  return <input ref={props.inputRef} />;
}

class Parent extends React.Component {
  constructor(props) {
    super(props);

    this.textInput = null;
    // callback ref函数，存储refs element
    this.setTextInputRef = element => {
      this.textInput = element;
    };

    this.focusTextInput = () => {
      // 使用refs
      if (this.textInput) this.textInput.focus();
    };
  }

  componentDidMount() {
    this.focusTextInput();
  }

  render() {
    return (
      <>
        <CustomTextInput inputRef={this.setTextInputRef} />
        <input type="button" value="Focus the text input" onClick={this.focusTextInput} />
      </>
    );
  }
}
```

## Forwarding Refs

可以将自己获取的 ref 进一步向下传递给自己的子组件。可以实现像暴露自己的`ref`一样暴露子组件的`ref`，在进行非业务组件封装的场景非常常见。

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

在高阶组件中使用 Forwarding Refs：因为`ref`属性和`key`属性一样会被 React 特殊处理，不会包含在组件的`props`中，所以在高阶组件中透传`ref`，可以使用 Forwarding Refs 明确的将`ref`转发到被包装的内部组件中。

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

## how ref to function component

前面提到过 React refs 不能和函数组件上使用，因为函数组件是无实例的。我们可以借助`useRef`、`useImperativeHandle`和`React.forwardRef`在函数组件内外部实现 refs。

场景一：使用`React.forwardRef()`引用函数组件内部的 DOM 元素，参考[Forwarding Refs](#forwarding-refs)

场景二：使用`React.forwardRef()`结合`useImperativeHandle()`

使用`useImperativeHandle`可以在函数组件内自定义实例属性提供给父元素`ref`。

```tsx

interface IProps {
  onSuccess?: () => void;
}

interface IRefs {
  open: () => void;
}

const TestConfirm = forwardRef<IRefs, IProps>(({ onSuccess }, ref) => {
  const [form] = Form.useForm();
  const [isVisible, setIsVisible] = useState(false);

  function handleOpen() {
    setIsVisible(true);
  }

  useImperativeHandle(ref, () => {
    return {
      open: handleOpen,
    };
  });

  render() {
    return (
      <Modal visible={isVisible} onCancel={handleClose}>
      </Modal>
    )
  }
}

const Main:React.FC<{}> = () => {
  const confirmRef = useRef<IRefs>(null);

  function openConfirm() {
    testRulesConfirmRef.current?.open();
  }

  function handleSuccess() {
    console.log('success')
  }

  render() {
    return <TestConfirm ref={confirmRef} onSuccess={handleSuccess} />;
  }

}
```
