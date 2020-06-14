<template>
    <div class="d-flex">
        <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
                <v-btn @click="toggleShowHelp" height="20px" width="20px" icon v-on="on" v-bind="attrs">
                    <v-icon
                            :color="showHelp ? 'primary' : 'grey'"
                            class="ml-1"
                            size="20"
                    >
                        mdi-help
                    </v-icon>
                </v-btn>
            </template>
            <span>Help</span>
        </v-tooltip>
        <help-bar v-model="showHelp"></help-bar>
    </div>
</template>

<script>
    import HelpBar from "./HelpBar";

    export default {
        name: "Help",
        components: {HelpBar},
        data: () => ({
            showHelp: false,
        }),
        methods: {
            toggleShowHelp() {
                this.showHelp = !this.showHelp;

            },

        }
    }
</script>

<style scoped>

</style>
