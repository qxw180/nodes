#前端开发编码

##定义HTML编码
设置HTML编码有以下方式：

1. **meta元素**：通常使用`meta`元素`<meta charset="gb2312">`定义，或者使用`http-equiv`和`content`属性定义`<meta http-equiv="Content-Type" content="text/html; charset=IANAcharset">`；
`<meta charaset="UTF-8">` H5规范对`<meta http-equiv="Content-Type" content="text/html; charset=IANAcharset">`的替代；
2. **HTTP 响应头**：`Content-Type:text/html; charset=utf-8`，响应头的优先级要高于`meta`标签，所以`meta`和响应头编果不一致会被覆盖。meta标签和响应头设置的编码应该保持一致，可以在这[W3C Internationalization Checker](http://validator.w3.org/i18n-checker/)检查响应头的编码设置，检查页面国际化支持情况。
3. **BOM(byte-order mark 字节顺序标记)**：BOM是在文件字节序列开头的一段，用来区分Unicode的编码方式。BOM相对于响应头和meta元素有更高的优先级。

##BOM
在UTF-8出现之前，使用UCS-2编码(16bit表示一个字符)，UTF-16是UCS-2的延伸。
16个bit需要通过两个字节来编码，根据这两个字节的排列顺序有两种编码方式:

+ 一种方式叫做big-endian，
+ 另外一种方式叫做little-endian，把第二个字节在前面

开头的BOM为`U+FEFF`代表使用big-endian，开头为`U+FFFE`代表使用`little-endian`。
始终想不明白为什么需要little-endian，为什么要把第二个放到前面？

![BOM 示例](https://www.w3.org/International/questions/images/bom.png)

在UTF-8编码中BOM头不是必须的，因为不像UTF-16有两种排列方式；UTF-8的BOM头为`EF BB BF`。

大多数时候我们不需要关心BOM，一些编辑器会默认添加BOM头，一些编辑器则会根据你的配置来添加。
BOM可以提供可靠的编码描述，因为它简洁稳定，即使是在非网络环境没有HTTP响应头的情况下。
应该保证BOM头和meta标签的一致性，

因为BOM的优先级高于HTTP响应头，在无法控制HTTP响应头的时候使用BOM来做编码声明也许是一个好办法，
#HTTP编码
+ head
+ 资源
+ AJAX



<script src="http://ossweb-img.qq.com/images/js/foot.js" charset="gb2312"></script>
<link href="http://gameweb-img.qq.com/css/common.css" rel="stylesheet" charset="gb2312" >




meta 标签只是编码声明的一部分
HTTP Content-Type 头和其它的BOM(byte-order mark)元素比它有更高的优先级

#保证不会出现乱码
+ 正确的声明字符编码
+ 文件以正确的编码保存
+ HTTP Server编码设置正确

例子：
中国 \u4e2d\u56fd &#x4E2D;&#x56FD;



#The Document Character Set
https://www.w3.org/International/articles/definitions-characters/#doccharset
浏览器内部在处理HTML和XML时都会转换为Unicode

#Character escapes 转义字符
https://www.w3.org/International/articles/definitions-characters/#escapes
转义是一种方法，使用ASCII文本方式表示某个字符，可以用来表示所有编码中没有的字符，或因其他原因(例如语法冲突)需避免使用的字符



##JavaScript使用的编码
JavaScript使用Unicode字符集，但是使用UCS-2编码方案

UCS-2是什么鬼？
ISO/IEC搞了Unicode字符集之后有搞了一个UCS，之间的乱七八糟的事情查资料也是看的一头雾水，反正Unicode与UCS编码方案是一致的，可以历届为同一个超大的字符集；
UCS-2是UCS的一种实现方案，使用2个字节；另外还有UCS-4：使用四个字节；
但是发布时间较早，只实现了Unicode的第一个平面；之后推出的UTF-16是UCS-2的超集，同样使用2Byte实现第一平面，使用4Byte实现其它平面；
UTF-32等同于UCS-4，UCS-4是UTF-32的超级；

因为JavaScript出现的时候还没有UTF-16，所以...；
带来的问题：
    JavaScript只能处理UCS-2编码，如果遇到4Btye的字符会当作两个字符来处理

中文：张三
Unicode：\u5f20\u4e09
UTF-8：&#x5F20;&#x4E09;

##前端开发需要处理的编码问题
 一、Coding时的编码问题
使用文本编辑器或者IDE进行Coding保存后的代码文件实际上就是一个二进制文件，一般在文件的开头会有几位来标识二进制文件存储的编码方案。
再次打开文件的时候如果解码方案和编码方案不一致的话就会出现乱码

 二、HTTP网络编码问题
如果编码和解码不一致也会出现乱码，HTTP编码设置主要包括一下几类
`<meta charset="gb2312"> //html5`
`<meta http-equiv="Content-Type" content="text/html; charset=gb2312"> //html4 xhtml`
`<script src="http://ossweb-img.qq.com/images/js/foot.js" charset="gb2312"></script>`
`<link href="http://gameweb-img.qq.com/css/common.css" rel="stylesheet" charset="gb2312" >`


##URL编码
URL只能使用英文字母、阿拉伯数字和某些标点符号，不能使用其他文字和符号；
URL中如果有汉字就必须编码后使用；
在不同的浏览器中针对不同请求(资源请求、条件查询、get、post、ajax..)使用的编码方式不同，太崩溃了，所以在发送前要在浏览器之前进行编码，让浏览器歇着；
+ `escape()`和`unescape()`：已经不建议使用
    * 作用：返回*Unicode编码值*，除ASCII字母、数字、标点符号"@ * _ + - . /"以外，对其他所有字符进行编码；
+ `encodeURI`和`decodeURI`：URL编码
    * 作用：返回*utf-8形式*，对常见符号以及一些网址中一些特殊符号(; / ? : @ & = + $ , #)不进行编码
+ `encodeURIComponent`和`decodeURIComponent`：对整个URL进行编码，包括特殊字符(; / ? : @ & = + $ , #)
    
##参考
[Declaring character encodings in HTML](https://www.w3.org/International/questions/qa-html-encoding-declarations)
[The byte-order mark (BOM) in HTML](https://www.w3.org/International/questions/qa-byte-order-mark)

[Unicode与JavaScript详解](http://www.ruanyifeng.com/blog/2014/12/unicode.html)
[关于URL编码](http://www.ruanyifeng.com/blog/2010/02/url_encoding.html)