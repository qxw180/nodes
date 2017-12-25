#回滚回撤操作
+ 版本库回退：`git reset --hard <HEAD|commit_id>`
    * HEAD：当前版本，上一个版本(HEAD^)，上两个版本(HEAD^^)，上n个版本(HEAD~n)
    * commit_di：版本ID
+ 撤销工作区修改内容：`git checkout -- <file>`，将工作区内容恢复到最近一次add或commit时状态
+ 撤销缓存区修改内容：`git reset HEAD <file>`，将缓存区内容撤销掉重新放回工作区


#其它
使用`git reflog`命令可以查看操作纪律，及对应的版本ID