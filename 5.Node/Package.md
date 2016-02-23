#NodeJS Package
NodeJS程序的基本组成单位是js文件，一个js文件就是一个模块；但是复杂的模块为了方便维护要分成多个子模块，由多个子模块放在一个目录中，组成的大模块称做包；

##入口模块
一个包中的所有子模块中需要有一个模块作为包的导出对象，这个模块称为包的*入口模块*；

例：目录结构如下

```
- /home/user/workspace/lib/
	- school/
		teacher.js
		student.js
		main.js
```

其中`school`定义了一个包，`main.js`为入口模块，内容如下：

```
var teacher = require('./teacher')
var student = require('./student')

exports.create = function(name){
	return {
		name: name,
		student: student.create(),
		teacher: teacher.create()
	}
}
```

其他模块需要使用该包的时候，只需要`require('/home/user/workspace/lib/school/main')`引用即可；

但是通过模块名称导入包看起来不是那么舒服直观；
所有当包的入口模块名称为`index.js`的时候，以下两条语句是等价的：

```
require('/home/user/workspace/lib/school/index')
require('/home/user/workspace/lib/school')
```


##自定义入口模块
可以在包中创建一个`package.json`文件来定义入口模块
例：

```
{
	"name":"school",
	"main":"./main.js"
}
```

可以通过`require('/home/user/workspace/lib/school')`来加载模块；