import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "../views/Login.vue"
import Home from '../views/Home.vue'
import ItemDetail from '../views/ItemDetail.vue'
import Cart from '../views/Cart.vue'

Vue.use(VueRouter)

  const routes = [
    {
      path:'/login',
      name: 'Login',
      component: Login


    },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/itemDetail/itemId=:itemId',
    name: 'ItemDetail',
    component: ItemDetail
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
