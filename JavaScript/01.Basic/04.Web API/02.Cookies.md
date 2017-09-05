#Cookies `document.cookie`
Cookie是服务器为了标识用户身份，在浏览器保存的一小段文本信息；

##Cookie的属性
+ `name`：每个cookie的统一标识符；不区分大小写；
+ `value`：必须属性，cookie的值；不能出现分号`;`、逗号`,`、等号`=`、空格` `，如包括则存储的时候必须使用`encodeURIComponent()`进行编码；
+ `domain`：指定cookie的所在域
 	* 如果未指定默认为当前页面的域名；
	* 在访问的时候只有域名一致cookie才会发送到服务器；如`example.com`、`.example.com`(该写法对所有子域名均生效)、`do.example.com`
	* *同源策略*：出于安全考虑，网站不能访问由其它域创建的cookie；只要求端口和域名相同；
+ `path`：指定cookie的路径，必须为绝对路径，默认为当前页面的路径；
	* 在写入的时候除了Cookie本身的内容，还有一些可选的属性也是可以写入的，它们都必须以分号开头。
	* 在访问服务器的时候只有path匹配(非绝对匹配，`\blog`和`\bloglist`匹配)cookie才会发送到服务器；
	* path属性生效的前提是domain属性匹配；
+ `expires`：指定cookie的过期时间
	* 采用`Data.toUTCString()`格式；如果不指定或者设置为`null`，那么等浏览器关闭则被删除；
	* 浏览器根据本地时间决定Cookie是否过期，可能和服务器时间有出入；
+ `max-age`：指定cookie的有效期，单位秒；
+ `secure`：指定cookie只能在HTTPS下发送到服务器；
+ `HttpOnly`：设置cookie不能被javascrip读取；


##获取操作
+ 获取：`document.cookie`，使用JavaScript获取全部Cookie，返回值是一个字符串，包含了以`;`分割的键值对；
+ 写入：`document.cookie = cookieString`，赋值可以写入或修改cookie；和读取不一样，一次只可以写入一个cookie；
	* 当key、path、domain一致时会修改cookie的值；
	* cookie的值中不允许出现逗号、分号或空格这些特殊符号，可以使用`encodeURIComponent()`处理；
+ 删除：`document.cookie = 'key=value;expires=0'`，JavaScript没有提供专门的API删除cookie，可以通过设置cookie的过期时间删除；

例子：
	
	// 获取
	var allCookies = document.cookie;
	// 写入
	document.cookie = 'key=value;expires=date;path=/;domain=...'

##服务器和浏览器之间Cookie的传输
浏览器每次向服务器发送请求都会带上这段信息(request头信息)，以识别用户信息；
cookie有大小限制，大约4K左右；
	
	// Request Headers
	Accept:text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8
	Accept-Encoding:gzip, deflate, sdch, br
	Accept-Language:zh-CN,zh;q=0.8,en;q=0.6,it;q=0.4,ja;q=0.2
	Connection:keep-alive
	Cookie:BAIDUID=3ECD98D8B2028AD5C89A9044FC6CC539:FG=1; BIDUPSID=3ECD98D8B2028AD5C89A9044FC6CC539; PSTM=1460365342; MCITY=-%3A; pgv_pvi=6040250368; pgv_si=s3851169792; BDUSS=hhaVNZc0VYV0xBa25TYm9OdzA1cDJKdWFrWnh0SWRJaDlpQnNQVzZvWjJ3R1ZZSVFBQUFBJCQAAAAAAAAAAAEAAADWJ0MccXh3MTgwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHYzPlh2Mz5Yd3; BDRCVFR[feWj1Vr5u3D]=I67x6TjHwwYf0; BDRCVFR[PaHiFN6tims]=9xWipS8B-FspA7EnHc1QhPEUf; BDRCVFR[YDNdHN8k-cs]=9xWipS8B-FspA7EnHc1QhPEUf; shifen[50717606686_27191]=1480485630; BCLID=9893442797182827513; BDSFRCVID=Oj4sJeC62wPn-l6ihxh18gD7JmVw-inTH6aoj48lryl9oT3Gi53nEG0Pfx8g0Ku--fJKogKK3gOTH4nP; H_BDCLCKID_SF=tR4qoC_yJC_3qnAkhPnoK-FSqxby26nkHmneaJ5nJD_-o-Jb5TjEXt0p3N7M0TbeBmO82q7mQpP-HJ7dQRrs56Dyht4tQlvq5bbHKl0MLpclbb0xyn_VXxApLxnMBMPe52OnaIb8LIFbMCIGjTu-en-W5gTJ-4vKaK3t3RI8Kb7VbIjaLnbkbfJBD4bg-4QQLD5uhl3ofn3UMPOtXnrvh4I7yajKBRcLb6rGoJrVWI3KhCOS-UcpQT8rbR_OK5Oib4ju3J6Pab3vOIOTXpO1j-CreGADtT-jJbCsL-35Ht3BhDtxq4bohjPgMGOeBtQmJJrfbnuEaIQEj-ndDj7JQ5-phJjfe4cXQg-q3R7_JInSq4T1etnxDU-tjHbX0x-jLIcOVn0MW-KVKJQ_yPnJyUnybPnnBT3XLnQ2QJ8BfI8MhxK; BD_CK_SAM=1; PSINO=7; BD_HOME=1; H_PS_PSSID=1463_21423_21711_21103_18559_17001_21455_21408_21554_20929; BD_UPN=12314353
	Host:www.baidu.com

浏览器向服务器发送请求的时候会在request头信息中只包含cookie的key和value，不包含cookie的失效时间等其它信息；这里面有两个问题：
1. 服务器无法获取Cookie的各种属性，如过期时间等；
2. 无法知道是哪个域名设置的Cookie，有可能是一级域名，也可能是二三级域名；

	// Response Headers
	BDUSERID:474163158
	Cache-Control:private
	Connection:keep-alive
	Content-Encoding:gzip
	Content-Type:text/html;charset=utf-8
	Date:Wed, 30 Nov 2016 09:22:52 GMT
	Expires:Wed, 30 Nov 2016 09:22:52 GMT
	Server:bfe/1.0.8.18
	Set-Cookie:BDSVRTM=91; path=/
	Set-Cookie:H_PS_PSSID=1463_21423_21711_21103_18559_17001_21455_21408_21554_20929; path=/; domain=.baidu.com
	Set-Cookie:__bsi=488055069575091213_00_49_R_N_923_0303_C02F_N_I_I_0; expires=Wed, 30-Nov-16 09:22:57 GMT; domain=www.baidu.com; path=/
	Set-Cookie:BD_HOME=1; path=/
	Strict-Transport-Security:max-age=172800
	Transfer-Encoding:chunked

服务器向浏览器发送响应的时候是通过`Set-Cookie`一个一个设置的


##封装cookie操作类；

	var docCookies = {
	  	getItem: function (sKey) {
	    	return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
	  	},
	  	setItem: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
	    	if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return false; }
	    	var sExpires = "";
	    	if (vEnd) {
	      		switch (vEnd.constructor) {
	        		case Number:
	          			sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
	          			break;
	        		case String:
	          			sExpires = "; expires=" + vEnd;
	          			break;
			        case Date:
	          			sExpires = "; expires=" + vEnd.toUTCString();
	          			break;
	      		}
	    	}
	    	document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
	    	return true;
	  	},
	  	removeItem: function (sKey, sPath, sDomain) {
	    	if (!sKey || !this.hasItem(sKey)) { return false; }
	    	document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + ( sDomain ? "; domain=" + sDomain : "") + ( sPath ? "; path=" + sPath : "");
	    	return true;
	  	},
	  	hasItem: function (sKey) {
	    	return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
	  	},
	  	keys: /* optional method: you can safely remove it! */ function () {
	    	var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
	    	for (var nIdx = 0; nIdx < aKeys.length; nIdx++) { aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]); }
	    	return aKeys;
	  	}
	};

	// API
	docCookies.setItem(name, value[, end[, path[, domain[, secure]]]]);
	docCookies.getItem(name);
	docCookies.removeItem(name[, path],domain);
	docCookies.hasItem(name);
	docCookies.keys();

##参考
[Document.cookie](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/cookie)

