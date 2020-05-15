import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    itemList:[],
  },
  mutations: {
    itemList(state, itemList) {
      state.itemList = itemList
    }
  },
  actions: {
    setItemList({commit},itemList) {
      commit("itemList", itemList)
    }
  },
  modules: {
  }
})