# TypeScript

## TODO:tsc or webpack ts loader or babel preset-typescript

- 使用[@babel/preset-typescript](https://babeljs.io/docs/en/babel-preset-typescript)编译项目
  - 不能进行语法检查
- 使用[tsc](https://www.typescriptlang.org/docs/handbook/compiler-options.html)进行类型检查和生成声明文件
  - 路径别名问题

[swc](https://swc.rs/)

isolatedModules 属性

[tsc-alias](https://github.com/justkey007/tsc-alias)

## TypeScript 编译配置

可以使用`-p`参数置顶编译配置`tsc -p ./tsconfig.json`

tsconfig.json

```JSON5
{
  //
  extends: "path of base config",
  // 可以使用files、include、exclude字段配置被编译文件
  files: [], // 文件列表
  include: [], // 包含文件或目录列表
  exclude: [], // 排除include配置包含的文件或目录列表
  // 使用compilerOptions字段配置编译选项
  compilerOptions: {
    // 项目配置
    allowJs: false, // 使用允许在ts文件中import js文件，默认false，适用场景：js项目ts渐进改造
    checkJs: false, // 和allowJs配合使用，是否对import js文件进行检查，默认为false

    // 输入输出配置
    // TS在编译文件是，输出目录总是保持和输入目录相同
    // 默认值为所有输入文件中最长的公共路径，rootDir可以修改默认路径设置输出路径
    rootDir: '.',
    outDir: 'dist', // 输出目录

    // 编译配置
    module: 'CommonJS', // 设置编译后程序module规范
    target: 'ES6', // 默认ES3，设置运行环境支持支持的ES版本
    lib: [], // 设置内置API的类型定义，TS会根据target匹配默认的类型定义，开发者可以根据实际运行环境进行定制

    // 严格模式检查
    strict: true, // 默认为false，开启全部strict模式检查

    // 模块解析配置
    baseUrl: 'src', // 设置相对路径引用的base目录
    paths: { // 配置TS import解析自定义前缀
      "@libs/*": ["libs/*"] // 值相对于baseUrl
    },
    esModuleInterop: true, // 默认为false，建议设置为true，修复TS转义非ES模块中的问题
    skiLibCheck: true, // 默认为false，跳过声明文件检查，节省编译时间
    forceConsistentCasingInFileNames: true, // 强制验证文件路径大小写
  }
}
```

官方推荐的针对不同运行环境 TS 基础配置[tsconfig/bases](https://github.com/tsconfig/bases/)，

include 和 exclude 支持通配符，如果不包含扩展名默认支持`.ts .tsx .d.ts`，如果配置了`allowJs`选项则支持`.js`和`.jsx`

- `*`：匹配任何个字符
- `?`：匹配一个字符
- `**`：匹配任意层级的目录嵌套

## TODO:browserlist with ts config target

## [Integration With Jest](../../11-Testing/jest/Jest%20Setup.md)
