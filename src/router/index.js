import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../views/layout/index'
import Goods from '../views/goods/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/404',
    component: () => import('../views/errorPage/404'),
    hidden: true
  },
  {
    path: '/',
    redirect:'/goods',
    component: Layout,
    children:[
      {
        path: '/goods',
        name: 'goods',
        component: Goods,
      },
      {
        path: '/ratings',
        name: 'ratings',
        component: () => import('../views/ratings/index')
      },
      {
        path: '/seller',
        name: 'seller',
        component: () => import('../views/seller/index')
      },
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
