import Vue from "vue";
import Vuex from "vuex";
import battles from "./modules/battles";
import militaryLeaders from "./modules/militaryLeaders";
import positions from "./modules/positions";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    militaryLeaders,
    battles,
    positions
  },
});
