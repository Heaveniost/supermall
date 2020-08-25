import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

//懒加载 点击路由才会加载响应模块的js 提高用户体验
const Home = () => import('../views/home/Home')
const Category = () => import('../views/category/Category')
const Cart = () => import('../views/cart/Cart')
const Profile = () => import('../views/profile/Profile')
const Detail = () =>import('../views/detail/Detail')

export default new Router({
  routes: [
    { path:'/', redirect:'/home'},
    { path: '/home', component: Home,},
    { path: '/category', component: Category},
    { path: '/cart', component: Cart},
    { path: '/profile', component: Profile},
    { path: '/detail/:id', component: Detail},  
  ],
  mode: 'history'
})
