#Compass

##进入控制台：`compass interactive`

##模块

###[Browser Support](http://compass-style.org/reference/compass/support/)

> 模块导入：`@import "compass/support"`
> Browser Support可以配置支持的浏览器和版本；Compass会根据配置生成特定的css

`$supported-browsers:browsers()`
> <small>支持浏览器列表
> 默认值：`browsers()`全部浏览器
> 设置：$supported-browsers:chrome safari ...</small>

`$browser-minimum-versions:("chrome": null, "firefox": null, "ie": null, "safari": null, "opera": null)`
> <small>浏览器支持最低版本
> 默认值：可以使用`browser-versions($browser)`查看
> 设置：`$browser-minimum-versions:("ie": "8", ...)`</small>


