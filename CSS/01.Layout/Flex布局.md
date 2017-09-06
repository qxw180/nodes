#[弹性盒子布局](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Flexible_Box_Layout)
> CSS 弹性盒子布局是 CSS 的模块之一，定义了一种针对用户界面设计而优化的 CSS 盒子模型。在弹性布局模型中，弹性容器的子元素可以在任何方向上排布，也可以“弹性伸缩”其尺寸，既可以增加尺寸以填满未使用的空间，也可以收缩尺寸以避免父元素溢出。子元素的水平对齐和垂直对齐都能很方便的进行操控。通过嵌套这些框（水平框在垂直框内，或垂直框在水平框内）可以在两个维度上构建布局。

+ 实现自适应布局的神器，真正意义上的布局
+ 可以实现父容器(Flex box)中各个子元素(Flex item)按序排列，按比例显示，
+ 在父容器尺寸变化的时候，子元素可以自适应按比例进行变化

##FlexBox

    .container{
        display:flex;
        width:1200px;
    }
    .item1{
        width:100px;
    }
    .item2{
        box-flex:1;
    }


#####父容器创建：`.container{display:flex}`
+ `flex-direction`：定义排列方向
    * `row`：默认值，主轴为水平方向，起点在左端。
    * `row-reverse`：主轴为水平方向，起点在右端。
    * `column`：主轴为垂直方向，起点在上沿。
    * `column-reverse`：主轴为垂直方向，起点在下沿。
+ `flex-wrap`：定义是否换行
    * `nowrap`：默认不换行
    * `wrap`：换行，第一行在上方。
    * `wrap-reverse`：换行，第一行在下方。
+ `flex-flow`：是`flex-direction`和`flex-wrap`的简写，默认值`row nowrap`
+ `justify-content`：定义对齐方式
    * `flex-start`：（默认值）左对齐
    * `flex-end`：右对齐
    * `center`： 居中
    * `space-between`：两端对齐，项目之间的间隔都相等。
    * `space-around`：每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍。
+ `align-items`：定义项目在交叉轴上如何对齐
    * `stretch`：（默认值）如果项目未设置高度或设为auto，将占满整个容器的高度。
    * `flex-start`：交叉轴的起点对齐。
    * `flex-end`：交叉轴的终点对齐。
    * `center`：交叉轴的中点对齐。
    * `baseline`: 项目的第一行文字的基线对齐。
+ `align-content`：定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。
    * `flex-start`：与交叉轴的起点对齐。
    * `flex-end`：与交叉轴的终点对齐。
    * `center`：与交叉轴的中点对齐。
    * `space-between`：与交叉轴两端对齐，轴线之间的间隔平均分布。
    * `space-around`：每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍。
    * `stretch`：（默认值）轴线占满整个交叉轴

#####子元素设置：`box-flex: value;`
+ `order`：定义项目的排列顺序。数值越小，排列越靠前，默认为0。
+ `flex-grow`：定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大。
+ `flex-shrink`：定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。
+ `flex-basis`：定义了在分配多余空间之前，项目占据的主轴空间（main size）。
+ `flex`：属性是flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto
+ `align-self`：允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性。默认值为auto，表示继承父元素的align-items属性，如果没有父元素，则等同于stretch。

###参考
[使用 CSS 弹性盒](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Flexible_Box_Layout/Using_CSS_flexible_boxes)
[Flex 布局教程：语法篇](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)

---
