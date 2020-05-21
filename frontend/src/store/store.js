import Vue from 'vue'
import Vuex from 'vuex'
import BattleModule from "./BattleModule";
import MilitaryLeaderModule from "./MilitaryLeaderModule";

Vue.use(Vuex);

export default new Vuex.Store({
  namespaced: true,
  state: {
    battles: []
  },
  mutations: {},
  actions: {},
  modules: {
    militaryLeader: MilitaryLeaderModule,
    battle: BattleModule
  },
})
