import {militaryLeaderType} from "../../utils/types";

const state = {
    militaryLeader: militaryLeaderType.empty,
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
