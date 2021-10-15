# Jest Setup

```bash
# 初始化项目
npm init -y
git init
# 安装依赖
npm i -d jest @babel/core @babel/preset-env
# 初始化jest配置
npx jest --init
# 配置编译，具体内容参考：Jest 支持 ES6 Module
touch .babelrc
# 运行测试并生成测试报告
npx jest --coverage
# 监听文件变动，自动运行测试
npx jest --watch
```

## TODO:使用 Babel 转化 ESM&TypeScript

在安装 Jest 的时候会默认安装`babel-jest`，这时如果项目包含 babel 配置，jest 会自动使用 babel 对测试文件进行转化。所以我们只需要在项目中配置 babel 就可以使用 ESM&TypeScript。
如果想要定制代码转化逻辑，可以在配置文件的`transform`字段配置

```JavaScript
// babel.config.js
module.exports = {
  presets: [
    ['@babel/preset-env', {targets: {node: 'current'}}],
+    '@babel/preset-typescript',
  ],
};
```

## 配置项

```JavaScript
// jest.config.js
module.exports = {
  // 单测文件转换配置，默认使用`babel-jest`
  transform: {},
};
```
