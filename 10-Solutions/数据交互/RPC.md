# TODO:RPC

## Protocol Buffer

Protocol Buffer 是 Google 提供的一种数据序列化协议

## 数据序列化

程序运行过程中产生的变量对象是存储在内存中，程序运行结束后这些被占用的内存就会被回收，如果希望系统下次运行的时候可以继续使用这些变量对象就需要将变量存储到磁盘上。**将变量从内存中转变成可存储或可传输的过程称之为序列化**，序列化之后就可以进行存储和传输，将序列化后的对象读取到内存中称为**反序列化**。
常见的序列化方式有 JDK（不支持跨语言）、JSON、XML、Hessian、Kryo（不支持跨语言）、Thrift、Protostuff、FST（不支持跨语言）

## .proto 结构

```protobuf
syntax = "proto3"; // 版本 可选 默认为 proto2
package foo.bar; // 包名 可选
import “myproject/other_protos.proto”; // 引用其他proto

// 定义消息，即结构化数据
message messageName {
    // [字段规则] 字段类型 字段名 = 字段编号 [选项]
    string name = 1;
    int32 age = 2

}

// 定义服务，即RPC的通信方式
service SearchService {
    rpc Search (SearchRequest) returns (SearchResponse);
}
```

## 数据类型

## 开发工具

安装 VSCode 插件
[Proto Lint](https://marketplace.visualstudio.com/items?itemName=Plex.vscode-protolint)
[vscode-proto3](https://marketplace.visualstudio.com/items?itemName=zxh404.vscode-proto3)
