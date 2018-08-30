#Git常用命令

##基本命令
+ 创建本地仓库：`git init`
- 查看仓库状态：`git status`


##获取代码
+ 克隆远程仓库： `git clone <版本库地址> [本地目录名]`
+ 拉取更新：    `git fetch [远程主机名] [分支名]`
+ 合并代码：    `git merge <分支名>` 分支可以为远程分支或本地分支
+ 拉取并合并：  `git pull [远程主机名] [远程分支名]:[本地分支名]`
	+ 如果合并到当前分支可以省略`本地分支名`
	+ 如果当前分支与远程分支存在追踪关系，则可以看省略`远程分支名`
	+ 如果当前分支只有一个追踪关系，则可以省略`远程主机名`

##提交代码
+ 提交代码到缓存区： `git add <file>`
+ 从缓存区中删除：`git rm <file> [--cahced]`
	+ 不加`--chached`参数则同时在工作目录中删除文件
+ 提交代码到本地仓库： `git commit -m <massage> [--amand]`
	+ 基本提交：`git commit -m <msg>`
	+ 合并上一个commit`git commit --amand`
+ 推送本地仓库到远程仓库： `git push [remote_name] [local_branch]:[remote_branch]`
	+ 如果省略`remote_branch`存在以下两种情况
		* 如果存在追踪关系，则推送当远程追踪分支
		* 如果远程不存在该分支，则创建远程分支并推送*推送分支到远程方法*
	+ 如果省略`local_branch`则表示删除远程分支

##分支
+ 查看分支：     `git branch`
	+ `-a`： 查看全部分支
	+ `-r`： 查看远程分支
+ 创建分支：     `git branch <branch_name>`
+ 创建并切换分支：`git checkout -b <分支名> [现有分支]`
	+ `-b`：创建并切换到新分支
+ 删除本地分支： `git br -d <branch_name>`
+ 删除远程分支： `git push <远程主机名> --delete <remote_branch>`
+ *建立追踪关系*： `git branch --set-upstream <本地分支名> <远程分支名>`
  
##远程主机管理
+ 列出远程主机：    `git remote`
+ 查看远程主机地址： `git remote -v`
+ 查看远程主机信息： `git remote show <主机名>`
+ 添加远程主机：    `git remote add <主机名> <主机地址>`
+ 删除远程主机：    `git remote rm <主机名>`
+ 重命名远程主机：  `git remote rename <原主机名> <新主机名>`


- 查看本地分支与远程分支关联关系：`git branch -v`

##服务配置相关
1. 查看配置：`git config --list`
配置文件位置：
+ `/etc/gitconfig`(用户全局置文件，使用`--system`参数配置)
+ `~/.gitconfig`(用户配置文件，快捷键、用户、颜色等配置信息，使用`--global`参数配置)
+ `PROJECT_DIR/.git/config`(项目相关配置，远程仓库，本地/远程分支关联相关)
	
1. 配置别名：`git config --global alias.command_alias command`
例：`git config --global alias.st status`
`--global`:全局参数，设置在这台电脑上的所有git仓库生效

1. 基本配置：
+ `git config --global user.name "xxx"`
+ `git config --global user.email "xxx@github.com"`




###对比相关
- 对比工作区和缓存区：`git diff`
- 对比不同分支：`git diff <source_branch> <target_branch>`
- 对比两次提交：`git diff commitId1 commitId2`
- 对比缓存区(Index)和本地仓库(HEAD)：`git diff --cached`
- 对比本地和缓存区(Index)区别：`git diff HEAD`

###回退相关
- 回退到具体版本：`git reset --hard <HEAD|commitId> [file_name]`
- 回退到最新一次的`add`或`commit`状态：`git checkout -- <filename>`
- 回退指定文件到指定版本：`git checkout <commitid> -- <file>`
- 反向提交某版本：`git revert [-n|e] <commit_id>`
	+ `-n`：不自动commit；
	+ `-e`：编辑提交信息；




###变基操作：逐个合并节点，并提示修复冲突
`git rebase <branch_name> [--continue][--abort][--skip]`



###日志相关
- 查看提交日志：`git log`
	+ `-p`：查看文件修改详细
	+ `--stat`：只查看文件修改列表
	+ `--author=`：查看修改者
- 查看命令日志：`git reflog`
- 查看节点信息：`git show <commit_id> [file_name]`
- 查看具体节点和文件的修改记录：`git blame <commit_id> <file_name>`


##其它
- 存储隐藏：`git stash`
- 查看隐藏：`git stash list`
- 释放隐藏：
	+ 恢复不删除stash内容：`git stash apply`
	+ 删除stash内容：`git stash drop`
	+ 恢复并删除stash内容：`git stash pop`
- 忽略特殊文件：Git工作区的根目录下创建一个特殊的.gitignore文件
- 合并单个commit：`git-cherry-pick <commit_id>`





















