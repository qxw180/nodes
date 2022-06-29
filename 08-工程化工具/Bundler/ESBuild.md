# TODO:[ESBuild](https://esbuild.github.io/)

> An extremely fast JavaScript bundler

ESBuild 是基于 Golang 开发的打包工具，ESBuild 的构建速度是传统工具的 10~100 倍，速度来源：

- 利用 Go 语言本身特性
  - Go 是编译型语言性能高于解释型语言
  - 充分利用多线程
- 从零开始造轮子，没有其他第三方黑盒逻辑，保证极致性能
- 高效利用内存，从头到尾尽可以使用一份 AST，避免 AST 的重复处理

- 无需依赖缓冲即可达到极致的速度
- 支持 ESM 和 CommonJS
- ESM Tree Shaking
- 支持 TypeScript 和 JSX 语法
- Go 和 JavaScript 统一的 API，ESBuild 有三种调用方式，CMD，JavaScript 和 Go
- Source Maps
- 代码压缩
- 插件
