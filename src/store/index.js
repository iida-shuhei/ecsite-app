import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase/app";
import "firebase/auth";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loginUser: {
      id: "",
      name: "",
      email: "",
      zipcode: "",
      address: "",
      telephone: "",
      orderList: {
        id: "",
        userId: "",
        status: "",
        totalPrice: "",
        orderDate: "",
        destinationName: "",
        destinationEmail: "",
        destinationZipcode: "",
        destinationAddress: "",
        destinationTel: "",
        deliveryTime: "",
        paymentMethod: "",
        orderItemList: {
          id: "",
          itemId: "",
          orderId: "",
          quantity: "",
          size: "",
          orderToppingList: {
            id: "",
            toppingId: "",
            orderToppingId: "",
          },
        },
      },
    },
    firebaseUser: null,
    loginStatus: false,
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
    shoppingCart:false,
    purchaseHistory:[]
  },
  mutations: {
    setLoginUser(state, user) {
      console.log("kiteru?2")
      state.loginUser = user;
    },
    loginStatus(state,status) {
      state.loginStatus = status;
    },
    deleteLoginUser(state) {
      state.loginUser = null;
    },
    setItemList(state, itemList) {
      state.itemList = itemList;
    },
    setFirebaseUser(state, user) {
      state.firebaseUser = user;
    },
    changeLoginStatus(state){
      state.loginStatus = false;
    },
    setEmail(state,email){
      state.loginUser.email = email
    },
    setShoppingCart(state,itemId) {
      state.shoppingCart = itemId
    },
    setPurchaseHistory(state,orderList){
      state.purchaseHistory = orderList
    }
  },
  actions: {
    login() {
      const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithRedirect(googleAuthProvider);
    },
    logout() {
      firebase.auth().signOut();
    },
    deleteLoginUser({ commit }) {
      commit("deleteLoginUser");
    },
    setLoginUser({ commit }, user) {
      console.log("kiteru?")
      commit("setLoginUser", user);
    },
    loginStatus({ commit }, status) {
      commit("loginStatus",status);
    },
    setItemList({ commit }, itemList) {
      commit("setItemList", itemList);
    },
    setFirebaseUser({ commit }, user) {
      commit("setFirebaseUser", user);
    },
    changeLoginStatus({ commit }) {
      commit("changeLoginStatus");
    },
    setEmail({commit},email){
      commit("setEmail",email)
    },
    setShoppingCart({commit},itemId) {
      commit("setShoppingCart",itemId)
    },
    setPurchaseHistory({commit},orderList){
      commit("setPurchaseHistory",orderList)
    }
  },
  modules: {},
  getters:{
    userName: (state) => (state.loginUser ? state.loginUser.name : ""),
    photoURL: (state) => state.firebaseUser ? state.firebaseUser.photoURL : "",
  }
});
