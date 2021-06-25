# Fastify

## plugin

可以使用插件来进行功能扩展
在 fastify 中一切皆是插件，route、decorator 皆是插件，
使用`register`装载插件
`register`会创建一个 scope，也即是说插件对 fastify 实例的修改只会对其子 context 生效。

`fastify.register(plugin, [options])`

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

fastify 会按照插件的声明顺序加载。
