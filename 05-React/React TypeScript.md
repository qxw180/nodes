# TypeScript With React

```TypeScript
import React from 'react';
interface IHelloProps {
  name: string;
}
const Hello: React.FC<IHelloProps> = ({name, children}) => {
  return (
    <>
      <p>hello {name}</p>
      { children }
    </>
  )
}
export default Hello;
```

https://github.com/Microsoft/TypeScript-React-Starter#typescript-react-starter

## TODO:如何获取某个 react 组件的全部属性列表，场景 select 组件二次封装，支持现有全部属性
