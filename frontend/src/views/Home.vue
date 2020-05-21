<template>
  <div>
    <Drawer />
    <v-content>
      <Map />
    </v-content>
  </div>
</template>

<script>
import Drawer from "../components/Drawer/Drawer";
import Map from "../components/Map/Map";

export default {
  name: "Home",
  components: { Map, Drawer }
};
</script>

<style>
</style>