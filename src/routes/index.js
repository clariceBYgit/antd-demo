import {
    Dashboard,
    Login,
    NotFound,
    Settings,
    ArticleList,
    ArticleEdit
} from '../views'



// 这些路由需要渲染到与App同级
export const mainRouter = [{
    pathname: '/login',
    component: Login
},{
    pathname: '/404',
    component: NotFound  
}
]

export const adminRouter = [{
    pathname: '/admin/dashboard',
    component: Dashboard
},{
    pathname: '/admin/settings',
    component: Settings
},{
    pathname: '/admin/article',
    component: ArticleList,
    exact:true
},{
    pathname: '/admin/article/edit/:id',
    component: ArticleEdit
}
]