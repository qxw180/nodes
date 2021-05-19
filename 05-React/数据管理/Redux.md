# [Redux](https://redux.js.org/)

JavaScript 状态容器

- state：全局唯一，用来存储数据，不能够直接修改 state
- action：描述发生的事件，包括 type 和其它字段，type 用来标记事件类型，其它字段用来描述事件
- reducer：用来接收 action 更新 store 的函数

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

## state

只能包含 object、array 和基本类型

## reducer

reduce 是一个纯函数，形式如`(state, action) => newState`，接收当前的 state 和 action，根据 action 的 type 和其它属性，计算生成一个新的 state 并返回。
注意：在 reducer 内不能够直接修改 state，而是返回一个新的 state。

在实际项目中我们需要写很多的 reducer，这时我们会根据业务逻辑进行拆分，然后另外写一个 reducer 来整合。

```javascript
function todoApp(state = {}, action) {
  return {
    todos: todos(state.todos, action),
    visibilityFilter: visibilityFilter(state.visibilityFilter, action),
  };
}
```

## [Redux DevTools](https://github.com/reduxjs/redux-devtools)

## [immer](https://github.com/immerjs/immer)

## [redux-thunk](https://github.com/reduxjs/redux-thunk)

## [React Redux](https://react-redux.js.org/)

## [Reselect](https://github.com/reduxjs/reselect)

## [Redux Toolkit](https://redux-toolkit.js.org/)

RTK 是 Redux 官方推荐的使用方式，是建立在最佳实践上，简化 redux 编写逻辑、避免错误。主要以下几部分：

1. 配置 store
2. 创建 reducer，immutable
3. slice

在内部默认试一下 Immer library，所以可以直接修改 state

```javascript
import { createSlice, configureStore } from "@reduxjs/toolkit";

// 创建slice
const slice = createSlice({
  name: "counter",
  initialState: {
    value: 0,
  },
  reducers: {
    incremented: (state) => {
      state.value += 1;
    },
    decremented: (state) => {
      state.value -= 1;
    },
  },
});

// 自动生成action creater
export const { incremented, decremented } = counterSlice.actions;

// 创建store
const store = configureStore({
  reducer: counterSlice.reducer,
});

// 订阅变化
store.subscribe(() => console.log(store.getState()));

// 触发action
store.dispatch(incremented()); // {value: 1}
store.dispatch(decremented()); // {value: 0}
```
