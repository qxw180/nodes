# 概念理解

## TODO:代码副作用

- 代码执行中途处理额外逻辑，例如：throw error 之类

## mutable & immutable

immutable 创建之后不能被修改，对应 JavaScript 的基本类型
mutable 创建之后可以被修改，对应 JavaScript 的引用类型

注意以上说的的基本类型和引用类型并不是指变量，而是只变量对应的实际对象。
例如一个对象的内部变量是可以被修改的，表面上看这个对象并没有变，实际其内部已经改变，我这种情况为 mutable。反之如果是数字类型，这个对象一旦被创建就不能被修改，对变量修改实际是创建新的对象并引用。

```javascript
let person = {
  name: "Harry",
  age: 22,
};

let clonePerson = person;
person.name = "John";
console.log(clonePerson.name); // 'John'
```

## 内聚&耦合
