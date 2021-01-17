# NPM 脚本

`scripts`中声明的脚本可以通过`npm run <cmd>`直接调用，`npm run`会创建一个 Shell，执行指定的命令，并临时将`node_modules/.bin`加入`PATH`变量，这意味着本地模块可以直接运行，不需要完整路径。

## 并行&串行

执行顺序：声明的脚本可以使用`&&`(串行运行)和`&`(并行运行)进行连接

更好的并行运行多个命令：[Concurrently](https://www.npmjs.com/package/concurrently)

```JSON
{
  sciptps: {
    "watch-js": "rimraf .next/* out/*",
    "watch-css": "npm run clean && next build",
    "watch": "npm run watch-js & npm run watch-css",
    "watch2": "concurrently npm:watch-*",
  }
}
```

## 传参

传参：使用`--`标明，例 `npm run start -- -port 8080`

变量：npm 脚本可以通过环境变量获取`package.json`中的配置，例：

```JSON
{
  "version": "1.2.0",
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

## HOOK

hook：可以为使用`pre`和`post`为`scripts`脚本声明钩子函数，在脚本运行前和运行后执行，例如入上面的`test`脚本

```JSON
{
  sciptps: {
    "pretest": "npm run lint",
    "test": "karma start --log-leve=error karma.config.js --single-run=true",
    "posttest": "echo 'Finished running tests'"
  }
}
```

[npm-run-scripts](https://docs.npmjs.com/cli/v6/commands/npm-run-script)
[scripts](https://docs.npmjs.com/cli/v6/using-npm/scripts)
