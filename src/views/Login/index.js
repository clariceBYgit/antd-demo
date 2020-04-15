import React, { Component } from 'react'


import{
    Form,
    Input,
    Button,
    Checkbox,
    Card
} from 'antd'

import { UserOutlined, LockOutlined} from '@ant-design/icons'


import './login.less'



@Form.create()
class Login extends Component {
   
    

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields( (err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        })
    }   
    render() {
       const { getFieldDecorator } = this.props.form

        return (
            <Card title='QX ADMIN登录'
                className="qx-login-wrapper"
            >
                <Form
                    className="login-form"
                    onSubmit={this.handleSubmit}
                    >
                    <Form.Item>
                        {
                            getFieldDecorator('username', {
                                rules: [{ 
                                    required: true,
                                    message: '用户名必须' }]
                            })(

                                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
                            )
                        }
                    </Form.Item>
                    <Form.Item>
                        {
                            getFieldDecorator('password', {
                                rules: [{ 
                                    required: true,
                                    message: '密码必须' }]
                            })(
                                <Input
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    type="password"
                                    placeholder="用户密码"
                                    />
                            )
                        }
                    
                    </Form.Item>
                    <Form.Item>
                        {
                            getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true
                            })(<Checkbox>记住我</Checkbox>)
                        }
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            登录
                        </Button>
                        
                    </Form.Item>

                  
                </Form>
            </Card>
        )
    }
}


export default  Login