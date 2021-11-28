# Webpack 配置要点

## 静态文件配置

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
