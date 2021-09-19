# ESM

ES Module 是官方的模块化规范，一个文件就是一个模块，该文件内的所有变量外部无法获取，如果希望外部能够读取模块内部的某个变量，就必须使用`export`关键字导出，一个模块如果需要使用其它模块的变量，就需要使用`import`导入被引用模块`export`的变量；

## 命名导出

```JavaScript
// profile.js，输出三个变量
export const firstName = "Michael";
export const lastName = "Jordan";
export const year = 1958;

// 也可以写成以下形式
const firstName = "Michael";
const lastName = "Jordan";
const year = 1958;
export {firstName, lastName, year};

// 也支持输出函数或者类
export function say(){
  return "Hello";
}

// 可以使用关键字as重命名输出变量
export {
  firstName,
  familyName as lastName,
  year
};
```

`export`命令规定的是对外的接口（即对外变量名），必须与模块内部的变量建立一一对应关系。

```JavaScript
// 报错
export 1;

// 报错，通过变量还是直接输出1，不是接口
const m = 1;
export m;

// 写法一
export const m = 1;

// 写法二
const m = 1;
export {m};

// 写法三
const n = 1;
export {n as m};
```

## 导入 import

使用`import`命令可以加载模块，并接受模块中通过`export`导出的内容；

```JavaScript
import {firstName, lastName, year} from './profile';

function setName(element) {
  element.textContent = firstName + ' ' + lastName;
}

// 同样也可以使用as设置引用变量别名
import { lastName as familyName } from './profile';


// 命名空间引入：使用`*`导入整个模块到一个对象，通过这个对象引用模块`export`的变量
import * as jordan from './profile';
console.log(jordan.firstName);// Michael
```

**注意**：`import`具有提升效果，会提升到整个模块的顶部，首先执行；

```JavaScript
foo();// 可以正确执行，不会报错；
import { foo } from 'my_module';
```

**仅运行**：某些情况我们需要运行其它模块的代码，但是并不需要引入其导出的的变量，我们可以使用写法`import 'lodash';`，被导入模块的全局代码会被运行，如果多次加载只会执行一次。

## 默认导出

以上的例子中使用`import`命令时用户需要知道加载的变量名或函数名，这个体验很不好，通过`export default`命令可以指定模块的默认输出

```JavaScript
// export-default.js
export default function () {
  console.log('foo');
}

// import-default.js
import customName from './export-default';
customName(); // 'foo'
```

使用`import`命令加载 `default` 输出是不需要使用大括号的；
`export default`命令用于指定模块的默认输出。一个模块只能有一个默认输出，因此`export default`命令只能使用一次。所以，`import`命令后面才不用加大括号，因为只可能对应一个方法。

本质上，`export default`就是输出一个叫做 `default` 的变量或方法，然后系统允许你为它取任意名字。所以它后面不能跟变量声明语句。

```JavaScript
// 正确
export const a = 1;

// 正确
const a = 1;
export default a;

// 错误
export default const a = 1;
```

## import 函数

上面介绍的`import`语句可以导入其它模块`export`的变量，这是一种静态导入，是在代码初始化的时候导入。
`import()`函数可以在代码执行加载的模块，实现动态加载，动态导入例：

```JavaScript
(async () => {
  if (somethingIsTrue) {
    const { default: myDefault, foo, bar } = await import('/modules/my-module.js');
  }
})();
```

## 参考

- [import](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/import)
