# React 组件逻辑复用

Components 是 React 的代码复用的主要形式，Components 内代码可分为 UI 代码和逻辑代码两类。组件可以对 UI 展示进行很好的复用，在实际业务中经常出现功能逻辑类似或者相同但是 UI 不同的场景，例如在一个 WEB 页面通常在页面的顶部和底部都有网站的导航，他们的数据获取、数据过滤排序逻辑是一致的，但是 UI 截然不同，常规做法是封装两个组件，每个组件内部都有一套数据获取和加工的代码。这时我们就需要考虑如何复用这部分数据加工和获取的逻辑代码了。

## 方式一：Higher-Order Components

高阶组件类似高阶函数，是一种编程方法，用于逻辑的复用。HOC 是一个函数，这个函数接收一个 Component，返回一个新的 Component，同时可以传入配置参数。在这个 HOC 中可以为 Component 添加功能，即在 HOC 中实现具体的业务逻辑代码，将处理后的结果通过 props 传给被包装的 Component。HOC 并不对 Component 进行修改，也不是通过继承的方式实现，没有任何副作用。高阶组件是 AOP 的一种实现，Redux connect 就是 HOC 的具体实现案例。

以下例子`withSubscription`内部为传入的`WrappedComponent`组件添加数据变化的监听，使用传入的`selectData`方法加工数据更新 state，`WrappedComponent`接收 state 后只需要关心 UI 展示。使用`withSubscription`可以为其它组件添加同样的功能，以实现逻辑的复用。

```JSX
function withSubscription(WrappedComponent, selectData) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        data: selectData(DataSource, props)
      };
    }

    componentDidMount() {
      DataSource.addChangeListener(this.handleChange);
    }

    componentWillUnmount() {
      DataSource.removeChangeListener(this.handleChange);
    }

    handleChange = () => {
      this.setState({
        // 使用传染的数据加工方法加工数据
        data: selectData(DataSource, this.props)
      });
    }

    render() {
      // 过滤掉与此 HOC 相关的 props，且不要进行透传，将无关的 props 全部透传
      const { extraProp, ...passThroughProps } = this.props;
      const { data } = this.state
      // 要将其它属性透传
      return <WrappedComponent data={data} {...passThroughProps} />;
    }
  };
}
```

为了方便在 React Developer Tools 中调试，我们一般会设置一个展示名，格式一般为：`HOC Name(Compoent Name)`

```JSX
function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

function withSubscription(WrappedComponent) {
  class WithSubscription extends React.Component {}
  WithSubscription.displayName = `WithSubscription(${getDisplayName(WrappedComponent)})`;
  return WithSubscription;
}
```

拷贝组件静态方法，HOC 返回的是一个新的组件，被包装组件的静态方法在新组件上无法访问，这会对组件原本功能造成影响，可以使用[hoist-non-react-statics](https://github.com/mridgway/hoist-non-react-statics)拷贝所有非 React 静态方法(`displayName`、`defaultProps`等，参考[React.Component](https://reactjs.org/docs/react-component.html))，

```JSX
import hoistNonReactStatic from 'hoist-non-react-statics';
function enhance(WrappedComponent) {
  class Enhance extends React.Component {}
  // 手动复制React静态属性及方法
  Enhance.propTypes = WrappedComponent.propTypes;
  // 复制非React静态属性方法
  hoistNonReactStatic(Enhance, WrappedComponent);
  return Enhance;
}
```

`ref`和`key`这种 React 特定属性不会通过`this.props`属性获取，可以使用[React.forwardRef](./Base/Refs.md)支持最大化可组合性

## 方式二：Render Props

HOC 的逻辑复用方式是对 UI 组件进行一层封装，在 HOC 内部编写逻辑代码，将逻辑处理结果通过 props 传递给 UI 组件。和 HOC 一样 Render Props 也不是 React 的一项特性，也是一种编程方式。
Render Props 是一个封装好逻辑的 Components，以下简称这个 Component 为 RPC，RPC 约定 render 属性的值是一个 function，function 的返回值是 Recat Element，用来告诉 RPC 如何渲染 UI。RPC 本身的 render 函数并不实现具体的 UI，而是运行 render 属性传入的 function，并传入逻辑处理结果以参数的形式传入。
这里 RPC 使用`render`属性来传入 UI 逻辑并不是必须的，只是一种约定，你可以使用其它任意的属性名。

```JSX
class Cat extends React.Component {
  render() {
    const mouse = this.props.mouse;
    return (
      <img src="/cat.jpg" style={{ position: 'absolute', left: mouse.x, top: mouse.y }} />
    );
  }
}

class Mouse extends React.Component {
  constructor(props) {
    super(props);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.state = { x: 0, y: 0 };
  }

  handleMouseMove(event) {
    this.setState({
      x: event.clientX,
      y: event.clientY
    });
  }

  render() {
    return (
      <div style={{ height: '100%' }} onMouseMove={this.handleMouseMove}>
        {this.props.render(this.state)}
      </div>
    );
  }
}

class MouseTracker extends React.Component {
  render() {
    return (
      <div>
        <h1>Move the mouse around!</h1>
        <Mouse render={mouse => (
          <Cat mouse={mouse} />
        )}/>
      </div>
    );
  }
}
```

## 自定义 Reack Hooks

HOC 和 Render Props 方法都需要对原有组件做修改，复杂情况可能**陷入嵌套地狱**，因为UI和逻辑分散导致**代码可读性低**。可以使用自定义 React Hooks 提取组件的状态逻辑，使得这些逻辑**可以单独测试并复用**。
同样自定义 Hook 是一种自然遵循 Hook 设计的约定，而并不是 React 的特性。社区也有大量的hooks可以使用。

[react-use](https://github.com/streamich/react-use)
[Rehooks](https://github.com/rehooks)
