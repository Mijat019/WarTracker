const state = {
    showDialog: false,
    militaryLeader : {firstName:"", lastName:""},
};

const mutations = {
    setMilitaryLeader(state, militaryLeader) {
        state.militaryLeader = militaryLeader;
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
