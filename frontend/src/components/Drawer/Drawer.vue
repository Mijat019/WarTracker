<template>
    <div class="d-flex flex-row">
        <v-card class="card">
            <search-and-filter v-model="drawer"></search-and-filter>
            <v-fade-transition>
                <v-divider v-show="drawer"></v-divider>
            </v-fade-transition>
            <v-expand-transition>
                <div v-show="drawer">
                    <v-list color="transparent">
                        <battles-list v-model="showBattlesList"/>
                        <military-leaders-list v-model="showMilitaryLeadersList"/>
                    </v-list>
                </div>
            </v-expand-transition>
        </v-card>

        <connection-panel class="ml-3"></connection-panel>

    </div>
</template>

<script>
import SearchAndFilter from "./SearchAndFilter";
import BattlesList from "./BattlesList";
import MilitaryLeadersList from "./MilitaryLeadersList";
import ConnectionPanel from "./ConnectionPanel";
export default {
  components: {ConnectionPanel, MilitaryLeadersList, BattlesList, SearchAndFilter },

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
      width: 40vw;
      overflow: auto;
    }

    @media screen and (max-width: 750px) {
      .card {
        width: 50vw;
      }
    }
</style>
