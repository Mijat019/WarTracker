<template>
    <v-snackbar
            :value="snackbar"
            @input="setSnackbar($event)"
            :timeout="3000"
            color="error"
    >
        {{ snackbarText }}
        <v-btn
                dark
                text
                @click="closeSnackbar"
        >
            Close
        </v-btn>
    </v-snackbar>
</template>

<script>
    import {mapMutations, mapState} from "vuex";

    export default {
        name: "Snackbar",
        computed: {
            ...mapState('snackbar', ['snackbar', 'snackbarText'])
        },
        methods: {
            ...mapMutations('snackbar', ['closeSnackbar', 'setSnackbar'])
        }
    }
</script>

<style scoped>

</style>
