<template>
    <div>
        <drawer class="drawer"/>
        <v-content>
            <map-view map-id="tutorial-map"/>
        </v-content>
        <tutorial-info></tutorial-info>
    </div>
</template>

<script>
    import MapView from "../Map/MapView";
    import Drawer from "../Drawer/Drawer";
    import TutorialInfo from "./TutorialInfo";

    export default {
        name: "TutorialStep1",
        components: {
            TutorialInfo, MapView, Drawer }
    }
</script>

<style scoped>

</style>
