<template>
    <div class="d-flex align-center">
        <v-btn
                @click="zoomOut"
                height="15px"
                width="15px"
                icon
                :ripple="false"
        >
            <v-icon
                    size="15"
                    :color="isMinZoom ? 'grey' : 'primary lighten-2'"

            >
                mdi-minus
            </v-icon>
        </v-btn>

        <v-divider class="py-1 mx-2" vertical></v-divider>

        <v-btn
                @click="zoomIn"
                height="15px"
                width="15px"
                icon
                :ripple="false"
        >
            <v-icon
                    size="15"
                    :color="isMaxZoom ? 'grey' : 'primary lighten-2'"
            >
                mdi-plus
            </v-icon>
        </v-btn>
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
