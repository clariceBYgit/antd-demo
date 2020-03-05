import React from 'react';
import ReactDOM from 'react-dom';

// 引入antd中文
import zhCN from 'antd/es/locale/zh_CN';
import { ConfigProvider } from 'antd'
import App from './App';

// 引入测试的less文件
import './index.less'

ReactDOM.render(
  // prefixCls  设置统一样式的前缀
    <ConfigProvider locale={zhCN}>
    <App />
  </ConfigProvider>
,
 document.getElementById('root')
);

