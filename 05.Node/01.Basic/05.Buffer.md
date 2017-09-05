#流和缓存区


##Buffer
JavaScript本身没有二进制数据类型，只有字符串数据类型，
在处理TCP流或文件流时必须使用二进制数据，
在Node.js中定义了一个与String对等的全局函数Buffer，
用来创建一个存放二进制数据的缓存区，对二进制数据进行操作；

	var buf = new Buffer();
	var bin = new Buffer([ 0x68, 0x65, 0x6c, 0x6c, 0x6f ]);



##Stream
> Stream是一个抽象接口，Node.js中很多对象实现了这个接口
> 所有的Stream对象都是EventEmitter的实例，常用事件有
> 1.data   当数据可读时触发
> 2.end    没有更多的数据可读时触发
> 3.error  接受和写入发生错误时触发
> 4.finish 所有数据已被写入到底层系统时触发

    var rs = fs.createReadStream(src)
    var ws = fs.createWriteStream(src)

    rs.on('data',function(chunk){
        if(ws.white(chunk) === false){
            rs.push()
        }
    })

    rs.on('end',function(){
        ws.end()
    })

    ws.on('drain',function(){
        rs.resume()
    })

`.pipe()`方法可以帮助我们监听`data`和`end`事件，还可以自动控制后端压力，

    var fs = fs.createReadStream(src)
    var ws = fs.createWriteStream(src)

    fs.pipe(ws)2