# [MutationObserver](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver)

使用 MutationObserver 可以监听 DOM 变动。
MutationObserver 是 Mutation Events 功能的替代品，采用异步调用和减少触发频率缓解性能问题，为了保证实时性 MutationObserver 的回调函数会被插入到微任务队列。
