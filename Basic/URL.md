#URL
> Uniform Resource Locator 统一资源定位器，网址；
> URL只能包括英文字母、数字和某些标点符号`$ - _ . + ! * ' ( ) ,`；

##URL的组成
	
	http://www.example.com:8042/over/there?name=ferret#nose  

+ 协议：`http`
+ 域名：`www.example.com`
+ 端口：`8042`
+ 路径：`/over/there`
+ 查询：`name=ferret`
+ 片段：`nose`

##JavaScript URL编码
> 在URL中包含中文等特殊字符时不同的浏览器、不同的请求方式浏览器会采用不同的编码方式对URL进行编码；
> 为了解决这种混乱的编码规则，我们可以使用JavaScript对URL进行编码，避免浏览器进行编码；


####`escape()` & `unescape()`
> 返回一个字符串的Unicode编码值，除了ASCII字母、数字、标点符号`@ * _ + - . /`以外其它所有字符进行编码；
> 很古老的方法，已经不推荐使用；
> 使用的时候需要注意
> 1. escape()不对"+"编码。但是我们知道，网页在提交表单的时候，如果有空格，则会被转化为+字符。服务器处理数据的时候，会把+号处理成空格
> 2. 无论网页的原始编码是什么，一旦被Javascript编码，就都变为unicode字符


####`encodeURI()` & `unencodeURI()`
> 对整个URL进行编码，除了常见符号以外，对于在网址中有特殊意义的符号`; / ? : @ & = + $ , #`也不进行编码；
> 编码后输出UTF-8形式，并且每个字节前加上`%`；
> 不对单引号`'`进行编码；

####`encodeURIComponent()` 和 `unencodeURIComponent()`
> 用于对URL的个别部分进行编码；
> 会对`; / ? : @ & = + $ , #`这些符号进行统一编码；

####JavaScript length字符长度问题
####3.3JavaScript与UCS-2
+ JavaScript字符串字符长度相关，https://segmentfault.com/a/1190000007992410
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

##参考
[关于URL编码](http://www.ruanyifeng.com/blog/2010/02/url_encoding.html)
