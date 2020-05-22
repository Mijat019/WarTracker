<template>
    <v-list-group v-model="showMilitaryLeadersList">
        <template v-slot:activator>
            <v-list-item-avatar>
                <v-icon>mdi-account</v-icon>
            </v-list-item-avatar>
            <v-list-item-title>Military leaders</v-list-item-title>
            <v-list-item-action>
                <MilitaryLeadersTableDialog />
            </v-list-item-action>
        </template>

        <v-list-item
            v-for="(militaryLeader, index) in militaryLeaders"
            :key="index"
        >
            <v-list-item-avatar></v-list-item-avatar>
            <v-list-item-content>{{
                `${militaryLeader.firstName} ${militaryLeader.lastName}`
            }}</v-list-item-content>
        </v-list-item>
    </v-list-group>
</template>

<script>
import MilitaryLeadersTableDialog from "../Tables/MilitaryLeader/MilitaryLeadersTableDialog";
import { mapGetters } from "vuex";
export default {
    components: { MilitaryLeadersTableDialog },

    name: "MilitaryLeadersList",

    props: ["showMilitaryLeadersList"],

    methods: {
        openMilitaryLeadersTable() {},
    },

    computed: {
        ...mapGetters("militaryLeaders", ["militaryLeaders"]),
    },
};
</script>

<style></style>
