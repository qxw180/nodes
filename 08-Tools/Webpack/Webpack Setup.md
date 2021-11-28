# Webpack 配置要点

## 配置文件管理

通常我们为生产环境和开发环境进行不同的配置，同时为了保证代码的整洁，我们会提取一份公用配置，使用[webpack-merge](https://github.com/survivejs/webpack-merge)进行配置的合并

建议通过[webpack-load-plugins](https://www.npmjs.com/package/webpack-load-plugins)加载通过 npm 安装的第三方插件；

## TODO:runtime
