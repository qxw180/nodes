#Process
`process`对象是一个全局变量，用来获取当前Node.js进程的信息、控制当前Node.js进程；

##Process Events
`process`是一个`EventEmitter`的实例

+ `beforeExit`：
+ `disconnext`：
+ `exit`：
+ `message`：
+ `rejectionHandled`：

##Process 属性
+ `process.argv`：Array，返回通过命令行传递的参数列表，
    * 第一个参数默认为`process.execPath`
    * 第二个参数默认为执行的JS文件路径
