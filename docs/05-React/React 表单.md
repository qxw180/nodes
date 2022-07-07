# 表单

表单组件和其它原生组件在 React 中有一点不同，表单组件可以有自己的状态(即用户输入的值)

如果想获取表单组件的值我们需要通过`ref`实现，React 推荐将表单组件转换为受控组件。

## 受控组件

受控组件是指将表单组件的值绑定到 React 组件的 state，通过监听表单组件的用户操作更新组件的 state 来实现表单组件的值更新。

当受控组件的值设置为`null`或`undefined`时，用户的输入可以影响受控组件

```JSX
// 用户输入无响应
ReactDOM.render(<input value="hi" />, mountNode);
// 用户可自由输入
ReactDOM.render(<input value={null} />, mountNode);
```

## 默认值

在 React 中表单组件的`value`属性或覆盖 DOM 元素自身的`value`，如果我们想为非受控组件设置默认值可以使用`defaultValue`

## file input

在 React 中`<input type="file" />`只能是非受控组件，因为文件表单组件的值只能为用户选择获取，不能通过程序控制。

```JSX
class FileInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fileInput = React.createRef();
  }
  handleSubmit(event) {
    event.preventDefault();
    alert(
      `Selected file - ${this.fileInput.current.files[0].name}`
    );
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Upload file:
          <input type="file" ref={this.fileInput} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    );
  }
}
```
