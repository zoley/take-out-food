import Vue from 'vue'
import VueRouter from 'vue-router'
import Goods from '../views/goods/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'goods',
    component: Goods
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
  {
    path:'*',
    name:'404'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
