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
| 注释节点：    | `Comment`			| 注释内容							 | #comment				   | 8		  | 文本值    |

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
+ `element.ownerDocument`

###2.2常用属性和方法
+ `documentElement`：文档根节点，网页的根元素，即`html`
+ `body`：
+ `head`：
+ `URL`：返回当前文档的网址，HTML文档独有属性
+ `location`：当前文档只读URL信息对象
	* 和`window`对象的`location`属性是同一个，即`window.location === document.location`，建议通过`window.location`形式使用
	* `location`是一个只读属性，但是可以通过对该属性进行赋值来进行网页跳转
+ `title`：可读写属性，用于获取和修改文档标题
+ `cookie`：浏览器每次向服务器发送请求都会附加的信息，详细参考`Cookie.md`；

+ `querySelector()`：返回匹配指定的CSS选择器的元素节点，如果有多个节点满足匹配条件，则返回第一个匹配的节点。如果没有发现匹配的节点，则返回null。
+ `querySelectorAll()`：返回匹配指定的CSS选择器的所有节点
	* 参数可以使用多个选择器，用逗号分隔，结果返回匹配其中任一一项的元素
+ `getElementById()`：
+ `getElementsByTagName()`：
+ `getElementsByClassName()`：
+ `createElement(tagName)`：参数为元素的标签名，即元素节点的tagName属性
+ `createTextNode(textContent)`：参数为所要生成的文本节点的内容
+ `createAttribute(attrName)`：
+ `createDocumentFragment()`：DocumentFragment对象是一个存在于内存的DOM片段，但是不属于当前文档，常常用来生成较复杂的DOM结构，然后插入当前文档。这样做的好处在于，因为DocumentFragment不属于当前文档，对它的任何改动，都不会引发网页的重新渲染，比直接修改当前文档的DOM有更好的性能表现。
+ `createEvent()`：创建一个事件，详细参考`Event.md`
+ `addEventListener()`:
+ `removeEventListener()`:
+ `dispatchEvent()`:

示例代码

```
var p = document.createElement('p');
var text = document.createTextNode("Hello Dom");
p.appendChild(text);
var attr = document.createAttribute('id');
attr.value = 'p1';
p.setAttribute(attr);

var docfrag = document.createDocumentFragment();
[1, 2, 3, 4].forEach(function(e) {
  var li = document.createElement("li");
  li.textContent = e;
  docfrag.appendChild(li);
});
document.body.appendChild(docfrag);

document.addEventListener('click', listener, false);
document.removeEventListener('click', listener, false);
var event = new Event('click');
document.dispatchEvent(event);
```


###2.3其他属性
<small>
+ `doctype`：DOM `DocumentType`节点
+ `defaultView`：返回document对象所在的window对象，`window === document.defaultView`
+ `activeElement`：返回当前文档中获得焦点的那个元素
+ `documentURI`：返回当前文档的网址
+ `domain`：返回当前文档的域名
+ `lastModified`：
+ `referrer`：返回当文档的访问来源，即使从哪个网址跳转过来的
+ `characterSet`：
+ `readyState`：返回当前文档状态：loading、interactive、complete
+ `designMode`：控制当前document是否可编辑
+ `implementation`：返回一个对象，用来甄别当前环境部署了哪些DOM相关接口
+ `compatMode`：返回浏览器处理文档的模式：可能的值为BackCompat（向后兼容模式）和 CSS1Compat（严格模式）。
+ `anchors`：返回网页中所有的a节点元素，注意，只有指定了name属性的a元素，才会包含在anchors属性之中。
+ `embeds`：返回网页中所有嵌入对象
+ `forms`：返回页面中所有表单
+ `images`：返回页面所有图片元素
+ `links`：返回当前文档所有的链接元素（即a标签，或者说具有href属性的元素）。
+ `scripts`：返回当前文档的所有脚本
+ `styleSheets`：返回一个类似数组的对象，包含了当前网页的所有样式表。</small>

###2.4其他方法
<small>
+ `open()`：新建一个文档，供write方法写入内容。它实际上等于清除当前文档，重新写入内容。不要将此方法与window.open()混淆，后者用来打开一个新窗口，与当前文档无关。
+ `close()`：用于关闭open方法所新建的文档，一旦关闭，write方法就无法写入内容了。
+ `write()`：向当前文档写入内容
	* 只要当前文档还没有用close方法关闭，它所写入的内容就会追加在已有内容的后面。
	* 如果页面已经渲染完成（DOMContentLoaded事件发生之后），再调用write方法，它会先调用open方法，擦除当前文档所有内容，然后再写入。
	* 如果在页面渲染过程中调用write方法，并不会调用open方法。（可以理解成，open方法已调用，但close方法还未调用。）
+ `writeln()`：与write方法完全一致，除了会在输出内容的尾部添加换行符。
+ `getElementsByName()`：IE下有问题
+ `hasFocus()`：返回一个布尔值，表示当前文档之中是否有元素被激活或获得焦点
+ `elementFromPoint(x,y)`：返回位于页面指定位置的元素
+ `adoptNode()`：将某个节点，从其原来所在的文档移除，插入当前文档，并返回插入后的新节点。
+ `importNode()`：从外部文档拷贝指定节点，插入当前文档。
+ `createNodeIterator()`：返回一个DOM的子节点遍历器。
+ `createTreeWalker()`：返回一个DOM的子树遍历器。它与createNodeIterator方法的区别在于，后者只遍历子节点，而它遍历整个子树。</small>




##四、Element节点

###4.1获取

####4.1.1元素获取
#####4.1.1.1查找
+ `doucment.getElementById()`
+ `document.getElementsByTagName()`
+ `document.getElementsByClass()`
+ `element.querySelector()`
+ `element.querySelectorAll()`

#####4.1.1.2遍历
+ `element.children`：返回元素的所有子Element节点
+ `element.childElmentCount`
+ `element.firstElementChild`
+ `element.lastElementChild`
+ `element.nextElementSibling`
+ `element.previousElementSibling`

#####4.1.1.2匹配
+ `element.closest()`：返回当前元素节点的最接近的父元素（或者当前节点本身），条件是必须匹配给定的CSS选择器。如果不满足匹配，则返回null。
+ `element.matches()`：返回一个布尔值，表示当前元素是否匹配给定的CSS选择器。

####4.1.2属性操作
#####4.1.2.1属性获取
+ `elements.attributes`：返回元素属性动态集合
+ `id`：获取和设置id
+ `tagName`：返回指定元素的大写的标签名，与nodeName属性的值相等
+ `className`：读取和设置当前元素的class属性
+ `classList`：返回一个类数组的class属性集合
	* `add()`：增加一个class。
	* `remove()`：移除一个class。
	* `contains()`：检查当前元素是否包含某个class。
	* `toggle()`：将某个class移入或移出当前元素。
	* `item()`：返回指定索引位置的class。
	* `toString()`：将class的列表转为字符串。

#####4.1.2.2属性获取
+ `hasAttribute(attrName)`：
+ `getAttribute(attrName)`：
+ `removeAttribute(attrName)`：
+ `setAttribute(attr | name,value)`：
+ `createAttribute(attrName)`：


####4.1.3内容获取
+ `innerHTML`：返回该元素包含的HTML代码；该属性可写，可以用来设置节点内容；
+ `outerHTML`：返回该元素及包含的HTML代码；该属性可写，对它赋值相当于替换该元素；

###4.2创建
+ `createElement(tagName)`：参数为元素的标签名，即元素节点的tagName属性
+ `createTextNode(textContent)`：参数为所要生成的文本节点的内容
+ `cloneNode(boolean)`：cloneNode方法用于克隆一个节点。它接受一个布尔值作为参数，表示是否同时克隆子节点。注意：通过该方法克隆的节点会丢失事件监听，产生重复id节点；

###4.3插入
+ `element.insertAdjacentHTML(position, text)`：解析字符串，然后将生成的节点插入DOM树的指定位置。
	* 第一个是指定位置
	* 第二个是待解析的字符串。
		- beforebegin：在当前元素节点的前面。
		- afterbegin：在当前元素节点的里面，插在它的第一个子元素之前。
		- beforeend：在当前元素节点的里面，插在它的最后一个子元素之后。
		- afterend：在当前元素节点的后面。'
+ `parentNode.appendChild(childNode)`：添加到父节点的最后一个子节点。
+ `parentNode.insertBefore(newElement,oldElement)`：
	* 当`parentNode`没有子元素的时候，第二个参数可以穿null，`newElement`会插入当前节点的最后位置；
	* `parentNode.insertBefore(newElement,oldElement.nextSibling)`变相实现`insertAfter()`

###4.4删除
+ `element.remove()`
+ `parentNode.removeChild(childNode)`：从DOM树中删除节点，但是节点依然在内存中，可以进行操作；
+ `parentNode.replaceChild(newChild,oldChild)`：可以将毗邻的两个Text节点合并。


##五、文本节点
###5.1获取
一般通过`element`遍历获取，或者通过遍历NodeList集合获取；

###5.2创建
+ `document.createTextNode()`
+ `new Text()`

###5.3属性
+ `element.data`
+ `element.wholeText`
+ `element.length`
+ `element.wholeText`：将当前Text节点与毗邻的Text节点，作为一个整体返回。

###5.4方法
+ `appendData(text)`：
+ `deleteData(start,length)`：
+ `insertData(start,text)`：
+ `replaceData(start,length,text)`：
+ `subStringData(start,length)`：
+ `splitText(start)`：将Text节点一分为二，变成两个毗邻的Text节点。
+ `normalize()`：

##六、碎片节点
DocumentFragment节点代表一个文档的片段，本身就是一个完整的DOM树形结构。它没有父节点，不属于当前文档，操作DocumentFragment节点，要比直接操作DOM树快得多。

代码示例

```
var docFrag = document.createDocumentFragment();
// or
var docFrag = new DocumentFragment();

var li = document.createElement("li");
li.textContent = "Hello World";
docFrag.appendChild(li);

document.queryselector('ul').appendChild(docFrag);
```


##七、CSS操作

###7.1 HTML元素 style属性
`div.setAttribute("style","backgruoud:red;")`

###7.2 Element节点 style属性

####7.2.1 基本用法
+ 普通属性：`div.style.color = 'red'`
+ 带横杆属性：`div.style.fontSize = "12px"`，驼峰命名法
+ 关键字属性：`div.style.cssFloat = 'left'`，加`css`前缀

####7.2.2 CSSText属性
`div.cssText = "backgruoud:red;"`

####7.2.3 属性检测
1. 判断属性返回类型：`typeof element.style.transform === 'string';`
	1. 如果该CSS属性确实存在，会返回一个字符串。即使该属性实际上并未设置，也会返回一个空字符串。
	2. 需要考虑浏览器兼容：`typeof content.style['webkitAnimation'] === 'string'`
	3. 使用横线和驼峰命名形式均可：`document.body.style['background-color'] // ""`
2. 	`CSS.supports()`
	1. `CSS.supports('transform-origin', '5px');`
	2. `CSS.supports('(display: table-cell) and (display: list-item)');`

####7.2.3 属性方法
+ `setPropertyValue(propertyName,value)`：
+ `getPropertyValue(propertyName)`：
+ `removeProperty(propertyName)`：


##参考文献
[Node节点-阮一峰](http://javascript.ruanyifeng.com/dom/node.html)