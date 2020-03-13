import React, { Component } from 'react'
import { Layout, Menu, Breadcrumb, Icon } from 'antd'
// 从4.0开始，antd不在内置icon组件，需要使用独立的包 @ant-design/icons
// 下载      npm i @ant-design/icons
// import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons'




// 引入自定义的less
import './frame.less'
// 引入自己创的logo
import logo from './logo.png'

import { withRouter } from 'react-router-dom'


const { Header, Content, Sider } = Layout

// 装饰器模式
@withRouter


class Frame extends Component {

  onMenuClick = ({ key }) => {
    this.props.history.push(key)
  }

    render() {
        // console.log(this.props.children)
        return (
        <Layout style={{minHeight: '100%'}}>
          {/*  当重写别人的样式时，不能对其原本的class  而是在其后面再加一个class进行重写*/}
          <Header className="header qx-header">
            <div className="qx-logo">
              <img src={logo} alt="qinaxi" />
            </div>
          </Header>
          <Layout>
            <Sider width={200} className="site-layout-background">
              <Menu
                mode="inline"
                onClick={this.onMenuClick}
                selectedKeys={[this.props.location.pathname ]}
                style={{ height: '100%', borderRight: 0 }}
              >
                  {
                      this.props.menus.map(item => {
                        return (
                          
                          <Menu.Item key={item.pathname}>
                            <Icon component={item.icon} />
                            {item.title}
                            </Menu.Item>
                          )
                      })
                  }
                
              
              </Menu>
            </Sider>
            <Layout style={{ padding: '16px' }}>
            
              <Content
                className="site-layout-background"
                style={{
                  margin: 0,
                  minHeight: 280,
                  backgroundColor: '#fff'
                }}
              >
                {this.props.children}
              </Content>
            </Layout>
          </Layout>
        </Layout>
        )
    }
}


export default Frame