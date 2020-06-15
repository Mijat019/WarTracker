<template>
    <v-card height="48px" class="connection-panel">
        <div class="d-flex flex-column align-center">
            <div class="mx-1">
                <v-tooltip right>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn @click="setLineAdding(!lineAdding)" icon height="17px" width="17px" v-on="on" v-bind="attrs">
                            <v-icon
                                    size="17"
                                    :color="lineAdding ? 'primary lighten-1' : 'grey'"
                            >
                                mdi-vector-polyline-plus
                            </v-icon>
                        </v-btn>
                    </template>
                    <span>Make a connection</span>
                </v-tooltip>
            </div>
            <v-divider class="px-2"></v-divider>
            <div class="mx-1">
                <v-tooltip right>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn @click="setLineRemoving(!lineRemoving)" icon height="17px" width="17px" v-on="on" v-bind="attrs">
                            <v-icon
                                    size="17"
                                    :color="lineRemoving ? 'red lighten-1' : 'grey'"
                            >
                                mdi-vector-polyline-minus
                            </v-icon>
                        </v-btn>
                    </template>
                    <span>Delete a connection</span>
                </v-tooltip>
            </div>
        </div>
    </v-card>
</template>

<script>
    import {mapMutations, mapState} from "vuex";

    export default {
        name: "ConnectionPanel",
        computed: {
            ...mapState('map', ['lineAdding', 'lineRemoving']),
        },
        methods: {
            ...mapMutations('map', ['setLineAdding', 'setLineRemoving']),
        },
    }
</script>

<style scoped>
    .connection-panel {
        border-radius: .5em !important;
    }
</style>
