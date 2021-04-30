import Vue from 'vue'
import Router from 'vue-router'
import Resource from 'vue-resource'
import Validator from 'vue-validator'

// 首页导航条
import Home from '@/view/home'

// 注册
import Register from '@/view/register'

// 登录
import Login from '@/view/login'

// 首页内容
import Hello from '@/view/home_content/hello'

// 个人信息
import Personal from '@/view/information/personal'


// 包裹模块
import project from '@/view/project/project'
import smallproject from '@/view/project/smallproject'

//管理模块
import adminproj from '@/view/members/adminproj'


// 成员模块
import members from '@/view/members/member'
import account from '@/view/members/account'
//地图模块
import driver from '@/view//members/driver'

Vue.use(Router)
Vue.use(Resource)
Vue.use(Validator)

export default new Router({
  routes: [
    {path:'/',component: Login},
    { path: '/register',component: Register},
    { path: '/home',component: Home,name:'',
        children:[
            {path:'personal',component: Personal ,name:'个人信息'},
            {path:'hello',component: Hello ,name:'子首页'},
            {path:'members',component: members,name:'成员',
                children:[
                  {path:'account',component: account,name:'会员帐号'},
                  {path:'adminproj',component: adminproj,name:'包裹管理列表'},
                  {path:'driver',component: driver,name:'司机管理列表'},
                  {path: '/', redirect: 'account' }//在子路由定向到account
                ]
            },
            {path:'project',component: project,name:'包裹',
                children:[
                  {path:'smallproject',component: smallproject,name:'包裹列表'},
                  {path: '/', redirect: 'smallproject' }//在子路由定向到smallproject
                ]
            },          
        ]
}     
  ]
})
