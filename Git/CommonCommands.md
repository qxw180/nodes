#Git常用命令

##配置相关
查看配置：`git config --list`	
配置文件位置：
+ 全局配置：`/etc/gitconfig`(用户全局置文件，使用`--system`参数配置)
+ 用户配置：`~/.gitconfig`(用户配置文件，快捷键、用户、颜色等配置信息，使用`--global`参数配置)
+ 项目配置：`PROJECT_DIR/.git/config`(项目相关配置，远程仓库，本地/远程分支关联相关)


配置别名：`git config --global alias.command_alias command`
例：`git config --global alias.st status`
`--global`:全局参数，设置在这台电脑上的所有git仓库生效

设置提交代码时用户信息
+ `git config --global user.name "xxx"`
+ `git config --global user.email "xxx@github.com"`


##创建/获取版本库
+ 创建本地仓库：`git init`
+ 克隆远程仓库： `git clone <版本库地址> [本地目录名]`

##提交代码
+ Workspace到Index
    * 添加文件到缓存区并追踪文件编号： `git add <file|floder>`
    * 从工作区删除文件并将这次删除放入缓存区：`git rm <file>`
    * 停止文件追踪，但在工作区保留文件：`git rm --cached <file>`
    * 修改文件名，并将修改放入缓存区：`git mv <filename> <newFileName>`
+ Index到Repository： `git commit [files] -m <massage>`
    + `-a`： 将workspace中的修改一起提交
    + `-v`： 显示diff信息
    + `git commit --amand -m <message>`： 替代上次提交，如果没有变化则修改上一场的message
    + `git commit --amand [files]`： 重做上一场提交




##标签管理
+ 列出所有tag                ： `git tag`
+ 新建一个tag在当前commit     ： `git tag [tag_name]`
+ 新建一个tag在指定commit     ： `git tag [tag_name] [commit]`
+ 删除本地tag                ： `git tag -d [tag_name]`
+ 删除远程tag                ： `git push origin :refs/tags/[tagName]`
+ 查看tag信息                ： `git show [tag_name]`
+ 提交指定tag                ： `git push [remote] [tag_name]`
+ 提交所有tag                ： `git push [remote] --tags`
+ 新建一个分支，指向某个tag    ： `git checkout -b [branch] [tag_name]`


##远程主机管理
+ 列出远程主机：    `git remote`
+ 查看远程主机地址： `git remote -v`
+ 查看远程主机信息： `git remote show <主机名>`
+ 添加远程主机：    `git remote add <主机名> <主机地址>`
+ 删除远程主机：    `git remote rm <主机名>`
+ 重命名远程主机：  `git remote rename <原主机名> <新主机名>`

##远程同步
+ 拉取更新：    `git fetch [远程主机名] [分支名]`
+ 合并代码：    `git merge <分支名>` 分支可以为远程分支或本地分支
+ 拉取并合并：  `git pull [远程主机名] [远程分支名]:[本地分支名]`
    + 如果合并到当前分支可以省略`本地分支名`
    + 如果当前分支与远程分支存在追踪关系，则可以看省略`远程分支名`
    + 如果当前分支只有一个追踪关系，则可以省略`远程主机名`
+ Repository到Remote： `git push [remote_name] [local_branch]:[remote_branch]`
    + 如果省略`remote_branch`存在以下两种情况
        * 如果存在追踪关系，则推送当远程追踪分支
        * 如果远程不存在该分支，则创建远程分支并推送*推送分支到远程方法*
    + 如果省略`local_branch`则表示删除远程分支




##储藏修改
- 存储隐藏：`git stash`
- 查看隐藏：`git stash list`
- 释放隐藏：
    + 恢复并删除最新的stash内容：`git stash pop`
    + 恢复不删除指定stash内容：`git stash apply <stash_name>`
    + 删除stash内容：`git stash drop`




##变基操作：逐个合并节点，并提示修复冲突
`git rebase <branch_name> [--continue][--abort][--skip]`















