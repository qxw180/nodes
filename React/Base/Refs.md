#React Ref
通过Refs可以直接访问Dom节点和React元素。
React 不推荐使用ref，尽量使用props和states进行功能实现。

string ref已经启用，请使用creating refs和callback refs。

##Creating Refs
``` JavaScript
class CustomTextInput extends React.Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
    this.focusTextInput = this.focusTextInput.bind(this);
  }

  focusTextInput() {
    this.textInput.current.focus();
  }

  render() {
    return (
      <div>
        <input type="text" ref={this.textInput} />
        <input type="button" value="Focus the text input" onClick={this.focusTextInput} />
      </div>
    );
  }
}
// 使用
const node = this.myRef.current;
```
React Refs的current属性对不同的元素类型返回不同的引用
+ HTML DOM：返回底层DOM节点
+ React Element：返回React元素实例，可以调用实例内的方法
+ React Refs不支持function components

``` JavaScript
class AutoFocusTextInput extends React.Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
  }

  componentDidMount() {
    this.textInput.current.focusTextInput();
  }

  render() {
    return (
      <CustomTextInput ref={this.textInput} />
    );
  }
}
```

##Callback Refs
``` JavaScript
class CustomTextInput extends React.Component {
  constructor(props) {
    super(props);

    this.textInput = null;
    this.setTextInputRef = element => {
      this.textInput = element;
    };

    this.focusTextInput = () => {
      if (this.textInput) this.textInput.focus();
    };
  }

  componentDidMount() {
    this.focusTextInput();
  }

  render() {
    return (
      <div>
        <input type="text" ref={this.setTextInputRef} />
        <input type="button" value="Focus the text input" onClick={this.focusTextInput} />
      </div>
    );
  }
}
```

##Forwarding Refs
可以使用ref重定向将组件的ref传递给其子元素
``` JavaScript
// 使用forwardRef创建组件
const FancyButton = React.forwardRef((props, ref) => (
  <button ref={ref} className="FancyButton">
    {props.children}
  </button>
));

// 可以直接获取父元素的DOM
const ref = React.createRef();
<FancyButton ref={ref}>Click me!</FancyButton>;
```
