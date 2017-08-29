#Tmux 使用

##安装：`brew install tmux`

##基本概念
+ Session：多个Window的集合，可以用来组织一个任务；
+ Window：单个可见页面，每个Window可以包含多个Pane
+ Pane：窗体中划分的小块

##Session操作
+ 查看：`tmux ls`
+ 查看切换：`<prefix> s`
+ 新建：`tmux new -s <session-name>`
+ 进入：`tmux a -t <session-name>`
+ 重命名：`<prefix> $`
+ 退出：`<prefix> d`
+ 删除：`tmux kill-session -t <session-name>`


##Window操作
+ 查看：`<prefix> w`
+ 新建：`<prefix> c`
+ 切换：`<prefix> n` `<prefix> p`
+ 关闭：`<prefix> &`
+ 命名：`<prefix> ，`


##Pane操作
+ 水平分割：`<prefix> %`
+ 垂直分割：`<prefix> "`
+ 查看编号：`<prefix> q`
+ 关闭：`<prefix> x`
+ 关闭：`<prefix> x`

##设置
+ 开启鼠标：`tmux set -g mouse on`
+ 调整Pane大小快捷键设置
    * 向左扩展 `bind L resize-pane -L 10`
    * 向右扩展 `bind R resize-pane -L 10`
    * 向下扩展 `bind D resize-pane -D 10`
    * 向上扩展 `bind U resize-pane -U 10`
+ 
