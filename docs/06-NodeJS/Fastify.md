# Fastify

## plugin

在 fastify 中一切皆是插件，route、decorator 皆是插件，可以使用插件来进行功能扩展。

使用`register`装载插件：`fastify.register(plugin, [options])`

- `options`：会在调用时传给插件，支持以下三个参数：
  - `logLevel`
  - `logSerializers`
  - `prefix`：字符串，会使用该值 prefix 当前插件内全部路由
- `plugin`：`(fastify, opts, done) => {done()}`
  - `fastify`：实例
  - `opts`：
  - `done`：完成回调

```javascript
async function routes(fastify, options) {
  fastify.get("/", async (request, reply) => {
    return { hello: "world" };
  });
}
fastify.register(routes);
```

Fastify 会按照插件的声明顺序加载，同时 Fastify 支持异步引导程序启动，

`register`会创建一个 scope，也即是说插件对 fastify 实例的修改只会对其子 context 生效。

## decorate

decorate API 可以在 fastify 实例上添加对象，添加后可以 use everywhere ，方便代码复用。

## hook

## Routes

- Full：`fastify.route(opts)`
- Shorthand：`fastify.METHOD(path, [opts], handler`

## Data Validate & Serialize

Fastify 使用 JSON Schema 验证请求和序列化输出，对请求`body`、`querystring`、`params`、`headers`进行验证。

Fastify 使用[Ajv](https://ajv.js.org/)做请求验证

Fastify Serialize 可以提升响应速度，防止敏感信息泄露。

在路由的`option.schema`中设置，

```JavaScript
const opts = {
  schema: {
    body: {
      type: 'object',
      properties: {
        someKey: { type: 'string' },
        someOtherKey: { type: 'number' }
      }
    },
    response: {
      200: {
        type: 'object',
        properties: {
          hello: { type: 'string' }
        }
      }
    }
  }
}

fastify.post('/', opts, async (request, reply) => {
  return { hello: 'world' }
})
```

## Test
