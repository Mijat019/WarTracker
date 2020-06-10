const SnackbarModule = {
    namespaced: true,
    state: {
        snackbar: false,
        snackbarText: '',
    },

    mutations: {
        openSnackbar(state, text) {
            state.snackbar = true;
            state.snackbarText = text;
        },
        closeSnackbar(state) {
            state.snackbar = false;
            state.snackbarText = '';
        },
        setSnackbar(state, boolval) {
            state.snackbar = boolval;
            if (!boolval) state.snackbarText = '';
        }
    },
};

export default SnackbarModule;
