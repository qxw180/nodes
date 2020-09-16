# React 状态管理

## React Context

React Context提供了可以跨组件传递数据的能力。在一般的React程序中数据是使用`props`属性从上到下逐渐传递的，但是在组件层次较多的情况下对一下全局数据(例如用户信息、皮肤信息等)的传递就很麻烦。React Context就是为了解决这个问题。

React Context请谨慎使用，因为他会降低组件的复用性。

``` JSX
const themes = {
  light: {
    background: "#eeeeee"
  },
  dark: {
    background: "#222222"
  }
};

const ThemeContext = React.createContext(themes.light);

class App extends React.Component {
  render() {
    return (
      <ThemeContext.Provider value={themes.dark}>
        <Toolbar />
      </ThemeContext.Provider>
    );
  }
}

function Toolbar(props) {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

// contextType方式，可以获取context值
class ThemedButton extends React.Component {
  static contextType = ThemeContext;
  render() {
    return <button style={{background: this.context.background}}>按钮</button>;
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

## 创建Context `React.createContext`

`const MyContext = React.createContext(defaultValue);`
创建一个context对象。当Recat渲染了一个订阅了这个context对象的组件，这个组件会从祖建树中向上寻找最近的`Provider`并读取值。只有当组件树种没有配合到`Provider`时，其`defaultValue`才会生效。

## 提供Context `<MyContext.Provider value={/* 某个值 */}>`

Provider可以为消费组件提供value，并允许消费组件订阅value的变化
Provider 接收一个 value 属性，传递给消费组件。一个 Provider 可以和多个消费组件有对应关系。**多个 Provider 也可以嵌套使用，里层的会覆盖外层的数据**。
当 Provider 的 value 值发生变化时，它内部的所有消费组件都会重新渲染。

## 消费Context

Class.contextType 方式
将使用`React.createContext`创建的context对象挂在到react class对象上，在这个class内部就可以使用`this.context`消费最近的provider的值。

Context.Consumer 方式
Consumer组件可以获取并订阅context的变化。Consumer的子组件要求是一个函数，这个函数的参数为context的value，函数的返回值为react组件
