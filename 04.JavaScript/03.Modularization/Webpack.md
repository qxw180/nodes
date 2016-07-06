#Webpack
> Webpack是一款模块加载器*兼*打包工具
> 在Webpack中所有资源(html,css,js,image...)都可以当做模块
> 对不同类型的资源webpack都有对应模块的`loader`
> webpack引用模块的规范是CommonJS，不过做了CommonJS和AMD语法的兼容，方便代码迁移
> 

##[相比RequireJS](http://ourjs.com/detail/54963e2a8a34fa3204000013)
+ require有的功能webpack全有
+ 代码更加简洁
	* require在定义模块依赖组件过多的时候很恶心；
	* 不需要写很长很恶心的配置文件；

##安装配置
安装：`npm install -g webpack`
配置：在项目的根目录下配置`webpack.config.js`

	var webpack = require('webpack');
	var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');

	module.exports = {
	    //插件项
	    plugins: [commonsPlugin],
	    //页面入口文件配置
	    entry: {
	        index : './src/js/page/index.js'
	    },
	    //入口文件输出配置
	    output: {
	        path: 'dist/js/page',
	        filename: '[name].js'
	    },
	    module: {
	        //加载器配置
	        loaders: [
	            { test: /\.css$/, loader: 'style-loader!css-loader' },
	            { test: /\.js$/, loader: 'jsx-loader?harmony' },
	            { test: /\.scss$/, loader: 'style!css!sass?sourceMap'},
	            { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'}
	        ]
	    },
	    //其它解决方案配置
	    resolve: {
	        root: 'E:/github/flux-example/src', //绝对路径
	        extensions: ['', '.js', '.json', '.scss'],
	        alias: {
	            AppStore : 'js/stores/AppStores.js',
	            ActionType : 'js/actions/ActionType.js',
	            AppAction : 'js/actions/AppAction.js'
	        }
	    }
	};

运行：`webpack --display-error-details`

+ `--config XXX.js`：使用另一份配置文件（比如webpack.config2.js）来打包
+ `--watch`：监听变动并自动打包
+ `-p`：压缩混淆脚本，这个非常非常重要！
+ `-d`：生成map映射文件，告知哪些模块被最终打包到哪里了

##CommonJS

##加载器

##兼容AMD