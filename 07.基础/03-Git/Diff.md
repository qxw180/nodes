# 对比操作

- 对比工作区和缓存区 ： `git diff`
- 对比缓存区和上一个 commit(HEAD)差异 ： `git diff --cached [file]`
- 对比工作区和上一个 commit(HEAD)差异 ： `git diff HEAD`
- 对比两次 commit ：`git diff <commitId1> <commitId2>`
- 对比不同分支 ：`git diff <source_branch> <target_branch>`

- 查看仓库状态：`git status`
- 查看命令日志：`git reflog`
- 查看节点信息：`git show <commit_id> [file_name]`
- 查看具体节点和文件的修改记录：`git blame <commit_id> <file_name>`

- 查看提交日志：`git log`
  - `--stat` ：查看文件修改列表
  - `-p [file]` ：查看文件修改详细
  - `--author=` ：查看修改者
  - `-S [keyword]` ：根据关键字搜索提交历史
