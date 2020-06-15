
const battleModifyDialog = {
    namespaced: true,

    state: {
        showDialogBattleModify: false,
    },

    mutations: {
        setShowBattleModifyDialog(state, showDialog) {
            state.showDialogBattleModify = showDialog;
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
        showDialogBattleModify: (state) => state.showDialogBattleModify,
    },
};

export default battleModifyDialog;

