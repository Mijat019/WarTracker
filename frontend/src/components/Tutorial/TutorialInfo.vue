<template>
    <v-card style="z-index: 1005;" max-width="250" class="tutorial-info">
        <v-card-title>
            {{currentTitle}}
        </v-card-title>
        <v-card-text>
            {{currentMessage}}
        </v-card-text>
        <v-card-actions>
            <v-btn @click="closeTutorial" text>
                Close
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn :disabled="!isNext" @click="nextStep" text>Next</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
    import tutorialSteps from "../../utils/steps";
    import {mapState} from "vuex";

    export default {
        name: "TutorialInfo",
        computed: {
            ...mapState('tutorial', ['tutorialStep']),
            currentTitle() {
                return tutorialSteps[this.tutorialStep].title;
            },
            currentMessage() {
                return tutorialSteps[this.tutorialStep].message;
            },
            isNext() {
                return tutorialSteps[this.tutorialStep].next;
            }
        },
        methods: {
            closeTutorial() {
                location.reload();
            },
            nextStep() {
                this.$store.commit('tutorial/increaseStep');
            }
        }
    }
</script>

<style>
    .tutorial-info {
        position: absolute;
        right: 2em;
        top: 7em;
    }
</style>
