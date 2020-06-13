import Vue from 'vue';

const state = {
    popup: {
        open: false,
        x: 0,
        y: 0,
        position: null,
        type: null
    }
};

const mutations = {
    setPopup(state, newPopup) {
        Vue.set(state, 'popup', newPopup);
    },

    setOpenPopup(state, open) {
        state.popup.open = open;
    },
};

export default {
    namespaced: true,
    state,
    mutations,
};
