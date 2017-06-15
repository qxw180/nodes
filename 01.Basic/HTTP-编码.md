#理解字符编码
字符(Characters)是组成单词和语句的基本单位，它可以是英文字母、拉丁字母、汉字、符号等。
字符集(Character set)是一系列特定用途字符的集合，为了能够准确的引用一个字符每个字符都有一个相关的数值编码，称为码点(Code Point)。
编码字符集(Coded Character Set)是一个字符集合，集合中的每个字符都已经被分配了一个唯一的数值，即码点(Code Point)；
字符是以字节(bytes)的形式存储在电脑中的。
字符编码(Character Encoding)提供了字节和字符之间的映射关系。

不幸的是有很多字符编码和字符集，即很多种不同的字符到字节的映射，使用错误的字符编码进行解码就会造成乱码。

#Unicode 
一个通用字符集，包含了大多数语言字符，它的目标是成文其它字符集的一个超级，而且很大程度上已经是了。




GBK GB2312 UTF8


#HTTP编码
+ head
+ 资源
+ AJAX


声明当前文档所使用的字符编码
<meta charset="gb2312"> //html5
<meta http-equiv="Content-Type" content="text/html; charset=gb2312"> //html4 xhtml
<script src="http://ossweb-img.qq.com/images/js/foot.js" charset="gb2312"></script>
<link href="http://gameweb-img.qq.com/css/common.css" rel="stylesheet" charset="gb2312" >

`<meta http-equiv="Content-Type" content="text/html; charset=IANAcharset">`

`<meta charaset="UTF-8">` H5规范对`<meta http-equiv="Content-Type" content="text/html; charset=IANAcharset">`的替代；

meta 标签只是编码声明的一部分
HTTP Content-Type 头和其它的BOM(byte-order mark)元素比它有更高的优先级

#保证不会出现乱码
+ 正确的声明字符编码
+ 文件以正确的编码保存
+ HTTP Server编码设置正确

例子：
中国 \u4e2d\u56fd &#x4E2D;&#x56FD;

#参考资源
[W3C Internationalization Checker](http://validator.w3.org/i18n-checker/)，可以对页面编码和国际化规范进行测试

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
    
[Unicode与JavaScript详解](http://www.ruanyifeng.com/blog/2014/12/unicode.html)
[关于URL编码](http://www.ruanyifeng.com/blog/2010/02/url_encoding.html)