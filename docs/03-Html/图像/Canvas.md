# Canvas

在 Canvas(画布)上可以使用 JS 绘制 2D 图形，绘制图形的单位是像素即位图。
能够以 .png 或 .jpg 格式保存结果图像
弱的文本渲染能力，渲染性能较高，适合游戏、数据可视化场景。
但是 Canvas 不能给单独元素添加事件。

## 使用步骤

1. 获取 Canvas DOM 对象
2. 调用对象的`getContext()`方法，获取`CanvasRenderingContext2D`对象
3. 调用`CanvasRenderingContext2D`对象的方法绘制图形
