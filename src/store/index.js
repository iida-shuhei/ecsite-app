import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase/app";
import "firebase/auth";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    //パスワード意外を格納
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
    itemList: [],
    firebaseUser: null,
    loginStatus: false,
  },
  mutations: {
    setLoginUser(state, user) {
      state.loginUser = user;
    },
    loginStatus(state) {
      state.loginStatus = true;
    },
    deleteLoginUser(state) {
      state.login_user = null;
    },

    itemList(state, itemList) {
      state.itemList = itemList;
    },
    setFirebaseUser(state, user) {
      state.firebaseUser = user;
    },
    changeLoginStatus(state){
      state.loginStatus = false;
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
      commit("setLoginUser", user);
    },
    loginStatus({ commit }) {
      commit("loginStatus");
    },

    setItemList({ commit }, itemList) {
      commit("itemList", itemList);
    },
    setFirebaseUser({ commit }, user) {
      commit("setFirebaseUser", user);
    },
    changeLoginStatus({ commit }) {
      commit("changeLoginStatus");
    },
  },
  modules: {},
  getters:{
    userName: (state) => (state.loginUser ? state.loginUser.name : ""),
    photoURL: (state) =>
      state.firebaseUser ? state.firebaseUser.photoURL : "",
  }
});
