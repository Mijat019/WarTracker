<template>
    <v-app>
        <military-leader-modify mode="add" v-model="showMilitaryLeaderModifyDialog" />
        <battle-modify mode="add" v-model="showDialogBattleModify"></battle-modify>
        <home />
    </v-app>
</template>

<script>
import Home from "./views/Home";
import {mapActions, mapMutations,mapState} from "vuex";
import MilitaryLeaderModify from "./components/Tables/MilitaryLeader/MilitaryLeaderModify";
import BattleModify from "./components/Tables/Battles/BattleModify";
export default {
    name: "App",

    components: {
        BattleModify,
        MilitaryLeaderModify,
        Home,
    },
    data: () => ({
        addDialog: false,
    }),
    computed: {
        ...mapState('battleModifyDialog', ["showDialogBattleModify"]),
        ...mapState('militaryLeaderModifyDialog', ["showMilitaryLeaderModifyDialog"])
    },
    methods: {

        ...mapActions({
            getBattles: "battles/getBattles",
            getWars: "battles/getWars",
            getMilitaryLeaders: "militaryLeaders/getMilitaryLeaders",
        }),
        ...mapMutations('battleModifyDialog', ['setShowBattleModifyDialog']),
        ...mapMutations('militaryLeaderModifyDialog', ['setShowMilitaryLeaderModifyDialog'])
    },

    created() {
        window.addEventListener('mousedown', e => {
            if(document.getElementById("position-popup")?.contains(e.target)) // popup ima target
                return;
            this.$store.commit('positionPopup/setOpenPopup', false);
        });
        window.addEventListener('keydown', (zEvent) => {
            if (zEvent.ctrlKey   &&   zEvent.key === "b") {  // case sensitive
                this.setShowBattleModifyDialog(true);

            }
        });
        window.addEventListener('keydown', (zEvent) => {
            if (zEvent.ctrlKey   &&   zEvent.key === "m") {  // case sensitive
                this.setShowMilitaryLeaderModifyDialog(true);
            }
        });
        this.getBattles();
        this.getWars();
        this.getMilitaryLeaders();
    },
};
</script>

<style>
    /*da se ne vidi dosadni skrolbar*/
    ::-webkit-scrollbar {
        width: 0 !important;
        background: transparent !important;
        overflow: hidden !important;
    }
</style>
