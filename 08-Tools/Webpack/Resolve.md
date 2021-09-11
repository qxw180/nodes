# Webpack 模块解析

模块位置解析可以分为绝对路径、相对路径和模块路径三大类，webpack 使用`resolve`字段配置如何解析模块路径

```JavaScript
const path = require('path');
module.exports = {
  resolve: {
    // 别名
    alias: {
      '@':  path.resolve(__dirname, 'src'),
    },
    // 文件后缀解析顺序
    extensions: ['.ts', '...'],
    modules: [],
  },
};
```
