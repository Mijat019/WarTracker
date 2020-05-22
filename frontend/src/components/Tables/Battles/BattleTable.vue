<template>
    <div>
        <v-data-table
            :headers="headers"
            :items="battles"
            class="elevation-0"
            sort-by="calories"
        >
            <template v-slot:top>
                <v-toolbar color="white" flat>
                    <v-toolbar-title>Battles</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer>
                    <v-btn @click="addItem" class="mb-2" color="primary" dark
                        >New battle</v-btn
                    >
                </v-toolbar>
            </template>

            <template v-slot:item.update="{ item }">
                <v-icon @click="editItem(item)" color="amber darken-2">
                    mdi-pencil
                </v-icon>
            </template>
            <template v-slot:item.remove="{ item }">
                <v-icon @click="deleteItem(item)" color="red">
                    mdi-delete
                </v-icon>
            </template>
        </v-data-table>
        <battle-modify mode="add" v-model="addDialog" />
        <battle-modify
            :edit-battle="editBattle"
            mode="update"
            v-model="editDialog"
        />
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import BattleModify from "./BattleModify";

export default {
    name: "BattleTable",
    components: { BattleModify },
    data: () => ({
        editDialog: false,
        addDialog: false,
        editBattle: null,
        dialog: false,
        headers: [
            { text: "Name", value: "name" },
            { text: "Place", value: "place" },
            { text: "Date", value: "date" },
            { text: "Description", value: "description" },
            {
                text: "Update/Details",
                value: "update",
                sortable: false,
                align: "center",
            },
            {
                text: "Remove",
                value: "remove",
                sortable: false,
                align: "center",
            },
        ],
    }),
    computed: {
        ...mapGetters("battles", ["battles"]),
    },

    methods: {
        ...mapActions("battle", ["deleteBattle"]),

        editItem(battle) {
            this.editBattle = battle;
            this.editDialog = true;
        },
        addItem() {
            this.addDialog = true;
        },

        deleteItem(item) {
            let msg = "Are you sure you want to remove " + item.name + "?";
            confirm(msg) && this.deleteBattle(item);
        },
    },
};
</script>

<style scoped></style>
