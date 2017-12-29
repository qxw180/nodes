#Nginx
高性能HTTP和反向代理服务器，也是IMAP/POP3/SMTP 代理服务器。
Nginx 以事件驱动的方式编写，所以有非常好的性能，同时也是一个非常高效的反向代理、负载平衡。

##中间件

##反向代理和反向代理
正向代理：用于配置代理服务器，所有请求通过代理服务器发出，翻墙VPN；
反向代理：服务的端由一台代理服务器进行请求的转发，无需用户配置，用户无感知，负载均衡；

##考核指标
并发连接数 SBS(Simultaneous Browser Connections)： 客户端向服务器发起请求，并建立了TCP连接。每秒钟服务器链接的总TCP数量，就是并发连接数。
请求数 QPS（Query Per Second）/RPS（Request Per Second）：每秒处理请求数，QPS是服务器的主要考核指标。
参考：https://xin.moe/sbc-and-qps/

##负载均衡

##热部署

##虚拟主机
独立服务器：机房里面真实存在的物理服务器；
VPS：Virtual Private Server 虚拟专用服务器， 通过虚拟化计算将一个独立服务器虚拟成多个虚拟专用服务器；
虚拟主机：Virtual  hosts （Vhost），一套配置好的服务器环境，所有用户公用一套环境，在服务器上为每个用户开一个目录，分配一个端口，创建一个子数据库...，所有用户公用编译运行环境；
云服务器：ECS(Elastic Compute Service),和VPS类似，是服务商将计算、网络和存储进行组合的产品，就是通过多个CPU，内存，硬盘组成的计算池和存储池和网络的组合。

##守护进程 daemon

##命令
Nignx命令比较少，大多数功能通过配置实现

+ 启动服务： `sudo nginx`
+ 停止服务： `sudo nginx -s quit`
+ 快速关闭服务： `sudo nginx -s stop`
+ 正常关闭服务： `sudo nginx -s quit`处理完正在运行的请求后关闭
+ 重新加载配置文件： `sudo nginx -s reload`
+ 重新打开日志文件： `sudo nginx -s reopen`
+ 指定配置文件： `nginx -c </path/config>`
+ 测试配置文件： `nginx -t`
+ 查看版本： `nginx -v`
+ 查看版本及编译参数： `nginx -V`


##配置静态服务器

    http {
        server {
            location / {
                root /data/www
            }
            location /images/ {
                root /data/assets
            }
        }
    }

##反向代理

    http {
        server {
            location / {
                root http://localhost:8080;
            }
            location ~ \.(gif|jpg|png)${
                root /data/assets;
            }
        }
        server {
            listen 8080;
            root /data/www;
            location / {
            }
        }
    }


    server {
        listen 90;
        server_name www.example.com;
        root /var/www;
        location /o2blog_wx/ {
            # 反向代理我们通过proxy_pass字段来设置
            # 也就是当访问http://aotu.jd.com/o2blog_wx的时候经过Nginx反向代理到服务器上的http://127.0.0.1:3000
            # 同时由于解析到服务器上的时候o2blog_wx这个字段都要处理
            # 所以通过rewrite字段来进行正则匹配替换
            # 也就是http://aotu.jd.com/o2blog_wx/hello经过Nginx解析到服务器变成http://127.0.0.1:3000/hello
            proxy_pass http://127.0.0.1:3000;
            rewrite ^/o2blog_wx/(.*) /$1 break;
        }
    }

##SSL配置

##工作进程

##配置文件分离
主配置文件`nginx.config`在初次配置后基本不会修改，通过`include`指令指向某个目录，
Nginx会加载该目录下所有配置文件，这样可以实现配置文件的分离，这是一种比较好的配置方式；

    http {
        include /usr/local/etc/nginx/sites-enabled/*;
    }

