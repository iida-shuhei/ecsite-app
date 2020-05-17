import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false

Vue.config.devtools = true;

// bootstrap-vueのインポート
import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
Vue.use(BootstrapVue);

/** FontAwesomeのインポート */
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
// アイコンを読み込み
library.add(fas, far, fab);
// Vueコンポーネントを作成
Vue.component("v-fa", FontAwesomeIcon);

// vuelidate（バリデーション）インポート
import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)

// firebaseのインポート
import firebase from "firebase";
Vue.config.productionTip = false;

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDoI7rmwwDYHSOQEWudFlvw278hvm5ZxpQ",
  authDomain: "pizza-house-3af98.firebaseapp.com",
  databaseURL: "https://pizza-house-3af98.firebaseio.com",
  projectId: "pizza-house-3af98",
  storageBucket: "pizza-house-3af98.appspot.com",
  messagingSenderId: "428873280108",
  appId: "1:428873280108:web:2eff304a3e2f92428a8649",
  measurementId: "G-C4Q2NDVBXX"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
