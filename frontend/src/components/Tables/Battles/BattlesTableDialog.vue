<template>
    <v-dialog v-model="dialog" scrollable fullscreen>
        <template v-slot:activator="{ on }">
            <v-btn icon v-on="on">
                <v-icon>mdi-table</v-icon>
            </v-btn>
        </template>

        <v-card min-height="100%">
            <BattleTable />
        </v-card>
    </v-dialog>
</template>

<script>
import BattleTable from "./BattleTable";
export default {
    components: { BattleTable },

    name: "BattlesTableDialog",
    data: () => ({ dialog: false }),
};
</script>

<style></style>
