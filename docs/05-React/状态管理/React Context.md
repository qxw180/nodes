# React Context

React Context 提供了可以**跨组件传递数据**的能力。在一般的 React 程序中数据是使用`props`属性从上到下逐渐传递的，但是在组件层次较多的情况下对一下全局数据(例如用户信息、皮肤信息等)的传递就很麻烦。React Context 就是为了解决这个问题。

React Context 请谨慎使用，因为他会降低组件的复用性。

```JSX
// 创建 context
const ThemeContext = React.createContext('light');

class App extends React.Component {
  render() {
    // 使用Provider在程序中注入context，注入后其子组件无论层级多深都可以获取context的值
    return (
      <ThemeContext.Provider value="dark">
        <Toolbar />
      </ThemeContext.Provider>
    );
  }
}

function Toolbar() {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

// contextType方式
class ThemedButton extends React.Component {
  // 指定 contextType 读取当前的 theme context。
  // React 会往上找到最近的 theme Provider，然后使用它的值。
  static contextType = ThemeContext;
  render() {
    return <Button theme={this.context} />;
  }
}

// Consumer 方式
class ThemedButton extends React.Component {
  render() {
      return(
        <ThemeContext.Consumer>
            {theme => <button style={{background: theme.background}}>按钮</button>}
        </ThemeContext.Consumer>
      )
    }
}

// Hook 方式
function ThemedButton() {
  const theme = useContext(ThemeContext);
  return (
    <button style={{ background: theme.background }}>
      I am styled by theme context!
    </button>
  );
```

## Context API

### 创建 Context

`const MyContext = React.createContext(defaultValue);`
创建一个 context 对象。当 React 渲染了一个订阅了这个 context 对象的组件，这个组件会从组件树中向上寻找**最近的**`Provider`并读取值。只有当组件树中没有匹配到`Provider`时，其`defaultValue`才会生效。

### Context.Provider

`<MyContext.Provider value={/* 某个值 */}>`
每一个`Context`对象 都有一个`Provider`组件，`Provider`组件有一个`value`属性，`Provider`的子组件可以订阅`value`的变化。
如果一个子组件订阅了`value`的变化，我们称这些子组件为**消费组件**。当`Provider`的`value`值发生变化时，它内部的所有消费组件都会重新渲染，不受`shouldComponentUpdate`控制。
**多个`Provider`也可以嵌套使用，里层的会覆盖外层的数据**。

注意：当`Provider`的`value`为对象时，当`Provider`的父组件重新渲染是，由于 React 会参考对象的引用值(使用`Object.is()`)来判断是否发生变化，所以应该将`value`值提取到父组件的`state`管理，防止因为父组件刷新导致的所有消费组件更新。

### 消费 Context

`Class.contextType` 方式：
将使用`React.createContext`创建的`context`对象挂在到 Class 对象的`contextType`属性上，在这个 Class 内部就可以使用`this.context`消费最近的`provider`的值。使用该方式只能挂在一个`context`对象。

`Context.Consumer` 方式：
`Consumer`的子组件要求是一个函数，这个函数的参数为`context`的`value`，函数的返回值为 React 组件。

Hook 方式：`const contextValue = useContext(MyContext);`

## TODO:Context 触发 render 机制

## 基于 Context 实现国际化功能
