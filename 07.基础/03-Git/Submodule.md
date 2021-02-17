# Git 子仓库

## submodule

- 主仓库引入子仓库：`git submodule add ${subRepoRemotePath}`
- clone 有子仓库的项目：
  - 执行`git submodule init`初始化本地配置，然后执行`git submodule update`拉取子仓库数据到主仓库对应目录
  - 直接执行：`git clone --recursive`
- 代码提交：子仓库和普通仓库一样进行 commit，子仓库 commit 之后需要到主仓库再次进行一次 commit
- `git submodule foreach git pull`一次性拉取所以子仓库更新

## [subtree](https://github.com/git/git/blob/master/contrib/subtree/git-subtree.txt)

subtree 是社区贡献的功能

subtree 不增加任何元数据文件，对于其他成员完全透明，使用`git clone`和`git pull`的时候可以直接拉取包括子仓库在内的所有文件

- 在父仓库中新增子仓库：`git subtree add --prefix=<prefix> <repository | commit> --squash`
  - `--prefix`：🔝 子仓库安装目录
  - `--squash`：🔝 忽略子仓库 commit 历史，只拉取代码

## 目标

1. 主项目能够独立开发、发布
2. 各项目可以便捷的共享代码
   1. 引入方便
   2. 修改方便，修改共享代码和提交
   3. 同步方便，同步其它项目对共享代码的修改
3. Code Owner 机制，对共享代码的修改设置门槛

思路：monorepo+微服务

## lerna

### Fixed 模式

### Independent 模式

| 对比             | submodule | subtree           | lerna  |
| ---------------- | --------- | ----------------- | ------ |
| 主仓库关联子仓库 | B1        | 执行 add 命令添加 |
| 主仓库更新子仓库 | B2        | C2                |
| 主仓库修改子仓库 | B3        | C3                | 不支持 |
| 子仓库依赖管理   | B3        | C3                |
