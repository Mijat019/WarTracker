<template>
    <v-row justify="center">
        <v-dialog v-model="dialog" scrollable max-width="300px">
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
    </v-row>
</template>

<script>
export default {
    name: "BattlesDialogTable",
};
</script>

<style></style>
