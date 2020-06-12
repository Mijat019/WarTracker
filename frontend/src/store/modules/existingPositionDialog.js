const state = {
    entity: null,
    type: null,
    showDialog: false,
    oldPosition: null,
    newPosition: null
};

const mutations = {
    setEntity(state, {entity, type, newPosition, oldPosition}) {
        state.entity = entity;
        state.type = type;
        state.newPosition = newPosition;
        state.oldPosition = oldPosition;
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
