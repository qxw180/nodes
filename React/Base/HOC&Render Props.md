#Higher-Order Components
高阶组件，类似高阶函数，HOC一个方法的，这个方法接收一个component，返回一个新的component。
在这个函数中可以为component添加功能，HOC并不对component进行修改，也不是通过继承的方式实现，没有任何副作用。
高阶组件是AOP的一种实现，Redux connect就是HOC的具体实现案例。

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
        data: selectData(DataSource, this.props)
      });
    }

    render() {
      return <WrappedComponent data={this.state.data} {...this.props} />;
    }
  };
}
```


##container components
//  TODO
container components是HOC的一种实现，



#Render Props
Render Props 提供了使用function props来实现代码共享的技术，组件的render属性的值是一个函数，函数返回React Element，并且调用该组件实现其内部的功能逻辑。通过参数的形式可以将上层组件中的数据向下传递。
React Router就是使用Render Props实现的。
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
