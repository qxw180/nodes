# Git Branch

## 创建分支

创建分支是基于某个特定的 commit， 默认为 HEAD。

## 常用命令

- 查看分支： `git branch`
  - `-a`： 查看全部分支
  - `-r`： 查看远程分支
  - `-v`： 查看本地分支与远程分支关联关系
- 创建分支： `git branch <branch_name>`
- 切换分支： `git checkout [-b] <branch_name>`
  - `-b`：创建并切换到新分支
- 删除本地分支： `git br -d <branch_name>`
- 删除远程分支：
  - `git branch -dr [remote/brnach]`
  - `git push <远程主机名> --delete <remote_branch>`
- 合并分支提交到当前分支： `git merge [branch_name]`
- 建立追踪关系： `git branch --set-upstream <本地分支名> <远程分支名>`
- 合并单个 commit 到当前分支： `git cherry-pick <commitId|branch_name>`

## 分支集成

分支集成有 Merge 和 Rebase 两种方式，两种方式合并之后的分支记录会有很大差别

### Meger

两个不同的分支一定有一个共同的 commit，在这个 commit 之后两个分支产生了各自不同的内容和 commit，分支合并的目的就是把两个分支的最新状态结合到一起。

方式一：快进合并 fast-forward
这是最简单的的情况，当前分支没有做任何改动，这种情况下 Git 只需要将另外一个分支的 commit 添加到当前分支

方式二：整合提交 merge-commit
当两个分支都有变动，Git 会创建一个新的 commit 来整合两个分支的修改

### Rebase

rebase 和 merge 都可以进行不同分支代码的整合，它们的处理逻辑不同，rebase 首先会将当前分支的 commit 进行暂存，然后将其它分支的 commit 合并到当前分支，最后将当前分支暂存的 commit 重新应用到当前分支。

rebase 有可能会引发问题，虽然 rebase 最终的结果和你提交的结果一致，但是最后的 commit 的基 commit 是不同的，尽量不要在线上进行 rebase 操作

### 建议

1. 一切修改(特性添加、bug 修复)都在独立的分支进行
2. 向主分支提交修改时使用 Merge 操作
3. 向主分支提交代码前，先进行 Rebase 操作
