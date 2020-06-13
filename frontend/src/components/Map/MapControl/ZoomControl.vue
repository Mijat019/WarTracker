<template>
    <div class="d-flex align-center">
        <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
                <v-btn
                        @click="zoomOut"
                        height="15px"
                        width="15px"
                        icon
                        :ripple="false"
                        v-on="on"
                        v-bind="attrs"
                >
                    <v-icon
                            size="15"
                            :color="isMinZoom ? 'grey' : 'primary lighten-2'"

                    >
                        mdi-minus
                    </v-icon>
                </v-btn>
            </template>
            <span>Zoom out</span>
        </v-tooltip>

        <v-divider class="py-1 mx-2" vertical></v-divider>
        <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
                <v-btn
                        @click="zoomIn"
                        height="15px"
                        width="15px"
                        icon
                        :ripple="false"
                        v-on="on"
                        v-bind="attrs"
                >
                    <v-icon
                            size="15"
                            :color="isMaxZoom ? 'grey' : 'primary lighten-2'"
                    >
                        mdi-plus
                    </v-icon>
                </v-btn>
            </template>
            <span>Zoom in</span>
        </v-tooltip>
    </div>
</template>

<script>
    import {mapGetters, mapMutations, mapState} from "vuex";

    export default {
        name: "ZoomControl",
        data: () => ({
            disabled: false
        }),
        computed: {
            ...mapState('map', ['map']),
            ...mapGetters('map', ['isMinZoom', 'isMaxZoom'])
        },
        methods: {
            ...mapMutations('map', ['zoomOut', 'zoomIn'])
        }
    }
</script>

<style scoped>

</style>
