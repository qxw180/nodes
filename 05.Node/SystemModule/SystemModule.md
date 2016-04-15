#Node.js 系统模块

#进程管理：process
NodeJs可以感知自身进程的允许环境和状态，也可以创建子进程并与其协同工作；

##进程：Process
process是一个全局内置对象；代表node.js代码宿主的操作系统进程对象；
+ `process.cwd()`：获取程序目录
+ `process.chdir(path)`：切换程序目录
+ `process.stdout`：标准输出流对象
	* `process.stdout.write(content)`：打印内容到输出设备
+ `process.stderr`：标准错误流对象
	* `proces.stderr.write(errContent)`：打印错误信息到输出设备
+ `process.stdin`：标准输入流对象

	process.stdin.on('readable', function() {
	  var chunk = process.stdin.read();
	  if (chunk !== null) {
	    process.stdout.write('data: ' + chunk);
	  }
	});

+ `process.exit(code)`：杀死进程推出程序，code为退出后返回的代码，默认为0；
+ `process.argv`：获取命令行擦数，例：`process.argv.slice(2)`获取额外
	* `argv[0]`固定等于NodeJS执行程序的绝对路径
	* `argv[1]`固定等于主模块的绝对路径
	* 因此第一个命令行参数从`argv[2]`这个位置开始
+ 事件注册：

	process.stdout.on('data',function(data){
	   console.log(data);
	});

+ 设置编码
	* `process.stdin.setEncoding(编码);`
	* `process.stdout.setEncoding(编码);`
	* `process.stderr.setEncoding(编码);`

##子进程：Child process
`child_process`模块可以创建和控制子进程，可以使用`child_process`模块来实现多线程，使多核CPU发挥最大效率；；

+ `spawn`：`child_process.spawn( command )`：
spawn函数用给定的命令发布一个子进程，只能运行指定的程序，参数需要在列表中给出

	var child = child_process.spawn( command );
	child.stdout.on('data', function(data) {
	  console.log(data);
	});

+ `exec`：`child_process.exec( command , function(err, stdout , stderr ) {})`

+ `execFile`：`child_process.execFile( file , function(err, stdout , stderr ) {});`
execFile函数与exec函数类似，但execFile函数更显得精简，因为它可以直接执行所指定的文件

+ `fork`：`child_process.fork( modulePath );`
fork函数可直接运行Node.js模块，所以我们可以直接通过指定模块路径而直接进行操作

	child_process.fork( modulePath );

##Cluster
`cluster`模块是对`child_process`模块的进一步封装，专用于解决单进程NodeJS Web服务器无法充分利用多核CPU的问题。使用该模块可以简化多进程服务器程序的开发，让每个核上运行一个工作进程，并统一通过主进程监听端口和分发请求。



<hr>

#IO 文件操作
nodejs中提供fs模块来支持I/O操作


##API示例：
+ 写入文件：`fs.write(fileName,content,callback(err){})`
write函数可以异步的将数据写入一个文件，如果文件已存在则会被替换
+ `fileName`：字符串
+ `content`：字符串或Buffer，编码格式默认utf-8
+ `callback`：回调函数，只有一个err参数
	
	var fs= require("fs");
	fs.writeFile('test.txt', 'Hello Node', function (err) {
	   if (err) throw err;
	   console.log('Saved successfully'); //文件被保存
	});
	 
+ 追加写入文件：`fs.appendFile(fileName,content,callback(err){})`
将新的内容追加到已有文件中，如果文件不存在则创建新文件

+ 文件检测：`fs.exists(fileName,callback(exists){})`
	fs.exists('/etc/passwd', function (exists) {
	  console.log(exists ? "存在" : "不存在!");
	});

+ 文件重命名：`fs.rename(fileName,newName,callback(err){})`
+ 文件移动：`fs.rename(oldPath,newPath,callback(err){})`

+ 文件内容读取：`fs.readFile(fileName,callback(err,data){})`

+ 删除文件：`fs.unlink(fileName,callback(err){})`

+ 创建目录：`fs.mkdir(path,permission,callback(err){})`
	- `path`：路径
	- `permission`：权限，可选参数，只有在linux下有效，默认0777
	- `callback`：回调函数

+ 删除目录：`fs.rmdir(path,function(err){})`
+ 读取目录：`fs.readdir(path,function(err,files){})`

<hr>

#URL
nodejs提供url模块来进行url相关操作

##URL解析：`url.parse(url,parseJSON)`
返回结果为一个url对象
+ `url`：要解析的地址
+ `parseJSON`：布尔值，默认false，true时会将查询条件解析成JSON格式
`url.parse('http://www.test.com:8888/sub?a=1&b=2')`
`protocol:` 'http:',
`slashes:` true,是否有双斜线
`auth:` null,
`host:` 'www.test.com:8888',
`port:` '8888',
`hostname:` 'www.test.com',
`hash:` null,
`search:` '?a=1&b=2',
`query:` 'a=1&b=2',
`pathname:` '/sub',
`path:` '/sub?a=1&b=2',
`href:` 'http://www.test.com:8888/sub?a=1&b=2'

##URL格式化：`url.format({})`
`url.parse()`的逆向过程，将对象转换为url地址

##resolve：`url.resolve(path1,path2)`
	url.resolve('http://example.com/', '/one')  // 'http://example.com/one'
	url.resolve('http://example.com/one', '/two') // 'http://example.com/two'


<hr>


#路径
path模块用于处理转换路径

##格式化路径：`path.normalize(path)`
normalize函数将不符合规范的路径格式化为标准路径
`path.normalize('/path///normalize/hi/..');// /path/normalize`	

##路径拼接：`path.join(path1,path2,...)`
将传入的多个路径进行拼接，格式化成标准路径

##获取路径中目录名：`path.dirname(path)`

##获取路径basename：`path.basename(path,ext)`
+ `path`：路径，字符串
+ `ext`：排除后缀，字符串
`path.basename('/foo/strong/basename/index.html','.html');// index`

#获取扩展名：`path.extname(path)`
`path.extname('/foo/strong/basename/index.html');// .html`


<hr>


#字符串转换
nodejs提供querystring实现字符串和对象的转换

##对象序列化：`querysting.stringify(objcect,分隔符,分配符)`
##对象反序列化：`querysting.parse(object,分隔符,分配符)`

<hr>


#工具
nodejs提供util模块，提供了一些列常用好处

##`util.inspect(object,[showHidden],[depth],[colors])`
将任意对象转换为字符串，通常用于调试和错误输出

##`util.format('%s:%s', 'foo');`
+ 占位符
	* `%s`：字符串
	* `%d`：数字
	* `%j`：JSON
+ 如果参数个数多于占位符在调用`util.inspect()`将字符串连接在一起，并以空格分开`util.format('%s:%s', 'foo', 'bar', 'baz');// 'foo:bar baz'`


##数组验证：`util.isArray(object);`
##日期验证：`util.isDate(object);`
##正则验证：`util.isRegExp(object);`





























