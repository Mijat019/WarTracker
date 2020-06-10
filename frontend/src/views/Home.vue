<template>
  <div>
    <drawer class="drawer" />
    <v-content>
      <map-view/>
      <military-leader-details class="dialog" />
      <battle-details class="dialog" />
      <snackbar></snackbar>
    </v-content>
  </div>
</template>

<script>
import BattleDetails from "../components/Drawer/BattleDetails";
import MilitaryLeaderDetails from "../components/Drawer/MilitaryLeaderDetails";
import Drawer from "../components/Drawer/Drawer";
import MapView from "../components/Map/MapView";
import Snackbar from "../components/Snackbar";

export default {
  name: "Home",
  components: {Snackbar, MapView, Drawer, MilitaryLeaderDetails, BattleDetails }
};
</script>

<style>
.drawer {
  position: fixed;
  top: 1em;
  left: 2em;
  z-index: 1;
}

.dialog {
  z-index: 1001;
}
</style>
