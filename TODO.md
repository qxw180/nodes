#HTML

#CSS
+ checkbox 水平居中对齐


#JavaScript
+ jQuery`bind`和`on`区别
+ JS原生事件添加
+ JQuery源码
+ Promise【结】
+ 跨域&JQuery源码
+ 重新整理javascript继承，ES5&&ES6&&NODE inherits
+ JavaScript字符串字符长度相关，https://segmentfault.com/a/1190000007992410

####JavaScript length字符长度问题
####3.3JavaScript与UCS-2
UCS(Universal Character Set)通用字符集，使用ISO制定的标准字符集ISO 646，
UCS-2是ISO 646编码字符集的**字符编码**，使用两个字节表示一个字符，只能覆盖Unicode编码字符集的基本平面。

与此同时由Xerox、Apple等软件制造商于1988年组成的统一码联盟也在开发统一码项目。
很快两个组织意识到不需要两套标准，然后决定合并工作成果，共同完成Unicode的编制工作。
http://www.ruanyifeng.com/blog/2014/12/unicode.html

Unicode分为17个平面进行编码，第一个平面用于存放最常用的字符叫做基本平面，码点位置为U+0000到U+FFFF。
其它字符放在另外16个平面，叫做辅助平面，码点位置为U+010000一直到U+10FFFF。

UCS-2这种使用两个字节的表示一个字符的字符编码明显不能满足需求，于是就出现了UTF-16 UTF-32 UTF-8等一系列字符编码。
**UTF-16是USC-2的超级**，基本平面字符同样使用两个字节表示，其它平面字符使用四个字节表示。
UTF-8是变长字节编码方案，使用1-4个字节表示一个字符。
另外还有UCS-4：使用四个字节，UTF-32等同于UCS-4，UCS-4是UTF-32的超级；

**JavaScript使用Unicode字符集，但是使用UCS-2编码方案**
因为JavaScript出现的时候还没有UTF-16，所以JavaScript使用的是UCS-2编码；
由于采用UCS-2编码造成了中所有字符都是两个字节，对应汉子这种每个字符需要两个以上字节的字符就会被当做两个字节处理

##URL编码
URL只能使用英文字母、阿拉伯数字和某些标点符号，不能使用其他文字和符号；
URL中如果有汉字就必须编码后使用；
在不同的浏览器中针对不同请求(资源请求、条件查询、get、post、ajax..)使用的编码方式不同，太崩溃了，所以在发送前要在浏览器之前进行编码，让浏览器歇着；
+ `escape()`和`unescape()`：已经不建议使用
    * 作用：返回*Unicode编码值*，除ASCII字母、数字、标点符号"@ * _ + - . /"以外，对其他所有字符进行编码；
+ `encodeURI`和`decodeURI`：URL编码
    * 作用：返回*utf-8形式*，对常见符号以及一些网址中一些特殊符号(; / ? : @ & = + $ , #)不进行编码
+ `encodeURIComponent`和`decodeURIComponent`：对整个URL进行编码，包括特殊字符(; / ? : @ & = + $ , #)

#mobile
+ [Safari Mobile 默认不使用:active 状态，除非元素上或<body>上有一个touchstart 事件处理器。](http://www.zhuowenli.com/diary/frontend-mobile-bug-notes.html)

#自动化测试
+ 压力测试工具： Apache ab ，etc

#流量、性能监控相关

#NodeJS
+ npm：使用npm进行完整的包管理实践
    * 自动化构建组建
    * 前端功能组建
    * 。。。
+ 模版引擎
    * Jade || Ejs
+ MVC框架
    * Express
    * Koajs

#Gulp&Webpack
+ [Gulp 4.0](https://github.com/gulpjs/gulp/tree/4.0)
+ Gulp 插件开发

#HTTP2.0

#URL Tool

#客户端缓存
+ Cookie
+ Local Storage
+ Session Storage
+ Web SQL
+ IndexedDB
+ Application Cache
+ Cache Storage
+ Service Workers

#Linux
+ 软件安装管理【结】
+ 端口管理
+ 进程管理
	* 后台运行

#Other
+ 编码
+ 安全
+ 许可协议
