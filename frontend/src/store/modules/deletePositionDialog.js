const state = {
    position: null,
    type: null,
    showDialog: false,
};

const mutations = {
    setPosition(state, {position, type}) {
        state.position = position;
        state.type = type;
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
