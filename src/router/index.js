import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "../store/index.js";
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
    component: Top,
    //ログインしていなかったら上記のパスに飛ぶことを許可しない
    beforeEnter(to, from, next) {
      if (store.state.loginStatus) {
        next();
      } else {
        next("/login");
      }
    },
  },
  {
    path: '/itemDetail/:itemId?',
    name: 'ItemDetail',
    component: ItemDetail,
    //ログインしていなかったら上記のパスに飛ぶことを許可しない
    beforeEnter(to, from, next) {
      if (store.state.loginStatus) {
        next();
      } else {
        next("/login");
      }
    },
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart,
    //ログインしていなかったら上記のパスに飛ぶことを許可しない
    beforeEnter(to, from, next) {
      if (store.state.loginStatus) {
        next();
      } else {
        next("/login");
      }
    },
  },
  {
    path: '/purchaseForm',
    name: 'PurchaseForm',
    component: PurchaseForm,
    //ログインしていなかったら上記のパスに飛ぶことを許可しない
    beforeEnter(to, from, next) {
      if (store.state.loginStatus) {
        next();
      } else {
        next("/login");
      }
    },
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
