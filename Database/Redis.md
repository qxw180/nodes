#Redis
基于内存：
NoSQL，Not Only Sql，非关系型数据库：

##应用方向
+ 做数据缓存：
+ 队列操作：
+ 数据持久化：

##Redis Server
默认端口：6379
启动：`sudo redis-server <path-config>`
关闭：`redis-cli shutdown`
##Redis Cli
连接Redis Server：`redis-cli -h <ip> -p <port>`


#Redis Config


##命令
+ 获取全部key： `keys *`
+ 获取匹配key： `keys <match>?`
+ 删除key：`del <key1> [key2 key3 ...]`
+ 是否存在key： `exists <key>`
+ 重命名key： `rename <odd_key> <new_key>`
+ 设置过期时间： `expire <key> <time>`
+ 查看剩余时间： `ttl <key>`
+ 获取类型： `type <key>`

##数据类型
+ String：元素、可以是字符串、整数、浮点数，支持字符串操作和整数加减；
    * 赋值：`set <key> <value>`
    * 获取：`get <key>`
    * 获取设置：`getset <key> <value>`
    * 删除：`del <key>`
    * 自增：
        - 加1： `incr <key>`
        - 加n： `incrby <key> n`
    * 自减：
        - 减1： `decr <key>`
        - 减n： `decrby <key> n`
    * 字符串拼接：`append <key> <value>`
+ List：元素的序列，支持两端插入和弹出元素、修剪、查找或移除元素；
    * 左侧插入： `lpush <key> <value> [value2 value3 ...]`
    * 右侧插入： `rpush <key> <value> [value2 value3 ...]`
    * 查看列表： `lrange <key> <start_index> <end_index>` 
    * 左侧弹出： `lpop <key> <value>`
    * 右侧弹出： `rpop <key> <value>`
    * 查看长度： `llen <key>`
    * 删除固定值元素： `lrem <key> <del_number> <value>`
    * 修改元素： `lset <key> <index> <value>`
    * 插入元素： `linsert <key> <before|after> <match_value> <value>`
+ Set：不重复的元素，支持元素的插入和删除；
    * 添加：`sadd <key> <value> [value2 value3 ...]`
    * 删除：`srem <key> <value> [value2 value3 ...]`
    * 查看： `smembers <key>`
    * 查看个数： `scard <key>`
    * 是否存在： `sismember <key> <value>`
    * 差集运算： `sdiff <key1> <key2>`
    * 交集运算： `sinter <key1> <key2>`
    * 并集运算： `sunion <key1> <key2>`
+ Hash：Key:Value，Key为字符串，Value为元素，Key必须唯一，支持按照Key增加或删除；
    * 添加/修改 单个：`hset <hash_name> <key> <value>`
    * 添加/修改 多个：`hmset <hash_name> <key> <value> <key2> <value2> ...`
    * 获取单个：`hget <hash_name> <key>`
    * 获取多个：`hmget <hash_name> <key> <key2> ...`
    * 获取全部：`hgetall <hash_name>`
    * 删除： `hdel <hash_name> <key1> [key2 key3 ...]`
    * 判断是否存在： `hexists <hash_name> <key>`
    * 获取属性数量： `hlen <hash_name>`
    * 获取全部key： `hkeys <hash_name>` 
    * 获取全部value： `hvalues <hash_name>` 
+ Sort Set：Score:Vlaue的有序集合，Score为浮点数，Value为元素，支持集合插入和按照分数的范围查找；
    * 添加： `zadd <set_name> <score> <value>`
    * 查看： `zscore <set_name> <value>`
    * 查看个数：`zcard <set_name>`
    * 删除： `zrem <set_name> <value1> [value2 value3 ...]`
    * 范围查看：`zrang <set_name> <start end> [-withscores]`
    * 范围查看：`zrevrang <set_name> <start end> [-withscores]`
    * 排名范围删除： `zremrangebyrank <set_name> <start end >`
    * 分数范围删除： `zremrangebyscore <set_name> <start end >`


##多数据库
一个Redis服务可以创建最多16个数据库
数据库切换 `select <number>`
数据库之间移动key `move <key> <number>`

##数据持久化


##事物

##[ioredis](https://github.com/luin/ioredis)


