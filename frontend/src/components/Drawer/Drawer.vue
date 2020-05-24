<template>
  <v-card class="card">
    <search-and-filter v-model="drawer"></search-and-filter>
    <v-fade-transition>
      <v-divider v-show="drawer"></v-divider>
    </v-fade-transition>
    <v-expand-transition>
      <div v-show="drawer">
        <v-list color="transparent">
          <battles-list v-model="showBattlesList" />
          <military-leaders-list v-model="showMilitaryLeadersList" />
        </v-list>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
import SearchAndFilter from "./SearchAndFilter";
import BattlesList from "./BattlesList";
import MilitaryLeadersList from "./MilitaryLeadersList";
export default {
  components: { MilitaryLeadersList, BattlesList, SearchAndFilter },

  data: () => ({
    drawer: false,
    showMilitaryLeadersList: false,
    showBattlesList: false
  })
};
</script>

<style>
.card {
  border-radius: 1em !important;
  width: 30%;
  max-height: 90%;
  overflow: auto;
}

@media screen and (max-width: 750px) {
  .card {
    width: 40%;
  }
}
</style>
