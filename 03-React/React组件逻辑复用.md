# React 组件逻辑复用

Components是React的代码复用的主要形式，Components内代码可分为UI代码和逻辑代码两类。组件可以对UI展示进行很好的复用，在实际业务中经常出现功能逻辑类似或者相同但是UI不同的场景，例如在一个WEB页面通常在页面的顶部和底部都有网站的导航，他们的数据获取、数据过滤排序逻辑是一致的，但是UI截然不同，常规做法是封装两个组件，每个组件内部都有一套数据获取和加工的代码。这时我们就需要考虑如何复用这部分数据加工和获取的逻辑代码了。

## 方式一：Higher-Order Components

高阶组件类似高阶函数，是一种编程方法，用于逻辑的复用。HOC是一个方法，这个方法接收一个Component，返回一个新的Component。在这个HOC中可以为Component添加功能，即在HOC中实现具体的业务逻辑代码，将处理后的结果通过props传给被包装的Component。HOC并不对Component进行修改，也不是通过继承的方式实现，没有任何副作用。高阶组件是AOP的一种实现，Redux connect就是HOC的具体实现案例。

``` JSX
function withSubscription(WrappedComponent, selectData) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
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

    handleChange() {
      this.setState({
        // 使用传染的数据加工方法加工数据
        data: selectData(DataSource, this.props)
      });
    }

    render() {
      // 要将其它属性透传
      return <WrappedComponent data={this.state.data} {...this.props} />;
    }
  };
}
```

## 方式二：Render Props

HOC的逻辑复用方式是对UI组件进行一层封装，在HOC内部编写逻辑代码，将逻辑处理结果通过props传递给UI组件。和HOC一样Render Props也不是React的一项特性，也是一种编程方式。
Render Props是一个封装好逻辑的Components，以下简称这个Component为RPC，RPC约定render属性的值是一个function，function的返回值是Recat Element，用来告诉RPC如何渲染UI。RPC本身的render函数并不实现具体的UI，而是运行render属性传入的function，并传入逻辑处理结果以参数的形式传入。
这里RPC使用`render`属性来传入UI逻辑并不是必须的，只是一种约定，你可以使用其它任意的属性名。

``` JSX
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

## 自定义Reack Hooks

HOC和Render Props方法都需要对原有组件做修改，并且降低代码可读性。可以使用自定义React Hooks提取组件的状态逻辑，使得这些逻辑可以单独测试并复用。
同样自定义 Hook 是一种自然遵循 Hook 设计的约定，而并不是 React 的特性。
