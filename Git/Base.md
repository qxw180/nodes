#Git 基础

![流程](./good.jpg "流程")

##基本概念
+ 工作区(Working Directory)： 工作项目目录
+ 缓存区(Index、Stage)：      保存临时改动，在工作目录指向`git add`命令后会将改动添加到缓存区
+ 版本库(Repository)：        工作区下`.git`文件
+ HEAD：                     当前版本，也就是最新的commitId；上一个版本可以使用`HEAD^`表示；上n个版本`HEAD~n`
+ 分支(Branch)：              默认分支为master，执行`git commit`命令后会将缓存区改动添加到指定分支
+ HEAD：                     一个指针，每个分支都有一个HEAD，指向每个分支的最后一次提交结果


##本地仓库目录结构
+ 工作区(Work Directory)：工作目录
+ 版本库(Repository)：.git文件夹
    * 缓存区(Stage|Index)
    * HEAD：当前版本
    * ...
+ `.gitignore`忽略配置，[.gitignore templates](https://github.com/github/gitignore)