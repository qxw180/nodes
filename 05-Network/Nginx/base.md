# Nginx

高性能HTTP和反向代理服务器，也是IMAP/POP3/SMTP 代理服务器。Nginx 以事件驱动的方式编写，所以有非常好的性能，同时也是一个非常高效的反向代理、负载平衡。

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

## 常用命令

+ 启动服务： `nginx`
+ 指定配置文件： `nginx -c </path/config>`
+ 测试配置文件： `nginx -t`
+ 重新加载配置文件： `nginx -s reload`
+ 快速关闭服务： `nginx -s stop`
+ 正常关闭服务： `nginx -s quit`处理完正在运行的请求后关闭
+ 重新打开日志文件： `nginx -s reopen`
+ 查看版本： `nginx -v`
+ 查看版本及编译参数： `nginx -V`

## 配置文件

1. 全局块
2. event块：影响Nginx服务器与用户网络连接
3. http块
   1. http全局块：
   2. server块：

[Full Example Configuration](https://www.nginx.com/resources/wiki/start/topics/examples/full/)

``` lua
user       www www;  ## Nginx服务维护的用户和组，默认是nobody
worker_processes  5;  ## 工作进程，最佳实践，和CPU内核数量一致,查看CPU内核数量：sysctl -n hw.ncpu
error_log  logs/error.log debug; ## 错误日志记录位置，模式(debug|info|notice|warn|error|crit)
pid        logs/nginx.pid; ## 
worker_rlimit_nofile 8192;

events {
  ## 每个worker进程能并发处理的最大连接数，Default: 1024
  ## 当作为反向代理服务器，计算公式为： `worker_processes * worker_connections / 4`
  ## 当作为HTTP服务器时，公式是除以2
  worker_connections  4096;  
}

http {
  # 关闭错误页面的nginx版本数字，提高安全性
  server_tokens off;

  include    conf/mime.types;
  include    /etc/nginx/proxy.conf;
  include    /etc/nginx/fastcgi.conf;
  index    index.html index.htm index.php;

  default_type application/octet-stream;
  ## 日志格式
  log_format   main '$remote_addr - $remote_user [$time_local]  $status '
    '"$request" $body_bytes_sent "$http_referer" '
    '"$http_user_agent" "$http_x_forwarded_for"';
  access_log   logs/access.log  main;

  sendfile     on;
  tcp_nopush   on;
  server_names_hash_bucket_size 128; # this seems to be required for some vhosts

  server { # php/fastcgi
    listen       80;
    # 服务器名字
    server_name  domain1.com www.domain1.com;
    access_log   logs/domain1.access.log  main;
    root         html;

    location ~ \.php$ {
      fastcgi_pass   127.0.0.1:1025;
    }
  }

  server { # simple reverse-proxy
    listen       80;
    server_name  domain2.com www.domain2.com;
    access_log   logs/domain2.access.log  main;

    # serve static files
    location ~ ^/(images|javascript|js|css|flash|media|static)/  {
      root    /var/www/virtual/big.server.com/htdocs;
      expires 30d;
    }

    # pass requests for dynamic content to rails/turbogears/zope, et al
    location / {
      proxy_pass      http://127.0.0.1:8080;
    }
  }

  upstream big_server_com {
    server 127.0.0.3:8000 weight=5;
    server 127.0.0.3:8001 weight=5;
    server 192.168.0.1:8000;
    server 192.168.0.1:8001;
  }

  server { # simple load balancing
    listen          80;
    server_name     big.server.com;
    access_log      logs/big.server.access.log main;

    location / {
      proxy_pass      http://big_server_com;
    }
  }
}
```

## 配置文件分离

主配置文件`nginx.config`在初次配置后基本不会修改，通过`include`指令指向某个目录，Nginx会加载该目录下所有配置文件，这样可以实现配置文件的分离，这是一种比较好的配置方式；

``` lua
http {
    include /usr/local/etc/nginx/sites-enabled/*;
}
```
