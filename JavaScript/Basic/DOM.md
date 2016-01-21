# HTML DOM
> DOM是文档对象模型(Document Object Model)的简称，定义了程序和脚本同文档的交互接口，分为以下三部分；
> 1. 核心 DOM - 针对任何结构化文档的标准模型
> 2. XML DOM - 针对 XML 文档的标准模型
> 3. HTML DOM - 针对 HTML 文档的标准模型
> HTML DOM主要涉及的就是对HTML元素的获取、修改、创建等操作
> 注：以下HTML DOM统称DOM

##一、DOM的构成
DOM是由节点组成的，HTML文档中的所有内容都是节点；各节点形成一个树状结构，称为节点树(Dom Tree)；
![节点树](http://www.w3school.com.cn/i/ct_htmltree.gif "节点树")


###1.1[节点Node](http://javascript.ruanyifeng.com/dom/node.html)
浏览器提供了一个原生的Node对象，HTML DOM中的所有节点对象均派生于该对象

#####1.1.1HTML节点类型
| 名称			| 节点				| 含义								 | nodeName 			   | nodeType | nodeValue |
|:-------------:|:-----------------:|:----------------------------------:|:-----------------------:|:--------:|:---------:|
| 文档节点：	| `Document`		| 整个文档（window.document）		 | #document 			   | 9		  | null      |
| 文档类型节点：| `DocumentType`	| 文档的类型（比如<!DOCTYPE html>）	 | 大写HTML元素名称 	   | 1		  | null      |
| 元素节点：	| `Element`			| HTML元素（比如<body>、<a>等）		 | #text         		   | 2		  | null      |
| 属性节点：	| `Attribute`		| HTML元素的属性（比如class="right"）| 等同于Attr.name		   | 3		  | null      |
| 文本节点：	| `Text`			| HTML文档中出现的文本				 | #document-fragment 	   | 11		  | 文本值    |
| 文档碎片节点：| `DocumentFragment`| 未插入到节点树的片段				 | 等同于DocumentType.name | 10		  | null      |
| 注释节点：    | `Comment`			| 注释内容							 | 						   | 		  | 文本值    |

#####1.1.2节点判断`nodeType`和`nodeName`
+ `nodeType`区分节点类型，详见上表；
+ `nodeName`区分元素节点，元素节点的`nodeName`属性返回大写元素名称；

#####1.1.3节点内容获取`nodeValue`和`textContent`
+ `textContent`：
	* 返回当前节点和它的所有后代节点(不包括注释节点)的文本内容；
	* 该属性是可写的，而且会对HTML标签自动转义，用于向页面写入内容；
	* 不会过滤内容中的空格；
	* `Document`和`DocumentType`节点返回`null`；
+ `nodeValue`：
	* 返回或设置当前节点的值，格式为字符串；
	* 只对文本节点和注释节点有效，其他节点返回null；

#####1.1.4节点属性
+ `nodeName`
+ `nodeType`
+ `textContent`
+ `nodeValue`
+ `ownerDocument`：返回当前节点所在的顶层文档对象，即document对象。
+ `nextSibling`：返回紧跟在当前节点后面的第一个同级节点（包括文本节点）。如果当前节点后面没有同级节点，则返回null。
+ `previousSibling`：返回当前节点前面的、距离最近的一个同级节点（包括文本节点）。如果当前节点前面没有同级节点，则返回null。
+ `parentNode`：
	* 返回当前节点的父节点；
	* 生成后还没有插入的Dom树中的节点的`parentElement`返回null；
	* document节点和documentfragment节点，它们的父节点都是null。
	* 父节点的类型只有element节点、document节点和documentfragment节点三种；
+ `parentElement`：返回当前节点的父Element节点。如果当前节点没有父节点，或者父节点类型不是Element节点，则返回null；
+ `childNodes`：返回一个NodeList集合，成员包括当前节点的所有子节点。注意，除了HTML元素节点，该属性返回的还包括Text节点和Comment节点。
+ `firstNode`：返回当前节点的第一个子节点，如果当前节点没有子节点，则返回null。
+ `lastChild`：返回当前节点的最后一个子节点，如果当前节点没有子节点，则返回null。
+ `baseURI`

#####1.1.5节点方法
+ `parentNode.appendChild(childNode)`：添加到父节点的最后一个子节点。
+ `parentNode.hasChildNodes()`：当前节点是否有子节点。
+ `cloneNode(boolean)`：cloneNode方法用于克隆一个节点。它接受一个布尔值作为参数，表示是否同时克隆子节点。注意：通过该方法克隆的节点会丢失事件监听，产生重复id节点；
+ `parentNode.insertBefore(newElement,oldElement)`：
	* 当`parentNode`没有子元素的时候，第二个参数可以穿null，`newElement`会插入当前节点的最后位置；
	* `parentNode.insertBefore(newElement,oldElement.nextSibling)`变相实现`insertAfter()`
+ `parentNode.removeChild(childNode)`：从DOM树中删除节点，但是节点依然在内存中，可以进行操作；
+ `parentNode.replaceChild(newChild,oldChild)`：
+ `parentNode.contains(node)`：
+ `compareDocumentPosition()`：
+ `targetElement.isEqualNode(element)`：判断节点是否相等(类型、属性、子节点是否相同)
+ `normalize()`

##二、文档节点

###2.1获取
+ `window.document`
+ `iframe.contentDocument`

###2.2属性
+ `doctype`：DOM `DocumentType`节点
+ `documentElement`：文档根节点
+ `defaultView`：返回document对象所在的window对象，`window === document.defaultView`
+ `body`：
+ `head`：
+ `activeElement`：返回当前文档中获得焦点的那个元素
+ `documentURI`：返回当前文档的网址
+ `URL`：返回当前文档的网址，HTML文档独有属性
+ `domain`：返回当前文档的域名
+ `lastModified`：
+ `location`：当前文档只读URL信息对象
+ `referrer`：返回当文档的访问来源
+ `title`：
+ `characterSet`：
+ `readyState`：返回当前文档状态：loading、interactive、complete
+ `designMode`：控制当前document是否可编辑
+ `anchors`：返回网页中所有的a节点元素，注意，只有指定了name属性的a元素，才会包含在anchors属性之中。
+ `embeds`：返回网页中所有嵌入对象
+ `forms`：返回页面中所有表单
+ `images`：返回页面所有图片元素
+ `links`：返回当前文档所有的链接元素（即a标签，或者说具有href属性的元素）。
+ `scripts`：返回当前文档的所有脚本
+ `styleSheets`：返回一个类似数组的对象，包含了当前网页的所有样式表。

###2.3方法
+ `open()`：新建一个文档
+ `close()`：用于关闭open方法所新建的文档
+ `write()`：向当前文档写入内容
+ `writeln()`：
+ `hasFocus()`：返回一个布尔值，表示当前文档之中是否有元素被激活或获得焦点
+ `querySelector()`：返回匹配指定的CSS选择器的元素节点，如果有多个节点满足匹配条件，则返回第一个匹配的节点。如果没有发现匹配的节点，则返回null。
+ `getElementById()`：
+ `querySelectorAll()`：返回匹配指定的CSS选择器的所有节点
+ `getElementsByTagName()`：
+ `getElementsByClassName()`：
+ `getElementsByName()`：
+ `elementFromPoint()`：返回位于页面指定位置的元素
+ `createElement()`：参数为元素的标签名，即元素节点的tagName属性
+ `createTextNode()`：参数为所要生成的文本节点的内容
+ `createAttribute()`：

```
var node = document.getElementById("div1");
var a = document.createAttribute("my_attrib");
a.value = "newVal";
node.setAttributeNode(a);
```

+ `createDocumentFragment()`：DocumentFragment对象是一个存在于内存的DOM片段，但是不属于当前文档，常常用来生成较复杂的DOM结构，然后插入当前文档。这样做的好处在于，因为DocumentFragment不属于当前文档，对它的任何改动，都不会引发网页的重新渲染，比直接修改当前文档的DOM有更好的性能表现。

```
var docfrag = document.createDocumentFragment();
[1, 2, 3, 4].forEach(function(e) {
  var li = document.createElement("li");
  li.textContent = e;
  docfrag.appendChild(li);
});
document.body.appendChild(docfrag);
```
+ `createEvent()`:

```
var event = document.createEvent('Event');
event.initEvent('build', true, true);
document.addEventListener('build', function (e) {
  // ...
}, false);
document.dispatchEvent(event);
```

+ `addEventListener()`:
+ `removeEventListener()`:
+ `dispatchEvent()`:

```
// 添加事件监听函数
document.addEventListener('click', listener, false);

// 移除事件监听函数
document.removeEventListener('click', listener, false);

// 触发事件
var event = new Event('click');
document.dispatchEvent(event);
```


##四、Element节点

####属性
+ `attributes`：
+ `id`：
+ `tagName`：返回指定元素的大写的标签名，与nodeName属性的值相等。
+ `innerHTML`：返回该元素包含的HTML代码
+ `outerHTML`：返回该元素及包含的HTML代码
+ `children`：
+ `childElementCount`：
+ `firstElementChild`：
+ `lastElementChild`：
+ `nextElementSibling`：
+ `previousElementSibling`：
+ `className`：读取和设置当前元素的class属性
+ `classList`：返回一个类数组的class属性集合
	* `add()`：增加一个class。
	* `remove()`：移除一个class。
	* `contains()`：检查当前元素是否包含某个class。
	* `toggle()`：将某个class移入或移出当前元素。
	* `item()`：返回指定索引位置的class。
	* `toString()`：将class的列表转为字符串。
+ `clientHeight`：返回元素节点的可见高度，包括padding、但不包括水平滚动条、边框和margin的高度，单位为像素。
+ `clientLeft`：等于元素节点左边框（border）的宽度，单位为像素，包括垂直滚动条的宽度，不包括左侧的margin和padding。
+ `clientTop`：等于网页元素顶部边框的宽度，不包括顶部的margin和padding。
+ `clientWidth`：网页元素的可见宽度，即包括padding、但不包括垂直滚动条（如果有的话）、边框和margin的宽度，单位为像素。
+ `scrollHeight`：返回指定元素的总高度，包括由于溢出而无法展示在网页的不可见部分；包括padding，但不包括border和margin；
+ `scrollWidth`：返回元素的总宽度，包括由于溢出容器而无法显示在网页上的那部分宽度
+ `scrollLeft`：设置或返回水平滚动条向右侧滚动的像素数量
+ `scrollTop`：设置或返回垂直滚动条向下滚动的像素数量

####方法
+ `hasAttribute()`：
+ `getAttribute()`：
+ `removeAttribute()`：
+ `setAttribute()`：
+ `querySelector()`：
+ `querySelectorAll()`：
+ `getElementsByClassName()`：
+ `getElementsByTagName()`：
+ `closest()`：返回当前元素节点的最接近的父元素（或者当前节点本身），条件是必须匹配给定的CSS选择器。如果不满足匹配，则返回null。
+ `matches()`：返回一个布尔值，表示当前元素是否匹配给定的CSS选择器。
+ `addEventListener()`：
+ `removeEventListener()`：
+ `dispatchEvent()`：


##五、属性节点
##六、文本节点
##七、碎片节点


##参考文献
[Node节点-阮一峰](http://javascript.ruanyifeng.com/dom/node.html)