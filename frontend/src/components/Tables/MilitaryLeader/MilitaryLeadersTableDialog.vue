<template>
    <v-dialog v-model="dialog" scrollable width="95%">
        <template v-slot:activator="{ on }">
            <v-btn icon v-on="on">
                <v-icon>mdi-table</v-icon>
            </v-btn>
        </template>
        <MilitaryLeadersTable />
    </v-dialog>
</template>

<script>
import MilitaryLeadersTable from "./MilitaryLeadersTable.vue";
export default {
    name: "MilitaryLeadersTableDialog",

    components: { MilitaryLeadersTable },

    data: () => ({ dialog: false }),
};
</script>

<style></style>
