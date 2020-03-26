import axios from 'axios'
import { message } from 'antd'
//  process.env.NODE_ENV     webpack中的   是否为开发模式
const isDev = process.env.NODE_ENV === 'development'
console.log(isDev)
const service = axios.create({
    baseURL: isDev ? 'http://rap2.taobao.org:38080/app/mock/247090' : ''
})

// 拦截器
service.interceptors.request.use((config) => {
    // console.log(config)
    config.data = Object.assign({}, config.data, {
        // authToken:window.localStorage.getItem('authToken')
        authToken:'itisauthtoken'
    })
    return config
})

service.interceptors.response.use((rep) => {
    console.log(rep)
    if (rep.data.code === 200){
        
        return rep.data.data
       
    } else {
        // 全局处理错误
        message.error(rep.data.errMsg)
    }
})

export const getArticles = ( offset = 0, limited = 10) => {
    return  service.post('/antd/articleList', {
        offset,
        limited
    })
}