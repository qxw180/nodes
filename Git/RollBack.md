#回滚回撤操作

补充提交： `git commit --amend -m <msg>`，可以修正上一次提交，提交新的代码，修改提交注释


##撤销本地改动
对在工作区未提交到缓存区的改动进行恢复

撤销工作区文件的修改： 
``` bash
git checkout [commit] [file]
```

从版本库恢复缓存区文件，即撤销缓存文件： 
``` bash
git reset [--hard] <HEAD|commitId> [file_name]
```

恢复到上次提交后的状态，`--hard`表示同时恢复工作区文件


##撤销已提交改动
`git revert <commit_id>`，使用该commit新建一个commit，覆盖该commit之后的所有改变，并不会删掉之前的commit

回退到指定commit：`git reset --hard <commit_id>`，这个操作或将该commit之后的commit删除，使用`--hard`需要注意，他会同时修改你的工作区
`git reset --keep <commit_id>`  ： 重置HEAD为commitId，`--keep`回家commit之后的改动保存到和工作区不变



撤销工作区修改内容：`git checkout -- <file>`，将工作区内容恢复到最近一次add或commit时状态
撤销缓存区修改内容：`git reset HEAD <file>`，将缓存区内容撤销掉重新放回工作区


#其它
使用`git reflog`命令可以查看操作纪律，及对应的版本ID