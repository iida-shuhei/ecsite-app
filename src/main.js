import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false

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

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
