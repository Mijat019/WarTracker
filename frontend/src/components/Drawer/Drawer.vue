<template>
    <v-card>
        <v-navigation-drawer
            app
            v-model="drawer"
            :mini-variant.sync="drawer"
            permanent
            width="40%"
        >
            <SearchAndFilter v-on:closeDrawer="closeDrawer" />
            <v-divider></v-divider>
            <v-list>
                <BattlesList :showBattlesList="showBattlesList" />
                <MilitaryLeadersList
                    :showMilitaryLeadersList="showMilitaryLeadersList"
                />
            </v-list>
        </v-navigation-drawer>
    </v-card>
</template>

<script>
import SearchAndFilter from "./SearchAndFilter";
import MilitaryLeadersList from "./MilitaryLeadersList";
import BattlesList from "./BattlesList";
export default {
    components: { BattlesList, MilitaryLeadersList, SearchAndFilter },

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
.app-bar {
    border-radius: 1em;
    margin: 1em;
}
</style>
