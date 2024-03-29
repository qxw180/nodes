# TODO:登录功能实现方案

HTTP 是一种无状态协议，客户端每次请求服务端首先要和服务端创建连接，在服务端完成响应后会断开连接，下次请求又会创建新的连接，每次请求都是独立的，服务端无法判断两次请求是否来自同一个用户，web 登录态有以下几种实现方案：

1. 服务端 Session 登录
2. JWT
3. SSO 单点登录
4. OAuth 第三方登录

## 服务端 Session 登录

1. 客户端请求服务端，将用户名和密码传给服务端
2. 服务端验证用户名和密码后创建一个唯一 ID 即 session 并保存起来，用来报错用户会话相关数据
3. 服务端响应请求，将 session 返回个客户端，有 cookie 和 response 两种方式
4. 客户端保存 session，下次请求的时候带入保存的 session，cookie 和 url 参数两种方式
5. 服务端根据 session 参数验证用户身份

**方案缺点**

1. 服务端需要存储大量 session，增加服务器压力
2. 如果是分布式服务，需要考虑 session 同步问题
3. 存在 [CSRF](../../07.基础/05-安全/CSRF.md) 攻击问题

## JWT(Json Web Token)

JWT 方案是在服务端在验证用户登录信息后生成一个 token 返回给客户端，token 中包含了用户的相关信息，客户端在后续访问的时候带上这个 token 就可以完成身份验证。
JWT 不需要在服务端存储用户状态，解决了服务端性能问题和分布式部署的状态同步问题

### JWT 的构成

JWT 由 header（头信息），playload（消息体），signature（签名）三部分组成

header 部分是一个 JSON 对象，描述 JWT 的元数据消

```javascript
header = '{"alg":"HS256","typ":"JWT"}'; // `HS256` 表示使用了 HMAC-SHA256 来生成签名。typ声明令牌类型，统一为JWT
```

payload 部分也是一个 JSON 对象，用来存放实际需要传递的数据，有以下官方规定字段

- iss (issuer)：签发人
- exp (expiration time)：过期时间
- sub (subject)：主题
- aud (audience)：受众
- nbf (Not Before)：生效时间
- iat (Issued At)：签发时间
- jti (JWT ID)：编号

Signature 部分是对前两部分的签名，防止数据篡改。需要一个秘钥(只有服务器自己知道)，使用 header 指定的算法按照下面的公式产生

```JavaScript
HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  secret)
```

算出签名以后，把 Header、Payload、Signature 三个部分拼成一个字符串，每个部分之间用"点"（.）分隔，就可以返回给用户。

### JWT 缺点

因为 JWT 是在客户端进行存储，所以在有效期内无法废止某个 token，所以针对敏感权限应该尽量降低 token 的有效时间。

## 单点登录

## TODO:第三方登录

OAuth 是一个关于授权(authorization)的开放网络标准，在全世界范围内被广泛应用。
为第三方应用提供授权，

## 相关阅读

[JSON Web Token 入门教程](http://www.ruanyifeng.com/blog/2018/07/json_web_token-tutorial.html)
