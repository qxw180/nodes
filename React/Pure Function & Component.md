// TODO
##Pure Function
纯函数：不会对传入的参数进行修改，对相同的参数始终输出相同的结果。
在React中所有的Component都必须是像纯函数一样，不能对传入的props进行修改。

##Functional Components
Functional Components相比Class写法更加简练，可以用来实现Stete Less Components
``` JavaScript
function Welcome(props) {
    return <h1>Hello, {props.name}</h1>;
}
```