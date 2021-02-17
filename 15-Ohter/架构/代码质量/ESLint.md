# ESLint

一个可配置的 JavaScript 语法检查工具

安装：`npm install --save-dev eslint`
初始化：`npx eslint --init`，生成配置文件
运行：`ellint yourfile.js`

```JSON
{
    "extends": "eslint:recommended",
    "rules": {
        "semi": ["error", "always"],
        "quotes": ["error", "double"]
    }
}
```

"semi"和"quotes"是 ESLint 规则名称，数组中第一个值为错误等级：

- `off`或者`0`：关闭规则
- `warn`或者`1`：警告，不退出代码
- `error`或者`2`：错误，退出代码

## Config

ESLint 是被设计成完全可配置的，可以通过以下两种方式进行配置

1. 代码注释：在 JavaScript 代码中使用注释直接嵌入配置信息；
2. 配置文件：可以使用 JavaScript，JSON，YAML 文件定制入口目录或子目录的配置信息。配置文件可以为`.eslintrc.*`命名的文件，也可以在`package.json`的`eslintConfig`字段中配置；

ESLint 有以下类型的信息配置：

- Environments：配置 Scripts 脚本运行的环境。每个环境带有一套预定义的全局变量；
- Globals：脚本运行过程中添加的全局变量；
- Rules：启用的验证规则和错误等级；

## 配置解析器选项 Parser Options

ESLint 默认安装 ES5 语法进行校验，可以通过 Paser Option 配置来支持其他版本的 JavaScript 和 JSX 等。

支持 JSX 并不代表支持 React，React 使用了特殊的语义化 JSX 语法，ESLint 并不认识。推荐使用`eslint-plugin-react`。
同理支持 ES6 语法不代表 ES6 全局变量(例：Set)，对于 ES6 语法使用`{"parserOptions":{"ecmaVsersion":6}}`配置，对于 ES6 全局变量使用`{"evn":{"es6":true}}`配置(该配置项自动支持 ES6 语法)。

Parser Options 使用`parserOptions`字段来配置，可配置的字段包括：

- `ecmaVersion`：设置值为 3、5(默认)、6、7、8 来定制使用的 ECMAScripts，同意可以使用年份来设置，例：使用 2015 代替 6 表示 ECMAScripts6；
- `sourceType`：设置值`scripts`(默认)或者`moudle`使用 ECMAScripts modules
- `ecmaFeatures`：配置额外的语言特性
  - `globalReturn`：允许全局使用 return 语句
  - `impliedStrict`：启用全局严格模式
  - `JSX`：启用 JSX
  - `experimentalObjectResSpread`：
- `ecmaVersion`：
- `ecmaVersion`：

示例：

```JSON
{
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true
        }
    },
    "rules": {
        "semi": 2
    }
}
```

## 配置解析器 Parser

ESLint 默认使用`Espree`作为解析器，可以指定解析器，但必须满足以下条件

- 必须是一个本地安装的 npm 模块；
- 必须有一个兼容 Espima 的接口，即 export 一个 parse()方法；
- 必须产出一个兼容 Espimt 的 AST 和

使用`parser`配置解析器

```JSON
{
    "parser": "esprima",
    "rules": {
        "semi": "error"
    }
}
```

## 配置环境 Enviroments

环境预定义的全局变量，以下为支持的环境

- `browser`： - browser global variables.
- `node`： - Node.js global variables and Node.js scoping.
- `commonjs`： - CommonJS global variables and CommonJS scoping (use this for browser-only code that uses Browserify/WebPack).
- `shared`：-node-browser - Globals common to both Node and Browser.
- `es6`： - enable all ECMAScript 6 features except for modules (this automatically sets the ecmaVersion parser option to 6).
- `worker`： - web workers global variables.
- `amd`： - defines require() and define() as global variables as per the amd spec.
- `mocha`： - adds all of the Mocha testing global variables.
- `jasmine`： - adds all of the Jasmine testing global variables for version 1.3 and 2.0.
- `jest`： - Jest global variables.
- `phantomjs`： - PhantomJS global variables.
- `protractor`： - Protractor global variables.
- `qunit`： - QUnit global variables.
- `jquery`： - jQuery global variables.
- `prototypejs`： - Prototype.js global variables.
- `shelljs`： - ShellJS global variables.
- `meteor`： - Meteor global variables.
- `mongo`： - MongoDB global variables.
- `applescript`： - AppleScript global variables.
- `nashorn`： - Java 8 Nashorn global variables.
- `serviceworker`： - Service Worker global variables.
- `atomtest`： - Atom test helper globals.
- `embertest`： - Ember test helper globals.
- `webextensions`： - WebExtensions globals.
- `greasemonkey`： - GreaseMonkey globals.

环境设置并不是只能指定单独的一个，可以同时指定多个。

注释中指定：`/* eslint-env node, mocha */`;
配置文件中指定：

    {
        "env": {
            "browser": true,
            "node": true
        }
    }

在`package.json`中指定

    {
        "name": "mypackage",
        "version": "0.0.1",
        "eslintConfig": {
            "env": {
                "browser": true,
                "node": true
            }
        }
    }

##配置全局变量 Globals
`no-undef`规则会对使用未定义的变量的行为发出警告。在 ESLint 中配置全局变量，可以避免使用这些全局变量时发出警告。

注释定义：`/* global var1, var2 */` `/* global var1:false, var2:false */`
配置文件中定义

    {
        "globals": {
            "var1": true,
            "var2": false
        }
    }

##配置插件 Plugins
ESLint 支持第三方插件，首先需要使用 npm 安装插件。使用`plugins`配置插件，插件前缀`eslint-plugin-`可以省略

    {
        "plugins": [
            "plugin1",
            "eslint-plugin-plugin2"
        ]
    }

##配置规则 Rules
ESLint 有一系列规则。可以配置项目中使用的规则，可以通过对规则设置值进行配置：

- `off`或者`0`：关闭规则
- `warn`或者`1`：警告，不退出代码
- `error`或者`2`：错误，退出代码

通过注释配置：
`/* eslint eqeqeq: "off", curly: "error" */` `/* eslint eqeqeq: 0, curly: 2 */`
如果一个规则有额外配置可以采用以下方式配置：`/* eslint quotes: ["error", "double"], curly: 2 */`，第一项配置始终为错误等级。

通过配置文件配置：

    {
        "plugins": [
            "plugin1"
        ],
        "rules": {
            "eqeqeq": "off",
            "curly": "error",
            "quotes": ["error", "double"],
            "plugin1/rule1": "error"
        }
    }

##使用行注释禁止验证规则
可以使用特定格式的块注释禁止对注释内语句进行验证，例：

    /* eslint-disable */
    alert('foo');
    /* eslint-enable */

可以针对特定的规则启用或禁用

    /* eslint-disable no-alert, no-console */
    alert('foo');
    console.log('bar');
    /* eslint-enable no-alert, no-console */

整个文件禁用

    /* eslint-disable no-alert */
    alert('foo');

行注释

    alert('foo'); // eslint-disable-line

    // eslint-disable-next-line
    alert('foo');

    alert('foo'); // eslint-disable-line no-alert

    // eslint-disable-next-line no-alert
    alert('foo');

    alert('foo'); // eslint-disable-line no-alert, quotes, semi

    // eslint-disable-next-line no-alert, quotes, semi
    alert('foo');

    foo(); // eslint-disable-line example/rule-name

##添加共享配置
ESLint 支持在配置文件中添加共享配置。使用`setting`配置，在你添加自定义规则并且希望可以范围相同的信息并轻松配置时非常有用。

    {
        "settings": {
            "sharedData": "Hello"
        }
    }

##使用配置文件
有两种方式使用配置文件
方式一通过命令行通过 -C 参数指定配置文件位置：`eslint -c myconfig.json myfiletotest.js`
方式二使用配置文件通过`.eslintrc.*`或`package.json`。ESLint 会自动查找这两个文件。

##配置文件格式
ESLint 支持一下格式的配置文件：

- `JavaScript` - use `.eslintrc.js` and export an object containing your configuration.
- `YAML` - use .eslintrc.yaml or .eslintrc.yml to define the configuration structure.
- `JSON` - use .eslintrc.json to define the configuration structure. ESLint’s JSON files also allow JavaScript-style comments.
- `Deprecated` - use .eslintrc, which can be either JSON or YAML.
- `package.json` - create an eslintConfig property in your package.json file and define your configuration there.

优先级：.eslintrc.js > .eslintrc.yaml > .eslintrc.yml > .eslintrc.json > .eslintrc > package.json

##eslint:recommended
eslint:recommended 是核心规则的一个子集，包含了常见问题报告。使用`extends:"eslint:recommended"`配置。
recommened 规则只有在 ESLint 主版本改变的时候才会改变。

    module.exports = {
        "extends": "eslint:recommended",
        "rules": {
            // enable additional rules
            "indent": ["error", 4],
            "linebreak-style": ["error", "unix"],
            "quotes": ["error", "double"],
            "semi": ["error", "always"],

            // override default options for rules from base configurations
            "comma-dangle": ["error", "always"],
            "no-cond-assign": ["error", "always"],

            // disable rules from base configurations
            "no-console": "off",
        }
    }

##使用 sharable configuration package
sharable configuration 是一个 npm 包，输出一个 configuration object。

##使用 plugin 的 configuration
ESLint plugin 是一个 npm 包，通常输出 rules。

    {
        "plugins": [
            "react"
        ],
        "extends": [
            "eslint:recommended",
            "plugin:react/recommended"
        ],
        "rules": {
           "no-set-state": "off"
        }
    }
