#Docker
Linux容器Linux虚拟化技术一种实现，Linux容器可以对应用程序进行隔离，相对于虚拟机更加轻量灵活。
Docker是对Linux容器的一种封装，提供简单易用的接口。

Docker的主要用途：
1. 解决环境配置难题：Docker将应用及应用的依赖环境打包成一个镜像文件，Docker可以运行镜像文件，生成一个容器，打包的依赖会自动在容器内配置完成。
2. 提供弹性云服务，Docker可以方便的进行动态扩容

##概念
+ Image：镜像，是一个二进制文件，打包程序及其依赖
+ Container：容器，通过运行Image生成，本身也是一个文件，称为容器文件
##命令
+ 获取镜像               `docker pull <imageName>[:tag]`
+ 列出镜像               `docker iamges`
+ 构建镜像               `docker image build -t <imageName>[:tag] <configPath>`
    + `-t` 指定镜像名字
    + 默认tag为latest
+ 运行镜像|创建容器       `docker container run <imageName>[:tag] [cmd]`
    + `-p`：端口映射，容器端口:本地端口
    + `-it`：容器的shell映射到当前shell
    + `--rm`：在容器停止运行后自动删除容器文件
    + `cmd`：容器启动自动运行的命令
+ 列出容器               `docker container ls [-a]`     
  + `-a`：列出已经停止的容器      
+ 停止容器运行            `docker container kill <containerID>`
+ 恢复容器运行            `docker container start <containerID>`
+ 删除容器               `docker container rm <containerID>`
+ 查看容器运行日志        `docker container logs <containerID>`
+ 发布镜像               `docker image tag <imageName> [username]/[repository]:[tag]`

##创建Image
文件目录
+ `.dockerignore`
+ `Dockerfile`
    + `FROM`
    + `COPY`
    + `WORKDIR`
    + `RUN`：在Image构建阶段运行的命令，执行结果会打包到Image中
    + `EXPOSE`
    + `CMD`：在容器启动后执行，只能设置一个CMD，设置了CMD就不会执行启动容器时设置的命令



##Docker-compress