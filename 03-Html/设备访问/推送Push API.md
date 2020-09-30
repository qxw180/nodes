# [Push API](https://developer.mozilla.org/en-US/docs/Web/API/Push_API)

推送功能依赖 Service Worker，在 Service Worker 内可以使用`PushManager.subscribe()`订阅推送，添加事件监听`ServiceWorkerGlobalScope.onpush`接收推送消息，使用`ServiceWorkerRegistration.showNotification().`推送消息给用户。
`PushSubscription`包含了推送消息的全部信息，在信息的推送和接收过程中需要使用秘钥进行加密和解密。
