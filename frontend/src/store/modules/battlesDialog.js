const state = {
    battle: null,
    showDialog: false,
};

const mutations = {
    setBattle(state, battle) {
        state.battle = battle;
    },

    setShowDialog(state, showDialog) {
        state.showDialog = showDialog;
    },
};

const getters = {
    battle: (state) => state.battle,
    showDialog: (state) => state.showDialog,
};

export default {
    namespaced: true,
    state,
    mutations,
    getters,
};
