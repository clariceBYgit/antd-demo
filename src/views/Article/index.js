import React, { Component } from 'react'
import { Card, Table } from 'antd'

const dataSource = [
    {
      key: '1',
      name: '胡彦斌',
      age: 32,
      address: '西湖区湖底公园1号',
    },
    {
      key: '2',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号',
    },
  ];
  
  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '住址',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '操作',
      dataIndex: 'actions',
      key: 'actions',
      render: () =>{
        return <button>编辑</button>      }
    }
  ];
  
export default class ArticleList extends Component {
    render() {
        return (
            <Card
             title="Card title" 
             bordered={false}
             extra={<button type="primary">导出Excel</button>}
             >
            <Table 
                dataSource={dataSource}
                columns={columns}
                pagination={{
                  // total:100,
                  pageSize:1
                }}
            />
          </Card>
        )
    }
}
