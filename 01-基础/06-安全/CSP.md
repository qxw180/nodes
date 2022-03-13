# TODO:内容安全策略 CSP

CSP(Content-Security-Policy)可以使用 HTTP Header `Content-Security-Policy`配置
也可以在页面使用`<meta>`标签配置`<meta http-equiv="Content-Security-Policy" content="default-src 'self'; img-src https://*; child-src 'none';">`
