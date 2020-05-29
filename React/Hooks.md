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

`const [value, setValue] = useState(initValue)`
React会记住通过`state hook`声明的`state`值，并在函数组件每次运行的时候返回最新的值。

## Effect Hook

在React保存使用`useEffect`方法传递的函数，并在DOM更改后执行，

``` js
useEffect(() => {
  doSomthing()
  return function cleanup() {
      doSomthing()
  }
}, [props.source]);
```

React统称数据获取、设置订阅及手动更新React组件中的DOM为**副作用**，

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
