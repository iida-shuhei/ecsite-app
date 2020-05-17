import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    itemList:{
      id: '',
      name: '',
      description: '',
      priceM: '',
      priceL: '',
      imagePath: '',
      deleted: '',
      toppingList: {
        id: '',
        name: '',
        priceM: '',
        priceL: ''
      }
    },
    cart: []
  },
  mutations: {
    itemList(state, itemList) {
      state.itemList = itemList
    },
    setCart(state, cart) {
      state.cart.push({
        name: cart.name,
        itemId: cart.itemId,
        quantity: cart.quantity,
        size: cart.size,
        toppingList: cart.toppingList,
        imagePath: cart.imagePath,
        totalPrice: cart.totalPrice,
      })
    }
  },
  actions: {
    setItemList({commit},itemList) {
      commit("itemList", itemList)
    },
    setCart({commit},cart) {
      commit("setCart", cart)
    }
  },
  modules: {
  }
})