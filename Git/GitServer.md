#CentOS搭建Git服务
目的：在CentOS搭建一个Git服务，可以方便团队同步代码，为CI做准备

##Step1 创建git用户
为了便于管理我们创建一个专门的账户进行Git管理
``` shell
# 建立账户
adduser git
# 设置密码
passwd git
```

该账户的职责是专门进行Git同步操作，为了服务器安全我们应该禁止其进行远程等
``` shell
vim /etc/passwd
```
  将：`git:x:1000:1000::/home/git:/bin/bash`
改为：`git:x:1000:1000::/home/git:/usr/bin/git-shell`


##Step2 开启SSH验证
关闭git用户的bash功能，所有需要启动SSH的RSA验证，使用这种方式连接到git server

1. 首先开启SSH认证
修改ssh配置，`vim /etc/ssh/sshd_config`
```
RSAAuthentication yes
PubkeyAuthentication yes
AuthorizedKeysFile .ssh/authorized_keys
```
重启ssh服务`service sshd restart`

2. 然后客户端创建自己的秘钥对：`ssh-keygen`

3. 最后拷贝公钥`id_rsa.pub`中的内容，添加到服务端`/home/git/.ssh/authorized_keys`中，注意修改`.ssh`所属用户`chown -R git.git /home/git/.ssh`


##Step3 创建git仓库
在git用户目录下创建git仓库，并修改权限
``` shell
git inti --bare [name].git
chown -R git.git [name].git
```

##Step4 验证
`git clone git@[server ip]:/home/git/[name].git`


成功的clone代办远程git服务搭建成功，然后只需要将团队成员的公钥添加到`/home/git/.ssh/authorized_keys`文件中