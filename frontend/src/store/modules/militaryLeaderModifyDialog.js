const militaryLeaderModifyDialog = {
    namespaced: true,

    state: {
        showMilitaryLeaderModifyDialog: false,
    },

    mutations: {
        setShowMilitaryLeaderModifyDialog(state, showDialog) {
            state.showMilitaryLeaderModifyDialog = showDialog;
        },
    },
    // actions: {
    //     setShowBattleModifyDialog(state, showDialog) {
    //         console.log("USAO OVDEE 1")
    //         console.log(showDialog)
    //         commit("setShowBattleModifyDialog", showDialog);
    //     },
    // },

    getters: {
        showMilitaryLeaderModifyDialog: (state) => state.showMilitaryLeaderModifyDialog,
    },
};

export default militaryLeaderModifyDialog;

