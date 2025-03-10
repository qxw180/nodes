# 团队代码风格统一

1. 使用[Prettier](https://prettier.io/)统一代码风格
2. 代码错误 typescript+eslint
3. commit 规范 commitizen
4. 使用 git hook 验证

## 1. Prettier

一个自以为是(只允许少量配置)的、专注于处理代码格式化程序。

依赖安装：`npm install prettier --save-dev --save-exact` 建议本地安装并使用固定版本
配置文件：项目根目录创建配置文件 `echo {}> .prettierrc.json` `touch .prettierignore`
插件安装：[Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
格式化代码：`CMD + Shift + P -> Format Document` 如果已安装其它代码格式化插件，第一次会提示选择使用的格式化插件

VS Code 配置

```JSON
{
  "[javascript]": {
      "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascriptreact]": {
      "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[proto3]": {
      "editor.defaultFormatter": "xaver.clang-format"
  },
  "[typescript]": {
      "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "editor.formatOnPaste": true,
  "editor.formatOnSave": true,
  "editor.formatOnType": true
}
```

Prettier 配置

```JSON
{
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "semis": false,
  "singleQuote": false,
  "quoteProps": "as-needed"
}
```

## 2. VS Code & Typescript & ESLint

ESLint 除了可以对代码格式化进行验证外还可以对代码之类进行检查，ESLint 的代码格式检查功能和 Prettier 重复，有一些配置还可能存在冲突，所以如果同时使用 ESLint 和 Prettier 应该将代码格式检查部分交个 Prettier。

初始化：`npx eslint --init` `touch .eslintignore`，在回答一系列问题之后会自定生成配置文件并安装依赖
插件安装：[ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

```js
module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  extends: [
    "airbnb-typescript",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
  ],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ["./tsconfig.json"],
  },
  env: {
    // 环境变量
    // browser: true,
    // node: true,
  },
  globals: {
    // 全局变量
  },
  rules: {
    // 自定义规则
  },
};
```

Prettier 和 ESLint 冲突解决：[eslint-config-prettier](https://github.com/prettier/eslint-config-prettier)可以关闭和 Prettier 冲突的配置。[eslint-config-airbnb-typescript-prettier](https://www.npmjs.com/package/eslint-config-airbnb-typescript-prettier)

## 3. VS Code & Protocol Buffers

### 编码辅助[vscode-proto3](https://marketplace.visualstudio.com/items?itemName=zxh404.vscode-proto3)

- syntax highlighting(语法高亮).
- ~~syntax validation(语法验证).~~需要本地安装 protobuf 编译器并配置
- code snippets(代码片段).
- code completion(代码补全).
- code formatting(代码格式化). 依赖**clang-format**其它语音的 eslint，`brew install clang-format` 安装插件[Clang-Format](https://marketplace.visualstudio.com/items?itemName=xaver.clang-format)
- brace matching(括号匹配).
- line and block commenting(行注释、块注释).
- ~~compilation(编译).~~

### 语法验证[Proto Lint](https://marketplace.visualstudio.com/items?itemName=Plex.vscode-protolint)

安装：依赖`brew tap yoheimuta/protolint` `brew install protolint`
配置：在项目根目录穿件配置文件`.protolint.yaml`

```yaml
lint:
  rules:
    no_default: true

    add:
      - MESSAGE_NAMES_UPPER_CAMEL_CASE
      - SERVICE_NAMES_UPPER_CAMEL_CASE
```

## 4. editconfig

编辑器配置，在代码输入时起作用，editconfig 的可配置项并不多

插件安装：[EditorConfig for VS Code](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)
配置文件：`.editorconfig`

```
root = true

[*]
charset = utf-8
indent_size = 2
indent_style = space
tab_width =  2
end_of_line = lf
trim_trailing_whitespace = true
insert_final_newline = true
max_line_length = 120

[vcbuild.bat]
end_of_line = crlf

[Makefile]
indent_size = 8
indent_style = tab

```
