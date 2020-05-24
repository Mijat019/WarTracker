const state = {
    militaryLeader: null,
    showDialog: false,
};

const mutations = {
    setMilitaryLeader(state, militaryLeader) {
        state.militaryLeader = militaryLeader;
    },

    setShowDialog(state, showDialog) {
        state.showDialog = showDialog;
    },
};

const getters = {
    militaryLeader: (state) => state.militaryLeader,
    showDialog: (state) => state.showDialog,
};

export default { namespaced: true, state, mutations, getters };
