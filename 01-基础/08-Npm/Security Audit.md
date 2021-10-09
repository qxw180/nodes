# 安全审查

`npm audit`命令会提交`dependencies`, `devDependencies`, `bundledDependencies`,和`optionalDependencies`并获取漏洞报告，但是并不会提交`peerDependencies`

漏洞报告

| 严重性        | 漏洞描述                           |
| ------------- | ---------------------------------- |
| Package       | 包含漏洞的包的名称                 |
| Patched in    | 哪些版本包含漏洞修复的语义版本范围 |
| Dependency of | 漏洞包依赖的模块                   |
| Path          | 路径                               |
| More info     | 安全报告链接                       |

`npm audit fix`命令会自动升级兼容的依赖包
