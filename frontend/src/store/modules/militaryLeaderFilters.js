import Vue from "vue";

const state = {
    militaryLeaderFilters: {
        birthPlaces: [],
        militaryRank: [],
        school: [],
        dynastyName: [],
        title: [],
    },
};

const mutations = {
    setMilitaryLeaderFilters(state, militaryLeaderFilters) {
        state.militaryLeaderFilters = militaryLeaderFilters;
    },
};

const actions = {
    async getMilitaryLeaderFilters({ commit }) {
        try {
            const { data } = await Vue.$axios.get("/militaryLeader/filters");
            commit("setMilitaryLeaderFilters", data);
        } catch (error) {
            alert(error);
        }
    },
};

const getters = {
    militaryLeaderFilters: (state) => state.militaryLeaderFilters,
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};
