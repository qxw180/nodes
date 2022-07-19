# 面试-React

## React 代码复用，结合具体场景介绍，各种方案的优缺点对比

1. HOC
   1. 如何设置显示名
   2. 复制静态方法
   3. refs 透传
   4. 不要再 render 方法中进行 HOC
   5. 最大化可组合性
2. render props，使用注意事项(PureComponent)
3. Hooks

## React Refs 使用

## React 性能优化

## 为什么只能在函数最外层调用 Hook。不要在循环、条件判断或者子函数中调用

## React 数据管理方案

1. Context
   1. Context 使用注意事项
      1. `Context.Provider`的`value`值是一个对象的时候需要注意什么
   2. React 如何确定新旧值得变化，是否受`shouldComponentUpdate`影响

## Flux

store 用来存放数据，store 和 view 关联，store 可以有多个
Dispatcher：用来分发 action，flux 接收到 action 后向所有的 store 分发 action
action 事件，包含行为和内容，flux 对 action 进行处理，更新 store

## redux 理解

解决组件层级过深情况下 model 和 view 关系难以梳理的问题
store，redux 只有一个 store，负责存储数据，一个 store 包含多个 state，store 中数据变化之后会直接通过 view-ctroller 更新页面
reducer，是一个纯函数，负责处理 action，`(previousState, action) => newState`，redux 包含多个 reducer，combineReducers 可以合并 reducer
action：事件，由行为和内容两部分组成，通过`store.dispatch()`将 action 发送给 store；

store 是 redux 的核心，action 和 reduce 的关联处理，`let store = createStore(rootReducers, initialState);`

- 维持应用的 state；
- 提供 getState() 方法获取 state；
- 提供 dispatch(action) 方法更新 state；
- 通过 subscribe(listener) 注册监听器。

reducer，根据 action 和 prevstate 生成一个新的 state 返回

- 不要修改 state。
- 在 default 情况下返回旧的 state。遇到未知的 action 时，一定要返回旧的 state。
- 如果没有旧的 State，就返回一个 initialState，这很重要！！！

## React-Redux

## Redux 异步方案

- react 组件的声明周期，异步数据获取应该在哪个周期发起，为什么？
- props state 的区别，经历了哪些声明周期
- setState 之后发生了什么
- 实现一个弹窗组件，需要暴露的 api 和参数
- React 中 refs 的作用是什么？
- React 中 keys 的作用是什么？
- 简述如何实现如何使用 React 实现一个前三列固定，其它列可以左右滑动的表格

- Redux 有三大原则：
  - 单一数据源
  - state 只读
  - 只用纯函数来修改
