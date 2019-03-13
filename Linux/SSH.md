#Linux SSH和远程控制
SSH是一种用于计算机之间通信的网路协议

##远程登录

###登录过程
1. 请求：远程主机收到用户的登录请求，把自己的公钥发给用户；
2. 加密：用户使用这个公钥，将登录密码加密后发送回来；
3. 验证：远程主机用自己的私钥解密登录密码，验证登录；

###公钥登录
每次都使用密码登录非常麻烦，SSH提供了公钥登录，可以省去密码输入：
1. 用户自己生成密钥对，将公钥存储在远程主机；
2. 登录的时候，远程主机会发送一段随机字符串
3. 用户使用自己的私钥加密字符串后再返回给远程主机
4. 远程主机使用事先上传的公钥进行解密，解密成功完成登录

###使用ssh-keygen生成秘钥对
1. 运行`ssh-keygen`，一路回车，可以设置密码，运行结束后在`~/.ssh/`目录下会生成公钥`id_rsa.pub`和私钥`id_rsa`两个文件
2. 运行`ssh-copy-id user@host`上传公钥到服务器

###Windows下PuTTY登录
+ 密钥对生成
	- 启动PuTTY Key Generator
	- 选择加密格式`SSH-2 RAS`、设置密钥长度`2048`
	- 点击`Generator`生成密钥（过程中来回晃动鼠标，否则没有进度）
	- 点击`Save public key`、`Save private key`保存公钥和私钥
+ 上传公钥到远程主机
	- 打开或创建远程主机`$HOME/.ssh/authorized_key`文件
	- 在最下面输入`ssh-rsa `
	- 继续将生成的公钥输入到后面，保存完成
		+ `ssh-rsa`和公钥直接有空格
		+ 公钥必须整理成单独的一行输入到`ssh-rsa`后
		+ 公钥为公钥文件`Comment: "rsa-key-xxxxxxxx"`和`---- END SSH2 PUBLIC KEY ----`之间的部分
+ 使用key登录
	- 在`Connection > SSH > Auth`中选择刚刚生成的私钥
	- 回到`Session`新建会话并保存
	- 点击`Open`按钮直接输入用户名就可以直接登录



####远程文件管理 scp
> scp是ssh衍生的工具 ssh copy

1. 下载文件：`scp -r user@host:remote_path local_path`
2. 上传文件：`scp -r local_path user@host:remote_path`
> <small>-r:上传或下载文件为目录文件加该参数</small>


####Github SSH链接
1. 生成密钥对
2. 登录github，在`Seetings > SSH keys`下点击`Add SSH  key`
3. 在`Title`输入名字,方便记忆管理；在`Key`输入生成的公钥内容
4. 点击`Add key`按钮完成添加
5. 再次进行Github远程操作时无须输入密码

> windows下生成密钥对
> 1. 安装git客户端
> 2. 运行gitbash
> 3. 输入`ssh-keygen -t rsa`，会在`C:\Users\Administrator[这里替换成你的用户名]\.ssh`目录下生成密钥对
> 4. 同上操作在Github中添加公钥
---

##服务配置
> SSH配置文件位置：`/etc/ssh/sshd_config`
> SSH默认端口：`22`


