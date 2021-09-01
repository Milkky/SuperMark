//导入
import Vue from 'vue'
import VueRouter from 'vue-router'

//组件懒加载
const Home = () => import('views/home/Home')
const Cart = () => import('views/cart/Cart')
const Category = () => import('views/category/Category')
const Me = () => import('views/me/Me')

//注册
Vue.use(VueRouter)

const routes = [
  //重定向
  {
    path:'',
    redirect:'/home'
  },

  {
    path:'/home',
    component: Home
  },

  {
    path:'/cart',
    component: Cart
  },

  {
    path:'/category',
    component: Category
  },

  {
    path:'/me',
    component: Me
  }

]

//创建实例
const router  = new VueRouter({
  routes,
  //ur模式
  mode:'history'
})

//导出
export default router
