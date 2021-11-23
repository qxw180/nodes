# React状态和声明周期

## 使用state需要注意一下三个问题

一. 不要直接修改state，要使用`setState()`方法修改；

二. 状态更新可能是异步的，不要直接使用state和props计算下一个state
React可能为了性能将多个状态更新合并到一个界面update，下面的代码有可能更新失败

``` JavaScript
this.setState({
    counter: this.state.counter + this.props.increment,
});
```

通常我们使用第二种方式使用`setState()`方法，传入一个`function`作为参数，
这个方法会接受两个参数，第一个参数为组件的上一个状态`prevState`，第二个参数为`prop`

``` JavaScript
this.setState((prevState, props) => ({
    counter: prevState.counter + props.increment
}));
```

三. 状态更新是合并的
当我们调用`setState()`方法时，React会将传入的Object对象和当前state对象进行合并，相当于`Object.assign()`;
