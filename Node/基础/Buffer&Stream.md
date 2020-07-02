# 流和缓存区

流(Stream)是一种编程架构方式，这种方式将一个复杂的功能拆成一些很小的单元，每个单元实现特定的功能，每个单元都可以复用，通过流将这些单元连接起来以实现复杂功能，流将数据从一个单元流转到另一个单元，每个单元完成对数据的处理。这种形式在Linux中证明了它的成功。

在nodejs中除了可以使用stream进行功能拆分，一般是用来实现更优雅的文件处理功能。

``` js
var http = require('http');
var fs = require('fs');

// demo1
var server = http.createServer(function (req, res) {
    fs.readFile(__dirname + '/data.txt', function (err, data) {
        res.end(data);
    });
});

// demo2
var server = http.createServer(function (req, res) {
    var stream = fs.createReadStream(__dirname + '/data.txt');
    stream.pipe(res);
});
server.listen(8000);
```

通过stream我们可以一边读取一边输出，避免一次性读取造成的内存消耗和waiting。

## Stream

`pipe`：NodeJS Stream是一个抽象接口定义了**数据流式处理**的方法，Node.js中很多对象实现了这个接口。nodejs使用`pipe()`方法实现输入和输出。

Readable Stream：可以产出数据，通过`pipe()`方法可以将数据传输给下游

Writable Stream：消耗数据，通过`pipe()`方法可以获取上游传入的数据

Transform Stream：

Duplex Stream

所有的Stream对象都是EventEmitter的实例，常用事件有
1.data   当数据可读时触发
2.end    没有更多的数据可读时触发
3.error  接受和写入发生错误时触发
4.finish 所有数据已被写入到底层系统时触发

``` js
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
```

## Buffer

JavaScript本身没有二进制数据类型，只有字符串数据类型，在处理TCP流或文件流时必须使用二进制数据，
在Node.js中定义了一个与String对等的全局函数Buffer，用来创建一个存放二进制数据的缓存区，对二进制数据进行操作；
