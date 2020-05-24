<template>
  <div>
    <drawer class="drawer" />
    <v-content>
      <map-view />
      <military-leader-dialog class="dialog" />
    </v-content>
  </div>
</template>

<script>
import MilitaryLeaderDialog from "../components/Drawer/MilitaryLeaderDialog.vue";
import Drawer from "../components/Drawer/Drawer";
import MapView from "../components/Map/MapView";

export default {
  name: "Home",
  components: { MapView, Drawer, MilitaryLeaderDialog }
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
