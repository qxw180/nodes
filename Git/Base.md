#本地仓库构成
+ 工作区(Work Directory)：工作目录
+ 版本库(Repository)：.git文件夹
    * 缓存区(Stage|Index)：保持临时改动，在工作目录指向`git add`命令后会将改动添加到缓存区
    * 分支(Branch)：默认分支为master，执行`git commit`命令后会将缓存区改动添加到指定分支
        - HEAD：一个指针，每个分支都有一个HEAD，指向每个分支的最后一次提交结果