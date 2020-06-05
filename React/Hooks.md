# React Hooks

``` jsx
import React, { useState, useEffect } from 'react';
function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

## 解决问题

+ 组件逻辑复用，可以通过自定义Hook封装公用逻辑
+ 解决逻辑分散和聚合问题，
  + 逻辑分散：例如在Class Component中我们会在`componentDidMount`中添加一些订阅函数并在`componentWillUnmount`中注销这些订阅，使用`Effect Hook`我们可以在一个`useEffect`中处理订阅和注销订阅操作
  + 逻辑聚合：例如在Class Component中我们往往在`constructor`中一次性声明所有的`state`，在其它生命周期函数中以此处理不相关的业务逻辑，使用`State Hook`和`Effect Hook`我们可以将非相关的逻辑和状态分别处理

## State Hook

React会记住通过`state hook`声明的`state`值，并在函数组件每次运行的时候返回最新的值。
`const [state, setState] = useState(initialState)`
`initialState`用来初始化state，`initialState`只在组件初始化的时候起作用。`initialState`也可以是一个函数，在组件初始化的时候React会执行这个函数，并将这个函数的返回值作为初始状态
`setState`用来更新state，`setState`方法接收一个新的state来更新当前的state，并将组件的一次重新渲染加入队列，注意：和class组件`setState`不同，**不会进行state合并而是直接替换**。
如果更新state需要依赖之前的state，在调用`setState`方法的时候可以传入一个函数，函数执行时候的参数即为之前的state

``` js
// 使用函数初始state
const [state, setState] = useState(() => {
  const initialState = someExpensiveComputation(props);
  return initialState;
});

// 函数式更新
function Counter({initialCount}) {
  const [count, setCount] = useState(initialCount);
  return (
    <>
      Count: {count}
      <button onClick={() => setCount(initialCount)}>Reset</button>
      <button onClick={() => setCount(prevCount => prevCount - 1)}>-</button>
      <button onClick={() => setCount(prevCount => prevCount + 1)}>+</button>
    </>
  );
}
```

## Effect Hook

`useEffect(didUpdate, [deps]);`
React统称数据获取、设置订阅及、设置定时器、手动更新React组件中的DOM、记录日志等操作为**副作用**，这些操作可能产生莫名其妙的bug，所以在函数组件主体内不允许进行这些操作。
React使用Effect Hook来完成副作用操作，`useEffect(didUpdate)`接收一个可能有副作用代码的函数并保存该函数，并在DOM更改后**依次**执行传入的函数。
函数的返回值如果是也是一个函数，React会在组件**下一次渲染之后**执行这个函数，可以在这个返回函数中执行一些订阅取消之类的操作。
默认情况下React在每次渲染完成后执行执行effect hook注册的副作用函数，一些场景并不需要每次渲染之后重新执行，例如：初始数据加载、订阅等场景。`useEffect`方法的第二个参数可以设置effect函数的依赖值的数组，依赖数组中的任意一个值发生了变化effect都会重新执行。
如果你要使用此优化方式，**请确保数组中包含了所有外部作用域中会发生变化且在 effect 中使用的变量**，否则你的代码会引用到先前渲染中的旧变量。如果只想执行一次则可以传入一个空数组。

``` js
// 清除 effect
useEffect(
  () => {
    const subscription = props.source.subscribe(); // 订阅
    return () => {
      subscription.unsubscribe(); // 清除订阅
    };
  },
  [props.source] // 依赖
);
```

## Context Hook

`const value = useContext(MyContext);`接收一个context对象，并返回该context的当前值，同时会订接收的context的变化。
当`<MyContext.Provider>`更新时，使用该context的hook会重新执行并获取最新的value。

## 自定义 Hook

React 自定义hook就是一个常规的function，按照约定习惯这个function的名字以`use`开头，在这个function中的顶层可以使用其它hook函数。

``` js
import { useState, useEffect } from 'react';

function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(null);

  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }

    ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(friendID, handleStatusChange);
    };
  });

  return isOnline;
}
```

## Ref Hook

`const refContainer = useRef(initialValue);`
`useRef`返回一个可变的`ref`对象，其`.current`属性被初始化为传入的参数。`useRef`会在每次渲染时返回同一个`ref`对象

``` js
function TextInputWithFocusButton() {
  const inputEl = useRef(null);
  const onButtonClick = () => {
    inputEl.current.focus();
  };
  return (
    <>
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  );
}

function Timer() {
  const intervalRef = useRef();

  useEffect(() => {
    const id = setInterval(() => {
      // ...
    });
    intervalRef.current = id;
    return () => {
      clearInterval(intervalRef.current);
    };
  });
}
```

## Reducer Hook

State Hook的替代方案，类Redux。`const [state, dispatch] = useReducer(reducer, initialArg, init);`

+ `reducer`参数：以下格式的函数`(state, action) => newState`，接收当前state和action，返回新state。
+ `initialArg`参数：初始states
+ `init`参数：state初始化方法，初始state为`init(initialArg)`

``` js
const initialState = {count: 0};

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
    </>
  );
}
```
