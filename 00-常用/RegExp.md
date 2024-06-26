# [正则表达式](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Regular_Expressions)

> 正则表达式就是用来描述字符串规则的代码；
> JavaScript 的正则表达是对象是`RegExp`，可以使用正则表达式对象进行字符串验证、匹配、替换等操作；

## 正则元字符

- `.`：匹配除换行符以外任意字符
- `\d`：匹配一个数字，等价于`[0-9]`
- `\D`：匹配非数字，等价于`[^0-9]`
- `\w`：匹配一个数字、字母或下划线，等价于`[a-z0-9A-Z_]`
- `\W`：匹配非`\w`，等价于`[^a-z0-9A-Z_]`
- `\s`：匹配任意空白符（包括空格、Tab、换行符等）
- `\S`：匹配非空白
- `\t`：匹配水平制表符(tab)
- `\n`：匹配换行符(linefeed)
- `\r`：匹配回车符(carriage return)

## 字符转义 `\`

> 一些字符在正则表达式中有着特殊的意义，例如元字符`.`和`\`等，
> 如果要匹配元字符本身就需要进行转义。这时可以使用斜线`\`来取消这些字符的特殊意义；
> 例如：`\.`匹配`.`；`\/`匹配`/`；`\\`匹配`\`；

## 正则边界符

- `^`：匹配字符串开始
- `$`：匹配字符串结束
- `\b`：匹配零宽度单词边界，如一个字母和一个空格之间；
- `\B`：匹配零宽度非单词边界，如一个字母和一个字母之间；

## 正则重复

> 我们想写一个电话号码正则`0\d\d-\d\d\d\d\d\d\d\d`，这样实在太麻烦复杂，
> 可以使用正则重复表达式进行简化`0\d{2}-\d{8}`

- `*`：重复零次或多次
- `+`：重复一次或多次
- `?`：重复零次或一次
- `{n}`：重复 n 次
- `{n,}`：重复 n 次或更多次
- `{n,m}`：重复 n 到 m 次

## 正则集合 `[]` `[^]`

> 元字符`\d`表示一个数字，我们也可以使用集合`[0-9]`的种形式实现匹配一个字符
> 我们可以利用自定义集合指定一个范围
> `[^0-9]` 集合包含`^`表示非范围内；

- `[xyz]`：匹配`x` `y` `z`中的任意一个
- `[a-z]`：匹配 a-z 中任意一个字母
- `[^a-z]`：匹配非 a-z 的任意一个字符

## 正则分支条件 `|`

## 正则分组 `()`

---

## JavaScript RegExp

### 创建正则

JavaScript 可以通过 `/pattern/flags`的形式或`RegExp(pattern[,flags])`构造函数创建一个正则表达式对象；

- `pattern`：正则表达式文本
- `flags`：匹配模式，可以是以下参数的组合
  - `g`：全局匹配，每次匹配剩余的
  - `i`：忽略大小写
  - `m`：多行匹配
  - `y`：粘连修饰符，剩余的第一个开始匹配

### RegExp 对象方法

- `reg.compile(pattern[,flags])`：编译正则表达式；
- `reg.exec(string)`：检索字符串中的正则表达式匹配，返回值为一个数组或 null，；
- `reg.test(string)`：检查字符串是否与正则表达式匹配，返回布尔值；

### String RegExp 相关方法

- `str.search(reg)`：返回 str 中与 reg 匹配的字符串的起始位置，对大小写敏感，不进行全局匹配，没有匹配反悔-1；
- `str.search(reg)`：返回 str 中域 reg 匹配内容数组，是否全局匹配取决于 reg 中的全局标志 g；
- `str.replace(reg/str,replacement)`：返回一个新字符串，新字符串为使用 replacement 替换 str 中和 reg 匹配的内容；
- `str.split(separator,howmany)`：将字符串按照 separator 切分成数组
  - separator：字符串或 reg；
  - howmany：返回数组最大长度；

### 示例代码

```js
var regPhone = /^\d{3}\-\d{3,8}$/;
var regPhone2 = new RegExp("/^d{3}-d{3,8}$/");

var regJS = /[j|J]ava[s|S]cript/g;
var regJS2 = new RegExp("/[j|J]ava[s|S]cript", "g");

reg.test("reg str"); // 测试字符串是否符合表达式
`reg str`.split(reg); // 字符串切分
reg.exec("reg str"); // 会返回一个`Array`，第一个元素始终是原始字符串本身，后面的字符串表示匹配成功的子串；匹配失败返回`null`；
```

## 常用正则表达式

## 参考

[RegExp](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp)
[JavaScript RegExp 对象](http://www.w3school.com.cn/jsref/jsref_obj_regexp.asp)
