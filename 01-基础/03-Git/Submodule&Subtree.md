# Git 子仓库

## TODO:submodule

- 主仓库引入子仓库：`git submodule add ${subRepoRemotePath}`
- clone 有子仓库的项目：
  - 执行`git submodule init`初始化本地配置，然后执行`git submodule update`拉取子仓库数据到主仓库对应目录
  - 直接执行：`git clone --recursive`
- 代码提交：子仓库和普通仓库一样进行 commit，子仓库 commit 之后需要到主仓库再次进行一次 commit
- `git submodule foreach git pull`一次性拉取所以子仓库更新

## [subtree](https://github.com/git/git/blob/master/contrib/subtree/git-subtree.txt)

subtree 是社区贡献的功能，使用 subtree 可以实现一个仓库作为其他仓库的子仓库

subtree 不增加任何元数据文件，对于其他成员完全透明，使用`git clone`和`git pull`的时候可以直接拉取包括子仓库在内的所有文件，其他开发成员可以不知道 subtree 的存在

- 在父仓库中新增子仓库：`git subtree add --prefix=<prefix> <repository | commit> --squash`
  - `--prefix`：🔝 子仓库安装目录
  - `--squash`：🔝 忽略子仓库 commit 历史，只生成一条 commit 信息
- 拉取子仓库更新：`git subtree pull --prefix=<prefix> <repository> --squash`
- 推送在主仓库中发生的对子仓库的修改到子仓库：`git subtree push --prefix=<prefix> <repository> --squash`

以`https://github.com/test/project.git`作为主仓库，`https://github.com/test/libs.git`作为子仓库，实操过程如下：TODO:实操验证，主仓库更新后 push 子仓库 commit 如何同步等问题

```shell
# 字主仓库中添加子仓库
git subtree add --prefix=sub/libs https://github.com/test/libs.git master --squash
# 这时libs仓库的文件会被clone到project项目的sub/libs目录下，并产生了两个commit

# 推送代码到远程仓库
git push

# 其它开发同学和常规代码同步一样使用clone或pull获取更新代码
# 可以和常规开发一样对主项目下的sub/libs下的代码进行update、commit、push

# 如果子仓库发生了更新，使用git subtree pull 同步更新

git subtree pull --prefix=sub/libs https://github.com/test/libs.git master --squash

# 如果在主仓库中修改了子仓库的代码，需要push子仓库更新，以便其他主仓库更新修改

git subtree push --prefix=sub/libs https://github.com/test/libs.git master

# 简化subtree，添加remote来替代子仓库全路径

git remote add -f libs https://github.com/test/libs.git
git subtree add --prefix=sub/libpng libs master --squash
git subtree pull --prefix=sub/libpng libs master --squash
git subtree push --prefix=sub/libpng libs master
```

## 目标

1. 主项目能够独立开发、发布
2. 各项目可以便捷的共享代码
   1. 引入方便
   2. 修改方便，修改共享代码和提交
   3. 同步方便，同步其它项目对共享代码的修改
3. Code Owner 机制，对共享代码的修改设置门槛

思路：monorepo+微服务

## TODO:lerna

### Fixed 模式

### Independent 模式

| 对比             | submodule | subtree                | lerna  |
| ---------------- | --------- | ---------------------- | ------ |
| 主仓库关联子仓库 | B1        | 执行 subtree add 命令  |
| 主仓库更新子仓库 | B2        | 执行 subtree pull 命令 |
| 主仓库修改子仓库 | B3        | 执行 subtree push 命令 | 不支持 |
| 子仓库依赖管理   | B3        | 不支持                 |
| 应用场景         | B3        |                        |
