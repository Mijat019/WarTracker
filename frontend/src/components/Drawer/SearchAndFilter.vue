<template>
  <v-container fluid class="pl-5 pl-lg-7 pr-7 py-0">
    <v-form @submit.prevent="search">
      <v-row align="center" justify="space-between">
        <v-col cols="1" class="px-0 py-1">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                x-small
                v-if="ongoingTutorial && tutorialStep === 2"
                @click="tutorialOpenDrawer"
                v-on="on"
                v-bind="attrs"
                type="button"
                style="z-index: 1005"
              >
                <v-icon color="grey">mdi-menu</v-icon>
              </v-btn>
              <v-btn
                v-else
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
          ></v-text-field>
        </v-col>
        <v-col cols="1" class="px-0 py-1">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon small @click="search" v-on="on" v-bind="attrs">
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
            <v-btn @click="applyFilters" color="primary">Apply filters</v-btn>
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
                    <v-list-item
                      :key="birthPlace"
                      v-for="birthPlace in militaryLeaderFilters.birthPlace"
                    >
                      <v-checkbox
                        @click="clickedOnMilitaryLeaderFilter(`birthPlace`, birthPlace)"
                        dense
                        :label="birthPlace"
                      ></v-checkbox>
                    </v-list-item>
                  </v-list-group>

                  <v-list-group>
                    <template v-slot:activator>
                      <v-list-item-title>Military rank</v-list-item-title>
                    </template>
                    <v-list-item
                      :key="militaryRank"
                      v-for="militaryRank in militaryLeaderFilters.militaryRank"
                    >
                      <v-checkbox
                        @click="clickedOnMilitaryLeaderFilter(`militaryRank`, militaryRank)"
                        dense
                        :label="militaryRank"
                      ></v-checkbox>
                    </v-list-item>
                  </v-list-group>

                  <v-list-group>
                    <template v-slot:activator>
                      <v-list-item-title>School</v-list-item-title>
                    </template>
                    <v-list-item :key="school" v-for="school in militaryLeaderFilters.school">
                      <v-checkbox
                        @click="clickedOnMilitaryLeaderFilter(`school`, school)"
                        dense
                        :label="school"
                      ></v-checkbox>
                    </v-list-item>
                  </v-list-group>

                  <v-list-group>
                    <template v-slot:activator>
                      <v-list-item-title>Dynasty name</v-list-item-title>
                    </template>
                    <v-list-item
                      :key="dynastyName"
                      v-for="dynastyName in militaryLeaderFilters.dynastyName"
                    >
                      <v-checkbox
                        @click="clickedOnMilitaryLeaderFilter(`dynastyName`, dynastyName)"
                        dense
                        :label="dynastyName"
                      ></v-checkbox>
                    </v-list-item>
                  </v-list-group>

                  <v-list-group>
                    <template v-slot:activator>
                      <v-list-item-title>Title</v-list-item-title>
                    </template>
                    <v-list-item :key="title" v-for="title in militaryLeaderFilters.title">
                      <v-checkbox
                        @click="clickedOnMilitaryLeaderFilter(`title`, title)"
                        dense
                        :label="title"
                      ></v-checkbox>
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
                    <v-list-item :key="place" v-for="(place) in battleFilters.place">
                      <v-checkbox
                        @click="clickedOnBattleFilter(`place`, place)"
                        dense
                        :label="place"
                      ></v-checkbox>
                    </v-list-item>
                  </v-list-group>

                  <v-list-group>
                    <template v-slot:activator>
                      <v-list-item-title>War</v-list-item-title>
                    </template>
                    <v-list-item :key="war.name" v-for="(war) in battleFilters.war">
                      <v-checkbox
                        @click="clickedOnBattleFilter(`warId`, war.id)"
                        dense
                        :label="war.name"
                      ></v-checkbox>
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
import { mapActions, mapMutations, mapState, mapGetters } from "vuex";

export default {
  name: "SearchAndFilter",

  data: () => ({
    searchQuery: "",
    test: "asfdasfadsfadsfadsfadsf",
    filterDialog: false,
    militaryLeaders: {},
    battles: {}
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

  computed: {
    ...mapGetters("battleFilters", ["battleFilters"]),

    ...mapGetters("militaryLeaderFilters", ["militaryLeaderFilters"]),

    ...mapGetters("map", ["mapObj", "getSearch"]),
    ...mapState("tutorial", ["ongoingTutorial", "tutorialStep"])
  },

  methods: {
    ...mapActions("battles", ["searchBattles", "filterBattles"]),

    ...mapActions("militaryLeaders", [
      "searchMilitaryLeaders",
      "filterMilitaryLeaders"
    ]),

    ...mapActions("battleFilters", ["getBattleFilters"]),

    ...mapActions("militaryLeaderFilters", ["getMilitaryLeaderFilters"]),

    ...mapActions("positions", ["filterPositions"]),

    ...mapMutations("map", ["setSearch", "setFilters"]),

    clickedOnMilitaryLeaderFilter(attribute, value) {
      if (!this.militaryLeaders[attribute]) {
        this.militaryLeaders[attribute] = [];
      }

      const index = this.militaryLeaders[attribute].indexOf(value);
      if (index >= 0) {
        this.removeMilitaryLeaderFilter(attribute, index);
        return;
      }

      this.militaryLeaders[attribute].push(value);
    },

    removeMilitaryLeaderFilter(attribute, index) {
      this.militaryLeaders[attribute].splice(index, 1);
      if (this.militaryLeaders[attribute].length === 0) {
        delete this.militaryLeaders[attribute];
      }
    },

    clickedOnBattleFilter(attribute, value) {
      if (!this.battles[attribute]) {
        this.battles[attribute] = [];
      }

      const index = this.battles[attribute].indexOf(value);
      if (index >= 0) {
        this.removeBattleFilter(attribute, index);
        return;
      }

      this.battles[attribute].push(value);
    },

    removeBattleFilter(attribute, index) {
      this.battles[attribute].splice(index, 1);
      if (this.battles[attribute].length === 0) {
        delete this.battles[attribute];
      }
    },

    async applyFilters() {
      // reset the map
      console.log(this.battles);
      console.log(this.militaryLeaders);

      this.filterDialog = false;
      await this.searchMilitaryLeaders({ searchQuery: this.searchQuery, filterMilitaryLeaders: this.militaryLeaders }); // ja bih i filter metnuo tu
      await this.searchBattles({ searchQuery: this.searchQuery, battleFilter: this.battles  });
      this.setFilters({battleFilter: this.battles, filterMilitaryLeaders: this.militaryLeaders});
      this.setSearch({searchQuery: this.searchQuery});
    },

    async search() {
      this.$emit("update:loading", true);
      await this.searchMilitaryLeaders({ searchQuery: this.searchQuery, filterMilitaryLeaders: this.militaryLeaders }); // ja bih i filter metnuo tu
      await this.searchBattles({ searchQuery: this.searchQuery, battleFilter: this.battles  });
      this.setSearch({searchQuery: this.searchQuery});
      this.$emit("update:loading", false);
      // da otvori drawer
      this.$emit("input", true);
    },

    tutorialOpenDrawer() {
      this.$emit("input", true);
      this.$store.commit("tutorial/increaseStep");
    }
  },

  created() {
    this.getBattleFilters();
    this.getMilitaryLeaderFilters();
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
