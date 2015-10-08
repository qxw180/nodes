#Linux SSH和远程控制

####ABOUT SSH
> SSH是一种用于计算机之间通信的网路协议

##远程登录

####登录过程
1. 请求：远程主机收到用户的登录请求，把自己的公钥发给用户；
2. 加密：用户使用这个公钥，将登录密码加密后发送回来；
3. 验证：远程主机用自己的私钥解密登录密码，验证登录；

####Linux系统之间的SSH通信

- 口令登录：`ssh -p port user@host`
> <small>-p:设置端口，ssh默认端口为22</small>
> <small>当远程用户与当前用户一致可以省略user；`ssh host`</small>
- 公钥登录
	+ 登录原理：
	1. 用户将自己的公钥存储到远程主机；
	2. 用户请求登录；
	3. 远程主机向用户发送一段随机字符串；
	4. 用户使用私钥加密字符串并发送给远程主机；
	5. 远程主机用用户公钥解密，并匹配发送字符串进行验证；
	
	+ 命令实现：
	1. 生成密钥对：`ssh-keygen`	
	<small>执行过程中可以设置私钥密码，执行完成后会在`$HOME/.ssh/`目录下生成公钥`id_rsa.pub`和私钥`id_rsa`</small>
	2. 上传公钥到远程主机：`ssh-copy-id user@host`
	<small>远程主机会将用户的公钥保存在`$HOME/.ssh/authorized_keys`文件中；公钥就是一段字符串，如下：
		ssh-rsa AAAAB3NzaC1yc2EAAAABIwAAAQEA5Zg7h/eW6V198m4YYX4w4nmUhDYnu7N5RTUNxzqlzSroT/p45h+XfuYzlvtzbMARkr30QBGRmCJMjHw9LBV+UQ3WV+k1Kfwp6vIm2Zq+IZPk/6WEc+Nkzntc/wrBKoLXWep8Doerh4GWGFZwBPprqc7nofFhslE/gqtQIJWhcAe2YpEgwMq2l+tkQoXrZY3VUI8SAynKGbGzJImOrXIhgS4tLtiNGOEGs5hCCjBGVUlz+fzfG2lfziNnA/aieZyg+hI9TiHYeYIwzIMEcdkRFiFx16m73xy+Q3D1MCISK3WlXJT1yPdPIjUSg4GExf3hiMsGlV+/d852r68HwKYreQ== root@localhost.localdomain</small>
- Windows下PuTTY登录
	+ 密钥对生成
	1. 启动PuTTY Key Generator
	2. 选择加密格式`SSH-2 RAS`、设置密钥长度`2048`
	3. 点击`Generator`生成密钥（过程中来回晃动鼠标，否则没有进度）
	4. 点击`Save public key`、`Save private key`保存公钥和私钥
	+ 上传公钥到远程主机
	1. 打开或创建远程主机`$HOME/.ssh/authorized_key`文件
	2. 在最下面输入`ssh-rsa `
	3. 继续将生成的公钥输入到后面，保存完成
	> <small>`ssh-rsa`和公钥直接有空格</small>
	> <small>公钥必须整理成单独的一行输入到`ssh-rsa`后</small>
	> <small>公钥为公钥文件`Comment: "rsa-key-xxxxxxxx"`和`---- END SSH2 PUBLIC KEY ----`之间的部分</small>
	+ 使用key登录
	1. 在`Connection > SSH > Auth`中选择刚刚生成的私钥
	2. 回到`Session`新建会话并保存
	3. 点击`Open`按钮直接输入用户名就可以直接登录


####SSH中间攻击
**在SSH登录过程中，攻击者截获用户的登录请求，然后冒充远程主机将自己的公钥发送给用户，就可以骗取用户的登录密码；**
####应对方案
1. 用户第一次登录对方主机时会提示
	<small>The authenticity of host 'host (12.18.429.21)' can't be established.
	RSA key fingerprint is `98:2e:d7:e0:de:9f:ac:67:28:c2:42:2d:37:16:58:4d`.
	Are you sure you want to continue connecting (yes/no)?</small>
> 提示无法识别host主机的真实性，只知道公钥指纹，是否继续链接；
>> <small>公钥指纹是指将公钥进行MD5计算生成的128位字符串，远程主机应该在自己的官网提供该指纹，方便用户进行对比确认；</small>

2. 输入yes后系统会提示host主机已经获得认可
	<small>Warning: Permanently added 'host,12.18.429.21' (RSA) to the list of known hosts.</small>
> <small>当远程主机的公钥被接受后会保存到 `$HOME/.ssh/known_hosts`中 ，如下</small>
	<small>192.168.1.10 ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDARbGDpQP40qzANMXIaJdrOQSz/v6c8iA1shpdSzUDM82Tj+f9ku82vsALqx+qhFiF0BBK4Ha28ldhvNM9BADB6lEOJpjPGaNSKY/M0S4Rj91qDfebEyOFr0SilLtIEw1KAqDAl470Oo1L/Eg0ObQU0cYBGlgaag3WxzWMopHKpvtZ5SxbiYaP5xAXodjBn9aiKS8SIQwfb8MQ1HzJMs5eKwomt6EScXHXUD38fZAR2SEQzRJMdLsDJHYpNIHYHEP5YB2S4f1Q3CWNqAXBPXcw5kEcLrMCe0MQhyLoArQvIhnljDzT4lm6IME5KuTv+jD9wSHLiWHfJyvtbPh66tcp</small>
>> <small>第一个参数为对应主机；第二个参数为加密协议；最后为经过加密的公钥</small>


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

---

##服务配置

> SSH配置文件位置：`/etc/ssh/sshd_config`
> SSH默认端口：`22`