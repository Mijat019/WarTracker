const battlesTableDialog = {
    namespaced: true,

    state: {
        showBattlesTableDialog: false,
    },

    mutations: {
        setShowBattlesTableDialog(state, showDialog) {
            state.showBattlesTableDialog = showDialog;
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
        showBattlesTableDialog: (state) => state.showBattlesTableDialog,
    },
};

export default battlesTableDialog;

