const militaryLeaderTableDialog = {
    namespaced: true,

    state: {
        showMilitaryLeaderTableDialog: false,
    },

    mutations: {
        setShowMilitaryLeaderTableDialog(state, showDialog) {
            state.showMilitaryLeaderTableDialog = showDialog;
        },
    },
    // actions: {
    //     setShowBattleTableDialog(state, showDialog) {
    //         console.log("USAO OVDEE 1")
    //         console.log(showDialog)
    //         commit("setShowBattleTableDialog", showDialog);
    //     },
    // },

    getters: {
        showMilitaryLeaderTableDialog: (state) => state.showMilitaryLeaderTableDialog,
    },
};

export default militaryLeaderTableDialog;

