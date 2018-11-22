#Cookies `document.cookie`
HTTP协议是无状态协议，服务器无法判断请求的身份。可以使用隐藏表单和URL参数作为用户标记，但是这需要手动操作。
浏览器每次向服务器发送请求的时候会将当前域名下的cookie写入请求头发送到服务器，可以使用cookie作为请求的身份标识。
Cookie有以下特性：
1. cookie的存储是根据域名进行组织的，不同域名下cookie是独立的，我们只能对当前域名及其子域名下的cookie进行操作
2. cookie的数量和大小是有限的，不同的浏览器不同，单条大小限制一般为4kb，每个域名下一般最多存储20条cookie
3. cookie可以设置有效期，默认为回话结束自动销毁

因为cookie在每次http请求过程中都会在客户端和服务端进行传输，cookie的大小会影响网站的性能。我们在使用cookie的时候应该保持克制。大多数时候可以使用前端存储实现业务需求。

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


##封装cookie操作类；
``` JavaScript
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
```

##参考
[Document.cookie](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/cookie)

