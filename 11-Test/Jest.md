# Jest

```bash
# 初始化项目
npm init -y
git init
# 安装依赖
npm i -d jest @babel/core @babel/preset-env
# 初始化jest配置
npx jest --init
# 配置编译，具体内容参考：Jest 支持 ES6 Module
touch .babelrc
# 运行测试并生成测试报告
npx jest --coverage
# 监听文件变动，自动运行测试
npx jest --watch
```

## Jest 支持 ES6 Module

在安装 Jest 的时候会默认安装`babel-jest`，这时如果项目包含 babel 配置，jest 会自动使用 babel 对测试文件进行转化。所以我们只需要在项目中配置 babel 就可以使用 ES6 Module。
如果想要定制代码转化逻辑，可以在配置文件的`transfrom`字段配置

## [matchers 匹配器](https://jestjs.io/docs/zh-Hans/using-matchers)

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

## 异步测试

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

## [生命周期&HOOKS](https://jestjs.io/docs/zh-Hans/setup-teardown)

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
    expect(data).toBe('hi')
  })
});
```

TODO: 模拟网络错误， 404 500 timeout
