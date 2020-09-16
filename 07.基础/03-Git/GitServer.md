# CentOS 搭建 Git 服务

目的：在 CentOS 搭建一个 Git 服务，可以方便团队同步代码，为 CI 做准备

## Step1 创建 git 用户

为了便于管理我们创建一个专门的账户进行 Git 管理

```shell
# 建立账户
adduser git
# 设置密码
passwd git
```

该账户的职责是专门进行 Git 同步操作，为了服务器安全我们应该禁止其进行远程登录

```shell
vim /etc/passwd
```

将：`git:x:1000:1000::/home/git:/bin/bash`
改为：`git:x:1000:1000::/home/git:/usr/bin/git-shell`

## Step2 开启 SSH 验证

我们关闭 git 用户的 bash 功能，git 远程操作走 SSH 通道，所有需要启动 SSH 的 RSA 验证，使用这种方式连接到 git server。

Step2.1 首先开启 SSH 认证

修改 ssh 配置，`vim /etc/ssh/sshd_config`

```conf
RSAAuthentication yes
PubkeyAuthentication yes
AuthorizedKeysFile .ssh/authorized_keys
```

重启 ssh 服务`service sshd restart`

Step2.2 然后客户端创建自己的秘钥对：`ssh-keygen`

Step2.3 最后拷贝公钥`id_rsa.pub`中的内容，添加到服务端`/home/git/.ssh/authorized_keys`中，注意修改`.ssh`所属用户`chown -R git.git /home/git/.ssh`

## Step3 创建 git 仓库

在 git 用户目录下创建 git 仓库，并修改权限

```shell
git init --bare [name].git
chown -R git.git [name].git
```

## Step4 验证

`git clone git@[server ip]:/home/git/[name].git`

成功的 clone 代办远程 git 服务搭建成功，然后只需要将团队成员的公钥添加到`/home/git/.ssh/authorized_keys`文件中
