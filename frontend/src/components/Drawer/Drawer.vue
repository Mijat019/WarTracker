<template>
    <div class="d-flex flex-row">
        <v-card class="card">
            <search-and-filter v-model="drawer" :loading.sync="loading"></search-and-filter>
            <v-progress-linear
                    :active="loading"
                    height="6"
                    rotate="90"
                    indeterminate
                    size="20"
                    color="primary lighten-1"
            ></v-progress-linear>
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
    showBattlesList: false,
    loading: false
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
