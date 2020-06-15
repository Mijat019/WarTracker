import Vue from "vue";
import App from "./App";
import store from "./store/store";
import vuetify from "./plugins/vuetify";
import axios from "axios";

Vue.$axios = axios;
Vue.config.productionTip = false;

const ignoreWarnMessage = "Computed property";
//eslint-disable-next-line no-unused-vars
Vue.config.warnHandler = function(msg, vm, trace) {
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
