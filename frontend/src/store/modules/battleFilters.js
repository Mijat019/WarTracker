import Vue from "vue";

const state = {
    battleFilters: {
        place: [],
        war: [],
    },
};

const mutations = {
    setBattleFilters(state, battleFilters) {
        state.battleFilters = battleFilters;
    },
};

const actions = {
    async getBattleFilters({ commit }) {
        try {
            const { data } = await Vue.$axios.get("/battles/filters");
            commit("setBattleFilters", data);
        } catch (error) {
            alert(error);
        }
    },
};

const getters = {
    battleFilters: (state) => state.battleFilters,
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};
