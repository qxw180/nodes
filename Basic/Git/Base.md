# Git 基础

![流程](./good.jpg "流程")

## 基本概念

+ 工作区 (Working Directory)：工作项目目录
+ 缓存区 (Index、Stage)：保存临时改动，在工作目录指向`git add`命令后会将改动添加到缓存区
+ 本地库 (Repository)：工作区下`.git`文件
+ 远程库 (Remote)：

+ HEAD：一个指向当前版本的指针，每个分支都有一个HEAD，指向每个分支的最后一次提交结果，也就是最新的commitId；上一个版本可以使用`HEAD^`表示；上n个版本`HEAD~n`
+ --hard：
+ 分支(Branch)：
+ 标签(Tag)：为特定commit添加的备注名称，一般用来作为软件发布时的版本号

## 本地仓库目录结构

+ 工作区(Work Directory)：工作目录
+ 版本库(Repository)：.git文件夹
  + 缓存区(Stage|Index)
  + HEAD：当前版本
  + ...
+ `.gitignore`忽略配置，[.gitignore templates](https://github.com/github/gitignore)

## 远程仓库

创建远程仓库

+ 创建新的仓库：`git init --base`
+ 基于本地仓库创建：`git clone --base`
