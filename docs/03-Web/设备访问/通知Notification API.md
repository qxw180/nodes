# [Notification API](https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API)

使用 Notification API 可以发起**系统通知**(系统级别，页面及时切换或切换到其它 APP 也可以触发)。
Notification API 只能在 HTTPS 页面使用，而且可以在 Web Workers 中使用，另外在 ServiceWorker 会添加一些功能。

使用 Notification API 通常包括两部：

1. 获取用于授权，允许在当前域名展示系统通知，为了避免滥用，要求必须由用户手势(例如按钮点击)触发触发授权申请。
2. 发起系统通知

## [API](https://developer.mozilla.org/en-US/docs/Web/API/Notification)

静态属性/方法

- `Notification.permission`：获取授权状态
  - `default`：未向用户发起过授权申请
  - `granted`：用户已经授权
  - `denied`：用户已经拒绝
- `Notification.requestPermission()`：发起用户授权，新版 API 返回一个 Promise 对象，resolve 值为`Notification.permission`值。旧版本 API 需要传入一个 callback 函数。

[构造函数](https://developer.mozilla.org/en-US/docs/Web/API/Notification/Notification)

- `new Notification(title, options)`：通知构造函数，返回通知实例
  - `title`：标题
  - `options`
    - `body`：
    - `icon`：
    - `tag`：

实例方法/属性

- `notification.close()`： 关闭通知

事件监听

- `notification.on[click|close|error|show]`：notice 事件监听，也可以使用`addEventListener()`添加

## DEMO

```JavaScript
window.addEventListener('load', function () {
    if (window.Notification && Notification.permission !== "granted") {
        // 发起用户授权
        Notification.requestPermission(function (status) {
            if (Notification.permission !== status) {
                Notification.permission = status;
            }
       });
       btn.addEventListener('click', function() {
            // 发起通知
            new Notification("Hi!");
       })
    }
})
```
