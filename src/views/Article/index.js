import React, { Component } from 'react'

import { 
  Card,
  Table,
  Tag,
  Button
} from 'antd'

// 引入 xlsx 
import XLSX from 'xlsx'

import ButtonGroup from 'antd/lib/button/button-group'
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
      total: 0,
      isLoading: false,
      offset: 0,
      limited: 10
    }
  }
  createColums = (columnKeys) => {
    
    const columns = columnKeys.map(item => {
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
  columns.push(
    {
      title: '操作',
      key: 'actions',
      render: ()=> {
        return (
          <ButtonGroup>
            <Button size='small' type='primary'>编辑</Button>
            <Button size='small' type='danger'>删除</Button>
          </ButtonGroup>
           
          )
      }
    }

  ) 
  return columns
}
  // 发送ajax 请求数据
  getData = () => {
    this.setState({
      isLoading: true
    })
    getArticles(this.state.offset, this.state.limited)
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
    .catch(err =>{
      // 处理错误 ，虽然有全局处理
    })
    .finally(() => {
      this.setState({
        isLoading:false
      })
    })
  }

  onPageChange = (page, pageSize)=> {
    // console.log(page,pageSize)
    this.setState({ 
      offset: pageSize*(page - 1),
      limited:pageSize
  },() => {
    this.getData()
  })
  }

  onShowSizeChange = (current, size) => {
    // 注意：当做此分页时 沟通好是跳转回第一页还是留在当前页
    // console.log(current, size)
    this.setState({ 
      offset: 0,
      limited: size
  },() => {
    this.getData()
  })
  }


  // 导出Excel表格
  // 前端导出Excel的局限
  // 由于是分页显示 因此  表格不完整只有当前页的（一般情况下导出Excel是由前端发送ajax请求，后端返回一个下载地址）
  toExcel = () => {
    // console.log('hhhh')
      /* convert state to workbook */
      // 组合数据
      const data = [Object.keys(this.state.dataSource[0])]  //[['id', 'title' ,'author','amount','createAt']]
      for (let i = 0 ; i < this.state.dataSource.length; i++){
        // 涉及到对象转数组
        // data.push(Object.values(this.state.dataSource[i]))   缺陷不易处理时间
        data.push([
          this.state.dataSource[i].id,
          this.state.dataSource[i].title,
          this.state.dataSource[i].author,
          this.state.dataSource[i].amount,
          moment(this.state.dataSource[i].createAt).format('YYYY年MM月DD日hh时mm分ss秒')
          
        ])


      }
      console.log(data)
      // 数据类型是[["a","b"],[1,2]]   二维数组
      const ws = XLSX.utils.aoa_to_sheet(data); 
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
      /* generate XLSX file and send to client */
      // 结合时间,页码修改文件名
      XLSX.writeFile(wb, `articles-第${this.state.offset / this.state.limited + 1}页-${moment().format('YYYY年MM月DD日hh时mm分ss秒')}.xlsx`)
  }
  componentDidMount () { 
    this.getData()
  }
    render() {
        return (
            <Card
             title="文章列表" 
             bordered={false}
             extra={<button onClick={this.toExcel} type="primary">导出Excel</button>}
             >
            <Table 
                loading={this.state.isLoading}
                rowKey={record => record.id}
                dataSource={this.state.dataSource}
                columns={this.state.columns}
                pagination={{
                  // 记录当前是第几页
                  current: this.state.offset / this.state.limited +1 ,
                  total:this.state.total,
                  hideOnSinglePage: true,
                  // 是否可改变pageSize 
                  showSizeChanger:true,
                  // 是否可以快速跳转页
                  showQuickJumper:true,
                  onChange: this.onPageChange,
                  onShowSizeChange: this.onShowSizeChange,
                  pageSizeOptions:['10','15','20','25','30']
                }}
            />
          </Card>
        )
    }
}
