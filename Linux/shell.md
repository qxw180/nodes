#Shell
Shell是命令解释器，是用户和计算机交互的接口，用户使用命令行和计算机进行交互，输入命令的程序就是shell。
Linux shell自带了一些简单命令，例如ls cd 等

Shell还是一个功能强大的编程语言，在Shell中可以直接调用Linux命令。

Shell主要有两种语法：
一类是Linux的Bourne Shell，包括：sh ksh Bash(标准Shell) psh zsh(最好用的)等，
另一类是Unix的C Shell，包括：csh tcsh等

Bssh是Linux的标准Shell

##Shell脚本执行方法
方式一：赋予执行权限，直接运行
`chmod 755 hello.sh`
`./hello.sh`

方式二：通过Bash调用执行脚本：`bash hello.sh`


##Shell脚本编写

``` sh
#!/bin/bash
#The first program
echo -e "hello world"
```


##多命令执行
+ 顺序执行`;`：`<命令1>;<命令2>`
+ 逻辑与`&&`：`<命令1>;<命令2>`
+ 逻辑或`||`：`<命令1>;<命令2>`

##输出重定向
标准输入输出
标准输出     键盘     0 /dev/stdin 
标准输出     显示器   1  /dev/stdout
标准错误输出  显示器   2 /dev/stderr

输出重定向就是把默认输出到屏幕的信息输出到其它位置，一般为输出到屏幕

+ `命令 > 文件`：把命令的正确输出以覆盖的方式输出到文件
+ `命令 >> 文件`：把命令的正确输出以追加的方式输出到文件
+ `错误命令 2>文件`：把命令的错误输出以覆盖的方式输出到文件
+ `错误命令 2>>文件`：把命令的错误输出以追加的方式输出到文件
+ `命令 > 文件 2>&1` `命令 &> 文件`：以覆盖的方式把命令的正确和错误输出都保存到同一个文件
+ `命令 >> 文件 2>&1` `命令 &>> 文件`：以追加的方式把命令的正确和错误输出都保存到同一个文件
+ `命令>>文件 2>>文件2`：把命令的正确和错误输出保存到不同文件中
+ `命令 &> /dev/null`：把命令的输出扔掉，不显示到屏幕中