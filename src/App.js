import React, { Component } from 'react';
import { Route, Switch,Redirect } from 'react-router-dom' 

import { adminRoutes } from './routes'

import { Frame } from './components'

import {
    Button,
    Spin,
    Pagination,
    Badge
} from 'antd' 

const menus = adminRoutes.filter(route => route.isNav === true)

// // 配置装饰器  
// const testHOC = (WrappedComponent) => {
//   return class HOCComponent extends Component {
//     render() {
//       return (
//         <>
//           <WrappedComponent />
//           <div>这是高阶组件的内容</div>
//         </>
//       )
//     }
//   }
// }

// // 装饰器
// @testHOC

class App extends Component{
  render (){
    return (
    //   <div>
    //   {/* 所生成的对应的标签都有自带的  ant class属性 */}
    //    <Button loading type="primary">antd按钮</Button>
    //    {/* <Spin>
    //        <div>
    //            fuaouo uupad uuoafhj ouadu oaodu ooau oa  uj
    //        </div>
    //    </Spin>
    //    <Pagination
    //   showSizeChanger
    //   defaultCurrent={3}
    //   total={500}
    // />
    //   <Badge count={10} showZero overflowCount={9}>
    //     <div>
    //     Lorem 
    //     </div>
    //   </Badge> */}
    //  <div>这里是公共的部分</div> 
    
    
    // </div>
    <Frame menus={menus}>
      <Switch>
        {
          adminRoutes.map(route => {
            return (
              <Route
                key={route.pathname}
                path={route.pathname}
                exact={route.exact}
                render={(routerProps) => {
                  return <route.component {...routerProps} />
                }}
              />
            )
          })
        }
        <Redirect to={adminRoutes[0].pathname} from='/admin' exact />
        <Redirect to='/404' />
      </Switch>
    </Frame>
    )
    
  }
}

export default App
