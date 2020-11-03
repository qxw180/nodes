# Jest

## 单元测试

## 集成测试

## 覆盖率

## Jest 支持 ES6 Module

jest 运行会自动检查当前项目是否有 babel 配置，如果有会先对测试代码进行转化再运行，所以我们只需要在当前项目配置 babel 即可：

.babelrc

```JSON
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": {
          "node": "current"
        }
      }
    ]
  ]
}
```
