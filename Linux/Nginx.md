#Nginx

##命令
Nignx命令比较少，大多数功能通过配置实现

+ 启动服务： `sudo nginx`
+ 停止服务： `sudo nginx -s quit`
+ 快速关闭服务： `sudo nginx -s stop`
+ 正常关闭服务： `sudo nginx -s quit`
+ 重新加载配置文件： `sudo nginx -s reload`
+ 重新打开日志文件： `sudo nginx -s reopen`
+ 指定配置文件： `nginx -c </path/config>`
+ 测试配置文件： `nginx -t`
+ 查看版本： `nginx -v`
+ 查看版本及编译参数： `nginx -V`


##反向代理


##工作进程