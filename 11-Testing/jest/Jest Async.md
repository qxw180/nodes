# Jest 异步测试

```js
// 使用done参数回调触发执行完成
test("异步回调演示", (done) => {
  fetchData((data) => {
    // 如果expect语句失败会抛出一个错误，如果想查看错误日志，需要使用try catch 捕捉后作为done的参数。
    try {
      expect(data).toEqual({
        success: true,
      });
      done();
    } catch (e) {
      done(e);
    }
  });
});

// 直接返回promise对象，jest会处理promise的状态
test("异步Promise演示", () => {
  return fetchData().then((response) => {
    expect(response.data).toEqual({
      success: true,
    });
  });
});

// 预期失败测试
test("异步Promise预期404错误演示", () => {
  // 如果fetchDate没有触发catch，则可以正常执行完成，需要使用以下语句设定断言执行次数
  expect.assertions(1);
  return fetchData().catch((e) => {
    expect(e.toString().indexOf("404") > -1).toBe(true);
  });
});

// 另外的写法
test("异步Promise演示", () => {
  return expect(fetchData()).resolves.toMatchObject({
    data: { success: true },
  });
});
test("异步Promise预期错误演示", () => {
  return expect(fetchData()).rejects.toThrow();
});

// 使用async await
test("异步Async演示", async () => {
  await expect(fetchData()).resolves.toMatchObject({
    data: { success: true },
  });
});
test("异步Async预期错误演示", async () => {
  await expect(fetchData()).rejects.toThrow();
});

test("异步Async演示", async () => {
  const data = await fetchData();
  expect(data).toMatchObject({
    data: { success: true },
  });
});
test("异步Async预期错误演示", async () => {
  expect.assertions(1);
  try {
    await fetchData();
  } catch (e) {
    expect(e.toString().indexOf("404") > -1).toBe(true);
  }
});
```
