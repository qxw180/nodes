# Webpack 配置要点

## 核心概念

- entry：入口
- output：输出
- loader：加载器、module 处理
- plugin：插件，功能扩展
- mode：模式
- devtool：
- optimization：优化配置
- resolve：模块解析配置选项

## 配置文件管理

通常我们为生产环境和开发环境进行不同的配置，同时为了保证代码的整洁，我们会提取一份公用配置，使用[webpack-merge](https://github.com/survivejs/webpack-merge)进行配置的合并

建议通过[webpack-load-plugins](https://www.npmjs.com/package/webpack-load-plugins)加载通过 npm 安装的第三方插件；

## TODO:runtime

## TODO:静态文件加载

使用[url-loader](https://webpack.js.org/loaders/url-loader/)进行静态文件加载，体积较小的文件会以 DataURL 的形式嵌入到页面文件中，减少 HTTP 请求。
图片压缩[image-webpack-loader](https://github.com/tcoopman/image-webpack-loader)基于 imagemin，可以对 PNG, JPEG, GIF, SVG and WEBP 格式的图片进行压缩。

```JavaScript
rules: [
    {
        test: /\.(png|jpg|gif)$/i,
        use: [
            {
                loader: 'url-loader',
                options: {
                    limit: 8192
                }
            },
            {
                loader: 'image-webpack-loader',
                options: {
                }
            }
        ]
    }
]
```
