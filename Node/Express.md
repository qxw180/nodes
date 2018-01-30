#Express

##Routeing
可以直接在Express实例使用请求方法定义路由`app.METHOD(PATH, HANDLER)`


```
    var express = require('express')
    var app = express()

    app.get('/', function (req, res) {
        res.send('Hello World!')
    })

    app.post('/', function (req, res) {
        res.send('Got a POST request')
    })
```

METHOD派生自HTTP请求类型，挂在在Express实例上，还有一个特殊的method`app.all()`处理全部请求类型；
PAHT用来定位entrypoint，可以为字符串、匹配字符串和正则表达式，Express使用[path-to-regexp](https://www.npmjs.com/package/path-to-regexp)来进行解析

可以为同一个请求提供多个handler，类似使用中间件来处理请求。
唯一的例外就是会掉函数可以调用`next('route')`来绕过之后的会掉函数。
HANDLER可以是一个方法、一个方法数组或者两者的组合：
```
    app.get('/example/b', function (req, res, next) {
      console.log('the response will be sent by the next function ...')
      next()
    }, function (req, res) {
      res.send('Hello from B!')
    })

    var cb0 = function (req, res, next) {
      console.log('CB0')
      next()
    }
    var cb1 = function (req, res, next) {
      console.log('CB1')
      next()
    }
    var cb2 = function (req, res) {
      res.send('Hello from C!')
    }
    app.get('/example/c', [cb0, cb1, cb2])
```

可以使用`app.route()`链式路由

```
    app.route('/book')
      .get(function (req, res) {
        res.send('Get a random book')
      })
      .post(function (req, res) {
        res.send('Add a book')
      })
      .put(function (req, res) {
        res.send('Update the book')
      })
```

##Requret

##Response
调用res的以下方法可以向客户端发送一个响应，结束请求，如果没有发送响应则客户端会被挂起。

+ res.download()  Prompt a file to be downloaded.
+ res.end()   End the response process.
+ res.json()  Send a JSON response.
+ res.jsonp() Send a JSON response with JSONP support.
+ res.redirect()  Redirect a request.
+ res.render()    Render a view template.
+ res.send()  Send a response of various types.
+ res.sendFile()  Send a file as an octet stream.
+ res.sendStatus()    Set the response status code and send its string representation as the response body.

##middleware
一个在Handler执行之前被Express调用的函数，使用`app.use()`将middleware添加到处理流程中。
















