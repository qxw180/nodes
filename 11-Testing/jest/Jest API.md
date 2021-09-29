# [Jest API](https://jestjs.io/docs/api)

Jest 程序是由一或多个`test()`函数组成的，在`test()`内内执行要被测试的代码并使用`expect()`方法检断言被测试代码运行结果和预期是否一致。

- `test(name, fn, timeout)`：
  - `name: string`：测试名
  - `fu:(done?: () => void) => Promise<any> | void`：包含断言的测试函数
    - 当返回结果为 promise 对象时，会等到对象 resolve 后结束运行
    - 也可以通过调用`done`函数结束运行
  - `timeout: number`：测试运行超时时间，单位毫秒，默认为 5 秒
- `test.each(table)(name, fn, timeout)`：在需要使用不同数据对同一功能进行测试的场景下，我们除了一组数据一个`test()`的方法外，还可以使用`test.each()`传入一组数据，Jest 会依次使用每一组数据执行`test()`。
  - `table: [[args]] | any`：测试参数
  - `name: string`：测试名，支持动态拼接，参考[test.each](https://jestjs.io/docs/api#testeachtablename-fn-timeout)
  - `fu`&`timeout`：同上
- `test.only(name, fn, timeout)`：通常一个测试文件会包含多个`test()`，我们在开发的时候为了节省调试时间可以使用`test.only()`实现跳过其它`test()`
- `test.skip(name, fn, timeout)`：同上，我们在调试的时候除了可以使用`test.only()`设置只有某些`test()`被执行，可以可以使用`test.skip()`来跳过某些`test()`。
- `test.only.each(name, fn, timeout)`：
- `test.skip.each(name, fn, timeout)`：
- `test.concurrent(name, fn, timeout)`：`test()`默认都是串行运行的，使用`test.concurrent()`可以并行执行测试
- `test.concurrent.each(table)(name, fn, timeout)`
- `test.concurrent.only.each(table)(name, fn, timeout)`
- `test.concurrent.skip.each(table)(name, fn, timeout)`

我们可以使用`describe()`对这些`test()`进行分组管理，`describe()`方法还可以自由嵌套。

- `describe(name, fn, timeout)`
- `describe.only(name, fn, timeout)`
- `describe.skip(name, fn, timeout)`
- `describe.each(table)(name, fn, timeout)`
- `describe.only.each(table)(name, fn, timeout)`
- `describe.skip.each(table)(name, fn, timeout)`

## [Matchers 匹配器](https://jestjs.io/docs/zh-Hans/using-matchers)

```js
test("匹配器演示", () => {
  expect(10).toBe(10);
  const tmp = { x: 0 };
  expect(tmp).toEqueal({ x: 0 });
  const a = null;
  expect(a).toBeNull();
});
```

## TODO:watch 模式

- f
- 0
- a

TODO: 模拟网络错误， 404 500 timeout
