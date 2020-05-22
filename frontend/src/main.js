import Vue from "vue";
import App from "./App";
import store from "./store/store";
import vuetify from "./plugins/vuetify";
import axios from "axios";
import config from "./config";

Vue.$axios = axios;
Vue.$axios.defaults.baseURL = config.baseUrl;
Vue.config.productionTip = false;

new Vue({
    store,
    vuetify,
    render: (h) => h(App),
}).$mount("#app");
