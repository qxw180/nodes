# TODO:[MutationObserver](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver)

使用 MutationObserver 可以监听 DOM 变动。
MutationObserver 是 Mutation Events 功能的替代品，采用异步调用和减少触发频率缓解性能问题，为了保证实时性 MutationObserver 的回调函数会被插入到微任务队列。

```JS
 // 选择需要观察变动的节点
const targetNode = document.getElementById('some-id');

// 观察器的配置（需要观察什么变动）
const config = { attributes: true, childList: true, subtree: true };

// 当观察到变动时执行的回调函数
const callback = function(mutationsList, observer) {
    // Use traditional 'for loops' for IE 11
    for(let mutation of mutationsList) {
        if (mutation.type === 'childList') {
            console.log('A child node has been added or removed.');
        }
        else if (mutation.type === 'attributes') {
            console.log('The ' + mutation.attributeName + ' attribute was modified.');
        }
    }
};

// 创建一个观察器实例并传入回调函数
const observer = new MutationObserver(callback);

// 以上述配置开始观察目标节点
observer.observe(targetNode, config);

// 之后，可停止观察
observer.disconnect();
```
