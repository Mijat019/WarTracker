<template>
    <v-container fluid class="py-0">

        <div class="d-flex py-1">
            <v-btn @click="toggleShowPanel" height="20px" width="20px" icon>
                <v-icon
                        :color="showPanel ? 'primary' : 'grey'"
                        class="ml-1"
                        size="20"
                >
                    mdi-map
                </v-icon>
            </v-btn>

            <v-expand-x-transition>
                <div v-show="showPanel" :class="{'d-flex': showPanel}" style="max-height: 20px">
                    <div class="d-inline-flex flex-nowrap pa-auto">
                        <v-divider class="py-1 mx-2" vertical></v-divider>

                        <v-btn height="20px" width="20px" @click="chooseMap('map1')" icon>
                            <v-icon
                                    :color="mapCode === 'map1' ? 'primary' : 'grey'"
                                    size="20"
                            >
                                {{ mapCode === 'map1' ? 'mdi-numeric-1-circle' : 'mdi-numeric-1-circle-outline'}}
                            </v-icon>
                        </v-btn>
                        <v-btn height="20px" width="20px" @click="chooseMap('map2')" icon>
                            <v-icon
                                    :color="mapCode === 'map2' ? 'primary' : 'grey'"
                                    size="20"
                            >
                                {{ mapCode === 'map2' ? 'mdi-numeric-2-circle' : 'mdi-numeric-2-circle-outline'}}
                            </v-icon>
                        </v-btn>

                        <v-btn height="20px" width="20px" @click="chooseMap('map3')" icon>
                            <v-icon
                                    size="20"
                                    :color="mapCode === 'map3' ? 'primary' : 'grey'"
                            >
                                {{ mapCode === 'map3' ? 'mdi-numeric-3-circle' : 'mdi-numeric-3-circle-outline'}}
                            </v-icon>
                        </v-btn>

                        <v-btn height="20px" width="20px" @click="chooseMap('map4')" icon>
                            <v-icon
                                    size="20"
                                    :color="mapCode === 'map4' ? 'primary' : 'grey'"
                            >
                                {{ mapCode === 'map4' ? 'mdi-numeric-4-circle' : 'mdi-numeric-4-circle-outline'}}
                            </v-icon>
                        </v-btn>

                    </div>
                </div>
            </v-expand-x-transition>

            <v-divider class="my-0 mx-2" vertical></v-divider>

            <v-icon small>
                mdi-minus
            </v-icon>

            <v-divider class="my-1 mx-2" vertical></v-divider>

            <v-icon small>
                mdi-plus
            </v-icon>

        </div>

    </v-container>
</template>

<script>
    import {mapMutations, mapState} from "vuex";

    export default {
        name: "MapChooser",
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
