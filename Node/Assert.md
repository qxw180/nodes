#Assert
`assert`模块提供了一套简单的断言测试来测试不变量

+ `assert.ok(value[, message])`：测试value是否为true，不为true时会抛出一个带有`message`属性的`AssertionError`错误
    * value: <any>
    * message: <any>，当message为undefined时，抛出的错误会生成默认error message；
+ `assert(value[, message])`：`assert.ok()`方法的别名
+ `assert.equal(actual, expected[, message])`：使用`==`判断
+ `assert.strictEqual(actual, expected[, message])`：使用`===`判断
+ `assert.deepEqual(actual, expected[, message])`
+ `assert.deepStrictEqual(actual, expected[, message])`：
+ `assert.notEqual(actual, expected[, message])`：
+ `assert.notStrictEqual(actual, expected[, message])`：
+ `assert.notDeepEqual(actual, expected[, message])`：
+ `assert.notDeepStrictEqual(actual, expected[, message])`：
+ ``：
+ `assert.fail(message)`：抛出一个`AssertionError`
+ `assert.fail(actual, expected[, message[, operator[, stackStartFunction]]])`：抛出一个`AssertionError`
    * actual <any>
    * expected <any>
    * message <any>，当message为undefined时，错误消息为：actual operator expected
    * operator <string> Default: '!='
    * stackStartFunction <function> Default: assert.fail
+ `assert.ifError(value)`：当value为true时抛出错误
+ `assert.throws(block[, error][, message])`：
    * block <Function>
    * error <RegExp> | <Function>
    * message <any>
+ `assert.doesNotThrow(block[, error][, message])`：
