#Viewport

    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no"/>

+ `width`: viewport宽度
    * Number
    * device-width
+ `height`: viewport高度
    * Number
    * device-height
+ `initial-scale`: 初始缩放比例
+ `maximum-scale`: 最大缩放比例
+ `minimum-scale`: 最小缩放比例
+ `user-scalable`: 是否允许用户缩放
    * yes
    * no

##Viewport的由来
因为移动设备的屏幕较小，传统web页面在移动设备会出现横向滚动条，在使用流动布局的页面上布局会被压乱；
苹果为解决这个问题设计了viewport，viewport就是一个虚拟窗口，宽度大概为980px(不同的厂商的设备略有区别)；
页面在这个虚拟窗口(layout viewport)上进行CSS渲染，然后再视觉窗口(visual viewport)通过拖拽和缩放就可以满足大部分网页的显示需求；

##现在的viewport
现在绝大部分公司都针对移动设备进行单独设计；
那么在默认的viewport宽度上显示这些网页就会出现新的问题，开发出来的页面只占了viewport的一小部分；
所以我们需要对viewport进行设置

