import Vue from "vue";
import Vuex from "vuex";
import battles from "./modules/battles";
import battlesDialog from "./modules/battlesDialog";
import militaryLeaders from "./modules/militaryLeaders";
import militaryLeadersDialog from "./modules/militaryLeadersDialog";
import positions from "./modules/positions";
import snackbar from "./modules/snackbar"
Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        militaryLeaders,
        battles,
        battlesDialog,
        positions,
        militaryLeadersDialog,
        snackbar
    },
});
