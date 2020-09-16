#react-router

##前端路由

路由：可以根据不同的url做出不同的响应返回不同的页面；

在传统的开发模式下路由都是由后端进行处理的，在后端MVC架构模式下路由承担controller的角色，根据url做处理并返回页面；
在这种模式下每次请求都会导致整个页面刷新，很多情况下只需要页面的局部刷新，这种整个页面刷新的方式对于用户体验和服务器的压力都不是一个好的解决方案；

使用Ajax和DOM操作操作可以实现局部刷新，但是不能实现页面和url的绑定，用户不能通过收藏的url直接进入到指定页面；
对于SPA(Single Page Application)，url和页面的绑定是必须的，所以需要将路由从后端转移到前端；
前端路由可以将url的变化直接在浏览器中处理和消耗掉，不会直接被传给服务器；

优点：
局部刷新，用户体验好；不需要从服务器加载全部资源，按需加载性能好；
缺点：
使用浏览器前进后退都需要重新发送请求，没有很好的缓存机制
无法记录滚动位置

实现：
1. url的改变不引起页面刷新
2. 监听url的变化

利用hash
利用historyAPI



问题：服务器文件指向问题

##基础组件
``` JavaScript
import { BrowserRouter, Route, Link } from 'react-router-dom'
```

###router components
react-router-dom提供`<BrowserRouter>`和`<HashRouter>`，BrowserRouter适合在有后台Server的情况下使用，如果是使用静态发布一般使用HashRouter。
``` JSX
import { BrowserRouter } from 'react-router-dom'
ReactDOM.render((
  <BrowserRouter>
    <App/>
  </BrowserRouter>
), holder)
```

###route matching components
有两个matching components`<Route>`和`<Switch>`
``` JSX
import { Route, Switch } from 'react-router-dom'
```
match components用来匹配路径，匹配后渲染content，不匹配返回`null`，没有path属性的Route表示始终匹配
``` JSX
// when location = { pathname: '/about' }
<Route path='/about' component={About}/> // renders <About/>
<Route path='/contact' component={Contact}/> // renders null
<Route component={Always}/> // renders <Always/>
```
`<Switch>`用来组合`<Route>`，但Switch不是必须的，Switch会对所有的组件进行路径匹配，但是只渲染第一个匹配的组件。
可以用来处避免多个路由都匹配并渲染，可以用来实现当所有Route都不匹配时渲染404页面
``` Jsx
<Switch>
  <Route exact path='/' component={Home}/>
  <Route path='/about' component={About}/>
  <Route path='/contact' component={Contact}/>
  {/* when none of the above match, <NoMatch> will be rendered */}
  <Route component={NoMatch}/>
</Switch>
```
`<Route>`有三个属性可以用来渲染组件：component、render和children
component用来渲染已经存在的组件，render的值为一个行内方法，用来渲染必须传入范围内变量作为域参数的组件
``` JSX
const Home = () => <div>Home</div>

const App = () => {
  const someVariable = true;
  
  return (
    <Switch>
      {/* these are good */}
      <Route exact path='/' component={Home} />
      <Route
        path='/about'
        render={(props) => <About {...props} extra={someVariable} />}
      />
      {/* do not do this */}
      <Route
        path='/contact'
        component={(props) => <Contact {...props} extra={someVariable} />}
      />  
    </Switch>
  )
}
```


###navigation components
`<Link>`用来创建链接，
`<NavLink>`是特殊的`<Link>`可以用来定制active时的样式`<NavLink to='/react' activeClassName='hurray'>React</NavLink>`
