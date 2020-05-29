# React 性能优化

##Production Build

##Long List
https://github.com/bvaughn/react-virtualized


##避免不必要的re-render
React组件的生命周期函数`shouldComponentUpdate`在re-render之前运行，函数默认返回true进行重新渲染。
我们可以对比新旧props和states决定是否进行re-render
``` JavaScript
shouldComponentUpdate(nextProps, nextState) {
  return true;
}
```

大多数时候我们可以使用`React.PureComponent`来代替手动写`shouldComponentUpdate`。
PureComponent内部隐式实现了shouldComponentUpdate方法，对比props和states。

``` JavaScript
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


###React Immutability
大多数时候我们可以使用PureComponent来快速的处理re-render，但是PureComponent只是进行浅比较，对应较复杂的数据结构PureComponent就无能无力了。
##Immutable Data
+ 简化复杂功能开发：方便历史数据保存，用来实现撤销，还原功能
+ 方便变动检查：Imuutable Object 只需要对比值本身， Mutable Object则需求遍历整个对象树进行对比
+ 决定什么适合进行re-render：

// TODO
[Immutable.js ](https://github.com/facebook/immutable-js)
不可变：一旦创建，集合在其它时间点是不能改变的
一致：可以在原集合的基础上修改和创建新的集合，原集合在创建新集合之后仍然有效
结构共享：新集合尽可能和原集合结构保持一致，将复制减少到最低程度以提高性能

``` JavaScript
const SomeRecord = Immutable.Record({ foo: null });
const x = new SomeRecord({ foo: 'bar' });
const y = x.set('foo', 'baz');
const z = x.set('foo', 'bar');
x === y; // false
x === z; // true
```

immutable data使得追踪数据变化变得非常容易，每一个改变都会生成一个新的数据对象，我们只需直接对比新旧数据对象。

##代码拆分和按需加载
// TODO
https://reactjs.org/docs/code-splitting.html

