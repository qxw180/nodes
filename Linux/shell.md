#Shell Bash
Shell是命令解释器，是用户和计算机交互的接口，用户使用命令行和计算机进行交互，输入命令的程序就是shell。
Linux shell自带了一些简单命令，例如ls cd 等

Shell还是一个功能强大的编程语言，在Shell中可以直接调用Linux命令。


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
