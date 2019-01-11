##概念
+ Image：镜像，是一个二进制文件，打包程序及其依赖
+ Container：容器，通过运行Image生成，本身也是一个文件，称为容器文件
##命令
+ 获取镜像               `docker pull <imageName>[:tag]`
+ 列出镜像               `docker iamges`
+ 构建镜像               `docker image build -t <imageName>[:tag] <configPath>`
    + `-t` 指定镜像名字
    + 默认tag为latest
+ 运行镜像|创建容器       `docker container run <imageName>[:tag]`
    + `-p`：端口映射，容器端口:本地端口
    + `-it`：容器的shell映射到当前shell
    + `--rm`：在容器停止运行后自动删除容器文件
+ 列出容器               `docker container ls [-a]`           
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
    + `RUN`：在Image构建阶段运行的命令，执行结果会打包到Image中，只能设置一个RUN
    + `EXPOSE`
    + `CMD`：在容器启动后执行，可以设置多个CMD



##Docker-compress