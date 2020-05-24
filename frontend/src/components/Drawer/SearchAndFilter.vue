<template>
  <v-container fluid class="px-7 py-0">
    <v-row align="center" justify="space-between">
      <v-col cols="1" class="pa-0">
        <v-btn icon @click="$emit('input', !value)">
          <v-icon>mdi-menu</v-icon>
        </v-btn>
      </v-col>
      <v-col cols="9" class="pa-0">
        <v-text-field dense placeholder="Search" hide-details append-outer-icon="mdi-magnify"></v-text-field>
      </v-col>
      <v-col cols="1">
        <v-btn icon small>
          <v-icon>mdi-filter</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "SearchAndFilter",
  props: {
    value: {
      type: Boolean,
      default() {
        return false;
      }
    }
  }
};
</script>

<style></style>
