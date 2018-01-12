#iterm2
iterm2和mac自带的terminal都是终端模拟器，用来运行shell；

##基本概念
+ Shell：壳，包装计算机的一个壳，提供人员与电脑之间交互的接口，是一个命令解释器，用来解决人与操作系统之间的交互问题，可以分为以下两个大类：
    * 命令行：解析输入命令，主要有bash sh csh ksh，zsh等，每种都有各自特点
        - bash：bash shell 最早的Unix Shell，应用广泛；
        - zsh：被誉为shell中的极品，兼容bash，有强大的补全功能、高可配性等其他功能；
    * 图形化：KDE GNOME CDE XFCE，解析点击等交互命令
+ Shell脚本是一种为shell编写的脚本程序；

##配置
zsh相比bash有更加强大和丰富的功能，但是配置负责，国外有位牛人搞了[oh-my-zsh](https://github.com/robbyrussell/oh-my-zsh)使得zsh的配置变的简单。
[mac下oh-my-zsh的配置](https://zhuanlan.zhihu.com/p/26373052)
zsh的配置几乎都在`~/.zshrc`下面；

##快捷键
+ Tab相关
    * 新建Tab：`cmd + t`
    * 关闭Tab：`cmd + w`
    * 切换Tab：`cmd + 数字或左右方向键`
+ 分屏相关
    * 水平分屏：`cmd + d`
    * 垂直分屏：`cmd + shift + d`
    * 切换分屏：`cmd + option + 方向键`
+ 输入
    * 清除行：`ctrl + u`
    * 到行首：`ctrl + a`
    * 到行尾：`ctrl + e`
