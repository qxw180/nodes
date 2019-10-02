# package.json

`package.json`是nodeJS项目的描述文件

## 一、描述字段

1. `name`：全部小写，没有空格，可以使用下划线或者横线
2. `version`：版本，有主办本、副版本和补丁版本三部分组成，详见[二、[语义化版本]](#l2)
3. `description`：描述信息，有助于搜索
4. `keywords`：关键字
5. `author`：作者
6. `license`：开源协议
7. `main`：入口文件，一般都是 index.js
8. `bin`：指定内部命令对应的可执行文件
9. `config`：添加命令行环境变量
10. `scripts`：脚本
11. `dependencies`：生产环境中需要用到的依赖
12. `devDependencies`：开发、测试环境中用到的依赖
13. `peerDependencies`：

## <span id='l2'>二、语义化版本</span>

NPM建议了一个版本规范，用来表示发布版本的修改种类，NPM版本由三部分组成：`[主版本].[副版本].[补丁版本]`

+ Patch releases 补丁版本: `1.0 or 1.0.x or ~1.0.4`
+ Minor releases 副版本，: `1 or 1.x or ^1.0.4`
+ Major releases 主版本，: `* or x`

## 项目依赖

在项目中使用`dependencies`字段描述项目依赖的包，格式如下

``` JSON
{
  "dependencies": {
    "next": "^9.0.6",
    "next-images": "^1.2.0",
  }
}
```

主要包含两部分，包名和版本。版本包含两部分分别为当前版本和更新规则

+ 只接受补丁版本更新
  + 只指定到副版本：`1.0`
  + `1.0.x`
  + `~1.0.4`
+ 接受副版本更新
  + 只指定主版本：`1`
  + `1.x`
  + `^1.0.4`
+ 接受所有更新
  + `*`
  + `x`

## 入口模块

一个包中的所有子模块中需要有一个模块作为包的导出对象，这个模块称为包的*入口模块*；例，目录结构如下：

``` text
- /home/user/workspace/lib/
  - school/
    teacher.js
    student.js
    main.js
```

其中`school`定义了一个包，`main.js`为入口模块，其他模块需要使用该包的时候，只需要`require('/home/user/workspace/lib/school/main')`引用即可。但是通过模块名称导入包看起来不是那么舒服直观。所有当包的入口模块名称为`index.js`的时候，以下两条语句是等价的：

``` javascript
require('/home/user/workspace/lib/school/index')
require('/home/user/workspace/lib/school')
```

可以在包中创建一个`package.json`文件来定义入口模块，例：

``` JSON
{
  "name":"school",
  "main":"./main.js"
}
```

可以通过`require('/home/user/workspace/lib/school')`来加载模块；

## 脚本

`scripts`中声明的脚本可以通过`npm run <cmd>`直接调用，`npm run`会创建一个Shell，执行指定的命令，并临时将`node_modules/.bin`加入`PATH`变量，这意味着本地模块可以直接运行。
声明的脚本可以使用`&&`(串行运行)和`&`(并行运行)进行连接

``` JSON
{
    sciptps: {
        "build": "npm run clean && next build",
        "start": "next start",
        "clean": "rimraf .next/* out/*",
        "lint": "eslint --cache --ext .js --ext .jsx src",
        "test": "karma start --log-leve=error karma.config.js --single-run=true",
        "pretest": "npm run lint",
        "posttest": "echo 'Finished running tests'"
    }
}
```

hook，可以为使用`pre`和`post`为`scripts`脚本声明钩子函数，在脚本运行前和运行后执行，入上面的`test`脚本
