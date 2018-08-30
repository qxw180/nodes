#生产环境配置

+ 指定模式：`mode: 'production'`，webpack 4会依据该配置自动使用DefinePlugin
+ 代码压缩：webpack在production模式下会自动进行代码压缩
+ `devtool 'source-map'`：使用独立的sourcemap
+ css压缩：MiniCssExtractPlugin


``` JavaScript
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'production',
    devtool: 'source-map'
});
```

#Code Splitting
+ 按入口模块进行代码拆分
    + 注意在不同的入口模块中公用的模块会在各个入口模块重复引入
+ 公用模块提取：SplitChunksPlugin
+ 动态引入：ECMAScript import()

##按需加载
JS按需加载
CSS按需加载
