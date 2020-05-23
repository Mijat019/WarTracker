<template>
    <v-card width="30%" class="rounded">
        <search-and-filter v-model="drawer"></search-and-filter>
        <v-expand-transition>

            <div v-show="drawer">
                <v-list color="transparent">
                    <battles-list :showBattlesList="showBattlesList"/>
                    <military-leaders-list :showMilitaryLeadersList="showMilitaryLeadersList"/>
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
    components: {MilitaryLeadersList, BattlesList, SearchAndFilter },

    data: () => ({
        drawer: false,
        showMilitaryLeadersList: false,
        showBattlesList: false,
    }),

    methods: {
        closeDrawer() {
            this.drawer = !this.drawer;
            this.showMilitaryLeadersList = false;
            this.showBattlesList = false;
        },
    },
};
</script>

<style>
    .rounded {
        border-radius: 20px !important;
        transition: height 2s !important;
    }
</style>
