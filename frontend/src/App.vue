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
        this.getBattles();
        this.getWars();
        this.getMilitaryLeaders();
    },
};
</script>
