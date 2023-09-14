# TODO:Web 汇编 - WebAssembly

WebAssembly 是一种将一种编程语言编写的代码转换为**浏览器可以理解的机器代码**的技术

WebAssembly 是一种低级的类汇编语言，可以接近原生性能运行，C/C++等语言可以通过编译器编译成`.wasm`文件，浏览器可以运行`.wasm`。

应用方向：

- 客户端高运算要求场景，视频剪辑、图片处理、VR 等
- 服务端运算压力转移，通过牺牲网络流量和加载时间将服务端的统一运算能力分散到客户端进行消耗

基础架构

- 可移植的二级制格式
- 面向 WebAssembly 的高级语言，以及将高级语言编辑为 WebAssembly 二级制格式的编辑工具和语言核心库，称之为 WebAssembly 前端（Frontend）
- 高效的运行环境（虚拟机）

WASM 不能直接与 DOM 加好，我们需要同时使用 JS 和 WASM

![](https://static001.geekbang.org/infoq/0b/0ba045dfedf1691f1c1ebd961d247ca2.png)