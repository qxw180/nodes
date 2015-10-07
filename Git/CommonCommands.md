#Git常用命令

##开发相关

##Github相关
1. 本地git仓库关联远程仓库：`git remote add origin github_path`
2. 设置本地分支和关联远程分支：`git branch --set-upstream-to=origin/remote_branch local_branch`

##服务配置相关
1. 配置别名：`git config --global alias.command_alias command`
> <small>*例：git config --global alias.st status*</small>
> <small>*--global:全局参数，设置在这台电脑上的所有git仓库生效*</small>
2. 