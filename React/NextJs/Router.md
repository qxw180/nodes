#路由
Next.js默认支持基于文件结构的路由，在`pages`目录中每一个`.js`文件都是一个路由页面，由Next.js自动生成。

##`next/link`

##`next/router`
可以将路由信息作为一个属性注入到组件中
``` JSX
import {withRouter} from 'next/router'
import Layout from '../components/MyLayout.js'

const Page = withRouter((props) => (
    <Layout>
       <h1>{props.router.query.title}</h1>
       <p>This is the blog post content.</p>
    </Layout>
))

export default Page
```

##route masking


##custom server router