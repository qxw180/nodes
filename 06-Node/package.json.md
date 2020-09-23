# package.json

`package.json`是 nodeJS 项目的描述文件

## 一、常用字段列表

1. `name`：全部小写，没有空格，可以使用下划线或者横线
2. `version`：版本，格式`主板本.副版本.补丁版本`
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

## 二、语义化版本

NPM 建议了一个版本规范，用来表示发布版本的修改种类，NPM 版本由三部分组成：`[主版本].[副版本].[补丁版本]`

- Patch releases 补丁版本: `1.0 or 1.0.x or ~1.0.4`
- Minor releases 副版本，: `1 or 1.x or ^1.0.4`
- Major releases 主版本，: `* or x`

## 三、项目依赖

在项目中使用`dependencies`字段制定项目运行依赖的包，使用`devDependencies`指定项目开发依赖的包，格式如下，声明的依赖在`npm install`后都会下载到项目根目录下的`node_modules`目录中：

```JSON
{
  "dependencies": {
    "next": "^9.0.6",
    "next-images": "^1.2.0",
  }
}
```

配置为一个对象，key 为包名，value 为版本限制。版本限制包含两部：当前版本和限定规则，有以下情况：

- 只接受补丁版本更新：
  - `1.0`：只指定到副版本：
  - `1.0.x`：使用 x 代表所有补丁版本
  - `~1.0.4`：使用`~`前缀
- 接受副版本更新：
  - `1`：只指定主版本
  - `1.x`：使用 x 代表所有副版本
  - `^1.0.4`：使用`^`前缀
- 接受所有更新：
  - `*`
  - `x`
- 固定版本：`1.0.4`：明确指定版本号且无任何前缀

## 四、入口模块

一个包中的所有子模块中需要有一个模块作为包的导出对象，这个模块称为包的*入口模块*；例，目录结构如下：

```text
- /home/user/workspace/lib/
  - school/
    - teacher.js
    - student.js
    - main.js
```

其中`school`定义了一个包，`main.js`为入口模块，其他模块需要使用该包的时候，只需要`require('/home/user/workspace/lib/school/main')`引用即可。但是通过模块名称导入包看起来不是那么舒服直观。所有当包的入口模块名称为`index.js`的时候，以下两条语句是等价的：

```javascript
require("/home/user/workspace/lib/school/index");
require("/home/user/workspace/lib/school");
```

可以在包中创建一个`package.json`文件来定义入口模块，例：

```JSON
{
  "name":"school",
  "main":"./main.js"
}
```

可以通过`require('/home/user/workspace/lib/school')`来加载模块；

## 五、bin 字段

使用`bin`字段配置命令并指定对应的 JS 文件，npm 安装 package 之后如果发现安装的包有`bin`字段配置，会在`node_modules/.bin/`目录下按照配置建立链接，使用`npm run`运行时会将`node_modules/.bin/`目录加入系统的 PATH 变量，因此在运行 npm 时，就可以不带路径，直接通过命令来调用这些脚本。

```JSON
// 声明
{
  "name": "hello",
  "bin": {
    "hello": "./bin/hello.js"
  },
}
// 引用
{
  "dependencies": {
    "hello": "*"
  },
  "scripts": {
    "sayhello": "hello"
  }
}
```

## 脚本

`scripts`中声明的脚本可以通过`npm run <cmd>`直接调用，`npm run`会创建一个 Shell，执行指定的命令，并临时将`node_modules/.bin`加入`PATH`变量，这意味着本地模块可以直接运行，不需要完整路径。

```JSON
{
    sciptps: {
        "build": "npm run clean && next build",
        "start": "next start",
        "clean": "rimraf .next/* out/*",
        "lint": "eslint --cache --ext .js --ext .jsx src",
        "pretest": "npm run lint",
        "test": "karma start --log-leve=error karma.config.js --single-run=true",
        "posttest": "echo 'Finished running tests'"
    }
}
```

执行顺序：声明的脚本可以使用`&&`(串行运行)和`&`(并行运行)进行连接

传参：使用`--`标明，例 `npm run start -- -port 8080`

hook：可以为使用`pre`和`post`为`scripts`脚本声明钩子函数，在脚本运行前和运行后执行，例如入上面的`test`脚本

变量：npm 脚本可以通过环境变量获取`package.json`中的配置，例：

```JSON
{
  "config" : { "port" : "8080" },
  "scripts": {
    "start" : "node server.js",
    "build": "tar -czf dist/prdc-node-${npm_package_version}.tgz prdc-node"
  }
}
```

```JS
console.log(process.env.npm_package_version);
console.log(process.env.npm_package_config_port);
```
