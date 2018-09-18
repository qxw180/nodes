#React 直出

##Node环境下不支持JSX语法怎么办
+ 使用[@babel/register](https://babeljs.io/docs/en/babel-register)，
+ 使用[babel-node](https://babeljs.io/docs/en/next/babel-node.html)，不适合在生成环境中使用
+ 使用babel-loader进行编译，使用webpack-node-externals避免node_modules目录编译