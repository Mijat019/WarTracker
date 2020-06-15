<template>
    <v-dialog :value="ongoingTutorial" fullscreen>
        <v-card>
            <tutorial-step1></tutorial-step1>
        </v-card>
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
            ...mapState('tutorial', ['ongoingTutorial',]),
            tutorialStep: {
                get() {
                    return this.$store.state.tutorial.tutorialStep;
                },
                set(val) {
                    this.$store.commit('tutorial/setStep', val);
                }
            }
        }

    }
</script>

<style scoped>

</style>
