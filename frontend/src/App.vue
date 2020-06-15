<template>
    <v-app>
        <home />
    </v-app>
</template>

<script>
import Home from "./views/Home";
import { mapActions } from "vuex";
export default {
    name: "App",

    components: {
        Home,
    },

    methods: {
        ...mapActions({
            getBattles: "battles/getBattles",
            getWars: "battles/getWars",
            getMilitaryLeaders: "militaryLeaders/getMilitaryLeaders",
        }),
    },

    created() {
        window.addEventListener('mousedown', e => {
            if(document.getElementById("position-popup")?.contains(e.target)) // popup ima target
                return;
            this.$store.commit('positionPopup/setOpenPopup', false);
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
