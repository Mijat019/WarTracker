<template>
  <v-container fluid class="pl-5 pl-lg-7 pr-7 py-0">
    <v-row align="center" justify="space-between">
      <v-col cols="1" class="px-0 py-1">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon @click="$emit('input', !value)" v-on="on" v-bind="attrs">
              <v-icon color="grey">mdi-menu</v-icon>
            </v-btn>
          </template>
          <span>{{ value ? 'Collapse' : 'Expand' }}</span>
        </v-tooltip>
      </v-col>
      <v-col cols="8" class="px-0 py-1">
        <v-text-field class="search-field" dense outlined placeholder="Search" hide-details></v-text-field>
      </v-col>
      <v-col cols="1" class="px-0 py-1">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon small v-on="on" v-bind="attrs">
              <v-icon color="grey">mdi-magnify</v-icon>
            </v-btn>
          </template>
          <span>Search</span>
        </v-tooltip>
      </v-col>
      <v-divider class="my-2" vertical></v-divider>
      <v-col cols="1" class="px-0 py-1">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon small v-on="on" v-bind="attrs">
              <v-icon color="grey">mdi-filter</v-icon>
            </v-btn>
          </template>
          <span>Filter</span>
        </v-tooltip>
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
<style>
  .search-field > .v-input__control > .v-input__slot:before,
  .search-field > .v-input__control > .v-input__slot:after,
  .search-field > .v-input__control > .v-input__slot > fieldset{
    border-style: none;
  }
</style>
