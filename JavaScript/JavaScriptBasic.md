#JavaScript基础

#####ECMAScript和JavaScript
> <small>ECMAScript是（European Computer Manufacturers Association）组织指定的JavaScript语言标准；JavaScript是对ECMAScript标准的实现</small>



#####网页加载流程

<small>1. 浏览器一边下载HTML网页，一边解析
2. 解析过程中发现`script`标签
3. 暂停解析，网页渲染的控制权转交给JavaScript引擎
4. 如果script标签引用了外部脚本，就下载该脚本，否则就直接执行
5. 执行完毕，控制权交还渲染引擎，恢复往下解析HTML网页</small>


#####defer属性

```
<script src="1.js" defer></script>
```

defer属性是让浏览器在DOM加载完成后再执行脚本；defer属性对内置脚本和动态生成的脚本不起作用；

<small>1. 浏览器开始解析HTML网页
2. 解析过程中，发现带有defer属性的script标签
3. 浏览器继续往下解析HTML网页，同时并行下载script标签中的外部脚本
4. 浏览器完成解析HTML网页，此时再执行下载的脚本
</small>


#####async属性

async属性可以保证脚本下载时不阻塞浏览器渲染；但是该属性无法保证脚本的正确执行属性，加班下载完成后直接执行；
async和defer属性同时使用的情况下defer不起作用；

<small>1. 浏览器开始解析HTML网页
2. 解析过程中，发现带有async属性的script标签
3. 浏览器继续往下解析HTML网页，同时并行下载script标签中的外部脚本
4. 脚本下载完成，浏览器暂停解析HTML网页，开始执行下载的脚本
5. 脚本执行完毕，浏览器恢复解析HTML网页</small>
