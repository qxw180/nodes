#SQL注入
> sql注入就是通过前端的请求将sql片段作为参数传入到后台，后台通过参数拼接出非预定sql
> 最终达到欺骗服务器执行恶意sql命令；

    例如下面这个请求
    order/list?id=100
    在服务器端会进行如下查询并返回结果
    SELECT * FROM orders WHERE id='100'
    我们的对请求地址做一个修改
    order/list?id=100'or'1'='1'
    那么执行的sql就变成了这个样子
    SELECT * FROM orders WHERE id='100' or '1'='1'
    所以全部数据都拿到了

    例如登录验证
    SELECT * FROM users where name='lee' and pwd='123456' and code='1234';
    我们随便输入一个用户名、密码留空，验证码输入 'or 1=1--
    SELECT * FROM users where name="xxx" and pwd="and code=" or 1=1--';
    这样随意输入一个用户名都可以登录成功

> sql注入的应对

1. 永远不要相信用户的输入
2. 也不要相信客户端的验证
3. 错误信息处理，不要把服务端的错误信息透露给用户
4. 不要使用管理员权限连接数据库
5. 敏感信息不要明文存储，要加密保存

