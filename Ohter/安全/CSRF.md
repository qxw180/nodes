#CSRF(Cross-Sit-Request-Forgery)跨站请求伪造
主要用于伪造用户操作，向服务器发送自动请求，

攻击场景
```
    // http://demo.com/list/delete?id=10
    // 此链接为用户网站删除列表数据请求，只做用户登录验证，
    // 那么我们可以在邮件中插入一张图片，
    <img src='http://demo.com/list/delete?id=10'/>
    // 那么只要用户点击这个连接，并且登录了该网站，那么这次攻击就成功了
    // 同样的利用img script iframe等不受同源限制的标签都可以实现CSRF攻击
```

##预防CSRF
1. 使用POST请求代替GET请求
2. 检查报头中的Referer参数确保请求发自正确的网站（但XHR请求可调用setRequestHeader方法来修改Referer报头）；
3. 对于任何重要的请求都需要重新验证用户的身份；
4. 创建一个唯一的令牌（Token），将其存在服务端的session中及客户端的cookie中，对任何请求，都检查二者是否一致。

