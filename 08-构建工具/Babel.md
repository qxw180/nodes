# Babel

Babel 可以进行语法转换和 polyfill，让我们在旧版浏览器中使用最新的语法规范。

- `@babel/cli`：Babel CLI 工具
- `@babel/core`：Babel 核心，提供对外实际运行的接口方法
- `plugin`：进行实际代码转换，Babel 本身并不包含任何转码规则，Babel 通过运行 plugin 来进行代码转换；
- `preset`：是 plugin 的集合，官方提供了一些 preset 我们可以直接使用
- `@babel/polyfill`：
  - Babel 默认只进行 JavaScript 语法转换，并不进行新 API 处理。polyfill 可以添加一个垫片来为浏览器添加新的 API 功能；
  - 自 Babel 7.4.0 起，该包已经废弃，建议直接 `import` `core-js/stable`和`regenerator-runtime/runtime`

## Presets & ECMAScript

ECMA 标准组织负责制定 Script 语言标准 ECMAScript，JavaScript 是 ECMAScript 标准的一种实现。
任何人在任何时间都可以向 ECMA 标准委员会提交新语法提案，标准委员会会定期开会评审，通过评审后就会正式进入标准了。
标准委员会在每年的 6 月份进行一次正式发布，作为当年的正式版本，以当年年份作为版本。
ECMA 语法提案的批准流程分为以下几个阶段：

1. Stage 0 - Strawman（展示阶段）：仅仅是一个想法或一个提议
2. Stage 1 - Proposal（征求意见阶段）：大家认为这个提议值得继续
3. Stage 2 - Draft（草案阶段）：初始化
4. Stage 3 - Candidate（候选人阶段）：形成完整的规范和浏览器的初步实现
5. Stage 4 - Finished（定案阶段）：会添加到下一年的发行版中
   进入 Stage 2 的提案一般会最终发行，但是在 Stage 3 之前的提案的变化会比较大。

Babel 官方提供了很多 preset 我们可以直接使用，大概分为以下几类：

- `babel-preset-esxxxx`：yearly presets，xxxx 为年份，只对当年定案发现的语法进行转换，例如:`babel-preset-es2015`是对 ES6 语法规范进行处理
- `babel-preset-last`：包含了全部的 yearly presets
- `babel-preset-stage-x`：对未正式定案的语法进行转换，
  - `babel-preset-stage-0`：Strawman 阶段
  - `babel-preset-stage-1`：Proposal 阶段
  - `babel-preset-stage-2`：Draft 阶段
  - `babel-preset-stage-3`：Candidate 阶段
- `babel-preset-react`：编译 react 的 jsx 语法
- `babel-preset-env`：用来替代 yearly presets 和 last，默认和`babel-preset-last`一致，可以进行定制配置

自 Babel@7 起 Babel 官方废弃了 stage preset，使用[@/babel/preset-env](https://babeljs.io/docs/en/babel-preset-env)

```JavaScript
const presets = [
  [
    "@babel/env",
    {
      targets: {
        edge: "17",
        firefox: "60",
        chrome: "67",
        safari: "11.1",
      },
      // 仅引入需要的polyfill
      useBuiltIns: "usage",
      corejs: "3.6.4",
    },
  ],
];

module.exports = { presets };
```

## 使用

Babel 附带一个内建的命令行工具[`babel-cli`](https://babeljs.io/docs/en/babel-cli)可以用来转换文件，更多的时候我们是和一下工具一起使用例如 webpack、gulp 等，这些工具可以读取 Babel 配置文件进行相应转换。

```JavaScript

```

配置执行顺序：

- 先执行 plugin，后执行 preset
- plugin 正向执行，从第一个执行到最后一个
- preset 反向执行，从最后一行向前执行到第一个

## TODO:插件开发

## 创建 Preset

创建一个 Preset 只需要 export 一个配置文件，配置文件中可以保护其它 preset 和 plugin 以及配置参数

```JavaScript
module.exports = {
  presets: [
    require("babel-preset-es2015"),
  ],
  plugins: [
    [require("babel-plugin-transform-es2015-template-literals"), { spec: true }],
    require("babel-plugin-transform-es3-member-expression-literals"),
  ]
};
```
