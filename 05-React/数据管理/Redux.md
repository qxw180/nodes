# [Redux](https://redux.js.org/)

一个可以预测(Predictable)的 State 容器，Redux 不允许对状态直接进行修改，而是要求使用 Action(一个 JavaScript 对象)来描述状态的变化，Reducer 接收 Action 然后计算生成一个新的 State 替换旧的 State。每个 Action 都是可以记录和回访的，所以相同的 Action 和相同的顺序就可以保证最终 State 的一致性，这就是所谓的 Predictable。

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

- reducer 函数必须是一个纯函数，只有这样才能保证 Redux 的可预测性。
- 在 reducer 内不能够直接修改 state，而是使用 immutable updates 返回一个新的 state，直接修改 state 会导致难以定位的 bug。
- reducer 函数不能是异步的，因为异步函数的执行顺序无法保证，会破坏 redux 的可预测性。

在实际项目中我们需要写很多的 reducer，这时我们会根据业务逻辑进行拆分，然后另外写一个 reducer 来整合。

```javascript
function todoApp(state = {}, action) {
  return {
    todos: todos(state.todos, action),
    visibilityFilter: visibilityFilter(state.visibilityFilter, action),
  };
}
```

## Store & Dispatch

当前 redux 程序的 state 寄生对象，有`store.getState()`和`store.dispatch()`方法

state 只能包含 object、array 和基本类型。

Dispatch 是更新 redux state 的唯一方法，store 在接收到 dispatch 的 action 后会运行 reducer 方法并使用 reducer 产生的新 state 替换旧 state。

## Selector & Action Creators

在使用 redux 的过程中我们需要写很多 action 和 state 获取的相关的代码，通常我们会对这两类代码进行封装，创建 action 对象的方法叫 Action Creator，获取 state 的函数叫 Selector。

Action Creator 函数接收 payload 信息，返回 action 对象。这样我们可以避免每次都手写 action，保证 action 的准确性。

Selector 封装可以隔离 UI 和 Store，在 Store 修改时只需要修改 Selector，无需对每一个 UI 进行修改。

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

redux 期望全部的 state 更新都是 immutability，修改 state 会引起奇怪的 bug，使程序难以理解和测试。

对于数组、对象等引用类型变量进行 immutability 操作非常繁琐切容易出错，[immer](https://immerjs.github.io/immer/)可以让我们更容易的进行 immutability 编程。

## Middleware

redux middleware 可以用于对`dispatch`方法进行定制，middleware 执行实在 action 派发到 reducer 接收之前执行。

```JavaScript
function exampleMiddleware(storeAPI) {
  const { dispatch, getState } = storeAPI;
  // next：下一个middleware
  return function wrapDispatch(next) {
    return function handleAction(action) {
      return next(action)
    }
  }
}
```

扩展 store，允许执行：

1. 执行额外的逻辑，例如日志记录
2. 暂停、修改、延迟、替换或者取消 action
3. 增强`dispatch`如何接受处理除了基本的对象和原始类型数据之前的数据类型，例如函数或者 Promise 对象。
4. 添加其它额外的 code

## [redux-thunk](https://github.com/reduxjs/redux-thunk)

`thunk`是一种特定的函数，有`dispatch`和`getState`两个参数，可以在`thunk`可以在这执行异步逻辑，跟进应用场景调用`store`的`dispatch`和`getState`方法，获取当前 state 或触发一个 action，通常是触发一个同步 action。

为了保持一致性，我们通常也会为`thunk`函数也创建一个 creator 函数，可以在这个函数传入合适的业务参数。

```JavaScript
export const incrementAsync = (amount) => {
  return (dispatch, getState) => {
     setTimeout(() => {
       dispatch(incrementByAmount(amount))
     }, 1000)
   }
}
store.dispatch(incrementAsync(5))
```

在 redux 中使用 thunk 函数需要配合[redux-thunk](https://github.com/reduxjs/redux-thunk)

## [Reselect](https://github.com/reduxjs/reselect)

Reselect 是一个用来实现 memoized selector functions 的工具库。

Memoization 指的是记录上一次的输入和返回，在下一次执行的时候对比两次的输入，如果相同那么就直接返回上一次的记录的返回。

redux 的每个 action 都会触发选择器 re-run，如果组件引用的 state 发生变化，那么组件就会 re-render。memoized selector 可以避免没必要的 re-render。

## Normalized State Structure

我们经常有需要在一个长列表中找到某一特定项目的需求场景，如果这个列表非常长，这个操作将会是一个特别耗时的操作。我们可以对数据进行 Normalizing。

Normalizing 是指加工原始数据生成一个对象，包括一个 ID 数组，一个以 ID 为 key 的 lookup tables。

```JavaScript
// 原数据
const DataArr = [
  {id: "user1", firstName, lastName},
   {id: "user2", firstName, lastName},
   {id: "user3", firstName, lastName},
]
// Normalized Data
const NormalizedData = {
  users: {
    ids: ["user1", "user2", "user3"],
    entities: {
      "user1": {id: "user1", firstName, lastName},
      "user2": {id: "user2", firstName, lastName},
      "user3": {id: "user3", firstName, lastName},
    }
  }
}
```
