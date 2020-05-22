<template>
    <v-dialog v-model="dialog" scrollable fullscreen>
        <template v-slot:activator="{ on }">
            <v-btn icon v-on="on">
                <v-icon>mdi-table</v-icon>
            </v-btn>
        </template>
        <v-card min-height="100%">
            <MilitaryLeadersTable />
        </v-card>
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
