<template>
  <v-container fluid class="pl-5 pl-lg-7 pr-7 py-0">
    <v-form
            @submit.prevent="search"
    >
      <v-row align="center" justify="space-between">
        <v-col cols="1" class="px-0 py-1">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                      icon
                      @click="$emit('input', !value)"
                      v-on="on"
                      v-bind="attrs"
                      type="button"
              >
                <v-icon color="grey">mdi-menu</v-icon>
              </v-btn>
            </template>
            <span>{{ value ? 'Collapse' : 'Expand' }}</span>
          </v-tooltip>
        </v-col>
        <v-col cols="8" class="px-0 py-1">
          <v-text-field
                  class="search-field"
                  dense
                  outlined
                  placeholder="Search"
                  hide-details
                  v-model="searchQuery"
                  autocomplete="off"
          >
          </v-text-field>
        </v-col>
        <v-col cols="1" class="px-0 py-1">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                      icon
                      small
                      v-on="on"
                      v-bind="attrs"
                      type="submit"
              >
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
              <v-btn
                      icon
                      small
                      v-on="on"
                      v-bind="attrs"
                      type="button"
              >
                <v-icon color="grey">mdi-filter</v-icon>
              </v-btn>
            </template>
            <span>Filter</span>
          </v-tooltip>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
  import {mapActions, mapMutations} from "vuex";

export default {
  name: "SearchAndFilter",
  data: () => ({
    searchQuery: '',
  }),
  props: {
    value: {
      type: Boolean,
      default() {
        return false;
      }
    },
    loading: {
      type: Boolean,
      default() {
        return false;
      }
    }
  },
  methods: {
    ...mapActions('battles', ['searchBattles']),
    ...mapActions('militaryLeaders', ['searchMilitaryLeaders']),
    ...mapMutations('map', ['setSearch']),
    async search() {
      this.$emit('update:loading', true);
      await this.searchMilitaryLeaders({searchQuery: this.searchQuery}); // ja bih i filter metnuo tu
      await this.searchBattles({searchQuery: this.searchQuery});
      this.setSearch(this.searchQuery);
      this.$emit('update:loading', false);
      // da otvori drawer
      this.$emit('input', true)
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
