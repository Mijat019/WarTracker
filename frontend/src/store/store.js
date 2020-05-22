import Vue from "vue";
import Vuex from "vuex";
import battles from "./modules/battles";
import militaryLeaders from "./modules/militaryLeaders";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    militaryLeaders,
    battles,
  },
});
