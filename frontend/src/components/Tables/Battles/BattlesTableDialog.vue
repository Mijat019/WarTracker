<template>
    <v-dialog v-model="dialog" scrollable width="95%">
        <template v-slot:activator="{ on }">
            <v-btn icon v-on="on">
                <v-icon>mdi-table</v-icon>
            </v-btn>
        </template>
        <v-card>
            <v-card-title> test</v-card-title>
            <v-card-text>tabela ide ovde</v-card-text></v-card
        >
    </v-dialog>
</template>

<script>
export default {
    name: "BattlesTableDialog",
    data: () => ({ dialog: false }),
};
</script>

<style></style>
