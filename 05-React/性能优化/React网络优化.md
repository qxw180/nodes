# React 代码分隔和动态加载

使用延迟(按需)加载避免初始化代码体积过大是有效的优化手段。

## 使用 ESM Dynamic Import 延迟加载

[ESM Dynamic Import](../../02-JavaScript/03.Modular/ESM.md#dynamic-import)是为按需加载场景而设计的。使用 Dynamic Import 语法是实现动态加载优化的最佳方案。

Webpack 在解析代码的时候遇到`import()`语法会自动进 Code Splitting，目前各种 Module Bundler 工具对动态导入都支持的很好。

```js
import("./math").then((math) => {
  console.log(math.add(16, 26));
});
```

## 组件延迟加载 React.lazy + Suspense

`React.lazy`+`Suspense`可以实现组件的懒加载。但是不支持 SSR，SSR 场景可以使用[loadable-components](https://github.com/gregberge/loadable-components)

`React.lazy`接收一个函数，这个函数调用动态`import()`，这个函数必须返回一个 Promise 对象，默认情况下这个 Promise 对象要`default exports`一个 React 组件。

`Suspense`组件可以通过`fallback`属性设置一个 React 组件，可以用于 lazy 组件加载过程中的降级展示。
`Suspense`组件并不要求是 lazy 组件的直接父级，可以跨多级，而且可以包含多个 lazy 组件。

如果 lazy 组件加载失败会抛出异常，可以使用[`Error Boundaries`](../React%20异常处理.md)处理。

```JSX
import React, { Suspense } from 'react';
import MyErrorBoundary from './MyErrorBoundary';

const OtherComponent = React.lazy(() => import('./OtherComponent'));
const AnotherComponent = React.lazy(() => import('./AnotherComponent'));

const MyComponent = () => (
  <div>
    <MyErrorBoundary>
      <Suspense fallback={<div>Loading...</div>}>
        <section>
          <OtherComponent />
          <AnotherComponent />
        </section>
      </Suspense>
    </MyErrorBoundary>
  </div>
);
```
