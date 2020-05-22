<template>
    <v-list-group v-model="showBattlesList">
        <template v-slot:activator>
            <v-list-item-avatar>
                <v-icon>mdi-sword-cross</v-icon>
            </v-list-item-avatar>
            <v-list-item-title>Battles</v-list-item-title>
            <v-list-item-action>
                <v-icon @click.stop="openBattlesTable">mdi-table</v-icon>
            </v-list-item-action>
        </template>

        <v-list-item v-for="(battle, index) in battles" :key="index">
            <v-list-item-avatar></v-list-item-avatar>
            <v-list-item-content>{{ battle.name }}</v-list-item-content>
        </v-list-item>
    </v-list-group>
</template>

<script>
import { mapGetters } from "vuex";
export default {
    name: "BattlesList",

    props: ["showBattlesList"],

    methods: {
        openBattlesTable() {},
    },

    computed: {
        ...mapGetters("battles", ["battles"]),
    },
};
</script>

<style></style>
