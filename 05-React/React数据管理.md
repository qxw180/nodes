# React 数据共享

## 一：React Context

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

// contextType方式，可以获取context值
class ThemedButton extends React.Component {
  // 指定 contextType 读取当前的 theme context。
  // React 会往上找到最近的 theme Provider，然后使用它的值。
  static contextType = ThemeContext;
  render() {
    return <Button theme={this.context} />;
  }
}

// Consumer 方式，可以获取并订阅context值的变化
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

### Context API

创建 Context `const MyContext = React.createContext(defaultValue);`
创建一个 context 对象。当 Recat 渲染了一个订阅了这个 context 对象的组件，这个组件会从组件树中向上寻找最近的`Provider`并读取值。只有当组件树种没有配合到`Provider`时，其`defaultValue`才会生效。

`<MyContext.Provider value={/* 某个值 */}>`

Provider 可以为消费组件提供 value，并允许消费组件订阅 value 的变化
Provider 接收一个 value 属性，传递给消费组件。一个 Provider 可以和多个消费组件有对应关系。**多个 Provider 也可以嵌套使用，里层的会覆盖外层的数据**。
当 Provider 的 value 值发生变化时，它内部的所有消费组件都会重新渲染，不受`shouldComponentUpdate`控制。

消费 Context

Class.contextType 方式
将使用`React.createContext`创建的 context 对象挂在到 react class 对象上，在这个 class 内部就可以使用`this.context`消费最近的 provider 的值。

Context.Consumer 方式
Consumer 组件可以获取并订阅 context 的变化。Consumer 的子组件要求是一个函数，这个函数的参数为 context 的 value，函数的返回值为 react 组件

## 二、Redux
