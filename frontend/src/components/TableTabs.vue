<template>
    <v-tabs
            color="blue"
            centered
            slider-color="white"
    >
        <v-tab ripple>
            Battles
        </v-tab>
        <v-tab ripple>
            Military Leaders
        </v-tab>
        <v-tab-item>
            <v-card flat>
                <battle-table/>
            </v-card>
        </v-tab-item>
        <v-tab-item>
            <v-card flat>
                <military-leaders-table/>
            </v-card>
        </v-tab-item>
    </v-tabs>
</template>

<script>
    import MilitaryLeadersTable from "./MilitaryLeader/MilitaryLeadersTable";
    import BattleTable from "./Battle/BattleTable";

    export default {
        name: "TableTabs",
        components: {MilitaryLeadersTable, BattleTable}
    }
</script>

<style scoped>

</style>