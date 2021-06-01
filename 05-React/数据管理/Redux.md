# [Redux](https://redux.js.org/)

JavaScript 状态容器

## Action

Action 是一个原始的 JavaScript 对象，用来描述发生的事件，类似 event。

每个 Action 都有一个`type`字段，`type`的类型是字符串，用来给 Action 命名，`type`通常以`domain/eventName`形式定义。第一部分标识 action 的分类或特性，第二部分定义发生的事件。

除了`type`外每个 action 还可以包含其他字段用来添加额外信息，通常我们使用`payload`进行聚合。

```JavaScript
const addTodoAction = {
  type: 'todos/todoAdded',
  payload: 'Buy milk'
}
```

## reducer

reduce 是一个纯函数，形式如`(state, action) => newState`，接收当前的 state 和 action，根据 action 的 type 和其它属性，计算生成一个新的 state 并返回。

注意：

- 在 reducer 内不能够直接修改 state，而是使用 immutable updates 返回一个新的 state。
- reducer 函数不能是异步的。
- reducer 函数必须是一个纯函数。

在实际项目中我们需要写很多的 reducer，这时我们会根据业务逻辑进行拆分，然后另外写一个 reducer 来整合。

```javascript
function todoApp(state = {}, action) {
  return {
    todos: todos(state.todos, action),
    visibilityFilter: visibilityFilter(state.visibilityFilter, action),
  };
}
```

TODO:redux 不允许直接对 state 进行修改，而是要使用 reducer 函数处理，这样可以解决什么问题：

1. 避免 bug 难以复现，如果

TODO:why immutable
TODO:why 纯函数

## Store & Dispatch

当前 redux 程序的 state 寄生对象，有`store.getState()`和`store.dispatch()`方法

state 只能包含 object、array 和基本类型。

Dispatch 是更新 redux state 的唯一方法，store 在接收到 dispatch 的 action 后会运行 reducer 方法并使用 reducer 产生的新 state 替换旧 state。

## Selector & Action Creators

在使用 redux 的过程中我们需要写很多 action 和 state 获取的相关的代码，通常我们会对这两类代码进行封装，创建 action 对象的方法叫 Action Creator，获取 state 的函数叫 Selector。

Action Creator 函数接收 payload 信息，返回 action 对象。这样我们可以避免每次都手写 action，保证 action 的准确性。

```JavaScript
const addTodo = text => {
   return {
     type: 'todos/todoAdded',
     payload: text
   }
}

const selectCounterValue = state => state.value
const currentValue = selectCounterValue(store.getState())
```

## API

Redux 的 API 非常简单，主要有以下四个

- `createStore(reducer)`：创建 store
- `store.subscribe(callback)`：订阅变化
- `store.getState()`：获取 state
- `store.dispatch(action)`：触发 action

```javascript
import { createStore } from "redux";

// 初始state值
const initState = {
  count: 0,
};

// reducer
function reducer(state = initState, action) {
  switch (action.type) {
    case "incremented":
      return {
        value: state.value + 1,
      };
    case "decremented":
      return {
        value: state.value - 1,
      };
    default:
      return state;
  }
}

// 创建store
let store = createStore(reducer);

// 订阅变化
store.subscribe(() => {
  // 获取store
  console.log(store.getState());
});

// 触发action
store.dispatch({ type: "incremented" }); // {value: 1}
store.dispatch({ type: "decremented" }); // {value: 0}
```

## [Redux DevTools](https://github.com/reduxjs/redux-devtools)

## [immer](https://github.com/immerjs/immer)

redux 期望全部的 state 更新都是 immutably

## [redux-thunk](https://github.com/reduxjs/redux-thunk)

## [Reselect](https://github.com/reduxjs/reselect)
