# 错误处理

自 React 16 起，没有被任何 Error Boundaries 捕获的异常会导致整个 React 组件树 unmounting。

## Error Boundaries

Error Boundaries 是 React 提供的一个容错方案，可以捕获和处理(日志和错误提示)子组件的异常，以避免整个程序崩溃。
Error Boundaries 可以捕获`render`函数、生命周期、甚至是构造函数内抛出的异常，但是以下场景无法捕获：

1. Event Handler，因为事件处理并不发生在渲染过程，即使有异常抛出也不会影响组件渲染
2. 异步函数
3. SSR
4. Error Boundaries 本身抛出的错误

Error Boundaries 并不是 React 提供的一个组件，任何一个组件如果设置了`static getDerivedStateFromError`或`componentDidCatch`就是 Error Boundaries。Error Boundaries 通常作为容器组件使用。注意：**Error Boundaries 只能是类组件，只能捕捉子组件的异常**。

- [static getDerivedStateFromError(error)](https://reactjs.org/docs/react-component.html#static-getderivedstatefromerror)：设置异常反馈 UI
- [componentDidCatch(error, info)](https://reactjs.org/docs/react-component.html#componentdidcatch)：适合用来记录错误日志

```JSX
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

<ErrorBoundary>
  <MyWidget />
</ErrorBoundary>
```

## TODO:SSR 场景异常处理
