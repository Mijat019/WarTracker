<template>
  <v-container fluid class="pl-5 pl-lg-7 pr-7 py-0">
    <v-form @submit.prevent="search">
      <v-row align="center" justify="space-between">
        <v-col cols="1" class="px-0 py-1">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon @click="$emit('input', !value)" v-on="on" v-bind="attrs" type="button">
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
          ></v-text-field>
        </v-col>
        <v-col cols="1" class="px-0 py-1">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon small v-on="on" v-bind="attrs" type="submit">
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
              <v-btn @click="filterDialog = true" icon small v-on="on" v-bind="attrs" type="button">
                <v-icon color="grey">mdi-filter</v-icon>
              </v-btn>
            </template>
            <span>Filter</span>
          </v-tooltip>
        </v-col>
      </v-row>
    </v-form>

    <v-dialog fullscreen v-model="filterDialog" @keydown.esc="filterDialog = false">
      <v-card>
        <v-card-title>
          Filters
          <v-spacer></v-spacer>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn icon @click="filterDialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-btn color="primary">Apply filters</v-btn>
          </v-card-actions>
        </v-card-title>
        <v-divider></v-divider>
        <v-container>
          <v-row>
            <v-col cols="6">
              <v-card-title>Military leaders</v-card-title>
              <v-card-text>
                <v-list>
                  <v-list-group>
                    <template v-slot:activator>
                      <v-list-item-title>Brith place</v-list-item-title>
                    </template>
                    <v-list-item>
                      <v-checkbox dense label="test"></v-checkbox>
                    </v-list-item>
                  </v-list-group>

                  <v-list-group>
                    <template v-slot:activator>
                      <v-list-item-title>Military rank</v-list-item-title>
                    </template>
                    <v-list-item>
                      <v-checkbox dense label="test"></v-checkbox>
                    </v-list-item>
                  </v-list-group>

                  <v-list-group>
                    <template v-slot:activator>
                      <v-list-item-title>School</v-list-item-title>
                    </template>
                    <v-list-item>
                      <v-checkbox dense label="test"></v-checkbox>
                    </v-list-item>
                  </v-list-group>

                  <v-list-group>
                    <template v-slot:activator>
                      <v-list-item-title>Dinasty name</v-list-item-title>
                    </template>
                    <v-list-item>
                      <v-checkbox dense label="test"></v-checkbox>
                    </v-list-item>
                  </v-list-group>

                  <v-list-group>
                    <template v-slot:activator>
                      <v-list-item-title>Title</v-list-item-title>
                    </template>
                    <v-list-item>
                      <v-checkbox dense label="test"></v-checkbox>
                    </v-list-item>
                  </v-list-group>

                  <v-list-item>
                    <v-text-field placeholder="Date of birth"></v-text-field>
                  </v-list-item>

                  <v-list-item>
                    <v-text-field placeholder="Date of death"></v-text-field>
                  </v-list-item>
                </v-list>
              </v-card-text>
            </v-col>
            <v-col cols="6">
              <v-card-title>Battles</v-card-title>

              <v-card-text>
                <v-list>
                  <v-list-group>
                    <template v-slot:activator>
                      <v-list-item-title>Place</v-list-item-title>
                    </template>
                    <v-list-item>
                      <v-checkbox dense label="test"></v-checkbox>
                    </v-list-item>
                  </v-list-group>

                  <v-list-group>
                    <template v-slot:activator>
                      <v-list-item-title>War</v-list-item-title>
                    </template>
                    <v-list-item>
                      <v-checkbox dense label="test"></v-checkbox>
                    </v-list-item>
                  </v-list-group>

                  <v-list-item>
                    <v-text-field placeholder="Date"></v-text-field>
                  </v-list-item>
                </v-list>
              </v-card-text>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapActions, mapMutations } from "vuex";

export default {
  name: "SearchAndFilter",
  data: () => ({
    searchQuery: "",
    filterDialog: false
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
    ...mapActions("battles", ["searchBattles"]),
    ...mapActions("militaryLeaders", ["searchMilitaryLeaders"]),
    ...mapMutations("map", ["setSearch"]),
    async search() {
      this.$emit("update:loading", true);
      await this.searchMilitaryLeaders({ searchQuery: this.searchQuery }); // ja bih i filter metnuo tu
      await this.searchBattles({ searchQuery: this.searchQuery });
      this.setSearch(this.searchQuery);
      this.$emit("update:loading", false);
      // da otvori drawer
      this.$emit("input", true);
    }
  }
};
</script>
<style>
.search-field > .v-input__control > .v-input__slot:before,
.search-field > .v-input__control > .v-input__slot:after,
.search-field > .v-input__control > .v-input__slot > fieldset {
  border-style: none;
}
</style>
