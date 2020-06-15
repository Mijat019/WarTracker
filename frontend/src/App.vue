<template>
    <v-app>
        <military-leader-modify mode="add" v-model="showMilitaryLeaderModifyDialog" />
        <battle-modify mode="add" v-model="showDialogBattleModify"></battle-modify>
        <military-leaders-table-dialog v-if="showMilitaryLeaderTableDialog===true" :show="showMilitaryLeaderTableDialog"></military-leaders-table-dialog>
        <battle-table-dialog v-if="showBattlesTableDialog===true" :show="showBattlesTableDialog"></battle-table-dialog>
        <home />
    </v-app>
</template>

<script>
import Home from "./views/Home";
import {mapActions, mapMutations,mapState} from "vuex";
import MilitaryLeaderModify from "./components/Tables/MilitaryLeader/MilitaryLeaderModify";
import BattleModify from "./components/Tables/Battles/BattleModify";
import MilitaryLeadersTableDialog from "./components/Tables/MilitaryLeader/MilitaryLeadersTableDialog";
import BattleTableDialog from "./components/Tables/Battles/BattleTableDialog";
export default {
    name: "App",

    components: {
        BattleTableDialog,
        MilitaryLeadersTableDialog,
        BattleModify,
        MilitaryLeaderModify,
        Home,
    },
    data: () => ({
        addDialog: false,
    }),
    computed: {
        ...mapState('battleModifyDialog', ["showDialogBattleModify"]),
        ...mapState('battlesTableDialog', ["showBattlesTableDialog"]),
        ...mapState('militaryLeaderModifyDialog', ["showMilitaryLeaderModifyDialog"]),
        ...mapState('militaryLeaderTableDialog', ["showMilitaryLeaderTableDialog"]),

    },
    methods: {

        ...mapActions({
            getBattles: "battles/getBattles",
            getWars: "battles/getWars",
            getMilitaryLeaders: "militaryLeaders/getMilitaryLeaders",
        }),
        ...mapMutations({
            setShowBattleModifyDialog :'battleModifyDialog/setShowBattleModifyDialog',
            setShowBattlesTableDialog :'battlesTableDialog/setShowBattlesTableDialog',
            setShowMilitaryLeaderModifyDialog : 'militaryLeaderModifyDialog/setShowMilitaryLeaderModifyDialog',
            setShowMilitaryLeaderTableDialog : 'militaryLeaderTableDialog/setShowMilitaryLeaderTableDialog'
        }),
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
        window.addEventListener('keydown', (zEvent) => {
            if (zEvent.altKey   &&   zEvent.key === "m") {  // case sensitive
                this.setShowMilitaryLeaderTableDialog(true);
            }
        });
        window.addEventListener('keydown', (zEvent) => {
            if (zEvent.altKey   &&   zEvent.key === "b") {  // case sensitive
                this.setShowBattlesTableDialog(true);
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
