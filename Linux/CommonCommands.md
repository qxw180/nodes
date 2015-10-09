#Linux常用命令

####基本操作
1. 显示当前位置：`pwd`

####系统信息相关
1. 查看系统信息：`uname -a`
2. 查看ip信息：`ifconfig`
3. 重启：`reboot`或者`shutdown -r now`

####用户管理
1. 查看组：`cat /etc/group`
2. 创建组：`groupadd [-g GID] grouname` 
> <small>*GID:组id；不加g表示按照系统默认的gid创建组，从500开始*</small>
3. 删除组：`groupdel groupname`
4. 查看用户：`cat /etc/passwd`
5. 创建用户：`useradd [-u UID] [-g GID] [-d HOME] [-M] [-s] username`
> <small>*UID:用户id*</small>
> <small>*GID:用户所在组id*</small>
> <small>*HOME:用户家目录*</small>
> <small>*M:不创建家目录*</small>
> <small>*s:自定义shell，用户登录后执行*</small>
6. 删除用户：`userdel [-r] username`
> <small>*-r:同时删除用户的家目录*</small>
7. 修改用户：`usermod [-cdefgGlLsuU]`
> <small>-c<备注>：修改用户帐号的备注文字；
> -d<登入目录>：修改用户登入时的目录； 
> -e<有效期限>：修改帐号的有效期限； 
> -f<缓冲天数>：修改在密码过期后多少天即关闭该帐号； 
> -g<群组>：修改用户所属的群组； 
> -G<群组>；修改用户所属的附加群组； 
> -l<帐号名称>：修改用户帐号名称； 
> -L：锁定用户密码，使密码无效； 
> -s：修改用户登入后所使用的shell； 
> -u：修改用户ID； 
> -U:解除密码锁定；</small>
8. 创建修改用户密码：`passwd [-username] value username`
> <small>*用户创建后默认没有密码，也不可以登录；*</small>
> <small>*passwd后面不跟用户名表示修改当前用户密码；*</small>
9. 切换登录用户 `su [-] username`
> <small>*-表示同时切换环境变量，默认家目录切换*</small>
10. 修改文件组 `chgrp [-R] groupname filename`
> <small>-R或——recursive：递归处理，将指令目录下的所有文件及子目录一并处理；</small>
11. 修改文件所属者 `chown [-R] username:groupname filename`
> <small>-R或——recursive：递归处理，将指令目录下的所有文件及子目录一并处理；
> 当省略“：组”，仅改变文件所有者；</small>