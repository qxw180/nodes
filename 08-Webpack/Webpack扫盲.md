# Webpack 扫盲

webpack is a module bundler 这是 Webpak 官网对 Webpak 的介绍，是一个模块打包器；

- 不只是模块化：Webpack 是一款模块加载器兼打包工具
- 一切都是模块：在 Webpack 中所有资源(html,css,js,image...)都可以当做模块
- loader：对不同类型的资源 webpack 都有对应模块的`loader`

## 核心概念

- 入口
- 出口
- loader
- plugin
- mode

## Webpack HelloWorld

Webpack 的思路还是很前卫的，如果不理解它的思路那么想体会以上内容还是有一点困难的。
最开始了解 webpack 是为了寻找一个 JavaScript 模块化工具，之前一直使用的是基于 AMD 规范的 requireJS，
而 webpack 不只是 JavaScript 模块化工具，所以 requireJS 的思路理解 webpack 使我陷入了困惑，一度无法进行下去。
好了经过了这个痛苦的过程，我认为最开始学习 webpack 先不要尝试去理解最上面的一堆特性，直接 HelloWorld，从零开始搭建一个项目；
以下内容涉及到 NodeJS 和 NPM 等相关内容不做介绍

Step1. 项目初始化

- 创建工作目录：`mkdir webpack-study`
- 初始化项目：`cd webpack-study`,`npm init`
- 安装 Webpack：`npm install --save-dev webpack`
- 创建 Wepback 配置文件：`touch webpack.config.js`，该文件相当于 Gulp 的`gulpfile.js`
  Step2. 创建文件
- 创建代码目录：`mkdir src`
- 创建入口文件：`cd src`,`main.js`
- 创建测试模块：`mod1.js`
- 创建项目主页：`index.html`
  Step3. 代码编写

```JavaScript
// mod1.js
module.exports = {
  txt: "Hello Webpack"
}
// main.js
var mod1 = require('./mod1')
var title = document.createElement('h1');
title.innerHTML = mod1.txt;
document.body.appendChild(title);
```

Step4. Webpack 配置

```JavaScript
// webpack.config.js
module.exports = {
  //页面入口文件配置
  entry: {
    index : './src/main.js'
  },
  //入口文件输出配置
  output: {
    path: __dirname + "/src",
    filename: 'bundle.js'
  }
};
```

Step5. 编译

- 进入项目根目录：`cd webpack-study`
- 编译：`webpack`
- 这时可以看到 src 目录下多了一个`bundle.js`
  Step6. 主页面编写

```HTML
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Webpack Study</title>
</head>
<body>
  <script src="./bundle.js"></script>
</body>
</html>
```

Step7. 运行查看效果

- 自行搭建本地 web 服务
- 访问 index.html 可以发现页面展示`Hello Webpack`

通过以上步骤我们就实现了一个最简单的 Webpack 项目，通过以上内容我们可以我们就可以尝试着去理解 webpack 了
首先总结一下 Webpack 的代码组织逻辑和工作流程

1. 首先 Webpack 模块是基于 CommonJS 规范进行开发的；
2. 然后 Webpack 是通过一个入口文件对模块进行组织，在入口文件中引入模块
3. 最后 Webpack 编译之后会生成一个编译后的文件，页面直接引入这个编译后的文件
   所有我们就可以理解
   不只是模块化：Webpack 是一款模块加载器兼打包工具

## Webpack loader

上面是一个简单的不能再简单的例子，真正的项目一定不是这个样子的。下面我们来丰富一下我们的项目，给它加点样式。

Step1. 创建样式文件

```CSS
// 在src目录下创建mian.css文件
h1 {
  color: red;
}
```

Step2. 引入样式文件
通常的方式我们是在`index.html`文件中使用`link`标签进行引入
但这中做法不是 Webpak 的逻辑，上面已经说过 Webpak 是通过入口文件进行模块的组织的
在 Webpack 中不仅仅 js 是模块，样式文件也同样是模块，可以和 js 文件一样引入，像下面这个样子：

```JavaScript
// main.js
var mod1 = require('./mod1')
// 引入样式
require('./main.css')
var title = document.createElement('h1');
title.innerHTML = mod1.txt;
document.body.appendChild(title);
```

通过`require('./main.css')`我们就完成了样式的引入，当然单单这样是不行的
我们需要对`webpack.config.js`进行修改，添加关于 css 的 loader
在这里我们先不要纠结什么是 loader，先看下面的例子

```JavaScript
// webpack.config.js
module.exports = {
  //页面入口文件配置
  entry: {
    index : './src/main.js'
  },
  //入口文件输出配置
  output: {
    path: __dirname + "/src",
    filename: 'bundle.js'
  },
  // 要用什么模块来处理各种类型的文件
  module: {
    //加载器配置
    loaders: [
      loaders: ['style','css']
    ]
  }
};
```

Step3. 编译：

- 安装 loader：`npm install css-loader style-loader --save-dev`
- 编译：`webpack`

然后刷新页面发现样式已经生效了。

现在我们来看一下什么 loader(加载器)
Webpack 通过` module``loaders `来配置 loader
`loader`配置项包括`test`和`loader`两个字段
`test`：一个正则，用来匹配文件
`loader`：一个数组，用来处理命中文件的加载器，加载器的执行顺序是从右到左的
这里面我们用到了两个加载器
`css-loader`：会遍历 css 文件，找到所有的 url(...)且处理。tag 中。
`style-loader`：会把所有的样式插入到你页面的一个 style

到这我们应该能够理解：
一切都是模块：在 Webpack 中所有资源(html,css,js,image...)都可以当做模块
loader：对不同类型的资源 webpack 都有对应模块的`loader`

以上这些只是 webpack 的冰上一角。。。
