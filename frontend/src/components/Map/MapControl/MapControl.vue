<template>
    <v-card class="map-control">
        <v-container fluid class="py-0">

            <div class="d-flex py-1">
                <help></help>

                <v-divider class="my-n1 mx-2" vertical></v-divider>

                <map-chooser></map-chooser>

                <v-divider class="my-n1 mx-2" vertical></v-divider>

                <zoom-control></zoom-control>

            </div>
        </v-container>
    </v-card>
</template>

<script>
    import MapChooser from "./MapChooser";
    import ZoomControl from "./ZoomControl";
    import Help from "../Help/Help"
    export default {
        name: "MapControl",
        components: {Help, ZoomControl, MapChooser},

    }
</script>

<style scoped>
    .map-control {
        border-radius: 1em !important;
    }
</style>
