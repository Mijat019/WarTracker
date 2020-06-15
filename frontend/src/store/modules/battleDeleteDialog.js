const state = {
    showDialog: false,
    battle : {name:""},
};

const mutations = {
    setBattle(state, battle) {
        state.battle = battle;
    },
    setShowDialog(state, showDialog) {
        state.showDialog = showDialog;
    },
};

export default {
    namespaced: true,
    state,
    mutations,
};
