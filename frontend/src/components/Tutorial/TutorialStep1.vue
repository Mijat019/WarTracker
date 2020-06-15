<template>
    <div>
        <drawer class="drawer"/>
        <v-content>
            <map-view map-id="tutorial-map"/>
            <military-leader-details class="dialog" />
            <battle-details class="dialog" />
            <snackbar/>
            <delete-position-dialog/>
            <existing-position-dialog/>
        </v-content>
        <tutorial-info></tutorial-info>
    </div>
</template>

<script>
    import ExistingPositionDialog from "../ExistingPositionDialog";
    import DeletePositionDialog from "../DeletePositionDialog";
    import Snackbar from "../Snackbar";
    import MapView from "../Map/MapView";
    import Drawer from "../Drawer/Drawer";
    import MilitaryLeaderDetails from "../Drawer/MilitaryLeaderDetails";
    import BattleDetails from "../Drawer/BattleDetails";
    import TutorialInfo from "./TutorialInfo";

    export default {
        name: "TutorialStep1",
        components: {
            TutorialInfo,
            ExistingPositionDialog, DeletePositionDialog, Snackbar, MapView, Drawer, MilitaryLeaderDetails, BattleDetails }
    }
</script>

<style scoped>

</style>
