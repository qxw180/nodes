# TypeScript

## 语法

### 变量

#### 基础类型

```TypeScript
let isDone: boolean = false; // 布尔值
let decLiteral: number = 6; // 数字
let name: string = "bob"; // 字符串
function alertName(): void { // 空值
    alert('My name is Tom');
}

// Null 和 Undefined
let u: undefined = undefined;
let n: null = null;
//undefined 和 null 是所有类型的子类型。也就是说 undefined 类型的变量，可以赋值给 number 类型的变量，以下语句合法
let u: undefined;
let num: number = u;
```

#### 任意值 any： 任意值允许在程序运行过程中改变变量的类型

```TypeScript
let myFavoriteNumber: any = 'seven';
myFavoriteNumber = 7;

// 变量声明时未指定类型，会被识别为任意值类型
let something;
something = 'seven';
something = 7;

// 声明时未指定类型，那么 TypeScript 会依照类型推论（Type Inference）的规则推断出一个类型。
let myFavoriteNumber = 'seven';
myFavoriteNumber = 7; // 编译时报错
// 相当于
let myFavoriteNumber: string = 'seven';
myFavoriteNumber = 7;

```

#### 联合类型：表示值可以为多种类型中的一种

```TypeScript
let myFavoriteNumber: string | number;
myFavoriteNumber = 'seven';
myFavoriteNumber = 7;
// 只能访问此联合类型的所有类型里共有的属性或方法：
function getLength(something: string | number): number {
    return something.toString(); // OK
    return something.length; // 编译时报错
}
// 联合类型的变量在被赋值的时候，会根据类型推论的规则推断出一个类型：
let myFavoriteNumber: string | number;
myFavoriteNumber = 'seven';
console.log(myFavoriteNumber.length); // 5
myFavoriteNumber = 7;
console.log(myFavoriteNumber.length); // 编译时报错
```

#### 数组类型

```TypeScript
let list: number[] = [1, 2, 3];
let list: Array<number> = [1, 2, 3]; // 数组泛型

// 元组 Tuple，表示已知元素数量和类型的数组
let x: [string, number] = ['hello', 10];
// 当添加越界的元素时，它的类型会被限制为元组中每个类型的联合类型：
tom.push(true); // 编译报错，因为元组元素不包含boolean类型
```

#### 对象类型-接口 interface

typeScript 中使用接口来定义对象的类型

```TypeScript
interface Person {
    readonly id: number; // 只读类型
    name: string;
    age?: number; // 可选属性
    [propName: string]: any; // 任意属性，
}

let tom: Person = {
    name: 'Tom',
    age: 25，
    gender: 'male'
};
```

#### 函数类型

```TypeScript
// 函数声明
function sum(x: number = 0, y: number = 0): number {
    return x + y;
}

// 函数表达式
let mySum: (x: number, y: number) => number = function (x: number, y: number): number {
    return x + y;
};

// 可选参数
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

// 重载， 根据参数的不同实现不同的功能
function reverse(x: number): number;
function reverse(x: string): string;
function reverse(x: number | string): number | string {
    if (typeof x === 'number') {
        return Number(x.toString().split('').reverse().join(''));
    } else if (typeof x === 'string') {
        return x.split('').reverse().join('');
    }
}
```

#### 类型断言

类型断言可以指定一个值的类型`<类型>值`或`值 as 类型`

```TypeScript
function getLength(something: string | number): number {
    if (something.length) { // 编译报错，联合类型在不确定变量具体类型的时候只能访问联合类型的共有属性
        return something.length;
    } else {
        return something.toString().length;
    }
}

function getLength(something: string | number): number {
    if ((<string>something).length) { // 断言something未string类型
        return (<string>something).length;
    } else {
        return something.toString().length;
    }
}
```

#### 内置对象

```TypeScript
// ECMAScript 的内置对象 Boolean、Error、Date、RegExp 等。
let b: Boolean = new Boolean(1);
let e: Error = new Error('Error occurred');
let d: Date = new Date();
let r: RegExp = /[a-z]/;

// DOM 和 BOM 的内置对象 Document、HTMLElement、Event、NodeList 等。
let body: HTMLElement = document.body;
let allDiv: NodeList = document.querySelectorAll('div');
document.addEventListener('click', function(e: MouseEvent) {
  // Do something
});
```

### 声明文件

### 字符串字面量类型，用来约束字符串变量只能为固定的值

```TypeScript
type EventNames = 'click' | 'scroll' | 'mousemove';
function handleEvent(ele: Element, event: EventNames) {
    // do something
}

handleEvent(document.getElementById('hello'), 'scroll');  // 没问题
handleEvent(document.getElementById('world'), 'dbclick'); // 报错，event 不能为 'dbclick'
```

### 枚举

```TypeScript
enum Direction {
    Up,
    Down,
    Left,
    Right,
}
console.log(Direction.Up); // 0
console.log(Direction[0]); // Up
```

### Class

```TypeScript
interface IAnimal {
    run(): viod;
}

class Animal implements IAnimal{
    private id: number; // 私有属性
    readonly name: string; // 只读属性
    static categories: string[] = ['animal']; // 静态属性
    static isAnimal(instance) { // 静态方法
        return instance instanceof Animal;
    }
    constructor(name: string) {
        this.name = name;
    }
    run() {
        console.log(`${this.name} running`)
    }
}
```

### 泛型

在使用的时候，动态的确定类型。

```TypeScript
function echo<T>(input: T): T {
    return input;
}

function swap<T, U>(tuple:[T,U]): [U, T] {
    return [tuple[1], tuple[0]]
}

// 泛型约束
interface IWithLength {
    length: number;
}
function echoWithLength<T extends IWithLength>(arg: T): T {
    console.log(arg.length);
    return arg;
}

// 泛型用例 - Class
class Queue<T> {
    private data = [];
    push(item: T) {
        return this.data.push(item)
    }
    pop(): T {
        return this.data.shift();
    }
}
const queue = new Queue<number>();
queue.push(1);
queue.push('123'); // 会报错

// 接口泛型用例-对象
interface IKeyPair<T, U> {
    key: T;
    value: U;
}
let key1: IKeyPair<string, number> = { key: 'abc', value: 123};

// 接口泛型用例-函数
interface IPlus<T> {
    (a: T, b: T): T;
}
function plusNum(a: number, b: number): number {
    return a + b;
}
function plusString(a: string, b: string): string {
    return a + b;
}
const a: IPlus<number> = plusNum;
const b: IPlus<string> = plusNum;
```
