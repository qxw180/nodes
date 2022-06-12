# 函数类型

```TypeScript 函数声明
// 函数声明
function sum(x: number = 0, y: number = 0): number {
  return x + y;
}

// 函数表达式
let sum2: (x: number, y: number) => number = function (x: number, y: number): number {
  return x + y;
};

// 类型别名
type Sum3 = (x: number, y: number) => number
let sum3: Sum3 = (a, b) => a + b
sum3(3, 2)

// 接口实现
interface Sum4 {
  (x: number, y: number): number;
}
let sum4: Sum4 = (a,b) => a + b
sum4(4, 2)
```

```TypeScript 参数默认值、可选参数、剩余参数
function add(a: number, b = 0, c: number): number {
  return a +b + c ;
}
add(1, undefined, 2); // 3


// 可选参数，可选参数必须位于必选参数之后
function buildName(firstName: string, lastName?: string) {
  if (lastName) {
    return firstName + ' ' + lastName;
  } else {
    return firstName;
  }
}

// 剩余参数
function push(array: any[], ...items: any[]) {
  items.forEach(function(item) {
    array.push(item);
  });
}
let a = [];
push(a, 1, 2, 3);
```

## 函数重载

同一个函数，不同的输入(参数类型不同或数量不同)会有不同的输出，这种情况即为重载。
TS 可以为函数设置重载签名，在 TS 中函数重载分为两部分：

1. 重载签名：针对不同的输入输出声明，至少包含两个
2. 实现签名：只有一个，是重载签名的具体实现，函数参数必须**兼容**所有重载签名

```TypeScript
type Types = number | string
function add(a:number,b:number):number;
function add(a: string, b: string): string;
function add(a: string, b: number): string;
function add(a: number, b: string): string;
function add(a:Types, b:Types) {
  if (typeof a === 'string' || typeof b === 'string') {
    return a.toString() + b.toString();
  }
  return a + b;
}
const result = add('first', ' second');
result.split(' ');
```
