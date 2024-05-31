# H5 唤醒 APP

H5 页面通常承担的主要责任就是引流，引流主要有两种形式：

1. 拉新：引导未安装 APP 用户安装 APP，增加用户量。
2. 拉活：引导已安装 APP 用户打开 APP 进行消费，提升用户粘性。

H5 页面唤起 APP 的主要技术方案：

1. URL Scheme（通用）
2. Universal Link（IOS)
3. wx-open-launch-app（微信）

## URL Scheme

操作系统中有很多私密信息，为了保证信息的安全，操作系统有沙箱机制，应用只能访问自己沙箱内的资源。
沙箱机制保证了数据的安全，同时也阻碍了应用直接的信息共享，URL Scheme 是一种页面跳转协议，同时可以通过参数传递数据。URL Scheme 一般由协议名、路径、参数组，规范成如下：

`[scheme:][//authority][path][?query][#fragment]`

APP 安装后会向操作系统注册一个 Scheme，操作系统接受到请求就会调起匹配的程序进行处理。

我们常规的请求发送基本都可以用来触发 APP Scheme，例：

1. `<a>`标签链接跳转
2. 直接通过`window.location.href`触发
3. 通过 `iframe` 触发

例：呼叫 10086`window.location.href = 'tel://10086';`

优点：

1. 兼容性好
2. 不要求用户主动触发

缺点：

1. 体验问题
   1. 系统会弹出提示要求用户进行二次确认
   2. 无法准确判断是否唤起成功，一般通过`visibilitychange`配合定时器进行判断
      1. 未安装用户在点击后一段时间内无响应，然后跳转到 APP 下载页
      2. 用户超过定时器时间未进行二次确认，在确认后无论是否允许都会跳转到 APP 下载页
2. 容易被拦截，在微信、百度等 APP 内通常会进行拦截

```js
const extInfo = `ultimate://native/func/core/evokePage?params=${encodeURIComponent(
  JSON.stringify({
    requestUrl: jumpAppUrl,
    staffType: "15",
    isNavigationBar: false,
  })
)}`;

let timer = null;
const jumpAppInH5 = () => {
  // 如果是微信浏览器且不支持唤起app，那么展示引导浮层
  if (isWx() && (!isAvailLaunchApp() || !initWxConfigSuccess)) {
    return handleBrowser();
  }

  // 发送请求，触发打开APP
  window.location.href = extInfo;
  // 5s之后跳转到下载页
  if (timer) clearTimeout(timer);
  timer = setTimeout(() => {
    handleDownloadApp();
  }, 3000);

  // 跳转app之后禁止再跳转中间页
  document.addEventListener("visibilitychange", () => {
    clearTimeout(timer);
  });
};
```

## Universal Link

Universal Link 是 IOS9(2015 年 6 月发布) 中新增的功。
它可以直接通过 https 协议的链接来打开 APP。

在 APP 中注册自己要支持的域名，系统捕捉到需求后会直接呼起注册的 APP，如果没有 APP 注册对应域名则直接使用浏览器打开。

优点：从系统层面体验更好

- 唤端时没有弹窗提示是否打开，提升用户体验
- 对未安装 APP 的用户也会使用浏览器打开页面，不影响用户浏览体验

缺点：

- 只支持 IOS 系统
- 需要用户主动触发（点击）
- 不能实现呼端失败跳转 APP 下载页面（一定会跳离当前页面）

Android 提出了类似 Universal Link 的 App Link 和 Chrome Intents，在国内支持情况较差应用较少。

## wx-open-launch-app

在微信环境下，非白名单列表内的 URL Scheme 呼端请求都会被拦截，但是微信在国内环境是绝对的头部流量入口，是不能够放弃的。

微信提供开放标签`wx-open-launch-app`可以实现在微信内通过 H5 唤醒 APP。

- 页面接入 JS-SDK
  - 步骤一：域名绑定
    - 配置入口：微信公众平台-设置与开发-公众号设置-功能设置-JS 接口安全域名
    - 需要在配置的域名服务器部署**平台提供的验证文件**
  - 步骤二：引入 JS-SDK 文件，在页面使用 SDK 之前需要先引入
  - 步骤三：通过`wx.config`接口注入权限验证配置
    - 注意使用前端路径实现的 SPA 应用需要在 URL 变化后重新验证配置
    - 权限验证需要签名，需要后端能力
  - 监听`wx.ready()`和`wx.error()`回调实现后续业务功能
- App 必须接入微信 OpenSDK

```HTML
<script src="//res2.wx.qq.com/open/js/jweixin-1.6.0.js"></script>
<script>
  wx.config({
    debug, // 开启调试模式,调用的所有 api 的返回值会在客户端 alert 出来，若要查看传入的参数，可以在 pc 端打开，参数信息会通过 log 打出，仅在 pc 端时才会打印。
    appId: "wxa739d6f10b640ed3", // 58同城家庭服务
    timestamp, // 必填，生成签名的时间戳
    nonceStr, // 必填，生成签名的随机串
    signature, // 必填，签名
    jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage"],
    openTagList: ["wx-open-launch-app", "wx-open-launch-weapp"],
  });
</script>

<wx-open-launch-app id="launch-btn" appid="your-appid" extinfo="your-extinfo">
  <script type="text/wxtag-template">
    <style>.btn { padding: 12px }</style>
    <button class="btn">App内查看</button>
  </script>
</wx-open-launch-app>
<script>
  var btn = document.getElementById('launch-btn');
  btn.addEventListener('launch', function (e) {
    console.log('success');
  });
  btn.addEventListener('error', function (e) {
    console.log('fail', e.detail);
  });
</script>
```

踩过的坑和注意点：

1. 必须是通过卡片形式进入页面
2. 路径：同一个 url 仅需调用一次，对于变化 url 的 SPA 的 web app 可在每次 url 变化时进行调用
3. `<wx-open-launch-app>`标签内按钮尺寸及位置

## OpenLaunchApp

我们的主要 APP 唤醒方式是通过微信传播，需要同时支持浏览器和微信环境内 APP 呼起。另外在 APP 唤醒失败的时候跳转到 APP 下载页面等兜底逻辑。

我们通常需要判断当前环境是否支持`wx-open-launch-app`，根据判断解决

```HTML
<div class="demand-btn-green" v-if="isAvailLaunchApp && initWxConfigSuccess">
    打开APP立即接单
    <wx-open-launch-app
        id="launch-btn"
        appid="wxa304532bd8d91498"
        @ready="handleReady"
        @error="handleError"
        @launch="handleLaunch"
        :extinfo="extinfo"
        >
        <component v-bind:is="'script'" type="text/wxtag-template">
          <!-- ？？？？ -->
          <div class="wx-btn" style="width: 6.9rem; height: 50px;"></div>
        </component>
    </wx-open-launch-app>
</div>
<div class="demand-btn-green" v-else @click="jumpAppInH5">打开APP立即接单</div>

<script>
const {
    extinfo,
    handleDownloadApp,
    handleLaunch,
    handleReady,
    handleError,
    jumpAppInH5
} = launchAppUtil(jumpAppUrl, () => {
    initWxConfigSuccess.value = false;
});
</script>
```

```HTML
<OpenLaunchApp :downloadAppOnError="true" :launchHandler="handleOpenAppClick">
    <div class="btn-open-app" @click="handleOpenAppClick">打开APP查看更多</div>
</OpenLaunchApp>

<style>
.btn-open-app {
    width: 100%;
    height: 90px;
    margin: 15px 0px 15px;
    line-height: 90px;
    border-radius: 12px;
    font-size: 32px;
    font-weight: 500;
    text-align: center;
    position: relative;
    color: rgba(255, 255, 255, 1);
    background-color: rgba(0, 195, 168, 1);
}
</style>
```

```HTML
<template>
    <div class="root-wx-launch" v-if="isAvailLaunchApp && initWxConfigSuccess">
        <!-- 使用插槽 插入按钮 -->
        <slot />
        <wx-open-launch-app
            class="launch-btn"
            appid="wxa304532bd8d91498"
            @ready="handleReady"
            @error="handleError"
            @launch="handleLaunch"
            :extinfo="extinfo"
        >
            <component v-bind:is="'script'" type="text/wxtag-template">
                <!-- 元素必须有尺寸，否则无法触发呼端，但不要求元素被点击才能触发 -->
                <div class="wx-btn" style="width: 100%; height: 50px"></div>
            </component>
        </wx-open-launch-app>
    </div>
    <div v-else @click="jumpAppInH5"><slot /></div>
</template>
<script setup>
import { ref } from 'vue';

import { isAvailLaunchApp as isAvailLaunchAppCheck } from '@/utils/osUtil';
import launchAppUtil from '@/utils/launchAppUtil';

const isAvailLaunchApp = isAvailLaunchAppCheck();
const initWxConfigSuccess = ref(true);

const {
    extinfo,
    handleReady,
    jumpAppInH5,
    handleDownloadApp,
    handleError: defaultErrorHandler,
} = launchAppUtil(
    props.launchUrl,
    () => {
        initWxConfigSuccess.value = false;
    },
    // 避免SPA前端路由调整导致微信配置验证失败
    location.href.split('#')[0],
);

const handleLaunch = (e) => {
    console.log('launch success', e.detail);
    if (typeof props.launchHandler === 'function') {
        props.launchHandler();
    }
};

const props = defineProps({
    launchUrl: {
        type: String,
        required: false,
        default: window.location.href,
    },
    // 呼端异常是是否引导到APP下载，默认行为打开默认浏览器引导
    downloadAppOnError: {
        type: Boolean,
        required: false,
        default: false,
    },
    // 呼端成功回调，可以用啦处理埋点等需求
    launchHandler: {
        type: Function,
        required: false,
    },
});

const handleError = (error) => {
    if (props.downloadAppOnError) {
        handleDownloadApp();
    } else {
        defaultErrorHandler(error);
    }
};
</script>
<style scoped>
/* 根元素相对定位，根元素尺寸又通过插槽传入的元素撑起 */
.root-wx-launch {
  position: relative;
}
/* 通过绝对定位，使wx-open-launch-app尺寸覆盖插入元素 */
.launch-btn {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    z-index: 99;
    overflow: hidden;
}
</style>
```
