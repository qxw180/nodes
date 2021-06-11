# [约定式提交 Conventional Commits](https://www.conventionalcommits.org/)

Conventional Commits 是一个轻量级的 git commit messages 格式规范惯例，提供了一组简单的规则来生成明晰的 commit history。基于这些规则生成的 commit history 可以轻松的实现一些自动化工具。

使用 Conventional Commits 有以下好处：

1. 清晰明了的向其他人传达修改的性质
2. 配合自动化工具提升开发效率
   1. 自动生成 CHANGLOGs
   2. 基于提交的类型自动计算出合适的语义化版本

## commit message 的结构

```bash
<type>[(optional scope)]: <description>
<BLANK LINE>
[optional body]
<BLANK LINE>
[optional footer(s)]
```

### 提交类型

`type`字段用来描述 commit 类型，部分类型有其特殊含义且和 Semantic Versioning 存在对应关系。

- `fix`：表示修复代码 bug，与 Semantic Versioning 的`PATCH`对应
- `feat`：表示添加新特性，与 Semantic Versioning 的`MINOR`对应
- 其它：可以为任意类型，这些类型与 Semantic Versioning 不存在对应关系。

### BREAKING CHANGE

表示产生了破坏性无法向上兼容的变更与 Semantic Versioning 的`MAJOR`对应。任意`type`的 commit 都可以是 BREAKING CHANGE 。有以下两种方式标识当前 commit 是一个 BREAKING CHANGE ：

1. `type`或者`scope`以`!`结尾
2. `footer`以`BREAKING CHANGE:`开头

### Scope

`scope`：在`type`后使用括号添加`scope`信息，用来提供额外的上下文信息
