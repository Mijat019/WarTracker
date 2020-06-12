<template>
  <div>
    <drawer class="drawer" />
    <v-content>
      <map-view/>
      <military-leader-details class="dialog" />
      <battle-details class="dialog" />
      <snackbar/>
      <delete-position-dialog/>
      <existing-position-dialog/>
    </v-content>
    <map-control class="map-control"/>
  </div>
</template>

<script>
import BattleDetails from "../components/Drawer/BattleDetails";
import MilitaryLeaderDetails from "../components/Drawer/MilitaryLeaderDetails";
import Drawer from "../components/Drawer/Drawer";
import MapView from "../components/Map/MapView";
import Snackbar from "../components/Snackbar";
import DeletePositionDialog from "../components/DeletePositionDialog";
import MapControl from "../components/Map/MapControl/MapControl";
import ExistingPositionDialog from "../components/ExistingPositionDialog";

export default {
  name: "Home",
  components: {ExistingPositionDialog, MapControl, DeletePositionDialog, Snackbar, MapView, Drawer, MilitaryLeaderDetails, BattleDetails }
};
</script>

<style>
.drawer {
  position: fixed;
  top: 1em;
  left: 1.5em;
  z-index: 1;
}

@media screen and (max-width: 750px) {
  .drawer {
    top: .5em;
    left: .5em;  }
}

.dialog {
  z-index: 1001;
}

.map-control {
  position: fixed;
  bottom: .5em;
  right: .5em;
  z-index: 1;
}
</style>
