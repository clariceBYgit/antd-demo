import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

// 引入antd中文
import zhCN from 'antd/es/locale/zh_CN';
import { ConfigProvider } from 'antd'
import App from './App';

// 引入不需要登录的路由
import { mainRoutes } from './routes'

// 引入测试的less文件
import './index.less'


ReactDOM.render(
  <Router>
  {/* // prefixCls  设置统一样式的前缀 */}
    <ConfigProvider locale={zhCN}>
      <Switch>
        <Route path="/admin" render={(routerProps) => {
          // TOOD:权限，需要登录才能访问/admin
          return <App {...routerProps} />
        }} />
        {
          mainRoutes.map(route => {
            return <Route key={route.pathname} path={route.pathname} component={route.component} />
          })
        }
        <Redirect to='/admin' from='/' exact  />
        <Redirect to='/404' />
      </Switch>
    </ConfigProvider>
  </Router>
,
 document.getElementById('root')
);

