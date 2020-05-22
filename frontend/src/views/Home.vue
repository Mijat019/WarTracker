<template>
  <div>
    <drawer />
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
</style>
