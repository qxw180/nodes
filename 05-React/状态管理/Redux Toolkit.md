# [Redux Toolkit](https://redux-toolkit.js.org/)

RTK 是 Redux 官方推荐的工具集，提供最佳实践，解决以下问题：

1. 配置 redux store 过于复杂
2. 需要额外添加 redux-devtools immer 等工具库
3. 需要写很多模板代码

## 设计思想

slice

## API

1. `configureStore()`：封装`createStore`，添加了一些有用的默认配置。
2. `createReducer()`：根据 reducer 函数生成默认的 action 类型列表，不用再写`switch`语句，默认使用`immer`
3. `createAction()`：根据传入的 action type 生成 action creator 函数
4. `createSlice()`：结算 reducer 函数、name 和初始状态，自动生成 reducer 以及对应的 action creator 和 action types
5. `createAsyncTrunk()`：
6. `createEntityAdapter()`：

在内部默认试一下 Immer library，所以可以直接修改 state

```typescript
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
// 获取并导出state的类型定义
export type RootState = ReturnType<typeof store.getState>;
// 获取并导出dispatch的类型定义
export type AppDispatch = typeof store.dispatch;
// 导出一个hook提到useDispatch，避免useDispatch重复的泛型引用
export const useAppDispatch = () => useDispatch<AppDispatch>();

// 订阅变化
store.subscribe(() => console.log(store.getState()));

// 触发action
store.dispatch(incremented()); // {value: 1}
store.dispatch(decremented()); // {value: 0}
```

## TODO:reducer prepare

## createSelector

```JavaScript
import {  createSelector } from '@reduxjs/toolkit'

export const selectAllPosts = state => state.posts.posts

export const selectPostById = (state, postId) =>
  state.posts.posts.find(post => post.id === postId)

export const selectPostsByUser = createSelector(
  // 每个selector都会接收调用时传入的全部参数
  [selectAllPosts, (state, userId) => userId],
  // 会将第一个参数中所有的selector执行结果作为参数输入
  (posts, userId) => posts.filter(post => post.user === userId)
)

selectPostsByUser(state1, 'user1')
```
