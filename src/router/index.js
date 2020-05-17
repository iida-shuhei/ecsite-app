import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import ItemDetail from '../views/ItemDetail.vue'
import Cart from '../views/Cart.vue'
import PurchaseForm from '../views/PurchaseForm.vue'

Vue.use(VueRouter)

  const routes = [
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
