# Nginx

高性能HTTP和反向代理服务器，也是IMAP/POP3/SMTP 代理服务器。
Nginx 以事件驱动的方式编写，所以有非常好的性能，同时也是一个非常高效的反向代理、负载平衡。

## 中间件

## 考核指标

并发连接数 SBS(Simultaneous Browser Connections)： 客户端向服务器发起请求，并建立了TCP连接。每秒钟服务器链接的总TCP数量，就是并发连接数。
请求数 QPS（Query Per Second）/RPS（Request Per Second）：每秒处理请求数，QPS是服务器的主要考核指标。
[参考](https://xin.moe/sbc-and-qps/)

## 热部署

## 虚拟主机

独立服务器：机房里面真实存在的物理服务器；
VPS：Virtual Private Server 虚拟专用服务器， 通过虚拟化计算将一个独立服务器虚拟成多个虚拟专用服务器；
虚拟主机：Virtual  hosts （Vhost），一套配置好的服务器环境，所有用户公用一套环境，在服务器上为每个用户开一个目录，分配一个端口，创建一个子数据库...，所有用户公用编译运行环境；
云服务器：ECS(Elastic Compute Service),和VPS类似，是服务商将计算、网络和存储进行组合的产品，就是通过多个CPU，内存，硬盘组成的计算池和存储池和网络的组合。

## 守护进程 daemon

## 命令

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

## 错误页面配置

``` nginx
server {
  error_page 500 502 503 504 /50x.html;
  location = /50x.html {
      root /source/error_page;
  }
}
```

## SSL配置

## 工作进程

## 配置文件分离

主配置文件`nginx.config`在初次配置后基本不会修改，通过`include`指令指向某个目录，
Nginx会加载该目录下所有配置文件，这样可以实现配置文件的分离，这是一种比较好的配置方式；

``` nginx
http {
    include /usr/local/etc/nginx/sites-enabled/*;
}
```
