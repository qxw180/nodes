# Nginx Location 配置

## 匹配规则

+ 第一有优先级`=`，路径绝对匹配
+ 第二优先级`^~`，以某路径开头
+ 第三优先级`~`，正则表达式
+ 第四优先级，无匹配符号

优先级相同，选择匹配程度最高的；优先级匹配程度均相同，选择最上面的一条。

``` lua
server {
    location = /path {
        echo "=/path"
    }
    location ^~ /path {
        echo "start with /path"
    }
    location ~ /\w {
        echo "match [a-zA-Z_]"
    }
    location / {
        echo "hello nginx"
    }
}
```
