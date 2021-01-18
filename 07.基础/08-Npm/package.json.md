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
