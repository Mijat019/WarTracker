import Vue from "vue";
import App from "./App";
import store from "./store/store";
import vuetify from "./plugins/vuetify";
import axios from "axios";
import config from "./config";

Vue.$axios = axios;
Vue.$axios.defaults.baseURL = config.baseUrl;
Vue.config.productionTip = false;

const ignoreWarnMessage = 'Computed property';
 //eslint-disable-next-line no-unused-vars
Vue.config.warnHandler = function (msg, vm, trace) {
    if (msg.startsWith(ignoreWarnMessage)) {
        msg = null;
        vm = null;
        trace = null;
    }
};

new Vue({
    store,
    vuetify,
    render: (h) => h(App),
}).$mount("#app");
