#Git常用命令

##工作流
![流程](http://image.beekka.com/blog/2014/bg2014061202.jpg "流程")


##基本概念
+ 工作区(Working Directory)：工作项目目录
+ 缓存区(Index、Stage)：
+ 版本库(Repository)：工作区下`.git`文件
+ HEAD：当前版本，也就是最新的commitId；上一个版本可以使用`HEAD^`表示；上n个版本`HEAD~n`

##服务配置相关
1. 配置别名：`git config --global alias.command_alias command`
> <small>*例：git config --global alias.st status*</small>
> <small>*--global:全局参数，设置在这台电脑上的所有git仓库生效*</small>
2. 基本配置：
> `git config --global user.name "kevin"`
> `git config --global user.email "kevin@github.com"`


###基本命令
- 创建仓库：`git init`
- 克隆仓库：`git clone <repository>`
- 缓存：`git add <file>`
- 从缓存中删除：`git rm <file> --cahced`
	+ 不加`--chached`参数则同时在工作目录中删除文件
- 提交：`git commit -m <msg>`


###对比相关
- 对比不同分支：`git diff <source_branch> <target_branch>`
- 对比未缓存和本地仓库(HEAD)：`git diff`
- 对比缓存区(Index)和本地仓库(HEAD)：`git diff --cached`
- 对比本地和缓存区(Index)区别：`git diff HEAD`

- 查看提交日志：`git log`
- 查看命令日志：`git reflog`


###回退相关
- 回退到具体版本：`git rest --hard <HEAD|commitId> [file_name]`
- 回退到最新一次的`add`或`commit`状态：`git checkout -- <filename>`
- 回退指定文件到指定版本：`git checkout <commitid> -- <file>`


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

###远程相关
- 查看远程仓库：`git remote`
- 连接远程仓库：`git remote add origin <server>`
- 设置本地分支和关联远程分支：`git branch --set-upstream <local_branch> origin/<remote_branch>`
- 推送远程：`git push origin master`
	+ `-u`：关联本地分支和远程分支

###日志相关
- 查看日志：`git log`
- 查看文件修改情况：`git show <commit_id>`

##其它
- 存储隐藏：`git stash`
- 查看隐藏：`git stash list`
- 释放隐藏：
	+ 恢复不删除stash内容：`git stash apply`
	+ 删除stash内容：`git stash drop`
	+ 恢复并删除stash内容：`git stash pop`
- 忽略特殊文件：Git工作区的根目录下创建一个特殊的.gitignore文件





















