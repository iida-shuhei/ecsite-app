import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import ItemDetail from '../views/ItemDetail.vue'

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
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
