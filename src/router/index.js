import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "../views/Login.vue"
import Top from '../views/Top.vue'
import ItemDetail from '../views/ItemDetail.vue'
import Cart from '../views/Cart.vue'
import PurchaseForm from '../views/PurchaseForm.vue'
import RegisterUser from '../views/RegisterUser.vue'

Vue.use(VueRouter)

  const routes = [
    {
      path:'/login',
      name: 'Login',
      component: Login
    },
    {
      path:'/registerUser',
      name:'RegisterUser',
      component:RegisterUser
    },
  {
    path: '/',
    name: 'Top',
    component: Top
  },
  {
    path: '/itemDetail/:itemId?',
    name: 'ItemDetail',
    component: ItemDetail
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart
  },
  {
    path: '/purchaseForm',
    name: 'PurchaseForm',
    component: PurchaseForm
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
