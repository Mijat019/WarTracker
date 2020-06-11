const SnackbarModule = {
    namespaced: true,
    state: {
        snackbar: false,
        snackbarText: '',
        snackbarColor: 'primary',
    },

    mutations: {
        openSnackbar(state, { text, color }) {
            state.snackbar = true;
            state.snackbarText = text;
            state.snackbarColor = color;
        },
        closeSnackbar(state) {
            state.snackbar = false;
            state.snackbarText = '';
            state.snackbarColor = 'primary';
        },
        setSnackbar(state, boolval) {
            state.snackbar = boolval;
            if (!boolval) {
                state.snackbarText = '';
                state.snackbarColor = 'primary';
            }
        }
    },
};

export default SnackbarModule;
