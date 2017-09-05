#MongoDB基础
> 不支持table join(表关联 )

##基本概念
+ `数据库 database`：数据库
+ `集合 collection`：数据库表，相当于table
+ `文档 document`：数据记录行，相当于row
+ `域 field`：数据字段，相当于column
+ `索引 index`：索引
+ `主键 primary key`：主键，MongoDB自动将_id字段设置为主键

##数据库 database
> 一个MongoDB中可以建立多个数据库
> 单个MongoDB实例可以容纳多个独立的数据库，每一个都有自己独立的集合和权限，不同的数据库也放在不同的文件中
> MongoDB默认连接到`test`数据库

——>数据库命名
+ 不得含有' '（空格)、.、$、/、\和\0 (空宇符)。
+ 应全部小写。
+ 最多64字节。

——>保留数据库
+ `admin`： 权限的角度来看，这是"root"数据库。要是将一个用户添加到这个数据库，这个用户自动继承所有数据库的权限。一些特定的服务器端命令也只能从这个数据库运行，比如列出所有的数据库或者关闭服务器。
+ `local`: 这个数据永远不会被复制，可以用来存储限于本地单台服务器的任意集合
+ `config`: 当Mongo用于分片设置时，config数据库在内部使用，用于保存分片的相关信息。

——>常用命令

+ 查看所有数据库：`show dbs`
+ 查看当前连接数据库：`db`
+ 切换/连接到数据库：`use <dbname>`
+ 创建数据库：MongoDB实际不需要创建数据库，MongoDB会在需要的时候自动创建数据库
+ 删除数据库：`db.dropDatabase()`

+ 查看数据库中的表：`show tables`
+ 创建表/集合：MongoDB实际不需要创建数据库表(collection)，MongoDB会在需要的时候自动创建数据库表(collection)
+ 删除表/集合：`db.<collection-name>.drop()`

+ 插入数据：`db.<collection-name>.insert({<jsonData>})`
	* 插入数据MongoDB会自动生成`_id`字段，也可以手动指定但是不能重复
+ 查询数据：`db.<collection-name>.find()`
	* 查询数据条数：`db.<collection-name>.find().count()`
	* 分页、排序操作：`db.<collection-name>.find().skip(n).limit(n).sort(sortJson)`
+ 更新数据：`db.<collection-name>.update(<filterJson>,<updateJson>,updateInsert,updateAll)`
	* 全部更新：`db.<collection-name>.update(<filterJson>,<updateJson>)`，updateJson数据会完全覆盖匹配document
	* 部分更新：`db.<collection-name>.update(<filterJson>,{$set:<updateJson>})`，值更新updateJson中的field，原有field不便
	* 插入更新：`db.<collection-name>.update(<filterJson>,<updateJson>,true)`，当更新不存在数据自动插入一条新数据
	* 更新多条：`db.<collection-name>.update(<filterJson>,<updateJson>,false,true)`，MongoDB为了防止误操作默认值更新第一条匹配数据，设置第四个参数ture可以更新全部
+ 数据删除：`db.<collection-name>.remove({filterJson})`，MongoDB不允许不传入条件的删除，与更新不同删除会把匹配的document全部删除

+ 查询索引：`db.<collection-name>.getIndexes()`
+ 创建索引：`db.<collection-name>.ensureIndex({field:<sortCode>})`
	* `sortCode`为1正向排序
	* `sortCode`为-1逆向排序

##集合 collection
> 集合相当于关系型数据库的表(table)，
> 集合没有固定的结构，

##文档 document
> MongoDB文档相当于关系型数据库的一行数据
> MongoDB的文档是一个键值对，MongoDB的文档不需要设置相同的字段，相同的字段也不需要相同的数据类型；
> 
> 
