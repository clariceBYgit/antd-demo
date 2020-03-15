import React, { Component } from 'react'

import { Card, Table, Tag } from 'antd'


import { getArticles } from '../../requests'
// 引入第三方时间日期格式化
import moment from 'moment'
  // 调试时
  // window.moment = moment
  
const titleDisplayMap = {
  id: 'id',
  title: '标题',
  author: '作者',
  createAt: '创建时间',
  amount: '阅读量'
}
export default class ArticleList extends Component {
  // 定义数据
  constructor () {
    super()
    this.state = {
      dataSource:[],
      columns : [],
      total: 0
    }
  }
  createColums = (columnKeys) => {
    return columnKeys.map(item => {
      if( item === 'amount') {
        return {
          title: titleDisplayMap[item],
          key: item,
          render : (text, record) => {
            // 这里是根据数字的大小做一个条件渲染
              // 同理  可以根据职位不同显示不同的颜色
            const { amount } =record
          return <Tag color={ amount > 230 ? 'red' : 'green'}>{record.amount}</Tag>
          }
        }
       
    }
    if( item === 'createAt') {
      return {
        title: titleDisplayMap[item],
        key: item,
        render : (text, record) => {
          // 这里是根据数字的大小做一个条件渲染
            // 同理  可以根据职位不同显示不同的颜色
          const { createAt } = record
        return moment(createAt).format('YYYY年MM月DD日  HH:mm:ss')
        }
      }
     
  }
    return {
      title: titleDisplayMap[item],
      dataIndex: item,
      key: item
    }
  })
}
  // 发送ajax 请求数据
  getData = () => {
    getArticles()
    .then(rep => {
      // Object.keys 返回一个所有元素为字符串的数组，
      /*
        var arr = ['a', 'b', 'c'];
        console.log(Object.keys(arr)); // console: ['0', '1', '2']

        // array like object
          var obj = { 0: 'a', 1: 'b', 2: 'c' };
        console.log(Object.keys(obj)); // console: ['0', '1', '2']
      */
      const columnKeys = Object.keys(rep.list[0])
     const columns = this.createColums(columnKeys)
      this.setState({
        total:rep.total,
        dataSource: rep.list,
        columns
      })
    })
  }


  componentDidMount () {
    this.getData()
  }
    render() {
        return (
            <Card
             title="文章列表" 
             bordered={false}
             extra={<button type="primary">导出Excel</button>}
             >
            <Table 
                rowKey={record => record.id}
                dataSource={this.state.dataSource}
                columns={this.state.columns}
                pagination={{
                  total:this.state.total,
                  hideOnSinglePage: true
                }}
            />
          </Card>
        )
    }
}
