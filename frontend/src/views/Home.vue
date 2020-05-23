<template>
  <div>
    <drawer class="drawer" />
    <v-content>
      <map-view />
    </v-content>
  </div>
</template>

<script>
import Drawer from "../components/Drawer/Drawer";
import MapView from "../components/Map/MapView";

export default {
  name: "Home",
  components: { MapView, Drawer }
};
</script>

<style>
  .drawer {
    position: fixed;
    top: 1em;
    left: 2em;
    z-index: 1000;
  }
</style>
