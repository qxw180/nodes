# 从零开始配置一个 Fastify RESETful 项目

## 运行环境

- node v12

## step1 初始项目

```zsh
# 创建项目目录
mkdir server | cd -
# 初始化项目
npm init -y
# 创建源码目录
mkdir src
# 初始 git
git init
echo "node_modules/" .gitignore
# 安装fastify
npm i --save fastify
```

## step2 TypeScript 配置

```zsh
# 安装依赖
npm i -D typescript @types/node @tsconfig/node12
npm i -D rimraf
# 初始化配置文件
npx tsc --init
# 修改编译配置

# 修改gitignore
echo "dist/" >> .gitignore
```

```JSON
{
  "extends": "@tsconfig/node12/tsconfig.json",
  "include": ["src"],
  "compilerOptions": {
    "outDir": "dist",
    "rootDir": "./src",
    "baseUrl": "src",
    "paths": {
      "@libs/*": ["libs/*"]
    }
  }
}
```

```JSON
{
  "name": "server",
  "version": "1.0.0",
  "description": "",
  "main": "dist/index.js",
  "engines": {
    "node": ">= 12.0.0"
  },
  "scripts": {
    "clean": "rimraf dist",
    "build": "npm run clean && tsc -p tsconfig.json",
    "start": "node dist/index.js",
    "dev": "nodemon",
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@tsconfig/node12": "^1.0.7",
    "@types/node": "^15.3.0",
    "rimraf": "^3.0.2",
    "typescript": "^4.2.4"
  },
  "dependencies": {
    "fastify": "^3.15.0"
  }
}
```

## 配置环境变量

```zsh
npm i --save dotenv
touch .env
echo PORT=8080 > .env
echo .env >> .gitignore
```

## 配置开发环境

```zsh
npm i -D nodemon ts-node tsconfig-paths
touch nodemon.json
```

[tsconfig-paths](https://www.npmjs.com/package/tsconfig-paths)可以帮助 typescript 在使用`ts-node`执行时正确的执行 path mapping 配置。

```JSON
{
  "watch": ["src"],
  "ext": "ts json",
  "ignore": ["src/**/*.d.ts"],
  "exec": "ts-node --project tsconfig.json -r tsconfig-paths/register src/index.ts"
}
```
