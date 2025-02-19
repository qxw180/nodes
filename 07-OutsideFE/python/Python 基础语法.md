# Python 基础语法

## 数据类型

- 整数：Python 的整数没有大小限制
- 浮点数：Python 的浮点数也没有大小限制，但是超出一定范围就直接表示为 `inf`（无限大）
- 字符串：Python 字符串必须使用引号包裹，
  - 转义：如果字符串内有特殊字符则需要进行转义`'I\'m learning Python.'` 输出 I'm learning Python.
  - `r''`：表示引号内内部字符串默认不转义，`r'\\\t\\'`输出`\\\t\\`
  - 多行内容：使用前后三个单引号`'''...'''`可以实现多行子字符串，还可以和`r`一起使用`r'''...'''`
  - 字符串拼接
    - 占位替换：`'Hi, %s, you have $%d.' % ('Michael', 1000000)`
      - `%d`：整数
      - `%f`：浮点数
      - `%s`：字符串
      - `%x`：十六进制整数
    - `format()`：`'Hello, {0}, 成绩提升了 {1}%'.format('小明', 17.125)`
    - f-string：`f'你好，{name}'`
- 布尔值：只有`True`、`False`两种值
- 空值：`None`
- 数组：list 是一种有序的集合，可以随时添加和删除其中的元素
  - 声明：
    - `classmates = ['Michael', 'Bob', 'Tracy']`
    - `[x * x for x in range(1, 11)]` -> `[1, 4, 9, 16, 25, 36, 49, 64, 81, 100]`
    - `[x * x for x in range(1, 11) if x % 2 == 0]` -> `[4, 16, 36, 64, 100]`
  - 长度：`len(classmates)`
  - 取值：
    - 索引访问：第一个`classmates[0]`，最后一个`classmates[-1]`
    - 切片：
      - 取前 3 个元素：`L[0:3]`或`L[:3]`
      - 取后 10 个数：`L[-10:]`
      - 前 10 个数，每两个取一个：`L[:10:2]`
      - 所有数，每 5 个取一个：`L[::5]`
      - 原样复制一个 list：`L[:]`
  - 追加元素：`classmates.append('Adam')`
  - 插入元素：`classmates.insert(1, 'Jack')`
  - 删除末尾元素：`classmates.pop()`
  - 删除指定位置元素：`classmates.pop(1)`
  - 删除末尾元素：``
- 元组：tuple 和 list 非常类似，但是 tuple 一旦初始化就不能修改
  - 声明：`classmates = ('Michael', 'Bob', 'Tracy')`
  - 索引方式和数组一样
- 字典：dict 使用键-值（key-value）存储，具有极快的查找速度
  - 声明：`d = {'Michael': 95, 'Bob': 75, 'Tracy': 85}`
  - 赋值：`d['Adam'] = 67`
  - 取值：
    - `d['Adam']`
    - `d.get('Thomas', defaultVale)`
  - 是否包含：`'Thomas' in d`
  - 删除：`d.pop('Bob')`
- 集合：set 和 dict 类似，也是一组 key 的集合，但不存储 value。由于 key 不能重复，所以，在 set 中，没有重复的 key
  - 声明：`s = {1, 2, 3}`
  - 添加：`s.add(4)`
  - 删除：`s.remove(4)`
- 数据类型转换
  - `int('123')`
  - `float('12.34')`
  - `str(1.23)`
  - `bool(1)`
- 类型检查：`isinstance(x, (int, float))`

## 函数

```Python
# 默认参数
def enroll(name, gender, age=6, city='Beijing'):
    print('name:', name)
    print('gender:', gender)
    print('age:', age)
    print('city:', city)
```

```Python
# 可变参数：允许你传入0个或任意个参数，这些可变参数在函数调用时自动组装为一个tuple
def calc(*numbers):
    sum = 0
    for n in numbers:
        sum = sum + n * n
    return sum

# 把list或tuple的元素变成可变参数传进去
nums = [1, 2, 3]
calc(*nums)
```

```Python
# 关键字参数：允许你传入0个或任意个含参数名的参数，这些关键字参数在函数内部自动组装为一个dict
def person(name, age, **kw):
    print('name:', name, 'age:', age, 'other:', kw)

person('Bob', 35, city='Beijing')
# name: Bob age: 35 other: {'city': 'Beijing'}
person('Adam', 45, gender='M', job='Engineer')
# name: Adam age: 45 other: {'gender': 'M', 'job': 'Engineer'}

extra = {'city': 'Beijing', 'job': 'Engineer'}
person('Jack', 24, **extra)
# name: Jack age: 24 other: {'city': 'Beijing', 'job': 'Engineer'}
```

```Python
# 命名关键字参数：和关键字参数**kw不同，命名关键字参数需要一个特殊分隔符*，*后面的参数被视为命名关键字参数。
def person(name, age, *, city, job):
    print(name, age, city, job)

person('Jack', 24, city='Beijing', job='Engineer')
#Jack 24 Beijing Engineer
```

## 生成器

```Python
g = (x * x for x in range(10))

# next() 访问
next(g) # 0
next(g) # 1
next(g) # 2

# 迭代访问
for n in g:
    print(n)
```

```Python
# generator函数 实现斐波拉契数列
def fib(max):
    n, a, b = 0, 0, 1
    while n < max:
        yield b
        a, b = b, a + b
        n = n + 1
    return 'done'

for n in fib(6):
    print(n)

g = fib(6)
while True:
   try:
         x = next(g)
         print('g:', x)
     except StopIteration as e:
         print('Generator return value:', e.value)
         break
```
