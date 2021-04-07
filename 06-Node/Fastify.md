# Fastify

## plugin

在 fastify 中一切皆是 plugin，可以使用 plugin 来进行功能扩展，使用`register`装载插件。

```javascript
async function routes(fastify, options) {
  fastify.get("/", async (request, reply) => {
    return { hello: "world" };
  });
}

fastify.register(routes);
```
