# React 代码分隔和动态加载

延迟(按需)加载代码，避免初始化代码体积过大

## Dynamic Import

使用动态导入是实现延迟加载的最优方案

webpack 在解析代码的时候遇到`import()`，目前各种 Module Bundler 都支持的很好。

```js
import("./math").then((math) => {
  console.log(math.add(16, 26));
});
```

## React.lazy + Suspense

`React.lazy`+`Suspense`可以实现组件的懒加载。但是不支持 SSR，SSR 场景可以使用[loadable-components](https://github.com/gregberge/loadable-components)

注意：`React.lazy`只支持`default exports`

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
