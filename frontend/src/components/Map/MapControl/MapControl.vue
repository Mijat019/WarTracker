<template>
    <v-card class="map-control">
        <map-chooser></map-chooser>
    </v-card>
</template>

<script>
    import MapChooser from "./MapChooser";
    export default {
        name: "MapControl",
        components: {MapChooser}
    }
</script>

<style scoped>
    .map-control {
        border-radius: 1em !important;
    }
</style>
