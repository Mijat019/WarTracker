<template>
    <v-dialog :value="ongoingTutorial" fullscreen persistent >
        <tutorial-step1></tutorial-step1>
    </v-dialog>
</template>

<script>
    import {mapState} from "vuex";
    import TutorialStep1 from "./TutorialStep1";
    export default {
        name: "TutorialHome",
        components: {
            TutorialStep1,
            },
        computed: {
            ...mapState('tutorial', ['ongoingTutorial',])
        }

    }
</script>

<style scoped>

</style>
