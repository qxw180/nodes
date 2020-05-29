# React 状态管理

## React Context

React Context提供了可以跨组件传递数据的能力。在一般的React程序中数据是使用`props`属性从上到下逐渐传递的，但是在组件层次较多的情况下对一下全局数据(例如用户信息、皮肤信息等)的传递就很麻烦。React Context就是为了解决这个问题。

React Context请谨慎使用，因为他会降低组件的复用性。

``` JSX
const ThemeContext = React.createContext({});

class App extends React.Component {
  render() {
    return (
      <ThemeContext.Provider value="dark">
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

// contextType方式
class ThemedButton extends React.Component {
  static contextType = ThemeContext;
  render() {
    return <button style={{background: this.context}}>按钮</button>;
  }
}


// Consumer 方式
class ThemedButton extends React.Component {
  render() {
      return(
        <ThemeContext.Consumer>
            {value => <button style={{background: value}}>按钮</button>}
        </ThemeContext.Consumer>
      )
    }
}
```
