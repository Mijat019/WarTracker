import Vue from "vue";
import App from "./App";
import store from "./store/store";
import vuetify from "./plugins/vuetify";
import axios from 'axios'

Vue.prototype.$axios = axios;
Vue.config.productionTip = false;

new Vue({
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
