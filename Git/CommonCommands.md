#Git常用命令

##工作流
![流程](http://image.beekka.com/blog/2014/bg2014061202.jpg "流程")


##基本概念
+ 工作区(Working Directory)：工作项目目录
+ 缓存区(Index、Stage)：
+ 版本库(Repository)：工作区下`.git`文件
+ HEAD：当前版本，也就是最新的commitId；上一个版本可以使用`HEAD^`表示；上n个版本`HEAD~n`

##服务配置相关
1. 配置列表：`git config --list`
> 配置文件位置：
>> 	<small>`/etc/gitconfig`(用户全局置文件，使用`--system`参数配置)</small>
>> 	<small>`~/.gitconfig`(用户配置文件，快捷键、用户、颜色等配置信息，使用`--global`参数配置)</small>
>> 	<small>`PROJECT_DIR/.git/config`(项目相关配置，远程仓库，本地/远程分支关联相关)</small>
	
2. 配置别名：`git config --global alias.command_alias command`
> <small>*例：git config --global alias.st status*</small>
> <small>*--global:全局参数，设置在这台电脑上的所有git仓库生效*</small>

3. 基本配置：
> `git config --global user.name "kevin"`
> `git config --global user.email "kevin@github.com"`


###基本命令
- 创建仓库：`git init`
- 克隆仓库：`git clone <repository> [本地目录名]`
	+ `-o <remote_name>`：指定远程主机命
- 查看仓库状态：`git status`
- 缓存：`git add [-A] <file>`：`-A`当有文件伤处时需要添加此参数
- 从缓存中删除：`git rm <file> [--cahced]`
	+ 不加`--chached`参数则同时在工作目录中删除文件
- 提交：`git commit -m <massage> [--amand]`
	+ 基本提交：`git commit -m <msg>`
	+ 合并上一个commit`git commit --amand`
- 获取更新：`git fetch <remote_name> [branch_name]`
- 获取并合并更新：`git pull [--rebase] [remote_name] [reomote_branch]:[local_branch]`
	+ 如果合并到当前分支可以省略`local_branch`
	+ 如果当前分支与远程分支存在追踪关系，则可以看省略`remote_branch`
		* 建立追踪关系：`git branch --set-upstream master origin/master`
	+ 如果当前分支只有一个追踪关系，则可以省略`remote_name`
- 推送本地更新到远程：`git push [remote_name] [local_branch]:[remote_branch]`
	+ 如果省略`remote_branch`存在以下两种情况
		* 如果存在追踪关系，则推送当远程追踪分支
		* 如果远程不存在该分支，则创建远程分支并推送*推送分支到远程方法*
	+ 如果省略`local_branch`则表示删除远程分支
- 删除远程分支：`git push origin --delete <remote_branch>`


###对比相关
- 对比不同分支：`git diff <source_branch> <target_branch>`
- 对比工作区和本地仓库(HEAD)：`git diff`
- 对比缓存区(Index)和本地仓库(HEAD)：`git diff --cached`
- 对比本地和缓存区(Index)区别：`git diff HEAD`

###回退相关
- 回退到具体版本：`git reset --hard <HEAD|commitId> [file_name]`
- 回退到最新一次的`add`或`commit`状态：`git checkout -- <filename>`
- 回退指定文件到指定版本：`git checkout <commitid> -- <file>`
- 反向提交某版本：`git revert [-n|e] <commit_id>`
	+ `-n`：不自动commit；
	+ `-e`：编辑提交信息；


###分支相关
- 查看分支：`git branch`
	+ `-a`：查看全部分支
	+ `-r`：查看远程分支
- 创建分支：`git branch <branch_name>`
	+ `-b`：创建并切换
- 删除分支：`git br -d <branch_name>`
- 切换分支：`git checkout <branch_name>`
	+ `-b`：创建同时切换到新分支
- 合并分支：`git merge <branch>`
- 分支推送到远程仓库：`git push origin <branch>`

###变基操作：逐个合并节点，并提示修复冲突
`git rebase <branch_name> [--continue][--abort][--skip]`

###远程相关
- 查看远程仓库：`git remote`
	+ `-v`：查看远程主机网路地址
- 查看远程仓库详细信息：`git remote show <remote_name>`
- 添加远程仓库：`git remote add origin <server>`
- 删除远程仓库：`git remote rm <remote_name>`
- 重命名远程仓库：`git remote rename <current_name> <new_name>`
- 设置本地分支和关联远程分支：`git branch --set-upstream <local_branch> origin/<remote_branch>`
- 推送远程：`git push origin master`
	+ `-u`：关联本地分支和远程分支
- 查看本地分支与远程分支关联关系：`git branch -vv`

###日志相关
- 查看提交日志：`git log`
	+ <small>`-p`：查看文件修改详细</small>
	+ <small>`--stat`：只查看文件修改列表</small>
	+ <small>`--author=`：查看修改者</small>
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





















