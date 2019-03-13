#PM2 Runtime
PM2 Runtime 是一个NodeJS应用程序进程管理器并且内置了负责均衡。
+ 自动重启，在程序崩溃和系统重启后会自动重新启动程序
+ 负载均衡：
+ 不停机更新：


##进程管理
+ 查看进程：`pm2 ls`
+ 启动/添加进程：`pm2 start <app.js>`
  + `--name`或`-n`设置进程名，默认进程名为启动脚本文件名
+ 删除进程：`pm2 delete <process_name>`
+ 停止进程：`pm2 stop <process_name>`
+ 重启进程：`pm2 restart <process_name>`
+ 重新加载：`pm2 reload <process_name>`

##日志管理
日志文件位置：`~/.pm2/logs`
查看实时日志：`pm2 log <process_name>`
清空日志：`pm2 flush`

日志文件拆分：`pm2 install pm2-logrotate`安装插件[pm2-logrotate](https://github.com/keymetrics/pm2-logrotate)

##负载均衡
集群模式(cluster mode)
pm2集群模式可以扩展你的应用程序使用尽可能多的CPU，不需要进行任何代码修改。
在使用集群模式之前需要注意你的应用程序应该是stateless的，没有使用保持在进程中的数据。
启用集群模式：只需要使用`-i`指定使用的CPU数量，`pm2 start app.js -i <number|max>`


##配置文件
使用配置文件可以更加便捷的管理进程
可以使用`pm2 init`命令生成配置文件`ecosystem.config.js`
``` JavaScript
module.exports = {
  apps : [{
    name: "app",
    instances: "max",
    script: "./app.js",
    env: {
      NODE_ENV: "development",
    },
    env_production: {
      NODE_ENV: "production",
    },
    // 日志配置
    output: './out.log',
    error: './error.log',
    log_type: 'json',
    merge_logs: true, // 集群模式下合并日志
    log_date_format: 'DD-MM-YYYY'
  }]
}
```
然后使用`pm2 start [file_paht]`直接运行
+ `--only <app_name>`：指定启动单个进程
+ `--env <env_name>`：指定使用的环境变量
+ `--update-env`：更新环境变量，**进程启动后的环境变量默认是不可变的**

##终端监控
启动：`pm2 monit`



##Docker集成