# TypeScript Use Case

## 使用字面量类型和联合类型，实现约束对象属性名

```TypeScript
type Keys = "name" | "sex"
type DulKey = {
    [key in Keys]: string    // 类似for...in
}
```

## TODO:接口如何实现属性互斥，即 n 选一

## TODO:提取对象的 value，声明别名，使用枚举 key 或 value 生成字面量联合类型

## TypeScript With React

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
