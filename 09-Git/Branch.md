# Git 分支

## 创建分支

创建分支是基于某个特定的commit， 默认为HEAD。

## 常用命令

+ 查看分支：         `git branch`
  + `-a`： 查看全部分支
  + `-r`： 查看远程分支
  + `-v`： 查看本地分支与远程分支关联关系
+ 创建分支：        `git branch <branch_name>`
+ 创建/并切换分支：   `git checkout [-b] <branch_name>`
  + `-b`：创建并切换到新分支
+ 合并分支：        `git merge [branch_name]`
+ 删除本地分支：    `git br -d <branch_name>`
+ 删除远程分支：
  + `git branch -dr [remote/brnach]`
  + `git push <远程主机名> --delete <remote_branch>`
+ *建立追踪关系*：  `git branch --set-upstream <本地分支名> <远程分支名>`
+ *合并单个commit到当前分支*： `git cherry-pick <commitId>`

## 分支合并

两个不同的分支一定有一个共同的commit，在这个commit之后两个分支产生了各自不同的内容和commit，分支合并的目的就是把两个分支的最新状态结合到一起。

方式一：快进合并fast-forward
这是最简单的的情况，当前分支没有做任何改动，这种情况下Git只需要将另外一个分支的commit添加到当前分支

方式二：整合提交merge-commit
当两个分支都有变动，Git会创建一个新的commit来整合两个分支的修改

## Rebase

rebase和merge都可以进行不同分支代码的整合，它们的处理逻辑不同，rebase首先会将当前分支的commit进行暂存，然后将其它分支的commit合并到当前分支，最后将当前分支暂存的commit重新应用到当前分支。

rebase有可能会引发问题，虽然rebase最终的结果和你提交的结果一致，但是最后的commit的基commit是不同的，尽量不要在线上进行rebase操作