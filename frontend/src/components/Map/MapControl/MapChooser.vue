<template>

    <div class="d-flex">

        <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
                <v-btn @click="toggleShowPanel" height="20px" width="20px" icon v-on="on" v-bind="attrs">
                    <v-icon
                            :color="showPanel ? 'primary' : 'grey'"
                            class="ml-1"
                            size="20"
                    >
                        mdi-map
                    </v-icon>
                </v-btn>
            </template>
            <span>Choose a map</span>
        </v-tooltip>

        <v-expand-x-transition>
            <div v-show="showPanel" :class="{'d-flex': showPanel}" style="max-height: 20px">
                <div class="d-inline-flex flex-nowrap pa-auto">
                    <v-divider class="py-1 mx-2" vertical></v-divider>
                    <v-tooltip top>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn height="20px" width="20px" @click="chooseMap('map1')" icon v-on="on" v-bind="attrs">
                                <v-icon
                                        :color="mapCode === 'map1' ? 'primary' : 'grey'"
                                        size="20"
                                >
                                    {{ mapCode === 'map1' ? 'mdi-numeric-1-circle' : 'mdi-numeric-1-circle-outline'}}
                                </v-icon>
                            </v-btn>
                        </template>
                        <span>Map 1</span>
                    </v-tooltip>
                    <v-tooltip top>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn height="20px" width="20px" @click="chooseMap('map2')" icon v-on="on" v-bind="attrs">
                                <v-icon
                                        :color="mapCode === 'map2' ? 'primary' : 'grey'"
                                        size="20"
                                >
                                    {{ mapCode === 'map2' ? 'mdi-numeric-2-circle' : 'mdi-numeric-2-circle-outline'}}
                                </v-icon>
                            </v-btn>
                        </template>
                        <span>Map 2</span>
                    </v-tooltip>

                    <v-tooltip top>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn height="20px" width="20px" @click="chooseMap('map3')" icon v-on="on" v-bind="attrs">
                                <v-icon
                                        :color="mapCode === 'map3' ? 'primary' : 'grey'"
                                        size="20"
                                >
                                    {{ mapCode === 'map3' ? 'mdi-numeric-3-circle' : 'mdi-numeric-3-circle-outline'}}
                                </v-icon>
                            </v-btn>
                        </template>
                        <span>Map 3</span>
                    </v-tooltip>

                    <v-tooltip top>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn height="20px" width="20px" @click="chooseMap('map4')" icon v-on="on" v-bind="attrs">
                                <v-icon
                                        :color="mapCode === 'map4' ? 'primary' : 'grey'"
                                        size="20"
                                >
                                    {{ mapCode === 'map4' ? 'mdi-numeric-4-circle' : 'mdi-numeric-4-circle-outline'}}
                                </v-icon>
                            </v-btn>
                        </template>
                        <span>Map 4</span>
                    </v-tooltip>

                </div>
            </div>
        </v-expand-x-transition>
    </div>

</template>

<script>
    import {mapMutations, mapState} from "vuex";

    export default {
        name: "MapChooser",
        components: {},
        data: () => ({
            showPanel: false,
        }),
        computed: {
            ...mapState('map', ['mapCode'])
        },
        methods: {
            ...mapMutations('map',
                [
                    'setMapCode'
                ]),
            toggleShowPanel() {
                this.showPanel = !this.showPanel;
            },
            chooseMap(mapCode) {
                this.setMapCode(mapCode);
            }
        }
    }
</script>

<style scoped>

</style>
