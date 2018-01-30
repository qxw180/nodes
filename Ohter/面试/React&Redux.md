#React&Redux

##react理解
组件化，props、state、lifecycle、virtual dom、model-view


##如何理解单项数据流，状态提升

##Flux
store用来存放数据，store和view关联，store可以有多个
Dispatcher：用来分发action，flux接收到action后向所有的store分发action
action事件，包含行为和内容，flux对action进行处理，更新store


##redux理解
解决组件层级过深情况下model和view关系难以梳理的问题
store，redux只有一个store，负责存储数据，一个store包含多个state，store中数据变化之后会直接通过view-ctroller更新页面
reducer，是一个纯函数，负责处理action，`(previousState, action) => newState`，redux包含多个reducer，combineReducers可以合并reducer
action：事件，由行为和内容两部分组成，通过`store.dispatch()`将action发送给store；

store是redux的核心，action和reduce的关联处理，`let store = createStore(rootReducers, initialState);`
+ 维持应用的 state；
+ 提供 getState() 方法获取 state；
+ 提供 dispatch(action) 方法更新 state；
+ 通过 subscribe(listener) 注册监听器。

reducer，根据action和prevstate生成一个新的state返回
+ 不要修改 state。
+ 在 default 情况下返回旧的 state。遇到未知的 action 时，一定要返回旧的 state。
+ 如果没有旧的State，就返回一个initialState，这很重要！！！

##React-Redux


##Redux异步方案

+ react 组件的声明周期，异步数据获取应该在哪个周期发起，为什么？
+ props state的区别，经历了哪些声明周期
+ setState之后发生了什么
+ 实现一个弹窗组件，需要暴露的api和参数
+ React 中 refs 的作用是什么？
+ React 中 keys 的作用是什么？
+ 简述如何实现如何使用React实现一个前三列固定，其它列可以左右滑动的表格


+ Redux 有三大原则：
    * 单一数据源
    * state 只读
    * 只用纯函数来修改
