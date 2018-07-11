#Babel
Babel是一个JavaScript编译器，可以把用最新标准编写的JavaScript代码转化为当下可用的版本；
Babel处理代码分为3个阶段：代码解析、代码转换、代码生成。
Babel本身只是一个在高层运行的框架，本身并不进行语法转换加工，Babel依赖plugin在代码转换的过程中进行工作。

Babel中有几个概念需要理解：
+ `plugin`：进行实际代码转换，Babel本身并不包含任何转码规则，Babel通过运行plugin来进行代码转换；
+ `preset`：是转码规则集，是一份共享的plugin配置，官方提供了一些preset我们可以直接使用
+ `polyfill`：Babel默认只进行JavaScript语法转换，并不进行新API处理。polyfill可以添加一个垫片来为浏览器添加新的API功能；

##ECMAScript
ECMA标准组织负责制定Script语言标准ECMAScript，JavaScript是ECMAScript标准的一种实现。
任何人在任何时间都可以向ECMA标准委员会提交新语法提案，标准委员会会定期开会评审，通过评审后就会正式进入标准了。
标准委员会在每年的6月份进行一次正式发布，作为当年的正式版本，以当年年份作为版本。
ECMA语法提案的批准流程分为以下几个阶段：
1. Stage 0 - Strawman（展示阶段）：仅仅是一个想法或一个提议
2. Stage 1 - Proposal（征求意见阶段）：大家认为这个提议值得继续
3. Stage 2 - Draft（草案阶段）：初始化
4. Stage 3 - Candidate（候选人阶段）：形成完整的规范和浏览器的初步实现
5. Stage 4 - Finished（定案阶段）：会添加到下一年的发行版中
进入Stage 2的提案一般会最终发行，但是在Stage 3之前的提案的变化会比较大。

##Presets
Babel官方提供了很多preset我们可以直接使用，大概分为以下几类：
+ `babel-preset-esxxxx`：yearly presets，xxxx为年份，只对当年定案发现的语法进行转换，例如:`babel-preset-es2015`是对ES6语法规范进行处理
+ `babel-preset-last`：包含了全部的yearly presets 
+ `babel-preset-env`：用来替代yearly presets和last，默认和`babel-preset-last`一致，可以进行定制配置
+ `babel-preset-stage-x`：对未正式定案的语法进行转换，
	* `babel-preset-stage-0`：Strawman阶段
	* `babel-preset-stage-1`：Proposal阶段
	* `babel-preset-stage-2`：Draft阶段
	* `babel-preset-stage-3`：Candidate阶段
+ `babel-preset-react`：编译react的jsx语法

// TODO
##[babel-preset-env](https://babeljs.io/docs/en/babel-preset-env)使用
默认和`babel-preset-last`行为一致，可以通过配置你需要进行转的语法和需要添加的polyfill，使你编译之后的脚步更加轻量。
``` JSON
{
  "presets": [
    ["env", {
      "targets": {
        "browsers": ["last 2 versions", "safari >= 7"]
      }
    }]
  ]
}
```


##使用
Babel附带一个内建的命令行工具`babel-cli`可以用来转换文件，具体[使用方法](https://babeljs.io/docs/en/babel-cli)
更多的时候我们是和一下工具一起使用例如webpack、gulp等，这些工具可以读取Babel配置文件`.babelrc`进行相应转换。
``` JSON
{
	"plugins": ["transform-react-jsx"],
  "ignore": [
	  "foo.js",
    "bar/**/*.js"
  ]
}
```

配置执行顺序：
+ 先执行plugin，后执行preset
+ plugin正向执行，从第一个执行到最后一个
+ preset反向执行，从最后一行向前执行到第一个

// TODO
##插件开发
https://github.com/jamiebuilds/babel-handbook

##创建Preset
创建一个Preset只需要export一个配置文件，配置文件中可以保护其它preset和plugin以及配置参数
``` JavaScript
module.exports = {
  presets: [
    require("babel-preset-es2015"),
  ],
  plugins: [
    [require("babel-plugin-transform-es2015-template-literals"), { spec: true }],
    require("babel-plugin-transform-es3-member-expression-literals"),
  ],
};
```


