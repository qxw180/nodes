# [生命周期&HOOKS](https://jestjs.io/docs/zh-Hans/setup-teardown)

```js
describe("功能测试",() => {
  // 在测试用例执行前执行，适用于初始化
  beforeAll(() => {});
  // 所有测试用例执行完成之后执行，适用于清理
  afterAll(() => {});
  // 在每一个测试用例执行前执行
  beforeEach(() => {});
  // 在每一个测试用例执行完成后执行
  afterEach(() => {});

  describe('功能一相关代码' ()=> {
    test("test1", () => {});
    test("test2", () => {});
  })
  describe('功能二相关代码' ()=> {
    test("test1", () => {});
    test("test2", () => {});
  })
})
```

每一个`describe`函数的内部都可以声明自己的 HOOKS 函数，describe 块内的 hook 函数只在当前块及子块内生效。
Jest 会在首先执行全部`describe`语句，所以一下初始化和销毁的功能不适合在`describe`内执行，应该在`hook`中执行。

执行顺序：`beforeAll` => (`beforeEach` => `describe/test` => `afterEach`)循环执行 => `afterAll`

## [Mock](https://jestjs.io/docs/zh-Hans/mock-functions)

1. 捕获函数的调用和返回结果，以及 this 和调用顺序
2. 设置返回结果
3. 改变函数的内部实现

```js
test("函数mock演示", () => {
  // mock函数，捕获函数的调用
  const fun = jest.fn();
  runCallback(fun);
  // 预期函数被调用过
  expect(fun).toBeCalled();
  // 预期调用1次
  expect(fun.mock.calls.length).toBe(1);
});
test("改变函数内部实现", () => {
  axios.get.mockResolvedValue({ data: "hi" });
  await getData.then((data) => {
    expect(data).toBe("hi");
  });
});
```
